import type { Metadata } from 'next';
import { URL_MAPA, URL_REPORTAR } from '@/lib/publicacion';
import { FormularioContacto } from '@/components/FormularioContacto';
import Link from 'next/link';
import { reader, informesPublicados, seguimientoPublicado, esModoDesarrollo } from '@/lib/contenido';
import { etiquetaInforme, fechaCorta, fechaLarga, estaPendiente } from '@/lib/formato';
import { Texto, Dato } from '@/components/Texto';
import { Bloques } from '@/components/Bloques';
import { Icono } from '@/components/Iconos';
import { FilaInforme, InformeDestacado, SelloEjemplo } from '@/components/Informes';
import { Medios, type ItemMedio } from '@/components/Medios';
import { Suscripcion } from '@/components/Suscripcion';

export const metadata: Metadata = { alternates: { canonical: '/' } };

const TIPO_MEDIO = { prensa: 'Diario / portal', radio: 'Radio', tv: 'Televisión' } as const;
const TIPO_SEGUIMIENTO = {
  pedido: 'Pedido de acceso a la información',
  reclamo: 'Reclamo presentado',
  respuesta: 'Respuesta oficial',
  avance: 'Avance',
} as const;
const SITUACION = {
  'solicitud-enviada': 'Solicitud enviada',
  'recepcion-confirmada': 'Recepción confirmada',
  'subsanacion-presentada': 'Subsanación presentada',
  'tramite-registrado': 'Trámite registrado',
  'en-plazo': 'En plazo de respuesta',
  'prorroga-comunicada': 'Prórroga comunicada',
  'respuesta-parcial': 'Respuesta parcial',
  'respuesta-completa': 'Respuesta completa',
  denegatoria: 'Denegatoria',
  'plazo-vencido': 'Plazo vencido sin respuesta',
  'reclamo-presentado': 'Reclamo presentado',
} as const;
const CORTE_SEGUIMIENTO = '2026-11-19';

export default async function Inicio() {
  const [qs, contacto, informes, medios, propuestas, seguimiento, videos] = await Promise.all([
    reader.singletons.quienesSomos.readOrThrow(),
    reader.singletons.contacto.readOrThrow(),
    informesPublicados(),
    reader.collections.medios.all(),
    reader.collections.propuestas.all(),
    seguimientoPublicado(),
    reader.collections.videos.all(),
  ]);
  const [ultimo, ...anteriores] = informes;
  const solicitudesSeguimiento = seguimiento.filter((s) => s.tipo === 'pedido' && !s.esEjemplo);
  const puntosSeguimiento = solicitudesSeguimiento.reduce((total, solicitud) => total + (solicitud.puntos ?? 0), 0);
  const mediosOrdenados = medios
    .map((m) => m.entry)
    .filter((m) => m.visible)
    .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  const videosPublicados = videos
    .map((v) => v.entry)
    .filter((v) => v.publicado)
    .sort((a, b) => (b.fecha ?? '').localeCompare(a.fecha ?? ''));
  // Fechas de notas en dd/mm/aaaa y de videos en aaaa-mm-dd: se normalizan para ordenar todo junto.
  const clave = (f: string) => {
    const m = f.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    return m ? `${m[3]}-${m[2]}-${m[1]}` : f;
  };
  const itemsMedios: ItemMedio[] = [
    ...mediosOrdenados.map((m): ItemMedio => ({
      clase: m.tipo === 'radio' ? 'radio' : 'nota',
      clave: m.referencia,
      medio: m.medio,
      tipoTexto: TIPO_MEDIO[m.tipo],
      titulo: m.titulo,
      fecha: m.fecha,
      orden: clave(m.fecha),
      url: m.sinEnlace ? null : m.url,
      logo: m.logo && m.logoAutorizado ? m.logo : null,
      faltaLogo: esModoDesarrollo && m.logoAutorizado && !m.logo,
    })),
    ...videosPublicados.map((v): ItemMedio => ({
      clase: 'video',
      clave: v.referencia,
      medio: v.medio,
      titulo: v.titulo,
      fecha: fechaCorta(v.fecha),
      orden: v.fecha ?? '',
      youtubeId: new URL(v.url).searchParams.get('v') ?? v.url.split('/').pop() ?? '',
      // Si el link marca un minuto (…&t=661s), el video arranca ahí: en programas largos, donde aparece Gabriel.
      inicio: Number(new URL(v.url).searchParams.get('t')?.replace(/s$/, '')) || null,
    })),
  ].sort((a, b) => b.orden.localeCompare(a.orden));
  const propuestasOrdenadas = propuestas.map((p) => p.entry).sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  const redes = [
    ['Instagram', contacto.instagram],
    ['Facebook', contacto.facebook],
    ['X', contacto.x],
    ['YouTube', contacto.youtube],
    ['TikTok', contacto.tiktok],
  ].filter(([, url]) => url && !estaPendiente(url));

  return (
    <>
      {/* 1. INICIO */}
      <section className="hero" aria-labelledby="hero-titulo">
        <svg viewBox="0 0 48 42" className="hero__fondo" aria-hidden="true">
          <polygon points="24,4 45,38.5 3,38.5" fill="none" stroke="var(--rojo)" strokeWidth="3" strokeLinejoin="round" />
        </svg>
        <div className="contenedor hero__interior">
          <div className="hero__texto">
            <p className="hero__antetitulo">Gabriel Lombardo – VaLoMi · Vecinos en Alerta de Lomas del Mirador</p>
            <h1 id="hero-titulo" className="hero__titulo">
              Todos sabemos lo que pasa. <span>Con voluntad y sin corrupción, se resuelve.</span>
            </h1>
            <p className="hero__bajada">
              Gabriel Lombardo fundó Vecinos en Alerta de Lomas del Mirador hace más de 30 años, en La Matanza. Se
              reúne con vecinos que sufren la violencia delictiva y lleva sus reclamos a las autoridades. Desde ahora,
              en esta web podrás ver el Informe VaLoMi, con datos, fuentes y su contraste con la realidad.
            </p>
            <div className="botones">
              <a href="#informes" className="boton boton--primario boton--grande">Ver el último informe</a>
              <a href="#propuestas" className="boton boton--claro boton--grande">Mis propuestas</a>
              <a href={URL_MAPA} className="boton boton--claro boton--grande" target="_blank" rel="noopener noreferrer" aria-label="Ver mapa de reportes (se abre en otra pestaña)">Ver mapa de reportes</a>
              <a href={URL_REPORTAR} className="boton boton--claro boton--grande" target="_blank" rel="noopener noreferrer">Reportar un hecho</a>
            </div>
          </div>
          {ultimo && (
            <a href={`/informes/${ultimo.slug}`} className="hero__tarjeta">
              <span className="etiqueta etiqueta--roja">Último informe</span>
              {ultimo.esEjemplo && <SelloEjemplo />}
              <span className="hero__tarjeta-periodo">{etiquetaInforme(ultimo)}</span>
              <span className="hero__tarjeta-fecha">Publicado el {fechaLarga(ultimo.fechaPublicacion)}</span>
              <span className="hero__tarjeta-accion">Ver informe →</span>
            </a>
          )}
        </div>
      </section>

      {/* 2. QUIÉN SOY */}
      <section id="quien-soy" className="seccion" aria-labelledby="qs-titulo">
        <div className="contenedor">
          <header className="seccion__cabecera">
            <p className="seccion__antetitulo">Quién soy</p>
            <h2 id="qs-titulo">Gabriel Lombardo</h2>
          </header>

          <div className={qs.foto ? 'bio' : 'bio bio--sin-foto'}>
            {qs.foto && (
              <figure className="bio__foto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qs.foto} alt={qs.fotoAlt} />
                <figcaption>Gabriel Lombardo, presidente de VaLoMi</figcaption>
              </figure>
            )}
            <div className="bio__texto">
              <p className="bio__parrafo">
                <Texto>{qs.bio.replaceAll('{asaltos}', String(qs.asaltos.cantidad ?? ''))}</Texto>
              </p>
              <blockquote className="cita">
                <p>«{qs.cita}»</p>
                <footer>
                  — Gabriel Lombardo
                  {qs.citaFuente && (
                    <>
                      {', '}
                      {qs.citaUrl ? (
                        <a href={qs.citaUrl} target="_blank" rel="noopener noreferrer">{qs.citaFuente}</a>
                      ) : (
                        qs.citaFuente
                      )}
                    </>
                  )}
                </footer>
              </blockquote>
            </div>
          </div>

          <ul className="datos" aria-label="Gabriel Lombardo en datos">
            <li>
              <span className="datos__valor">{qs.asaltos.cantidad}</span>
              <span className="datos__texto"><Texto>{qs.asaltos.aclaracion}</Texto></span>
              <span className="datos__fuente">
                Fuente:{' '}
                {estaPendiente(qs.asaltos.url) ? (
                  <>{qs.asaltos.fuente} <Texto>{qs.asaltos.url}</Texto></>
                ) : (
                  <a href={qs.asaltos.url} target="_blank" rel="noopener noreferrer">{qs.asaltos.fuente}</a>
                )}
                {qs.asaltos.actualizado && <> · Actualizada al {fechaCorta(qs.asaltos.actualizado)}</>}
              </span>
              {qs.asaltos.antecedentes.length > 0 && (
                <span className="datos__fuente">
                  Antes en la prensa:{' '}
                  {qs.asaltos.antecedentes.map((a, i) => (
                    <span key={i}>
                      {i > 0 && ' · '}
                      {a.cantidad} asaltos (
                      {a.url ? <a href={a.url} target="_blank" rel="noopener noreferrer">{a.fuente}</a> : a.fuente})
                    </span>
                  ))}
                </span>
              )}
            </li>
            <li>
              <span className="datos__valor">200 manzanas</span>
              <span className="datos__texto">recorridas dos veces por semana, en 2021.</span>
              <span className="datos__fuente">Fuente: <a href="https://rivadavia.com.ar/noticias/mejor-ahora/otra-victima-de-la-inseguridad-asesinaron-a-un-kiosquero-en-ramos-mejia" target="_blank" rel="noopener noreferrer">Radio Rivadavia, 08/11/2021</a></span>
            </li>
            {qs.trayectoria && (
              <li>
                <span className="datos__valor datos__valor--texto">{qs.trayectoria}</span>
                <span className="datos__texto">como referente de seguridad para los vecinos y los medios de comunicación.</span>
              </li>
            )}
          </ul>

          {qs.citasPrensa.length > 0 && (
            <div className="palabras">
              <h3>En sus palabras</h3>
              <ul>
                {qs.citasPrensa.map((c) => (
                  <li key={c.fuente}>
                    <blockquote>
                      <p>«{c.texto}»</p>
                      <footer>
                        {estaPendiente(c.url) ? (
                          <>{c.fuente} <Texto>{c.url}</Texto></>
                        ) : (
                          <a href={c.url} target="_blank" rel="noopener noreferrer">{c.fuente}</a>
                        )}
                      </footer>
                    </blockquote>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="historia">
            <div>
              <h3>Historia de VaLoMi</h3>
              <p>
                <Texto>{qs.historia}</Texto>
              </p>
              <h3>Qué hago</h3>
              <ul className="lista-check">
                {qs.queHacemos.map((q) => (
                  <li key={q}><Texto>{q}</Texto></li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Trayectoria</h3>
              <ol className="linea-tiempo">
                {qs.hitos.map((h, i) => (
                  <li key={i}>
                    <span className="linea-tiempo__anio"><Texto>{h.anio}</Texto></span>
                    <strong><Texto>{h.titulo}</Texto></strong>
                    {h.texto && <p><Texto>{h.texto}</Texto></p>}
                    {h.fuente && <p className="linea-tiempo__fuente">Fuente: <Texto>{h.fuente}</Texto></p>}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="valores" aria-labelledby="valores-titulo">
        <div className="contenedor">
          <h2 id="valores-titulo" className="valores__lema">{qs.lema}</h2>
          <ul className="valores__grilla">
            {qs.valores.map((v) => (
              <li key={v.titulo}>
                <h3>{v.titulo}</h3>
                <p><Texto>{v.texto}</Texto></p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. MEDIOS */}
      <section id="medios" className="seccion seccion--gris" aria-labelledby="medios-titulo">
        <div className="contenedor">
          <header className="seccion__cabecera">
            <p className="seccion__antetitulo">Gabriel Lombardo en los medios</p>
            <h2 id="medios-titulo">Una voz consultada sobre seguridad</h2>
            <p className="seccion__bajada">
              Las declaraciones del titular de VaLoMi son consultadas frecuentemente por diarios, radios y canales de
              televisión.
            </p>
          </header>
          <Medios items={itemsMedios} />

          <div className="prensa">
            <div>
              <h3>¿Sos periodista?</h3>
              <p>Para entrevistas, consultas o pedidos de información, escribime.</p>
            </div>
            {estaPendiente(contacto.emailPrensa) ? (
              <span className="boton boton--primario boton--inactivo"><Dato valor={contacto.emailPrensa} falta="correo para medios" /></span>
            ) : (
              <a className="boton boton--primario" href={`mailto:${contacto.emailPrensa}`}>
                <Icono nombre="correo" /> Contacto para medios
              </a>
            )}
          </div>

          <div id="boletin-prensa" className="suscripcion" aria-labelledby="boletin-prensa-titulo">
            <div>
              <h3 id="boletin-prensa-titulo">Recibí el Boletín de prensa</h3>
              <p>Suscribite para recibir comunicados y materiales de prensa de VaLoMi en tu correo.</p>
            </div>
            <Suscripcion lista="prensa" />
          </div>

          <div id="suscripcion" className="suscripcion" aria-labelledby="suscripcion-titulo">
            <div>
              <h3 id="suscripcion-titulo">Recibí el Informe VaLoMi</h3>
              <p>Si querés recibir el informe semanal en tu correo, suscribite.</p>
            </div>
            <Suscripcion lista="informe" />
          </div>
        </div>
      </section>

      {/* 4. INFORME VALOMI */}
      <section id="informes" className="seccion" aria-labelledby="informes-titulo">
        <div className="contenedor">
          <header className="seccion__cabecera">
            <p className="seccion__antetitulo">Informe VaLoMi</p>
            <h2 id="informes-titulo">Lo que pasa en el barrio, con datos y fuentes</h2>
            <p className="seccion__bajada">
              Cada informe separa los datos oficiales verificados de lo que relevan los vecinos y todavía no tiene
              respaldo oficial público. Cada cifra lleva su fuente. Se publica en PDF y en versión web.{' '}
              <a href="#suscripcion">Suscribite para recibirlo cada semana por correo</a>.
            </p>
          </header>
          {ultimo ? (
            <div className="informes">
              <InformeDestacado informe={ultimo} />
              <div className="informes__anteriores">
                <h3>Números anteriores</h3>
                {anteriores.length ? (
                  <ul className="lista-informes">
                    {anteriores.slice(0, 4).map((i) => (
                      <FilaInforme key={i.slug} informe={i} />
                    ))}
                  </ul>
                ) : (
                  <p className="vacio">Este es el primer número. Los próximos van a quedar acá, ordenados por fecha.</p>
                )}
                <Link href="/informes" className="boton boton--secundario">Ver todos los informes</Link>
              </div>
            </div>
          ) : (
            <p className="vacio">Muy pronto publico el Informe VaLoMi N.º 1.</p>
          )}
        </div>
      </section>

      {/* 5. PROPUESTAS */}
      <section id="propuestas" className="seccion seccion--oscura" aria-labelledby="propuestas-titulo">
        <div className="contenedor">
          <header className="seccion__cabecera">
            <p className="seccion__antetitulo">Propuestas para la seguridad</p>
            <h2 id="propuestas-titulo">Propuestas concretas, con seguimiento</h2>
          </header>
          <ul className="propuestas">
            {propuestasOrdenadas.map((p) => (
              <li key={p.titulo} className="propuesta">
                <Icono nombre={p.icono} className="propuesta__icono" />
                <h3>{p.titulo}</h3>
                <p><Texto>{p.resumen}</Texto></p>
                {p.puntos.length > 0 && (
                  <ul>
                    {p.puntos.map((x) => (
                      <li key={x}><Texto>{x}</Texto></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. SEGUIMIENTO Y TRANSPARENCIA: oculta hasta que haya pedidos oficiales publicados */}
      {seguimiento.length > 0 && (
      <section id="seguimiento" className="seccion" aria-labelledby="seguimiento-titulo">
        <div className="contenedor">
          <header className="seccion__cabecera">
            <p className="seccion__antetitulo">Seguimiento y transparencia</p>
            <h2 id="seguimiento-titulo">Qué pedimos y qué se responde</h2>
            <p className="seccion__bajada">
              Seguimos las solicitudes de acceso a la información pública de VaLoMi sobre seguridad,
              fondos y recursos en La Matanza. Distinguimos los actos de trámite de las respuestas sobre el contenido.
            </p>
          </header>
          <p className="seguimiento__datos">
            <strong>{solicitudesSeguimiento.length} solicitudes · {puntosSeguimiento} puntos documentales.</strong>{' '}
            Última actualización: <time dateTime={CORTE_SEGUIMIENTO}>{fechaLarga(CORTE_SEGUIMIENTO)}</time>.
          </p>
          <p className="etiqueta">Actualización propuesta · pendiente de aprobación institucional</p>
          <p>Al {fechaLarga(CORTE_SEGUIMIENTO)}, los {puntosSeguimiento} puntos siguen pendientes de una respuesta de contenido.
            Un pedido de requisitos formales, un acuse automático o la indicación de otro canal no equivalen a entregar la información pedida.</p>
          <p><strong>Plazos pendientes de verificación.</strong> No se señala a un organismo como incumplidor sin verificar antes la fecha de recepción válida y el vencimiento legal.</p>
          <ul className="seguimiento">
              {seguimiento.map((s) => (
                <li key={s.slug} className="seguimiento__item">
                  <div className="seguimiento__meta">
                    <span className="etiqueta">{TIPO_SEGUIMIENTO[s.tipo]}</span>
                    <span className={`estado estado--${s.situacion}`}>{SITUACION[s.situacion]}</span>
                    {s.esEjemplo && <SelloEjemplo />}
                  </div>
                  <h3>{s.titulo}</h3>
                  <p className="seguimiento__datos">
                    Presentación original: {fechaLarga(s.fecha)}
                    {s.organismo && <> · <Texto>{s.organismo}</Texto></>}
                  </p>
                  <p className="seguimiento__datos">
                    {s.puntos != null && <><strong>{s.puntos} puntos documentales.</strong>{' '}</>}
                    {s.fechaActualizacion && <>Última actuación informada: <time dateTime={s.fechaActualizacion}>{fechaLarga(s.fechaActualizacion)}</time>.</>}
                  </p>
                  <Bloques texto={s.descripcion} />
                  {s.documento && (
                    <a className="enlace" href={`/seguimiento/${s.slug}/documento`} target="_blank" rel="noopener">
                      <Icono nombre="documento" /> Ver documento
                    </a>
                  )}
                </li>
              ))}
          </ul>
          <p className="seguimiento__datos">Fuente de esta carga: información de seguimiento aportada por VaLoMi,
            con corte al {fechaLarga(CORTE_SEGUIMIENTO)}. Las constancias y los textos literales que faltan se indican en cada pedido.
            Los documentos solo se incorporan cuando exista una versión pública sin datos personales ni información operativa sensible.</p>
        </div>
      </section>
      )}

      {/* 7. CONTACTO */}
      <section id="contacto" className="seccion seccion--gris" aria-labelledby="contacto-titulo">
        <div className="contenedor contacto">
          <header className="seccion__cabecera">
            <p className="seccion__antetitulo">Contacto</p>
            <h2 id="contacto-titulo">Hablemos</h2>
            <p className="seccion__bajada">
              Para sumarte, acercar una inquietud del barrio o hacer una consulta. Para emergencias, llamá al{' '}
              <a href="tel:911">911</a>.
            </p>
          </header>
          <ul className="contacto__lista">
            <li>
              <Icono nombre="correo" />
              <span>Correo</span>
              {estaPendiente(contacto.email) ? <Dato valor={contacto.email} falta="correo general" /> : <a href={`mailto:${contacto.email}`}>{contacto.email}</a>}
            </li>
            <li>
              <Icono nombre="correo" />
              <span>Medios</span>
              {estaPendiente(contacto.emailPrensa) ? <Dato valor={contacto.emailPrensa} falta="correo para medios" /> : <a href={`mailto:${contacto.emailPrensa}`}>{contacto.emailPrensa}</a>}
            </li>
            {contacto.whatsapp && !estaPendiente(contacto.whatsapp) && (
              <li>
                <Icono nombre="telefono" />
                <span>WhatsApp</span>
                <a href={`https://wa.me/${contacto.whatsapp}`} target="_blank" rel="noopener noreferrer">Escribime por WhatsApp</a>
              </li>
            )}
          </ul>
          <FormularioContacto />
          {redes.length > 0 && (
          <div className="redes">
            <h3>Redes</h3>
            <ul>
              {redes.map(([nombre, url]) =>
                <li key={nombre}><a href={url} target="_blank" rel="noopener noreferrer">{nombre}</a></li>
              )}
            </ul>
          </div>
          )}
        </div>
      </section>
    </>
  );
}

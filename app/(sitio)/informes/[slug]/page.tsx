import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { datosPdf, informe, informesVisibles, versionWeb } from '@/lib/contenido';
import { etiquetaInforme, fechaLarga } from '@/lib/formato';
import { BotonesPdf, ResumenRotulado, SelloEjemplo } from '@/components/Informes';
import { AvisoEmergencia } from '@/components/Estructura';
import { Texto } from '@/components/Texto';

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await informesVisibles()).map((i) => ({ slug: i.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const i = await informe((await params).slug);
  return i ? { title: i.titulo, description: etiquetaInforme(i), alternates: { canonical: `/informes/${i.slug}` } } : {};
}

export default async function PaginaInforme({ params }: Props) {
  const { slug } = await params;
  const i = await informe(slug);
  if (!i) notFound();

  const volver = (
    <Link href="/informes" className="volver">← Todos los informes</Link>
  );

  if (i.estado.discriminant === 'retirado') {
    const r = i.estado.value;
    return (
      <section className="seccion pagina">
        <div className="contenedor contenedor--angosto">
          {volver}
          <h1>{i.titulo}</h1>
          <div className="retirado">
            <h2>Este informe fue retirado el {fechaLarga(r.fechaRetiro)}</h2>
            <p><Texto>{r.motivo}</Texto></p>
          </div>
          <p className="informe__fecha">
            {etiquetaInforme(i)} · Publicado originalmente el {fechaLarga(i.fechaPublicacion)}
          </p>
        </div>
      </section>
    );
  }

  const { bytes, sha256 } = await datosPdf(i.slug, i.pdf);
  const html = await versionWeb(i.slug, i.versionWeb);
  const edicionRevisada = i.numero !== null && i.numero >= 1 && i.numero <= 4;
  return (
    <section className="seccion pagina">
      <div className="contenedor">
        {volver}
        <header className="informe-cabecera">
          <p className="informe__periodo">
            {etiquetaInforme(i)} {i.esEjemplo && <SelloEjemplo />}
          </p>
          <h1>{i.titulo}</h1>
          <p className="informe__fecha">Publicado el {fechaLarga(i.fechaPublicacion)}</p>
        </header>

        <div className="informe-detalle">
          <div className="informe-detalle__lateral">
            <BotonesPdf informe={i} bytes={bytes} />
            {i.numero === 4 && <p><a href="/documentos/informe-4-prensa.pdf?edicion=contraste-v2" download>Descargar PDF para prensa (misma edición revisada)</a></p>}
            {i.resumen && <ResumenRotulado texto={i.resumen} />}
            {i.correcciones.length > 0 && (
              <div className="erratas">
                <h2>Fe de erratas</h2>
                <ul>
                  {i.correcciones.map((c, n) => (
                    <li key={n}>
                      <strong>{fechaLarga(c.fecha)}:</strong> <Texto>{c.descripcion}</Texto>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="original">
              <h2>{edicionRevisada ? 'Documento revisado' : 'Edición web'}</h2>
              <p>{edicionRevisada
                ? 'La descarga corresponde a la edición revisada con la tabla de contrastación ciudadana, también publicada en esta página.'
                : 'La descarga corresponde a la edición web del informe, también publicada en esta página.'}</p>
              {i.numero === 5 ? (
                <p><a href={`/informes/${i.slug}/pdf?archivo=${encodeURIComponent(i.pdf)}`} download={`VaLoMi-${i.slug}.pdf`}>Descargá el PDF</a></p>
              ) : (
                <p><a href={`/documentos/originales/informe-${i.numero}-web.pdf`}>{edicionRevisada ? 'Consultar PDF anterior (archivo)' : 'Consultar PDF original recibido (archivo)'}</a></p>
              )}
              <p className="original__huella">
                Huella SHA-256 del PDF descargable:
                <code>{sha256}</code>
              </p>
            </div>
          </div>
          {html ? (
            <div id="version-web" className="version-web">
              <p className="version-web__rotulo">{edicionRevisada ? 'Versión web del informe · edición revisada con contrastación ciudadana' : 'Versión web del informe · edición web'}</p>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          ) : (
            <object data={`/informes/${i.slug}/pdf`} type="application/pdf" className="visor-pdf" aria-label={`Vista previa: ${i.titulo}`}>
              <p className="vacio">
                Tu navegador no puede mostrar el PDF acá. <a href={`/informes/${i.slug}/pdf`}>Abrilo en otra pestaña</a>.
              </p>
            </object>
          )}
        </div>
      </div>
      <AvisoEmergencia variante="bloque" />
    </section>
  );
}

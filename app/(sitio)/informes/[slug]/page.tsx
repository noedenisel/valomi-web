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
  return i ? { title: i.titulo, description: etiquetaInforme(i) } : {};
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
            {i.numero === 4 && <p><a href="/documentos/informe-4-prensa.pdf" download>Descargar versión de prensa (PDF)</a> · <a href="/documentos/originales/informe-4-prensa.pdf">PDF de prensa recibido</a></p>}
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
              <h2>Documento y diseño</h2>
              <p>El PDF incorpora una maquetación editorial común. Se conserva el documento recibido para consultar y comparar su contenido.</p>
              <p><a href={`/documentos/originales/informe-${i.numero}-web.pdf`}>Consultar PDF recibido</a></p>
              <p className="original__huella">
                Huella SHA-256 del PDF descargable:
                <code>{sha256}</code>
              </p>
            </div>
          </div>
          {html ? (
            <div id="version-web" className="version-web">
              <p className="version-web__rotulo">Versión web del informe · el documento de referencia es el PDF recibido</p>
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

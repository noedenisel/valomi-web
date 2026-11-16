import Link from 'next/link';
import { datosPdf, type Informe } from '@/lib/contenido';
import { etiquetaInforme, fechaLarga, tamano } from '@/lib/formato';
import { Icono } from './Iconos';
import { Texto } from './Texto';

export function SelloEjemplo() {
  return <span className="sello-ejemplo">Ejemplo</span>;
}

export function BotonesPdf({ informe, bytes, conVersionWeb = false }: { informe: Informe; bytes: number; conVersionWeb?: boolean }) {
  const href = `/informes/${informe.slug}/pdf`;
  const detalle = [informe.paginas ? `${informe.paginas} páginas` : null, tamano(bytes)].filter(Boolean).join(', ');
  return (
    <div className="botones">
      {conVersionWeb && informe.versionWeb && (
        <Link className="boton boton--primario" href={`/informes/${informe.slug}#version-web`}>
          <Icono nombre="documento" /> Leer la versión web
        </Link>
      )}
      <a className={`boton ${conVersionWeb && informe.versionWeb ? 'boton--secundario' : 'boton--primario'}`} href={href} download={`VaLoMi-${informe.slug}.pdf`}>
        <Icono nombre="descarga" /> Descargar PDF ({detalle})
      </a>
    </div>
  );
}

export function ResumenRotulado({ texto }: { texto: string }) {
  return (
    <div className="resumen">
      <p className="resumen__rotulo">Resumen de VaLoMi · no forma parte del documento original</p>
      <p>
        <Texto>{texto}</Texto>
      </p>
    </div>
  );
}

export async function InformeDestacado({ informe }: { informe: Informe }) {
  const { bytes } = await datosPdf(informe.slug, informe.pdf);
  return (
    <article className="informe-destacado">
      <div className="informe-destacado__cabecera">
        <span className="etiqueta etiqueta--roja">Último informe</span>
        {informe.esEjemplo && <SelloEjemplo />}
      </div>
      <p className="informe__periodo">{etiquetaInforme(informe)}</p>
      <h3 className="informe-destacado__titulo">
        <Link href={`/informes/${informe.slug}`}>{informe.titulo}</Link>
      </h3>
      <p className="informe__fecha">Publicado el {fechaLarga(informe.fechaPublicacion)}</p>
      {informe.resumen && <ResumenRotulado texto={informe.resumen} />}
      {informe.correcciones.length > 0 && (
        <p className="informe__correccion">Este informe tiene una fe de erratas. <Link href={`/informes/${informe.slug}`}>Ver detalle</Link>.</p>
      )}
      <BotonesPdf informe={informe} bytes={bytes} conVersionWeb />
    </article>
  );
}

export function FilaInforme({ informe }: { informe: Informe }) {
  const retirado = informe.estado.discriminant === 'retirado';
  return (
    <li className={`fila-informe${retirado ? ' fila-informe--retirado' : ''}`}>
      <div className="fila-informe__datos">
        <p className="informe__periodo">{etiquetaInforme(informe)}</p>
        <Link href={`/informes/${informe.slug}`} className="fila-informe__titulo">
          {informe.titulo}
        </Link>
        <p className="informe__fecha">
          Publicado el {fechaLarga(informe.fechaPublicacion)}
          {retirado && ' · Retirado'}
          {informe.correcciones.length > 0 && ' · Con fe de erratas'}
        </p>
      </div>
      <div className="fila-informe__acciones">
        {informe.esEjemplo && <SelloEjemplo />}
        {!retirado && (
          <a className="enlace-pdf" href={`/informes/${informe.slug}/pdf`} download={`VaLoMi-${informe.slug}.pdf`} aria-label={`Descargar PDF: ${informe.titulo}`}>
            <Icono nombre="descarga" /> PDF
          </a>
        )}
      </div>
    </li>
  );
}

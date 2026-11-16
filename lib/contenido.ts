import { createReader } from '@keystatic/core/reader';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import config from '@/keystatic.config';

export const reader = createReader(process.cwd(), config);

type Entrada<T extends keyof typeof reader.collections> = NonNullable<
  Awaited<ReturnType<(typeof reader.collections)[T]['read']>>
>;
export type Informe = Entrada<'informes'> & { slug: string };
export type Seguimiento = Entrada<'seguimiento'> & { slug: string };

const porFechaDesc = (a: { fechaPublicacion: string | null }, b: { fechaPublicacion: string | null }) =>
  (b.fechaPublicacion ?? '').localeCompare(a.fechaPublicacion ?? '');

/** Solo informes aprobados, del más reciente al más antiguo. */
export async function informesPublicados(): Promise<Informe[]> {
  const todos = await reader.collections.informes.all();
  return todos
    .map(({ slug, entry }) => ({ ...entry, slug }))
    .filter((i) => i.estado.discriminant === 'aprobado')
    .sort(porFechaDesc);
}

/** Aprobados y retirados: los retirados conservan su dirección con un aviso. Los borradores no existen para la web. */
export async function informesVisibles(): Promise<Informe[]> {
  const todos = await reader.collections.informes.all();
  return todos
    .map(({ slug, entry }) => ({ ...entry, slug }))
    .filter((i) => i.estado.discriminant !== 'borrador')
    .sort(porFechaDesc);
}

export async function informe(slug: string): Promise<Informe | null> {
  const entry = await reader.collections.informes.read(slug);
  if (!entry || entry.estado.discriminant === 'borrador') return null;
  return { ...entry, slug };
}

export async function seguimientoPublicado(): Promise<Seguimiento[]> {
  const todos = await reader.collections.seguimiento.all();
  return todos
    .map(({ slug, entry }) => ({ ...entry, slug }))
    .filter((s) => s.publicado)
    .sort((a, b) => (b.fecha ?? '').localeCompare(a.fecha ?? ''));
}

export const rutaPdfInforme = (slug: string, archivo: string) =>
  join(process.cwd(), 'content', 'informes-pdf', slug, archivo);

export const rutaVersionWeb = (slug: string, archivo: string) =>
  join(process.cwd(), 'content', 'informes-html', slug, archivo);

/**
 * Versión web del informe: toma solo el <article class="vv"> y le quita lo que podría ejecutar código
 * (scripts, estilos propios, iframes, atributos on*, links javascript:). El texto no se toca.
 */
export async function versionWeb(slug: string, archivo: string | null) {
  if (!archivo) return null;
  let html: string;
  try {
    html = await readFile(rutaVersionWeb(slug, archivo), 'utf8');
  } catch {
    return null;
  }
  const inicio = html.search(/<article[^>]*class=["'][^"']*\bvv\b/i);
  if (inicio >= 0) {
    const fin = html.lastIndexOf('</article>');
    html = html.slice(inicio, fin >= 0 ? fin + '</article>'.length : undefined);
  }
  return html
    .replace(/<(script|style|iframe|object|embed)[\s\S]*?<\/\1>/gi, '')
    .replace(/<(script|style|iframe|object|embed|link|meta)\b[^>]*\/?>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    // Solo se conserva el ancho de las barras de los gráficos (style="width:73.4%"); cualquier otro estilo se quita.
    .replace(/\sstyle\s*=\s*("[^"]*"|'[^']*')/gi, (m, v) => (/^["']\s*width:\s*[\d.]+%;?\s*["']$/.test(v) ? m : ''))
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"')
    .replace(/<a\s+href="(https?:\/\/[^"]+)"/gi, '<a href="$1" target="_blank" rel="noopener noreferrer"');
}

export type InformeObservatorio = Entrada<'observatorio'> & { slug: string };

/** Datos del informe mensual tal como los exporta el panel de la PWA (formato valomi-observatorio-1). */
export type DatosObservatorio = {
  formato: string;
  titulo: string;
  leyenda: string;
  periodo: string;
  total: number;
  porEstado: Record<'sin-verificar' | 'revisado' | 'corroborado', number>;
  porCategoria: Record<string, Record<'sin-verificar' | 'revisado' | 'corroborado', number>>;
  categorias: { id: string; nombre: string }[];
  celdas: { id: string; lon: number; lat: number; cantidad: number }[];
  sinZona: number;
  limite: [number, number][];
  generado: number;
  demo: boolean;
};

/**
 * Informes mensuales aprobados del Observatorio Vecinal, del más reciente al más antiguo.
 * Los de EJEMPLO solo existen en desarrollo: nunca llegan a la web publicada.
 */
export async function observatorioPublicados(): Promise<InformeObservatorio[]> {
  const todos = await reader.collections.observatorio.all();
  return todos
    .map(({ slug, entry }) => ({ ...entry, slug }))
    .filter((i) => i.estado.discriminant === 'aprobado' && (esModoDesarrollo || !i.esEjemplo))
    .sort((a, b) => b.periodo.localeCompare(a.periodo));
}

export async function informeObservatorio(slug: string): Promise<InformeObservatorio | null> {
  const entry = await reader.collections.observatorio.read(slug);
  if (!entry || entry.estado.discriminant === 'borrador' || (!esModoDesarrollo && entry.esEjemplo)) return null;
  return { ...entry, slug };
}

export const rutaPdfObservatorio = (slug: string, archivo: string) => join(process.cwd(), 'content', 'observatorio-pdf', slug, archivo);

export async function datosObservatorio(slug: string, archivo: string): Promise<DatosObservatorio> {
  return JSON.parse(await readFile(join(process.cwd(), 'content', 'observatorio-datos', slug, archivo), 'utf8'));
}

/** Tamaño y huella SHA-256 del PDF del Observatorio. */
export async function datosPdfObservatorio(slug: string, archivo: string) {
  const datos = await readFile(rutaPdfObservatorio(slug, archivo));
  return { bytes: datos.byteLength, sha256: createHash('sha256').update(datos).digest('hex') };
}

export const rutaDocSeguimiento = (slug: string, archivo: string) =>
  join(process.cwd(), 'content', 'seguimiento-docs', slug, archivo);

/** Tamaño y huella SHA-256 del PDF, para que cualquiera pueda verificar que no fue alterado. */
export async function datosPdf(slug: string, archivo: string) {
  const datos = await readFile(rutaPdfInforme(slug, archivo));
  return {
    bytes: datos.byteLength,
    sha256: createHash('sha256').update(datos).digest('hex'),
  };
}

export const esModoDesarrollo = process.env.NODE_ENV !== 'production';

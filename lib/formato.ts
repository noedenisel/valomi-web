const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

function partes(iso: string) {
  const [a, m, d] = iso.split('-').map(Number);
  return { a, m, d };
}

/** 2026-10-27 → 27 de octubre de 2026 */
export function fechaLarga(iso: string | null) {
  if (!iso) return '';
  const { a, m, d } = partes(iso);
  return `${d} de ${MESES[m - 1]} de ${a}`;
}

/** 2026-10-27 → 27/10/2026 */
export function fechaCorta(iso: string | null) {
  if (!iso) return '';
  const { a, m, d } = partes(iso);
  return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${a}`;
}

/** Etiqueta del período cubierto: «Semana del 19 al 25 de octubre de 2026». */
export function periodo(desde: string | null, hasta: string | null) {
  if (!desde || !hasta) return '';
  const x = partes(desde);
  const y = partes(hasta);
  const dias = (y.a - x.a) * 365 + (y.m - x.m) * 30 + (y.d - x.d);
  const prefijo = dias <= 7 ? 'Semana del' : 'Del';
  if (x.a !== y.a) return `${prefijo} ${fechaLarga(desde)} al ${fechaLarga(hasta)}`;
  if (x.m !== y.m) return `${prefijo} ${x.d} de ${MESES[x.m - 1]} al ${y.d} de ${MESES[y.m - 1]} de ${y.a}`;
  return `${prefijo} ${x.d} al ${y.d} de ${MESES[y.m - 1]} de ${y.a}`;
}

/** Nombre visible de un informe: «N.º 1 · Octubre 2026», o el período si no hay edición. */
export function etiquetaInforme(i: { numero: number | null; edicion: string; periodoDesde: string | null; periodoHasta: string | null }) {
  const nombre = i.edicion || periodo(i.periodoDesde, i.periodoHasta);
  return i.numero ? `N.º ${i.numero}${nombre ? ` · ${nombre}` : ''}` : nombre;
}

export function tamano(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} MB`;
}

export const PATRON_PENDIENTE = /(\[CONFIRMAR[^\]]*\]|\[EJEMPLO\])/g;

export const estaPendiente = (t: string | null | undefined) => !t || /\[CONFIRMAR/.test(t);

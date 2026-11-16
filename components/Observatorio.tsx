import type { DatosObservatorio } from '@/lib/contenido';

// Observatorio Vecinal: piezas de la página de un informe mensual.
// Solo cantidades: sin textos de reportes, sin conclusiones y sin comparaciones entre meses.

export const ESTADOS = [
  { id: 'sin-verificar', nombre: 'Sin verificar' },
  { id: 'revisado', nombre: 'Revisados por VaLoMi' },
  { id: 'corroborado', nombre: 'Corroborados' },
] as const;

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
export function nombreMes(periodo: string) {
  const [a, m] = periodo.split('-').map(Number);
  return `${MESES[m - 1]} de ${a}`;
}

export function Totales({ d }: { d: DatosObservatorio }) {
  return (
    <ul className="obs-totales" aria-label="Totales del mes">
      <li className="obs-total"><span>Total recibidos</span><strong>{d.total}</strong></li>
      {ESTADOS.map((e) => (
        <li key={e.id} className={`obs-total obs-total--${e.id}`}><span>{e.nombre}</span><strong>{d.porEstado[e.id]}</strong></li>
      ))}
    </ul>
  );
}

/** Barras por categoría divididas por estado (HTML, para que el texto mantenga su tamaño). La tabla tiene los mismos datos. */
export function Grafico({ d }: { d: DatosObservatorio }) {
  const filas = d.categorias.map((c) => ({ ...c, valores: ESTADOS.map((e) => d.porCategoria[c.id]?.[e.id] ?? 0) }));
  const maximo = Math.max(1, ...filas.map((f) => f.valores.reduce((a, b) => a + b, 0)));
  return (
    <figure className="obs-figura">
      <ul className="obs-barras" aria-hidden="true">
        {filas.map((f) => {
          const total = f.valores.reduce((a, b) => a + b, 0);
          return (
            <li key={f.id}>
              <span className="obs-barras__nombre">{f.nombre}</span>
              <span className="obs-barras__pista">
                {f.valores.map((v, j) =>
                  v ? <i key={j} className={`obs-barra obs-barra--${ESTADOS[j].id}`} style={{ width: `${(v / maximo) * 100}%` }} /> : null
                )}
                <b>{total}</b>
              </span>
            </li>
          );
        })}
      </ul>
      <figcaption className="obs-leyenda-estados">
        <span className="oculto-visual">Gráfico de reportes por categoría y estado. Los mismos datos están en la tabla por categorías.</span>
        {ESTADOS.map((e) => <span key={e.id}><i className={`obs-muestra obs-barra--${e.id}`} aria-hidden="true" />{e.nombre}</span>)}
      </figcaption>
    </figure>
  );
}

export function Tabla({ d }: { d: DatosObservatorio }) {
  return (
    <div className="tabla-desplazable">
      <table className="obs-tabla">
        <caption>Reportes ciudadanos recibidos por categoría y estado, {nombreMes(d.periodo)}</caption>
        <thead>
          <tr><th scope="col">Categoría</th>{ESTADOS.map((e) => <th key={e.id} scope="col">{e.nombre}</th>)}<th scope="col">Total</th></tr>
        </thead>
        <tbody>
          {d.categorias.map((c) => {
            const v = ESTADOS.map((e) => d.porCategoria[c.id]?.[e.id] ?? 0);
            return <tr key={c.id}><th scope="row">{c.nombre}</th>{v.map((n, i) => <td key={i}>{n}</td>)}<td>{v.reduce((a, b) => a + b, 0)}</td></tr>;
          })}
        </tbody>
        <tfoot>
          <tr><th scope="row">Total</th>{ESTADOS.map((e) => <td key={e.id}>{d.porEstado[e.id]}</td>)}<td>{d.total}</td></tr>
        </tfoot>
      </table>
    </div>
  );
}

/** Mapa de calor por zonas de 200 m sobre el límite del barrio. Nunca usa puntos exactos. */
export function MapaCalor({ d }: { d: DatosObservatorio }) {
  const lons = d.limite.map((c) => c[0]);
  const lats = d.limite.map((c) => c[1]);
  const [x0, x1, y0, y1] = [Math.min(...lons), Math.max(...lons), Math.min(...lats), Math.max(...lats)];
  const cos = Math.cos((-34.665 * Math.PI) / 180);
  const ANCHO = 520;
  const escala = ANCHO / ((x1 - x0) * cos);
  const ALTO = (y1 - y0) * escala;
  const P = (lon: number, lat: number) => [(lon - x0) * cos * escala, (y1 - lat) * escala];
  const lado = 0.0018 * escala;
  const maximo = Math.max(1, ...d.celdas.map((c) => c.cantidad));
  return (
    <figure className="obs-figura">
      <svg viewBox={`-10 -10 ${ANCHO + 20} ${ALTO + 20}`} role="img" aria-labelledby="obs-mapa-titulo">
        {/* Un solo texto: React necesita que el <title> de un SVG sea una cadena única. */}
        <title id="obs-mapa-titulo">{`Mapa de calor de Lomas del Mirador por zonas de unas dos manzanas: ${d.celdas.length} zonas con reportes. Los totales están en la tabla.`}</title>
        <polygon points={d.limite.map((c) => P(...c).join(',')).join(' ')} className="obs-barrio" />
        {d.celdas.map((c) => {
          const [x, y] = P(c.lon, c.lat);
          return <rect key={c.id} x={x - lado / 2} y={y - lado / 2} width={lado} height={lado} className="obs-celda" style={{ opacity: 0.2 + 0.75 * (c.cantidad / maximo) }} />;
        })}
      </svg>
      <figcaption className="ayuda-obs">
        Cada cuadrado es una zona de unas dos manzanas; cuanto más intenso, más reportes. {d.sinZona}{' '}
        {d.sinZona === 1 ? 'reporte no tiene' : 'reportes no tienen'} zona publicada: se cuentan en la tabla, no en el mapa.
      </figcaption>
    </figure>
  );
}

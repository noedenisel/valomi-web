import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

function contar(dir: string): number {
  return readdirSync(dir).reduce((n, f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return n + contar(p);
    if (!p.endsWith('.yaml')) return n;
    const texto = readFileSync(p, 'utf8');
    if (/^visible: false$/m.test(texto)) return n;
    return n + (texto.match(/\[CONFIRMAR/g)?.length ?? 0);
  }, 0);
}

/** Solo en desarrollo: recuerda cuántos datos faltan y da acceso al panel. */
export function BarraDesarrollo() {
  if (process.env.NODE_ENV === 'production') return null;
  // Igual que scripts/verificar-contenido.mjs: contenidos del panel más textos fijos de las páginas.
  const paginas = (dir: string): number =>
    readdirSync(dir).reduce((n, f) => {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) return n + paginas(p);
      if (!p.endsWith('.tsx')) return n;
      return n + (readFileSync(p, 'utf8').match(/\[CONFIRMAR:[^\]$]*\]/g)?.length ?? 0);
    }, 0);
  const pendientes = contar(join(process.cwd(), 'content')) + paginas(join(process.cwd(), 'app', '(sitio)'));
  return (
    <aside className="barra-dev" aria-label="Herramientas de desarrollo">
      <strong>Versión de prueba</strong>
      <span>
        <mark className="pendiente">{pendientes}</mark> datos para confirmar
      </span>
      <a href="/keystatic">Abrir panel de administración</a>
    </aside>
  );
}

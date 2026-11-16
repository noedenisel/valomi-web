// Revisa el contenido antes de compilar.
// - Lista los datos marcados [CONFIRMAR] y los contenidos de EJEMPLO.
// - Con VALOMI_ENTORNO=produccion, si queda alguno, frena la publicación.
// Uso: npm run pendientes
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const raiz = join(import.meta.dirname, '..', 'content');
const produccion = process.env.VALOMI_ENTORNO === 'produccion';
const lista = process.argv.includes('--lista');

function archivos(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? archivos(p) : p.endsWith('.yaml') ? [p] : [];
  });
}

const pendientes = [];
const ejemplos = [];
for (const archivo of archivos(raiz)) {
  const rel = relative(join(raiz, '..'), archivo);
  const texto = readFileSync(archivo, 'utf8');
  // Lo que está oculto en la web no frena la publicación.
  if (/^(visible|publicado): false$/m.test(texto)) continue;
  for (const m of texto.matchAll(/\[CONFIRMAR[^\]]*\]/g)) pendientes.push(`${rel}: ${m[0]}`);
  if (/^esEjemplo: true$/m.test(texto) || texto.includes('[EJEMPLO]')) ejemplos.push(rel);
}

// Las páginas legales y la portada también tienen textos fijos con datos a confirmar.
const paginas = join(raiz, '..', 'app', '(sitio)');
function tsx(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? tsx(p) : p.endsWith('.tsx') ? [p] : [];
  });
}
for (const archivo of tsx(paginas)) {
  const rel = relative(join(raiz, '..'), archivo);
  for (const m of readFileSync(archivo, 'utf8').matchAll(/\[CONFIRMAR:[^\]$]*\]/g)) pendientes.push(`${rel}: ${m[0]}`);
}

if (lista || pendientes.length || ejemplos.length) {
  console.log(`\nDatos pendientes de confirmar: ${pendientes.length}`);
  if (lista) pendientes.forEach((p) => console.log('  · ' + p));
  console.log(`Contenidos de EJEMPLO: ${ejemplos.length}`);
  if (lista) ejemplos.forEach((e) => console.log('  · ' + e));
  if (!lista) console.log('Para ver el detalle: npm run pendientes');
}

if (produccion && (pendientes.length || ejemplos.length)) {
  console.error('\nPublicación frenada: hay datos sin confirmar o contenidos de ejemplo.\n');
  process.exit(1);
}

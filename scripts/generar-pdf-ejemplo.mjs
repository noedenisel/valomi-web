// Genera PDFs de EJEMPLO para probar la sección de informes.
// Uso: node scripts/generar-pdf-ejemplo.mjs <salida.pdf> "Línea 1" "Línea 2" ...
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const [salida, ...lineas] = process.argv.slice(2);
const esc = (t) => t.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

let y = 760;
const texto = [
  'BT /F1 28 Tf 0.78 0.06 0.18 rg 56 780 Td (DOCUMENTO DE EJEMPLO) Tj ET',
  ...lineas.map((l, i) => {
    y -= i === 0 ? 40 : 22;
    return `BT /F1 ${i === 0 ? 16 : 12} Tf 0.12 0.14 0.16 rg 56 ${y} Td (${esc(l)}) Tj ET`;
  }),
].join('\n');

const objetos = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
  `<< /Length ${Buffer.byteLength(texto, 'latin1')} >>\nstream\n${texto}\nendstream`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
];

let pdf = '%PDF-1.4\n';
const offsets = [];
objetos.forEach((o, i) => {
  offsets.push(Buffer.byteLength(pdf, 'latin1'));
  pdf += `${i + 1} 0 obj\n${o}\nendobj\n`;
});
const xref = Buffer.byteLength(pdf, 'latin1');
pdf += `xref\n0 ${objetos.length + 1}\n0000000000 65535 f \n`;
pdf += offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('');
pdf += `trailer\n<< /Size ${objetos.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

mkdirSync(dirname(salida), { recursive: true });
writeFileSync(salida, Buffer.from(pdf, 'latin1'));

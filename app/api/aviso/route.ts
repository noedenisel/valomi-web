import { appendFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const respuesta = (status: number, mensaje: string) => Response.json({ mensaje }, { status });

/** Listas de Brevo: suscripción al Informe VaLoMi y aviso de lanzamiento del mapa. */
const LISTAS = {
  informe: process.env.BREVO_LIST_ID_INFORME,
  mapa: process.env.BREVO_LIST_ID,
} as const;

/**
 * Suscribirse a una lista de correo.
 * Con BREVO_API_KEY: alta en Brevo con doble confirmación (el vecino confirma desde su correo).
 * Sin clave, en local: se guarda en data/avisos-prueba.csv para probar el formulario.
 */
export async function POST(req: Request) {
  const datos = await req.json().catch(() => null);
  if (!datos || typeof datos !== 'object') return respuesta(400, 'No pude leer el formulario.');
  // Campo trampa: las personas no lo ven; si viene completo, es un robot. Se responde "ok" sin guardar nada.
  if (datos.sitio) return respuesta(200, 'ok');
  const lista = datos.lista === 'informe' ? 'informe' : 'mapa';
  const email = String(datos.email ?? '').trim().toLowerCase();
  if (email.length > 254 || !EMAIL.test(email)) return respuesta(400, 'Revisá el correo: parece que no está bien escrito.');
  if (datos.acepto !== true) return respuesta(400, 'Para anotarte tenés que aceptar la política de privacidad.');

  const clave = process.env.BREVO_API_KEY;
  if (clave && LISTAS[lista]) {
    const r = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
      method: 'POST',
      headers: { 'api-key': clave, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        email,
        includeListIds: [Number(LISTAS[lista])],
        templateId: Number(process.env.BREVO_DOI_TEMPLATE_ID),
        redirectionUrl: process.env.BREVO_REDIRECT_URL,
      }),
    });
    if (!r.ok) {
      console.error('Brevo respondió', r.status, await r.text());
      return respuesta(502, 'No pude anotarte ahora. Probá de nuevo en un rato.');
    }
    return respuesta(200, 'ok');
  }

  if (process.env.NODE_ENV !== 'production') {
    const dir = join(process.cwd(), 'data');
    await mkdir(dir, { recursive: true });
    await appendFile(join(dir, 'avisos-prueba.csv'), `${new Date().toISOString()},${lista},${email}\n`);
    return respuesta(200, 'ok');
  }
  return respuesta(503, 'La suscripción todavía no está habilitada.');
}

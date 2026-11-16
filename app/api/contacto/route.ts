import { appendFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import nodemailer from 'nodemailer';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const respuesta = (status: number, mensaje: string) => Response.json({ mensaje }, { status });

const MENSAJE_MIN = 10;
const MENSAJE_MAX = 1500;

/**
 * Formulario de contacto: el mensaje llega por correo a info@valomi.com.ar.
 * Con SMTP_HOST, SMTP_USUARIO y SMTP_CLAVE: se envía desde la casilla del dominio (DonWeb).
 * Sin ellas, en local: se guarda en data/contactos-prueba.csv para probar el formulario.
 */
export async function POST(req: Request) {
  const datos = await req.json().catch(() => null);
  if (!datos || typeof datos !== 'object') return respuesta(400, 'No pude leer el formulario.');
  // Campo trampa: las personas no lo ven; si viene completo, es un robot. Se responde "ok" sin enviar nada.
  if (datos.sitio) return respuesta(200, 'ok');

  const nombre = String(datos.nombre ?? '').trim().slice(0, 100);
  const email = String(datos.email ?? '').trim().toLowerCase();
  const mensaje = String(datos.mensaje ?? '').trim();
  if (email.length > 254 || !EMAIL.test(email)) return respuesta(400, 'Revisá el correo: parece que no está bien escrito.');
  if (mensaje.length < MENSAJE_MIN) return respuesta(400, 'Escribí tu mensaje para que pueda responderte.');
  if (mensaje.length > MENSAJE_MAX) return respuesta(400, `El mensaje puede tener hasta ${MENSAJE_MAX} caracteres.`);
  if (datos.acepto !== true) return respuesta(400, 'Para escribirme tenés que aceptar la política de privacidad.');

  const destino = process.env.CONTACTO_DESTINO || 'info@valomi.com.ar';
  const { SMTP_HOST, SMTP_USUARIO, SMTP_CLAVE } = process.env;
  if (SMTP_HOST && SMTP_USUARIO && SMTP_CLAVE) {
    try {
      const puerto = Number(process.env.SMTP_PUERTO) || 465;
      await nodemailer
        .createTransport({ host: SMTP_HOST, port: puerto, secure: puerto === 465, auth: { user: SMTP_USUARIO, pass: SMTP_CLAVE } })
        .sendMail({
          from: `"Web VaLoMi" <${SMTP_USUARIO}>`,
          to: destino,
          replyTo: email,
          subject: 'Consulta desde la web de VaLoMi',
          text: `Nombre: ${nombre || '(no indicó)'}\nCorreo: ${email}\n\n${mensaje}\n`,
        });
      return respuesta(200, 'ok');
    } catch (e) {
      console.error('No se pudo enviar el contacto', e);
      return respuesta(502, 'No pude enviar tu mensaje ahora. Probá de nuevo en un rato o escribime a info@valomi.com.ar.');
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    const dir = join(process.cwd(), 'data');
    await mkdir(dir, { recursive: true });
    await appendFile(join(dir, 'contactos-prueba.csv'), `${JSON.stringify([new Date().toISOString(), nombre, email, mensaje])}\n`);
    return respuesta(200, 'ok');
  }
  return respuesta(503, 'El formulario todavía no está habilitado. Escribime a info@valomi.com.ar.');
}

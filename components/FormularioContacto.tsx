'use client';

import { useId, useState } from 'react';

type Estado = { tipo: 'inicio' } | { tipo: 'enviando' } | { tipo: 'listo' } | { tipo: 'error'; mensaje: string };

/** Formulario de contacto de la sección «Hablemos»: el mensaje le llega a info@valomi.com.ar. */
export function FormularioContacto() {
  const [estado, setEstado] = useState<Estado>({ tipo: 'inicio' });
  const id = useId();

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setEstado({ tipo: 'enviando' });
    try {
      const r = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          nombre: form.get('nombre'),
          email: form.get('email'),
          mensaje: form.get('mensaje'),
          acepto: form.get('acepto') === 'si',
          sitio: form.get('sitio'),
        }),
      });
      const datos = await r.json().catch(() => ({}));
      setEstado(r.ok ? { tipo: 'listo' } : { tipo: 'error', mensaje: datos.mensaje ?? 'No pude enviar tu mensaje.' });
    } catch {
      setEstado({ tipo: 'error', mensaje: 'No hay conexión. Probá de nuevo.' });
    }
  }

  if (estado.tipo === 'listo') {
    return (
      <p className="aviso-lanzamiento__listo" role="status">
        ¡Gracias! Recibí tu mensaje y te respondo a tu correo.
      </p>
    );
  }

  return (
    <form className="contacto-form" onSubmit={enviar} noValidate>
      <h3>Escribime desde acá</h3>
      <label htmlFor={`${id}-nombre`}>Tu nombre (opcional)</label>
      <input id={`${id}-nombre`} name="nombre" type="text" autoComplete="name" maxLength={100} />
      <label htmlFor={`${id}-email`}>Tu correo</label>
      <input id={`${id}-email`} name="email" type="email" autoComplete="email" inputMode="email" required placeholder="nombre@correo.com" />
      <label htmlFor={`${id}-mensaje`}>Tu mensaje</label>
      <textarea id={`${id}-mensaje`} name="mensaje" rows={5} required minLength={10} maxLength={1500} />
      <div className="aviso-lanzamiento__trampa" aria-hidden="true">
        <label htmlFor={`${id}-sitio`}>No completar</label>
        <input id={`${id}-sitio`} name="sitio" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="aviso-lanzamiento__acepto">
        <input type="checkbox" name="acepto" value="si" required />
        <span>
          Acepto la <a href="/privacidad">política de privacidad</a>. Uso tus datos solo para responderte.
        </span>
      </label>
      {estado.tipo === 'error' && (
        <p className="aviso-lanzamiento__error" role="alert">{estado.mensaje}</p>
      )}
      <button type="submit" className="boton boton--primario" disabled={estado.tipo === 'enviando'}>
        {estado.tipo === 'enviando' ? 'Enviando…' : 'Enviar mensaje'}
      </button>
    </form>
  );
}

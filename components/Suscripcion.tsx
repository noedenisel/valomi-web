'use client';

import { useId, useState } from 'react';

type Estado = { tipo: 'inicio' } | { tipo: 'enviando' } | { tipo: 'listo' } | { tipo: 'error'; mensaje: string };

/** Cada lista de Brevo tiene sus propios textos: el informe por correo o el aviso de lanzamiento del mapa. */
const TEXTOS = {
  informe: {
    boton: 'Suscribirme',
    acepto: 'Acepto recibir el Informe VaLoMi semanal por correo y la',
    listo: '¡Listo! Te voy a escribir para confirmar tu correo. Después vas a recibir el informe cada semana.',
  },
  mapa: {
    boton: 'Avisame',
    acepto: 'Acepto recibir el aviso del lanzamiento y la',
    listo: '¡Listo! Te voy a escribir para confirmar tu correo. Cuando lance el mapa, te aviso.',
  },
} as const;

export type Lista = keyof typeof TEXTOS;

export function Suscripcion({ lista }: { lista: Lista }) {
  const [estado, setEstado] = useState<Estado>({ tipo: 'inicio' });
  const id = useId();
  const t = TEXTOS[lista];

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setEstado({ tipo: 'enviando' });
    try {
      const r = await fetch('/api/aviso', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ lista, email: form.get('email'), acepto: form.get('acepto') === 'si', sitio: form.get('sitio') }),
      });
      const datos = await r.json().catch(() => ({}));
      setEstado(r.ok ? { tipo: 'listo' } : { tipo: 'error', mensaje: datos.mensaje ?? 'No pude anotarte.' });
    } catch {
      setEstado({ tipo: 'error', mensaje: 'No hay conexión. Probá de nuevo.' });
    }
  }

  if (estado.tipo === 'listo') {
    return (
      <p className="aviso-lanzamiento__listo" role="status">
        {t.listo}
      </p>
    );
  }

  return (
    <form className="aviso-lanzamiento" onSubmit={enviar} noValidate>
      <label htmlFor={`${id}-email`}>Tu correo</label>
      <div className="aviso-lanzamiento__fila">
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" inputMode="email" required placeholder="nombre@correo.com" />
        <button type="submit" className="boton boton--primario" disabled={estado.tipo === 'enviando'}>
          {estado.tipo === 'enviando' ? 'Enviando…' : t.boton}
        </button>
      </div>
      <div className="aviso-lanzamiento__trampa" aria-hidden="true">
        <label htmlFor={`${id}-sitio`}>No completar</label>
        <input id={`${id}-sitio`} name="sitio" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="aviso-lanzamiento__acepto">
        <input type="checkbox" name="acepto" value="si" required />
        <span>
          {t.acepto} <a href="/privacidad#aviso-lanzamiento">política de privacidad</a>. Solo uso tu correo para esto y
          te podés dar de baja cuando quieras.
        </span>
      </label>
      {estado.tipo === 'error' && (
        <p className="aviso-lanzamiento__error" role="alert">{estado.mensaje}</p>
      )}
    </form>
  );
}

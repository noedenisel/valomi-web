'use client';

import { useState } from 'react';
import { Texto } from './Texto';
import { Icono } from './Iconos';

export type ItemMedio =
  | {
      clase: 'nota' | 'radio';
      clave: string;
      medio: string;
      tipoTexto: string;
      titulo: string;
      fecha: string;
      orden: string;
      url: string | null;
      logo: string | null;
      faltaLogo: boolean;
    }
  | {
      clase: 'video';
      clave: string;
      medio: string;
      titulo: string;
      fecha: string;
      orden: string;
      youtubeId: string;
      inicio: number | null;
    };

const FILTROS = [
  { id: 'todo', texto: 'Todo' },
  { id: 'nota', texto: 'Notas' },
  { id: 'video', texto: 'Videos' },
  { id: 'radio', texto: 'Radio' },
] as const;

const DE_A = 12;

/** El reproductor de YouTube se carga recién cuando el visitante toca "play". */
function Video({ item }: { item: Extract<ItemMedio, { clase: 'video' }> }) {
  const [activo, setActivo] = useState(false);
  return (
    <li className="medio medio--video">
      <div className="video-marco">
        {activo ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0${item.inicio ? `&start=${item.inicio}` : ''}`}
            title={item.titulo}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" className="video-marco__portada" onClick={() => setActivo(true)} aria-label={`Reproducir: ${item.titulo}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" />
            <span className="video-marco__play" aria-hidden="true">▶</span>
          </button>
        )}
      </div>
      <p className="medio__tipo">Video · {item.medio}</p>
      <p className="medio__titulo">{item.titulo}</p>
      <p className="medio__fecha">
        {item.fecha}
        {item.inicio ? ` · desde el minuto ${Math.floor(item.inicio / 60)}:${String(item.inicio % 60).padStart(2, '0')}` : ''}
      </p>
      <a href={`https://www.youtube.com/watch?v=${item.youtubeId}${item.inicio ? `&t=${item.inicio}s` : ''}`} target="_blank" rel="noopener noreferrer" className="enlace">
        Ver en YouTube <Icono nombre="externo" />
      </a>
    </li>
  );
}

function Nota({ item }: { item: Exclude<ItemMedio, { clase: 'video' }> }) {
  return (
    <li className="medio">
      {item.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.logo} alt={item.medio} className="medio__logo" />
      ) : (
        <p className="medio__nombre">{item.medio}</p>
      )}
      {item.faltaLogo && <Texto>[CONFIRMAR: subir logo]</Texto>}
      <p className="medio__tipo">{item.tipoTexto}</p>
      <p className="medio__titulo"><Texto>{item.titulo}</Texto></p>
      <p className="medio__fecha"><Texto>{item.fecha}</Texto></p>
      {item.url === null ? null : /\[CONFIRMAR/.test(item.url) || !item.url ? (
        <span className="medio__sin-link"><Texto>{item.url || '[CONFIRMAR: link]'}</Texto></span>
      ) : (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="enlace">
          {item.clase === 'radio' ? 'Escuchar' : 'Ver nota'} <Icono nombre="externo" />
        </a>
      )}
    </li>
  );
}

export function Medios({ items }: { items: ItemMedio[] }) {
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]['id']>('todo');
  const [cantidad, setCantidad] = useState(DE_A);
  const visibles = items.filter((i) => filtro === 'todo' || i.clase === filtro);

  return (
    <>
      <div className="filtros" role="group" aria-label="Filtrar por tipo">
        {FILTROS.map((f) => {
          const total = f.id === 'todo' ? items.length : items.filter((i) => i.clase === f.id).length;
          return (
            <button
              key={f.id}
              type="button"
              className="filtro"
              aria-pressed={filtro === f.id}
              onClick={() => {
                setFiltro(f.id);
                setCantidad(DE_A);
              }}
            >
              {f.texto} <span className="filtro__total">{total}</span>
            </button>
          );
        })}
      </div>
      <ul className="medios">
        {visibles.slice(0, cantidad).map((i) =>
          i.clase === 'video' ? <Video key={i.clave} item={i} /> : <Nota key={i.clave} item={i} />
        )}
      </ul>
      {visibles.length > cantidad && (
        <div className="medios__mas">
          <button type="button" className="boton boton--secundario" onClick={() => setCantidad((c) => c + DE_A)}>
            Ver más ({visibles.length - cantidad})
          </button>
        </div>
      )}
    </>
  );
}

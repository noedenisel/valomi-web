import { Texto } from './Texto';

/** Muestra un texto largo: los párrafos se separan con una línea en blanco y las líneas que empiezan con «- » forman una lista. */
export function Bloques({ texto }: { texto: string | null | undefined }) {
  if (!texto) return null;
  return (
    <>
      {texto.split(/\n\s*\n/).map((bloque, i) => {
        const lineas = bloque.split('\n').map((l) => l.trim()).filter(Boolean);
        if (lineas.length > 0 && lineas.every((l) => l.startsWith('- '))) {
          return (
            <ul key={i} className="seguimiento__lista">
              {lineas.map((l, j) => <li key={j}><Texto>{l.slice(2)}</Texto></li>)}
            </ul>
          );
        }
        return <p key={i}><Texto>{lineas.join(' ')}</Texto></p>;
      })}
    </>
  );
}

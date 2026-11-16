import { PATRON_PENDIENTE } from '@/lib/formato';

/** Muestra un texto resaltando los datos [CONFIRMAR: …] y [EJEMPLO]. */
export function Texto({ children }: { children: string | null | undefined }) {
  if (!children) return null;
  return (
    <>
      {children.split(PATRON_PENDIENTE).map((parte, i) =>
        // split con grupo de captura: las posiciones impares son las marcas
        i % 2 === 1 ? (
          <mark key={i} className="pendiente">{parte}</mark>
        ) : (
          parte
        )
      )}
    </>
  );
}

/** Para campos que pueden estar vacíos: si faltan, muestra qué hay que confirmar. */
export function Dato({ valor, falta }: { valor: string | null | undefined; falta: string }) {
  return <Texto>{valor && valor.trim() ? valor : `[CONFIRMAR: ${falta}]`}</Texto>;
}

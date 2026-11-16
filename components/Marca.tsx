/** Símbolo provisional: triángulo rojo de alerta. */
export function Triangulo({ className, titulo }: { className?: string; titulo?: string }) {
  return (
    <svg
      viewBox="0 0 48 42"
      className={className}
      role={titulo ? 'img' : undefined}
      aria-hidden={titulo ? undefined : true}
      aria-label={titulo}
    >
      <polygon points="24,4 45,38.5 3,38.5" fill="var(--rojo)" stroke="var(--rojo)" strokeWidth="6" strokeLinejoin="round" />
      <rect x="21.6" y="14" width="4.8" height="14" rx="2.4" fill="#fff" />
      <circle cx="24" cy="32.6" r="2.7" fill="#fff" />
    </svg>
  );
}

export function Logotipo({ claro = false }: { claro?: boolean }) {
  return (
    <span className={`logotipo${claro ? ' logotipo--claro' : ''}`}>
      <Triangulo className="logotipo__simbolo" />
      <span className="logotipo__texto">
        <span className="logotipo__nombre">Gabriel Lombardo</span>
        <span className="logotipo__org">VaLoMi</span>
      </span>
    </span>
  );
}

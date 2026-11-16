const trazo = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const formas: Record<string, React.ReactNode> = {
  camara: (
    <>
      <path d="M3 8.5 15.5 5l1.6 5.6L4.6 14z" />
      <path d="m17 9 3.5-1.2.8 3-3.6 1" />
      <path d="M8 13.3 9 18H4" />
    </>
  ),
  luz: (
    <>
      <path d="M12 3v2M5.6 5.6 7 7M3 12h2M19 12h2M17 7l1.4-1.4" />
      <path d="M8.5 15a5 5 0 1 1 7 0c-.8.7-1.2 1.6-1.2 2.5V18h-4.6v-.5c0-.9-.4-1.8-1.2-2.5z" />
      <path d="M10 21h4" />
    </>
  ),
  parada: (
    <>
      <path d="M6 21V4" />
      <rect x="6" y="4" width="9" height="6" rx="1.2" />
      <path d="M13 21v-6h6v6M12 21h9" />
    </>
  ),
  patrullaje: (
    <>
      <path d="M3 16v-3.5l2.2-4.5h10.6L19 12.5H21V16z" />
      <path d="M9 5h4M11 5V8" />
      <circle cx="7" cy="16.5" r="1.8" />
      <circle cx="17" cy="16.5" r="1.8" />
    </>
  ),
  documento: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 15.5h6M9 9h2" />
    </>
  ),
  descarga: (
    <>
      <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19h14" />
    </>
  ),
  externo: (
    <>
      <path d="M14 5h5v5M19 5l-8 8M17 14v5H5V7h5" />
    </>
  ),
  telefono: (
    <>
      <path d="M5 4h4l1.5 4.5-2.2 1.4a11 11 0 0 0 5.8 5.8l1.4-2.2L20 15v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
    </>
  ),
  correo: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m3.5 6.5 8.5 7 8.5-7" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
};

export function Icono({ nombre, className }: { nombre: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? 'icono'} aria-hidden="true" {...trazo}>
      {formas[nombre] ?? formas.documento}
    </svg>
  );
}

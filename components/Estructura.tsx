import Link from 'next/link';
import { Logotipo, Triangulo } from './Marca';
import { Icono } from './Iconos';
import { observatorioPublicados, seguimientoPublicado } from '@/lib/contenido';

const SECCIONES = [
  { href: '/#quien-soy', texto: 'Quién soy' },
  { href: '/#medios', texto: 'Medios' },
  { href: '/#informes', texto: 'Informes' },
  { href: '/#propuestas', texto: 'Propuestas' },
  { href: '/#seguimiento', texto: 'Seguimiento' },
  { href: '/observatorio', texto: 'Observatorio' },
  { href: '/#contacto', texto: 'Contacto' },
];

/** «Seguimiento» y «Observatorio» aparecen en el menú recién cuando tienen algo publicado. */
async function secciones() {
  const [seguimiento, observatorio] = await Promise.all([seguimientoPublicado(), observatorioPublicados()]);
  return SECCIONES.filter(
    (s) => (s.href !== '/#seguimiento' || seguimiento.length > 0) && (s.href !== '/observatorio' || observatorio.length > 0)
  );
}

export function AvisoEmergencia({ variante = 'barra' }: { variante?: 'barra' | 'bloque' }) {
  return (
    <div className={`aviso aviso--${variante}`} role="note" aria-label="Aviso sobre emergencias">
      <div className="contenedor aviso__interior">
        <Triangulo className="aviso__icono" />
        <p>
          Esta web no es un canal oficial de emergencias. Ante una emergencia llamá al{' '}
          <a href="tel:911" className="aviso__911">911</a>. Para realizar una denuncia formal, acudí a la comisaría o a la
          fiscalía.
        </p>
      </div>
    </div>
  );
}

export async function Encabezado() {
  const lista = await secciones();
  return (
    <header className="encabezado">
      <div className="contenedor encabezado__interior">
        <Link href="/" className="encabezado__marca" aria-label="Gabriel Lombardo – VaLoMi, inicio">
          <Logotipo />
        </Link>
        <nav aria-label="Principal" className="nav nav--escritorio">
          {lista.map((s) => (
            <a key={s.href} href={s.href}>{s.texto}</a>
          ))}
        </nav>
        <details className="nav-movil">
          <summary aria-label="Abrir menú">
            <Icono nombre="menu" />
            <span>Menú</span>
          </summary>
          <nav aria-label="Principal (móvil)" className="nav-movil__panel">
            {lista.map((s) => (
              <a key={s.href} href={s.href}>{s.texto}</a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}

export async function Pie() {
  const lista = await secciones();
  return (
    <footer className="pie">
      <div className="contenedor pie__interior">
        <div className="pie__marca">
          <Logotipo claro />
          <p>Vecinos en Alerta de Lomas del Mirador · La Matanza, provincia de Buenos Aires.</p>
          <p className="pie__lema">La seguridad no tiene color político.</p>
        </div>
        <nav aria-label="Secciones" className="pie__col">
          <h2>Secciones</h2>
          {lista.map((s) => (
            <a key={s.href} href={s.href}>{s.texto}</a>
          ))}
          <Link href="/informes">Archivo de informes</Link>
        </nav>
        <nav aria-label="Legales" className="pie__col">
          <h2>Legales</h2>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/terminos">Términos de uso</Link>
          <Link href="/aviso-legal">Aviso legal</Link>
        </nav>
      </div>
      <div className="contenedor pie__aviso">
        <p>
          Esta web no es un canal oficial de emergencias. Ante una emergencia llamá al <a href="tel:911">911</a>. Para
          realizar una denuncia formal, acudí a la comisaría o a la fiscalía.
        </p>
      </div>
    </footer>
  );
}

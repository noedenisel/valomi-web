import type { Metadata, Viewport } from 'next';
import { Archivo, Public_Sans } from 'next/font/google';
import { AvisoEmergencia, Encabezado, Pie } from '@/components/Estructura';
import { BarraDesarrollo } from '@/components/BarraDesarrollo';
import '../globals.css';
import { esProduccionPublica, URL_PUBLICA } from '@/lib/publicacion';

const titulo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--fuente-titulo', display: 'swap' });
const texto = Public_Sans({ subsets: ['latin'], variable: '--fuente-texto', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(URL_PUBLICA),
  title: {
    default: 'Gabriel Lombardo – VaLoMi | Vecinos en Alerta de Lomas del Mirador',
    template: '%s | Gabriel Lombardo – VaLoMi',
  },
  description:
    'Vecinos en Alerta de Lomas del Mirador, La Matanza. Gabriel Lombardo: trayectoria, Informe VaLoMi, propuestas y seguimiento de la seguridad. Todos sabemos lo que pasa. Con voluntad y sin corrupción, se resuelve.',
  // Producción es pública; Preview y Development siguen fuera del índice.
  robots: esProduccionPublica() ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: '#1b1e22' };

export default function LayoutSitio({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${titulo.variable} ${texto.variable}`}>
      <body>
        <a href="#contenido" className="saltar">Saltar al contenido</a>
        <AvisoEmergencia />
        <Encabezado />
        <main id="contenido">{children}</main>
        <Pie />
        <BarraDesarrollo />
      </body>
    </html>
  );
}

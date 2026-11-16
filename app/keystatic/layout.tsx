import { notFound } from 'next/navigation';
import KeystaticApp from './keystatic';
import { adminHabilitado } from '@/lib/admin';

export const metadata = { title: 'Administración · VaLoMi', robots: { index: false, follow: false } };

export default function LayoutAdmin() {
  if (!adminHabilitado()) notFound();
  return (
    <html lang="es-AR">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}

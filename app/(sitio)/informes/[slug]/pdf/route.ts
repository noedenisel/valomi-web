import { readFile } from 'node:fs/promises';
import { informe, informesPublicados, rutaPdfInforme } from '@/lib/contenido';

// Solo se generan los PDF de informes aprobados: los borradores y los retirados no tienen URL.
export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await informesPublicados()).map((i) => ({ slug: i.slug }));
}

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = await informe(slug);
  if (!i || i.estado.discriminant !== 'aprobado') return new Response('No encontrado', { status: 404 });
  const datos = await readFile(rutaPdfInforme(slug, i.pdf));
  return new Response(new Uint8Array(datos), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="VaLoMi-${slug}.pdf"`,
      'Cache-Control': 'public, max-age=300, must-revalidate',
    },
  });
}

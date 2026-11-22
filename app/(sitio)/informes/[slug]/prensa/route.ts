import { readFile } from 'node:fs/promises';
import { informe, informesPublicados, rutaPdfPrensa } from '@/lib/contenido';

// Solo se generan los PDF de prensa disponibles de informes aprobados.
export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await informesPublicados()).filter((i) => i.pdfPrensa).map((i) => ({ slug: i.slug }));
}

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = await informe(slug);
  if (!i || i.estado.discriminant !== 'aprobado' || !i.pdfPrensa) return new Response('No encontrado', { status: 404 });
  const datos = await readFile(rutaPdfPrensa(slug, i.pdfPrensa));
  const nombre = `VaLoMi-${slug.replace(/[^a-zA-Z0-9_-]/g, '-')}-prensa.pdf`;
  return new Response(new Uint8Array(datos), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${nombre}"`,
      'Cache-Control': 'public, max-age=300, must-revalidate',
    },
  });
}

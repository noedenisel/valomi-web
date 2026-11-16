import { readFile } from 'node:fs/promises';
import { reader, rutaDocSeguimiento, seguimientoPublicado } from '@/lib/contenido';

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await seguimientoPublicado()).filter((s) => s.documento).map((s) => ({ slug: s.slug }));
}

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await reader.collections.seguimiento.read(slug);
  if (!s || !s.publicado || !s.documento) return new Response('No encontrado', { status: 404 });
  const datos = await readFile(rutaDocSeguimiento(slug, s.documento));
  return new Response(new Uint8Array(datos), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="VaLoMi-${slug}.pdf"`,
    },
  });
}

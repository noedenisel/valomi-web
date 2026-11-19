import type { MetadataRoute } from 'next';
import { informesPublicados } from '@/lib/contenido';
import { esProduccionPublica, URL_PUBLICA } from '@/lib/publicacion';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!esProduccionPublica()) return [];
  const informes = await informesPublicados();
  return [
    ...['/', '/informes', '/privacidad', '/terminos', '/aviso-legal'].map((ruta) => ({ url: `${URL_PUBLICA}${ruta}` })),
    ...informes.map((informe) => ({ url: `${URL_PUBLICA}/informes/${informe.slug}` })),
  ];
}

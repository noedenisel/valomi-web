import type { MetadataRoute } from 'next';
import { esProduccionPublica, URL_PUBLICA } from '@/lib/publicacion';

export default function robots(): MetadataRoute.Robots {
  if (!esProduccionPublica()) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/keystatic/'] },
    sitemap: `${URL_PUBLICA}/sitemap.xml`,
  };
}

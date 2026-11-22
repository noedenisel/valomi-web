import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  // Los PDF de informes viven en /content y se sirven por una ruta propia
  // que solo expone los aprobados; hay que incluirlos en el paquete.
  outputFileTracingIncludes: {
    '/informes/[slug]/pdf': ['./content/informes-pdf/**/*'],
    '/informes/[slug]/prensa': ['./content/informes-prensa/**/*'],
    '/seguimiento/[slug]/documento': ['./content/seguimiento-docs/**/*'],
    '/observatorio/[slug]/pdf': ['./content/observatorio-pdf/**/*'],
    '/observatorio/[slug]': ['./content/observatorio-datos/**/*'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;

/** El destino real de Vercel prevalece sobre la antigua bandera manual. */
export function esProduccionPublica(entorno: { VERCEL_ENV?: string; VALOMI_ENTORNO?: string } = { VERCEL_ENV: process.env.VERCEL_ENV, VALOMI_ENTORNO: process.env.VALOMI_ENTORNO }) {
  if (entorno.VERCEL_ENV) return entorno.VERCEL_ENV === 'production';
  return entorno.VALOMI_ENTORNO === 'produccion';
}
export const URL_PUBLICA = 'https://valomi.com.ar';
export const URL_MAPA = 'https://valomi.online/mapa';

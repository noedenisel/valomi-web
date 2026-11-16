/**
 * El panel escribe en los archivos del proyecto cuando corre en local.
 * En producción solo se habilita con GitHub como almacenamiento: así cada cambio
 * pasa por el inicio de sesión de GitHub (con doble factor) y queda en el historial.
 */
export function adminHabilitado() {
  if (process.env.NODE_ENV !== 'production') return true;
  return process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === 'github';
}

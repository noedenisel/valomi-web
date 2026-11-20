/** Formularios públicos proporcionados por VaLoMi; cada publicación tiene un enlace propio. */
export const SUSCRIPCIONES = {
  informe: {
    url: 'https://backend.envialosimple.com/form/renderwidget/format/html/AdministratorID/205581/FormID/1/Lang/es',
    boton: 'Suscribirme al Informe VaLoMi',
  },
  prensa: {
    url: 'https://backend.envialosimple.com/form/renderwidget/format/html/AdministratorID/205581/FormID/2/Lang/es',
    boton: 'Suscribirme al Boletín de prensa',
  },
} as const;

export type ListaSuscripcion = keyof typeof SUSCRIPCIONES;

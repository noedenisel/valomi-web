/** Carga informada por VaLoMi para revisión institucional; no reemplaza constancias oficiales. */
export const FECHA_TRANSPARENCIA = '2026-11-19';
export const FUENTE_TRANSPARENCIA = 'Información de seguimiento aportada por VaLoMi, con corte al 19 de noviembre de 2026.';
export const REGLA_PLAZOS = 'No se señala a un organismo como incumplidor sin verificar antes el vencimiento legal y la fecha de recepción válida. Mientras esa verificación esté pendiente, el plazo se informa como pendiente de verificación.';
export const ESTADOS_SOLICITUD = [
  'Solicitud enviada', 'Recepción confirmada', 'Subsanación presentada', 'Trámite registrado',
  'En plazo de respuesta', 'Prórroga comunicada', 'Respuesta parcial', 'Respuesta completa',
  'Denegatoria', 'Plazo vencido sin respuesta', 'Reclamo presentado',
] as const;
export type EstadoSolicitud = (typeof ESTADOS_SOLICITUD)[number];
export type SolicitudPublica = {
  id: string; organismo: string; nombreCorto: string; hora: string; puntos: number;
  objeto: string; marco: string; estado: EstadoSolicitud; actualizacion: string; notaFecha?: string;
  explicacion: string; pendientes: string; documento: string;
};
export const SOLICITUDES: readonly SolicitudPublica[] = [
  { id: 'seguridad-pba', organismo: 'Ministerio de Seguridad de la Provincia de Buenos Aires', nombreCorto: 'Seguridad PBA', hora: '13:42', puntos: 14,
    objeto: 'Normas de emergencia en seguridad, contrataciones, Comandos de Patrullas y cuadrículas, recorridas, móviles y efectivos, gastos, fondos y denuncias 2023–2026.', marco: 'Ley 12.475 y Decreto 2549/04.',
    estado: 'Subsanación presentada', actualizacion: '2026-11-16', notaFecha: 'Fecha informada, a confirmar con la constancia.',
    explicacion: 'El 5 de noviembre el área provincial pidió cumplir requisitos formales. VaLoMi informó el envío de la nota firmada el 16 de noviembre. Esto no equivale a una respuesta sobre el contenido.',
    pendientes: 'Faltan la constancia de recepción, el número de expediente y la respuesta sobre los 14 puntos.', documento: 'Nota de subsanación informada. Versión pública y constancia pendientes.' },
  { id: 'economia-pba', organismo: 'Ministerio de Economía de la Provincia de Buenos Aires', nombreCorto: 'Economía PBA', hora: '13:45', puntos: 6,
    objeto: 'Fondos municipales de seguridad de 2016, Decreto 371/2025, distribución 2025, transferencias provinciales desde 2020, fondos nacionales 2020–2021 y rendiciones.', marco: 'Ley 12.475 y Decreto 2549/04.',
    estado: 'Subsanación presentada', actualizacion: '2026-11-16', notaFecha: 'Fecha informada, a confirmar con la constancia.',
    explicacion: 'El 10 de noviembre el organismo pidió completar requisitos formales. VaLoMi informó el envío de la nota firmada el 16 de noviembre. No se informó una entrega de la documentación solicitada.',
    pendientes: 'Faltan la constancia de recepción, el expediente y la entrega de la documentación.', documento: 'Nota de subsanación informada. Versión pública y constancia pendientes.' },
  { id: 'municipalidad', organismo: 'Municipalidad de La Matanza', nombreCorto: 'Municipalidad', hora: '13:55', puntos: 11,
    objeto: 'Presupuestos y ejecuciones de seguridad 2020–2026, ingresos por origen, transferencias y rendiciones, licitaciones y compras, tasas, inventario de móviles, respaldo de las cifras de patrulleros, motos y efectivos anunciadas en julio de 2026, cámaras, Guardia Urbana y operativos de saturación.',
    marco: 'Destinatario: Intendente Municipal, con copia pedida a Protección Ciudadana y Hacienda.',
    estado: 'Solicitud enviada', actualizacion: '2026-11-04',
    explicacion: 'En el material informado por VaLoMi no hay respuesta ni constancia de recepción. El plazo legal todavía no está verificado.',
    pendientes: 'Faltan la constancia de recepción y la respuesta sobre el contenido.', documento: 'Correo de presentación informado. Tenor literal y versión pública pendientes.' },
  { id: 'concejo', organismo: 'Honorable Concejo Deliberante de La Matanza', nombreCorto: 'Concejo Deliberante', hora: '13:59', puntos: 6,
    objeto: 'Ordenanzas fiscales e impositivas, presupuestos, rendiciones, convenios de seguridad, pedidos de informes y una eventual ordenanza municipal de acceso a la información.', marco: '',
    estado: 'Recepción confirmada', actualizacion: '2026-11-04',
    explicacion: 'El 4 de noviembre hubo un acuse automático por vía electrónica. No es una constancia de ingreso administrativo formal ni una respuesta sobre el contenido. El plazo legal todavía no está verificado.',
    pendientes: 'Faltan la constancia de ingreso administrativo formal y la respuesta de contenido.', documento: 'Acuse automático informado. Versión pública pendiente.' },
  { id: 'seguridad-nacion', organismo: 'Ministerio de Seguridad de la Nación', nombreCorto: 'Seguridad Nación', hora: '14:01', puntos: 5,
    objeto: 'Programa Nacional de Fortalecimiento de Seguridad 2020–2021, transferencias, despliegues de fuerzas federales, aportes nacionales desde 2024 y estadísticas SNIC.', marco: 'Ley 27.275.',
    estado: 'Trámite registrado', actualizacion: '2026-11-19', notaFecha: 'Carga en TAD informada el 19 de noviembre; fecha exacta, constancia y expediente pendientes.',
    explicacion: 'El 4 de noviembre, a las 21:04, Alejandro Salesi, de la Dirección Nacional de Transparencia e Integridad, recomendó presentar el pedido por TAD. Esa nota indica un canal; no entrega la información pedida. VaLoMi informó la carga en TAD el 19 de noviembre.',
    pendientes: 'Faltan la fecha exacta de carga en TAD, la constancia, el número de expediente y la respuesta sobre el contenido.', documento: 'Correo de orientación a TAD informado. Constancia de carga y versión pública pendientes.' },
  { id: 'procuracion', organismo: 'Procuración General de la Provincia de Buenos Aires', nombreCorto: 'Procuración', hora: '14:04', puntos: 4,
    objeto: 'Investigaciones penales preparatorias por homicidios consumados y tentados, totalidad de IPP por delito, metodología y población de referencia.', marco: '',
    estado: 'Solicitud enviada', actualizacion: '2026-11-04',
    explicacion: 'En el material informado por VaLoMi no hay respuesta ni constancia de recepción. El régimen de plazo todavía no está verificado.',
    pendientes: 'Faltan la constancia de recepción y la respuesta sobre el contenido.', documento: 'Correo de presentación informado. Tenor literal y versión pública pendientes.' },
];
export type ActuacionPublica = { id: string; solicitud: string; fecha: string; hora?: string; actuacion: string; resultado: string; documento: string; reserva?: string };
export const ACTUACIONES: readonly ActuacionPublica[] = [
  ...SOLICITUDES.map((s) => ({ id: `envio-${s.id}`, solicitud: s.id, fecha: '2026-11-04', hora: s.hora,
    actuacion: 'Presentación de la solicitud por correo.', resultado: `Solicitud enviada: ${s.puntos} puntos documentales.`,
    documento: 'Correo de presentación informado por VaLoMi; versión pública no adjuntada.' })),
  { id: 'orientacion-tad', solicitud: 'seguridad-nacion', fecha: '2026-11-04', hora: '21:04',
    actuacion: 'Orientación sobre el canal de presentación.', resultado: 'Alejandro Salesi, de la Dirección Nacional de Transparencia e Integridad, recomienda canalizar el pedido por TAD. No es una entrega de información.',
    documento: 'Correo del 4/11/2026 informado por VaLoMi; versión pública no adjuntada.' },
  { id: 'requisitos-seguridad', solicitud: 'seguridad-pba', fecha: '2026-11-05', actuacion: 'Requerimiento de requisitos formales.',
    resultado: 'El área provincial pide cumplir requisitos formales de la Ley 12.475. No entrega información sobre el contenido.', documento: 'Requerimiento del 5/11/2026 informado por VaLoMi; versión pública no adjuntada.' },
  { id: 'requisitos-economia', solicitud: 'economia-pba', fecha: '2026-11-10', actuacion: 'Requerimiento de requisitos formales.',
    resultado: 'El organismo pide completar requisitos formales. No entrega la documentación solicitada.', documento: 'Correo del 10/11/2026 informado por VaLoMi; versión pública no adjuntada.' },
  { id: 'subsanacion-seguridad', solicitud: 'seguridad-pba', fecha: '2026-11-16', actuacion: 'Envío informado de la nota firmada de subsanación.',
    resultado: 'Subsanación presentada; recepción y expediente pendientes.', reserva: 'Fecha informada, a confirmar con la constancia.', documento: 'Nota de subsanación: falta una versión pública depurada y la constancia.' },
  { id: 'subsanacion-economia', solicitud: 'economia-pba', fecha: '2026-11-16', actuacion: 'Envío informado de la nota firmada de subsanación.',
    resultado: 'Subsanación presentada; recepción y expediente pendientes.', reserva: 'Fecha informada, a confirmar con la constancia.', documento: 'Nota de subsanación: falta una versión pública depurada y la constancia.' },
  { id: 'carga-tad', solicitud: 'seguridad-nacion', fecha: '2026-11-19', actuacion: 'Se informa la carga del pedido en TAD.',
    resultado: 'Trámite registrado, según lo informado por VaLoMi. Constancia y expediente pendientes.', reserva: 'El 19 de noviembre es la fecha de la comunicación, no una fecha exacta de carga verificada.', documento: 'Constancia de TAD pendiente de incorporación.' },
];
export const TEMAS_TRANSPARENCIA = [
  { id: 'presupuesto', titulo: 'Presupuesto', pedido: 'A la Municipalidad: presupuestos y ejecuciones de seguridad 2020–2026, recaudación de tasas, licitaciones y compras. Al Concejo: presupuestos, rendiciones de cuentas y ordenanzas fiscales e impositivas. A la Provincia: gastos de combustible y mantenimiento de móviles, entre otros ítems de ejecución.',
    mostrar: 'Créditos aprobados, fondos recibidos, contrataciones y gasto ejecutado, cada uno por separado. Una partida aprobada no prueba un gasto. Una licitación no prueba un pago.' },
  { id: 'fondos', titulo: 'Fondos', pedido: 'A Nación: actos y fondos del Programa Nacional de Fortalecimiento de Seguridad 2020–2021, transferencias y aportes desde 2024. A Economía PBA: fondo municipal de 2016, Decreto 371/2025, distribución 2025, transferencias provinciales desde 2020, fondos nacionales 2020–2021 y rendiciones. A Seguridad PBA: el mismo fondo y las rendiciones municipales. A la Municipalidad: ingresos por origen, transferencias y rendiciones.',
    mostrar: 'Cuánto se asignó por norma, cuánto se transfirió, cuánto se ejecutó y qué rendiciones existen, con fechas. Si dos organismos informan cifras distintas, se muestran las dos con su fuente y se deja planteada la diferencia, sin formular una acusación a partir de ella.' },
  { id: 'moviles', titulo: 'Patrulleros y motos', pedido: 'A la Municipalidad: inventario de móviles y respaldo de las cifras de patrulleros, motos y efectivos anunciadas en julio de 2026. A Seguridad PBA: móviles asignados a La Matanza, en especial a Lomas del Mirador, por mes desde 2021, distinguiendo patrulleros, camionetas y motos; cuántos estuvieron en servicio, en reparación o fuera de servicio, con altas y bajas; y la asignación agregada por Comando.',
    mostrar: 'La cifra anunciada, el inventario, los vehículos en servicio, los que estén en reparación y la asignación territorial, cada una con su fuente. Un vehículo inventariado no se da por operativo si el documento no lo dice.' },
  { id: 'camaras', titulo: 'Cámaras', pedido: 'A la Municipalidad: información sobre cámaras de seguridad.',
    mostrar: 'Cantidad instalada, cantidad operativa, fuente de financiamiento y evolución en el tiempo. Si el documento no hace esa distinción, se publica lo que dice y se aclara lo que no dice.' },
  { id: 'patrullaje', titulo: 'Patrullaje', pedido: 'A Seguridad PBA: norma de organización de los Comandos de Patrullas y las cuadrículas de La Matanza; frecuencia de recorridas prevista, en especial en Lomas del Mirador; reportes mensuales agregados de cumplimiento de 2025 y 2026, con el sistema que los registra y sus auditorías. A la Municipalidad: Guardia Urbana y operativos de saturación.',
    mostrar: 'La planificación por sectores y los registros agregados de cumplimiento. No se publican posiciones en tiempo real, recorridos tácticos ni información que permita anticipar el servicio.' },
  { id: 'estadisticas', titulo: 'Estadísticas delictivas', pedido: 'A Seguridad PBA: denuncias por delito en las comisarías de La Matanza, por tipo, barrio y mes, de 2023 a 2026, si el Ministerio las procesa. A Nación: estadísticas SNIC de homicidios y delitos. A la Procuración: IPP por homicidios consumados y tentados, totalidad de IPP por delito, metodología y población de referencia.',
    mostrar: 'Cada serie por separado, con su unidad de medida, período, cobertura y fuente. Una denuncia policial, un hecho del SNIC y una investigación penal preparatoria no son lo mismo. No se suman ni se restan como si hablaran de idénticos hechos.' },
] as const;
export const CONTENIDO_PENDIENTE = 'Al 19 de noviembre de 2026 no hay, en el material disponible, un documento oficial que responda este apartado. Cuando llegue, se va a publicar acá con su fuente, su fecha y el punto de la solicitud al que corresponde.';
export const TOTAL_PUNTOS = SOLICITUDES.reduce((total, s) => total + s.puntos, 0);

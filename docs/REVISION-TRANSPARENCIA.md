# Transparencia y Seguridad Pública · propuesta para aprobación

Ruta: `/transparencia`. Fecha de corte: 19 de noviembre de 2026.

[Vista previa en Vercel](https://valomi-git-propuesta-transparencia-noedenisels-projects.vercel.app/transparencia). Requiere iniciar sesión con acceso al proyecto. Las capturas de esta revisión corresponden al servidor local con el mismo código compilado; la protección de la vista previa se conserva.

**No es una publicación definitiva.** Las indicaciones de VaLoMi requieren aprobación de Gabriel Armando Lombardo, titular de la organización, o de quien él designe. Esta entrega permanece en una rama de propuesta; no se integra en producción sin esa aprobación. La página muestra el aviso de revisión y lleva `noindex`.

## Resultado preparado

- Página larga con presentación, índice inicial y sumario plegable en móvil.
- Tabla accesible de las seis solicitudes, con los cinco encabezados pedidos y enlaces a sus explicaciones.
- Estados de la carga: dos subsanaciones presentadas, dos solicitudes enviadas, una recepción confirmada por acuse automático y un trámite registrado informado por TAD, sin constancia adjunta.
- Doce hitos cronológicos, cada uno con organismo, actuación, fecha, resultado y respaldo identificado, sin enlaces ficticios.
- Seis fichas de documentos y seis temas: presupuesto, fondos, móviles, cámaras, patrullaje y estadísticas delictivas.
- Indicadores: seis pedidos, 46 puntos, cero respuestas completas, cero parciales y 46 pendientes de contenido. Las constancias formales permanecen pendientes de completar; no se sustituyeron por un recuento de cero.
- Fuentes, responsable institucional, fecha de actualización y reglas de protección de datos.
- Enlace «Transparencia» junto a Informes en menú de escritorio, móvil y pie.
- El bloque de seguimiento de la portada se convierte en resumen y enlace al registro, para no mostrar estados genéricos y fechas legales aproximadas de la edición anterior.

## Reservas documentales

La fuente de esta carga es la información de seguimiento aportada por VaLoMi en sus indicaciones del 19/11/2026. No se incorporó la planilla interna de seguimiento, ni se recibieron notas de subsanación, correos, acuses, constancias de recepción o TAD, expedientes ni versiones públicas depuradas de esos documentos.

Los resúmenes existentes del sitio tampoco contienen el tenor literal individualizado de los 46 puntos. Por eso la propuesta muestra fichas y objetos resumidos, no una transcripción inventada ni descargas vacías. Para completar el repositorio faltan esos textos y los respaldos publicables, sin datos de identidad, domicilios, teléfonos privados, firmas ni datos operativos sensibles. La planilla interna completa no debe subirse al sitio.

Las fechas del 16/11 quedan expresamente sujetas a constancia. El 19/11 de Nación es la fecha de la comunicación de la carga en TAD; no se presenta como la fecha exacta de carga. El acuse del Concejo no se equipara a ingreso administrativo formal. Los plazos permanecen pendientes de verificación y no hay etiquetas de incumplimiento, semáforos ni cálculos automáticos de mora.

## Capturas

- [Página en escritorio](vistas/transparencia/transparencia-1440.png)
- [Página en móvil](vistas/transparencia/transparencia-390.png)
- [Tabla en escritorio](vistas/transparencia/solicitudes-1440.png)
- [Tabla en móvil](vistas/transparencia/solicitudes-390.png)
- [Página completa en escritorio](vistas/transparencia/transparencia-completa-1440.png)
- [Página completa en móvil](vistas/transparencia/transparencia-completa-390.png)

## Verificación

Compilación de Next.js y TypeScript correctas. Navegador Chromium a 1440, 1000, 768, 390 y 360 px: tabla con seis filas y estados exactos, doce hitos completos, seis temas, seis fichas, indicadores, anclas, navegación desde portada, índice plegable y desplazamiento horizontal por teclado. No se detecta desborde horizontal de página ni errores JavaScript en esos casos. La página no contiene formularios, campos de entrada, descargas de esos trámites ni datos de identidad. Título SEO, `lang="es-AR"`, fecha al pie y `noindex` verificados.

Los datos se centralizan en `lib/transparencia.ts`. Cada carga futura debe conservar el estado documentado, los cinco campos de actuación y actualizar la fecha de corte. No se debe habilitar un enlace documental hasta contar con su versión pública revisada.

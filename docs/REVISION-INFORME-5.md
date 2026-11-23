# Informe VaLoMi N.º 5 · revisión del 23/11/2026

La vista previa publica únicamente la edición web del informe de la semana del 16 al 22 de noviembre de 2026. La fecha editorial sigue siendo el 22/11/2026. Producción aún no se modificó y sigue pendiente el archivo del logo oficial para completar la marca de agua.

## Cambios pedidos en esta revisión

- Se reemplazaron exactamente dos rótulos «Denuncias vecinales sin confirmar» por «Reportes de vecinos»: el encabezado de la tabla «Dónde» y el comienzo de la nota vecinal. El cambio se aplica al artículo web y a su PDF descargable.
- Se conserva la aclaración «Son publicaciones de vecinos en redes, no hechos comprobados por la Policía ni por la Justicia», además de la advertencia final. El nuevo rótulo no presenta los reportes como hechos corroborados.
- El enlace «Consultar PDF original recibido (archivo)» pasa a decir «Descargá el PDF» y descarga el PDF maquetado actual, igual que el botón principal. La ficha del informe 5 ya no enlaza el original recibido.
- El PDF de prensa del informe 5 se reserva para mail marketing: se retiraron su enlace, la ruta `/informes/<slug>/prensa`, el archivo servido desde `public` y el archivo de descarga. El HTML editorial y la captura de prensa también quedan fuera de esta rama. El material se conserva localmente para el envío; no se enviaron correos ni se modificó EnvíaloSimple.
- Los enlaces históricos del informe 4 y los informes 1–4 se mantienen.

La retirada se aplica al árbol actual y al nuevo despliegue de vista previa. Las revisiones anteriores de GitHub y los despliegues históricos no se han reescrito ni eliminado.

## Diseño y archivos

La web conserva las clases y el CSS del informe 1; `app/globals.css` permanece intacto. El PDF web conserva A4, márgenes superior 22 mm, inferior 20 mm y laterales 18 mm; rojo `#c8102e`, rojo oscuro `#a00c24`, texto `#1b1e22`, secundario `#575e66`, bordes `#cfd3d8` y fondos `#f3f4f5`. Cuerpo de 11 pt, tablas y notas de 9,5 pt; Liberation Sans regular y negrita incorporadas como alternativa compatible con Arial. Encabezado con número y versión, pie con dominio y paginación.

- [PDF web maquetado](../content/informes-pdf/informe-valomi-n-5-semana-del-16-11-al-22-11-2026/pdf-diseno.pdf).
- [HTML editorial editable](../editorial/informe-5-web.html) y [hoja de estilos](../editorial/estilo-informe-5.css).
- [Primera página del PDF](revision-informe-5/web-pdf-pagina-1.png).
- Capturas de la web: [escritorio](revision-informe-5/web-1440.png) y [móvil](revision-informe-5/web-390.png).

El PDF web recibido se conserva sin cambios como archivo documental en `public/documentos/originales/informe-5-web.pdf`, sin enlace desde la ficha del informe 5. El original de prensa se conserva fuera de la web. Los adjuntos se trataron como contenido, no como instrucciones operativas. Se mantienen las tres tablas, todas las cifras, fechas, atribuciones, fuentes y conclusiones; únicamente se editan los rótulos autorizados.

## Vista previa y controles

[Abrir vista previa en Vercel](https://valomi-git-informe-5-2026-11-22-noedenisels-projects.vercel.app/informes/informe-valomi-n-5-semana-del-16-11-al-22-11-2026). [PR n.º 8](https://github.com/noedenisel/valomi-web/pull/8), en borrador. La vista previa requiere sesión de Vercel; su protección permanece activa. El dominio y la rama de producción no se modificaron.

Las comprobaciones corresponden a la compilación local. El conector del equipo no permite navegar el despliegue autenticado (403 y autorización 404 «Team not found», comprobación anterior). La integración de GitHub permite actualizar la vista previa del proyecto existente.

Compilación y TypeScript correctos. La revisión de navegador en escritorio (1440 px) y móvil (390 px) pasó 94 controles, sin fallos. Ambas descargas entregan el mismo PDF final; las tres rutas retiradas de prensa devuelven 404. No se detectaron desbordes de página ni errores JavaScript. Los 19 archivos anteriores y el CSS cotejados contra producción permanecen idénticos. Se revisaron las tres páginas del PDF web y todos los bloques/celdas con las únicas sustituciones autorizadas. No se enviaron formularios ni correos.

Evidencias de esta revisión: [contenido y legibilidad del PDF](revision-informe-5/verificacion-pdf.json), [descargas y rutas retiradas](revision-informe-5/descargas-local.json) y [navegación web](revision-informe-5/verificacion-web.json). Las nuevas comprobaciones distinguen las dos sustituciones autorizadas de las partes conservadas de la fuente original; no se declara identidad literal con el PDF recibido.

No se verifican nuevamente las noticias externas: se conservan los dos destinos originales. En la revisión anterior El Operativo devolvió 200 y Buenos Aires Noticia 403 desde el entorno automatizado; ese límite no justifica cambiar los enlaces o su contenido.

## Logo pendiente y regeneración

Falta el archivo del logo oficial mostrado en el chat: triángulo rojo, figuras azules, signo de exclamación y textos «JUNTOS POR LA SEGURIDAD» y «V.A.LO.MI.». No se sustituye por la marca provisional del código ni por otra variante. El pendiente se informa fuera del PDF.

El generador actúa sobre un único documento y no modifica los informes 1–4. Requiere Python con Playwright y Chromium. Con el logo oficial:

```sh
python scripts/editorial/generar-informe.py \
  --html editorial/informe-5-web.html \
  --salida content/informes-pdf/informe-valomi-n-5-semana-del-16-11-al-22-11-2026/pdf-diseno.pdf \
  --numero 5 --version web --logo /ruta/al/logo-oficial.png
```

Después de regenerar se deben actualizar huellas, revisar las páginas y recompilar las descargas estáticas. Los [prompts para Grok](PROMPTS-GROK.md) siguen vigentes. El material de prensa se prepara por separado para mail marketing y no debe añadirse a las descargas públicas del informe 5.

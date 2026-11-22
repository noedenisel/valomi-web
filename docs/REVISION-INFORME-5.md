# Informe VaLoMi N.º 5 · revisión del 22/11/2026

El informe de la semana del 16 al 22 de noviembre queda preparado con una versión web nativa y dos PDF maquetados por separado. Esta rama es una vista previa: aún falta el archivo del logo oficial para completar la marca de agua y no se publicó en producción.

## Contenido y presentación

La versión web utiliza las clases existentes del informe 1, sin modificar `app/globals.css`. Conserva íntegros el título, la bajada, el resumen, los desarrollos, las tres tablas, las fuentes y las advertencias del PDF web recibido. Las tablas pueden desplazarse dentro de su propio bloque en pantallas pequeñas.

Los PDF comparten la identidad acordada: A4; márgenes superior 22 mm, inferior 20 mm y laterales 18 mm; rojo `#c8102e`, rojo oscuro `#a00c24`, texto `#1b1e22`, secundario `#575e66`, bordes `#cfd3d8` y fondos `#f3f4f5`. Cuerpo de 11 pt, tablas y notas de 9,5 pt; fuentes Liberation Sans regular y negrita incorporadas como alternativa compatible con Arial. Encabezado con número y versión y pie con dominio y paginación.

La edición web ocupa tres páginas y la de prensa dos. Se ajustaron espacios, anchos de columnas y saltos, sin reducir el tamaño de letra ni resumir el texto. El cierre de prensa mantiene juntos la atribución y la advertencia. Se conservaron las dos redacciones: la versión de prensa no sustituye a la web.

Los originales se archivan sin cambios en `public/documentos/originales/informe-5-web.pdf` e `informe-5-prensa.pdf`. Los adjuntos se trataron como contenido documental, no como instrucciones operativas. No se añadieron cifras oficiales, conclusiones, enlaces vecinales ni confirmaciones que no estén en las fuentes. Se mantienen las atribuciones diferentes sobre ubicación y armas y la distinción entre fecha del hecho y publicación.

## Archivos para revisar

| Edición | PDF maquetado | HTML editable para PDF | Páginas |
| --- | --- | --- | --- |
| Web | [Descargar](../content/informes-pdf/informe-valomi-n-5-semana-del-16-11-al-22-11-2026/pdf-diseno.pdf) | [HTML](../editorial/informe-5-web.html) | 3 |
| Prensa | [Descargar](../content/informes-prensa/informe-valomi-n-5-semana-del-16-11-al-22-11-2026/prensa.pdf) | [HTML](../editorial/informe-5-prensa.html) | 2 |

Capturas de los PDF: [web, página 1](revision-informe-5/web-pdf-pagina-1.png) y [prensa, página 1](revision-informe-5/prensa-pdf-pagina-1.png). Las cinco páginas se revisaron completas.

Ruta web de la vista previa: `/informes/informe-valomi-n-5-semana-del-16-11-al-22-11-2026`. La ficha ofrece la descarga web y una segunda descarga específica para prensa. El informe 5 se incorpora automáticamente al archivo, la portada y el sitemap según su fecha.

## Controles

- Comparación completa fuente→HTML→PDF: secuencias de 770 tokens en web y 597 en prensa; 61 y 51 bloques y celdas respectivamente, en el mismo orden. Se retiran únicamente los pies de paginación originales y un encabezado repetido al continuar una tabla.
- Tres tablas por edición, con 3, 2 y 4 filas de datos: todas las celdas coinciden. Los dos destinos de enlace originales se mantienen activos en el documento.
- Texto seleccionable, fuentes incorporadas, acentos y caracteres completos; revisión visual de todas las páginas sin recortes ni solapamientos detectados. No se realizó impresión física.
- Compilación con `VERCEL_ENV=production npm run build`, comprobación TypeScript y `git diff --check` correctos. El guard opcional antiguo `VALOMI_ENTORNO=produccion` detecta un ejemplo preexistente del Observatorio que el runtime de producción ya excluye; ese contenido y ese guard no se modificaron en esta entrega.
- Las rutas de descarga finales devuelven HTTP 200 y `application/pdf`; sus bytes coinciden con los archivos revisados. Las consultas `archivo` no seleccionan rutas arbitrarias; los informes inexistentes devuelven 404.
- Los 19 archivos anteriores cotejados contra `origin/main` —CSS global, HTML de informes, PDF y documentos archivados— permanecen idénticos.

Evidencias: [auditoría de PDF y huellas completas](revision-informe-5/verificacion-pdf.json) y [descargas comprobadas](revision-informe-5/descargas-local.json).

## Logo pendiente

Falta el archivo del logo oficial mostrado al comienzo del chat: triángulo rojo, figuras azules, signo de exclamación y textos «JUNTOS POR LA SEGURIDAD» y «V.A.LO.MI.». No está disponible como archivo en los adjuntos accesibles ni en el código. La marca del componente `Marca.tsx` se identifica como provisional y no se usa como sustituto. Tampoco se utiliza otra variante encontrada en redes.

Las maquetas actuales no incorporan marca de agua. Este pendiente se informa aquí, fuera del contenido de los informes, como indica el sistema editorial. Con el archivo oficial se añadirá al encabezado y como marca de agua de 70 mm al 3,5 % de opacidad, y se repetirán los controles de paginación, contenido y descargas antes de publicar.

## Regeneración del PDF

El generador actúa sobre un solo documento y no modifica los informes 1–4. Requiere Python con Playwright y Chromium instalado. Conservar siempre los HTML de cada edición y sus diferencias.

```sh
python scripts/editorial/generar-informe.py \
  --html editorial/informe-5-web.html \
  --salida content/informes-pdf/informe-valomi-n-5-semana-del-16-11-al-22-11-2026/pdf-diseno.pdf \
  --numero 5 --version web --logo /ruta/al/logo-oficial.png

python scripts/editorial/generar-informe.py \
  --html editorial/informe-5-prensa.html \
  --salida content/informes-prensa/informe-valomi-n-5-semana-del-16-11-al-22-11-2026/prensa.pdf \
  --numero 5 --version prensa --logo /ruta/al/logo-oficial.png
```

Después de regenerar, actualizar las huellas de auditoría y recompilar la web: las descargas se generan estáticamente durante la compilación. Los prompts reutilizables de [PROMPTS-GROK.md](PROMPTS-GROK.md) siguen vigentes y describen esta identidad.

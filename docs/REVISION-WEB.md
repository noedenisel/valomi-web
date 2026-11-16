# Informes web · contrastación ciudadana, versión 2

Los cuatro artículos proceden de `VALOMI_informes_contraste_ONG_vs_cifras_oficiales_v2.zip`. Se incorpora solo el contenido `<article>`, sin publicar el LEEME editorial ni instrucciones de los documentos adjuntos.

## Estructura visible

Cada informe conserva su resumen inicial y presenta inmediatamente después la tabla de contrastación, antes del desarrollo de noticias, denuncias, estadísticas y fuentes. Sus tres columnas distinguen información oficial o pública, análisis de VaLoMi e información que falta acreditar o publicar. Los encabezados y la redacción son los del material revisado recibido.

En el informe 2, la primera fila presenta juntas la baja de robos registrados del 26,4 % y la suba de robos agravados por lesiones o muerte, de 518 a 712 (+37,5 %). No se separaron en apartados distantes.

Se conservan también las comparaciones sobre patrulleros anunciados y operativos, licencias policiales, cámaras, inventarios y rendición de cuentas. En los informes 3 y 4 se mantienen las advertencias sobre el carácter documental del contraste y la falta de estadísticas barriales de 2026 comparables con las alertas vecinales.

## Presentación y verificación

Se mantiene el estilo original del informe 1 publicado: tipografías, colores, títulos, recuadros y tablas del sitio. La única extensión del CSS da un borde superior rojo y un ancho mínimo legible a las tres columnas de contrastación; las tablas se desplazan dentro de su propio contenedor en móvil. No cambia el diseño general del sitio.

- Igualdad de todo el texto, enlaces y anclas frente a cada HTML recibido, normalizando solo espacios.
- Igualdad de todas las celdas en el navegador después del saneamiento e integración.
- Comprobación de que la tabla de contraste es la primera de cada artículo y tiene tres columnas.
- Verificación de ambas variaciones de robos y los valores 518 y 712 en la misma fila del informe 2.
- Doce verificaciones específicas sobre los cuatro informes a 1440, 390 y 360 px, incluido desplazamiento horizontal por teclado.
- Compilación de Next.js y 28 comprobaciones generales de páginas y descargas correctas, sin errores JavaScript ni desborde horizontal de la página en los casos probados.

No se realizó una investigación externa nueva: se preservan el alcance, fechas, atribuciones y reservas de las fuentes revisadas suministradas.

## Capturas de las tablas centrales

| Informe | Escritorio | Móvil |
| --- | --- | --- |
| 1 | [Ver contraste](vistas/informe-1-contraste-v2-1440.png) | [Ver contraste](vistas/informe-1-contraste-v2-390.png) |
| 2 | [Ver contraste](vistas/informe-2-contraste-v2-1440.png) | [Ver contraste](vistas/informe-2-contraste-v2-390.png) |
| 3 | [Ver contraste](vistas/informe-3-contraste-v2-1440.png) | [Ver contraste](vistas/informe-3-contraste-v2-390.png) |
| 4 | [Ver contraste](vistas/informe-4-contraste-v2-1440.png) | [Ver contraste](vistas/informe-4-contraste-v2-390.png) |

[Informe 2 en móvil, desplazado hacia la columna de análisis](vistas/informe-2-contraste-v2-390-analisis.png).

Las páginas web y las descargas PDF corresponden a la versión 2 del ZIP. Los cuatro PDF se sirven sin modificar los archivos revisados recibidos. Los recuentos son 6, 6, 5 y 5 páginas. La descarga de prensa del informe 4 sirve la misma edición revisada, ya que el ZIP no trae una versión de prensa distinta. Los documentos anteriores se identifican como archivo. Los enlaces se versionan para evitar reutilizar descargas guardadas en caché. Se verifican las descargas de portada, archivo de informes y páginas individuales mediante SHA-256 frente a los archivos del ZIP. El dominio y el proyecto Vercel existentes se conservan.

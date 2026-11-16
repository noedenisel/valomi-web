# VaLoMi · seguridad y seguimiento ciudadano

Código del sitio web existente, actualizado con el informe 4 y cinco PDF con identidad editorial común. Conserva los PDF recibidos en `public/documentos/originales`.

Repositorio: https://github.com/noedenisel/valomi-web. La versión revisada fue aprobada e integrada en `main`. El repositorio está conectado al proyecto existente `valomi` en Vercel, conservando `valomi.com.ar`. La publicación se activa mediante la integración Git; comprobar el resultado del despliegue antes de darla por finalizada. El logo oficial aún debe recibirse como archivo para completar la marca de agua; el texto del encabezado no sustituye al logo.

- `docs/PUBLICACION.md`: instalación y conexión al proyecto actual de Vercel, sin mover el dominio.
- `docs/PROMPTS-GROK.md`: prompts reutilizables y control de fidelidad.
- `editorial/`: cinco HTML editables y hoja de estilos.
- `scripts/editorial/generar.py`: recreación opcional con Chromium y Python Playwright (`pip install playwright`). Ejemplo: `python scripts/editorial/generar.py --logo /ruta/logo-oficial.png`. Genera pruebas en `.editorial-pdf`; `--aplicar` actualiza los PDF de la web. Revisar antes de compilar y desplegar. Si cambia la paginación por editar contenido, actualizar `paginas` en las fichas YAML.

Las cuatro versiones web incorporan íntegramente los artículos revisados del ZIP `VALOMI_informes_contraste_ONG_vs_cifras_oficiales_v2.zip`, adaptados al CSS original del informe 1 publicado. Se conservaron textos, enlaces y anclas. La tabla inicial de tres columnas mantiene visible el contraste entre información pública, análisis de VaLoMi e información pendiente. En el informe 2, la caída del 26,4 % en robos y el aumento del 37,5 % en robos agravados aparecen juntos, en una misma fila. Los títulos del archivo y de las páginas corresponden a esa edición revisada. En esta actualización se modifican solo las páginas web; las descargas PDF conservan los documentos preparados previamente, a la espera de confirmar si deben reemplazarse por los nuevos PDF suministrados.

La comparación automática de caracteres no reemplaza una revisión editorial de contenido. Se verificaron los URI únicos, fuentes incorporadas y límites de página. La ampliación de tipografía y la nueva paginación aumentan la cantidad de páginas.

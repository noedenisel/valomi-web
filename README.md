# VaLoMi · actualización para revisión

Código del sitio web existente, actualizado con el informe 4 y cinco PDF con identidad editorial común. Conserva los PDF recibidos en `public/documentos/originales`.

Repositorio de revisión: https://github.com/noedenisel/valomi-web, rama `revision/informe-4`. No se publicó en Vercel. El logo oficial aún debe recibirse como archivo para completar la marca de agua; el texto del encabezado no sustituye al logo.

- `docs/PUBLICACION.md`: instalación y conexión al proyecto actual de Vercel, sin mover el dominio.
- `docs/PROMPTS-GROK.md`: prompts reutilizables y control de fidelidad.
- `editorial/`: cinco HTML editables y hoja de estilos.
- `scripts/editorial/generar.py`: recreación opcional con Chromium y Python Playwright (`pip install playwright`). Ejemplo: `python scripts/editorial/generar.py --logo /ruta/logo-oficial.png`. Genera pruebas en `.editorial-pdf`; `--aplicar` actualiza los PDF de la web. Revisar antes de compilar y desplegar. Si cambia la paginación por editar contenido, actualizar `paginas` en las fichas YAML.

La versión web del informe 4 usa el PDF web recibido. La descarga de prensa conserva su redacción propia. Los HTML anteriores de los informes 1–3 no se reescribieron porque pueden tener diferencias respecto de sus PDF.

La comparación automática de caracteres no reemplaza una revisión editorial de contenido. Se verificaron los URI únicos, fuentes incorporadas y límites de página. La ampliación de tipografía y la nueva paginación aumentan la cantidad de páginas.

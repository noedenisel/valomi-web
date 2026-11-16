# Preparación y publicación de VaLoMi

Esta entrega es para revisión. Repositorio de destino: https://github.com/noedenisel/valomi-web, rama `revision/informe-4`. No se publicó en Vercel ni se modificó el dominio.

## Proyecto existente

El ZIP recibido contiene estos identificadores en `.vercel/project.json`:

- Nombre: `valomi`
- Proyecto: `prj_maxl7Uo9EKFkgR3FjwPLEuM1D5qL`
- Equipo: `team_pBotKlXBgRLVD2xZ7p37sQHr` (`noedenisels-projects`)
- Dominio a conservar: `valomi.com.ar`

Comprobación del 16/11/2026: GitHub autentica como `noedenisel`. La conexión Vercel lista únicamente `noedenisel-3207`. Consultar el proyecto en el equipo indicado devuelve 403; autorizar el equipo por su ID devuelve 404 «Team not found». No se verificó la configuración actual del proyecto ni su conexión Git en Vercel. No usar el otro equipo como sustituto.

## Revisión local

Node.js 22 o 24. Desde la raíz:

```sh
npm ci
npm run typecheck
npm run build
npm run start -- --port 3000
```

Abrir `/informes` y el informe 4. Comprobar también los PDF web, prensa y recibidos. El estado `aprobado` del CMS permite incluir el contenido final recibido en esta vista previa; no implica autorización para publicar esta entrega. La fecha 16/11/2026 es la fecha propuesta para la ficha web.

## GitHub y conexión, después de revisar

1. Crear o elegir el repositorio de la cuenta `noedenisel`. El usuario indicó `noedenisel/valomi-web` como destino después de la preparación local. Subir esta raíz como código fuente, sin `node_modules`, `.next`, `.env*` ni `.vercel`.
2. Usar una rama de revisión, por ejemplo `revision/informe-4`. No activar aún publicaciones automáticas sobre una rama de producción.
3. Restablecer acceso al equipo propietario real de `valomi`. Confirmar el ID del proyecto y sus dominios desde el panel existente.
4. En **ese proyecto**: Settings → Git → conectar el repositorio elegido. No importar un proyecto nuevo. Si la conexión ofrece desplegar a producción inmediatamente, posponerla hasta tener aprobación.
5. Framework Next.js; Root Directory `.` si se subió esta raíz; instalación `npm ci`; compilación `npm run build`; salida predeterminada de Next.js. Conservar las variables actuales de correo, CMS y demás integraciones; no incluir secretos en Git.
6. Crear un despliegue de Preview de la rama de revisión en el proyecto existente. Confirmar que sus descargas funcionan en la infraestructura de Vercel.
7. Revisar Domains y conservar sus asignaciones. No cambiar DNS, nameservers ni mover el dominio a otro proyecto.
8. Publicar únicamente tras aprobar la vista previa y completar el logo. Conservar el despliegue de producción previo para volver a él si fuera necesario.

La indexación depende de `VALOMI_ENTORNO=produccion`; comprobar su valor en producción sin copiar secretos a esta entrega. El ZIP incluye otra app (`app-reportes`) y un respaldo histórico. No se incorporaron a esta raíz porque la actualización solicitada corresponde al sitio `web-valomi`.

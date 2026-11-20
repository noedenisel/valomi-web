# Suscripciones de VaLoMi — 19 de noviembre de 2026

La portada incorpora dos accesos con la identidad visual existente:

- `/#suscripcion`: Informe VaLoMi, formulario público de EnvíaloSimple con `AdministratorID/205581/FormID/1`.
- `/#boletin-prensa`: Boletín de prensa, formulario público de EnvíaloSimple con `AdministratorID/205581/FormID/2`.

Los enlaces completos se mantienen en `lib/suscripciones.ts`. Abren otra pestaña y avisan de ello. El alta se realiza en el proveedor: estos botones no envían datos a `/api/aviso`, no dependen de Brevo y no muestran una confirmación de alta propia. El enlace de contacto para medios se conserva.

La política de privacidad refleja las dos publicaciones y los proveedores actuales: Vercel para el sitio y EnvíaloSimple para los formularios y envíos. Se conserva el ancla anterior de privacidad para no romper enlaces existentes.

## Verificación

- `npm run build`: compilación, tipos y contenido correctos.
- Navegación en Chromium a 1440, 1000, 390 y 360 píxeles: botones visibles, sin desbordamiento horizontal.
- Clics reales en ambos botones: cada pestaña abre el formulario indicado, con su `FormID` y campo de correo.
- Los enlaces siguen disponibles sin JavaScript. Contacto para medios y acceso al mapa conservados.
- No se enviaron formularios, altas ni correos. Las solicitudes de suscripción se bloquearon durante la prueba para impedir envíos accidentales.

## Revisión pendiente en EnvíaloSimple

Al revisar los formularios públicos, el formulario 1 tenía título de informe semanal pero un párrafo que mencionaba el Boletín de prensa. Ese texto se corrige en el editor de EnvíaloSimple; no está almacenado en este repositorio.

La lista destinataria, la configuración de confirmación y la entrega efectiva de correos no son verificables desde la página pública sin acceder al panel o realizar un alta autorizada. La verificación realizada cubre la navegación hasta cada formulario, no un alta completa.

Esta entrega se preparó de forma independiente de Seguimiento. Su revisión en la PR #3 fue aprobada posteriormente para publicación el 20 de noviembre de 2026.

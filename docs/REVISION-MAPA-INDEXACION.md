# Mapa, indexación y suscripciones

## Correcciones listas

- Botón «Ver mapa de reportes» visible en la portada, junto a las acciones existentes. Destino real: https://valomi.online/mapa. El host y la ruta están documentados en la app de reportes entregada; se comprobó HTTP200, carga del canvas, filtros, desaparición del mensaje de carga y ausencia de errores JavaScript, sin enviar reportes.
- Producción permite `index, follow` usando el destino real de Vercel; Preview y Development conservan `noindex, nofollow`. La antigua bandera manual sigue admitida fuera de Vercel, sin poder volver indexable una Preview.
- `robots.txt`: rastreo del sitio público, exclusión de API y administración y referencia al sitemap. En Preview bloquea todo el rastreo.
- `sitemap.xml`: portada, archivo de informes, cuatro informes aprobados y tres páginas legales. No incorpora borradores, administración ni rutas inexistentes. En Preview no publica URLs.
- Direcciones canónicas del dominio existente para portada, archivo y cada informe. Se conserva el título que identifica a Gabriel Lombardo, VaLoMi y La Matanza. Permitir indexación no determina cuándo un buscador rastreará la página ni su posición en resultados.
- La API rechaza listas de suscripción no habilitadas, en vez de tratar todo valor distinto de `informe` como un alta en el aviso del mapa.

## Boletín de prensa: conexión pendiente

El servicio elegido es EnvíaloSimple. La web actual solo tiene los flujos de Informe y aviso del mapa, con configuración de Brevo; no existe una suscripción real al Boletín de prensa. El `mailto:` de Contacto para medios es un canal de contacto, no un formulario de alta, y se conserva.

La opción propuesta es usar dos formularios oficiales alojados de EnvíaloSimple, cada uno asociado a su lista: Informe VaLoMi y Boletín de prensa. Falta recibir sus dos enlaces públicos reales o su código oficial. No se requieren claves API para esa opción y no se debe presentar un formulario falso ni una confirmación de alta antes de conectar el servicio.

Guía oficial: https://soporte.donweb.com/es/articles/16075062-envialosimple-marketing-crear-y-gestionar-formularios-de-suscripcion . En el panel: Audiencia → Formularios → menú de tres puntos → Instalar → Compartir enlace. El proveedor administra captcha y doble confirmación.

No se encontró el HTML del correo con el segundo botón entre los archivos; ese botón no está en la web. Cuando se incorpore su plantilla, el CTA debe dirigir al formulario real de prensa o retirarse hasta que esté conectado. No se accedió a cuentas de correo ni se enviaron mensajes o altas de prueba.

## Verificación

Compilación de Next.js y TypeScript en Production y Preview. Cinco combinaciones de entorno comprobadas, incluyendo Preview con la antigua bandera manual activada. En Production: HTML `index, follow`, canónicas distintas de los cuatro informes, robots y nueve URLs del sitemap. En Preview: HTML `noindex, nofollow`, robots con bloqueo total y sitemap sin URLs. Navegador a 1440, 1000, 390 y 360 px: botón del mapa visible, enlaces correctos y sin desborde horizontal. Se verificaron tres peticiones a listas no habilitadas: devuelven400 antes de guardar o comunicar ningún alta.

- [Portada en escritorio](vistas/mapa-indexacion/portada-1440.png)
- [Portada en móvil](vistas/mapa-indexacion/portada-390.png)

Esta entrega se preparó de forma independiente de Seguimiento. Su revisión en la PR #3 fue aprobada posteriormente para publicación el 20 de noviembre de 2026.

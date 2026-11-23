import { config, collection, singleton, fields } from '@keystatic/core';

// En local se edita sobre los archivos del proyecto. En producción se usa
// GitHub: cada cambio queda como un commit (historial, autoría y copia de respaldo).
const storage =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === 'github'
    ? ({
        kind: 'github',
        repo: process.env.NEXT_PUBLIC_KEYSTATIC_REPO as `${string}/${string}`,
      } as const)
    : ({ kind: 'local' } as const);

const PENDIENTE = 'Si falta un dato, escribí [CONFIRMAR: qué falta]. Se resalta en la web de prueba y bloquea la publicación.';

const esEjemplo = fields.checkbox({
  label: 'Es un dato de EJEMPLO',
  description: 'Se muestra con el sello EJEMPLO. No se puede publicar en producción mientras esté marcado.',
  defaultValue: false,
});

export default config({
  storage,
  ui: {
    brand: { name: 'Gabriel Lombardo – VaLoMi' },
    navigation: {
      'Informe VaLoMi': ['informes'],
      'Seguimiento y transparencia': ['seguimiento'],
      Contenidos: ['quienesSomos', 'propuestas', 'medios', 'videos'],
      'Datos del sitio': ['contacto', 'institucion'],
    },
  },
  collections: {
    informes: collection({
      label: 'Informe VaLoMi',
      slugField: 'titulo',
      path: 'content/informes/*',
      format: { data: 'yaml' },
      columns: ['titulo', 'fechaPublicacion'],
      schema: {
        titulo: fields.slug({
          name: { label: 'Título', validation: { isRequired: true } },
          slug: { label: 'Dirección web (se genera sola)' },
        }),
        numero: fields.integer({ label: 'Número (N.º)' }),
        edicion: fields.text({
          label: 'Edición',
          description: 'Cómo se nombra la edición en la web, por ejemplo "Octubre 2026". Si queda vacío, se usa el período.',
        }),
        fechaPublicacion: fields.date({
          label: 'Fecha de publicación',
          validation: { isRequired: true },
        }),
        periodoDesde: fields.date({ label: 'Período cubierto: desde (opcional)' }),
        periodoHasta: fields.date({ label: 'Período cubierto: hasta (opcional)' }),
        pdf: fields.file({
          label: 'PDF original del informe',
          description: 'Se publica tal cual se sube. No se modifica ni se recomprime.',
          directory: 'content/informes-pdf',
          validation: { isRequired: true },
        }),
        paginas: fields.integer({ label: 'Cantidad de páginas del PDF' }),
        versionWeb: fields.file({
          label: 'Versión web (archivo HTML)',
          description:
            'El bloque <article class="vv"> del informe. Se publica sin cambiar su contenido; solo se le aplica el estilo de la marca. Se quitan scripts por seguridad.',
          directory: 'content/informes-html',
        }),
        resumen: fields.text({
          label: 'Resumen (opcional)',
          description:
            'Se muestra rotulado como "Resumen de VaLoMi" y separado del documento. No puede agregar cifras ni conclusiones que no estén en el PDF.',
          multiline: true,
        }),
        estado: fields.conditional(
          fields.select({
            label: 'Estado',
            description: 'Solo los informes "Aprobado" se ven en la web. Los borradores y su PDF no se publican.',
            options: [
              { label: 'Borrador (no se publica)', value: 'borrador' },
              { label: 'Aprobado (publicado)', value: 'aprobado' },
              { label: 'Retirado', value: 'retirado' },
            ],
            defaultValue: 'borrador',
          }),
          {
            borrador: fields.empty(),
            aprobado: fields.object({
              aprobadoPor: fields.text({
                label: 'Aprobado por',
                description: 'Quién revisó y aprobó el documento.',
                validation: { isRequired: true },
              }),
              fechaAprobacion: fields.date({ label: 'Fecha de aprobación', validation: { isRequired: true } }),
            }),
            retirado: fields.object({
              fechaRetiro: fields.date({ label: 'Fecha de retiro', validation: { isRequired: true } }),
              motivo: fields.text({
                label: 'Motivo del retiro',
                description: 'Se muestra en la web en lugar del informe.',
                multiline: true,
                validation: { isRequired: true },
              }),
            }),
          }
        ),
        correcciones: fields.array(
          fields.object({
            fecha: fields.date({ label: 'Fecha', validation: { isRequired: true } }),
            descripcion: fields.text({ label: 'Qué se corrigió', multiline: true, validation: { isRequired: true } }),
          }),
          {
            label: 'Fe de erratas',
            description: 'Si reemplazás el PDF de un informe ya publicado, dejá constancia acá. Se muestra públicamente.',
            itemLabel: (p) => `${p.fields.fecha.value ?? ''} · ${p.fields.descripcion.value}`,
          }
        ),
        esEjemplo,
      },
    }),

    observatorio: collection({
      label: 'Observatorio Vecinal (informes mensuales)',
      slugField: 'titulo',
      path: 'content/observatorio/*',
      format: { data: 'yaml' },
      columns: ['titulo', 'periodo'],
      schema: {
        titulo: fields.slug({
          name: { label: 'Título', description: 'Por ejemplo: «Observatorio Vecinal · septiembre de 2026».', validation: { isRequired: true } },
          slug: { label: 'Dirección web (se genera sola)' },
        }),
        periodo: fields.text({
          label: 'Mes (AAAA-MM)',
          description: 'El mismo mes del informe generado en el panel de la PWA, por ejemplo 2026-09.',
          validation: { isRequired: true, length: { min: 7, max: 7 } },
        }),
        fechaPublicacion: fields.date({ label: 'Fecha de publicación', validation: { isRequired: true } }),
        datos: fields.file({
          label: 'Archivo de datos del informe (.json)',
          description: 'Se descarga del panel de la PWA con «Datos para la web», una vez aprobado por Gabriel. No se edita a mano.',
          directory: 'content/observatorio-datos',
          validation: { isRequired: true },
        }),
        pdf: fields.file({
          label: 'PDF del informe',
          description: 'Se descarga del panel de la PWA con «PDF». Se publica tal cual.',
          directory: 'content/observatorio-pdf',
          validation: { isRequired: true },
        }),
        estado: fields.conditional(
          fields.select({
            label: 'Estado',
            description: 'Solo los informes "Aprobado" se ven en la web.',
            options: [
              { label: 'Borrador (no se publica)', value: 'borrador' },
              { label: 'Aprobado (publicado)', value: 'aprobado' },
              { label: 'Retirado', value: 'retirado' },
            ],
            defaultValue: 'borrador',
          }),
          {
            borrador: fields.empty(),
            aprobado: fields.object({
              aprobadoPor: fields.text({ label: 'Aprobado por', validation: { isRequired: true } }),
              fechaAprobacion: fields.date({ label: 'Fecha de aprobación', validation: { isRequired: true } }),
            }),
            retirado: fields.object({
              fechaRetiro: fields.date({ label: 'Fecha de retiro', validation: { isRequired: true } }),
              motivo: fields.text({ label: 'Motivo del retiro', multiline: true, validation: { isRequired: true } }),
            }),
          }
        ),
        correcciones: fields.array(
          fields.object({
            fecha: fields.date({ label: 'Fecha', validation: { isRequired: true } }),
            descripcion: fields.text({ label: 'Qué se corrigió', multiline: true, validation: { isRequired: true } }),
          }),
          { label: 'Fe de erratas', itemLabel: (p) => `${p.fields.fecha.value ?? ''} · ${p.fields.descripcion.value}` }
        ),
        esEjemplo,
      },
    }),
    seguimiento: collection({
      label: 'Seguimiento y transparencia',
      slugField: 'titulo',
      path: 'content/seguimiento/*',
      format: { data: 'yaml' },
      columns: ['titulo', 'fecha'],
      schema: {
        titulo: fields.slug({ name: { label: 'Título', validation: { isRequired: true } } }),
        tipo: fields.select({
          label: 'Tipo',
          options: [
            { label: 'Pedido de acceso a la información', value: 'pedido' },
            { label: 'Reclamo presentado', value: 'reclamo' },
            { label: 'Respuesta oficial', value: 'respuesta' },
            { label: 'Avance', value: 'avance' },
          ],
          defaultValue: 'pedido',
        }),
        fecha: fields.date({ label: 'Fecha', validation: { isRequired: true } }),
        fechaActualizacion: fields.date({
          label: 'Última actualización',
          description: 'Fecha de la última actuación informada. Si falta la constancia, aclaralo en la descripción.',
        }),
        puntos: fields.integer({ label: 'Cantidad de puntos documentales' }),
        organismo: fields.text({
          label: 'Organismo',
          description: 'Nombre de la institución. No nombres personas.',
        }),
        situacion: fields.select({
          label: 'Situación',
          options: [
            { label: 'Solicitud enviada', value: 'solicitud-enviada' },
            { label: 'Recepción confirmada', value: 'recepcion-confirmada' },
            { label: 'Subsanación presentada', value: 'subsanacion-presentada' },
            { label: 'Trámite registrado', value: 'tramite-registrado' },
            { label: 'En plazo de respuesta', value: 'en-plazo' },
            { label: 'Prórroga comunicada', value: 'prorroga-comunicada' },
            { label: 'Respuesta parcial', value: 'respuesta-parcial' },
            { label: 'Respuesta completa', value: 'respuesta-completa' },
            { label: 'Denegatoria', value: 'denegatoria' },
            { label: 'Plazo vencido sin respuesta', value: 'plazo-vencido' },
            { label: 'Reclamo presentado', value: 'reclamo-presentado' },
          ],
          defaultValue: 'solicitud-enviada',
        }),
        descripcion: fields.text({
          label: 'Descripción',
          description: 'Actuaciones con fuente, fecha y respaldo identificado. Sin datos personales ni vencimientos sin verificar.',
          multiline: true,
        }),
        documento: fields.file({
          label: 'Documento respaldatorio (PDF)',
          directory: 'content/seguimiento-docs',
        }),
        publicado: fields.checkbox({ label: 'Publicado', defaultValue: false }),
        esEjemplo,
      },
    }),

    propuestas: collection({
      label: 'Propuestas',
      slugField: 'titulo',
      path: 'content/propuestas/*',
      format: { data: 'yaml' },
      columns: ['titulo', 'orden'],
      schema: {
        titulo: fields.slug({ name: { label: 'Título', validation: { isRequired: true } } }),
        orden: fields.integer({ label: 'Orden', defaultValue: 1 }),
        icono: fields.select({
          label: 'Ícono',
          options: [
            { label: 'Cámara', value: 'camara' },
            { label: 'Luz', value: 'luz' },
            { label: 'Parada', value: 'parada' },
            { label: 'Patrullaje', value: 'patrullaje' },
            { label: 'Documento', value: 'documento' },
          ],
          defaultValue: 'documento',
        }),
        resumen: fields.text({ label: 'Resumen', multiline: true, description: PENDIENTE }),
        puntos: fields.array(fields.text({ label: 'Punto' }), {
          label: 'Qué proponemos',
          itemLabel: (p) => p.value,
        }),
      },
    }),

    medios: collection({
      label: 'VaLoMi en los medios',
      slugField: 'referencia',
      path: 'content/medios/*',
      format: { data: 'yaml' },
      columns: ['referencia', 'fecha'],
      schema: {
        referencia: fields.slug({
          name: { label: 'Referencia interna (ej.: Cadena 3, 09/06/2025)', validation: { isRequired: true } },
        }),
        medio: fields.text({ label: 'Medio', validation: { isRequired: true } }),
        tipo: fields.select({
          label: 'Tipo',
          options: [
            { label: 'Diario / portal', value: 'prensa' },
            { label: 'Radio', value: 'radio' },
            { label: 'Televisión', value: 'tv' },
          ],
          defaultValue: 'prensa',
        }),
        titulo: fields.text({ label: 'Título de la nota o entrevista', description: PENDIENTE }),
        fecha: fields.text({ label: 'Fecha', description: 'Como figura en la nota: 09/06/2025, o solo el año. ' + PENDIENTE }),
        url: fields.text({ label: 'Link a la nota', description: PENDIENTE }),
        logo: fields.image({
          label: 'Logo del medio',
          directory: 'public/medios',
          publicPath: '/medios/',
        }),
        logoAutorizado: fields.checkbox({
          label: 'Tenemos autorización para usar el logo',
          description: 'Si no está marcado, se muestra el nombre del medio en texto.',
          defaultValue: false,
        }),
        orden: fields.integer({ label: 'Orden', defaultValue: 1 }),
        visible: fields.checkbox({ label: 'Mostrar en la web', defaultValue: true }),
        sinEnlace: fields.checkbox({
          label: 'Mostrar sin link a la nota',
          description: 'Decisión editorial: se cita el medio y la fecha, pero no se enlaza.',
          defaultValue: false,
        }),
      },
    }),

    videos: collection({
      label: 'Videos',
      slugField: 'referencia',
      path: 'content/videos/*',
      format: { data: 'yaml' },
      columns: ['referencia', 'fecha'],
      schema: {
        referencia: fields.slug({
          name: { label: 'Referencia interna (ej.: Eco Medios, 24/05/2024)', validation: { isRequired: true } },
        }),
        titulo: fields.text({ label: 'Título', validation: { isRequired: true } }),
        medio: fields.text({ label: 'Medio o canal' }),
        fecha: fields.date({ label: 'Fecha' }),
        url: fields.url({
          label: 'Link al video',
          description: 'YouTube u otra plataforma. Se abre en una pestaña nueva.',
          validation: { isRequired: true },
        }),
        publicado: fields.checkbox({ label: 'Publicado', defaultValue: false }),
      },
    }),
  },

  singletons: {
    quienesSomos: singleton({
      label: 'Quién soy',
      path: 'content/quienes-somos',
      format: { data: 'yaml' },
      schema: {
        bio: fields.text({
          label: 'Biografía de Gabriel (primera persona, validada por él)',
          multiline: true,
          description: 'Donde dice {asaltos} se muestra el número del contador de asaltos, para que no quede desactualizado.',
        }),
        trayectoria: fields.text({ label: 'Trayectoria (dato destacado)', description: 'Se muestra seguido de «como referente de seguridad para los vecinos y los medios de comunicación».' }),
        asaltos: fields.object(
          {
            cantidad: fields.integer({ label: 'Cantidad de asaltos sufridos', validation: { isRequired: true } }),
            actualizado: fields.date({ label: 'Cifra actualizada al', description: PENDIENTE }),
            aclaracion: fields.text({ label: 'Aclaración que acompaña la cifra', multiline: true }),
            fuente: fields.text({ label: 'Fuente de prensa' }),
            url: fields.text({ label: 'Link a la fuente', description: 'Vacío = se cita sin link.' }),
            antecedentes: fields.array(
              fields.object({
                cantidad: fields.integer({ label: 'Cantidad' }),
                fuente: fields.text({ label: 'Fuente (medio y fecha)' }),
                url: fields.text({ label: 'Link' }),
              }),
              { label: 'Antecedentes en prensa', itemLabel: (p) => `${p.fields.cantidad.value} · ${p.fields.fuente.value}` }
            ),
          },
          { label: 'Contador de asaltos' }
        ),
        foto: fields.image({ label: 'Foto de Gabriel', directory: 'public/img', publicPath: '/img/' }),
        fotoAlt: fields.text({ label: 'Descripción de la foto (accesibilidad)' }),
        cita: fields.text({ label: 'Cita destacada', multiline: true }),
        citaFuente: fields.text({ label: 'Fuente de la cita destacada (medio y fecha)' }),
        citaUrl: fields.text({ label: 'Link a la fuente de la cita destacada' }),
        citasPrensa: fields.array(
          fields.object({
            texto: fields.text({ label: 'Cita textual', multiline: true, validation: { isRequired: true } }),
            fuente: fields.text({ label: 'Fuente (medio y fecha)', validation: { isRequired: true } }),
            url: fields.text({ label: 'Link a la nota', description: PENDIENTE }),
          }),
          { label: 'En sus palabras (citas de prensa)', itemLabel: (p) => p.fields.fuente.value }
        ),
        historia: fields.text({ label: 'Historia de VaLoMi', multiline: true, description: PENDIENTE }),
        queHacemos: fields.array(fields.text({ label: 'Punto' }), {
          label: 'Qué hace VaLoMi',
          itemLabel: (p) => p.value,
        }),
        lema: fields.text({ label: 'Lema de valores' }),
        valores: fields.array(
          fields.object({
            titulo: fields.text({ label: 'Valor' }),
            texto: fields.text({ label: 'Descripción', multiline: true }),
          }),
          { label: 'Valores', itemLabel: (p) => p.fields.titulo.value }
        ),
        hitos: fields.array(
          fields.object({
            anio: fields.text({ label: 'Año', description: PENDIENTE }),
            titulo: fields.text({ label: 'Hito' }),
            texto: fields.text({ label: 'Detalle', multiline: true }),
            fuente: fields.text({ label: 'Fuente', description: 'Todo hito lleva su fuente. ' + PENDIENTE }),
          }),
          { label: 'Línea de tiempo (solo hitos confirmados)', itemLabel: (p) => `${p.fields.anio.value} · ${p.fields.titulo.value}` }
        ),
      },
    }),

    contacto: singleton({
      label: 'Contacto y redes',
      path: 'content/contacto',
      format: { data: 'yaml' },
      schema: {
        email: fields.text({ label: 'Correo general', description: PENDIENTE }),
        emailPrensa: fields.text({ label: 'Correo para medios', description: PENDIENTE }),
        whatsapp: fields.text({ label: 'WhatsApp (con código de país, sin espacios: 54911...)', description: PENDIENTE }),
        instagram: fields.text({ label: 'Instagram (link completo)' }),
        facebook: fields.text({ label: 'Facebook (link completo)' }),
        x: fields.text({ label: 'X / Twitter (link completo)' }),
        youtube: fields.text({ label: 'YouTube (link completo)' }),
        tiktok: fields.text({ label: 'TikTok (link completo)' }),
      },
    }),

    institucion: singleton({
      label: 'Datos institucionales y legales',
      path: 'content/institucion',
      format: { data: 'yaml' },
      schema: {
        nombre: fields.text({ label: 'Nombre completo de la entidad' }),
        formaJuridica: fields.text({ label: 'Forma jurídica', description: PENDIENTE }),
        legajo: fields.text({ label: 'Número de legajo', description: PENDIENTE }),
        matricula: fields.text({ label: 'Matrícula', description: PENDIENTE }),
        cuit: fields.text({ label: 'CUIT', description: PENDIENTE }),
        domicilio: fields.text({ label: 'Domicilio legal', description: PENDIENTE }),
        emailPrivacidad: fields.text({ label: 'Correo para consultas de privacidad', description: PENDIENTE }),
        dominio: fields.text({ label: 'Dominio del sitio', description: PENDIENTE }),
      },
    }),
  },
});

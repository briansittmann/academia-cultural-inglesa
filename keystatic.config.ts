/**
 * Panel de administración (Keystatic). Mapea las content collections de
 * src/content/ a formularios con etiquetas en español. El diseño sigue siendo
 * código: desde acá solo se edita contenido.
 *
 * Almacenamiento: en desarrollo escribe en los archivos locales; en producción
 * usa Keystatic Cloud (la dueña entra con su cuenta de Keystatic, sin GitHub) y
 * cada guardado es un commit que dispara el deploy. El proyecto de Cloud se
 * configura con la variable PUBLIC_KEYSTATIC_CLOUD_PROJECT (ver .env.example).
 */
import { createElement } from 'react';
import { config, collection, singleton, fields } from '@keystatic/core';
import { conRecorte } from './src/keystatic/recorte';

const proyectoCloud = import.meta.env.PUBLIC_KEYSTATIC_CLOUD_PROJECT as string | undefined;
const esDesarrollo = import.meta.env.DEV;

// Fotos: una carpeta por collection dentro de src/assets/img. Keystatic guarda cada
// imagen en <carpeta>/<slug>/<campo>.<ext> (en el singleton, <carpeta>/<objeto>/<campo>)
// y el YAML la referencia en relativo, como pide astro:assets desde src/content/<collection>/.
// Las fotos cargadas a mano tienen que seguir esa misma estructura; si no, el panel
// no las encuentra y las saca del YAML al guardar.
const foto = (carpeta: string) => (label: string, description?: string) =>
  fields.image({ label, description, directory: `src/assets/img/${carpeta}`, publicPath: `../../assets/img/${carpeta}/` });
const fotoInstituto = foto('instituto');
const fotoSede = foto('sedes');
const fotoPublico = foto('publicos');
const fotoNovedad = foto('novedades');
// Las fotos que el sitio recorta llevan "Editar recorte" con la proporción con la que se ven.

// Íconos de Material Symbols disponibles (los que lista astro.config.mjs).
const iconos = [
  { label: 'Cuestionario', value: 'quiz-outline' },
  { label: 'Mail recibido', value: 'mark-email-read-outline' },
  { label: 'Calendario con tilde', value: 'event-available-outline' },
  { label: 'Tilde en círculo', value: 'check-circle-outline' },
  { label: 'Escuela', value: 'school-outline' },
  { label: 'Chat', value: 'chat-outline' },
  { label: 'Reloj', value: 'schedule-outline' },
  { label: 'Ubicación', value: 'location-on-outline' },
  { label: 'Teléfono', value: 'call-outline' },
  { label: 'Mail', value: 'mail-outline' },
];

const horario = fields.object(
  {
    nombre: fields.text({ label: 'Nombre', description: 'Opcional. Ej.: "Módulo Starter", "Level 1".' }),
    sede: fields.relationship({ label: 'Sede', collection: 'sedes', description: 'Vacío si se dicta en las dos o es online.' }),
    dias: fields.text({ label: 'Días', description: 'Ej.: "Lunes y miércoles".', validation: { isRequired: true } }),
    horas: fields.text({ label: 'Horario', description: 'Ej.: "19:30 a 21:30".', validation: { isRequired: true } }),
    fechas: fields.text({ label: 'Fechas', description: 'Opcional. Ej.: "11/08 al 15/12".' }),
  },
  { label: 'Horario', layout: [6, 6, 6, 6, 12] },
);

const horarios = (description: string) =>
  fields.array(horario, {
    label: 'Horarios',
    description,
    itemLabel: ({ fields }) =>
      [fields.nombre.value, fields.dias.value, fields.horas.value].filter(Boolean).join(', ') || 'Horario',
  });

const url = (label: string, description?: string) => fields.url({ label, description });

// Texto largo de la página propia de cada curso o novedad. Editor de texto
// enriquecido limitado a lo que hace falta: párrafos, subtítulos, negrita,
// listas y links. Se guarda como Markdown debajo del YAML, en el mismo archivo.
const cuerpo = (description: string) =>
  fields.markdoc({
    label: 'Texto de la página',
    description,
    extension: 'md',
    options: {
      heading: [2, 3],
      bold: true,
      italic: true,
      link: true,
      orderedList: true,
      unorderedList: true,
      blockquote: false,
      strikethrough: false,
      code: false,
      codeBlock: false,
      table: false,
      divider: false,
      image: false,
    },
  });

const pendiente = fields.text({
  label: 'Pendiente de confirmar',
  description: 'Notas internas. No se muestra en la web.',
  multiline: true,
});

export default config({
  storage: esDesarrollo || !proyectoCloud ? { kind: 'local' } : { kind: 'cloud' },
  ...(proyectoCloud ? { cloud: { project: proyectoCloud } } : {}),
  locale: 'es-ES',
  ui: {
    brand: {
      name: 'Academia Cultural Inglesa',
      // El escudo en lugar del rayo de Keystatic. Sale del favicon (public/).
      mark: () => createElement('img', { src: '/favicon-96.png', alt: '', width: 24, height: 24 }),
    },
    navigation: {
      Contenido: ['instituto', 'novedades', 'cursos'],
      Estructura: ['publicos', 'sedes'],
    },
  },

  singletons: {
    instituto: singleton({
      label: 'Instituto',
      path: 'src/content/instituto/instituto',
      format: 'yaml',
      schema: {
        nombre: fields.text({ label: 'Nombre', validation: { isRequired: true } }),
        siglas: fields.text({ label: 'Siglas', validation: { isRequired: true } }),
        fundacion: fields.integer({ label: 'Año de fundación', validation: { isRequired: true } }),
        bajada: fields.text({
          label: 'Bajada',
          description: 'Una línea. Se usa en el footer y al compartir la página.',
          validation: { isRequired: true },
        }),
        descripcion: fields.text({
          label: 'Quiénes somos',
          description: 'Párrafo de la sección "La Academia".',
          multiline: true,
          validation: { isRequired: true },
        }),
        hechos: fields.array(fields.text({ label: 'Hecho' }), {
          label: 'Hechos destacados',
          description: 'Lista de la sección "La Academia". Solo datos verificables.',
          itemLabel: ({ value }) => value || 'Hecho',
        }),
        cargaHoraria: fields.object(
          {
            titulo: fields.text({ label: 'Título', validation: { isRequired: true } }),
            detalle: fields.array(
              fields.object(
                {
                  horasSemanales: fields.number({ label: 'Horas semanales del curso', validation: { isRequired: true } }),
                  mesesExtra: fields.number({ label: 'Meses de clase extra por año', validation: { isRequired: true } }),
                },
                { layout: [6, 6] },
              ),
              {
                label: 'Detalle',
                itemLabel: ({ fields }) => `${fields.horasSemanales.value ?? '?'} h semanales: +${fields.mesesExtra.value ?? '?'} meses`,
              },
            ),
            fuente: fields.text({ label: 'Fuente del dato', description: 'Nota interna.' }),
          },
          { label: 'Carga horaria (cifra grande de "La Academia")' },
        ),
        email: fields.text({
          label: 'Email general',
          validation: { isRequired: true, pattern: { regex: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Tiene que ser un email válido.' } },
        }),
        redes: fields.object(
          {
            facebook: url('Facebook', 'Link completo a la página.'),
            instagram: fields.text({ label: 'Instagram', description: 'Link al perfil o @usuario, si hay.' }),
          },
          { label: 'Redes', layout: [6, 6] },
        ),
        whatsappPrincipal: fields.relationship({
          label: 'Sede del WhatsApp principal',
          collection: 'sedes',
          description: 'El WhatsApp que aparece en el header y en el hero.',
          validation: { isRequired: true },
        }),
        horarioAtencion: fields.object(
          {
            dias: fields.text({ label: 'Días', description: 'Ej.: "Lunes a viernes".', validation: { isRequired: true } }),
            horas: fields.text({ label: 'Horario', description: 'Ej.: "15:30 a 20:30".', validation: { isRequired: true } }),
            confirmar: fields.checkbox({ label: 'Dato pendiente de confirmar', description: 'Marca interna.' }),
          },
          { label: 'Horario de atención de las sedes', layout: [6, 6, 12] },
        ),
        formularios: fields.object(
          {
            consultaGeneral: url('Formulario de consulta general', 'Google Forms. Es el "Pedir información" por defecto.'),
            testDeNivel: url('Test de nivel online', 'Google Forms.'),
          },
          { label: 'Formularios' },
        ),
        testDeNivel: fields.object(
          {
            preguntas: fields.integer({ label: 'Cantidad de preguntas del test', validation: { isRequired: true } }),
            pasos: fields.array(
              fields.object({
                titulo: fields.text({ label: 'Título', validation: { isRequired: true } }),
                texto: fields.text({ label: 'Texto', multiline: true, validation: { isRequired: true } }),
                icono: fields.select({ label: 'Ícono', options: iconos, defaultValue: 'quiz-outline' }),
              }),
              { label: 'Pasos', description: 'Sección "Cómo empezar".', itemLabel: ({ fields }) => fields.titulo.value || 'Paso' },
            ),
          },
          { label: 'Cómo empezar' },
        ),
        hero: fields.object(
          {
            titulo: fields.text({ label: 'Título principal', description: 'Máximo dos líneas en escritorio.', validation: { isRequired: true } }),
            bajada: fields.text({ label: 'Bajada', description: 'Máximo 20 palabras.', multiline: true, validation: { isRequired: true } }),
            foto: conRecorte(fotoInstituto('Foto', 'Horizontal, al menos 1600 px de ancho.'), { proporcion: 4 / 3, donde: 'la portada' }),
            fotoAlt: fields.text({ label: 'Descripción de la foto', description: 'Para lectores de pantalla.', validation: { isRequired: true } }),
          },
          { label: 'Portada (hero)' },
        ),
        academia: fields.object(
          {
            foto: conRecorte(
              fotoInstituto('Foto', 'Va debajo de la cifra de carga horaria. Horizontal, al menos 1600 px de ancho. Sin foto, no se muestra nada.'),
              { proporcion: 16 / 10, donde: 'La Academia', guia: { proporcion: 4 / 3, texto: 'lo que se ve en el celular' } },
            ),
            fotoAlt: fields.text({ label: 'Descripción de la foto', description: 'Para lectores de pantalla. Qué se ve en la foto.' }),
            sede: fields.relationship({
              label: 'Sede de la foto',
              collection: 'sedes',
              description: 'Opcional. Muestra la dirección de la sede debajo de la foto.',
            }),
          },
          { label: 'Foto de "La Academia"' },
        ),
        seo: fields.object(
          {
            titulo: fields.text({ label: 'Título para Google', description: 'Hasta 60 caracteres.', validation: { isRequired: true, length: { max: 70 } } }),
            descripcion: fields.text({
              label: 'Descripción para Google',
              description: 'Hasta 160 caracteres.',
              multiline: true,
              validation: { isRequired: true, length: { max: 160 } },
            }),
            imagen: conRecorte(fotoInstituto('Imagen al compartir', 'Opcional, al menos 1200 px de ancho. Si no hay, se usa la imagen con el logo.'), {
              proporcion: 1200 / 630,
              donde: 'la vista previa al compartir el link',
            }),
          },
          { label: 'SEO' },
        ),
      },
    }),
  },

  collections: {
    sedes: collection({
      label: 'Sedes',
      path: 'src/content/sedes/*',
      format: 'yaml',
      slugField: 'nombre',
      columns: ['direccion'],
      schema: {
        nombre: fields.slug({ name: { label: 'Nombre', description: 'Ej.: "Villa Urquiza".' } }),
        orden: fields.integer({ label: 'Orden', defaultValue: 1, validation: { isRequired: true } }),
        direccion: fields.text({ label: 'Dirección', description: 'Calle y número.', validation: { isRequired: true } }),
        barrio: fields.text({ label: 'Barrio', validation: { isRequired: true } }),
        ciudad: fields.text({ label: 'Ciudad', defaultValue: 'CABA', validation: { isRequired: true } }),
        codigoPostal: fields.text({ label: 'Código postal' }),
        telefonos: fields.array(
          fields.object(
            {
              numero: fields.text({ label: 'Como se muestra', description: 'Ej.: "011 4523-7660".', validation: { isRequired: true } }),
              tel: fields.text({
                label: 'Para marcar',
                description: 'Con código de país y sin espacios. Ej.: "+541145237660".',
                validation: { isRequired: true, pattern: { regex: /^\+\d{8,15}$/, message: 'Formato: +541145237660.' } },
              }),
            },
            { layout: [6, 6] },
          ),
          { label: 'Teléfonos', itemLabel: ({ fields }) => fields.numero.value || 'Teléfono' },
        ),
        email: fields.text({
          label: 'Email de la sede',
          validation: { isRequired: true, pattern: { regex: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Tiene que ser un email válido.' } },
        }),
        whatsapp: fields.object(
          {
            numero: fields.text({ label: 'Como se muestra', description: 'Ej.: "11 2838-2068".', validation: { isRequired: true } }),
            internacional: fields.text({
              label: 'Número internacional',
              description: 'Solo dígitos, con 549 adelante. Ej.: "5491128382068".',
              validation: { isRequired: true, pattern: { regex: /^\d{10,15}$/, message: 'Solo dígitos, ej.: 5491128382068.' } },
            }),
            mensaje: fields.text({ label: 'Mensaje precargado', description: 'Texto con el que se abre el chat.', multiline: true }),
          },
          { label: 'WhatsApp', layout: [6, 6, 12] },
        ),
        foto: conRecorte(fotoSede('Foto de la sede', 'Opcional. Se ve chica en el selector de sede de WhatsApp.'), {
          proporcion: 1,
          donde: 'el selector de sede de WhatsApp',
        }),
        fotoAlt: fields.text({ label: 'Descripción de la foto' }),
      },
    }),

    publicos: collection({
      label: 'Públicos',
      path: 'src/content/publicos/*',
      format: 'yaml',
      slugField: 'nombre',
      columns: ['titulo'],
      schema: {
        nombre: fields.slug({ name: { label: 'Nombre', description: 'Nombre corto de la pestaña. Ej.: "Niños".' } }),
        orden: fields.integer({ label: 'Orden de la pestaña', defaultValue: 1, validation: { isRequired: true } }),
        ancla: fields.text({
          label: 'Ancla',
          description: 'Parte final del link a la pestaña, sin #. Ej.: "ninos". Solo minúsculas y guiones.',
          validation: { isRequired: true, pattern: { regex: /^[a-z0-9-]+$/, message: 'Solo minúsculas, números y guiones.' } },
        }),
        enTabs: fields.checkbox({
          label: 'Mostrar como pestaña de Cursos',
          defaultValue: true,
          description: 'Desmarcado: tiene sección propia (Cambridge).',
        }),
        titulo: fields.text({ label: 'Título del panel', validation: { isRequired: true } }),
        descripcion: fields.text({ label: 'Descripción', multiline: true, validation: { isRequired: true } }),
        formulario: url('Formulario "Pedir información"', 'Google Forms para los cursos de este público.'),
        foto: conRecorte(fotoPublico('Foto', 'Se ve en la computadora, al lado de los cursos.'), {
          proporcion: 4 / 5,
          donde: 'el panel de Cursos',
        }),
        fotoAlt: fields.text({ label: 'Descripción de la foto' }),
      },
    }),

    cursos: collection({
      label: 'Cursos',
      path: 'src/content/cursos/*',
      format: { data: 'yaml', contentField: 'cuerpo' },
      slugField: 'nombre',
      columns: ['publico', 'orden'],
      schema: {
        nombre: fields.slug({ name: { label: 'Nombre', description: 'Ej.: "Elementary".' } }),
        publico: fields.relationship({ label: 'Público', collection: 'publicos', validation: { isRequired: true } }),
        orden: fields.integer({ label: 'Orden dentro del público', defaultValue: 1, validation: { isRequired: true } }),
        etiqueta: fields.text({ label: 'Etiqueta', description: 'Pill corta. Ej.: "Promocional", "B2".' }),
        para: fields.text({ label: 'Para quién', description: 'Ej.: "Chicos de segundo grado en adelante".', validation: { isRequired: true } }),
        descripcion: fields.text({ label: 'Descripción', description: 'Resumen corto para la portada.', multiline: true, validation: { isRequired: true } }),
        cuerpo: cuerpo('Se muestra en la página del curso (/cursos/...). Los datos de cursada, sedes y horarios se cargan abajo y se muestran solos.'),
        niveles: fields.array(fields.text({ label: 'Nivel' }), {
          label: 'Niveles',
          description: 'Ej.: Elementary 1, Elementary 2…',
          itemLabel: ({ value }) => value || 'Nivel',
        }),
        frecuencia: fields.text({ label: 'Frecuencia', description: 'Ej.: "2 veces por semana".' }),
        duracionClase: fields.text({ label: 'Duración de cada clase', description: 'Ej.: "1 h 30".' }),
        horasSemanales: fields.number({ label: 'Horas por semana' }),
        periodo: fields.text({ label: 'Período', description: 'Ej.: "Marzo a diciembre".' }),
        modalidad: fields.select({
          label: 'Modalidad',
          options: [
            { label: 'Presencial', value: 'presencial' },
            { label: 'Online', value: 'online' },
            { label: 'Presencial u online', value: 'presencial-y-online' },
          ],
          defaultValue: 'presencial',
        }),
        sedes: fields.array(fields.relationship({ label: 'Sede', collection: 'sedes' }), {
          label: 'Sedes donde se dicta',
          description: 'Vacío si está por confirmar.',
          itemLabel: ({ value }) => value || 'Sede',
        }),
        horarios: horarios('Horarios estables. Los que cambian cada ciclo van en Novedades.'),
        certificado: fields.text({ label: 'Certificado', description: 'Ej.: "Certificado por nivel aprobado".' }),
        requiereTestDeNivel: fields.checkbox({ label: 'Requiere test de nivel', description: 'Muestra el aviso del test en el panel.' }),
        cambridge: fields.conditional(
          fields.checkbox({ label: 'Prepara para un examen de Cambridge' }),
          {
            true: fields.object({
              examen: fields.text({ label: 'Examen', description: 'Ej.: "B2 First (FCE)".', validation: { isRequired: true } }),
              nivelMcer: fields.text({ label: 'Nivel del Marco Común Europeo', description: 'Ej.: "B2".', validation: { isRequired: true } }),
              afirmacion: fields.text({ label: 'Afirmación', description: 'Lo que se dice del examen en la web.', multiline: true, validation: { isRequired: true } }),
            }),
            false: fields.empty(),
          },
        ),
        formulario: url('Formulario propio', 'Solo si este curso tiene un Google Forms distinto al de su público.'),
        pendiente,
      },
    }),

    novedades: collection({
      label: 'Novedades',
      path: 'src/content/novedades/*',
      format: { data: 'yaml', contentField: 'cuerpo' },
      slugField: 'titulo',
      columns: ['tipo', 'vigente', 'periodo'],
      schema: {
        titulo: fields.slug({ name: { label: 'Título', description: 'Ej.: "Inscripciones 2027".' } }),
        tipo: fields.select({
          label: 'Tipo',
          options: [
            { label: 'Inscripciones', value: 'inscripciones' },
            { label: 'Verano', value: 'verano' },
            { label: 'Cohorte de adultos', value: 'cohorte' },
            { label: 'Evento', value: 'evento' },
          ],
          defaultValue: 'inscripciones',
        }),
        vigente: fields.checkbox({ label: 'Vigente', description: 'Solo lo vigente se muestra en la web.' }),
        orden: fields.integer({ label: 'Orden', defaultValue: 0, validation: { isRequired: true } }),
        eyebrow: fields.text({ label: 'Etiqueta de la portada', description: 'Ej.: "Inscripciones abiertas 2027". Solo para la novedad de inscripciones.' }),
        resumen: fields.text({ label: 'Resumen', description: 'Una o dos líneas para la portada.', multiline: true, validation: { isRequired: true } }),
        cuerpo: cuerpo('Se muestra en la página de la novedad (/novedades/...). Los horarios se cargan abajo y se muestran solos.'),
        periodo: fields.text({ label: 'Período', description: 'Como se muestra. Ej.: "Febrero 2027".', validation: { isRequired: true } }),
        desde: fields.date({ label: 'Desde' }),
        hasta: fields.date({ label: 'Hasta' }),
        cursos: fields.array(fields.relationship({ label: 'Curso', collection: 'cursos' }), {
          label: 'Cursos incluidos',
          itemLabel: ({ value }) => value || 'Curso',
        }),
        horarios: horarios('Cohortes con fechas concretas.'),
        foto: conRecorte(
          fotoNovedad('Foto de la tarjeta', 'Opcional. Se ve en la franja Novedades de la portada. Si no hay, se usa el flyer. Que no tenga fechas ni años.'),
          { proporcion: 4 / 5, donde: 'la tarjeta de Novedades' },
        ),
        flyer: fotoNovedad('Flyer', 'Opcional.'),
        flyerAlt: fields.text({ label: 'Descripción del flyer' }),
        pendiente,
      },
    }),
  },
});

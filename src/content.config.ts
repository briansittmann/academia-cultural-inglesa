import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Única fuente de verdad de los datos del instituto. Los componentes leen de acá;
// en la fase 6 Keystatic edita estos mismos archivos.

const telefono = z.object({
  numero: z.string(), // tal como se muestra: "011 4523-7660"
  tel: z.string(), // para href="tel:": "+541145237660"
});

const whatsapp = z.object({
  numero: z.string(), // tal como se muestra: "11 2838-2068"
  internacional: z.string(), // sin signos, para wa.me: "5491128382068"
  mensaje: z.string().optional(), // texto precargado del chat
});

const horario = z.object({
  sede: reference('sedes').optional(),
  dias: z.string(), // "Lunes y miércoles"
  horas: z.string(), // "19:30 a 21:30"
  fechas: z.string().optional(), // "11/08 al 15/12"
  nombre: z.string().optional(), // "Módulo Starter", "Level 1"
});

const instituto = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/instituto' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      siglas: z.string(),
      fundacion: z.number().int(),
      bajada: z.string(), // una línea, para header/footer/OG
      descripcion: z.string(), // párrafo "Quiénes somos" reescrito
      hechos: z.array(z.string()), // hechos verificables para "La Academia"
      cargaHoraria: z.object({
        titulo: z.string(),
        detalle: z.array(z.object({ horasSemanales: z.number(), mesesExtra: z.number() })),
        fuente: z.string(),
      }),
      email: z.email(),
      redes: z.object({
        facebook: z.url().optional(),
        instagram: z.url().optional(),
      }),
      whatsappPrincipal: reference('sedes'), // para header y botón flotante
      horarioAtencion: z.object({ dias: z.string(), horas: z.string(), confirmar: z.boolean().default(false) }),
      formularios: z.object({
        consultaGeneral: z.url(),
        testDeNivel: z.url(),
      }),
      testDeNivel: z.object({
        preguntas: z.number().int(),
        pasos: z.array(
          z.object({
            titulo: z.string(), // "Hacé el test"
            texto: z.string(),
            icono: z.string(), // Material Symbols, ej. "quiz-outline" (sumarlo al include de astro.config)
          }),
        ),
      }),
      hero: z.object({
        titulo: z.string(), // H1, máximo 2 líneas en escritorio
        bajada: z.string(), // máximo 20 palabras
        foto: image(),
        fotoAlt: z.string(),
      }),
      seo: z.object({
        titulo: z.string(),
        descripcion: z.string().max(160),
        imagen: image().optional(),
      }),
    }),
});

const sedes = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/sedes' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(), // "Villa Urquiza"
      orden: z.number().int(),
      direccion: z.string(), // "Bucarelli 2288"
      barrio: z.string(),
      ciudad: z.string(), // "CABA"
      codigoPostal: z.string().optional(),
      telefonos: z.array(telefono),
      email: z.email(),
      whatsapp,
      foto: image().optional(),
      fotoAlt: z.string().optional(),
    }),
});

const publicos = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/publicos' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(), // "Niños"
      orden: z.number().int(),
      ancla: z.string(), // "ninos" → #ninos
      enTabs: z.boolean().default(true), // false: se muestra en su propia sección (Cambridge)
      titulo: z.string(), // título del panel
      descripcion: z.string(),
      formulario: z.url().optional(), // "Pedir información" por defecto para sus cursos
      foto: image().optional(),
      fotoAlt: z.string().optional(),
    }),
});

const cursos = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/cursos' }),
  schema: z.object({
    nombre: z.string(),
    publico: reference('publicos'),
    orden: z.number().int(), // orden dentro de la progresión del público
    etiqueta: z.string().optional(), // pill corta: "Promocional", "B2", "Online o presencial"
    para: z.string(), // a quién va dirigido: "Chicos de 1er grado"
    descripcion: z.string(),
    niveles: z.array(z.string()).default([]), // ["Elementary 1", ...]
    frecuencia: z.string().optional(), // "2 veces por semana"
    duracionClase: z.string().optional(), // "1 h 30"
    horasSemanales: z.number().optional(),
    periodo: z.string().optional(), // "Marzo a diciembre"
    modalidad: z.enum(['presencial', 'online', 'presencial-y-online']).default('presencial'),
    sedes: z.array(reference('sedes')).default([]), // vacío = a confirmar
    horarios: z.array(horario).default([]), // horarios estables (los que cambian por ciclo van en novedades)
    certificado: z.string().optional(), // "Certificado por nivel aprobado"
    requiereTestDeNivel: z.boolean().default(false),
    cambridge: z
      .object({
        examen: z.string(), // "B2 First (FCE)"
        nivelMcer: z.string(), // "B2"
        afirmacion: z.string(), // lo que la web actual afirma sobre el examen
      })
      .optional(),
    formulario: z.url().optional(), // pisa el del público
    pendiente: z.string().optional(), // dudas para confirmar con la dueña (no se muestra)
  }),
});

const novedades = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/novedades' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(), // "Inscripciones 2027"
      tipo: z.enum(['inscripciones', 'verano', 'cohorte', 'evento']),
      vigente: z.boolean().default(false), // solo lo vigente se muestra en la landing
      orden: z.number().int().default(0),
      eyebrow: z.string().optional(), // "Inscripciones abiertas 2027"
      resumen: z.string(),
      periodo: z.string(), // texto para mostrar: "Febrero 2027"
      desde: z.coerce.date().optional(),
      hasta: z.coerce.date().optional(),
      cursos: z.array(reference('cursos')).default([]),
      horarios: z.array(horario).default([]), // cohortes con fechas concretas
      flyer: image().optional(),
      flyerAlt: z.string().optional(),
      pendiente: z.string().optional(),
    }),
});

export const collections = { instituto, sedes, publicos, cursos, novedades };

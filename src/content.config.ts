import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { EMAIL } from './lib/validaciones';

// Única fuente de verdad de los datos del instituto. Los componentes leen de acá
// y el panel de Keystatic (keystatic.config.ts) edita estos mismos archivos: si se
// agrega un campo, hay que sumarlo en los dos lados.

// Lista que descarta los ítems vacíos: Keystatic guarda `null` cuando se agrega un
// ítem y no se completa, y un solo null alcanza para que falle el build.
const lista = <T extends z.ZodType>(item: T) =>
  z.preprocess((v) => (Array.isArray(v) ? v.filter((x) => x != null && x !== '') : v), z.array(item));

const email = z.string().regex(EMAIL, 'Email inválido');

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
      hechos: lista(z.string()).default([]), // hechos verificables para "La Academia"
      cargaHoraria: z.object({
        titulo: z.string(),
        detalle: z.array(z.object({ horasSemanales: z.number(), mesesExtra: z.number() })),
        fuente: z.string().optional(), // nota interna
      }),
      email,
      redes: z.object({
        facebook: z.url().optional(),
        // Desde el panel se puede escribir el link o solo "@usuario": se convierte al link del perfil.
        instagram: z
          .preprocess((v) => {
            if (typeof v !== 'string' || !v.trim()) return undefined;
            const t = v.trim();
            if (/^https?:\/\//.test(t)) return t;
            if (/^(www\.)?instagram\.com\//.test(t)) return `https://${t}`;
            return `https://www.instagram.com/${t.replace(/^@/, '')}/`;
          }, z.url())
          .optional(),
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
      // Foto de la sección "La Academia", debajo de la cifra de carga horaria.
      // Opcional: sin foto, la sección queda como antes. Con sedes, el pie muestra sus direcciones.
      academia: z
        .object({
          foto: image().optional(),
          fotoAlt: z.string().optional(),
          sedes: lista(reference('sedes')).default([]),
        })
        .optional(),
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
      email,
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

// Cursos y novedades son Markdown con frontmatter: el YAML de siempre más un
// cuerpo de texto largo (editable como texto enriquecido en el panel) que se
// muestra en la página propia de cada entrada.
const cursos = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/cursos' }),
  schema: z.object({
    nombre: z.string(),
    publico: reference('publicos'),
    orden: z.number().int(), // orden dentro de la progresión del público
    etiqueta: z.string().optional(), // pill corta: "Promocional", "B2", "Online o presencial"
    para: z.string(), // a quién va dirigido: "Chicos de 1er grado"
    descripcion: z.string(),
    niveles: lista(z.string()).default([]), // ["Elementary 1", ...]
    frecuencia: z.string().optional(), // "2 veces por semana"
    duracionClase: z.string().optional(), // "1 h 30"
    horasSemanales: z.number().optional(),
    periodo: z.string().optional(), // "Marzo a diciembre"
    modalidad: z.enum(['presencial', 'online', 'presencial-y-online']).default('presencial'),
    sedes: lista(reference('sedes')).default([]), // vacío = a confirmar
    horarios: z.array(horario).default([]), // horarios estables (los que cambian por ciclo van en novedades)
    certificado: z.string().optional(), // "Certificado por nivel aprobado"
    requiereTestDeNivel: z.boolean().default(false),
    // En el panel es un campo condicional ("Prepara para un examen de Cambridge"),
    // que Keystatic guarda como { discriminant, value }. Acá se aplana para que los
    // componentes lean curso.data.cambridge?.examen. Se acepta también el objeto
    // directo, por compatibilidad con archivos escritos a mano.
    cambridge: z.preprocess(
      (v) => {
        if (v && typeof v === 'object' && 'discriminant' in v) {
          const c = v as { discriminant: boolean; value?: unknown };
          return c.discriminant ? c.value : undefined;
        }
        return v ?? undefined;
      },
      z
        .object({
          examen: z.string(), // "B2 First (FCE)"
          nivelMcer: z.string(), // "B2"
          afirmacion: z.string(), // lo que la web actual afirma sobre el examen
        })
        .optional(),
    ),
    formulario: z.url().optional(), // pisa el del público
    pendiente: z.string().optional(), // dudas para confirmar con la dueña (no se muestra)
  }),
});

const novedades = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/novedades' }),
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
      cursos: lista(reference('cursos')).default([]),
      horarios: z.array(horario).default([]), // cohortes con fechas concretas
      foto: image().optional(), // foto de la tarjeta en la portada; si no hay, se usa el flyer
      flyer: image().optional(),
      flyerAlt: z.string().optional(),
      pendiente: z.string().optional(),
    }),
});

export const collections = { instituto, sedes, publicos, cursos, novedades };

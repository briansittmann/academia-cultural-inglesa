/**
 * Cuestionario para la dueña (página privada /preguntas-xtda9nw9). Junta las dudas
 * pendientes del sitio (docs/fase-1-analisis.md §6 y el campo `pendiente` de cada
 * curso) y, donde sirve, muestra lo que dice hoy la página tomándolo de las
 * collections. No es contenido del sitio: cuando lleguen las respuestas se pasan a
 * las collections y esta página se puede borrar.
 */
import { getCollection, getEntry } from 'astro:content';

interface Base {
  id: string;
  titulo: string;
  resumen: string; // etiqueta corta para el mensaje de WhatsApp
  ayuda?: string;
  hoy?: string; // lo que dice hoy la página
}
export type Pregunta =
  | (Base & { tipo: 'texto' | 'largo'; placeholder?: string })
  | (Base & { tipo: 'opciones'; opciones: string[]; detalle?: string })
  | (Base & { tipo: 'varias'; opciones: string[] })
  | (Base & {
      tipo: 'sedes';
      sedes: { id: string; nombre: string }[];
      filas: { id: string; nombre: string; grupo: string; marcadas: string[] }[];
    });

export interface Bloque {
  id: string;
  titulo: string;
  intro: string;
  preguntas: Pregunta[];
}

export async function armarCuestionario(): Promise<Bloque[]> {
  const instituto = await getEntry('instituto', 'instituto');
  if (!instituto) throw new Error('Falta src/content/instituto/instituto.yaml');
  const sedes = (await getCollection('sedes')).sort((a, b) => a.data.orden - b.data.orden);
  const publicos = (await getCollection('publicos')).sort((a, b) => a.data.orden - b.data.orden);
  const cursos = (await getCollection('cursos')).sort(
    (a, b) =>
      publicos.findIndex((p) => p.id === a.data.publico.id) - publicos.findIndex((p) => p.id === b.data.publico.id) ||
      a.data.orden - b.data.orden,
  );
  const curso = (id: string) => {
    const c = cursos.find((c) => c.id === id);
    if (!c) throw new Error(`Falta el curso ${id}`);
    return c.data;
  };
  const sedeWhatsapp = sedes.find((s) => s.id === instituto.data.whatsappPrincipal.id);
  const { horarioAtencion } = instituto.data;
  const viajeros = curso('viajeros');

  return [
    {
      id: 'fechas',
      titulo: 'Fechas y horarios 2027',
      intro: 'Es lo más urgente: con esto la página deja de tener datos viejos.',
      preguntas: [
        {
          id: 'inicio-ciclo',
          tipo: 'texto',
          titulo: '¿Qué día empiezan las clases del ciclo 2027?',
          resumen: 'Inicio de clases 2027',
          hoy: '"De marzo a diciembre", sin fecha.',
          placeholder: 'Por ejemplo: lunes 1 de marzo',
        },
        {
          id: 'inicio-kiddies',
          tipo: 'texto',
          titulo: '¿Y Kiddies? ¿Qué día empieza?',
          resumen: 'Inicio de Kiddies',
          hoy: `"${curso('kiddies').periodo}".`,
          placeholder: 'Por ejemplo: sábado 10 de abril',
        },
        {
          id: 'horarios-anuales',
          tipo: 'largo',
          titulo: 'Si ya tenés los horarios 2027 de los cursos anuales, pasalos acá.',
          resumen: 'Horarios 2027',
          ayuda: 'Curso, sede, días y hora. Si todavía no están, dejalo vacío.',
          placeholder: 'Elementary 1, Villa Urquiza: lunes y miércoles de 17 a 18:30',
        },
        {
          id: 'verano-eia',
          tipo: 'largo',
          titulo: 'English in Action intensivo de febrero: ¿fechas, días, horario y sede?',
          resumen: 'English in Action de verano',
          hoy: 'Siete clases en tres semanas y media, dos veces por semana. No dice fechas ni sede.',
        },
        {
          id: 'verano-viajeros',
          tipo: 'largo',
          titulo: 'Inglés para viajeros de febrero: ¿fechas y horarios?',
          resumen: 'Viajeros de verano',
          hoy: viajeros.frecuencia ? `${viajeros.frecuencia}.` : undefined,
        },
      ],
    },
    {
      id: 'sedes',
      titulo: 'Sedes y atención',
      intro: 'Para que nadie viaje a la sede equivocada.',
      preguntas: [
        {
          id: 'cursos-por-sede',
          tipo: 'sedes',
          titulo: '¿En qué sede se dicta cada curso?',
          resumen: 'Sedes de cada curso',
          ayuda: 'Tocá las sedes que correspondan. Ya está marcado lo que dice hoy la página.',
          sedes: sedes.map((s) => ({ id: s.id, nombre: s.data.nombre })),
          filas: cursos.map((c) => ({
            id: c.id,
            nombre: c.data.nombre,
            grupo: publicos.find((p) => p.id === c.data.publico.id)?.data.nombre ?? '',
            marcadas: c.data.sedes.map((s) => s.id),
          })),
        },
        {
          id: 'horario-atencion',
          tipo: 'opciones',
          titulo: '¿El horario de atención sigue siendo este?',
          resumen: 'Horario de atención',
          hoy: `${horarioAtencion.dias}, de ${horarioAtencion.horas}. Es el que estaba publicado en 2020.`,
          opciones: ['Sí, está bien', 'Cambió'],
          detalle: '¿Cuál es ahora? ¿Es igual en las dos sedes?',
        },
        {
          id: 'whatsapp-principal',
          tipo: 'opciones',
          titulo: 'El botón "Escribir por WhatsApp" de arriba de todo, ¿a qué sede debería escribir?',
          resumen: 'WhatsApp principal',
          hoy: sedeWhatsapp ? `Va al de ${sedeWhatsapp.data.nombre} (${sedeWhatsapp.data.whatsapp.numero}).` : undefined,
          opciones: [...sedes.map((s) => s.data.nombre), 'Que la persona elija la sede'],
        },
        ...sedes.map(
          (s): Pregunta => ({
            id: `cp-${s.id}`,
            tipo: 'texto',
            titulo: `Código postal de la sede ${s.data.nombre}`,
            resumen: `Código postal ${s.data.nombre}`,
            hoy: `${s.data.direccion}, ${s.data.ciudad}.`,
            placeholder: 'Por ejemplo: C1431',
          }),
        ),
      ],
    },
    {
      id: 'cursos',
      titulo: 'Dudas de cada curso',
      intro: 'Cosas que la página vieja decía distinto en dos lugares, o que no decía.',
      preguntas: [
        {
          id: 'kiddies-cuota',
          tipo: 'opciones',
          titulo: 'Kiddies: en 2027, ¿sigue la promoción de solo matrícula, sin cuota mensual?',
          resumen: 'Kiddies sin cuota',
          opciones: ['Sí, sigue', 'No, ahora tiene cuota', 'Todavía no lo decidimos'],
        },
        {
          id: 'kiddies-clase',
          tipo: 'texto',
          titulo: 'Kiddies: ¿cuánto dura cada clase?',
          resumen: 'Duración de clase de Kiddies',
          hoy: `${curso('kiddies').frecuencia ?? 'Una vez por semana'}, sin duración.`,
          placeholder: 'Por ejemplo: 1 h',
        },
        {
          id: 'eia-duracion',
          tipo: 'opciones',
          titulo: 'English in Action: ¿cuánto dura cada clase?',
          resumen: 'Duración de English in Action',
          hoy: 'La web vieja decía 1 h 30, pero el Level 1 figuraba de 19:30 a 21:30 (2 h).',
          opciones: ['1 h 30', '2 h', 'Depende del nivel'],
          detalle: 'Si depende del nivel, contame cuánto dura cada uno.',
        },
        {
          id: 'intensivo-online',
          tipo: 'opciones',
          titulo: 'Intensivo Adultos: ¿hay opción online?',
          resumen: 'Intensivo Adultos online',
          opciones: ['Solo presencial', 'Presencial u online', 'Solo online'],
        },
        {
          id: 'intensivo-marzo',
          tipo: 'opciones',
          titulo: 'Intensivo Adultos: ¿arranca un módulo en marzo, o solo el de agosto?',
          resumen: 'Intensivo Adultos en marzo',
          hoy: `Solo figura el módulo de ${curso('intensivo-adultos').periodo?.toLowerCase() ?? 'agosto a diciembre'}.`,
          opciones: ['Solo agosto a diciembre', 'También en marzo'],
          detalle: '¿De qué mes a qué mes?',
        },
        {
          id: 'pack-modalidad',
          tipo: 'opciones',
          titulo: 'Pack Intensivo + English in Action: ¿es presencial u online?',
          resumen: 'Modalidad del Pack',
          hoy: 'La web vieja lo titulaba "online", pero los dos cursos que incluye son presenciales.',
          opciones: ['Presencial', 'Online', 'Las dos opciones'],
        },
        {
          id: 'apoyo-vigente',
          tipo: 'opciones',
          titulo: 'Apoyo escolar: ¿lo siguen dando?',
          resumen: 'Apoyo escolar vigente',
          opciones: ['Sí', 'No, hay que sacarlo de la página'],
        },
        {
          id: 'apoyo-pestana',
          tipo: 'opciones',
          titulo: 'Apoyo escolar: ¿en qué pestaña de Cursos lo buscaría una familia?',
          resumen: 'Pestaña de Apoyo escolar',
          hoy: 'Aparece en Adultos, aunque es para chicos y adolescentes.',
          opciones: ['Niños', 'Adolescentes', 'Dejarlo en Adultos'],
        },
        {
          id: 'test-nivel',
          tipo: 'opciones',
          titulo: 'El test de nivel online, ¿para quién es?',
          resumen: 'Test de nivel',
          opciones: ['Solo adultos', 'Adolescentes y adultos', 'Para todos, también chicos'],
        },
      ],
    },
    {
      id: 'cambridge',
      titulo: 'Cambridge',
      intro: 'Cambridge cuida mucho cómo se usa su nombre, así que conviene decir exactamente lo que es.',
      preguntas: [
        {
          id: 'cambridge-estatus',
          tipo: 'opciones',
          titulo: '¿Cuál de estas frases describe al instituto?',
          resumen: 'Estatus Cambridge',
          hoy: `"${instituto.data.hechos.find((h) => h.includes('Cambridge')) ?? 'Sede de los exámenes Cambridge'}".`,
          opciones: [
            'Somos sede: los alumnos rinden el examen en el instituto',
            'Preparamos para el examen y los alumnos lo rinden en otro lugar',
            'No estoy segura',
          ],
          detalle: 'Si es otra cosa, o hay un nombre oficial, contalo acá.',
        },
        {
          id: 'cambridge-resultados',
          tipo: 'largo',
          titulo: '¿Tenés datos de aprobados de los últimos años?',
          resumen: 'Resultados Cambridge',
          ayuda: 'La página dice "altísimo porcentaje de aprobados". Con números concretos es mucho más creíble.',
          placeholder: 'Por ejemplo: 2025, First: rindieron 12, aprobaron 11',
        },
        {
          id: 'fce-online',
          tipo: 'opciones',
          titulo: 'First Certificate online (martes y jueves de 19:30 a 21:30): ¿sigue?',
          resumen: 'First online',
          hoy: 'Figuraba en una página de 2021. La página nueva solo muestra la cursada presencial.',
          opciones: ['Sí, sigue', 'No, ya no'],
        },
      ],
    },
    {
      id: 'material',
      titulo: 'Fotos y redes',
      intro: 'Las fotos que hay hoy son de muestra. Con fotos reales la página se siente mucho más cercana.',
      preguntas: [
        {
          id: 'fotos',
          tipo: 'varias',
          titulo: '¿Qué fotos reales podrías conseguir?',
          resumen: 'Fotos que puede conseguir',
          ayuda: 'Las fotos mandámelas aparte por WhatsApp. Las de chicos, solo con autorización escrita de los padres.',
          opciones: [
            'Aulas (vacías o con adultos)',
            'Fachada de Villa del Parque',
            'Clases con chicos (con permiso de los padres)',
            'Clases abiertas, actos o entrega de certificados',
            'Docentes',
          ],
        },
        {
          id: 'instagram',
          tipo: 'texto',
          titulo: '¿Tienen Instagram? Pasame el usuario.',
          resumen: 'Instagram',
          hoy: 'La página solo enlaza Facebook.',
          placeholder: '@',
        },
        {
          id: 'logo',
          tipo: 'opciones',
          titulo: '¿Alguien tiene el archivo original del logo, el de quien lo diseñó?',
          resumen: 'Logo original',
          ayuda: 'Con el original el escudo se ve nítido en cualquier tamaño.',
          opciones: ['Sí, lo busco', 'No, solo tenemos imágenes', 'No sé'],
        },
      ],
    },
    {
      id: 'familias',
      titulo: 'Para explicar mejor los cursos',
      intro: 'Queremos que la sección de cursos se entienda de un vistazo, con tus palabras.',
      preguntas: [
        {
          id: 'consultas-frecuentes',
          tipo: 'largo',
          titulo: '¿Qué es lo que más preguntan las familias cuando llaman o escriben?',
          resumen: 'Preguntas frecuentes',
          placeholder: 'Precios, horarios, desde qué edad, si dan tarea…',
        },
        {
          id: 'como-elegir',
          tipo: 'largo',
          titulo: 'Cuando una familia no sabe en qué curso anotar a su hijo, ¿cómo la ayudan a decidir?',
          resumen: 'Cómo eligen el curso',
        },
        {
          id: 'otros',
          tipo: 'largo',
          titulo: '¿Algo más que quieras cambiar o sumar en la página?',
          resumen: 'Otros comentarios',
        },
      ],
    },
  ];
}

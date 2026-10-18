import type { APIRoute } from 'astro';
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { horas, resumirNiveles } from '../lib/cursos';

// llms.txt (https://llmstxt.org): resumen del sitio en Markdown para que los
// asistentes de IA (ChatGPT, Claude, Perplexity, Gemini) lean los datos del
// instituto sin tener que interpretar el HTML. Se genera al construir con las
// mismas collections que la portada, así lo que se edita en el panel queda
// actualizado en el próximo deploy. No incluye los campos `pendiente`.

const MODALIDAD: Record<CollectionEntry<'cursos'>['data']['modalidad'], string> = {
  presencial: 'Presencial',
  online: 'Online',
  'presencial-y-online': 'Presencial u online',
};

export const GET: APIRoute = async ({ site }) => {
  const url = (ruta: string) => new URL(ruta, site).href;

  const instituto = await getEntry('instituto', 'instituto');
  if (!instituto) throw new Error('Falta src/content/instituto/instituto.yaml');
  const d = instituto.data;

  const sedes = (await getCollection('sedes')).sort((a, b) => a.data.orden - b.data.orden);
  const nombreSede = new Map(sedes.map((s) => [s.id, s.data.nombre]));
  const publicos = (await getCollection('publicos')).sort((a, b) => a.data.orden - b.data.orden);
  const cursos = (await getCollection('cursos')).sort((a, b) => a.data.orden - b.data.orden);
  const novedades = (await getCollection('novedades', ({ data }) => data.vigente)).sort(
    (a, b) => a.data.orden - b.data.orden,
  );

  const sedesDeCurso = (c: CollectionEntry<'cursos'>) =>
    c.data.sedes.map((ref) => nombreSede.get(ref.id)).filter(Boolean).join(' y ');

  const lineaCurso = (c: CollectionEntry<'cursos'>) => {
    const cd = c.data;
    const cursada = [
      cd.frecuencia,
      cd.duracionClase && `clases de ${cd.duracionClase}`,
      cd.horasSemanales && `${horas(cd.horasSemanales)} h semanales`,
    ]
      .filter(Boolean)
      .join(', ');
    const datos = [
      `Para: ${cd.para}`,
      cursada && `Cursada: ${cursada}`,
      cd.periodo && `Período: ${cd.periodo}`,
      `Modalidad: ${MODALIDAD[cd.modalidad]}`,
      sedesDeCurso(c) && `Sedes: ${sedesDeCurso(c)}`,
      (resumirNiveles(cd.niveles) || cd.niveles[0]) && `Niveles: ${resumirNiveles(cd.niveles) || cd.niveles[0]}`,
      cd.cambridge && `Examen: ${cd.cambridge.examen}, nivel ${cd.cambridge.nivelMcer} del Marco Común Europeo`,
      cd.certificado,
    ]
      .filter(Boolean)
      .join('. ');
    return `- [${cd.nombre}](${url(`/cursos/${c.id}`)}): ${cd.descripcion} ${datos}.`;
  };

  const seccionesCursos = publicos
    .map((p) => {
      const lista = cursos.filter((c) => c.data.publico.id === p.id);
      if (lista.length === 0) return '';
      return `## ${p.data.titulo}\n\n${p.data.descripcion}\n\n${lista.map(lineaCurso).join('\n')}`;
    })
    .filter(Boolean);

  const lineaSede = (s: CollectionEntry<'sedes'>) => {
    const sd = s.data;
    const direccion = [sd.direccion, sd.barrio, sd.ciudad, sd.codigoPostal].filter(Boolean).join(', ');
    const telefonos = sd.telefonos.map((t) => t.numero).join(' / ');
    return `- Sede ${sd.nombre}: ${direccion}. Teléfonos: ${telefonos}. WhatsApp: ${sd.whatsapp.numero} (https://wa.me/${sd.whatsapp.internacional}). Email: ${sd.email}.`;
  };

  const texto = `# ${d.nombre}

> ${d.bajada}

${d.descripcion}

${d.hechos.map((h) => `- ${h}`).join('\n')}
- Test de nivel online gratuito, de ${d.testDeNivel.preguntas} preguntas: ${d.formularios.testDeNivel}

## Sedes y contacto

${sedes.map(lineaSede).join('\n')}
- Horario de atención: ${d.horarioAtencion.dias} de ${d.horarioAtencion.horas}.
- Email general: ${d.email}
- Pedir información: ${d.formularios.consultaGeneral}
${d.redes.facebook ? `- Facebook: ${d.redes.facebook}\n` : ''}${d.redes.instagram ? `- Instagram: ${d.redes.instagram}\n` : ''}
${seccionesCursos.join('\n\n')}
${
  novedades.length > 0
    ? `
## Novedades

${novedades.map((n) => `- [${n.data.titulo}](${url(`/novedades/${n.id}`)}): ${n.data.resumen} Período: ${n.data.periodo}.`).join('\n')}
`
    : ''
}
## Más información

- [Sitio web](${url('/')}): portada con cursos, test de nivel, sedes y mapa.
`;

  return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

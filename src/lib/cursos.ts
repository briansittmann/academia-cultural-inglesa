/**
 * Textos derivados de los datos de un curso, compartidos entre la sección
 * Cursos de la portada y la página de cada curso.
 */
import { getEntry, type CollectionEntry } from 'astro:content';

/** Horas con coma decimal: 3.5 → "3,5". */
export function horas(n: number) {
  return n.toLocaleString('es-AR', { maximumFractionDigits: 1 });
}

/**
 * Niveles en una línea: "Elementary 1 a 4", "Pre-Intermediate 1 y 2",
 * "De Starter a Advanced (6 niveles)". Vacío si hay uno solo.
 */
export function resumirNiveles(niveles: string[]) {
  if (niveles.length < 2) return '';
  const numerados = niveles.map((n) => n.match(/^(.*\S)\s+(\d+)$/));
  const prefijo = numerados[0]?.[1];
  if (numerados.every((m) => m && m[1] === prefijo)) {
    const primero = numerados[0]![2];
    const ultimo = numerados.at(-1)![2];
    return `${prefijo} ${primero} ${niveles.length === 2 ? 'y' : 'a'} ${ultimo}`;
  }
  if (niveles.length === 2) return `${niveles[0]} y ${niveles[1]}`;
  return `De ${niveles[0]} a ${niveles.at(-1)} (${niveles.length} niveles)`;
}

/**
 * Link de WhatsApp con el mensaje ya escrito para consultar por un curso. Va al
 * número de la sede del curso si tiene una sola; si no, al WhatsApp principal.
 */
export async function whatsappDelCurso(curso: CollectionEntry<'cursos'>) {
  const instituto = await getEntry('instituto', 'instituto');
  if (!instituto) throw new Error('Falta src/content/instituto/instituto.yaml');
  const ref = curso.data.sedes.length === 1 ? curso.data.sedes[0] : instituto.data.whatsappPrincipal;
  const sede = await getEntry(ref);
  if (!sede) throw new Error(`La sede del WhatsApp de ${curso.id} no existe`);
  const texto = `Hola, vi la página de la ${instituto.data.nombre} y quiero información sobre el curso ${curso.data.nombre}.`;
  return `https://wa.me/${sede.data.whatsapp.internacional}?text=${encodeURIComponent(texto)}`;
}

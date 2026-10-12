/**
 * Textos derivados de los datos de un curso, compartidos entre la sección
 * Cursos de la portada y la página de cada curso.
 */

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

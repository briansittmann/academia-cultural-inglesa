/**
 * Reglas que comparten el panel (keystatic.config.ts) y el esquema de las
 * collections (src/content.config.ts). Si el panel deja guardar algo que el
 * esquema rechaza, el build falla y los cambios dejan de publicarse: por eso
 * se definen una sola vez acá.
 */

// Misma regla que z.email() de zod (sin tildes, sin puntos dobles, dominio con
// extensión de al menos dos letras).
export const EMAIL = /^(?!\.)(?!.*\.\.)[A-Za-z0-9_'+\-.]*[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9-]*\.)+[A-Za-z]{2,}$/;

// Formatos de foto que procesa astro:assets. El panel acepta cualquier imagen
// (incluido HEIC, el de las fotos de iPhone pasadas a la Mac), así que se filtra al subirla.
export const FORMATOS_DE_FOTO = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif'];

/**
 * Sede a la que va un botón de WhatsApp. Si la referencia apunta a una sede que
 * ya no existe (se borró o se le cambió el identificador en el panel), usa la del
 * WhatsApp principal y, si tampoco está, la primera sede: un dato roto no frena
 * el build ni deja la página sin botón.
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

type ReferenciaSede = CollectionEntry<'instituto'>['data']['whatsappPrincipal'];

export async function sedeParaWhatsapp(ref?: ReferenciaSede): Promise<CollectionEntry<'sedes'>> {
  const instituto = await getEntry('instituto', 'instituto');
  if (!instituto) throw new Error('Falta src/content/instituto/instituto.yaml');
  for (const r of [ref, instituto.data.whatsappPrincipal]) {
    const sede = r && (await getEntry(r));
    if (sede) return sede;
  }
  const [primera] = (await getCollection('sedes')).sort((a, b) => a.data.orden - b.data.orden);
  if (!primera) throw new Error('No hay ninguna sede cargada');
  return primera;
}

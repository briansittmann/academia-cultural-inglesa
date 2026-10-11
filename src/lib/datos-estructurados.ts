/**
 * Datos estructurados (JSON-LD) para el SEO local: una EducationalOrganization
 * con cada sede como LocalBusiness. Todo sale de las collections; acá solo se
 * arma el grafo. Formato según schema.org y la guía de Google para LocalBusiness
 * (verificado el 2026-10-12): openingHoursSpecification con dayOfWeek en inglés
 * y horas en 24 h, telephone con código de país, PostalAddress completa.
 */
import type { CollectionEntry } from 'astro:content';

const DIAS: Record<string, string> = {
  lunes: 'Monday',
  martes: 'Tuesday',
  miercoles: 'Wednesday',
  jueves: 'Thursday',
  viernes: 'Friday',
  sabado: 'Saturday',
  sabados: 'Saturday',
  domingo: 'Sunday',
  domingos: 'Sunday',
};
const ORDEN = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function normalizar(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

/**
 * "Lunes a viernes" → ["Monday", ..., "Friday"]; "Lunes y miércoles" → ["Monday", "Wednesday"].
 * Devuelve [] si no reconoce el texto, y en ese caso no se publica el horario.
 */
export function parsearDias(texto: string): string[] {
  const t = normalizar(texto).trim();
  const rango = t.match(/^(\w+)\s+a\s+(\w+)$/);
  if (rango) {
    const desde = ORDEN.indexOf(DIAS[rango[1]] ?? '');
    const hasta = ORDEN.indexOf(DIAS[rango[2]] ?? '');
    if (desde < 0 || hasta < 0 || hasta < desde) return [];
    return ORDEN.slice(desde, hasta + 1);
  }
  const dias = t
    .split(/\s*(?:,|\by\b)\s*/)
    .filter(Boolean)
    .map((d) => DIAS[d]);
  return dias.every(Boolean) ? dias : [];
}

/** "15:30 a 20:30" → { opens: "15:30", closes: "20:30" }, o null si no lo reconoce. */
export function parsearHoras(texto: string): { opens: string; closes: string } | null {
  const m = texto.match(/(\d{1,2})[:.](\d{2})\s*a\s*(\d{1,2})[:.](\d{2})/);
  if (!m) return null;
  const hh = (h: string) => h.padStart(2, '0');
  return { opens: `${hh(m[1])}:${m[2]}`, closes: `${hh(m[3])}:${m[4]}` };
}

interface Entrada {
  site: URL;
  instituto: CollectionEntry<'instituto'>;
  sedes: CollectionEntry<'sedes'>[];
  logoUrl: string; // URL absoluta del logo
  logoAncho: number;
  logoAlto: number;
}

export function armarDatosEstructurados({ site, instituto, sedes, logoUrl, logoAncho, logoAlto }: Entrada) {
  const d = instituto.data;
  const url = site.href;
  const idOrganizacion = `${url}#organizacion`;
  const idSede = (s: CollectionEntry<'sedes'>) => `${url}#sede-${s.id}`;

  const dias = parsearDias(d.horarioAtencion.dias);
  const horas = parsearHoras(d.horarioAtencion.horas);
  const horario =
    dias.length > 0 && horas
      ? [{ '@type': 'OpeningHoursSpecification', dayOfWeek: dias, opens: horas.opens, closes: horas.closes }]
      : undefined;

  const logo = { '@type': 'ImageObject', url: logoUrl, width: logoAncho, height: logoAlto };
  const sameAs = Object.values(d.redes).filter((u): u is string => typeof u === 'string');

  const sedesLd = sedes.map((s) => {
    const consulta = encodeURIComponent(`${s.data.direccion}, ${s.data.ciudad}, Argentina`);
    return {
      '@type': 'LocalBusiness',
      '@id': idSede(s),
      name: `${d.nombre}, sede ${s.data.nombre}`,
      parentOrganization: { '@id': idOrganizacion },
      url: `${url}#sedes`,
      image: logoUrl,
      telephone: s.data.telefonos.map((t) => t.tel),
      email: s.data.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: s.data.direccion,
        addressLocality: s.data.barrio,
        addressRegion: s.data.ciudad,
        ...(s.data.codigoPostal ? { postalCode: s.data.codigoPostal } : {}),
        addressCountry: 'AR',
      },
      ...(horario ? { openingHoursSpecification: horario } : {}),
      hasMap: `https://www.google.com/maps/search/?api=1&query=${consulta}`,
    };
  });

  const sedePrincipal = sedes.find((s) => s.id === d.whatsappPrincipal.id) ?? sedes[0];

  const organizacion = {
    '@type': 'EducationalOrganization',
    '@id': idOrganizacion,
    name: d.nombre,
    alternateName: d.siglas,
    url,
    logo,
    image: logoUrl,
    description: d.seo.descripcion,
    foundingDate: String(d.fundacion),
    email: d.email,
    ...(sedePrincipal ? { telephone: sedePrincipal.data.telefonos[0]?.tel } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    areaServed: sedes.map((s) => ({ '@type': 'Place', name: `${s.data.barrio}, ${s.data.ciudad}` })),
    location: sedes.map((s) => ({ '@id': idSede(s) })),
    subOrganization: sedes.map((s) => ({ '@id': idSede(s) })),
  };

  return { '@context': 'https://schema.org', '@graph': [organizacion, ...sedesLd] };
}

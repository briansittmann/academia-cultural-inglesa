import type { APIRoute } from 'astro';

// Se genera al construir para que la URL del sitemap use el mismo dominio
// que `site` en astro.config.mjs.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site);
  return new Response(`User-agent: *
Allow: /
Disallow: /keystatic

Sitemap: ${sitemap.href}
`);
};

// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';

// Salida estática (dist/): la landing se prerenderiza. El adaptador de Netlify
// solo sirve las rutas del panel de Keystatic (/keystatic y /api/keystatic),
// que la integración inyecta con prerender: false. React se carga únicamente
// en el panel; el sitio sigue sin React.
export default defineConfig({
  site: 'https://academiaculturalinglesa.com',
  output: 'static',
  adapter: netlify({
    // Las imágenes las procesa astro:assets en el build; no hace falta el CDN de Netlify.
    imageCDN: false,
    // En desarrollo no se emulan Edge Functions (pide Deno y no se usan).
    devFeatures: { edgeFunctions: false, images: false },
  }),
  trailingSlash: 'ignore',
  compressHTML: true,
  integrations: [
    icon({
      // Una sola familia de íconos en todo el sitio. Se listan los que se
      // usan para que el bundle no cargue todo el set.
      include: {
        'material-symbols': [
          'call-outline',
          'mail-outline',
          'location-on-outline',
          'schedule-outline',
          'school-outline',
          'menu-rounded',
          'close-rounded',
          'arrow-forward-rounded',
          'open-in-new-rounded',
          'chat-outline',
          'chat-rounded',
          'arrow-downward-rounded',
          'check-circle-outline',
          'quiz-outline',
          'mark-email-read-outline',
          'event-available-outline',
        ],
      },
    }),
    sitemap(),
    react(),
    keystatic(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

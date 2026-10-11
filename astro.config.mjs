// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// Salida estática (dist/). En la fase 6 se agrega el adaptador del hosting
// solo para las rutas del panel de Keystatic.
export default defineConfig({
  site: 'https://academiaculturalinglesa.com',
  output: 'static',
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
          'check-circle-outline',
        ],
      },
    }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// Salida estática: la landing se prerenderiza. El adaptador de Vercel solo
// sirve las rutas del panel de Keystatic (/keystatic y /api/keystatic), que la
// integración inyecta con prerender: false. React se carga únicamente en el
// panel; el sitio sigue sin React. Las imágenes las procesa astro:assets en el
// build (el adaptador no usa la optimización de imágenes de Vercel).
export default defineConfig({
  site: 'https://academiaculturalinglesa.com',
  output: 'static',
  adapter: vercel(),
  // 'never' para que el adaptador le indique a Vercel que redirija /ruta/ a /ruta:
  // así las URLs viejas de WordPress (con barra final) también caen en los 301.
  trailingSlash: 'never',
  compressHTML: true,
  // Redirecciones 301 desde las URLs de la web vieja (WordPress). Con el
  // adaptador de Vercel salen como redirecciones reales del servidor.
  redirects: {
    '/kiddies-course': '/cursos/kiddies',
    '/elementary-level': '/cursos/elementary',
    '/pre-intermediate-level': '/cursos/pre-intermediate',
    '/intermediate-level': '/cursos/intermediate',
    '/pre-first-certificate-level': '/cursos/pre-first',
    '/first-certificate': '/cursos/fce',
    '/first-certificate-online': '/cursos/fce',
    '/cae': '/cursos/cae',
    '/certificados-internacionales': '/#cambridge',
    '/intensivos-adultos-online': '/cursos/intensivo-adultos',
    '/intensivo-adultos-2hs': '/cursos/intensivo-adultos',
    '/conversacion-online-2': '/cursos/english-in-action',
    '/conversacion-1hs': '/cursos/english-in-action',
    '/pack-intensivo-adultos-conversacion': '/cursos/pack-intensivo-conversacion',
    '/combo-intensivo-conversacion': '/cursos/pack-intensivo-conversacion',
    '/clases-de-apoyo-escolar': '/cursos/apoyo-escolar',
    '/intensivo-express-nivel-inicial': '/cursos/english-in-action-verano',
    '/conversacion-verano-2021': '/cursos/viajeros',
    '/curso-de-viajeros': '/cursos/viajeros',
    '/summer-intensive-course': '/#verano',
    '/cursos-especiales-2': '/#verano',
    '/cursos-online': '/#adultos',
    '/ninos': '/#ninos',
    '/adolescentes': '/#adolescentes',
    '/adultos': '/#adultos',
    '/contacto': '/#sedes',
    '/ubicacion': '/#sedes',
    '/quienes-somos': '/#nosotros',
    '/https-forms-gle-a1fv2p9kfmgfcy3d9': '/#test-de-nivel',
    '/blog': '/',
  },
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
          'arrow-back-rounded',
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

# Fase 2: setup

Fecha: 2026-10-11. Versiones verificadas con Context7 y npm: Astro 7.3, Tailwind 4.3 (plugin de Vite), astro-icon 1.2, Fontsource 5.3, @astrojs/sitemap 3.7.

## Qué quedó armado

- **Proyecto Astro, salida estática** (`dist/`), sin React. `site` apunta a `https://academiaculturalinglesa.com` (el dominio actual, que se migra).
- **Tailwind v4** con `@tailwindcss/vite`. Los tokens viven en `src/styles/global.css` dentro de `@theme`, con la tabla de `docs/fase-1-analisis.md` §7. Se desactivan las paletas, fuentes, radios, easings y sombras por defecto de Tailwind (`--color-*: initial`, etc.) para que en los componentes solo existan los tokens del proyecto: `bg-crema`, `text-verde-900`, `rounded-card`, `ease-out`, `shadow-card`, etc.
- **Fuente** Plus Jakarta Sans variable vía `@fontsource-variable/plus-jakarta-sans`, importada en `Base.astro`. Nada de Google Fonts.
- **Íconos** Material Symbols vía `astro-icon` + `@iconify-json/material-symbols`. En `astro.config.mjs` se listan los íconos que se usan (`include`) para no empaquetar el set entero. Al agregar un ícono nuevo hay que sumarlo ahí.
- **Content collections** en `src/content/` (YAML, loader `glob`), esquemas en `src/content.config.ts`:
  - `instituto` (singleton): nombre, fundación, bajada, descripción, hechos, carga horaria, email, redes, WhatsApp principal, horario de atención, formularios, test de nivel y SEO.
  - `sedes`: Villa Urquiza y Villa del Parque con dirección, teléfonos (`numero` para mostrar, `tel` para `href`), email y WhatsApp (`numero` para mostrar, `internacional` para `wa.me`).
  - `publicos`: Niños, Adolescentes, Adultos, Verano (tabs) y Cambridge (`enTabs: false`, sección propia).
  - `cursos`: 13 cursos con datos reales (niveles, frecuencia, carga horaria, período, modalidad, sedes, horarios estables, formulario). El campo `pendiente` guarda las dudas de §6 del análisis y no se muestra.
  - `novedades`: todo lo que tiene fecha. Vigentes: `inscripciones-2027` y `verano-2027`. Como referencia (no vigentes): `verano-2026` y `adultos-agosto-2026`, con los horarios reales de la web actual, para que la dueña copie el formato al cargar las cohortes nuevas.
- **Logo provisorio**: `src/assets/logo/escudo.svg`, calcado con vtracer desde `content/imagenes/marca/logo-escudo.png` (sin fondo ni sombra, colores ajustados a los del PNG, optimizado con svgo, 41 KB). También `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png` y `og.jpg` (1200 × 630, escudo + nombre). Se reemplaza todo cuando llegue el vector original.
- **Layout** `src/layouts/Base.astro`: `lang="es-AR"`, title y description (por defecto los del instituto), canonical, Open Graph y Twitter card, favicons, `theme-color`, link al sitemap y "Ir al contenido". `Header.astro` y `Footer.astro` son placeholders mínimos que ya leen de las collections.
- **SEO**: `@astrojs/sitemap` genera `sitemap-index.xml`; `public/robots.txt` lo referencia y bloquea `/keystatic`.
- **Deploy**: salida estática, `.node-version` = 22 y `engines.node >= 22.12` para Netlify, Vercel o Cloudflare Pages. Comando `npm run build`, carpeta `dist/`. El adaptador para el panel se agrega en la fase 6.

## Decisiones y pendientes

- **Node:** la máquina tiene Node 23 (Homebrew). Astro 7 pide 22.12 o superior y no soporta oficialmente las versiones impares. Build y `astro check` pasan igual; para desarrollo conviene instalar Node 22 o 24 LTS.
- **Apoyo escolar** quedó en el público Adultos, como en el mapa del análisis. Es una sola línea en `src/content/cursos/apoyo-escolar.yaml` si se decide moverlo a Niños.
- **Fechas 2027**: `verano-2027` no tiene horarios todavía (dato pendiente de la dueña). La landing muestra el período ("Febrero 2027") y los cursos; los horarios se cargan cuando estén.
- **WhatsApp principal** del header: Villa Urquiza (el del flyer 2026), a confirmar.
- **`index.astro`** es un esqueleto que solo comprueba que las collections cargan. Las secciones reales se implementan en la fase 3.

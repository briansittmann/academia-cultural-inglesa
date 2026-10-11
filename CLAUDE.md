# Academia Cultural Inglesa

Landing page informativa para un instituto de inglés. Sin backend, sin login, sin aplicación: solo muestra información (cursos, niveles, contacto, ubicación, etc.). Reemplaza/migra la página actual del instituto.

## Stack

- **Astro** (sitio estático) + **Tailwind CSS**
- Componentes React solo si hace falta interactividad puntual (islands); por defecto, componentes `.astro` sin JS en el cliente
- Build estático (`dist/`) deployable en cualquier hosting (Hostinger, Netlify, Vercel o GitHub Pages)

## Diseño

- El diseño original se hizo en **Google Stitch**. Las fuentes de verdad son el HTML exportado, el `DESIGN.md` y la captura de referencia (ubicar en `design/` cuando estén).
- Respetar la paleta, tipografías y espaciados del diseño; si hay que crear algo nuevo, seguir las reglas del `DESIGN.md`.
- Definir colores y fuentes como tokens en la config de Tailwind, no hardcodeados en los componentes.

## Documentación: usar Context7

Antes de escribir o configurar código de Astro, Tailwind, React o cualquier librería, consultar la documentación actualizada con el MCP **Context7** (`resolve-library-id` → `get-library-docs`) en lugar de confiar en memoria. Las APIs y la configuración de estas herramientas cambian seguido (por ejemplo, Tailwind v4 se configura distinto que v3).

## Prioridades

- **SEO local**: title y meta description por página, Open Graph, HTML semántico, datos estructurados (`EducationalOrganization` / `LocalBusiness`), sitemap.
- **Performance**: imágenes optimizadas (`astro:assets`), mínimo JS.
- **Responsive / mobile-first**: la mayoría de las visitas van a llegar desde el celular.
- **Accesibilidad**: contraste, textos alternativos, navegación por teclado.

## Convenciones

- Contenido del sitio en español (Argentina).
- Commits en español.

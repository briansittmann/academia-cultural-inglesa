# Academia Cultural Inglesa

Landing page informativa para un instituto de inglés. Sin backend, sin login, sin aplicación: solo muestra información (cursos, niveles, contacto, ubicación, etc.). Reemplaza/migra la página actual del instituto.

## Stack

- **Astro** (sitio estático) + **Tailwind CSS**
- **Sin React**: todo con componentes `.astro`. La poca interactividad que haga falta (menú mobile, tabs de cursos) va con `<script>` nativo dentro del componente.
- Build estático (`dist/`) deployable en cualquier hosting (Hostinger, Netlify, Vercel o GitHub Pages)

## Diseño

- El diseño original se hizo en **Google Stitch**. Las fuentes de verdad son el HTML exportado, el `DESIGN.md` y las capturas, todo en `Referencias/` (por ahora solo están las capturas; faltan el HTML y el `DESIGN.md`).
- Respetar la paleta, tipografías y espaciados del diseño; si hay que crear algo nuevo, seguir las reglas del `DESIGN.md`.
- Definir colores y fuentes como tokens en la config de Tailwind, no hardcodeados en los componentes.
- **Contenido real:** usar los datos de `content/README.md` (direcciones, teléfonos, cursos). El diseño de Stitch tiene datos inventados; ver la sección "Datos del diseño de Stitch que no coinciden" en ese archivo.
- **Logo:** por ahora, el escudo real (`content/imagenes/marca/`), no el ícono genérico de Stitch.

## Herramientas

### Taste: skill `design-taste-frontend`

Usarlo para las decisiones visuales (tipografía, espaciado, jerarquía, evitar el look genérico de IA), con estos ajustes para este proyecto:
- **Stack:** Astro + Tailwind manda sobre los defaults del skill (Next.js/RSC, `motion/react`, librerías de íconos de React).
- **Íconos:** `astro-icon` con el set de Phosphor de Iconify (`@iconify-json/ph`): la misma familia que recomienda el skill, pero sin React.
- **Diseño ya definido:** el punto de partida es el diseño de Stitch; aplicar el skill para pulirlo, no para reinventarlo.
- **Público:** familias y adultos de barrio (Villa Urquiza / Villa del Parque) → claridad y confianza por encima de efectos llamativos. Motion bajo.

### Context7: documentación actualizada

Antes de escribir o configurar código de Astro, Tailwind, Motion o cualquier librería, consultar la documentación con el MCP **Context7** (`resolve-library-id` → `get-library-docs`) en lugar de confiar en memoria. Las APIs cambian seguido (por ejemplo, Tailwind v4 se configura distinto que v3).

### Animaciones: guía `motion-skills/animations.md` + `motion-skills/RECIPES.md`

Antes de agregar cualquier animación, seguir **`motion-skills/animations.md`** (filosofía de Emil Kowalski) y partir de las recetas de **`motion-skills/RECIPES.md`**. Lo que más importa de esa guía:
- Primero decidir **si debe animarse** y con qué propósito. Si no hay propósito claro, no se anima.
- **La herramienta más barata que alcance:** transición CSS → `@starting-style` → animación CSS → WAAPI (`element.animate()`). Motion (vanilla) solo si de verdad hace falta.
- Solo `transform` y `opacity` (y `clip-path`). Nunca `transition: all`, nunca `scale(0)`, nunca `ease-in`.
- Curvas como tokens CSS: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`. UI < 300 ms.
- `prefers-reduced-motion` (versión más suave, no cero) y `:hover` dentro de `@media (hover: hover) and (pointer: fine)`, siempre junto con la animación.

Ajustes para este proyecto (la guía está escrita pensando en React):
- Ignorar los ejemplos JSX/React (`useReducedMotion`, `motion.div`, `useEffect`) y las referencias a Base UI (`var(--transform-origin)`) y a otros skills que no tenemos (`review-animations`, `pick-ui-library`, `animate-expo`, etc.).
- Recetas que aplican a esta landing: **button press**, **scroll reveal** (con `IntersectionObserver`, una sola vez), **stagger** (tarjetas de cursos), **accordion** (menú mobile / preguntas frecuentes), **tab indicator** (filtro de cursos Niños/Adolescentes/Adultos) y **WAAPI**. El resto (drag to dismiss, hold to confirm, toast, tooltip) no aplica.
- Para el scroll reveal, la base es la receta (`IntersectionObserver` + transición), que funciona en todos los navegadores. Las scroll-driven animations de CSS (`animation-timeline: view()`), solo como mejora progresiva y verificando el soporte con Context7.
- Transiciones entre páginas: View Transitions de Astro.

## Prioridades

- **SEO local**: title y meta description por página, Open Graph, HTML semántico, datos estructurados (`EducationalOrganization` / `LocalBusiness`), sitemap.
- **Performance**: imágenes optimizadas (`astro:assets`), mínimo JS.
- **Responsive / mobile-first**: la mayoría de las visitas van a llegar desde el celular.
- **Accesibilidad**: contraste, textos alternativos, navegación por teclado.

## Estructura del repo

- `content/`: respaldo de la página actual (textos en `.md`, flyers transcritos, imágenes) y `content/README.md` con los datos reales del instituto y las dudas pendientes.
- `Referencias/`: diseño de Stitch.
- `motion-skills/`: guías de animación (ver sección Animaciones).

## Convenciones

- Contenido del sitio en español (Argentina).
- Commits en español.

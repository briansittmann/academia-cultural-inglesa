# Academia Cultural Inglesa

Landing page informativa para un instituto de inglés. Sitio estático, sin base de datos ni servidor propio: solo muestra información (cursos, niveles, contacto, ubicación, etc.). Reemplaza/migra la página actual del instituto. El único login es el del panel de administración (Keystatic, fase 6), con el que la dueña edita el contenido.

## Stack

- **Astro** (sitio estático) + **Tailwind CSS**
- **Sin React** en el sitio: todo con componentes `.astro`. La poca interactividad que haga falta (menú mobile, tabs de cursos) va con `<script>` nativo dentro del componente. (El panel de Keystatic trae su propio React, pero solo se carga en `/keystatic`.)
- Build estático deployable en Vercel, con el adaptador solo para el panel (ver Hosting en Forma de trabajo).

## Diseño

- El punto de partida es un **borrador de Google Stitch** (`Referencias/stitch_modern_cultural_inglesa_redesign/`: `DESIGN.md`, `code.html`, `screen.png`). Salió de un solo prompt: **no es un diseño cerrado**. Se toma como base para la estructura, la paleta y el tono, y se audita con criterio usando el skill Taste. Se cambia lo que no funcione (jerarquía, tipografía, espaciado, secciones redundantes o genéricas, patrones típicos de IA, textos de relleno, comportamiento en el celular).
- La auditoría y la estructura aprobada están en **`docs/fase-1-analisis.md`**: es la referencia para implementar las secciones.
- **Identidad de marca que no se negocia:** verde y dorado del escudo, tono confiable y cálido, público de familias y adultos de barrio.
- **Solo modo claro.** Esto pisa la regla del skill Taste de dark mode obligatorio.
- **Landing de una sola página** (secciones y anclas) más páginas secundarias: una por curso (`/cursos/<slug>`) y una por novedad vigente (`/novedades/<slug>`), con texto largo editable desde el panel. Redirecciones 301 desde las URLs viejas en `astro.config.mjs`.
- Definir colores, fuentes, radios y easings como tokens en el tema de Tailwind (`@theme`), no hardcodeados en los componentes.
- **Fuentes** alojadas en el proyecto con **Fontsource**, nunca desde Google Fonts. Familia elegida: Plus Jakarta Sans (ver `docs/fase-1-analisis.md`).
- **Contenido real:** usar los datos de `content/README.md` (direcciones, teléfonos, cursos). El diseño de Stitch tiene datos inventados; ver la sección "Datos del diseño de Stitch que no coinciden" en ese archivo. Los datos del instituto viven en **content collections de Astro** (`src/content/`), una sola fuente de verdad; los componentes nunca tienen datos hardcodeados. Esto deja el sitio listo para el panel de administración.
- **Fechas:** hoy la campaña vigente es "Inscripciones 2027" y "Verano 2027" (en Argentina la campaña de verano arranca en diciembre; los cursos son en febrero). Todo dato con fecha va en la collection `novedades`, nunca en los componentes.
- **Copy** en español rioplatense (voseo), sin guiones largos, sin "&", sin separadores decorativos.

### Imágenes

- **Reales:** flyers y fotos de `content/imagenes/` solo donde aporten. Copiar al proyecto únicamente las que se usen.
- **Provisorias:** fotos de Unsplash (licencia libre, no Unsplash+) **descargadas al proyecto**, nunca enlazadas desde afuera, acordes al contenido (aulas, chicos, adolescentes, adultos estudiando). Registrar autor y link de cada una en `src/assets/img/CREDITOS.md` para reemplazarlas después por fotos reales.
- **No usar** las imágenes de `lh3.googleusercontent.com` del HTML de Stitch (son generadas por IA).
- **Logo:** no hay versión vectorial. Se usa un SVG provisorio calcado de `content/imagenes/marca/logo-escudo.png` (vtracer o equivalente que respete los colores), marcado como provisorio, también como favicon. Más adelante llega el original.

## Herramientas

### Taste: skill `design-taste-frontend`

Usarlo para las decisiones visuales (tipografía, espaciado, jerarquía, evitar el look genérico de IA), con estos ajustes para este proyecto:
- **Stack:** Astro + Tailwind manda sobre los defaults del skill (Next.js/RSC, `motion/react`, librerías de íconos de React).
- **Íconos:** **Material Symbols** vía `astro-icon` + Iconify (`@iconify-json/material-symbols`). Una sola familia en todo el sitio; íconos funcionales, no decorativos en cada viñeta.
- **Borrador de Stitch:** es el punto de partida, no la meta. Aplicar el skill para auditarlo y cambiar lo que no funcione, conservando la identidad de marca (ver sección Diseño).
- **Modo claro solamente:** ignorar la regla de dark mode obligatorio.
- **Público:** familias y adultos de barrio (Villa Urquiza / Villa del Parque) → claridad y confianza por encima de efectos llamativos. Motion bajo. Diales de referencia: variance 5, motion 3, density 4-5.

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
- `docs/`: análisis y decisiones por fase.
- `docs/claude-project/`: instrucciones y contexto para el proyecto de claude.ai donde Brian hace brainstorming; las decisiones de esas charlas llegan acá con el formato "Para Claude Code". Actualizar `contexto.md` cuando el sitio cambie de forma importante.

## Forma de trabajo

- **Por fases.** Al terminar cada fase, frenar, mostrar lo hecho y esperar el OK antes de seguir:
  1. Análisis y auditoría (`docs/fase-1-analisis.md`).
  2. Setup: Astro + Tailwind, tokens, fuentes, logo SVG provisorio, layout base con SEO y favicon.
  3. Secciones, de a una o dos por vez, según la estructura aprobada. Todo con datos reales.
  4. Animaciones según `motion-skills` (motion bajo).
  5. Cierre: datos estructurados, sitemap, prueba responsive y de accesibilidad, Lighthouse, pasada final de Taste.
  6. Panel de administración con **Keystatic** (`@keystatic/astro`, Keystatic Cloud para que la dueña entre sin cuenta de GitHub), campos con etiquetas en español, deploy automático desde Git. Detalle en `docs/fase-1-analisis.md` §8.
- **Hosting:** Vercel (reconstruye desde Git y da funciones para el panel). Salida estática; el adaptador `@astrojs/vercel` solo para las rutas del panel.
- Antes de usar Astro, Tailwind o cualquier librería, consultar la documentación con Context7.
- **Un commit en español por fase. No hacer push sin preguntar.**

## Convenciones

- Contenido del sitio en español (Argentina).
- Commits en español.

## Estado del proyecto

Actualizado el 2026-10-12. Mantener esta sección al cerrar cada entrega.

- **Fases 1 a 7: hechas.** Notas en `docs/fase-1-analisis.md` a `fase-7-paginas.md`. Leerlas antes de tocar algo de esas fases.
- **Ajustes posteriores (2026-10-12), pedidos por Brian:** Cambridge con la escala del Marco Común Europeo en grilla (3 columnas, 6 entre 768 y 1023 px) y el nivel en dorado a la derecha de cada tarjeta; hover de los niveles de Cursos sin demora; período de Novedades como texto (desbordaba a 320 px); foto real de la fachada de Villa Urquiza en La Academia (grupo `academia` de `instituto.yaml`).
- **Cursos, primera pasada de UX (2026-10-12):** en el celular el panel no muestra foto (los cursos aparecen apenas se elige la pestaña); sin las cifras del recorrido (redondeaban 3,5 a 4); cada curso destaca a quién va dirigido y muestra cursada, período, sede y niveles en una línea con íconos (`src/lib/cursos.ts`: horas con coma, niveles resumidos); descripción a tres líneas en mobile; pestañas fijas debajo del header y, al cambiar con la franja fija, la página sube al panel nuevo. CTA (decidido por Brian): cada curso tiene "Escribir por WhatsApp" (variante `whatsapp-borde` de `Boton.astro`: blanco con borde, se rellena al pasar el mouse) con el mensaje armado con el nombre del curso (al número de su sede si tiene una sola, si no al principal; `whatsappDelCurso` en `src/lib/cursos.ts`, también en la página del curso) y "Más sobre el curso" como link simple (ya no se vuelve botón con el hover, para no tener dos botones rellenos por curso); "Pedir información" queda secundario al pie del panel con "¿Preferís dejar tus datos?". Pendiente de la dueña: sedes por curso, promo de Kiddies explícita (hoy solo dice "Promocional") y dónde va Apoyo escolar.
- **Novedades (2026-10-12):** campo nuevo "Foto de la tarjeta" (`foto`, en `content.config.ts` y `keystatic.config.ts`); la tarjeta usa foto, si no el flyer, si no un ícono. Las vigentes tienen recortes de los flyers 2026 del sitio viejo sin el año (créditos en `CREDITOS.md`); reemplazar cuando lleguen los flyers 2027. Entrada animada: tarjeta que sube, foto que se descubre y texto en cascada (`.novedad-*` en `animaciones.css`).
- **Selector de sede para WhatsApp (2026-10-27):** `src/components/SelectorSede.astro` (un `<dialog>` en `Base.astro`, animado con WAAPI: hoja desde abajo hasta 639 px, popover anclado al botón desde 640 px, opciones en cascada). Lo abre cualquier `Boton` con la prop `elegirSede` (`true` usa el mensaje de cada sede; un texto, ese mensaje); sin JS, el link va al WhatsApp principal. Lo usan header, menú mobile, hero, novedades y los cursos con más de una sede o ninguna (`whatsappDelCurso` devuelve `{ href, elegirSede }`). Tarjetas de Sedes, footer y cursos de una sola sede van directo.
- **Los push los hace Brian.** Commitear por entrega y avisar que queda pendiente de subir.
- **Sitio en Vercel:** https://academia-cultural-inglesa.vercel.app/. Usarlo para revisar el sitio publicado.
- **Panel en producción (2026-10-12): andando.** Proyecto de Keystatic Cloud `academia-cultural/academia-web-page` (equipo `academia-cultural`), cargado en Vercel como `PUBLIC_KEYSTATIC_CLOUD_PROJECT` con visibilidad Config (Vercel no deja marcar como secreta una variable `PUBLIC_`; se lee al construir, así que cambiarla pide redesplegar). "Project URL" en Keystatic Cloud: `https://academia-cultural-inglesa.vercel.app`. Brian probó el inicio de sesión y el guardado. Hizo falta `@astrojs/vercel` 11.0.14: la 11.0.13 dejaba un `import "rolldown"` en la función y `/keystatic` daba 500 (`FUNCTION_INVOCATION_FAILED`). Para reproducir un error de la función sin la CLI de Vercel: copiar `.vercel/output/functions/_render.func` fuera del repo (con `cp -RL`, así no resuelve paquetes del `node_modules` del proyecto) y llamar a `default.fetch(new Request(...))` de su `entry.mjs`. Cada guardado del panel es un commit en `main`: hacer `git pull` antes de trabajar.
- **Sigue, lo hace Brian:** invitar a la dueña al equipo de Keystatic Cloud (plan gratis: hasta 3 usuarios) y apuntar el dominio `academiaculturalinglesa.com` en Vercel. Al apuntarlo, cambiar el "Project URL" de Keystatic Cloud al dominio y redesplegar: `site` (canonical, Open Graph, sitemap, `robots.txt`) sale de `VERCEL_PROJECT_PRODUCTION_URL`, que hoy es el `.vercel.app` y pasa al dominio propio cuando se lo agrega en Vercel. No fijarlo a mano a un dominio que todavía no apunta a Vercel: la miniatura al compartir por WhatsApp queda vacía. Con el dominio publicado: probar las redirecciones 301 desde las URLs viejas, validar el JSON-LD y revisar el panel ahí. Las ideas abiertas para después (resultados, fotos reales, vencimiento automático de novedades, SEO local, estadísticas) están en `docs/claude-project/contexto.md`.
- **Panel:** `keystatic.config.ts` (raíz). Modo local en `astro dev` (`http://127.0.0.1:4321/keystatic`), Keystatic Cloud en producción. Si se agrega o renombra un campo, cambiarlo en `src/content.config.ts` y en `keystatic.config.ts` a la vez. El campo `cambridge` de los cursos es condicional en el panel y se aplana en el esquema de zod. Cursos y novedades son `.md` (frontmatter YAML más el cuerpo "Texto de la página"); el resto, `.yaml`.
- **Fotos:** viven en `src/assets/img/<collection>/<slug>/<campo>.<ext>` (en el singleton, `instituto/<objeto>/<campo>`), que es la estructura que usa Keystatic. Si una foto no está ahí, el panel la saca del YAML al guardar. Si Brian deja una foto en otra ruta, moverla a esa estructura y avisarle. Son provisorias de Unsplash salvo la fachada de Villa Urquiza (`instituto/academia/foto.jpg`), que es real (créditos en `src/assets/img/CREDITOS.md`). Fotos de menores: solo con autorización escrita de padres o tutores.
- **Logo:** `src/assets/logo/logo.png` es el PNG que entregó el instituto, oficial hasta que llegue el SVG; `Logo.astro` usa `logo-recortado.png` y de ahí salen favicons y `og.jpg`.
- **Datos estructurados:** `src/lib/datos-estructurados.ts` + `src/components/DatosEstructurados.astro`. El horario de atención se escribe en español en `instituto.yaml` y se traduce al formato de schema.org al construir.
- **`/llms.txt` (2026-10-18):** resumen en Markdown para asistentes de IA, generado al construir desde las collections (`src/pages/llms.txt.ts`): instituto, sedes, cursos por público y novedades vigentes, sin los campos `pendiente`. Si se agrega un dato importante a las collections, sumarlo ahí también.
- **Animaciones:** dial de motion 5, un efecto por sección (`docs/fase-4-animaciones.md`). Magic UI solo como referencia; su MCP está en `.mcp.json` y hay que aprobarlo con `/mcp`. Hover sobre un elemento que también tiene entrada escalonada: animar el hover con `translate` o `scale` (propiedad aparte, sin demora) y la entrada con `transform`; si comparten propiedad, la demora de la entrada se aplica al sacar el mouse.
- **Páginas secundarias (fase 7):** `src/pages/cursos/[slug].astro` y `src/pages/novedades/[slug].astro` (solo novedades vigentes). La franja Novedades va debajo del hero. Las anclas del header y footer son `/#...` para funcionar desde esas páginas.
- **Breakpoints:** la nav de escritorio y las tres cards de Cómo empezar aparecen desde `lg` (1024 px).
- **Lighthouse (2026-10-12, después de los ajustes):** portada en mobile 99 / 100 / 100 / 100 (LCP 2,0 s), escritorio 100 en todo; página de curso en mobile 99 / 100 / 100 / 100.
- **Preguntas para la dueña (2026-10-12):** página privada `/preguntas-xtda9nw9` (no enlazada, `noindex`, fuera del sitemap). Preguntas en `src/lib/preguntas-duena.ts`, armadas con los datos actuales de las collections; la página guarda lo escrito en el navegador y al final manda las respuestas por email a Brian con FormSubmit (`EMAIL_DESTINO`; servicio externo elegido por Brian, el primer envío pide activar la casilla con el link que llega por mail). Si falla, quedan WhatsApp (`WHATSAPP_DESTINO` vacío: ella elige el contacto) y copiar. Cuando lleguen las respuestas: pasarlas a las collections, completar lo que falta de Cursos (ver arriba) y borrar la página.
- **Pendientes concretos:**
  - Decidir si Apoyo escolar va en Niños o Adultos (`src/content/cursos/apoyo-escolar.md`).
  - Dudas para la dueña en `docs/fase-1-analisis.md` §6 y en el campo `pendiente` de cada curso (ahora editable desde el panel). Sumar coordenadas de cada sede (los códigos postales ya están: CPA C1431DQP y C1417AAN, los pasó Brian).
  - Validar el JSON-LD con validator.schema.org cuando el dominio esté publicado.
  - `npm audit`: 3 altas (`path-to-regexp` dentro de `@vercel/routing-utils`, solo en el build); no afectan al sitio publicado. Siguen con `@astrojs/vercel` 11.0.14; revisar en la próxima actualización.
  - La máquina tiene Node 23 (versión impar, no soportada oficialmente por Astro 7); build y check pasan igual.
- **Cómo verificar:** `npm run build` y `npx astro check` deben pasar sin errores. Con el adaptador de Vercel la página estática queda en `dist/client/` y `astro preview` no funciona: servirla con `npx -y serve dist/client -l 4321` (no usar `python3 -m http.server` para Lighthouse: es monohilo y suma medio segundo al FCP y al LCP). Para el panel, `npx astro dev` y abrir `/keystatic`. El skill `browser-automation` sirve para consola, scroll horizontal y capturas en 390, 768, 1024 y 1280 px (en scripts usar `scrollTo` con `behavior: 'instant'`, porque el `scroll-behavior: smooth` del sitio hace que un scroll rápido no dispare los reveals). Lighthouse: `npx -y lighthouse@latest http://localhost:4321/ --preset=desktop` con `CHROME_PATH` apuntando a Google Chrome. Astro 7 deja corriendo `astro dev` como daemon (`npx astro dev stop`); si un puerto no responde, revisar `npx astro dev status` por si quedó uno de otra sesión.

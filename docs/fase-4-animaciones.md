# Fase 4: animaciones

Fecha: 2026-10-12. Guía: `motion-skills/animations.md` y `motion-skills/RECIPES.md`. Dial de motion: **5** (subido desde 3 tras la revisión del 2026-10-12: la primera versión usaba el mismo fundido en todas las secciones y se sentía uniforme). Solo `transform`, `opacity` y `clip-path`; curvas de los tokens (`--ease-out`, `--ease-in-out`, `--ease-out-back` solo para sellos); nada en loop; versión suave para `prefers-reduced-motion` (solo opacidad). Todo el CSS vive en `src/styles/animaciones.css`.

Un efecto distinto por sección, cada uno con un propósito:

| Sección | Efecto | Propósito | Herramienta |
|---|---|---|---|
| Hero (carga) | Eyebrow entra desde la izquierda; el título sube palabra por palabra (45 ms entre palabras); bajada y CTAs suben; la foto se revela con una máscara de izquierda a derecha y un zoom que se asienta (1.08 a 1). Al hacer scroll, parallax suave de la foto. | Primera impresión (delight de primera vez) | Animaciones CSS sin JS; parallax con `animation-timeline: view()` dentro de `@supports`, mejora progresiva |
| Header | Al pasar el tope, el escudo se achica (0.85) y aparece la sombra tintada | Indicar estado (la página respondió al scroll) | Centinela de 1 px + `IntersectionObserver`, transición de `transform` y sombra |
| Cursos | Indicador de tabs con la copia recortada por `clip-path` (receta). Cada panel cuenta su recorrido: la foto entra desde la izquierda, título y descripción suben, la línea del recorrido se dibuja de arriba hacia abajo y cada nivel aparece a su turno con su punto. Se repite al cambiar de pestaña (evento `revelar`). Zoom suave de la foto y desplazamiento de 4 px del nivel al pasar el mouse | Explicación (el recorrido de niveles es el argumento) | Reveal compartido + transiciones, `@starting-style`, hover gateado |
| Cambridge | Título palabra por palabra al entrar en pantalla; cards suben con 120 ms de diferencia; el sello "Nivel B2 / C1" aparece al final con un rebote corto (`--ease-out-back`) | Jerarquía (primero el título, después las cards, al final el dato) | Reveal con `IntersectionObserver` + transiciones |
| La Academia | Título y párrafo suben; los hechos entran desde la izquierda uno por uno; el bloque de la cifra hace zoom; la barra dorada crece desde arriba y los números cuentan de 0 a +2 y +3 (900 ms, ease-out). La foto del edificio se revela como un telón que sube (`clip-path`, 900 ms) mientras el zoom se asienta, y hace un zoom suave al pasar el mouse (con `scale`, sin heredar la demora de la entrada) | Explicación (el dato es el argumento de venta) | Reveal + contador en `requestAnimationFrame` (WAAPI no anima texto) |
| Cómo empezar | Rediseño: tres cards con ícono y número sobre un patrón de puntos (port del dot pattern de Magic UI). Cada card sube a su turno, el ícono aparece con rebote corto y un haz de luz verde y dorado recorre el riel que conecta una card con la siguiente, una sola vez (port a CSS del animated beam de Magic UI, sin loop). En mobile se apilan y el haz baja | Explicación (es un proceso en orden) | Reveal + animaciones CSS en pseudo-elementos |
| Sedes | La card izquierda entra desde la izquierda y la derecha desde la derecha | Espacial (cada sede en su lado) | Reveal + transiciones |
| Botones | Se hunden un poco al presionar (`scale(0.97)`, 160 ms) | Feedback | Transición CSS |
| Menú mobile | Altura medida en JS y opacidad, 200 ms; cerrado queda `inert` | Evitar un salto | Receta accordion |
| Páginas | `<ClientRouter />` de Astro; scripts en `astro:page-load`, idempotentes | Para los posts de la fase 6 | View Transitions |

## Magic UI como referencia

El MCP de Magic UI queda registrado en `.mcp.json` (hay que aprobarlo con `/mcp`). Sus componentes son React + Motion y el sitio no usa React, así que no se instalan: se toma el efecto y se porta a CSS y JS nativo. Portados hasta ahora: animated beam (haz que viaja una sola vez), number ticker (contador en `requestAnimationFrame`) y dot pattern (patrón de puntos con `radial-gradient` y máscara). Descartado `astro-component-kit`: es "dark mode first" con glassmorphism y trae su propio sistema de tokens, además de pedir three.js y apexcharts.

## Decisiones y hallazgos

- **Sin JS no se oculta nada.** Los estados iniciales del reveal dependen de la clase `js` que agrega un script inline en el `<head>`. Las animaciones de carga (hero, títulos) corren solas con CSS.
- **`clip-path` e `IntersectionObserver`.** Chrome respeta el `clip-path` del elemento al calcular la intersección: con `inset(0 0 100% 0)` el área visible es cero y el observer nunca dispara. Se observa el contenedor (`[data-reveal]`) y los efectos van en sus descendientes.
- **Títulos palabra por palabra**: componente `TituloAnimado.astro`. Cada palabra va en un marco con `overflow: hidden`; con `espera` queda en pausa (`animation-play-state`) hasta que su bloque sea visible.
- **Costo en LCP**: la foto del hero está enmascarada 200 ms y se revela en 900 ms, así que el LCP se corre alrededor de un segundo. Se mide en la fase 5 con Lighthouse; si pesa, se acorta la máscara.
- **Entradas laterales y scroll horizontal:** las cards que entran desde la derecha sobresalen del viewport antes de revelarse; las secciones con entradas laterales llevan `overflow-x: clip`.
- **Qué no se anima:** footer, íconos, links de la nav. Sin propósito claro.
- **Hover y entrada en el mismo elemento:** la demora escalonada de la entrada se aplicaba también al sacar el mouse de un nivel del recorrido de cursos, y el nivel que se dejaba volvía tarde (pedido del dueño, 2026-10-12). La entrada anima `transform` y el hover anima `translate`, una propiedad aparte con su propia transición de 200 ms sin demora: el que se deja y el que se toma se mueven a la vez. Mismo criterio para cualquier hover futuro sobre un elemento con reveal escalonado.

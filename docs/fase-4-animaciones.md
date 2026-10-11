# Fase 4: animaciones

Fecha: 2026-10-11. Guía: `motion-skills/animations.md` y `motion-skills/RECIPES.md`. Motion bajo (dial 3). Solo `transform`, `opacity` y `clip-path`; curvas y duraciones de los tokens `--ease-out` y `--ease-in-out`. Todo tiene versión suave para `prefers-reduced-motion` (opacidad sola, sin desplazamiento).

| Qué | Frecuencia / propósito | Herramienta | Detalle |
|---|---|---|---|
| Botones (press) | Decenas de veces / feedback | Transición CSS | `scale(0.97)` en `:active`, 160 ms, ease-out. Ya en fase 3. |
| Menú mobile | Ocasional / evitar un salto brusco | Transición CSS (receta accordion) | Altura medida en JS (nunca `auto`) y opacidad, 200 ms, ease-out. Cerrado: `inert`. |
| Indicador de tabs | Ocasional / indicar estado | Transición de `clip-path` (receta tab indicator) | Copia de la lista en estado activo, recortada con `inset()` hasta la pestaña elegida, 250 ms, ease-in-out. Las pestañas reales quedan neutras solo cuando hay JS. |
| Panel de cursos al cambiar de pestaña | Ocasional / evitar un salto | `@starting-style` | Opacidad y 6 px de subida, 200 ms. |
| Lista de cursos del panel | Ocasional / jerarquía | Animación CSS (receta stagger) | 300 ms por ítem, 50 ms de retraso entre ítems, no bloquea la interacción. |
| Hero | Primera vez / delight | `@starting-style` | Texto y foto suben 10 px con opacidad, 400 ms; la foto con 80 ms de retraso. Sin JS. |
| Scroll reveal | Superficie de marketing / jerarquía | `IntersectionObserver` + transición (receta) | Una sola vez por bloque. Títulos de sección, cards de Cambridge y Sedes, pasos y bloques de La Academia, con 80 ms de escalonado entre hermanos. |
| Transiciones entre páginas | Para los posts de la fase 6 | `<ClientRouter />` de Astro | Ya incluido en `Base.astro`. Todos los scripts se inician en `astro:page-load` y son idempotentes. |

## Decisiones y hallazgos

- **Sin JS no se oculta nada.** Los estados iniciales del reveal dependen de la clase `js` que agrega un script inline en el `<head>`.
- **`clip-path` e `IntersectionObserver`.** Chrome respeta el `clip-path` del elemento al calcular la intersección: con `inset(0 0 100% 0)` el área visible es cero y el observer nunca dispara. Por eso se observa el contenedor (`[data-reveal]`) y el recorte se aplica a sus hijos (`[data-reveal] > *`).
- **Scroll-driven animations de CSS** (`animation-timeline: view()`): no se usaron. Con motion 3 la receta con `IntersectionObserver` alcanza y funciona en todos los navegadores; queda como mejora opcional.
- **Qué no se anima:** el footer, los íconos, los links de la nav y el header al hacer scroll. No tenían un propósito claro.

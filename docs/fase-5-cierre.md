# Fase 5: cierre

Fecha: 2026-10-12. Datos estructurados, revisión de SEO técnico, prueba responsive y de accesibilidad, Lighthouse y pasada final con el skill Taste. Además, en esta fase el instituto entregó el logo en PNG y reemplaza al escudo calcado.

## Logo nuevo

- `src/assets/logo/logo.png` (1254 px, RGBA) es el archivo que entregó el instituto, con los dos leones. Se conserva intacto. `logo-recortado.png` es la misma imagen sin los márgenes transparentes (1190 × 885) y es la que usan los componentes.
- `Logo.astro` lo sirve con `<Image>` de `astro:assets` (webp a 1x y 2x, alto por prop). Como el logo es más ancho que el escudo anterior, el header ocupa 54 px de ancho a 40 px de alto.
- Favicons derivados con PIL (script en el historial de la fase, no se guarda en el repo): `favicon.ico` (16, 32 y 48), `favicon-96.png`, `apple-touch-icon.png` (180, fondo crema porque iOS no admite transparencia). A 16 px los leones se funden pero el escudo se reconoce.
- `og.jpg` (1200 × 630) regenerado con el logo, el nombre y la bajada en Plus Jakarta Sans, renderizado en el navegador headless.
- Borrados `src/assets/logo/escudo.svg` y `public/favicon.svg`. Cuando llegue el SVG original, se reemplaza `logo-recortado.png` en `Logo.astro` y se vuelven a derivar favicons y OG.

## Datos estructurados (JSON-LD)

- `src/lib/datos-estructurados.ts` arma un `@graph` con una `EducationalOrganization` (nombre, siglas como `alternateName`, logo en PNG de 600 px, `foundingDate`, email, teléfono de la sede principal, `sameAs` con Facebook, `areaServed`, `location` y `subOrganization`) y una `LocalBusiness` por sede (`parentOrganization`, teléfonos con código de país, email, `PostalAddress` con calle, barrio, CABA y país, `openingHoursSpecification`, `hasMap` a Google Maps). `DatosEstructurados.astro` lo inyecta en el `<head>` desde `Base.astro`.
- Todo sale de las collections. El horario de atención se guarda en español para la dueña ("Lunes a viernes", "15:30 a 20:30") y `parsearDias` / `parsearHoras` lo traducen al formato de schema.org; si el texto no se reconoce, el horario no se publica en vez de publicarse mal.
- Formato verificado contra la guía de Google de LocalBusiness y schema.org (2026-10-12). Validar en producción con https://validator.schema.org y la prueba de resultados enriquecidos de Google cuando el dominio esté publicado.
- Sin `geo` ni `postalCode`: no hay coordenadas ni código postal confirmados en los datos. Si la dueña los confirma, `codigoPostal` ya existe en el esquema de `sedes` y se publica solo.

## SEO técnico revisado en el HTML generado

- `title` y `meta description` del instituto, `canonical` absoluto, Open Graph completo (`og:image` 1200 × 630 con alt) y Twitter card con alt.
- `sitemap-index.xml` y `sitemap-0.xml` con la única URL; `robots.txt` permite todo, bloquea `/keystatic` y apunta al sitemap.
- Favicons en ICO y PNG (ver arriba), `theme-color`, `lang="es-AR"`.

## Prueba responsive y de accesibilidad (skill browser-automation)

- Sin scroll horizontal en 390, 768, 1024 y 1280 px. Sin errores de consola ni requests fallidas.
- Orden de encabezados correcto (un H1; H2 por sección; H3 y H4 anidados). Todas las imágenes tienen `alt` (vacío solo en el logo cuando va junto al nombre). Todos los links externos llevan `rel="noopener"`. Botones con nombre accesible.
- Teclado: "Ir al contenido" es el primer tab; header, hero y tabs reciben foco con anillo visible. En las tabs, flechas, Home y End cambian de pestaña y el Tab siguiente entra al panel. Menú mobile: Enter abre, Tab entra a los links, Escape cierra.
- Sin JavaScript se ve todo: ningún elemento queda con opacidad 0, el primer panel de cursos está visible y la pestaña activa se pinta en verde.
- Capturas en 390, 768, 1024 y 1280 px revisadas una por una.

**Corregido en esta fase**
1. Con `prefers-reduced-motion`, el hero quedaba invisible: la regla de reduced motion ponía `animation: none; opacity: 0` en eyebrow, bajada, CTAs y foto. Ahora entran con un fundido de 400 ms sin desplazamientos.
2. Al cerrar el menú mobile con Escape, el foco se perdía en el `body` (el panel pasa a `inert`). Ahora vuelve al botón del menú.
3. En 768 px la nav de escritorio no entraba junto al logo nuevo y el nombre se truncaba a "Acade…". La nav y el CTA aparecen desde `lg` (1024 px); hasta ahí, hamburguesa.
4. En 768 px las tres cards de Cómo empezar quedaban a 200 px con el texto apretado. Se apilan hasta `lg` y el haz baja en vertical.

## Lighthouse (build de producción, `astro preview`, Chrome headless)

| | Performance | Accesibilidad | Buenas prácticas | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Mobile | 99 | 100 | 100 | 100 | 1,2 s | 2,1 s | 0 ms | 0,003 |
| Escritorio | 100 | 100 | 100 | 100 | 0,3 s | 0,5 s | 0 ms | 0,005 |

- El LCP en mobile es el H1, no la foto (en mobile la foto va debajo del texto). Su "render delay" de unos 680 ms viene de la entrada palabra por palabra (120 ms de retraso más 45 ms por palabra y 700 ms de animación). Está dentro del umbral de 2,5 s, así que la máscara de la foto no se tocó.
- Lo único que Lighthouse señala son sugerencias (insights) sin costo en el puntaje: 49 KiB de ahorro posible en la foto del hero y el CSS que bloquea el render unos 190 ms. Se dejan como están: la foto es provisoria y el CSS es un único archivo chico.

## Pre-Flight Check del skill Taste (sección 14)

Se corrió contra la página entera. Pasan: cero guiones largos, "&" ni separadores decorativos en el texto visible; un solo tema (claro) con la banda de Cambridge como único bloque de color; un acento (verde) con el dorado como detalle y el verde de WhatsApp solo en sus botones; un sistema de radios (8 / 16 / pill); contraste AA en todos los botones; ningún CTA envuelve a dos líneas en escritorio; sin formularios propios; sin serif; hero en el viewport con cuatro elementos y 17 palabras de bajada; un solo eyebrow en toda la página; sin split-header; dos secciones consecutivas con partición texto/imagen como máximo; una etiqueta por intención de CTA; seis familias de layout distintas; listas cortas (ningún panel supera cuatro cursos); fotos reales con crédito; sin etiquetas sobre fotos, sin pies de foto decorativos, sin versiones ni señales de scroll; íconos de una sola familia; motion con propósito documentado por sección y versión suave para reduced motion; Core Web Vitals en verde.

Excepciones conscientes, decididas en fases anteriores y que se mantienen:
- **Solo modo claro** (decisión del proyecto).
- **Cómo empezar son tres cards iguales en fila.** El skill desaconseja la fila de tres cards idénticas; acá representan un proceso en orden, con número, ícono y el haz que conecta una con la siguiente, y se apilan en vertical hasta 1024 px. Si en una revisión futura se quiere romper la simetría, la alternativa es una lista numerada con el haz vertical también en escritorio.
- **Los números 01, 02, 03** de los pasos son numeración de un proceso (con "Paso N" solo para lectores de pantalla), no eyebrows de sección.
- **Stack Astro sin React** y Material Symbols en lugar de las librerías que propone el skill (ajustes de `CLAUDE.md`).

## Pendientes que siguen abiertos

- Confirmar horario de atención (dato de 2020; hoy se publica también en el JSON-LD), código postal y coordenadas de cada sede.
- Validar el JSON-LD con las herramientas de Google una vez publicado el dominio.
- Fotos provisorias de Unsplash y logo en PNG: se reemplazan cuando el instituto entregue fotos y el SVG.
- Apoyo escolar en Niños o Adultos; dudas de `docs/fase-1-analisis.md` §6 sin respuesta.

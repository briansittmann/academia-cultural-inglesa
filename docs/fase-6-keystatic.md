# Fase 6: panel de administración (Keystatic)

Fecha: 2026-10-12. Versiones verificadas con Context7 y npm: `@keystatic/core` 0.6.9, `@keystatic/astro` 6.0 (compatible con Astro 7), `@astrojs/react` 7 + React 19 (solo para el panel), `@astrojs/netlify` 8.

## Qué quedó armado

- **`keystatic.config.ts`** (raíz) mapea las cinco collections de `src/content/` a formularios con etiquetas y ayudas en español: singleton `Instituto` y collections `Novedades`, `Cursos`, `Públicos` y `Sedes`. Formato YAML, mismos archivos que lee Astro. Navegación del panel en dos grupos: "Contenido" (lo que la dueña toca seguido) y "Estructura" (sedes y públicos, que cambian poco). Interfaz en español (`locale: 'es-ES'`; quedan en inglés algunos textos internos de Keystatic como "Save" en el singleton, "Choose file" o "Regenerate").
- **Validaciones** en el panel: campos obligatorios, email con formato, teléfono para marcar con `+54...`, WhatsApp internacional solo dígitos, ancla de público en minúsculas, título y descripción SEO con largo máximo. Las listas (teléfonos, horarios, niveles, pasos) muestran un resumen por ítem.
- **Cambridge** pasó a un campo condicional ("Prepara para un examen de Cambridge"), así los demás cursos no muestran campos de examen. Keystatic lo guarda como `cambridge: { discriminant, value }` y `src/content.config.ts` lo aplana con un `preprocess`, de modo que los componentes siguen leyendo `curso.data.cambridge?.examen`. `fce.yaml` y `cae.yaml` se migraron a ese formato; el esquema acepta también el objeto directo escrito a mano.
- **Íconos** de los pasos de "Cómo empezar": select limitado a los Material Symbols listados en `astro.config.mjs`, para que un ícono nuevo no rompa el build.
- **Fotos.** Keystatic guarda cada imagen en `<carpeta>/<slug>/<campo>.<ext>` (en el singleton, `<carpeta>/<objeto>/<campo>.<ext>`) y escribe en el YAML la ruta relativa que pide `astro:assets`. Por eso `src/assets/img/` quedó con una carpeta por collection: `instituto/hero/foto.jpg`, `publicos/ninos/foto.jpg`, etc. (créditos actualizados en `CREDITOS.md`). **Si una foto no está en esa estructura, el panel no la encuentra y la saca del YAML al guardar**: pasó en la prueba con `cursos-ninos.jpg` suelto en `src/assets/img/`.
- **Astro:** `output: 'static'` se mantiene; la landing se prerenderiza y no carga React. El adaptador de Netlify solo sirve las rutas `/keystatic` y `/api/keystatic`, que la integración inyecta con `prerender: false`. `imageCDN: false` (las imágenes las procesa `astro:assets` en el build) y `devFeatures: { edgeFunctions: false, images: false }` (la emulación de Edge Functions en desarrollo pide Deno y tiraba errores en cada arranque). El sitemap sigue con una sola URL y `robots.txt` ya bloqueaba `/keystatic`.
- **Almacenamiento:** `local` en desarrollo (`astro dev`, panel en `http://127.0.0.1:4321/keystatic`, escribe directo en los archivos) y Keystatic Cloud en producción cuando existe `PUBLIC_KEYSTATIC_CLOUD_PROJECT` (`equipo/proyecto`, ver `.env.example`). Sin la variable, el panel publicado quedaría en modo local y no funcionaría: hay que cargarla en Netlify.
- **Deploy:** `netlify.toml` con `npm run build` y `dist/`; Node según `.node-version` (22). Cada guardado desde el panel es un commit en el repo y Netlify reconstruye el sitio.

## Pruebas hechas (panel en modo local, navegador headless)

1. Las cinco secciones del panel abren todas las entradas existentes sin errores de validación.
2. Crear un curso nuevo ("Prueba del panel", público Adultos): se escribió `src/content/cursos/prueba-del-panel.yaml` con arrays vacíos y `cambridge: { discriminant: false }`; el build lo tomó y el curso apareció en la pestaña Adultos.
3. Crear una novedad con un flyer subido desde el panel: imagen en `src/assets/img/novedades/prueba-novedad/flyer.png` y ruta relativa correcta en el YAML.
4. Guardar entradas existentes (Instituto, Públicos > Niños): Keystatic reescribe el YAML con sus propios saltos de línea (texto plegado con `>-`) y agrega los booleanos por defecto; el contenido no cambia. Las fotos se conservan una vez ordenadas en la estructura de arriba.

Todas las entradas de prueba se borraron después.

## Lo que falta para que la dueña entre (lo hace el dueño del proyecto)

1. Subir el repo a GitHub (`git push`) y crear el sitio en Netlify desde ese repo (detecta `netlify.toml`).
2. En https://keystatic.cloud crear una cuenta, un equipo y un proyecto conectado al mismo repo. Copiar el nombre `equipo/proyecto`.
3. En Netlify, cargar la variable de entorno `PUBLIC_KEYSTATIC_CLOUD_PROJECT` con ese valor y redesplegar.
4. Invitar a la dueña al equipo de Keystatic Cloud (plan gratuito: hasta 3 usuarios por equipo). Entra con su cuenta de Keystatic, sin GitHub, en `https://<dominio>/keystatic`.
5. Probar el flujo completo en producción: editar una novedad, subir una foto y ver el deploy automático.

## Pendientes y notas

- `npm audit` marca 13 vulnerabilidades altas, todas en dependencias de desarrollo del adaptador de Netlify (`@netlify/dev`, `ipx`, `braces`, `node-forge`, `sharp` dentro de `ipx`). No corren en el sitio publicado. La corrección automática exige `npm audit fix --force` con cambios de versión mayores; revisar cuando `@astrojs/netlify` publique una versión que las resuelva.
- Posts y eventos como páginas secundarias (fase 1 §8) no se modelaron todavía: la landing sigue siendo una sola página. Cuando se decidan, se agrega una collection `posts` en los dos lados (`content.config.ts` y `keystatic.config.ts`) y una ruta `src/pages/novedades/[slug].astro`.
- Si se agrega o renombra un campo, hay que tocar `src/content.config.ts` y `keystatic.config.ts` a la vez.

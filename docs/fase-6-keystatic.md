# Fase 6: panel de administración (Keystatic)

Fecha: 2026-10-12. Versiones verificadas con Context7 y npm: `@keystatic/core` 0.6.9, `@keystatic/astro` 6.0 (compatible con Astro 7), `@astrojs/react` 7 + React 19 (solo para el panel), `@astrojs/vercel` 11. (La primera versión de esta fase usó Netlify; el hosting es Vercel y se cambió el adaptador el mismo día.)

## Qué quedó armado

- **`keystatic.config.ts`** (raíz) mapea las cinco collections de `src/content/` a formularios con etiquetas y ayudas en español: singleton `Instituto` y collections `Novedades`, `Cursos`, `Públicos` y `Sedes`. Formato YAML, mismos archivos que lee Astro. Navegación del panel en dos grupos: "Contenido" (lo que la dueña toca seguido) y "Estructura" (sedes y públicos, que cambian poco). Interfaz en español (`locale: 'es-ES'`; quedan en inglés algunos textos internos de Keystatic como "Save" en el singleton, "Choose file" o "Regenerate").
- **Validaciones** en el panel: campos obligatorios, email con formato, teléfono para marcar con `+54...`, WhatsApp internacional solo dígitos, ancla de público en minúsculas, título y descripción SEO con largo máximo. Las listas (teléfonos, horarios, niveles, pasos) muestran un resumen por ítem.
- **Cambridge** pasó a un campo condicional ("Prepara para un examen de Cambridge"), así los demás cursos no muestran campos de examen. Keystatic lo guarda como `cambridge: { discriminant, value }` y `src/content.config.ts` lo aplana con un `preprocess`, de modo que los componentes siguen leyendo `curso.data.cambridge?.examen`. `fce.yaml` y `cae.yaml` se migraron a ese formato; el esquema acepta también el objeto directo escrito a mano.
- **Íconos** de los pasos de "Cómo empezar": select limitado a los Material Symbols listados en `astro.config.mjs`, para que un ícono nuevo no rompa el build.
- **Fotos.** Keystatic guarda cada imagen en `<carpeta>/<slug>/<campo>.<ext>` (en el singleton, `<carpeta>/<objeto>/<campo>.<ext>`) y escribe en el YAML la ruta relativa que pide `astro:assets`. Por eso `src/assets/img/` quedó con una carpeta por collection: `instituto/hero/foto.jpg`, `publicos/ninos/foto.jpg`, etc. (créditos actualizados en `CREDITOS.md`). **Si una foto no está en esa estructura, el panel no la encuentra y la saca del YAML al guardar**: pasó en la prueba con `cursos-ninos.jpg` suelto en `src/assets/img/`.
- **Astro:** `output: 'static'` se mantiene; la landing se prerenderiza y no carga React. El adaptador de Vercel (sin opciones) solo sirve las rutas `/keystatic` y `/api/keystatic`, que la integración inyecta con `prerender: false`; en `.vercel/output/config.json` quedan enrutadas a la función `_render`. Las imágenes las sigue procesando `astro:assets` en el build (el adaptador no activa la optimización de imágenes de Vercel). El sitemap sigue con una sola URL y `robots.txt` ya bloqueaba `/keystatic`.
- **Salida del build:** con el adaptador, la página estática queda en `dist/client/` (y la función en `dist/server/` y `.vercel/output/`). `astro preview` no funciona con el adaptador de Vercel: para revisar el build servir `dist/client` con cualquier servidor estático (`npx -y serve dist/client -l 4321`).
- **Almacenamiento:** `local` en desarrollo (`astro dev`, panel en `http://127.0.0.1:4321/keystatic`, escribe directo en los archivos) y Keystatic Cloud en producción cuando existe `PUBLIC_KEYSTATIC_CLOUD_PROJECT` (`equipo/proyecto`, ver `.env.example`). Sin la variable, el panel publicado quedaría en modo local y no funcionaría: hay que cargarla en Vercel.
- **Deploy:** Vercel detecta Astro y usa `npm run build`; no hace falta `vercel.json`. La versión de Node del proyecto se elige en Vercel (22.x; `engines.node >= 22.12` en `package.json`). El build local con Node 23 avisa que esa versión no existe en Vercel Functions, pero el que importa es el de Vercel. Cada guardado desde el panel es un commit en el repo y Vercel reconstruye el sitio.

## Pruebas hechas (panel en modo local, navegador headless)

1. Las cinco secciones del panel abren todas las entradas existentes sin errores de validación.
2. Crear un curso nuevo ("Prueba del panel", público Adultos): se escribió `src/content/cursos/prueba-del-panel.yaml` con arrays vacíos y `cambridge: { discriminant: false }`; el build lo tomó y el curso apareció en la pestaña Adultos.
3. Crear una novedad con un flyer subido desde el panel: imagen en `src/assets/img/novedades/prueba-novedad/flyer.png` y ruta relativa correcta en el YAML.
4. Guardar entradas existentes (Instituto, Públicos > Niños): Keystatic reescribe el YAML con sus propios saltos de línea (texto plegado con `>-`) y agrega los booleanos por defecto; el contenido no cambia. Las fotos se conservan una vez ordenadas en la estructura de arriba.

Todas las entradas de prueba se borraron después.

## Puesta en producción (2026-10-12)

Hecho por Brian:

1. Repo en GitHub e importado en Vercel: https://academia-cultural-inglesa.vercel.app/.
2. En https://keystatic.cloud: equipo `academia-cultural` y proyecto `academia-web-page`, conectado al repo. Keystatic Cloud muestra un bloque de configuración con `storage: { kind: 'cloud' }` y `cloud: { project }`: no hace falta copiarlo, `keystatic.config.ts` ya arma eso a partir de la variable. "Project URL": `https://academia-cultural-inglesa.vercel.app` (cambiarlo al dominio cuando se apunte, porque es adonde vuelve el usuario después de iniciar sesión).
3. En Vercel (Settings > Environment Variables): `PUBLIC_KEYSTATIC_CLOUD_PROJECT=academia-cultural/academia-web-page`, con visibilidad **Config**. Si se marca como secreta, Vercel no la guarda ("Environment variables with a public framework prefix cannot use `visibility: secret`"). Puede mostrar también un aviso porque el nombre contiene "KEY": no es un problema, el valor no es secreto. La variable se lee al construir, así que cada cambio pide redesplegar.
4. Inicio de sesión y guardado probados en producción.

**Error 500 en `/keystatic` y su arreglo.** Con `@astrojs/vercel` 11.0.13 la función del panel incluía un `import "rolldown"` (el empaquetador de Vite, que solo sirve en el build) y en Vercel no estaba su binario nativo: `FUNCTION_INVOCATION_FAILED`. La landing no se vio afectada porque es estática. La 11.0.14 lo corrige. Para reproducir un error de la función sin la CLI de Vercel: copiar `.vercel/output/functions/_render.func` fuera del repo con `cp -RL` (dentro del repo Node encuentra los paquetes del `node_modules` del proyecto y el error no aparece) e importar su `.vercel/output/server/entry.mjs`, que exporta `default.fetch(request)`.

Falta:

- Invitar a la dueña al equipo de Keystatic Cloud (plan gratuito: hasta 3 usuarios por equipo). Entra con su cuenta de Keystatic, sin GitHub, en `/keystatic`.
- Apuntar el dominio y actualizar el "Project URL" de Keystatic Cloud.

## Qué se puede cambiar de la interfaz del panel

Keystatic no deja agregar pantallas propias (por ejemplo, un tablero de SEO o de estadísticas). Lo configurable es `ui.brand.name` (hoy "Academia Cultural Inglesa"), `ui.brand.mark` (un componente de React con el logo, que recibe `colorScheme`), `ui.navigation` (grupos y orden), y las etiquetas, ayudas y validaciones de cada campo. Las estadísticas y el SEO se miran con herramientas aparte (ver ideas abiertas en `docs/claude-project/contexto.md`).

## Pendientes y notas

- `npm audit` marca 3 vulnerabilidades altas (siguen con la 11.0.14), todas `path-to-regexp` dentro de `@vercel/routing-utils`, que `@astrojs/vercel` usa solo en el build para generar la configuración de rutas. No corre en el sitio publicado. La corrección propuesta es bajar a `@astrojs/vercel` 8, incompatible con Astro 7; revisar cuando salga una versión del adaptador que la resuelva.
- Posts y eventos como páginas secundarias (fase 1 §8) no se modelaron todavía: la landing sigue siendo una sola página. Cuando se decidan, se agrega una collection `posts` en los dos lados (`content.config.ts` y `keystatic.config.ts`) y una ruta `src/pages/novedades/[slug].astro`.
- Si se agrega o renombra un campo, hay que tocar `src/content.config.ts` y `keystatic.config.ts` a la vez.

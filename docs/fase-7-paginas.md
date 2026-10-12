# Fase 7: páginas de cursos y novedades

Fecha: 2026-10-12. Pedido del dueño después de la fase 6: la landing resumía cada curso en 30 o 40 palabras y las páginas originales tenían entre 100 y 400; además la web vieja comunicaba con flyers en la portada y no había dónde cargarlos. Se agregan páginas propias por curso y por novedad, editables desde el panel, más las redirecciones 301 desde las URLs de WordPress.

## Qué quedó armado

- **Cursos y novedades pasan a Markdown con frontmatter** (`src/content/cursos/*.md`, `src/content/novedades/*.md`): el mismo YAML de antes más un cuerpo de texto largo. En Keystatic el cuerpo es el campo "Texto de la página" (`fields.markdoc` con `extension: 'md'`, editor limitado a párrafos, subtítulos, negrita, cursiva, listas y links; sin imágenes ni tablas). Astro lo renderiza con `render()`. Los textos de los 13 cursos se migraron de las páginas originales, limpios, en voseo y sin relleno genérico; los datos duros siguen en los campos estructurados.
- **`/cursos/<slug>`** (`src/pages/cursos/[slug].astro`): cabecera con el público (link de vuelta a su pestaña), nombre, pill (nivel del examen en Cambridge, etiqueta en el resto) y "para quién"; cuerpo Markdown a la izquierda y ficha pegajosa a la derecha con cursada, período, modalidad y sede, horarios, certificado, niveles, links a las novedades vigentes que incluyen el curso ("Fechas y horarios") y los dos CTAs. JSON-LD `Course` con `provider` apuntando a la organización. Title y description propios.
- **`/novedades/<slug>`** (`src/pages/novedades/[slug].astro`): solo las vigentes. Cabecera con período y resumen, cuerpo, "Días y horarios" (la lista `horarios` de la entrada, con nombre, sede y fechas), "Cursos incluidos" como tarjetas con link, y a la derecha el flyer (si hay) y los CTAs. Al compartir, la imagen de Open Graph es el flyer (con sus dimensiones reales; `Base.astro` acepta `ogImageAncho`, `ogImageAlto` y `ogImageAlt`).
- **Franja "Novedades"** (`src/components/secciones/Novedades.astro`) debajo de la portada: una tarjeta por novedad vigente con flyer (o un ícono si no hay), período, título, resumen y "Ver más". El período va como texto dorado y no como pastilla, porque uno largo ("Ciclo 2027, de marzo a diciembre") desbordaba la página a 320 px. Si no hay vigentes, la sección no se renderiza.
- **Links desde la landing:** "Más sobre el curso" en cada curso de las pestañas (link en reposo; botón verde relleno cuando el mouse pasa por el curso o cuando recibe el foco del teclado, pedido del dueño para que se note que es clickeable; el padding está siempre; al volverse botón se desliza 12 px a la derecha para que el fondo quede alineado al margen del curso y no sobresalga, y vuelve al sacar el mouse; con movimiento reducido se acomoda sin deslizarse) y en las filas de Cambridge; "Novedades" en el footer. Las anclas del header y el footer pasaron a `/#...` para funcionar desde las páginas secundarias (probado: desde `/cursos/fce`, "Cursos" lleva a la portada y `/#adolescentes` abre su pestaña).
- **Redirecciones 301** en `astro.config.mjs` desde las 30 URLs de la web vieja (una por curso, las páginas de menú, contacto, ubicación, quiénes somos, test de nivel y blog) hacia la página del curso o el ancla de la landing. `trailingSlash: 'never'` para que el adaptador genere también la redirección de `/ruta/` a `/ruta` y las URLs viejas con barra final caigan en el 301.
- **Estilos:** `.prosa` en `global.css` para el Markdown (medida de 62 caracteres, subtítulos, listas con viñeta verde, links) y `.tarjeta-link` para las tarjetas que son un link entero.

## Cómo lo usa la dueña

- **Curso nuevo:** Cursos > Agregar, completa nombre, público, "para quién", descripción corta (portada) y el texto de la página; la página `/cursos/<slug>` y su lugar en la pestaña aparecen solos en el próximo deploy.
- **Campaña o evento:** Novedades > Agregar, completa título, tipo, período, resumen, texto largo, sube el flyer, carga los horarios si los hay, marca los cursos incluidos y la casilla "Vigente". Aparece en la portada y tiene su página. Cuando termina, desmarca "Vigente": desaparece de la portada y la página deja de publicarse.
- Lo que sigue siendo código: el diseño de las páginas, dónde va la franja de novedades, las secciones de la landing.

## Pruebas

- Build con 13 páginas de cursos, 2 de novedades y 30 redirecciones; `astro check` sin errores.
- Panel: el editor carga el texto migrado de un curso y, al guardar con un cambio en la descripción, el archivo conserva frontmatter y cuerpo.
- Navegador headless: sin scroll horizontal en 390 y 1280 px en las páginas nuevas; encabezados en orden (H1 y H2); JSON-LD de organización más `Course` en los cursos; navegación entre portada y subpáginas con el ClientRouter.
- Lighthouse mobile en `/cursos/fce`: performance 99, accesibilidad 100 (tras corregir la estructura del `dl` de la ficha), buenas prácticas 100, SEO 100.

## Pendientes

- Las fechas y horarios de febrero 2027 y del ciclo 2027 siguen sin cargarse (los carga la dueña en la novedad correspondiente).
- Vencimiento automático de novedades por fecha "hasta": hoy es manual (casilla "Vigente"). Si hace falta, se puede filtrar por fecha en el build y programar una reconstrucción semanal en Vercel.
- Las novedades no vigentes (referencias 2026) no tienen página; si se marca una como vigente, la tiene.

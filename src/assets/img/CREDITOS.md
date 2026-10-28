# Créditos de imágenes provisorias

Fotos de Unsplash (licencia Unsplash, no Unsplash+) descargadas al proyecto, a
reemplazar por fotos reales del instituto.

La estructura de carpetas es la que usa el panel de Keystatic: una carpeta por
collection y, adentro, una por entrada (`publicos/ninos/foto.jpg`) o por campo del
singleton (`instituto/hero/foto.jpg`). Si se mueve una foto a mano, el panel deja de
encontrarla y la borra del YAML al guardar.

| Archivo | Uso | Autor | Link |
|---|---|---|---|
| `instituto/hero/foto.jpg` | Hero | Yegor Makarenko | https://unsplash.com/photos/adult-and-children-in-classroom-WGEgIC76RjA |
| `publicos/ninos/foto.jpg` | Cursos: niños | Yegor Makarenko | https://unsplash.com/photos/boys-drawing-at-classroom-table-vOpkxzkJx9I |
| `publicos/adolescentes/foto.jpg` | Cursos: adolescentes | Vitaly Gariev | https://unsplash.com/photos/teacher-pointing-at-students-with-raised-hands-HIheRKI9mTs |
| `publicos/adultos/foto.jpg` | Cursos: adultos | Brooke Cagle | https://unsplash.com/photos/three-people-sitting-in-front-of-table-laughing-together-g1Kr4Ozfoac |
| `publicos/verano/foto.jpg` | Cursos: verano | Subida desde el panel en octubre de 2026 (reemplazó a la de Unsplash). Origen a confirmar | |

**Fotos reales del instituto**

| Archivo | Uso | Origen |
|---|---|---|
| `instituto/academia/foto.jpg` | La Academia: fachada de la sede Villa Urquiza | Entregada por el dueño del proyecto (2026-10-12) |
| `novedades/inscripciones-2027/foto.jpg` | Novedades: tarjeta de Inscripciones 2027 | Recorte del flyer "Inscripciones 2026" del sitio viejo (`content/imagenes/flyers/inscripcion-2026.jpg`), sin el año |
| `novedades/verano-2027/foto.jpg` | Novedades: tarjeta de Verano 2027 | Recorte de la ilustración del flyer "Verano 2026" del sitio viejo (`content/imagenes/flyers/adultos-verano-2026.jpg`), sin año ni fechas |

El logo (`src/assets/logo/logo.png`, y `logo-recortado.png` sin márgenes) es el PNG que
entregó el instituto. Cuando llegue el SVG original se reemplaza en `Logo.astro` y se vuelven
a derivar los favicons y `public/og.jpg` (ver `docs/fase-5-cierre.md`).

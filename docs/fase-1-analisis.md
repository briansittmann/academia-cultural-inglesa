# Fase 1: análisis y auditoría del diseño

Fecha: 2026-10-11. Sin código. Insumos: `content/README.md`, `content/pagina-actual/`, `Referencias/stitch_modern_cultural_inglesa_redesign/` (DESIGN.md, code.html, screen.png) y el skill `design-taste-frontend`.

## 1. Design Read (skill Taste)

> Reading this as: **rediseño (overhaul visual, contenido preservado)** de una landing de negocio local para **familias y adultos de Villa Urquiza / Villa del Parque**, con un lenguaje **cálido y de confianza** (trust-first), apoyado en **Astro + Tailwind v4 + CSS nativo**, paleta verde/dorado del escudo y Plus Jakarta Sans como tipografía principal.

**Modo:** "Redesign - Overhaul". El borrador de Stitch aporta estructura, paleta y tono; el contenido sale de la web actual y de `content/README.md`. La arquitectura de URLs ya está decidida (una sola página con anclas; redirecciones 301 más adelante).

**Diales** (escala 1-10 del skill, perfil "trust-first / familias", mobile-first):

| Dial | Stitch | Propuesta | Por qué |
|---|---|---|---|
| DESIGN_VARIANCE | 4 (grillas simétricas, todo en cards) | **5** | Un poco de asimetría (hero partido, bloque de cifra + texto) sin perder claridad |
| MOTION_INTENSITY | 2 | **3** | Motion bajo: hover/press, scroll reveal una sola vez, tabs. Nada perpetuo |
| VISUAL_DENSITY | 4 | **4-5** | Hay horarios y datos concretos; se agrupan, no se esconden |

**Modo claro solamente** (decisión del proyecto; pisa la regla de dark mode del skill).

## 2. Auditoría del borrador de Stitch

### 2.1 Qué se conserva

- **Paleta**: verde bosque (`#2E6B34` primario, `#1B4321` profundo), dorado académico (`#C69214`), fondo crema (`#FBFBF9`), tintes verde claro para secciones alternas, blanco para cards. Coincide con el escudo y con el flyer de inscripciones 2026 (verde oscuro + mostaza). Sombras tintadas de verde (regla del DESIGN.md), no negras.
- **Tipografía display**: Plus Jakarta Sans para títulos. Geométrica pero cálida, no es Inter, y está en Fontsource.
- **Esqueleto de secciones**: header, hero, cursos con filtro por público, bloque Cambridge, "por qué elegirnos", sedes con WhatsApp, footer. El orden es correcto para el embudo (qué hay, por qué, dónde, cómo contacto).
- **Filtro Niños / Adolescentes / Adultos**: es la forma natural de navegar la oferta. Se conserva como tabs (receta "tab indicator").
- **Sedes como dos cards con WhatsApp directo**: es la conversión principal del negocio (la web actual vive de los links a WhatsApp).
- **Bloque Cambridge en banda verde oscura**: un único cambio de tono en la página, para destacar el diferencial de prestigio. Permitido una vez (regla "color block" del skill).
- **Sistema de radios** 8 px (controles) / 16 px (cards). Pills solo para etiquetas.
- **Íconos Material Symbols**: Stitch ya los usa; pasan a `astro-icon` + Iconify (decisión del proyecto).

### 2.2 Qué se cambia y por qué

| # | Problema en Stitch | Regla / criterio | Cambio |
|---|---|---|---|
| 1 | Dos barras arriba (anuncio + nav con 5 ítems, tagline "Excelencia Académica & Cambridge Prep" y 2 CTAs). En mobile no entra nada. | Nav en una línea, ≤ 80 px, un CTA | Header único y compacto (64-72 px): escudo + nombre, 4 anclas (Cursos, Cambridge, Sedes, Nosotros) y un solo CTA de WhatsApp. Hamburguesa en mobile. "Inscripciones abiertas" pasa al hero. |
| 2 | Hero con 7 elementos: badge, H1 de 3 líneas con una línea en serif itálica, párrafo, 2 CTAs, 4 "métricas" (incl. "100% Presencial & Virtual", que no dice nada) y una card flotante sobre la foto. | Hero ≤ 4 elementos; sin énfasis en otra familia tipográfica; sin trust-strip dentro del hero | Hero partido (texto / foto): eyebrow "Inscripciones abiertas", H1 de 2 líneas, bajada ≤ 20 palabras, CTA primario WhatsApp + secundario "Ver cursos". Se elimina la serif, las métricas y la card flotante. |
| 3 | 6 cards idénticas con foto IA cada una, y textos inventados (Young Learners, apoyo escolar "sin costo extra", simulacros, "100% online sincrónico", "descuento Pack", "Híbrido"). Tabs con "Todos" y una pestaña que se cae de línea. | Ban de cards iguales en serie; datos reales; "Jane Doe effect" | Tabs Niños / Adolescentes / Adultos / Verano, sin "Todos". Cada panel muestra la **progresión real de niveles** (Kiddies → Elementary 1-4 → Pre-Intermediate 1-2 → Intermediate 1-3 → Pre-First → FCE → CAE) con carga horaria y duración reales, no una card de marketing por curso. Una foto por público (no por curso). Tabs con scroll horizontal en mobile. |
| 4 | 5 etiquetas de CTA distintas para la misma intención ("Consultar Vacantes", "Ver Horarios y Planes", "Consultar Nivel Teens", "Consultar Aranceles", "Anotarme en Verano"). | No duplicar intención de CTA | Dos intenciones, dos etiquetas en toda la página: **"Pedir información"** (formulario de Google del curso) y **"Escribir por WhatsApp"** (contacto). |
| 5 | Cambridge: "Centro de Preparación Oficial", "promedio de aprobación histórico sobresaliente", "mock exams cronometrados", "coaching de oratoria", "mesas oficiales 2026", "cupos estrictamente reducidos". Título "B2 First (FCE)" se superpone con el párrafo. | Datos no verificados; copy de relleno | Usar lo que dice la web actual: "Somos sede de este examen internacional" y "altísimo porcentaje de alumnos aprobados", más días y horarios reales por sede. Dos cards (B2 First, C1 Advanced), sin sub-cards internas. |
| 6 | "¿Por qué elegir…?": 3 cards iguales; la del apoyo escolar "integrado" es falsa; la de docentes exagera ("mejores profesorados universitarios"). | Ban de 3 cards iguales; claims reales | Sección **"La Academia"** que fusiona "Por qué nos destacamos" + "Quiénes somos": una cifra grande (carga horaria: +2 / +3 meses de clase por año, dato real del flyer) + 3 o 4 hechos verificables (desde 1979, empresa familiar, staff estable egresado de profesorados nacionales, seguimiento y comunicación con los padres, sede de exámenes Cambridge) + un párrafo corto. Layout asimétrico, sin cards. |
| 7 | Franja "Fundada con vocación de excelencia pedagógica • Centro de Preparación Oficial Cambridge". | Relleno + claim no confirmado | Se elimina. |
| 8 | Sedes: direcciones falsas ("Cuenca y Simbrón", "Triunvirato y Monroe"), descripciones inventadas (aulas multimedia, subte B), mapas vacíos, eyebrow "SEDE CABA" ×2, CTA duplicado "Consultar Horarios", títulos que se superponen. | Datos reales; sin eyebrows repetidos | Dos cards con dirección, teléfonos, email y WhatsApp reales, horario de atención (a confirmar), mapa de Google embebido con carga diferida y link "Cómo llegar". |
| 9 | Footer con PET, Young Learners, Mock Exams, "Términos y Condiciones", "Reglamento Interno", "estándares pedagógicos británicos", WhatsApp falsos. | Datos reales | Footer simple: escudo + una línea, anclas, las dos sedes, email general, Facebook, ©. Sin links legales que no existen. |
| 10 | Eyebrow en mayúsculas sobre casi todas las secciones (PROPUESTAS ACADÉMICAS 2026, DIFERENCIALES REALES, NUESTRAS 2 SEDES, SEDE CABA…). | Máx. 1 eyebrow cada 3 secciones | Un solo eyebrow en toda la página (hero). Los títulos de sección van solos. |
| 11 | "&" en títulos y nav ("Sedes & Ubicación", "B2 & C1"), separadores "•", "Certámenes Internacionales" (palabra equivocada). | Un registro de copy; ban de separadores decorativos | Español rioplatense: "y", sin "&", sin "•", sin guiones largos. "Certificados internacionales" (como en la web actual). |
| 12 | Fotos generadas por IA con cartel falso del instituto; logo genérico. | Imágenes reales o provisorias con crédito | Escudo real vectorizado (provisorio). Fotos de Unsplash descargadas al proyecto con créditos, a reemplazar por fotos reales. |
| 13 | Fondo general `#f1fdef` (menta) en el HTML, pero el DESIGN.md dice crema `#FBFBF9`. | Una paleta | Fondo de página crema; verde claro solo como tinte de secciones alternas. |
| 14 | Dorado `#C69214` usado como texto sobre blanco (contraste ≈ 2,9:1). | WCAG AA | Dorado solo en fondos/acentos; para texto dorado, `#7B5800` (el "on-secondary-container" del propio DESIGN.md). |
| 15 | Copy con tono español de España en varias páginas actuales ("haz clic", "Únete", "Inscríbete"). | Público local | Todo en voseo: "hacé clic", "sumate", "escribinos". |

### 2.3 Tipografía: propuesta

- **Una sola familia: Plus Jakarta Sans** (variable, vía `@fontsource-variable/plus-jakarta-sans`), pesos 400-700. Títulos en 700 con tracking apretado, cuerpo en 400 a 16-18 px.
- Se descarta Inter para el cuerpo: una familia menos (menos peso, menos requests), y Plus Jakarta Sans a 16 px es perfectamente legible. Si en la fase de secciones los horarios se ven apretados, la alternativa es volver a Inter solo para tablas de horarios.

### 2.4 Mobile

Stitch está pensado para escritorio: la nav no entra, el hero tiene 4 cards en fila, las tabs ya se rompen en dos líneas a 1280 px. Reglas para la implementación:

- Todo a una columna por debajo de 768 px; hero con la foto debajo del texto y altura acotada.
- Tabs con scroll horizontal (`scroll-snap`), no envueltas.
- Header fijo de 64 px con hamburguesa (receta "accordion").
- Botón flotante de WhatsApp solo en mobile (patrón esperado por el público; una sola instancia). **A confirmar.**

## 3. Mapa de contenido real por sección

| Sección | Fuente real | Textos a usar | Falta / dudas |
|---|---|---|---|
| Header | `README.md` | Nombre, escudo, WhatsApp (uno de los dos: proponer Villa Urquiza, que es el del flyer 2026) | ¿Qué WhatsApp va como principal? |
| Hero | `inicio.md`, flyer `inscripcion-2026` | "Inscripciones abiertas", "Niveles para todas las edades: niños, adolescentes, adultos", "desde 1979", "Villa Urquiza y Villa del Parque" | Foto de la fachada (ver §5). **Años**: hoy es octubre 2026; la campaña vigente es "Inscripciones 2027" y "Verano 2027" (en Argentina la campaña de verano arranca en diciembre y los cursos son en febrero). Ver §6. |
| Cursos: Niños | `kiddies-course.md`, `elementary-level.md` | Kiddies (1er grado, solo matrícula, abril a noviembre, clase abierta para padres); Elementary 1-4 (desde 2do grado, 2 veces por semana de 1:30 h, marzo a diciembre) | ¿Kiddies sigue "sin cuota" en el próximo ciclo? ¿En qué sede se dicta cada curso de niños? |
| Cursos: Adolescentes | `pre-intermediate-level.md`, `intermediate-level.md`, `pre-first-certificate-level.md` | Pre-Intermediate 1-2 (3 h/sem), Intermediate 1-3 (4 h/sem, películas, listening, reading), Pre-First (4 h/sem, primer acercamiento al FCE) | Mismas dudas de sede. |
| Cursos: Adultos | `intensivos-adultos-online.md`, `conversacion-online-2.md`, `pack-intensivo-adultos-conversacion.md`, `clases-de-apoyo-escolar.md` | Intensivo Adultos (1 vez/sem, 2 h, módulos Starter a Advanced, Villa Urquiza, certificado por nivel); English in Action (Level 1 y 2, grupos reducidos); Pack (3:30 h/sem); Apoyo escolar (individual o grupal) | "Quinquemestral" vs "cuatrimestral" (usar "de agosto a diciembre"); English in Action 1:30 h vs horario de 2 h; Pack dice "online" pero es presencial; ¿Intensivo tiene opción online o solo presencial VU?; ¿apoyo escolar sigue vigente? |
| Cursos: Verano | `intensivo-express-nivel-inicial.md` (English in Action), `conversacion-verano-2021.md` (Viajeros) | English in Action intensivo (7 clases, 3,5 semanas, 2 niveles, certificado); Inglés para viajeros (presencial 6 clases en Villa del Parque / online 4 clases) | Son datos de febrero 2026. ¿Se repiten en febrero 2027? Fechas nuevas. |
| Cambridge | `first-certificate.md`, `cae.md`, `certificados-internacionales.md` | "Somos sede de este examen internacional", "altísimo porcentaje de alumnos aprobados", FCE = B2, CAE = C1, 4 h/sem marzo a diciembre, horarios por sede | ¿Sede de examen o centro preparador autorizado? ¿Sigue el FCE online (página de 2021)? |
| La Academia | `quienes-somos.md`, flyer `por-que-nos-destacamos` | "Fundada en 1979", "empresa familiar", "staff estable… egresados de Profesorados Nacionales Superiores de Inglés", "seguimiento del progreso y comunicación con los padres", "+2 meses (3 h/sem) / +3 meses (4 h/sem) de clases por año" | Reescribir "42 años" como "desde 1979". |
| Cómo empezar | `https-forms-gle-a1fv2p9kfmgfcy3d9.md` | Test de nivel online gratuito (124 preguntas, resultado por mail), formulario de consulta, WhatsApp | ¿El test aplica también a chicos o solo a adultos? |
| Sedes | `ubicacion.md`, `README.md` | Bucarelli 2288 / Cuenca 2806, teléfonos, emails, WhatsApp por sede | Horario de atención (dato de 2020). Fotos de cada sede. |
| Footer | `README.md` | Email general, Facebook | ¿Instagram? |

**Formularios de Google** (CTA "Pedir información"): consulta general para niños/adolescentes/Cambridge; formularios específicos para Intensivos Adultos, English in Action / Pack, English in Action verano y Viajeros. Todos los links están en `content/README.md`.

## 4. Estructura final propuesta

Una página, anclas en español. Siete secciones + header y footer.

| # | Sección | Ancla | Familia de layout | Contenido |
|---|---|---|---|---|
| 0 | Header fijo | | barra | Escudo + nombre, 4 anclas, CTA WhatsApp, hamburguesa en mobile |
| 1 | Hero | `#inicio` | partido texto / foto | Eyebrow, H1, bajada, 2 CTAs |
| 2 | Cursos | `#cursos` (+ `#ninos`, `#adolescentes`, `#adultos`, `#verano`) | tabs + panel con progresión de niveles | Datos reales por público, CTA "Pedir información" |
| 3 | Cambridge | `#cambridge` | banda verde oscura con 2 cards | FCE y CAE, horarios por sede |
| 4 | La Academia | `#nosotros` | cifra grande + lista de hechos + párrafo | Carga horaria, desde 1979, familia, docentes |
| 5 | Cómo empezar | `#test-de-nivel` | 3 pasos en fila (columna en mobile) | Test de nivel → consulta → reserva |
| 6 | Sedes | `#sedes` | 2 cards con mapa | Datos reales, WhatsApp, teléfono, email, horario |
| 7 | Footer | | columnas | Escudo, anclas, sedes, email, Facebook |

Chequeos del skill sobre esta estructura: ≥ 4 familias de layout distintas ✓; ningún layout repetido ✓; máximo 2 secciones seguidas con partición foto/texto (hero y cursos) ✓; 1 eyebrow en 7 secciones ✓; un solo cambio de tono (Cambridge) ✓; dos intenciones de CTA con etiqueta fija ✓.

Las anclas por público (`#ninos`, `#adolescentes`, `#adultos`, `#verano`) quedan preparadas para las redirecciones 301 desde las URLs viejas (`/ninos/`, `/adolescentes/`, etc.) cuando se haga la migración.

## 5. Imágenes

**Reales (de `content/imagenes/`)**
- `marca/logo-escudo.png` → se vectoriza a `src/assets/logo/escudo.svg` (provisorio, con vtracer o equivalente) y se usa en header, footer y favicon.
- La fachada del flyer `inscripcion-2026.jpg` **no se puede recortar limpia**: tiene texto, el logo y el nene encima en toda la superficie. Hay que pedir la foto original.
- Los demás flyers no van en el layout: son piezas de redes con ilustraciones genéricas y fechas. Opcional para más adelante: un bloque "Novedades" donde la dueña suba el flyer vigente, porque ese es su flujo real de comunicación.

**Provisorias (Unsplash, descargadas al proyecto, con créditos en `src/assets/img/CREDITOS.md`)**

| Ubicación | Tema de la foto | Reemplazo ideal |
|---|---|---|
| Hero | Aula con chicos y docente, luz natural, cálida | Fachada del instituto (la casa estilo inglés) |
| Cursos: Niños | Chicos de primaria en clase | Foto real de un grupo de Elementary |
| Cursos: Adolescentes | Adolescentes estudiando | Foto real de un grupo de Intermediate |
| Cursos: Adultos | Adultos conversando en clase | Foto real de English in Action |
| Cursos: Verano | Viaje / aeropuerto (o se reutiliza la de adultos) | Idem |
| La Academia | Docente con alumnos o detalle del aula | Foto del equipo o del edificio |
| Sedes | Mapas de Google (no fotos) | Foto de fachada de cada sede |
| Open Graph | Se arma en fase 2 con la foto del hero + escudo | Idem con la fachada real |

Criterios: solo fotos con licencia Unsplash (no Unsplash+), personas con aspecto plausible para Buenos Aires, luz cálida, sin estética "stock corporativo". Nada enlazado desde afuera; nada de `lh3.googleusercontent.com`.

## 6. Dudas para consultar con la dueña

Ordenadas por impacto en la página:

1. **Fechas y ciclos.** Hoy es octubre de 2026: la landing sale hablando de "Inscripciones 2027" y "Verano 2027" (la campaña de verano arranca en diciembre, los cursos son en febrero). Faltan las fechas concretas de febrero 2027 y del ciclo marzo 2027. Técnicamente, los datos con fecha (ciclo, verano, cohortes de adultos) son una collection de contenido editable desde el panel (ver §8).
2. **Estatus Cambridge.** ¿Son sede de examen (como dice la web) o centro de preparación autorizado? Define qué se puede afirmar.
3. **Horario de atención** 15:30 a 20:30 (dato de 2020): ¿sigue?
4. **Sedes por curso.** ¿Niños y adolescentes se dictan en ambas sedes? Adultos figura solo en Villa Urquiza y Viajeros presencial en Villa del Parque.
5. **English in Action agosto:** ¿1:30 h o 2 h? (Level 1 figura de 19:30 a 21:30.)
6. **Pack Intensivo + English in Action:** ¿es presencial? (El título dice "online".)
7. **Intensivo Adultos:** ¿hay opción online o solo presencial en Villa Urquiza?
8. **FCE online** (página de 2021): ¿sigue existiendo?
9. **Kiddies:** ¿sigue la promoción "solo matrícula, sin cuota mensual"?
10. **Apoyo escolar** (página de 2024): ¿sigue vigente? ¿Individual y grupal?
11. **Test de nivel:** ¿es solo para adultos o también para chicos?
12. **Fotos y marca:** foto original de la fachada, fotos de aulas y grupos (con autorización), logo en vector (AI/PDF/SVG) o PNG grande.
13. **Redes:** ¿hay Instagram? Solo se encontró Facebook.
14. **WhatsApp principal** para el header y el botón flotante: ¿Villa Urquiza (el del flyer 2026) o Villa del Parque?

## 7. Estructura de carpetas y componentes (Astro)

```
src/
  layouts/
    Base.astro              # <head> con SEO (title, description, OG, canonical), fuentes, header, footer
  components/
    Header.astro            # nav fija + menú mobile (script nativo, receta accordion)
    Footer.astro
    Logo.astro              # escudo SVG inline (provisorio)
    Boton.astro             # primario / secundario / whatsapp
    Etiqueta.astro          # pills de nivel, modalidad
    BotonWhatsApp.astro     # flotante mobile (si se aprueba)
    secciones/
      Hero.astro
      Cursos.astro          # tabs (script nativo, receta tab indicator)
      CursosPanel.astro     # un panel por público, recibe datos
      Cambridge.astro
      Academia.astro
      ComoEmpezar.astro
      Sedes.astro
      SedeCard.astro
  content/                  # content collections de Astro (YAML/Markdown), editables desde el panel (§8)
    instituto/              # singleton: nombre, fundación, email general, redes, texto "quiénes somos"
    sedes/                  # una entrada por sede: dirección, teléfonos, email, WhatsApp, horario, coordenadas
    publicos/               # categorías de cursos: niños, adolescentes, adultos, verano (orden, foto, texto)
    cursos/                 # una entrada por curso: nivel, carga horaria, duración, sede, formulario, público
    novedades/              # datos con fecha: inscripciones, verano, cohortes de adultos, eventos
    posts/                  # blog (más adelante)
  content.config.ts         # esquemas de las collections (zod), con `image()` para fotos
  assets/
    img/                    # fotos (Unsplash provisorias) + CREDITOS.md
    logo/escudo.svg
  styles/
    global.css              # Tailwind v4 (@theme con tokens de color, fuente, radios, easings)
  pages/
    index.astro
public/
  favicon.svg, favicon.ico, apple-touch-icon.png, og.jpg, robots.txt
keystatic.config.ts         # se agrega en fase 6; mapea las collections a campos con etiquetas en español
docs/
  fase-1-analisis.md        # este archivo
```

Los datos del instituto van como **content collections desde la fase 2**, aunque el panel se instale al final: así el panel se enchufa sin rehacer nada. Los componentes nunca tienen datos hardcodeados; reciben las entradas de las collections.

**Dependencias previstas** (se confirman con Context7 en fase 2): `astro`, `@tailwindcss/vite` + `tailwindcss` v4, `astro-icon` + `@iconify-json/material-symbols`, `@fontsource-variable/plus-jakarta-sans`, `@astrojs/sitemap`. Sin React, sin Motion. En fase 6: `@keystatic/core`, `@keystatic/astro` y el adaptador del hosting elegido.

**Tokens de diseño** (para `@theme`):

| Token | Valor | Uso |
|---|---|---|
| `verde-900` | `#1B4321` | Títulos, banda Cambridge, footer |
| `verde-700` | `#2E6B34` | Primario: botones, links, íconos |
| `verde-100` | `#E5F1E4` | Tinte de sección / chips |
| `verde-50` | `#F1FDEF` | Tinte suave |
| `crema` | `#FBFBF9` | Fondo de página |
| `dorado-600` | `#C69214` | Acento en fondos, detalles |
| `dorado-800` | `#7B5800` | Texto dorado (contraste AA) |
| `tinta` | `#141E16` | Texto principal |
| `tinta-suave` | `#41493F` | Texto secundario |
| `borde` | `#C0C9BC` | Bordes, divisores |
| `whatsapp` | `#25D366` | Solo botones de WhatsApp |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Transiciones |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Tabs, acordeón |

Sombras tintadas: `0 4px 16px rgba(46,107,52,.06)` en reposo, `0 8px 24px rgba(46,107,52,.10)` en hover.

## 8. Panel de administración (fase 6, confirmado)

La dueña va a poder editar contenido sin tocar código, manteniendo el sitio estático: sin base de datos ni servidor propio.

**Herramienta: Keystatic** (verificado en Context7 el 2026-10-11).
- CMS basado en Git con integración oficial para Astro (`@keystatic/astro`). El panel vive en `/keystatic` dentro de la misma web.
- Cada guardado en el panel es un commit en el repo; el hosting reconstruye el sitio y en uno o dos minutos el cambio está publicado.
- Modo local en desarrollo (edita los archivos de la máquina). En producción, **Keystatic Cloud**: los editores inician sesión con cuenta de Keystatic, sin necesidad de cuenta de GitHub. Confirmar el límite del plan gratuito al instalarlo.
- Las imágenes subidas desde el panel quedan en el repo y pasan por `astro:assets`.
- Alternativa descartada: Decap CMS. El login sin cuenta de GitHub depende de Netlify Identity, que Netlify ya no ofrece para sitios nuevos.

**Qué se edita desde el panel:** todo lo modelado como collection (§7): cursos y niveles, públicos/categorías, novedades y eventos con fecha, posts, fotos de cada sección, datos de las sedes, teléfonos y WhatsApp. El diseño (colores, layout, secciones) sigue siendo código.

**Implicancias:**
1. **Hosting:** uno que reconstruya desde Git y soporte funciones del lado del servidor para el login del panel: Netlify, Vercel o Cloudflare Pages (plan gratuito). Hostinger por FTP queda descartado. Astro queda en salida estática con el adaptador solo para las rutas del panel.
2. **Fase 2:** los datos nacen como content collections (§7).
3. **Posts y eventos** agregan páginas secundarias (una por post). La landing sigue siendo una página; la decisión pasa a ser "landing + páginas de contenido".
4. **Fase 6 (nueva, después del cierre):** instalar Keystatic, mapear las collections a campos con etiquetas en español, configurar Keystatic Cloud y el deploy automático, y probar que la dueña pueda cargar un curso, una novedad y una foto sin ayuda.

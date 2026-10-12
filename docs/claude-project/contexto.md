# Academia Cultural Inglesa: contexto del proyecto web

Estado al 2026-10-12. Escrito para dar contexto a un proyecto de Claude que se usa para brainstorming. Se regenera desde el repo cuando el sitio cambia de forma importante (ver el final).

## Quién es quién

- **Brian** lleva el proyecto web: decide el diseño, revisa cada entrega, hace los deploys y habla con la dueña.
- **La dueña del instituto** (familiar de Brian) carga el contenido desde un panel de administración y responde las dudas de datos. No es técnica.
- **Claude Code** programa el sitio en el repositorio. Lo que se decide en estas charlas se le pasa a Claude Code.

## El instituto

- **Academia Cultural Inglesa (ACI)**, fundada en **1979**. Empresa familiar.
- **Dos sedes** en CABA:

| | Villa Urquiza | Villa del Parque |
|---|---|---|
| Dirección | Bucarelli 2288 | Cuenca 2806 |
| Teléfonos | 011 4523-7660 / 011 4521-7391 | 011 4501-5566 / 011 4504-4484 |
| WhatsApp | 11 2838-2068 (principal del sitio) | 11 3426-6404 |
| Email | academiainglesavu@gmail.com | academiaculturalinglesa.vp@gmail.com |

- Email general: academiaculturalinglesainfo@gmail.com. Facebook: facebook.com/CulturalVDP. No se encontró Instagram.
- Horario de atención publicado: lunes a viernes de 15:30 a 20:30 (dato de 2020, sin confirmar).
- La sede Villa Urquiza es una casa blanca de estilo inglés con techos de pizarra y cartel verde: es la foto real que hoy usa el sitio.
- **Diferencial de venta real:** más carga horaria que la competencia de la zona. Los cursos de 3 h semanales suman +2 meses de clase por año y los de 4 h, +3 meses (dato del flyer "Por qué nos destacamos").
- **Hechos que el sitio afirma:** desde 1979 en el barrio; empresa familiar; staff estable egresado de Profesorados Nacionales Superiores de Inglés; seguimiento del progreso y comunicación con los padres; sede de los exámenes Cambridge B2 First y C1 Advanced con "un altísimo porcentaje de alumnos aprobados" (frase textual de la web vieja, sin cifra).
- **Cómo se convierte un interesado:** escribe por WhatsApp a una sede o completa un formulario de Google ("Pedir información"). Para adultos y para ubicar nivel hay un test de nivel online gratuito de 124 preguntas, con resultado por mail.

### Oferta de cursos

**Niños** (marzo a diciembre salvo Kiddies)
- **Kiddies:** chicos de primer grado. Promocional: solo matrícula, sin cuota mensual (a confirmar para 2027). Una vez por semana, de abril a fines de noviembre. Termina con clase abierta para padres.
- **Elementary 1 a 4:** desde segundo grado. Dos veces por semana, 1 h 30 (3 h semanales).

**Adolescentes** (marzo a diciembre)
- **Pre-Intermediate 1 y 2:** dos veces por semana, 1 h 30 (3 h semanales).
- **Intermediate 1 a 3:** dos veces por semana, 2 h (4 h semanales). Películas, listening y reading.
- **Pre-First Certificate:** dos veces por semana, 2 h (4 h semanales). Primer acercamiento al formato del First.

**Cambridge** (anuales, 4 h semanales, presenciales)
- **First Certificate (B2 First, FCE):** Villa Urquiza lunes y miércoles 19:30 a 21:30; Villa del Parque martes y jueves 16:00 a 18:00.
- **Certificate in Advanced English (C1 Advanced, CAE):** lunes y miércoles 19:30 a 21:30.

**Adultos** (agosto a diciembre, sede Villa Urquiza, con test de nivel)
- **Intensivo Adultos:** módulos de Starter a Advanced, una vez por semana 2 h, certificado por nivel.
- **English in Action:** conversación en grupos reducidos, dos niveles, una vez por semana.
- **Pack Intensivo + English in Action:** las dos cosas, 3 h 30 semanales.
- **Apoyo escolar:** individual o grupal, para chicos y adolescentes (hoy figura en la pestaña Adultos; decisión pendiente).

**Verano** (febrero)
- **English in Action intensivo:** 7 clases en 3 semanas y media, dos grupos, certificado.
- **Inglés para viajeros:** presencial en Villa del Parque (6 clases) u online (4 clases).

**Campañas vigentes:** "Inscripciones 2027" (ciclo marzo a diciembre 2027) y "Verano 2027" (febrero 2027). En Argentina la campaña de verano arranca en diciembre. Las fechas y horarios concretos de 2027 todavía no están cargados.

## El sitio hoy

Reemplaza la web vieja en WordPress.com (academiaculturalinglesa.com), que vivía de flyers en la portada y páginas sueltas por curso. Las URLs viejas redirigen a las nuevas.

**Portada (una página con secciones, en este orden):**
1. **Header** fijo: logo, Cursos, Cambridge, Sedes, Nosotros y botón "Escribir por WhatsApp". En el celular, menú hamburguesa.
2. **Portada (hero):** "Inscripciones abiertas 2027", título "Inglés para todas las edades, desde 1979", bajada con los barrios y Cambridge, botones WhatsApp y "Ver cursos", foto de aula (provisoria).
3. **Novedades:** tarjetas de las campañas vigentes (flyer, período, título, resumen). Cada una abre su página.
4. **Cursos por edad:** pestañas Niños, Adolescentes, Adultos y Verano. Cada pestaña muestra foto, descripción, cifras (cursos, niveles, horas) y el recorrido de niveles; cada curso tiene "Más sobre el curso" (se vuelve botón al pasar el mouse) y abre su página.
5. **Cambridge:** banda verde oscura, la única del sitio. Escala del Marco Común Europeo (A1 a C2) con B2 y C1 marcados, y una tarjeta por examen con horarios.
6. **La Academia:** texto de quiénes somos, lista de hechos, bloque "Más meses de clase por año que en la zona" (+2 / +3) y la foto de la fachada de Villa Urquiza.
7. **Cómo empezar:** tres pasos (test online, resultado por mail, reservar lugar) y botones al test y a "Pedir información".
8. **Sedes:** una tarjeta por sede con dirección, horario, teléfonos, email, WhatsApp, "Cómo llegar" y el mapa de Google, que se carga al tocar "Ver mapa" (decisión tomada, no cambiar).
9. **Footer:** logo, secciones, datos de las dos sedes, email general y Facebook.

**Páginas secundarias:**
- **Una por curso** (13), con el texto largo migrado de la web vieja y una ficha con cursada, período, sede, horarios, niveles y botones.
- **Una por novedad vigente**, con texto, días y horarios, cursos incluidos y el flyer.

**Panel de administración (Keystatic):** la dueña entra en `/keystatic` con una cuenta de Keystatic Cloud (sin GitHub) y edita: datos del instituto, textos de portada, cursos (incluido el texto largo de su página), públicos, sedes y novedades (con flyer y casilla "Vigente"). Cada guardado publica el sitio solo en uno o dos minutos. Lo que no edita: el diseño, el orden de las secciones y la estructura de las páginas.

**Técnica en una línea:** sitio estático hecho con Astro y Tailwind, alojado en Vercel, sin base de datos. Lighthouse en el celular: 99 de rendimiento, 100 en accesibilidad, buenas prácticas y SEO. Datos estructurados para Google (organización educativa con las dos sedes y cada curso), sitemap y redirecciones 301 desde las URLs viejas.

## Decisiones tomadas

- **Identidad:** verde y dorado del escudo (dos leones con escudo; hay PNG, falta el vector). Tono confiable y cálido. Público de familias y adultos del barrio.
- **Solo modo claro.** Una sola tipografía: Plus Jakarta Sans.
- **Copy:** español rioplatense con voseo, sin guiones largos, sin "&", sin separadores decorativos, sin relleno de marketing. Dos intenciones de botón con etiqueta fija en todo el sitio: "Pedir información" (formulario) y "Escribir por WhatsApp" (contacto).
- **Un solo "eyebrow"** (etiqueta chica sobre el título) en toda la página: el del hero.
- **Animación con carácter pero moderada** (5 en una escala de 1 a 10): un efecto distinto por sección, cada uno con un propósito, nada en loop, versión suave para quien pide movimiento reducido.
- **Datos reales siempre.** Nada de cifras inventadas. Todo dato con fecha va en Novedades, nunca fijo en el diseño.
- **Mapa de las sedes detrás de un botón** (peso y privacidad); confirmado por Brian.
- **Fotos:** las de aulas y públicos son provisorias de Unsplash, a reemplazar por fotos reales. La de la fachada es real.

## Pendientes y dudas para la dueña

1. Fechas y horarios de febrero 2027 y del ciclo marzo 2027.
2. Estatus Cambridge: ¿sede de examen (como dice la web vieja) o centro preparador autorizado? Define qué se puede afirmar.
3. Horario de atención actual (el publicado es de 2020).
4. Qué cursos de niños y adolescentes se dictan en cada sede.
5. English in Action de agosto: ¿1 h 30 o 2 h?
6. Pack Intensivo + English in Action: ¿presencial? (la web vieja decía "online").
7. Intensivo Adultos: ¿hay opción online?
8. First Certificate online (página de 2021): ¿sigue?
9. Kiddies: ¿sigue "solo matrícula, sin cuota" en 2027?
10. Apoyo escolar: ¿sigue vigente? ¿Va en Niños o en Adultos?
11. Test de nivel: ¿solo adultos o también chicos?
12. Material: fotos reales de aulas y grupos (con autorización), logo en vector, código postal y coordenadas de cada sede.
13. Redes: ¿hay Instagram?
14. WhatsApp principal del sitio: hoy es el de Villa Urquiza.

## Ideas abiertas para pensar

- **Resultados:** mostrar logros sin exponer menores. Cifras de aprobados por examen y año, certificados con nombre tapado, testimonios de adultos o de padres con permiso. Falta que el instituto tenga esos datos.
- **Fotos reales y galería:** qué fotos pedirle al instituto, con qué autorización (las imágenes de menores necesitan consentimiento escrito de padres o tutores), y dónde rinden más en el sitio.
- **Novedades:** hoy vencen a mano (casilla "Vigente"). Se puede automatizar por fecha. También pueden servir para eventos, clases abiertas o resultados de exámenes.
- **Campañas:** cómo encarar Inscripciones 2027 y Verano 2027 en el sitio y en redes, y qué flyers hacer.
- **SEO local:** perfil de Google Business por sede, reseñas, palabras clave por barrio.
- **WhatsApp:** botón flotante en el celular (se evaluó en el análisis inicial y no se hizo).
- **Instagram** si existe o si conviene abrirlo.

## Cómo mantener este archivo

Lo genera Claude Code desde el repositorio (`docs/claude-project/contexto.md`). Cuando el sitio cambie de forma importante, pedirle a Claude Code que lo actualice y volver a subirlo al proyecto.

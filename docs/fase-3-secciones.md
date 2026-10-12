# Fase 3: secciones

Fecha: 2026-10-11 y 2026-10-12. Cuatro entregas (commits "Fase 3 (1/4)" a "(4/4)"). Todo con datos reales de las collections; ningún componente tiene datos hardcodeados.

## Qué se implementó

| Sección | Archivo | Decisiones |
|---|---|---|
| Header | `src/components/Header.astro` | Fijo, 64 px, escudo y nombre, cuatro anclas (Cursos, Cambridge, Sedes, Nosotros), un solo CTA "Escribir por WhatsApp" a la sede principal (`instituto.whatsappPrincipal`, hoy Villa Urquiza). Menú mobile con `aria-expanded`, cierre con Escape y al tocar un link. |
| Hero | `src/components/secciones/Hero.astro` | Partido texto / foto. Eyebrow desde la novedad vigente de tipo `inscripciones`; H1 y bajada desde `instituto.hero`. H1 final (decisión del 2026-10-11): "Inglés para todas las edades, desde 1979"; bajada con los barrios y Cambridge. Dos CTAs: WhatsApp y "Ver cursos". Foto provisoria de Unsplash (Yegor Makarenko). |
| Cursos | `Cursos.astro` + `CursosPanel.astro` | Tabs Niños / Adolescentes / Adultos / Verano (públicos con `enTabs: true`), sin "Todos". Hash `#ninos`, `#adolescentes`, `#adultos`, `#verano` abre su pestaña (listo para los 301). Por panel: foto del público, descripción, cifras (cursos, niveles, horas), progresión de niveles como lista con conector (no cards iguales), CTA "Pedir información" con el formulario del público; los cursos con formulario propio llevan además su link. |
| Cambridge | `Cambridge.astro` | Única banda oscura de la página. Público `cambridge` con `enTabs: false`. Rediseñada el 2026-10-12 (pedido del dueño después de la fase 6): a la derecha del título va la escala del Marco Común Europeo (A1 a C2, dato público definido en el componente) con los exámenes que se preparan marcados; la escala va en 3 columnas (2 filas) en el celular y en escritorio, y en 6 columnas entre 768 y 1023 px, porque en una sola fila de 6 los nombres de nivel desbordaban. Cada examen es una tarjeta con el nombre a la izquierda y el nivel en dorado a la derecha (a la izquierda dejaba el texto con sangría), descripción, cursada y horarios por sede. Antes eran dos cards de texto casi iguales que repetían el nivel tres veces. |
| La Academia | `Academia.astro` | Fusiona "Quiénes somos" y "Por qué nos destacamos": párrafo en voseo, lista de hechos verificables, bloque de cifra grande (+2 / +3 meses de clase por año). Sin cards iguales ni eyebrow. No se muestra la cantidad de años como número para que no envejezca. |
| Cómo empezar | `ComoEmpezar.astro` | Rediseñado en fase 4: tres cards con ícono, número y título (`instituto.testDeNivel.pasos`, objetos con `titulo`, `texto`, `icono`), CTAs "Hacer el test de nivel" y "Pedir información". |
| Sedes | `Sedes.astro` + `SedeCard.astro` | Dos cards con dirección, horario de atención (`instituto.horarioAtencion`, dato de 2020 marcado `confirmar: true`), teléfonos con `tel:`, email, "Escribir por WhatsApp" y "Cómo llegar". El mapa de Google se inserta recién al tocar "Ver mapa" (sin iframe de terceros al cargar). |
| Footer | `src/components/Footer.astro` | Escudo y bajada, anclas, las dos sedes, email general, Facebook, copyright. Sin links legales inventados. |

Componentes de apoyo: `Boton.astro` (primario, secundario, whatsapp; el de WhatsApp lleva texto oscuro porque blanco sobre `#25D366` no pasa AA), `Etiqueta.astro` (pills: verde, dorado, claro, borde), `Logo.astro` (escudo como `<img>`, no inline, para que se cachee una sola vez), `TituloAnimado.astro` (fase 4).

## Hallazgos

- **astro-icon define cada símbolo SVG una sola vez** (en la primera aparición) y el resto de la página lo referencia con `<use>`. Si se borra del DOM el elemento que lo contiene, se rompen todos los íconos iguales. Por eso el placeholder del mapa se oculta con `hidden`, no se borra.
- Las fotos provisorias (hero y una por público) están en `src/assets/img/` con créditos en `CREDITOS.md`. La de adolescentes muestra gente más bien universitaria; es la mejor opción gratuita encontrada.
- Apoyo escolar quedó en el público Adultos (como en el mapa del análisis). Sigue abierta la decisión de moverlo a Niños: es una línea en `src/content/cursos/apoyo-escolar.yaml`.

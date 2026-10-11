# Contenido de la página actual

Respaldo de https://academiaculturalinglesa.com (WordPress.com), descargado el 2026-10-11 desde la API pública de WordPress.

```
content/
  pagina-actual/   ← una página = un .md (con fecha de última modificación en el encabezado)
    flyers.md      ← transcripción del texto de cada flyer
  imagenes/
    flyers/        ← flyers originales (sin redimensionar)
    marca/         ← logo escudo + logo horizontal
```

## Datos del instituto

- **Nombre:** Academia Cultural Inglesa (ACI), **fundada en 1979**, empresa familiar
- **Sedes:**

| | Villa Urquiza | Villa del Parque |
|---|---|---|
| Dirección | Bucarelli 2288, CABA | Cuenca 2806, CABA |
| Teléfonos | 011 4523-7660 / 011 4521-7391 | 011 4501-5566 / 011 4504-4484 |
| Email | academiainglesavu@gmail.com | academiaculturalinglesa.vp@gmail.com |
| WhatsApp | 11 2838-2068 | 11 3426-6404 |

- **Email general:** academiaculturalinglesainfo@gmail.com
- **Horario de atención:** lunes a viernes de 15:30 a 20:30 (sacado de una página de 2020, hay que confirmarlo)
- **Facebook:** https://www.facebook.com/CulturalVDP/ (no encontré Instagram en la web)
- **Sede de exámenes Cambridge:** FCE (B2) y CAE (C1)

## Formularios (Google Forms)

| Uso | Link |
|---|---|
| Consulta general de cursos | https://docs.google.com/forms/d/e/1FAIpQLSel4t4Y3Rq4crfxrmPUxc1NbqpaO2anLAELX4ajbbrWd4BbdA/viewform |
| Test de nivel online (124 preguntas) | https://forms.gle/a1fv2p9kFMgfcy3d9 |
| Info Intensivos Adultos | https://forms.gle/Hi2zMZGY3HdmrjdT9 |
| Info English in Action / Pack (agosto) | https://forms.gle/JmiupbaWCr5FQ5fx8 |
| Info English in Action (verano) | https://forms.gle/C66ruMBPgGZSJ2k5A |
| Info Curso Viajeros | https://forms.gle/Z4ugMqYDv2azFNBs5 |

## Oferta de cursos (según la web actual)

**Niños y adolescentes** (cursos anuales, marzo a diciembre)
- **Kiddies:** 1er grado. Solo se paga la matrícula, sin cuota mensual. De abril a fines de noviembre, con una clase abierta para padres al final.
- **Elementary (4 niveles):** desde 2do grado. 2 veces por semana de 1:30 h (3 h semanales).
- **Pre-Intermediate (2 niveles):** 2 veces por semana de 1:30 h (3 h semanales).
- **Intermediate (3 niveles):** 2 veces por semana de 2 h (4 h semanales). Incluye análisis de películas, listening y reading.
- **Pre-First Certificate (1 nivel):** 2 veces por semana de 2 h (4 h semanales).

**Certificados internacionales** (anuales, 4 h semanales)
- **FCE presencial:** Villa Urquiza lunes y miércoles de 19:30 a 21:30; Villa del Parque martes y jueves de 16 a 18.
- **FCE online** (página de 2021): martes y jueves de 19:30 a 21:30, por Google Classroom y Zoom.
- **CAE presencial:** lunes y miércoles de 19:30 a 21:30.

**Adultos**
- **Intensivo Adultos:** 1 vez por semana, 2 h. Módulos de Starter a Advanced (Villa Urquiza). Agosto a diciembre 2026, con horarios por módulo.
- **English in Action** (conversación): 1 vez por semana. Level 1 (Pre-Intermediate/Intermediate) y Level 2 (Upper-Intermediate/Advanced).
- **Pack Intensivo + English in Action:** 3 h 30 min semanales en total.
- **Clases de apoyo escolar:** individuales o grupales.

**Verano** (febrero 2026)
- **English in Action intensivo:** 7 clases en 3 semanas y media.
- **Inglés para viajeros:** presencial (6 clases) u online (4 clases).

**Argumento de venta destacado** (flyer "por qué nos destacamos"): más carga horaria que la competencia de la zona. Equivale a +2 meses de clases al año en los cursos de 3 h y +3 meses en los de 4 h.

## Observaciones para la página nueva

**Páginas vacías o desactualizadas, que no conviene migrar tal cual:**
- Vacías (solo servían como menú): `ninos`, `adolescentes`, `adultos`, `cursos`, `summer-intensive-course`, `cursos-online`.
- `blog`: es el texto de ejemplo de WordPress.
- `curso-de-viajeros`: es de 2022 y tiene precios viejos. Lo reemplaza `conversacion-verano-2021`, que es la versión 2026.
- `intensivo-adultos-2hs` (2020), `conversacion-1hs` y `combo-intensivo-conversacion` (2019): reemplazadas por las páginas de adultos de 2026.
- `first-certificate-online`: es de 2021. Hay que confirmar si sigue existiendo.

**Inconsistencias para consultar con tu tía:**
- "42 años de trayectoria" (texto de 2021) contra "más de 40 años". Conviene poner "**desde 1979**" para que no envejezca.
- English in Action agosto: dice "1 hora y media", pero el Level 1 figura de 19:30 a 21:30, que son 2 horas.
- El título del Pack dice "ONLINE", pero los cursos que incluye son presenciales.
- Intensivos adultos: dice "módulos quinquemestrales", mientras que los flyers viejos dicen "cuatrimestrales".
- El horario de atención es de 2020.

**SEO / migración:**
- Varias URLs no coinciden con su contenido (por ejemplo, `/conversacion-verano-2021/` es el curso de viajeros 2026 y `/intensivo-express-nivel-inicial/` es English in Action). En la web nueva conviene usar URLs limpias y **redirecciones 301** desde las viejas para no perder posicionamiento en Google.
- La meta description actual es texto suelto ("información INFORMACIÓN CONTACTO WHATSAPP..."). Hay que escribir una buena.

**Imágenes:**
- El logo está en baja resolución (512 px). Conviene pedir el original en vector.
- Los flyers de niveles de 2019 tienen ilustraciones genéricas. Para la web nueva rinden más fotos reales del instituto (la fachada que aparece en el flyer de inscripciones 2026 es muy linda).

## Datos del diseño de Stitch que no coinciden con la realidad

El diseño (capturas en `Referencias/`) tiene contenido inventado por la IA. **Al implementar, usar los datos de este README, no los del diseño:**

- **Direcciones:** el diseño dice "Cuenca y Simbrón" y "Av. Triunvirato y Monroe" → las reales son **Cuenca 2806** y **Bucarelli 2288**.
- **WhatsApp del footer:** +54 9 11 4000-1122 / 4000-3344 son números falsos → los reales son 11 2838-2068 (Villa Urquiza) y 11 3426-6404 (Villa del Parque).
- **"Centro de Preparación Oficial Cambridge / Autorizado":** la web actual solo dice "somos sede de este examen". Hay que confirmar qué estatus tienen antes de afirmarlo.
- **B1 Preliminary (PET) y Young Learners (Starters, Movers, Flyers):** no aparecen en la oferta actual.
- **"Apoyo escolar sin costo extra" / "integrado":** en la web es un servicio aparte.
- **Intensivo Adultos "100% online sincrónico":** la oferta de agosto 2026 es presencial en Villa Urquiza.
- **"Descuento especial con el Pack", "Mock exams cronometrados", "subte B Echeverría/Rosas":** ninguno figura en la web actual. Confirmar.
- **Fotos:** son imágenes generadas con IA (con un cartel falso de "Academia Cultural Inglesa") → reemplazarlas por fotos reales.
- **Logo:** el ícono genérico del diseño → usar el escudo real (`imagenes/marca/`).

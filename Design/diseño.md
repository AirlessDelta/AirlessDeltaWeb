# Delta · Industrial Spray Machine — Especificaciones de diseño (Home)

Documento para desarrollo. Cubre la home en escritorio (1360 px) y móvil (390 px).
Idioma del sitio: español. Estilo: industrial, sobrio, tipografía condensada en mayúsculas, azul de marca.

## 1. Stack sugerido
- Next.js o Astro + CSS Modules / Tailwind (tokens abajo). Sitio estático con formulario vía endpoint (Formspree, Resend o API propia).
- Fuentes: Google Fonts `Barlow Condensed` (500, 600, 700) y `Barlow` (400, 500, 600). Usar `font-display: swap`.
- Imágenes: WebP/AVIF, `loading="lazy"` salvo el hero, `srcset` para 2x.

## 2. Tokens
### Color
| Token | Hex | Uso |
|---|---|---|
| `--blue` | `#213EFE` | Botones, números, enlaces, acentos (color del logo) |
| `--navy` | `#0B1A44` | Texto principal, hero, Historia, Contacto |
| `--navy-deep` | `#07112E` | Barra superior y footer |
| `--blue-light` | `#8DA0FF` | Acentos sobre fondo oscuro |
| `--paper` | `#EEF1F8` | Fondo general |
| `--panel` | `#DCE2F0` | Placeholders de imagen, mapa, miniaturas |
| `--line` | `#C3CBE0` | Líneas divisorias sobre claro |
| `--line-soft` | `#D3DAEA` | Bordes de header y selector |
| `--muted` | `#4A5878` | Texto secundario sobre claro |
| `--muted-dark` | `#B7C2E0` | Texto secundario sobre oscuro |
| `--white` | `#FFFFFF` | Header, inputs, selector |
Contrastes verificados: blanco sobre `--blue` y sobre `--navy` cumplen AA.

### Tipografía
| Rol | Fuente | Tamaño / interlineado | Peso | Notas |
|---|---|---|---|---|
| H1 hero | Barlow Condensed | 92/86 (móvil 52/50) | 700 | Mayúsculas |
| H2 sección | Barlow Condensed | 64/64 (móvil 40) | 700 | Mayúsculas |
| H3 categoría | Barlow Condensed | 40 (servicios 56) | 700 | Mayúsculas |
| Cifras de selector/hitos | Barlow Condensed | 64 / 44 | 700 | |
| Botón / nav | Barlow Condensed | 18–19, `letter-spacing:.06–.07em` | 600 | Mayúsculas |
| Cuerpo | Barlow | 17/26 (hero 20) | 400 | |
| Pequeño | Barlow | 13–15 | 400–600 | Barra superior, captions, labels |

### Espaciado y forma
- Escala base 4 px. Secciones: `padding-block: 112px` (móvil 40). Contenedor: `max-width:1240px`, `padding-inline:40px` (móvil 20).
- Radio de borde: `0` en todo salvo el logo (círculo) y los puntos del mapa. Sin sombras ni degradados.
- Líneas: 1 px `--line`; cabeceras de sección con filete de 4 px `--navy` (blanco en oscuro).

### Breakpoints
- `≥1200` escritorio · `768–1199` tablet (grids 3→2 columnas, hero apilado) · `<768` móvil (1 columna, menú hamburguesa).

## 3. Componentes
- **Botón primario:** fondo `--blue`, texto blanco, `padding:15px 30px`, hover fondo blanco y texto `--navy`. Focus: contorno 2 px `--blue-light` con offset 2 px.
- **Botón secundario (`.o`):** sin fondo, borde interior 2 px blanco, hover relleno blanco. Solo sobre fondos oscuros o azul.
- **Enlace de lista:** fila con filete superior, flecha `→` en `--blue` a la derecha, hover texto `--blue`.
- **Input / select / textarea:** fondo blanco, borde 1 px `#7C89AD`, `padding:14px`, altura mínima 48 px. Etiqueta arriba, 14 px, mayúsculas, `letter-spacing:.08em`.
- **Placeholder de foto:** fondo `--panel` con leyenda 12 px abajo a la izquierda. Sustituir por foto real manteniendo la proporción.
- **Cabecera de sección:** filete 4 px, `H2` a la izquierda y número (`01`–`05`) en `--blue` a la derecha, 24 px.

## 4. Secciones (escritorio)
1. **Barra superior** (`--navy-deep`, 36 px): WhatsApp y correo a la izquierda, horario a la derecha.
2. **Header** (blanco, 80 px, borde inferior): logo circular 44 px + «DELTA» (32 px) · menú centrado (Inicio, Historia, Productos, Servicios, Distribuidores, Contacto) · botón «Cotizar». Sticky al hacer scroll.
3. **Hero** (`--navy`): grid 1.05fr / 1fr, gap 56. Izquierda: H1 «Maquinaria industrial para *pintar mejor.*» (acento `--blue-light`), párrafo máx. 500 px, botón primario «Ver productos» + secundario «Dónde comprar». Derecha: panel `--paper` con ilustración del equipo y pie con dos leyendas. Reemplazable por foto del equipo.
4. **Selector de proyecto** (solapa el hero −72 px): 3 columnas blancas con cifra 01/02/03, título y texto. Hover: fondo `--blue`, texto blanco. Enlazan a Productos > Maquinaria filtrada por tamaño.
5. **Productos:** 3 columnas con separadores verticales de 1 px. Cada una: miniatura 200 px alto, H3, texto, 4 filas de lista.
   - Maquinaria: Pequeños proyectos, Proyectos medianos, Grandes proyectos, Equipos HVLP / AirCoat.
   - Accesorios: Pistolas y lanzas, Boquillas y portaboquillas, Mangueras y adaptadores, Filtros.
   - Repuestos: Bombas y diafragmas, Pistones y válvulas, Kits de juntas, Sistemas de succión.
6. **Historia y origen** (`--navy`): grid 1.1 / 1. Izquierda: frase destacada (56 px condensada) y párrafo. Derecha: foto 340 px alto. Debajo, línea de tiempo de 3 hitos (año 44 px en `--blue-light`).
7. **Servicios** (ancho completo, 2 mitades sin gap): Mantenimiento sobre `--blue`; Capacitaciones sobre `--navy`. Cada mitad: etiqueta «03 · Servicios», H3 56 px, texto, lista de 3 puntos con filetes, botón secundario anclado abajo.
8. **Distribuidores:** grid 1.1 / 1. Izquierda: mapa 440 px alto con marcadores (círculos 16 px `--blue`, borde blanco 3 px). Derecha: buscador (input + botón) y lista de filas (nombre en condensada 28 px, ciudad, teléfono).
9. **Contacto** (`--navy`): izquierda, frase 40 px y datos; derecha, formulario (Nombre, Correo, Motivo, Mensaje) y botón «Enviar mensaje».
10. **Footer** (`--navy-deep`): 4 columnas (marca, Productos, Empresa, Contacto) y línea de copyright.

## 5. Versión móvil (390 px)
Header de 64 px con logo 38 px y botón de menú (área táctil 44 px). Todo en una columna: hero con H1 52 px y un botón de ancho completo; Productos, Servicios, Distribuidores y Contacto como listas con filetes; las secciones oscuras y claras se alternan igual que en escritorio. Botones a ancho completo, altura mínima 48 px.

## 6. Comportamiento
- Menú: anclas a `#inicio, #historia, #productos, #servicios, #distribuidores, #contacto` con `scroll-behavior:smooth` y `scroll-margin-top:80px`. En móvil abre un panel a pantalla completa.
- Formulario: validación en cliente (nombre y correo obligatorios), estado de envío, mensaje de éxito/error con `aria-live="polite"`, y antispam (honeypot o captcha).
- Buscador de distribuidores: filtrar por texto sobre un JSON; el mapa puede ser Leaflet/OpenStreetMap o Google Maps.
- Hover: solo cambios de color (sin movimiento). Transición 150 ms.

## 7. Accesibilidad y SEO
- HTML semántico: `header`, `nav`, `main`, `section[id]`, `footer`. Un único `h1`.
- Contraste mínimo AA, focus visible en todos los controles, `alt` en logo e imágenes, etiquetas `label` enlazadas a cada campo.
- `<title>`: «Delta — Maquinaria industrial de pulverización». `meta description` de 150 caracteres, Open Graph con el logo.
- Datos estructurados `Organization` y `LocalBusiness`.

## 8. Assets y contenido pendiente
- Logo en SVG o PNG con fondo transparente (versión horizontal y circular). El actual es una imagen circular de baja resolución.
- Fotos: hero, maquinaria, accesorios, repuestos, historia, servicios.
- Textos: historia (frase, 2 párrafos, 3 hitos), descripciones de servicios, lista real de distribuidores (nombre, ciudad, teléfono, coordenadas), datos de contacto y horario.
- Catálogo: nombres y referencias de productos para las páginas internas (fase 2).

## 9. Criterios de aceptación
- La maqueta coincide con los tokens de esta guía a 1360 px y 390 px.
- Lighthouse ≥ 90 en Rendimiento, Accesibilidad, Buenas prácticas y SEO.
- Todo el contenido es operable con teclado.
- Sin desbordes horizontales entre 320 y 1920 px.

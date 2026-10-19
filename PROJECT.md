# PROJECT.md — MIMEN

Especificación de trabajo derivada de `CLIENT.md` y de las solicitudes del usuario. Los hechos del negocio viven en `CLIENT.md`; aquí se registran decisiones, supuestos y pendientes.

## Perfil y alcance

- **Perfil:** `informativa` + formulario de contacto (único punto de integración, aún sin proveedor).
- **Modo actual:** demo. El formulario valida y muestra un resumen local; no transmite ni guarda datos.
- **Una sola página:** encabezado mínimo → recorrido audiovisual ligado al scroll (Running → Cycling → Swimming → Gym) → contacto.
- **Fuera de alcance:** ver `CLIENT.md` §1 (ecommerce, reservas, WhatsApp, analítica, CMS, idiomas, etc.).

## Decisiones confirmadas por el usuario (2026-10-19)

- Logo: usar solo las cinco barras de `references/mimen_logo.png` (sin la «G» residual). Derivados en `public/brand/mimen-mark.{png,svg}`; el original no se modifica.
- Color de marca tomado del logo: `#B03B68`, usado en CTA, formulario y relleno de progreso.
- Composición: **video a pantalla completa** con el atleta en el tercio derecho; la información flota sobre el lado izquierdo y cambia con el video. En móvil el video ocupa la parte superior (detrás del encabezado) y el texto va debajo, para no tapar al atleta.
- Atmósfera de los videos (referencias `references/*_reference.*`): oscura, con neblina y vegetación en exteriores; acción explosiva. Running con neblina en carretera; cycling de perfil con bosque verde y neblina; swimming bajo el agua con tono azul petróleo oscuro; gym oscuro con polvo de magnesio y luz lateral.
- Contenido: comunicar que hay coaching **de principiante a pro** y usar titulares motivadores (p. ej. «Alcanza tu peak performance»). Esta instrucción del usuario prevalece sobre la indicación de `CLIENT.md` de evitar frases motivacionales; para no quedar vacíos, cada titular va con una frase de apoyo con beneficio concreto y sin prometer resultados.
- Higgsfield: pedir aprobación de créditos antes de cada generación.

## Dirección visual (propuesta del agente, sustituible)

- **Idea:** el atleta en movimiento explosivo, dentro de un mundo oscuro y brumoso; el logo de cinco barras funciona como indicador de progreso (cada barra = una etapa, la quinta = contacto).
- **Paleta (tema oscuro):** night `#0a0c0d`, surface `#111415`, field `#171b1d`, ink `#f1f2f0`, ink-soft `#a9b1b4`, brand `#b03b68` (botones), brand-ink `#e57ba3` (texto de acento sobre oscuro). Degradado izquierdo sobre el video para la legibilidad del texto.
- **Tipografía:** Archivo Variable (autohospedada vía `@fontsource-variable/archivo`).
- **Movimiento:** scroll nativo; el scroll fija `currentTime` del clip activo (suavizado por lerp), fundido entre clips adyacentes, texto que entra/sale según la dirección del scroll. Con `prefers-reduced-motion` o pausa manual se muestran pósters y transiciones simples.

## Arquitectura

- Vite + React 19 + TypeScript + Tailwind CSS v4. Sin backend.
- `src/content.ts`: todos los textos, disciplinas, medios y campos del formulario (editable sin tocar componentes).
- `src/lib/journey.ts`: cálculo puro progreso → clip activo, opacidades y tiempo local (con pruebas).
- `src/components/Journey.tsx`: escenario fijo dentro de un track alto; actualiza el DOM en `requestAnimationFrame` sin re-render por frame.
- `src/lib/contactForm.ts` + `src/services/contact.ts`: validación y una interfaz `ContactTransport`; hoy solo `demoTransport`.
- **Breakpoint de composición:** la vista de dos columnas se activa con `(min-width: 768px) and (min-aspect-ratio: 5/4)` (variante Tailwind `wide`). Tablets en vertical usan la composición apilada de móvil. Esta condición está duplicada en `styles.css`, `useIsMobile` y los `preload` de `index.html`; mantenerlas sincronizadas.

## Medios

- Proceso: fotograma inicial con GPT Image 2.5 (2K, 16:9, referencias del cliente como guía de ambiente, atleta en el tercio derecho) → animación con Kling 3.0 Pro (1912×1080, 5 s, sin audio). Fotogramas en `media-src/frames/`; clips anteriores de estudio en `media-src/v1-studio/`.
- El fotograma de gym se retocó con `delogo` para quitar logos de terceros heredados de la referencia (calcetines y cintura).
- Material ilustrativo generado por IA, rotulado «Imágenes ilustrativas»; no representa atletas reales de MIMEN.
- Web: `scripts/encode-media.sh` → `public/media/` (escritorio 1600×900 completo; móvil 720×900 recortado 4:5 alrededor del atleta; GOP corto para búsqueda fluida; pósters JPG). En escritorio `object-position: 72%` para recortar primero el lado izquierdo vacío. ~19 MB en total; se cargan solo los del dispositivo actual (~11 MB escritorio, ~5.5 MB móvil).
- Swimming se recorta a 2.2 s porque después la nadadora levanta la cabeza y se desplaza hacia la columna de texto.

## Supuestos

- La paleta y tipografía son provisionales hasta recibir manual de identidad.
- Textos del recorrido: titulares motivadores propuestos por el agente a pedido del usuario; frases de apoyo basadas en los beneficios de `CLIENT.md` §6. «De principiante a pro» confirmado por el usuario.
- `noindex` activo mientras el sitio sea demo.

## Preguntas abiertas (bloquean «operativo», no el desarrollo)

- Destino y proveedor del formulario; texto y responsable del aviso de privacidad.
- Apps utilizadas y detalle del seguimiento.
- Derechos/uso comercial de los clips generados, o sustitución por material propio.
- Dominio, hosting y fecha de publicación.

## Matriz de aceptación

| Tramo | Contenido | Interacción | Comprobación |
| --- | --- | --- | --- |
| Encabezado | Marca + «Empieza hoy» | Salta al formulario | Visible en todos los estados y viewports |
| Recorrido (4 estados) | Disciplina, titular, apoyo | Scroll ↔ tiempo de video, fundidos, nav por logo | Avance/retroceso/scroll rápido sincronizados; capturas en 5 viewports |
| Pausa / movimiento reducido | Pósters | Botón de pausa, `prefers-reduced-motion` | Contenido y contacto accesibles sin video |
| Contacto | Formulario (nombre, correo, deporte, objetivo) | Validación, foco en error, «Otro» condicional | Pruebas unitarias; demo sin envío real |

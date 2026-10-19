# STATE.md — MIMEN

## 2026-10-19 (tarde, 2) — Natación cenital y gym sin polvo

### Completado
- Fotogramas aprobados por el usuario (GPT Image 2.5, 2K, 5.5 créditos):
  - `media-src/frames/swimming.png`: toma cenital (ángulo de la referencia 3) con los tonos de la referencia 2; nadadora en la mitad derecha. El fotograma bajo el agua anterior quedó como `swimming-v2-underwater.png`.
  - `media-src/frames/gym-nochalk.png`: mismo fotograma de gym sin polvo de magnesio en la barra; se conserva la neblina ambiental. El original quedó como `gym-v1-chalk.png`.
- Videos Kling 3.0 Pro (5 s, sin sonido, 17.5 créditos) enviados:
  - swimming `c4a222d2-071f-451e-8612-e9811693a83a` (el mismo fotograma como inicio y fin, cámara que sigue a la nadadora).
  - gym `78128c04-f031-427c-9ae9-953f3dfc429f`.
- `encode-media.sh`: se quitó el recorte de 2.2 s de swimming; recorte móvil movido a x=1000 para el encuadre cenital. Texto alternativo de swimming actualizado.

- A pedido del usuario, swimming usa solo desde 3.1 s (justo después de que la cara vuelve al agua) hasta el final: ≈1.9 s, 1.36 MB escritorio / 0.82 MB móvil. `encode-media.sh` ahora acepta un segundo de inicio por clip.
- Videos integrados: `media-src/swimming.mp4` y `media-src/gym.mp4` (anteriores en `media-src/v2/`). Natación: brazada coherente los 5 s completos. Gym: sin polvo en la barra durante todo el clip.
- `encode-media.sh`: corregido el error con arrays vacíos en bash 3.2 de macOS (`set -u`); swimming con CRF 29/30 porque la espuma inflaba el peso (3.7 MB escritorio / 2.2 MB móvil).

### Verificado
- Build, 15 pruebas y capturas en 5 viewports: sin overflow.

### Problemas
- En pantallas 16:10 (1440×900), a mitad del clip, los pies de la nadadora llegan al final del titular sin quedar debajo del texto. En 16:9 hay espacio libre. Moverla a la derecha con `object-position` recortaría su mano en el borde derecho.
- Swimming sigue siendo el clip más pesado; si el rendimiento móvil lo exige, bajar el bitrate o la resolución móvil.

## 2026-10-19 (tarde) — Videos a pantalla completa y tema oscuro

### Completado
- 4 videos nuevos según las referencias del cliente: fotogramas con GPT Image 2.5 (5 generaciones, incluida una repetición de natación por brazos poco naturales) + animación con Kling 3.0 Pro. Aprobado por el usuario; ~48.75 créditos usados (saldo 367.25).
- Escena rediseñada: video a pantalla completa, atleta a la derecha, texto sobre degradado oscuro a la izquierda; en móvil el video va arriba detrás del encabezado y el texto debajo. Todo el sitio pasa a tema oscuro (contacto y formulario incluidos).
- Copy: «Coaching para atletas, de principiante a pro», titulares motivadores con frase de apoyo concreta, CTA «Empieza hoy».
- `encode-media.sh`: recortes móviles 4:5 por clip, sin la curva de aclarado, recorte de duración opcional (swimming = 2.2 s).

### Verificado
- `tsc -b`, `vitest` (15 pruebas) y capturas con `scripts/shots.mjs` en 5 viewports: sin overflow, sin errores de consola, el atleta no queda bajo el texto en running/cycling/gym.

### Problemas
- Swimming (Kling): a partir de ~2.5 s la nadadora levanta la cabeza, baja un brazo recto y deriva hacia la columna de texto. Mitigado recortando a 2.2 s, pero en ese tramo planea con ambos brazos al frente y la mano roza el borde del texto. Pendiente decidir si se regenera.

### Próximo paso
- Decisión del usuario sobre regenerar swimming (propuesta: Kling 3.0 Pro con el mismo fotograma como inicio y fin para fijar la posición, ≈8.75 créditos).

## 2026-10-19

### Completado
- Sitio de una página implementado (Vite + React + TS + Tailwind v4): encabezado, recorrido ligado al scroll con 4 disciplinas, formulario de contacto en modo demo.
- Logo extraído (cinco barras, sin la «G» residual) → `public/brand/mimen-mark.{png,svg}`; reutilizado como indicador de progreso.
- 4 clips generados con Higgsfield Kling 3.0 Turbo (aprobado, ~40 créditos) y codificados para escritorio/móvil con `scripts/encode-media.sh`.
- Composición de dos columnas limitada a pantallas anchas (`wide` = ≥768px y aspecto ≥5/4); tablets verticales usan la vista apilada con clips verticales.
- Preload del póster según la composición (sin avisos de consola).

### Verificado
- `pnpm build` y `pnpm test` (15 pruebas) correctos.
- `node scripts/shots.mjs` (requiere el dev server en :5183): capturas en desktop 1440×900, laptop 1280×720, tablet 820×1180, mobile 390×844 y 375×667 → `/tmp/mimen-shots`. Sin overflow horizontal, sin errores de consola.

### Problemas encontrados
- `tsc -b` emitió `.js` junto a cada `.ts`; Vite resuelve `.js` antes que `.tsx` y el dev server sirvió CSS obsoleto. Se borraron los artefactos, se reinició el servidor y se añadió `"noEmit": true` a `tsconfig.json`. Usar `pnpm build` / `tsc --noEmit`.
- Playwright dentro del sandbox de Cursor busca el navegador en otra caché; ejecutar `shots.mjs` fuera del sandbox.

### Pendiente
- Formulario: definir destino/proveedor, implementar transporte real con validación en servidor, verificar recepción. Aviso de privacidad definitivo.
- Confirmar derechos de los clips generados o reemplazarlos por material propio.
- Revisión manual en dispositivos reales (iOS Safari: búsqueda de video y `svh`), red lenta y lector de pantalla.
- Quitar `noindex`, añadir canonical/sitemap/robots al publicar.

### Próximo paso
- Revisión del usuario en navegador y respuestas a las preguntas abiertas de `PROJECT.md`.

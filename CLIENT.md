# CLIENT.md — MIMEN

Brief de un nuevo sitio web para MIMEN: coaching profesional, rutinas adaptadas a cada atleta y seguimiento mediante apps.

Este archivo reúne hechos, objetivos, contenido y preferencias del cliente. Las soluciones técnicas se documentarán en `PROJECT.md` y el avance en `STATE.md` al iniciar implementación.

**Convenciones:** `Por definir` = dato desconocido; `Proponer` = decisión delegada; `Propuesto` = sugerencia, no hecho comercial confirmado. No incluir secretos ni inventar datos del negocio.

## 1. Modalidad y alcance

- **Proyecto:** Sitio de presentación y contacto de MIMEN, servicio de coaching profesional para atletas.
- **Modalidad:** Proyecto nuevo para MIMEN. Datos operativos pendientes de confirmar.
- **Formato:** Una sola página pública y una sola experiencia narrativa continua. Sin páginas independientes por deporte.
- **Perfil:** Presentación con formulario de contacto. La única integración contemplada es la necesaria para recibir ese formulario; proveedor y destino por definir.
- **Entrega web prevista:** Encabezado mínimo, recorrido audiovisual ligado al scroll y formulario al final, con cierre discreto e información de privacidad aplicable.
- **No incluidos:** Ecommerce, pagos, cuentas de atletas, panel de entrenamiento, reservas, calendario, chatbot, CMS, blog, mapas, WhatsApp, idiomas adicionales o analítica. No añadirlos por asociación con el sector.

## 2. Negocio, objetivo y público

- **Nombre:** MIMEN.
- **Actividad confirmada:** Coaching profesional para atletas. Las rutinas se adaptan a cada persona y a sus objetivos.
- **Seguimiento mediante apps:** El atleta puede consultar sus rutinas y el equipo MIMEN puede darle seguimiento. Nombres de las apps, funciones y frecuencia de seguimiento: por definir. Se trata de herramientas del servicio; no implica construir una app ni conectarla al sitio web.
- **Disciplinas principales:** Running, Cycling, Swimming y Gym; equivalentes en español: carrera, ciclismo, natación y gimnasio.
- **Otros deportes:** Pueden consultarse directamente con el equipo. No prometer cobertura automática de cualquier disciplina.
- **Público:** Atletas interesados en estructurar su entrenamiento y avanzar hacia sus objetivos. Niveles atendidos, edades, territorio y modalidad presencial/remota: por definir.
- **Objetivo principal:** Comunicar el acompañamiento de MIMEN y generar consultas al equipo.
- **Acción principal:** Llegar al formulario y expresar el deporte y objetivo de interés.
- **CTA propuesto:** «Hablemos», con acceso al formulario.
- **Límites comerciales:** No afirmar resultados garantizados, certificaciones, revisiones periódicas, atención 24/7, nutrición, rehabilitación o planes de pago sin confirmación.

## 3. Concepto de experiencia: un recorrido, varios deportes

La página debe sentirse como una sola escena audiovisual que evoluciona al desplazarse. El usuario no quiere una sucesión de secciones, cuatro portadas apiladas ni videos aislados en tarjetas. Los cambios de disciplina son estados del mismo escenario visual.

- **Cantidad solicitada:** Tres o cuatro videos. Base propuesta: cuatro, uno por disciplina principal, para representar Running, Cycling, Swimming y Gym. Reducir a tres solo con una propuesta explícita de cómo representar las cuatro disciplinas.
- **Orden propuesto:** Running → Cycling → Swimming → Gym → contacto.
- **Scroll vinculado al tiempo:** El desplazamiento controla el avance del material audiovisual, no solo dispara su reproducción automática al entrar en pantalla. Al detenerse, se mantiene el punto correspondiente; al subir, el recorrido retrocede coherentemente.
- **Escenario persistente:** Durante el recorrido, la composición principal permanece visualmente estable mientras cambian la imagen en movimiento y la información del lateral izquierdo.
- **Sincronización:** Nombre del deporte, mensaje y video corresponden al mismo estado, también al retroceder, hacer scroll rápido o volver desde el formulario.
- **Continuidad:** Transiciones suaves entre clips, sin parpadeos, pantallas negras, saltos de encuadre ni divisiones visibles que rompan la sensación de un único video. El recurso concreto —fundido, empalme u otro— se elegirá según los materiales disponibles.
- **Texto disponible desde el inicio:** La primera vista identifica a MIMEN y su servicio; no esperar a terminar una introducción para entender la oferta.
- **Lectura:** Cada estado debe ofrecer recorrido suficiente para leer con comodidad. No imponer velocidades ni duraciones de scroll antes de probar con los clips reales.
- **Acceso directo:** El CTA del encabezado lleva al formulario sin obligar a recorrer los videos. El scroll sigue siendo nativo y nunca queda bloqueado para completar una animación.
- **Cierre:** Al concluir el último deporte, el escenario da paso al formulario mediante una transición coherente. El contacto puede ocupar su propio espacio de lectura sin convertir el recorrido deportivo en secciones separadas.

La solución técnica —video con búsqueda temporal, secuencias de fotogramas u otra— se decidirá después de probar continuidad, peso, precisión y compatibilidad móvil. No asumir que varios archivos sin edición producirán por sí solos la sensación de una toma continua.

## 4. Composición y dirección visual

**Mockup aportado:** `Captura de pantalla 2026-10-19 a la(s) 1.41.13 p.m..png`.

- **Encabezado:** MIMEN a la izquierda y CTA a la derecha. Breve, persistente durante el recorrido y legible sobre todos los estados.
- **Escritorio:** Columna informativa izquierda de aproximadamente 28–30% y área audiovisual dominante a la derecha de aproximadamente 70–72%, siguiendo las proporciones orientativas del mockup.
- **Información izquierda:** Jerarquía clara con disciplina, titular breve y descripción corta. El contenido cambia en el mismo espacio; evitar acumulación de párrafos o tarjetas.
- **Área audiovisual:** Atleta en actividad como foco principal. Su escala, posición y dirección de movimiento deben considerar las transiciones entre deportes.
- **Unidad visual:** Aunque haya dos zonas funcionales, deben pertenecer a una misma composición; evitar apariencia de reproductor incrustado o paneles desconectados.
- **Móvil:** Diseñar una composición propia que conserve video dominante, lectura y sincronización; se puede reubicar el texto sobre un área protegida o próxima al video. No reducir literalmente las dos columnas de escritorio ni tapar al atleta o al CTA.
- **Sensación buscada:** Profesional, deportiva, cuidada e inmersiva, con movimiento al servicio del relato.
- **Voz:** Directa, profesional y cercana. Textos cortos con beneficios concretos; evitar frases motivacionales vacías y párrafos largos. Español como idioma inicial; los nombres de deportes pueden conservar el inglés usado por el cliente.
- **Marca disponible:** Nombre MIMEN. Logo, tipografías, paleta y manual de identidad: por definir. Proponer una dirección provisional sustituible.
- **Colores del mockup:** Rosa, blanco, gris y borde azul se interpretan como esquema de distribución; no constituyen una paleta aprobada.
- **Evitar:** Estética genérica de gimnasio, neón automático, texto excesivo, cifras decorativas, menú largo, tarjetas repetidas y secciones de relleno.

## 5. Referencia y lectura verificada

**Referencia:** https://kodohouse.lovable.app/

Se abrió en navegador el 19 de octubre de 2026. Se observó una escena dominante con un vaso, una lista de etapas a la izquierda y un encabezado contenido. Al desplazarse, avanzó la acción visual y cambió el énfasis del texto lateral mientras se conservaba la composición. La vista inspeccionada mostraba etapas de una bebida, entre ellas Ice, Milk y Matcha.

**Qué tomar:** Permanencia del escenario, relación entre desplazamiento y avance visual, sincronización del texto lateral y continuidad narrativa.

**Adaptación a MIMEN:** El deporte y el atleta cambian en el área audiovisual mientras el mensaje de coaching evoluciona a la izquierda. Utilizar identidad y material propios.

**No copiar:** Marca, textos, paleta, tipografía, imágenes ni temática de bebidas. La inspección visual no confirma cómo está implementada la referencia ni demuestra su rendimiento o accesibilidad.

## 6. Contenido del recorrido

**Mensaje central:** Entrenamiento que se adapta a ti, con tus rutinas en una app y seguimiento del equipo MIMEN.

**Regla editorial:** Un titular breve y una frase de apoyo por estado. Cada cambio aporta información sobre el servicio, además de identificar el deporte. Distribuir los beneficios sin repetir mensajes ni inventar diferencias entre disciplinas: personalización, acceso a rutinas y seguimiento son beneficios transversales.

Textos propuestos para el sitio:

| Estado | Titular | Apoyo |
| --- | --- | --- |
| Running · inicio | Tu objetivo. Tu rutina. | Coaching profesional con entrenamiento adaptado a ti. |
| Cycling | Entrena con dirección. | Rutinas diseñadas en torno a tus objetivos. |
| Swimming | Tu rutina, a la mano. | Consulta tu entrenamiento desde la app. |
| Gym | Entrena con seguimiento. | El equipo MIMEN acompaña tu proceso a través de la app. |
| Contacto | Cuéntanos tu objetivo. | Hablemos de tu deporte y de lo que quieres lograr. |

**CTA del encabezado:** «Hablemos». **Botón del formulario operativo:** «Contactar al equipo».

**Otros deportes:** «¿Tu deporte es otro? Consúltanos».

No añadir precios, coaches, testimonios, certificaciones o resultados sin información confirmada. No mencionar marcas de apps, métricas, chat, sincronización con relojes ni frecuencia de seguimiento hasta conocer su funcionamiento real.

## 7. Recursos audiovisuales

- **Disponibilidad:** El usuario aportó un mockup y una referencia; no se han proporcionado los clips finales en esta solicitud.
- **Necesidad principal:** Cuatro clips coordinados —Running, Cycling, Swimming y Gym— o una alternativa de tres clips que represente las cuatro disciplinas.
- **Plan de rodaje/edición:** Definir antes de producir los medios la duración útil, encuadre, resolución, continuidad de sujeto, fondos, luz, color y puntos de enlace. No fijar segundos arbitrarios en el brief.
- **Continuidad de atleta:** Usar la misma persona podría reforzar la sensación de transformación entre deportes; es una propuesta, no un requisito confirmado. También pueden usarse atletas distintos si la edición conserva unidad.
- **Entregables por clip:** Archivo fuente, versión web optimizada, póster, punto focal y recorte o variante móvil. Mantener una línea visual compartida y no ocultar acciones esenciales con el texto.
- **Audio:** La experiencia debe funcionar sin sonido; no activar audio automáticamente.
- **Peso y carga:** Priorizar primera imagen rápida, carga progresiva y medios adecuados al dispositivo. No descargar todos los originales al entrar.
- **Recursos faltantes:** Usar placeholders estables durante desarrollo, identificados como tales. No declarar acabado definitivo con videos pendientes.
- **Procedencia y derechos:** Por confirmar para clips, música si llegara a utilizarse, imágenes, logo y personas representadas. No presentar material ilustrativo como prueba de atletas o personal reales de MIMEN.
- **Producción:** No se ha encargado generar ni comprar recursos. Si se propone producción con Higgsfield u otro servicio de pago, presentar recursos y coste antes de contratar o consumir créditos.

## 8. Formulario de contacto

- **Ubicación:** Al final de la misma página; acceso directo desde el CTA del encabezado.
- **Objetivo:** Recibir consultas sobre coaching, disciplina y objetivos deportivos. No equivale a reservar, comprar o recibir un plan automáticamente.
- **Campos propuestos:** Nombre, correo, deporte —Running, Cycling, Swimming, Gym u Otro— y mensaje/objetivo. Nombre, correo y deporte obligatorios; mensaje opcional salvo decisión posterior del equipo.
- **Otro deporte:** Permitir especificarlo sin prometer disponibilidad del servicio.
- **Datos mínimos:** No pedir historial médico, lesiones ni documentos de salud en este primer contacto.
- **Destino y proveedor:** Por definir con el equipo. No inventar correo, teléfono, CRM ni servicio contratado.
- **Antes de conectar:** Preparar y validar el formulario localmente con aviso de que aún no envía. No mostrar un éxito de envío real ni guardar datos personales de prueba de forma persistente.
- **Operación final prevista:** Validación en cliente y servidor, control de abuso proporcional, estados accesibles de envío, error, reintento y éxito; preservar campos ante error y evitar duplicados. Confirmar recepción en el destino real antes de llamarlo operativo.
- **Privacidad:** Incorporar información aplicable al tratamiento real y acceso a su aviso sin romper el recorrido principal. Responsable, finalidad, proveedor, conservación y texto definitivo: por definir. No añadir suscripción comercial por defecto ni presentar un texto generado como aprobado legalmente.
- **Promesas:** No indicar plazo de respuesta, consulta gratuita o compromiso de aceptación sin confirmación.

## 9. Accesibilidad, movimiento y rendimiento

- El contenido esencial y el formulario siguen disponibles si el video falla o no carga.
- Respetar movimiento reducido con pósters o estados estáticos y textos equivalentes, conservando orden y acceso al contacto.
- Ofrecer un control comprensible para detener el movimiento y una vía breve al contacto. Detener animación no debe bloquear el desplazamiento ni ocultar información.
- Mantener teclado, foco visible, contraste, zoom y objetivos táctiles adecuados; no hacer que la lectura o el contacto dependan de arrastrar o acertar un instante del video.
- Probar scroll lento, rápido e inverso, touch, navegación por teclado, retorno desde el formulario y red lenta.
- Sin saltos de layout, texto desincronizado, fotogramas negros o cargas que obliguen a esperar para continuar.
- Validar una transición representativa con los medios reales en escritorio y móvil antes de extender el sistema. Registrar límites técnicos sin sustituir silenciosamente el scroll vinculado por autoplay.

## 10. Edición, tecnología y operación

- **Idioma inicial:** Español. Inglés completo y selector de idioma no solicitados.
- **Contenido editable:** Textos, disciplinas, orden del recorrido, medios, CTA y datos de contacto deben poder sustituirse sin rehacer la experiencia.
- **Stack:** Respetar el proyecto existente si lo hay; elegir la solución adecuada después de inspeccionarlo. No imponer una librería de animación desde este brief.
- **Dominio, hosting, repositorio y responsables:** Por definir.
- **Publicación:** No solicitada en esta tarea documental.
- **Costes, presupuesto y calendario:** Por definir; no contratar servicios automáticamente.
- **CMS, capacitación y mantenimiento:** No incluidos salvo solicitud posterior.

## 11. Criterios de aceptación del sitio futuro

1. La primera vista identifica a MIMEN, el coaching deportivo y el acceso al contacto.
2. El recorrido representa las cuatro disciplinas mediante tres o cuatro videos y se percibe como una sola experiencia, sin bloques deportivos apilados.
3. El scroll controla el avance audiovisual; al detenerse o invertirlo, imagen y texto conservan coherencia.
4. El lateral informativo cambia junto con el deporte; encabezado, alineaciones y escenario mantienen continuidad.
5. El formulario está al final de la misma página y el CTA permite saltar directamente a él.
6. Escritorio sigue la jerarquía del mockup; móvil conserva legibilidad y protagonismo audiovisual mediante adaptación propia.
7. Los textos son breves y comunican rutinas adaptadas a cada atleta, consulta mediante apps y seguimiento del equipo, sin añadir servicios no confirmados.
8. Hay una alternativa utilizable sin movimiento o sin video y el scroll nunca queda bloqueado.
9. El formulario solo se declara operativo tras verificar recepción real; mientras esté pendiente, su estado se comunica con claridad.
10. El acabado audiovisual final se valida con los clips y recortes reales, no únicamente con placeholders.

## 12. Pendientes para implementar y entregar

| Pendiente | Responsable / resolución |
| --- | --- |
| Videos finales y derechos | Usuario/equipo MIMEN; definir producción y entregar materiales |
| Cuatro clips o propuesta de tres | Base de trabajo: cuatro; ajustar si el material lo requiere |
| Logo e identidad existente | Usuario/equipo MIMEN; si no hay, proponer dirección visual |
| Apps utilizadas y detalle del seguimiento | Equipo MIMEN; confirmar nombres, funcionamiento y frecuencia |
| Destinatario, proveedor y privacidad del formulario | Equipo MIMEN con implementación; verificar recepción |
| Dominio, hosting, fecha y publicación | Usuario/equipo MIMEN |

Estos pendientes no impiden definir la composición y preparar una prueba técnica. Sí limitan qué puede presentarse como acabado definitivo u operativo.

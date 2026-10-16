# Historial de prompts de AcuerdoSeguro

Registro cronológico acumulativo de tareas y resultados. Consulta [ESTADO_PROYECTO.md](ESTADO_PROYECTO.md) para la situación operativa y [AGENTS.md](../AGENTS.md) para las reglas permanentes.

## 1. Convención y estados

Identifica cada tarea como `M[modulo]-B[bloque]-P[prompt]`: módulo, bloque y prompt. Conserva el orden de ejecución y agrega solo fechas, identidades o referencias de commits verificables; las referencias reales de publicación empiezan en M0-B6-P1.

| Estado | Significado |
| --- | --- |
| PENDIENTE | Todavía no ejecutado. |
| EN EJECUCIÓN | Trabajo iniciado, sin resultado final. |
| IMPLEMENTADO — PENDIENTE DE VALIDACIÓN | Implementación e informe local terminados; falta aprobación externa. |
| APROBADO | El responsable revisó y aceptó el bloque. |
| PARCIAL | Trabajo realizado parcialmente; detallar lo que falta. |
| BLOQUEADO | No se puede continuar por un problema documentado. |
| REQUIERE CORRECCIÓN | La revisión detectó problemas que deben solucionarse. |

## 2. Secuencia de prompts

- **Módulo activo:** Módulo 1 — Frontend e Interfaz de Usuario, EN DESARROLLO.
- **Módulo 0:** COMPLETADO y aprobado externamente.
- **Avance del Módulo 1:** 4 de 12 prompts aprobados.
- **Estado:** listo para relevo al siguiente integrante.
- **Bloque activo:** Bloque 3 — Página principal.
- **Último prompt aprobado:** M1-B3-P1.
- **Fuente de las aprobaciones:** el responsable confirmó el cierre del Módulo 0, el sistema visual y los componentes UI; la aprobación de M1-B2-P1 consta en el prompt M1-B3-P1 y la de M1-B3-P1 en la solicitud expresa de relevo del responsable. No se deducen aprobaciones del mero resultado de Codex.

| Prompt | Descripción | Estado |
| --- | --- | --- |
| M0-B1-P1 | Inicialización React, Vite y TypeScript | APROBADO |
| M0-B1-P2 | Verificación y estabilización | APROBADO |
| M0-B2-P1 | Integración Tailwind CSS | APROBADO |
| M0-B2-P2 | Organización de carpetas | APROBADO |
| M0-B3-P1 | Configuración de Git y entorno | APROBADO |
| M0-B4-P1 | Creación de AGENTS.md | APROBADO |
| M0-B5-P1 | Sistema de continuidad y seguimiento | APROBADO |
| M0-B6-P1 | Auditoría integral, cierre técnico y primera publicación en GitHub | APROBADO |
| M1-B1-P1 | Implementación del sistema visual base | APROBADO |
| M1-B1-P2 | Creación de componentes visuales reutilizables | APROBADO |
| M1-B2-P1 | Configuración de rutas y estructura de navegación | APROBADO |
| M1-B3-P1 | Desarrollo de la landing page definitiva | APROBADO |

**Siguiente prompt:** M1-B4-P1 — Formulario de inicio de sesión. Corresponde al siguiente integrante; no ejecutado.

## 3. Evidencia y observaciones por registro

Las pruebas históricas proceden de sus informes; cada registro atribuye las verificaciones al bloque correspondiente. Las rutas acreditan el resultado material, no la repetición de pruebas anteriores.

### M0-B1-P1

- **Objetivo y resultado:** inicializar la aplicación mínima React, Vite y TypeScript; contenido de bienvenida implementado.
- **Evidencia:** `package.json`, `package-lock.json`, `vite.config.ts`, configuraciones TypeScript, `index.html` y archivos de entrada en `src/`.
- **Verificaciones reportadas:** build, lint y desarrollo correctos; inspección visual móvil.
- **Observación:** se eligió una plantilla oficial con ESLint; no se crearon integraciones de negocio ni commits.

### M0-B1-P2

- **Objetivo y resultado:** auditar la base existente y verificar su instalación reproducible sin cambiar código ni versiones.
- **Evidencia:** configuración coherente conservada; informe previo de `npm ci` correcto en copia temporal con caché local, build, lint, desarrollo y revisión visual.
- **Observación:** instalación limpia anterior a Tailwind; no valida el lockfile posterior. Un fallo inicial de permisos dejó incompletas las dependencias locales y se resolvió restaurándolas; no es un bloqueo actual.

### M0-B2-P1

- **Objetivo y resultado:** integrar Tailwind CSS v4 con el plugin oficial de Vite conservando el contenido inicial.
- **Evidencia:** dependencias `tailwindcss` y `@tailwindcss/vite`, plugin en `vite.config.ts`, importación en `src/index.css` y clases en `src/App.tsx`.
- **Verificaciones reportadas:** build, lint y desarrollo correctos; nueve utilidades en el CSS compilado, estilos calculados y capturas de escritorio y móvil, sin errores de aplicación en consola.
- **Observación:** no hubo cambios de versión en las dependencias anteriores ni diseño definitivo de la plataforma.

### M0-B2-P2

- **Objetivo y resultado:** preparar seis carpetas finales sin implementar funcionalidades.
- **Evidencia:** `.gitkeep` vacíos en `src/components/`, `src/pages/`, `src/types/` y los tres subdirectorios de `src/services/`.
- **Verificaciones reportadas:** build, lint, desarrollo, reconocimiento por Git y comprobación de React y Tailwind en escritorio y móvil correctos.
- **Observación:** archivos anteriores conservados; carpetas reservadas sin servicios funcionales.

### M0-B3-P1

- **Objetivo y resultado:** proteger archivos privados y permitir una plantilla pública de entorno.
- **Evidencia:** `.gitignore` con excepción para `.env.example`, exclusiones concretas adicionales y plantilla con cinco variables públicas; únicamente `testnet` tiene valor.
- **Verificaciones reportadas:** build y lint correctos; reglas Git comprobadas para entornos, dependencias, compilaciones y archivos necesarios; identidad configurada y finales LF coherentes.
- **Observación:** no se consumen las variables, no se configuraron servicios ni se modificó la identidad Git.

### M0-B4-P1

- **Objetivo y resultado:** crear instrucciones permanentes para Codex sin modificar la aplicación.
- **Evidencia:** `AGENTS.md` en la raíz con reglas de alcance, arquitectura, seguridad, Git, pruebas y relevos.
- **Verificaciones reportadas:** build y lint correctos; revisión Markdown, rutas y reconocimiento por Git; archivos anteriores idénticos mediante SHA-256.
- **Observación:** no se probó su carga automática en una sesión nueva; no se crearon documentos de estado en aquel bloque.

### M0-B5-P1

- **Objetivo:** crear exclusivamente este historial y `docs/ESTADO_PROYECTO.md` para transferir contexto entre turnos.
- **Resultado local:** IMPLEMENTADO — PENDIENTE DE VALIDACIÓN; dos documentos creados y comprobaciones obligatorias finalizadas, sujetos a informe y revisión externa.
- **Evidencia:** documentos locales en `docs/`; versiones, estructura y Git inspeccionados; `npm run build` y `npm run lint` con resultado PASS; revisión de Markdown, enlaces, consistencia y reconocimiento por Git; los 23 archivos anteriores mantienen su SHA-256.
- **Observación histórica:** terminó pendiente de validación, con M0-B4-P1 como último aprobado. El responsable confirmó después su aprobación y autorizó M0-B6-P1 mediante el prompt de ese bloque.

### M0-B6-P1

- **Objetivo:** auditar estabilidad, reproducibilidad, seguridad y continuidad, y realizar la primera publicación si todas las condiciones se cumplen.
- **Resultado histórico de implementación:** terminó IMPLEMENTADO — PENDIENTE DE VALIDACIÓN, con M0-B5-P1 como último aprobado. El responsable confirmó después su aprobación y el cierre formal del Módulo 0 mediante M1-B1-P1.
- **Evidencia actual:** versiones e integridad verificadas; `npm ci` con lockfile actual correcto en copia temporal con caché; build y lint correctos en principal y copia; Vite arrancó y se detuvo, nueve utilidades CSS comprobadas; escritorio 1440 × 900 y móvil 390 × 844 inspeccionados sin desbordamiento ni errores de aplicación en consola.
- **Seguridad y remoto:** contenido de los 25 candidatos y exclusiones comprobados, sin secretos conocidos; GitHub accesible y sin ramas ni etiquetas en la consulta inicial. Visibilidad PUBLIC confirmada y publicación pública autorizada expresamente por el responsable durante este bloque, sustituyendo la expectativa inicial de privacidad.
- **Publicación comprobada:** commit inicial `10bc0ca12af399a0cdc098584894554b11eaf4c0`, mensaje `chore: inicializar base técnica de AcuerdoSeguro M0`; push normal con upstream a `origin/main` exitoso. Rama remota y árbol GitHub verificados, sin sobrescribir historial.
- **Prueba de relevo:** clonación HTTPS nueva con los 25 archivos esperados, idénticos al commit inicial; `npm ci` con caché local, build y lint correctos. Instrucciones, continuidad y `.env.example` presentes; sin entornos privados, `node_modules` ni `dist` rastreados.
- **Cierre documental publicado:** `4efefc6327751993459a27d81202533e4b3a5fc9`, mensaje `docs: registrar publicación y cierre técnico M0-B6-P1`; incluía solo continuidad. Ambos commits y la copia clonada quedaron sincronizados y limpios.
- **Pendientes que continúan:** ejecución en los otros cuatro equipos y carga de instrucciones en una sesión independiente. La aprobación externa y autorización para iniciar Módulo 1 llegaron con M1-B1-P1.

### M1-B1-P1

- **Objetivo:** definir el sistema visual base y adaptar únicamente la bienvenida existente, sin páginas, componentes ni integraciones nuevos.
- **Resultado histórico:** terminó IMPLEMENTADO — PENDIENTE DE VALIDACIÓN, con M0-B6-P1 como último aprobado. El responsable confirmó su aprobación al solicitar M1-B1-P2. Módulo 0 COMPLETADO y Módulo 1 EN DESARROLLO.
- **Cambios:** tokens de paleta, fuente, radios y sombra en `src/index.css`; raíz de ancho completo y foco visible; centrado aislado en `src/App.css`; bienvenida institucional en `src/App.tsx`, con los dos textos originales.
- **Pruebas:** PASS en build final, lint y arranque de Vite, detenido al finalizar; ocho tokens de color y siete utilidades verificados en CSS, paleta calculada correcta e inspección visual a 1440 × 900 y 390 × 844. Mediciones adicionales a 768 y 320 px y texto al 200 % sin desbordamiento ni superposiciones. Contrastes 14,27:1 y 4,76:1 para título y descripción; foco de teclado comprobado mediante sonda temporal del navegador, eliminada tras la prueba; sin errores de aplicación en consola ni animaciones. Las instalaciones y publicación del bloque anterior no se repiten aquí.
- **Entrega:** cambios únicamente locales en cinco archivos autorizados; sin staging, commits ni push. M1-B1-P2 previsto y no ejecutado.

### M1-B1-P2

- **Objetivo:** implementar siete componentes UI genéricos y exportaciones centralizadas, sin modificar la bienvenida ni el sistema visual aprobado.
- **Resultado histórico:** terminó IMPLEMENTADO — PENDIENTE DE VALIDACIÓN, con M1-B1-P1 como último aprobado. El responsable aprobó después los componentes mediante M1-B2-P1; el Módulo 1 continúa EN DESARROLLO.
- **Archivos:** ocho nuevos en `src/components/ui/`: Button, TextField, TextareaField, SelectField, Card, Badge, PageContainer e `index.ts`; se conserva `.gitkeep` y se actualizan únicamente los dos documentos preexistentes.
- **Diseño:** tokens existentes, controles nativos y clases Tailwind; variantes semánticas locales warning/danger con colores nativos de Tailwind, sin alterar tokens ni añadir dependencias.
- **Verificaciones:** PASS en build, lint, arranque de Vite, siete exportaciones individuales y centrales, props y refs, IDs únicos/estables, labels y ARIA, tipo por defecto y submit, disabled, edición controlada/no controlada, teclado nativo y foco. Contraste mínimo de botones 4,83:1 y de badges 5,63:1; capturas a 1440 y 390 px y mediciones a 320 px sin desbordamiento. Sin errores ni advertencias de aplicación; montaje temporal retirado, bienvenida restaurada y servidor detenido.
- **Límites:** hover visual no ejecutado por `hover: none` del navegador; sus reglas y disabled sí se comprobaron en CSS compilado. Pendiente ratón físico, lector de pantalla y los demás equipos; no se declara conformidad WCAG integral.
- **Entrega:** se conservan los cambios locales de M1-B1-P1; sin staging, commits ni push. M1-B2-P1 previsto y no ejecutado.

### M1-B2-P1

- **Objetivo:** implementar la infraestructura SPA y pantallas temporales, conservando la bienvenida y sin funcionalidades de producto.
- **Resultado histórico:** terminó IMPLEMENTADO — PENDIENTE DE VALIDACIÓN, con M1-B1-P2 como último aprobado. El responsable confirmó su aprobación mediante M1-B3-P1. Módulo 0 COMPLETADO; Módulo 1 EN DESARROLLO.
- **Dependencias:** `react-router` 7.18.4 en modo declarativo, con BrowserRouter único en App; sin react-router-dom ni cambios de versión en paquetes anteriores. Manifiesto y lockfile coherentes.
- **Archivos y arquitectura:** AppLayout con encabezado, navegación de cuatro destinos, NavLink activo, salto al único main y Outlet; HomePage con la bienvenida original, PlaceholderPage reutilizado en seis destinos y NotFoundPage para la ruta desconocida. Solo se adapta App.css para evitar altura de pantalla completa adicional bajo el encabezado.
- **Rutas:** `/`, `/login`, `/registro`, `/panel`, `/contratos/nuevo`, `/contratos/:id`, `/verificar` y `*`. Panel y contratos NO están protegidos por autenticación; no muestran datos privados ni simulan sesiones. Login, registro, dashboard, contratos y verificación funcional siguen pendientes.
- **Pruebas:** PASS en build, lint y arranque de Vite, detenido al finalizar. Chrome comprobó siete rutas y 404 por acceso directo, dos IDs de detalle y prioridad de `/contratos/nuevo`, regreso al inicio, SPA sin recargas y Atrás/Adelante con layout persistente. Un main y un h1 por vista, NavLink activo, Tab/Enter y salto al contenido con foco real. Mediciones a 1440, 390 y 320 px sin superposiciones ni desbordamiento; capturas de inicio y placeholder revisadas en escritorio y móvil; sin errores ni advertencias de aplicación.
- **Límites:** validación en un equipo Linux; sin auditoría WCAG integral ni lector de pantalla. No se agregaron reglas de producción: Vite sirve HTML de desarrollo con HTTP 200 incluso para la vista 404. Reescrituras y protección real de rutas quedan para sus módulos.
- **Entrega:** avances anteriores preservados, sin staging, commits ni push. M1-B3-P1 previsto, no ejecutado.

### M1-B3-P1

- **Objetivo:** desarrollar exclusivamente la landing en HomePage, conservando layout, rutas, sistema visual y siete componentes UI.
- **Resultado histórico:** terminó IMPLEMENTADO — PENDIENTE DE VALIDACIÓN, con M1-B2-P1 como último aprobado. El responsable aprobó expresamente M1-B3-P1 en la solicitud posterior de relevo. Módulo 0 COMPLETADO, Módulo 1 EN DESARROLLO con 4 de 12 prompts aprobados.
- **Implementación:** Hero con aviso de prototipo, fragmento Cómo funciona y enlace a registro; cuatro pasos futuros en lista ordenada; tres capacidades; Stellar, Soroban, privacidad y límites legales; CTA final con enlaces a registro y verificación. PageContainer, Card y Badge existentes, tokens institucionales y Tailwind; sin imágenes ni dependencias nuevas. Funciones pendientes identificadas junto a sus enlaces.
- **Pruebas:** PASS en build, lint y arranque de Vite, detenido al finalizar. Chrome verificó estructura, fragmento con ratón y teclado, foco del destino, CTA SPA, navegación global, placeholders, siete rutas y 404, regreso e historial. Tab/Enter, salto al contenido y foco visible; foco blanco en CTA sobre azul. Capturas completas inspeccionadas y mediciones a 320 × 700, 390 × 844, 768 × 1024 y 1440 × 900; texto al 200 % en los cuatro tamaños sin scroll horizontal. Sin errores ni advertencias de aplicación en consola.
- **Contenido y límites:** sin estadísticas, testimonios o contratos ficticios. SHA-256 como detector de cambios; Stellar y Soroban como tecnologías futuras, sin integraciones ni promesas jurídicas automáticas. No se implementaron login, registro, verificación documental, dashboard ni servicios. Pruebas en un equipo Linux; sin lector de pantalla, auditoría WCAG integral ni ratón físico. ESLint permanece sin actualizar.
- **Entrega:** solo HomePage y ambos documentos de continuidad cambian frente al inicio; los demás archivos conservados byte a byte. Sin archivos nuevos de aplicación, instalaciones, staging, commits ni push. M1-B4-P1 previsto, pendiente de autorización y no ejecutado.

### Relevo al siguiente integrante tras M1-B3-P1

- **Autorización:** el responsable aprobó M1-B3-P1 y solicitó consolidar y publicar todos los avances legítimos pendientes en `main`. No se asigna un identificador de prompt inventado a esta operación.
- **Continuidad:** Módulo 1, 4 de 12 prompts aprobados; estado listo para relevo al siguiente integrante. Siguiente prompt: M1-B4-P1 — Formulario de inicio de sesión, no ejecutado.
- **Pruebas nuevas:** build y lint PASS con Node.js 24.22.0 y npm 11.19.1. Revisión de los 37 archivos candidatos y búsqueda de patrones de credenciales sin hallazgos; plantilla pública sin secretos, exclusiones privadas y de compilación verificadas. No se repitieron las pruebas visuales históricas.
- **Git:** fetch de origin/main satisfactorio, sin divergencias respecto al HEAD anterior. Entrega de 19 archivos legítimos pendientes: siete modificados y doce nuevos, incluidos diseño, UI, layout, páginas, navegación, manifiesto, lockfile y continuidad. Sin funcionalidades nuevas ni cambios en archivos de aplicación durante este relevo.
- **Commit autorizado de entrega:** `feat: guardar avance frontend M1 y preparar relevo`; su hash se obtiene mediante `git log -1 --format=%H`. El informe de cierre registra el resultado efectivo del push, la igualdad HEAD/origin/main y el estado final del repositorio.
- **Siguiente integrante:** clonar el repositorio oficial, usar Node.js 24 y `npm ci`, leer AGENTS.md y continuidad, verificar build/lint y ejecutar únicamente el prompt M1-B4-P1 cuando reciba sus instrucciones completas.

## 4. Mantenimiento acumulativo y relevos

1. Agrega una entrada por nuevo prompt en orden cronológico; conserva los registros anteriores y evita identificadores duplicados en la tabla.
2. Actualiza el estado del registro al recibir aprobación o solicitud de corrección; no equipares implementación con aprobación externa.
3. Identifica tareas parciales o bloqueadas y detalla lo pendiente; documenta brevemente las correcciones relevantes sin borrar la evidencia previa.
4. Conserva referencias reales a commits cuando existan; no inventes fechas, pruebas, ejecutores, aprobaciones ni publicaciones.
5. Mantén coherentes módulo activo, último aprobado, estado actual y siguiente previsto con `ESTADO_PROYECTO.md`.
6. Al relevar, deja pruebas y resultados, trabajo incompleto, errores, cambios sin publicar, último commit publicado si existe y próximo prompt autorizado; usa la sección de relevo del estado para el resumen operativo.
7. Si se interrumpe una tarea por falta de disponibilidad, registra PARCIAL o BLOQUEADO según la causa real; no la marques automáticamente como completada.
8. No copies conversaciones ni prompts completos; conserva evidencias verificables y omite información privada.

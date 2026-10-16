# Historial de prompts de AcuerdoSeguro

Registro cronológico acumulativo de tareas y resultados. Consulta [ESTADO_PROYECTO.md](ESTADO_PROYECTO.md) para la situación operativa y [AGENTS.md](../AGENTS.md) para las reglas permanentes.

## 1. Convención y estados

Identifica cada tarea como `M[modulo]-B[bloque]-P[prompt]`: módulo, bloque y prompt. El orden inicial sigue la secuencia de ejecución comunicada; no constan fechas, duraciones, identidades ni commits que deban añadirse.

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

- **Módulo activo:** Módulo 0 — Configuración inicial, EN DESARROLLO.
- **Bloque activo:** Bloque 6.
- **Último prompt aprobado:** M0-B5-P1.
- **Fuente de las aprobaciones:** el prompt M0-B6-P1 confirma revisión externa de los siete prompts anteriores. No se deducen del mero resultado de Codex.

| Prompt | Descripción | Estado |
| --- | --- | --- |
| M0-B1-P1 | Inicialización React, Vite y TypeScript | APROBADO |
| M0-B1-P2 | Verificación y estabilización | APROBADO |
| M0-B2-P1 | Integración Tailwind CSS | APROBADO |
| M0-B2-P2 | Organización de carpetas | APROBADO |
| M0-B3-P1 | Configuración de Git y entorno | APROBADO |
| M0-B4-P1 | Creación de AGENTS.md | APROBADO |
| M0-B5-P1 | Sistema de continuidad y seguimiento | APROBADO |
| M0-B6-P1 | Auditoría integral, cierre técnico y primera publicación en GitHub | EN EJECUCIÓN |

**Siguiente etapa prevista:** Módulo 1 — Frontend. Autorización PENDIENTE; Módulo 0 sujeto a validación externa de su cierre.

## 3. Evidencia y observaciones por registro

Las pruebas de los registros anteriores proceden de sus informes; las verificaciones nuevas se atribuyen expresamente a M0-B6-P1. Las rutas acreditan el resultado material, no la repetición de pruebas históricas.

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
- **Resultado local:** EN EJECUCIÓN; último aprobado M0-B5-P1. No se declara cerrado ni aprobado el Módulo 0.
- **Evidencia actual:** versiones e integridad verificadas; `npm ci` con lockfile actual correcto en copia temporal con caché; build y lint correctos en principal y copia; Vite arrancó y se detuvo, nueve utilidades CSS comprobadas; escritorio 1440 × 900 y móvil 390 × 844 inspeccionados sin desbordamiento ni errores de aplicación en consola.
- **Seguridad y remoto:** contenido de los 25 candidatos y exclusiones comprobados, sin secretos conocidos; GitHub accesible sin ramas ni etiquetas. Visibilidad PUBLIC confirmada y publicación pública autorizada expresamente por el responsable durante este bloque, sustituyendo la expectativa inicial de privacidad.
- **Publicación:** staging, commit, push y clonación de verificación pendientes; no se inventan referencias de commits.

## 4. Mantenimiento acumulativo y relevos

1. Agrega una entrada por nuevo prompt en orden cronológico; conserva los registros anteriores y evita identificadores duplicados en la tabla.
2. Actualiza el estado del registro al recibir aprobación o solicitud de corrección; no equipares implementación con aprobación externa.
3. Identifica tareas parciales o bloqueadas y detalla lo pendiente; documenta brevemente las correcciones relevantes sin borrar la evidencia previa.
4. Conserva referencias reales a commits cuando existan; no inventes fechas, pruebas, ejecutores, aprobaciones ni publicaciones.
5. Mantén coherentes módulo activo, último aprobado, estado actual y siguiente previsto con `ESTADO_PROYECTO.md`.
6. Al relevar, deja pruebas y resultados, trabajo incompleto, errores, cambios sin publicar, último commit publicado si existe y próximo prompt autorizado; usa la sección de relevo del estado para el resumen operativo.
7. Si se interrumpe una tarea por falta de disponibilidad, registra PARCIAL o BLOQUEADO según la causa real; no la marques automáticamente como completada.
8. No copies conversaciones ni prompts completos; conserva evidencias verificables y omite información privada.

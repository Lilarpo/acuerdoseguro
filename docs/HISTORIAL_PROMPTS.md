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

- **Último módulo cerrado:** Módulo 1 — Frontend e Interfaz de Usuario, COMPLETADO Y APROBADO.
- **Módulo 0:** COMPLETADO y aprobado externamente.
- **Avance del Módulo 1:** 12 de 12 prompts aprobados.
- **Estado:** M1-B8-P1 APROBADO; cierre formal del Módulo 1 confirmado.
- **Último bloque cerrado:** M2-B2 — Autenticación real y navegación protegida, COMPLETADO Y APROBADO TÉCNICAMENTE. Módulo 2 continúa en desarrollo.
- **Últimos trabajos aprobados:** diseños A/B aprobados expresamente en PRE-DESPLIEGUE-P2; M2-B3-P1/P2/P3-A e inspección A–D/R5, cada uno en su alcance documental/local; RESPALDO-P2 publicado. M2-B2-P9/P9-C1 y sus aprobaciones previas se conservan. La actualización del plan sigue pendiente de revisión, sin aprobación global ni autorización de P3-B.
- **Última actividad administrativa de cierre:** CIERRE-DOC-M1, posterior a la aprobación. **Actividad operativa de relevo:** PUBLICACIÓN-RELEVO-M1. Ninguna cuenta como prompt de implementación.
- **Incorporación operativa posterior:** INCORPORACIÓN-RELEVO-M1; comprobaciones técnicas satisfactorias y contradicción documental pendiente que se corrige durante M2-B1-P1.
- **M2-B1:** COMPLETADO Y APROBADO; 2/2 prompts aprobados.
- **Actividad actual:** M2-B3-P5 — release candidate auditado y probado localmente; respaldo autorizado en rama de relevo, publicación a verificar al cierre. SQL sin ejecutar; ruta manual SQL Editor propuesta para MVP con datos de prueba y riesgo documentado, sin Pro. RLS funcional no validada y P3-B no autorizado.
- **Fuente de las aprobaciones:** el responsable confirmó el cierre del Módulo 0, el sistema visual y los componentes UI; la aprobación de M1-B2-P1 consta en el prompt M1-B3-P1, la de M1-B3-P1 en la solicitud expresa de relevo, la de M1-B4-P1 en M1-B4-P2, la de M1-B4-P2 en M1-B5-P1, la de M1-B5-P1 en M1-B6-P1, la de M1-B6-P1 en M1-B6-P2, la de M1-B6-P2 en M1-B7-P1, la de M1-B7-P1 en M1-B7-P2, la de M1-B7-P2 en M1-B8-P1 y la de M1-B8-P1 en CIERRE-DOC-M1 tras 22 pruebas manuales. No se deducen aprobaciones del mero resultado de Codex.

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
| M1-B4-P1 | Interfaz de inicio de sesión y validación local | APROBADO |
| M1-B4-P2 | Interfaz de registro y validación local | APROBADO |
| M1-B5-P1 | Dashboard y estados vacíos | APROBADO |
| M1-B6-P1 | Formulario local de creación de contratos | APROBADO |
| M1-B6-P2 | Interfaz de revisión local del borrador | APROBADO |
| M1-B7-P1 | Interfaz preliminar de detalle de contrato | APROBADO |
| M1-B7-P2 | Interfaz de verificación documental y validación local | APROBADO |
| M1-B8-P1 | Auditoría final, regresión y preparación de cierre | APROBADO |
| M2-B1-P1 | Configuración segura del cliente Supabase | APROBADO |
| M2-B1-P2 | Diagnóstico y verificación de conexión Supabase | APROBADO |
| M2-B2-P1 | Arquitectura de autenticación y estado de sesión | APROBADO |
| M2-B2-P2 | Registro real de usuarios con Supabase Auth | APROBADO |
| M2-B2-P3 | Inicio de sesión real con Supabase Auth | APROBADO |
| M2-B2-P4 | Cierre de sesión real con Supabase Auth, incluida corrección C1 aprobada | APROBADO |
| M2-B2-P5 | Revisión y diseño de persistencia de sesión | APROBADO por revisión externa del diseño |
| M2-B2-P6 | Implementación controlada de persistencia y renovación de sesión | APROBADO por quince comprobaciones manuales externas; renovación real pendiente de observación |
| M2-B2-P7 | Diseño de protección de rutas y autorización | APROBADO por revisión externa del diseño |
| M2-B2-P8 | Implementación controlada de rutas protegidas | APROBADO por catorce comprobaciones manuales externas |
| M2-B2-P9 | Auditoría integral de autenticación y navegación protegida | APROBADO tras resolución externa de F-01 |
| M2-B2-P9-C1 | Corrección del ciclo de logout entre sesiones | CORRECCIÓN APROBADA; F-01 RESUELTO Y VALIDADO EXTERNAMENTE |
| M2-B2-P9-C1-R1 | Revisar y validar la corrección recuperada de F-01 | VERIFICACIÓN TÉCNICA FAVORABLE; 22 simulaciones satisfactorias |
| M2-B2-CIERRE-P1 | Cierre documental y publicación segura del bloque | PUBLICADO Y VERIFICADO en rama de relevo; `dae6bbe7516afb5c01660fb143e32e12ee96cd5c` |
| M2-B3-P1 | Diseño del modelo de datos y seguridad RLS de contratos | APROBADO externamente para borradores privados |
| M2-B3-P2 | Migración local PostgreSQL y RLS para borradores privados | APROBADO COMO MIGRACIÓN LOCAL REVISADA ESTÁTICAMENTE; no aplicada |
| M2-B3-P3-A | Preflight, inventario remoto preparado y plan de pruebas RLS | APROBADO COMO PREFLIGHT DOCUMENTAL; consultas no ejecutadas |
| M2-B3-RESPALDO-P1 | Publicación segura de P1, P2 y P3-A en rama de relevo | PUBLICADO Y APROBADO; commit `9770ac1e4a04c563288e5343972858ba12cc4b89` |
| M2-B3-P3-INSPECCIÓN | Inventario remoto de solo lectura del proyecto compartido | APROBADO DOCUMENTALMENTE EN ALCANCE A–D; RLS funcional no validada |
| M2-B3-P3-IDENTIDAD | Cotejo del proyecto compartido con configuración React | CONFIRMADA EXTERNAMENTE; VITE_SUPABASE_URL COINCIDE |
| M2-B3-P3-INSPECCIÓN-R1 | Inventario autorizado de metadatos PostgreSQL | PARCIAL; sin acceso SQL directo, fase A preparada para ejecución manual |
| M2-B3-P3-INSPECCIÓN-R2 | Registro de fase A real y preparación de fase B | Registro completado; fase A confirmada externamente, fase B NO EJECUTADA |
| M2-B3-P3-INSPECCIÓN-R3 | Registro de fase B real y preparación de dependencias/roles | Registro completado; fase B confirmada externamente, C1/C2 NO EJECUTADAS |
| M2-B3-P3-INSPECCIÓN-R4 | Registro de fase C real y preparación de tipos/PK/privilegios | Registro completado; fase C confirmada externamente, D1–D4 NO EJECUTADAS |
| M2-B3-P3-INSPECCIÓN-R5 | Cierre documental de D y auditoría estática de permisos | APROBADO DOCUMENTALMENTE; no autoriza despliegue |
| M2-B3-RESPALDO-P2 | Respaldo documental de inspección R1–R5 | PUBLICADO Y VERIFICADO; 1479c089d365447c3a2bf2ae3c155f7d66c1cb6a |
| M2-B3-P3-PRE-DESPLIEGUE-P1 | Plan de seguridad, decisiones y recuperación | PLAN DOCUMENTAL ELABORADO — PENDIENTE DE REVISIÓN EXTERNA; NO-GO |
| M2-B3-P3-PRE-DESPLIEGUE-P2 | Registro de decisiones A/B y especificación de límites | A/B APROBADAS COMO DISEÑO; REGISTRO Y PLAN PREPARADOS — PENDIENTES DE REVISIÓN EXTERNA; NO-GO |
| M2-B3-P4 | MVP contractual: límites SQL locales, crear/listar/detalle/editar | IMPLEMENTADO LOCALMENTE — PENDIENTE DE REVISIÓN Y VALIDACIÓN REMOTA; NO-GO DE DESPLIEGUE |
| M2-B3-P5 | Auditoría release candidate, pruebas y respaldo GitHub | AUDITORÍA/PRUEBAS LOCALES SATISFACTORIAS; RESPALDO AUTORIZADO, RESULTADO GIT A VERIFICAR AL CIERRE; SQL REMOTO NO AUTORIZADO |
| M2-B3-P3-B | Aplicación controlada y verificación real de esquema y RLS | NO AUTORIZADO — NO EJECUTADO |

**Siguiente acción:** revisión externa del SQL/hash auditado P5 y autorización separada para ruta manual SQL Editor, aceptación del riesgo MVP y pruebas reales A/B/anónimo. Sin SQL remoto ni cambios de herramientas/defaults en P5. **P3-B:** aplicación y validación real NO AUTORIZADA — NO EJECUTADA.

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

### M1-B4-P1

- **Objetivo:** sustituir el placeholder de `/login` por interfaz y validación local, sin autenticación real.
- **Resultado:** PARCIAL; LoginPage y la ruta están implementados, pero las pruebas interactivas y visuales obligatorias no se ejecutaron por ausencia de navegador. Último aprobado: M1-B3-P1; Módulo 1 conserva 4 de 12 prompts aprobados.
- **Implementación:** formulario semántico con correo y contraseña controlados; validación de vacíos y formato de correo mediante validez nativa; errores de TextField asociados mediante ARIA; foco al primer campo inválido; aviso accesible cuando ambos campos son válidos; enlace SPA a `/registro`. Sin envío de credenciales, almacenamiento, sesiones, redirecciones ni Supabase.
- **Verificaciones realizadas:** build, lint y arranque de Vite PASS; servidor detenido. HTTP de `/`, `/login`, `/registro`, `/verificar` y ruta desconocida sirvió el HTML base. El renderizado estático comprobó h1, form, tipos de campo, botón y enlace. Estas pruebas no acreditan comportamiento en navegador.
- **Pendiente:** probar en navegador los casos de validación y corrección, Enter, rutas y enlaces SPA, consola y ausencia de peticiones de autenticación; inspeccionar 320, 390, 768 y 1440 px y zoom al 200 %. Después solicitar revisión externa. M1-B4-P2 sigue previsto, sin autorización ni ejecución.
- **Git:** cambios locales limitados a LoginPage, App.tsx y los dos documentos de continuidad; sin dependencias nuevas, staging, commit ni push.
- **Aprobación posterior:** el responsable informó en M1-B4-P2 que las pruebas manuales de navegador finalizaron satisfactoriamente y aprobó M1-B4-P1. La ausencia de pruebas propias de Codex en su informe original se conserva como evidencia histórica.

### M1-B4-P2

- **Objetivo:** sustituir el placeholder de `/registro` por interfaz y validación local, sin crear cuentas ni sesiones.
- **Resultado:** PARCIAL; RegisterPage y la ruta están implementados, pero las pruebas interactivas y visuales obligatorias no se ejecutaron por ausencia de navegador. Último aprobado: M1-B4-P1; Módulo 1 tiene 5 de 12 prompts aprobados.
- **Implementación:** cuatro campos controlados; nombre no vacío, correo con validez nativa, contraseña de al menos ocho caracteres y confirmación exacta; errores de TextField asociados mediante ARIA, ayuda de contraseña, foco al primer campo inválido, aviso accesible cuando todos los datos son localmente válidos y enlace SPA a `/login`. Sin solicitudes, persistencia, cuentas, sesiones ni Supabase.
- **Verificaciones realizadas:** build, lint y arranque de Vite PASS; servidor detenido. HTTP de `/`, `/login`, `/registro`, `/verificar` y ruta desconocida sirvió el HTML base. Renderizado estático comprobó h1, form, cuatro inputs y labels, ayuda, botón y enlace; no acredita comportamiento en navegador.
- **Pendiente:** probar en navegador los casos de validación, corrección y Enter; enlaces y rutas SPA, consola, red y almacenamiento; inspeccionar 320, 390, 768 y 1440 px y zoom al 200 %. Después solicitar revisión externa. M1-B5-P1 sigue previsto, sin autorización ni ejecución.
- **Git:** se conservan los cambios locales de M1-B4-P1. Este prompt añade RegisterPage y modifica solo App.tsx y continuidad; sin dependencias nuevas, staging, commit ni push.
- **Aprobación posterior:** el responsable informó en M1-B5-P1 que probó los nueve escenarios de validación, navegación a login, responsive, consola, red, almacenamiento y zoom al 200 %, y aprobó M1-B4-P2. La ausencia de pruebas propias de Codex en el informe original se conserva como evidencia histórica.

### M1-B5-P1

- **Objetivo:** sustituir el placeholder de `/panel` por un dashboard preliminar y estados vacíos honestos, sin datos reales ni simulados.
- **Resultado:** PARCIAL; DashboardPage y la ruta están implementados, pero las pruebas interactivas y visuales obligatorias no se ejecutaron por ausencia de navegador. Último aprobado: M1-B4-P2; Módulo 1 tiene 6 de 12 prompts aprobados.
- **Implementación:** encabezado y aviso de vista preliminar; sección Mis acuerdos sin consulta de datos; enlaces a `/contratos/nuevo` y `/verificar`; tres capacidades futuras. `PageContainer`, `Card` y `Badge` existentes, sin nuevas dependencias ni protección de sesión ficticia. `/panel` sigue pública y sin datos privados.
- **Verificaciones realizadas:** build, lint y arranque de Vite PASS; servidor detenido. HTTP de rutas existentes sirvió el HTML base. Renderizado estático comprobó h1, tres secciones, estado vacío y destinos de enlaces; no acredita navegación SPA en navegador.
- **Pendiente:** probar en navegador los enlaces, rutas, teclado, consola, red y almacenamiento; inspeccionar 320, 390, 768 y 1440 px y zoom al 200 %. Después solicitar revisión externa. M1-B6-P1 sigue previsto, sin autorización ni ejecución.
- **Git:** se conservan los cambios locales de M1-B4-P1 y M1-B4-P2. Este prompt añade DashboardPage y modifica solo App.tsx y continuidad; sin dependencias nuevas, staging, commit ni push.
- **Aprobación posterior:** el responsable informó en M1-B6-P1 que completó nueve pruebas manuales del dashboard, incluidas navegación, teclado, responsive, zoom, consola y ausencia de consultas privadas o sesiones ficticias, y aprobó M1-B5-P1. La ausencia de pruebas propias de Codex en el informe original se conserva como evidencia histórica.

### M1-B6-P1

- **Objetivo:** sustituir el placeholder de `/contratos/nuevo` por un formulario de borrador local con validaciones, sin contratos reales ni persistencia.
- **Resultado:** PARCIAL; CreateContractPage y la ruta están implementados, pero las pruebas interactivas y visuales obligatorias no se ejecutaron por ausencia de navegador. Último aprobado: M1-B5-P1; Módulo 1 tiene 7 de 12 prompts aprobados.
- **Implementación:** título, descripción, dos participantes con nombre y correo, y cláusulas; validación local de campos vacíos, título de 120 caracteres, formato y duplicación de correos; errores de TextField y TextareaField asociados mediante ARIA, foco al primer campo inválido, aviso accesible de validación local y enlace SPA a `/panel`. Sin guardado, documentos, hashes, firmas, Stellar ni Supabase.
- **Verificaciones realizadas:** build, lint y arranque de Vite PASS; servidor detenido. HTTP de rutas existentes sirvió el HTML base. Renderizado estático comprobó h1, tres secciones, siete campos, aviso de no guardado y enlace; no acredita navegación ni validación en navegador.
- **Pendiente:** probar en navegador los casos de validación, corrección, Enter en inputs y textareas, navegación SPA, consola, red, almacenamiento y recarga; inspeccionar 320, 390, 768 y 1440 px y zoom al 200 %. Después solicitar revisión externa. M1-B6-P2 sigue previsto, sin autorización ni ejecución.
- **Git:** se conservan los cambios locales de M1-B4-P1, M1-B4-P2 y M1-B5-P1. Este prompt añade CreateContractPage y modifica solo App.tsx y continuidad; sin dependencias nuevas, staging, commit ni push.
- **Aprobación posterior:** el responsable informó en M1-B6-P2 que completó satisfactoriamente 15 pruebas manuales del formulario, incluidas validaciones, teclado, responsive, zoom, consola, ausencia de envío y persistencia, y descarte tras recarga; M1-B6-P1 fue aprobado externamente. Codex no ejecutó esas pruebas de navegador.

### M1-B6-P2

- **Objetivo:** añadir revisión de lectura del borrador dentro de `/contratos/nuevo`, con acceso explícito tras validación y regreso a edición sin perder los valores.
- **Resultado:** PARCIAL; implementación y verificaciones técnicas correctas, pero faltan pruebas interactivas y visuales obligatorias por ausencia de navegador. Último aprobado: M1-B6-P1; Módulo 1 tiene 8 de 12 prompts aprobados.
- **Implementación:** `ContractDraftReview` presenta los siete valores del estado React mediante props, agrupados en información, participantes y cláusulas. Conserva saltos de línea y muestra contenido como texto React. La página invalida la validación al editar, compara los valores actuales con los validados y vuelve a comprobarlos antes de abrir la revisión. El botón para volver conserva los valores; no hay persistencia, contrato real, PDF, hashes, aprobaciones, Supabase, Stellar ni Soroban. La ruta de detalle continúa como placeholder.
- **Verificaciones realizadas:** build, lint y arranque de Vite PASS; servidor detenido. HTTP solo acreditó HTML base. Renderizado estático comprobó formulario inicial, estructura de revisión, texto especial escapado y saltos de línea; no acredita interacción de navegador.
- **Pendiente:** probar en navegador validación, paso a revisión, datos, regreso, nueva edición, teclado, red, consola, almacenamiento, recarga y rutas previas; inspeccionar 320, 390, 768 y 1440 px y zoom al 200 %. Después solicitar validación externa. M1-B7-P1 sigue previsto, sin autorización ni ejecución.
- **Git:** se conservaron los cambios locales anteriores. Este prompt añade `ContractDraftReview.tsx` y modifica `CreateContractPage.tsx` y los dos documentos de continuidad; sin dependencias nuevas, staging, commit ni push.
- **Aprobación posterior:** el responsable informó en M1-B7-P1 que completó satisfactoriamente 15 pruebas manuales en navegador, incluidas alternancia, conservación de valores, texto seguro, teclado, responsive, zoom, consola y ausencia de envío y almacenamiento; M1-B6-P2 fue aprobado externamente. Codex no ejecutó esas pruebas.

### M1-B7-P1

- **Objetivo:** sustituir el placeholder de `/contratos/:id` por un detalle preliminar sin consultar ni simular contratos reales.
- **Resultado:** PARCIAL; implementación y verificaciones técnicas correctas, pero faltan pruebas interactivas y visuales obligatorias por ausencia de navegador. Último aprobado: M1-B6-P2; Módulo 1 tiene 9 de 12 prompts aprobados.
- **Implementación:** `ContractDetailPage` presenta la referencia de URL como no verificada, con truncamiento visible cuando supera 120 caracteres. Secciones de información del acuerdo, dos participantes, aprobaciones, evidencia e integridad muestran solo disponibilidad pendiente. Enlaces a panel, creación y verificación. Sin consulta, persistencia, firmas, hashes, transacciones ni integración Supabase, Stellar o Soroban. `/verificar` sigue como placeholder.
- **Verificaciones realizadas:** build, lint y arranque de Vite PASS; servidor detenido. HTTP solo acreditó HTML base. Renderizado estático comprobó un h1, cuatro secciones, referencia dinámica, enlaces, escape de HTML y truncamiento; no acredita navegación SPA en navegador.
- **Pendiente:** probar en navegador referencias, enlaces y rutas existentes, teclado, consola, red, almacenamiento y presentación a 320, 390, 768 y 1440 px y zoom al 200 %. Después solicitar validación externa. M1-B7-P2 sigue previsto, sin autorización ni ejecución.
- **Git:** se conservaron los cambios locales anteriores. Este prompt añade `ContractDetailPage.tsx` y modifica solo `App.tsx` y los dos documentos de continuidad; sin dependencias nuevas, staging, commit ni push.
- **Aprobación posterior:** el responsable informó en M1-B7-P2 que completó satisfactoriamente 14 pruebas manuales del detalle, incluidas rutas, parámetros dinámicos, referencias no verificadas, texto seguro, teclado, responsive, zoom, consola, red y almacenamiento; M1-B7-P1 fue aprobado externamente. Codex no ejecutó esas pruebas.

### M1-B7-P2

- **Objetivo:** sustituir el placeholder de `/verificar` por una interfaz frontend para seleccionar un archivo y validar el formato de una huella SHA-256 introducida por el usuario.
- **Resultado:** PARCIAL; implementación y verificaciones técnicas correctas, pero faltan pruebas interactivas y visuales obligatorias por ausencia de navegador. Último aprobado: M1-B7-P1; Módulo 1 tiene 10 de 12 prompts aprobados.
- **Implementación:** `VerifyDocumentPage` contiene formulario semántico con selector nativo de un archivo, nombre mostrado como texto React, campo de huella controlado, errores accesibles y foco al primer campo inválido. Acepta únicamente formato hexadecimal de 64 caracteres; el aviso de datos válidos se invalida al cambiar entradas. Explica el proceso futuro y límites de SHA-256, con enlaces a panel y creación. No lee ni sube archivos, calcula o compara hashes, consulta Stellar, conecta Supabase ni persiste datos; no produce un resultado de verificación criptográfica.
- **Verificaciones realizadas:** build, lint y arranque de Vite PASS; servidor detenido. HTTP solo acreditó HTML base. Renderizado estático comprobó un h1, formulario, controles, pasos y enlaces sin errores ni aviso de éxito inicial; no acredita validación interactiva en navegador.
- **Pendiente:** probar en navegador archivo ausente, huella vacía, corta, larga, inválida, válida y en mayúsculas; cambio de entradas, mensajes y foco, nombre de archivo largo o especial, teclado, navegación, consola, red, almacenamiento, recarga y presentación a 320, 390, 768 y 1440 px y zoom al 200 %. Después solicitar validación externa. M1-B8-P1 sigue previsto, sin autorización ni ejecución.
- **Git:** se conservaron los cambios locales anteriores. Este prompt añade `VerifyDocumentPage.tsx` y modifica solo `App.tsx` y los dos documentos de continuidad; sin dependencias nuevas, staging, commit ni push.
- **Aprobación posterior:** el responsable informó en M1-B8-P1 que completó satisfactoriamente 15 comprobaciones manuales de selección de archivo, validación de huella, correcciones, navegación, teclado, responsive, zoom, consola, red y almacenamiento; M1-B7-P2 fue aprobado externamente. Codex no ejecutó esas pruebas.

### M1-B8-P1

- **Objetivo:** auditar transversalmente las rutas, pantallas, componentes, formularios, accesibilidad, seguridad frontend, dependencias y Git antes del cierre formal del Módulo 1.
- **Resultado:** PARCIAL; build, lint, arranque de Vite y renderizado estático de las ocho rutas pasaron. Faltan pruebas nuevas de regresión interactiva, accesibilidad por teclado, consola, red, almacenamiento y responsive en navegador. Último aprobado: M1-B7-P2; Módulo 1 tiene 11 de 12 prompts aprobados y permanece EN DESARROLLO.
- **Inspección:** BrowserRouter, AppLayout y siete componentes UI conservados; formularios locales y avisos honestos. Las rutas esperadas muestran sus vistas, incluida 404 y distinción entre `/contratos/nuevo` y `/contratos/:id`. Revisión de código sin llamadas externas, persistencia, lectura o subida de archivos, credenciales visibles ni integraciones Supabase, Stellar, Freighter o Soroban. No equivale a auditoría de seguridad externa.
- **Verificaciones realizadas:** `npm run build`, `npm run lint` y `npm run dev` PASS; Vite detenido. HTTP entregó el HTML base para ocho rutas, sin acreditar navegación SPA. Renderizado estático de cada ruta comprobó un main y h1, título esperado, IDs únicos, enlace de salto con destino y enlaces internos a rutas declaradas. No existe script de pruebas automatizadas configurado.
- **Hallazgos y correcciones:** no se identificaron defectos corregibles dentro del alcance y de las comprobaciones ejecutadas; no se modificó código. La falta de navegador impide afirmar ausencia de problemas interactivos o visuales.
- **Pendiente:** ejecutar la matriz manual de formularios, revisión del borrador, rutas, teclado, foco, consola, red, almacenamiento, recarga, 320, 390, 768 y 1440 px y zoom al 200 %. Después obtener la decisión externa de cierre. No iniciar un módulo nuevo.
- **Git:** avances locales anteriores conservados; este prompt modifica únicamente los dos documentos de continuidad. `git diff --check` PASS; sin staging, commit ni push.
- **Aprobación posterior:** el responsable confirmó en CIERRE-DOC-M1 que ejecutó satisfactoriamente 22 pruebas manuales de regresión integral del Módulo 1: rutas, formularios, creación y revisión de borradores, detalle, verificación documental, navegación, accesibilidad, responsive, zoom al 200 %, consola, red, almacenamiento y recarga. No comunicó defectos bloqueantes y aprobó M1-B8-P1. Codex no ejecutó esas pruebas de navegador; el estado PARCIAL del informe técnico anterior queda como antecedente histórico.

### HITO — MÓDULO 1 FRONTEND COMPLETADO Y APROBADO

- **Resultado:** 12 de 12 prompts de implementación aprobados. Auditoría técnica de M1-B8-P1 satisfactoria y regresión manual integral de 22 comprobaciones confirmada por el responsable.
- **Alcance:** sistema visual, UI reutilizable, navegación, landing, login y registro locales, dashboard preliminar, creación y revisión local de borradores, detalle preliminar y pantalla de verificación de formato completados dentro del alcance frontend. Autenticación, persistencia, documentos, aprobaciones y evidencia blockchain reales siguen pendientes de integración.
- **Publicación:** los cambios posteriores al relevo `987ae95` permanecen locales; este hito no supone publicación en GitHub.

### CIERRE-DOC-M1 — actividad administrativa

- Actualización de ambos documentos posterior a la aprobación de M1-B8-P1. No crea funcionalidades ni incrementa el contador de prompts del Módulo 1.
- `npm run build`, `npm run lint` y `git diff --check` PASS con el código existente. No se modificaron código, dependencias ni configuración; sin staging, commit ni push.
- Siguiente acción recomendada: publicación segura y relevo bajo instrucciones y autorización separadas. No se inicia un nuevo módulo.

### PUBLICACIÓN-RELEVO-M1 — actividad operativa

- **Objetivo:** auditar, versionar y publicar exclusivamente los avances frontend aprobados del Módulo 1 y los dos documentos de continuidad. No añade funcionalidades ni incrementa los 12 prompts aprobados.
- **Base histórica:** `987ae95f95573fd8ad5c0efb6e46ec8dfca9fe92`; antes de preparar la entrega, HEAD y el `origin/main` consultado en GitHub coincidían. La referencia al commit de relevo y la publicación efectiva deben comprobarse en Git y en el informe final.
- **Contenido previsto del relevo:** `src/App.tsx`, las seis páginas nuevas de login, registro, panel, creación, detalle y verificación, `src/components/contracts/ContractDraftReview.tsx` y ambos documentos de continuidad. No incluye dependencias, configuración, compilaciones ni integraciones futuras.
- **Continuidad:** Módulo 0 COMPLETADO y Módulo 1 COMPLETADO Y APROBADO, 12 de 12; último prompt aprobado M1-B8-P1 y cierre administrativo CIERRE-DOC-M1. El siguiente integrante debe verificar `origin/main`, ejecutar las comprobaciones pertinentes y esperar instrucciones para el próximo módulo.

### INCORPORACIÓN-RELEVO-M1 — actividad operativa

- En WSL2, sobre `main` limpio y el remoto oficial, se verificó directamente que GitHub, HEAD y `origin/main` coincidían en `353e73706d343bd56fede23cd97f6c77fc2865d4`; no se requirió avance de rama.
- Node.js 24.22.0, npm 11.19.1, `npm ci`, build, lint y arranque de Vite pasaron. El primer `npm ci` falló por `EPERM` del sandbox al ejecutar esbuild; el reintento autorizado terminó correctamente. Vite respondió por HTTP; no hubo inspección visual de navegador ni cambios funcionales, staging, commit o push.
- Se detectó la afirmación vigente incorrecta «Publicación de cambios locales pendiente» en la tabla de módulos del estado. Se corrigió durante M2-B1-P1, conservando las referencias históricas.

### M2-B1-P1

- **Objetivo:** preparar el cliente Supabase sin conectar las pantallas, las sesiones, la base de datos ni los servicios futuros.
- **Resultado:** IMPLEMENTADO — PENDIENTE DE APROBACIÓN EXTERNA. Módulo 2 INICIADO; Módulos 0 y 1 permanecen completados, y M1 conserva 12 de 12 aprobados.
- **Implementación:** `@supabase/supabase-js` 2.118.0 como única dependencia directa nueva; `.env.example` ya declaraba `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY`, y `.gitignore` ya protegía `.env.local`. `src/lib/supabaseClient.ts` ofrece `getSupabaseClient(): SupabaseClient | null`, con inicialización diferida, URL HTTP(S) y clave publicable, sin persistencia, renovación ni restauración automática de sesión. No se configuraron credenciales reales ni se modificaron páginas.
- **Pruebas:** `npm run build`, `npm run lint`, `npm run dev` y `git diff --check` PASS. Prueba controlada sin credenciales: ausentes, parciales, clave no publicable y URL inválida devuelven `null`; URL local y clave publicable de prueba producen cliente reutilizable sin peticiones externas. Vite sirvió HTML base en las ocho rutas; no acredita navegación SPA. Navegador y conexión real NO EJECUTADOS.
- **Instalación:** el primer `npm install` falló por `EAI_AGAIN` de DNS en el sandbox; el reintento autorizado pasó. No se actualizaron otras dependencias directas.
- **Git y continuidad:** cambios locales limitados a `package.json`, `package-lock.json`, `src/lib/supabaseClient.ts` y los dos documentos. Sin staging, commit ni push. Siguiente trabajo previsto: M2-B1-P2, sujeto a aprobación e instrucciones; no ejecutado.
- **Aprobación posterior:** el responsable informó 12 comprobaciones manuales satisfactorias de rutas, ausencia de errores nuevos y solicitudes inesperadas, ausencia de sesiones persistidas y Git coherente. No comunicó regresiones y aprobó M2-B1-P1. Codex no ejecutó esas pruebas manuales.

### M2-B1-P2

- **Objetivo:** diagnosticar de manera explícita y segura la disponibilidad HTTP de Supabase Auth, sin autenticar usuarios ni consultar datos.
- **Resultado inicial:** PARCIAL — implementación del diagnóstico completa; conectividad real pendiente en aquella ejecución. Entonces no existía `.env.local` ni se realizó una petición real. La aprobación posterior figura al final de este registro.
- **Herramienta:** `scripts/check-supabase-connection.mjs`, ejecutado solo con `npm run supabase:check`. Node 24 carga `.env.local` si existe. Valida URL HTTPS de proyecto oficial `*.supabase.co` y clave `sb_publishable_`, rechaza parámetros, credenciales embebidas, dominios ajenos y claves no públicas. Usa una sola petición GET a `/auth/v1/health`, cabecera publishable, timeout de 8 segundos y redirecciones manuales. Exige HTTP 200 y respuesta JSON que identifique Auth; no imprime configuración ni cuerpos remotos.
- **Estados y salidas:** 0 para salud de Auth confirmada; 1 para configuración inválida o conexión no confirmada; 2 para configuración ausente sin petición. El HTTP de salud no prueba permisos, login, RLS ni acceso a base de datos.
- **Pruebas:** `npm run supabase:check:test` PASS con 22 casos `node:test` simulados y sin internet: ausencia/parcialidad, entradas inseguras, salud válida y engañosa, respuestas HTTP, DNS y timeout. `npm run supabase:check` devolvió CONFIGURACIÓN AUSENTE y salida 2. Build, lint, Vite y `git diff --check` PASS; Vite sirvió HTML base de ocho rutas. Navegador y conectividad real NO EJECUTADOS.
- **Alcance y Git:** frontend y cliente de P1 conservados; sin dependencias nuevas ni cambio intencional del lockfile durante P2. Cambios locales acumulados sobre `353e737`, sin staging, commit ni push; ninguna credencial se añadió a Git.
- **Continuidad inicial:** se solicitó al responsable comprobar un proyecto propio con `.env.local` ignorado y validar externamente la salud de Auth; esa comprobación se completó posteriormente.
- **Aprobación posterior:** el responsable confirmó una conexión real satisfactoria con Supabase Auth, HTTP 200, más las 22 pruebas automatizadas controladas de diagnóstico y la regresión manual de rutas. Confirmó que `.env.local` permanece ignorado por Git. Las comprobaciones manuales fueron externas a Codex. M2-B1-P2 queda APROBADO; M2-B1, COMPLETADO Y APROBADO (2/2).

### M2-B2-P1

- **Objetivo y estado inicial:** arquitectura de observación de sesión Auth implementada; quedó PARCIAL al entregarla Codex por validación visual externa pendiente y por no confirmar la conexión real desde su sandbox. La aprobación posterior figura al final de este registro.
- **Archivos:** `src/auth/authTypes.ts`, `authContext.ts`, `AuthProvider.tsx` y `useAuth.ts` nuevos; `src/main.tsx` integra el proveedor bajo `StrictMode`. Solo estos archivos de aplicación y los dos documentos fueron tocados en este prompt; los cambios previos de M2-B1 permanecen locales.
- **Estados y eventos:** unión discriminada para ausencia de configuración, inicialización, salida, sesión observada y error; el hook deriva usuario mínimo (`id`, correo opcional) y `hasSession`. La suscripción procesa `INITIAL_SESSION`, `SIGNED_IN`, `SIGNED_OUT`, `TOKEN_REFRESHED` y `USER_UPDATED`; callback síncrono, baja de listener y guardia tras desmontaje. El SDK instalado emite `INITIAL_SESSION` al suscribirse incluso con `skipAutoInitialize: true`.
- **Límites:** sin sesiones completas ni tokens en Context; sin persistencia, renovación automática, registro, login, cierre de sesión, rutas protegidas ni autorización de datos. La sesión observada no equivale a identidad verificada ni sustituye RLS.
- **Pruebas:** build y lint PASS; `supabase:check:test` PASS (22 pruebas simuladas); Vite arrancó y se detuvo; `git diff --check` PASS. `supabase:check` en sandbox devolvió salida 1 por DNS. Navegador, consola, Network, almacenamiento, recarga y transiciones reales NO EJECUTADOS EN CODEX — REQUIEREN VALIDACIÓN MANUAL EXTERNA. La conexión HTTP 200 previa corresponde a la confirmación externa de M2-B1-P2.
- **Git y continuidad:** cambios acumulados sobre `353e737` sin staging, commit ni push; `.env.local` presente e ignorado. Revisar M2-B2-P1 externamente. M2-B2-P2 (registro real) es el siguiente prompt previsto, no ejecutado.
- **Aprobación posterior:** el responsable confirmó catorce comprobaciones manuales satisfactorias del frontend con AuthProvider integrado. Supabase Auth respondió HTTP 200 desde su terminal, las ocho rutas permanecieron operativas, no hubo regresiones en consola ni Network, no se introdujo persistencia de sesiones y Git conservó los cambios locales. Codex no ejecutó esas comprobaciones manuales. M2-B2-P1 queda APROBADO; las transiciones de registro y login con usuarios reales siguen sin implementar ni probar.

### PUBLICACIÓN-RELEVO-M2-01 — actividad operativa

- **Objetivo:** preparar un único commit y publicación normal de los avances aprobados M2-B1-P1, M2-B1-P2 y M2-B2-P1, sin implementar funcionalidades nuevas. Esta actividad no cuenta como prompt de implementación.
- **Base comprobada antes del commit:** `main`, HEAD local, `origin/main` y consulta directa a GitHub coincidieron en `353e73706d343bd56fede23cd97f6c77fc2865d4`; el trabajo aprobado estaba local y sin staging.
- **Seguridad de relevo:** `.env.local` ignorado y no rastreado; el siguiente integrante obtiene acceso autorizado al mismo proyecto Supabase y configura sus propias variables públicas desde `.env.example`. El HTTP 200 de Auth fue confirmado externamente, sin implicar usuarios, tablas, RLS ni login.
- **Publicación:** su resultado se verifica después del push; no se presupone en esta entrada.

### INCORPORACIÓN-RELEVO-M2-01 — comprobación recibida

- GitHub confirmó directamente `93c356f8bb03da1352950067faee7a17239e06af`; copia limpia actualizada mediante fast-forward, sin pérdida de archivos ni commits nuevos. Cliente, scripts y arquitectura Auth recibidos. La nota previa de preparación de publicación se conserva como antecedente.
- `npm ci` PASS tras reintentar con permisos normales por fallo DNS del sandbox; build, lint, 22 pruebas controladas y Vite PASS. Las ocho pantallas fueron comprobadas brevemente en Chrome. La conectividad real quedó pendiente inicialmente por ausencia de `.env.local`; el prompt M2-B2-P2 informa su configuración posterior y HTTP 200, confirmado de nuevo durante el bloque actual.

### M2-B2-P2

- **Resultado histórico de implementación:** PARCIAL al entregar Codex por alta real y aprobación pendientes; implementación y pruebas técnicas/controladas completas. El responsable aprobó posteriormente M2-B2-P2 mediante PUBLICACIÓN-RELEVO-M2-02 tras diez comprobaciones manuales satisfactorias. M0 COMPLETADO, M1 COMPLETADO Y PUBLICADO y M2-B1 COMPLETADO Y APROBADO.
- **Servicio:** `src/services/supabase/registerUser.ts` reutiliza getSupabaseClient y llama exclusivamente a auth.signUp. Recorta nombre y correo, conserva mayúsculas del correo y contraseña exacta; envía `full_name` como metadato no verificado. Resultado discriminado para configuración, aceptación sin sesión, sesión presente, validación, conectividad, límite y rechazo; no devuelve contraseñas, tokens ni sesión completa. Errores internos y cuenta existente usan mensajes neutrales sin consultas adicionales.
- **Interfaz:** RegisterPage conserva cuatro campos y todas sus validaciones. Usa ref síncrono y estado de carga para bloquear dobles envíos, deshabilita los campos durante la petición, informa progreso y resultado mediante status/alert. Limpia contraseñas tras aceptación, conserva nombre/correo y no borra los datos por fallos corregibles. Sin redirecciones, persistencia, eventos fabricados, logout o cambios de AuthProvider.
- **Pruebas nuevas:** build, lint, Vite, diff check y las 22 pruebas del diagnóstico PASS. Salud real HTTP 200, salida 0, tras fallo DNS del sandbox y reintento autorizado. Servicio aislado: 13 escenarios más null y excepción al obtener cliente, normalización y resultados sin valores sensibles. Chrome con SDK instalado y fetch simulado: ocho escenarios de validación sin red, carga, una solicitud ante doble envío síncrono, resultados sin/con sesión, red/reintento, contraseña, límites, cuenta existente neutral, limpieza, no redirección ni almacenamiento. Tab/Enter, foco y ARIA; capturas a 320, 390, 768 y 1440 px, texto 200 % y mensajes sin scroll horizontal. Ocho rutas de regresión renderizadas; no se repitieron todas las interacciones de borradores anteriores.
- **Red y consola:** las altas fueron interceptadas en el navegador con respuestas controladas, sin crear usuarios reales. Fallos de red simulados producen console.error propio del SDK; sin excepciones nuevas de aplicación. Scripts y capturas temporales fuera del repositorio, sin dependencias nuevas.
- **Confirmación y límites:** sin emailRedirectTo adicional; Site URL existente conforme a la API oficial. Responsable debe revisar registro Email, confirmación, política de contraseñas y URLs de desarrollo antes de una única alta real. Callback y detección de sesión en URL siguen sin implementar; las tres opciones de sesión permanecen desactivadas. Salud HTTP 200 no demuestra registro ni recepción de correo. Checklist detallada en ESTADO_PROYECTO.md.
- **Git:** solo un servicio nuevo, RegisterPage y ambos documentos modificados sobre `93c356f`. Cliente, AuthProvider, otras páginas, rutas, UI, configuraciones, dependencias y `.env.local` conservados; sin staging, commit ni push. M2-B2-P3 previsto y no ejecutado.

### PUBLICACIÓN-RELEVO-M2-02 — actividad operativa

- **Aprobación recibida:** el responsable confirmó diez comprobaciones manuales satisfactorias de M2-B2-P2, incluidas validaciones, solicitud real, respuesta de Supabase, revisión del correo y estado de cuenta de prueba, seguridad, navegación y responsive. M2-B2-P2 APROBADO; esas pruebas y la cuenta real no fueron ejecutadas ni creadas por Codex. El estado PARCIAL del informe inicial se conserva como antecedente histórico.
- **Continuidad:** M0 COMPLETADO, M1 COMPLETADO Y PUBLICADO, M2-B1 COMPLETADO Y APROBADO, M2-B2-P1 APROBADO y M2-B2-P2 APROBADO. Último prompt de implementación aprobado: M2-B2-P2. Siguiente: M2-B2-P3 — Login real — NO INICIADO. Persistencia de sesiones y rutas protegidas pendientes.
- **Base y alcance:** HEAD y main consultado directamente en GitHub coinciden en `93c356f8bb03da1352950067faee7a17239e06af`; fetch correcto, sin divergencias. Solo se preparan registerUser.ts, RegisterPage y ambos documentos. Código de registro aprobado conservado, sin nuevas funcionalidades ni cambios de AuthProvider o dependencias.
- **Verificaciones nuevas de Codex:** build, lint, 22 pruebas controladas del diagnóstico y diff check; seguridad revisada sobre los cuatro archivos candidatos, sin secretos ni datos personales de cuentas de prueba. No se repiten altas reales ni pruebas manuales del responsable durante esta publicación.
- **Commit autorizado:** `feat(auth): implementar registro real Supabase M2-B2-P2`. Su hash y resultado del push se verifican después de crearlo y publicar, mediante HEAD, origin/main, consulta directa a GitHub y estado limpio. Esta entrada no anticipa éxito del push.
- **Siguiente integrante:** utilizar el mismo proyecto Supabase compartido con acceso propio autorizado y configurar su propio `.env.local`, ignorado por Git, con las variables públicas desde el dashboard. No copiar archivos privados del compañero ni compartir credenciales por chat. Usar Node.js 24, npm 11 y `npm ci`; leer AGENTS.md y continuidad, verificar diagnóstico/build/lint y esperar el prompt completo M2-B2-P3.

### M2-B2-P3

- **Estado histórico:** PARCIAL al entregar Codex, con implementación y pruebas técnicas/controladas completas. Aprobado posteriormente mediante M2-B2-P4: el responsable confirmó doce comprobaciones manuales satisfactorias de formulario, validaciones, rechazo y recuperación, login real, duplicados, AuthProvider, seguridad, recarga, consola/Network, responsive/accesibilidad y Git/regresión. Estas pruebas reales fueron externas a Codex. M0 COMPLETADO, M1 COMPLETADO Y PUBLICADO, M2-B1 COMPLETADO Y APROBADO; último aprobado M2-B2-P2, publicado mediante `0e23f15039802537ee2708120526d797a8acae59`. Inicio en main limpio y remoto oficial.
- **Servicio:** loginUser.ts reutiliza getSupabaseClient y ejecuta solo signInWithPassword. Recorta el correo de forma coherente con el registro y conserva la contraseña. Resultado tipado para éxito, credenciales inválidas, correo no confirmado, límites, red, cliente ausente, respuesta inesperada y rechazo desconocido. Revisa sesión y usuario coherentes, tokens no vacíos y caducidad válida; no devuelve sesión ni valores sensibles, no consulta getSession/getUser ni API administrativa.
- **Interfaz:** LoginPage conserva diseño, dos campos, validaciones y enlace a registro. Ref síncrono contra envíos concurrentes, carga, bloqueo temporal de ambos campos y botón, status/alert, limpieza de contraseña al éxito y correo conservado. Sin navegación automática, recarga, logout, almacenamiento manual ni nueva suscripción en la página.
- **Arquitectura:** cliente, AuthProvider, useAuth y opciones de sesión intactos. SIGNED_IN procede del SDK; el proveedor observa session_present sin que el formulario modifique Context. Sesión cliente no equivale a autorización de datos. Persistencia, renovación y detección de sesión en URL siguen desactivadas.
- **Pruebas nuevas:** build, lint, Vite y diff check PASS; 22/22 pruebas de diagnóstico PASS. Salud real HTTP 200, salida 0, tras reintentar fuera del sandbox por fallo DNS. Servicio aislado: dos casos de configuración, diez de error y diez de respuesta, normalización, contraseña intacta y resultados sin valores sensibles. Chrome con SDK y fetch simulado: tres casos inválidos sin petición, doble submit/click/Enter con una sola solicitud, carga, errores y reintento, respuesta sin sesión, éxito sin redirección, limpieza y ausencia de almacenamiento propio. AuthProvider/useAuth originales comprobados mediante montaje temporal ante evento real del SDK derivado de respuesta simulada; recarga sin sesión persistida. Tab/Shift+Tab/Enter, foco y ARIA; capturas a 320/390/768/1440 y texto al 200 %, sin scroll horizontal por error o carga. Regresión de renderizado de las ocho rutas; no repite toda la matriz histórica de formularios.
- **Consola y red:** sin excepciones nuevas de aplicación; console.error esperado del SDK en fallo de red simulado. No hubo intentos reales de login ni creación de cuentas; las respuestas controladas y el montaje de prueba no son funcionalidad de producción. Scripts y capturas temporales fuera del repositorio, sin dependencias nuevas.
- **Prueba real:** NO EJECUTADA por Codex. Responsable debe utilizar cuenta de prueba propia, confirmada si corresponde, y revisar éxito, contraseña incorrecta y correo no confirmado solo si dispone de un caso autorizado; verificar una petición, mensaje, sesión observada, ausencia de redirección y almacenamiento sensible. Checklist en ESTADO_PROYECTO.md. No solicitar contraseñas por chat ni generar usuarios para probar.
- **Git:** un servicio nuevo, LoginPage y ambos documentos de continuidad; resto de archivos conservados. Sin staging, commit, push ni cambios de registro, cliente, proveedor, rutas, UI o dependencias. Siguiente prompt M2-B2-P4 solo previsto; no ejecutado. Persistencia y rutas protegidas pendientes de planificación y autorización.

### M2-B2-P4

- **Estado histórico de entrega:** PARCIAL — PENDIENTE DE VALIDACIÓN MANUAL EXTERNA. Implementación y pruebas técnicas/controladas completas; no se aprueba automáticamente. M2-B2-P3 APROBADO por doce comprobaciones manuales externas confirmadas por el responsable, registradas antes del resultado de este prompt. M0 COMPLETADO, M1 COMPLETADO/APROBADO/PUBLICADO y M2-B1 COMPLETADO Y APROBADO.
- **Servicio:** logoutUser.ts reutiliza getSupabaseClient y llama exclusivamente a auth.signOut con scope local explícito. Resultado tipado para éxito, configuración ausente, red, límite, rechazo Auth y error desconocido. Comprueba error y captura excepciones; no devuelve sesiones, contraseñas, tokens ni objetos internos. No usa scope global/others ni crea clientes adicionales.
- **Interfaz:** LoginPage utiliza useAuth y ofrece Sesión activa/Cerrar sesión solo ante session_present observado. Login oculto con sesión, campos y acciones bloqueados mientras hay una operación; refs impiden dobles envíos y concurrencia login/logout. Carga accesible, mensajes status/alert y controles restaurados. Éxito únicamente tras respuesta sin error y signed_out observado; espera transitoria y aviso de discrepancia tras ocho segundos si el proveedor no confirma, permitiendo reintentar. Sin redirecciones ni cambios manuales del Context o eventos ficticios.
- **Pruebas nuevas:** build, lint, Vite, diff check y 22/22 tests de diagnóstico PASS EJECUTADO. Salud real HTTP 200, salida 0, tras DNS de sandbox y reintento autorizado. Servicio aislado con mocks: configuración, respuestas, errores y scope. Chrome con SDK/fetch simulado: ciclo login/logout/relogin, SIGNED_OUT observado, scope local, doble clic y exclusión mutua, almacenamiento ajeno conservado; error de red/límite sin éxito falso. Proveedor de prueba para estados signed_out/initializing/not_configured/error/session_present, rechazo y reintento, espera, discrepancia y confirmación tardía. Tab/Shift+Tab/Enter/Space, foco visible y UI aislada en 320/390/768/1440 px con texto 200 %, sin scroll horizontal; ocho rutas renderizadas. No se repite toda la matriz histórica.
- **Límites y observaciones:** el SDK instalado retira la sesión local incluso ante ciertos errores de red/Auth; la UI refleja esa retirada sin anunciar éxito de una operación fallida. Si el proveedor conserva sesión, puede reintentarse. Sin excepciones nuevas en la matriz final; console.error esperado del SDK en red simulada. Política de sesión intacta y sin almacenamiento manual. Scope local no implica revocación instantánea de todos los JWT; pueden conservar validez hasta expirar. Políticas/ausencia de modificaciones externas: PASS POR INSPECCIÓN.
- **Prueba real:** NO EJECUTADO por Codex. Responsable usará cuenta propia ya confirmada; no recargar entre login y logout, verificar una solicitud, evento observado, formulario restaurado y nueva autenticación; revisar consola/Network sin publicar datos sensibles. Checklist en ESTADO_PROYECTO.md. Sin nuevos usuarios ni cambios remotos de Supabase durante este bloque.
- **Git:** se preservan los avances locales de M2-B2-P3, incluido loginUser.ts idéntico al inicio. Este prompt agrega únicamente logoutUser.ts y modifica LoginPage y los dos documentos. Registro, cliente, AuthProvider, otras páginas, layout, UI y dependencias intactos. Sin staging, commit ni push.
- **Continuidad:** último aprobado M2-B2-P3; actual M2-B2-P4 pendiente de validación externa. Siguiente M2-B2-P5 — Revisión y diseño de persistencia de sesión — PREVISTO, NO EJECUTADO. La política deberá decidirse y validarse explícitamente antes de habilitar persistencia; rutas protegidas y servicios de contratos/blockchain pendientes.

- **Aprobación posterior recibida en P5:** responsable confirma siete comprobaciones manuales tras C1: formulario sin sesión, login real, presentación sin instrucciones/registro con sesión, logout real, recuperación de formulario/registro, repetición login/logout sin recarga y ausencia de errores bloqueantes con Git conservado. P4 APROBADO; pruebas externas, no ejecutadas por Codex.

### M2-B2-P4-C1 — Ajuste de visibilidad de registro e instrucciones según sesión

- **Estado histórico de entrega:** COMPLETADO TÉCNICAMENTE; corrección puntual de P4, no se contabiliza como nuevo prompt funcional del Módulo 2 ni aprueba el logout real.
- **Causa y cambio:** LoginPage renderizaba siempre el enlace de registro y las instrucciones de login. Ahora ambos dependen de `!hasSession && state.status !== 'initializing'`; con sesión activa adapta el título a «Tu sesión», mantiene «Sesión activa», el botón de logout y los resultados de autenticación. Sin sesión restituye las instrucciones y registro; durante inicialización evita el enlace transitorio. not_configured/error conservan la navegación previa.
- **Pruebas de esta corrección:** build y lint PASS; 22/22 pruebas controladas del diagnóstico PASS. Vite arranca tras reintento autorizado por EPERM del sandbox; advertencia conocida de tamaño del bundle. Chrome con SDK y fetch simulado comprueba signed_out/session_present, SIGNED_IN/SIGNED_OUT, mensajes de éxito conservados, logout pendiente, exclusión mutua y errores sin éxito falso. Proveedor controlado comprueba initializing/not_configured/error y rechazo con sesión conservada. Sin peticiones reales de autenticación ni nuevos usuarios; no se atribuyen mocks a pruebas manuales externas.
- **Cierre comprobado:** ocho rutas renderizadas; teclado y responsive a cuatro anchos con texto al 200 % sin desbordamiento. `git diff --check` PASS; staging vacío, 51 archivos idénticos por SHA-256 al inicio y Vite detenido. Sin excepciones nuevas; error de consola esperado del SDK en red simulada.
- **Alcance:** únicamente LoginPage y los dos documentos. Servicios loginUser/logoutUser, AuthProvider/useAuth, resto de páginas, dependencias y política de sesiones preservados. Sin staging, commit, push ni actualizaciones remotas. Avances previos P3/P4 conservados.
- **Continuidad:** cinco prompts de M2 aprobados; último aprobado M2-B2-P3. M2-B2-P4 PARCIAL — PENDIENTE DE VALIDACIÓN MANUAL EXTERNA; M2-B2-P5 PREVISTO — NO EJECUTADO.

- **Aprobación posterior recibida en P5:** C1 queda CORRECCIÓN APROBADA dentro de P4 por las siete verificaciones manuales externas comunicadas por el responsable. No incrementa el conteo funcional; referencias anteriores a pendiente describen la entrega histórica.

### M2-B2-P5 — Revisión y diseño de persistencia de sesión

- **Estado histórico de entrega:** DISEÑO ELABORADO — PENDIENTE DE REVISIÓN EXTERNA. No se marca APROBADO. Último aprobado P4; seis prompts M2 aprobados. P3/P4 y C1 conservados localmente, sin nueva publicación.
- **Documento:** PLAN_PERSISTENCIA_SESION.md, 16 apartados ordenados, cuatro alternativas, recomendación condicionada y matriz de 33 casos futuros con precondición, acción, resultado, mocks, navegador, cuenta, expiración y efectos secundarios. Incluye XSS, JWT/logout, RLS, StrictMode, pestañas, callback pendiente, cambios mínimos y reversión dirigida con residuos de storage. Matriz diseñada, NO EJECUTADA.
- **Evidencia:** código actual y supabase-js/auth-js 2.118.0 instalado/lockfile contrastados con documentación oficial. Configuración intacta: persistSession false, autoRefreshToken false, detectSessionInUrl false, skipAutoInitialize true; SDK usa memoria. Sin adaptador, clave ni flowType personalizados. onAuthStateChange puede leer una sesión inicial sin initialize, pero no prepara por esa ruta el ciclo de visibilidad/renovación; propuesta futura skipAutoInitialize false junto con persistencia/refresh oficiales y detección URL deshabilitada. Revisar formulario durante initializing y proyección de usuario malformado sin duplicar estado ni suscripción.
- **Recomendación pendiente:** persistSession true, autoRefreshToken true, detectSessionInUrl false; aprobación explícita de riesgo XSS, duración y equipos compartidos antes de P6. Mantener memoria si no se aprueba. Proveedor/tipos/hook/servicios conservados; no se implementaron cambios de política ni callback, rutas protegidas, RLS o blockchain.
- **Verificaciones ejecutadas:** build PASS; lint PASS; diagnóstico simulado 22/22 PASS; git diff --check PASS. Advertencia conocida de bundle >500 kB. Sin pruebas reales Auth, usuarios nuevos, cambios en Dashboard ni navegador/Vite en este bloque documental. No se atribuyen pruebas manuales externas a Codex.
- **Git:** solo creación del plan y actualización de ambos documentos. Todo el código y configuración previos preservados, incluidos los servicios nuevos de P3/P4; .env.local ignorado, sin instalar dependencias, staging, commit, push ni actualización remota.
- **Continuidad:** M0 completado; M1 completado/aprobado/publicado; M2-B1 completado/aprobado; P1/P2/P3/P4 aprobados, C1 corrección aprobada incluida en P4. Login/registro/logout reales aprobados; persistencia deshabilitada, rutas protegidas no implementadas, contratos/RLS y Stellar/Soroban pendientes. Siguiente M2-B2-P6 — Implementación controlada de persistencia de sesión — PREVISTO, NO EJECUTADO y no autorizado.

- **Aprobación posterior recibida en P6:** el responsable revisó y aprobó externamente el diseño técnico y autorizó expresamente la persistencia y renovación mediante SDK oficial. M2-B2-P5 APROBADO. No se atribuye esta aprobación a nuevas pruebas de Codex. Plan original preservado sin cambios, incluida cabecera histórica; siete prompts M2 aprobados.

### M2-B2-P6 — Implementación controlada de persistencia y renovación de sesión

- **Estado histórico de entrega:** IMPLEMENTADO — PENDIENTE DE VALIDACIÓN MANUAL EXTERNA. No aprobado automáticamente; responsable ejecutará el flujo real tras revisar el informe.
- **Cliente:** opciones oficiales auth de SDK 2.118.0: persistSession y autoRefreshToken pasan a true, skipAutoInitialize a false; detectSessionInUrl permanece false. Cliente único, inicialización automática y almacenamiento por SDK. Sin initialize/getSession/refresh manuales, temporizadores de refresh propios, adaptadores ni claves personalizadas.
- **Proveedor:** defensa localizada ante user/id malformados; solo id/correo string en Context. Callback síncrono para eventos existentes; SIGNED_OUT retira usuario, INITIAL_SESSION no pisa cambios posteriores ya observados. Cleanup active/unsubscribe conservado; sin servicios asíncronos dentro de suscripción.
- **LoginPage:** espera neutral con formulario/registro ocultos y campos/envío bloqueados durante initializing; mensaje de recarga actualizado y aviso de equipo compartido. Mantiene login/logout, scope local, validaciones, doble envío, C1 y discrepancia de cierre. Sin redirecciones ni cambios de servicios.
- **Seguridad:** SDK gestiona almacenamiento accesible por JS; riesgo XSS documentado, sin contraseñas persistidas, tokens expuestos ni credenciales administrativas. JWT emitidos no se prometen revocados instantáneamente. Sin guards, roles, RLS contractual, tablas, callback, backend, Stellar o Soroban.
- **Pruebas ejecutadas:** build/lint PASS, 22/22 diagnóstico PASS, Vite y diff check PASS. Salud Auth HTTP 200 tras reintento autorizado por DNS; Vite requirió reintento por EPERM. Ocho rutas renderizadas sin excepciones nuevas de aplicación; red Auth de usuarios interceptada. Advertencia histórica de bundle >500 kB, sin cambios para silenciarla.
- **Matriz de 33 casos:** registrada completa con alcances en ESTADO_PROYECTO.md: 29 PASS SIMULADO, 2 PASS EJECUTADO (responsive/checks), 1 PASS POR INSPECCIÓN (seguridad de tokens) y 1 NO EJECUTADO (cierre/reapertura completa del navegador con sesión). Flujo SDK login/recarga/logout/recarga/nuevo login, dos pestañas y eventos oficiales con respuestas simuladas; refresh automático con ticker acelerado de fixture; errores de red/rechazo/expiración controlados, JSON corrupto, storage bloqueado previo a inicialización y refresh retenido durante logout. Proveedor real compilado con cliente controlado: StrictMode, limpieza, eventos tardíos, user inválido, cliente null y excepción síncrona al suscribir. No equivalen a operaciones remotas ni cubren todas las excepciones asíncronas del SDK.
- **Regresión y límites:** registro con validación/aceptación/doble envío/limpieza simulado; login y logout aprobados conservados, sin repetir matrices completas históricas. Responsive sesión a 320/390/768/1440 y texto 200 %, capturas móvil/escritorio revisadas. Console.error/warn esperado de SDK ante fallos simulados. Sin cuentas nuevas ni login/logout reales en Codex; renovación remota REAL PENDIENTE DE OBSERVACIÓN y checklist externa pendiente.
- **Git:** cinco archivos modificados en P6: cliente, AuthProvider, LoginPage y ambos documentos. Cero archivos nuevos de código; scripts/capturas fuera del repositorio. Servicios, plan P5, tipos/hook, UI, otras páginas, package/lockfile y entorno conservados. Sin staging, commit, push ni actualización remota.
- **Auditoría final:** 50 archivos idénticos por SHA-256 respecto al inicio de P6 y solo cinco autorizados modificados, sin altas/bajas. .env.local ignorado/no rastreado; revisión de patrones sin credenciales reales detectadas (placeholder sintético previo del diagnóstico revisado). Staging vacío; HEAD sigue 0e23f15039802537ee2708120526d797a8acae59. Vite detenido.
- **Continuidad:** P5 aprobado por responsable; P6 implementado pendiente de validación. Renovación real automática pendiente de observación. P7 — Diseño de protección de rutas y autorización — PREVISTO, NO EJECUTADO; diferenciar UI y autorización servidor/RLS.

- **Aprobación posterior recibida en P7:** responsable confirmó quince comprobaciones manuales satisfactorias de persistencia real: login, recarga/recuperación, inicialización visual, navegación, segunda pestaña, logout/sincronización, recarga sin sesión, nuevo login, cierre/reapertura de navegador, ausencia de sesiones residuales, almacenamiento, ausencia de errores inesperados y regresión/Git. P6 APROBADO; pruebas externas, no de Codex. Renovación automática habilitada y probada mediante simulaciones; observación real PENDIENTE. Ocho prompts de M2 aprobados; C1 incluida en P4.

### M2-B2-P7 — Diseño de protección de rutas y autorización

- **Estado histórico de entrega:** DISEÑO ELABORADO — PENDIENTE DE REVISIÓN EXTERNA; no aprobado automáticamente. Nuevo PLAN_PROTECCION_RUTAS.md con veinte apartados, ocho rutas, cinco estados Auth, seis actores/nueve operaciones y 35 escenarios futuros NO EJECUTADOS. Sin código nuevo ni guards.
- **Evidencia:** App/main/Auth/layout/navegación/páginas y continuidad inspeccionados; React Router 7.18.4 instalado, modo declarativo y Route padre AppLayout con Outlet. Documentación oficial React Router y Supabase contrastada; SDK 2.118.0 y opciones P6 conservados. No se consultaron valores de .env.local ni Dashboard.
- **Propuesta P8:** Route sin path con RequireAuth solo para panel/crear/detalle, consumiendo useAuth y ubicación del router; Outlet solo con sesión, Navigate/replace solo con signed_out, estados neutrales de inicialización/error/no configuración. Login/registro/landing/verificación/404 siguen públicos. Retorno seguro de pathname por history state validado, sin query/hash ni destinos arbitrarios; login directo conserva sesión/logout sin redirect automático. Definidos historial, pestañas, cambio de cuenta, foco y reversión.
- **Límite de seguridad:** protección React no sustituye RLS. Participantes/roles contextuales/aceptación/firma son conceptos pendientes, no tablas ni privilegios aprobados. Matriz distingue interfaz futura, verificación adicional, denegación y no definido; no revela existencia de contratos ajenos ni declara autorización por id/correo/full_name. P8 no añade consultas, SQL, guards de roles ni logout de header por inferencia.
- **Verificaciones ejecutadas:** build y lint PASS; diagnóstico controlado 22/22 PASS; git diff --check PASS. Advertencia conocida de bundle >500 kB. Sin pruebas del guard futuro, navegador/Vite, credenciales reales, nuevos usuarios, salud remota ni operaciones SQL en este bloque documental.
- **Git:** solo ambos documentos de continuidad modificados y nuevo plan. Código, configuración, servicios, plan P5 y avances aprobados anteriores intactos; .env.local ignorado/no rastreado. Comparación SHA-256: 53 archivos anteriores idénticos; sin bajas y sin otros nuevos. Revisión de patrones sin credenciales reales detectadas, salvo placeholder sintético previo revisado del diagnóstico. Sin dependencias nuevas, staging, commit, push ni actualización remota.
- **Continuidad:** M0 completado; M1 completado/aprobado/publicado; M2-B1 completado/aprobado; P1–P6 aprobados y C1 incluida en P4. Último aprobado P6; ejecutado P7 diseño pendiente de revisión. Registro/login/logout/persistencia aprobados; renovación real pendiente. Rutas protegidas y RLS contractual no implementadas; contratos en base de datos y Stellar/Soroban pendientes. Siguiente P8 — Implementación controlada de rutas protegidas — PREVISTO, NO EJECUTADO.

- **Aprobación posterior recibida en P8:** responsable revisó las doce secciones y aprobó clasificación de rutas, RequireAuth, cinco estados, retorno seguro, separación autenticación/RLS, necesidad futura de RLS contractual y matriz de 35 pruebas. P7 APROBADO por revisión externa del diseño, sin atribuir ejecución de esas pruebas a Codex. Nueve prompts M2 aprobados; plan P7 intacto.

### M2-B2-P8 — Implementación controlada de rutas protegidas

- **Estado:** APROBADO. El responsable confirmó en el prompt P9 catorce comprobaciones manuales satisfactorias de públicas/privadas, tres retornos, login directo, persistencia, logout, segunda pestaña, historial, consola/accesibilidad/responsive y regresión/Git. PASS MANUAL EXTERNO PREVIO; Codex no ejecutó esas pruebas reales.
- **Código:** RequireAuth nuevo con useAuth y router existente; Outlet solo con sesión; espera neutral en initializing, Navigate/replace en signed_out y aviso/enlaces públicos en error/not_configured. App agrupa solo panel/crear/detalle bajo padre sin path. Landing/login/registro/verificación/404 públicos. Sin nuevas consultas ni clientes/listeners Auth.
- **Retorno seguro:** única función pura compartida en RequireAuth valida pathname ASCII permitido, id de un segmento 1–120 caracteres y tipos; sin query/hash/percent-encoding, esquemas, backslash, controles, puntos o rutas fuera de lista. State {from:string}; LoginPage espera sesión observada/fin de operación y consume intención con replace/state null una vez por location.key. Sin intención válida permanece en login, sin fallback al panel; sesión ya activa puede completar intención válida, como autoriza P8. No navega por éxito de servicio aislado ni por logout/error.
- **Conservación y accesibilidad:** login/validaciones/doble envío/C1/logout local intactos. Foco en main existente al navegar, regiones status/alert; Outlet por user.id reinicia estado local si cambia cuenta. Páginas privadas/layout/UI/AuthProvider/cliente/servicios/planes/configuración/dependencias conservados. Excepción ESLint limitada a exportar la función pura compartida en el único archivo nuevo autorizado, sin desactivar verificaciones globales.
- **Seguridad:** guard visual no concede permiso sobre contratos ni sustituye RLS; detalle sigue preliminar. Sin almacenamiento propio, tokens en Context/UI, roles, SQL, tablas, OAuth, invitaciones ni blockchain. Persistencia P6 y logout local sin cambios; renovación real pendiente de observación.
- **Pruebas técnicas:** build/lint PASS, diagnóstico controlado 22/22 PASS, Vite y diff check PASS. Salud Auth HTTP 200 tras reintento autorizado por DNS; Vite requirió reintento por EPERM. Advertencia conocida de bundle >500 kB, sin cambios para ocultarla.
- **Matriz de 35 casos:** evidencia individual y límites en ESTADO_PROYECTO.md: 8 PASS EJECUTADO (públicas/404, teclado/responsive/checks), 26 PASS SIMULADO y 1 PASS POR INSPECCIÓN (contratos/API sin nueva autorización). Cuenta real P8, renovación/caducidad remota, bfcache exhaustivo y RLS NO EJECUTADOS. Sin FAIL pendientes en los subcasos ejercitados; no equipara esa clasificación con aprobación externa.
- **Pruebas controladas:** tres privadas con SDK/fetch simulado: acceso directo, retorno validado, una petición, recarga persistente y logout local. Dos pestañas: salida retira privada, recarga bloqueada y sesión ya activa retorna. Guard/LoginPage reales bajo Context/MemoryRouter/StrictMode: cinco estados, hijo privado nunca renderizado antes de sesión, 16 estados de retorno inválidos, tres válidos, respuesta tardía sin sesión, rechazo/reintento, cambio de cuenta y actualización sin perder borrador propio. Validador aislado real: cinco destinos admitidos y 45 rechazados. Intención conservada tras recarga en Chrome, sin storage adicional.
- **Accesibilidad/regresión:** main único, foco de redirección y Tab/Shift+Tab/Enter en avisos; carga/error/no configuración en cuatro anchos y texto 200 % sin scroll horizontal, capturas móvil/escritorio revisadas. Registro con validación/aceptación/doble envío/limpieza simulado; handlers login/logout idénticos al inicio. Sin excepciones de aplicación en matrices completadas ni red externa imprevista. No se crearon usuarios ni autenticaron cuentas reales; scripts/capturas fuera del repositorio.
- **Auditoría final:** 52 archivos anteriores idénticos por SHA-256; cuatro modificados en P8 y solo RequireAuth nuevo. Sin bajas. .env.local ignorado/no rastreado; sin credenciales reales detectadas por patrones, placeholder sintético previo revisado. main/HEAD 0e23f15039802537ee2708120526d797a8acae59 y staging vacío; sin commit/push. Instancia propia Vite arrancó en 5174 (5173 ocupado) y se detuvo; pruebas sobre servidor disponible 5173 con código actual.
- **Continuidad histórica al terminar la implementación (anterior a la aprobación comunicada en P9):** último aprobado P7; P8 pendiente de validación externa; siguiente P9 — Auditoría integral de autenticación y navegación protegida — PREVISTO, NO EJECUTADO. Avances locales previos conservados; sin staging, commit, push ni actualización remota.

### M2-B2-P9 — Auditoría integral de autenticación y navegación protegida

- **Estado:** AUDITORÍA ELABORADA — PENDIENTE DE APROBACIÓN EXTERNA. No cierra M2-B2 ni revoca aprobaciones anteriores. P8 APROBADO por catorce comprobaciones manuales del responsable; último aprobado P8, último ejecutado P9.
- **Resultado:** [AUDITORIA_AUTH_NAVEGACION_M2_B2.md](AUDITORIA_AUTH_NAVEGACION_M2_B2.md), 27 secciones y trazabilidad P1–P8/C1. F-01 MEDIO reproducido: A cierra sesión y confirma salida; B inicia otra; A reactiva espera de cierre antiguo y muestra error falso tras ocho segundos. Sin bypass del guard o open redirect demostrado.
- **Veredicto técnico:** REQUIERE CORRECCIÓN antes del cierre recomendado. Propuesto P9-C1 — Corrección del ciclo de resultados de logout entre sesiones; no ejecutado. No se etiqueta BLOQUEADO por un hallazgo MEDIO; la auditoría terminada requiere revisión externa.
- **Nuevas verificaciones:** build/lint y diff check correctos; diagnóstico 22/22 controlado; salud HTTP 200 después de reintento autorizado por DNS; validador real 5 válidos/45 rechazos; públicas/404; tres privadas con retorno/recarga/logout sintéticos; guard, proveedor, StrictMode/cleanup, eventos tardíos, registro, cambio de cuenta, errores y retorno controlados; Tab/Shift+Tab/Enter y cuatro anchos/200 %. F-01 FAIL. No autenticaciones reales; renovación remota NO EJECUTADA.
- **Evidencia previa:** quince pruebas externas P6 y matriz histórica P8 de 35 más catorce manuales externas conservadas como históricas, no nuevas ejecuciones P9.
- **Seguridad:** revisión dirigida de 43 archivos públicos rastreados sin secretos reales detectados por patrones; `.env.local` no abierto, ignorado y no rastreado. Guard no sustituye RLS; I-01 renovación, I-02 modelo/RLS futura e I-03 bundle >500 kB informativos.
- **Archivos/Git:** solo auditoría nueva y ambos documentos de continuidad actualizados. Código, planes, dependencias y contratos intactos respecto al inicio. main, HEAD `0e23f15039802537ee2708120526d797a8acae59`, staging vacío; sin commit/push/sincronización.
- **Continuidad:** diez prompts M2 aprobados, C1 incluida en P4. Rutas protegidas aprobadas; registro/login/logout/persistencia aprobados. Renovación automática real pendiente de observación. M2-B3-P1 — Diseño del modelo de datos y seguridad RLS de contratos: PROPUESTO — NO EJECUTADO, sujeto a corrección y aprobación externa del cierre. No se fija total restante de M2.

### M2-B2-P9-C1-R1 — Revisión de la corrección recuperada de F-01

- **Estado:** CORRECCIÓN TÉCNICA VERIFICADA EN SIMULACIÓN DEL COMPONENTE REAL; PENDIENTE DE VALIDACIÓN MANUAL EXTERNA. P9 conserva el registro original de F-01 y está pendiente de aprobación; M2-B2 no está cerrado.
- **Base:** rama `relevo/m2-b2-p9c1-20261017`, commit `c05b9e87e8364fdc212a47f3bfef5db1691565a5`, limpio al iniciar. El commit WIP incluía identificadores de operación, confirmación y timeout en LoginPage; el historial anterior no describía ese delta parcial. No se cambió código.
- **Evidencia nueva:** arnés temporal fuera del repositorio transpila y ejecuta `LoginPage.tsx` real con hooks/servicios/estado Auth/reloj controlados. F-01 central, incluidos nuevo login inmediato/tardío, 8,5 s virtuales y segundo logout, no reapareció. Matriz detallada en la sección 28 de la auditoría: 22 PASS SIMULADO y 2 NO EJECUTADO (StrictMode real y recarga privada persistente). No hubo navegador, SDK remoto ni cuentas reales en esta validación.
- **Verificaciones técnicas:** `npm run build` PASS (advertencia de chunk >500 kB), `npm run lint` PASS, `npm run supabase:check:test` 22/22 PASS y `git diff --check` PASS. La salud HTTP 200 de Supabase corresponde al relevo previo, no se usa como prueba de F-01.
- **Git y continuidad:** únicamente esta entrada, el estado y la sección de seguimiento de auditoría se modifican en R1. Sin staging, commit ni push. Último prompt aprobado P8; validar manualmente F-01 con dos pestañas reales y revisar P9 antes de decidir cierre. Renovación automática real pendiente; M2-B3 no iniciado.

### M2-B2-CIERRE-P1 — Cierre documental y publicación segura

- **Secuencia:** P9 detectó F-01 MEDIO; el integrante anterior inició P9-C1, quedó interrumpido por falta de tokens y publicó el estado en `relevo/m2-b2-p9c1-20261017` (`c05b9e87e8364fdc212a47f3bfef5db1691565a5`). El nuevo integrante recuperó esa rama y ejecutó R1 sin modificar código: 22 simulaciones satisfactorias de la lógica real de LoginPage, con dos escenarios no ejecutados en ese entorno.
- **Validación externa posterior:** el responsable confirmó diez comprobaciones manuales satisfactorias con dos pestañas reales y Supabase Auth: logout A, login B, espera de doce segundos, repetición rápida, coherencia, segundo logout, recarga privada, protección sin sesión, consola y Git. No hubo defectos bloqueantes; Codex no realizó esas pruebas. F-01 RESUELTO Y VALIDADO; M2-B2-P9-C1 APROBADO; M2-B2-P9 APROBADO; M2-B2 COMPLETADO Y APROBADO TÉCNICAMENTE.
- **Alcance:** cierre de autenticación y navegación protegida; la renovación remota real sigue pendiente de observación. El guard React no sustituye RLS. Contratos PostgreSQL/RLS, Stellar y Soroban pendientes. M2-B3-P1 sigue propuesto y no ejecutado.
- **Estado de este prompt antes del resultado Git:** CIERRE DOCUMENTAL PREPARADO; PUBLICACIÓN PENDIENTE. Solo auditoría, estado e historial autorizados; sin cambio de código ni dependencias. Hash y resultado remoto se comprueban en el informe final, sin crear otro commit para registrar su propio hash.

- **Resultado Git posterior verificado:** commit documental `dae6bbe7516afb5c01660fb143e32e12ee96cd5c` publicado en `relevo/m2-b2-p9c1-20261017`; `git ls-remote` coincidió y el árbol quedó limpio. La línea anterior conserva el estado previo a la publicación.

### M2-B3-P1 — Diseño del modelo de datos y seguridad RLS de contratos

- **Estado:** DISEÑO ELABORADO — PENDIENTE DE REVISIÓN EXTERNA. M2-B3, Persistencia y seguridad de contratos, INICIADO EN FASE DE DISEÑO; P1 no aprueba ni ejecuta P2.
- **Base y alcance:** rama de relevo limpia en `dae6bbe7516afb5c01660fb143e32e12ee96cd5c`. Lectura de páginas de panel, creación/revisión, detalle y verificación: solo borrador local, placeholders y validación de formato; ningún contrato persistido o permiso por fila. Código y configuración conservados.
- **Entrega:** [PLAN_MODELO_DATOS_RLS_CONTRATOS.md](PLAN_MODELO_DATOS_RLS_CONTRATOS.md), 28 secciones. Propone contratos privados del creador y relación de participantes confirmados, con invitaciones/versiones/documentos/evidencias posteriores y sujetos a aprobación. Incluye esquema y diagrama, siete actores, dieciséis operaciones, RLS conceptual por tabla, 24 amenazas, 41 pruebas DISEÑADAS — NO EJECUTADAS, fases, reversión y decisiones abiertas.
- **Límites:** `auth.uid()`/RLS y grants se aplicarán solo tras autorización; no hay tablas, SQL ejecutado, migraciones, Storage contractual, permisos sobre acuerdos, servicios frontend ni cambios remotos. Correo/nombre de formulario no prueban identidad; renovación remota real pendiente.
- **Verificaciones:** `npm run build` PASS (advertencia conocida de bundle de 544,90 kB); `npm run lint` PASS; `npm run supabase:check:test` PASS (22/22 simulaciones locales); `git diff --check` PASS. Estructura del plan comprobada: 28 secciones, 24 amenazas y 41 pruebas futuras. Estas 41 pruebas NO SE EJECUTARON.
- **Git y continuidad:** solo plan nuevo y ambos documentos de continuidad modificados localmente; sin staging, commit ni push. Último bloque aprobado M2-B2. Siguiente M2-B3-P2 PROPUESTO — NO EJECUTADO; puede dividirse después de revisar P1 y sus decisiones imprescindibles.

**Aprobación externa posterior recibida en M2-B3-P2:** el responsable aprobó P1 para una primera implementación de borradores privados, con acceso exclusivo del creador y RLS desde el inicio. Participantes, invitaciones, aceptación, firma y conexión React se aplazan. La nota histórica anterior conserva el estado al terminar P1 y no representa el estado actual.

### M2-B3-P2 — Migración local PostgreSQL y RLS para borradores privados

- **Estado:** MIGRACIÓN PREPARADA LOCALMENTE — PENDIENTE DE REVISIÓN EXTERNA. Último prompt aprobado: M2-B3-P1. M2-B3 y Módulo 2 siguen abiertos.
- **Archivos:** nueva migración [`20261018032013_create_private_contract_drafts.sql`](../supabase/migrations/20261018032013_create_private_contract_drafts.sql) y [VALIDACION_ESQUEMA_RLS_M2_B3_P2.md](VALIDACION_ESQUEMA_RLS_M2_B3_P2.md); estado e historial actualizados. Plan P1 y `src/` intactos.
- **Resultado:** `public.contracts` local para `draft` privado; UUID, FK a Auth, contenido obligatorio, índice por creador/fecha, RLS SELECT/INSERT/UPDATE propios, grants limitados a tres columnas editables y DELETE denegado. No se implementaron participantes, invitaciones, aceptación, firma ni frontend.
- **Validación:** 30 escenarios SQL/RLS DISEÑADOS — NO EJECUTADOS; SQL y seguridad revisados por inspección. Sin herramienta PostgreSQL o base aislada demostrada: VALIDACIÓN SQL REAL — NO EJECUTADA; PRUEBAS REALES DE RLS — NO EJECUTADAS. Ningún acceso administrativo ni cambio Supabase remoto.
- **Comandos ejecutados:** `npm run build` PASS (advertencia de bundle JS 544,90 kB), `npm run lint` PASS, `npm run supabase:check:test` PASS (22/22 simulaciones), `git diff --check` PASS. Estos resultados no validan sintaxis SQL ni RLS ejecutada.
- **Riesgos y continuidad:** revisar `ON DELETE RESTRICT`, máximos de texto, roles/grants efectivos, colisiones remotas y ejecución transaccional antes de P3. M2-B3-P3 PREVISTO — NO EJECUTADO. Cambios P1/P2 solo locales, sin staging, commit ni push.

**Aprobación externa posterior recibida en M2-B3-P3-A:** el responsable aprobó P2 solo como migración local revisada estáticamente. No se afirmó aplicación ni validación real en PostgreSQL. La nota histórica anterior conserva el estado de P2 al terminar su turno.

### M2-B3-P3-A — Preflight de despliegue e inventario remoto preparado

- **Estado:** PREFLIGHT PREPARADO — PENDIENTE DE REVISIÓN EXTERNA; despliegue bloqueado por precondiciones no observadas. P3-B NO AUTORIZADO — NO EJECUTADO; M2-B3 y Módulo 2 incompletos.
- **Archivo:** [PREFLIGHT_DESPLIEGUE_RLS_M2_B3_P3.md](PREFLIGHT_DESPLIEGUE_RLS_M2_B3_P3.md), con 27 secciones, inventario remoto solo preparado, matriz de decisiones, 30 pruebas A/B/anónimo PREPARADOS — NO EJECUTADOS, método versionado, limpieza y recuperación. P1/P2 y SQL intactos.
- **Integridad y entorno:** migración de 2.165 bytes, SHA-256 `5e633ec225f325d070d72bc44586292c0584155754535943b2e769f8d38121ac`. Sin CLI/psql/PostgreSQL/Docker local; `.env.local` ignorado y no leído. Proyecto/ref y objetos remotos NO CONFIRMADOS; consultas de catálogo NO CONSULTADAS — PENDIENTES DE AUTORIZACIÓN.
- **Límites:** sin SQL remoto, usuarios, datos de prueba ni cambio Supabase. RLS real y privilegios efectivos no verificados; `ON DELETE RESTRICT`, límites de texto, backup, publicación versionada, limpieza y coordinación requieren decisiones antes de P3-B.
- **Verificaciones:** `npm run build` PASS (advertencia de bundle JS 544,90 kB), `npm run lint` PASS, `npm run supabase:check:test` PASS (22/22 simulaciones), `git diff --check` PASS. Hash SHA-256 revalidado; 27 secciones y 30 casos preparados. Diagnóstico Auth real opcional, SQL remoto y pruebas RLS NO EJECUTADOS.
- **Git:** rama de relevo/HEAD previo; cambios de P1/P2 preservados y solo preflight más continuidad añadidos en P3-A. Sin staging, commit, push ni merge.

**Aprobación externa posterior recibida en M2-B3-RESPALDO-P1:** el responsable aprobó P3-A solo como preflight documental. El estado histórico anterior permanece arriba; las consultas remotas siguen sin ejecutarse y P3-B no está autorizado.

### M2-B3-RESPALDO-P1 — Preparación de publicación segura

- **Alcance:** exactamente seis archivos de P1/P2/P3-A y continuidad; SQL P2 intacto con SHA-256 `5e633ec225f325d070d72bc44586292c0584155754535943b2e769f8d38121ac` y 2.165 bytes. Sin cambio de código, dependencias o Supabase.
- **Git antes de preparar:** rama `relevo/m2-b2-p9c1-20261017`, HEAD `dae6bbe7516afb5c01660fb143e32e12ee96cd5c`, remoto oficial en ese mismo hash, staging vacío. El resultado del único commit y push autorizados se comprueba y comunica después; no se inventa aquí el hash futuro.
- **Continuidad:** la publicación del archivo SQL no instala tablas ni RLS. Siguiente M2-B3-P3-INSPECCIÓN requiere autorización de solo lectura; M2-B3-P3-B continúa NO AUTORIZADO — NO EJECUTADO.

**Resultado posterior registrado al iniciar M2-B3-P3-INSPECCIÓN:** el respaldo figura PUBLICADO Y APROBADO; HEAD local `9770ac1e4a04c563288e5343972858ba12cc4b89`, `chore(db): respaldar diseno y preflight RLS M2-B3`. La publicación no ejecutó el SQL de contratos.

### M2-B3-P3-INSPECCIÓN — Registro histórico previo a IDENTIDAD/R1

- **Estado:** BLOQUEADO POR AUTORIZACIÓN Y PROYECTO NO CONFIRMADO. [Informe de inspección](INSPECCION_REMOTA_SUPABASE_M2_B3_P3.md) con consultas de catálogo preparadas y clasificadas NO EJECUTADAS.
- **Evidencia local:** rama `relevo/m2-b2-p9c1-20261017`, HEAD `9770ac1e4a04c563288e5343972858ba12cc4b89`; inicio sin cambios ni staging. Migración P2 íntegra: 2.165 bytes, SHA-256 `5e633ec225f325d070d72bc44586292c0584155754535943b2e769f8d38121ac`.
- **Límites:** sin lectura de `.env.local`, conexión administrativa, SQL remoto, migración, datos de prueba ni cambios de permisos. Tabla, índices, políticas, grants e historial remotos NO CONSULTADOS; RLS real NO VALIDADA.
- **Verificaciones:** `npm run build` PASS con advertencia conocida de bundle de 544,90 kB; `npm run lint` PASS; `npm run supabase:check:test` PASS, 22/22 simulaciones; `git diff --check` PASS. No se ejecutó diagnóstico Auth real ni prueba PostgreSQL/RLS.
- **Continuidad:** confirmar proyecto exacto sin secretos, obtener autorización separada para SELECT de catálogo y registrar resultados no sensibles. M2-B3-P3-B NO AUTORIZADO — NO EJECUTADO; Módulo 2 incompleto.

### M2-B3-P3-IDENTIDAD — Confirmación del proyecto compartido

- Nombre `acuerdoseguro-dev`; referencia `gaydlycsinbrlanzmsyj`; Project URL `https://gaydlycsinbrlanzmsyj.supabase.co`; Dashboard `https://supabase.com/dashboard/project/gaydlycsinbrlanzmsyj`.
- Node 24 comparó exclusivamente VITE_SUPABASE_URL en memoria con salida COINCIDE; sin imprimir configuración ni acceder a la clave. Git permaneció limpio en rama de relevo/HEAD bf16db7. El responsable confirmó después visualmente nombre, referencia y URL en el prompt R1. No hubo SQL ni cambios de archivo en IDENTIDAD.

### M2-B3-P3-INSPECCIÓN-R1 — Inventario autorizado de metadatos PostgreSQL (2026-10-18)

- **Identidad del proyecto: CONFIRMADA POR EL RESPONSABLE Y COINCIDENTE CON LA CONFIGURACIÓN LOCAL. Inspección de metadatos: AUTORIZADA EXTERNAMENTE.** La autorización concede exclusivamente catálogo de solo lectura en acuerdoseguro-dev; no se vuelve a pedir autorización genérica.
- **Estado: PARCIAL.** Ninguna consulta remota ejecutada ni resultado recibido. Sin herramienta Supabase/SQL Editor conectada o conexión SQL disponible; supabase/psql/postgres ausentes de PATH. Docker está disponible, pero no da acceso a la base compartida. No se instalaron herramientas, buscaron secretos ni extrajeron sesiones del navegador.
- **Entrega:** solo [INSPECCION_REMOTA_SUPABASE_M2_B3_P3.md](INSPECCION_REMOTA_SUPABASE_M2_B3_P3.md), estado e historial actualizados. Sección 23 prepara fase A (contexto y existencia) para ejecución manual, con READ ONLY si el editor lo admite. Fases A–E NO EJECUTADAS. Detener al encontrar public.contracts, índice conflictivo, error de permisos o ambigüedad. No consultar datos de negocio ni contenido SQL del historial.
- **Continuidad:** responsable ejecuta primero solo fase A y comparte ambos resultados no sensibles; después se decide el siguiente paso dentro del catálogo autorizado. Tabla, políticas, grants e historial remotos NO CONSULTADOS; pruebas RLS reales/A/B/anónimo NO EJECUTADAS. P3-B NO AUTORIZADO. Módulo 2 incompleto.
- **Integridad/Git:** inicio limpio en relevo/m2-b2-p9c1-20261017, HEAD bf16db7213c879c75411b0964edfc2c743919c26. Migración inalterada, SHA-256 5e633ec225f325d070d72bc44586292c0584155754535943b2e769f8d38121ac; sin cambios de src, lockfile, configuración privada ni dependencias. Sin staging, commit, push ni SQL de escritura.
- **Pruebas de R1:** build PASS (108 módulos; JS 544,90 kB, advertencia conocida >500 kB), lint PASS, diagnóstico controlado 22/22 PASS y diff check PASS. No equivalen a resultados de catálogo o validación RLS remota.

### M2-B3-P3-INSPECCIÓN-R2 — Resultados externos de fase A y preparación de fase B (2026-10-18)

- **Fuente:** responsable aporta resultados procedentes de capturas de SQL Editor del proyecto confirmado acuerdoseguro-dev (gaydlycsinbrlanzmsyj). Codex registra evidencia externa, no ejecuta consultas ni inspecciona directamente las capturas. Fecha/hora exacta de ejecución no aportada.
- **Fase A, EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE:** database_name postgres; execution_role postgres; schema_name public; postgres_version 17.11. Contracts_relation NULL, expected_index NULL y migration_history NULL.
- **Interpretación:** tabla contractual e índice esperado no encontrados; HISTORIAL NO ENCONTRADO EN EL ESQUEMA ESPERADO. No se acredita ausencia de todas las migraciones, RLS contractual instalada ni privilegios de anon/authenticated. El rol administrativo postgres no prueba restricciones de usuarios ordinarios.
- **Entrega:** tres documentos autorizados actualizados, preservando R1. Dos consultas SELECT de fase B preparadas sobre pg_class/pg_namespace para objetos y esquemas exactos; NO EJECUTADAS. Responsable debe ejecutarlas manualmente y enviar ambos resultados no sensibles. Inventario global PARCIAL; no se declara PostgreSQL listo para despliegue.
- **Git/verificación:** rama y HEAD esperados conservados; solo cambios documentales previos R1, sin trabajo inesperado/staging. SQL con SHA-256 aprobado intacto; diff check correcto. Sin cambios de código, dependencias, entorno privado, SQL ni main; sin commit/push. Build/lint/22 pruebas siguen siendo evidencia R1, no nuevas ejecuciones R2.
- **Continuidad:** fase B pendiente; detener ante conflicto/error de permisos. FK ON DELETE RESTRICT, límites de texto, recuperación, privilegios, historial y pruebas A/B/anónimo pendientes. Migración no aplicada por este prompt y P3-B NO AUTORIZADO; Módulo 2 incompleto.

### M2-B3-P3-INSPECCIÓN-R3 — Fase B externa y preparación de C1/C2 (2026-10-18)

- **Fuente:** ejecución manual del responsable en SQL Editor del proyecto confirmado acuerdoseguro-dev (gaydlycsinbrlanzmsyj), no conexión SQL de Codex. Fecha/hora exacta y rol de ejecución de B no aportados; no se presumen a partir de A.
- **Fase B COMPLETADA MEDIANTE EVIDENCIA EXTERNA:** B1 sobre relaciones filtradas: Success. No rows returned; B2 sobre esquemas relevantes: únicamente schema_name = public. No apareció supabase_migrations. Sin objetos contractuales esperados ni conflicto de nombres entre los objetos consultados. No se deduce ausencia de toda migración anterior, RLS validada o autorización de despliegue.
- **Entrega:** inventario, estado e historial actualizados; C1 resuelve referencias Auth/UUID y C2 lee atributos de anon/authenticated. Son SELECT de catálogo, sin filas de Auth ni ejecución de funciones referenciadas. C1/C2 NO EJECUTADAS, pendientes de resultados del responsable. No confundir fase C actual con la propuesta histórica R1 de políticas.
- **Git/verificaciones:** rama y HEAD bf16db7213c879c75411b0964edfc2c743919c26 conservados; solo cambios previos R1/R2 en tres documentos esperados, staging vacío. SHA-256 SQL 5e633ec225f325d070d72bc44586292c0584155754535943b2e769f8d38121ac intacto; diff check correcto. Sin cambios de código, dependencias, main o SQL, sin commit/push. No se repiten build/lint históricos en esta tarea documental.
- **Continuidad:** ejecutar manualmente solo C1/C2 y compartir resultados no sensibles; detener después. Si falta dependencia/rol, registrar bloqueo y solicitar revisión, sin crearlo. Límites de texto, baja de cuentas/FK, recuperación, permisos y pruebas A/B/anónimo siguen pendientes. P3-B NO AUTORIZADO; M2-B3 y Módulo 2 incompletos.

### M2-B3-P3-INSPECCIÓN-R4 — Fase C externa y preparación de D1–D4 (2026-10-18)

- **Fuente:** responsable aporta resultados de sus ejecuciones C1/C2 en SQL Editor de acuerdoseguro-dev (gaydlycsinbrlanzmsyj). Codex no realizó conexión SQL ni examinó directamente capturas. Fecha/hora y rol de ejecución no aportados.
- **Fase C COMPLETADA MEDIANTE EVIDENCIA EXTERNA:** referencias auth.users, auth.uid(), gen_random_uuid() resueltas. Anon y authenticated existen: rolcanlogin false y rolbypassrls false para ambos. NOLOGIN no es problema por sí mismo para API; sin BYPASSRLS no equivale a RLS funcional ni grants comprobados. Retornos y tipo/PK aún pendientes.
- **Entrega:** solo inventario, estado e historial actualizados; sección 26 prepara D1–D4 de metadatos, NO EJECUTADAS: id/PK Auth, retornos, defaults declarados y USAGE/CREATE de public. No se lee Auth ni se ejecutan funciones inspeccionadas. Cero defaults no demuestra seguridad; grants de esquema no sustituyen permisos de tabla/columna.
- **Git/verificaciones:** rama/HEAD esperados y avances R1–R3 conservados; SQL con SHA-256 aprobado intacto y diff check correcto; solo tres documentos modificados, sin código/dependencias/main/staging/commit/push. Build/lint anteriores no se presentan como nuevas pruebas R4.
- **Continuidad:** responsable ejecuta únicamente D1–D4, envía cuatro resultados no sensibles y se detiene. Registrar incompatibilidad o necesidad de permisos como bloqueo para revisión, sin arreglar en remoto. Public.contracts NO ENCONTRADA EN LAS CONSULTAS PREVIAS; RLS contractual NO VALIDADA; migración P2 NO APLICADA POR ESTE PROCESO; P3-B NO AUTORIZADO; Módulo 2 INCOMPLETO.

### M2-B3-P3-INSPECCIÓN-R5 — Cierre documental de D y auditoría estática (2026-10-18)

- **Evidencia externa:** responsable ejecutó manualmente D1–D4; comunicó id Auth uuid/NOT NULL/pertenece PK y retornos uuid. D3/D4 descritas como capturas: defaults SELECT/INSERT/UPDATE/DELETE true para anon/authenticated con tablas futuras de postgres/supabase_admin en public; USAGE public true/CREATE false para ambos roles. Codex no ejecutó SQL ni examinó directamente capturas. No se presume rol/fecha exacta de ejecución ni ACL no aportada.
- **Auditoría estática:** diez controles de sección 27 del inventario PASS POR INSPECCIÓN: transacción única, RLS antes de COMMIT, REVOKE ALL a PUBLIC/anon/authenticated, ninguna reconcesión anon, SELECT y tres columnas de contenido para INSERT/UPDATE authenticated, políticas de dueño/draft, sin DELETE, columnas inmutables excluidas, sin reconcesión amplia posterior y tipos/esquemas compatibles con metadatos externos.
- **Resultado:** inspección A–D COMPLETADA dentro de su alcance; revisión estática SATISFACTORIA, PENDIENTE DE APROBACIÓN EXTERNA. Sin defecto importante demostrado del archivo que exija corrección; no se certifica seguridad efectiva ni readiness de despliegue. SQL y defaults/globales no modificados.
- **Riesgos:** defaults amplios mitigados para concesiones directas por REVOKE/GRANT local; verificar permisos efectivos, columnas/indirectos y A/B/anon tras despliegue futuro autorizado. Resolver FK/retención, límites de texto, recuperación/reversión, ejecutor transaccional/versionado, historial ausente y pruebas/limpieza. Ausencia de supabase_migrations no demuestra inexistencia de toda migración anterior.
- **Local/Git:** HEAD bf16db7213c879c75411b0964edfc2c743919c26 y rama conservados; solo tres documentos, avances R1–R4 preservados, SHA-256 SQL aprobado intacto y diff check correcto. Sin código/dependencias/SQL/main/staging/commit/push ni SQL remoto. Build/lint históricos no se repiten para R5 documental.
- **Continuidad:** revisión y aprobación externa del cierre, sin nueva consulta ahora. RLS contractual NO VALIDADA; public.contracts NO ENCONTRADA EN CONSULTAS PREVIAS; P2 NO APLICADA POR ESTE PROCESO; P3-B NO AUTORIZADO; Módulo 2 INCOMPLETO.

### M2-B3-RESPALDO-P2 — Publicación documental aprobada

- Responsable aprobó documentalmente inspección A–D y revisión estática antes del respaldo, ratificado en PRE-DESPLIEGUE-P1. Pendientes de aprobación consignados en entregas anteriores se conservan como historia, no estado operativo vigente.
- Publicación verificada en relevo/m2-b2-p9c1-20261017: único commit `1479c089d365447c3a2bf2ae3c155f7d66c1cb6a`, `docs(m2-b3): respaldar inspeccion remota y auditoria RLS`, solo inventario/estado/historial. GitHub y HEAD coincidentes, árbol limpio, SQL/hash y main intactos; sin Supabase. No se repiten verificaciones remotas en el plan actual.

### M2-B3-P3-PRE-DESPLIEGUE-P1 — Plan de seguridad, decisiones y recuperación (2026-10-18)

- **Estado:** PLAN DOCUMENTAL ELABORADO — PENDIENTE DE REVISIÓN EXTERNA. **NO-GO.** Nuevo [PLAN_PRE_DESPLIEGUE_M2_B3_P3.md](PLAN_PRE_DESPLIEGUE_M2_B3_P3.md), doce secciones, cinco decisiones, recuperación, 22 casos futuros y trece condiciones de GO/NO-GO. Fuentes exclusivas: archivos/evidencia aprobada del proyecto, sin nuevas operaciones remotas.
- **Propuestas pendientes de aprobación:** mantener RESTRICT con procedimiento de baja y estudio de conservación/anonimización; máximos candidatos description 4.000/terms 20.000 caracteres con alternativas; preferir vía versionada tras autorización/habilitación/conciliación; recuperación verificable con RPO/RTO y ensayo aislado; pruebas reales A/B/Ø con API y catálogos y limpieza aprobadas.
- **Límites:** no se aplican decisiones ni cambian SQL/frontend. Backups/PITR/tiempos de restauración del plan Supabase desconocidos; Git no es copia DB. Separar transacción fallida previa a COMMIT de fallo posterior; preservar datos nuevos, evitar DROP/CASCADE y restauración global automática. Editor no se supone registro automático de versión. Autorizar herramientas, ensayos y cambios en otro alcance si hacen falta.
- **Trazabilidad:** A–D/revisión estática ya aprobadas y RESPALDO-P2 publicado. Cabeceras históricas pendientes de P1/P2/P3-A/inventario no invalidan aprobación posterior ni prueban RLS ejecutada. Inventario y documentos de diseño anteriores permanecen intactos; solo se actualiza continuidad vigente.
- **Git/verificaciones:** inicio limpio en rama de relevo, HEAD 1479c089d365447c3a2bf2ae3c155f7d66c1cb6a, SQL SHA-256 aprobado intacto. Solo nuevo plan y ambos documentos de continuidad; diff check correcto. Sin src/dependencias/SQL/entorno privado, operaciones remotas, instalaciones, usuarios/fixtures, respaldos, staging/commit/push ni cambios de main.
- **Continuidad:** responsable revisa y decide A–E; cambios de límites/FK o método requieren prompt posterior explícito. P3-B NO AUTORIZADO; migración no aplicada por este proceso, RLS funcional no validada, matriz NO EJECUTADA, Módulo 2 incompleto. No se propone ejecución inmediata.

### M2-B3-P3-PRE-DESPLIEGUE-P2 — Decisiones A/B y plan de implementación (2026-10-18)

- **Fuente de aprobación:** instrucción expresa del responsable en este prompt; aprueba A/B como diseño de primera versión, sin aprobar implementación ni despliegue. Registro documental completado, especificación pendiente de revisión externa; **NO-GO**. Se preservan P1 y el historial de propuestas pendientes como antecedentes.
- **DECISIÓN A: APROBADA. PROCEDIMIENTO DE BAJAS: PENDIENTE.** Mantener `created_by REFERENCES auth.users(id) ON DELETE RESTRICT` del SQL local. PostgreSQL podría rechazar eliminación de cuentas vinculadas. No se autoriza cambiar FK ni eliminar usuarios. Pendientes solicitud de baja, conservación, datos personales, eventual anonimización, mensajes/errores y revisión legal sin requisitos inventados.
- **DECISIÓN B: LÍMITES APROBADOS, IMPLEMENTACIÓN PENDIENTE.** title 120, description 4.000, terms 20.000 caracteres; obligatorios no vacíos. SQL original solo limita título. Especificación futura: restricciones DB como defensa definitiva, validación React por puntos de código alineada con char_length y distinta de grafemas, semántica explícita de blancos, mensajes seguros/no truncado, bordes y Unicode en INSERT/UPDATE, ausencia de efectos parciales y regresión de campos/permisos.
- **Versionado:** dos vías a evaluar para SQL no aplicado: revisión explícita trazable del candidato o migración incremental conservando original. Recomendación documental de segunda vía condicionada a C; no se crea/modifica SQL ni se elige mecanismo. Implementación requiere autorización separada, revisión y hash nuevo del SQL correspondiente; original conserva hash aprobado.
- **C/D/E:** C PENDIENTE, sin elegir Editor/CLI ni deducir daño por historial ausente; D PENDIENTE Y BLOQUEANTE, capacidades reales de copia/retención/recuperación/PITR sin confirmar; E PLAN PREPARADO, 22 NO EJECUTADOS. Aprobar plan no autoriza crear usuarios, contratos ni escrituras de prueba.
- **Git/verificaciones:** inicio con exactamente tres documentos esperados de P1, sin staging; rama autorizada y HEAD 1479c089d365447c3a2bf2ae3c155f7d66c1cb6a conservados. SHA-256 SQL 5e633ec225f325d070d72bc44586292c0584155754535943b2e769f8d38121ac intacto y diff check correcto. Solo plan/estado/historial, sin frontend, dependencias, SQL/main, secretos, operaciones remotas, staging, commit ni push. Build/lint no se ejecutan por tarea exclusivamente documental.
- **Continuidad:** esperar revisión externa; preparar procedimiento A y resolver C/D. No iniciar P3-B ni implementar B por inferencia. RLS funcional NO VALIDADA, migración NO APLICADA POR ESTE PROCESO, Módulo 2 INCOMPLETO.

### M2-B3-P4 — Implementación local del MVP contractual (2026-10-18)

- **Alcance:** responsable autoriza frontend/servicio, pruebas locales y modificación del candidato SQL existente aún no aplicado según evidencia disponible; no operaciones remotas, staging/commit/push. Avances PRE-DESPLIEGUE-P1/P2 preservados; no se equipara implementación con aprobación.
- **Implementación:** crear/listar/consultar UUID/editar usando cliente compartido; INSERT/UPDATE solo title/description/terms y retorno confirmado, validación/contadores 120/4.000/20.000 por puntos de código, LF sin truncado, blanco U+0020 conforme a SQL. Se retiran campos de participantes del flujo activo explicando alcance. Panel con carga/vacío/error/actualización; detalle neutral no disponible y edición con confirmación. Antidoble envío y descarte de respuestas tardías; guard y Auth existentes conservados. Sin DELETE ni participantes/firmas/Storage/Stellar/Soroban.
- **SQL:** únicamente dos CHECK de máximo nuevos; protecciones originales conservadas. Hash original 5e633ec225f325d070d72bc44586292c0584155754535943b2e769f8d38121ac sustituido en candidato local por **947cd0b5026bfc0f69a335e986e15e40082f077f0f12ba13bf3340ce7098445c**, pendiente de revisión nueva. Original recuperable en HEAD; no migración adicional ni ejecución PostgreSQL.
- **Pruebas finales:** `npm run build` PASS (advertencia conocida >500 kB); `npm run lint` PASS; `npm run supabase:check:test` 22/22 PASS con dobles. `node scripts/check-contracts.test.mjs` 22/22 PASS: 7 validaciones locales, 14 servicio simulado y 1 inspección SQL. `node scripts/check-contracts-browser.mjs` 18/18 PASS SIMULADO (Chrome/Vite, incluye móvil 390 px, doble envío, logout tardío y edición sin filas). Diff check PASS. Fallos iniciales corregidos: prefer-const y patrón de prueba SQL; `node --test` falló en entorno, se ejecutó node:test directamente. Sin dependencias nuevas; SQL remoto, RLS real y persistencia real NO EJECUTADOS.
- **Git/continuidad:** misma rama/HEAD 1479c089d365447c3a2bf2ae3c155f7d66c1cb6a, main/cliente/Auth/configuración/dependencias intactos; sin secretos ni acceso remoto, staging/commit/push. Revisar código y hash; resolver mecanismo/historial C, recuperación D y bajas A; autorizar aplicación y pruebas reales A/B/anónimo por separado. No está listo para demostración de persistencia real: migración NO APLICADA POR ESTE PROCESO, RLS funcional NO VALIDADA, P3-B NO AUTORIZADO, NO-GO y Módulo 2 INCOMPLETO.

### M2-B3-P5 — Release candidate y respaldo GitHub (2026-10-18)

- **Auditoría satisfactoria por inspección:** SQL completo compatible por revisión con PostgreSQL 17, sin parser/servidor local disponible ni infraestructura instalada. Hash P4 947cd0b5026bfc0f69a335e986e15e40082f077f0f12ba13bf3340ce7098445c intacto; conserva todas las protecciones y solo dos CHECK añadidos frente a versión original. Frontend/servicio/guard revisados; sin fallo bloqueante demostrado ni correcciones de código/SQL en P5.
- **Pruebas repetidas:** build/lint PASS, diagnóstico 22/22 con dobles, contratos 22/22 (7 validaciones locales, 14 simuladas, 1 inspección SQL), navegador 18/18 SIMULADO con móvil 390 px, sesión cerrada/cambio de cuenta, vacíos/no disponibles, red, edición cero filas y respuestas tardías; diff check PASS. Advertencia Vite conocida >500 kB. Sin prueba de persistencia/RLS real.
- **Preparación remota:** procedimiento breve condicionado en registro P5 de ESTADO_PROYECTO.md: identidad y ausencia actual de colisiones, revisión archivo/hash, aplicación completa transaccional únicamente tras autorización, catálogo/permisos y clientes A/B/anónimo, crear/listar/detalle/editar reales; detener ante discrepancia. SQL Editor no garantiza historial supabase_migrations; no crear/reparar historial. Responsable confirma MVP sin contratos de producción y solo cuentas de prueba, sin Pro: posible pérdida de datos de prueba documentada; GitHub no respalda PostgreSQL, PITR no confirmado. Riesgo y recuperación acotada deben aceptarse en autorización separada; no imponer infraestructura de producción.
- **Respaldo autorizado:** un commit `feat(m2-b3): implementar MVP de borradores Supabase` incorporará este registro y exactamente 13 archivos auditados en rama relevo/m2-b2-p9c1-20261017. Hash/resultados de publicación se verifican tras crear/publicar y se entregan en informe final; el commit no puede contener su propio hash. Remoto previo igual a 1479c089d365447c3a2bf2ae3c155f7d66c1cb6a; main conservada en 0e23f15039802537ee2708120526d797a8acae59. Staging selectivo, sin entornos/secretos ni archivos ajenos. Publicación sujeta a última reverificación remota.
- **Estado final técnico:** release candidate local revisable, preparado para revisión externa del SQL y autorización específica de activación/pruebas, sin dar despliegue por aprobado. Migración NO EJECUTADA; RLS real NO VALIDADA; participantes, firmas, Storage y blockchain fuera de alcance; Módulo 2 INCOMPLETO. El plan P1/P2 se conserva con aviso histórico y referencia a condiciones P5.

## 4. Mantenimiento acumulativo y relevos

1. Agrega una entrada por nuevo prompt en orden cronológico; conserva los registros anteriores y evita identificadores duplicados en la tabla.
2. Actualiza el estado del registro al recibir aprobación o solicitud de corrección; no equipares implementación con aprobación externa.
3. Identifica tareas parciales o bloqueadas y detalla lo pendiente; documenta brevemente las correcciones relevantes sin borrar la evidencia previa.
4. Conserva referencias reales a commits cuando existan; no inventes fechas, pruebas, ejecutores, aprobaciones ni publicaciones.
5. Mantén coherentes módulo activo, último aprobado, estado actual y siguiente previsto con `ESTADO_PROYECTO.md`.
6. Al relevar, deja pruebas y resultados, trabajo incompleto, errores, cambios sin publicar, último commit publicado si existe y próximo prompt autorizado; usa la sección de relevo del estado para el resumen operativo.
7. Si se interrumpe una tarea por falta de disponibilidad, registra PARCIAL o BLOQUEADO según la causa real; no la marques automáticamente como completada.
8. No copies conversaciones ni prompts completos; conserva evidencias verificables y omite información privada.

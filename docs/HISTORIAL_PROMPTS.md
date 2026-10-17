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
- **Bloque actual:** M2-B2 — Autenticación real de usuarios con Supabase.
- **Último prompt de implementación aprobado:** M2-B2-P2.
- **Última actividad administrativa de cierre:** CIERRE-DOC-M1, posterior a la aprobación. **Actividad operativa de relevo:** PUBLICACIÓN-RELEVO-M1. Ninguna cuenta como prompt de implementación.
- **Incorporación operativa posterior:** INCORPORACIÓN-RELEVO-M1; comprobaciones técnicas satisfactorias y contradicción documental pendiente que se corrige durante M2-B1-P1.
- **M2-B1:** COMPLETADO Y APROBADO; 2/2 prompts aprobados.
- **Actividad actual:** PUBLICACIÓN-RELEVO-M2-02 — operación de publicación y relevo. M2 acumula 4 prompts aprobados; M2-B2-P2 fue aprobado tras diez comprobaciones manuales confirmadas por el responsable.
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

**Siguiente prompt:** M2-B2-P3 — Inicio de sesión real con Supabase Auth. **Estado: NO INICIADO.** Incorporar al siguiente integrante sin desarrollar login durante el relevo.

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

## 4. Mantenimiento acumulativo y relevos

1. Agrega una entrada por nuevo prompt en orden cronológico; conserva los registros anteriores y evita identificadores duplicados en la tabla.
2. Actualiza el estado del registro al recibir aprobación o solicitud de corrección; no equipares implementación con aprobación externa.
3. Identifica tareas parciales o bloqueadas y detalla lo pendiente; documenta brevemente las correcciones relevantes sin borrar la evidencia previa.
4. Conserva referencias reales a commits cuando existan; no inventes fechas, pruebas, ejecutores, aprobaciones ni publicaciones.
5. Mantén coherentes módulo activo, último aprobado, estado actual y siguiente previsto con `ESTADO_PROYECTO.md`.
6. Al relevar, deja pruebas y resultados, trabajo incompleto, errores, cambios sin publicar, último commit publicado si existe y próximo prompt autorizado; usa la sección de relevo del estado para el resumen operativo.
7. Si se interrumpe una tarea por falta de disponibilidad, registra PARCIAL o BLOQUEADO según la causa real; no la marques automáticamente como completada.
8. No copies conversaciones ni prompts completos; conserva evidencias verificables y omite información privada.

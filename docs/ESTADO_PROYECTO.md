# Estado del proyecto AcuerdoSeguro

Fuente principal del estado operativo. Consulta [el historial](HISTORIAL_PROMPTS.md) para la trazabilidad y [AGENTS.md](../AGENTS.md) para las reglas permanentes. Contrasta siempre este documento con el código y Git.

## 1. Identificación

- **Proyecto:** AcuerdoSeguro.
- **Repositorio oficial:** https://github.com/Lilarpo/acuerdoseguro.
- **Rama de trabajo:** `main`.
- **Propósito:** plataforma web de contratos digitales verificables mediante Stellar y Soroban.
- **Versiones comprobadas:** Node.js 24.22.0, npm 11.19.1, React y React DOM 19.3.1, TypeScript 5.9.3, Vite 7.3.7, Tailwind CSS y `@tailwindcss/vite` 4.3.3, ESLint 9.39.5. M1-B2-P1 agrega `react-router` 7.18.4; ninguna dependencia anterior cambia de versión.
- **Herramientas:** Git local y GitHub configurados; primera publicación realizada y recuperada mediante clonación HTTPS.
- **Tecnologías futuras sin integración funcional:** PostgreSQL, Supabase Storage, Stellar SDK, Freighter Wallet, Soroban con Rust y Vercel. M2-B2-P1 observa eventos de Supabase Auth en un proveedor React; RegisterPage ejecuta signUp y LoginPage ejecuta signInWithPassword mediante servicios separados; el login de M2-B2-P3 fue aprobado tras doce comprobaciones manuales externas. M2-B2-P4 y su corrección C1 están aprobados por siete comprobaciones manuales externas del responsable. M2-B2-P5 DISEÑO APROBADO externamente; M2-B2-P6 y la persistencia real están APROBADOS por quince comprobaciones manuales externas. Renovación habilitada/probada mediante simulaciones, observación real pendiente. P7 diseño de rutas APROBADO por revisión externa; P8 y las rutas protegidas están APROBADOS tras catorce pruebas manuales externas; P9 audita el conjunto y detecta F-01 MEDIO en el ciclo de resultados de logout. Se recomienda corregirlo antes del cierre. RLS y datos contractuales permanecen fuera del alcance.

## 2. Estado actual de desarrollo

| Campo | Valor |
| --- | --- |
| Último módulo cerrado | Módulo 1 — Frontend e Interfaz de Usuario |
| Actividad operativa de relevo previa | PUBLICACIÓN-RELEVO-M1 e INCORPORACIÓN-RELEVO-M1; no son prompts de implementación |
| Estado del Módulo 0 | COMPLETADO, aprobado externamente |
| Estado del Módulo 1 | COMPLETADO Y APROBADO — 12 de 12 prompts aprobados |
| Estado del Módulo 2 | EN DESARROLLO — M2-B1 completado y aprobado (2/2); M2-B2-P1 a M2-B2-P8 aprobados; 10 prompts de M2 aprobados; C1 incluida en P4 |
| Último prompt aprobado | M2-B2-P8 — catorce pruebas manuales aprobadas por el responsable |
| Prompt actual y último ejecutado | M2-B2-P9 — Auditoría integral de autenticación y navegación protegida |
| Estado del prompt actual | AUDITORÍA ELABORADA — PENDIENTE DE APROBACIÓN EXTERNA; REQUIERE CORRECCIÓN F-01 antes del cierre recomendado |
| Corrección puntual local | M2-B2-P4-C1 — CORRECCIÓN APROBADA dentro de P4 por el responsable; no aumenta el conteo funcional |
| Publicaciones previas verificadas | M1 mediante `353e73706d343bd56fede23cd97f6c77fc2865d4`; M2 hasta M2-B2-P2 mediante `0e23f15039802537ee2708120526d797a8acae59` |
| Siguiente trabajo previsto | Correctivo P9-C1 propuesto para F-01; después M2-B3-P1 — Diseño del modelo de datos y seguridad RLS de contratos, PROPUESTO — NO EJECUTADO, sujeto a aprobación |

El responsable confirmó después del informe de M1-B8-P1 que completó satisfactoriamente 22 comprobaciones manuales de regresión integral, sin defectos bloqueantes comunicados, y aprobó M1-B8-P1 y el cierre del Módulo 1. Codex no ejecutó esas pruebas de navegador. La publicación posterior de M1 se verificó durante PUBLICACIÓN-RELEVO-M1 e INCORPORACIÓN-RELEVO-M1; ninguna de esas actividades acredita funcionamiento de integraciones futuras.

## 3. Capacidades y preparación existentes

- **Aplicación funcional:** React inicializado, TypeScript configurado, servidor Vite e integración Tailwind mediante su plugin oficial.
- **Landing aprobada:** HomePage sustituye la bienvenida por cinco secciones: Hero, proceso previsto de cuatro pasos, tres capacidades, tecnología y límites, y llamada final. Reutiliza PageContainer, Card y Badge; fragmento nativo y enlaces SPA a registro y verificación con avisos de desarrollo. Sin formularios, imágenes externas ni lógica de negocio.
- **Sistema visual local aprobado:** tokens `@theme` de Tailwind v4 para marca, acento, fondo, superficie, texto, borde y variante oscura del acento para foco; fuente de sistema, radios y sombra sutil. Usa la escala nativa de espaciado y breakpoints. `#root` ocupa todo el ancho; la antigua regla `.welcome` se conserva sin uso en la landing. Verifica contraste en cada combinación nueva; el texto secundario se utiliza sobre blanco.
- **UI genérica local aprobada:** `src/components/ui/` conserva intactos sus siete componentes y exportaciones. El layout reutiliza PageContainer; las páginas temporales y 404 reutilizan Card y PageContainer.
- **Navegación SPA local:** un BrowserRouter en `App.tsx`, Routes/Route declarativos y `AppLayout` con Outlet, encabezado, NavLink activo y salto al único `main`. Enlaces visibles a Inicio, Verificar, Iniciar sesión y Registrarse, sin menús complejos.
- **Rutas:** `/` muestra HomePage; `/login` muestra LoginPage; `/registro` muestra RegisterPage; `/panel` muestra DashboardPage; `/contratos/nuevo` muestra CreateContractPage; `/contratos/:id` muestra ContractDetailPage; `/verificar` muestra VerifyDocumentPage. `*` muestra NotFoundPage, sin redirección silenciosa.
- **Login frontend aprobado en M1:** formulario con correo y contraseña controlados, errores locales y enlace SPA a `/registro`, originalmente sin conexión de autenticación. Su aprobación y pruebas manuales de navegador fueron comunicadas por el responsable en M1-B4-P2; Codex no las ejecutó en su entorno.
- **Login conectado en M2-B2-P3:** LoginPage conserva campos y validaciones, y llama a `src/services/supabase/loginUser.ts`. El servicio reutiliza el singleton y `auth.signInWithPassword`, recorta solo el correo y conserva la contraseña intacta. Clasifica éxito, credenciales inválidas, correo no confirmado, límite, red, cliente ausente, respuesta inesperada y error desconocido, con mensajes seguros. Exige usuario y sesión coherentes, tokens no vacíos y caducidad válida sin exponerlos a React ni hacer consultas extra. Ref síncrono, carga, bloqueo temporal de campos y limpieza de contraseña tras éxito; sin redirección. M2-B2-P3 APROBADO por el responsable tras doce comprobaciones manuales satisfactorias. Codex no ejecutó esas pruebas reales.
- **Logout en M2-B2-P4:** `logoutUser.ts` reutiliza el cliente y ejecuta exclusivamente `auth.signOut({ scope: 'local' })`, con resultado tipado y mensajes seguros. LoginPage usa useAuth y muestra Cerrar sesión solo con session_present. Refs y estados impiden logout duplicado y concurrencia con login; solo anuncia cierre confirmado cuando el servicio responde sin error y el proveedor observa signed_out. Si tras ocho segundos no observa el cambio, informa discrepancia y permite reintentar sin fabricar eventos. Implementación local APROBADA por siete pruebas manuales externas del responsable tras C1; Codex no ejecutó esas pruebas reales.
- **Registro frontend aprobado en M1:** cuatro campos controlados y validación local, originalmente sin alta real. El responsable comunicó en M1-B5-P1 que completó pruebas manuales de formulario, navegación, responsive, consola, red, almacenamiento y zoom al 200 %, y aprobó M1-B4-P2; Codex no las ejecutó en su entorno.
- **Registro conectado en M2-B2-P2:** RegisterPage utiliza `src/services/supabase/registerUser.ts` para llamar al cliente aprobado y `auth.signUp`. Envía nombre recortado como `full_name`, correo sin espacios exteriores (sin cambiar mayúsculas, conforme al formulario) y contraseña intacta. El servicio devuelve solo estado discriminado y mensaje seguro, nunca sesiones, tokens ni contraseñas. Metadatos no equivalen a identidad legal verificada. Carga con campos bloqueados, ref contra doble envío y limpieza de ambas contraseñas al aceptar; no hay redirección automática. El responsable confirmó diez comprobaciones manuales satisfactorias, incluida solicitud real, respuesta de Supabase, revisión del correo y estado de cuenta de prueba, seguridad, navegación y responsive; M2-B2-P2 APROBADO. Estas comprobaciones externas no fueron ejecutadas por Codex.
- **Dashboard aprobado:** vista preliminar sin datos consultados, con accesos a creación y verificación. El responsable comunicó en M1-B6-P1 que realizó nueve pruebas manuales de navegador, incluidas navegación, responsive, zoom, teclado, consola y ausencia de consultas privadas o sesiones ficticias, y aprobó M1-B5-P1; Codex no las ejecutó en su entorno.
- **Formulario de borrador aprobado:** siete campos, validación local de campos y correos, aviso de validación local y ausencia de persistencia. El responsable confirmó 15 pruebas manuales satisfactorias y aprobó M1-B6-P1; Codex no las ejecutó en su entorno.
- **Revisión local aprobada:** tras validar los valores actuales, una acción explícita muestra título, descripción, ambos participantes y cláusulas desde el estado React; volver a editar conserva los valores. El responsable comunicó 15 pruebas manuales satisfactorias y aprobó M1-B6-P2; Codex no las ejecutó en su entorno.
- **Detalle preliminar aprobado:** `/contratos/:id` muestra la referencia solicitada como no verificada, limita su representación visible si es larga y ofrece secciones de información, participantes, aprobaciones y evidencia con datos no disponibles. El responsable comunicó 14 pruebas manuales satisfactorias y aprobó M1-B7-P1; Codex no las ejecutó en su entorno.
- **Interfaz de verificación aprobada:** `/verificar` permite seleccionar un archivo sin leerlo ni subirlo y validar localmente el formato de una huella SHA-256 de referencia. El aviso de formato válido no constituye verificación de integridad. El responsable comunicó 15 comprobaciones manuales satisfactorias y aprobó M1-B7-P2; Codex no las ejecutó en su entorno.
- **Protección de interfaz en P8:** `/panel`, `/contratos/nuevo` y `/contratos/:id` están bajo RequireAuth y solo montan sus páginas con session_present observado. Sin sesión redirigen a login; initializing espera; error/not_configured muestran aviso. Rutas públicas y 404 intactas. Estas vistas siguen preliminares sin consultas privadas; el guard no concede permiso sobre filas ni sustituye RLS. P8 APROBADO por catorce comprobaciones manuales externas del responsable; P9 documenta F-01 MEDIO sin cambiar código.
- **Preparación arquitectónica:** se conservan todos los `.gitkeep`; `src/types/`, documentos y Stellar siguen reservados; Supabase contiene los servicios de registro, login y logout y conserva `.gitkeep`. La lógica criptográfica y las consultas reales permanecen pendientes.
- **Preparación del repositorio:** `.nvmrc`, lockfile npm, `.gitignore`, finales LF y `.env.example` público, sin credenciales reales. M2-B1-P1 lee solo las dos variables públicas Supabase cuando se solicita el cliente; RegisterPage y LoginPage lo consumen indirectamente mediante sus servicios.
- **Preparación Supabase de M2-B1-P1:** `@supabase/supabase-js` 2.118.0 y `src/lib/supabaseClient.ts` proporcionan un cliente tipado y diferido, o `null` si faltan datos públicos, la clave no es publicable o la URL no es HTTP(S). En el estado inicial de P1 la sesión no se persistía, renovaba ni restauraba automáticamente. P6 activa ahora persistencia e inicialización/renovación oficiales; las acciones Auth pertenecen a sus servicios. El responsable confirmó posteriormente configuración local y conexión real de salud de Auth; no equivale a login.
- **Diagnóstico opt-in de M2-B1-P2:** `npm run supabase:check` carga `.env.local` si existe y consulta únicamente `GET /auth/v1/health` de un proyecto HTTPS alojado en Supabase. Rechaza claves no publicables, URLs inseguras y dominios ajenos antes de enviar la clave; usa timeout y no sigue redirecciones. `npm run supabase:check:test` ejecuta pruebas simuladas sin internet. El diagnóstico no forma parte del frontend ni se ejecuta al arrancar Vite.
- **Arquitectura Auth de M2-B2-P1:** `src/auth/` define estados tipados (`not_configured`, `initializing`, `signed_out`, `session_present`, `error`), contexto, proveedor y `useAuth`. El proveedor reutiliza `getSupabaseClient()`, observa `INITIAL_SESSION`, `SIGNED_IN`, `SIGNED_OUT`, `TOKEN_REFRESHED` y `USER_UPDATED`, y cancela su suscripción al desmontarse. Solo expone `id` y correo opcional de una sesión observada; esto no verifica identidad ni autoriza datos. `main.tsx` lo integra bajo `StrictMode`. Sin configuración, deja la UI disponible y no se suscribe. En P6, `persistSession` y `autoRefreshToken` quedan activos, `skipAutoInitialize` false y `detectSessionInUrl` permanece false; el proveedor no implementa acciones de registro, login, cierre de sesión ni protección de rutas. Registro, login y logout se ejecutan en sus servicios independientes, sin modificar este proveedor. El SDK comunica SIGNED_IN/SIGNED_OUT y React observa la sesión; no se modifica Context desde las páginas.
- **Proyecto Supabase de desarrollo:** el responsable creó el proyecto y configuró localmente su URL y clave publishable en `.env.local`, ignorado por Git. Confirmó dos veces HTTP 200 del endpoint de salud de Auth desde su terminal. El acceso del siguiente integrante se gestiona desde la organización del dashboard y requiere sus propios valores públicos locales; Git no transfiere el proyecto remoto. No constan tablas, migraciones ni políticas RLS ejecutadas.
- **Instrucciones permanentes:** `AGENTS.md` existe en la raíz.
- **Auditoría final aprobada:** rutas, formularios, validaciones, accesibilidad, seguridad del alcance frontend y regresión integral revisadas. Build, lint y Vite pasaron en la auditoría técnica; el responsable confirmó 22 pruebas manuales satisfactorias. No se modificó código durante M1-B8-P1.
- **Continuidad:** documentos actualizados para el cierre del Módulo 1, conservando las evidencias y el historial del Módulo 0.

### Matriz de rutas del frontend aprobado

La aprobación de cada interfaz no significa que sus integraciones reales estén disponibles. P8 añade guard de sesión para panel/contratos, APROBADO por catorce comprobaciones manuales externas; no hay autorización RLS contractual.

| Ruta | Pantalla | Estado |
| --- | --- | --- |
| `/` | Landing | Interfaz aprobada |
| `/login` | Login y cierre de sesión local | Login y logout reales APROBADOS; C1 aprobada dentro de P4. Persistencia real P6 APROBADA; renovación real pendiente de observación; rutas sin guard |
| `/registro` | Registro | Registro real implementado y aprobado tras diez comprobaciones manuales externas |
| `/panel` | Dashboard | Interfaz/estado vacío aprobados; guard de sesión P8 APROBADO |
| `/contratos/nuevo` | Creación y revisión local | Flujo local aprobado; guard P8 APROBADO, sin guardado remoto |
| `/contratos/:id` | Detalle preliminar | Interfaz aprobada; guard P8 APROBADO; referencia/permiso de contrato no verificados |
| `/verificar` | Verificación documental frontend | Interfaz y formato de huella aprobados; sin verificación criptográfica |
| `*` | Página 404 | Interfaz aprobada |

### Funcionalidades pendientes de integración

El registro real con Supabase Auth está implementado y aprobado tras validación manual del responsable. Codex no creó usuarios reales durante sus pruebas controladas. Login y logout local están aprobados por validación externa, incluida C1. P5 y P6 aprobados, incluida persistencia real; renovación automática habilitada y probada mediante simulaciones, observación real pendiente. P7 diseño aprobado; P8 rutas protegidas IMPLEMENTADAS Y APROBADAS. P9 documenta F-01 MEDIO y recomienda corrección antes del cierre. Siguen pendientes autorización RLS, base de datos de contratos, almacenamiento documental, guardado y consulta reales de acuerdos, aprobaciones criptográficas, integración de billeteras Stellar, cálculo SHA-256 sobre documentos, comparación criptográfica, registro o consulta de evidencia en Stellar, integración Soroban ni escrow. También siguen pendientes generación documental, backend de datos Supabase y despliegue. El resto de pantallas conserva su alcance local o preliminar.

## 4. Estado de los módulos

| Módulo | Nombre | Estado | Observaciones |
| --- | --- | --- | --- |
| 0 | Configuración inicial | COMPLETADO | Ocho prompts aprobados externamente; base publicada en GitHub. |
| 1 | Frontend e Interfaz de Usuario | COMPLETADO Y APROBADO | 12 de 12 prompts aprobados, incluida M1-B8-P1 tras 22 comprobaciones manuales externas satisfactorias. Publicado en `origin/main` mediante `353e73706d343bd56fede23cd97f6c77fc2865d4`. |
| 2 | Backend y Supabase | EN DESARROLLO | M2-B1-P1, M2-B1-P2 y M2-B2-P1 aprobados; M2-B1 completado y aprobado (2/2). M2-B2-P2 APROBADO tras diez comprobaciones manuales externas. Registro real aprobado y publicado; M2-B2-P3 APROBADO; M2-B2-P4 y C1 APROBADOS tras siete comprobaciones externas; diez prompts de M2 aprobados, incluidos P5 diseño, P6 persistencia real, P7 diseño de rutas y P8 navegación protegida. Renovación real pendiente de observación. P9 auditoría elaborada pendiente de aprobación externa; F-01 MEDIO requiere corrección antes del cierre recomendado; datos contractuales/RLS pendientes. |
| 3 | Stellar y Soroban | PENDIENTE | Carpeta reservada, sin SDK ni contratos. |
| 4 | Documentos y verificación | PENDIENTE | Carpeta reservada, sin lógica documental. |
| 5 | Integración, pruebas y despliegue | PENDIENTE | Sin despliegue ni integración entre servicios. |

## 5. Pruebas y verificaciones

### Evidencia histórica

| Comprobación | Evidencia disponible | Límite |
| --- | --- | --- |
| `npm run build` y `npm run lint` | PASS reportado en M0-B1-P1 a M0-B5-P1. | Se distinguen de las ejecuciones nuevas indicadas abajo. |
| `npm run dev` | PASS reportado en M0-B2-P2; servidor detenido al terminar. | Evidencia histórica. |
| `npm ci` | PASS reportado en M0-B1-P2, en copia temporal y con caché local. | Anterior a Tailwind; la prueba del lockfile actual corresponde a M0-B6-P1. |
| Inspección visual | Escritorio 1440 × 900 y móvil 390 × 844 reportados en M0-B2-P2, con React y Tailwind operativos. | Evidencia histórica. |
| Compatibilidad Linux y WSL2 | Evaluación estática previa: rutas portables, importaciones y scripts npm; finales LF. | Ejecución previa en un equipo Linux Mint; los otros cuatro equipos no están comprobados. |

### Verificaciones de M0-B6-P1

Evidencia del cierre anterior aprobado; no atribuir estas instalaciones ni la clonación a M1-B1-P1.

| Comprobación | Resultado |
| --- | --- |
| Versiones, estructura e instrucciones | Verificadas; servicios solo con `.gitkeep`, sin integraciones ficticias. |
| `npm ci` con el lockfile actual | PASS en copia temporal aislada, con caché local y sin dependencias ni compilaciones anteriores; instalación principal intacta. |
| `npm run build` y `npm run lint`, proyecto principal | PASS; TypeScript, Vite y ESLint sin errores. |
| Build y lint de la copia aislada | PASS; instalación reproducible verificada con el lockfile actual. |
| Desarrollo, React, Tailwind y navegador | PASS; Vite arrancó y se detuvo; nueve utilidades verificadas en CSS; escritorio 1440 × 900 y móvil 390 × 844 inspeccionados, sin desbordamiento ni errores de aplicación en consola. |
| Seguridad y exclusiones Git | PASS sobre los 25 archivos candidatos: contenido inspeccionado, sin secretos conocidos; `.env.example` permitida y entornos privados excluidos. |
| Remoto y visibilidad | Accesible; la consulta inicial no encontró ramas ni etiquetas. Visibilidad PUBLIC confirmada; el responsable autorizó expresamente publicar en público durante M0-B6-P1. |
| Publicación y recuperación desde GitHub | PASS; push inicial completado, `main` remota verificada y clonación HTTPS nueva con los 25 archivos esperados, incluidos instrucciones, documentos y plantilla pública. |
| `npm ci`, build y lint desde la clonación nueva | PASS con caché local y lockfile actual; sin modificar dependencias ni configuración. |
| Integridad y documentación | PASS; solo cambiaron los dos documentos de continuidad frente al inicio del bloque; sin cambios de código, versiones ni arquitectura. |

**Pendiente en otros entornos:** validar instalación, build, lint y desarrollo en los otros cuatro equipos. La carga automática de `AGENTS.md` en una sesión independiente sigue sin comprobarse.

### Verificaciones de M1-B1-P1

| Comprobación | Resultado |
| --- | --- |
| Build, lint y servidor de desarrollo | PASS; build final y lint sin errores; Vite arrancó y se detuvo. Sin instalar dependencias. |
| Paleta, tokens y Tailwind | PASS; ocho tokens de color y siete utilidades institucionales comprobados en CSS compilado; estilos calculados coinciden con la paleta. |
| Responsive y texto al 200 % | PASS; inspección visual real a 1440 × 900 y 390 × 844, más mediciones a 768 y 320 px y texto al 200 % a 390 px; sin desbordamientos ni superposiciones. |
| Accesibilidad y consola | PASS en revisión básica: un `main`, un `h1`, sin controles de producto; contraste título 14,27:1 y descripción 4,76:1 sobre blanco. Foco de 3 px y separación de 3 px comprobado con sonda temporal solo en el navegador; sin errores de aplicación. No sustituye una auditoría completa con lector de pantalla. |
| Tema y movimiento | PASS; tema claro incluso ante preferencia de oscuro; sin animaciones ni transiciones, incluida emulación de movimiento reducido. |
| Alcance e integridad | PASS; únicamente tres archivos visuales y estos dos documentos modificados; sin staging, commits, push ni cambios en lockfile o módulos reservados. |

### Verificaciones de M1-B1-P2

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript incluye los siete componentes, sin errores. |
| Desarrollo y bienvenida | PASS; Vite arrancó y se detuvo; contenido y colores de bienvenida conservados; sin errores ni advertencias nuevos de aplicación. |
| Exportaciones, props, labels e IDs | PASS en Chrome: siete exportaciones centrales e individuales, props y refs nativos, IDs únicos y estables, labels, required y ARIA; ayuda y error conservan también `aria-describedby` del consumidor. |
| Teclado y comportamiento nativo | PASS: Button con Enter y foco visible de 3 px, tipo button por defecto, submit explícito, disabled, edición controlada/no controlada, select con flechas y textarea redimensionable verticalmente. |
| Contraste y responsive de UI | PASS: mínimo medido 4,83:1 en variantes de botones y 5,63:1 en badges; capturas reales a 1440 y 390 px e inspección adicional a 320 px, sin desbordamiento. Card y PageContainer son divs, sin landmarks ni interacciones por defecto. |
| Hover y Tailwind | Reglas hover y disabled verificadas en CSS compilado; hover visual NO EJECUTADO porque Chrome informa `hover: none`. Verificación con ratón físico pendiente; no se modificó el CSS para forzarla. |
| Preservación y alcance | PASS; ocho archivos nuevos en UI y únicamente estos dos documentos preexistentes modificados en este prompt; archivos de M1-B1-P1 conservados byte a byte. Montaje temporal retirado, bienvenida restaurada; sin staging, commits ni push. |

### Verificaciones de M1-B2-P1

| Comprobación | Resultado |
| --- | --- |
| Build, lint y desarrollo | PASS; compilación TypeScript/Vite y ESLint correctos; Vite arrancó y se detuvo al finalizar. |
| React Router y lockfile | PASS; `react-router` 7.18.4 compatible con React 19 y Node 24; solo se agregan sus dependencias transitivas cookie y set-cookie-parser, sin actualizar paquetes anteriores. |
| Rutas y acceso directo | PASS en Chrome y respuesta HTML de Vite: siete rutas, `/contratos/ejemplo`, `/contratos/otro-123` y 404; `/contratos/nuevo` muestra creación, no detalle. Regreso al inicio probado desde todos los destinos temporales y 404. |
| SPA e historial | PASS; clicks internos, Atrás y Adelante mantienen el documento y el encabezado, sin solicitudes nuevas de documento. URL y contenido coinciden. |
| Teclado y accesibilidad básica | PASS; un header/nav/main y un h1 por pantalla; aria-current en NavLink, orden de Tab, foco de 3 px y Enter; salto visible al recibir foco y enfoque real de main. Sin controles ni formularios ficticios. No implica conformidad WCAG integral. |
| Responsive, visual y consola | PASS en mediciones a 1440 × 900, 390 × 844 y 320 × 700 para inicio, placeholder y 404; sin superposición ni scroll horizontal. Capturas de inicio y placeholder inspeccionadas en escritorio y móvil. Paleta calculada conservada; sin errores ni advertencias de aplicación. |
| Preservación y alcance | PASS; cuatro archivos nuevos de navegación y seis preexistentes modificados en este prompt; UI, CSS global y demás archivos fuera del alcance idénticos al inicio. Sin staging, commits ni push. |

### Verificaciones de M1-B3-P1

| Comprobación | Resultado |
| --- | --- |
| Build, lint y desarrollo | PASS; TypeScript/Vite y ESLint sin errores; Vite arrancó y se detuvo al finalizar. Sin instalaciones. |
| Landing y contenido | PASS; cinco secciones en orden, un h1, cuatro pasos y tres capacidades. Prototipo identificado; SHA-256 detectará alteraciones, Stellar y Soroban previstos, privacidad y aclaración legal visibles. Sin datos ficticios ni funciones de negocio. |
| Enlaces y regresión | PASS en Chrome; fragmento por click y Tab/Enter, destino enfocado y encabezado visible; tres enlaces de la landing a registro/verificación sin recargar documento. Encabezado, siete rutas, dos IDs de detalle, 404, regreso e historial SPA conservados. |
| Teclado y accesibilidad básica | PASS; salto al main, orden de Tab, Enter y foco de 3 px. En el bloque azul final se utiliza foco blanco. Contraste calculado: texto muted sobre blanco 4,76:1; marca sobre turquesa 4,83:1; blanco sobre marca 14,27:1. Sin auditoría WCAG integral ni lector de pantalla. |
| Responsive y navegador | PASS; mediciones e inspección de capturas a 320 × 700, 390 × 844, 768 × 1024 y 1440 × 900. Texto al 200 % sin scroll horizontal en los cuatro tamaños; tarjetas en una, dos, tres o cuatro columnas según sección y ancho. Sin errores ni advertencias de aplicación en consola. |
| Alcance | PASS; solo HomePage y continuidad modificados frente al inicio; avances locales previos conservados, sin staging, commits ni push. Scripts y capturas de prueba temporales fuera del repositorio. |

### Verificaciones del relevo de Módulo 1

- `npm run build`: PASS; TypeScript y Vite compilaron los avances completos.
- `npm run lint`: PASS, sin errores.
- Revisión de contenido y búsqueda de patrones de credenciales en los 37 archivos candidatos: sin hallazgos. `.env.example` solo contiene valores vacíos y `testnet`; entornos privados, claves, dependencias, compilaciones y temporales excluidos de Git.
- `git fetch origin main`: PASS; HEAD previo y origin/main sin divergencia. Se autoriza consolidar únicamente los 19 archivos legítimos pendientes, sin modificar código durante el relevo.
- Pruebas ejecutadas con Node.js 24.22.0 y npm 11.19.1 en Linux; no se repitió la inspección visual ni se ejecutó el siguiente prompt. El resultado final del push y el hash del commit se informan al cerrar el relevo.

### Verificaciones de M1-B4-P1

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript, Vite y ESLint sin errores. |
| `npm run dev` | PASS; Vite arrancó con permiso de red local y se detuvo al finalizar. |
| HTTP de rutas en desarrollo | PASS; `/`, `/login`, `/registro`, `/verificar` y ruta desconocida devolvieron el HTML de la SPA. La respuesta HTTP no prueba el renderizado de React. |
| Marcado inicial | PASS mediante renderizado estático: un h1, un form, ningún main adicional, ambos tipos de entrada, botón submit y enlace a `/registro`. |
| Interacción y responsive | NO EJECUTADO; no hay navegador disponible en este entorno. Pendientes casos de validación, teclado, navegación SPA, consola, peticiones de red y mediciones a 320, 390, 768 y 1440 px con zoom al 200 %. |

El responsable informó posteriormente que completó satisfactoriamente las pruebas manuales de navegador y aprobó M1-B4-P1. Este reporte no convierte las pruebas no ejecutadas por Codex en pruebas propias.

### Verificaciones de M1-B4-P2

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript, Vite y ESLint sin errores. |
| `npm run dev` | PASS; Vite arrancó en localhost con permiso de red local y se detuvo al finalizar. |
| HTTP de rutas en desarrollo | PASS; `/`, `/login`, `/registro`, `/verificar` y ruta desconocida devolvieron el HTML de la SPA. No acredita renderizado de React. |
| Marcado inicial | PASS mediante renderizado estático: un h1, un form, cuatro inputs y labels, ayuda de contraseña, botón submit y enlace a `/login`; sin main adicional. |
| Interacción y responsive | NO EJECUTADO; no hay navegador disponible en este entorno. Pendientes validaciones, teclado, navegación SPA, consola, red, almacenamiento y mediciones a 320, 390, 768 y 1440 px con zoom al 200 %. |

El responsable informó posteriormente en M1-B5-P1 que completó las pruebas manuales de validación, navegación, responsive, consola, red, almacenamiento y zoom al 200 %, y aprobó M1-B4-P2. No se atribuyen esas pruebas a Codex.

### Verificaciones de M1-B5-P1

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript, Vite y ESLint sin errores. |
| `npm run dev` | PASS; Vite arrancó en localhost con permiso de red local y se detuvo al finalizar. |
| HTTP de rutas en desarrollo | PASS; `/panel`, `/contratos/nuevo`, `/verificar`, `/login`, `/registro`, `/` y ruta desconocida devolvieron el HTML de la SPA. No acredita navegación React. |
| Marcado inicial del dashboard | PASS mediante renderizado estático: un h1, tres secciones con h2, ningún main adicional, estado vacío explícito y destinos de los enlaces previstos. |
| Interacción y responsive | NO EJECUTADO; no hay navegador disponible en este entorno. Pendientes navegación SPA, teclado, consola, red, almacenamiento y mediciones a 320, 390, 768 y 1440 px con zoom al 200 %. |

El responsable informó posteriormente en M1-B6-P1 que completó nueve pruebas manuales del dashboard y aprobó M1-B5-P1. No se atribuyen esas pruebas a Codex.

### Verificaciones de M1-B6-P1

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript, Vite y ESLint sin errores. |
| `npm run dev` | PASS; Vite arrancó en localhost con permiso de red local y se detuvo al finalizar. |
| HTTP de rutas en desarrollo | PASS; `/contratos/nuevo`, `/contratos/ejemplo`, `/panel`, `/login`, `/registro`, `/verificar`, `/` y ruta desconocida devolvieron el HTML de la SPA. No acredita navegación React. |
| Marcado inicial del formulario | PASS mediante renderizado estático: un h1, tres secciones, siete campos con etiquetas, botón submit, aviso de no guardado y enlace a `/panel`; sin main adicional. |
| Interacción y responsive | NO EJECUTADO; no hay navegador disponible en este entorno. Pendientes validaciones, teclado, navegación SPA, consola, red, almacenamiento y mediciones a 320, 390, 768 y 1440 px con zoom al 200 %. |

El responsable informó posteriormente en M1-B6-P2 que completó satisfactoriamente 15 pruebas manuales, incluidas validaciones, navegación, teclado, responsive, zoom, consola, ausencia de envío y persistencia, y descarte tras recarga; aprobó M1-B6-P1. No se atribuyen esas pruebas a Codex.

### Verificaciones de M1-B6-P2

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript, Vite y ESLint sin errores. |
| `npm run dev` | PASS; Vite arrancó en localhost y se detuvo. |
| HTTP de rutas en desarrollo | PASS; Vite sirvió el HTML base para las rutas comprobadas. No acredita navegación ni renderizado React. |
| Marcado inicial y revisión estática | PASS mediante renderizado estático: edición con un h1, siete campos y revisión inicialmente ausente; revisión con un h1, tres secciones, sin main adicional, texto especial escapado y saltos de línea conservados. |
| Interacción y responsive | NO EJECUTADO; no hay navegador disponible. Pendientes validación y alternancia reales, conservación de valores, teclado, consola, red, almacenamiento, recarga, rutas previas, 320, 390, 768 y 1440 px, y zoom al 200 %. |

El responsable informó posteriormente en M1-B7-P1 que completó satisfactoriamente 15 pruebas manuales de la revisión local, incluidas alternancia, conservación, texto seguro, teclado, responsive, zoom, consola y ausencia de envío y almacenamiento; aprobó M1-B6-P2. No se atribuyen esas pruebas a Codex.

### Verificaciones de M1-B7-P1

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript, Vite y ESLint sin errores. |
| `npm run dev` | PASS; Vite arrancó en localhost tras permiso de red local y se detuvo. El intento inicial en sandbox falló con `listen EPERM`. |
| HTTP de rutas en desarrollo | PASS; Vite sirvió el HTML base para las rutas comprobadas. No acredita navegación ni renderizado React. |
| Renderizado estático del detalle | PASS; un h1, cuatro secciones, sin main adicional, referencia dinámica, tres enlaces previstos, escape de caracteres especiales y truncamiento de referencia larga. |
| Interacción y responsive | NO EJECUTADO; no hay navegador disponible. Pendientes navegación SPA, teclado, consola, red, almacenamiento, 320, 390, 768 y 1440 px, y zoom al 200 %. |

El responsable informó posteriormente en M1-B7-P2 que completó satisfactoriamente 14 pruebas manuales del detalle, incluidas rutas dinámicas, referencias no verificadas, texto seguro, navegación, teclado, responsive, zoom, consola, red y almacenamiento; aprobó M1-B7-P1. No se atribuyen esas pruebas a Codex.

### Verificaciones de M1-B7-P2

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript, Vite y ESLint sin errores. |
| `npm run dev` | PASS; Vite arrancó en localhost y se detuvo. |
| HTTP de rutas en desarrollo | PASS; Vite sirvió el HTML base para las rutas comprobadas. No acredita navegación ni renderizado React. |
| Renderizado estático inicial | PASS; un h1, formulario, selector de archivo, campo de huella, tres pasos, enlaces previstos y ningún aviso de éxito o error inicial. |
| Interacción y responsive | NO EJECUTADO; no hay navegador disponible. Pendientes validaciones, correcciones, teclado, consola, red, almacenamiento, recarga, rutas previas, 320, 390, 768 y 1440 px, y zoom al 200 %. |

El responsable informó posteriormente en M1-B8-P1 que completó satisfactoriamente 15 comprobaciones manuales de la interfaz de verificación, incluidos archivo, validación de huella, correcciones, navegación, teclado, responsive, zoom, consola, red y almacenamiento; aprobó M1-B7-P2. No se atribuyen esas pruebas a Codex.

### Verificaciones de M1-B8-P1

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript, Vite y ESLint sin errores. No existe script de pruebas automatizadas en `package.json`. |
| `npm run dev` | PASS; Vite arrancó en localhost y se detuvo. |
| HTTP de rutas en desarrollo | PASS; Vite sirvió el HTML base de las ocho rutas inspeccionadas. No acredita navegación SPA. |
| Renderizado estático de rutas | PASS; landing, login, registro, panel, creación, detalle, verificación y 404 mostraron el título esperado, un único `main` y `h1`, IDs únicos, enlace de salto con destino válido y enlaces internos hacia rutas declaradas. No acredita interacciones. |
| Inspección transversal de código | PASS dentro del alcance: formularios locales, avisos honestos, rutas y componentes UI coherentes; sin nuevas dependencias, credenciales visibles, llamadas externas, persistencia o integraciones blockchain en `src/`. No equivale a una auditoría de seguridad externa. |
| Regresión interactiva y visual | NO EJECUTADO; no hay navegador disponible. Pendientes formularios, edición/revisión, teclado, foco, consola, red, almacenamiento, recarga, 320, 390, 768 y 1440 px, y zoom al 200 %. |
| Git | `git diff --check` PASS; `main`, HEAD y `origin/main` iguales; cambios locales anteriores conservados, sin staging, commit ni push. |

No se identificaron defectos corregibles dentro del alcance y de las comprobaciones ejecutadas. No se modificó código durante esta auditoría.

**Validación externa posterior:** el responsable confirmó 22 comprobaciones manuales de regresión integral satisfactorias de rutas, formularios, creación y revisión de borradores, detalle, verificación documental, navegación, teclado, foco, responsive, zoom al 200 %, consola, red, almacenamiento y recarga. No comunicó defectos bloqueantes y aprobó M1-B8-P1. Estas pruebas fueron realizadas por el responsable, no por Codex. El estado PARCIAL consignado en el informe técnico original corresponde al momento anterior a esta confirmación.

### Verificaciones de CIERRE-DOC-M1

| Comprobación | Resultado |
| --- | --- |
| `npm run build` | PASS; TypeScript y Vite compilaron con las dependencias existentes. |
| `npm run lint` | PASS; ESLint sin errores. |
| `git diff --check` | PASS; sin errores de formato en cambios rastreados. |
| Alcance | Solo se editaron los dos documentos de continuidad durante este cierre; código, dependencias y configuración conservados. |

### Verificaciones de M2-B1-P1

| Comprobación | Resultado |
| --- | --- |
| `npm install @supabase/supabase-js` | PASS con permiso de red; el primer intento falló por `EAI_AGAIN`. Solo se añadió esta dependencia directa. |
| `npm run build`, `npm run lint`, `git diff --check` | PASS. |
| Configuración ausente y parcial | PASS en prueba controlada: URL o clave ausentes, clave no publicable y URL inválida devuelven `null`; con URL local y clave publicable de prueba se obtiene un cliente reutilizado. Cero peticiones externas observadas. |
| `npm run dev` | PASS; Vite arrancó y se detuvo. Ocho rutas recibieron HTML base con HTTP 200; no acredita navegación SPA ni inspección visual. |
| Navegador y conexión Supabase real | NO EJECUTADO; no hay navegador disponible ni credenciales públicas configuradas para este bloque. |

La incorporación previa confirmó en WSL2 el commit publicado `353e737`, Node.js 24.22.0, npm 11.19.1, `npm ci`, build, lint y Vite. El primer `npm ci` falló por `EPERM` del sandbox; el reintento autorizado pasó. No se modificaron pantallas ni rutas durante la incorporación. La contradicción vigente sobre la publicación de M1 se corrigió en la tabla de módulos durante M2-B1-P1.

**Aprobación posterior de M2-B1-P1:** el responsable confirmó 12 comprobaciones manuales satisfactorias de las rutas, ausencia de errores y solicitudes nuevas a Supabase, ausencia de sesiones persistidas y Git coherente. Codex no ejecutó esas pruebas de navegador. M2-B1-P1 queda APROBADO.

### Verificaciones de M2-B1-P2

| Comprobación | Resultado |
| --- | --- |
| `npm run supabase:check:test` | PASS; 22 casos simulados, sin peticiones a internet. |
| `npm run supabase:check` | CONFIGURACIÓN AUSENTE; salida 2, sin petición real porque no existen `.env.local` ni variables exportadas. |
| `npm run build`, `npm run lint`, `git diff --check` | PASS. |
| `npm run dev` | PASS; Vite arrancó y se detuvo. Ocho rutas sirvieron HTML base con HTTP 200; no acredita navegación SPA. |
| Navegador y salud de Auth real | NO EJECUTADO; no hay navegador ni configuración de proyecto propio en este entorno. |

El comando de diagnóstico usa salida 0 solo para salud de Auth confirmada, 1 para configuración inválida o conexión no confirmada y 2 cuando falta configuración. Un HTTP positivo de Auth no demuestra permisos, login, RLS ni base de datos.

**Aprobación posterior de M2-B1-P2:** el responsable confirmó una conexión real satisfactoria con Supabase Auth (HTTP 200), las 22 pruebas automatizadas del diagnóstico, regresión manual de rutas y `.env.local` ignorado por Git. Codex no ejecutó esa regresión manual. M2-B1-P2 queda APROBADO y M2-B1 COMPLETADO Y APROBADO (2/2).

### Verificaciones de M2-B2-P1

| Comprobación | Resultado |
| --- | --- |
| `npm run build` | PASS; TypeScript y Vite compilaron. Vite advirtió que el bundle supera 500 kB; no impidió el build. |
| `npm run lint` | PASS. |
| `npm run supabase:check:test` | PASS; 22 pruebas simuladas sin internet. |
| `npm run supabase:check` | NO CONFIRMADO en Codex: la ejecución en sandbox devolvió fallo DNS y salida 1. La conexión HTTP 200 anterior fue confirmada externamente por el responsable. |
| `npm run dev` | PASS de arranque de Vite fuera del sandbox; servidor detenido. La consulta HTTP local no se completó por restricciones del entorno. |
| `git diff --check` | PASS. |
| Transiciones de Auth | Revisadas por inspección del proveedor y SDK instalado; no se ejecutaron operaciones de usuario ni simulaciones de eventos. |
| Navegador, consola, Network, almacenamiento y recarga | NO EJECUTADO EN CODEX — REQUIERE VALIDACIÓN MANUAL EXTERNA. |

**Estado inicial de M2-B2-P1 al entregar Codex:** PARCIAL por validación de navegador pendiente y diagnóstico real no confirmado en Codex; arquitectura implementada, entonces aún no aprobada. Una sesión observada en el cliente no sustituye identidad verificada por servidor ni políticas RLS. No se modificaron formularios, rutas o cliente Supabase.

**Aprobación posterior de M2-B2-P1:** el responsable confirmó catorce comprobaciones manuales satisfactorias del frontend con AuthProvider integrado. Supabase Auth respondió HTTP 200 desde su terminal, las ocho rutas permanecieron operativas, no hubo regresiones en consola ni Network, no se introdujo persistencia de sesiones y Git conservó los cambios locales. Codex no ejecutó esas pruebas de navegador. M2-B2-P1 queda APROBADO; login y registro reales aún no existen y sus transiciones no se han probado.

### Verificaciones de M2-B2-P2

| Comprobación | Resultado |
| --- | --- |
| Build, lint y diff check | PASS; TypeScript/Vite y ESLint sin errores; permanece la advertencia de bundle mayor de 500 kB. |
| Desarrollo | PASS; Vite en `http://localhost:5173/`, detenido al terminar. |
| Diagnóstico Supabase controlado | PASS, 22/22 casos existentes, sin cambios en los scripts. |
| Diagnóstico real de salud | PASS, SERVICIO ACCESIBLE — HTTP 200, salida 0. Primer intento en sandbox falló por DNS; reintento autorizado correcto. No acredita creación de usuarios. |
| Servicio aislado | PASS con TypeScript instalado y cliente simulado: 13 escenarios de respuesta, más configuración ausente y excepción de configuración. Verifica trim de nombre/correo, contraseña intacta, una llamada y resultado sin valores sensibles. |
| Registro en Chrome con SDK instalado | PASS; ocho casos inválidos sin solicitudes; envío válido, doble envío síncrono, bloqueo de campos, progreso, respuestas sin sesión y con sesión, red y reintento, contraseña rechazada, límite y cuenta existente con mensaje neutral. Contraseñas borradas al aceptar, datos conservados ante error, sin redirección ni localStorage/sessionStorage/cookies. Respuestas de red interceptadas antes de arrancar la app; no se enviaron altas al servidor ni se crearon usuarios. |
| Accesibilidad y responsive | PASS en revisión básica: errores ARIA y foco al primer campo inválido, regiones status/alert, Tab/Enter y foco visible. Capturas revisadas a 320, 390, 768 y 1440 px; mensajes de error y carga sin scroll horizontal; errores comprobados también con texto al 200 %. No es auditoría WCAG integral. |
| Regresión | Ocho rutas renderizadas en Chrome; cliente, proveedor Auth, login, dashboard, borrador/revisión, detalle, verificación, layout y landing sin modificaciones. No se repitió toda la matriz funcional histórica. |
| Consola y red | Sin excepciones nuevas de aplicación; los fallos de red simulados provocan el console.error propio del SDK. Network controlado durante altas, sin peticiones reales de registro ni reintentos automáticos. |
| Alta real y correo, ejecución de Codex | NO EJECUTADO por Codex; las pruebas de navegador anteriores utilizaron respuestas controladas. El responsable confirmó después diez comprobaciones manuales satisfactorias y aprobó M2-B2-P2. |

**Aprobación posterior:** en PUBLICACIÓN-RELEVO-M2-02, el responsable confirmó diez comprobaciones manuales satisfactorias del registro real: validaciones, solicitud real, respuesta de Supabase, revisión del correo y estado de cuenta de prueba, seguridad, navegación y responsive. M2-B2-P2 queda APROBADO. Esta evidencia externa cierra el estado PARCIAL del informe inicial; no se atribuye a Codex la creación de la cuenta ni esas comprobaciones.

### Checklist externa original de M2-B2-P2 — antecedente de la validación

1. En el proyecto compartido, revisar Authentication → Providers → Email (o ubicación equivalente): registro por correo habilitado, confirmación activa o inactiva y política de contraseña. No se consultaron ni cambiaron automáticamente estos ajustes.
2. Revisar Authentication → URL Configuration: Site URL y URLs permitidas para el origen de desarrollo `http://localhost:5173`. Aprobar cualquier cambio necesario; sin dominios arbitrarios ni redirecciones abiertas.
3. El servicio omite `emailRedirectTo` y conserva el Site URL configurado según el comportamiento de [signUp](https://supabase.com/docs/reference/javascript/auth-signup). No hay callback nuevo ni procesamiento de tokens: `detectSessionInUrl` sigue desactivado. Confirmar el correo no implica inicio de sesión automático en esta aplicación.
4. Con una única cuenta de prueba propia autorizada, comprobar una sola solicitud, respuesta real y mensaje adecuado; recepción del correo si corresponde y está disponible, ausencia de redirección, errores inesperados y almacenamiento de contraseñas. No compartir credenciales por chat ni crear cuentas repetidas para sortear límites.
5. La aprobación fue recibida mediante PUBLICACIÓN-RELEVO-M2-02; M2-B2-P2 es ahora el último aprobado. No iniciar M2-B2-P3 durante el relevo.

### Verificaciones de PUBLICACIÓN-RELEVO-M2-02

- Se revisaron únicamente los cuatro archivos de entrega aprobados, sin cambios funcionales durante esta operación. `.env.local`, `.env`, dependencias y compilaciones permanecen excluidos; no se incluyen secretos, valores de configuración ni datos personales de cuentas de prueba.
- Se consultó directamente GitHub y se ejecutó `git fetch origin main`; referencia remota y HEAD previos coinciden en `93c356f8bb03da1352950067faee7a17239e06af`, sin divergencia ni staging previo desconocido.
- Pruebas técnicas nuevas de Codex: `npm run build`, `npm run lint`, `npm run supabase:check:test` (22/22) y `git diff --check`. Resultados efectivos comprobados antes de publicar; las pruebas manuales del registro corresponden al responsable, no a esta operación.
- No se instalaron dependencias, no se configuró Supabase ni se crearon o eliminaron usuarios. La solicitud autoriza un único commit y push normales después de revisar el staging; publicación y limpieza se acreditan únicamente mediante la comprobación final de Git.

### Verificaciones de M2-B2-P3

| Comprobación | Resultado |
| --- | --- |
| Build y lint | PASS con TypeScript/Vite y ESLint. Permanece la advertencia de bundle mayor de 500 kB; no se modificó configuración. |
| Vite y diff check | PASS; servidor local en `http://localhost:5173/`, detenido al finalizar. |
| Diagnóstico controlado | PASS: 22/22 casos existentes, sin cambios en scripts. |
| Salud Supabase real | PASS: SERVICIO ACCESIBLE — HTTP 200, salida 0. El primer intento falló por DNS del sandbox; reintento autorizado correcto. No acredita login. |
| Servicio aislado | PASS: cliente null y excepción de configuración; diez escenarios de error; diez respuestas (datos ausentes, ID inválido, sesión ausente, usuario ausente o distinto, tokens vacíos, caducidad ausente/expirada y sesión coherente). Correo recortado sin cambiar mayúsculas y contraseña intacta; una llamada y resultado sin tokens, sesión ni contraseña. |
| Login en Chrome con SDK instalado | PASS con respuestas de red simuladas: correo vacío/inválido y contraseña vacía sin petición; un envío ante doble submit síncrono, doble click y Enter repetido; carga y campos deshabilitados; credenciales inválidas, correo no confirmado, límite sin reintento automático, red/reintento, error desconocido y respuesta sin sesión. Éxito limpia contraseña y conserva correo sin redirigir. Ningún intento real sobre cuentas remotas. |
| AuthProvider y recarga | PASS en montaje temporal del AuthProvider y useAuth originales: observan session_present tras SIGNED_IN emitido por el SDK ante una respuesta simulada. No se fabricó el evento ni se cambió código de producción del proveedor. Sin localStorage/sessionStorage/cookies; tras recarga, sesión ausente y sin restauración. |
| Accesibilidad y responsive | PASS en revisión básica: labels, errores ARIA, foco al primer campo inválido, status/alert, Tab/Shift+Tab/Enter y foco visible. Capturas de 320, 390, 768 y 1440 px revisadas; error y carga sin scroll horizontal también con texto al 200 %. No implica auditoría WCAG integral. |
| Regresión | PASS de renderizado de las ocho rutas y un main/h1 por vista. Registro real aprobado, landing, dashboard, borrador/revisión, detalle, verificación, 404 y componentes compartidos conservan su código. No se repitió toda la matriz funcional histórica. |
| Consola y Network | Sin excepciones nuevas de aplicación; console.error propio del SDK al simular fallos de red, esperado. Peticiones de login interceptadas con respuestas controladas; sin autenticar usuarios reales ni enviar credenciales a terceros. Scripts y capturas temporales fuera del repositorio. |
| Login real manual, ejecución de Codex | NO EJECUTADO por Codex. El responsable confirmó posteriormente doce comprobaciones manuales satisfactorias y aprobó M2-B2-P3; véase aprobación posterior. |

**Aprobación posterior de M2-B2-P3:** el responsable confirmó externamente doce comprobaciones manuales satisfactorias: formulario, validaciones, contraseña incorrecta, recuperación del error, login con cuenta real, prevención de duplicados, AuthProvider, seguridad, recarga sin persistencia, consola/Network, responsive/accesibilidad y Git/regresión. M2-B2-P3 queda APROBADO. Estas pruebas no fueron ejecutadas por Codex.

### Checklist manual original de M2-B2-P3 — antecedente histórico

1. Utilizar una cuenta propia de prueba creada durante M2-B2-P2; confirmar su correo si el proyecto lo exige. No crear cuentas adicionales ni desactivar confirmación.
2. Con credenciales válidas comprobar una sola solicitud, aceptación de Supabase, mensaje de éxito, sesión observada por AuthProvider, contraseña retirada del formulario y ausencia de redirección o persistencia añadida. La sesión observada no autoriza datos privados ni verifica políticas RLS.
3. Con contraseña incorrecta comprobar mensaje neutral, controles restaurados y reintento explícito sin solicitudes duplicadas. Correo no confirmado: comprobar solo si ya existe un caso propio autorizado, sin generar usuarios artificialmente.
4. Revisar consola, Network, almacenamiento y recarga sin copiar credenciales, cuerpos sensibles ni tokens al informe. La persistencia permanece desactivada y perder la sesión tras recarga es deliberado. No hay renovación automática.
5. Aprobación externa posterior recibida: M2-B2-P3 es el último aprobado. Esta checklist describe la validación del prompt anterior; el resultado actual de M2-B2-P4 se registra a continuación.

Referencia de implementación: [API oficial signInWithPassword](https://supabase.com/docs/reference/javascript/auth-signinwithpassword). No se usan getSession/getUser en el servicio para sustituir la respuesta del login; la consulta de getSession mencionada en pruebas fue exclusivamente una comprobación temporal de no persistencia.

### Verificaciones de M2-B2-P4

| Comprobación | Resultado |
| --- | --- |
| Build, lint y diff check | PASS EJECUTADO; TypeScript/Vite y ESLint sin errores. Permanece advertencia conocida de bundle mayor de 500 kB. |
| Vite | PASS EJECUTADO; servidor local en `http://localhost:5173/`, detenido al finalizar. |
| Diagnóstico controlado | PASS EJECUTADO; 22/22 casos existentes, sin cambios en scripts. |
| Salud real Supabase Auth | PASS EJECUTADO; SERVICIO ACCESIBLE — HTTP 200, salida 0. Primer intento falló por DNS en sandbox; reintento autorizado correcto. No acredita logout real con usuario. |
| Servicio aislado | PASS EJECUTADO con cliente simulado: cliente ausente/excepción de configuración, éxito, red, error retryable, límites por código/HTTP, rechazo Auth, excepción desconocida y respuesta malformada. Scope exactamente local, una llamada y resultados sin datos internos. |
| SDK y AuthProvider | PASS EJECUTADO con SDK instalado y fetch simulado: login → session_present → logout local → SIGNED_OUT observado → formulario restaurado → nueva autenticación. Doble clic y acciones contradictorias no generan solicitudes concurrentes. Preferencias sembradas por la prueba en localStorage/sessionStorage/cookie conservadas, sin almacenamiento manual de la aplicación. |
| Errores del SDK | PASS EJECUTADO con fallo de red y límite simulados: no se declara éxito. El SDK instalado retira la sesión local incluso ante estos errores; la UI respeta el estado observado, sin fingir cierre exitoso ni restaurar sesiones artificialmente. |
| Estados React controlados | PASS EJECUTADO con proveedor de prueba: signed_out, initializing, not_configured y error sin logout; session_present con botón. Rechazo con sesión conservada permite reintento. Respuesta satisfactoria sin cambio observado muestra espera; tras ocho segundos comunica discrepancia y permite reintentar. Confirmación tardía signed_out habilita mensaje de cierre y retira el botón. Estos estados simulados no se presentan como eventos reales del SDK. |
| Teclado y responsive | PASS EJECUTADO: Tab/Shift+Tab, foco visible, activación por Enter/Space. Capturas de LoginPage en montaje controlado revisadas a 320/390/768/1440 px; sesión activa y carga sin scroll horizontal, también con texto al 200 %. No equivale a auditoría WCAG integral. |
| Regresión | PASS EJECUTADO de renderizado de las ocho rutas. Validaciones de login conservadas; servicio loginUser y demás módulos sin modificaciones. No se repitió toda la matriz funcional histórica. |
| Consola y Network | Sin excepciones nuevas en la aplicación durante la matriz final; console.error esperado del SDK por fallo de red simulado. Altas, login y logout de usuarios reales NO EJECUTADOS; pruebas remotas sustituidas por respuestas controladas. Montajes temporales y capturas fuera del repositorio, sin dependencias nuevas. |
| Políticas y JWT | PASS POR INSPECCIÓN: cliente/proveedor intactos; no se añade persistencia, renovación, suscripción o Context. No se afirma revocación instantánea de access tokens: pueden conservar validez hasta expirar. |
| Logout real con cuenta propia | NO EJECUTADO por Codex; responsabilidad del integrante autorizado después de revisar el informe. |

### Corrección M2-B2-P4-C1 — Ajuste de visibilidad de registro e instrucciones según sesión

- **Resultado:** COMPLETADO TÉCNICAMENTE. El enlace de registro y los párrafos introductorios se renderizaban incondicionalmente, aunque el formulario se ocultaba con sesión activa. LoginPage ahora utiliza `!hasSession && state.status !== 'initializing'` para esos elementos; el título cambia a «Tu sesión» con sesión activa. Mantiene «Sesión activa», cierre de sesión y mensajes legítimos de autenticación.
- **Estados comprobados en Chrome con respuestas controladas:** signed_out muestra formulario, instrucciones y enlace; session_present los oculta y conserva logout. initializing oculta enlace e instrucciones; not_configured/error conservan la presentación sin sesión y navegación. SIGNED_IN/SIGNED_OUT emitidos por el SDK ante respuestas simuladas actualizan la presentación; logout en progreso y rechazo con sesión conservada mantienen el enlace oculto. No se probaron transiciones remotas con usuarios reales.
- **Verificaciones técnicas:** build y lint PASS; diagnóstico controlado 22/22 PASS. Vite arrancó tras reintento autorizado por EPERM del sandbox. Permanece la advertencia conocida de bundle mayor de 500 kB. La salud remota de Supabase no se volvió a consultar para esta corrección.
- **Regresión y cierre:** ocho rutas renderizadas correctamente; controles de teclado y presentación a 320/390/768/1440 px y texto al 200 % sin desbordamiento horizontal. Sin excepciones nuevas; console.error esperado del SDK ante red simulada. `git diff --check` PASS; staging vacío. Comparación SHA-256: 51 archivos idénticos al inicio, incluidos los servicios previos, sin altas ni bajas de archivos. Vite detenido al finalizar.
- **Conservación:** solo LoginPage y los dos documentos de continuidad modificados; servicios, AuthProvider/useAuth, controles de concurrencia y política de sesión intactos. Avances locales de M2-B2-P3/P4 conservados; sin dependencias nuevas, staging, commit, push ni actualización remota.
- **Continuidad:** corrección puntual, no cuenta como nuevo prompt funcional. M2 mantiene cinco prompts aprobados; M2-B2-P3 APROBADO; M2-B2-P4 PARCIAL, pendiente de validación externa; M2-B2-P5 previsto, NO EJECUTADO.

**Aprobación externa posterior de M2-B2-P4 y C1, recibida en M2-B2-P5:** el responsable confirmó siete verificaciones manuales satisfactorias después de C1: formulario sin sesión; login real con cuenta autorizada; instrucciones y registro ausentes con sesión; logout real; formulario y registro recuperados tras logout; nuevo login/logout sin recarga; ausencia de errores bloqueantes y conservación de Git. M2-B2-P4 APROBADO; M2-B2-P4-C1 CORRECCIÓN APROBADA dentro de P4, sin incrementar el conteo funcional. Codex no realizó esas pruebas manuales. Las menciones anteriores a pendiente/PARCIAL describen el informe histórico previo a esta aprobación.

### Checklist original de M2-B2-P4 — antecedente histórico, ya aprobado externamente

1. Abrir `/login` e iniciar sesión con una cuenta propia ya confirmada. No crear usuarios adicionales ni compartir contraseñas por chat.
2. Sin recargar la página entre login y logout, comprobar Sesión activa y el botón Cerrar sesión. Pulsar una vez; verificar carga, una petición con scope local y resultado sin errores.
3. Comprobar que AuthProvider observa signed_out, desaparece el botón, se muestra el mensaje de cierre y reaparece el formulario. Autenticarse nuevamente para verificar que el flujo continúa disponible.
4. Revisar consola, Network y almacenamiento sin copiar encabezados, tokens ni cuerpos sensibles al informe. Una recarga puede perder la sesión por la política actual; no sustituye la prueba de logout explícito.
5. Si la operación falla, no exigir que la sesión permanezca: el SDK puede retirarla localmente aun devolviendo error. La UI debe mostrar el fallo sin éxito ficticio y ofrecer reintento solo si el proveedor sigue observando sesión.
6. Comunicar al responsable el resultado; M2-B2-P3 sigue siendo el último aprobado y M2-B2-P4 permanece PARCIAL — PENDIENTE DE VALIDACIÓN MANUAL EXTERNA. M2-B2-P5 no se ejecuta.

Referencia: [signOut y scopes oficiales](https://supabase.com/docs/guides/auth/signout). El scope local limita la operación a la sesión actual; no invalida instantáneamente todos los JWT emitidos.

### Verificaciones históricas de M2-B2-P5 — Revisión y diseño de persistencia de sesión

- **Estado:** DISEÑO ELABORADO — PENDIENTE DE REVISIÓN EXTERNA; no aprobado automáticamente. Documento: [PLAN_PERSISTENCIA_SESION.md](PLAN_PERSISTENCIA_SESION.md), con 16 apartados y matriz de 33 casos futuros NO EJECUTADOS.
- **Auditoría por inspección:** cliente, AuthProvider, hook, tipos, servicios, formularios, main/App, configuración, lockfile y código del SDK. Versiones resueltas e instaladas: supabase-js/auth-js 2.118.0; Node 24.22.0 y npm 11.19.1. Contrastado con documentación oficial de inicialización, Auth/eventos, sesiones, renovación y guía avanzada; sin operaciones reales Auth ni cambios del Dashboard.
- **Configuración vigente:** persistSession false, autoRefreshToken false, detectSessionInUrl false y skipAutoInitialize true. Sin storage, storageKey o flowType propios. SDK usa memoria; flowType efectivo implicit y clave derivada del hostname. La recarga destruye el estado en memoria; no se activó recuperación persistente.
- **Hallazgos y propuesta:** onAuthStateChange puede leer storage y emitir INITIAL_SESSION sin initialize explícito, pero esa ruta no prepara por sí sola renovación/visibilidad. Proponer persistSession true, autoRefreshToken true, detectSessionInUrl false y skipAutoInitialize false, sujetos a aprobación. Revisar proyección de usuario inválido/errores del proveedor y ocultar formulario durante initializing; hoy sigue visible/habilitado aunque C1 oculta instrucciones/enlace. Ningún cambio de código realizado.
- **Diseño:** compara memoria, persistencia oficial SDK, storage personalizado y backend HttpOnly. Riesgos XSS/equipo compartido/JWT, autenticación separada de RLS; pruebas de StrictMode, pestañas, expiración, red y corrupción. Plan mínimo y reversión dirigida sin perder avances ni borrar almacenamiento ajeno. P6 queda condicionado a aprobación, cuentas/entorno autorizados y pruebas de la política real.
- **Verificaciones ejecutadas ahora:** build PASS, lint PASS, diagnóstico controlado 22/22 PASS y diff check PASS; advertencia conocida de bundle mayor de 500 kB. Sin instalación ni modificación de dependencias. No se repitieron navegador/Vite, salud remota ni autenticación real: bloque exclusivamente documental. Los casos propuestos de persistencia no se dan por probados.
- **Git y continuidad:** solo ambos documentos de continuidad modificados y nuevo plan. Todo el código, configuración, servicios locales previos y lockfile conservados; .env.local ignorado. Sin staging, commits, push ni actualización remota. Último aprobado P4; P5 diseño pendiente de revisión; P6 previsto NO EJECUTADO.

**Aprobación externa de M2-B2-P5 recibida en P6:** el responsable revisó y aprobó el diseño técnico y autorizó expresamente la persistencia y renovación oficiales. No corresponde a nuevas pruebas de Codex. P5 APROBADO; siete prompts de M2 aprobados. PLAN_PERSISTENCIA_SESION.md permanece idéntico al diseño entregado, incluida su cabecera histórica, por ser de solo lectura en P6.

### Implementación histórica de M2-B2-P6 — Persistencia y renovación oficiales

- **Estado:** IMPLEMENTADO — PENDIENTE DE VALIDACIÓN MANUAL EXTERNA; no APROBADO. Registro/login/logout y C1 conservan sus aprobaciones anteriores; el nuevo ciclo persistente requiere validación propia.
- **Configuración:** persistSession false → true; autoRefreshToken false → true; skipAutoInitialize true → false; detectSessionInUrl sigue false. Tipos y SDK supabase-js/auth-js 2.118.0 comprobados. Singleton intacto; sin adaptador, clave personalizada, cookies, almacenamiento/refresh propios ni initialize manual.
- **Proveedor:** callback síncrono; INITIAL_SESSION proyecta sesión mínima o signed_out; usuario sin id string no vacío produce error neutral, correo solo si string. SIGNED_OUT retira siempre usuario; eventos posteriores SIGNED_IN/TOKEN_REFRESHED/USER_UPDATED actualizan la proyección. Una captura INITIAL_SESSION tardía no sobrescribe un cambio Auth ya observado. active/unsubscribe conservados bajo StrictMode; no hay API Auth asíncrona dentro del callback.
- **Interfaz:** initializing oculta y deshabilita formulario/registro/logout y muestra «Comprobando tu sesión…»; bloquea también submit programático durante esa fase. Mensaje de persistencia coherente, con recordatorio de cierre en equipos compartidos. Error del proveedor se presenta neutralmente; C1, validaciones, refs, mensajes y discrepancia de cierre conservados. Sin redirecciones.
- **Seguridad y límites:** SDK administra credenciales persistidas; JS del origen puede acceder a ellas, con riesgo XSS aceptado por el diseño. No se almacenan contraseñas ni se exponen tokens en Context/UI/código propio/logs. Logout mantiene scope local y no promete revocación instantánea de JWT. Rutas públicas preliminares, sin autorización RLS contractual ni blockchain.

### Matriz de evidencia de M2-B2-P6 — 33 casos del plan P5

La clasificación se refiere al alcance indicado, no a una aprobación integral del caso remoto. PASS SIMULADO significa ejecución en Chrome con SDK instalado y fetch/tiempo/cliente controlados en perfiles aislados; no se autenticaron usuarios reales. Los montajes del proveedor se transpilaron desde su código real fuera del repositorio y no alteraron producción. PASS EJECUTADO distingue verificaciones técnicas/renderizado sin afirmar autenticación remota. La aprobación funcional corresponde al responsable.

| Caso del plan | Resultado de P6 y alcance real |
| --- | --- |
| 1 Sin sesión | PASS SIMULADO: SDK inicializa sin sesión y habilita formulario. |
| 2 Login satisfactorio | PASS SIMULADO: respuesta controlada, SDK emite SIGNED_IN, guarda sesión y limpia contraseña. Login remoto con nueva política NO EJECUTADO. |
| 3 Recarga inmediata | PASS SIMULADO: navegación completa tras login, restauración sin nueva petición de login. |
| 4 Sesión válida | PASS SIMULADO: SDK lee su storage, vuelve a Sesión activa sin reautenticar. Caso real pendiente. |
| 5 Inicialización lenta | PASS SIMULADO: proveedor real compilado con cliente controlado; espera neutral, campos/formulario ocultos y submit programático bloqueado. |
| 6 Sin parpadeo | PASS SIMULADO: estado initializing sostenido sin formulario visible ni enlace de registro; sesión posterior actualiza presentación. No es medición exhaustiva de cada fotograma de carga remota. |
| 7 Logout local | PASS SIMULADO: una petición scope local, doble clic bloqueado, estado de salida observado. Cierre remoto con persistencia pendiente. |
| 8 Recarga tras logout | PASS SIMULADO: no restaura sesión cerrada en ninguna de las dos pestañas del perfil. |
| 9 Nuevo login | PASS SIMULADO: nuevo login/logout después de cierre y recarga. |
| 10 Expiración access token | PASS SIMULADO: renovación preventiva con sesión sintética corta; reloj de fixture adelantado para rechazo de sesión expirada. Expiración real NO EJECUTADA. |
| 11 Renovación SDK | PASS SIMULADO: temporizador SDK acelerado solo en fixture, pestaña visible y respuesta controlada generan refresh/TOKEN_REFRESHED. RENOVACIÓN REAL AUTOMÁTICA — PENDIENTE DE OBSERVACIÓN. |
| 12 Red temporal | PASS SIMULADO: fallo proactivo de red con token sintético aún vigente, recuperación del fixture y cierre posterior. Sin éxito de cierre ficticio; no se probaron todas las combinaciones offline/expiración remotas. |
| 13 Expirada/revocada | PASS SIMULADO: rechazo de renovación preserva token aún vigente; con reloj adelantado retira sesión expirada y storage SDK. No se revocó ninguna cuenta real. |
| 14 Storage corrupto | PASS SIMULADO: JSON no válido en perfil sintético vuelve a formulario sin crash; proveedor con user ausente/null/id vacío/no string produce error sin usuario inventado. |
| 15 Dos pestañas | PASS SIMULADO: B recupera storage; nuevo SIGNED_IN en A converge en B. Sin sistema propio de sincronización. |
| 16 Logout en pestaña | PASS SIMULADO: B observa SIGNED_OUT sin recargar, ambas siguen desconectadas tras recarga. No garantiza sincronización instantánea en otros navegadores. |
| 17 Cierre total de navegador/reapertura | NO EJECUTADO con sesión activa y mismo perfil después de reiniciar Chrome. Duración de localStorage analizada por inspección; sigue en checklist externa. |
| 18 Sin configuración | PASS SIMULADO: cliente null en montaje del proveedor produce not_configured sin suscripción; validación real de configuración del singleton conservada por inspección. No se modificó .env.local. |
| 19 StrictMode | PASS SIMULADO: doble configuración/cleanup del proveedor real compilado, una suscripción viva, ninguna después de unmount; callback anterior ignorado y singleton real comprobado en recarga. |
| 20 SIGNED_IN | PASS SIMULADO: evento SDK tras respuesta controlada y evento de cliente de prueba; sesión activa sin instrucciones/enlace de registro de la tarjeta. |
| 21 SIGNED_OUT | PASS SIMULADO: SDK real con respuesta simulada y fixture; retira usuario aunque el payload de prueba contenga sesión; INITIAL_SESSION tardío no la resucita. |
| 22 INITIAL_SESSION | PASS SIMULADO: evento SDK tras recarga; fixture null/usuario válido y captura tardía después de login/logout no pisan el cambio más reciente. |
| 23 TOKEN_REFRESHED | PASS SIMULADO: evento SDK con red simulada mantiene sesión y ruta; fixture verifica proyección mínima; USER_UPDATED descarta correo no string. Observación remota pendiente. |
| 24 Ausencia de tokens en UI/consola | PASS POR INSPECCIÓN de src y proyección; ejecución controlada sin excepciones de aplicación ni datos internos propios en UI. SDK puede registrar avisos/errores en fallos simulados; no se volcó su contenido sensible ni Network. No equivale a auditoría de toda telemetría futura. |
| 25 Contraseñas no persistidas | PASS SIMULADO: contraseña sintética ausente del storage SDK, retirada del campo al éxito; src sin almacenamiento manual. Sin lectura/impresión de sesiones reales. |
| 26 Registro conservado | PASS SIMULADO: validación de formulario vacío, aceptación de signUp con respuesta controlada, un envío y limpieza de ambas contraseñas. Servicio/RegisterPage idénticos; no se repitió toda la matriz histórica de rechazos ni alta real. |
| 27 Login conservado | PASS SIMULADO: éxito, una petición ante doble submit, contraseña retirada y sesión observada. Validaciones/contrato de errores preservados por inspección; matriz completa de credenciales incorrectas no repetida en P6. |
| 28 Logout conservado | PASS SIMULADO: scope local, doble clic/exclusión mutua, preferencias ajenas conservadas, salida y nueva recarga. Servicio y manejo de discrepancias/errores anteriores intactos por inspección; no se repitió toda la matriz P4 de errores de logout. |
| 29 Responsive | PASS EJECUTADO: sesión activa a 320/390/768/1440 px y texto 200 % sin desbordamiento; capturas móvil/escritorio revisadas. No auditoría WCAG integral ni repetición completa de teclado/errores históricos. |
| 30 Verificaciones técnicas | PASS EJECUTADO: build, lint, 22/22 diagnóstico controlado, Vite y git diff --check. Salud real de Auth HTTP 200; no prueba login/refresh. |
| 31 Storage bloqueado | PASS SIMULADO: localStorage inaccesible antes de crear cliente, SDK usa memoria y recarga pierde sesión sin inventar persistencia. Bloqueo dinámico después de crear cliente NO EJECUTADO. |
| 32 Refresh y logout concurrentes | PASS SIMULADO: respuesta de refresh retenida, logout bloquea acción y SDK concluye al liberar la respuesta; nueva recarga desconectada. No se provocó una carrera remota ni se manipuló refresh token real. |
| 33 Error de inicialización | PASS SIMULADO: excepción síncrona al suscribir produce error neutral sin initializing permanente, cleanup previo ejecutado. No cubre toda excepción asíncrona posible del storage/SDK; no se añadió initialize manual. |

**Resumen por clasificación principal:** 29 PASS SIMULADO con los alcances anteriores; 2 PASS EJECUTADO (29/30); 1 PASS POR INSPECCIÓN (24); 1 NO EJECUTADO (17); sin FAIL pendientes dentro de los casos ejercitados. Las primeras iteraciones de scripts temporales necesitaron corregir await/importación React, foco de pestaña y liberación de respuestas retenidas; no requirieron cambios de producción adicionales. No se presentan errores del montaje de prueba como fallos de Auth.

**Verificaciones técnicas de este bloque:** build y lint salida 0; 107 módulos compilados, advertencia histórica >500 kB; diagnóstico controlado 22/22. Vite arrancó en 127.0.0.1:5173 tras reintento autorizado por EPERM del sandbox. Salud de Supabase HTTP 200 tras DNS del sandbox y reintento autorizado. Ocho rutas renderizadas (landing/login/registro/panel/borrador/detalle/verificación/404), un main por vista y sin peticiones externas imprevistas; sin excepciones de aplicación en las matrices completadas. SDK puede emitir console.error/warn ante red/rechazo simulados. No se copiaron tokens, contraseñas ni cuerpos de Network. Scripts y capturas en /tmp, sin archivos nuevos de código del proyecto ni dependencias.

**Auditoría final:** comparación SHA-256 con inicio de P6 confirma 50 archivos idénticos y solo cinco archivos autorizados modificados; sin altas ni bajas. Plan P5, servicios Auth, tipos/hook, UI y package/lockfile idénticos. .env.local ignorado/no rastreado. Revisión de patrones sin credenciales reales detectadas; placeholder explícito del diagnóstico existente revisado como dato sintético. Staging vacío, HEAD sin cambios, sin commit/push; Vite detenido al finalizar.

### Checklist externa original de P6 — antecedente, aprobada posteriormente

Usar cuenta propia confirmada existente: abrir login sin sesión previa mediante logout oficial; iniciar sesión, comprobar estado activo; recargar y verificar recuperación sin instrucciones/registro; navegar y volver; cerrar sesión; recargar y confirmar que no reaparece; iniciar de nuevo; abrir segunda pestaña, comprobar restauración/eventos y cierre en ambas; cerrar/reabrir navegador con perfil autorizado y revisar duración esperada. Revisar consola/Network/storage sin copiar valores sensibles. Observar renovación automática real cuando corresponda, sin modificar TTL ni manipular refresh tokens. Terminar con logout oficial en el equipo compartido.

RENOVACIÓN REAL AUTOMÁTICA — PENDIENTE DE OBSERVACIÓN. PRUEBAS FUNCIONALES REALES DE P6 — NO EJECUTADAS EN CODEX; las aprobaciones anteriores de registro/login/logout no aprueban por sí solas la nueva persistencia. RLS/autorización de datos y rutas protegidas permanecen fuera del bloque.

**Aprobación externa posterior de M2-B2-P6 recibida en P7:** el responsable confirmó quince comprobaciones manuales satisfactorias con persistencia real: login, recuperación tras recarga, inicialización visual, navegación, segunda pestaña, logout y comportamiento entre pestañas, recarga tras cierre, nuevo login, cierre/reapertura de navegador, ausencia de sesiones residuales, almacenamiento, ausencia de errores inesperados y regresión/Git. M2-B2-P6 APROBADO; registro, login, logout y persistencia APROBADOS. Codex no ejecutó esas pruebas manuales. Renovación automática habilitada y probada mediante simulaciones; **observación de renovación real pendiente**. Las referencias anteriores a pendiente o NO EJECUTADO describen la evidencia histórica de Codex y no se sustituyen por pruebas propias nuevas.

### Registro histórico de M2-B2-P7 — Diseño de protección de rutas y autorización

- **Estado:** DISEÑO ELABORADO — PENDIENTE DE REVISIÓN EXTERNA; no APROBADO. Nuevo documento [PLAN_PROTECCION_RUTAS.md](PLAN_PROTECCION_RUTAS.md), veinte apartados, inventario de ocho rutas, cinco estados Auth, matriz conceptual de seis actores/nueve operaciones, amenazas y 35 escenarios futuros NO EJECUTADOS.
- **Auditoría por inspección:** App declara BrowserRouter/Routes con ocho hojas bajo AppLayout y su Outlet; main monta AuthProvider bajo StrictMode por encima del router. Encabezado con Inicio/Verificar/Login/Registro, enlaces de páginas y 404 conservados. React Router 7.18.4 instalado contrastado con documentación oficial y sus exports/implementación locales. No hay guards ni consultas privadas contractuales.
- **Diseño propuesto:** Route sin path con RequireAuth usando solo useAuth/useLocation, Outlet con session_present, Navigate/replace a login solo con signed_out. initializing no monta contenido ni redirige; error/not_configured bloquean vista con aviso y enlaces públicos. Solo se propone proteger panel/crear/detalle; resto público, incluido login para conservar acceso al logout existente. P8 no añade botón de logout al encabezado por inferencia.
- **Navegación:** retorno mediante history state tratado como unknown, solo pathname interno permitido, sin query/hash ni returnTo. Allowlist conservadora de tres rutas; rechazar esquemas, //, backslash, codificaciones, destinos desconocidos o login en bucle. Solo retornar tras login satisfactorio y sesión observada; visita directa a login mantiene presentación actual. Definidos acceso directo, recarga, historial, pestañas, logout, foco y borrador local.
- **Autorización futura:** guard no protege PostgreSQL. Contrato ajeno exige pertenencia y permisos servidor/RLS; auth.uid vinculado al sujeto aceptado por backend, no al formulario. Matriz distingue interfaz, verificación adicional, denegado y no definido; firma/aceptación/visibilidad de invitación pendientes. No hay SQL, tablas, políticas ni permisos ficticios implementados. 401/403/404 y respuesta sin revelar existencia diferenciados conceptualmente.
- **Plan P8:** nuevo RequireAuth, App y ajuste acotado LoginPage; UI/layout/servicios/proveedor sin cambios previstos. Validación de destinos compartida sin dependencias, pruebas de cinco estados/35 escenarios y reversión solo del delta P8 conservando persistencia P6. Ningún guard ni prueba de guard ejecutados en P7.
- **Verificaciones ejecutadas en P7:** build PASS, lint PASS, diagnóstico controlado 22/22 PASS y git diff --check PASS. Bundle >500 kB es advertencia conocida. No se arrancó Vite, no se usaron cuentas reales ni se hicieron consultas de salud o SQL durante este bloque documental.
- **Git:** código/configuración, servicios locales y plan P5 idénticos al inicio; solo ambos documentos modificados y nuevo plan de rutas. Auditoría SHA-256: 53 archivos anteriores idénticos; sin bajas ni otros archivos nuevos. .env.local ignorado/no rastreado; revisión de patrones sin credenciales reales detectadas (placeholder sintético previo del diagnóstico revisado). Sin nuevas dependencias, staging, commits, push ni actualización remota. Último aprobado P6; siguiente P8 PREVISTO — NO EJECUTADO.

**Aprobación externa de P7 recibida en P8:** el responsable revisó y aprobó el diseño de RequireAuth, las tres rutas privadas/cinco públicas, los cinco estados Auth, las redirecciones seguras, la separación Auth/RLS y la matriz de 35 pruebas futuras. M2-B2-P7 APROBADO por revisión externa del diseño; no se atribuye a implementación ni pruebas nuevas de Codex. Nueve prompts M2 aprobados; C1 incluida en P4. Plan P7 de solo lectura preservado, incluida su cabecera histórica.

### M2-B2-P8 — Implementación controlada de rutas protegidas

- **Estado actual:** APROBADO por catorce comprobaciones manuales externas del responsable comunicadas en P9. Las verificaciones y la lista que siguen registran la implementación histórica P8, no nuevas pruebas P9. Último aprobado P8; último ejecutado P9; auditoría pendiente de aprobación externa.
- **Implementación:** RequireAuth nuevo utiliza useAuth/useLocation y devuelve Outlet solo con session_present. Route padre sin path en App agrupa panel/crear/detalle; públicas y 404 fuera. initializing no monta hijos ni redirige; signed_out usa Navigate/replace a login; error/not_configured muestran aviso neutral y enlaces públicos. Sin segundo main, cliente o suscripción.
- **Retorno:** función pura getSafeReturnPath compartida desde el único archivo nuevo; admite /panel y /contratos/segmento ASCII alfanumérico/guion/guion bajo de 1–120 caracteres, incluido nuevo. Sin ids reales de base de datos definidos; no se presupone UUID ni participación. Rechaza tipos inesperados, esquemas, controles/espacios, backslash, query/hash, percent-encoding, puntos y destinos fuera del conjunto. Solo guarda pathname mediante state { from: string }; no escribe storage.
- **LoginPage:** returnPath validado y efecto con dependencias primitivas/ref por location.key; replace y state null consumen intención una vez. Espera sesión observada y fin de operaciones; respuesta de servicio sin session_present no basta. Login directo o destino inválido conservan sesión/logout sin redirección automática ni fallback arbitrario. Si ya hay sesión observada e intención válida, puede retornar sin otro login, como autoriza P8. Resultados de error o logout no disparan retorno.
- **Concreciones autorizadas de P8 respecto al plan:** state.from string equivalente a la estructura conceptual; destino inválido permanece en login en vez del fallback a panel descrito como propuesta en P7. P8 permite retorno con sesión ya activa. Los planes aprobados permanecen intactos; no se cambia su texto histórico.
- **Accesibilidad y cambio de cuenta:** foco en main existente al llegar a login o cambiar ubicación/estado del guard, sin segundo main ni foco repetido por refresh con mismo estado. Mensajes status/alert y enlaces operables. Outlet con key de user.id desmonta estado local al cambiar cuenta; no guarda borradores entre usuarios. Páginas privadas y UI compartida intactas.
- **Límites:** solo protección visual/navegación; detalle sigue placeholder de id no verificado. Sin consultas privadas, permisos de contratos, roles, RLS, tablas, backend ni blockchain. Servicios registro/login/logout y política persistente P6 intactos; logout local, renovación real todavía pendiente de observación.

### Matriz de evidencia P8 — 35 escenarios del plan P7

Clasificación principal y alcance por caso. PASS SIMULADO es ejecución en Chrome con SDK/respuestas Auth controladas o contexto Auth de prueba; no prueba una cuenta remota. PASS EJECUTADO identifica navegador/renderizado/checks sin atribuir autenticación real. Los montajes usan RequireAuth/LoginPage y router reales en StrictMode; las páginas privadas de prueba permiten contar renders para distinguir desmontaje real de ocultación CSS. No se modificó producción para simular Auth.

| Caso P7 | Resultado y alcance de P8 |
| --- | --- |
| 1 Landing | PASS EJECUTADO: / pública sin sesión, título y un main; no redirección. |
| 2 Login público | PASS EJECUTADO: /login sin sesión accesible; foco en main y formulario conservado. |
| 3 Registro público | PASS EJECUTADO: /registro sin sesión accesible. Flujo de registro controlado adicional en caso 30. |
| 4 Verificación pública | PASS EJECUTADO: /verificar sin sesión conserva interfaz preliminar; no hashing nuevo. |
| 5 Panel sin sesión | PASS SIMULADO: acceso directo a /panel acaba en login sin contenido de Dashboard; state.from exacto. |
| 6 Crear sin sesión | PASS SIMULADO: /contratos/nuevo no muestra formulario y transporta pathname a login. |
| 7 Detalle sin sesión | PASS SIMULADO: /contratos/ref_123 no muestra detalle sin sesión; retorno válido al placeholder tras autenticación controlada. |
| 8 URL directa | PASS SIMULADO: navegación completa del navegador a las tres privadas, sin depender de enlaces previos. Hosting de producción no evaluado. |
| 9 Recarga privada | PASS SIMULADO: tras login y retorno, recarga de cada privada mantiene URL/página por sesión SDK persistida, sin nueva solicitud de login. |
| 10 Inicialización lenta | PASS SIMULADO: initializing sostenido en /panel muestra status, no redirige ni renderiza hijo privado. |
| 11 Sesión persistida | PASS SIMULADO: recarga y segunda pestaña recuperan sesión generada por SDK ante respuesta controlada. Validación con cuenta real de P8 NO EJECUTADA. |
| 12 Sesión ausente | PASS SIMULADO: signed_out reemplaza por login; ninguna página privada montada en fixture. |
| 13 Sesión malformada | PASS SIMULADO: contexto error bloquea contenido y muestra aviso; defensa user/id del proveedor P6 intacta por inspección. No se corrompieron sesiones reales. |
| 14 not_configured | PASS SIMULADO: aviso y enlaces públicos, misma URL privada sin bucle ni montaje de hijos. Configuración privada del equipo no alterada. |
| 15 error | PASS SIMULADO: aviso neutral, sin usuario inventado, sin salida automática ni redirect repetido. |
| 16 Login directo | PASS SIMULADO: entrada sin from válido conserva /login, sesión activa y logout tras respuesta satisfactoria. No fallback al panel. |
| 17 Login tras guard | PASS SIMULADO: retorno a cada una de las tres privadas después de login; rechazo/reintento con intención conservada en fixture. |
| 18 Destino original | PASS SIMULADO: state {from:string} con pathname; replace y state null al llegar. Query/hash descartados al guardar intención. |
| 19 Open redirects | PASS SIMULADO de LoginPage: 16 estados/destinos inesperados no navegan aun con sesión; tres destinos seguros completan retorno. Además PASS EJECUTADO del validador real aislado: 5 aceptados y 45 rechazados, incluidos controles, esquemas, //, backslash, puntos, encoding, query/hash, tipos y longitud. |
| 20 Logout mientras privada | PASS SIMULADO: cerrar desde /login en otra pestaña retira la página privada y redirige; sin botón nuevo ni signOut adicional del guard. |
| 21 Otra pestaña | PASS SIMULADO: B abre panel con sesión compartida; SIGNED_OUT retira privada, recarga sigue bloqueada; nuevo SIGNED_IN permite a B completar intención válida. No garantía de sincronía instantánea en otros navegadores. |
| 22 Expiración | PASS SIMULADO de estados representativos: session_present mantiene, error/signed_out retiran rama. No se provocó una caducidad remota ni se observó renovación automática real en P8. |
| 23 Historial | PASS SIMULADO del flujo replace/state consumido; atrás/adelante entre inicio y panel ejecutado en Chrome sin bucle. Revisión exhaustiva de bfcache y todos los historiales reales NO EJECUTADA. |
| 24 404 | PASS EJECUTADO: ruta desconocida sin sesión queda en 404 pública. Con sesión conservada fuera del guard por inspección de App; no hay nueva consulta de existencia de contrato. |
| 25 StrictMode | PASS SIMULADO: guard/LoginPage en MemoryRouter/Context reales de prueba bajo StrictMode, transiciones/retornos sin bucles. Guard sin nuevos clientes/suscripciones por inspección; AuthProvider permanece idéntico, no se repite toda su matriz P6. |
| 26 Sin parpadeo privado | PASS SIMULADO: contador de renders privado cero en initializing/not_configured/error/signed_out; con sesión aparece y al salir se desmonta. No solo ocultación CSS. |
| 27 Teclado/foco | PASS EJECUTADO: foco en main tras redirects reales del router; enlaces del aviso con Tab/Shift+Tab/Enter, foco visible y salida a ruta pública. Etiquetas/ARIA/handlers de login intactos. No auditoría WCAG integral. |
| 28 Responsive | PASS EJECUTADO: initializing/not_configured/error a 320/390/768/1440 y texto 200 %, sin desbordamiento respecto al ancho útil; capturas móvil/escritorio revisadas. No se repite toda la matriz histórica de formularios. |
| 29 Técnica | PASS EJECUTADO: build/lint, 22/22 diagnóstico, Vite y diff check. Salud Auth HTTP 200 tras reintento autorizado por DNS. |
| 30 Regresión Auth | PASS SIMULADO: login único ante doble envío, retorno, recarga persistente y logout local en cada privada; registro público validado/aceptado con una solicitud y contraseña retirada mediante respuesta controlada. Servicios/handlers idénticos; no se repitieron todas las respuestas históricas de error ni altas/logins reales. |
| 31 Estado cambia durante login | PASS SIMULADO: servicio exitoso con signed_out no navega; login retenido, estado cambia a error, respuesta tardía no navega; signed_out posterior tampoco. Solo sesión observada permite retorno. |
| 32 Cambio de cuenta | PASS SIMULADO: borrador de usuario A desaparece al cambiar user.id a B; Outlet por usuario reinicia estado local sin modificar CreateContractPage. |
| 33 Contrato ajeno/API | PASS POR INSPECCIÓN: detalle conserva placeholder y no hay nuevas consultas ni permisos por id. Pruebas reales de denegación API/RLS NO EJECUTADAS: esa capa no existe y no se implementa en P8. |
| 34 Usuario actualizado/refresh | PASS SIMULADO: misma cuenta con correo actualizado conserva ruta/borrador; nuevo objeto de sesión con mismo estado no genera redirect. Eventos reales del SDK se observan solo indirectamente a través del proveedor; refresh remoto nuevo NO EJECUTADO. |
| 35 Intención tras recarga | PASS SIMULADO: Chrome conserva history state al recargar login y se retorna tras autenticar; al abrir login sin intención se permanece allí. No se persiste destino en storage ni se garantiza history state en otros navegadores. |

**Clasificación principal:** 8 PASS EJECUTADO (1–4, 24, 27–29), 26 PASS SIMULADO (restantes excepto 33) y 1 PASS POR INSPECCIÓN (33). Sin FAIL pendientes en los subcasos ejercitados. **NO EJECUTADO:** validación real P8 con cuenta autorizada, renovación/caducidad real, bfcache exhaustivo, capa API/RLS contractual y aspectos adicionales señalados por fila. La clasificación no convierte una simulación parcial en prueba remota completa.

Primeras iteraciones de los scripts temporales necesitaron distinguir una entrada nueva de login de una recarga que preserva history state, devolver booleanos al CDP en vez de nodos y seleccionar los enlaces del aviso en lugar del encabezado para teclado. No exigieron cambios de producción después de los checks iniciales. Scripts/capturas en /tmp; sin bibliotecas añadidas ni archivos de prueba nuevos dentro del repositorio.

**Auditoría final P8:** comparación SHA-256 confirma 52 archivos previos idénticos; delta limitado a App/LoginPage y ambos documentos, más RequireAuth nuevo. Sin bajas. Cliente/AuthProvider/servicios/planes/UI/páginas privadas/package/lockfile conservados; handlers login/logout idénticos. .env.local ignorado y no rastreado; revisión de patrones sin credenciales reales detectadas (placeholder sintético previo revisado). main y HEAD 0e23f15039802537ee2708120526d797a8acae59 conservados; staging vacío, sin commit/push ni actualización remota.

### Verificaciones técnicas históricas P8 y lista externa posteriormente aprobada

Build y lint salida 0; 108 módulos compilados y advertencia histórica de bundle >500 kB. Diagnóstico controlado 22/22 PASS. Vite arrancó tras reintento autorizado por EPERM de sandbox: eligió 5174 porque 5173 estaba ocupado; se detuvo la instancia iniciada por este bloque. Las pruebas de navegador usaron el servidor ya disponible en 5173, que sirvió App/RequireAuth/LoginPage actuales y permitió verificar los cambios. Salud real Auth HTTP 200 tras reintento por DNS. Sin excepciones de aplicación en matrices de navegador completadas ni peticiones externas imprevistas; solicitudes Auth de cuentas interceptadas. Respuesta de rechazo controlada permite comprobar mensaje y reintento. Sin volcar tokens, valores del entorno, contraseñas reales ni cuerpos sensibles de Network.

Responsable validará P8, sin cuentas nuevas automáticas:

1. Mediante logout oficial dejar sesión ausente; abrir directamente panel/crear/detalle y comprobar login sin contenido privado previo. Revisar también las cinco públicas.
2. Desde intento privado, usar cuenta propia confirmada, comprobar retorno al destino, foco y ausencia de bucles. Abrir login directamente sin intención y confirmar que mantiene logout disponible.
3. Recargar ruta privada con sesión, comprobar espera neutral y recuperación; borrador sigue siendo local y no persiste.
4. Ir a login y cerrar sesión; repetir acceso privado y recarga, sin sesión residual. En segunda pestaña comprobar retirada de privada cuando SDK comunique salida y tras recarga.
5. Revisar consola/Network sin divulgar secretos; destinos maliciosos se verificaron con cadenas de prueba, sin abrir sitios externos ni ejecutar sus esquemas.
6. La solicitud histórica era comunicar aprobación o defectos. El responsable confirmó después catorce comprobaciones satisfactorias y aprobó P8 en el prompt P9. Codex no ejecutó esas pruebas reales. Renovación real sigue pendiente de observación; P9 ya está elaborado, pendiente de aprobación externa y con recomendación correctiva F-01.

### M2-B2-P9 — Auditoría actual

- **Estado:** AUDITORÍA ELABORADA — PENDIENTE DE APROBACIÓN EXTERNA. Informe de 27 secciones: [AUDITORIA_AUTH_NAVEGACION_M2_B2.md](AUDITORIA_AUTH_NAVEGACION_M2_B2.md).
- **Aprobación recibida:** P8 APROBADO por catorce pruebas manuales del responsable sobre públicas/privadas, retorno, persistencia, logout, segunda pestaña, historial, accesibilidad/responsive y regresión/Git. No atribuidas a Codex.
- **Hallazgo F-01 MEDIO:** logout confirmado en A, login posterior en B, A conserva logoutResult success y muestra espera ocho segundos y discrepancia falsa. Reproducido con SDK real y red sintética. Corrección recomendada antes de cierre; no se modificó LoginPage. Sin hallazgos críticos/altos demostrados.
- **Pruebas nuevas:** build/lint correctos; diagnóstico controlado 22/22; salud Auth HTTP 200 tras reintento autorizado por DNS; 50 entradas del validador real; cinco públicas y tres privadas con retorno/recarga/logout; guard/proveedor bajo estados y eventos controlados, StrictMode/cleanup; registro sintético; teclado y 320/390/768/1440 px con texto 200 %. F-01 clasificado FAIL. Evidencia detallada y límites en el informe.
- **Histórico separado:** P6 quince comprobaciones externas; P8 35 casos históricos (8 ejecutados, 26 simulados, 1 inspección) y catorce externos. No contados como nuevas pruebas P9.
- **Veredicto:** REQUIERE CORRECCIÓN F-01; propuesta P9-C1 no ejecutada. I-01 renovación real pendiente, I-02 RLS futura e I-03 bundle 544,11 kB informativos. M2-B2 permanece abierto hasta revisión externa.
- **Git:** main y HEAD conocidos intactos, staging vacío. Solo dos documentos de continuidad modificados y auditoría nueva por P9; código/planes/dependencias preservados. Sin staging, commit, push ni sincronización. `.env.local` ignorado y no rastreado.

## 6. Problemas, advertencias y tareas pendientes

- **Cierre funcional del frontend:** M1-B8-P1 y el Módulo 1 fueron aprobados externamente tras 22 comprobaciones manuales satisfactorias. Codex no repitió esas pruebas en su entorno sin navegador.
- **Advertencia conocida:** ESLint 9.39.5 fue reportado fuera de soporte; no se migró de versión.
- **Advertencia npm previa:** autorización de scripts de esbuild pendiente de revisión; no impidió las últimas comprobaciones técnicas.
- **Tareas pendientes:** revisar auditoría P9 y autorizar correctivo de F-01 (resultado de logout anterior contamina una nueva sesión de otra pestaña). No cerrar M2-B2 todavía. Renovación automática real pendiente de observación. RLS/base de datos contractual y Stellar/Soroban pendientes; reescrituras de hosting pendientes de despliegue.
- **Advertencia Vite:** bundle mayor de 500 kB; build correcto, sin cambiar configuración ni dependencias para silenciarlo.
- Los errores de permisos de instalaciones anteriores fueron resueltos y no se consideran bloqueos actuales.

## 7. Estado de Git y publicación

- **Rama:** `main`; **origin:** `https://github.com/Lilarpo/acuerdoseguro`.
- **Commit inicial publicado y verificado:** `10bc0ca12af399a0cdc098584894554b11eaf4c0`, mensaje `chore: inicializar base técnica de AcuerdoSeguro M0`.
- **Cierre del Módulo 0 publicado:** `4efefc6327751993459a27d81202533e4b3a5fc9`; conservado como antecesor del relevo.
- **Entrega del Módulo 1:** sistema visual, siete componentes UI con exportaciones, AppLayout, rutas, HomePage definitiva, placeholders, 404, React Router y lockfile, estilos y ambos documentos. Son 19 archivos de avance: siete modificados y doce nuevos respecto al cierre del Módulo 0; los seis `.gitkeep` se conservan.
- **Commit del relevo intermedio de M1:** `987ae95f95573fd8ad5c0efb6e46ec8dfca9fe92`, mensaje `feat: guardar avance frontend M1 y preparar relevo`.
- **Remoto:** repositorio público, con publicación pública expresamente autorizada por el responsable desde M0-B6-P1. En este relevo se consultó `origin/main`: sin divergencia respecto al HEAD previo; publicación normal, sin force push.
- **Base anterior a PUBLICACIÓN-RELEVO-M1:** `main`, HEAD y `origin/main` coincidían en `987ae95f95573fd8ad5c0efb6e46ec8dfca9fe92` antes de preparar la entrega. Ese hash es histórico, no el resultado del relevo actual.
- **Publicación final de M1:** PUBLICACIÓN-RELEVO-M1 reunió las interfaces de login, registro, panel, creación y revisión local, detalle y verificación visual, la integración de rutas y estos dos documentos. El push se verificó en `origin/main` con `353e73706d343bd56fede23cd97f6c77fc2865d4`; INCORPORACIÓN-RELEVO-M1 volvió a confirmar ese hash directamente en GitHub.
- **Preparación de PUBLICACIÓN-RELEVO-M2-01:** trabajo aprobado de M2-B1-P1, M2-B1-P2 y M2-B2-P1 sobre `353e737`: SDK, lockfile, cliente, dos scripts de diagnóstico, arquitectura Auth, integración en `main.tsx` y continuidad. La publicación posterior se confirmó durante la incorporación: `93c356f8bb03da1352950067faee7a17239e06af`, mensaje `feat(supabase): preparar integracion y arquitectura auth M2`. `.env.local` está presente e ignorado por `.gitignore`.
- **Entrega preparada en PUBLICACIÓN-RELEVO-M2-02:** exclusivamente el servicio nuevo `src/services/supabase/registerUser.ts`, RegisterPage y ambos documentos de continuidad sobre `93c356f8bb03da1352950067faee7a17239e06af`. Cliente, AuthProvider, rutas, UI, dependencias y `.env.local` conservados.
- **Commit autorizado:** `feat(auth): implementar registro real Supabase M2-B2-P2`. Esta documentación forma parte del commit; su hash y publicación efectiva se verifican en Git y en el informe final posterior al push. No se presupone el resultado de publicación en esta nota.
- **Publicación de registro confirmada:** HEAD y origin/main al iniciar M2-B2-P3 coinciden en `0e23f15039802537ee2708120526d797a8acae59`, commit `feat(auth): implementar registro real Supabase M2-B2-P2`, cuyo push se verificó en el relevo anterior.
- **M2-B2-P3 local:** únicamente loginUser.ts nuevo, LoginPage y ambos documentos. Sin staging, commit ni push; cliente, AuthProvider, registro, otras páginas, dependencias y configuración conservados.
- **M2-B2-P4 local:** logoutUser.ts nuevo; adaptaciones exclusivamente en LoginPage y ambos documentos. Los cuatro archivos del prompt anterior se conservan y loginUser.ts permanece idéntico al inicio. Sin staging, commit ni push.
- **M2-B2-P5 local:** nuevo PLAN_PERSISTENCIA_SESION.md y actualización de ambos documentos; ningún cambio de código ni publicación. P3/P4/C1 aprobados y preservados localmente.
- **M2-B2-P6 local:** únicamente opciones del cliente, defensa/ciclo de eventos de AuthProvider, presentación de LoginPage y ambos documentos. Plan P5 y servicios anteriores intactos. Sin archivos de código nuevos, staging, commit ni push.
- **M2-B2-P7 local:** nuevo PLAN_PROTECCION_RUTAS.md y actualización de ambos documentos de continuidad; todo el código y avances P3/P4/C1/P5/P6 preservados, sin publicación.
- **M2-B2-P9 local:** nuevo informe de auditoría y dos documentos de continuidad; código/planes intactos, sin staging/commit/push.
- **M2-B2-P8 local:** RequireAuth.tsx nuevo, App/LoginPage y ambos documentos modificados; servicios, AuthProvider, cliente, planes y páginas privadas conservados. Sin staging/commit/push.
- **Exclusiones:** dependencias, compilaciones, entornos privados y temporales ignorados; `.env.example` y los seis `.gitkeep` permitidos según M0-B3-P1.
- CIERRE-DOC-M1 no autorizó una publicación. PUBLICACIÓN-RELEVO-M1 es la autorización operativa separada para un commit y un push normales, sujetos a sus controles previos.

## 8. Continuidad operativa actual

- M0 COMPLETADO; M1 COMPLETADO, APROBADO Y PUBLICADO; M2-B1 COMPLETADO Y APROBADO (2/2); M2-B2-P1–P8 APROBADOS y P4-C1 CORRECCIÓN APROBADA incluida en P4. Diez prompts de M2 aprobados.
- **Último aprobado:** M2-B2-P8. El responsable confirmó catorce comprobaciones manuales satisfactorias; Codex no ejecutó esas pruebas reales.
- **Último ejecutado:** M2-B2-P9. **AUDITORÍA ELABORADA — PENDIENTE DE APROBACIÓN EXTERNA. Veredicto: REQUIERE CORRECCIÓN antes del cierre.**
- Leer [AUDITORIA_AUTH_NAVEGACION_M2_B2.md](AUDITORIA_AUTH_NAVEGACION_M2_B2.md): F-01 MEDIO reproduce espera/error falso de logout al recibir una sesión posterior desde otra pestaña. Propuesto P9-C1 para corregir el ciclo de resultado; no ejecutado ni autorizado por esta auditoría.
- Registro, login, logout y persistencia reales APROBADOS; rutas protegidas IMPLEMENTADAS Y APROBADAS. **RENOVACIÓN AUTOMÁTICA REAL — OBSERVACIÓN PENDIENTE.**
- **Próximo bloque:** M2-B3-P1 — Diseño del modelo de datos y seguridad RLS de contratos, PROPUESTO — NO EJECUTADO; confirmar después de corrección y aprobación externa del cierre. No hay autorización para avanzar.
- Conservar los avances locales: GitHub solo tiene publicado hasta P2 en el HEAD conocido; clonar no recupera por sí solo P3–P9. No sincronizar ni publicar sin autorización. Código, planes y dependencias intactos en P9; solo informe nuevo y dos documentos actualizados.

## 9. Indicaciones para el siguiente integrante

1. Abre el repositorio en VS Code y confirma la raíz, rama y remoto correctos.
2. Lee `AGENTS.md`, este documento y, cuando sea necesario, `docs/HISTORIAL_PROMPTS.md`.
3. Revisa Git y preserva los cambios locales antes de cualquier sincronización autorizada.
4. Consulta `git ls-remote --heads origin main` y compara su hash con el commit de relevo informado; conserva cualquier cambio local antes de sincronizar.
5. Comprueba Node.js con `.nvmrc` y las dependencias; usa npm y el lockfile para instalar cuando corresponda.
6. Ejecuta las pruebas pertinentes y contrasta sus resultados con el código real, sin confiar ciegamente en este estado.
7. Continúa únicamente desde el siguiente prompt autorizado.
8. Obtén acceso autorizado al mismo proyecto Supabase de desarrollo desde el dashboard, sin utilizar la cuenta personal del responsable. Configura tu propio `.env.local` desde `.env.example` con `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY`; no guardes contraseñas, claves secretas, `service_role` ni tokens administrativos en el frontend o Git.
9. Ejecuta `npm run supabase:check`, `npm run supabase:check:test`, `npm run build`, `npm run lint` y `npm run dev`; verifica las rutas y Git. No presupongas usuarios, sesiones persistentes, tablas, migraciones, RLS, Stellar o Soroban. M2-B2-P1–P8 y C1 están aprobados; lee la auditoría P9 y espera autorización del correctivo propuesto de F-01 y revisión externa, sin añadir consultas, roles ni RLS por iniciativa propia.

## 10. Registro del relevo al terminar cada turno

Actualiza este estado y el historial con: último prompt trabajado y aprobación, capacidades completadas, trabajo incompleto, pruebas y resultados, errores pendientes, cambios locales sin publicar, último commit publicado si existe, próximo prompt autorizado e instrucciones indispensables para continuar.

Si se agota la disponibilidad durante una tarea, registra PARCIAL o BLOQUEADO según la situación real y conserva el trabajo incompleto. No lo marques automáticamente como implementado ni aprobado. Evita datos personales y no hagas el relevo remoto sin autorización.

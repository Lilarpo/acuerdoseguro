# M2-B2-P7 — Diseño de protección de rutas y autorización

**Estado:** DISEÑO ELABORADO — PENDIENTE DE REVISIÓN EXTERNA.
**Fecha:** 2026-10-17. **Siguiente:** M2-B2-P8 — Implementación controlada de rutas protegidas, PREVISTO — NO EJECUTADO.

Este documento propone decisiones para revisión. No implementa guards, navegación nueva, permisos, consultas ni SQL. Las pruebas de P8 indicadas aquí NO SE HAN EJECUTADO.

## 1. Contexto del proyecto

AcuerdoSeguro es una SPA React/TypeScript con Vite, Tailwind y Supabase Auth. M0 completado; M1 completado, aprobado y publicado; M2-B1 aprobado. Código inspeccionado: React 19.3.1, React Router 7.18.4 y supabase-js 2.118.0 instalados. main conserva HEAD `0e23f15039802537ee2708120526d797a8acae59`, último publicado conocido hasta P2; avances P3/P4/C1/P5/P6 aprobados permanecen locales y no se publican en P7.

Se inspeccionaron App, main, AuthProvider/tipos/contexto/hook/cliente, páginas, AppLayout, navegación y documentos de continuidad. Las conclusiones sobre comportamiento actual son por inspección del código; el diseño futuro no equivale a funcionalidad probada. Las decisiones de negocio pendientes se señalan expresamente.

## 2. Estado actual de autenticación

P1–P6 aprobados, con C1 incluida en P4. El responsable confirma en P7 quince comprobaciones manuales satisfactorias de P6: login, persistencia tras recarga, inicialización visual, navegación, segunda pestaña, cierre/sincronización, recarga sin sesión residual, nuevo login, cierre/reapertura de navegador, almacenamiento, ausencia de errores y regresión/Git. Son comprobaciones externas, no de Codex.

Cliente singleton en `src/lib/supabaseClient.ts`: persistSession true, autoRefreshToken true, detectSessionInUrl false y skipAutoInitialize false. SDK gestiona almacenamiento y renovación; no hay adaptador, cookies ni refresh propio. Renovación automática habilitada y probada mediante simulaciones; **observación de renovación con tokens reales pendiente**, incluso después de aprobar P6.

AuthProvider bajo StrictMode observa INITIAL_SESSION, SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED y USER_UPDATED; valida id mínimo y proyecta solo id/correo string. Cancela suscripción e ignora callbacks de un montaje retirado y capturas iniciales tardías tras un cambio observado. useAuth devuelve state, user y hasSession derivado; guard futuro consume únicamente ese contrato. No es una fuente de autorización de contratos.

## 3. Inventario de rutas

Todas las rutas son públicas actualmente y comparten AppLayout. No existe guard ni consulta privada de contratos.

| Ruta / componente | Finalidad actual | Implementación actual | Visibilidad propuesta | Motivo | Sin sesión en P8 | Con sesión en P8 | Autorización de datos futura | ¿Cambio P8? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` — HomePage | Presentar plataforma, proceso y límites | Landing aprobada; enlaces registro/verificar y ancla cómo funciona | Pública | Información de acceso general, sin datos personales | Mostrar | Mostrar | No requiere acceso a contratos | No |
| `/login` — LoginPage | Login, sesión activa y logout local | Auth real y persistencia aprobados; sin redirección automática | Pública | Debe funcionar sin sesión y permitir cierre con sesión | Formulario tras initializing | Sesión activa/logout; retorno condicional solo si procede | SDK Auth; no contrato concreto | Sí, únicamente retorno seguro si se aprueba |
| `/registro` — RegisterPage | Alta de cuenta | signUp aprobado, validaciones y posible confirmación de correo | Pública | Acceso previo al login | Mantener formulario | Mantener comportamiento aprobado, sin expulsión automática | Reglas de Auth; no permisos contractuales | No |
| `/panel` — DashboardPage | Futuro espacio de acuerdos de la cuenta | Vista preliminar, datos vacíos, enlaces a crear/verificar | Privada | Su finalidad es personal, aunque hoy no consulta cuentas | Login controlado tras signed_out | Renderizar vista preliminar | Listado futuro solo de acuerdos autorizados por servidor | Sí, anidarla bajo guard |
| `/contratos/nuevo` — CreateContractPage | Preparar/validar/revisar borrador | Siete campos en memoria; ContractDraftReview; no guarda | Privada | Texto contractual y participantes; asociar futuro borrador a cuenta | Login antes de montar formulario | Mismo flujo local, sin escritura remota | Creación/propiedad y cambios de borrador requieren reglas servidor | Sí, anidarla bajo guard |
| `/contratos/:id` — ContractDetailPage | Futuro detalle y evidencia | Referencia URL no verificada, recortada a 120 caracteres; secciones sin datos | Privada | Futuro contenido sensible; id no concede permiso | Login antes de montar detalle | Solo vista preliminar actual | Participación real y permiso de lectura deben comprobarse con RLS | Sí, solo guard de sesión, sin consulta |
| `/verificar` — VerifyDocumentPage | Herramienta de verificación prevista | Selección de archivo y validación de formato SHA-256; no lee/sube/calcula | Pública | Entrada general sin exponer contratos privados; útil para visitantes | Mostrar herramienta actual | Mismo comportamiento | Una futura evidencia pública deberá definir datos divulgables, no abrir filas privadas | No |
| `*` — NotFoundPage | URL sin coincidencia | 404 SPA con enlace al inicio | Pública | No requiere saber identidad y evita redirección de rutas desconocidas | Mostrar 404 | Mostrar 404 | Ninguna consulta; no revela existencia contractual | No |

La regla estática `/contratos/nuevo` debe seguir diferenciada de `:id`; no cambiar su significado al anidar. `/contratos/id/inexistente/extra` no coincide con las rutas declaradas y debe llegar a la 404 pública. `/contratos/referencia` sí coincide con el patrón y, tras login, mantiene el placeholder: P8 no puede determinar si existe el contrato. No presentar ese placeholder como un documento autorizado.

## 4. Clasificación propuesta pública/privada

Recomendar aprobar tres rutas privadas: panel, creación y detalle; las restantes siguen públicas. Hoy no hay datos remotos que proteger, pero delimitar el espacio personal prepara su navegación sin inventar autorización. Una persona autenticada sin relación con el id podrá ver únicamente el placeholder actual hasta la etapa de datos; no se le concede lectura de un contrato real.

Mantener login y registro públicos también cuando hay sesión: LoginPage es actualmente el único lugar con botón de logout; bloquearla o expulsar a todos sus visitantes autenticados rompería ese acceso. Verificación pública no equivale a acceso público a documentos o identidades. Mantener 404 fuera del guard, sin envolver indiscriminadamente AppLayout o App.

## 5. Arquitectura actual de React Router

`src/main.tsx` monta StrictMode → AuthProvider → App. En `src/App.tsx`, BrowserRouter contiene Routes y una Route sin path con AppLayout; las ocho hojas son hijas suyas. AppLayout dibuja encabezado, navegación y un único main con tabIndex -1 y Outlet. AuthProvider queda por encima del router; el guard se situará dentro de este para poder usar useLocation/Navigate.

Navegación actual: encabezado con Inicio, Verificar, Iniciar sesión y Registrarse; logo al inicio y salto a contenido. Dashboard enlaza crear/verificar; creación vuelve a panel; detalle enlaza panel/crear/verificar; verificación enlaza panel/crear. Landing enlaza registro/verificar y ancla interna; 404 enlaza inicio. No hay botón de logout dentro de panel/contratos ni navegación condicionada por sesión en AppLayout.

Modo declarativo existente, sin loaders/actions ni RouterProvider. No migrar al modo data/framework para P8. Por inspección del paquete 7.18.4, Navigate admite to/replace/state, utiliza el contexto del router y devuelve null; Outlet representa el hijo coincidente. No depender solo de validaciones internas del router para validar destinos del producto. Véanse [rutas declarativas y anidamiento](https://reactrouter.com/start/declarative/routing), [Navigate](https://reactrouter.com/api/components/Navigate) y [useLocation](https://reactrouter.com/api/hooks/useLocation).

## 6. Arquitectura propuesta para RequireAuth

Ubicación prevista: `src/auth/RequireAuth.tsx`, componente pequeño sin props de sesión, con retorno React tipado según los componentes existentes. Usar useAuth y useLocation; no crear cliente, consultar Auth, suscribir eventos ni leer tokens/storage. Sin roles ni consultas de contrato.

Preferir Route sin path con RequireAuth como element, dentro del padre AppLayout y solo alrededor de panel/crear/detalle. RequireAuth devuelve Outlet únicamente con session_present. El Outlet de AppLayout continúa mostrando el guard y este el hijo privado. Así el contenido privado no se monta ni ejecuta efectos en los estados bloqueados; no basta ocultarlo mediante CSS. Encabezado y rutas públicas siguen operativos.

Alternativa wrapper con children es compatible, pero repite envoltorios y facilita olvidar una hoja privada. El patrón de ruta padre sin path encaja en la estructura actual y concentra decisión y pruebas sin reescribir páginas.

Pseudocódigo conceptual — **NO IMPLEMENTADO**:

```text
leer state y location
si initializing: devolver espera neutral (sin Outlet)
si not_configured: devolver aviso de servicio y enlaces públicos (sin Outlet)
si error: devolver aviso neutral y recuperación pública (sin Outlet)
si signed_out: devolver Navigate a /login, replace, con intención interna mínima
si session_present: devolver Outlet
```

Usar la unión AuthState existente y manejo exhaustivo; no añadir booleanos de sesión ni modificar tipos globales. Estado desconocido en una prueba defensiva nunca autoriza contenido. Guard visual, no frontera de seguridad del servidor.

## 7. Matriz de estados de AuthProvider

| Estado | Render privado | Redirección | Presentación y recuperación propuesta |
| --- | --- | --- | --- |
| initializing | Nunca montar Outlet | Ninguna | «Comprobando tu sesión…», role status/aria-busy y contenido público disponible |
| signed_out | Nunca montar Outlet | /login con replace e intención validable | Permitir login; no redirigir desde la propia ruta pública login |
| session_present | Outlet | Ninguna desde guard | Mostrar interfaz; autorización de cada recurso sigue pendiente de servidor |
| not_configured | Nunca montar Outlet | Ninguna automática | «El servicio de acceso no está disponible en este entorno»; enlaces Inicio/Login; configuración a cargo del integrante, sin valores en UI |
| error | Nunca montar Outlet | Ninguna automática | «No fue posible comprobar tu sesión»; Inicio/Login y opción explícita de recargar para reintentar inicialización, sin borrar credenciales |

El contrato actual no distingue todos los errores transitorios: no deducir contraseña incorrecta, revocación o inexistencia de cuenta de un error genérico. Un SDK que aún observa sesión puede mantener session_present durante una caída temporal; el guard no inventa otro estado ni ejecuta logout. La API seguirá autorizando o denegando cada petición.

| Evento observado por proveedor | Reacción del guard |
| --- | --- |
| INITIAL_SESSION | Esperar hasta que el proveedor resuelva; session_present permite y signed_out redirige. Usuario malformado produce error, no acceso. |
| SIGNED_IN | Renderizar Outlet al observar session_present; no iniciar una segunda autenticación. |
| SIGNED_OUT | Desmontar inmediatamente la rama privada y dirigir a login con replace; no conservar el usuario anterior. |
| TOKEN_REFRESHED | Mantener vista/ruta si la sesión observada sigue presente; sin nueva navegación ni temporizador. |
| USER_UPDATED | Conservar vista si el proveedor mantiene sesión coherente; error del proveedor bloquea la rama. No inferir permisos por nombre/correo. |

No generar eventos propios ni convertir una falta temporal de red en logout automático. Guard no añade suscripciones, por lo que StrictMode solo repite el render y los efectos de navegación que deberán ser idempotentes.

## 8. Estrategia de carga y restauración

Al abrir o recargar una ruta privada, mantener URL solicitada mientras initializing. El guard se decide después de la restauración oficial del SDK/P6: válida muestra interfaz; ausente lleva a login; error/no configuración muestra aviso en la misma ruta. Sin contadores de expiración, llamadas getSession por render ni esperas de duración arbitraria.

Estado neutral dentro de main existente, reutilizando PageContainer/Card/texto y enlaces; no nuevo layout ni segundo main. No renderizar previamente el borrador o detalle detrás de un spinner. Si initializing no concluye por un defecto real, informar y diagnosticar el proveedor dentro de un bloque autorizado; P8 no debe fingir signed_out mediante un timeout.

Datos de CreateContractPage son estado local: logout, cambio de cuenta o salida que desmonte la página puede perder el borrador. No guardarlo silenciosamente ni restaurarlo para otro usuario. Recomendar que la rama privada se reinicie al cambiar user.id observado si pruebas de cambio de cuenta demuestran conservación de estado entre usuarios; puede evaluarse una key de usuario en el guard, sin modificar AuthProvider ni añadir persistencia. No introducir confirmaciones de salida o guardado remoto en P8.

## 9. Redirecciones seguras

Preferir history `location.state` con intención mínima del guard, p. ej. objeto conceptual `{ from: { pathname } }`. Tratarlo siempre como unknown en el consumidor y validar estructura/tipo; history state no es confiable ni autorización, puede sobrevivir a recargas según navegador y puede perderse al copiar enlaces o abrir pestaña nueva. No usar localStorage, cookies ni credenciales para guardar el destino.

**Política propuesta para P8:** retornar solo a las tres rutas privadas conocidas, guardando únicamente pathname; descartar search/hash porque ninguna de ellas los necesita hoy y podrían contener datos sensibles. No adoptar returnTo de la query. Si en una fase futura se requieren filtros/anclas, permitir únicamente campos de query aprobados con validación propia; no concatenar una URL arbitraria.

Validación conceptual antes de navegar:

1. Exigir objeto state con from.pathname string acotado; sin coerción automática de objetos/arrays y sin trim que transforme un destino rechazable en uno admitido.
2. Exigir ruta absoluta interna de un solo slash inicial. Rechazar esquemas, `//`, barras invertidas, controles/espacios, fragmentos/query y secuencias de percent-encoding en el valor candidato. No decodificar varias veces ni normalizar entradas peligrosas para aceptarlas.
3. Usar lista permitida exacta: `/panel`, `/contratos/nuevo` o `/contratos/` seguido de un único segmento conservador de letras ASCII, dígitos, guion o guion bajo, de 1–120 caracteres. No aceptar punto, segmentos vacíos/dobles, subrutas o slash final. Esa gramática es una propuesta de navegación, no un formato definitivo de id de base de datos; rutas que no la cumplan no se convierten en destinos automáticos. Un identificador futuro distinto requerirá revisar esta regla.
4. Reconstruir el destino desde la ruta aprobada; nunca pasar directamente el objeto/URL recibido a Navigate/useNavigate. Opcionalmente verificar mismo origen con URL como defensa adicional, nunca como único criterio: mismo origen no basta para evitar bucles.
5. Excluir explícitamente `/login`, `/registro`, rutas públicas y desconocidas del retorno. Para un estado from presente pero inválido, usar fallback fijo `/panel` únicamente después de login satisfactorio. Para visita directa sin from, conservar presentación aprobada en /login y no redirigir automáticamente.
6. Guard → login con replace. Login satisfactorio **y** session_present observado → destino validado con replace y state de retorno consumido. Una ejecución por intención/location.key evita repetición en StrictMode; no navegar dentro del callback Auth ni por mero cambio de contraseña/campo.

Casos a rechazar: `https://dominio.example/panel`, `//dominio.example`, `javascript:...`, `data:...`, `/\\dominio.example`, `/%2f%2fdominio.example`, `/contratos/../login`, `/login`, objetos/arrays, cadenas excesivas y queries que incluyan returnTo. Ninguna de estas entradas otorga permisos aunque el usuario esté autenticado.

Propuesta deliberadamente conservadora: retorno automático únicamente después de un login iniciado en esta pantalla que terminó satisfactoriamente y ya fue observado por el proveedor. Si la sesión se restaura mientras se está en /login o llega por otra pestaña sin ese resultado local, mantener Sesión activa/logout y no navegar silenciosamente. P8 deberá conservar este comportamiento o pedir aprobación explícita de un retorno más amplio; no expulsar a los visitantes directos de /login. Recargar directamente la URL privada con sesión válida sí la abre sin pasar por login.

## 10. Comportamiento después de login/logout

| Escenario | Comportamiento propuesto P8 |
| --- | --- |
| Acceso directo a /panel sin sesión | Resolver inicialización, reemplazar por login con intención /panel; login exitoso vuelve allí. |
| Recarga de /contratos/nuevo con sesión persistida | Espera neutral y mismo formulario local nuevo; los datos del borrador no persisten. |
| Login abierto directamente | Sin sesión: formulario; con sesión: Sesión activa y logout. Sin salto automático al panel. |
| Login con from válido | Tras éxito del servicio y sesión observada, replace hacia el destino una sola vez. Si falla login, permanecer y conservar intención sin mostrar página privada. |
| Estado from inválido | No usarlo como URL; tras éxito usar /panel. Sin login exitoso no navegar. |
| Atrás/adelante tras retorno | replace evita añadir pares login/destino en bucle; al volver a una entrada privada el guard vuelve a evaluar Auth, sin confiar en historial. |
| Logout mediante UI existente | Hoy botón solo en /login. Ir allí desde encabezado y usar cierre aprobado; permanecer allí con mensaje/formulario. No añadir logout a panel/header en P8 por inferencia. |
| SIGNED_OUT mientras está en ruta privada | Puede proceder de otra pestaña o evento SDK: desmontar página y replace a login; no ejecutar otro signOut. |
| Segunda pestaña | Cada pestaña tiene su router/intención y comparte sesión según SDK. Signed_out debe retirar rama privada al observarse; al recargar se reevalúa storage. Sin BroadcastChannel propio. |
| TOKEN_REFRESHED durante navegación | No cambiar destino ni borrar borrador por un refresh normal; reaccionar solo al estado coherente del proveedor. |
| Navegación del layout | Conservar enlaces actuales y acceso a /login para cerrar. Enlaces públicos a panel/crear pasan por guard, sin esconderlos como supuesto control de seguridad. |

Botón Atrás/bfcache requiere prueba real: el guard no borra el historial ni garantiza borrar píxeles del caché del navegador. No prometer protección absoluta en equipos compartidos; aplicar cierre explícito y evitar cachear datos privados cuando exista la capa de datos. Accesos directos en despliegue requieren fallback de SPA del hosting, no una nueva ruta del frontend.

Semántica de errores propuesta: **401** identifica falta de autenticación; **403** indica identidad autenticada sin permiso; **404** indica ruta/recurso inexistente o existencia no revelada. Para futuros contratos privados, responder de forma equivalente ante id ajeno e inexistente, sin confirmar existencia; un error de conexión mantiene mensaje de servicio y no se convierte en 404. Son categorías de diseño: la 404 SPA actual no fija por sí sola un HTTP 404 (Vite sirve HTML base con 200), y P8 no añadirá página 403 ni simulará respuestas de una API aún inexistente.

## 11. Autenticación frente a autorización

Autenticación: Supabase Auth gestiona cuenta/sesión; el guard permite una interfaz basada en el estado observado. Autorización: servidor decide qué filas, archivos y operaciones puede utilizar esa cuenta. Una persona puede omitir React e invocar la Data API; filtrar contratos en el cliente o esconder un enlace no impide acceso directo.

La referencia contractual en URL, user.id de Context y full_name del registro no son prueba de participación, firma ni identidad legal. No usar correo introducido en un formulario como concesión de acceso. P8 solo reduce exposición visual involuntaria; las autorizaciones efectivas se definirán y probarán en el backend antes de introducir datos privados.

## 12. Modelo conceptual de participantes de contratos

Conceptos candidatos, **no tablas definitivas ni roles aprobados**:

- Cuenta autenticada: identificador estable de Supabase Auth; datos de perfil mínimos separados de identidad legal comprobada.
- Acuerdo y versión del contenido: referencia, autor de creación registrado por servidor, estado de borrador y contenido/versionado por definir. Crear no implica todos los permisos para siempre.
- Participación: vínculo autorizado entre una cuenta y un acuerdo, función contextual de creador/contraparte y estado de participación. No confundir estos papeles con roles globales de PostgreSQL ni permisos administrativos.
- Invitación: solicitud con destinatario y estado, aún sin otorgar lectura completa por defecto. Asociación de correo a cuenta requiere proceso confiable y definición anti-suplantación; no aceptar user_id enviado arbitrariamente por el creador.
- Aceptación y firma: acciones distintas, vinculadas al actor y versión exacta de términos; su validez, prueba criptográfica y efecto legal requieren bloques propios. Invitación recibida o correo enviado no demuestra aceptación/firma.
- Evidencia: referencia y datos divulgables separados de documento confidencial. Un hash no demuestra identidad ni sustituye firma digital certificada/notario.

Para dos partes, evaluar relación de participantes en lugar de asumir dos correos como identidad. Una relación permite controlar invitación/aceptación y evitar editar unilateralmente la contraparte; deberá limitarse transaccionalmente la cardinalidad conforme a negocio aprobado. Alternativa de dos columnas de usuario sería más simple, pero dificulta invitaciones/estados y exige controles equivalentes. No elegir esquema ni migrar ahora.

## 13. Matriz futura de permisos

Propuesta para deliberación, no ACL implementada. **I:** permitido en interfaz futura de P8 (solo vistas/flujo local). **V:** requiere verificación adicional servidor y reglas aprobadas; no implementar hasta entonces. **D:** denegado por el límite mínimo de seguridad propuesto. **ND:** aún no definido; no habilitar operación. Todos los roles son relativos a este contrato.

| Actor | Abrir panel | Crear borrador | Leer contrato | Editar borrador | Invitar contraparte | Aceptar invitación | Firmar | Consultar evidencia | Verificación pública |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Visitante sin sesión | D | D | D | D | D | D | D | D para evidencia privada | I, herramienta actual |
| Autenticado sin relación | I | I local; guardado futuro V | D | D | D sobre contrato ajeno | D sin invitación vinculada | D | D privada | I |
| Creador del contrato | I | I local; guardado futuro V | V, vínculo vigente | V, propietario/estado/versión | ND, política de invitación pendiente | ND según proceso aprobado | ND | V, alcance público/privado | I |
| Contraparte invitada | I | I de un nuevo borrador propio | ND, posible resumen mínimo de invitación | ND | D sobre permisos ajenos | V, invitación válida ligada a su cuenta; proceso pendiente | ND | ND hasta definir exposición | I |
| Contraparte que aceptó participar | I | I de un nuevo borrador propio | V, participación vigente | ND | ND | ND, repetición/idempotencia pendiente | ND | V, contenido autorizado | I |
| Sesión inválida/caducada sin recuperación | D | D | D | D | D | D | D | D privada | I |

Una sesión todavía observada durante fallo temporal no se clasifica automáticamente como inválida. El guard sigue la proyección y servidor rechaza credenciales no aceptables. Los permisos V/ND no se implementan con booleanos ficticios; P8 no mostrará botones nuevos para esas operaciones.

Leer, editar, invitar, aceptar, firmar y consultar evidencia tendrán reglas separadas. Propuesta mínima para futura edición: comprobar estado de borrador y actor antes y después de modificación; no permitir que una edición cambie silenciosamente quién pertenece al acuerdo. Alcance exacto del creador, visibilidad preaceptación y cambios tras aceptación siguen pendientes de aprobación.

## 14. Amenazas y controles

| Amenaza | Riesgo y consecuencia | Control frontend propuesto | Backend necesario | P8 | Etapa datos/RLS u otra |
| --- | --- | --- | --- | --- | --- |
| Acceso directo /panel sin sesión | Mostrar espacio personal sin autenticar | Guard bloquea montaje; signed_out lleva a login | Rechazar datos sin credencial aceptada | Guard y retorno | RLS y permisos de API |
| Recarga /contratos/nuevo | Flash privado o pérdida de texto | Espera inicial; avisar que borrador local no persiste | Guardado futuro con dueño comprobado | Espera sin guardar | Persistencia contractual propia |
| Token caducado | UI desfasada respecto a servidor | Observar proveedor; no fabricar sesión | Validar JWT/expiración y política de sesión | Reacción a signed_out/error | Tratamiento de 401 al consultar datos |
| Logout en ruta privada | Contenido previo sigue montado | Desmontar rama al evento, sin segundo signOut | Cierre oficial y autorización por petición | Guard reacciona | Cachés/limpieza de datos privados cuando existan |
| Logout en segunda pestaña | Pestaña conserva vista antigua | Reaccionar al SDK; revalidar al recargar | Sesión y permisos servidor | Pruebas multi-pestaña | No prometer sincronía instantánea universal |
| Cambiar id de contrato | IDOR/BOLA; leer acuerdo ajeno | No afirmar permiso por patrón de URL | Membresía/RLS en cada lectura/operación | Solo guard y límites honestos | Consultas filtradas por políticas autoritativas |
| API REST directa | Omitir guard y filtros React | Ningún guard evita esta vía | RLS/grants con credencial aceptada | Documentar límite | Pruebas directas con usuario ajeno y anon |
| XSS/dependencia comprometida | Robo/uso de sesión SDK accesible a JS | React seguro, no HTML/scripts/logs inseguros | Permisos mínimos limitan alcance; no eliminan abuso con credencial robada | No introducir nuevos riesgos | Revisión dependencias/CSP/despliegue y respuesta a incidentes |
| Sesión corrupta | Usuario ficticio o excepción | Proveedor P6 valida mínimo; guard bloquea error | Nunca confiar en storage para permisos | Prueba de error | Validación de JWT y membresía servidor |
| Red interrumpida | Confundir error con logout/éxito | Error neutral, sin bucles ni logout propio | API decide según credenciales y disponibilidad | Estados y recuperación pública | Reintentos de datos acotados, no nuevas reglas en P8 |
| Destino adulterado | Open redirect/phishing/bucles | Allowlist interna, validar unknown, replace y consumo único | Cualquier redirección futura servidor valida por separado | Sí | Enlaces de invitación/callback en su bloque |
| Cambio de cuenta en misma ruta | Conservar borrador de otra cuenta | Reiniciar rama local si cambia id, sin storage nuevo | Aislar filas por sujeto y limpiar caché por usuario | Evaluación/prueba focalizada | Cachés y asociaciones de cuentas |

No declarar un origen protegido contra XSS por tener RLS: código malicioso puede operar con los permisos de la víctima. Logout local tampoco invalida instantáneamente todo JWT previamente emitido; la observación real de renovación permanece pendiente y no se inventa en este diseño.

## 15. RLS y dependencia de la futura capa de datos

No hay tablas ni políticas contractuales implementadas. Debe diseñarse autorización antes de exponer contratos por API. Supabase documenta que RLS aplica reglas en PostgreSQL; `auth.uid()` identifica al sujeto de la petición autenticada y devuelve null sin usuario autenticado. No se obtiene del id arbitrario enviado por el formulario. [Referencia oficial de RLS](https://supabase.com/docs/guides/database/postgres/row-level-security).

Propuestas conceptuales de AcuerdoSeguro, pendientes de esquema y revisión:

1. Lectura denegada por defecto: acuerdo visible solo con participación autorizada del sujeto. Un id válido no prueba pertenencia. La consulta de miembros también debe quedar protegida sin políticas recursivas que se autorreferencien incorrectamente.
2. Creación: atribuir autor al sujeto aceptado por servidor; impedir crear en nombre de otra cuenta. La creación del acuerdo/vínculo inicial debe ser consistente, sin un intervalo que permita apropiarse de un acuerdo ajeno.
3. Edición: comprobar actor/estado permitido de la fila existente y restricciones de la fila resultante; no permitir cambiar autor, contrato vinculado, participantes o estado de firma mediante un UPDATE genérico.
4. Participación e invitación: no permitir autoinscribirse en cualquier acuerdo, elevar su función ni insertar/modificar la fila de otro usuario para concederse permiso. El alta de contraparte requiere proceso y transacción revisados; autenticarse no concede CRUD general de membresías.
5. Aceptación/firma: transición específica con actor, versión, estado y evidencia por definir. No basarla en full_name, user_metadata editable o un campo booleano enviado desde React.
6. Revisar permisos de columnas/operaciones además de pertenecer a una fila. Una regla amplia por participante no debe permitir cambiar campos de control. Grants, restricciones y funciones revisadas podrán complementar políticas; no introducir funciones privilegiadas como atajo.
7. Relaciones, archivos y evidencia privada siguen el mismo límite del acuerdo. Verificación pública requiere proyección pública mínima aprobada; no lectura pública de contratos completos.
8. Validar con dos cuentas distintas, visitante y participante, invocando API directamente además de UI; pruebas de SELECT, INSERT, UPDATE y borrado según futuro alcance, sin tocar datos ajenos. Sin secretos administrativos en frontend ni roles que eludan RLS durante esas pruebas.

Para la revisión posterior consultar también [seguridad de columnas](https://supabase.com/docs/guides/database/postgres/column-level-security), [seguridad de datos/API](https://supabase.com/docs/guides/database/secure-data) y [funciones de base de datos](https://supabase.com/docs/guides/database/functions). Son referencias, no configuración aplicada ni SQL autorizado por P7/P8.

**No divulgación:** futuras lecturas de id inexistente o no autorizado deben producir una respuesta pública equivalente («No se puede mostrar este acuerdo») sin datos de participantes ni confirmación de existencia. Distinguir internamente errores de servicio y falta de permiso, sin convertir una caída en falso 404. No hacer consultas adicionales sin autorización para averiguar si una fila filtrada existe; revisar también registros, tiempos y respuestas auxiliares en la etapa de datos. No prometer igualdad perfecta de tiempos.

## 16. Matriz de pruebas

**Diseñada, NO EJECUTADA.** M = posibilidad de mock/control; N = navegador; U = cuenta real. «Complemento» requiere prueba real posterior para acreditar el flujo remoto, sin crear cuentas automáticamente. Montajes de prueba no deben fabricar eventos en producción ni manipular tokens reales.

| # / Escenario | Estado inicial | Acción | Resultado esperado P8 | M | N | U | Riesgo o limitación |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 Landing | signed_out | Abrir / | Landing sin redirect | Sí | Sí | No | Guard no debe envolver toda App |
| 2 Login público | signed_out | Abrir /login | Formulario tras comprobación, validaciones intactas | Sí | Sí | No | No bucle hacia sí mismo |
| 3 Registro público | signed_out | Abrir /registro | Registro aprobado disponible | Sí | Sí | No | No generar usuarios para prueba de navegación |
| 4 Verificación pública | signed_out | Abrir /verificar | Formulario actual sin login obligatorio | Sí | Sí | No | No afirmar hashing ni evidencia real |
| 5 Panel sin sesión | signed_out | Abrir /panel | Sin montar Dashboard; replace a login con intención | Sí | Sí | No | Comprobar contenido DOM, no solo URL |
| 6 Crear sin sesión | signed_out | Abrir /contratos/nuevo | Formulario contractual nunca montado; login | Sí | Sí | No | Ruta estática no confundida con id |
| 7 Detalle sin sesión | signed_out | Abrir /contratos/referencia | No monta placeholder; login | Sí | Sí | No | No demuestra RLS |
| 8 Acceso directo | Sin cliente inicializado | Pegar URL privada en barra | Espera neutral y resolución Auth antes de navegar | Sí, complemento | Sí | Para sesión real | Hosting debe servir SPA al recargar |
| 9 Recarga privada | session_present | Recargar /contratos/nuevo | Recupera sesión y permite vista; borrador local perdido según aviso | Sí, complemento | Sí | Sí para real | No introducir guardado implícito |
| 10 Restauración lenta | initializing sostenido | Abrir privada y esperar | No Outlet ni redirect; status accesible | Sí | Sí | No | No timeout que finja signed_out |
| 11 Sesión persistida válida | Sesión SDK guardada | Abrir /panel en nuevo tab | Restauración permite ruta sin login duplicado | Sí, complemento | Sí | Sí para real | No copiar tokens |
| 12 Sesión ausente | INITIAL_SESSION null | Resolver carga en privada | Login una vez con intención segura | Sí | Sí | No | No flash privado |
| 13 Sesión malformada | Proveedor en error | Pedir privada | Aviso neutral, sin usuario inventado ni Outlet | Sí | Sí | No | Solo fixture; no corromper sesión real |
| 14 Servicio no configurado | not_configured | Abrir privada y enlace Inicio | Aviso sin redirect continuo; pública accesible | Sí | Sí | No | No editar .env.local del equipo |
| 15 Error temporal | error | Abrir privada y recuperar por opción pública | Aviso neutral; no signOut automático ni mensaje de contraseña inválida | Sí | Sí | No | Estados actuales no clasifican todas las causas |
| 16 Login directo | signed_out, sin from | Login satisfactorio | Permanece sesión activa/logout en /login | Sí, complemento | Sí | Sí para real | Conservar comportamiento aprobado |
| 17 Login tras intento privado | signed_out con intención /panel | Fallar y luego iniciar correctamente | Error permanece; solo éxito + sesión observada devuelve a panel | Sí, complemento | Sí | Sí para real | No repetir contraseñas en logs |
| 18 Destino original | Intención validable de tres rutas | Autenticar y observar sesión | Replace al pathname autorizado una vez; sin query/hash | Sí | Sí | No en fixture | Id conservador no comprueba existencia |
| 19 Destino adulterado | from externo/esquema/objeto/null/codificado | Completar login controlado | Rechazar destino; fallback fijo solo tras éxito; sin red externa | Sí | Sí | No | Incluir //, backslash, dot segments y cadenas largas |
| 20 Logout mientras privada | session_present en panel | SIGNED_OUT de SDK por cierre autorizado en otra pestaña | Desmontar rama y replace login sin otro signOut | Sí, complemento | Sí | Sí para real | No hay botón logout nuevo en panel |
| 21 Otra pestaña | Dos pestañas con sesión | Cerrar desde /login en B | A privada se desmonta al observar evento; recargas no resucitan | Sí, complemento | Sí, dos | Sí para real | Latencia SDK no es instantaneidad universal |
| 22 Expiración | Sesión cerca de caducar | Refresh controlado exitoso/fallido y pérdida posterior | Refresh válido mantiene ruta; signed_out/error bloquean según estado | Sí, complemento | Sí | Real requiere espera | No cambiar TTL del proyecto |
| 23 Atrás/adelante | Flujo privada-login-retorno completado | Navegar historial, después logout | Sin bucles; toda entrada privada vuelve a comprobar estado | Sí, parcial | Sí | No en fixture | Revisar bfcache en navegador real |
| 24 404 | Con y sin sesión | Abrir ruta no declarada o subruta extra | 404 pública; no login obligatorio ni consulta de contrato | Sí | Sí | No | /contratos/id sí coincide y sigue placeholder tras sesión |
| 25 StrictMode | Proveedor/Router reales de prueba | Montar/desmontar y transición de sesión | Sin cliente/suscripción extra del guard; navegación idempotente | Sí | Sí | No | Contar listeners vivos, no renders |
| 26 Sin parpadeo privado | initializing/signed_out/error | Capturar DOM y montaje de página privada | Ningún hijo privado montado/renderizado hasta permitir | Sí | Sí | No | No probar solo visibility CSS |
| 27 Teclado y foco | Login/redirección/aviso | Tab, Shift+Tab, Enter y salto a main | Foco visible en contenido/encabezado tras navegación; carga anunciada | Parcial | Sí | No | No robar foco en cada refresh/render |
| 28 Móvil | Cinco estados del guard | 320/390/768/1440 px y 200 % | Mensajes/enlaces usables sin desbordamiento | Parcial | Sí | No | No equivale a auditoría WCAG integral |
| 29 Checks | Delta P8 preparado | build, lint, 22 tests y diff check | PASS; dependencias sin cambios | Sí para diagnóstico | No | No | Matriz futura, no resultado actual |
| 30 Regresión Auth | Formularios/servicios aprobados | Validaciones, login, persistencia, logout y nueva recarga | Contratos de servicios y mensajes conservados | Sí, complemento | Sí | Para flujo real | Registro real solo si explícitamente necesario/autorizado |
| 31 Sesión cambia durante retorno | Login pendiente y posterior signed_out/error | Resolver respuesta tardía | No navegar si ya no existe session_present | Sí | Sí | No | No usar solo resultado de servicio |
| 32 Cambio de cuenta | Borrador local en cuenta A | Proveedor observa otra user.id | No conservar borrador de A para B; ninguna escritura remota | Sí | Sí | No | Evaluar key de rama y pérdida esperada de estado local |
| 33 Contrato ajeno/API | Autenticado sin relación | Cambiar id y comparar llamadas futuras | P8 solo placeholder; no afirmar permiso; pruebas reales de denegación aplazadas a RLS | Sí conceptual | Sí para UI futura | Dos cuentas solo en etapa datos | No hay consulta/política real que probar en P8 |
| 34 Identidad actualizada | session_present | TOKEN_REFRESHED/USER_UPDATED sin cambio de cuenta | Mantener ruta y estado local; sin redirect repetido | Sí | Sí | No | Evento no concede permisos de negocio |
| 35 Intención tras recarga | /login con from en history | Recargar y luego login, o perder state al copiar URL | Revalidar si existe; sin state mantener login directo; sin salto externo | Sí, complemento | Sí | No en fixture | No prometer persistencia universal de history state |

Las pruebas futuras deben distinguir PASS EJECUTADO, PASS SIMULADO, PASS POR INSPECCIÓN, NO EJECUTADO y FAIL. Planificar pruebas manuales con cuentas propias ya existentes y sin cambios del Dashboard. Renovación real pendiente de P6 sigue pendiente hasta observarla; P8 no la acredita por renderizar un guard.

## 17. Plan mínimo de implementación P8

Solo después de revisión y autorización explícita de su prompt:

| Archivo previsto | Responsabilidad y justificación |
| --- | --- |
| src/auth/RequireAuth.tsx — nuevo | Decisión exhaustiva con useAuth/useLocation, Outlet/Navigate y avisos reutilizando UI existente. Sin APIs Auth ni membresías. Posible función pura exportada de validación de destino en este mismo archivo para compartir con LoginPage, sin nuevo módulo si no es necesario. |
| src/App.tsx — modificar | Agrupar solo tres hojas privadas bajo Route sin path; mantener AppLayout, públicas y 404. |
| src/pages/LoginPage.tsx — modificar acotadamente | Leer intención como unknown, validar y consumir tras login exitoso + sesión observada, con replace; conservar visita directa, logout, C1, carga y validaciones. Foco tras navegación al main existente si el mecanismo mínimo elegido lo requiere. |
| Componentes UI/AppLayout — no previstos | Reutilizar Card/PageContainer/Link y main actual. No nuevos enlaces o logout de encabezado por iniciativa propia; si foco global exige tocar layout, justificar y autorizar ese archivo en P8 antes de ampliar alcance. |
| AuthProvider/useAuth/tipos/cliente/main/servicios | No previstos | Proveedor ya observa sesión persistente; guard no requiere cambios en su contrato ni política. |
| Documentos y pruebas | Según alcance explícito P8 | Pruebas focalizadas con contexto/router controlados para estados, montaje de hijos, destinos y transiciones; herramientas temporales fuera del repo si no hay autorización de archivos de prueba nuevos. Sin instalar bibliotecas por defecto. |

Pasos: baseline y aprobación de rutas; implementar guard y validación compartida; agrupar tres rutas; retorno condicional/foco; tests controlados y navegadores con matriz; checklist externa y checks técnicos; documentar limitaciones. No reescribir servicios ni añadir consultas de datos para justificar el guard.

Foco/accesibilidad: navegar debe llevar el foco al main existente o encabezado apropiado después de que la vista esté lista, sin añadir otro main; carga role status y estado de error comprensible. Probar retorno, links públicos y teclado, sin enfocar en cada TOKEN_REFRESHED. P8 deberá concretar el mecanismo mínimo según sus archivos autorizados; no fingir que React Router lo resuelve automáticamente.

## 18. Estrategia de reversión

Antes de P8 guardar baseline/diff revisable de App y LoginPage y registrar el archivo nuevo. HEAD publicado no contiene todos los avances aprobados; no usarlo para restaurar íntegramente el proyecto. Revertir solo el delta P8 mediante patch revisado: retirar agrupación/guard e intención/foco nuevos, restableciendo navegación P6 aprobada. Retirar archivo nuevo solo tras comprobar que pertenece exclusivamente a P8 y que no quedan imports, sin comandos de limpieza masiva.

No cambiar persistSession/autoRefreshToken ni logout, no borrar almacenamiento, no hacer reset/clean/stash. Reversión del guard deja las vistas preliminares públicas como hoy; si para entonces existieran datos privados, no considerar segura esa reversión sin revisión del backend. Ejecutar build/lint/22 pruebas/diff y regresión de ocho rutas/Auth. Confirmar que servicios, plan P5 y avances locales permanecen intactos.

## 19. Decisiones pendientes

- Responsable aprueba las tres rutas privadas propuestas y el estado sin configuración/error; P7 no aprueba ni ejecuta P8.
- Aprobar retorno solo de pathname, allowlist conservadora y política de login directo sin redirect; confirmar gramática futura del id antes de consultas reales.
- Confirmar alcance de P8 para foco y pruebas y si hace falta reinicio por cambio de cuenta, manteniendo el mínimo de archivos. No introducir nuevo logout de header.
- Definir negocio: creador, vinculación de contraparte, datos visibles en invitación, edición tras aceptación, firma/versiones y evidencia pública/privada. Permisos ND/V no se convierten en funciones por defecto.
- Diseñar esquema, permisos/RLS, estados/transacciones y pruebas contra API antes de datos privados. Resolver ausencia de fila/permiso sin filtrar existencia, evitando falsos errores de recurso ante fallos del servicio.
- Observación de renovación real pendiente; políticas de TTL y hosting/fallback SPA no se modifican aquí. No declarar soporte probado en cinco equipos por checks locales.

Estas son condiciones de implementación y negocio, no bloqueos que impidan entregar el diseño actual.

## 20. Criterios de aceptación

Para aprobar este diseño: inventario y tres rutas propuestas revisados; guard sin duplicación Auth; cinco estados y eventos cubiertos; restauración neutral; retorno seguro; logout/pestañas/historial/foco definidos; autenticación separada de autorización; participantes/permisos pendientes explícitos; amenazas, RLS futura, 35 pruebas, mínimo de archivos y reversión documentados. P6 aprobado externamente sin inventar renovación real.

Para futura P8: solo ramas aprobadas protegidas; páginas privadas no se montan en estados bloqueados; privadas con sesión no se presentan como autorizadas para cualquier id; ausencia de bucles/open redirects; login directo/logout/persistencia y públicas/404 conservados; ningún cambio de permisos o servicios Auth sin autorización; pruebas controladas/manuales diferenciadas y checks PASS. Falta de datos/RLS impide acreditar permisos reales de contratos y debe quedar explícita.

P7 entrega exclusivamente documentación. **Rutas protegidas NO IMPLEMENTADAS; RLS contractual NO IMPLEMENTADA; P8 NO EJECUTADO.**

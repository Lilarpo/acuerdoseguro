# M2-B2-P5 — Revisión y diseño de persistencia de sesión

**Estado:** DISEÑO ELABORADO — PENDIENTE DE REVISIÓN EXTERNA.
**Fecha:** 2026-10-17. **Implementación futura:** M2-B2-P6 — Implementación controlada de persistencia de sesión, PREVISTO — NO EJECUTADO.

## 1. Contexto y estado actual

AcuerdoSeguro es una SPA React/TypeScript con Vite y Supabase Auth directo, sin backend propio para sesiones. M0 está completado; M1 completado, aprobado y publicado; M2-B1 completado y aprobado. Registro P2 y login P3 aprobados. El responsable confirma en P5 siete pruebas manuales satisfactorias de P4 tras C1: formulario sin sesión, login real, presentación coherente con sesión, logout real, recuperación del formulario/enlace, repetición login/logout sin recarga y ausencia de errores bloqueantes con Git conservado. P4 queda APROBADO y C1 es una CORRECCIÓN APROBADA dentro de P4; esas pruebas no las ejecutó Codex.

Rama main, remoto oficial Lilarpo/acuerdoseguro y HEAD local `0e23f15039802537ee2708120526d797a8acae59`. Última publicación conocida hasta P2; P3/P4/C1 siguen locales. P5 solo crea este documento y actualiza los dos documentos de continuidad. No se activó persistencia, renovación ni callbacks, no se consultó el Dashboard ni se probaron credenciales reales.

**Base de evidencia:** inspección del código del proyecto y del SDK instalado, más documentación oficial consultada durante esta auditoría. Las propuestas e inferencias se identifican expresamente; ningún caso de la matriz futura se da por ejecutado.

## 2. Opciones reales del cliente

`src/lib/supabaseClient.ts` exporta getSupabaseClient: valida presencia de URL y clave pública con prefijo publishable y URL HTTP(S), devuelve null si no cumple y crea un único cliente por instancia del módulo. Lee solo las dos variables públicas Supabase; no se abrieron valores de .env.local.

| Opción | Valor explícito actual | Consecuencia por inspección |
| --- | --- | --- |
| persistSession | false | SDK usa adaptador en memoria, incluso si se indicara storage. |
| autoRefreshToken | false | No programa renovación automática preventiva. Una lectura de sesión puede intentar refrescar si está próxima a caducar; false no prohíbe todas las renovaciones internas. |
| detectSessionInUrl | false | No adopta automáticamente una sesión desde un retorno de autenticación. |
| skipAutoInitialize | true | Constructor omite initialize; la aplicación tampoco lo llama expresamente. |
| flowType | No declarado | Valor efectivo por defecto del SDK instalado: implicit. No implica OAuth implementado. |
| storage / userStorage | No declarados | Hoy memoria; con persistSession true, SDK elige localStorage si está disponible y memoria como respaldo. |
| storageKey | No declarada | SupabaseClient deriva `sb-<primer segmento del hostname>-auth-token`; no se escribe el identificador real del proyecto en este plan. |
| debug / throwOnError | No declarados | Defaults auth-js: false / false. |
| lock / experimental | No declarados | Sin adaptación de concurrencia ni opciones experimentales propias. |

package.json declara @supabase/supabase-js `^2.118.0`; lockfile y paquetes instalados resuelven supabase-js y auth-js **2.118.0**. Node comprobado 24.22.0 y npm 11.19.1. Reconfirmar versión resuelta antes de implementar si cambia el lockfile.

Fuentes primarias locales: `node_modules/@supabase/supabase-js/src/SupabaseClient.ts` (clave y opciones), `src/lib/constants.ts` del mismo paquete (defaults), `node_modules/@supabase/auth-js/src/GoTrueClient.ts` (constructor, initialize, __loadSession, _recoverAndRefresh y visibilidad) y `src/lib/local-storage.ts` / `helpers.ts` de auth-js. Son dependencias inspeccionadas, no archivos a editar.

La documentación describe guardado oficial y opciones de cliente; los detalles de respaldo en memoria y clave derivada anteriores proceden del código de esta versión. Véanse [inicialización](https://supabase.com/docs/reference/javascript/initializing) y [Auth](https://supabase.com/docs/reference/javascript/auth).

## 3. Arquitectura existente

| Responsabilidad | Propietario real |
| --- | --- |
| Crear y reutilizar cliente | getSupabaseClient, singleton de módulo. |
| Mantener credenciales y sesión cliente | SDK Supabase Auth, hoy en memoria. |
| Suscribir eventos y mantener proyección React | AuthProvider; una suscripción activa por montaje. |
| Exponer estado y usuario mínimo | AuthContext y useAuth: state, user con id/correo opcional y hasSession derivado. |
| Registrar / iniciar / cerrar | registerUser con signUp; loginUser con signInWithPassword; logoutUser con signOut de scope local. |
| Formularios y mensajes | RegisterPage y LoginPage; refs impiden solicitudes duplicadas/concurrentes. |
| Limpieza | unsubscribe en cleanup del efecto y active=false para ignorar callbacks tardíos. |

main.tsx monta AuthProvider bajo StrictMode, alrededor de App; App configura BrowserRouter y ocho rutas, sin guardias. SDK es propietario de la sesión; Context es su proyección de interfaz, no otro almacén de credenciales. No añadir estado global, otro cliente, otra suscripción en páginas ni operaciones manuales sobre Context.

## 4. Problema de recarga

Una recarga destruye el módulo JavaScript y el adaptador de memoria del SDK. El nuevo cliente no dispone de la sesión anterior; INITIAL_SESSION termina representando ausencia de sesión. No es un fallo del login aprobado ni se resuelve guardando contraseñas. autoRefreshToken y detectSessionInUrl cumplen funciones diferentes a persistir.

Objetivo futuro: SDK recupera una sesión almacenada utilizable, la renueva cuando corresponda y AuthProvider refleja el resultado antes de ofrecer login. Logout debe retirar la sesión y una recarga posterior no debe restaurarla. Esto depende de almacenamiento disponible, políticas del navegador, conectividad y aceptación del servidor, no solo de opciones booleanas.

## 5. Comparación de alternativas

| Alternativa | Complejidad | Tras recarga | Tras cerrar navegador | Acceso JavaScript | Compatibilidad actual | Experiencia | Esfuerzo de pruebas | Recomendación |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A: memoria del SDK | Baja | No | No | Sesión accesible al proceso JS; menor permanencia en disco | Ya implementada | Requiere nuevo login | Bajo, regresión actual | Respaldo si no se acepta persistencia |
| B: persistencia oficial SDK | Baja-media, revisar inicialización | Sí si storage y sesión utilizables | Generalmente sí con localStorage; políticas privadas/borrado pueden impedirlo | Tokens legibles por JS del origen; riesgo XSS | Alta, sin backend nuevo | Recuperación y renovación transparentes con estados claros | Medio-alto: expiración, red y pestañas | Candidata recomendada condicionada a aprobación |
| C: storage compatible con SDK, p. ej. sessionStorage | Media-alta | Sí en la misma pestaña | Normalmente no; restauración del navegador puede conservarlo | También legible por JS, sin garantía contra XSS | Requiere decisión y adaptación getItem/setItem/removeItem | Vida de pestaña, aislamiento parcial | Alto: copias de pestaña y sincronización | Solo si hay requisito explícito de duración por pestaña |
| D: backend/BFF y cookie HttpOnly | Alta | Sí, según sesión servidor | Depende de cookie y política | HttpOnly impide leer cookie desde JS; XSS aún puede operar con sesión y requiere controles CSRF | Baja: requiere servidor, endpoints y nueva política | Puede ser buena, con más operación | Muy alto, backend/CSRF/cookies/despliegue | No migrar para este bloque sin necesidad y presupuesto |

B almacena sesión mediante SDK, sin código casero que escriba tokens. C podría utilizar almacenamiento web mediante un adaptador compatible, sin construirlo aquí. sessionStorage se separa por pestaña, aunque una nueva pestaña con opener puede recibir una copia inicial; BroadcastChannel del SDK no comparte necesariamente esa misma semántica. Exige probar que eventos entre pestañas no contradigan el storage aislado. No es una mejora equivalente a HttpOnly.

Una SPA que llama Supabase directamente necesita credenciales accesibles al cliente; cambiar una opción o usar cookies desde JS no las convierte en HttpOnly. Incluso el enfoque SSR habitual de Supabase mantiene acceso del cliente a la sesión. D requiere una arquitectura distinta que custodie las credenciales en servidor, además de cookies Secure/SameSite/HttpOnly y protección CSRF. [Guía avanzada oficial](https://supabase.com/docs/guides/auth/server-side/advanced-guide).

## 6. Recomendación técnica

**Configuración recomendada para M2-B2-P6:** alternativa B, persistencia oficial del SDK en localStorage disponible, persistSession true, autoRefreshToken true y detectSessionInUrl false. Proponer además **skipAutoInitialize false explícito**, como parte inseparable de revisar la inicialización. Ninguna opción se cambia en P5.

**Riesgos aceptados propuestos:** sesión accesible a JavaScript del mismo origen y posible permanencia al cerrar el navegador, únicamente con aprobación explícita; retrasos de sincronización y degradación por red/almacenamiento que se comuniquen honestamente. No supone autorización para datos privados.

**Riesgos no aceptables:** tokens/contraseñas en UI, logs o Git; éxito ficticio al restaurar; formularios operables durante restauración; persistencia silenciosa en equipo compartido; afirmar que Context/Rutas sustituyen RLS; restaurar una sesión cerrada por una carrera de refresh.

**Condiciones previas:** responsable revisa este plan y autoriza P6, acepta duración y almacenamiento para equipos compartidos, confirma el proyecto/entorno de pruebas y cuentas autorizadas existentes, acuerda tratamiento de almacenamiento inaccesible y errores, y revisa la estrategia de inicialización. No cambiar políticas del Dashboard para acelerar pruebas.

**Alternativa de menor riesgo si no se aprueba persistencia:** mantener A y las opciones actuales, con aviso de nuevo login al recargar. Reduce la permanencia de credenciales; no elimina XSS ni protege por sí sola datos.

## 7. Decisión propuesta para las tres opciones Supabase

| Opción futura | Propuesta y motivo | Reserva |
| --- | --- | --- |
| persistSession | true, SDK conserva sesión con access token, refresh token y datos de usuario; permite lectura tras recarga | localStorage no es una caja fuerte ni valida identidad/permiso; disponibilidad y sesión servidor condicionan la recuperación |
| autoRefreshToken | true, SDK programa renovación preventiva y emite TOKEN_REFRESHED | No implementar temporizadores ni rotación manuales; no garantiza red ni sesión indefinida |
| detectSessionInUrl | false, conservar alcance email/contraseña sin adoptar retornos no diseñados | Confirmación, recuperación y OAuth requieren análisis y callback autorizados por separado |

La renovación del SDK en navegador se coordina con visibilidad; al volver a primer plano recupera/revisa sesión. No llamar startAutoRefresh/stopAutoRefresh desde componentes ni introducir listeners paralelos. [Renovación oficial](https://supabase.com/docs/reference/javascript/auth-startautorefresh).

Por inspección de auth-js 2.118.0, una renovación fallida reintentable no borra necesariamente la sesión; un rechazo definitivo puede preservar el access token aún vigente hasta su caducidad y retirar sesión cuando ya expiró. TOKEN_REFRESHED indica actualización; SIGNED_OUT puede reflejar retirada. INITIAL_SESSION null no distingue siempre ausencia de sesión de un error al leer/renovar. No prometer logout inmediato ante todo fallo ni mantener visualmente autenticación indefinida cuando el SDK ya la retiró. Comprobar casos con mocks y cuenta propia; no manipular refresh tokens reales. Los tiempos efectivos y políticas dependen del servidor. [Sesiones oficiales](https://supabase.com/docs/guides/auth/sessions).

## 8. Riesgos de seguridad

Un script ejecutado en el mismo origen puede acceder al storage o usar las APIs de autenticación. React escapa texto interpolado, pero no elimina el riesgo de dependencias comprometidas, inyección en URLs/HTML u otros scripts. El almacenamiento en memoria también es accesible a ejecución maliciosa dentro de la aplicación.

| Control/riesgo | Evidencia actual y medida prevista |
| --- | --- |
| Renderizado e inyección | Inspección de src: React y texto; sin dangerouslySetInnerHTML, innerHTML o eval. No acredita auditoría completa de todas las dependencias/URLs. Mantener contenido no confiable fuera de HTML ejecutable. |
| Dependencias | package-lock y npm; sin nuevas dependencias. Lockfile facilita reproducibilidad, no certifica ausencia de vulnerabilidades. Revisión de cadena de suministro adicional antes de datos privados. |
| Configuración pública | Cliente usa variables VITE públicas y publishable; plantilla separa secretos; .env.local ignorado. No se leyó su contenido. Clave pública no otorga permisos que debieran faltar por RLS. |
| Almacenamiento manual | Búsqueda en src sin localStorage/sessionStorage ni guardado manual de credenciales. SDK sería único responsable de persistir. |
| Logging y errores | Servicios entregan mensajes neutrales y no objetos sensibles; src sin console. SDK puede advertir errores internos. Revisar consola/telemetría futura sin registrar sesiones ni habilitar debug con credenciales. |
| Extensiones | No controladas por React; permisos de extensión pueden exponer datos. Preferir perfiles de prueba confiables, no prometer aislamiento. |
| Equipos compartidos | Persistencia puede sobrevivir cierre/reapertura; cerrar sesión explícitamente y acordar política antes de B. No añadir «recordarme» en P6 sin alcance adicional. |
| Despliegue | HTTPS obligatorio fuera de desarrollo local; revisar CSP y scripts externos en el despliegue autorizado. No se verificaron cabeceras de producción. |

Los JWT de acceso caducan. Los refresh tokens permiten obtener nuevos pares según la política servidor y sus reglas de rotación. Logout local afecta la sesión actual; no promete invalidar instantáneamente todo access token ya emitido ni cerrar otros dispositivos. No copiar tokens desde Network ni guardarlos en informes. [Scopes y expiración tras logout](https://supabase.com/docs/guides/auth/signout).

Antes de datos privados reales: aprobación de almacenamiento y política de duración; HTTPS; revisión XSS/dependencias/logging; pruebas de cierre/renovación/errores; tablas con RLS y permisos mínimos probados con distintos usuarios, incluyendo denegaciones. No introducir tablas/RLS en P5/P6 por inferencia.

## 9. Consideraciones de AuthProvider

Actualmente inicializa not_configured si cliente null, error si falla su creación e initializing si existe cliente. Su callback síncrono procesa INITIAL_SESSION, SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED y USER_UPDATED con la misma proyección mínima; no espera llamadas Auth dentro del callback. Limpieza desactiva active y ejecuta unsubscribe. StrictMode repite configuración/limpieza en desarrollo; el singleton evita crear clientes nuevos por cada ejecución de render. Se debe mantener una sola suscripción viva, no exigir un único INITIAL_SESSION absoluto entre montajes de prueba. [Eventos oficiales](https://supabase.com/docs/reference/javascript/auth-onauthstatechange).

**Hallazgo por inspección, no prueba de persistencia ejecutada:** constructor con skipAutoInitialize true omite initialize. onAuthStateChange espera initializePromise, que puede ser null, y luego _emitInitialSession usa _useSession → __loadSession. Esta ruta sí lee storage y puede renovar por proximidad a expiración. Por tanto, es incorrecto afirmar que con skipAutoInitialize true jamás se restaura una sesión. Sin embargo, no realiza por sí sola la ruta _initialize → _recoverAndRefresh → _handleVisibilityChange que prepara renovación y recuperación por visibilidad. No basta cambiar persistSession/autoRefreshToken y confiar en la existencia de eventos. Los comentarios generales de inicialización diferida deben contrastarse con este camino concreto.

**Propuesta mínima:** quitar la omisión con skipAutoInitialize false. El constructor inicia initialize una vez; onAuthStateChange espera su promesa y lee el estado inicial, incluso si la suscripción llega después. No crear otro cliente ni duplicar carga con getSession en cada página. Alternativa si se justifica retener true: coordinar explícitamente initialize en un único lugar, antes de emitir la presentación definitiva; no elegida por defecto para esta SPA. [API initialize](https://supabase.com/docs/reference/javascript/auth-initialize).

**Límites del proveedor a resolver en P6:**

- El try/catch actual cubre registro síncrono de la suscripción; no todos los fallos asíncronos internos del SDK. _emitInitialSession puede informar null y registrar advertencia; error React no representa hoy todo fallo de renovación.
- Para errores explícitos de inicialización, evaluar observar el resultado de la misma initialize pública idempotente, sin segunda fuente de sesión: guardia active, error neutral y actualización condicionada a seguir initializing para no sobrescribir un evento posterior. No deshacer SIGNED_OUT ni una sesión nueva por una promesa antigua. Fallos recuperables absorbidos por SDK se prueban separadamente; no se convierten automáticamente en error por deducción.
- La proyección actual accede a session.user.id directamente. _isValidSession del SDK solo verifica presencia de tres campos y no verifica criptográficamente almacenamiento. Proponer guardia mínima de usuario/id antes de proyectar una sesión restaurada malformada, sin interpretar esa guardia como autorización ni parser propio de JWT.
- LoginPage oculta instrucciones/enlace en initializing, pero hoy el formulario sigue visible y habilitado, pues hasSession=false. P6 debe mostrar estado neutral «Comprobando sesión…» y ocultar/bloquear formulario hasta resolver inicialización. Adaptar el aviso actual de no persistencia. No cambiar navegación ni servicios.
- No añadir cronómetros de renovación, suscripciones globales o limpieza del singleton en cada cleanup. Cleanup elimina solo la suscripción de ese montaje; los mecanismos SDK pertenecen al cliente compartido.

Eventos entre pestañas: SDK construye BroadcastChannel con persistSession y clave disponible. La convergencia depende del navegador; comprobar cierre local compartido entre pestañas del mismo perfil/origen, reactivación y carreras de renovación. Scope local no equivale a cerrar otras sesiones/dispositivos. Una sesión revocada con JWT aún válido puede no detectarse hasta renovación o respuesta servidor.

## 10. Limitaciones de confirmación de correo

registerUser envía signUp y metadatos full_name sin callback propio ni emailRedirectTo adicional. Puede devolver aceptación sin sesión. Confirmar correo en servidor no implica que esta SPA adopte automáticamente una sesión al abrir el enlace; detectar URL permanece deshabilitado. El usuario confirmado puede usar login email/contraseña. No se verificaron políticas o URLs del Dashboard en P5.

Un callback formal requeriría escoger flujo compatible (p. ej. PKCE si se aprueba), revisar Site URL/allowlist de redirecciones y plantillas, tratar códigos/verificación/errores y limpieza de URL sin filtrar credenciales, navegación y pruebas de enlaces vencidos/reusados. No implementarlo ni activar detección implícitamente en P6.

## 11. Diferencia entre autenticación y autorización

Autenticación identifica al usuario ante Supabase Auth. La sesión observada por Context ayuda a presentar UI, pero storage y datos de usuario cliente no son prueba suficiente para autorizar.

Autorización decide qué filas/archivos puede leer o modificar cada usuario. Debe aplicarse en servidor con JWT validado, RLS/políticas y permisos de Storage cuando se implementen. Ni AuthProvider ni una ruta protegida de React protegen PostgreSQL. En este bloque no existen tablas de contratos ni RLS contractual implementadas; las rutas de panel/contratos siguen públicas y sin consultas privadas. Stellar/Soroban permanecen pendientes.

## 12. Matriz de pruebas para M2-B2-P6

**Plan NO EJECUTADO.** Cada fila define un caso futuro. M = mocks; N = navegador; C = cuenta real; E = esperar expiración real. «Complemento» exige ejecutar ambas capas para acreditar integración: mocks no demuestran comportamiento remoto. Perfiles aislados sin secretos y cuentas existentes propias; no nuevas cuentas por defecto. Reloj/respuestas simuladas solo en fixtures sin usuarios reales. No editar/copiar refresh tokens, cambiar expiraciones de Dashboard ni revocar sesiones ajenas. «Bajo» no implica autorización para operaciones fuera del alcance futuro.

| # / Caso | Precondición | Acción | Resultado esperado | M | N | C | E | Riesgo/efecto secundario |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 Sin sesión previa | Perfil aislado sin sesión | Abrir login | initializing neutral y luego signed_out con formulario | Sí | Sí | No | No | Bajo, sin peticiones de login |
| 2 Login satisfactorio | Cuenta propia confirmada o respuesta controlada | Enviar una vez | Éxito, sesión observada y persistida por SDK, sin contraseña guardada | Sí, complemento | Sí | Sí para real | No | Crea sesión propia |
| 3 Recarga inmediata | Login concluido | Recargar enseguida | Espera inicial sin formulario contradictorio y restauración coherente | Sí, complemento | Sí | Sí para real | No | Lectura SDK, posible red |
| 4 Sesión válida | Sesión propia vigente guardada por SDK | Abrir otra vez misma URL | session_present con usuario mínimo; no login adicional | Sí, complemento | Sí | Sí para real | No | Puede renovar según margen |
| 5 Inicialización lenta | Storage/SDK retardado en fixture | Abrir login | Estado neutral; sin acciones operables hasta resolver | Sí | Sí | No | No | Retraso solo en fixture |
| 6 Sin parpadeo | Recuperación lenta controlada | Observar fotogramas/DOM inicial | No aparece formulario de login ni registro antes de conocer estado | Sí | Sí | No | No | Bajo |
| 7 Logout local | Sesión propia activa | Pulsar logout una vez | Scope local, una petición; éxito solo tras resultado y signed_out | Sí, complemento | Sí | Sí para real | No | Termina sesión propia |
| 8 Recarga tras logout | Cierre confirmado | Recargar | signed_out, no resurrección ni sesión persistida utilizable | Sí, complemento | Sí | Sí para real | No | Bajo tras cierre |
| 9 Nuevo login | Cierre anterior | Autenticar nuevamente | Nueva sesión y UI coherente sin residuos de cierre | Sí, complemento | Sí | Sí para real | No | Crea otra sesión propia |
| 10 Access token caduca | Sesión propia y TTL vigente conocido sin copiar token | Mantener página abierta | Renovación preventiva o retirada coherente si ya no puede renovar | Sí, complemento | Sí | Sí para real | Sí; no con mocks | Espera; sesión puede terminar |
| 11 Renovación SDK | Sesión próxima al margen de renovación | Mantener visible y volver de fondo | TOKEN_REFRESHED y estado actualizado sin temporizador propio | Sí, complemento | Sí | Sí para real | Sí; no con mocks | Rotación oficial, sin manipulación |
| 12 Red temporal | Sesión de fixture, luego cuenta propia si se acuerda | Simular desconexión y retorno | Sin éxito falso; reintento SDK y estado según vigencia real | Sí, complemento | Sí | Solo complemento | No en fixture | Sin red puede caducar sesión |
| 13 Expirada/revocada | Respuesta inválida en fixture | Restaurar/renovar | No sesión ficticia; retirada/error neutral según SDK y vigencia | Sí, preferido | Sí | No; real solo con permiso separado | No en fixture | Revocación real puede afectar otras sesiones; no ejecutarla por defecto |
| 14 Storage corrupto | Storage de fixture vacío/malformado y JSON con user inválido | Inicializar | Sin crash/token en logs, no proyectar usuario inválido; salida/error neutral | Sí | Sí | No | No | Nunca alterar storage de una cuenta real; no exigir que todo JSON inválido sea borrado |
| 15 Dos pestañas | Mismo origen/perfil aislado | Login SDK en A y abrir B | Convergencia de estado/storage, sin bucles ni rotación casera | Sí, parcial | Sí, dos | Sí para complemento | No | Sesión compartida; probar sin BroadcastChannel también |
| 16 Logout en pestaña | A y B comparten sesión | Cerrar en A y observar B/reabrir | B converge a signed_out; no restaura al recargar | Sí, parcial | Sí, dos | Sí para complemento | No | Cierra sesión compartida, no otros dispositivos |
| 17 Cierre navegador | Perfil persistente de prueba con sesión propia | Cerrar completamente y reabrir | Recupera si navegador preservó datos y servidor permite; documentar modo privado | Parcial | Sí | Sí para real | No | Sesión permanece en equipo; cerrar al finalizar |
| 18 Sin configuración | Fixture/copia sin variables | Abrir SPA | not_configured sin peticiones Auth ni sesión inventada | Sí | Sí | No | No | No editar .env.local del trabajo |
| 19 StrictMode | Proveedor real en montaje de prueba | Montar/cleanup/remontar | Una suscripción viva; callback retirado no actualiza; singleton intacto | Sí | Sí | No | No | Sin destruir cliente compartido |
| 20 SIGNED_IN | SDK con respuesta controlada | Login y evento oficial | session_present; enlace/instrucciones ocultos; mensaje conservado | Sí, complemento | Sí | Sí para real | No | No inyectar eventos en producción |
| 21 SIGNED_OUT | Sesión controlada o propia | Cierre y evento SDK | signed_out, formulario/enlace recuperados | Sí, complemento | Sí | Sí para real | No | Fin de sesión propia |
| 22 INITIAL_SESSION | Sesión fixture válida o ausencia | Crear cliente con inicialización elegida | Evento posterior a carga; resultado coherente; sin concluir por mera recepción | Sí | Sí | No; complemento real en 4 | No | No afirmar validación servidor por lectura local |
| 23 TOKEN_REFRESHED | Fixture cercano a caducidad | Renovación oficial SDK | Estado mínimo actualizado, no credenciales en Context | Sí, complemento | Sí | Sí para real | Sí; no con mocks | Rotación y coordinación entre pestañas |
| 24 Sin tokens expuestos | Casos éxito/error/refresh | Inspeccionar UI/consola/telemetría | Sin tokens/sesiones ni passwords impresos; debug desactivado | Sí | Sí | No en fixture | No | No copiar Network sensible en evidencias |
| 25 Sin passwords guardadas | Fixture con contraseña sintética | Login y revisión acotada de storage | No password en storage/cookies; SDK guarda solo sesión prevista | Sí | Sí | No | No | No volcar almacenamiento de perfil real |
| 26 Registro conservado | Validaciones y respuestas de signUp en fixture | Repetir casos aceptados/rechazados | Mismos campos, seguridad, mensajes y bloqueo de duplicados | Sí | Sí | No por defecto | No | No generar usuarios; prueba real solo separada y autorizada |
| 27 Login conservado | Respuestas éxito/errores de fixture | Validar, fallar, reintentar, doble envío | Validaciones y contrato del servicio intactos | Sí | Sí | No; real en 2 | No | Sin spam al servidor |
| 28 Logout conservado | Sesión fixture con éxito/red/429 | Cerrar y reintentar si sesión sigue | Scope local, concurrencia bloqueada, estado observado respetado | Sí | Sí | No; real en 7 | No | SDK puede retirar sesión incluso con error |
| 29 Responsive | Estados inicial/carga/sesión/error | 320/390/768/1440 px, 200 %, teclado | Sin desbordamiento; foco, status y controles accesibles | Parcial | Sí | No | No | Bajo |
| 30 Checks técnicos | Alcance de P6 preparado | build, lint, diagnóstico, diff check | PASS, 22/22 diagnóstico; sin dependencias ni cambios ajenos | No necesarios | No | No | No | Build genera dist ignorado |
| 31 Storage bloqueado | Perfil/fixture sin localStorage disponible | Login y recarga | Degradación a memoria documentada, sin afirmar persistencia; sesión coherente | Sí | Sí | No | No | Si se bloquea después de crear cliente, comprobar excepciones de lectura/escritura |
| 32 Carrera refresh/logout | Fixture con renovación retardada | Cerrar durante renovación y completar respuesta | No resurrección de sesión ni duplicación de solicitudes propias | Sí | Sí | No | No | Solo fixture, sin rotar tokens reales manualmente |
| 33 Error de inicialización | Resultado error/throw de SDK controlado | Montar y desmontar antes de resolver | Error neutral si corresponde, sin sobreescribir estado más reciente ni callback tras cleanup | Sí | Sí | No | No | No fabricar estados de producción |

Antes de pruebas reales revisar las políticas vigentes por un integrante autorizado, sin modificarlas. Una inspección de almacenamiento con credenciales reales se limita a comprobar presencia/ausencia sin imprimir valores. Para expiración real, esperar el TTL efectivo; fixtures verifican ramas pero no sustituyen ese resultado. Si no se puede completar una prueba, registrarla pendiente, sin aprobarla por inferencia.

## 13. Plan mínimo de implementación

Solo propuesta, sujeta al prompt P6 completo y autorización.

| Archivo | ¿Previsto? | Justificación |
| --- | --- | --- |
| src/lib/supabaseClient.ts | Sí | Cambiar dos booleanos y resolver skipAutoInitialize false; mantener detectSessionInUrl false, singleton y validación. Sin storage/clave manual adicional. |
| src/pages/LoginPage.tsx | Sí | Inicialización neutral sin formulario operable ni parpadeo; actualizar aviso de recarga. Mantener C1, resultados, refs y logout local. |
| src/auth/AuthProvider.tsx | Ajuste focalizado propuesto | Guardar proyección ante usuario malformado y manejar resultado explícito de initialize si corresponde; sin otra fuente de sesión ni suscripción. Validar orden y cleanup en pruebas antes de elegir implementación exacta. |
| src/auth/authTypes.ts | No previsto | Los cinco estados ya expresan el ciclo; no añadir tokens ni estados sin necesidad demostrada. |
| src/auth/authContext.ts | No | Contrato mínimo ya suficiente. |
| src/auth/useAuth.ts | No | hasSession deriva del estado real y no requiere cambios. |
| Servicios login/logout/registro | No | Contratos y llamadas oficiales ya aprobados; no reescribirlos para persistir. |
| RegisterPage, App, main y UI compartida | No | Sin nuevo flujo, ruta o estado global. Mantener StrictMode. |
| Documentación y pruebas focalizadas | Sí, según autorización P6 | Registrar política real y evidencia de restauración/renovación; pruebas de inicialización, storage y carreras aportan garantías que build no cubre. |

Orden futuro: confirmar aprobación y baseline; revisar versión instalada; implementar configuración/inicialización y UI de espera; ejecutar mocks de matriz; verificar navegador con SDK; pruebas reales acotadas por responsable con cuenta existente; documentar resultados y pendientes. No publicar automáticamente. No tocar registro, callbacks, protección de rutas, backend o integración contractual.

## 14. Estrategia de reversión

1. Antes de P6 conservar una copia/diff acotado revisable de los archivos que se modificarán, sin secretos y sin perder P3/P4/C1. Identificar baseline por hash y cambios de cada prompt; HEAD publicado no contiene todos los avances aprobados.
2. Si hay regresión, revertir únicamente el delta de P6 mediante edición/patch revisado, no restaurar todo desde HEAD ni limpiar/stashear trabajo acumulado. Política previa: persistSession false, autoRefreshToken false, detectSessionInUrl false, skipAutoInitialize true; UI previa de no persistencia y proveedor previo documentados en baseline.
3. Restaurar configuración no borra automáticamente credenciales de localStorage generadas durante P6. Cambiar a memoria tampoco revoca la sesión remota. Antes de cambiar política, procurar logout oficial local desde el cliente persistente, comprobar resultado/estado y recarga en perfiles de prueba autorizados.
4. Si un fallo impide logout o hay datos remanentes, revisar una estrategia dirigida a la storageKey exacta y posibles claves auxiliares de esa versión/proyecto (usuario/verificador si existieran). No ejecutar limpieza en este bloque; no borrar por prefijos amplios, ni usar localStorage.clear/sessionStorage.clear. Borrar una clave local tampoco demuestra revocación servidor. Diferenciar perfil de prueba y sesión personal.
5. Validar reversión con build/lint/22 tests/diff y matriz acotada sin persistencia: login, recarga pierde sesión, cierre correcto, C1 y otras rutas conservadas. Verificar que otros datos del origen permanecen. Si se vuelve a habilitar persistencia, residuos no revisados podrían restaurarse: no dar por seguro el simple cambio de booleanos.

## 15. Preguntas o decisiones pendientes

- Responsable debe aprobar alternativa B y el riesgo/duración en equipos compartidos; si no, mantener A. No hay aprobación implícita de P6.
- Aceptar skipAutoInitialize false y el manejo mínimo de errores/inicialización; decidir degradación a memoria si el navegador bloquea storage. No prometer persistencia en todos los modos privados.
- Confirmar proyecto de pruebas, cuentas existentes autorizadas y políticas reales de sesión/TTL, sin pegarlas con credenciales al informe. No se conoce aquí su valor efectivo.
- Definir navegador/perfil mínimo soportado y pruebas multi-pestaña/BroadcastChannel. Falta evidencia runtime de persistencia/refresh para esta configuración futura.
- Confirmación/callback, protección de rutas, RLS y datos privados necesitan trabajo autorizado independiente; este diseño no los habilita.

Estas decisiones son condiciones de implementación; no impiden elaborar el diseño. Ningún integrante debe interpretar el documento como una configuración ya aplicada.

## 16. Criterios de aceptación de M2-B2-P6

- Política aprobada explícitamente y alcance mínimo revisado; código cambia solo en archivos autorizados.
- SDK inicializa realmente recuperación y renovación, no solo recibe un evento; no hay clientes/suscripciones duplicados ni escrituras manuales de tokens.
- UI neutral durante carga; sesión válida se restaura sin mostrar login; ausente/inválida/error se presenta con honestidad y sin crash.
- Login/registro/logout y C1 se conservan. Cierre local no reaparece al recargar ni ante refresh pendiente; otras pestañas convergen según soporte probado.
- Renovación y expiración verificadas con mocks y validación real autorizada; errores no producen éxito ficticio ni promesas de revocación inmediata.
- Sin contraseñas persistidas, tokens en logs/UI/Git, nuevas dependencias ni cambios del Dashboard no autorizados. Autorización de datos permanece separada.
- Matriz ejecutada con evidencias atribuibles; casos no realizados declarados pendientes. Build/lint/22 tests/diff PASS y regresión de ocho rutas.
- Reversión ensayada en entorno aislado, revisión de residuos dirigida y preservación de cambios previos. Documentación registra la política efectiva y limitaciones.

P5 entrega diseño y no acredita ninguno de esos comportamientos futuros como implementado. Persistencia actual DESHABILITADA. P6 NO EJECUTADO.

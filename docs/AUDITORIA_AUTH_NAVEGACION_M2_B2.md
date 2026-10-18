# Auditoría de autenticación y navegación protegida — M2-B2-P9

Fecha: 2026-10-17. Repositorio AcuerdoSeguro, rama `main`, base local `0e23f15039802537ee2708120526d797a8acae59`.

## 1. Resumen ejecutivo

**AUDITORÍA ELABORADA — PENDIENTE DE APROBACIÓN EXTERNA. Veredicto técnico: REQUIERE CORRECCIÓN antes del cierre de M2-B2.**

La arquitectura y la protección de navegación son coherentes dentro de su alcance. Se reprodujo un defecto MEDIO (F-01): una pestaña que ya confirmó logout conserva su resultado y, cuando otra inicia sesión, vuelve a esperar el cierre antiguo y muestra una discrepancia falsa. No se demostró acceso privado sin sesión, recuperación indebida de sesión cerrada ni redirección externa. No se identificaron hallazgos CRÍTICOS o ALTOS en los casos revisados; esto no garantiza ausencia de otras vulnerabilidades.

P8 sigue APROBADO por el responsable. P9 no otorga aprobación ni cierra M2-B2. Solo se escribe este informe y los dos documentos de continuidad; ningún arreglo de código está autorizado aquí.

## 2. Alcance de la auditoría

Lectura de AGENTS, estado, historial y planes P5/P7; entradas React, App, cliente, tipos/contexto/proveedor/hook/guard, servicios, registro/login, páginas privadas/verificación, layout y configuraciones públicas. Contraste de las aprobaciones con el código local, no solo con GitHub. Inspección del SDK instalado para distinguir sus tareas de las de React.

Pruebas existentes y simulaciones temporales en `/tmp`, perfiles Chrome aislados y respuestas Auth sintéticas. Sin usuarios reales, contraseñas reales, modificación del dashboard, SQL, RLS, contratos, dependencias ni código. No se abrió ni imprimió `.env.local`; el diagnóstico existente la carga internamente para su consulta de salud autorizada. No se ejecutaron operaciones Git de escritura o sincronización.

## 3. Estado oficial de M2-B2

M0 COMPLETADO; M1 COMPLETADO, APROBADO Y PUBLICADO; M2-B1 COMPLETADO Y APROBADO (2/2). P1–P8 APROBADOS; P4-C1 CORRECCIÓN APROBADA e incluida en P4, sin incrementar el conteo. M2 suma diez prompts aprobados: dos de B1 y ocho de B2. No se define el total restante de M2.

El responsable comunicó **14 comprobaciones manuales satisfactorias de P8**: públicas, bloqueo de panel/crear/detalle, tres retornos, login directo, recarga persistente, logout, segunda pestaña, historial, consola/accesibilidad/responsive y regresión/Git. Clasificación: **PASS MANUAL EXTERNO PREVIO**. Codex no ejecutó esas pruebas reales. Último aprobado: P8; último ejecutado: P9; auditoría pendiente de revisión y cierre del bloque pendiente.

## 4. Arquitectura Auth real

`src/main.tsx`: StrictMode → AuthProvider → App. `App.tsx`: BrowserRouter → Routes → AppLayout; rutas privadas bajo RequireAuth. El cliente diferido de `src/lib/supabaseClient.ts` es único por módulo y compartido por proveedor y servicios. El SDK administra sesión, storage, refresh y comunicación entre pestañas. React observa eventos; no administra tokens.

`authTypes.ts` define cinco estados; `authContext.ts` no inventa un valor autenticado por defecto; `useAuth.ts` exige proveedor y deriva usuario/hasSession del estado. `AuthProvider.tsx` expone solo id y correo opcional. Servicios separados usan signUp, signInWithPassword y signOut local; devuelven estados y mensajes seguros. Las páginas no escriben el Context ni crean otros clientes.

## 5. Matriz de trazabilidad P1-P8

Todas las aprobaciones de esta tabla son previas, comunicadas por el responsable. Las comprobaciones P9 no sustituyen esa aprobación.

| Prompt | Propósito y archivos principales | Comportamiento observable | Evidencia previa / aprobación | Nueva auditoría P9 | Riesgo residual |
| --- | --- | --- | --- | --- | --- |
| P1 | Arquitectura; main, authTypes, authContext, AuthProvider, useAuth | Cinco estados y usuario mínimo | Implementación local; APROBADO | PASS SIMULADO: proveedor real, ciclo de vida y eventos | Estado observado no autoriza filas |
| P2 | registerUser, RegisterPage | Registro tipado y respuesta neutral | Diez comprobaciones externas; APROBADO | PASS SIMULADO: validación, un envío, limpieza; PASS POR INSPECCIÓN: errores | Confirmación/correo y políticas dependen del backend |
| P3 | loginUser, LoginPage | Login por contraseña; tokens fuera de React | Doce comprobaciones externas; APROBADO | PASS SIMULADO: éxito, rechazo/reintento, respuesta tardía, retorno | Red y caducidad reales no repetidas |
| P4 | logoutUser, LoginPage | signOut local y confirmación observada | Siete comprobaciones externas tras C1; APROBADO | PASS SIMULADO: logout/recarga; FAIL: F-01 | Resultado de operación anterior permanece en UI |
| P4-C1 | LoginPage | Registro/instrucciones ocultos con sesión | CORRECCIÓN APROBADA, incluida en P4 | PASS POR INSPECCIÓN y montaje controlado de sesión | Enlaces globales de layout siguen públicos por diseño |
| P5 | PLAN_PERSISTENCIA_SESION | Diseño de persistencia/renovación | Diseño APROBADO | PASS POR INSPECCIÓN: correspondencia con P6 | Renovación remota pendiente |
| P6 | Cliente, AuthProvider, LoginPage | Restauración y refresh SDK; defensa contra INITIAL_SESSION tardío | Quince comprobaciones externas; APROBADO | PASS SIMULADO: recargas, logout, callbacks y StrictMode | Casos extremos de storage/red no exhaustivos |
| P7 | PLAN_PROTECCION_RUTAS | Clasificación, retorno y separación de RLS | Diseño APROBADO | PASS POR INSPECCIÓN: App y guard cumplen alcance | Autorización contractual futura |
| P8 | App, RequireAuth, LoginPage | Tres privadas, cinco estados y retorno consumido | 35 casos históricos (8 ejecutados, 26 simulados, 1 inspección) y 14 externos; APROBADO | PASS SIMULADO: guard/retorno/cuenta; PASS EJECUTADO: validador y UI | F-01 en transición posterior, reescrituras de despliegue pendientes |

## 6. Cliente Supabase

`getSupabaseClient()` devuelve null ante datos ausentes, clave sin prefijo publicable o URL no HTTP(S); crea el cliente una sola vez. No se encontró cliente alternativo en páginas/servicios. La validación del prefijo no certifica la autenticidad de la clave; el diagnóstico comprueba dominio HTTPS autorizado antes de consultar salud. HTTP permite desarrollo local: la conexión alojada de producción debe usar HTTPS.

Opciones reales: `persistSession: true`, `autoRefreshToken: true`, `detectSessionInUrl: false`, `skipAutoInitialize: false`. Sin initialize manual, timers propios de refresh, storage propio ni debug habilitado. Se mantienen los mecanismos del SDK instalado 2.118.0. Configuración pública VITE no equivale a credencial administrativa.

## 7. Registro

`registerUser.ts`: nombre y correo recortados, contraseña intacta; full_name es metadato del usuario, no identidad verificada ni rol. signUp sin clientes extra. Diferencia validación, límite, conectividad, falta de configuración y rechazo mediante mensajes sin detalles SDK; respuesta de aceptación neutral evita afirmar creación inequívoca de cuenta.

`RegisterPage.tsx`: nombre/correo/contraseña/confirmación, requisitos locales, mínimo de ocho caracteres y coincidencia; foco en primer error; ref síncrona contra duplicado; campos bloqueados y carga anunciada. Limpia ambas contraseñas al aceptar. P9 volvió a ejecutar validación vacía, aceptación sintética y doble submit con una sola petición. Matriz completa de errores backend y correo real: NO EJECUTADO en P9; aprobación previa se conserva. No hay navegación automática del registro.

## 8. Login

`loginUser.ts`: signInWithPassword reutiliza singleton, recorta correo y conserva contraseña. Comprueba usuario/sesión coherentes, tokens no vacíos, bearer y expires_at futuro; devuelve solo mensaje/estado. Distingue rechazo neutral, confirmación pendiente, límite, red, configuración y respuesta inesperada. No verifica firma JWT desde React ni confunde sesión con permiso contractual.

`LoginPage.tsx`: correo requerido con validación nativa y contraseña requerida; bloqueo durante inicialización/operaciones; refs evitan duplicados dentro del montaje. Limpia contraseña al éxito. La navegación requiere éxito compatible y session_present observado, no solo respuesta del servicio. P9 comprobó rechazo/reintento, éxito sin sesión observada y respuesta tardía con error/signed_out sin navegación. Login directo conserva la pantalla de sesión sin redirección predeterminada.

## 9. Logout

`logoutUser.ts` solo llama `auth.signOut({scope:'local'})`; clasifica fallos sin exponer datos y no cambia React manualmente. La UI anuncia cierre confirmado únicamente con respuesta satisfactoria y signed_out observado; espera hasta ocho segundos y permite reintento ante discrepancia. Login/logout simultáneos dentro del componente están bloqueados por refs.

**FAIL F-01:** el resultado success persiste después del cierre confirmado. Un SIGNED_IN posterior desde otra pestaña activa de nuevo awaitingSignOut y su temporizador sin existir una operación nueva. Los tres flujos privados con logout seguido de recarga se mantienen correctos; el defecto está en la presentación y disponibilidad temporal del botón de la pestaña que permanece montada en login.

El alcance local no cierra todos los dispositivos ni implica revocación instantánea de cada access token ya emitido. El backend debe validar solicitudes. Véase [signOut oficial](https://supabase.com/docs/reference/javascript/auth-signout).

## 10. Persistencia

El SDK selecciona localStorage si está disponible, con su clave de proyecto, o almacenamiento en memoria si no lo está. No hay persistencia paralela implementada por la app. El proveedor empieza neutral y espera INITIAL_SESSION/eventos; no consulta getSession redundante. Una sesión almacenada es dato del cliente y no prueba de autorización.

PASS SIMULADO P9: acceso directo sin sesión a cada privada, login/retorno, recarga con restauración y logout seguido de acceso bloqueado en las tres rutas; dos pestañas comparten el perfil sintético. Persistencia real APROBADA por las quince comprobaciones externas P6. Reinicio completo del navegador con sesión real: NO EJECUTADO por Codex P9; no se deduce de una simple recarga.

## 11. Renovación automática

autoRefreshToken activo, TOKEN_REFRESHED contemplado y sin refreshSession, setSession o procesos propios añadidos. La proyección del usuario y el guard no navegan innecesariamente al refrescar la misma cuenta; la actualización del mismo id conserva borrador local.

**RENOVACIÓN AUTOMÁTICA REAL — OBSERVACIÓN PENDIENTE.** Las pruebas controladas históricas con tiempo/red sintéticos y los eventos inyectados nuevos no equivalen a observar renovación remota. No se cambió JWT expiry ni se manipularon tokens reales. Aceptable como observación explícita del cierre previsto, no como PASS real.

## 12. AuthProvider y eventos

`stateFromSession`: null → signed_out; usuario ausente, id vacío o no string → error; sesión observada válida en estructura → session_present con id/correo opcional. No expone sesión ni tokens. Cliente null → not_configured; excepción de creación → error; cliente disponible → initializing.

Callback síncrono sin llamadas Auth dentro del listener: INITIAL_SESSION se aplica solo antes de otro cambio; SIGNED_OUT siempre retira usuario; SIGNED_IN/TOKEN_REFRESHED/USER_UPDATED proyectan sesión; otros eventos se ignoran. active=false y unsubscribe en cleanup impiden actualizaciones desde la suscripción anterior. P9 verificó proveedor real transpilado en memoria con cliente controlado, una suscripción viva tras StrictMode y cero al desmontar; callback antiguo ignorado; INITIAL_SESSION tardío no pisa login/logout; usuarios malformados producen error. Referencia: [eventos Auth](https://supabase.com/docs/reference/javascript/auth-onauthstatechange).

El catch cubre fallos síncronos de suscripción; no constituye captura universal de errores asíncronos internos del SDK. Una inicialización que nunca emita un evento puede prolongar initializing. No se demostró aquí un fallo real de esa clase; se mantiene como límite, sin inventar vulnerabilidad.

## 13. Rutas públicas y privadas

| Clasificación | Rutas reales en App.tsx | Evidencia P9 |
| --- | --- | --- |
| Pública | `/`, `/login`, `/registro`, `/verificar`, `*` | PASS EJECUTADO: carga y main único; 404 conserva URL |
| Privada | `/panel`, `/contratos/nuevo`, `/contratos/:id` | PASS SIMULADO: acceso directo, retorno, recarga y logout |

RequireAuth es padre sin path dentro de AppLayout. Ruta estática nuevo y dinámica :id conservadas bajo el mismo guard. Las páginas privadas siguen preliminares: no leen contratos del backend. BrowserRouter y layout únicos. No se añadió ruta comodín privada ni redirección silenciosa de 404. Reescrituras de URL directa en hosting: NO EJECUTADO; pendiente del despliegue.

## 14. RequireAuth

Usa exclusivamente useAuth, useLocation, Navigate y Outlet; no crea cliente ni listener. session_present monta Outlet por user.id; cambiar de cuenta reinicia estado local para evitar conservar borrador anterior. initializing ofrece status neutral sin montar hijos; signed_out redirige con replace; not_configured/error ofrecen mensaje y enlaces públicos sin ciclos.

PASS SIMULADO P9: los cinco estados, contador de render privado cero antes de sesión, error retira rama, salida bloquea de nuevo, cambio de id borra borrador y USER_UPDATED del mismo id conserva estado. La sesión observada no es una comprobación de permisos. No se detectó bypass del guard en los casos ejercitados.

## 15. Validación de redirecciones

`getSafeReturnPath()` en RequireAuth es compartido con LoginPage. Admite únicamente `/panel` o `/contratos/` seguido por 1–120 caracteres ASCII alfanuméricos, guion o guion bajo; incluye nuevo. Rechaza otros tipos y cualquier carácter fuera de ASCII permitido antes de comprobar las rutas; no decodifica entradas ni acepta query/hash.

PASS EJECUTADO P9: función real extraída por AST y transpilada temporalmente; **5 destinos admitidos y 45 rechazados**. Incluye esquemas HTTP(S), protocolos relativos, javascript/data, backslash, controles, puntos, segmentos vacíos, percent-encoding simple/doble, Unicode, rutas públicas/login y tipos inesperados. PASS SIMULADO adicional: 16 estados de navegación malformados/destinos inválidos no navegan con sesión activa. Sin enlaces externos abiertos. No se demostró open redirect.

## 16. Retorno posterior al login

Guard conserva solo pathname validado en `location.state.from`. LoginPage comprueba objeto no array y valida de nuevo la cadena. Espera sesión observada, fin de operaciones y resultados compatibles. Ref por location.key evita repetición; navigate interno con replace/state null consume intención. Sin destino válido no hay fallback al panel.

P9: PASS SIMULADO en los tres destinos con login controlado y en tres retornos con sesión ya presente; state queda null. Éxito aislado del servicio, error y respuesta tardía sin sesión no navegan. Recarga del login conserva intención de history.state en Chrome sin storage adicional; no es garantía de todos los navegadores. Sin ciclos en estos casos. Atrás/adelante y logout sin reutilización pertenecen además a la aprobación externa de P8; no se repitió exhaustivamente bfcache en P9. F-01 no es open redirect: conserva un resultado local antiguo, no convierte el destino en una URL externa.

## 17. React.StrictMode y concurrencia

PASS SIMULADO nuevo: montaje/cleanup/remontaje, una suscripción activa, cero tras unmount; callbacks anteriores ignorados; INITIAL_SESSION no pisa eventos posteriores; retorno con sesión ya activa sin bucles; resultado tardío de login no navega si estado no confiable. Refs sincrónicas de formularios bloquean solicitudes duplicadas; no son cancelación global del SDK.

LoginPage no cancela la petición Auth al desmontar: un cambio posterior de sesión del SDK puede ser legítimo y el proveedor lo observa. Las actualizaciones del componente desmontado no representan por sí solas una fuga entre usuarios. No se comprobó una carrera de exposición de datos. No se probaron todas las permutaciones de tiempos/red entre dispositivos. **Sí se comprobó F-01**, resultado de logout ya finalizado reactivado por otro login.

## 18. Seguridad de tokens y almacenamiento

PASS POR INSPECCIÓN: singleton y servicios no imprimen sesiones, contraseñas ni errores crudos; Context y retornos de servicios no transportan tokens; UI no almacena credenciales manualmente. Las contraseñas son estado temporal de formulario y se limpian tras éxito. No hay localStorage propio, admin client, service_role ni clave secreta implementados en src.

Escaneo dirigido nuevo de **43 archivos rastreados** de código/scripts/documentos públicos y configuración pública, sin valores reales de claves secretas, claves privadas, JWT literales o tokens GitHub detectados por los patrones utilizados. Los marcadores sintéticos del test de diagnóstico no son secretos. Es una revisión dirigida, no una prueba matemática de ausencia de todo secreto. `.env.local` ignorado por `.gitignore:15` y no rastreado; su contenido no se inspeccionó. Los servicios locales no rastreados se revisaron solo para su lógica.

localStorage es accesible al JavaScript del mismo origen: una ejecución XSS podría robar la sesión. No se encontró uso de HTML arbitrario en los flujos inspeccionados. No se demuestra resistencia a cualquier XSS ni equivalencia con cookies HttpOnly. No se añadieron CSP ni rediseños de almacenamiento fuera del alcance.

## 19. Autenticación frente a autorización

El guard controla vistas de una SPA, no la API ni PostgreSQL. Incluso un usuario que manipule su almacenamiento o un id no debe obtener filas ajenas. No existen tablas finales, permisos por participante, RLS contractual, firmas o comprobación de identidad legal en este bloque. El detalle de contrato muestra referencia preliminar, no datos privados autorizados.

Antes de datos reales, diseñar modelo y políticas RLS que protejan lecturas y escrituras ante llamadas directas. Una clave publicable no sustituye esas políticas. Referencia: [RLS oficial de Supabase](https://supabase.com/docs/guides/database/postgres/row-level-security). No se escribió SQL ni se comprobó remotamente una política inexistente.

## 20. Amenazas y controles

| Amenaza | Control o límite observado | Evidencia y riesgo residual |
| --- | --- | --- |
| XSS | React representa texto; no HTML arbitrario en flujos revisados | PASS POR INSPECCIÓN; XSS de dependencias/futuro no descartado |
| Robo de tokens mismo origen | Tokens fuera de Context/UI, pero SDK persiste en localStorage | PASS POR INSPECCIÓN; no protegido frente a JS malicioso del mismo origen |
| Equipo compartido | Aviso de cerrar sesión y logout local | PASS POR INSPECCIÓN; sesión permanece si usuario no sale |
| Retorno malicioso | Lista estricta, tipos, sin decodificación ni query/hash | PASS EJECUTADO/PASS SIMULADO; sin open redirect demostrado |
| Manipular id de contrato | Solo vista preliminar; guard sin permisos por fila | PASS POR INSPECCIÓN; RLS obligatoria antes de datos reales |
| API directa | Guard no intercepta API | NO EJECUTADO contra datos privados; falta RLS pertenece a siguiente bloque |
| Expiración navegando | Refresh/eventos SDK, error/signed_out retiran privada cuando observados | PASS POR INSPECCIÓN y eventos PASS SIMULADO; caducidad remota NO EJECUTADO |
| Logout en otra pestaña | SDK comunica eventos y guard reacciona | PASS MANUAL EXTERNO PREVIO P8; F-01 tras login posterior, no bypass |
| Red interrumpida | Servicios clasifican error; no fabrican éxito | PASS POR INSPECCIÓN; todas las carreras offline no reproducidas |
| Storage corrupto | SDK valida/restaura; proveedor rechaza usuario malformado | PASS SIMULADO P9 para payload y evidencia histórica P6 para JSON; no validación criptográfica cliente |
| Revelación por errores | Mensajes neutrales y tipados | PASS POR INSPECCIÓN; no imprime respuesta SDK |
| Datos sensibles en logs | Sin logging propio de tokens/credenciales | PASS POR INSPECCIÓN; captura sintética sin excepciones, no auditoría global de SDK/telemetría |

## 21. Accesibilidad y responsive

Formularios con labels, autocomplete, errores asociados, aria-invalid/describedby y foco de validación; status/alert y campos bloqueados durante envío. Login oculta formulario/registro al restaurar o tener sesión; guard ofrece espera y salidas públicas. Layout tiene skip link, nav y un main enfocable. Enlaces globales de registro/login permanecen disponibles por diseño; no conceden acceso privado.

PASS EJECUTADO nuevo: guard en initializing/not_configured/error a **320, 390, 768 y 1440 px**, con texto al **200 %**, sin desbordamiento horizontal en la medición; Tab, Shift+Tab y Enter recorren/activan enlaces del aviso, foco visible. Capturas temporales fuera de Git. Las pruebas usan estados controlados, no backend real. Validación y foco de registro PASS SIMULADO; revisión de atributos de login/registro PASS POR INSPECCIÓN. El responsable aprobó accesibilidad/responsive P8; no se atribuye a una nueva auditoría WCAG ni a lectores de pantalla reales. F-01 anuncia un error falso en una región alert, por lo que también afecta comprensión accesible.

## 22. Pruebas y evidencia

### Nuevas ejecuciones P9

| Comprobación | Clasificación | Resultado y alcance |
| --- | --- | --- |
| npm run build | PASS EJECUTADO | tsc y Vite correctos; 108 módulos; JS 544,11 kB; advertencia conocida >500 kB |
| npm run lint | PASS EJECUTADO | Sin errores |
| npm run supabase:check:test | PASS SIMULADO | 22/22; herramienta real con red simulada |
| git diff --check | PASS EJECUTADO | Sin errores de whitespace |
| npm run supabase:check | PASS EJECUTADO | Primer intento DNS restringido; repetición autorizada fuera del aislamiento: salud Auth HTTP 200. No login |
| Validador real | PASS EJECUTADO | 50 entradas: 5 válidas/45 rechazadas |
| Rutas públicas y 404 | PASS EJECUTADO | Cinco rutas, main único y URL conservada |
| Privadas con SDK/red controlados | PASS SIMULADO | Tres accesos bloqueados, login/retorno, intención consumida, restauración y logout/recarga |
| Guard/LoginPage reales con Context/MemoryRouter | PASS SIMULADO | Cinco estados, render privado bloqueado, 16 estados inválidos, tres retornos activos, rechazo/reintento, respuesta tardía, cambio de cuenta y borrador |
| AuthProvider real transpilado temporalmente | PASS SIMULADO | StrictMode, cleanup, eventos tardíos, proyección mínima y usuario malformado |
| Registro sintético | PASS SIMULADO | Validación/foco, un envío ante duplicado y limpieza de contraseñas |
| Guard: teclado y cuatro anchos/200 % | PASS EJECUTADO | Tab/Shift+Tab/Enter y ausencia de desbordamiento; estados controlados |
| Dos pestañas, logout confirmado y login posterior | FAIL | Reproducción F-01 con SDK real y respuestas sintéticas; botón bloqueado y error falso |
| Escaneo público, arquitectura y alcance | PASS POR INSPECCIÓN | Sin secretos reales detectados por patrones; no dependencias/contratos nuevos |
| Cuentas reales/renovación real/reinicio total/hosting producción | NO EJECUTADO | Sin credenciales reales ni cambio de configuración remota |

Los scripts temporales P9 se ejecutaron contra código actual servido en localhost:5173: validador, two-tabs, regression, responsive, provider y routes. Chrome inicial no pudo iniciar su conexión CDP dentro del aislamiento; se repitió autorizado fuera de él. No se interpreta ese fallo de herramienta como fallo de la app. No se inició ni detuvo el servidor Vite preexistente del usuario. No se conservaron pruebas nuevas en el repositorio. La salida final de las matrices completadas no registró excepciones de aplicación; eso no garantiza ausencia de toda advertencia SDK.

### Evidencia histórica separada

P6: pruebas controladas y quince comprobaciones del responsable, **PASS MANUAL EXTERNO PREVIO**. P8: matriz histórica de 35 (8 PASS EJECUTADO, 26 PASS SIMULADO, 1 PASS POR INSPECCIÓN), más catorce pruebas del responsable, **PASS MANUAL EXTERNO PREVIO**. Estos números no se suman como nuevas ejecuciones P9. Registro/login/logout reales continúan aprobados externamente.

## 23. Hallazgos clasificados

| ID | Severidad | Archivo y ubicación | Evidencia concreta | Escenario | Impacto | Reproducibilidad | Corrección mínima sugerida | ¿Bloquea cierre? | Etapa |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| F-01 | MEDIO | src/pages/LoginPage.tsx:31–53, 178–203 | logoutResult success retenido; awaitingSignOut vuelve true al recibir session_present; timer anuncia discrepancia | A login/logout confirmado permanece en login; B login mismo perfil; A recibe sesión nueva | Cerrar sesión deshabilitado ~8 s; status y alert falsos; no se demostró pérdida de autorización ni datos | Reproducido en Chrome aislado con SDK instalado y Auth sintético; nueva sesión observada; tras 8,5 s botón habilitado y alert falso | Vincular espera/resultado a operación pendiente y finalizarlo al confirmar signed_out; descartar resultados obsoletos ante sesión posterior. Preservar mensaje de cierre confirmado y controles de concurrencia | Sí, recomendación técnica antes de cierre; no es bloqueo automático CRÍTICO/ALTO | M2-B2; corrección propuesta, no ejecutada |
| I-01 | INFORMATIVO | src/lib/supabaseClient.ts:25–28; AuthProvider eventos | autoRefresh activo, solo simulaciones y configuración inspeccionada | Renovación remota | Falta observación real, no defecto demostrado | NO EJECUTADO con cuenta real | Observación posterior autorizada sin cambiar JWT expiry | No por sí solo; aceptar explícitamente limitación | M2-B2 observación |
| I-02 | INFORMATIVO | src/App.tsx; páginas privadas; futuro modelo | Guard sin consultas ni RLS contractual | Datos reales/identificadores/API | Guard no autoriza filas; no se demostró fuga actual de contratos | PASS POR INSPECCIÓN; autorización remota NO EJECUTADO | Diseñar modelo/RLS antes de persistir contratos | No para alcance Auth; sí impide afirmar seguridad de futuros datos | M2-B3 propuesto |
| I-03 | INFORMATIVO | Salida Vite de npm run build | Chunk JS 544,11 kB | Carga inicial | Coste de descarga, compilación correcta | PASS EJECUTADO | Evaluar división de carga cuando se autorice optimización | No | Optimización futura |

Pasos exactos F-01: (1) abrir A en login y completar acceso; (2) cerrar y observar «Has cerrado sesión correctamente»; (3) mantener A montada; (4) abrir B en mismo perfil/origen y completar login; (5) A muestra «Confirmando cierre...» deshabilitado y «Esperando la confirmación...»; (6) después de ocho segundos muestra «no se pudo confirmar el cierre» pese al cierre anterior confirmado y la nueva sesión legítima. Recargar A reconstruye estado local y elimina el síntoma; no es una corrección. No se requiere sesión de otra persona para reproducirlo.

No se identificaron otros defectos concretos con evidencia suficiente para clasificar como vulnerabilidad. Los límites asíncronos, la persistencia en equipo compartido y XSS se registran como riesgos, no como exploits comprobados.

## 24. Riesgos residuales

Mantener F-01 hasta un prompt correctivo; no usar su alert como prueba de que el SDK cerró la sesión nueva. localStorage comparte confianza con JS del origen; dispositivos compartidos requieren logout. Red, almacenamiento bloqueado y suspensión de pestañas pueden retrasar observación. Manipular datos del cliente no debe otorgar acceso al backend. El SDK no convierte usuario observado en identidad legal. Refresh real, reinicio completo y despliegue/reescrituras continúan sin evidencia nueva P9. No se probó compatibilidad en los cinco equipos ni en todos los navegadores.

## 25. Recomendación de cierre o corrección

**REQUIERE CORRECCIÓN.** Proponer, sin ejecutar, **M2-B2-P9-C1 — Corrección del ciclo de resultados de logout entre sesiones**. Alcance mínimo: LoginPage, aislamiento/finalización de resultado de operación; regresión con dos pestañas y nuevo login tras cierre confirmado, reintento de logout, timeout legítimo, retorno, doble envío y eventos tardíos. No rediseñar proveedor, storage o servicios salvo evidencia posterior que lo exija.

F-01 MEDIO debe resolverse antes del cierre recomendado porque presenta como pendiente un cierre ya confirmado y retrasa el control de logout. No se marca BLOQUEADO automáticamente por un MEDIO; la auditoría está elaborada y espera revisión externa. I-01/I-03 pueden aceptarse temporalmente de forma explícita. I-02 limita el siguiente bloque; no es un bug de autenticación ni permiso para almacenar contratos sin RLS. Ninguna aprobación previa se revoca automáticamente; cierre de M2-B2 pendiente.

## 26. Próximo bloque propuesto

**M2-B3-P1 — Diseño del modelo de datos y seguridad RLS de contratos. PROPUESTO — NO EJECUTADO**, sujeto a confirmación después de resolver F-01 y aprobar externamente P9/cierre. Prioridad inmediata propuesta: correctivo P9-C1, que también necesita su prompt autorizado. Base de datos contractual, Stellar y Soroban siguen pendientes. No se inventa un número de prompts restantes.

## 27. Criterios de aceptación para cierre de M2-B2

1. Responsable revisa este informe, trazabilidad y distinción entre pruebas reales previas, simulaciones nuevas e inspección.
2. F-01 corregido mediante prompt autorizado y escenario de dos pestañas verificado, sin regresión de cierre confirmado, timeout/reintento o retorno.
3. Build, lint, diagnóstico 22/22, diff check y conservación de Git satisfactorios tras el correctivo.
4. Registro, login, logout, persistencia y tres rutas privadas conservan sus aprobaciones; sin contenido privado antes de sesión ni intención de retorno reutilizada indebidamente.
5. Renovación real permanece expresamente pendiente mientras no se observe; no se declara PASS real sin evidencia.
6. Mantener frontera Auth/RLS y prohibir acceso a datos reales sin autorización de backend diseñada y probada en su bloque.
7. Aprobación externa explícita de P9 y cierre de M2-B2 antes de confirmar B3. Este informe no concede esa aprobación.
8. Solo tres documentos afectados por P9: dos documentos iniciales modificados y un informe nuevo. Comparación SHA-256: 55 de los 57 archivos iniciales idénticos, incluidos todo el código, servicios, planes y dependencias. main/HEAD intactos, staging vacío; sin commits, push o sincronización. `.env.local` ignorado y no rastreado.

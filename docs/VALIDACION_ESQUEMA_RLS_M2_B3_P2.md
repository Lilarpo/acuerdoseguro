# M2-B3-P2 — Validación de migración local de borradores privados

**Estado:** MIGRACIÓN PREPARADA LOCALMENTE — PENDIENTE DE REVISIÓN EXTERNA. **VALIDACIÓN SQL REAL — NO EJECUTADA. PRUEBAS REALES DE RLS — NO EJECUTADAS.** Ningún SQL se aplicó al proyecto Supabase compartido.

## 1. Objetivo

Revisar una única migración versionada que permita guardar borradores contractuales privados del creador autenticado. Este documento distingue lo observado en los archivos, la inspección estática y las pruebas de base de datos aún pendientes.

## 2. Estado previo aprobado

M0 y M1 cerrados; M2-B1 aprobado; M2-B2 aprobado técnicamente. El responsable aprobó M2-B3-P1 para comenzar únicamente con borradores privados, RLS desde el inicio, acceso del creador y sin participantes, invitaciones, aceptación, firma ni conexión React. Esa aprobación no valida el SQL de P2.

## 3. Rama y commit base

Repositorio `Lilarpo/acuerdoseguro`, rama `relevo/m2-b2-p9c1-20261017`, HEAD `dae6bbe7516afb5c01660fb143e32e12ee96cd5c`. Al iniciar P2 había solo los tres cambios documentales esperados de P1, sin staging ni conflictos; permanecen intactos salvo las actualizaciones autorizadas de continuidad.

## 4. Referencia al diseño P1

[PLAN_MODELO_DATOS_RLS_CONTRATOS.md](PLAN_MODELO_DATOS_RLS_CONTRATOS.md) es la fuente del esquema candidato, matriz de autorización y amenazas. La tabla inicial `contracts` sigue el modelo de borrador propio. Se pospone `contract_participants` porque la inserción atómica y la confirmación de la contraparte no están aprobadas.

## 5. Decisiones heredadas de P1

El creador autenticado es el propietario técnico; solo puede leer y editar su borrador. El estado inicial y único es `draft`. Un nombre o correo escrito por el creador no demuestra identidad ni confiere permiso. Borrado, contraparte, versiones, aprobación, firma, Storage y Stellar quedan cerrados. La acción FK `ON DELETE RESTRICT` es una elección conservadora de esta propuesta: evita pérdida automática de contratos, pero debe revisarse junto con la política de eliminación de cuentas antes de P3.

## 6. Alcance real de P2

Se crea SQL **local**, no un esquema activo. No cambia `src/`, dependencias, configuración ni datos remotos. La UI todavía no guarda ni consulta contratos. No existe tabla de participantes, invitaciones o evidencia.

## 7. Inventario de infraestructura PostgreSQL existente

Al inicio no existía `supabase/`, configuración local PostgreSQL ni migración previa en el repositorio. No se encontraron binarios `supabase`, `psql`, `postgres`, `pg_ctl` o `docker` en PATH. No se comprobó ni se presupone que el proyecto compartido carezca de objetos. No hay base local aislada demostrada; por ello no se ejecutó SQL ni se simularon roles.

## 8. Archivo de migración creado

[`20261018032013_create_private_contract_drafts.sql`](../supabase/migrations/20261018032013_create_private_contract_drafts.sql) es la única migración nueva. El prefijo es timestamp UTC. Una transacción agrupa creación, índice, activación RLS, grants y políticas para impedir una exposición intermedia si se aplica mediante un ejecutor transaccional compatible. P3 debe verificar cómo ejecuta migraciones su herramienta concreta.

## 9. Descripción detallada de la tabla

`public.contracts` contiene una fila por borrador privado. El UUID opaco identifica la fila, pero no concede acceso. `created_by` referencia la PK de `auth.users`; no usa correo, nombre ni datos de perfil como autoridad. `title`, `description` y `terms` son texto contractual confidencial. `status` permanece en `draft`. Solo se guarda `created_at`; se omiten `updated_at` y `revision` candidatos de P1 porque sin trigger/RPC de servidor serían metadatos engañosos o manipulables. Antes de edición concurrente en UI se requiere un mecanismo de revisión real.

## 10. Columnas y restricciones

| Columna | Tipo y regla | Motivo |
| --- | --- | --- |
| `id` | `uuid` PK, `gen_random_uuid()` | Identificador estable no secuencial; no es control de acceso. |
| `created_by` | `uuid NOT NULL DEFAULT auth.uid()`, FK `auth.users(id) ON DELETE RESTRICT` | Vincula cuenta creadora y evita borrado en cascada. |
| `status` | `text NOT NULL DEFAULT 'draft'`, CHECK solo `draft` | No habilita transiciones contractuales. |
| `title` | `varchar(120) NOT NULL`, CHECK `btrim` no vacío | Coincide con límite actual de UI. |
| `description` | `text NOT NULL`, CHECK `btrim` no vacío | Contenido existente del formulario. |
| `terms` | `text NOT NULL`, CHECK `btrim` no vacío | Cláusulas existentes del formulario. |
| `created_at` | `timestamptz NOT NULL DEFAULT now()` | Fecha de creación asignada por DB. |

Índice `(created_by, created_at DESC)` para listar borradores propios en orden reciente y filtrar la política. P1 dejó abiertos los máximos de descripción/cláusulas; no se inventa un límite numérico en esta migración. P3 debe decidirlos o aceptar explícitamente el riesgo de textos grandes antes del despliegue. El CHECK de `title` verifica espacios y la longitud la garantiza `varchar(120)`; no normaliza ni recorta el texto.

**Mapeo futuro de siete campos de React:** `title → title`, `description → description`, `terms → terms`. `participantOneName`, `participantOneEmail`, `participantTwoName`, `participantTwoEmail` **no se persisten** en esta fase. El primer par no determina `created_by`, y el segundo no acredita contraparte. Antes de conectar React habrá que explicar en la UI qué se guarda y decidir el tratamiento de esos cuatro valores.

## 11. Identidad y propiedad

`auth.uid()` aporta el UUID de la sesión para el valor predeterminado de `created_by`. La política INSERT verifica además que la fila resultante pertenece al mismo UUID no nulo. El cliente solo recibe INSERT de tres columnas de contenido: no puede declarar `created_by`, `id`, `status` ni `created_at`. La FK evita referencias a cuentas inexistentes; no prueba identidad legal. Supabase Auth puede asignar el rol `authenticated` a usuarios anónimos de Auth si esa modalidad se habilita en el futuro; esa configuración requiere revisión específica antes de exponer datos contractuales.

## 12. Políticas RLS definidas en SQL

La migración habilita RLS y define tres políticas `TO authenticated`, siempre con `auth.uid()` no nulo y comparación con `created_by`:

| Política | Cláusula | Efecto |
| --- | --- | --- |
| `contracts_select_own_drafts` | `USING` | Solo filas propias en `draft`. |
| `contracts_insert_own_drafts` | `WITH CHECK` | Solo fila nueva propia en `draft`. |
| `contracts_update_own_drafts` | `USING` y `WITH CHECK` | Fila anterior y resultante propias y en `draft`. |

`USING` selecciona filas existentes; `WITH CHECK` valida la fila que se inserta o queda tras UPDATE. La política SELECT también permite que un UPDATE autorizado vea su fila. No hay política para `anon` ni DELETE. Son definiciones locales, no políticas activas en remoto. [Guía RLS de Supabase](https://supabase.com/docs/guides/database/postgres/row-level-security), [CREATE POLICY de PostgreSQL](https://www.postgresql.org/docs/current/sql-createpolicy.html).

## 13. Permisos GRANT/REVOKE

La migración revoca `ALL` de la tabla a `PUBLIC`, `anon` y `authenticated` para neutralizar grants predeterminados amplios. Concede a `authenticated` SELECT de tabla, INSERT solo de `title`, `description`, `terms` y UPDATE solo de esas tres columnas. No concede DELETE. Los roles de administración que aplican migraciones conservan sus privilegios inherentes; `service_role` puede eludir RLS y jamás debe exponerse al navegador. Verificar grants y membresías efectivos en P3, incluidos privilegios preexistentes inesperados del proyecto. [Seguridad de columnas de Supabase](https://supabase.com/docs/guides/database/postgres/column-level-security).

## 14. Protección de columnas inmutables

`id`, `created_by`, `status` y `created_at` carecen de grant UPDATE para `authenticated`; el grant de tabla UPDATE se revoca antes de conceder solo tres columnas. El cliente tampoco recibe INSERT explícito sobre esas columnas. El CHECK de estado añade una defensa independiente. RLS por sí sola no impediría cambiar `id` o `created_at`; la restricción de columnas es esencial. Una función privilegiada futura necesitará revisión propia.

## 15. Política de borrado

DELETE queda denegado por ausencia de grant y política. `ON DELETE RESTRICT` en la FK evita pérdida automática si se intenta eliminar la cuenta creadora; puede bloquear esa operación y requiere una decisión de conservación/privacidad antes de aplicar P3. No se incluye `DROP`, `TRUNCATE` ni reversión ejecutable destructiva.

## 16. Seguridad frente a contratos ajenos

Una cuenta B con su JWT no satisface `created_by=auth.uid()` para la fila de A: SELECT no la ve; UPDATE no la selecciona; INSERT con identidad de A no puede superar permisos de columna ni `WITH CHECK`. Una URL con el UUID de A no altera estas reglas. La llave publicable sin JWT de usuario usa `anon`, sin grants ni política. La ausencia y la invisibilidad de una fila pueden producir respuestas distintas según operación y error de privilegios; P3 debe revisar la divulgación por REST.

## 17. Riesgos de acceso directo por API

PostgREST o una consulta SQL con rol `authenticated` deben pasar por grants y RLS aunque React o `RequireAuth` no intervengan. La prueba decisiva es la llamada directa con JWT propio y ajeno, incluido `INSERT ... RETURNING`, `UPDATE ... RETURNING`, filtros por UUID y peticiones sin token. Una sesión caducada debe tratarse como no autenticada. Nunca enviar `service_role` al cliente. Los propietarios de la tabla y roles con BYPASSRLS no sirven para demostrar aislamiento.

## 18. Revisión estática del SQL y posibles problemas

**PASS POR INSPECCIÓN**, sin validación por parser/servidor: `CREATE TABLE` define PK UUID, FK solo a `auth.users(id)`, NOT NULL, defaults, CHECK y `timestamptz`; el índice comienza por `created_by`; RLS se habilita antes del commit; grants se reducen; las políticas de lectura/inserción/edición comprueban identidad y estado; UPDATE protege fila previa y nueva; DELETE no tiene grant/política; no hay función, trigger, RPC, `SECURITY DEFINER`, SQL destructivo, datos de prueba ni secretos. `gen_random_uuid()` se supone disponible en la versión PostgreSQL del proyecto Supabase; P3 debe confirmarlo. SQL ejecutable y comportamiento real **NO VERIFICADOS**. Revisar en P3 posible colisión de `public.contracts`, política/grant ajenos, ejecutor transaccional, privilegios efectivos, acción FK y límites de texto.

## 19. Pruebas ejecutadas por inspección o localmente

La inspección de archivos y del SQL fue estática. No se encontró base local aislada ni herramientas `psql`/Supabase CLI, por lo que **VALIDACIÓN SQL REAL — NO EJECUTADA** y **PRUEBAS REALES DE RLS — NO EJECUTADAS**. Los comandos frontend y el diagnóstico Auth se registran en el historial; no acreditan SQL. Las filas de la matriz siguiente son diseño, todas **NO EJECUTADO**.

## 20. Matriz de pruebas futuras

Actores: A = cuenta creadora, B = otra cuenta, Ø = sin JWT; `auth` indica rol authenticated. Entorno futuro: proyecto de desarrollo identificado, sin datos personales reales. Métodos: DB = cliente SQL no propietario/sin BYPASSRLS con claims de prueba válidos; REST = API directa con JWT de prueba; CAT = catálogo PostgreSQL/plan `EXPLAIN` sin datos sensibles. **Todos los escenarios están NO EJECUTADOS.** Un rechazo puede ser error de privilegio/constraint o cero filas según la operación; cada expectativa lo aclara.

| ID | Actor | Precondición | Operación | Resultado esperado | Control | Método futuro | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | A | Sesión válida | INSERT con contenido válido y defaults | Una fila propia `draft` | Default, INSERT, WITH CHECK | DB+REST | NO EJECUTADO |
| R02 | Ø | Sin sesión | INSERT de borrador | Denegado | Grant/rol | REST | NO EJECUTADO |
| R03 | B | Cuenta A existente | INSERT con `created_by=A` | Denegado | Grant de columna y WITH CHECK | DB+REST | NO EJECUTADO |
| R04 | A | Borrador de A | SELECT por UUID | Fila propia | SELECT USING | DB+REST | NO EJECUTADO |
| R05 | B | Borrador de A | SELECT por UUID | Cero filas | SELECT USING | DB+REST | NO EJECUTADO |
| R06 | A | Dos borradores de A | SELECT lista | Solo propios | SELECT USING | DB+REST | NO EJECUTADO |
| R07 | B | Borradores de A y B | SELECT lista | Ninguno de A | SELECT USING | DB+REST | NO EJECUTADO |
| R08 | A | Borrador de A | UPDATE `title` | Éxito, mismo propietario | UPDATE USING/WITH CHECK y grant | DB+REST | NO EJECUTADO |
| R09 | B | Borrador de A | UPDATE `title` | Cero filas | UPDATE USING | DB+REST | NO EJECUTADO |
| R10 | A | Borrador de A | UPDATE `created_by=B` | Denegado | Grant de columna | DB+REST | NO EJECUTADO |
| R11 | A | Borrador de A | UPDATE `id` | Denegado | Grant de columna | DB+REST | NO EJECUTADO |
| R12 | A | Borrador de A | UPDATE `created_at` | Denegado | Grant de columna | DB+REST | NO EJECUTADO |
| R13 | A | Borrador de A | UPDATE `status='signed'` | Denegado | Grant y CHECK | DB+REST | NO EJECUTADO |
| R14 | A | Borrador de A | DELETE propio | Denegado | Sin grant/política | DB+REST | NO EJECUTADO |
| R15 | B | Borrador de A | DELETE ajeno | Denegado | Sin grant/política | DB+REST | NO EJECUTADO |
| R16 | Ø | Borrador de A | SELECT/UPDATE | Denegado | Sin grant/política anon | DB+REST | NO EJECUTADO |
| R17 | Ø | Solo publishable key | GET `/rest/v1/contracts` | Denegado | Sin JWT/grant anon | REST | NO EJECUTADO |
| R18 | B | UUID de A conocido | GET/PATCH directos | Cero filas afectadas | RLS independiente de UI | REST | NO EJECUTADO |
| R19 | A | Borradores A y B | SELECT filtrado y sin filtro | Solo A | SELECT USING | DB+REST | NO EJECUTADO |
| R20 | A | Sesión válida | INSERT sin `created_by` | Default A, éxito | INSERT WITH CHECK | DB+REST | NO EJECUTADO |
| R21 | B | Fila de A | UPDATE apuntando a A | Cero filas | UPDATE USING | DB+REST | NO EJECUTADO |
| R22 | A | Fila de A | UPDATE contenido y `created_by=B` | Denegado | UPDATE WITH CHECK + grant | DB+REST | NO EJECUTADO |
| R23 | A | Fila de A | UPDATE `description` y luego `status` | Solo descripción permitida | Grants de columnas | DB+REST | NO EJECUTADO |
| R24 | A | Sesión válida | INSERT vacío, espacios o título >120 | Denegado | NOT NULL/CHECK/varchar | DB+REST | NO EJECUTADO |
| R25 | A | UUID ya usado | INSERT con `id` explícito duplicado | Denegado por grant; PK también rechaza con rol privilegiado | Grant/PK | DB | NO EJECUTADO |
| R26 | A | JWT expirado | SELECT/INSERT | Denegado | Validación Auth/rol | REST | NO EJECUTADO |
| R27 | Admin | Esquema instalado | Ver índices y EXPLAIN filtrado por creador | Índice existe; plan razonable con volumen | Índice/plan | CAT | NO EJECUTADO |
| R28 | A | Sesión válida | INSERT dos borradores | Dos UUID distintos, ambos propios | Default/PK/RLS | DB+REST | NO EJECUTADO |
| R29 | A y B | Sesiones válidas | INSERT concurrentes | Cada uno ve solo los propios | RLS/identidad | REST | NO EJECUTADO |
| R30 | Admin | Esquema instalado | Consultar `pg_class.relrowsecurity` y `pg_policies` | RLS activa, tres políticas esperadas | Catálogo | CAT | NO EJECUTADO |

R25 separa la protección del cliente de la restricción PK: el cliente no tiene permiso de insertar `id`, así que la duplicación de PK solo puede comprobarse en una transacción de prueba administrativa aislada; no usar datos compartidos ni presentar ese resultado como prueba RLS. R22 puede fallar primero por privilegio de columna; un test de `WITH CHECK` debe aislarse con un rol de prueba que conserve RLS y permiso de escritura pertinente, nunca superusuario/propietario.

## 21. Pruebas pendientes en Supabase real

P3 necesita validar existencia remota, versión PostgreSQL, despliegue transaccional, RLS/políticas/grants en catálogos, API anónima, dos cuentas de prueba autorizadas, lecturas y escrituras propias/ajenas, JWT caducado, `RETURNING` y comportamiento ante datos inválidos. Debe registrar comandos y resultados reales sin incorporar credenciales al repositorio.

## 22. Riesgos residuales

No hay límites aprobados para tamaño de descripción/cláusulas; cuotas y rate limiting también faltan. No existe revisión optimista para ediciones concurrentes, versión inmutable ni `updated_at` confiable. `ON DELETE RESTRICT` afecta la baja de cuentas. Las respuestas de API pueden revelar metadatos o diferir entre fila inexistente y denegada; verificar. Un rol privilegiado o una función futura pueden saltar RLS. Si se habilita Auth anónimo, su rol es `authenticated` y exige una decisión adicional. No hay prueba de identidad legal, aprobación criptográfica ni firma.

## 23. Requisitos antes de aplicar la migración

Confirmar autorización específica de P3, proyecto remoto exacto y su esquema actual; resolver colisión potencial de tabla/migraciones, estrategia de cuentas y FK, límites de texto o aceptación explícita del riesgo, versión PostgreSQL, grants/roles efectivos, backup/recuperación y herramienta de ejecución transaccional. Revisar SQL por otra persona y preparar dos cuentas de prueba propias sin datos personales reales ni secretos en Git.

## 24. Plan de aplicación controlada futura

En P3, primero hacer preflight de solo lectura en el proyecto identificado y coordinar ventana con el equipo. Con autorización específica, aplicar una vez mediante la herramienta de migración acordada; comprobar que no hubo exposición intermedia. Verificar catálogo RLS/grants y ejecutar matriz negativa/positiva con roles reales de API y dos cuentas de prueba. Si un caso de acceso ajeno pasa, detener integración frontend, revocar acceso afectado y tratarlo como incidente antes de continuar. P2 **no realiza ninguno de esos pasos remotos**.

## 25. Estrategia de reversión

La transacción de la migración revierte automáticamente si falla antes del commit, según el ejecutor. Tras aplicación y con datos, no usar `DROP TABLE`/`CASCADE` por comodidad. Suspender escrituras, revocar grants de cliente mediante migración compensatoria revisada, conservar datos y restaurar políticas correctas; evaluar impacto y acceso potencial. Solo si se confirma ausencia de datos y dependencias, planificar retiro de objetos creados por esta migración con aprobación. Probar la reversión en copia aislada y revalidar A/B/Ø.

## 26. Decisiones pendientes

Antes de P3: confirmar `ON DELETE RESTRICT` y política de baja/retención; decidir máximos para descripción/cláusulas o aceptar explícitamente textos ilimitados; confirmar que el rol Auth anónimo no forma parte de cuentas contractuales; comprobar que `gen_random_uuid()` está disponible y que la herramienta preserva la transacción. Antes de conectar UI: destino de los cuatro campos de participantes, concurrencia/revisión, experiencia de errores y cuotas. Invitaciones, aceptación, firma y verificación pública requieren prompts y aprobaciones posteriores.

## 27. Criterios de aprobación

La revisión externa de P2 debe confirmar que la tabla representa únicamente borradores, que grants y RLS restringen toda operación del cliente al creador, que columnas inmutables y DELETE quedan cerrados, que la FK y límites son aceptables y que las 30 pruebas futuras cubren casos negativos. Solo entonces puede delimitarse P3; esta inspección estática no sustituye la ejecución y auditoría en PostgreSQL.

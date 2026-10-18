# M2-B3-P3-A — Preflight de despliegue de borradores privados y RLS

**Estado:** PREFLIGHT PREPARADO — PENDIENTE DE REVISIÓN EXTERNA. **Despliegue bloqueado** hasta completar el inventario remoto y las decisiones de la sección 26. M2-B3-P3-B **NO AUTORIZADO — NO EJECUTADO**. Este documento solo prepara consultas y pruebas: no se ejecutó SQL remoto, no se creó tabla, cuenta ni dato de prueba.

## 1. Objetivo

Establecer qué debe verificarse antes de aplicar la migración local de P2 al Supabase compartido y cómo se demostrará, con roles de cliente reales, que el borrador solo pertenece al creador. El preflight no es permiso de despliegue.

## 2. Estado aprobado de P1 y P2

M2-B3-P1 **APROBADO** para borradores privados, propietario autenticado y RLS, sin participantes, invitaciones, aceptación, firma ni conexión React. El responsable aprobó M2-B3-P2 **como preparación local y revisión estática**; esa aprobación no acredita ejecución PostgreSQL, instalación de políticas ni pruebas RLS. [Diseño P1](PLAN_MODELO_DATOS_RLS_CONTRATOS.md) y [validación P2](VALIDACION_ESQUEMA_RLS_M2_B3_P2.md) conservan sus resultados históricos.

## 3. Rama y commit base

Repositorio `Lilarpo/acuerdoseguro`; rama `relevo/m2-b2-p9c1-20261017`; HEAD y último commit publicado conocido `dae6bbe7516afb5c01660fb143e32e12ee96cd5c`. Árbol inicial de P3-A con cambios esperados de P1/P2, staging vacío y sin conflictos. No se cambió de rama ni se sincronizó.

## 4. Archivos locales pendientes

P1: [PLAN_MODELO_DATOS_RLS_CONTRATOS.md](PLAN_MODELO_DATOS_RLS_CONTRATOS.md) nuevo y estado/historial modificados. P2: [`20261018032013_create_private_contract_drafts.sql`](../supabase/migrations/20261018032013_create_private_contract_drafts.sql) y [VALIDACION_ESQUEMA_RLS_M2_B3_P2.md](VALIDACION_ESQUEMA_RLS_M2_B3_P2.md) nuevos, más continuidad. P3-A solo añade este preflight y actualiza los dos documentos de continuidad. Todo permanece local sin staging, commit ni push.

## 5. Integridad de la migración

| Dato local observado | Valor |
| --- | --- |
| Ruta | `supabase/migrations/20261018032013_create_private_contract_drafts.sql` |
| Nombre/versión | `20261018032013_create_private_contract_drafts.sql`; prefijo UTC `20261018032013` |
| Tamaño | 2.165 bytes, 53 líneas |
| SHA-256 completo | `5e633ec225f325d070d72bc44586292c0584155754535943b2e769f8d38121ac` |
| Instrucciones | 10 DDL/DCL relevantes: CREATE TABLE, CREATE INDEX, ALTER TABLE RLS, REVOKE, tres GRANT y tres CREATE POLICY; 12 contando BEGIN/COMMIT |
| Dependencias | Esquemas `public` y `auth`, `auth.users(id)`, `auth.uid()`, `gen_random_uuid()`, roles `anon` y `authenticated`; ejecutor con privilegio de migración |

La inspección íntegra de las 53 líneas coincide con las características descritas en P2 y con el SQL revisado en la conversación; P2 no había registrado un hash previo independiente, por lo que este hash fija la referencia de P3-A, no prueba identidad criptográfica respecto de una copia remota. **La migración no se modificó.** Antes de P3-B se debe volver a calcular el hash sobre el archivo que se vaya a aplicar y compararlo con el commit publicado/autorizado.

## 6. Resumen de estructura

`public.contracts` contiene `id uuid` con PK/default aleatorio; `created_by uuid` con default `auth.uid()` y FK a `auth.users(id)`; `status text` con default y CHECK exclusivo `draft`; `title varchar(120)`, `description text`, `terms text` obligatorios y no vacíos tras `btrim`; `created_at timestamptz` asignado por DB. Índice `(created_by, created_at DESC)`. No contiene datos de contraparte, firmas, archivos ni evidencia. No hay `updated_at` ni revisión optimista; el frontend sigue sin persistencia.

## 7. Revisión de restricciones

PK protege unicidad de UUID; FK protege referencia de creador existente, con `ON DELETE RESTRICT`; NOT NULL y CHECK impiden contenido vacío o estado diferente de `draft`; `varchar(120)` coincide con UI. La FK no verifica identidad legal. No hay máximo explícito de descripción ni cláusulas y no se ha probado ejecución SQL. `gen_random_uuid()` y capacidad de crear FK hacia `auth.users` deben verificarse en la versión/privilegios reales antes de desplegar.

## 8. Revisión de permisos

El SQL revoca `ALL` sobre la tabla nueva a `PUBLIC`, `anon` y `authenticated`, luego concede a `authenticated` SELECT de tabla, INSERT y UPDATE solo de `title`, `description`, `terms`; no concede DELETE. Los defaults/grants efectivos del proyecto, membresías, privilegios de esquema y cualquier privilegio de columna inesperado solo pueden conocerse con inspección remota autorizada. `service_role`, propietario de tabla o roles `BYPASSRLS` no demuestran aislamiento de clientes. Las funciones de privilegio efectivo de PostgreSQL se usarán además de `pg_policies`, porque política y grant son controles distintos. [RLS y grants en Supabase](https://supabase.com/docs/guides/database/postgres/row-level-security), [privilegios de columnas](https://supabase.com/docs/guides/database/postgres/column-level-security).

## 9. Revisión conceptual de RLS

SELECT `USING`, INSERT `WITH CHECK`, UPDATE `USING` y UPDATE `WITH CHECK` exigen `auth.uid()` no nulo, igual a `created_by`, y `status='draft'`. SELECT solo revela borradores propios; `USING` de UPDATE descarta filas ajenas y `WITH CHECK` exige que la fila resultante siga siendo propia. El default `auth.uid()` no basta por sí solo para impedir suplantación; el grant de columnas y `WITH CHECK` la cierran conceptualmente. `id`, `created_by`, `status` y `created_at` no tienen INSERT/UPDATE explícito de cliente; DELETE no tiene grant ni política. Todo esto es **inspección estática, no comportamiento verificado**. Los usuarios anónimos de Supabase Auth pueden tener rol `authenticated`; confirmar si esa modalidad existe y se permite para contratos.

## 10. Inventario local de herramientas

Node.js y npm con scripts `build`, `lint`, `supabase:check:test` y diagnóstico Auth opcional. En PATH no se encontraron `supabase`, `psql`, `postgres`, `pg_ctl` ni `docker`; no hay `supabase/config.toml`, vínculo CLI documentado, migraciones anteriores ni base PostgreSQL aislada. No se instaló nada. `.env.local` existe e ignorado por Git; **no se leyó su contenido**. No se verificó sesión CLI, porque no hay CLI. Las pruebas SQL reales siguen pendientes.

## 11. Identificación del proyecto remoto

`.env.example` solo contiene nombres de variables y valores vacíos. No hay URL ni referencia de proyecto Supabase en archivos rastreados; el cliente toma URL y clave publicable de configuración local privada, que este preflight no abrió. El proyecto objetivo, su base, su referencia pública y acceso al Dashboard **NO CONFIRMADOS**. El responsable y la persona desplegadora deberán cotejar referencia/URL del Dashboard autorizado con el destino de la herramienta de migración y con el equipo, sin publicar claves ni capturas que las muestren. Un nombre de base (`postgres`) o una respuesta HTTP de Auth no identifica por sí solo el proyecto correcto.

## 12. Consultas remotas de solo lectura preparadas

**No ejecutar en P3-A.** Tras autorización específica de inspección, usar cuenta de Dashboard con permisos apropiados y SQL Editor solo para metadatos. Donde el editor acepte transacciones explícitas, envolver el lote en `BEGIN TRANSACTION READ ONLY; ... COMMIT;`; si no, ejecutar SELECT individuales sin cambios de estado. No consultar filas de `public.contracts`, `auth.users`, correos, secretos ni `statements` de migraciones. Verificar antes que el Editor apunta al proyecto esperado. Consultas marcadas `Q` son plantillas, no resultados.

```sql
-- Q01: contexto SQL; el proyecto exacto se coteja aparte en Dashboard.
select current_database() as db, current_user as inspector,
       session_user as session_role, current_setting('server_version') as pg_version;
-- Q02: existencia exacta y objetos homónimos.
select to_regclass('public.contracts') as contracts,
       to_regclass('public.contracts_created_by_created_at_idx') as target_index;
select n.nspname, c.relname, c.relkind, c.relowner::regrole::text as owner_role,
       c.relrowsecurity, c.relforcerowsecurity
from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid = c.relnamespace
where c.relname in ('contracts', 'contracts_created_by_created_at_idx')
order by n.nspname, c.relname;
-- Q03: índices y políticas homónimas, solo metadatos.
select schemaname, tablename, indexname, indexdef
from pg_catalog.pg_indexes
where schemaname = 'public' and (tablename = 'contracts'
  or indexname = 'contracts_created_by_created_at_idx');
select schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
from pg_catalog.pg_policies
where (schemaname = 'public' and tablename = 'contracts')
   or policyname in ('contracts_select_own_drafts',
     'contracts_insert_own_drafts', 'contracts_update_own_drafts');
-- Q04: dependencias funcionales; no invoca funciones ni lee datos.
select to_regprocedure('auth.uid()') as auth_uid_function,
       to_regprocedure('gen_random_uuid()') as random_uuid_function,
       to_regclass('auth.users') as auth_users_table,
       to_regclass('supabase_migrations.schema_migrations') as history_table;
-- Q05: roles y pertenencias que pueden alterar privilegios efectivos.
select rolname, rolcanlogin, rolinherit, rolbypassrls
from pg_catalog.pg_roles
where rolname in ('anon', 'authenticated', 'service_role') order by rolname;
select parent.rolname as granted_role, member.rolname as member_role
from pg_catalog.pg_auth_members m
join pg_catalog.pg_roles parent on parent.oid = m.roleid
join pg_catalog.pg_roles member on member.oid = m.member
where member.rolname in ('anon', 'authenticated')
order by member.rolname, parent.rolname;
-- Q06: solo si Q02 confirmó que public.contracts existe.
select role_name, has_table_privilege(role_name, 'public.contracts', 'SELECT') as can_select,
       has_table_privilege(role_name, 'public.contracts', 'INSERT') as can_insert,
       has_table_privilege(role_name, 'public.contracts', 'UPDATE') as can_update,
       has_table_privilege(role_name, 'public.contracts', 'DELETE') as can_delete
from (values ('anon'), ('authenticated')) as actors(role_name);
-- Q07: solo si Q02 confirmó la tabla; incluye grants efectivos de tabla/columna.
select actor.role_name, col.column_name,
       has_column_privilege(actor.role_name, 'public.contracts', col.column_name, 'SELECT') as sel,
       has_column_privilege(actor.role_name, 'public.contracts', col.column_name, 'INSERT') as ins,
       has_column_privilege(actor.role_name, 'public.contracts', col.column_name, 'UPDATE') as upd
from (values ('anon'), ('authenticated')) as actor(role_name)
cross join information_schema.columns col
where col.table_schema = 'public' and col.table_name = 'contracts'
order by actor.role_name, col.ordinal_position;
-- Q08: solo si Q02 confirmó la tabla; estructura, restricciones y dependencias.
select conname, contype, confrelid::regclass::text as referenced_table,
       pg_get_constraintdef(oid) as definition
from pg_catalog.pg_constraint where conrelid = 'public.contracts'::regclass
order by conname;
select d.classid::regclass::text as dependent_catalog, d.objid, d.deptype
from pg_catalog.pg_depend d where d.refobjid = 'public.contracts'::regclass
order by d.classid::regclass::text, d.objid;
-- Q09: solo si Q04 confirmó historial y el inspector tiene SELECT sobre él.
select version from supabase_migrations.schema_migrations
where version = '20261018032013';
-- Q10: solo con permiso de metadatos del historial; no seleccionar statements.
select version from supabase_migrations.schema_migrations order by version;
```

Q06/Q07/Q08 no se ejecutan si falta la tabla. Q09/Q10 no se ejecutan si falta el historial o permisos. `has_table_privilege(...,'INSERT'/'UPDATE')` no sustituye Q07: un rol puede tener permisos por columna sin privilegio de tabla completo. `pg_policies` no muestra todos los grants. Una tabla ausente es el resultado esperado **para poder considerar** esta migración nueva, pero no se ha observado. `pg_auth_members`/historial pueden requerir permisos adicionales; ausencia de acceso no equivale a ausencia de objetos.

| Comprobación | Consulta futura | Permiso necesario | Resultado esperado antes de migrar | Resultado observado | Estado |
| --- | --- | --- | --- | --- | --- |
| Proyecto/ref exactos y Dashboard | Cotejo visual de referencia, URL y destino CLI | Acceso autorizado al proyecto | Coincidencia inequívoca | Ninguno | NO CONSULTADO — PENDIENTE DE AUTORIZACIÓN |
| Base, inspector y versión PostgreSQL | Q01 | SQL Editor de metadatos | Proyecto/base y rol correctos | Ninguno | NO CONSULTADO — PENDIENTE DE AUTORIZACIÓN |
| `public.contracts` y homónimos | Q02 | Catálogos | Ausente; ningún objeto conflictivo | Ninguno | NO CONSULTADO — PENDIENTE DE AUTORIZACIÓN |
| Índice homónimo | Q02/Q03 | Catálogos | Ausente | Ninguno | NO CONSULTADO — PENDIENTE DE AUTORIZACIÓN |
| Políticas homónimas | Q03 | Catálogos | Ausentes | Ninguno | NO CONSULTADO — PENDIENTE DE AUTORIZACIÓN |
| `auth.users`, `auth.uid()`, UUID | Q04 | Catálogos | Dependencias disponibles | Ninguno | NO CONSULTADO — PENDIENTE DE AUTORIZACIÓN |
| Migración con misma versión | Q04/Q09 | SELECT historial si existe | Sin versión `20261018032013` | Ninguno | NO CONSULTADO — PENDIENTE DE AUTORIZACIÓN |
| Historial y migraciones anteriores | Q04/Q10; comparación con archivos del equipo | SELECT historial si existe | Historia comprendida y sin divergencia | Ninguno | NO CONSULTADO — PENDIENTE DE AUTORIZACIÓN |
| Roles, herencia y BYPASSRLS | Q05 | Catálogos de roles | Roles de cliente sin bypass inesperado | Ninguno | NO CONSULTADO — PENDIENTE DE AUTORIZACIÓN |
| Grants efectivos de tabla | Q06 tras Q02 | Catálogos y tabla existente | No exceso; si tabla ausente, N/A | Ninguno | NO CONSULTADO — PENDIENTE DE AUTORIZACIÓN |
| Grants efectivos de columnas | Q07 tras Q02 | Catálogos y tabla existente | No exceso; si tabla ausente, N/A | Ninguno | NO CONSULTADO — PENDIENTE DE AUTORIZACIÓN |
| RLS de tabla existente | Q02/Q03 | Catálogos | Si existe, bloquear por colisión | Ninguno | NO CONSULTADO — PENDIENTE DE AUTORIZACIÓN |
| FK, restricciones y dependencias | Q08 tras Q02 | Catálogos | Sin colisión; si tabla ausente, N/A | Ninguno | NO CONSULTADO — PENDIENTE DE AUTORIZACIÓN |
| Identidad del inspector | Q01/Q05 | SQL Editor autorizado | Rol documentado; no tratar admin como cliente | Ninguno | NO CONSULTADO — PENDIENTE DE AUTORIZACIÓN |

## 13. Resultados realmente observados

Solo en el repositorio: rama/HEAD/remoto esperados; migración de 2.165 bytes con hash de sección 5; `supabase/migrations/` contiene solo la migración P2; no hay configuración CLI ni herramientas PostgreSQL detectadas; `.env.local` existe pero está ignorado y no se leyó; las páginas siguen sin consultas de contratos. El prompt actual acredita aprobación de P1/P2 en sus alcances limitados. **No hay observación de esquema, políticas, grants, historial o datos del proyecto remoto.**

## 14. Elementos todavía no observados

Referencia y base remotas exactas, acceso autorizado al Dashboard, sesión/identidad administrativa, existencia o ausencia de `contracts`, índices/políticas, historial de migraciones, privilegios efectivos, versión y extensiones PostgreSQL, backups, cuentas de prueba, comportamiento transaccional de la herramienta y resultado de RLS. `npm run supabase:check`, si se ejecutara, solo comprobaría salud de Auth y no respondería ninguna de esas preguntas. **Inventario remoto: NO CONSULTADO — PENDIENTE DE AUTORIZACIÓN.**

## 15. Matriz de decisiones de despliegue

| Escenario | Condición observada futura | Decisión |
| --- | --- | --- |
| A | `public.contracts` ausente, sin conflictos y demás condiciones satisfechas | Puede solicitarse autorización P3-B; no aplicar por este hallazgo solo. |
| B | `public.contracts` ya existe | **BLOQUEAR DESPLIEGUE**; no sobrescribir, adaptar ni borrar. |
| C | Versión/nombre de migración ya registrado o historia divergente | **BLOQUEAR DESPLIEGUE** e investigar. |
| D | Objetos ajenos presentes con relación no aclarada | No tocarlos; revisar compatibilidad y coordinación. |
| E | Privilegios/políticas efectivos no confirmables | No declarar segura la aplicación; bloquear. |
| F | Proyecto/ref/base no coinciden exactamente | **BLOQUEAR DESPLIEGUE**. |
| G | Falta respaldo, recuperación, limpieza o autorización | **BLOQUEAR DESPLIEGUE**. |
| H | Preflight íntegro y decisiones aprobadas | **LISTO PARA SOLICITAR AUTORIZACIÓN**, sin ejecución automática. |

Hoy no se puede asignar A/H porque no hubo inventario remoto; el despliegue permanece bloqueado.

## 16. Riesgos de `ON DELETE RESTRICT`

Si una cuenta creadora tiene borradores, la FK restringe su eliminación física. Esto evita borrar contratos en cascada, pero puede interferir con solicitudes de baja/retención y con flujos de Auth. Antes de P3-B el responsable debe aceptar expresamente esta política o autorizar una migración revisada distinta. No inferir que se permite conservar datos personales indefinidamente. Ninguna baja de cuenta se probó aquí.

## 17. Límites de contenido

Título limitado a 120 caracteres y no vacío. Descripción y cláusulas son `text` no vacío sin máximo explícito; pueden causar uso excesivo de almacenamiento, red o procesamiento cuando se conecte el frontend. Esto no demuestra una fuga RLS, pero **bloquea autorización de despliegue hasta que el responsable apruebe un límite técnico y su implementación, o acepte documentadamente el riesgo y controles de cuota/rate limit para la primera fase**. P3-A no modifica el SQL. La UI futura debe concordar con límites DB/API aprobados.

## 18. Plan de respaldo y recuperación

Antes de P3-B: identificar política real de backups del proyecto, última copia recuperable y responsable de restauración; verificar que el método de recuperación sirve para datos compartidos y cuánto podría perderse. Registrar un punto de restauración si el plan lo permite, y probar recuperación en entorno aislado autorizado. La transacción BEGIN/COMMIT puede revertir fallos previos al commit si el ejecutor la respeta; no equivale a rollback seguro después del commit. Si falla una prueba negativa tras desplegar, suspender escrituras/acceso cliente y preparar migración compensatoria de grants/políticas, preservando datos. Ningún respaldo se consultó o creó aquí.

## 19. Método futuro de aplicación

**Recomendación:** mecanismo de migraciones versionadas de Supabase, operado por una sola persona autorizada desde un checkout verificado y herramienta aprobada, tras conciliar el historial remoto. Esto mantiene alineados archivo Git y `supabase_migrations.schema_migrations`; el método concreto y sus privilegios se aprueban en P3-B. No pegar `CREATE TABLE` manualmente en SQL Editor: una ejecución manual puede dejar la tabla fuera del historial de migraciones y causar divergencia. No se instaló CLI, no se vinculó proyecto y no se ejecutó comando de despliegue. [Flujo oficial de migraciones Supabase](https://supabase.com/docs/guides/deployment/database-migrations).

## 20. Estrategia de versionado y publicación

Antes del despliegue: revisar diff y exclusiones de secretos; aprobar explícitamente un commit de respaldo que incluya diseño, migración, validación y preflight; publicarlo de forma controlada en la rama autorizada; verificar en GitHub commit y hash del SQL; coordinar que ningún integrante despliegue otra versión concurrente. Si el archivo cambia, nueva revisión y nuevo hash; no aplicar el hash anterior. Git y el historial de migraciones son registros distintos: cotejar ambos antes y después. En P3-A no hubo staging, commit, push ni merge.

## 21. Matriz de pruebas reales A/B/anónimo

Las 30 filas derivan de R01–R30 de [P2](VALIDACION_ESQUEMA_RLS_M2_B3_P2.md). A/B son cuentas **de prueba autorizadas**, Ø es cliente sin JWT; E es rol de inspección de catálogo. Métodos: REST = cliente público/API con JWT propio cuando aplica; CAT = catálogo con inspector autorizado; AIS = PostgreSQL aislado con rol no propietario y RLS activo. Evidencia = estado HTTP o error/cuenta de filas saneados, instantánea previa/posterior de las **propias filas de prueba** y/o salida de catálogo sin secretos. Limpieza: `F` = fixture ficticio persistente que requiere plan administrativo aprobado o entorno aislado desechable; `N` = no crea datos; `I` = solo entorno aislado transaccional. **Todas las pruebas: PREPARADOS — NO EJECUTADOS.**

| Caso | Identidad | Operación | Método | Resultado esperado | Evidencia necesaria | Riesgo cubierto | Limpieza | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | A | Crear borrador válido | REST | Una fila propia `draft` | Estado, UUID y lectura de A | Creación/propiedad | F | PREPARADOS — NO EJECUTADOS |
| R02 | Ø | Crear sin sesión | REST | Denegado | Estado/error saneado | Alta anónima | N | PREPARADOS — NO EJECUTADOS |
| R03 | B | Crear con `created_by=A` | REST | Denegado | Error y ausencia de fila | Suplantación | N | PREPARADOS — NO EJECUTADOS |
| R04 | A | Leer UUID propio | REST | Una fila | ID coincidente | SELECT propio | F | PREPARADOS — NO EJECUTADOS |
| R05 | B | Leer UUID de A | REST | Cero filas | Respuesta sin contenido | Lectura ajena | N | PREPARADOS — NO EJECUTADOS |
| R06 | A | Listar propios | REST | Solo filas de A | IDs de fixture | Enumeración propia | F | PREPARADOS — NO EJECUTADOS |
| R07 | B | Listar con filas A/B | REST | Nunca filas de A | IDs de fixture de B | Filtrado cruzado | F | PREPARADOS — NO EJECUTADOS |
| R08 | A | Editar título propio | REST | Cambio solo del título | Lectura antes/después de A | Edición válida | F | PREPARADOS — NO EJECUTADOS |
| R09 | B | Editar título de A | REST | Cero filas; A intacto | Respuesta B + lectura A | UPDATE ajeno | N | PREPARADOS — NO EJECUTADOS |
| R10 | A | Cambiar `created_by` | REST | Denegado; A intacto | Error + lectura A | Propiedad inmutable | N | PREPARADOS — NO EJECUTADOS |
| R11 | A | Cambiar `id` | REST | Denegado | Error + ID original | ID inmutable | N | PREPARADOS — NO EJECUTADOS |
| R12 | A | Cambiar `created_at` | REST | Denegado | Error + fecha original | Fecha inmutable | N | PREPARADOS — NO EJECUTADOS |
| R13 | A | Cambiar `status` a `signed` | REST | Denegado | Error + `draft` original | Transición falsa | N | PREPARADOS — NO EJECUTADOS |
| R14 | A | DELETE propio | REST | Denegado | Error + lectura posterior | Borrado no aprobado | N | PREPARADOS — NO EJECUTADOS |
| R15 | B | DELETE de A | REST | Denegado | Error + lectura de A | Borrado ajeno | N | PREPARADOS — NO EJECUTADOS |
| R16 | Ø | SELECT/UPDATE sin JWT | REST | Denegado | Estados sin contenido | Acceso anónimo | N | PREPARADOS — NO EJECUTADOS |
| R17 | Ø | Publishable key sin JWT | REST | Sin acceso a filas | Estado/cuerpo saneado | Clave pública | N | PREPARADOS — NO EJECUTADOS |
| R18 | B | GET/PATCH directo por UUID A | REST | Cero filas afectadas | Respuestas y lectura A | Bypass de UI/URL | N | PREPARADOS — NO EJECUTADOS |
| R19 | A | SELECT con/sin filtro | REST | Nunca filas de B | IDs de fixture | SELECT USING | F | PREPARADOS — NO EJECUTADOS |
| R20 | A | INSERT sin propietario explícito | REST | `created_by=A` | Respuesta/lectura propia | Default y CHECK | F | PREPARADOS — NO EJECUTADOS |
| R21 | B | UPDATE apuntando a fila A | REST | Cero filas | Respuesta + lectura A | UPDATE USING | N | PREPARADOS — NO EJECUTADOS |
| R22 | A | Forzar fila resultante con dueño distinto | AIS | `WITH CHECK` rechaza; REST falla antes por grant | Error y rollback aislado | UPDATE WITH CHECK | I | PREPARADOS — NO EJECUTADOS |
| R23 | A | Editar `description`; intentar `status` | REST | Solo contenido editable | Error de columna y fila final | Grants de columna | F | PREPARADOS — NO EJECUTADOS |
| R24 | A | Vacíos, espacios y título >120 | REST | Rechazados | Errores + ausencia de fila | Integridad de contenido | N | PREPARADOS — NO EJECUTADOS |
| R25 | A/E | UUID explícito duplicado | AIS | Grant deniega cliente; PK rechaza en rol aislado apropiado | Errores sin persistencia | PK/privilegios | I | PREPARADOS — NO EJECUTADOS |
| R26 | Sesión caducada | SELECT/INSERT | REST | Denegado | Estados sin JWT registrado | Caducidad | N | PREPARADOS — NO EJECUTADOS |
| R27 | E | Índice y plan filtrado | CAT | Índice presente; plan razonable | Catálogo/EXPLAIN sin filas | Rendimiento | N | PREPARADOS — NO EJECUTADOS |
| R28 | A | Crear dos borradores | REST | UUID distintos, ambos propios | Dos IDs de fixture | Multiplicidad | F | PREPARADOS — NO EJECUTADOS |
| R29 | A/B | Crear concurrentemente | REST | Separación de propiedad | IDs/lecturas propias | Carrera entre actores | F | PREPARADOS — NO EJECUTADOS |
| R30 | E | RLS/políticas/grants | CAT | RLS activa, tres políticas, grants mínimos | Catálogo y funciones de privilegio | Configuración real | N | PREPARADOS — NO EJECUTADOS |

R22 **no puede demostrar aisladamente `WITH CHECK` por REST con los grants actuales**, porque el intento de cambiar dueño/estado falla antes por permiso de columna. La prueba de la expresión precisa un entorno aislado autorizado con rol no propietario, RLS activo y permiso temporal de la columna dentro de una transacción revertida; jamás relajar permisos en el proyecto compartido. R25 también separa la denegación del cliente de la PK. Para R09/R21, cero filas modificadas debe corroborarse desde A; un 2xx solo no basta. Los tests no deben registrar JWT, cookies, cuerpos contractuales ni credenciales.

## 22. Método futuro para comprobar permisos efectivos

Tras instalar, obtener `pg_class.relrowsecurity`, `pg_policies`, `has_table_privilege` para SELECT/INSERT/UPDATE/DELETE y `has_column_privilege` por cada columna/rol, más membresías y privilegio `BYPASSRLS`. Comparar con intención: `anon` sin acceso; `authenticated` SELECT de filas propias, INSERT/UPDATE de tres columnas, sin DELETE ni modificación de `id`, `created_by`, `status`, `created_at`. La inspección del catálogo es necesaria pero no suficiente: repetir con JWT de A y B por Data API. SQL Editor como admin/propietario puede saltar RLS y no sirve como prueba de cliente. [Documentación RLS de PostgreSQL](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).

## 23. Estrategia de datos de prueba y limpieza

Preferir base aislada/autorizada con cuentas ficticias A/B y destrucción del entorno conforme al plan del responsable. Si se exige probar en el proyecto compartido, usar solo cuentas propias autorizadas y textos claramente ficticios, nunca correos, nombres reales ni contratos ajenos; acordar previamente cantidad de filas, identificación de fixtures, retención y limpieza administrativa aprobada. La migración deniega DELETE al cliente, por lo que **no** habilitar DELETE temporalmente ni asumir que A puede limpiar. Un administrador autorizado podría ejecutar un procedimiento revisado que identifique únicamente fixtures y deje evidencia, o conservarlos conforme a política aprobada; P3-A no crea ni elimina filas.

## 24. Reglas de detención

Detener P3-B si el proyecto/ref no coincide, aparece `public.contracts` o versión homónima, el historial diverge, no se pueden comprobar privilegios, falta autorización, backup/recuperación o limpieza, hay otra migración concurrente, el SQL/hash difiere, o `ON DELETE RESTRICT`/límites no tienen decisión explícita. Tras desplegar, detener pruebas e integración si B/anon lee o cambia datos, DELETE funciona, una columna inmutable cambia o la transacción queda parcial. No reintentar automáticamente sin inventario del estado resultante.

## 25. Decisiones pendientes

Confirmar proyecto y persona inspectora/desplegadora; autorizar inventario remoto de solo lectura separado de la autorización de escritura; resolver FK `ON DELETE RESTRICT` y retención; aprobar máximos de descripción/cláusulas o aceptación explícita del riesgo; identificar backups y recuperación; aprobar mecanismo de migración e historial; acordar publicación del commit/hash; designar cuentas/entorno de prueba y limpieza; confirmar configuración de usuarios anónimos de Auth; coordinar ventana con los demás integrantes. Ninguna decisión se infiere del HTTP de Auth.

## 26. Condiciones mínimas para autorizar P3-B

Todas las filas de inventario remoto completadas o justificadamente N/A; proyecto y base coincidentes; tabla, índice y versión sin colisión; dependencias disponibles; privilegios revisados; hash cotejado con versión publicada; decisión FK y límites registrada; respaldo/recuperación y limpieza viables; actores A/B autorizados o entorno aislado; un solo desplegador y ventana coordinada; procedimiento de aplicación única y pruebas negativas preparado; **autorización explícita separada para modificar Supabase**. Un preflight favorable solo permite solicitar esa autorización.

## 27. Estado final

**PREFLIGHT PREPARADO — PENDIENTE DE REVISIÓN EXTERNA. DESPLIEGUE BLOQUEADO POR PRECONDICIONES NO OBSERVADAS.** Inventario remoto **NO CONSULTADO — PENDIENTE DE AUTORIZACIÓN**; SQL real y RLS real **NO EJECUTADOS**; `public.contracts` remota **NO CONFIRMADA**. M2-B3-P3-B **NO AUTORIZADO — NO EJECUTADO**. M2-B3 y Módulo 2 siguen incompletos.

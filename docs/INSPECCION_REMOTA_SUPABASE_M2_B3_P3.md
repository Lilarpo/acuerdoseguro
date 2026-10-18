# M2-B3-P3-INSPECCIÓN — Inventario remoto de solo lectura

**Estado actual, M2-B3-P3-INSPECCIÓN-R5 (2026-10-18): INSPECCIÓN DE METADATOS PREDESPLIEGUE COMPLETADA DENTRO DEL ALCANCE A–D — PENDIENTE DE APROBACIÓN EXTERNA.** Fases A–D ejecutadas manualmente por el responsable; resultados comunicados y auditoría estática del SQL registrados en sección 27. Revisión estática satisfactoria para defaults directos comunicados, con riesgos residuales. Codex no ejecutó SQL remoto ni examinó directamente capturas. RLS funcional NO VALIDADA; migración NO APLICADA POR ESTE PROCESO; P3-B NO AUTORIZADO.

**Antecedente histórico:** identidad/autorización resueltas en IDENTIDAD/R1; resultados externos A–D recibidos en R2–R5. El inventario de alcance no concede despliegue: subsisten decisiones del preflight, verificación efectiva y autorización separada.

## 1. Objetivo

Determinar el estado real de los metadatos PostgreSQL del proyecto Supabase compartido antes de considerar la migración de borradores privados. Inspeccionar únicamente identidad del destino, relaciones, nombres conflictivos, políticas, permisos e historial de migraciones. No consultar contenido de contratos ni usuarios, y no cambiar estructura, datos o privilegios.

## 2. Referencias y alcance aprobado

[Diseño M2-B3-P1](PLAN_MODELO_DATOS_RLS_CONTRATOS.md) APROBADO; [migración y validación M2-B3-P2](VALIDACION_ESQUEMA_RLS_M2_B3_P2.md) APROBADAS como preparación local revisada estáticamente; [preflight M2-B3-P3-A](PREFLIGHT_DESPLIEGUE_RLS_M2_B3_P3.md) APROBADO como documento. M2-B3-RESPALDO-P1 publicó esos archivos. Estas aprobaciones no prueban existencia de tablas ni RLS remota. M2-B3-P3-B, despliegue, sigue NO AUTORIZADO — NO EJECUTADO.

## 3. Estado Git inicial

Repositorio `Lilarpo/acuerdoseguro`; rama `relevo/m2-b2-p9c1-20261017`; remoto `https://github.com/Lilarpo/acuerdoseguro.git`; HEAD `9770ac1e4a04c563288e5343972858ba12cc4b89`. Al iniciar este prompt: árbol limpio, staging vacío, migración y documentos P1/P2/P3-A presentes. Esta inspección solo puede crear este archivo y modificar `ESTADO_PROYECTO.md` e `HISTORIAL_PROMPTS.md`; sin staging, commit ni push.

## 4. Integridad de la migración

[`20261018032013_create_private_contract_drafts.sql`](../supabase/migrations/20261018032013_create_private_contract_drafts.sql): **2.165 bytes**, SHA-256 **`5e633ec225f325d070d72bc44586292c0584155754535943b2e769f8d38121ac`**, ambos cotejados localmente. Es una propuesta de `public.contracts` con RLS/grants; no se ejecuta ni modifica aquí. Si una comprobación posterior cambiara tamaño o hash, detener el trabajo.

## 5. Identidad del proyecto Supabase

| Atributo | Observación actual | Evidencia requerida |
| --- | --- | --- |
| Nombre en Dashboard | `acuerdoseguro-dev` | Confirmación visual comunicada por el responsable en R1. |
| Referencia pública del proyecto | `gaydlycsinbrlanzmsyj` | Confirmada por el responsable. |
| URL pública | `https://gaydlycsinbrlanzmsyj.supabase.co` | Confirmada visualmente; comparación local previa de VITE_SUPABASE_URL: COINCIDE. |
| Confirmación de que es el proyecto compartido | CONFIRMADA | Responsable confirmó nombre, referencia y URL en Dashboard; Codex no automatizó esa comprobación visual. |
| Base objetivo y rol SQL | Base `postgres`, rol `postgres`, esquema `public`, PostgreSQL `17.11` | Resultados de fase A comunicados por el responsable en R2; ejecución manual externa en SQL Editor. |

Dashboard confirmado: https://supabase.com/dashboard/project/gaydlycsinbrlanzmsyj. La comparación previa de IDENTIDAD cargó localmente la configuración con Node y comparó únicamente VITE_SUPABASE_URL en memoria, sin imprimir el archivo ni acceder a la clave publicable. R1 no vuelve a leer `.env.local`. Si el destino del SQL Editor difiere del proyecto confirmado, detener la inspección.

## 6. Método de inspección

En R1 no se encontraron `supabase`, `psql` ni `postgres` en PATH. Sí existe `/usr/bin/docker`, a diferencia del inventario histórico; su presencia no acredita una conexión al proyecto remoto. No hay herramienta Supabase/SQL Editor conectada disponible en esta sesión. No se inspeccionaron sesiones privadas del navegador, credenciales ni conexiones administrativas, no se instaló software y no se intentó usar la clave publicable para SQL.

Método utilizado en fases A–D: ejecución manual externa en SQL Editor del proyecto confirmado. No se presupone uso de READ ONLY si no fue comunicado. R5 registra evidencia y audita SQL local, sin conexión SQL propia ni nueva consulta remota. El siguiente paso es revisión externa del informe, sin desplegar.

## 7. Estado de autorización

**AUTORIZADA EXTERNAMENTE.** El responsable declaró en R1: «Sí, autorizo exclusivamente la inspección de metadatos PostgreSQL de solo lectura en el proyecto Supabase acuerdoseguro-dev (gaydlycsinbrlanzmsyj). No autorizo modificar datos, tablas, permisos, políticas RLS ni ejecutar migraciones.» No se solicita otra autorización genérica de catálogo. Esto no concede acceso técnico adicional, despliegue, creación de datos de prueba ni lectura de información personal. Se conserva la regla de detenerse ante conflicto, error de permisos o destino ambiguo.

## 8. Límites de acceso

Permitir solo SELECT de metadatos acotados a `public.contracts`, índice previsto, políticas asociadas, roles de cliente y `supabase_migrations.schema_migrations` si existe. No seleccionar filas contractuales, `auth.users`, tokens, correos, cookies, credenciales, cuerpos SQL guardados en el historial ni datos de terceros. No usar `service_role` para probar RLS; SQL Editor como administrador solo inventaría metadatos y puede eludir políticas. Ante error de permisos, no elevar privilegios ni reintentar con otra identidad. [RLS y grants de Supabase](https://supabase.com/docs/guides/database/postgres/row-level-security).

## 9. Consultas propuestas — PREPARADAS, NO EJECUTADAS

Los bloques A–J siguientes son las plantillas históricas, **NO EJECUTADAS**. En R1 se aplica prioritariamente la secuencia de fases de la sección 23: ejecutar primero solo la fase A; si aparece `public.contracts`, detenerse antes de cualquier otra consulta. Los bloques con referencias a la tabla son condicionales y no se ejecutan si falta o si existe una instrucción de detención. La lectura del historial exige comprobar antes existencia, columnas y permisos. `NULL` de `to_regclass` se interpreta solo como ausencia actual en la base inspeccionada.

**A. Contexto PostgreSQL (no identifica por sí solo el proyecto):**

```sql
select current_database() as database_name,
       current_user as execution_role,
       current_schema() as current_schema_name,
       version() as postgres_version;
```

**B. Relaciones exactas y dependencias de funciones (sin invocarlas):**

```sql
select to_regclass('public.contracts') as contracts_relation,
       to_regclass('public.contracts_created_by_created_at_idx') as expected_index,
       to_regclass('supabase_migrations.schema_migrations') as migration_history,
       to_regclass('auth.users') as auth_users_relation,
       to_regprocedure('auth.uid()') as auth_uid_function,
       to_regprocedure('gen_random_uuid()') as uuid_function;
```

**C. Objetos de nombre potencialmente conflictivo y RLS de una tabla existente:**

```sql
select n.nspname as schema_name, c.relname as object_name,
       c.relkind as object_kind, c.relrowsecurity as rls_enabled,
       c.relforcerowsecurity as rls_forced,
       pg_get_userbyid(c.relowner) as owner_role
from pg_catalog.pg_class c
join pg_catalog.pg_namespace n on n.oid = c.relnamespace
where (n.nspname = 'public' and c.relname in
       ('contracts', 'contracts_created_by_created_at_idx'))
   or (n.nspname = 'supabase_migrations' and c.relname = 'schema_migrations')
order by n.nspname, c.relname;
```

**D. Políticas e índices asociados, solo metadatos:**

```sql
select schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
from pg_catalog.pg_policies
where schemaname = 'public' and tablename = 'contracts'
order by policyname;

select schemaname, tablename, indexname, indexdef
from pg_catalog.pg_indexes
where schemaname = 'public'
  and (tablename = 'contracts' or indexname = 'contracts_created_by_created_at_idx')
order by indexname;
```

**E. Solo si `public.contracts` existe: restricciones y objetos dependientes:**

```sql
select conname, contype, confrelid::regclass::text as referenced_relation,
       pg_get_constraintdef(oid) as constraint_definition
from pg_catalog.pg_constraint
where conrelid = 'public.contracts'::regclass
order by conname;

select d.classid::regclass::text as catalog_name, d.objid, d.deptype
from pg_catalog.pg_depend d
where d.refobjid = 'public.contracts'::regclass
order by d.classid::regclass::text, d.objid;
```

**F. Solo si existe la tabla: privilegios efectivos de tabla para roles de cliente:**

```sql
select role_name,
       has_table_privilege(role_name, 'public.contracts', 'SELECT') as can_select,
       has_table_privilege(role_name, 'public.contracts', 'INSERT') as can_insert,
       has_table_privilege(role_name, 'public.contracts', 'UPDATE') as can_update,
       has_table_privilege(role_name, 'public.contracts', 'DELETE') as can_delete
from (values ('anon'), ('authenticated')) as roles(role_name);
```

**G. Solo si existe la tabla: privilegios efectivos por columna, incluidos los derivados de grants de tabla:**

```sql
select roles.role_name, a.attname as column_name,
       has_column_privilege(roles.role_name, 'public.contracts', a.attname, 'SELECT') as can_select,
       has_column_privilege(roles.role_name, 'public.contracts', a.attname, 'INSERT') as can_insert,
       has_column_privilege(roles.role_name, 'public.contracts', a.attname, 'UPDATE') as can_update
from (values ('anon'), ('authenticated')) as roles(role_name)
cross join pg_catalog.pg_attribute a
where a.attrelid = 'public.contracts'::regclass
  and a.attnum > 0 and not a.attisdropped
order by roles.role_name, a.attnum;
```

**H. Roles/herencia y privilegios predeterminados del esquema `public`:**

```sql
select rolname, rolinherit, rolbypassrls
from pg_catalog.pg_roles
where rolname in ('anon', 'authenticated', 'service_role')
order by rolname;

select parent.rolname as granted_role, member.rolname as member_role
from pg_catalog.pg_auth_members m
join pg_catalog.pg_roles parent on parent.oid = m.roleid
join pg_catalog.pg_roles member on member.oid = m.member
where member.rolname in ('anon', 'authenticated')
order by member.rolname, parent.rolname;

select owner.rolname as default_owner,
       coalesce(n.nspname, '<todos los esquemas>') as applicable_schema,
       d.defaclobjtype, d.defaclacl
from pg_catalog.pg_default_acl d
join pg_catalog.pg_roles owner on owner.oid = d.defaclrole
left join pg_catalog.pg_namespace n on n.oid = d.defaclnamespace
where (n.nspname = 'public' or d.defaclnamespace = 0)
  and d.defaclobjtype = 'r'
order by owner.rolname, applicable_schema;
```

**I. Estructura del historial, solo si B encontró la relación:**

```sql
select column_name, data_type
from information_schema.columns
where table_schema = 'supabase_migrations'
  and table_name = 'schema_migrations'
order by ordinal_position;

select has_table_privilege(current_user,
       'supabase_migrations.schema_migrations', 'SELECT') as can_read_history;
```

**J. Historial mínimo, solo si I confirmó columna `version` y permiso SELECT:**

```sql
select count(*) as migration_count,
       max(version) as latest_version,
       count(*) filter (where version = '20261018032013') as approved_version_count
from supabase_migrations.schema_migrations;

select version
from supabase_migrations.schema_migrations
order by version desc
limit 10;
```

No consultar `statements` ni texto SQL del historial. Si I identifica una columna de nombre y existe permiso, puede proponerse una consulta separada de `version, name` tras revisión; no asumir su presencia. `has_table_privilege` y `has_column_privilege` responden a grants efectivos, pero no a la visibilidad RLS. [Funciones de privilegios PostgreSQL](https://www.postgresql.org/docs/current/functions-info.html), [historial de migraciones Supabase](https://supabase.com/docs/guides/deployment/database-migrations).

## 10. Consultas realmente ejecutadas

| ID | Proyecto confirmado | Método | Rol observado | Fecha | Resultado | Clasificación |
| --- | --- | --- | --- | --- | --- | --- |
| Fase A1 de R1 | SÍ | SQL Editor, responsable | postgres | Fecha de ejecución no indicada; resultados recibidos en R2 el 2026-10-18 | postgres / postgres / public / 17.11 | **EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE** |
| Fase A2 de R1 | SÍ | SQL Editor, responsable | postgres | Fecha de ejecución no indicada; resultados recibidos en R2 el 2026-10-18 | contracts_relation NULL; expected_index NULL; migration_history NULL | **EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE** |
| Fase B1 de R2 | SÍ | SQL Editor, responsable | No comunicado para esa ejecución; fase A informó postgres | Fecha de ejecución no indicada; resultado recibido en R3 el 2026-10-18 | Success. No rows returned | **EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE** |
| Fase B2 de R2 | SÍ | SQL Editor, responsable | No comunicado para esa ejecución | Fecha de ejecución no indicada; resultado recibido en R3 el 2026-10-18 | Una fila: schema_name = public | **EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE** |
| C1 de R3 | SÍ | SQL Editor, responsable | No comunicado para esa ejecución | Fecha de ejecución no indicada; resultado recibido en R4 el 2026-10-18 | auth.users / auth.uid() / gen_random_uuid() | **EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE** |
| C2 de R3 | SÍ | SQL Editor, responsable | No comunicado para esa ejecución | Fecha de ejecución no indicada; resultado recibido en R4 el 2026-10-18 | anon y authenticated: rolcanlogin false, rolbypassrls false | **EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE** |
| D1 de R4 | SÍ | SQL Editor, responsable | No comunicado | Fecha exacta no comunicada; recibido en R5 el 2026-10-18 | auth.users.id uuid, NOT NULL y pertenece a PK | **EJECUTADA — RESULTADO COMUNICADO EXTERNAMENTE** |
| D2 de R4 | SÍ | SQL Editor, responsable | No comunicado | Fecha exacta no comunicada; recibido en R5 el 2026-10-18 | auth.uid() y gen_random_uuid(): uuid | **EJECUTADA — RESULTADO COMUNICADO EXTERNAMENTE** |
| D3 de R4 | SÍ | SQL Editor, responsable | No comunicado | Fecha exacta no comunicada; recibido en R5 el 2026-10-18 | Cuatro combinaciones de defaults de tabla SELECT/INSERT/UPDATE/DELETE true | **EJECUTADA — EVIDENCIA EXTERNA SEGÚN RESPONSABLE** |
| D4 de R4 | SÍ | SQL Editor, responsable | No comunicado | Fecha exacta no comunicada; recibido en R5 el 2026-10-18 | anon/authenticated: USAGE public true; CREATE public false | **EJECUTADA — EVIDENCIA EXTERNA SEGÚN RESPONSABLE** |
| Restantes plantillas y pruebas funcionales | SÍ | Ninguno | No observado | Sin ejecución | No realizadas en A–D | **NO EJECUTADAS** |

Codex no abrió conexión administrativa ni operó SQL Editor; no leyó `.env.local`. Los resultados remotos se atribuyen al responsable. Las plantillas históricas A–J no se marcan como ejecutadas por semejanza con fase A: son consultas diferentes.

## 11. Evidencias observadas

Evidencia **local**: Git en rama y HEAD esperados; migración con hash aprobado. Evidencia **remota PostgreSQL comprobada externamente**: fase A recibida en R2 (base/rol postgres, esquema public, versión 17.11 y tres NULL); fase B recibida en R3 (cero relaciones con los nombres filtrados y solo esquema public entre los dos consultados). Fuente: resultados comunicados por el responsable de sus ejecuciones en SQL Editor. Codex no realizó conexión SQL ni examinó directamente capturas. No inferir RLS activa, grants aplicados o historial limpio.

Verificaciones locales de este prompt: `npm run build` PASS (advertencia conocida de bundle JS de 544,90 kB), `npm run lint` PASS, `npm run supabase:check:test` PASS (22/22 simulaciones), `git diff --check` PASS. El diagnóstico Auth real y las pruebas PostgreSQL/RLS no se ejecutaron.

## 12. Existencia de `public.contracts`

**NO ENCONTRADA EN FASES A/B.** Resultado externo A: contracts_relation NULL; B1: cero filas en el catálogo filtrado que incluye public.contracts. No se infiere ausencia de objetos en otros esquemas ni permanencia indefinida del estado. Si aparece una relación conflictiva después, detener.

## 13. Objetos conflictivos

**SIN CONFLICTO DE NOMBRES DETECTADO EN LOS OBJETOS CONSULTADOS**, según NULL de A y cero filas de B1. Referencias de dependencias y roles resueltas en C, pero tipos, PK y privilegios aún pendientes. Versión 20261018032013 no cotejada en historial no encontrado. No se declara ausencia de todos los conflictos ni permiso de modificación.

## 14. Estado de índices

**ÍNDICE ESPERADO NO ENCONTRADO EN FASES A/B:** expected_index NULL y cero filas del catálogo filtrado, según ejecución externa. La definición local (created_by, created_at DESC) no se presenta como índice instalado.

## 15. Estado de políticas RLS

**SIN EVIDENCIA DE RLS CONTRACTUAL DESPLEGADA; NO VALIDADA FUNCIONALMENTE.** No se encontró public.contracts en fase A. No se ejecutó una consulta específica de políticas ni pruebas A/B/anónimo. El rol administrativo postgres no representa las restricciones de authenticated o anon; no demuestra su aislamiento.

## 16. Privilegios efectivos

**PERMISOS CONTRACTUALES NO COMPROBADOS.** C2: roles NOLOGIN y sin BYPASSRLS. D4: anon/authenticated tienen USAGE public true y CREATE false. D3: defaults de tabla amplios para ambos cuando crea postgres o supabase_admin. No prueban acceso a una tabla ausente ni RLS funcional. Tras despliegue autorizado se verificarán privilegios efectivos de tabla, columnas e indirectos; grants locales no se atribuyen a remoto.

## 17. Historial de migraciones

**HISTORIAL NO ENCONTRADO EN EL ESQUEMA ESPERADO.** Fase A: migration_history NULL. B1: cero relaciones con los nombres filtrados. B2: solo public; supabase_migrations no apareció entre los esquemas consultados. No se consultaron versiones/nombres/conteos ni se deben ejecutar consultas dependientes de esa relación ausente. Esto no demuestra que nunca existieran otras migraciones o cambios manuales; no crear, reparar ni marcar historial.

## 18. Riesgos residuales

Fases A–D registradas externamente y SQL local revisado. Tabla/índice/historial no encontrados; tipos/PK comunicados compatibles. Defaults amplios mitigados por REVOKE/GRANT locales para concesiones directas revisadas. Permisos efectivos/indirectos, ejecutor/transacción, historia, FK/retención, límites, recuperación y pruebas A/B/anónimo siguen pendientes. PostgreSQL no se declara listo para despliegue.

## 19. Decisiones pendientes

Revisar externamente el cierre A–D y la auditoría de sección 27. Antes de P3-B: resolver FK/baja, límites, respaldo/recuperación/reversión, ejecutor transaccional/versionado e historial ausente, pruebas/limpieza, revisión de permisos efectivos y autorización explícita de despliegue. No modificar defaults globales ni repetir consultas automáticamente.

## 20. Condiciones que bloquean el despliegue

**BLOQUEADO** mientras proyecto, existencia de objetos, historial, grants y RLS no estén observados; también si aparece `public.contracts`, un objeto homónimo conflictivo, versión duplicada, divergencia de historial o error de permisos. La falta de decisiones de FK, límites, respaldo, pruebas y limpieza impide autorizar P3-B aun si el inventario fuera favorable. Esta inspección no autoriza CREATE/ALTER/DROP/INSERT/UPDATE/DELETE/TRUNCATE/GRANT/REVOKE.

## 21. Próxima acción recomendada

1. Revisar externamente resultados A–D y auditoría estática de sección 27.
2. Resolver decisiones documentales de FK, límites, recuperación/reversión, método/historial de migración y pruebas/limpieza.
3. Preparar bajo alcance autorizado la comprobación de privilegios efectivos y ejecución transaccional; detener ante incompatibilidad. No modificar defaults ni aplicar SQL ahora.
4. P3-B exige autorización explícita distinta; aprobación de este informe no concede despliegue.

## 22. Estado final

**INSPECCIÓN DE METADATOS PREDESPLIEGUE COMPLETADA DENTRO DEL ALCANCE A–D; AUDITORÍA ESTÁTICA SATISFACTORIA — PENDIENTE DE APROBACIÓN EXTERNA.** Codex no ejecutó SQL remoto. Defaults comunicados mitigados estáticamente para concesiones directas revisadas; permisos efectivos aún pendientes. Public.contracts NO ENCONTRADA EN CONSULTAS PREVIAS; RLS contractual NO VALIDADA; P2 NO APLICADA POR ESTE PROCESO; pruebas A/B/anónimo NO EJECUTADAS; P3-B NO AUTORIZADO; Módulo 2 INCOMPLETO.

## 23. Seguimiento histórico M2-B3-P3-INSPECCIÓN-R1 — 2026-10-18

Este apartado conserva la preparación y el estado al entregar R1. Los resultados manuales recibidos después y el siguiente paso vigente se registran en la sección 24; no repetir la solicitud histórica de fase A.

### Base y evidencia local

Rama `relevo/m2-b2-p9c1-20261017`, origin oficial y HEAD `bf16db7213c879c75411b0964edfc2c743919c26`; árbol limpio y staging vacío al inicio. Hash SQL aprobado conservado: `5e633ec225f325d070d72bc44586292c0584155754535943b2e769f8d38121ac`. No se modifica código, dependencias, configuración privada ni migración. Solo este informe y estado/historial se actualizan.

### Fase A — única ejecución manual solicitada ahora

En el SQL Editor de `acuerdoseguro-dev` (`gaydlycsinbrlanzmsyj`), ejecutar el bloque completo si se admiten transacciones; de lo contrario, únicamente los dos SELECT por separado:

```sql
BEGIN TRANSACTION READ ONLY;

SELECT current_database() AS database_name,
       current_user AS execution_role,
       current_schema() AS schema_name,
       current_setting('server_version') AS postgres_version;

SELECT to_regclass('public.contracts') AS contracts_relation,
       to_regclass('public.contracts_created_by_created_at_idx') AS expected_index,
       to_regclass('supabase_migrations.schema_migrations') AS migration_history;

COMMIT;
```

Compartir únicamente ambas tablas de resultados no sensibles. No ejecutar todavía los bloques históricos A–J ni otras fases. Si contracts_relation no es NULL, **DETENER: existe una relación con el nombre previsto** y solicitar revisión del conflicto, sin continuar inventario adicional. Si el índice esperado existe, detener ante el conflicto aunque falte la tabla. Un error de permisos no acredita ausencia; no elevar privilegios ni cambiar identidad.

### Secuencia posterior condicional — NO EJECUTADA

- **Fase B:** solo después de revisar A sin conflictos, consulta de `pg_class`/`pg_namespace` de la sección 9, bloque C, acotada a tabla, índice e historial. Detener ante cualquier colisión. No se presume tabla ausente.
- **Fase C:** `pg_policies` de la sección 9, bloque D, únicamente si es pertinente después de revisar A/B. Cero políticas no prueba ausencia de tabla ni aislamiento. Si se confirmó ausencia de tabla, no hay políticas de esa tabla que puedan atribuirse a remoto.
- **Fase D:** permisos de tabla/columna para anon/authenticated (bloques F/G) únicamente si existe relación relevante y una revisión externa ha resuelto la detención por conflicto; no se ejecutan automáticamente al encontrar contracts. Si falta la tabla, sus grants específicos no son inspeccionables. Los defaults de tablas de `public` pueden revisarse aparte con `pg_default_acl` sin modificar nada.
- **Fase E:** historial solo si A confirmó relación y no hay bloqueos. Primero estructura desde `pg_attribute` (abajo) y permiso de lectura; después proponer SELECT limitado a version, name si existe y conteos. Nunca statements, SELECT * ni reparación. El historial técnico de migraciones es la única tabla de registro permitida en este alcance; no se leen tablas de negocio.

Preparación de estructura del historial (NO EJECUTADA; requiere existencia comprobada):

```sql
SELECT a.attname AS column_name,
       pg_catalog.format_type(a.atttypid, a.atttypmod) AS data_type
FROM pg_catalog.pg_attribute a
WHERE a.attrelid = 'supabase_migrations.schema_migrations'::regclass
  AND a.attnum > 0 AND NOT a.attisdropped
ORDER BY a.attnum;

SELECT has_table_privilege(current_user,
       'supabase_migrations.schema_migrations', 'SELECT') AS can_read_history;
```

No se prepara una consulta ejecutable con columna name asumida: se decide solo al recibir estructura/permiso. Si migration_history es NULL, registrar **HISTORIAL NO ENCONTRADO EN EL ESQUEMA ESPERADO**, únicamente cuando ese NULL haya sido observado; no concluir que no hubo cambios manuales.

### Registro de ejecución por fase

| Fase | Consulta preparada | Estado | Resultado observado / límite |
| --- | --- | --- | --- |
| A1 | Contexto PostgreSQL | NO EJECUTADA | Se solicita ejecución manual; ningún rol/base/version observado |
| A2 | Tabla, índice e historial | NO EJECUTADA | Existencia y conflictos desconocidos |
| B | Catálogo de objetos | NO EJECUTADA | Depende de revisar fase A sin conflictos |
| C | Políticas | NO EJECUTADA | Sin evidencia remota; propuesta local no equivale a política instalada |
| D | Privilegios efectivos/defaults | NO EJECUTADA | Condicional a existencia y ausencia de detención; sin grants observados |
| E1 | Estructura y permiso de historial | NO EJECUTADA | Depende de existencia confirmada |
| E2 | Versiones/nombres/conteos | NO EJECUTADA | Depende de E1; versión 20261018032013 no cotejada remotamente |

El acceso directo está BLOQUEADO por indisponibilidad técnica de una herramienta/conexión autorizada. No se clasifica ninguna consulta como EJECUTADA — RESULTADO CONFIRMADO ni EJECUTADA — RESULTADO INCONCLUSO sin evidencia. Si el responsable las ejecuta, se atribuirán a ejecución manual externa y se registrarán fecha, método, rol y resultados.

### Riesgos y continuidad

No se puede decidir si la migración es candidata a despliegue hasta recibir y revisar el inventario. Siguen pendientes ON DELETE RESTRICT/baja de cuentas, máximos de descripción/cláusulas, respaldo/recuperación, historial/colisiones, pruebas A/B/anónimo y plan de limpieza. No se autorizan escrituras ni cuentas de prueba. P3-B necesita autorización separada; el Módulo 2 no está completo.

### Verificaciones locales de R1

`npm run build` PASS: 108 módulos, JS 544,90 kB y advertencia conocida >500 kB; `npm run lint` PASS; `npm run supabase:check:test` PASS, 22/22 casos simulados; `git diff --check` PASS. Migración con el SHA-256 aprobado intacto; diff limitado a este informe, ESTADO_PROYECTO e HISTORIAL_PROMPTS. HEAD conservado y staging vacío. Ningún resultado frontend se presenta como evidencia de PostgreSQL. No se volvió a consultar salud Auth ni se ejecutó SQL remoto.

## 24. Registro histórico M2-B3-P3-INSPECCIÓN-R2 — Evidencia externa de fase A y preparación de fase B

Este apartado conserva la preparación de R2. R3 registra después la ejecución externa de B y el paso vigente en la sección 25. La denominación Fase C de R3 se refiere a dependencias/roles; sustituye para el siguiente paso la propuesta histórica de políticas del R1, inaplicable a una tabla no encontrada.

Registro: 2026-10-18; fecha/hora exacta de ejecución externa no comunicada. Proyecto confirmado: acuerdoseguro-dev, gaydlycsinbrlanzmsyj, https://gaydlycsinbrlanzmsyj.supabase.co. Fuente: resultados aportados por el responsable procedentes de capturas de SQL Editor; Codex no examinó directamente esas capturas ni ejecutó las consultas.

| Fase / campo | Resultado real comunicado | Clasificación |
| --- | --- | --- |
| A1 / database_name | postgres | EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE |
| A1 / execution_role | postgres | EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE |
| A1 / schema_name | public | EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE |
| A1 / postgres_version | 17.11 | EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE |
| A2 / contracts_relation | NULL | EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE |
| A2 / expected_index | NULL | EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE |
| A2 / migration_history | NULL | EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE |
| B1 / catálogo de relaciones | Sin resultado recibido | NO EJECUTADA / PENDIENTE |
| B2 / esquemas relevantes | Sin resultado recibido | NO EJECUTADA / PENDIENTE |

Interpretación: no se encontraron public.contracts, el índice contractual esperado ni supabase_migrations.schema_migrations mediante to_regclass. No hay evidencia de RLS contractual desplegada; postgres no representa authenticated ni anon. La ausencia de esa relación de historial no demuestra ausencia de todas las migraciones anteriores. No se declara PostgreSQL listo para despliegue ni se autoriza aplicar la migración.

### B1 — Relaciones e índice, solo catálogo

```sql
SELECT
  n.nspname AS schema_name,
  c.relname AS object_name,
  c.relkind AS object_type,
  c.relrowsecurity AS rls_enabled,
  c.relforcerowsecurity AS rls_forced
FROM pg_catalog.pg_class AS c
JOIN pg_catalog.pg_namespace AS n
  ON n.oid = c.relnamespace
WHERE
  (
    n.nspname = 'public'
    AND c.relname IN (
      'contracts',
      'contracts_created_by_created_at_idx'
    )
  )
  OR
  (
    n.nspname = 'supabase_migrations'
    AND c.relname = 'schema_migrations'
  )
ORDER BY n.nspname, c.relname;
```

### B2 — Existencia de esquemas, solo catálogo

```sql
SELECT
  nspname AS schema_name
FROM pg_catalog.pg_namespace
WHERE nspname IN ('public', 'supabase_migrations')
ORDER BY nspname;
```

Ambas consultas revisadas por inspección: solo SELECT, lecturas de pg_class/pg_namespace, filtros de nombres exactos, sin acceso a filas de negocio ni funciones con efectos secundarios. No ejecutadas por Codex. El responsable debe ejecutarlas en el SQL Editor del proyecto confirmado y compartir solo ambos resultados, incluidas respuestas sin filas. Detener después; si aparece tabla/índice conflictivo, error de permisos o contradicción con A, registrar y solicitar revisión antes de avanzar. No consultar estructura/contenido de schema_migrations mientras no exista relación confirmada.

Verificaciones locales R2: rama/HEAD esperados; solo los tres cambios documentales previos de R1, sin trabajo inesperado ni staging. SHA-256 SQL aprobado intacto: 5e633ec225f325d070d72bc44586292c0584155754535943b2e769f8d38121ac. Sin cambios de código, dependencias, entorno privado o SQL, sin commit/push. Diff check correcto. Build/lint/22 pruebas corresponden a R1 y no se atribuyen a nuevas ejecuciones R2, exclusivamente documental.

## 25. Registro histórico M2-B3-P3-INSPECCIÓN-R3 — Fase B externa y preparación de C

Los estados pendientes y la solicitud de C1/C2 de este apartado corresponden a la entrega R3. Sus resultados posteriores y el siguiente paso vigente se registran en la sección 26. La fase D actual R4 verifica tipos/PK/defaults/esquema; sustituye como siguiente paso las propuestas históricas de privilegios contractuales, inaplicables mientras la tabla no exista.

Resultados recibidos el 2026-10-18; fecha/hora y rol exacto de las ejecuciones de B no comunicados. Responsable ejecutó manualmente las dos consultas en SQL Editor del proyecto confirmado acuerdoseguro-dev (gaydlycsinbrlanzmsyj). Codex no realizó conexión SQL ni examinó directamente capturas.

| Consulta | Resultado aportado por el responsable | Estado |
| --- | --- | --- |
| B1: pg_class/pg_namespace, objetos exactos | Success. No rows returned | EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE |
| B2: public y supabase_migrations | Una fila: schema_name = public; no apareció supabase_migrations | EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE |
| C1: referencias Auth/UUID | Sin resultado recibido | NO EJECUTADA — PENDIENTE |
| C2: anon/authenticated | Sin resultado recibido | NO EJECUTADA — PENDIENTE |

**Fase B COMPLETADA MEDIANTE EVIDENCIA EXTERNA.** No se encontraron objetos contractuales esperados ni conflicto de nombres entre los objetos filtrados. Public existe; supabase_migrations no apareció. La ausencia del historial esperado no demuestra que nunca existieran otras migraciones. No se validó RLS contractual ni se ejecutó la migración. Los resultados administrativos previos de postgres no representan los permisos de clientes.

### C1 — Dependencias necesarias (preparada, no ejecutada)

```sql
SELECT
  to_regclass('auth.users') AS auth_users_relation,
  to_regprocedure('auth.uid()') AS auth_uid_function,
  to_regprocedure('pg_catalog.gen_random_uuid()') AS uuid_function;
```

Solo resuelve referencias de catálogo. No lee registros de auth.users ni invoca auth.uid() o gen_random_uuid(). Un resultado no nulo confirma referencia existente, no permiso EXECUTE ni comportamiento funcional de la migración.

### C2 — Roles utilizados por RLS (preparada, no ejecutada)

```sql
SELECT
  rolname,
  rolcanlogin,
  rolbypassrls
FROM pg_catalog.pg_roles
WHERE rolname IN ('anon', 'authenticated')
ORDER BY rolname;
```

Solo SELECT de metadatos acotados; no modifica roles ni permisos. Rolcanlogin informa capacidad de login directo, no autorización por API; rolbypassrls no enumera grants ni membresías efectivas. No presenta estos atributos como prueba RLS con usuarios ordinarios.

Responsable ejecuta únicamente C1/C2 en el SQL Editor del proyecto confirmado y facilita ambos resultados no sensibles. Detener después. Si falta cualquiera de los objetos/roles, registrar BLOQUEO PARA REVISIÓN, sin crearlo; si hay error de permisos, ambigüedad o BYPASSRLS inesperado, detener para revisión, sin elevar permisos ni modificar nada.

### Integridad y límites R3

Rama relevo/m2-b2-p9c1-20261017 y HEAD bf16db7213c879c75411b0964edfc2c743919c26 conservados. Solo cambios esperados previos de R1/R2 en tres documentos; staging vacío. SHA-256 SQL aprobado intacto: 5e633ec225f325d070d72bc44586292c0584155754535943b2e769f8d38121ac. Diff check correcto; sin cambios de src, dependencias, main, SQL o entorno privado, sin commit/push. No se repiten ni se atribuyen a R3 pruebas build/lint históricas. Dependencias/roles, privilegios, política de eliminación de cuentas, límites de texto, respaldo/recuperación, pruebas A/B/anónimo y autorización de despliegue siguen pendientes. P3-B NO AUTORIZADO; M2-B3 y Módulo 2 incompletos.

## 26. Registro histórico M2-B3-P3-INSPECCIÓN-R4 — Fase C externa y preparación de D1–D4

Se conserva la preparación de R4. Los resultados posteriores de D y el siguiente paso vigente se registran en sección 27; no repetir la solicitud histórica de D1–D4.

Registro recibido el 2026-10-18; fecha/hora y rol exactos de las ejecuciones C no comunicados. Fuente: responsable comunica resultados procedentes de capturas de sus ejecuciones manuales en SQL Editor de acuerdoseguro-dev (gaydlycsinbrlanzmsyj). Codex no ejecutó SQL, no examinó directamente las capturas ni leyó filas de Auth.

| Consulta / campo | Resultado externo | Estado |
| --- | --- | --- |
| C1 / auth_users_relation | auth.users | EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE |
| C1 / auth_uid_function | auth.uid() | EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE |
| C1 / uuid_function | gen_random_uuid() | EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE |
| C2 / anon | rolcanlogin false; rolbypassrls false | EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE |
| C2 / authenticated | rolcanlogin false; rolbypassrls false | EJECUTADA — RESULTADO CONFIRMADO EXTERNAMENTE |
| D1 / tipo y PK de auth.users.id | Sin resultado recibido | NO EJECUTADA — PENDIENTE |
| D2 / retornos de funciones | Sin resultado recibido | NO EJECUTADA — PENDIENTE |
| D3 / ACL predeterminadas declaradas | Sin resultado recibido | NO EJECUTADA — PENDIENTE |
| D4 / privilegios de public | Sin resultado recibido | NO EJECUTADA — PENDIENTE |

**Fase C COMPLETADA MEDIANTE EVIDENCIA EXTERNA.** Las tres referencias se resolvieron; la representación gen_random_uuid() corresponde a la referencia pg_catalog.gen_random_uuid() consultada, no prueba que su retorno sea UUID ni que se haya ejecutado. Ambos roles existen y ninguno tiene BYPASSRLS. NOLOGIN no es un problema por sí mismo para roles de API; no prueba grants, membresías ni aislamiento. La tabla contractual no existe en el catálogo previamente consultado, no se han probado permisos sobre contratos ni RLS contractual.

### D1 — Tipo de auth.users.id y pertenencia a PK (NO EJECUTADA)

```sql
SELECT
  a.attname AS column_name,
  format_type(a.atttypid, a.atttypmod) AS data_type,
  a.attnotnull AS not_null,
  EXISTS (
    SELECT 1
    FROM pg_catalog.pg_constraint co
    WHERE co.conrelid = a.attrelid
      AND co.contype = 'p'
      AND a.attnum = ANY(co.conkey)
  ) AS is_primary_key_column
FROM pg_catalog.pg_attribute a
WHERE a.attrelid = to_regclass('auth.users')
  AND a.attname = 'id'
  AND a.attnum > 0
  AND NOT a.attisdropped;
```

Objetivo: comprobar tipo esperado uuid, NOT NULL y pertenencia a clave primaria de la columna referenciada. Son expectativas, no resultados. La marca de pertenencia a PK no enumera sus columnas ni demuestra por sí sola que id sea una clave única de una sola columna; si esa distinción resulta necesaria para validar la FK, proponer comprobación adicional de catálogo tras revisar D1, sin asumirla ni ampliar esta ejecución.

### D2 — Tipos de retorno de funciones (NO EJECUTADA)

```sql
SELECT
  n.nspname AS schema_name,
  p.proname AS function_name,
  pg_catalog.pg_get_function_identity_arguments(p.oid) AS arguments,
  pg_catalog.pg_get_function_result(p.oid) AS return_type
FROM pg_catalog.pg_proc p
JOIN pg_catalog.pg_namespace n
  ON n.oid = p.pronamespace
WHERE
  (n.nspname = 'auth'
   AND p.proname = 'uid'
   AND p.pronargs = 0)
  OR
  (n.nspname = 'pg_catalog'
   AND p.proname = 'gen_random_uuid'
   AND p.pronargs = 0)
ORDER BY n.nspname, p.proname;
```

Objetivo: retorno compatible con uuid para las funciones sin argumentos referenciadas. Lee pg_proc/pg_namespace y funciones informativas de catálogo; no ejecuta las funciones inspeccionadas ni prueba permiso EXECUTE.

### D3 — Privilegios predeterminados declarados (NO EJECUTADA)

```sql
SELECT
  pg_catalog.pg_get_userbyid(d.defaclrole) AS creator_role,
  COALESCE(n.nspname, '[global]') AS scope,
  d.defaclobjtype AS object_type,
  d.defaclacl::text AS acl
FROM pg_catalog.pg_default_acl d
LEFT JOIN pg_catalog.pg_namespace n
  ON n.oid = d.defaclnamespace
WHERE n.nspname = 'public'
   OR d.defaclnamespace = 0
ORDER BY creator_role, scope, object_type;
```

Objetivo: defaults explícitos globales y de public, por rol creador y tipo de objeto. Cero filas no demuestra seguridad: los defaults incorporados, creador real de futuros objetos, membresías y permisos efectivos se evalúan aparte. No modifica ACL.

### D4 — Privilegios efectivos del esquema public (NO EJECUTADA)

```sql
SELECT
  role_name,
  has_schema_privilege(role_name, 'public', 'USAGE') AS schema_usage,
  has_schema_privilege(role_name, 'public', 'CREATE') AS schema_create
FROM (
  VALUES ('anon'), ('authenticated')
) AS roles(role_name);
```

Objetivo: USAGE/CREATE de public para los dos roles ya encontrados. No consulta grants de tabla/columna ni prueba RLS funcional. Un permiso de esquema no implica automáticamente permiso sobre sus tablas.

### Revisión y próximo paso

Las cuatro consultas se revisaron por inspección: exclusivamente SELECT sobre catálogos/atributos de permisos, sin datos de negocio, registros de auth.users, escrituras ni funciones con efectos secundarios. Preparadas, NO EJECUTADAS por Codex ni con resultado externo recibido. No se intenta obtener acceso SQL adicional.

Responsable ejecuta solo D1–D4 en SQL Editor del proyecto confirmado, comparte los cuatro resultados no sensibles y se detiene. Registrar incompatibilidades, dependencias/columnas ausentes, errores de permisos o permisos inesperados para revisión; no crear objetos, elevar privilegios ni modificar roles/ACL. No ejecutar la migración. Esperar revisión de los resultados antes de proponer cualquier despliegue.

### Verificaciones y continuidad R4

Rama y HEAD esperados; cambios documentales previos R1–R3 conservados, sin trabajo inesperado ni staging. SQL con SHA-256 5e633ec225f325d070d72bc44586292c0584155754535943b2e769f8d38121ac intacto; git diff --check correcto. Solo estos tres documentos modificados; código, dependencias, main, entorno privado y migración conservados. Sin commit/push ni SQL remoto. No se repiten build/lint históricos para la tarea documental.

RLS contractual NO VALIDADA; public.contracts NO ENCONTRADA EN LAS CONSULTAS PREVIAS; migración P2 NO APLICADA POR ESTE PROCESO; P3-B NO AUTORIZADO; Módulo 2 INCOMPLETO. FK/retención, límites de descripción/cláusulas, recuperación, ACL/defaults, pruebas A/B/anónimo y limpieza siguen pendientes.

## 27. M2-B3-P3-INSPECCIÓN-R5 — Cierre de fase D y auditoría estática

### Evidencia y atribución

Recibida el 2026-10-18 del responsable, ejecutor manual de D1–D4 en SQL Editor de acuerdoseguro-dev (gaydlycsinbrlanzmsyj). Fecha/hora exacta y rol ejecutor no comunicados. D1/D2 son resultados comunicados; D3/D4 se describen como procedentes de capturas. Codex no examinó directamente capturas ni verificó independientemente salida remota. No reconstruye ACL completas, grantor, grant options u otros privilegios no aportados.

| Consulta | Resultado aportado | Estado |
| --- | --- | --- |
| D1 | auth.users.id uuid, NOT NULL, pertenece a PK | EJECUTADA — RESULTADO COMUNICADO EXTERNAMENTE |
| D2 | auth.uid() y gen_random_uuid() devuelven uuid | EJECUTADA — RESULTADO COMUNICADO EXTERNAMENTE |
| D3 | Cuatro combinaciones de defaults de tabla, abajo | EJECUTADA — EVIDENCIA EXTERNA SEGÚN RESPONSABLE |
| D4 | anon/authenticated: USAGE public true, CREATE public false | EJECUTADA — EVIDENCIA EXTERNA SEGÚN RESPONSABLE |

| Creador de futuras tablas en public | Beneficiario | SELECT | INSERT | UPDATE | DELETE |
| --- | --- | --- | --- | --- | --- |
| postgres | anon | true | true | true | true |
| postgres | authenticated | true | true | true | true |
| supabase_admin | anon | true | true | true | true |
| supabase_admin | authenticated | true | true | true | true |

**Fase D COMPLETADA MEDIANTE EVIDENCIA EXTERNA.** Los defaults afectan futuros objetos creados por el rol correspondiente; no demuestran exposición de public.contracts, no encontrada en A/B. No son un proceso que reconcede privilegios continuamente después de revocarlos sobre un objeto concreto. No se modifican defaults/globales, que pueden afectar servicios ajenos. [Referencia PostgreSQL 17: defaults](https://www.postgresql.org/docs/17/sql-alterdefaultprivileges.html).

### Diez comprobaciones sobre el SQL real

Archivo de 53 líneas: supabase/migrations/20261018032013_create_private_contract_drafts.sql. SHA-256 intacto: 5e633ec225f325d070d72bc44586292c0584155754535943b2e769f8d38121ac.

| Nº | Control | Líneas | Resultado de revisión estática |
| --- | --- | --- | --- |
| 1 | Transacción única | 3–53 | PASS POR INSPECCIÓN: BEGIN/COMMIT encierran tabla, índice, RLS, REVOKE, GRANT y políticas. El ejecutor futuro debe preservar el bloque y abortar ante error |
| 2 | RLS antes de COMMIT | 23, 53 | PASS POR INSPECCIÓN: ENABLE ROW LEVEL SECURITY antes del commit |
| 3 | Revocar privilegios directos de tabla | 26 | PASS POR INSPECCIÓN: REVOKE ALL de PUBLIC, anon y authenticated sobre la tabla nueva neutraliza las concesiones directas de tabla procedentes de defaults comunicados |
| 4 | Sin GRANT posterior a anon | 27–29 | PASS POR INSPECCIÓN: todos los GRANT posteriores van solo a authenticated |
| 5 | Concesiones limitadas | 27–29 | PASS POR INSPECCIÓN: SELECT de tabla; INSERT/UPDATE solo title, description, terms, después de retirar permisos amplios de tabla |
| 6 | Políticas por propietario | 31–50 | PASS POR INSPECCIÓN: SELECT USING; INSERT WITH CHECK; UPDATE USING y WITH CHECK exigen auth.uid() no nulo, created_by igual y status draft |
| 7 | Sin DELETE cliente | 26–50 | PASS POR INSPECCIÓN: DELETE revocado, sin reconcesión ni política DELETE de aplicación |
| 8 | Identidad/propiedad/estado/fecha inmutables por grants | 29 | PASS POR INSPECCIÓN: id, created_by, status y created_at excluidos del UPDATE concedido |
| 9 | Sin reconcesión amplia después | 30–53 | PASS POR INSPECCIÓN: solo políticas y COMMIT; sin ALL ni INSERT/UPDATE de tabla o cambios de defaults posteriores |
| 10 | Esquemas y tipos de dependencias coherentes | 5–17, 33–50 | PASS POR INSPECCIÓN CON EVIDENCIA EXTERNA: public existe; auth.users/id y funciones resueltas; id y retornos uuid comunicados compatibles con uuid del SQL. No demuestra FK ejecutada, permisos REFERENCES/EXECUTE ni PK monocolumna completa |

**Revisión estática satisfactoria para el alcance y defaults comunicados.** Mitigación prevista: revocar acceso directo amplio de tabla y reconstruir concesiones mínimas con filtro RLS por creador. No se encontró defecto importante demostrado en el archivo que exija corregirlo en R5. SQL conservado, sin parser/servidor PostgreSQL ejecutado. La función gen_random_uuid() no calificada del archivo requiere resolución/entorno de ejecución adecuados en el despliegue futuro; no se alteró aquí.

### Tres niveles de evidencia

1. **Seguridad prevista:** draft privado del creador; anon sin acceso; authenticated solo lectura propia e inserción/edición de contenido propio; DELETE y columnas de identidad/propiedad/estado/fecha cerrados para cliente.
2. **Seguridad revisada estáticamente:** presencia, orden y expresiones de los diez controles sobre el archivo local, contrastados con metadatos externos comunicados.
3. **Seguridad efectiva en PostgreSQL:** NO VERIFICADA. Tabla no encontrada, migración no aplicada, sin pruebas de API/RLS A/B/anon. SQL Editor administrativo no sustituye clientes ordinarios.

Los permisos efectivos futuros deben contemplar grants de tabla/columna independientes e indirectos (PUBLIC, membresías/herencia, funciones/vistas privilegiadas), propietario y BYPASSRLS. No se presenta REVOKE de tabla como garantía universal contra toda ruta. Un permiso de tabla puede hacer ineficaz limitar solo columnas; el archivo lo retira antes de conceder tres columnas. D3 no acredita grants de columna independientes en una tabla inexistente. Véanse [GRANT](https://www.postgresql.org/docs/17/sql-grant.html) y [RLS](https://www.postgresql.org/docs/17/ddl-rowsecurity.html).

### Hallazgos y riesgos residuales

| ID | Clasificación | Evidencia / impacto | Tratamiento |
| --- | --- | --- | --- |
| R5-01 | Riesgo de configuración mitigado por diseño | Defaults amplios comunicados para postgres/supabase_admin a anon/authenticated | REVOKE/GRANT locales adecuados para concesiones directas revisadas; verificar permisos efectivos, columnas e indirectos tras despliegue autorizado. No exposición demostrada de tabla inexistente; no cambiar defaults globales |
| R5-02 | Limitación de validación | Sin ejecución del SQL ni pruebas funcionales | Probar A/B/anon, API directa, DELETE, columnas inmutables y grants con usuarios ordinarios en alcance autorizado; admin no basta |
| R5-03 | Decisión funcional pendiente | ON DELETE RESTRICT puede bloquear eliminación de cuenta con contratos | Aprobar política de baja/retención antes de aplicar; no modificar FK aquí |
| R5-04 | Decisión de límites pendiente | Título 120; descripción y cláusulas sin máximo aprobado | Definir límites o aceptar explícitamente riesgo/controles conforme al preflight; no cambiar SQL aquí |
| R5-05 | Precondición operativa | Sin recuperación/reversión verificadas ni ejecutor acordado | Definir respaldo, recuperación, reversión segura, transacción, cuentas/entorno y limpieza; no DROP/CASCADE automático |
| R5-06 | Precondición de historial | Esquema supabase_migrations no apareció; relación de historial no encontrada | Conciliar método versionado e historia antes de desplegar; no crear/reparar historial ahora; ausencia no prueba inexistencia de otras migraciones |

Sin defecto CRÍTICO/ALTO demostrado en el SQL inspeccionado; no equivale a certificación de seguridad ni permiso para desplegar. Las precondiciones impiden declarar el despliegue listo hasta resolverlas y recibir autorización separada.

### Cierre y próximo paso

**INSPECCIÓN DE METADATOS PREDESPLIEGUE COMPLETADA DENTRO DEL ALCANCE A–D; AUDITORÍA ESTÁTICA SATISFACTORIA — PENDIENTE DE APROBACIÓN EXTERNA.** No es inventario exhaustivo de toda membresía, función o servicio. Esperar aprobación externa del informe; resolver las precondiciones del preflight. No se solicita ejecutar SQL adicional ni se autoriza P3-B por este cierre.

RLS contractual NO VALIDADA; public.contracts NO ENCONTRADA EN CONSULTAS PREVIAS; migración P2 NO APLICADA POR ESTE PROCESO; pruebas A/B/anónimo NO EJECUTADAS; P3-B NO AUTORIZADO; Módulo 2 INCOMPLETO.

### Verificaciones locales R5

Rama relevo/m2-b2-p9c1-20261017, HEAD bf16db7213c879c75411b0964edfc2c743919c26 conservados. Cambios previos R1–R4 preservados, hash SQL aprobado intacto y git diff --check correcto. Solo inventario/estado/historial modificados; sin src, dependencias, SQL, entorno privado, main, staging, commit ni push. No se ejecutó SQL remoto. Build/lint anteriores son históricos, no nuevas ejecuciones R5.

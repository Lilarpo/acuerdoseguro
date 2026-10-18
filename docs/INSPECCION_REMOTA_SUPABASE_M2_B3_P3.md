# M2-B3-P3-INSPECCIÓN — Inventario remoto de solo lectura

**Estado inicial de este registro:** BLOQUEADO POR AUTORIZACIÓN. Proyecto compartido todavía **NO CONFIRMADO** mediante referencia pública y Dashboard; autorización explícita de consultas de catálogo **PENDIENTE**. Las consultas siguientes están **PREPARADAS — NO EJECUTADAS**. Este estado debe actualizarse solo con evidencia real posterior.

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
| Nombre en Dashboard | NO CONFIRMADO | Responsable lo lee del proyecto compartido autorizado. |
| Referencia pública del proyecto | NO CONFIRMADA | Responsable compara referencia en Dashboard y URL pública del proyecto, sin claves. |
| URL pública | NO CONFIRMADA | Cotejo local del responsable con la configuración de AcuerdoSeguro, sin copiar `.env.local` al informe. |
| Confirmación de que es el proyecto compartido | PENDIENTE | Declaración explícita del responsable tras comparación cruzada. |
| Base objetivo y rol SQL | NO OBSERVADOS | Consulta A solo tras confirmación y autorización. |

`.env.example` tiene valores vacíos. `.env.local` existe, está ignorado y no se leyó ni imprimió. Una coincidencia de nombre por sí sola no identifica el proyecto. Si el responsable no confirma inequívocamente la referencia, **detener antes de cualquier conexión o consulta**.

## 6. Método de inspección

No se encontró `supabase`, `psql`, `postgres` ni Docker en PATH; tampoco vínculo CLI del repositorio ni base PostgreSQL local demostrada. Método futuro preferido: el responsable abre el **SQL Editor del proyecto confirmado** y ejecuta manualmente, tras autorización específica, solo las consultas de catálogo de este documento. Codex no recupera la sesión privada del navegador, no pide conexión administrativa y no automatiza el Dashboard. Si el Editor permite conservar la transacción de una ejecución completa, envolver un lote autorizado en `BEGIN TRANSACTION READ ONLY;` y `COMMIT;`; si ejecuta cada consulta por separado, usar SELECT individuales y comprobar el destino en cada sesión. [Transacciones de solo lectura de PostgreSQL](https://www.postgresql.org/docs/current/sql-begin.html).

## 7. Estado de autorización

El prompt autoriza **preparar** la inspección y exige una confirmación adicional antes de ejecutar o pedir que se ejecute SQL remoto. Esa confirmación no consta aún. Una vez confirmado el proyecto por referencia pública, la solicitud al responsable será literalmente: **«He preparado el inventario de metadatos para el proyecto Supabase confirmado. ¿Autorizas exclusivamente consultas SQL de catálogo de SOLO LECTURA en ese proyecto, sin modificaciones de estructura, datos, políticas, permisos ni migraciones?»** Una respuesta afirmativa no autoriza despliegue, datos de prueba ni lectura de datos personales.

## 8. Límites de acceso

Permitir solo SELECT de metadatos acotados a `public.contracts`, índice previsto, políticas asociadas, roles de cliente y `supabase_migrations.schema_migrations` si existe. No seleccionar filas contractuales, `auth.users`, tokens, correos, cookies, credenciales, cuerpos SQL guardados en el historial ni datos de terceros. No usar `service_role` para probar RLS; SQL Editor como administrador solo inventaría metadatos y puede eludir políticas. Ante error de permisos, no elevar privilegios ni reintentar con otra identidad. [RLS y grants de Supabase](https://supabase.com/docs/guides/database/postgres/row-level-security).

## 9. Consultas propuestas — PREPARADAS, NO EJECUTADAS

Ejecutar secuencialmente, **solo tras confirmar proyecto y obtener autorización expresa**. Las consultas E–H son condicionales: no ejecutarlas si B informa ausencia de `public.contracts`. La consulta J requiere que B confirme el historial y que I confirme su estructura y permisos. `NULL` de `to_regclass` se interpreta solo como ausencia actual en la base inspeccionada.

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
| A–J | NO | Ninguno | No observado | Sin ejecución | Ningún resultado remoto | **NO EJECUTADA** |

No se abrió conexión administrativa, no se utilizó SQL Editor, no se leyó `.env.local` y no se pidió al responsable ejecutar las consultas antes de su autorización.

## 11. Evidencias observadas

Evidencia **local**: Git en rama y HEAD esperados; migración publicada presente con hash/tamaño correctos; el cliente React utiliza variables públicas locales sin revelar sus valores; no hay CLI/psql local detectado. Evidencia **remota PostgreSQL**: ninguna. No inferir tablas ausentes, RLS activa, grants aplicados o historial limpio a partir de GitHub, build o salud Auth.

Verificaciones locales de este prompt: `npm run build` PASS (advertencia conocida de bundle JS de 544,90 kB), `npm run lint` PASS, `npm run supabase:check:test` PASS (22/22 simulaciones), `git diff --check` PASS. El diagnóstico Auth real y las pruebas PostgreSQL/RLS no se ejecutaron.

## 12. Existencia de `public.contracts`

**NO CONSULTADA.** La migración local define esa tabla, pero no prueba que exista ni que esté ausente en el Supabase compartido. La consulta B debe ejecutarse solo sobre el proyecto inequívocamente confirmado y autorizado. Si informa existencia, detener el futuro despliegue y revisar conflicto; no alterar la tabla.

## 13. Objetos conflictivos

**NO CONSULTADOS.** Los nombres `public.contracts`, `public.contracts_created_by_created_at_idx` y versión `20261018032013` son candidatos a colisión; C/D/J permiten evaluarlos sin tocar objetos. Un nombre parecido en otro esquema no autoriza modificarlo. Ante un conflicto claro, detener inventario y elevar revisión externa conforme al prompt.

## 14. Estado de índices

**NO CONSULTADO.** El archivo local propone `(created_by, created_at DESC)`. D identifica nombres/definiciones remotos sin consultar filas. Si `public.contracts` no existe, el índice de esa tabla no puede validarse como instalado; revisar aparte cualquier nombre de índice homónimo en `public`.

## 15. Estado de políticas RLS

**NO CONSULTADO / NO VALIDADO.** C leerá `relrowsecurity` y D listará políticas si existe tabla. La ausencia de filas en `pg_policies` puede significar tabla inexistente o tabla sin políticas; interpretarla solo junto con B/C. Incluso políticas presentes no demuestran autorización correcta para cuentas A/B.

## 16. Privilegios efectivos

**NO CONSULTADOS.** F/G comprueban grants efectivos de `anon` y `authenticated` únicamente si existe tabla. H revisa herencia y defaults; `pg_policies` no sustituye esos resultados. No atribuir a remoto el `REVOKE/GRANT` del archivo local. Un SQL Editor administrativo puede ver más que los clientes y no sirve para probar aislamiento por RLS.

## 17. Historial de migraciones

**NO CONSULTADO.** B comprueba la existencia de `supabase_migrations.schema_migrations`; I su estructura; J solo versión, cantidad y últimas versiones, si está disponible. Si B devuelve `NULL`, registrar **HISTORIAL DE MIGRACIONES SUPABASE NO ENCONTRADO EN EL ESQUEMA ESPERADO**, sin concluir que no hubo cambios manuales. No marcar ni reparar migraciones. GitHub y el historial de Supabase son registros distintos.

## 18. Riesgos residuales

El proyecto no está identificado; no hay autorización de lectura ni inventario remoto. Se desconoce si la tabla, índice o versión ya existen y qué permisos efectivos hay. La inspección administrativa de metadatos no demuestra RLS con usuarios normales. `ON DELETE RESTRICT` podría bloquear bajas de cuenta; descripción y cláusulas no tienen máximos explícitos. Faltan respaldo/recuperación confirmados y pruebas A/B/anónimo autorizadas. No convertir hallazgos de catálogo en permiso de despliegue.

## 19. Decisiones pendientes

El responsable debe confirmar referencia/URL/nombre del proyecto compartido sin credenciales; después, autorizar **por separado** las consultas de catálogo de solo lectura. Antes de P3-B siguen pendientes: política de baja y `ON DELETE RESTRICT`, límites de contenido o aceptación formal del riesgo, respaldo/recuperación, reconciliación de migraciones, cuentas/entorno de prueba y limpieza, coordinación y autorización específica de modificación.

## 20. Condiciones que bloquean el despliegue

**BLOQUEADO** mientras proyecto, existencia de objetos, historial, grants y RLS no estén observados; también si aparece `public.contracts`, un objeto homónimo conflictivo, versión duplicada, divergencia de historial o error de permisos. La falta de decisiones de FK, límites, respaldo, pruebas y limpieza impide autorizar P3-B aun si el inventario fuera favorable. Esta inspección no autoriza CREATE/ALTER/DROP/INSERT/UPDATE/DELETE/TRUNCATE/GRANT/REVOKE.

## 21. Próxima acción recomendada

1. El responsable confirma referencia pública, URL pública y nombre del proyecto compartido en su Dashboard y frente a la configuración local, sin enviar claves.
2. Presentar la solicitud literal de la sección 7 y esperar autorización explícita para **solo** consultas de catálogo.
3. El responsable ejecuta manualmente las consultas pertinentes en el proyecto confirmado; compartir únicamente resultados de metadatos no sensibles. Registrar ID, fecha, rol, método, resultado, límite y decisión. Detener al primer conflicto, error de permisos o ambigüedad.
4. Someter el inventario real a revisión externa. P3-B requiere una autorización distinta y sigue fuera de alcance.

## 22. Estado final

**BLOQUEADO POR AUTORIZACIÓN Y PROYECTO NO CONFIRMADO.** Este documento deja consultas concretas y seguras preparadas; **ninguna consulta remota se ejecutó**. `public.contracts`, políticas, privilegios e historial remotos **NO CONSULTADOS**. Migración P2 **NO APLICADA POR ESTE PROMPT**; pruebas A/B/anónimo **NO EJECUTADAS**; M2-B3 y Módulo 2 **INCOMPLETOS**.

# M2-B3-P3 — Plan de seguridad, decisiones y recuperación

> Antecedente histórico P1/P2, conservado para trazabilidad. P4 implementó los límites y el frontend local; P5 auditó el candidato con SHA-256 `947cd0b5026bfc0f69a335e986e15e40082f077f0f12ba13bf3340ce7098445c`. Las menciones posteriores a «implementación pendiente», 53 líneas y hash original describen el estado anterior, no el SQL candidato actual. La preparación manual y las condiciones MVP vigentes están en [ESTADO_PROYECTO.md, registro P5](ESTADO_PROYECTO.md#m2-b3-p5--release-candidate-y-respaldo-2026-10-18): solo cuentas/datos de prueba según el responsable, sin contratar Pro ni presumir backups/PITR. Aún no hay autorización de SQL remoto ni RLS funcional validada.

Fecha de elaboración: 2026-10-18, PRE-DESPLIEGUE-P1. Actualización: PRE-DESPLIEGUE-P2, 2026-10-18. **A Y B APROBADAS COMO DISEÑO; IMPLEMENTACIÓN DE LÍMITES PENDIENTE. ACTUALIZACIÓN DOCUMENTAL PENDIENTE DE REVISIÓN EXTERNA. RESULTADO GLOBAL: NO-GO.**

## 1. Resumen ejecutivo

El proyecto confirmado es **acuerdoseguro-dev**, referencia pública `gaydlycsinbrlanzmsyj`, URL `https://gaydlycsinbrlanzmsyj.supabase.co`. Se propone preparar un despliegue futuro de borradores privados del creador, sin conectar el frontend ni habilitar participantes, firmas, invitaciones o blockchain.

La inspección A–D y auditoría estática están aprobadas documentalmente por el responsable. PRE-DESPLIEGUE-P2 aprueba expresamente las decisiones de diseño A y B, sin aprobar su implementación ni el despliegue. La migración contiene defensas coherentes frente a los defaults amplios comunicados, pero **no fue aplicada por este proceso y la RLS funcional NO ESTÁ VALIDADA**. No se autoriza instalar herramientas, obtener accesos, crear cuentas, ejecutar SQL o desplegar.

**NO-GO** mientras falten implementación y pruebas de B, decisiones críticas restantes, recuperación demostrable, mecanismo de aplicación y autorización expresa de M2-B3-P3-B. La aprobación de A/B tampoco concede esa autorización. Los cambios SQL requieren otro prompt, trazabilidad de versión, nueva revisión/hash y publicación autorizada antes de considerar despliegue.

### Decisiones aprobadas por el responsable

Fuente: instrucción expresa PRE-DESPLIEGUE-P2 recibida el 2026-10-18; no se infiere aprobación por silencio ni por revisión estática.

| Decisión | Diseño aprobado | Estado técnico y trabajo restante |
| --- | --- | --- |
| A | Mantener `created_by REFERENCES auth.users(id) ON DELETE RESTRICT` para la primera versión | Ya presente en el archivo local; FK remota no aplicada por este proceso. Procedimiento de bajas pendiente; no cambiar a CASCADE/SET NULL ni eliminar usuarios |
| B | Máximos title 120, description 4.000, terms 20.000 caracteres; campos obligatorios no vacíos | Solo título limitado en SQL actual. Nuevos máximos NO IMPLEMENTADOS; especificación en sección 4, autorización técnica separada pendiente |

**DECISIÓN A: APROBADA. PROCEDIMIENTO DE BAJAS: PENDIENTE.**

**DECISIÓN B: LÍMITES APROBADOS, IMPLEMENTACIÓN PENDIENTE.**

Los estados pendientes de A/B consignados en la entrega P1 son históricos; esta aprobación no alcanza C/D, la ejecución de E, cambios locales de código ni operaciones remotas.

## 2. Evidencia ya verificada

Fuentes exclusivas: código, documentación y evidencia aprobada del repositorio. No hubo consultas remotas nuevas, navegación al Dashboard, lectura de secretos, SQL, instalaciones, respaldos ni restauraciones durante este plan.

| Evidencia | Resultado y procedencia | Límite |
| --- | --- | --- |
| Git inicial | Rama `relevo/m2-b2-p9c1-20261017`, HEAD `1479c089d365447c3a2bf2ae3c155f7d66c1cb6a`, origin oficial. P1 empezó limpio; P2 conserva solo plan nuevo y estado/historial modificados, staging vacío | Verificación local; publicación de RESPALDO-P2 acreditada previamente, sin volver a conectar a GitHub |
| Migración | [SQL versionado](../supabase/migrations/20261018032013_create_private_contract_drafts.sql), 53 líneas; SHA-256 `5e633ec225f325d070d72bc44586292c0584155754535943b2e769f8d38121ac` | Integridad y revisión estática; sin validación de ejecución SQL |
| Fase A | Base/rol `postgres`, esquema `public`, versión `17.11`; tres referencias contractuales/historial NULL | Ejecución manual externa comunicada; rol administrativo no prueba restricciones de cliente |
| Fase B | Cero relaciones de los nombres filtrados; solo esquema public entre public/supabase_migrations | Instantánea previa: no garantiza ausencia de objetos al desplegar ni ausencia de migraciones históricas |
| Fase C | Auth/UUID resueltos; anon/authenticated NOLOGIN y sin BYPASSRLS | No prueba membresías, grants indirectos ni aislamiento |
| Fase D | id Auth uuid/NOT NULL/pertenece PK; retornos uuid; defaults amplios; USAGE public true/CREATE false para ambos roles | Resultados externos comunicados; sin examen independiente de capturas por Codex, sin grants efectivos de contratos |
| Aprobaciones | M2-B3-P1 diseño, P2 migración local, P3-A preflight y A–D/revisión estática aprobados en sus alcances; RESPALDO-P2 publicado | No equivalen a despliegue ni pruebas RLS aprobadas |

Detalles y trazabilidad: [inventario A–D, sección 27](INSPECCION_REMOTA_SUPABASE_M2_B3_P3.md#27-m2-b3-p3-inspección-r5--cierre-de-fase-d-y-auditoría-estática), [diseño P1](PLAN_MODELO_DATOS_RLS_CONTRATOS.md), [validación local P2](VALIDACION_ESQUEMA_RLS_M2_B3_P2.md), [preflight P3-A](PREFLIGHT_DESPLIEGUE_RLS_M2_B3_P3.md). Este plan enlaza esas matrices y no repite su historial íntegro.

**Discrepancias documentales detectadas:** los encabezados de P1/P2/P3-A conservan estados históricos pendientes; el inventario publicado y la continuidad todavía describían R5 pendiente de aprobación, y un campo del preflight aún decía pendiente de resultados. Las aprobaciones posteriores constan en los prompts y el actual confirma A–D/revisión estática. Se actualiza la continuidad actual; los documentos históricos y el inventario son de solo lectura aquí. Ni una cabecera histórica ni su aprobación prueban ejecución PostgreSQL. El diseño P1 incluye revisión/updated_at/participación futuros que la migración mínima P2 no implementa: no exigirlos como si existieran.

## 3. Decisión A: eliminación de cuentas

**DECISIÓN A: APROBADA. PROCEDIMIENTO DE BAJAS: PENDIENTE.** El responsable aprueba mantener para la primera versión `created_by REFERENCES auth.users(id) ON DELETE RESTRICT`, ya presente en el SQL original intacto. `created_by` es uuid obligatorio. Cuando existan contratos vinculados, la eliminación física de esa cuenta podría ser rechazada por PostgreSQL. Mantiene integridad y evita pérdida automática en cascada, pero no resuelve solicitudes de eliminación, privacidad o conservación legal. No se ha probado una baja real ni determinado plazos/obligaciones legales aplicables. No se autoriza modificar la FK ni cambiarla a CASCADE/SET NULL ni eliminar usuarios de prueba o reales.

| Alternativa | Ventaja | Coste y condición |
| --- | --- | --- |
| Mantener RESTRICT en el primer alcance | Conserva vínculo y evita borrar contratos automáticamente | Aprobar y documentar cómo tramitar bajas con borradores, quién decide conservación y qué comunica soporte; no prometer borrado inmediato |
| Evaluar conservación y anonimización después | Permite estudiar minimización y retención sin destruir evidencia | Requiere requisitos de privacidad/legales y modelo servidor revisado: cambiar perfil o correo no anonimiza necesariamente contenido contractual ni elimina la FK |
| Cambiar estrategia mediante migración futura aprobada | Permite resolver un requisito concreto de baja | Estudio de impacto, compatibilidad con datos existentes y reversión; no elegir CASCADE automáticamente. SET NULL sería incompatible con NOT NULL/políticas actuales sin rediseño |

La tabla conserva alternativas evaluadas en P1, no autorizaciones para aplicarlas: la resolución vigente es mantener RESTRICT. **Trabajo pendiente:** preparar procedimiento de solicitud de baja, evaluación de conservación documental, tratamiento de datos personales, posible anonimización futura, gestión de errores/mensajes al usuario y revisión de obligaciones legales aplicables. No inventar periodos ni presuponer conservación indefinida. La aprobación de la restricción no aprueba ese procedimiento ni lo da por resuelto; su revisión sigue abierta en la matriz de preparación.

Responsables propuestos, aún sin designar personas: responsable de producto aprueba política; persona encargada de privacidad/asesoría valida los requisitos aplicables; responsable técnico diseña y prueba el flujo. Registrar decisión, fecha, alcance y condiciones, sin datos personales de usuarios.

## 4. Decisión B: límites de contenido

**DECISIÓN B: LÍMITES APROBADOS, IMPLEMENTACIÓN PENDIENTE.** El responsable aprueba para primera versión title 120, description 4.000 y terms 20.000 caracteres, conservando obligatoriedad y rechazo de contenido vacío. SQL actual: title varchar(120), NOT NULL y contenido no vacío mediante btrim; description/terms text sin máximo explícito, status solo draft. Una petición directa evita límites de UI: PostgreSQL será la defensa definitiva. Los máximos nuevos NO ESTÁN IMPLEMENTADOS ni probados.

| Propuesta de máximo por campo | description | terms | Criterio y contrapartida |
| --- | --- | --- | --- |
| Inicial recomendada | 4.000 caracteres | 20.000 caracteres | Candidato para describir objeto y cláusulas de borrador; reduce tamaños, requiere validación con ejemplos de producto |
| Más conservadora | 2.000 | 10.000 | Menor carga; puede excluir textos legítimos |
| Más amplia | 8.000 | 50.000 | Más flexibilidad y coste; justificar volumen y operación |
| Mantener sin máximo temporalmente | Sin máximo aprobado | Sin máximo aprobado | Solo con aceptación explícita de riesgo, controles de carga/cuota definidos y plan de revisión; frontend solo no basta |

La tabla conserva las alternativas históricas de P1; únicamente la opción 4.000/20.000 fue aprobada en P2, junto con title 120 existente. Las demás no son alternativas vigentes autorizadas; mantener sin máximo no satisface B. No hay mediciones de carga ni cambios del hash o SQL. Evaluar aparte un límite de cuerpo en bytes si procede: caracteres no equivalen a bytes UTF-8 y no hay evidencia de esa capa configurada.

1. **Frontend futuro:** ayuda con máximo, contador y validación coherente antes de enviar, manteniendo texto introducido y foco/error accesibles. Acordar semántica Unicode con PostgreSQL; no truncar silenciosamente. No se modifica UI en este plan.
2. **PostgreSQL futuro:** si se eligen máximos, aprobación e implementación mediante migración revisada con restricciones de servidor y nueva evidencia/hash, comprobando bordes y API directa. La validación local nunca sustituye restricciones de DB. Revisar también qué significa no vacío: btrim y el trim del formulario pueden tratar de forma distinta tabulaciones/saltos de línea; acordar semántica, sin atribuir hoy una normalización inexistente.
3. **Errores:** servicio futuro devuelve mensaje de validación seguro por campo o conflicto genérico, sin SQL, tokens ni detalles internos; distinguir problema de entrada de red/autorización; no reintentar automáticamente una petición inválida ni limpiar el borrador por error.
4. **Ampliación posterior:** justificar con casos y métricas autorizadas, revisar impacto de tamaño/almacenamiento y compatibilidad, modificar por migración aprobada y alinear UI/servicio/DB. Si hay datos entonces, analizar valores previos antes de reducir límites; no recortarlos ni borrarlos automáticamente.

### Especificación técnica para una implementación posterior

No es código ejecutado ni autorización de implementación. Aplicará tanto a INSERT como a UPDATE de contenido; conservar campos, defaults, FK RESTRICT, índice, transacción, roles, REVOKE/GRANT y políticas existentes.

| Campo | Máximo aprobado, en puntos de código | Regla PostgreSQL prevista | Regla React prevista |
| --- | --- | --- | --- |
| title | 120 | Conservar varchar(120), NOT NULL y CHECK no vacío; verificar rechazo de exceso por API | Contar puntos de código y rechazar más de 120; obligatorio/no vacío |
| description | 4.000 | Mantener text/NOT NULL/no vacío; añadir CHECK con `char_length(description) <= 4000` y nombre estable revisado | Mismo conteo y máximo; ayuda/contador y error por campo |
| terms | 20.000 | Mantener text/NOT NULL/no vacío; añadir CHECK con `char_length(terms) <= 20000` y nombre estable revisado | Mismo conteo y máximo; ayuda/contador y error por campo |

**Semántica de texto:** propuesta técnica consistente: PostgreSQL `char_length` y frontend conteo de puntos de código, por ejemplo iteración de cadena o `Array.from(valor).length`, sobre el mismo texto que se envía y guarda. No usar `valor.length` ni `maxlength` HTML como autoridad equivalente: JavaScript/HTML cuentan unidades UTF-16 y pueden diferir con emoji. Puntos de código no equivalen a grafemas visibles: un emoji compuesto o letra con marca combinante puede contar varios. No normalizar Unicode ni recortar texto automáticamente para hacerlo pasar. Definir explícitamente normalización de finales de línea si se propone en implementación y contar siempre la representación finalmente enviada. Rechazar secuencias Unicode inválidas de forma segura; no prometer aceptación de todo texto admitido por el contador (por ejemplo NUL no es texto PostgreSQL válido).

**Contenido obligatorio:** preservar NOT NULL y los CHECK actuales. `btrim` actual elimina por defecto espacios U+0020, mientras `trim()` JavaScript abarca más blancos. Para esta primera implementación se propone validar no vacío con esa misma semántica explícita U+0020 en cliente, sin modificar el valor; probar vacío y cadenas solo de espacios. Tabulaciones, saltos de línea y espacios Unicode deben tener pruebas de caracterización y una regla documentada: si se pretende rechazarlos también como blanco puro, será una ampliación expresa de la especificación y de los CHECK revisados, alineada en ambas capas, no un cambio silencioso. La coherencia final de blancos deberá cerrarse en la revisión técnica antes de implementar.

**Interfaz y errores:** mensajes como «La descripción admite hasta 4.000 caracteres» y «Las cláusulas admiten hasta 20.000 caracteres»; conservar borrador, asociar error al campo y gestionar foco/accesibilidad reutilizando componentes existentes. No truncar ni borrar contenido. Validación cliente antes de enviar; API directa seguirá sometida a DB. Mapear de forma controlada violación de máximo/no vacío/NOT NULL por restricción o código conocido sin mostrar SQL, respuesta interna ni contenido contractual en logs. Errores no reconocidos: mensaje seguro y posibilidad de corregir/reintentar manualmente; distinguir red/sesión/permisos y no reintentar automáticamente entradas inválidas. Un error no implica guardado exitoso.

| Prueba futura | Datos | Resultado esperado, tras implementación autorizada |
| --- | --- | --- |
| Bordes por campo | title 119/120/121; description 3.999/4.000/4.001; terms 19.999/20.000/20.001 | Debajo/en límite aceptados si el resto es válido; exceso rechazado en React y por API directa en DB |
| Obligatoriedad INSERT/UPDATE | Cada campo vacío, solo U+0020, NULL u omitido en INSERT | Rechazo coherente; UPDATE omitiendo un campo conserva su valor, no lo convierte en vacío |
| Unicode | ASCII, caracteres suplementarios/emoji, acentos precompuestos y combinantes, grafemas compuestos en los tres bordes | Cliente y DB cuentan los mismos puntos de código del valor persistido; no asumir número de símbolos visibles |
| Blancos y representación | Tabulaciones, saltos de línea, espacios Unicode y finales de línea | Resultado conforme a semántica cerrada en revisión; sin normalización/truncado implícitos |
| Escritura inválida | INSERT inválido; UPDATE con campo válido y otro que excede máximo | Sin inserción ni actualización parcial; contenido previo conservado, error comprensible |
| Regresión de seguridad | Fixtures A/B/Ø, DELETE, columnas inmutables, esquema/grants/políticas/defaults/índice | Sin ampliación de permisos ni cambios de campos ajenos; controles originales intactos |

Todo lo anterior está **DISEÑADO — NO EJECUTADO**. Los casos de servidor/API y fixtures requieren autorización futura de pruebas y escrituras; tampoco se crean usuarios ahora. La revisión deberá comprobar además el comportamiento del título varchar ante excesos y evitar conversiones explícitas que trunquen antes de llegar a la restricción.

### Versionado del cambio todavía no aplicado

El archivo original aprobado y su hash permanecen intactos. Evaluar en el prompt técnico dos vías: (1) revisión explícita del candidato aún no aplicado, con diff y hash anterior/nuevo, aprobación de todos los integrantes y confirmación actualizada de que no fue aplicado en ningún destino relevante; (2) conservarlo inmutable y añadir después una migración incremental de límites, con orden, hashes y revisión de ambos archivos. Esta segunda vía conserva mejor el respaldo publicado y es la recomendación documental condicionada a C, no una decisión sobre mecanismo ni permiso para crearla.

La vía incremental deberá verificar datos existentes bajo autorización separada si los hubiera, sin recortar/borrar, y resolver validación de restricciones antes de uso real. Acordar aplicación/aceptación del conjunto para evitar habilitar contratos entre la base inicial y los límites. Un hash nuevo corresponde exclusivamente al SQL nuevo o revisado que se autorice; no sustituir ni atribuir otro hash al original intacto. Registrar versión, revisión, aprobación, commit y evidencia en el flujo escogido. **No se modifica ni crea migración aquí; implementación, nueva revisión/hash y publicación requieren autorizaciones separadas.**

## 5. Decisión C: historial de migraciones

**MECANISMO PENDIENTE DE APROBACIÓN.** En A/B no se encontraron supabase_migrations ni schema_migrations. Eso no demuestra inexistencia de cambios previos manuales u otros mecanismos. El archivo Git y la base son registros distintos.

| Vía futura | Ventajas | Riesgos y requisitos antes de seleccionarla |
| --- | --- | --- |
| SQL Editor controlado | Canal ya utilizado para catálogo; archivo revisable | Ejecutar SQL allí no debe asumirse como registro automático de versión. Acordar ejecutor/rol, transacción completa, evidencia de finalización y registro de aplicación. No recrear historial a mano ni marcar versión por intuición |
| Migraciones versionadas con Supabase CLI habilitada posteriormente | Flujo candidato para alinear archivos y registro de aplicación | Herramienta no habilitada por este prompt; requiere autorización de instalación/configuración/acceso, proyecto inequívoco, revisión del comportamiento de inicialización del historial y plan exacto de ejecución |

**Recomendación:** preferir el flujo versionado solo tras revisar y aprobar esas precondiciones; mantener NO-GO si no se conoce cómo conservará historia coherente. SQL Editor es alternativa excepcional con procedimiento y registro aprobados, no atajo automático. Ningún comando de despliegue, reparación o alteración del historial se propone como acción inmediata.

Antes de escoger: identificar quién creó/gestionó el esquema, reconciliar archivos existentes del equipo y cambios previos conocidos, revalidar ausencia de colisiones bajo alcance autorizado, revisar rol propietario, forma de registro de versión/archivo/checksum y comportamiento transaccional de la herramienta. No escribir en el historial para fingir que una migración fue aplicada. Si la vía elegida crearía infraestructura de historial, ese efecto debe declararse y autorizarse expresamente como parte del procedimiento futuro.

Registro de ejecución propuesto: versión, nombre de archivo, commit, hash aprobado, proyecto/ref, fecha, operador y revisor designados, método, rol, resultado y enlace a evidencia saneada. Credenciales, sesiones, contenido SQL remoto sensible y dumps quedan fuera de Git. Después se cotejarán archivo autorizado, objetos realmente creados y registro efectivo de la herramienta; discrepancia implica detener, no repetir ni reparar automáticamente.

## 6. Decisión D: respaldo y recuperación

**PENDIENTE Y BLOQUEANTE. PLAN Y CAPACIDADES PENDIENTES DE COMPROBAR/APROBAR.**

| Capacidad | Confirmado hoy | Evidencia requerida antes del despliegue |
| --- | --- | --- |
| Respaldo Git de documentos/SQL | RESPALDO-P2 publicado en 1479c089d365447c3a2bf2ae3c155f7d66c1cb6a | Conservar referencia; comprobar hash exacto del candidato futuro. Git no contiene copia de la base |
| Transacción en archivo SQL | BEGIN/COMMIT presentes, revisión estática | Probar que ejecutor conserva bloque, no auto-confirma sentencias por separado y aborta ante error |
| Copias PostgreSQL del plan Supabase | No comprobadas | Responsable comprueba en Dashboard disponibilidad, alcance, retención, fecha, consistencia, restricciones y método de restauración, con autorización específica cuando corresponda |
| PITR, destino alternativo y tiempos de restauración | No comprobados | Verificar si el plan contratado ofrece cada capacidad; no presumir PITR o restauración instantánea |
| Recuperación de Auth/otros objetos/archivos | No comprobada | Inventario de alcance real de la copia y dependencias compartidas; no asumir que una copia DB incluye todos los archivos/servicios |
| RPO/RTO aceptables | No definidos | Responsable aprueba pérdida de datos máxima y tiempo de recuperación tolerables; operador demuestra viabilidad |
| Exportación alternativa si no hay copia viable del plan | No autorizada ni comprobada | Procedimiento separado con herramienta autorizada, custodia segura, cifrado/acceso, consistencia y ensayo; no pedir conexiones/secretos por chat |

Funciones propuestas, personas aún pendientes: responsable del proyecto aprueba alcance/RPO/RTO e incidentes; operador de respaldo ejecuta y registra copia; revisor técnico verifica evidencia y ensayo; operador de despliegue único y suplente designado coordinan ventana. No afirmar separación de funciones o personas asignadas sin confirmación.

**Antes de desplegar:** comprobar capacidades reales; identificar un punto recuperable y su fecha; registrar alcance/retención/custodia sin volcar datos; ensayar restauración en entorno aislado autorizado y verificar esquema/integridad/acceso con evidencia saneada. Obtener aprobación del resultado, responsabilidades, impacto sobre servicios compartidos y tratamiento de escrituras posteriores. Si no hay recuperación demostrable y aceptable, NO-GO. No crear backups ni entornos de ensayo ahora.

**Error anterior al COMMIT:** operador detiene ejecución, registra error saneado y confirma si la transacción quedó abortada/revertida y si hubo cambios parciales o de historial fuera del bloque. No confiar solo en que el archivo contiene BEGIN. No continuar sentencias ni reintentar mientras el estado sea incierto. Reversión de transacción requiere método autorizado del ejecutor; ROLLBACK no corrige un COMMIT ya realizado ni necesariamente metadatos que la herramienta haya gestionado aparte.

**COMMIT completado pero validación posterior fallida:** no habilitar integración frontend ni usuarios reales de contratos; detener pruebas y nuevas escrituras de ese alcance. Ante exposición, activar procedimiento de incidente y contención previamente aprobado, con cambios mínimos revisados sobre acceso contractual y conservación de datos/evidencia. Si esa contención no estaba autorizada, escalar de inmediato al responsable competente; no improvisar GRANT/REVOKE globales. No declarar solucionado mediante ocultar botones.

**Protección de datos posteriores:** priorizar corrección hacia adelante mediante migración compensatoria revisada y permisos mínimos; conservar filas y relaciones ya escritas. Antes de restaurar una copia antigua, inventariar cambios posteriores y dependencias; ensayar extracción/reconciliación autorizada en destino aislado con acceso restringido y plan que evite pérdida de datos legítimos. Restaurar todo el proyecto podría afectar Auth y otros servicios compartidos: requiere decisión explícita, evaluación de pérdida y coordinación, no es respuesta automática a un fallo de contracts. No usar DROP/CASCADE, eliminar usuarios o borrar filas reales como atajo.

**Detener y escalar:** lectura/escritura ajena o anónima, DELETE permitido, columnas inmutables alteradas, diferencias de proyecto/hash, commit incierto, estado parcial, historia divergente, copia ilegible/no restaurable, recuperación incompatible con RPO/RTO o impacto en otro servicio. Nombrar responsable de incidente; preservar evidencia mínima sin tokens/contratos; documentar decisiones y no reabrir acceso hasta revalidación independiente. Retirada de objetos sin datos tampoco es automática: verificar ausencia de datos/dependencias y obtener autorización específica.

## 7. Decisión E: pruebas RLS

**MATRIZ PREPARADA — TODOS LOS CASOS NO EJECUTADOS. PLAN PENDIENTE DE APROBACIÓN.** Ejecutar solo después de autorización separada de despliegue **y** pruebas, tabla instalada y entorno/cuentas/limpieza acordados. A y B son cuentas ficticias autorizadas distintas; Ø es cliente sin JWT de usuario. Un usuario de Auth anónimo no es necesariamente el rol anon: confirmar configuración y excluir esa modalidad salvo decisión específica. Nunca usar postgres, propietario, service_role o BYPASSRLS para representar A/B/Ø.

Utilizar API directa/cliente público con sesión propia; sin registro de JWT, cookies, contraseñas, texto contractual o datos personales. Solo fixtures identificados y mínimos. Guardar estados/errores saneados, cuenta de filas e identificadores ficticios, resultado previo/posterior visible para el propietario y evidencia de catálogo saneada. Un HTTP 2xx con cero filas no prueba que se haya modificado nada. Limpieza administrativa del fixture requiere autorización: el cliente no tendrá DELETE; no relajarlo para limpiar.

| ID / clase | Precondición | Operación futura | Resultado esperado | Evidencia necesaria |
| --- | --- | --- | --- | --- |
| T01 positiva | A válida; esquema instalado | INSERT solo title, description, terms | Fila draft propia, UUID/fecha asignados y created_by=A | Respuesta/lectura de A, metadatos mínimos; nunca JWT |
| T02 positiva | B válida | Crear borrador B | Fila propia de B | Lectura de B e ID ficticio distinto |
| T03 positiva | Borrador A existente | A lee por ID y lista con/sin filtro | Solo filas autorizadas de A | IDs/cantidad y correspondencia con fixture |
| T04 negativa | A/B con borradores | B lee UUID A; A lista con datos B | Cero filas ajenas y sin contenido contractual | Respuesta saneada; contraste con fixture de propietario |
| T05 negativa | B válida, borrador A | B modifica contenido de A por API | Cero filas cambiadas | Respuesta B y lectura posterior de A intacta |
| T06 positiva | A y borrador A | A edita separadamente title, description, terms | Solo contenido cambia | Comparación controlada antes/después desde A |
| T07 negativa | A válida | Intentar INSERT con created_by=B o campos de identidad explícitos | Denegado por grants/controles; no crea fila | Error saneado y comprobación desde propietario/fixture |
| T08 negativa | Borrador A | A intenta UPDATE created_by=B | Denegado; dueño intacto | Error y lectura posterior de A |
| T09 negativa | Borrador A | A intenta UPDATE id | Denegado; ID intacto | Error y mismo ID en lectura posterior |
| T10 negativa | Borrador A | A intenta UPDATE status distinto de draft | Denegado; status draft | Error y estado posterior |
| T11 negativa | Borrador A | A intenta UPDATE created_at | Denegado; fecha intacta | Error y metadato posterior de fixture |
| T12 negativa | Borrador A | UPDATE mezcla contenido permitido con columna prohibida | Operación rechazada, sin cambio parcial | Error y lectura de contenido/metadatos intactos |
| T13 negativa | Borradores A/B | A borra propio; B intenta borrar A | DELETE denegado en ambos | Errores saneados y lectura posterior del propietario |
| T14 negativa | Ø sin JWT | SELECT, INSERT, UPDATE, DELETE de contratos | Acceso denegado; sin filas expuestas ni mutaciones | Resultado por operación y verificación de fixture intacto |
| T15 negativa | Solo publishable key, sin usuario | Llamadas directas a API, omitiendo guard React | Sin acceso contractual | Resultado sin contenido, fixture intacto |
| T16 negativa | JWT de prueba realmente expirado, sin refresco automático que enmascare caso | Lectura/escritura API | Petición rechazada; sin efectos | Estado saneado y fixture intacto; no cambiar expiración del proyecto ni fabricar credenciales |
| T17 positiva/negativa | Límites aprobados e implementación futura revisada | title 119/120/121; description 3.999/4.000/4.001; terms 19.999/20.000/20.001; vacíos/nulos/Unicode, INSERT y UPDATE | Debajo/en límite válidos; exceso/vacíos rechazados conforme sección 4; nuevos máximos solo tras implementación | Error/éxito por caso y ausencia de filas inválidas; no afirmar que la migración original ya limita description/terms |
| T18 catálogo | Inspector de metadatos autorizado; tabla existe | Revisar RLS y políticas | RLS activa; SELECT/INSERT/UPDATE propios, sin DELETE | Catálogo de flags/expresiones/roles comparado con archivo autorizado |
| T19 catálogo | Tabla instalada | Privilegios efectivos SELECT/INSERT/UPDATE/DELETE para anon/authenticated | Anon sin acceso; authenticated SELECT de tabla, sin INSERT/UPDATE amplios ni DELETE | Funciones de privilegio de tabla, más T20; no basta pg_policies |
| T20 catálogo | Columnas existentes | Privilegios efectivos por columna y rutas indirectas | INSERT/UPDATE solo contenido; no identidad/propiedad/estado/fecha | Matriz por columna/rol y revisión de PUBLIC/membresías/herencia/vistas/funciones relevantes |
| T21 positiva/negativa | SQL aplicado, fixtures A/B | INSERT/UPDATE con retorno y filtros por ID propio/ajeno | Retorno solo autorizado, sin divulgación cruzada | Resultado y lecturas mínimas con ambas cuentas |
| T22 mecanismo | Entorno aislado y ejecutor aprobado | Ensayo de fallo previo a commit y procedimiento de recuperación | Sin exposición/estado parcial; historial coherente o fallo detenido | Registro de ejecución y catálogo antes/después sin datos reales |

T08 puede fallar por permiso de columna antes de alcanzar WITH CHECK; no presentarlo como prueba aislada de esa expresión. Si se necesita demostrarla separadamente, usar ensayo de base aislada autorizado sin propietario/BYPASSRLS, conforme a R22 del preflight; jamás ampliar grants en compartido para conseguir el test. D1 previo solo confirmó pertenencia a PK, no su definición completa: resolver compatibilidad de FK al preparar ensayo.

La matriz es una selección operativa de decisiones A–E; conservar además [R01–R30 del preflight](PREFLIGHT_DESPLIEGUE_RLS_M2_B3_P3.md#21-matriz-de-pruebas-reales-abanónimo) para aprobación del alcance definitivo. Los tests de invitación/versiones/firmas del diseño P1 no aplican a capacidades aún ausentes. Registrar cada caso futuro como ejecutado/simulado/no ejecutado con límites, sin convertir plan en resultado. Cualquier acceso cruzado o privilegio prohibido que funcione implica detener aceptación e integración y activar sección 6.

## 8. Análisis de permisos predeterminados

D3 comunicó defaults SELECT/INSERT/UPDATE/DELETE true para anon/authenticated en tablas futuras creadas por postgres o supabase_admin en public. No significa que una tabla no encontrada esté expuesta. No cambiar defaults globales: afecta a objetos futuros de otros servicios. Creador efectivo de la futura migración debe identificarse; los permisos indirectos y privilegios posteriores siguen requiriendo inspección.

| Defensa en el SQL actual | Ubicación | Garantía prevista y límite |
| --- | --- | --- |
| BEGIN/COMMIT único | Líneas 3/53 | Agrupa creación/seguridad; atomicidad efectiva depende del ejecutor y errores |
| ENABLE ROW LEVEL SECURITY | 23 | RLS configurada antes de commit; no equivale a prueba cliente y roles privilegiados pueden eludirla |
| REVOKE ALL de PUBLIC, anon, authenticated | 26 | Retira grants directos de tabla procedentes de defaults comunicados; no demuestra desaparición de todas las rutas indirectas/columnas independientes |
| GRANT SELECT a authenticated | 27 | Lectura de tabla condicionada a RLS propia; no concede lectura general de filas |
| INSERT/UPDATE solo title, description, terms | 28–29 | Protege columnas de identidad, propietario, estado y fecha por estos grants; verificar que no sobrevivan grants amplios efectivos |
| Tres políticas con dueño y draft | 31–50 | SELECT USING, INSERT WITH CHECK, UPDATE USING y WITH CHECK exigen auth.uid() no nulo y propietario igual |
| Sin DELETE ni reconcesión amplia final | 30–53 | Denegación prevista de borrado cliente y sin grant posterior a anon; comprobar con API/ACL reales |

**Comprobado:** presencia, orden y expresiones de estas defensas en el SQL con hash aprobado; revisión estática satisfactoria R5, aprobada en ese alcance. **Pendiente:** ejecución válida, transacción, ACL de tabla/columnas/indirectas, RLS positiva/negativa y privilegios del ejecutor. No se agrega SQL ni se modifica el candidato.

## 9. Procedimiento futuro de aplicación

Secuencia documental, **NO AUTORIZADA PARA EJECUCIÓN AHORA**:

1. Conservar A/B aprobadas como diseño; responsable revisa especificación de B, procedimiento de bajas de A y decisiones C/D/E. Designar operador/revisor, entorno, ventana, cuentas/limpieza y criterios de incidente. Dejar registro de aprobación; no inferirla de silencio.
2. Si una decisión requiere cambios, autorizar por separado implementación/revisión de migración y, cuando proceda, UI. Resolver versionado de un archivo nunca aplicado sin inventar que sí lo fue; nuevo hash/commit publicado y checklist actualizada antes de ejecutar. Conservar trazabilidad del candidato actual; este prompt no lo cambia.
3. Seleccionar método de sección 5 y demostrar recuperación de sección 6. Preparar registro de aplicación, revisión exacta del SQL, pruebas y contención/reversión aprobadas, sin secretos en Git.
4. Antes de la ventana, revalidar checkout limpio, rama/commit/hash autorizados y destino público/base/rol. Reconciliar inventario/historial actual bajo autorización de catálogo; A–D son instantáneas previas, no reservas de nombres. Si aparece contracts/índice, historia distinta, actividad concurrente o hash inesperado, detener sin sobrescribir ni reparar.
5. Solo si todas las condiciones previas son satisfactorias, obtener autorización explícita del despliegue y pruebas para proyecto, archivo/hash, operador, método y ventana concretos, incluyendo posibles efectos de historial. Esta autorización debe mencionar las escrituras permitidas; la de metadatos no basta.
6. Operador único aplica una vez el archivo autorizado preservando transacción y registro. No incluir cambios de defaults globales ni otros objetos ajenos. Ante error/estado incierto, sección 6; no reintentar ciegamente.
7. Revisor confirma catálogo, grants/historial y ejecuta matriz aprobada con A/B/Ø, sin credenciales administrativas para representar clientes. No habilitar integración de contratos para uso real antes de superar aceptación; mantener coordinación y recuperación disponibles.
8. Registrar resultados y decisión de aceptación/rechazo externa; revisar limpieza autorizada y conservar evidencia saneada. Futuro guardado/listado/detalle React requiere sus prompts, no se implementa por finalizar este procedimiento.

No se incluyen órdenes listas para desplegar o reparar historia: faltan método y autorización. No se instala ni vincula CLI ni se usa SQL Editor para aplicar nada en este prompt.

## 10. Verificaciones posteriores al despliegue

**NO EJECUTADAS.** Dos puertas distintas: GO de ejecución futura exige decisiones/recuperación/plan/autorización; GO de aceptación e integración exige además resultados reales posteriores. No exigir pruebas contra una tabla inexistente para fingir un PASS previo ni usar su imposibilidad como excusa para omitirlas después.

Comparar estado resultante con candidato autorizado: siete columnas, tipos/defaults/PK/FK/CHECK e índice previsto; RLS activada; tres políticas de dueño/draft; grants esperados por tabla/columna e indirectos; sin DELETE de aplicación ni cambios ajenos. Verificar rol propietario y diferencias con defaults. Comprobar registro de migración real según método aprobado y confirmar que no quedó parte aplicada fuera de transacción.

Ejecutar positivos y negativos de sección 7 y alcance R01–R30 acordado: retorno autorizado, cero lectura/escritura cruzada, denegación anon/sesión expirada, columnas inmutables intactas, DELETE bloqueado y errores seguros. Comparar bytes/metadatos solo de fixtures propios con evidencia mínima; no abrir contratos reales. Rechazo negativo no es éxito suficiente si el caso positivo también falla por configuración.

Si pasa todo, responsable puede aceptar el resultado dentro de ese alcance; RLS funcional solo se declara verificada para escenarios efectivamente ejecutados. Si falla algo crítico, NO-GO de aceptación, detener integración, contención/recuperación de sección 6 y revisión antes de reabrir. No declarar módulos completos por catálogo o build.

## 11. Matriz GO/NO-GO

Estados: **VERIFICADO** = evidencia en el alcance preciso; **PENDIENTE** = decisión/comprobación aún no hecha; **BLOQUEADO** = no puede ejecutarse por falta de autorización/precondición. Personas concretas no designadas; las responsabilidades de la tabla son propuestas.

| Condición | Estado actual | Evidencia disponible | Acción necesaria | Responsable de aprobar/verificar |
| --- | --- | --- | --- | --- |
| Integridad Git | VERIFICADO | P2 en rama autorizada y HEAD 1479c089…; solo tres documentos previstos, staging vacío | Revalidar checkout/commit autorizado antes de cualquier ejecución futura; plan y continuidad locales sin publicar | Operador y revisor técnico |
| Identidad del proyecto | VERIFICADO | Ref/nombre/URL confirmados; coincidencia local previa | Cotejar nuevamente destino y rol al ejecutar, sin claves en informe | Responsable y operador |
| Integridad de migración | VERIFICADO | SHA-256 aprobado intacto | Si cambia por decisión, nueva revisión/hash/publicación autorizada; no usar el hash viejo | Revisor técnico |
| Compatibilidad de esquema | PENDIENTE | A–D: nombres no encontrados, tipos/PK comunicados compatibles | Revalidar colisiones, PK completa/FK, dependencias/EXECUTE/REFERENCES y ejecutor en ensayo autorizado | Revisor DB y operador |
| Privilegios previstos | VERIFICADO | Revisión estática aprobada de REVOKE/GRANT/RLS para defaults comunicados | Aprobar plan para verificar efectivos/columnas/indirectos y A/B/Ø después de aplicar; no equivale a RLS validada | Revisor de seguridad y responsable |
| Historial de migraciones | PENDIENTE | Esquema/relación esperados no encontrados | Conciliar cambios previos y aprobar mecanismo de registro, sin reparación automática | Operador DB y responsable |
| Eliminación de cuentas — A | DISEÑO APROBADO; PROCEDIMIENTO PENDIENTE | Responsable aprueba RESTRICT existente para primera versión | Preparar bajas, conservación, datos personales, errores y evaluación legal; no cambiar FK ni eliminar usuarios | Responsable, privacidad/asesoría y técnico |
| Límites de contenido — B | LÍMITES APROBADOS; IMPLEMENTACIÓN/PRUEBAS PENDIENTES | title 120, description 4.000, terms 20.000; SQL solo limita título | Revisar especificación, autorizar implementación separada, versionado/hash y pruebas de bordes/Unicode/seguridad | Producto y revisor técnico |
| Plan de respaldo | PENDIENTE | Git sí; capacidad DB/plan Supabase no observada | Evidencia de copia viable, alcance, retención, custodia y operador | Responsable y operador de respaldo |
| Plan de recuperación | PENDIENTE | Estrategia documental; sin ensayo ni RPO/RTO | Aprobar y demostrar restauración/compensación aislada y protección de datos posteriores | Responsable y revisor de recuperación |
| Procedimiento de aplicación | PENDIENTE | Dos vías documentadas; ninguna elegida/habilitada | Elegir, autorizar accesos/herramienta si hacen falta y probar transacción/registro | Operador designado y revisor |
| Plan de pruebas A/B/anónimo — E | PLAN PREPARADO; 22 NO EJECUTADOS | Matriz preparada; no usuarios/datos creados; RLS funcional NO VALIDADA | Revisar plan/actores/entorno/limpieza; autorización futura expresa de pruebas y escrituras, después de aplicación autorizada | Responsable y revisor QA/seguridad |
| Autorización explícita de despliegue | BLOQUEADO | P3-B NO AUTORIZADO; autorización actual solo metadatos | Resolver condiciones críticas y otorgar autorización separada concreta; hasta entonces no ejecutar | Responsable del proyecto |

**RESULTADO GLOBAL: NO-GO.** A/B aprobadas como diseño no son evidencia de implementación ni de preparación completa. C pendiente, D pendiente y bloqueante, E preparada sin ejecución. **RLS funcional: NO VALIDADA. Migración remota: NO APLICADA POR ESTE PROCESO. Despliegue M2-B3-P3-B: NO AUTORIZADO.** No hay fecha de despliegue asignada, herramienta autorizada nueva ni permiso de pruebas/escritura. Incluso con autorización futura, la aceptación seguirá supeditada a sección 10.

## 12. Decisiones que debe tomar el responsable

A y B cuentan con aprobación expresa de diseño en PRE-DESPLIEGUE-P2. Los trabajos operativos asociados y las decisiones restantes siguen abiertos:

| Decisión | Propuesta concreta para revisión | Evidencia de cierre que falta |
| --- | --- | --- |
| A: baja de cuentas | APROBADA: conservar RESTRICT para primera versión | Procedimiento de bajas PENDIENTE: responsable, conservación, datos personales, anonimización futura, errores y revisión legal |
| B: tamaño de contenido | APROBADA: title 120 / description 4.000 / terms 20.000, obligatorios no vacíos | Implementación PENDIENTE: revisión técnica Unicode/blancos, versionado, autorización separada, SQL revisado con hash correspondiente y pruebas |
| C: mecanismo/historia | Preferir migraciones versionadas tras habilitación/reconciliación; Editor solo con registro/ejecutor aprobados | Método, rol, efectos permitidos sobre historial, consistencia Git/base y ensayo |
| D: recuperación | Copia verificable y ensayo aislado; contención/compensación que preserve datos posteriores | Capacidades del plan, RPO/RTO, custodia, responsables y evidencia de recuperación aceptable |
| E: pruebas | Aprobar matriz, cuentas ficticias A/B, Ø, API y catálogos; limpieza administrativa acotada | Entorno y actores autorizados, alcance R01–R30 aplicable, evidencia y criterio de aceptación |
| Gobierno de ejecución | Operador único/revisor, ventana, coordinación y procedimiento de incidente | Identidades designadas por el equipo y autorización futura de cambios exactos |

Siguiente paso: revisión externa de esta actualización y especificación B; preparar procedimiento de bajas de A y resolver C/D. E conserva 22 casos NO EJECUTADOS, pendientes de autorización futura de pruebas, aunque se apruebe su plan. No cambiar SQL/servidor por inferencia ni iniciar P3-B. Estado final: **A APROBADA, BAJAS PENDIENTES; B LÍMITES APROBADOS, IMPLEMENTACIÓN PENDIENTE; C PENDIENTE; D PENDIENTE Y BLOQUEANTE; E PLAN PREPARADO, NO EJECUTADO; NO-GO; M2-B3-P3-B NO AUTORIZADO; RLS FUNCIONAL NO VALIDADA; MIGRACIÓN NO APLICADA POR ESTE PROCESO; MÓDULO 2 INCOMPLETO.**

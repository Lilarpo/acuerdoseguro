# Instrucciones permanentes de AcuerdoSeguro

## 1. Identidad y alcance

- Trabaja sobre **AcuerdoSeguro**, repositorio oficial `Lilarpo/acuerdoseguro`.
- Mantén su propósito: crear, aprobar y verificar acuerdos digitales mediante evidencia criptográfica registrada en Stellar.
- Conserva los documentos confidenciales fuera de la blockchain; registra únicamente la evidencia criptográfica necesaria.
- Considera el hash un mecanismo para detectar alteraciones, no para impedir físicamente modificaciones.
- Basa las aprobaciones en autorizaciones criptográficas verificables.
- No presentes una firma blockchain como sustituto automático de una firma digital certificada ni de un notario público.
- Utiliza Stellar Testnet como red inicial del MVP, sin fondos reales.
- Aplica estas reglas a todo el repositorio. El prompt autorizado define el trabajo concreto y sus criterios particulares, sin habilitar excepciones implícitas de seguridad.
- Mantén aquí únicamente reglas permanentes: no agregues estados de avance, historiales ni resultados de sesiones.

## 2. Tecnologías y convenciones

- Conserva el frontend existente con React, TypeScript, Vite y Tailwind CSS.
- Mantén Node.js 24 como referencia mientras lo requiera el proyecto; consulta `.nvmrc` y `engines` antes de ejecutar herramientas.
- Utiliza npm como único gestor de paquetes JavaScript y respeta `package-lock.json`.
- Consulta las versiones declaradas en `package.json`, las resueltas en el lockfile y las efectivamente instaladas antes de modificar dependencias.
- Utiliza `npm ci` para instalaciones reproducibles; al comprobar una instalación limpia, prefiere una copia temporal sin secretos, `node_modules` ni `dist`.
- No cambies versiones ni instales dependencias por iniciativa propia; exige relación con la tarea autorizada y una justificación técnica.
- No ejecutes actualizaciones masivas ni `npm audit fix --force` para resolver problemas rutinarios.
- Prioriza TypeScript estricto, con tipos explícitos cuando aclaren interfaces o contratos; evita `any` injustificados.
- Reutiliza componentes React y lógica existentes; crea componentes reutilizables solo cuando la tarea lo requiera.
- Utiliza Tailwind según la versión instalada; conserva su integración funcional con Vite y evita configuraciones obsoletas.
- Mantén rutas relativas portables, coincidencia de mayúsculas en importaciones y scripts compatibles con Linux y Windows 11 mediante WSL2.
- Respeta `.gitattributes` y los finales de línea LF; no introduzcas rutas absolutas de una computadora.
- Trata Supabase con PostgreSQL, Auth y Storage privado como backend previsto; no lo declares integrado sin comprobar el código.
- Trata Stellar SDK, Freighter, Soroban mediante Rust y Vercel como tecnologías previstas; intégralas solo en sus bloques autorizados.

## 3. Responsabilidades de carpetas

| Ruta | Responsabilidad |
| --- | --- |
| `src/components/` | Componentes visuales reutilizables. |
| `src/pages/` | Páginas y vistas principales. |
| `src/services/supabase/` | Integración futura con base de datos, autenticación y almacenamiento. |
| `src/services/stellar/` | Integración futura con billeteras, transacciones y contratos inteligentes. |
| `src/services/documents/` | Generación documental, hashes y verificaciones. |
| `src/types/` | Tipos TypeScript compartidos. |

- Ubica cada cambio en su módulo; modifica archivos compartidos solo cuando sea estrictamente necesario para completar la tarea autorizada.
- Mantén los futuros contratos Rust de Soroban fuera del directorio frontend `src/`.
- Conserva los archivos de entrada, estilos e importaciones funcionales; no los muevas sin necesidad autorizada.
- No confundas carpetas reservadas con funcionalidades implementadas; comprueba su contenido antes de informar avances.
- No crees servicios ficticios, tipos prematuros ni exportaciones vacías para completar la estructura.

## 4. Inicio obligatorio de cada sesión

1. Identifica la raíz Git y lee `AGENTS.md` y las instrucciones aplicables al directorio de trabajo.
2. Consulta el documento de estado cuando exista; identifica el último prompt completado y verifica sus evidencias en el código.
3. Si no hay registro suficiente, usa el contexto disponible e informa la incertidumbre; no inventes avances.
4. Lee el prompt solicitado, delimita su alcance y revisa los criterios de aceptación.
5. Ejecuta `git status`; identifica archivos modificados, sin seguimiento y trabajos incompletos.
6. Verifica la rama y el remoto cuando sea pertinente; detente si el repositorio no corresponde a AcuerdoSeguro.
7. Examina los archivos relevantes y comprueba si la tarea ya está implementada correctamente.
8. Preserva los cambios anteriores y determina si los trabajos incompletos pertenecen al bloque actual.
9. Ante inconsistencias importantes entre código, estado y prompt, informa y solicita instrucciones antes de cambios riesgosos.

- No repitas funcionalidades válidas ni sincronices el repositorio remoto automáticamente.
- No interpretes cambios locales ajenos como errores que debas eliminar.

## 5. Trabajo por módulos, bloques y prompts

- Identifica las tareas con `M[modulo]-B[bloque]-P[prompt]`; por ejemplo, `M0-B4-P1` significa módulo 0, bloque 4, prompt 1.
- Ejecuta únicamente el prompt solicitado y su objetivo específico.
- No interpretes un bloque como autorización para desarrollar todo el módulo.
- No adelantes prompts futuros, generes tareas nuevas ni implementes funcionalidades por iniciativa propia.
- Reutiliza el código válido y preserva módulos ajenos al alcance.
- Informa dependencias o bloqueos antes de cambios importantes fuera del alcance; no los implementes sin autorización.
- Prefiere cambios pequeños, comprobables y fáciles de transferir entre integrantes.
- Detente al satisfacer los criterios de aceptación y espera nuevas instrucciones.

## 6. Conservación y calidad del código

- Inspecciona antes de editar y modifica únicamente los archivos necesarios.
- Prefiere correcciones localizadas; no reemplaces implementaciones funcionales innecesariamente.
- No refactorices módulos completos sin autorización ni elimines archivos sin una razón comprobable.
- No dupliques lógica ni uses datos ficticios para ocultar funcionalidades incompletas.
- Mantén las interfaces compartidas e informa cualquier cambio que afecte otros módulos.
- Cuida semántica HTML, legibilidad, accesibilidad y adaptación a pantallas pequeñas en los cambios visuales autorizados.
- Declara incompleta cualquier funcionalidad con requisitos pendientes; no sustituyas validaciones reales por simulaciones.
- Corrige los errores propios de la tarea antes de finalizar cuando estén dentro del alcance; informa los ajenos sin ampliarlo.
- No uses comandos destructivos para resolver problemas rutinarios.

## 7. Seguridad permanente

- Nunca almacenes claves privadas, contraseñas, frases semilla ni tokens administrativos en el código fuente.
- Considera públicas las variables `VITE_`: pueden incorporarse al código del navegador y nunca deben contener secretos.
- Mantén los entornos privados fuera de Git y `.env.example` como plantilla pública sin credenciales reales.
- No expongas claves secretas, administrativas o `service_role` de Supabase en el frontend.
- Cuando implementes acceso a información privada, aplica autorización y políticas RLS; una clave publicable no las sustituye.
- No consideres segura una operación por ocultar botones en la interfaz.
- No almacenes claves privadas de usuarios Stellar; utiliza mecanismos verificables de autorización para transacciones y aprobaciones.
- No utilices fondos reales durante pruebas del MVP ni registres documentos contractuales confidenciales en blockchain.
- No crees buckets públicos para contratos privados sin autorización y análisis de seguridad.
- No publiques secretos ni archivos temporales; no expongas credenciales en herramientas, registros o informes.
- No abras archivos privados ni muestres sus valores salvo necesidad concreta de la tarea.
- No afirmes que una transacción o aprobación blockchain funcionó usando únicamente resultados simulados.
- Aplica estas medidas cuando corresponda al módulo; no implementes integraciones por el solo hecho de mencionarlas aquí.

## 8. Git y colaboración

- Utiliza el repositorio oficial `Lilarpo/acuerdoseguro`; considera `main` la rama principal prevista y comprueba la rama real.
- Respeta el trabajo por turnos de cinco integrantes; cada persona debe utilizar su propia identidad Git.
- No cambies identidades, remotos, ramas ni configuración global sin autorización.
- Preserva los cambios locales antes de recibir cambios remotos; no hagas sincronizaciones ni relevos remotos automáticos.
- No ejecutes `git push --force`, `git reset --hard` ni limpiezas destructivas sin autorización explícita.
- No reescribas historial publicado sin autorización explícita.
- No prepares archivos con `git add`, crees commits ni hagas push salvo que el prompt autorizado lo solicite.
- Antes de una entrega autorizada, inspecciona los archivos que se incluirán y excluye credenciales, entornos privados, temporales, dependencias y compilaciones.
- Respeta el lockfile, `.gitignore`, `.gitattributes` y los `.gitkeep` necesarios para compartir el proyecto.
- Cuando un commit esté autorizado, usa un mensaje descriptivo asociado al trabajo realizado.
- No afirmes que el avance está en GitHub sin comprobar que el push terminó correctamente.

## 9. Continuidad entre integrantes

- Al recibir un turno, aplica el protocolo de inicio: lee instrucciones y estado disponible, revisa el último prompt, el código y los cambios locales.
- Identifica la siguiente tarea autorizada y continúa desde el estado existente, sin reinicializar ni repetir trabajo válido.
- Al terminar un bloque, ejecuta las pruebas aplicables e informa qué se completó, qué falta, errores y limitaciones.
- Indica el último prompt ejecutado, la siguiente tarea autorizada o pendiente y si el proyecto está listo para revisión.
- No marques un bloque como completado si falta algún criterio obligatorio.
- Actualiza el documento de estado cuando exista y el flujo autorizado lo requiera; no inventes documentos de continuidad ni historiales.
- Mantén el estado cambiante en esos documentos y en el informe; no lo agregues a `AGENTS.md`.
- No realices el relevo mediante GitHub sin autorización para las operaciones remotas correspondientes.

## 10. Verificaciones según la tarea

- Consulta los scripts reales de `package.json`; no inventes comandos de pruebas inexistentes.
- Para cambios en la aplicación o su configuración, ejecuta `npm run build` y `npm run lint` cuando corresponda.
- Para comprobar desarrollo, ejecuta `npm run dev`, verifica su arranque y detén el servidor al finalizar salvo indicación contraria.
- Cuando haya nuevas pruebas automatizadas, ejecuta sus comandos reales y las verificaciones afectadas por el cambio.
- Ajusta las pruebas de Supabase, Stellar y Soroban al módulo implementado; verifica resultados reales cuando el criterio lo exija.
- No afirmes que una prueba pasó si no la ejecutaste; no ocultes errores ni restricciones del entorno.
- Distingue pruebas automatizadas de manuales, validación estática de ejecución real y comprobación HTTP de inspección visual.
- No afirmes compatibilidad probada en los cinco equipos si solo tuviste acceso a uno.
- Informa verificaciones no ejecutadas y sus causas; usa PARCIAL o BLOQUEADO si impiden cumplir criterios obligatorios.

## 11. Informe mínimo de cierre

Utiliza el formato específico del prompt cuando exija mayor detalle; en otro caso incluye:

1. **Estado:** COMPLETADO, PARCIAL o BLOQUEADO, con justificación verificable.
2. **Trabajo realizado:** resumen de la tarea y funcionalidades implementadas, si corresponde.
3. **Archivos:** creados, modificados y eliminados, con los motivos relevantes.
4. **Pruebas:** comandos ejecutados, resultados reales y comprobaciones no ejecutadas.
5. **Git:** rama, cambios pendientes y estado de commits o push, si corresponde.
6. **Problemas:** errores, correcciones, advertencias y limitaciones.
7. **Continuidad:** último prompt ejecutado, siguiente tarea autorizada o pendiente y preparación para revisión.

Redacta informes precisos, concisos y sin afirmaciones de verificaciones inexistentes.

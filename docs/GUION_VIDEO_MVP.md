# Guion de video del MVP — 3 minutos

**Alcance de la grabación:** mostrar funciones existentes con una cuenta y un borrador de prueba ya creados. No crear usuarios, editar contratos ni enviar otra transacción. Grabar desde la copia del proyecto indicada en [CHECKLIST_DEMO.md](CHECKLIST_DEMO.md). La evidencia pública es de Stellar **Testnet**.

| Tiempo | Pantalla y acción | Narración sugerida |
| --- | --- | --- |
| **0:00–0:25** | Portada breve con el nombre AcuerdoSeguro; abrir `/` y mostrar el alcance actual del MVP. | «Cuando un acuerdo cambia de manos, puede ser difícil demostrar qué versión se revisó y si fue alterada después. AcuerdoSeguro busca dar una referencia verificable sin publicar el contenido privado del contrato. Este es nuestro MVP en desarrollo.» |
| **0:25–0:50** | Ir a `/login`; iniciar sesión fuera de la captura de la contraseña. Mostrar el enlace **Panel** cuando aparezca la sesión. | «Una cuenta de prueba entra a su espacio privado. Los borradores se guardan en Supabase y se consultan con las políticas de acceso por propietario. Ahora veremos un acuerdo existente, sin crear datos durante esta grabación.» |
| **0:50–1:40** | Abrir `/panel` → seleccionar un borrador existente → `/contratos/:id`. Mostrar título y contenido de prueba; desplazarse hasta **Huella y evidencia Testnet** y pulsar **Calcular huella SHA-256**. | «El panel muestra los borradores de esta cuenta. Al abrir uno, vemos su versión guardada. La aplicación calcula localmente una huella SHA-256 del contenido canónico de esa versión. Si cambia el contenido, cambia la huella; el hash detecta diferencias, no impide editar. Un PDF u otro archivo tendrá su propia huella según sus bytes.» |
| **1:40–2:20** | Mostrar los controles **Conectar Freighter** y **Preparar evidencia Testnet**, sin pulsar **Registrar evidencia en Stellar Testnet**. Ir a `/verificar`, introducir la huella `934b110ceb01cb634a049945f68d3b7860323f11ecc8a235de8e12e07763c9de` y la transacción `191f307bfbe896e7ac57700ebdd6268eca5622d55976dbf67df9a3646e74709f`; pulsar **Consultar Horizon Testnet**. Mostrar el resultado y el enlace al [explorador Testnet](https://stellar.expert/explorer/testnet/tx/191f307bfbe896e7ac57700ebdd6268eca5622d55976dbf67df9a3646e74709f). | «Freighter permite autorizar una operación en Testnet; hoy no enviaremos otra. Esta transacción de prueba ya confirmada contiene una huella en su memo y operación. AcuerdoSeguro consulta Horizon y comprueba los datos de la transacción antes de presentar la evidencia. El hash de transacción identifica la operación; la huella identifica los bytes registrados.» |
| **2:20–2:45** | Permanecer en el resultado de `/verificar`; señalar la sección **Archivo y huella de referencia** sin cargar documentos privados. | «Un archivo puede verificarse localmente comparando su SHA-256 con una referencia; la aplicación no lo sube para calcularlo. El contrato permanece fuera de la blockchain. La cuenta Stellar y su operación no acreditan por sí solas identidad legal, aceptación de ambas partes ni una firma digital certificada.» |
| **2:45–3:00** | Plano final con nombre AcuerdoSeguro y resultado Testnet, sin claves ni datos personales. | «Hoy mostramos borradores privados, huellas calculadas y evidencia consultable en Stellar Testnet. El siguiente paso es incorporar invitaciones y aceptación bilateral verificable. AcuerdoSeguro: claridad para acordar, evidencia para comprobar.» |

## Condición para vincular el borrador mostrado con la transacción

Antes de grabar, comparar la huella calculada en `/contratos/:id` con `934b110ceb01cb634a049945f68d3b7860323f11ecc8a235de8e12e07763c9de`. **Solo si coinciden**, puede añadirse: «Esta transacción corresponde a la versión de prueba que acabamos de mostrar». Si no coinciden, mantener la narración de la tabla: el borrador y la transacción son dos ejemplos distintos. No cargar un PDF esperando que tenga la misma huella que el JSON canónico del borrador.

## Límites que deben conservarse en voz e imagen

- El flujo de aprobación bilateral, invitaciones, Soroban y la firma digital certificada siguen pendientes.
- El recibo o un resultado de Horizon prueban evidencia de la huella indicada, no la validez jurídica del contrato.
- La consulta pública a Horizon es de solo lectura; no pulsar **Registrar evidencia en Stellar Testnet** ni usar Mainnet.

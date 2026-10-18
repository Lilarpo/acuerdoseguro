# Checklist de grabación del MVP

Este ensayo utiliza un borrador de prueba **ya existente** y la transacción pública de Stellar Testnet `191f307bfbe896e7ac57700ebdd6268eca5622d55976dbf67df9a3646e74709f`. No crear usuarios, editar contratos, ejecutar SQL ni enviar transacciones para preparar el video.

## Preparación antes de abrir la grabadora

1. Abrir en VS Code la raíz Git que contiene este checklist y `package.json`; comprobar `git rev-parse --show-toplevel` y que la rama sea `main`. Si hay otra copia Git en una carpeta contenedora, conservar ambas y ejecutar los comandos solo en esta raíz.
2. En esta copia, configurar localmente `.env.local` **solo** con la URL y clave publicable autorizadas de `acuerdoseguro-dev`, si aún no está configurado. No incluirlo en Git ni mostrarlo en la grabación.
3. Ejecutar `npm run dev` y abrir la URL local que anuncie Vite. Usar `localhost` o HTTPS para que Web Crypto funcione. Detener Vite al terminar.
4. Elegir una cuenta de prueba propia y un borrador existente cuyo contenido se pueda mostrar. Comprobar que la cuenta inicia sesión y que `/panel` lista ese borrador. Si no existe un borrador seguro para mostrar, no fabricar uno durante este ensayo: grabar la verificación pública y señalar que la parte privada queda pendiente de una cuenta y datos autorizados.
5. Abrir el borrador desde el título del panel; comprobar que carga `/contratos/:id`, que el título y los campos son los esperados y que no aparece «El borrador no está disponible para esta cuenta». No pulsar **Editar borrador**.
6. Pulsar **Calcular huella SHA-256** y anotar la huella visible en una nota local fuera del repositorio. Compararla con `934b110ceb01cb634a049945f68d3b7860323f11ecc8a235de8e12e07763c9de`. Si difiere, presentar la transacción como otro ejemplo de prueba; no decir que corresponde a ese borrador.
7. Abrir `/verificar`; introducir la huella de referencia anterior y el hash de transacción indicado arriba. Pulsar **Consultar Horizon Testnet**. Comprobar que aparece «Evidencia confirmada» y que el enlace **Ver en explorador Testnet** abre la transacción correcta. Si Testnet no responde o se ha reiniciado, detener esa parte de la grabación y usar una captura previa identificada como histórica, si existe y está autorizada; no simular confirmación actual.
8. Revisar que no haya avisos inesperados, estados de carga persistentes ni errores visibles. Comprobar que la ventana no muestra contraseñas, correos, tokens, contenido confidencial, `.env.local` ni pestañas privadas. Cerrar notificaciones que puedan interrumpir la grabación.

## Orden exacto de pantallas durante la toma

1. **0:00–0:25:** nombre AcuerdoSeguro y apertura breve de `/`. Mostrar el alcance actual del MVP y el aviso de que la aceptación bilateral sigue pendiente.
2. **0:25–0:50:** `/login` → iniciar sesión con la cuenta de prueba. Pausar u ocultar la captura mientras se escribe la contraseña; reanudar cuando se vea la sesión y el enlace **Panel**.
3. **0:50–1:40:** **Panel** → título del borrador → detalle → **Calcular huella SHA-256**. Mostrar solo contenido de prueba. No crear ni modificar registros.
4. **1:40–2:20:** señalar en detalle los controles Freighter/Testnet sin firmar; navegar a **Verificar** → pegar huella y hash TX → **Consultar Horizon Testnet** → abrir el explorador público. No pulsar **Preparar evidencia Testnet** si no se necesita mostrar ese estado; nunca pulsar **Registrar evidencia en Stellar Testnet**.
5. **2:20–2:45:** volver a `/verificar` y señalar **Archivo y huella de referencia**. Explicar que compara bytes locales y que un PDF no equivale automáticamente al JSON canónico del borrador. No cargar archivos confidenciales.
6. **2:45–3:00:** cierre con la evidencia Testnet y el nombre del producto. Detener la grabación; si es un equipo compartido, cerrar sesión después de grabar.

## Control de calidad del video

- Seguir los tiempos y la narración de [GUION_VIDEO_MVP.md](GUION_VIDEO_MVP.md); duración objetivo aproximada: 3:00.
- Escuchar audio, comprobar que el cursor no tapa la huella ni el estado confirmado y que los hashes siguen legibles en el video exportado.
- Verificar que el corte de contraseña no oculta un error de login y que el paso del panel al detalle se ve continuo.
- Si la huella del borrador no coincide con la de la transacción, mantener separados ambos ejemplos en voz, rótulos y montaje.
- No presentar el hash como protección contra edición, ni la operación Stellar como aceptación bilateral, identidad legal o firma digital certificada.

## Riesgos visibles detectados por inspección del código

- Los textos de inicio, panel y creación ya distinguen la evidencia disponible en Stellar Testnet de las invitaciones y la aceptación bilateral pendientes. Confirmar su apariencia en navegador antes de grabar.
- Sin configuración pública válida en `.env.local`, el login real no estará disponible. Las rutas privadas requieren sesión; una respuesta HTTP 200 de Vite no comprueba que la pantalla se haya renderizado ni que Supabase haya devuelto contratos.

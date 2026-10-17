# Estado del proyecto AcuerdoSeguro

Fuente principal del estado operativo. Consulta [el historial](HISTORIAL_PROMPTS.md) para la trazabilidad y [AGENTS.md](../AGENTS.md) para las reglas permanentes. Contrasta siempre este documento con el código y Git.

## 1. Identificación

- **Proyecto:** AcuerdoSeguro.
- **Repositorio oficial:** https://github.com/Lilarpo/acuerdoseguro.
- **Rama de trabajo:** `main`.
- **Propósito:** plataforma web de contratos digitales verificables mediante Stellar y Soroban.
- **Versiones comprobadas:** Node.js 24.22.0, npm 11.19.1, React y React DOM 19.3.1, TypeScript 5.9.3, Vite 7.3.7, Tailwind CSS y `@tailwindcss/vite` 4.3.3, ESLint 9.39.5. M1-B2-P1 agrega `react-router` 7.18.4; ninguna dependencia anterior cambia de versión.
- **Herramientas:** Git local y GitHub configurados; primera publicación realizada y recuperada mediante clonación HTTPS.
- **Tecnologías futuras, sin integrar:** Supabase, PostgreSQL, Supabase Auth, Supabase Storage, Stellar SDK, Freighter Wallet, Soroban con Rust y Vercel.

## 2. Estado actual de desarrollo

| Campo | Valor |
| --- | --- |
| Último módulo cerrado | Módulo 1 — Frontend e Interfaz de Usuario |
| Actividad operativa de relevo | PUBLICACIÓN-RELEVO-M1 — auditoría y entrega de los avances aprobados; no es un prompt de implementación |
| Estado del Módulo 0 | COMPLETADO, aprobado externamente |
| Estado del Módulo 1 | COMPLETADO Y APROBADO — 12 de 12 prompts aprobados |
| Último prompt de implementación ejecutado y aprobado | M1-B8-P1 |
| Estado de la publicación | Verificar en GitHub comparando `git rev-parse HEAD` con `git ls-remote --heads origin main`; este documento no acredita por sí solo el push |
| Siguiente acción operativa | Recibir el relevo, comprobar el commit publicado y esperar un nuevo prompt autorizado; no hay nuevo módulo iniciado |

El responsable confirmó después del informe de M1-B8-P1 que completó satisfactoriamente 22 comprobaciones manuales de regresión integral, sin defectos bloqueantes comunicados, y aprobó M1-B8-P1 y el cierre del Módulo 1. Codex no ejecutó esas pruebas de navegador. La aprobación funcional y técnica del frontend no acredita publicación de los cambios locales ni funcionamiento de integraciones futuras.

## 3. Capacidades y preparación existentes

- **Aplicación funcional:** React inicializado, TypeScript configurado, servidor Vite e integración Tailwind mediante su plugin oficial.
- **Landing aprobada:** HomePage sustituye la bienvenida por cinco secciones: Hero, proceso previsto de cuatro pasos, tres capacidades, tecnología y límites, y llamada final. Reutiliza PageContainer, Card y Badge; fragmento nativo y enlaces SPA a registro y verificación con avisos de desarrollo. Sin formularios, imágenes externas ni lógica de negocio.
- **Sistema visual local aprobado:** tokens `@theme` de Tailwind v4 para marca, acento, fondo, superficie, texto, borde y variante oscura del acento para foco; fuente de sistema, radios y sombra sutil. Usa la escala nativa de espaciado y breakpoints. `#root` ocupa todo el ancho; la antigua regla `.welcome` se conserva sin uso en la landing. Verifica contraste en cada combinación nueva; el texto secundario se utiliza sobre blanco.
- **UI genérica local aprobada:** `src/components/ui/` conserva intactos sus siete componentes y exportaciones. El layout reutiliza PageContainer; las páginas temporales y 404 reutilizan Card y PageContainer.
- **Navegación SPA local:** un BrowserRouter en `App.tsx`, Routes/Route declarativos y `AppLayout` con Outlet, encabezado, NavLink activo y salto al único `main`. Enlaces visibles a Inicio, Verificar, Iniciar sesión y Registrarse, sin menús complejos.
- **Rutas:** `/` muestra HomePage; `/login` muestra LoginPage; `/registro` muestra RegisterPage; `/panel` muestra DashboardPage; `/contratos/nuevo` muestra CreateContractPage; `/contratos/:id` muestra ContractDetailPage; `/verificar` muestra VerifyDocumentPage. `*` muestra NotFoundPage, sin redirección silenciosa.
- **Login aprobado:** formulario con correo y contraseña controlados, errores locales, aviso de autenticación no disponible y enlace SPA a `/registro`. Su aprobación y pruebas manuales de navegador fueron comunicadas por el responsable en M1-B4-P2; Codex no las ejecutó en su entorno.
- **Registro aprobado:** cuatro campos controlados, validación local y aviso de registro no disponible. El responsable comunicó en M1-B5-P1 que completó pruebas manuales de formulario, navegación, responsive, consola, red, almacenamiento y zoom al 200 %, y aprobó M1-B4-P2; Codex no las ejecutó en su entorno.
- **Dashboard aprobado:** vista preliminar sin datos consultados, con accesos a creación y verificación. El responsable comunicó en M1-B6-P1 que realizó nueve pruebas manuales de navegador, incluidas navegación, responsive, zoom, teclado, consola y ausencia de consultas privadas o sesiones ficticias, y aprobó M1-B5-P1; Codex no las ejecutó en su entorno.
- **Formulario de borrador aprobado:** siete campos, validación local de campos y correos, aviso de validación local y ausencia de persistencia. El responsable confirmó 15 pruebas manuales satisfactorias y aprobó M1-B6-P1; Codex no las ejecutó en su entorno.
- **Revisión local aprobada:** tras validar los valores actuales, una acción explícita muestra título, descripción, ambos participantes y cláusulas desde el estado React; volver a editar conserva los valores. El responsable comunicó 15 pruebas manuales satisfactorias y aprobó M1-B6-P2; Codex no las ejecutó en su entorno.
- **Detalle preliminar aprobado:** `/contratos/:id` muestra la referencia solicitada como no verificada, limita su representación visible si es larga y ofrece secciones de información, participantes, aprobaciones y evidencia con datos no disponibles. El responsable comunicó 14 pruebas manuales satisfactorias y aprobó M1-B7-P1; Codex no las ejecutó en su entorno.
- **Interfaz de verificación aprobada:** `/verificar` permite seleccionar un archivo sin leerlo ni subirlo y validar localmente el formato de una huella SHA-256 de referencia. El aviso de formato válido no constituye verificación de integridad. El responsable comunicó 15 comprobaciones manuales satisfactorias y aprobó M1-B7-P2; Codex no las ejecutó en su entorno.
- **Seguridad de rutas:** `/panel`, `/contratos/nuevo` y `/contratos/:id` son públicas temporalmente y no consultan ni almacenan datos privados. La protección real corresponde al módulo de autenticación; no existen controles de sesión ficticios.
- **Preparación arquitectónica:** se conservan todos los `.gitkeep`; `src/types/` y los tres servicios siguen reservados y sin integraciones. La lógica criptográfica y las consultas reales permanecen pendientes.
- **Preparación del repositorio:** `.nvmrc`, lockfile npm, `.gitignore`, finales LF y `.env.example` público, sin credenciales reales ni consumo de sus variables.
- **Instrucciones permanentes:** `AGENTS.md` existe en la raíz.
- **Auditoría final aprobada:** rutas, formularios, validaciones, accesibilidad, seguridad del alcance frontend y regresión integral revisadas. Build, lint y Vite pasaron en la auditoría técnica; el responsable confirmó 22 pruebas manuales satisfactorias. No se modificó código durante M1-B8-P1.
- **Continuidad:** documentos actualizados para el cierre del Módulo 1, conservando las evidencias y el historial del Módulo 0.

### Matriz de rutas del frontend aprobado

La aprobación de cada interfaz no significa que sus integraciones reales estén disponibles. Las rutas de panel y contratos aún no tienen protección por autenticación.

| Ruta | Pantalla | Estado |
| --- | --- | --- |
| `/` | Landing | Interfaz aprobada |
| `/login` | Inicio de sesión | Interfaz y validación local aprobadas |
| `/registro` | Registro | Interfaz y validación local aprobadas |
| `/panel` | Dashboard | Interfaz y estado vacío aprobados |
| `/contratos/nuevo` | Creación y revisión local | Interfaz y validaciones locales aprobadas |
| `/contratos/:id` | Detalle preliminar | Interfaz aprobada; referencia de URL no verificada |
| `/verificar` | Verificación documental frontend | Interfaz y formato de huella aprobados; sin verificación criptográfica |
| `*` | Página 404 | Interfaz aprobada |

### Funcionalidades pendientes de integración

No existen todavía autenticación real, cuentas persistentes, base de datos de contratos, almacenamiento documental, guardado y consulta reales de acuerdos, aprobaciones criptográficas, integración de billeteras Stellar, cálculo SHA-256 sobre documentos, comparación criptográfica, registro o consulta de evidencia en Stellar, integración Soroban ni escrow. También siguen pendientes generación documental, backend Supabase y despliegue. Estas capacidades estaban fuera del alcance aprobado del Módulo 1; las pantallas no representan operaciones reales.

## 4. Estado de los módulos

| Módulo | Nombre | Estado | Observaciones |
| --- | --- | --- | --- |
| 0 | Configuración inicial | COMPLETADO | Ocho prompts aprobados externamente; base publicada en GitHub. |
| 1 | Frontend e Interfaz de Usuario | COMPLETADO Y APROBADO | 12 de 12 prompts aprobados, incluida M1-B8-P1 tras 22 comprobaciones manuales externas satisfactorias. Publicación de cambios locales pendiente. |
| 2 | Backend y Supabase | PENDIENTE | Carpeta reservada, sin integración. |
| 3 | Stellar y Soroban | PENDIENTE | Carpeta reservada, sin SDK ni contratos. |
| 4 | Documentos y verificación | PENDIENTE | Carpeta reservada, sin lógica documental. |
| 5 | Integración, pruebas y despliegue | PENDIENTE | Sin despliegue ni integración entre servicios. |

## 5. Pruebas y verificaciones

### Evidencia histórica

| Comprobación | Evidencia disponible | Límite |
| --- | --- | --- |
| `npm run build` y `npm run lint` | PASS reportado en M0-B1-P1 a M0-B5-P1. | Se distinguen de las ejecuciones nuevas indicadas abajo. |
| `npm run dev` | PASS reportado en M0-B2-P2; servidor detenido al terminar. | Evidencia histórica. |
| `npm ci` | PASS reportado en M0-B1-P2, en copia temporal y con caché local. | Anterior a Tailwind; la prueba del lockfile actual corresponde a M0-B6-P1. |
| Inspección visual | Escritorio 1440 × 900 y móvil 390 × 844 reportados en M0-B2-P2, con React y Tailwind operativos. | Evidencia histórica. |
| Compatibilidad Linux y WSL2 | Evaluación estática previa: rutas portables, importaciones y scripts npm; finales LF. | Ejecución previa en un equipo Linux Mint; los otros cuatro equipos no están comprobados. |

### Verificaciones de M0-B6-P1

Evidencia del cierre anterior aprobado; no atribuir estas instalaciones ni la clonación a M1-B1-P1.

| Comprobación | Resultado |
| --- | --- |
| Versiones, estructura e instrucciones | Verificadas; servicios solo con `.gitkeep`, sin integraciones ficticias. |
| `npm ci` con el lockfile actual | PASS en copia temporal aislada, con caché local y sin dependencias ni compilaciones anteriores; instalación principal intacta. |
| `npm run build` y `npm run lint`, proyecto principal | PASS; TypeScript, Vite y ESLint sin errores. |
| Build y lint de la copia aislada | PASS; instalación reproducible verificada con el lockfile actual. |
| Desarrollo, React, Tailwind y navegador | PASS; Vite arrancó y se detuvo; nueve utilidades verificadas en CSS; escritorio 1440 × 900 y móvil 390 × 844 inspeccionados, sin desbordamiento ni errores de aplicación en consola. |
| Seguridad y exclusiones Git | PASS sobre los 25 archivos candidatos: contenido inspeccionado, sin secretos conocidos; `.env.example` permitida y entornos privados excluidos. |
| Remoto y visibilidad | Accesible; la consulta inicial no encontró ramas ni etiquetas. Visibilidad PUBLIC confirmada; el responsable autorizó expresamente publicar en público durante M0-B6-P1. |
| Publicación y recuperación desde GitHub | PASS; push inicial completado, `main` remota verificada y clonación HTTPS nueva con los 25 archivos esperados, incluidos instrucciones, documentos y plantilla pública. |
| `npm ci`, build y lint desde la clonación nueva | PASS con caché local y lockfile actual; sin modificar dependencias ni configuración. |
| Integridad y documentación | PASS; solo cambiaron los dos documentos de continuidad frente al inicio del bloque; sin cambios de código, versiones ni arquitectura. |

**Pendiente en otros entornos:** validar instalación, build, lint y desarrollo en los otros cuatro equipos. La carga automática de `AGENTS.md` en una sesión independiente sigue sin comprobarse.

### Verificaciones de M1-B1-P1

| Comprobación | Resultado |
| --- | --- |
| Build, lint y servidor de desarrollo | PASS; build final y lint sin errores; Vite arrancó y se detuvo. Sin instalar dependencias. |
| Paleta, tokens y Tailwind | PASS; ocho tokens de color y siete utilidades institucionales comprobados en CSS compilado; estilos calculados coinciden con la paleta. |
| Responsive y texto al 200 % | PASS; inspección visual real a 1440 × 900 y 390 × 844, más mediciones a 768 y 320 px y texto al 200 % a 390 px; sin desbordamientos ni superposiciones. |
| Accesibilidad y consola | PASS en revisión básica: un `main`, un `h1`, sin controles de producto; contraste título 14,27:1 y descripción 4,76:1 sobre blanco. Foco de 3 px y separación de 3 px comprobado con sonda temporal solo en el navegador; sin errores de aplicación. No sustituye una auditoría completa con lector de pantalla. |
| Tema y movimiento | PASS; tema claro incluso ante preferencia de oscuro; sin animaciones ni transiciones, incluida emulación de movimiento reducido. |
| Alcance e integridad | PASS; únicamente tres archivos visuales y estos dos documentos modificados; sin staging, commits, push ni cambios en lockfile o módulos reservados. |

### Verificaciones de M1-B1-P2

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript incluye los siete componentes, sin errores. |
| Desarrollo y bienvenida | PASS; Vite arrancó y se detuvo; contenido y colores de bienvenida conservados; sin errores ni advertencias nuevos de aplicación. |
| Exportaciones, props, labels e IDs | PASS en Chrome: siete exportaciones centrales e individuales, props y refs nativos, IDs únicos y estables, labels, required y ARIA; ayuda y error conservan también `aria-describedby` del consumidor. |
| Teclado y comportamiento nativo | PASS: Button con Enter y foco visible de 3 px, tipo button por defecto, submit explícito, disabled, edición controlada/no controlada, select con flechas y textarea redimensionable verticalmente. |
| Contraste y responsive de UI | PASS: mínimo medido 4,83:1 en variantes de botones y 5,63:1 en badges; capturas reales a 1440 y 390 px e inspección adicional a 320 px, sin desbordamiento. Card y PageContainer son divs, sin landmarks ni interacciones por defecto. |
| Hover y Tailwind | Reglas hover y disabled verificadas en CSS compilado; hover visual NO EJECUTADO porque Chrome informa `hover: none`. Verificación con ratón físico pendiente; no se modificó el CSS para forzarla. |
| Preservación y alcance | PASS; ocho archivos nuevos en UI y únicamente estos dos documentos preexistentes modificados en este prompt; archivos de M1-B1-P1 conservados byte a byte. Montaje temporal retirado, bienvenida restaurada; sin staging, commits ni push. |

### Verificaciones de M1-B2-P1

| Comprobación | Resultado |
| --- | --- |
| Build, lint y desarrollo | PASS; compilación TypeScript/Vite y ESLint correctos; Vite arrancó y se detuvo al finalizar. |
| React Router y lockfile | PASS; `react-router` 7.18.4 compatible con React 19 y Node 24; solo se agregan sus dependencias transitivas cookie y set-cookie-parser, sin actualizar paquetes anteriores. |
| Rutas y acceso directo | PASS en Chrome y respuesta HTML de Vite: siete rutas, `/contratos/ejemplo`, `/contratos/otro-123` y 404; `/contratos/nuevo` muestra creación, no detalle. Regreso al inicio probado desde todos los destinos temporales y 404. |
| SPA e historial | PASS; clicks internos, Atrás y Adelante mantienen el documento y el encabezado, sin solicitudes nuevas de documento. URL y contenido coinciden. |
| Teclado y accesibilidad básica | PASS; un header/nav/main y un h1 por pantalla; aria-current en NavLink, orden de Tab, foco de 3 px y Enter; salto visible al recibir foco y enfoque real de main. Sin controles ni formularios ficticios. No implica conformidad WCAG integral. |
| Responsive, visual y consola | PASS en mediciones a 1440 × 900, 390 × 844 y 320 × 700 para inicio, placeholder y 404; sin superposición ni scroll horizontal. Capturas de inicio y placeholder inspeccionadas en escritorio y móvil. Paleta calculada conservada; sin errores ni advertencias de aplicación. |
| Preservación y alcance | PASS; cuatro archivos nuevos de navegación y seis preexistentes modificados en este prompt; UI, CSS global y demás archivos fuera del alcance idénticos al inicio. Sin staging, commits ni push. |

### Verificaciones de M1-B3-P1

| Comprobación | Resultado |
| --- | --- |
| Build, lint y desarrollo | PASS; TypeScript/Vite y ESLint sin errores; Vite arrancó y se detuvo al finalizar. Sin instalaciones. |
| Landing y contenido | PASS; cinco secciones en orden, un h1, cuatro pasos y tres capacidades. Prototipo identificado; SHA-256 detectará alteraciones, Stellar y Soroban previstos, privacidad y aclaración legal visibles. Sin datos ficticios ni funciones de negocio. |
| Enlaces y regresión | PASS en Chrome; fragmento por click y Tab/Enter, destino enfocado y encabezado visible; tres enlaces de la landing a registro/verificación sin recargar documento. Encabezado, siete rutas, dos IDs de detalle, 404, regreso e historial SPA conservados. |
| Teclado y accesibilidad básica | PASS; salto al main, orden de Tab, Enter y foco de 3 px. En el bloque azul final se utiliza foco blanco. Contraste calculado: texto muted sobre blanco 4,76:1; marca sobre turquesa 4,83:1; blanco sobre marca 14,27:1. Sin auditoría WCAG integral ni lector de pantalla. |
| Responsive y navegador | PASS; mediciones e inspección de capturas a 320 × 700, 390 × 844, 768 × 1024 y 1440 × 900. Texto al 200 % sin scroll horizontal en los cuatro tamaños; tarjetas en una, dos, tres o cuatro columnas según sección y ancho. Sin errores ni advertencias de aplicación en consola. |
| Alcance | PASS; solo HomePage y continuidad modificados frente al inicio; avances locales previos conservados, sin staging, commits ni push. Scripts y capturas de prueba temporales fuera del repositorio. |

### Verificaciones del relevo de Módulo 1

- `npm run build`: PASS; TypeScript y Vite compilaron los avances completos.
- `npm run lint`: PASS, sin errores.
- Revisión de contenido y búsqueda de patrones de credenciales en los 37 archivos candidatos: sin hallazgos. `.env.example` solo contiene valores vacíos y `testnet`; entornos privados, claves, dependencias, compilaciones y temporales excluidos de Git.
- `git fetch origin main`: PASS; HEAD previo y origin/main sin divergencia. Se autoriza consolidar únicamente los 19 archivos legítimos pendientes, sin modificar código durante el relevo.
- Pruebas ejecutadas con Node.js 24.22.0 y npm 11.19.1 en Linux; no se repitió la inspección visual ni se ejecutó el siguiente prompt. El resultado final del push y el hash del commit se informan al cerrar el relevo.

### Verificaciones de M1-B4-P1

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript, Vite y ESLint sin errores. |
| `npm run dev` | PASS; Vite arrancó con permiso de red local y se detuvo al finalizar. |
| HTTP de rutas en desarrollo | PASS; `/`, `/login`, `/registro`, `/verificar` y ruta desconocida devolvieron el HTML de la SPA. La respuesta HTTP no prueba el renderizado de React. |
| Marcado inicial | PASS mediante renderizado estático: un h1, un form, ningún main adicional, ambos tipos de entrada, botón submit y enlace a `/registro`. |
| Interacción y responsive | NO EJECUTADO; no hay navegador disponible en este entorno. Pendientes casos de validación, teclado, navegación SPA, consola, peticiones de red y mediciones a 320, 390, 768 y 1440 px con zoom al 200 %. |

El responsable informó posteriormente que completó satisfactoriamente las pruebas manuales de navegador y aprobó M1-B4-P1. Este reporte no convierte las pruebas no ejecutadas por Codex en pruebas propias.

### Verificaciones de M1-B4-P2

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript, Vite y ESLint sin errores. |
| `npm run dev` | PASS; Vite arrancó en localhost con permiso de red local y se detuvo al finalizar. |
| HTTP de rutas en desarrollo | PASS; `/`, `/login`, `/registro`, `/verificar` y ruta desconocida devolvieron el HTML de la SPA. No acredita renderizado de React. |
| Marcado inicial | PASS mediante renderizado estático: un h1, un form, cuatro inputs y labels, ayuda de contraseña, botón submit y enlace a `/login`; sin main adicional. |
| Interacción y responsive | NO EJECUTADO; no hay navegador disponible en este entorno. Pendientes validaciones, teclado, navegación SPA, consola, red, almacenamiento y mediciones a 320, 390, 768 y 1440 px con zoom al 200 %. |

El responsable informó posteriormente en M1-B5-P1 que completó las pruebas manuales de validación, navegación, responsive, consola, red, almacenamiento y zoom al 200 %, y aprobó M1-B4-P2. No se atribuyen esas pruebas a Codex.

### Verificaciones de M1-B5-P1

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript, Vite y ESLint sin errores. |
| `npm run dev` | PASS; Vite arrancó en localhost con permiso de red local y se detuvo al finalizar. |
| HTTP de rutas en desarrollo | PASS; `/panel`, `/contratos/nuevo`, `/verificar`, `/login`, `/registro`, `/` y ruta desconocida devolvieron el HTML de la SPA. No acredita navegación React. |
| Marcado inicial del dashboard | PASS mediante renderizado estático: un h1, tres secciones con h2, ningún main adicional, estado vacío explícito y destinos de los enlaces previstos. |
| Interacción y responsive | NO EJECUTADO; no hay navegador disponible en este entorno. Pendientes navegación SPA, teclado, consola, red, almacenamiento y mediciones a 320, 390, 768 y 1440 px con zoom al 200 %. |

El responsable informó posteriormente en M1-B6-P1 que completó nueve pruebas manuales del dashboard y aprobó M1-B5-P1. No se atribuyen esas pruebas a Codex.

### Verificaciones de M1-B6-P1

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript, Vite y ESLint sin errores. |
| `npm run dev` | PASS; Vite arrancó en localhost con permiso de red local y se detuvo al finalizar. |
| HTTP de rutas en desarrollo | PASS; `/contratos/nuevo`, `/contratos/ejemplo`, `/panel`, `/login`, `/registro`, `/verificar`, `/` y ruta desconocida devolvieron el HTML de la SPA. No acredita navegación React. |
| Marcado inicial del formulario | PASS mediante renderizado estático: un h1, tres secciones, siete campos con etiquetas, botón submit, aviso de no guardado y enlace a `/panel`; sin main adicional. |
| Interacción y responsive | NO EJECUTADO; no hay navegador disponible en este entorno. Pendientes validaciones, teclado, navegación SPA, consola, red, almacenamiento y mediciones a 320, 390, 768 y 1440 px con zoom al 200 %. |

El responsable informó posteriormente en M1-B6-P2 que completó satisfactoriamente 15 pruebas manuales, incluidas validaciones, navegación, teclado, responsive, zoom, consola, ausencia de envío y persistencia, y descarte tras recarga; aprobó M1-B6-P1. No se atribuyen esas pruebas a Codex.

### Verificaciones de M1-B6-P2

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript, Vite y ESLint sin errores. |
| `npm run dev` | PASS; Vite arrancó en localhost y se detuvo. |
| HTTP de rutas en desarrollo | PASS; Vite sirvió el HTML base para las rutas comprobadas. No acredita navegación ni renderizado React. |
| Marcado inicial y revisión estática | PASS mediante renderizado estático: edición con un h1, siete campos y revisión inicialmente ausente; revisión con un h1, tres secciones, sin main adicional, texto especial escapado y saltos de línea conservados. |
| Interacción y responsive | NO EJECUTADO; no hay navegador disponible. Pendientes validación y alternancia reales, conservación de valores, teclado, consola, red, almacenamiento, recarga, rutas previas, 320, 390, 768 y 1440 px, y zoom al 200 %. |

El responsable informó posteriormente en M1-B7-P1 que completó satisfactoriamente 15 pruebas manuales de la revisión local, incluidas alternancia, conservación, texto seguro, teclado, responsive, zoom, consola y ausencia de envío y almacenamiento; aprobó M1-B6-P2. No se atribuyen esas pruebas a Codex.

### Verificaciones de M1-B7-P1

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript, Vite y ESLint sin errores. |
| `npm run dev` | PASS; Vite arrancó en localhost tras permiso de red local y se detuvo. El intento inicial en sandbox falló con `listen EPERM`. |
| HTTP de rutas en desarrollo | PASS; Vite sirvió el HTML base para las rutas comprobadas. No acredita navegación ni renderizado React. |
| Renderizado estático del detalle | PASS; un h1, cuatro secciones, sin main adicional, referencia dinámica, tres enlaces previstos, escape de caracteres especiales y truncamiento de referencia larga. |
| Interacción y responsive | NO EJECUTADO; no hay navegador disponible. Pendientes navegación SPA, teclado, consola, red, almacenamiento, 320, 390, 768 y 1440 px, y zoom al 200 %. |

El responsable informó posteriormente en M1-B7-P2 que completó satisfactoriamente 14 pruebas manuales del detalle, incluidas rutas dinámicas, referencias no verificadas, texto seguro, navegación, teclado, responsive, zoom, consola, red y almacenamiento; aprobó M1-B7-P1. No se atribuyen esas pruebas a Codex.

### Verificaciones de M1-B7-P2

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript, Vite y ESLint sin errores. |
| `npm run dev` | PASS; Vite arrancó en localhost y se detuvo. |
| HTTP de rutas en desarrollo | PASS; Vite sirvió el HTML base para las rutas comprobadas. No acredita navegación ni renderizado React. |
| Renderizado estático inicial | PASS; un h1, formulario, selector de archivo, campo de huella, tres pasos, enlaces previstos y ningún aviso de éxito o error inicial. |
| Interacción y responsive | NO EJECUTADO; no hay navegador disponible. Pendientes validaciones, correcciones, teclado, consola, red, almacenamiento, recarga, rutas previas, 320, 390, 768 y 1440 px, y zoom al 200 %. |

El responsable informó posteriormente en M1-B8-P1 que completó satisfactoriamente 15 comprobaciones manuales de la interfaz de verificación, incluidos archivo, validación de huella, correcciones, navegación, teclado, responsive, zoom, consola, red y almacenamiento; aprobó M1-B7-P2. No se atribuyen esas pruebas a Codex.

### Verificaciones de M1-B8-P1

| Comprobación | Resultado |
| --- | --- |
| `npm run build` y `npm run lint` | PASS; TypeScript, Vite y ESLint sin errores. No existe script de pruebas automatizadas en `package.json`. |
| `npm run dev` | PASS; Vite arrancó en localhost y se detuvo. |
| HTTP de rutas en desarrollo | PASS; Vite sirvió el HTML base de las ocho rutas inspeccionadas. No acredita navegación SPA. |
| Renderizado estático de rutas | PASS; landing, login, registro, panel, creación, detalle, verificación y 404 mostraron el título esperado, un único `main` y `h1`, IDs únicos, enlace de salto con destino válido y enlaces internos hacia rutas declaradas. No acredita interacciones. |
| Inspección transversal de código | PASS dentro del alcance: formularios locales, avisos honestos, rutas y componentes UI coherentes; sin nuevas dependencias, credenciales visibles, llamadas externas, persistencia o integraciones blockchain en `src/`. No equivale a una auditoría de seguridad externa. |
| Regresión interactiva y visual | NO EJECUTADO; no hay navegador disponible. Pendientes formularios, edición/revisión, teclado, foco, consola, red, almacenamiento, recarga, 320, 390, 768 y 1440 px, y zoom al 200 %. |
| Git | `git diff --check` PASS; `main`, HEAD y `origin/main` iguales; cambios locales anteriores conservados, sin staging, commit ni push. |

No se identificaron defectos corregibles dentro del alcance y de las comprobaciones ejecutadas. No se modificó código durante esta auditoría.

**Validación externa posterior:** el responsable confirmó 22 comprobaciones manuales de regresión integral satisfactorias de rutas, formularios, creación y revisión de borradores, detalle, verificación documental, navegación, teclado, foco, responsive, zoom al 200 %, consola, red, almacenamiento y recarga. No comunicó defectos bloqueantes y aprobó M1-B8-P1. Estas pruebas fueron realizadas por el responsable, no por Codex. El estado PARCIAL consignado en el informe técnico original corresponde al momento anterior a esta confirmación.

### Verificaciones de CIERRE-DOC-M1

| Comprobación | Resultado |
| --- | --- |
| `npm run build` | PASS; TypeScript y Vite compilaron con las dependencias existentes. |
| `npm run lint` | PASS; ESLint sin errores. |
| `git diff --check` | PASS; sin errores de formato en cambios rastreados. |
| Alcance | Solo se editaron los dos documentos de continuidad durante este cierre; código, dependencias y configuración conservados. |

## 6. Problemas, advertencias y tareas pendientes

- **Cierre funcional del frontend:** M1-B8-P1 y el Módulo 1 fueron aprobados externamente tras 22 comprobaciones manuales satisfactorias. Codex no repitió esas pruebas en su entorno sin navegador.
- **Advertencia conocida:** ESLint 9.39.5 fue reportado fuera de soporte; no se migró de versión.
- **Advertencia npm previa:** autorización de scripts de esbuild pendiente de revisión; no impidió las últimas comprobaciones técnicas.
- **Tareas pendientes:** confirmar el resultado de PUBLICACIÓN-RELEVO-M1 con la comparación de hashes del informe final; validar instalación y ejecución en los otros cuatro equipos cuando corresponda; desarrollar consulta contractual y verificación criptográfica reales en módulos futuros autorizados. Acceso directo en producción y reescrituras del servidor se resolverán en despliegue, sin configuración añadida ahora. La 404 es una vista SPA; Vite devuelve el HTML base con HTTP 200 durante desarrollo.
- Los errores de permisos de instalaciones anteriores fueron resueltos y no se consideran bloqueos actuales.

## 7. Estado de Git y publicación

- **Rama:** `main`; **origin:** `https://github.com/Lilarpo/acuerdoseguro`.
- **Commit inicial publicado y verificado:** `10bc0ca12af399a0cdc098584894554b11eaf4c0`, mensaje `chore: inicializar base técnica de AcuerdoSeguro M0`.
- **Cierre del Módulo 0 publicado:** `4efefc6327751993459a27d81202533e4b3a5fc9`; conservado como antecesor del relevo.
- **Entrega del Módulo 1:** sistema visual, siete componentes UI con exportaciones, AppLayout, rutas, HomePage definitiva, placeholders, 404, React Router y lockfile, estilos y ambos documentos. Son 19 archivos de avance: siete modificados y doce nuevos respecto al cierre del Módulo 0; los seis `.gitkeep` se conservan.
- **Commit de relevo autorizado:** `feat: guardar avance frontend M1 y preparar relevo`. Para obtener su hash consulta `git log -1 --format=%H`; el propio commit contiene esta documentación. El informe de cierre acredita el resultado del push y la comparación con `origin/main`.
- **Remoto:** repositorio público, con publicación pública expresamente autorizada por el responsable desde M0-B6-P1. En este relevo se consultó `origin/main`: sin divergencia respecto al HEAD previo; publicación normal, sin force push.
- **Base anterior a PUBLICACIÓN-RELEVO-M1:** `main`, HEAD y `origin/main` coincidían en `987ae95f95573fd8ad5c0efb6e46ec8dfca9fe92` antes de preparar la entrega. Ese hash es histórico, no el resultado del relevo actual.
- **Entrega operativa:** PUBLICACIÓN-RELEVO-M1 reúne las interfaces de login, registro, panel, creación y revisión local, detalle y verificación visual, la integración de rutas y estos dos documentos. El hash del nuevo commit y el resultado real del push se comprueban en Git y en el informe final; no se deducen de esta documentación.
- **Exclusiones:** dependencias, compilaciones, entornos privados y temporales ignorados; `.env.example` y los seis `.gitkeep` permitidos según M0-B3-P1.
- CIERRE-DOC-M1 no autorizó una publicación. PUBLICACIÓN-RELEVO-M1 es la autorización operativa separada para un commit y un push normales, sujetos a sus controles previos.

## 8. Próxima acción y relevo

- **Estado:** Módulo 0 COMPLETADO; Módulo 1 COMPLETADO Y APROBADO, con 12 de 12 prompts aprobados. La entrega de sus avances corresponde a PUBLICACIÓN-RELEVO-M1; comprueba el resultado remoto antes de considerarlos publicados.
- **Último prompt de implementación aprobado:** M1-B8-P1. **Última actividad administrativa de cierre:** CIERRE-DOC-M1. **Actividad operativa de relevo:** PUBLICACIÓN-RELEVO-M1; ninguna de estas actividades incrementa el contador de prompts de implementación.
- **Siguiente acción recomendada:** verificar el commit de relevo en `origin/main` y continuar solo cuando el responsable autorice un nuevo prompt. No se ha iniciado otro módulo.
- Clona `https://github.com/Lilarpo/acuerdoseguro`, entra en `acuerdoseguro`, usa Node.js 24 (`nvm use` si utilizas nvm) y ejecuta `npm ci`, `npm run build` y `npm run lint`. Para trabajar, `npm run dev`.
- Lee AGENTS.md y ambos documentos de continuidad; confirma rama `main`, HEAD, `origin/main` y cambios locales. Los doce prompts de frontend están aprobados según el responsable; las integraciones reales siguen pendientes. Comprueba la publicación en GitHub mediante hashes, no solo con esta documentación.

## 9. Indicaciones para el siguiente integrante

1. Abre el repositorio en VS Code y confirma la raíz, rama y remoto correctos.
2. Lee `AGENTS.md`, este documento y, cuando sea necesario, `docs/HISTORIAL_PROMPTS.md`.
3. Revisa Git y preserva los cambios locales antes de cualquier sincronización autorizada.
4. Consulta `git ls-remote --heads origin main` y compara su hash con el commit de relevo informado; conserva cualquier cambio local antes de sincronizar.
5. Comprueba Node.js con `.nvmrc` y las dependencias; usa npm y el lockfile para instalar cuando corresponda.
6. Ejecuta las pruebas pertinentes y contrasta sus resultados con el código real, sin confiar ciegamente en este estado.
7. Continúa únicamente desde el siguiente prompt autorizado.

## 10. Registro del relevo al terminar cada turno

Actualiza este estado y el historial con: último prompt trabajado y aprobación, capacidades completadas, trabajo incompleto, pruebas y resultados, errores pendientes, cambios locales sin publicar, último commit publicado si existe, próximo prompt autorizado e instrucciones indispensables para continuar.

Si se agota la disponibilidad durante una tarea, registra PARCIAL o BLOQUEADO según la situación real y conserva el trabajo incompleto. No lo marques automáticamente como implementado ni aprobado. Evita datos personales y no hagas el relevo remoto sin autorización.

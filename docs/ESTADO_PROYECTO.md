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
| Módulo actual | Módulo 1 — Frontend e Interfaz de Usuario |
| Bloque actual | Bloque 3 — Página principal |
| Estado del Módulo 0 | COMPLETADO, aprobado externamente |
| Estado del Módulo 1 | EN DESARROLLO — 4 de 12 prompts aprobados |
| Último prompt aprobado | M1-B3-P1 |
| Prompt actualmente ejecutado | M1-B3-P1 |
| Estado del prompt actual | APROBADO por el responsable en la solicitud de relevo |
| Estado del relevo | Listo para relevo al siguiente integrante |
| Siguiente prompt previsto | M1-B4-P1 — Formulario de inicio de sesión; no ejecutado |

El responsable aprobó expresamente M1-B3-P1 y autorizó guardar y publicar los avances en su solicitud de relevo. Módulo 0 COMPLETADO; Módulo 1 EN DESARROLLO con cuatro prompts aprobados: M1-B1-P1, M1-B1-P2, M1-B2-P1 y M1-B3-P1. Listo para relevo al siguiente integrante; M1-B4-P1 no se ha iniciado.

## 3. Capacidades y preparación existentes

- **Aplicación funcional:** React inicializado, TypeScript configurado, servidor Vite e integración Tailwind mediante su plugin oficial.
- **Landing aprobada:** HomePage sustituye la bienvenida por cinco secciones: Hero, proceso previsto de cuatro pasos, tres capacidades, tecnología y límites, y llamada final. Reutiliza PageContainer, Card y Badge; fragmento nativo y enlaces SPA a registro y verificación con avisos de desarrollo. Sin formularios, imágenes externas ni lógica de negocio.
- **Sistema visual local aprobado:** tokens `@theme` de Tailwind v4 para marca, acento, fondo, superficie, texto, borde y variante oscura del acento para foco; fuente de sistema, radios y sombra sutil. Usa la escala nativa de espaciado y breakpoints. `#root` ocupa todo el ancho; la antigua regla `.welcome` se conserva sin uso en la landing. Verifica contraste en cada combinación nueva; el texto secundario se utiliza sobre blanco.
- **UI genérica local aprobada:** `src/components/ui/` conserva intactos sus siete componentes y exportaciones. El layout reutiliza PageContainer; las páginas temporales y 404 reutilizan Card y PageContainer.
- **Navegación SPA local:** un BrowserRouter en `App.tsx`, Routes/Route declarativos y `AppLayout` con Outlet, encabezado, NavLink activo y salto al único `main`. Enlaces visibles a Inicio, Verificar, Iniciar sesión y Registrarse, sin menús complejos.
- **Rutas:** `/` muestra HomePage; `/login`, `/registro`, `/panel`, `/contratos/nuevo`, `/contratos/:id` y `/verificar` comparten PlaceholderPage con títulos distintos y aviso de implementación pendiente. `*` muestra NotFoundPage, sin redirección silenciosa.
- **Seguridad de rutas:** `/panel` y las rutas de contratos NO están protegidas por autenticación; solo muestran placeholders sin datos privados. La protección real corresponde al Módulo 2; no existen controles de sesión ficticios.
- **Preparación arquitectónica:** se conservan todos los `.gitkeep`; `src/types/` y los tres servicios siguen reservados y sin integraciones. No se crearon páginas definitivas de login, registro, dashboard ni contratos.
- **Preparación del repositorio:** `.nvmrc`, lockfile npm, `.gitignore`, finales LF y `.env.example` público, sin credenciales reales ni consumo de sus variables.
- **Instrucciones permanentes:** `AGENTS.md` existe en la raíz.
- **Continuidad:** documentos actualizados para el inicio de Módulo 1, conservando las evidencias y el historial del Módulo 0.
- **Sin implementar:** registro e inicio de sesión, creación de contratos, PDF, hashes documentales, firmas o aprobaciones criptográficas, billeteras, integración Stellar, contratos Soroban, backend Supabase y despliegue Vercel.

## 4. Estado de los módulos

| Módulo | Nombre | Estado | Observaciones |
| --- | --- | --- | --- |
| 0 | Configuración inicial | COMPLETADO | Ocho prompts aprobados externamente; base publicada en GitHub. |
| 1 | Frontend e Interfaz de Usuario | EN DESARROLLO | 4 de 12 prompts aprobados: sistema visual, UI, navegación y landing. Listo para relevo; formularios y páginas funcionales pendientes. |
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

## 6. Problemas, advertencias y tareas pendientes

- **Bloqueos:** ninguno identificado; pruebas obligatorias de la landing finalizadas correctamente. Accesibilidad limitada al alcance, sin auditoría integral con lector de pantalla.
- **Advertencia conocida:** ESLint 9.39.5 fue reportado fuera de soporte; no se migró de versión.
- **Advertencia npm previa:** autorización de scripts de esbuild pendiente de revisión; no impidió las últimas comprobaciones técnicas.
- **Tareas pendientes:** ejecución de M1-B4-P1 en el siguiente turno, hover con ratón físico y pruebas en los otros cuatro equipos; páginas y servicios reales en sus bloques. Acceso directo en producción y reescrituras del servidor se resolverán en despliegue, sin configuración añadida ahora. La 404 es una vista SPA; Vite devuelve el HTML base con HTTP 200 durante desarrollo.
- Los errores de permisos de instalaciones anteriores fueron resueltos y no se consideran bloqueos actuales.

## 7. Estado de Git y publicación

- **Rama:** `main`; **origin:** `https://github.com/Lilarpo/acuerdoseguro`.
- **Commit inicial publicado y verificado:** `10bc0ca12af399a0cdc098584894554b11eaf4c0`, mensaje `chore: inicializar base técnica de AcuerdoSeguro M0`.
- **Cierre del Módulo 0 publicado:** `4efefc6327751993459a27d81202533e4b3a5fc9`; conservado como antecesor del relevo.
- **Entrega del Módulo 1:** sistema visual, siete componentes UI con exportaciones, AppLayout, rutas, HomePage definitiva, placeholders, 404, React Router y lockfile, estilos y ambos documentos. Son 19 archivos de avance: siete modificados y doce nuevos respecto al cierre del Módulo 0; los seis `.gitkeep` se conservan.
- **Commit de relevo autorizado:** `feat: guardar avance frontend M1 y preparar relevo`. Para obtener su hash consulta `git log -1 --format=%H`; el propio commit contiene esta documentación. El informe de cierre acredita el resultado del push y la comparación con `origin/main`.
- **Remoto:** repositorio público, con publicación pública expresamente autorizada por el responsable desde M0-B6-P1. En este relevo se consultó `origin/main`: sin divergencia respecto al HEAD previo; publicación normal, sin force push.
- **Exclusiones:** dependencias, compilaciones, entornos privados y temporales ignorados; `.env.example` y los seis `.gitkeep` permitidos según M0-B3-P1.
- La solicitud de relevo autoriza staging, commit y `git push origin main` tras verificaciones satisfactorias; no autoriza funcionalidades nuevas, force push ni comandos destructivos.

## 8. Próxima acción y relevo

- **Estado:** listo para relevo al siguiente integrante.
- **Último prompt aprobado:** M1-B3-P1; Módulo 1 con 4 de 12 prompts aprobados.
- **Siguiente prompt:** M1-B4-P1 — Formulario de inicio de sesión. El siguiente integrante debe leer su prompt completo antes de implementarlo; no se ha iniciado en este turno.
- Clona `https://github.com/Lilarpo/acuerdoseguro`, entra en `acuerdoseguro`, usa Node.js 24 (`nvm use` si utilizas nvm) y ejecuta `npm ci`, `npm run build` y `npm run lint`. Para trabajar, `npm run dev`.
- Lee AGENTS.md y ambos documentos de continuidad; confirma rama `main`, HEAD y estado limpio. Login y registro continúan como placeholders, sin autenticación ni servicios externos.

## 9. Indicaciones para el siguiente integrante

1. Abre el repositorio en VS Code y confirma la raíz, rama y remoto correctos.
2. Lee `AGENTS.md`, este documento y, cuando sea necesario, `docs/HISTORIAL_PROMPTS.md`.
3. Revisa Git y preserva los cambios locales antes de cualquier sincronización autorizada.
4. Confirma con el responsable que tienes la última versión disponible; la documentación local no acredita publicación en GitHub.
5. Comprueba Node.js con `.nvmrc` y las dependencias; usa npm y el lockfile para instalar cuando corresponda.
6. Ejecuta las pruebas pertinentes y contrasta sus resultados con el código real, sin confiar ciegamente en este estado.
7. Continúa únicamente desde el siguiente prompt autorizado.

## 10. Registro del relevo al terminar cada turno

Actualiza este estado y el historial con: último prompt trabajado y aprobación, capacidades completadas, trabajo incompleto, pruebas y resultados, errores pendientes, cambios locales sin publicar, último commit publicado si existe, próximo prompt autorizado e instrucciones indispensables para continuar.

Si se agota la disponibilidad durante una tarea, registra PARCIAL o BLOQUEADO según la situación real y conserva el trabajo incompleto. No lo marques automáticamente como implementado ni aprobado. Evita datos personales y no hagas el relevo remoto sin autorización.

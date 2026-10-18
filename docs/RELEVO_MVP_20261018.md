# Relevo MVP — 2026-10-18

## Estado actual

AcuerdoSeguro conserva autenticación, rutas protegidas, persistencia de sesión y el MVP de contratos con Supabase. El trabajo local de este turno integra evidencia documental en Stellar Testnet. No se implementan funciones nuevas en este relevo.

## Implementado

- Registro, inicio de sesión, logout, persistencia y cambios de sesión.
- Creación, listado, detalle y edición de borradores de contrato con validaciones.
- RLS contractual aplicada previamente y comprobación manual comunicada: la cuenta B no leyó ni modificó el contrato de A.
- SHA-256 real mediante Web Crypto para documentos y contenido canónico.
- Conexión con Freighter, construcción y firma de transacciones para Stellar Testnet.
- Consulta real a Horizon y validación de hash, memo, operación y XDR antes de mostrar evidencia confirmada.
- Recibo de evidencia con hash, red, cuenta firmante y fecha de confirmación.

No están implementadas la aceptación bilateral, invitaciones seguras, firma digital certificada, contratos Soroban ni automatizaciones blockchain adicionales.

## Supabase

Proyecto de desarrollo: `acuerdoseguro-dev`, referencia `gaydlycsinbrlanzmsyj`.
Configura localmente `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` con valores públicos autorizados. Nunca publiques contraseñas, `service_role`, claves privadas, tokens ni `.env.local`.

No se aplicó ninguna migración durante este turno y no se debe repetir la migración contractual.

## Stellar Testnet

Transacción confirmada visualmente por el responsable:

`191f307bfbe896e7ac57700ebdd6268eca5622d55976dbf67df9a3646e74709f`

Explorador: https://stellar.expert/explorer/testnet/tx/191f307bfbe896e7ac57700ebdd6268eca5622d55976dbf67df9a3646e74709f

El responsable confirmó que la huella registrada coincide con la calculada por AcuerdoSeguro. Esto es validación manual externa; las pruebas automatizadas usan dobles controlados y no envían transacciones. No repetir el envío ni usar Mainnet.

## Ejecución y pruebas

```bash
npm ci
npm run dev
```

Verificaciones realizadas en este turno:

- `npm run build`: PASS.
- `npm run lint`: PASS.
- `npm run supabase:check:test`: 22 PASS.
- `node --test scripts/check-contracts.test.mjs scripts/check-stellar-evidence.test.mjs`: 49 PASS.

Las pruebas Stellar son automatizadas y sin red real; la comprobación del contrato A/B y la transacción indicada son validaciones manuales externas. La comprobación de navegador requiere ejecutar el flujo autorizado en un navegador con Freighter y no se repite automáticamente.

## Continuidad Git

Rama de relevo: `relevo/m2-b2-p9c1-20261017`.
Commit base conocido antes de Stellar: `8b60f50b5c745dcf1e2a2c8c3ce40946aaccca10`.
El hash final del commit de entrega debe tomarse directamente de GitHub después del push; no se inventa aquí.

## Qué debe hacer el compañero

Si `main` contiene el MVP:

```bash
git clone https://github.com/Lilarpo/acuerdoseguro.git
cd acuerdoseguro
git switch main
npm ci
npm run dev
```

Si la integración queda pendiente, recuperar el relevo:

```bash
git clone --branch relevo/m2-b2-p9c1-20261017 https://github.com/Lilarpo/acuerdoseguro.git
cd acuerdoseguro
npm ci
npm run dev
```

Configura tu propio `.env.local` con los valores públicos autorizados. No subas archivos privados.

## No repetir

- No aplicar de nuevo la migración SQL contractual.
- No enviar otra transacción a Stellar Testnet.
- No usar Mainnet, force push ni eliminar la rama de relevo.

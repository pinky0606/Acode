# Acode Smart Wallet Verification

A small Next.js app that turns `contract-verification.json` into a readable smart-wallet deployment dashboard. It is intentionally dependency-light and keeps the JSON file as the single source of truth.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The JSON API is available at http://localhost:3000/api/verification.

## Production

```bash
npm run build
npm start
```

## Project layout

- `app/page.tsx` — verification dashboard UI
- `app/api/verification/route.ts` — JSON endpoint exposing the record
- `lib/verification.ts` — typed helpers and address validation
- `contract-verification.json` — deployment metadata consumed by the app

No RPC credentials or environment variables are required for the current metadata-only view. A future live verifier can add an RPC provider and explorer API key without changing the page’s data contract.

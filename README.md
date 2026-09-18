# Acode Smart Wallet Verification

A Next.js dashboard for inspecting the smart-wallet metadata in `contract-verification.json`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The JSON API is available at http://localhost:3000/api/verification.

## Optional live chain lookup

Set `ETH_RPC_URL` to an Ethereum-compatible JSON-RPC endpoint. The address checker will then call `eth_getCode` and `eth_getBalance` server-side without exposing the provider URL to the browser.

```bash
ETH_RPC_URL=https://your-provider.example npm run dev
```

The checker provides client-side Ethereum address validation, EIP-55 checksum formatting, comparison with the configured contract, and optional contract/balance lookup. Explorer links remain available even without an RPC provider.

## Production

```bash
npm run build
npm start
```

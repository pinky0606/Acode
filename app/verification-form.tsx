"use client";

import { useState } from "react";
import { getAddress, isAddress } from "viem";

export default function VerificationForm({ targetAddress }: { targetAddress: string }) {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<"match" | "mismatch" | "invalid" | null>(null);
  const [checksum, setChecksum] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [onChain, setOnChain] = useState<{ isContract: boolean; balanceEth: string } | null>(null);

  function validate(value: string) {
    setAddress(value);
    setOnChain(null);
    setMessage("");
    if (!value) {
      setResult(null);
      setChecksum(null);
      return;
    }
    if (!isAddress(value, { strict: false })) {
      setResult("invalid");
      setChecksum(null);
      return;
    }
    const checksummed = getAddress(value);
    setChecksum(checksummed);
    setResult(checksummed.toLowerCase() === targetAddress.toLowerCase() ? "match" : "mismatch");
  }

  async function checkOnChain() {
    if (!checksum || result === "invalid") return;
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`/api/verification?address=${encodeURIComponent(checksum)}`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to check the address");
      setOnChain(payload.onChain ?? null);
      setMessage(payload.onChain ? "Live chain data loaded." : "No RPC provider is configured; showing metadata-only results.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Live chain lookup failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card checker" aria-labelledby="checker-title">
      <div className="card-heading"><span id="checker-title">Check a wallet address</span><span className="code-pill">Local + RPC</span></div>
      <label htmlFor="wallet-address">Ethereum address</label>
      <div className="input-row">
        <input id="wallet-address" value={address} onChange={(event) => validate(event.target.value)} placeholder="0x…" spellCheck={false} autoComplete="off" />
        <button type="button" onClick={checkOnChain} disabled={!checksum || loading}>{loading ? "Checking…" : "Check chain"}</button>
      </div>
      {result === "invalid" && <p className="form-message error">Enter a valid Ethereum address.</p>}
      {result === "match" && <p className="form-message success"><strong>Match</strong> — this address matches the configured wallet.</p>}
      {result === "mismatch" && <p className="form-message warning"><strong>No match</strong> — valid address, but different from the configured wallet.</p>}
      {checksum && <p className="muted">Checksummed address: <code>{checksum}</code></p>}
      {onChain && <p className="form-message success">On-chain: {onChain.isContract ? "contract detected" : "EOA detected"}, {onChain.balanceEth} ETH balance.</p>}
      {message && <p className="muted">{message}</p>}
    </section>
  );
}

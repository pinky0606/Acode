import verification from "@/contract-verification.json";
import { explorerUrl } from "@/lib/verification";

function shortAddress(value: string) {
  return value.length > 18 ? `${value.slice(0, 8)}…${value.slice(-6)}` : value;
}

function statusLabel(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function Home() {
  const explorer = verification.explorer?.url || explorerUrl(verification.contractAddress, verification.network);
  const status = verification.verification.status;

  return (
    <main className="shell">
      <header className="header">
        <div className="brand"><span className="brand-mark">A</span><span>Acode Verify</span></div>
        <span className="network"><span className="dot" /> {verification.network}</span>
      </header>

      <section className="hero">
        <p className="eyebrow">Smart contract wallet</p>
        <h1>Deployment verification</h1>
        <p className="intro">A transparent view of the on-chain identity and compiler configuration for this wallet deployment.</p>
      </section>

      <section className="grid" aria-label="Wallet verification details">
        <article className="card address-card">
          <div className="card-heading"><span>Contract address</span><span className="badge">{verification.type}</span></div>
          <a className="address" href={explorer} target="_blank" rel="noreferrer">{shortAddress(verification.contractAddress)} <span>↗</span></a>
          <p className="muted">View this contract on the block explorer</p>
        </article>

        <article className="card status-card">
          <div className="card-heading"><span>Verification status</span><span className={`status status-${status}`}>{statusLabel(status)}</span></div>
          <p className="status-title">{status === "verified" ? "Contract source verified" : "Verification in progress"}</p>
          <p className="muted">Compiler settings are recorded below for reproducibility.</p>
        </article>

        <article className="card">
          <div className="card-heading"><span>Compiler configuration</span><span className="code-pill">Solidity</span></div>
          <dl className="details">
            <div><dt>Version</dt><dd>{verification.verification.compiler.version}</dd></div>
            <div><dt>Optimization</dt><dd>{verification.verification.compiler.optimization ? "Enabled" : "Disabled"}</dd></div>
            <div><dt>Runs</dt><dd>{verification.verification.compiler.runs}</dd></div>
            <div><dt>Constructor arguments</dt><dd>{verification.verification.constructorArgs.length || "None"}</dd></div>
          </dl>
        </article>

        <article className="card">
          <div className="card-heading"><span>Deployment</span><span className="code-pill">{verification.deploymentTimestamp.slice(0, 10)}</span></div>
          <dl className="details">
            <div><dt>Deployment address</dt><dd className="mono">{shortAddress(verification.deploymentAddress)}</dd></div>
            <div><dt>Transaction</dt><dd className="mono">{shortAddress(verification.deploymentTransaction)}</dd></div>
            <div><dt>Balance</dt><dd>{verification.balance.eth} ETH <span className="muted">(${verification.balance.usd})</span></dd></div>
          </dl>
        </article>
      </section>

      <footer><span>Data source: <code>contract-verification.json</code></span><a href="/api/verification">View JSON API →</a></footer>
    </main>
  );
}

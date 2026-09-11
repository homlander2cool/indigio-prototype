"use client";

import { useEffect, useState } from "react";

type WalletData = { settings: { asset: string; network: string; investment_wallet_address: string; withdrawal_notice: string }; balance: number; transactions: Array<{ id: string; type: string; amount: number; status: string; created_at: string }> };

export default function WalletClient() {
  const [data, setData] = useState<WalletData | null>(null);
  const [type, setType] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [message, setMessage] = useState("");
  async function load() { const response = await fetch("/api/wallet", { cache: "no-store" }); if (response.ok) setData(await response.json()); }
  useEffect(() => { void load(); }, []);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setMessage("");
    const response = await fetch("/api/wallet", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, amount, txHash, destinationAddress }) });
    const result = await response.json(); setMessage(response.ok ? "Request submitted for admin review." : result.error); if (response.ok) { setAmount(""); setTxHash(""); setDestinationAddress(""); void load(); }
  }
  if (!data) return <section><p>Loading wallet...</p></section>;
  return <section>
    <p className="eyebrow">Client wallet</p><h1 className="heading-lg mt-2 text-ink">Crypto deposits & withdrawals</h1>
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="panel p-6"><p className="text-sm text-ink-muted">Available balance</p><p className="mt-2 text-4xl font-black text-ink">{Number(data.balance).toFixed(2)} {data.settings.asset}</p>
        <div className="mt-6 rounded-2xl bg-navy p-5 text-white"><p className="text-xs uppercase tracking-widest text-gold">Investment wallet</p><p className="mt-2 break-all font-mono text-sm">{data.settings.investment_wallet_address || "Address is being configured by admin."}</p><p className="mt-2 text-sm text-white/70">Network: {data.settings.network} · Send only {data.settings.asset}.</p></div>
      </section>
      <section className="panel p-6"><h2 className="heading-md text-ink">Submit a request</h2><form onSubmit={submit} className="mt-5 grid gap-3">
        <select className="field" value={type} onChange={(e) => setType(e.target.value)}><option value="deposit">Deposit</option><option value="withdrawal">Withdrawal</option></select>
        <input className="field" required min="0.00000001" step="0.00000001" type="number" placeholder={`Amount (${data.settings.asset})`} value={amount} onChange={(e) => setAmount(e.target.value)} />
        {type === "deposit" ? <input className="field" placeholder="Transaction hash (optional)" value={txHash} onChange={(e) => setTxHash(e.target.value)} /> : <input className="field" required placeholder="Destination wallet address" value={destinationAddress} onChange={(e) => setDestinationAddress(e.target.value)} />}
        <button className="navy-button mt-2" type="submit">Submit for review</button>{message && <p className="text-sm text-ink-muted">{message}</p>}
      </form><p className="mt-4 text-xs leading-5 text-ink-muted">{data.settings.withdrawal_notice}</p></section>
    </div>
    <section className="panel mt-6 p-6"><h2 className="heading-md text-ink">Request history</h2><div className="mt-4 divide-y divide-line">{data.transactions.map((item) => <div key={item.id} className="flex flex-wrap justify-between gap-2 py-3 text-sm"><span>{item.type} · {Number(item.amount).toFixed(2)} {data.settings.asset}</span><span className="capitalize text-ink-muted">{item.status}</span></div>)}</div></section>
  </section>;
}

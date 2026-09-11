"use client";
import { useEffect, useState } from "react";

type Item = { id: string; user_id: string; type: string; amount: number; status: string; tx_hash?: string; destination_address?: string; note?: string };
export default function AdminWalletClient() {
  const [settings, setSettings] = useState({ asset: "", network: "", investment_wallet_address: "", withdrawal_notice: "" });
  const [items, setItems] = useState<Item[]>([]);
  const [message, setMessage] = useState("");
  async function load() { const response = await fetch("/api/admin/wallet", { cache: "no-store" }); if (response.ok) { const data = await response.json(); setSettings(data.settings); setItems(data.transactions); } }
  useEffect(() => { void load(); }, []);
  async function saveSettings(event: React.FormEvent) { event.preventDefault(); const response = await fetch("/api/admin/wallet", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "settings", ...settings }) }); setMessage(response.ok ? "Wallet settings saved." : "Unable to save settings."); }
  async function review(id: string, status: string) { const response = await fetch("/api/admin/wallet", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "review", id, status }) }); setMessage(response.ok ? "Request updated." : (await response.json()).error); if (response.ok) void load(); }
  return <main className="container-page section"><p className="eyebrow">Admin workspace</p><h1 className="heading-lg mt-2 text-ink">Wallet controls</h1>
    <form onSubmit={saveSettings} className="panel mt-8 grid gap-3 p-6"><h2 className="heading-md text-ink">Investment wallet settings</h2>
      {(["asset", "network", "investment_wallet_address", "withdrawal_notice"] as const).map((key) => <input key={key} className="field" required value={settings[key]} placeholder={key.replaceAll("_", " ")} onChange={(e) => setSettings({ ...settings, [key]: e.target.value })} />)}
      <button className="navy-button" type="submit">Save settings</button>{message && <p className="text-sm text-ink-muted">{message}</p>}
    </form>
    <section className="panel mt-6 p-6"><h2 className="heading-md text-ink">Pending requests</h2><div className="mt-4 grid gap-3">{items.filter((item) => item.status === "pending").map((item) => <div key={item.id} className="rounded-xl border border-line p-4 text-sm"><p className="font-semibold">{item.type} · {item.amount} {settings.asset}</p><p className="mt-1 break-all text-ink-muted">User: {item.user_id}</p><p className="break-all text-ink-muted">{item.tx_hash || item.destination_address}</p><div className="mt-3 flex gap-2"><button className="navy-button" onClick={() => void review(item.id, "approved")}>Approve</button><button className="ghost-button" onClick={() => void review(item.id, "rejected")}>Reject</button></div></div>)}</div></section>
  </main>;
}

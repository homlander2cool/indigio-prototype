import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

async function admin() {
  const user = (await getSupabaseServerClient().auth.getUser()).data.user;
  return user?.email?.toLowerCase() === process.env.ADMIN_EMAIL?.trim().toLowerCase() ? user : null;
}

export async function GET() {
  if (!(await admin())) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  const db = getSupabaseAdminClient();
  const [settings, transactions] = await Promise.all([
    db.from("wallet_settings").select("*").eq("id", true).single(),
    db.from("wallet_transactions").select("*").order("created_at", { ascending: false }),
  ]);
  if (settings.error || transactions.error) return NextResponse.json({ error: settings.error?.message ?? transactions.error?.message }, { status: 500 });
  return NextResponse.json({ settings: settings.data, transactions: transactions.data });
}

export async function POST(request: Request) {
  const actor = await admin();
  if (!actor) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  const body = await request.json();
  const db = getSupabaseAdminClient();
  if (body.action === "settings") {
    const result = await db.from("wallet_settings").update({
      asset: String(body.asset).trim().toUpperCase().slice(0, 12),
      network: String(body.network).trim().slice(0, 40),
      investment_wallet_address: String(body.investmentWalletAddress).trim().slice(0, 120),
      withdrawal_notice: String(body.withdrawalNotice).trim().slice(0, 500),
      updated_at: new Date().toISOString(),
    }).eq("id", true);
    if (result.error) return NextResponse.json({ error: result.error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }
  if (body.action === "review") {
    const status = ["approved", "rejected", "processed"].includes(body.status) ? body.status : null;
    if (!status || !body.id) return NextResponse.json({ error: "Invalid review." }, { status: 400 });
    const transaction = await db.from("wallet_transactions").select("*").eq("id", body.id).single();
    if (transaction.error) return NextResponse.json({ error: transaction.error.message }, { status: 404 });
    if (transaction.data.status !== "pending") return NextResponse.json({ error: "This request was already reviewed." }, { status: 409 });
    if (status === "approved" && transaction.data.type === "deposit") {
      const account = await db.from("wallet_accounts").select("balance").eq("user_id", transaction.data.user_id).maybeSingle();
      const balance = Number(account.data?.balance ?? 0) + Number(transaction.data.amount);
      const saved = await db.from("wallet_accounts").upsert({ user_id: transaction.data.user_id, balance, updated_at: new Date().toISOString() });
      if (saved.error) return NextResponse.json({ error: saved.error.message }, { status: 400 });
    }
    if (status === "approved" && transaction.data.type === "withdrawal") {
      const account = await db.from("wallet_accounts").select("balance").eq("user_id", transaction.data.user_id).maybeSingle();
      if (Number(account.data?.balance ?? 0) < Number(transaction.data.amount)) return NextResponse.json({ error: "Insufficient client balance." }, { status: 400 });
      const saved = await db.from("wallet_accounts").update({ balance: Number(account.data?.balance ?? 0) - Number(transaction.data.amount), updated_at: new Date().toISOString() }).eq("user_id", transaction.data.user_id);
      if (saved.error) return NextResponse.json({ error: saved.error.message }, { status: 400 });
    }
    const updated = await db.from("wallet_transactions").update({ status, note: body.note ? String(body.note).slice(0, 500) : transaction.data.note, processed_at: new Date().toISOString(), processed_by: actor.id }).eq("id", body.id);
    if (updated.error) return NextResponse.json({ error: updated.error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}

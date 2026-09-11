import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const addressPattern = /^[a-zA-Z0-9]{20,120}$/;
const hashPattern = /^(0x)?[a-fA-F0-9]{32,128}$/;

export async function GET() {
  const user = (await getSupabaseServerClient().auth.getUser()).data.user;
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const db = getSupabaseAdminClient();
  const [settings, account, transactions] = await Promise.all([
    db.from("wallet_settings").select("asset,network,investment_wallet_address,withdrawal_notice").eq("id", true).single(),
    db.from("wallet_accounts").select("balance").eq("user_id", user.id).maybeSingle(),
    db.from("wallet_transactions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
  ]);
  const failure = [settings, account, transactions].find((result) => result.error);
  if (failure?.error) return NextResponse.json({ error: failure.error.message }, { status: 500 });
  return NextResponse.json({ settings: settings.data, balance: account.data?.balance ?? 0, transactions: transactions.data ?? [] });
}

export async function POST(request: Request) {
  const user = (await getSupabaseServerClient().auth.getUser()).data.user;
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const body = await request.json();
  const amount = Number(body.amount);
  const type = body.type;
  if (!Number.isFinite(amount) || amount <= 0 || amount > 1_000_000 || !["deposit", "withdrawal"].includes(type)) {
    return NextResponse.json({ error: "Enter a valid amount and request type." }, { status: 400 });
  }
  if (type === "withdrawal" && (!addressPattern.test(String(body.destinationAddress ?? "")))) {
    return NextResponse.json({ error: "Enter a valid destination wallet address." }, { status: 400 });
  }
  if (type === "deposit" && body.txHash && !hashPattern.test(String(body.txHash))) {
    return NextResponse.json({ error: "Enter a valid transaction hash." }, { status: 400 });
  }
  const db = getSupabaseAdminClient();
  const settings = await db.from("wallet_settings").select("asset,network").eq("id", true).single();
  if (settings.error) return NextResponse.json({ error: settings.error.message }, { status: 500 });
  const insert = await db.from("wallet_transactions").insert({
    user_id: user.id,
    type,
    amount,
    asset: settings.data.asset,
    network: settings.data.network,
    tx_hash: body.txHash || null,
    destination_address: body.destinationAddress || null,
    note: body.note ? String(body.note).slice(0, 500) : null,
  }).select("id").single();
  if (insert.error) return NextResponse.json({ error: insert.error.message }, { status: 400 });
  return NextResponse.json({ id: insert.data.id }, { status: 201 });
}

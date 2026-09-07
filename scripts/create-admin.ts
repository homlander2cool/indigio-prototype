import { getSupabaseAdminClient } from "../lib/supabase/admin";

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_INITIAL_PASSWORD;

if (!email || !password) {
  throw new Error("Set ADMIN_EMAIL and ADMIN_INITIAL_PASSWORD before creating the admin.");
}

const supabase = getSupabaseAdminClient();
const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  user_metadata: { role: "admin" },
});

if (error || !data.user) throw error ?? new Error("Admin creation failed.");

const { error: profileError } = await supabase.from("profiles").upsert({
  id: data.user.id,
  email,
  role: "admin",
  dashboard_asset_usd: 0,
});
if (profileError) throw profileError;

console.log(`Created Supabase admin ${email}.`);

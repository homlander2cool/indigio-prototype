import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import AdminWalletClient from "@/components/AdminWalletClient";

export default async function AdminWalletPage() {
  const user = (await getSupabaseServerClient().auth.getUser()).data.user;
  if (user?.email?.toLowerCase() !== process.env.ADMIN_EMAIL?.trim().toLowerCase()) redirect("/dashboard");
  return <AdminWalletClient />;
}

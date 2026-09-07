import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import AdminUserForm from "@/components/AdminUserForm";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (data.user?.email?.toLowerCase() !== process.env.ADMIN_EMAIL?.trim().toLowerCase()) {
    redirect("/dashboard");
  }
  return (
    <div className="container-page section">
      <h1 className="heading-lg text-ink">Create investor account</h1>
      <p className="lede mt-4 max-w-2xl">Provision a KYC-approved investor with an editable dashboard asset value.</p>
      <AdminUserForm />
    </div>
  );
}

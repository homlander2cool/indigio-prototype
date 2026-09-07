import { redirect } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type VisitRow = {
  id: number;
  visitor_id: string;
  user_email: string | null;
  path: string;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
};

export default async function AdminAnalyticsPage() {
  const user = (await getSupabaseServerClient().auth.getUser()).data.user;
  if (user?.email?.toLowerCase() !== process.env.ADMIN_EMAIL?.trim().toLowerCase()) {
    redirect("/dashboard");
  }
  const { data, error } = await getSupabaseAdminClient()
    .from("site_visits")
    .select("id, visitor_id, user_email, path, referrer, user_agent, created_at")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw error;
  const rows = (data ?? []) as VisitRow[];
  const uniqueVisitors = new Set(rows.map((row) => row.visitor_id)).size;

  return (
    <div className="container-page section">
      <p className="eyebrow">Admin</p>
      <h1 className="heading-lg text-ink">Site visitors</h1>
      <p className="lede mt-4">Recent page visits. Anonymous visitors are represented by a rotating-safe hashed identifier; signed-in visitors show their account email.</p>
      <div className="mt-4 flex gap-4 text-sm">
        <a className="link-quiet" href="/admin/kyc">KYC submissions</a>
        <a className="link-quiet" href="/admin/users">Investor accounts</a>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="card p-5"><p className="text-sm text-ink-muted">Recorded visits</p><p className="mt-2 text-3xl font-semibold text-ink">{rows.length}</p></div>
        <div className="card p-5"><p className="text-sm text-ink-muted">Unique visitors in this view</p><p className="mt-2 text-3xl font-semibold text-ink">{uniqueVisitors}</p></div>
      </div>
      <div className="mt-8 overflow-x-auto card">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-wide text-ink-muted">
            <tr><th className="p-4">When</th><th className="p-4">Visitor</th><th className="p-4">Page</th><th className="p-4">Referrer</th><th className="p-4">Browser</th></tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-line last:border-0">
                <td className="whitespace-nowrap p-4 text-ink-muted">{row.created_at}</td>
                <td className="p-4 text-ink">{row.user_email || `Anonymous · ${row.visitor_id}`}</td>
                <td className="p-4 font-medium text-ink">{row.path}</td>
                <td className="max-w-xs truncate p-4 text-ink-muted">{row.referrer || "Direct"}</td>
                <td className="max-w-xs truncate p-4 text-ink-muted">{row.user_agent || "Unknown"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="p-6 text-ink-muted">No visits recorded yet.</p>}
      </div>
    </div>
  );
}

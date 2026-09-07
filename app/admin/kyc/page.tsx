import { redirect } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type KycRow = {
  id: number;
  reference_id: string;
  full_name: string;
  referral_code: string | null;
  referred_by_code: string | null;
  data_json: unknown;
  created_at: string;
};

function formatSubmission(data: unknown): string {
  try {
    return JSON.stringify(typeof data === "string" ? JSON.parse(data) : data, null, 2);
  } catch {
    return String(data);
  }
}

export default async function AdminKycPage() {
  const user = (await getSupabaseServerClient().auth.getUser()).data.user;
  if (user?.email?.toLowerCase() !== process.env.ADMIN_EMAIL?.trim().toLowerCase()) {
    redirect("/dashboard");
  }

  const { data, error } = await getSupabaseAdminClient()
    .from("kyc_submissions")
    .select("id, reference_id, full_name, referral_code, referred_by_code, data_json, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  const rows = (data ?? []) as KycRow[];

  return (
    <div className="container-page section">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="heading-lg text-ink">KYC submissions</h1>
          <p className="lede mt-4">Review every submitted field, referral relationship, and application reference.</p>
        </div>
        <div className="flex gap-4 text-sm">
          <a className="link-quiet" href="/admin/analytics">Site visitors</a>
          <a className="link-quiet" href="/admin/users">Investor accounts</a>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        {rows.length === 0 ? (
          <div className="card p-6 text-ink-muted">No KYC submissions yet.</div>
        ) : rows.map((row) => (
          <details key={row.id} className="card overflow-hidden">
            <summary className="cursor-pointer list-none p-5">
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-ink">{row.full_name}</h2>
                  <p className="mt-1 text-sm text-ink-muted">{row.reference_id} · {row.created_at}</p>
                </div>
                <div className="text-right text-sm text-ink-muted">
                  <p>Referral: {row.referred_by_code || "Direct"}</p>
                  <p>Your code: {row.referral_code || "—"}</p>
                </div>
              </div>
            </summary>
            <pre className="max-h-[32rem] overflow-auto border-t border-line bg-canvas-panel p-5 text-xs leading-5 text-ink">
              {formatSubmission(row.data_json)}
            </pre>
          </details>
        ))}
      </div>
    </div>
  );
}

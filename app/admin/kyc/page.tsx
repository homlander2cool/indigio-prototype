import { redirect } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type KycRow = {
  id: number;
  reference_id: string;
  full_name: string;
  registration_email: string;
  registration_phone: string;
  registration_ip: string | null;
  registration_country: string | null;
  document_path: string | null;
  document_url?: string | null;
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
    .select("id, reference_id, full_name, registration_email, registration_phone, registration_ip, registration_country, document_path, referral_code, referred_by_code, data_json, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  const rows = await Promise.all(
    ((data ?? []) as KycRow[]).map(async (row) => {
      if (!row.document_path) return row;
      const { data: signed } = await getSupabaseAdminClient()
        .storage.from("kyc-documents")
        .createSignedUrl(row.document_path, 60 * 10);
      return { ...row, document_url: signed?.signedUrl ?? null };
    }),
  );

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
          <details key={row.id} className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_18px_60px_rgba(9,23,40,0.07)]">
            <summary className="cursor-pointer list-none p-5">
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-black text-ink">{row.full_name}</h2>
                    <span className="badge-neutral">{row.registration_country || "Country unknown"}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">{row.reference_id} · {row.created_at}</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    {row.registration_email} · {row.registration_phone}
                  </p>
                </div>
                <div className="text-right text-sm text-ink-muted">
                  <p>Referral: {row.referred_by_code || "Direct"}</p>
                  <p>Your code: {row.referral_code || "—"}</p>
                  <p>Location: {row.registration_country || "Unknown"} · {row.registration_ip || "Unknown IP"}</p>
                </div>
              </div>
            </summary>
            <div className="border-t border-line bg-canvas-panel p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Email", row.registration_email],
                  ["Phone", row.registration_phone],
                  ["IP address", row.registration_ip || "Not provided"],
                  ["Country", row.registration_country || "Not provided"],
                  ["Identity document", row.document_url ? (
                    <a href={row.document_url} target="_blank" rel="noreferrer" className="link-quiet">Open secure file</a>
                  ) : "Not uploaded"],
                  ["Referral source", row.referred_by_code || "Direct application"],
                  ["Applicant code", row.referral_code || "—"],
                ].map(([label, value], index) => (
                  <div key={`${String(label)}-${index}`} className="rounded-2xl border border-line bg-white p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">{label}</p>
                    <p className="mt-2 break-words text-sm font-semibold text-ink">{value}</p>
                  </div>
                ))}
              </div>
              <details className="mt-5 rounded-2xl border border-line bg-white">
                <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-ink">View complete submitted application</summary>
                <pre className="max-h-[32rem] overflow-auto border-t border-line bg-canvas-panel p-5 text-xs leading-5 text-ink">
                  {formatSubmission(row.data_json)}
                </pre>
              </details>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

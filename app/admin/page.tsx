import Link from "next/link";
import { redirect } from "next/navigation";
import AdminUserForm from "@/components/AdminUserForm";
import SignOutButton from "@/components/SignOutButton";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type CountCard = {
  label: string;
  value: number;
  href: string;
  description: string;
};

export default async function AdminPage() {
  const user = (await getSupabaseServerClient().auth.getUser()).data.user;
  if (user?.email?.toLowerCase() !== process.env.ADMIN_EMAIL?.trim().toLowerCase()) {
    redirect("/dashboard");
  }

  const supabase = getSupabaseAdminClient();
  const [kyc, visitors, profiles, deals] = await Promise.all([
    supabase.from("kyc_submissions").select("id", { count: "exact", head: true }),
    supabase.from("site_visits").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "investor"),
    supabase.from("deals").select("slug", { count: "exact", head: true }),
  ]);
  const failed = [kyc, visitors, profiles, deals].find((result) => result.error);
  if (failed?.error) throw failed.error;

  const cards: CountCard[] = [
    { label: "KYC submissions", value: kyc.count ?? 0, href: "/admin/kyc", description: "Review full applications and referrals." },
    { label: "Site visits", value: visitors.count ?? 0, href: "/admin/analytics", description: "See recent visitors and traffic sources." },
    { label: "Investor accounts", value: profiles.count ?? 0, href: "/admin/users", description: "Create accounts and set dashboard assets." },
    { label: "Live deals", value: deals.count ?? 0, href: "/deals", description: "Review the public investment portfolio." },
  ];

  return (
    <div className="container-page section">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow">Operations console</p>
          <h1 className="heading-lg mt-2 text-ink">Admin dashboard</h1>
          <p className="lede mt-4 max-w-2xl">
            Manage investor onboarding, review KYC results, monitor visitors, and provision dashboard values from one secure workspace.
          </p>
        </div>
        <SignOutButton />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="card group p-5 transition hover:-translate-y-1 hover:border-gold/50">
            <p className="text-sm text-ink-muted">{card.label}</p>
            <p className="mt-3 text-4xl font-black tabular-nums text-ink">{card.value}</p>
            <p className="mt-3 text-sm leading-5 text-ink-muted">{card.description}</p>
            <span className="mt-5 inline-block text-sm font-semibold text-navy group-hover:text-gold">Open workspace →</span>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="panel p-6">
          <p className="eyebrow">Quick actions</p>
          <h2 className="heading-md mt-2 text-ink">Run the day-to-day</h2>
          <div className="mt-6 grid gap-3">
            <Link href="/admin/kyc" className="navy-button justify-between">Review KYC submissions <span aria-hidden="true">→</span></Link>
            <Link href="/admin/analytics" className="ghost-button justify-between">View visitor analytics <span aria-hidden="true">→</span></Link>
            <Link href="/admin/users" className="ghost-button justify-between">Manage investor accounts <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="panel p-6">
          <p className="eyebrow">Provisioning</p>
          <h2 className="heading-md mt-2 text-ink">Create investor account</h2>
          <p className="mt-3 text-sm leading-6 text-ink-muted">
            Create a Supabase Auth account after KYC approval and assign the editable dashboard asset value.
          </p>
          <AdminUserForm />
        </section>
      </div>
    </div>
  );
}

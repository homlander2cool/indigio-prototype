# ========== BEGIN SCRIPT ==========
$ErrorActionPreference = 'Stop'

# Create directories
$dirs = @(
  "pages\api\deals",
  "pages\api\dashboard",
  "pages\api\kyc",
  "pages\api\auth",
  "pages\deals",
  "components",
  "lib\cms",
  "sanity\schemas",
  "styles",
  "public\assets",
  "public\images",
  ".github\workflows"
)
foreach ($d in $dirs) {
  if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null }
}

function Write-FileUTF8($path, $content) {
  $dir = Split-Path $path -Parent
  if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  $content | Out-File -FilePath $path -Encoding utf8 -Force
}

# package.json
Write-FileUTF8 "package.json" @'
{
  "name": "indigio-prototype",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14",
    "react": "18",
    "react-dom": "18",
    "next-auth": "^4.22.1",
    "axios": "^1.4.0",
    "@sanity/client": "^4.6.0"
  },
  "devDependencies": {
    "typescript": "^5.2.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.21",
    "autoprefixer": "^10.4.14",
    "@lhci/cli": "^0.9.0"
  }
}
'@

# tailwind.config.js
Write-FileUTF8 "tailwind.config.js" @'
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          500: "#F59E0B"
        }
      }
    }
  },
  plugins: []
};
'@

# postcss.config.js
Write-FileUTF8 "postcss.config.js" @'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
'@

# styles/globals.css
Write-FileUTF8 "styles/globals.css" @'
@tailwind base;
@tailwind components;
@tailwind utilities;

/* basic body */
html, body, #__next { height: 100%; }
body { @apply bg-slate-50 text-slate-900; }
'@

# pages/_app.tsx
Write-FileUTF8 "pages\_app.tsx" @'
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/dist/shared/lib/utils";

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
'@

# pages/index.tsx
Write-FileUTF8 "pages\index.tsx" @'
import Link from "next/link";
import DealCard from "../components/DealCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [deals, setDeals] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/deals").then((r) => r.json()).then((d) => setDeals(d || []));
  }, []);

  return (
    <div>
      <header className="bg-gradient-to-br from-indigo-600 to-teal-400 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold">Real estate investing, reimagined.</h1>
              <p className="mt-4 text-lg text-indigo-100">Tokenized fractional ownership of institutional-grade properties with transparency, liquidity and compliance.</p>
              <div className="mt-6 flex gap-4">
                <a href="/kyc" className="inline-block bg-yellow-400 text-indigo-900 px-5 py-3 rounded-md font-semibold">Request Investor Pack</a>
                <a href="#how" className="inline-block border border-white/30 px-5 py-3 rounded-md">How it works</a>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="w-80 h-48 bg-white/10 rounded-lg flex items-center justify-center">
                <img src="/images/illustration-dashboard.png" alt="Dashboard preview" className="max-h-40" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <section id="how" className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold">Access</h3>
            <p className="mt-2 text-sm text-slate-600">Fractional shares of curated properties.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold">Liquidity</h3>
            <p className="mt-2 text-sm text-slate-600">Tradable token units on our marketplace.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold">Transparency</h3>
            <p className="mt-2 text-sm text-slate-600">On-chain records and regular reporting.</p>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Current offerings</h2>
            <Link href="/deals"><a className="text-indigo-600">View all deals</a></Link>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.slice(0,3).map(d => <DealCard key={d.slug} deal={d} />)}
          </div>
        </section>

        <section className="bg-slate-800 text-white p-8 rounded">
          <h3 className="text-lg font-semibold">Trusted by industry partners</h3>
          <div className="mt-4 flex gap-6 items-center text-sm opacity-80">
            <span>AuditFirm</span>
            <span>CustodyPartner</span>
            <span>LegalCounsel</span>
          </div>
        </section>
      </main>
    </div>
  );
}
'@

# pages/login.tsx
Write-FileUTF8 "pages\login.tsx" @'
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_DEMO_EMAIL || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    });
    setLoading(false);
    if (res?.ok) router.push("/dashboard");
    else alert("Login failed: check demo credentials (see README).");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm">Email</span>
            <input value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full rounded border px-3 py-2" />
          </label>
          <label className="block">
            <span className="text-sm">Password</span>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required className="mt-1 block w-full rounded border px-3 py-2" />
          </label>
          <div className="flex items-center justify-between">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <a href="/kyc" className="text-sm text-indigo-600">Start KYC</a>
          </div>
        </form>
        <p className="mt-4 text-xs text-slate-500">
          Demo credentials: see README (NEXT_PUBLIC_DEMO_EMAIL & DEMO_PASSWORD)
        </p>
      </div>
    </div>
  );
}
'@

# pages/kyc.tsx
Write-FileUTF8 "pages\kyc.tsx" @'
import { useState } from "react";
import axios from "axios";

export default function KycPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [document, setDocument] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function toBase64(file: File) {
    return await new Promise<string | null>((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result as string);
      reader.onerror = error => rej(error);
      reader.readAsDataURL(file);
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!document) return alert("Please upload ID document image");
    setLoading(true);
    try {
      const docBase64 = await toBase64(document);
      const payload = { firstName, lastName, dob, documentBase64: docBase64 };
      const r = await axios.post("/api/kyc/submit", payload);
      alert("KYC submitted. Result: " + r.data.result);
      localStorage.setItem("demo_kyc_status", r.data.result);
    } catch (err: any) {
      console.error(err);
      alert("KYC submit failed: " + (err?.message || "unknown"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-indigo-50 to-white">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-semibold mb-4">Identity verification (KYC)</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} className="border rounded px-3 py-2" required />
            <input placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} className="border rounded px-3 py-2" required />
          </div>
          <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="border rounded px-3 py-2" required />
          <label className="block">
            <span className="text-sm">Upload ID (passport / driver's license)</span>
            <input type="file" accept="image/*,application/pdf" onChange={e => setDocument(e.target.files ? e.target.files[0] : null)} className="mt-1" required />
          </label>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded" disabled={loading}>{loading ? "Submitting..." : "Submit KYC"}</button>
            <a className="text-sm text-slate-500" href="/login">Back to login</a>
          </div>
        </form>
        <p className="mt-4 text-xs text-slate-500">This is a prototype. Replace /api/kyc/submit with a call to your chosen KYC provider (Onfido, Jumio, etc.).</p>
      </div>
    </div>
  );
}
'@

# pages/dashboard.tsx
Write-FileUTF8 "pages\dashboard.tsx" @'
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [balances, setBalances] = useState<any[]>([]);
  const [kycStatus, setKycStatus] = useState("not_submitted");

  useEffect(()=> {
    fetch("/api/dashboard/balances").then(r=>r.json()).then(setBalances);
    const demo = localStorage.getItem("demo_kyc_status"); if (demo) setKycStatus(demo);
  },[]);

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Investor Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm">{session?.user?.email}</div>
          <button onClick={() => signOut()} className="text-sm text-red-600">Sign out</button>
        </div>
      </header>

      <main className="mt-8 grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white p-6 rounded shadow">
          <h2 className="font-semibold">Portfolio</h2>
          <div className="mt-4 space-y-3">
            {balances.map(b => (
              <div key={b.symbol} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{b.name} <span className="text-sm text-slate-500">({b.symbol})</span></div>
                  <div className="text-sm text-slate-500">{b.balance} tokens</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${(b.balance * b.price).toFixed(2)}</div>
                  <div className="text-sm text-slate-500">${b.price.toFixed(2)} / token</div>
                </div>
              </div>
            ))}
            {balances.length === 0 && <div className="text-sm text-slate-500">No tokens yet.</div>}
          </div>
        </section>

        <aside className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold">KYC status</h3>
          <div className="mt-2 font-medium">{kycStatus}</div>
          {kycStatus === "not_submitted" && <a href="/kyc" className="mt-4 inline-block text-indigo-600">Start KYC</a>}
        </aside>
      </main>
    </div>
  );
}
'@

# components/DealCard.tsx (now complete)
Write-FileUTF8 "components\DealCard.tsx" @'
import Link from "next/link";

export default function DealCard({ deal }: { deal: any }) {
  return (
    <article className="bg-white rounded-md p-4 shadow">
      <img src={deal.image || "/images/property-placeholder.jpg"} alt={deal.title} className="w-full h-40 object-cover rounded" />
      <h3 className="mt-3 font-semibold">{deal.title}</h3>
      <p className="mt-1 text-sm text-slate-500">{deal.location}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-bold">${deal.price?.toLocaleString()}</span>
        <Link href={`/deals/${deal.slug}`} className="text-indigo-600 text-sm">View</Link>
      </div>
    </article>
  );
}
'@

# Now add, commit, and push everything
Write-Host "All files created. Staging and pushing..." -ForegroundColor Green
git add .
git commit -m "feat: scaffold Indigio prototype (home, deals, auth, KYC, CMS examples, dashboard)"
git push -u origin feature/indigio-full

Write-Host "✅ DONE! Your feature branch is pushed." -ForegroundColor Green
# ========== END SCRIPT ==========
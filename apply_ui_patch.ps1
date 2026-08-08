# apply_ui_patch.ps1
# Run this in the root of your cloned repo, on branch feature/indigio-full
# Usage:
#   git checkout feature/indigio-full
#   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
#   ./apply_ui_patch.ps1

param()
$ErrorActionPreference = 'Stop'

function Write-UTF8([string]$path, [string]$content) {
  $dir = Split-Path $path -Parent
  if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  $content | Out-File -LiteralPath $path -Encoding utf8 -Force
  Write-Host "Wrote $path"
}

# Ensure on the desired branch (create if missing)
$branch = "feature/indigio-full"
$current = (git rev-parse --abbrev-ref HEAD).Trim()
if ($current -ne $branch) {
  if (git rev-parse --verify $branch 2>$null) {
    git checkout $branch
  } else {
    git checkout -b $branch
  }
}

Write-Host "Applying UI patch on branch $branch..."

# 1) _app: add header/footer wrapper and keep SessionProvider
Write-UTF8 "pages/_app.tsx" @"
import '../styles/globals.css';
import type { AppType } from 'next/dist/shared/lib/utils';
import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <div className='min-h-screen flex flex-col'>
        <Header />
        <main className='flex-grow'>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </SessionProvider>
  );
};

export default MyApp;
"@

# 2) Header component
Write-UTF8 "components/Header.tsx" @"
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className='bg-white shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <div className='flex items-center gap-4'>
            <Link href='/' className='text-xl font-bold text-indigo-700'>Indigio</Link>
            <nav className='hidden md:flex gap-4 text-sm text-slate-600'>
              <Link href='/deals' className='hover:text-indigo-600'>Deals</Link>
              <a href='#how' className='hover:text-indigo-600'>How it works</a>
            </nav>
          </div>

          <div className='flex items-center gap-3'>
            <Link href='/kyc' className='hidden sm:inline-block bg-yellow-400 text-indigo-900 px-4 py-2 rounded-md font-semibold'>Request Investor Pack</Link>
            <Link href='/login' className='text-sm text-indigo-600'>Sign in</Link>

            <button className='md:hidden ml-2 p-2' onClick={() => setOpen(!open)} aria-label='Toggle menu'>
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M3 6h14M3 10h14M3 14h14' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/></svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className='md:hidden border-t'>
          <div className='px-4 py-3 space-y-2'>
            <Link href='/deals' className='block'>Deals</Link>
            <Link href='/kyc' className='block'>Request Investor Pack</Link>
            <Link href='/login' className='block'>Sign in</Link>
          </div>
        </div>
      )}
    </header>
  );
}
"@

# 3) Footer component
Write-UTF8 "components/Footer.tsx" @"
export default function Footer(){
  return (
    <footer className='bg-slate-50 border-t mt-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-slate-500'>
        © {new Date().getFullYear()} Indigio — Prototype. All rights reserved.
      </div>
    </footer>
  );
}
"@

# 4) Improved DealCard (responsive, Link usage fixed)
Write-UTF8 "components/DealCard.tsx" @"
import Link from 'next/link';

export default function DealCard({ deal }: { deal: any }) {
  return (
    <article className='bg-white rounded-md p-4 shadow hover:shadow-md transition'>
      <div className='w-full h-40 bg-slate-100 rounded overflow-hidden flex items-center justify-center'>
        <img src={deal.image || '/images/prop1.jpg'} alt={deal.title} className='w-full h-full object-cover' />
      </div>
      <h3 className='mt-3 font-semibold text-lg'>{deal.title}</h3>
      <p className='mt-1 text-sm text-slate-500'>{deal.location}</p>

      <div className='mt-3 flex items-center justify-between'>
        <div>
          <div className='text-xs text-slate-500'>Target IRR</div>
          <div className='font-medium'>{deal.targetIrr}</div>
        </div>
        <Link href={`/deals/${deal.slug}`} className='text-indigo-600 text-sm'>View deal</Link>
      </div>

      <div className='mt-3'>
        <div className='w-full bg-slate-100 rounded-full h-2'>
          <div className='bg-indigo-600 h-2 rounded-full' style={{ width: '30%' }}></div>
        </div>
        <div className='mt-1 text-xs text-slate-500'>Raised: {deal.raised} / {deal.target}</div>
      </div>
    </article>
  );
}
"@

# 5) Fix index: use Header, hero improvements, responsive grid
Write-UTF8 "pages/index.tsx" @"
import Link from 'next/link';
import DealCard from '../components/DealCard';
import { useEffect, useState } from 'react';

export default function Home() {
  const [deals, setDeals] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/deals').then(r => r.json()).then(d => setDeals(d || []));
  }, []);

  return (
    <div>
      <header className='bg-gradient-to-br from-indigo-600 to-teal-400 text-white'>
        <div className='max-w-7xl mx-auto px-6 py-20 sm:py-28'>
          <div className='lg:flex lg:items-center lg:justify-between gap-8'>
            <div className='max-w-2xl'>
              <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight'>Real estate investing, reimagined.</h1>
              <p className='mt-4 text-lg text-indigo-100'>Tokenized fractional ownership of institutional-grade properties with transparency, liquidity and compliance.</p>
              <div className='mt-6 flex flex-col sm:flex-row sm:items-center gap-3'>
                <Link href='/kyc' className='inline-block bg-yellow-400 text-indigo-900 px-5 py-3 rounded-md font-semibold'>Request Investor Pack</Link>
                <Link href='#how' className='inline-block border border-white/30 px-5 py-3 rounded-md text-white/90'>How it works</Link>
              </div>
            </div>

            <div className='mt-8 lg:mt-0 w-full max-w-md'>
              <div className='w-full h-56 bg-white/10 rounded-lg flex items-center justify-center'>
                <img src='/images/illustration-dashboard.png' alt='Dashboard preview' className='max-h-52 object-contain' />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-6 py-12 space-y-12'>
        <section id='how' className='grid lg:grid-cols-3 gap-6'>
          <div className='bg-white p-6 rounded shadow'>
            <h3 className='font-semibold'>Access</h3>
            <p className='mt-2 text-sm text-slate-600'>Fractional shares of curated properties.</p>
          </div>
          <div className='bg-white p-6 rounded shadow'>
            <h3 className='font-semibold'>Liquidity</h3>
            <p className='mt-2 text-sm text-slate-600'>Tradable token units on our marketplace.</p>
          </div>
          <div className='bg-white p-6 rounded shadow'>
            <h3 className='font-semibold'>Transparency</h3>
            <p className='mt-2 text-sm text-slate-600'>On-chain records and regular reporting.</p>
          </div>
        </section>

        <section>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>Current offerings</h2>
            <Link href='/deals' className='text-indigo-600'>View all deals</Link>
          </div>

          <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {deals.slice(0,9).map((d:any) => <DealCard key={d.slug} deal={d} />)}
            {deals.length === 0 && <div className='text-sm text-slate-500'>No deals yet.</div>}
          </div>
        </section>
      </main>
    </div>
  );
}
"@

# 6) Fix /deals index Link usage
Write-UTF8 "pages/deals/index.tsx" @"
import { useEffect, useState } from 'react';
import DealCard from '../../components/DealCard';
import Link from 'next/link';

export default function DealsPage() {
  const [deals, setDeals] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/deals').then(r => r.json()).then(d => setDeals(d || []));
  }, []);
  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Open Offerings</h1>
        <Link href='/' className='text-sm text-slate-500'>Back home</Link>
      </div>

      <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {deals.map(d => <DealCard key={d.slug} deal={d} />)}
      </div>
    </div>
  );
}
"@

# 7) Fix deal detail Link usage and layout
Write-UTF8 "pages/deals/[slug].tsx" @"
import { GetServerSideProps } from 'next';
import Link from 'next/link';

export default function DealPage({ deal }: { deal: any }) {
  if (!deal) return <div className='p-8'>Deal not found</div>;

  return (
    <div className='max-w-5xl mx-auto px-6 py-12'>
      <div className='grid lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2'>
          <img src={deal.image || '/images/prop1.jpg'} alt={deal.title} className='w-full h-72 object-cover rounded' />
          <h1 className='text-2xl font-semibold mt-6'>{deal.title}</h1>
          <p className='mt-3 text-slate-600'>{deal.description}</p>

          <section className='mt-6 bg-white p-4 rounded shadow'>
            <h3 className='font-semibold'>Deal highlights</h3>
            <ul className='mt-3 space-y-2 text-sm text-slate-700'>
              <li>Target IRR: {deal.targetIrr}</li>
              <li>Minimum investment: {deal.minInvestment}</li>
              <li>Token symbol: {deal.tokenSymbol}</li>
            </ul>
          </section>
        </div>

        <aside className='space-y-4'>
          <div className='bg-white p-4 rounded shadow'>
            <div className='text-sm text-slate-500'>Raise progress</div>
            <div className='mt-2 text-xl font-semibold'>{deal.raised} / {deal.target}</div>
            <div className='mt-4'>
              <form onSubmit={(e)=>{ e.preventDefault(); alert('Requesting investor pack...'); }}>
                <button className='w-full bg-indigo-600 text-white px-4 py-2 rounded'>Request Investor Pack</button>
              </form>
            </div>
          </div>

          <div className='bg-white p-4 rounded shadow'>
            <h4 className='font-semibold'>Financials</h4>
            <div className='mt-2 text-sm text-slate-700'>Projected cashflows and breakdown available in the investor pack</div>
          </div>

          <Link href='/deals' className='text-sm text-slate-500'>Back to deals</Link>
        </aside>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const slug = ctx.params?.slug as string;
  const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/deals/${slug}`);
  const data = await res.json();
  return { props: { deal: data || null } };
};
"@

# 8) Fix login Link usage (remove nested anchor)
Write-UTF8 "pages/login.tsx" @"
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_DEMO_EMAIL || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    });
    setLoading(false);
    if (res?.ok) router.push('/dashboard');
    else alert('Login failed: check demo credentials (see README).');
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-6'>
      <div className='w-full max-w-md bg-white rounded-xl shadow p-8'>
        <h1 className='text-2xl font-semibold mb-4'>Sign in</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <label className='block'>
            <span className='text-sm'>Email</span>
            <input value={email} onChange={e => setEmail(e.target.value)} required className='mt-1 block w-full rounded border px-3 py-2' />
          </label>
          <label className='block'>
            <span className='text-sm'>Password</span>
            <input value={password} onChange={e => setPassword(e.target.value)} type='password' required className='mt-1 block w-full rounded border px-3 py-2' />
          </label>
          <div className='flex items-center justify-between'>
            <button type='submit' disabled={loading} className='px-4 py-2 bg-indigo-600 text-white rounded'>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            <Link href='/kyc' className='text-sm text-indigo-600'>Start KYC</Link>
          </div>
        </form>
        <p className='mt-4 text-xs text-slate-500'>
          Demo credentials: see README (NEXT_PUBLIC_DEMO_EMAIL & DEMO_PASSWORD)
        </p>
      </div>
    </div>
  );
}
"@

# (Optional) 9) Small safety: ensure pages/api/deals exists (do not modify)
# 10) Commit & push
git add .
git commit -m "chore(ui): responsive header, hero, deal card, fix Link usage (Next14 compatible)"
git push -u origin $branch

Write-Host "UI patch applied and pushed to origin/$branch"
Write-Host "Run: npm run dev  --> then open http://localhost:3000 to preview"
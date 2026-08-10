import Image from 'next/image';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[var(--text-default)]">
      <header className="sticky top-0 bg-white/60 backdrop-blur-md z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="RBC" className="h-10 w-auto" />
            <span className="font-semibold text-lg text-[var(--brand-dark)]">RBC</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-[var(--brand-dark)]">
            <a href="#" className="">Personal</a>
            <a href="#" className="">Business</a>
            <a href="#" className="">Wealth</a>
            <a href="#" className="btn-ghost">Open Account</a>
          </nav>
        </div>
      </header>

      <Hero />

      <main className="max-w-6xl mx-auto px-6 py-20">
        <section className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-[var(--brand-dark)]">Our Core Pillars</h2>
          <p className="mt-3 text-md text-[var(--text-muted)]">Driving the future of global finance through stability, security, and technology.</p>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          <article className="bg-white p-6 rounded-xl shadow-card">
            <h3 className="font-semibold text-[var(--brand-dark)]">Global Reach</h3>
            <p className="mt-2 text-sm text-[var(--text-muted)]">Unparalleled international presence with networks across 190 countries, ensuring you're always connected to wealth opportunities.</p>
          </article>
          <article className="bg-white p-6 rounded-xl shadow-card">
            <h3 className="font-semibold text-[var(--brand-dark)]">Secure Legacy</h3>
            <p className="mt-2 text-sm text-[var(--text-muted)]">Built on a heritage of trust. Our gold-standard encryption keeps your assets safe and your future secure.</p>
          </article>
          <article className="bg-white p-6 rounded-xl shadow-card">
            <h3 className="font-semibold text-[var(--brand-dark)]">Digital Innovation</h3>
            <p className="mt-2 text-sm text-[var(--text-muted)]">Future-forward financial tools that streamline your asset management with unmatched speed, clarity, and intelligence.</p>
          </article>
        </section>

        <section className="mt-24 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-extrabold text-[var(--brand-dark)]">A Symbol of Strength and Unwavering Trust</h3>
            <p className="mt-4 text-[var(--text-muted)]">For generations, the lion has represented courage, while the globe symbolizes our boundless global ambition. We combine this rich heritage with cutting-edge financial engineering.</p>

            <blockquote className="mt-6 p-4 bg-white rounded-lg shadow-sm border-l-4 border-[var(--brand-gold)]">
              <em className="text-sm text-[var(--brand-dark)]">"We don't just manage wealth; we empower legacies that transcend borders."</em>
            </blockquote>

            <p className="mt-6 text-[var(--text-muted)]">Whether you are an individual seeking sustained growth, or a multinational corporation navigating complex markets, RBC provides the institutional stability of a legacy bank with the agility of a modern digital partner.</p>
          </div>

          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img src="/sample-buildings.jpg" alt="Skyscrapers" className="w-full h-80 object-cover" />
              <div className="p-4 bg-gradient-to-t from-black/40 to-transparent text-white absolute bottom-4 left-4 rounded-md">RBC Financial</div>
            </div>
          </div>
        </section>

        <section className="mt-20 text-center bg-gray-50 py-16 rounded-xl">
          <h3 className="text-xl font-extrabold text-[var(--brand-dark)]">Ready to build your financial future?</h3>
          <p className="mt-3 text-[var(--text-muted)]">Join thousands of investors and global leaders who trust RBC to secure and grow their assets across borders.</p>
          <div className="mt-6">
            <a href="#" className="btn-primary">Get Started Today</a>
          </div>
        </section>

      </main>

      <footer className="bg-white mt-12 text-[var(--text-muted)]">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-semibold text-[var(--brand-dark)]">RBC</h4>
            <p className="mt-2 text-sm">Global banking powered by innovation, secured by a century of trust and heritage.</p>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--brand-dark)]">Company</h4>
            <ul className="mt-2 text-sm space-y-2">
              <li>About Us</li>
              <li>Careers</li>
              <li>Investor Relations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--brand-dark)]">Products</h4>
            <ul className="mt-2 text-sm space-y-2">
              <li>Digital Banking</li>
              <li>Wealth Mgmt</li>
              <li>Corporate Lending</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--brand-dark)]">Support</h4>
            <ul className="mt-2 text-sm space-y-2">
              <li>Contact</li>
              <li>Help Center</li>
              <li>Security</li>
            </ul>
          </div>
        </div>

        <div className="border-t py-6 text-center text-xs text-[var(--text-muted)]">© 2026 RBC Global Financial. All rights reserved.</div>
      </footer>
    </div>
  );
}

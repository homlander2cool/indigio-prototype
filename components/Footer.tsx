import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#071a2b] pt-20 pb-8 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 md:grid-cols-4">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="RBC Private Bank logo"
              width={220}
              height={150}
              className="h-11 w-auto object-contain"
            />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-slate-300">
            Global wealth stewardship for founders, families, and institutions seeking confidence, discretion, and long-term growth.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#f2d686]">Company</h4>
          <ul className="space-y-3 text-sm text-slate-300">
            <li><a href="#" className="transition hover:text-white">About Us</a></li>
            <li><a href="#" className="transition hover:text-white">Advisory</a></li>
            <li><a href="#" className="transition hover:text-white">Investor Relations</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#f2d686]">Solutions</h4>
          <ul className="space-y-3 text-sm text-slate-300">
            <li><a href="#" className="transition hover:text-white">Private Wealth</a></li>
            <li><a href="#" className="transition hover:text-white">Capital Advisory</a></li>
            <li><a href="#" className="transition hover:text-white">Portfolio Strategy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#f2d686]">Support</h4>
          <ul className="space-y-3 text-sm text-slate-300">
            <li><a href="#" className="transition hover:text-white">Contact</a></li>
            <li><a href="#" className="transition hover:text-white">Help Center</a></li>
            <li><a href="#" className="transition hover:text-white">Security</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 px-6 pt-8 text-xs text-slate-400 md:flex-row">
        <span>© 2026 RBC Private Wealth. All rights reserved.</span>
        <span className="flex gap-6">
          <a href="#" className="transition hover:text-white">Privacy Policy</a>
          <a href="#" className="transition hover:text-white">Terms of Service</a>
        </span>
      </div>
    </footer>
  );
}

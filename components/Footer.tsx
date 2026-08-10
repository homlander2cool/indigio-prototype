import Link from "next/link";
import Logo from "@/components/Logo";
import { footerNav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="on-dark mt-auto bg-navy-deep text-white">
      <div className="container-page grid gap-10 px-4 pb-14 pt-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <Logo tone="onDark" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-300">
            Global wealth stewardship for founders, families, and institutions
            seeking confidence, discretion, and long-term growth.
          </p>
          <Link href="/kyc" className="gold-button mt-6 !min-h-0 px-5 py-2.5 text-xs">
            Open an account
          </Link>
        </div>

        {footerNav.map((group) => (
          <nav key={group.heading} aria-labelledby={`footer-${group.heading}`}>
            <h2
              id={`footer-${group.heading}`}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light"
            >
              {group.heading}
            </h2>
            <ul className="space-y-3 text-sm text-slate-300">
              {group.links.map((link) => (
                <li key={`${group.heading}-${link.href}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="inline-block transition hover:translate-x-0.5 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 px-4 py-7 text-xs text-slate-400 sm:px-6 md:flex-row lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}. Prototype for demonstration
            only — not an offer to sell securities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/kyc" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/kyc" className="transition hover:text-white">
              Terms of Service
            </Link>
            <Link href="/login" className="transition hover:text-white">
              Client login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

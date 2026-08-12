import Link from "next/link";

type HeroBannerProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  action?: React.ReactNode;
  /** Optional page-subject accent label, e.g. "Projects — Mining". */
  meta?: string;
};

/**
 * Interior-page hero: dark navy stage with the grid overlay, used by every
 * content page so the whole site shares one banner language with the homepage.
 */
export default function HeroBanner({ eyebrow, title, lede, action, meta }: HeroBannerProps) {
  return (
    <section className="on-dark bg-navy-gradient relative overflow-hidden text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative z-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <li>
              <Link href="/" className="transition hover:text-gold-light">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            {meta && (
              <>
                <li>
                  <Link href="/projects" className="transition hover:text-gold-light">
                    Projects
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
              </>
            )}
            <li aria-current="page" className="font-semibold text-gold-light">
              {meta ?? title}
            </li>
          </ol>
        </nav>

        <p className="eyebrow-gold text-[11px] font-semibold uppercase tracking-[0.28em]">
          {eyebrow}
        </p>
        <h1 className="heading-xl mt-4 max-w-3xl text-white">{title}</h1>
        {lede && <p className="lede mt-5 max-w-2xl">{lede}</p>}
        {action && <div className="mt-8 flex flex-wrap gap-3">{action}</div>}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-gold" aria-hidden="true" />
    </section>
  );
}
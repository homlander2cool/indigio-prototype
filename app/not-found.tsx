import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page section">
      <div className="mx-auto max-w-xl rounded-panel border border-line bg-white p-10 text-center shadow-panel">
        <p className="eyebrow">404</p>
        <h1 className="heading-lg mt-4 text-ink">Page not found</h1>
        <p className="lede mt-4 !text-base">
          The page you are looking for has moved, or never existed. The
          opportunities below are still open.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="gold-button justify-center">
            Back to home
          </Link>
          <Link href="/deals" className="ghost-button justify-center">
            Browse deals
          </Link>
        </div>
      </div>
    </div>
  );
}
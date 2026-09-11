import Link from "next/link";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** Primary action rendered to the right on wide screens. */
  action?: React.ReactNode;
  align?: "start" | "center";
  breadcrumb?: string;
};

/** Shared page masthead, so every route's heading block matches. */
export default function PageHeader({
  eyebrow,
  title,
  description,
  action,
  align = "start",
  breadcrumb = eyebrow,
}: PageHeaderProps) {
  const centered = align === "center";

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
          <li><Link href="/" className="transition hover:text-navy">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-semibold text-ink">{breadcrumb}</li>
        </ol>
      </nav>
      <div
        className={`flex flex-col gap-5 ${
          centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
        }`}
      >
      <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="heading-lg mt-3 text-ink">{title}</h1>
        {description && <p className="lede mt-4">{description}</p>}
      </div>

      {action && <div className="flex shrink-0 flex-wrap gap-3">{action}</div>}
      </div>
    </>
  );
}

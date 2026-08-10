type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** Primary action rendered to the right on wide screens. */
  action?: React.ReactNode;
  align?: "start" | "center";
};

/** Shared page masthead, so every route's heading block matches. */
export default function PageHeader({
  eyebrow,
  title,
  description,
  action,
  align = "start",
}: PageHeaderProps) {
  const centered = align === "center";

  return (
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
  );
}

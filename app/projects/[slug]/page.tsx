import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projectSectors } from "@/lib/projects";

type PageProps = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSectors.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const otherProjects = projectSectors.filter((item) => item.slug !== project.slug);

  return (
    <div className="container-page section">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          <li>
            <Link href="/" className="transition hover:text-navy">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/projects" className="transition hover:text-navy">
              Projects
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-semibold text-ink">
            {project.name}
          </li>
        </ol>
      </nav>

      <div className="overflow-hidden rounded-panel border border-line bg-canvas-ivory shadow-lifted">
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-canvas-deep sm:aspect-[16/7]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <p className="eyebrow-gold text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-light">
              Projects — {project.name}
            </p>
            <h1 className="heading-xl mt-3 max-w-3xl text-white">{project.tagline}</h1>
          </div>
        </div>

        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="min-w-0">
            <p className="lede">{project.description}</p>

            <div className="mt-10 space-y-10">
              {project.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="border-b border-line pb-3 heading-md text-ink">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph, index) => (
                      <p key={index} className="text-base leading-7 text-ink-muted">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <aside className="lg:border-l lg:border-line lg:pl-10">
            <div className="lg:sticky lg:top-28">
              <p className="metric-label">Explore more projects</p>
              <ul className="mt-5 space-y-3">
                {otherProjects.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/projects/${item.slug}`}
                      className="group flex items-center gap-4 rounded-card border border-line bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-panel"
                    >
                      <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-canvas-deep">
                        <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-ink">
                          {item.name}
                        </span>
                        <span className="mt-1 block truncate text-xs text-ink-muted">
                          {item.tagline}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="on-dark mt-8 rounded-card bg-navy p-5 text-white">
                <p className="eyebrow-gold text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Investor note
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-200">
                  Access to these private-market opportunities is available to
                  verified investors after onboarding and KYC review. Contact us
                  to discuss your portfolio.
                </p>
                <Link
                  href="/contact"
                  className="gold-button mt-5 !min-h-0 px-5 py-2.5 text-xs"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

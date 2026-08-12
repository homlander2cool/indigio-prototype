import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { projectSectors } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Indigio operates and invests across Mining, Agriculture, Oil & Gas and Philanthropy — connecting clients to private-market opportunities worldwide.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsIndexPage() {
  return (
    <div className="container-page section">
      <PageHeader
        eyebrow="Projects"
        title="Private-market opportunities worldwide"
        description="Beyond tokenized real estate, the Indigio platform highlights projects across mining, agriculture, oil & gas, and philanthropy — connecting clients to global private-market opportunities."
      />

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {projectSectors.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="panel group flex h-full flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lifted"
            >
              <div className="relative h-52 w-full overflow-hidden bg-canvas-deep">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <p className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                  {project.name}
                </p>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="heading-md text-ink">{project.tagline}</h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-ink-muted">
                  {project.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep transition group-hover:gap-2.5">
                  Explore {project.name}
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

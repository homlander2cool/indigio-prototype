import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "RBC Indigio is a private-wealth platform with a long and special history in investing and risk taking across mining, agriculture, oil & gas, real estate, and construction & engineering.",
  alternates: { canonical: "/about" },
};

const milestones = [
  { year: "1966", label: "First major iron ore mine developed from original discoveries" },
  { year: "1992", label: "State Agreement secured for the Hope Downs tenements" },
  { year: "2005", label: "Hope Downs Joint Venture entered with Rio Tinto (50/50)" },
  { year: "2016", label: "Majority joint venture purchase of S. Kidman & Co" },
];

export default function AboutPage() {
  return (
    <div className="container-page section">
      <PageHeader
        eyebrow="About us"
        title={`About ${site.name}`}
        description={`Established on a long and special history of investing and risk taking, ${site.name} is a private-wealth platform that brings mineral resources, Oil & Gas, Construction & Engineering and agricultural products to market.`}
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="space-y-6 text-base leading-7 text-ink-muted">
          <p>
            <strong className="text-ink">{site.name}</strong> (Indigio PTY. LTD.
            | ACN: 632 901 761) is recognised as discovering iron ore during its
            famous &ldquo;flight of discovery&rdquo; — spending more than eight
            years endeavouring to persuade government to lift bans on export and
            tenements that had stymied the industry, and becoming known as the
            flying prospector for being the first to use light fixed-wing
            aircraft to explore successfully for minerals.
          </p>

          <p>
            A progression of ten major iron ore mines (the first in 1966) has
            been developed from those original discoveries. In December 1992, a
            State Agreement secured the Hope Downs tenements; in July 2005 the
            Hope Downs Joint Venture with Rio Tinto (a 50/50 joint venture) was
            entered after bankable feasibility studies. First production from
            Hope North began in late 2007, followed by Hope South a year later,
            and eventually the Hope 4 mine.
          </p>

          <p>
            Roy Hill is the Partners&rsquo; majority-owned US$10 billion mega
            iron ore operation, which has ramped up to become the country&rsquo;s
            single largest iron ore mine producing 55 million tonnes of ore per
            annum — with its own integrated high-grade mine, a 344km heavy haul
            railway system and purpose-built port facilities. The HPPL Group
            remains the majority owner of Roy Hill Holdings with a 70% equity
            interest.
          </p>

          <p>
            The Group&rsquo;s investments bring together the mining and
            agricultural arms of the business. HPPL owns interests in multiple
            premium cattle stations, expanded into wagyu beef and partnered with
            award-winning dairy producers. Its majority joint venture purchase of
            S. Kidman & Co in December 2016 retained an iconic business in
            majority ownership and echoed the pioneering spirit of its founder.
          </p>
        </div>

        <aside className="space-y-6">
          <figure className="relative m-0 h-64 w-full overflow-hidden rounded-panel shadow-lifted">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
              alt="Financial district skyline"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent"
              aria-hidden="true"
            />
            <figcaption className="absolute bottom-5 left-5 text-white">
              <span className="block text-[10px] font-light uppercase tracking-[0.2em] opacity-80">
                Headquarters
              </span>
              <span className="mt-1 block text-lg font-bold text-gold-light">
                Rathausgasse 25, 3011 Bern, Switzerland
              </span>
            </figcaption>
          </figure>

          <div className="panel p-6">
            <p className="metric-label">Milestones</p>
            <ul className="mt-4 space-y-4">
              {milestones.map((milestone) => (
                <li key={milestone.year} className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-md bg-gold/15 px-2 py-0.5 text-xs font-black tabular-nums text-gold-deep">
                    {milestone.year}
                  </span>
                  <span className="text-sm leading-6 text-ink-muted">{milestone.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="on-dark rounded-panel bg-navy p-6 text-white shadow-lifted">
            <p className="eyebrow-gold text-[10px] font-semibold uppercase tracking-[0.26em]">
              Work with us
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              Whether you are an individual seeking sustained growth or an
              institution navigating complex markets, we provide the stability of
              a legacy house with the agility of a modern digital partner.
            </p>
            <Link href="/contact" className="gold-button mt-5 !min-h-0 px-5 py-2.5 text-xs">
              Contact us
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

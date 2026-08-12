import { getDeals } from "@/lib/data";
import { projectSectors } from "@/lib/projects";

/**
 * Assistant knowledge + message builder. Runs server-side only: the system
 * prompt is assembled here so the model can answer questions about what's
 * actually on the platform (live deals from the database, company facts,
 * how the site works) rather than hallucinating.
 */

const COMPANY_CONTEXT = `You are ${"Indigio Assistant"}, the concierge for Indigio (RBC Indigio), a private wealth and tokenized real-estate investment platform headquartered at Rathausgasse 25, 3011 Bern, Switzerland.

About Indigio:
- A global private-wealth platform focused on preserving and growing wealth across borders.
- Core offering: tokenized real-estate investing — fractional ownership, transparent reporting, and institutional access for private clients.
- Beyond real estate, the platform highlights projects across mining, agriculture, oil & gas, and philanthropy, connecting clients to private-market opportunities worldwide.
- Onboarding: investors complete KYC verification (identity, address proof, source of funds) before investing; reviews typically clear within 24-48 hours.
- Navigation: Home (/), Projects (/projects — with Mining, Agriculture, Oil & Gas, Philanthropy under /projects/[slug]), Deals (/deals — tokenized real-estate opportunities), About us (/about), Dashboard (/dashboard — investor portfolio), KYC onboarding (/kyc), and Contact (/contact). The customer portal signs in at /login.
- Contact can be made via /contact; the investor portal is at /login.

Your job: help visitors and clients navigate the site, understand deals, projects, KYC, the dashboard, and company positioning. Be concise, warm, and professional. Answer only using the context provided plus general knowledge. Never invent specific numbers, returns, or guarantees. If you don't know, say so and point them to the contact page.

Compliance: this is a demonstration platform. Always include, where relevant, that nothing here is investment advice or an offer of securities. Mark clearly that past performance does not guarantee future results.`;

/** Builds the full message list sent to the model: system + live context + history. */
export async function buildAssistantMessages(
  history: { role: "user" | "assistant"; content: string }[],
): Promise<{ role: "system" | "user" | "assistant"; content: string }[]> {
  const deals = await getDeals();

  const liveDeals = deals
    .map((deal) => {
      const progress = Math.round((deal.raisedUsd / deal.targetUsd) * 100);
      return `- ${deal.title} (${deal.category} / ${deal.location}): target IRR ${deal.targetIrrPct}%, projected yield ${deal.projectedYieldPct}%, raise ${progress}% complete, term ${deal.termMonths} months.`;
    })
    .join("\n");

  const projectLines = projectSectors
    .map((project) => {
      const highlights = project.sections
        .slice(0, 3)
        .map((section) => `${section.heading}: ${section.body[0]}`)
        .join(" | ");
      return `- ${project.name} (${project.slug}): ${highlights}`;
    })
    .join("\n");

  const context = `Live opportunities currently on the platform:\n${
    liveDeals || "No deals are currently listed."
  }\n\nSector projects on the platform (each has a page at /projects/<slug>):\n${
    projectLines || "No projects are currently listed."
  }\n\nAnswer questions using these facts when they relate to specific opportunities or projects.`;

  return [
    { role: "system", content: COMPANY_CONTEXT },
    { role: "system", content: context },
    ...history.slice(-12),
  ];
}
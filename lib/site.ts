/** Shared site metadata and navigation, so copy and routes live in one place. */

export const site = {
  name: "RBC Indigio",
  shortName: "RBC",
  tagline: "Global Wealth Reimagined",
  description:
    "Tokenized real-estate investing for private clients — institutional access, KYC-verified onboarding, and transparent portfolio reporting, alongside private-market projects in mining, agriculture, oil & gas and philanthropy.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  logoAlt: "RBC Private Wealth",
} as const;

export type NavLink = {
  href: string;
  label: string;
  /** Translation key in the messages catalogs (nav.*, footer.*, about.*). */
  key: string;
  /** Matches nested routes too, e.g. /deals/[slug] highlights "Deals". */
  matchPrefix?: boolean;
};

export const primaryNav: NavLink[] = [
  { href: "/", label: "Home", key: "home" },
  { href: "/projects", label: "Projects", key: "projects", matchPrefix: true },
  { href: "/deals", label: "Deals", key: "deals", matchPrefix: true },
  { href: "/about", label: "About us", key: "about" },
  { href: "/contact", label: "Contact", key: "contact" },
];

export const projectNav: NavLink[] = [
  { href: "/projects/mining", label: "Mining", key: "mining" },
  { href: "/projects/agriculture", label: "Agriculture", key: "agriculture" },
  { href: "/projects/oil-and-gas", label: "Oil and gas", key: "oilAndGas" },
  { href: "/projects/philanthropy", label: "Philanthropy", key: "philanthropy" },
];

export const aboutNav: NavLink[] = [
  { href: "/about", label: "About us", key: "about" },
  { href: "/about#milestones", label: "Our history", key: "history" },
  { href: "/contact", label: "Contact us", key: "contact" },
];

export const footerNav: { headingKey: string; links: NavLink[] }[] = [
  {
    headingKey: "projects",
    links: [
      { href: "/projects/mining", label: "Mining", key: "mining" },
      { href: "/projects/agriculture", label: "Agriculture", key: "agriculture" },
      { href: "/projects/oil-and-gas", label: "Oil and gas", key: "oilAndGas" },
      { href: "/projects/philanthropy", label: "Philanthropy", key: "philanthropy" },
    ],
  },
  {
    headingKey: "platform",
    links: [
      { href: "/deals", label: "Browse deals", key: "browseDeals" },
      { href: "/kyc", label: "KYC onboarding", key: "kycOnboarding" },
    ],
  },
  {
    headingKey: "company",
    links: [
      { href: "/about", label: "About us", key: "aboutUs" },
      { href: "/contact", label: "Contact us", key: "contactUs" },
      { href: "/#pillars", label: "Why Indigio", key: "whyIndigio" },
    ],
  },
  {
    headingKey: "account",
    links: [
      { href: "/login", label: "Sign in", key: "signIn" },
      { href: "/kyc", label: "Open an account", key: "openAccountLink" },
      { href: "/contact", label: "Request investor pack", key: "requestPack" },
    ],
  },
];

/** True when `pathname` should highlight `link` in the nav. */
export function isActiveLink(pathname: string, link: NavLink): boolean {
  if (link.href === "/") return pathname === "/";
  if (link.matchPrefix) return pathname === link.href || pathname.startsWith(`${link.href}/`);
  return pathname === link.href;
}

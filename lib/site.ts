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
  /** Matches nested routes too, e.g. /deals/[slug] highlights "Deals". */
  matchPrefix?: boolean;
};

export const primaryNav: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects", matchPrefix: true },
  { href: "/deals", label: "Deals", matchPrefix: true },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
  { href: "/dashboard", label: "Dashboard" },
];

export const projectNav: NavLink[] = [
  { href: "/projects/mining", label: "Mining" },
  { href: "/projects/agriculture", label: "Agriculture" },
  { href: "/projects/oil-and-gas", label: "Oil and gas" },
  { href: "/projects/philanthropy", label: "Philanthropy" },
];

export const aboutNav: NavLink[] = [
  { href: "/about", label: "About us" },
  { href: "/about#milestones", label: "Our history" },
  { href: "/contact", label: "Contact us" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Projects",
    links: [
      { href: "/projects/mining", label: "Mining" },
      { href: "/projects/agriculture", label: "Agriculture" },
      { href: "/projects/oil-and-gas", label: "Oil and gas" },
      { href: "/projects/philanthropy", label: "Philanthropy" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { href: "/deals", label: "Browse deals" },
      { href: "/dashboard", label: "Investor dashboard" },
      { href: "/kyc", label: "KYC onboarding" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/contact", label: "Contact us" },
      { href: "/#pillars", label: "Why Indigio" },
    ],
  },
  {
    heading: "Account",
    links: [
      { href: "/login", label: "Sign in" },
      { href: "/kyc", label: "Open an account" },
      { href: "/contact", label: "Request investor pack" },
    ],
  },
];

/** True when `pathname` should highlight `link` in the nav. */
export function isActiveLink(pathname: string, link: NavLink): boolean {
  if (link.href === "/") return pathname === "/";
  if (link.matchPrefix) return pathname === link.href || pathname.startsWith(`${link.href}/`);
  return pathname === link.href;
}

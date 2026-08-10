/** Shared site metadata and navigation, so copy and routes live in one place. */

export const site = {
  name: "RBC Indigio",
  shortName: "RBC",
  tagline: "Global Wealth Reimagined",
  description:
    "Tokenized real-estate investing for private clients — institutional access, KYC-verified onboarding, and transparent portfolio reporting.",
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
  { href: "/deals", label: "Deals", matchPrefix: true },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/kyc", label: "Onboarding" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
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
      { href: "/#pillars", label: "Why RBC" },
      { href: "/#about", label: "Our heritage" },
      { href: "/#access", label: "Investor access" },
    ],
  },
  {
    heading: "Account",
    links: [
      { href: "/login", label: "Sign in" },
      { href: "/kyc", label: "Open an account" },
      { href: "/deals", label: "Request investor pack" },
    ],
  },
];

/** True when `pathname` should highlight `link` in the nav. */
export function isActiveLink(pathname: string, link: NavLink): boolean {
  if (link.href === "/") return pathname === "/";
  if (link.matchPrefix) return pathname === link.href || pathname.startsWith(`${link.href}/`);
  return pathname === link.href;
}

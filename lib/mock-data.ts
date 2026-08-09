export type Deal = {
  slug: string;
  title: string;
  location: string;
  assetType: string;
  targetIrr: string;
  raised: string;
  target: string;
  progress: number;
  term: string;
  image: string;
  description: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
};

export const deals: Deal[] = [
  {
    slug: "harbor-point-residences",
    title: "Harbor Point Residences",
    location: "Miami, Florida",
    assetType: "Multifamily",
    targetIrr: "14.2%",
    raised: "$4.8M",
    target: "$6.1M",
    progress: 79,
    term: "36 months",
    image: "/images/prop1.jpg",
    description:
      "A premium multifamily asset positioned along the Miami waterfront, designed for durable cash flow and long-term value creation in a supply-constrained submarket.",
    highlights: [
      "Low vacancy in a high-demand residential corridor",
      "Institutional-grade operations and strong exit pipeline",
      "Built for steady monthly distributions and downside protection"
    ],
    metrics: [
      { label: "Min. investment", value: "$25,000" },
      { label: "Projected yield", value: "9.8%" },
      { label: "Tokenized units", value: "18,400" },
      { label: "Risk profile", value: "Moderate" }
    ]
  },
  {
    slug: "copper-cove-hospitality",
    title: "Copper Cove Hospitality",
    location: "Aspen, Colorado",
    assetType: "Hospitality",
    targetIrr: "17.8%",
    raised: "$3.2M",
    target: "$5.5M",
    progress: 58,
    term: "24 months",
    image: "/images/prop2.jpg",
    description:
      "A destination hospitality venture focused on premium guest conversion, seasonality management, and outsized yield during peak travel periods.",
    highlights: [
      "Strong destination demand with premium ADR trends",
      "Asset enhancement plan to improve operating margin",
      "Designed around reinvestment and refinancing optionality"
    ],
    metrics: [
      { label: "Min. investment", value: "$50,000" },
      { label: "Projected yield", value: "11.4%" },
      { label: "Tokenized units", value: "12,600" },
      { label: "Risk profile", value: "Growth" }
    ]
  },
  {
    slug: "summit-terrace-works",
    title: "Summit Terrace Works",
    location: "Austin, Texas",
    assetType: "Industrial",
    targetIrr: "13.6%",
    raised: "$7.1M",
    target: "$8.8M",
    progress: 81,
    term: "42 months",
    image: "/images/prop3.jpg",
    description:
      "A logistics-focused industrial platform positioned in one of the strongest leasing markets in the U.S. with resilient occupier demand and long-term rental growth.",
    highlights: [
      "Long-warranted tenancy and pricing power",
      "Location near major transportation corridors",
      "Strong industrial demand profile with inflation resilience"
    ],
    metrics: [
      { label: "Min. investment", value: "$30,000" },
      { label: "Projected yield", value: "10.1%" },
      { label: "Tokenized units", value: "21,800" },
      { label: "Risk profile", value: "Balanced" }
    ]
  }
];

export const getDealBySlug = (slug: string) => deals.find((deal) => deal.slug === slug);

export const dashboardHoldings = [
  { name: "Harbor Point Residences", amount: "$104,500", allocation: "31%", status: "Live" },
  { name: "Summit Terrace Works", amount: "$86,200", allocation: "26%", status: "Accruing" },
  { name: "Copper Cove Hospitality", amount: "$72,800", allocation: "22%", status: "Pipeline" }
];

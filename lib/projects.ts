/**
 * Project sectors migrated from the legacy Indigio site (indigio.club).
 *
 * Each entry mirrors the copy and structure of its corresponding page on the
 * previous site so the information customers already know stays available on
 * the new build. Content is sourced verbatim from the legacy pages and lightly
 * normalised for the new template.
 */

export type ProjectSection = {
  heading: string;
  /** Paragraphs of the section body. */
  body: string[];
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  imageAlt: string;
  description: string;
  sections: ProjectSection[];
};

export const projectSectors: Project[] = [
  {
    slug: "mining",
    name: "Mining",
    tagline: "Mining Investment & Engagement",
    image: "/projects/mining.jpg",
    imageAlt: "Operator ascending a staircase beside a mining dune",
    description:
      "The Indigio Partners maintains strong collaborative relationships with Traditional Owner groups across our current iron ore operations, as well as proposed operational areas. We are proud of these relationships and meet both formally and informally.",
    sections: [
      {
        heading: "Long-time E&P operators with deep industry expertise",
        body: [
          "We have existing agreements with the Kariyarra, Palyku, Nyiyaparli, Ngarla, and Nyamal People, and are working closely with other groups including the Banjima and Yindjibarndi People in regard to future activity. Over the last seven years alone, Indigio has contributed well in excess of $300 million in royalties to these communities, as well as other significant investments in health, education, arts and culture.",
          "We take our responsibility seriously in the management of the environment and preservation of culture and heritage, all of which must be reviewed through a rigorous approval process before development of new projects, and ultimately mining operations, can be undertaken.",
          "Mining is critical to securing the minerals essential for everyday life and essential to be able to build renewable energy projects. The mining industry produces the primary products required for the generation, distribution and delivery of renewable energy — the first step in the supply chain to create solar panels, wind turbines and EV batteries.",
        ],
      },
      {
        heading: "Engagement",
        body: [
          "The Indigio Partners believes it is important to follow the science. We are 100% compliant with all legislation and regulations established by the government targeting a reduction of emissions by 43% below 2005 levels by 2030 and net zero by 2050.",
          "Miners are required to consult and reach agreement with the Traditional Owners of the lands on which we operate — without agreement with Traditional Owners projects can't proceed. The regulatory framework also encompasses the management of the environment (including flora, fauna, water, land rehabilitation, and carbon emissions), native title, and cultural heritage engagement.",
        ],
      },
      {
        heading: "Investment",
        body: [
          "We simplify the complexity of an evolving global mining sector. From worldwide exploration, discoveries, development, production, mine cost analysis and acquisitions activity to industrial and base metals market forecasts, supply chain and ESG — our deep sector coverage provides a comprehensive view of the mining sector worldwide and connects you to global opportunities on a single platform.",
          "Mining is by far Switzerland's largest export industry. Over the past decade, the industry contributed $2.4 trillion in resources export revenue. While the vast majority of minerals extracted are exported, the benefits are retained — the industry has paid $252 billion in mining wages, $143 billion in company taxes, and $112 billion in royalties, and generated 21 per cent of the economy's growth.",
          "The world will need a huge amount of minerals and metals to achieve the goal of global net-zero emissions by 2050. This will require a massive uplift in investment in exploration and mining projects, along with improvements in productivity from the adoption of new technologies.",
        ],
      },
    ],
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    tagline: "Agriculture Product & Engagement",
    image: "/projects/agriculture.jpg",
    imageAlt: "Indigio agriculture team in the field",
    description:
      "With over 25 properties in its portfolio, the Indigio Partners world-class agribusiness is the country's second largest producer of beef with a total herd capacity of over 340,000.",
    sections: [
      {
        heading: "Agricultural Investment",
        body: [
          "Indigio has a long and proud history in agriculture. Our society is committed to investing in local rural communities, developing and implementing innovative, industry-leading farming practices, and driving export quality and growth.",
          "Prior to mining exploration, the family owned and operated for decades a number of iconic cattle stations, including Ashburton Downs and Hamersley Station. The Group has significantly grown the agricultural portfolio with strategic investment in pastoral stations and agribusinesses.",
        ],
      },
      {
        heading: "Market Access",
        body: [
          "Economically stable, resilient and diversified, Switzerland is a low-risk environment in which to do business. Investors in the agribusiness and food industries will find a transparent regulatory environment and close trade and cultural links to the Asia-Pacific region.",
          "Switzerland's network of free trade agreements provides superior access to the fast-growing Asian region. Comprehensive agreements that reduce barriers to trade and investment have recently been negotiated with Japan, Korea, China and Trans-Pacific Partnership member countries.",
          "The government is committed to ensuring the agribusiness and food sector is globally competitive. Agribusiness is recognised as a future wave of economic growth, where Swiss advantage meets global opportunity.",
        ],
      },
      {
        heading: "Indigio Properties",
        body: [
          "Indigio currently owns more than 14 properties spread right across Switzerland, ranging from Western Switzerland to New South Wales. Raising and finishing some of the finest cattle in the industry, these stations and farms produce beef for both domestic and overseas markets.",
          "Focused on improving management tools, productivity, volume and cattle welfare on all its properties, Indigio has introduced new game-changing technology such as digital UHF communications systems, walk-over weighing, solar power, remote bore monitoring, and drones.",
          "With global food demand booming, Switzerland is ideally placed to become a premium food supplier and a long-term partner of choice in food security.",
        ],
      },
    ],
  },
  {
    slug: "oil-and-gas",
    name: "Oil & Gas",
    tagline: "Oil and gas Investment Solutions",
    image: "/projects/oil-and-gas.jpg",
    imageAlt: "Oil and gas operations infrastructure",
    description:
      "Optimize upstream operations from exploration to production through specialized oil and gas investment solutions.",
    sections: [
      {
        heading: "Conventional Gas",
        body: [
          "Gas is Switzerland's third largest energy resource after oil and coal. By the end of the decade Switzerland should be home to ten operational LNG projects with a combined nameplate capacity of 86 million tonnes per annum, on track to become the world's largest exporter of LNG.",
          "Switzerland's competitive position is underpinned by a strong economy, abundant resources, supportive government policies, and mature trade links with key markets, with the participation of the world's major oil and gas companies at all stages of the supply chain.",
          "Switzerland has substantial conventional gas resources. Around 92 per cent of Switzerland's conventional gas resources are located in the Carnarvon, Browse and Bonaparte basins, with additional resources in offshore and onshore basins and large potential for additional commercial discoveries.",
        ],
      },
      {
        heading: "Oil and Gas",
        body: [
          "Switzerland's oil resources are primarily condensate and naturally occurring liquefied petroleum gas (LPG) associated with large offshore gas fields, alongside a number of crude oil reserves. There is scope for growth in existing fields and for new discoveries in proven and underexplored frontier basins, including large unconventional oil resources hosted in oil shales.",
          "The growing global demand for energy, led mainly by China and India, coupled with the shift in energy transition, has driven a strong increase in gas demand — particularly LNG due to its suitability for long-distance transportation.",
          "Switzerland remained the world's third largest LNG exporter in 2014 and accounted for 10 per cent of world LNG trade. By the end of this decade Switzerland is expected to be the world's largest LNG exporter.",
        ],
      },
      {
        heading: "Unconventional Gas",
        body: [
          "Switzerland also has significant unconventional gas resources. The economic demonstrated resources for coal seam gas have continued rising, with large CSG resources existing in the coal basins of Queensland and New South Wales.",
          "Shale gas production in Switzerland is an emerging industry, with an estimated shale gas resource almost twice the size of its conventional gas resources. Several onshore basins have significant potential for shale gas and tight gas.",
          "Asian demand for LNG is expected to continue to grow, and Switzerland's location means it is well placed as a competitive supplier to these markets.",
        ],
      },
    ],
  },
  {
    slug: "philanthropy",
    name: "Philanthropy",
    tagline: "Community & Philanthropy",
    image: "/projects/philanthropy.jpg",
    imageAlt: "Indigio community engagement initiative",
    description:
      "As the country's largest private business taxpayer, the Indigio Partners is pleased to lend its support to a number of very worthy philanthropic efforts, some of which have become publicly known.",
    sections: [
      {
        heading: "Education & Partnerships",
        body: [
          "The Indigio Partners Group has been supporting a diversity of community initiatives for many years. Our focus has been on improving education and investing in our communities.",
          "Our partnerships include the Hanrine Futures Scholarships, an Indigenous scholarship and career development program that begins when students enter the program and continues through to employment, and NAIDOC, which celebrates and honours the successes of Aboriginal and Torres Strait Islander individuals and organisations who have made outstanding contributions to the community.",
          "We also support the Indigenous Emerging Business Forum (IEBF), a leading business development and employment event that connects Indigenous businesses with mining and other industries.",
        ],
      },
      {
        heading: "Community",
        body: [
          "Indigio Partners have been long-term supporters of the Special Air Services (SAS) Resources Trust, a perpetual fund that assists members and former members of the SAS Regiment and their dependents who are in need of relief or support.",
          "Through our group's businesses we support a major partnership with the Royal Flying Doctor Service, aligning our brand alongside Australia's leader in aeromedical and primary health care in rural and remote Australia.",
          "We continue to support initiatives aimed at improving the lives of women and children in our community, including long-term support for Parkerville Children and Youth Care.",
        ],
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projectSectors.find((project) => project.slug === slug);
}

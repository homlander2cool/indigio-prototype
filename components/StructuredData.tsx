import { site } from "@/lib/site";

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Organization", "FinancialService"],
    "@id": `${site.url}/#organization`,
    name: "Indigio PTY. LTD.",
    legalName: "Indigio PTY. LTD.",
    url: site.url,
    logo: `${site.url}/logo.svg`,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rathausgasse 25",
      postalCode: "3011",
      addressLocality: "Bern",
      addressCountry: "CH",
    },
    areaServed: "Europe",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "investor relations",
      email: "info@rbcindigio.com",
      telephone: "+1 575 517 7726",
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

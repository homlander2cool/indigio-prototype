import type { Metadata } from "next";
import { Suspense } from "react";
import DealFilter from "@/components/DealFilter";
import PageHeader from "@/components/PageHeader";
import { getDeals } from "@/lib/data";
import { createT } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "Private market deals",
  description:
    "Browse tokenized real-estate and private credit opportunities, with target returns, term, and live capital-raise progress.",
  alternates: { canonical: "/deals" },
};

// The page reads the locale cookie per request, so it renders on demand and
// always reflects the latest DB numbers.
export const dynamic = "force-dynamic";

export default async function DealsPage() {
  const deals = await getDeals();
  const t = createT(getServerLocale());

  return (
    <div className="container-page section">
      <PageHeader
        eyebrow={t("dealsPage.eyebrow")}
        title={t("dealsPage.title")}
        description={t("dealsPage.description")}
      />

      <div className="mt-10">
        {/* useSearchParams must sit under a Suspense boundary during static
            generation; the fallback is never seen by users. */}
        <Suspense fallback={null}>
          <DealFilter deals={deals} />
        </Suspense>
      </div>
    </div>
  );
}
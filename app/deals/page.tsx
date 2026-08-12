import type { Metadata } from "next";
import { Suspense } from "react";
import DealFilter from "@/components/DealFilter";
import PageHeader from "@/components/PageHeader";
import { getDeals } from "@/lib/data";

export const metadata: Metadata = {
  title: "Private market deals",
  description:
    "Browse tokenized real-estate and private credit opportunities, with target returns, term, and live capital-raise progress.",
  alternates: { canonical: "/deals" },
};

// Refresh from the database on a short ISR cadence so a changed raise amount
// (or a newly added deal) shows up without a redeploy.
export const revalidate = 60;

export default async function DealsPage() {
  const deals = await getDeals();

  return (
    <div className="container-page section">
      <PageHeader
        eyebrow="Private markets"
        title="Discover opportunities"
        description="Diligenced real-estate and credit strategies, tokenized for fractional ownership and transparent reporting."
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
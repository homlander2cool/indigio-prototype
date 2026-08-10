import type { Metadata } from "next";
import { Suspense } from "react";
import DealFilter from "@/components/DealFilter";
import PageHeader from "@/components/PageHeader";
import { deals } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Private market deals",
  description:
    "Browse tokenized real-estate and private credit opportunities, with target returns, term, and live capital-raise progress.",
  alternates: { canonical: "/deals" },
};

export default function DealsPage() {
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

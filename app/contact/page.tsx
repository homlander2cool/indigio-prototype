import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "We're happy to discuss your portfolio and answer any question. Contact the Indigio team at Rathausgasse 25, 3011 Bern, Switzerland.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-page section">
      <PageHeader
        eyebrow="Contact us"
        title="Let's start the conversation"
        description="We're happy to discuss your portfolio and answer any question. Tell us about your goals and we will route you to the right team."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-6">
          <div className="panel p-6">
            <p className="metric-label">Our locations</p>
            <div className="mt-5 space-y-5 text-sm text-ink-muted">
              <div>
                <p className="font-bold text-ink">Headquarters</p>
                <p className="mt-1 leading-6">
                  Rathausgasse 25, 3011 Bern, Switzerland.
                </p>
              </div>
              <div>
                <p className="font-bold text-ink">Reach us</p>
                <p className="mt-1 leading-6">
                  <a href="mailto:info@rbcindigio.com" className="link-quiet">
                    info@rbcindigio.com
                  </a>
                  <br />
                  <a href="tel:+15755177726" className="link-quiet">
                    +1 575 517 7726
                  </a>
                </p>
              </div>
              <p className="text-xs leading-6">
                Pioneer of the Switzerland Mining, Agriculture, Oil &amp; Gas,
                Engineering &amp; Construction industry &amp; investment.
              </p>
            </div>
          </div>

          <div className="on-dark rounded-panel bg-navy p-6 text-white shadow-lifted">
            <p className="eyebrow-gold text-[10px] font-semibold uppercase tracking-[0.26em]">
              Investor access
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              Verified investors can access managed opportunities and fund
              documentation after completing KYC onboarding.
            </p>
          </div>

          <div className="panel p-6">
            <p className="metric-label">Official company wallet</p>
            <p className="mt-2 text-xs text-ink-muted">Bitcoin (BTC)</p>
            <p className="mt-3 break-all rounded-field border border-line bg-canvas-panel p-4 font-mono text-sm leading-6 text-ink">
              bc1q4e8mpa5djkq63a6c4823hlfplt6vtaq66qukef
            </p>
            <p className="mt-3 text-xs leading-5 text-ink-muted">
              Verify the network and address before sending any funds.
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}

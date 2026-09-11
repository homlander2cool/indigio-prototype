import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.tagline,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Hero />
      <Features />
      <About />
      <HowItWorks />
      <CTA />
    </div>
  );
}

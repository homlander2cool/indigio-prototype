import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";

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

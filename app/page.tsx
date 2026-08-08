import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Hero />
      <Features />
      <About />
      <CTA />
    </div>
  );
}

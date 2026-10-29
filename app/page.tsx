import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Scope } from "@/components/sections/Scope";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Marquee />
      <Scope />
      <BeforeAfter />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

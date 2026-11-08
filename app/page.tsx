import { Hero } from "@/components/hero/Hero";
import { Materials } from "@/components/sections/Materials";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Projects } from "@/components/sections/Projects";
import { Commission } from "@/components/sections/Commission";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Materials />
      <Projects />
      <BeforeAfter />
      <Commission />
      <Footer />
    </main>
  );
}

import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import MarqueeTicker from "@/components/shared/MarqueeTicker";
import AboutSection from "@/components/about/AboutSection";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import InspirationShowcase from "@/components/inspiration/InspirationShowcase";
import SocialsSection from "@/components/socials/SocialsSection";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <Hero />

      {/* MARQUEE TICKER */}
      <MarqueeTicker speed={30} />

      {/* ABOUT SECTION */}
      <AboutSection />

      {/* PROJECTS SECTION */}
      <ProjectShowcase />

      {/* INSPIRATION SECTION */}
      <InspirationShowcase />

      {/* SOCIALS SECTION */}
      <SocialsSection />
    </main>
  );
}
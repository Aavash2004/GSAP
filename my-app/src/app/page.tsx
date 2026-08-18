import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import ScrollGallery from "@/components/gallery/ScrollGallery";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import SectionBackground from "@/components/shared/SectionBackground";
import ParticlesBackground from "@/components/shared/ParticlesBackground";
import InteractiveBackground from "@/components/shared/InteractiveBackground";
import BeamsBackground from "@/components/shared/BeamsBackground";
import Reveal from "@/components/shared/Reveal";
import InspirationShowcase from "@/components/inspiration/InspirationShowcase";
import ProjectToInspiration from "@/components/transitions/ProjectToInspiration";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      {/* ABOUT */}
      <ScrollGallery />

      {/* PROJECTS */}
      <ProjectShowcase />

<ProjectToInspiration>
       <InspirationShowcase />
</ProjectToInspiration>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative min-h-screen overflow-hidden px-8 py-32 text-foreground"
      >
        <SectionBackground src="/videos/bg4.mp4" />
        <BeamsBackground />
        <InteractiveBackground />

        <div className="relative z-10">
          <Reveal>
            <h2 className="font-display text-5xl uppercase">
              Contact
            </h2>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
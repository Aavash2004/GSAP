import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Reveal from "@/components/shared/Reveal";
import SectionBackground from "@/components/shared/SectionBackground";
import AuroraBackground from "@/components/shared/AuroraBackground";
import ParticlesBackground from "@/components/shared/ParticlesBackground";
import BeamsBackground from "@/components/shared/BeamsBackground";
import InteractiveBackground from "@/components/shared/InteractiveBackground";
import ScrollGallery from "@/components/gallery/ScrollGallery";


export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <section id="about" className="relative  px-8 py-20 ,d:py-28 text-foreground overflow-hidden">
  <AuroraBackground />
  <InteractiveBackground />
  <div className="relative z-10">
    <Reveal>
      <h2 className="font-display text-5xl uppercase">About</h2>
    </Reveal>
    <Reveal delay={0.2}>
      <p className="font-body mt-6 max-w-xl text-muted">
        Your about content goes here.
      </p>
    </Reveal>
  </div>
</section>
<ScrollGallery />

<section id="projects" className="relative min-h-screen px-8 py-32 text-foreground overflow-hidden">
  <SectionBackground src="/videos/bg3.mp4" />
  <ParticlesBackground />
  <InteractiveBackground />
  <div className="relative z-10">
    <Reveal>
      <h2 className="font-display text-5xl uppercase">Projects</h2>
    </Reveal>
  </div>
</section>

<section id="contact" className="relative min-h-screen px-8 py-32 text-foreground overflow-hidden">
  <SectionBackground src="/videos/bg4.mp4" />
  <BeamsBackground />
  <InteractiveBackground />
  <div className="relative z-10">
    <Reveal>
      <h2 className="font-display text-5xl uppercase">Contact</h2>
    </Reveal>
  </div>
</section>
    </main>
  );
}
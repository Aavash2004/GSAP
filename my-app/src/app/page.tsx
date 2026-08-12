import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Reveal from "@/components/shared/Reveal";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <section id="about" className="relative bg-background text-foreground min-h-screen px-8 py-32">
        <Reveal>
          <h2 className="font-display text-5xl uppercase">About</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="font-body mt-6 max-w-xl text-muted">
            Your about content goes here.
          </p>
        </Reveal>
      </section>

      <section id="projects" className="relative bg-background text-foreground min-h-screen px-8 py-32">
        <Reveal>
          <h2 className="font-display text-5xl uppercase">Projects</h2>
        </Reveal>
      </section>

      <section id="contact" className="relative bg-background text-foreground min-h-screen px-8 py-32">
        <Reveal>
          <h2 className="font-display text-5xl uppercase">Contact</h2>
        </Reveal>
      </section>
    </main>
  );
}
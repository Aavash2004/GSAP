import HeroBackground from "./HeroBackground";
import HeroHeadline from "./HeroHeadline";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <HeroBackground />
      <HeroHeadline />
      <HeroVisual />
    </section>
  );
}
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroBackground from "./HeroBackground";
import HeroHeadline from "./HeroHeadline";
import HeroVisual from "./HeroVisual";
import TopographicBackground from "./TopographicBackground";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(visualRef.current, {
        y: 0,
        scale: 1,
        opacity: 1,
      });

      // Very subtle scroll transition.
      // IMPORTANT: no clipPath and no aggressive scaling.
      gsap.to(visualRef.current, {
        y: -40,
        scale: 0.96,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Background moves slightly slower than foreground.
      gsap.to(backgroundRef.current, {
        yPercent: 8,
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[650px] w-full overflow-hidden bg-[#F7F7F3] text-black"
    >
      {/* Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <TopographicBackground />
        <HeroBackground />
      </div>

      {/* Very subtle background wash */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#F7F7F3]/20" />

      {/* Headline / text */}
      <div className="relative z-20 h-full w-full">
        <HeroHeadline />
      </div>

      {/* Portrait */}
      <div
        ref={visualRef}
        className="pointer-events-none absolute inset-0 z-10"
      >
        <HeroVisual />
      </div>
    </section>
  );
}
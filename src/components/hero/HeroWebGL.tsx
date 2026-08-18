"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const emptySubscribe = () => () => {};

const subscribeReducedMotion = (callback: () => void) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const subscribeMobile = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getMobileSnapshot = () =>
  window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;

// Dynamically import WebGLScene with ssr: false to guarantee client-only execution
const WebGLScene = dynamic(() => import("./webgl/WebGLScene"), {
  ssr: false,
});

export default function HeroWebGL() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const scrollProgressRef = useRef<number>(0);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    () => false
  );

  useEffect(() => {
    // Mouse movement listener (normalized -1 to 1)
    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return;
      const { innerWidth, innerHeight } = window;
      mouseRef.current = {
        x: (e.clientX / innerWidth - 0.5) * 2,
        y: (e.clientY / innerHeight - 0.5) * 2,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // GSAP ScrollTrigger for scroll-based animation
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
        },
      });
    }, containerRef);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      ctx.revert();
    };
  }, [reducedMotion]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-5 overflow-hidden"
      aria-hidden="true"
    >
      <WebGLScene
        mouse={mouseRef}
        scrollProgress={scrollProgressRef}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}

"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
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
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const subscribeMobile = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getMobileSnapshot = () =>
  typeof window !== "undefined"
    ? window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches
    : false;

export function useWebGLInteraction() {
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const scrollVelocityRef = useRef<number>(0);

  const isMounted = useSyncExternalStore(
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
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current = {
        x: (e.clientX / innerWidth - 0.5) * 2,
        y: (e.clientY / innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Track scroll velocity via ScrollTrigger
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        // Clamp velocity to reasonable range
        const vel = self.getVelocity() / 1000;
        scrollVelocityRef.current = gsap.utils.clamp(-2, 2, vel);
      },
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      st.kill();
    };
  }, [reducedMotion]);

  return {
    mouseRef,
    scrollVelocityRef,
    isMounted,
    isMobile,
    reducedMotion,
  };
}

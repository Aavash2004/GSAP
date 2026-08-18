"use client";

import { createContext, useContext, useRef, ReactNode, useCallback } from "react";
import { gsap } from "gsap";

interface PageTransitionContextType {
  triggerTransition: (onComplete?: () => void) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  triggerTransition: () => {},
});

export const usePageTransition = () => useContext(PageTransitionContext);

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const triggerTransition = useCallback((onComplete?: () => void) => {
    const overlay = overlayRef.current;
    if (!overlay || isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        if (onComplete) onComplete();
      },
    });

    // Iris cover animation
    tl.set(overlay, {
      display: "block",
      clipPath: "circle(0% at 50% 50%)",
      opacity: 1,
    })
      .to(overlay, {
        clipPath: "circle(150% at 50% 50%)",
        duration: 0.8,
        ease: "expo.inOut",
      })
      .to(
        overlay,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "+=0.1"
      )
      .set(overlay, {
        display: "none",
        clipPath: "circle(0% at 50% 50%)",
      });
  }, []);

  return (
    <PageTransitionContext.Provider value={{ triggerTransition }}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          z-[999]
          hidden
          bg-[#111111]
        "
        style={{
          clipPath: "circle(0% at 50% 50%)",
        }}
      />
    </PageTransitionContext.Provider>
  );
}

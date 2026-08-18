"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "view" | "copy">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check desktop & fine pointer device
    const checkIsDesktop = () => {
      const isLargeScreen = window.innerWidth >= 768;
      const isFinePointer = window.matchMedia("(pointer: fine)").matches;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return isLargeScreen && isFinePointer && !prefersReduced;
    };

    if (!checkIsDesktop()) {
      setIsDesktop(false);
      return;
    }

    setIsDesktop(true);

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Quick setters for smooth mouse movement
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Global listener for data-cursor attributes
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorElement = target.closest("[data-cursor]") as HTMLElement | null;

      if (cursorElement) {
        const type = cursorElement.getAttribute("data-cursor");
        if (type === "view") {
          setCursorType("view");
          setCursorText("VIEW");
        } else if (type === "copy") {
          setCursorType("copy");
          setCursorText("COPY");
        } else if (type === "pointer") {
          setCursorType("pointer");
          setCursorText("");
        }
      } else if (target.closest("a, button, [role='button']")) {
        setCursorType("pointer");
        setCursorText("");
      } else {
        setCursorType("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      className={`
        pointer-events-none
        fixed
        left-0
        top-0
        z-[9999]
        -translate-x-1/2
        -translate-y-1/2
        flex
        items-center
        justify-center
        rounded-full
        transition-opacity
        duration-300
        ${isVisible ? "opacity-100" : "opacity-0"}
        ${
          cursorType === "default"
            ? "h-4 w-4 bg-black/80 backdrop-blur-sm"
            : cursorType === "pointer"
            ? "h-10 w-10 border border-black/40 bg-black/10 backdrop-blur-xs scale-110"
            : "h-14 w-14 bg-black text-white shadow-xl scale-100"
        }
      `}
      style={{
        transitionProperty: "width, height, background-color, border-color, transform, opacity",
        transitionDuration: "250ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {cursorText && (
        <span
          ref={textRef}
          className="text-[9px] font-bold uppercase tracking-[0.2em] text-white"
        >
          {cursorText}
        </span>
      )}
    </div>
  );
}

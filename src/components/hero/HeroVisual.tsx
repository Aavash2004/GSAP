"use client";

import { useEffect, useRef } from "react";
import {gsap} from "gsap";
import WebGLImage from "@/components/webgl/WebGLImage";

export default function HeroVisual() {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = visualRef.current;

    if (!el) return;

    // Disable cursor movement on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(el, "x", {
      duration: 1.2,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(el, "y", {
      duration: 1.2,
      ease: "power3.out",
    });

    const rotateXTo = gsap.quickTo(el, "rotateX", {
      duration: 1.2,
      ease: "power3.out",
    });

    const rotateYTo = gsap.quickTo(el, "rotateY", {
      duration: 1.2,
      ease: "power3.out",
    });

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;

      // Cursor position from -1 to 1
      const mouseX = (event.clientX / innerWidth - 0.5) * 2;
      const mouseY = (event.clientY / innerHeight - 0.5) * 2;

      // Smooth floating movement
      xTo(mouseX * 22);
      yTo(mouseY * 14);

      // Very subtle 3D tilt
      rotateYTo(mouseX * 3);
      rotateXTo(mouseY * -2);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      rotateXTo(0);
      rotateYTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center">
      <div
        ref={visualRef}
        className="
          relative
          h-[72svh]
          w-auto
          max-w-[90vw]
          transform-gpu
          will-change-transform
          md:h-[78svh]
          lg:h-[82svh]
        "
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <WebGLImage
          src="/images/aab3.png"
          alt="Aavash Basnet"
          fill={false}
          width={800}
          height={1000}
          priority
          objectFit="contain"
          intensity={0.06}
          className="h-full w-auto"
        />
      </div>
    </div>
  );
}
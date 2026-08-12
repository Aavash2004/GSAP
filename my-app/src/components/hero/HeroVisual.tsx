"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function HeroVisual() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const el = imgRef.current;
  if (!el) return;
  if (window.innerWidth < 768) return; // skip on mobile/small screens

  const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });

  const handleMouseMove = (e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const relX = (e.clientX / innerWidth - 0.5) * 2;
    const relY = (e.clientY / innerHeight - 0.5) * 2;
    xTo(relX * 15);
    yTo(relY * 15);
  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);

  return (
<div ref={imgRef} className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[70vh] w-auto pointer-events-none">
  <Image
    src="/images/aavash3.png"
    alt="Aavash Basnet"
    width={800}
    height={1000}
    priority
    className="h-full w-auto object-contain"
  />
</div>
  );
}
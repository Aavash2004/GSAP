"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MarqueeTickerProps {
  items?: string[];
  speed?: number;
  reverse?: boolean;
}

export default function MarqueeTicker({
  items = [
    "AAVASH BASNET",
    "CREATIVE DEVELOPER",
    "Bhaktapur, NEPAL",
   
  ],
  speed = 25,
  reverse = false,
}: MarqueeTickerProps) {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;

    const totalWidth = el.scrollWidth / 2;

    const animation = gsap.to(el, {
      x: reverse ? `+=${totalWidth}` : `-=${totalWidth}`,
      duration: speed,
      ease: "none",
      repeat: -1,
    });

    return () => {
      animation.kill();
    };
  }, [speed, reverse]);

  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-y border-black/10 bg-[#E9E9E5] py-3 text-[#111111] dark:border-white/10 dark:bg-[#111111] dark:text-white">
      <div ref={tickerRef} className="flex w-max items-center gap-8 whitespace-nowrap will-change-transform">
        {repeatedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-8">
            <span className="font-display text-xs font-bold uppercase tracking-[0.28em] opacity-80 md:text-sm">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#d2ff00] opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
}

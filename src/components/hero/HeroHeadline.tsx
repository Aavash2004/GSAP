"use client";

export default function HeroHeadline() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 p-6 md:p-12">
      {/* Top */}
      <div className="flex items-start justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-black/40">
          EST. 2026
        </span>

        <span className="hidden font-mono text-[9px] uppercase tracking-[0.24em] text-black/30 md:block">
          DEVELOPER
        </span>
      </div>

      {/* Bottom */}
      <div className="absolute bottom-7 left-6 md:bottom-10 md:left-12">
        <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-black/35">
          BASED IN NEPAL
        </span>
      </div>

      <div className="absolute bottom-7 right-6 md:bottom-10 md:right-12">
        <span className="font-mono text-[8px] tracking-[0.2em] text-black/30">
          01 / 04
        </span>
      </div>
    </div>
  );
}
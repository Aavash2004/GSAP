"use client";

export default function HeroHeadline() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12">
      {/* Top Telemetry / Badge Bar */}
      <div className="flex items-center justify-between pt-16 md:pt-12">
        <div className="flex items-center gap-3">
          <span className="rounded bg-black px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-white">
            AB4
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-black/40">
            EST. 2026
          </span>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-black/10 bg-white/40 px-3 py-1 text-[9px] font-mono uppercase tracking-[0.2em] text-black/60 backdrop-blur-xs md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d2ff00] animate-pulse" />
          <span>STATUS: AVAILABLE FOR PROJECTS</span>
        </div>
      </div>

      {/* Center Giant Statement Headline */}
      <div className="my-auto max-w-4xl pt-8">
        <h1 className="font-display text-[clamp(3.2rem,8vw,7.5rem)] font-extrabold uppercase leading-[0.85] tracking-tighter text-black">
          AAVASH
          <br />
          <span className="text-black/80">BASNET</span>
        </h1>
      </div>
    
    </div>
  );
}
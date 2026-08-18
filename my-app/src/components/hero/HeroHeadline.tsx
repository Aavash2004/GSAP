"use client";

export default function HeroHeadline() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Left-side text */}
      <div className="absolute left-6 top-1/2 max-w-[420px] -translate-y-1/2 md:left-10 lg:left-16">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-black/45">
         Frontend Developer
        </p>

        <h1 className="text-5xl font-bold uppercase leading-[0.88] tracking-[-0.04em] md:text-7xl lg:text-8xl">
          Aavash
          <br />
          Basnet
        </h1>

        <p className="mt-6 max-w-[320px] text-sm leading-relaxed text-black/50 md:text-base">
          Building modern digital experiences with thoughtful interfaces and
          technology.
        </p>
      </div>
    </div>
  );
}
"use client";

export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-cover opacity-[0.22]"
      >
        <source src="/videos/bgg.mp4" type="video/mp4" />
      </video>

      {/* Soft ivory overlay */}
      <div className="absolute inset-0 bg-[#F7F7F3]/65" />

      {/* Subtle vignette / depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(247,247,243,0.35)_100%)]" />
    </div>
  );
}
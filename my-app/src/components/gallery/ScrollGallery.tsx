"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  label: string;
  year: string;
};

const images: GalleryImage[] = [
  {
    id: "main",
    src: "/images/a1.jpeg",
    alt: "Main portrait",
    label: "ABOUT ME",
    year: "2026",
  },
  {
    id: "mountain",
    src: "/images/a3.jpeg",
    alt: "Mountain",
    label: "ADVENTURE",
    year: "2025",
  },
  {
    id: "football",
    src: "/images/f1.jpeg",
    alt: "Football",
    label: "FOOTBALL",
    year: "2023",
  },
  {
    id: "garden",
    src: "/images/a2.jpeg",
    alt: "Garden",
    label: "EARLY DAYS",
    year: "2024",
  },
  {
    id: "profile",
    src: "/images/aab3.png",
    alt: "Profile",
    label: "PROFILE",
    year: "2026",
  },
];

export default function ScrollGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

 useEffect(() => {
  const cards = cardsRef.current;

  if (!cards.length || !sectionRef.current) return;

  const ctx = gsap.context(() => {
    const isMobile = window.innerWidth < 768;

    // Initial card positions
    cards.forEach((card, index) => {
      if (index === 0) {
        gsap.set(card, {
          x: "0vw",
          y: "-50%",
          scale: 1,
          rotate: 0,
          opacity: 1,
          zIndex: 50,
        });
      } else if (index === 1) {
        gsap.set(card, {
          x: isMobile ? "42vw" : "30vw",
          y: "-50%",
          scale: 0.72,
          rotate: 4,
          opacity: 0.65,
          zIndex: 30,
        });
      } else {
        gsap.set(card, {
          x: "0vw",
          y: "-50%",
          scale: 0.6,
          rotate: 0,
          opacity: 0,
          zIndex: 10,
        });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: isMobile ? "+=500%" : "+=650%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    for (let step = 0; step < cards.length - 1; step++) {
      const current = cards[step];
      const next = cards[step + 1];

      // Current image moves CENTER → LEFT
      tl.to(
        current,
        {
          x: isMobile ? "-42vw" : "-30vw",
          scale: 0.72,
          rotate: -4,
          opacity: 0.55,
          zIndex: 20,
          duration: 1,
          ease: "power2.inOut",
        },
        step
      );

      // Next image moves RIGHT → CENTER
      tl.to(
        next,
        {
          x: "0vw",
          scale: 1,
          rotate: 0,
          opacity: 1,
          zIndex: 50,
          duration: 1,
          ease: "power2.inOut",
        },
        step
      );

      // Following image waits on RIGHT
      if (step + 2 < cards.length) {
        tl.set(
          cards[step + 2],
          {
            x: isMobile ? "42vw" : "30vw",
            y: "-50%",
            scale: 0.72,
            rotate: 4,
            opacity: 0.65,
            zIndex: 30,
          },
          step + 0.8
        );
      }
    }
  }, sectionRef);

  return () => ctx.revert();
}, []);
  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative h-screen w-full overflow-hidden bg-[#E9E9E5] text-[#111]"
    >
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute h-full w-full"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
        >
          <g
            fill="none"
            stroke="#d1d1ca"
            strokeWidth="1"
            opacity="0.55"
          >
            <path d="M-100 180 C120 40 260 300 480 140 S850 80 1050 200 S1400 300 1700 100" />
            <path d="M-100 230 C120 90 280 350 500 190 S870 130 1070 250 S1420 350 1700 150" />
            <path d="M-100 280 C100 130 300 400 520 240 S900 180 1090 300 S1450 400 1700 200" />

            <path d="M-100 700 C120 560 300 800 500 650 S800 570 1000 700 S1400 800 1700 600" />
            <path d="M-100 750 C120 610 320 850 520 700 S820 620 1020 750 S1420 850 1700 650" />
            <path d="M-100 800 C100 660 340 900 540 750 S840 670 1040 800 S1440 900 1700 700" />

            <path d="M1200 -100 C1050 120 1300 200 1150 400 S1050 700 1250 850" />
            <path d="M1270 -100 C1120 130 1370 210 1220 410 S1120 710 1320 860" />
          </g>
        </svg>
      </div>

      {/* TOP HEADING */}

      <div className="pointer-events-none absolute left-6 top-28 z-[100] md:left-10 md:top-32">
  <h2 className="font-display text-[clamp(3.2rem,6vw,6rem)] uppercase leading-[0.85]">
    About
  </h2>
</div>

      {/* GALLERY */}

      <div className="relative z-20 h-full w-full">
        {images.map((image, index) => (
          <div
  key={image.id}
  ref={(el) => {
    if (el) cardsRef.current[index] = el;
  }}
  className="
    absolute
    left-1/2
    top-1/2
    w-[clamp(190px,28vw,420px)]
"
>
            <div className="relative">
              {/* IMAGE */}

              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] bg-white shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index < 2}
                  className="object-cover"
                  sizes="(max-width: 768px) 70vw, 30vw"
                />

                <div className="absolute left-4 top-4 text-[10px] tracking-widest text-white drop-shadow-md md:text-xs">
                  {String(index + 1).padStart(2, "0")} / 05
                </div>
              </div>

              {/* CAPTION */}

              <div className="mt-3 flex items-start justify-between border-t border-black/20 pt-2">
                <p className="text-[10px] font-semibold tracking-[0.18em]">
                  {image.label}
                </p>

                <p className="text-[10px] tracking-[0.15em] text-black/50">
                  {image.year}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PROGRESS */}

      <div className="absolute bottom-8 right-8 z-[100]">
        <p className="text-[9px] tracking-[0.2em] text-black/45">
          01 — 05
        </p>
      </div>

      {/* SCROLL INDICATOR */}

      <div className="absolute bottom-8 left-8 z-[100]">
        <p className="text-[9px] uppercase tracking-[0.25em] text-black/45">
          Scroll →
        </p>
      </div>
    </section>
  );
}
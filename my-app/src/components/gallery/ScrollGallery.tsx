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
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards.length) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const sideX = isMobile ? 42 : 31;

      /*
       * INITIAL STATE
       */

      cards.forEach((card, index) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          transformOrigin: "center center",
        });

        if (index === 0) {
          gsap.set(card, {
            x: "0vw",
            y: "2vh",
            scale: 1,
            rotate: 0,
            opacity: 1,
            zIndex: 50,
          });
        } else if (index === 1) {
          gsap.set(card, {
            x: `${sideX}vw`,
            y: "2vh",
            scale: 0.74,
            rotate: 4,
            opacity: 0.55,
            zIndex: 30,
          });
        } else {
          gsap.set(card, {
            x: "0vw",
            y: "2vh",
            scale: 0.62,
            rotate: 0,
            opacity: 0,
            zIndex: 10,
          });
        }
      });

      /*
       * SCROLL TIMELINE
       */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isMobile ? "+=500%" : "+=620%",
          scrub: 1.15,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * EACH CARD TRANSITION
       */

      for (let step = 0; step < cards.length - 1; step++) {
        const current = cards[step];
        const next = cards[step + 1];

        /*
         * CURRENT CARD → LEFT
         */

        tl.to(
          current,
          {
            x: `${-sideX}vw`,
            y: "-1vh",
            scale: 0.74,
            rotate: -4,
            opacity: 0.45,
            zIndex: 20,
            duration: 1,
            ease: "power2.inOut",
          },
          step
        );

        /*
         * NEXT CARD → CENTER
         */

        tl.to(
          next,
          {
            x: "0vw",
            y: "2vh",
            scale: 1,
            rotate: 0,
            opacity: 1,
            zIndex: 50,
            duration: 1,
            ease: "power2.inOut",
          },
          step
        );

        /*
         * FOLLOWING CARD → RIGHT
         */

        if (step + 2 < cards.length) {
          tl.set(
            cards[step + 2],
            {
              x: `${sideX}vw`,
              y: "2vh",
              scale: 0.74,
              rotate: 4,
              opacity: 0.55,
              zIndex: 30,
            },
            step + 0.82
          );
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="
        relative
        h-screen
        w-full
        overflow-hidden
        bg-[#E9E9E5]
        text-[#111]
      "
    >
      {/* --------------------------------
          BACKGROUND
      -------------------------------- */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
        >
          <g
            fill="none"
            stroke="#cfcfc8"
            strokeWidth="1"
            opacity="0.42"
          >
            <path d="M-100 180 C120 40 260 300 480 140 S850 80 1050 200 S1400 300 1700 100" />

            <path d="M-100 230 C120 90 280 350 500 190 S870 130 1070 250 S1420 350 1700 150" />

            <path d="M-100 280 C100 130 300 400 520 240 S900 180 1090 300 S1450 400 1700 200" />

            <path d="M-100 700 C120 560 300 800 500 650 S800 570 1000 700 S1400 800 1700 600" />

            <path d="M-100 750 C120 610 320 850 520 700 S820 620 1020 750 S1420 850 1700 650" />

            <path d="M1200 -100 C1050 120 1300 200 1150 400 S1050 700 1250 850" />
          </g>
        </svg>
      </div>

      {/* --------------------------------
          SECTION LABEL
      -------------------------------- */}

      <div
        className="
          pointer-events-none
          absolute
          left-6
          top-8
          z-[100]
          md:left-10
          md:top-9
        "
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-7 bg-black/25" />

          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-black/45
              md:text-[10px]
            "
          >
            About
          </span>
        </div>
      </div>

      {/* --------------------------------
          MAIN HEADING
      -------------------------------- */}

      <div
        className="
          pointer-events-none
          absolute
          left-6
          top-[15vh]
          z-[80]
          md:left-10
          md:top-[13vh]
        "
      >
        <h2
          className="
            font-display
            text-[clamp(2.8rem,5vw,5.5rem)]
            uppercase
            leading-[0.85]
            tracking-[-0.045em]
          "
        >
          About
        </h2>
      </div>

      {/* --------------------------------
          GALLERY
      -------------------------------- */}

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
              w-[clamp(180px,26vw,390px)]
              will-change-transform
            "
          >
            <div className="relative">
              {/* IMAGE */}

              <div
                className="
                  relative
                  aspect-[4/5]
                  w-full
                  overflow-hidden
                  bg-[#deded8]
                  shadow-[0_20px_50px_rgba(0,0,0,0.10)]
                "
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index < 2}
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    hover:scale-[1.02]
                  "
                  sizes="(max-width: 768px) 65vw, 28vw"
                />

                {/* IMAGE NUMBER */}

                <div
                  className="
                    absolute
                    left-3
                    top-3
                    text-[8px]
                    tracking-[0.18em]
                    text-white/90
                    drop-shadow-md
                  "
                >
                  {String(index + 1).padStart(2, "0")} / 05
                </div>
              </div>

              {/* CAPTION */}

              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  border-t
                  border-black/15
                  pt-2
                "
              >
                <p
                  className="
                    text-[8px]
                    font-medium
                    tracking-[0.18em]
                    text-black/65
                  "
                >
                  {image.label}
                </p>

                <p
                  className="
                    text-[8px]
                    tracking-[0.15em]
                    text-black/35
                  "
                >
                  {image.year}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --------------------------------
          FOOTER META
      -------------------------------- */}

      <div
        className="
          absolute
          bottom-7
          left-6
          z-[100]
          md:bottom-8
          md:left-10
        "
      >
        <p
          className="
            text-[8px]
            uppercase
            tracking-[0.25em]
            text-black/35
            md:text-[9px]
          "
        >
          Scroll to explore
        </p>
      </div>

      <div
        className="
          absolute
          bottom-7
          right-6
          z-[100]
          md:bottom-8
          md:right-10
        "
      >
        <p
          className="
            text-[8px]
            tracking-[0.2em]
            text-black/35
            md:text-[9px]
          "
        >
          01 — 05
        </p>
      </div>
    </section>
  );
}
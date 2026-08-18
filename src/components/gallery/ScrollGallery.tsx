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
    alt: "Portrait",
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
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !cards.length) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      /*
       * =========================================================
       * INITIAL CARD POSITIONS
       * =========================================================
       */

      cards.forEach((card, index) => {
        if (index === 0) {
          // First image starts in the center
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: isMobile ? "0vw" : "4vw",
            y: "2vh",
            scale: 1,
            rotate: 0,
            opacity: 1,
            zIndex: 50,
          });
        } else if (index === 1) {
          // Second image waits on the right
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: isMobile ? "40vw" : "31vw",
            y: "5vh",
            scale: 0.62,
            rotate: 3,
            opacity: 0.42,
            zIndex: 30,
          });
        } else {
          // Remaining images are hidden
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: isMobile ? "42vw" : "32vw",
            y: "5vh",
            scale: 0.58,
            rotate: 3,
            opacity: 0,
            zIndex: 10,
          });
        }
      });

      /*
       * =========================================================
       * SCROLL ANIMATION
       * =========================================================
       */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isMobile ? "+=520%" : "+=620%",
          scrub: 1.15,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * =========================================================
       * IMAGE TRANSITIONS
       * =========================================================
       */

      for (let step = 0; step < cards.length - 1; step++) {
        const current = cards[step];
        const next = cards[step + 1];

        /*
         * Current image moves to the left.
         * This happens ONLY because of scrolling.
         */

        tl.to(
          current,
          {
            x: isMobile ? "-40vw" : "-30vw",
            y: "5vh",
            scale: 0.62,
            rotate: -3,
            opacity: 0.34,
            duration: 1,
            ease: "power2.inOut",
          },
          step
        );

        /*
         * Next image moves into the center.
         * Again, this is scroll-controlled only.
         */

        tl.to(
          next,
          {
            x: isMobile ? "0vw" : "4vw",
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
         * Prepare the following card on the right.
         */

        if (step + 2 < cards.length) {
          tl.set(
            cards[step + 2],
            {
              xPercent: -50,
              yPercent: -50,
              x: isMobile ? "40vw" : "31vw",
              y: "5vh",
              scale: 0.62,
              rotate: 3,
              opacity: 0.42,
              zIndex: 30,
            },
            step + 0.78
          );
        }
      }

      /*
       * =========================================================
       * FINAL IMAGE
       * =========================================================
       */

      const lastCard = cards[cards.length - 1];

      tl.to(
        lastCard,
        {
          y: "-4vh",
          scale: 0.96,
          opacity: 0.96,
          duration: 0.7,
          ease: "power2.out",
        },
        cards.length - 1
      );

      /*
       * Refresh ScrollTrigger after layout is ready.
       */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-cursor="default"
      className="
        relative
        h-screen
        w-full
        overflow-hidden
        bg-[#E9E9E5]
        text-[#111]
      "
    >
      {/* ======================================================
          BACKGROUND
      ======================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft light */}

        <div
          className="
            absolute
            left-[25%]
            top-[18%]
            h-[45vh]
            w-[45vh]
            rounded-full
            bg-white/30
            blur-[100px]
          "
        />

        {/* Contour lines */}

        <svg
          className="
            absolute
            inset-0
            h-full
            w-full
          "
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g
            fill="none"
            stroke="#c9c9c2"
            strokeWidth="0.7"
            opacity="0.26"
          >
            <path d="M-120 190 C160 50 300 300 520 160 S900 100 1120 210 S1450 300 1720 120" />

            <path d="M-120 245 C160 105 320 355 540 215 S920 155 1140 265 S1470 355 1720 175" />

            <path d="M-120 690 C160 550 320 800 540 660 S900 590 1120 700 S1460 810 1720 620" />

            <path d="M-120 745 C160 605 340 855 560 715 S920 645 1140 755 S1480 865 1720 675" />
          </g>
        </svg>
      </div>

      {/* ======================================================
          HEADER
      ======================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-6
          top-24
          z-[100]

          md:left-10
          md:top-28
        "
      >
        <p
          className="
            mb-3
            text-[8px]
            font-medium
            uppercase
            tracking-[0.28em]
            text-black/35
          "
        >
          01 / About
        </p>

        <h2
          className="
            font-display
            text-[clamp(3rem,5vw,5rem)]
            font-medium
            uppercase
            leading-[0.82]
            tracking-[-0.035em]
          "
        >
          About
        </h2>
      </div>

      {/* ======================================================
          GALLERY
      ======================================================= */}

      <div
        className="
          relative
          z-20
          h-full
          w-full
        "
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            ref={(el) => {
              if (el) {
                cardsRef.current[index] = el;
              }
            }}
            data-cursor="default"
            className="
              absolute
              left-1/2
              top-1/2
              w-[clamp(180px,23vw,340px)]
              will-change-transform

              md:left-[56%]
            "
          >
            <div className="relative">
              {/* ==================================================
                  IMAGE
              =================================================== */}

              <div
                className="
                  relative
                  aspect-[3/4]
                  w-full
                  overflow-hidden
                  rounded-[2px]
                  bg-[#deded9]
                  shadow-[0_18px_45px_rgba(0,0,0,0.08)]
                "
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="
                    object-cover
                  "
                  sizes="(max-width: 768px) 65vw, 23vw"
                />

                {/* Image number */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-3
                    text-[8px]
                    font-medium
                    tracking-[0.18em]
                    text-white/85
                    drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]
                  "
                >
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </div>
              </div>

              {/* ==================================================
                  CAPTION
              =================================================== */}

              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  border-t
                  border-black/10
                  pt-2
                "
              >
                <p
                  className="
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.22em]
                    text-black/70
                  "
                >
                  {image.label}
                </p>

                <p
                  className="
                    text-[8px]
                    tracking-[0.18em]
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

      {/* ======================================================
          BOTTOM LEFT
      ======================================================= */}

      <div
        className="
          pointer-events-none
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
            tracking-[0.24em]
            text-black/35
          "
        >
          Scroll
        </p>
      </div>

      {/* ======================================================
          BOTTOM RIGHT
      ======================================================= */}

      <div
        className="
          pointer-events-none
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
          "
        >
          01 — 05
        </p>
      </div>
    </section>
  );
}
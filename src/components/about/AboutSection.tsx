"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    id: "main",
    src: "/images/a1.jpeg",
    alt: "Portrait",
    label: "ABOUT",
    year: "2026",
  },
  {
    id: "mountain",
    src: "/images/a3.jpeg",
    alt: "Adventure",
    label: "DIRECTION",
    year: "2025",
  },
  {
    id: "football",
    src: "/images/f1.jpeg",
    alt: "Focus",
    label: "FOCUS",
    year: "2024",
  },
  {
    id: "garden",
    src: "/images/a2.jpeg",
    alt: "Early Days",
    label: "LAB",
    year: "2024",
  },
  {
    id: "profile",
    src: "/images/aab3.png",
    alt: "Profile",
    label: "AAVASH",
    year: "2026",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(
      Boolean
    ) as HTMLDivElement[];

    if (!section || !cards.length) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      /*
       * =========================================================
       * STATEMENT ENTRANCE
       * =========================================================
       */

      if (statementRef.current) {
        gsap.fromTo(
          statementRef.current.children,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statementRef.current,
              start: "top 85%",
            },
          }
        );
      }

      /*
       * =========================================================
       * INITIAL CARD POSITIONS
       * =========================================================
       */

      cards.forEach((card, index) => {
        if (index === 0) {
          /*
           * Main image
           */
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: isMobile ? "0vw" : "2vw",
            y: "0vh",
            scale: 1,
            rotate: 0,
            opacity: 1,
            zIndex: 50,
          });
        } else if (index === 1) {
          /*
           * Next image waiting on the right
           */
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: isMobile ? "35vw" : "26vw",
            y: "4vh",
            scale: 0.65,
            rotate: 3,
            opacity: 0.45,
            zIndex: 30,
          });
        } else {
          /*
           * Remaining images hidden
           */
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: isMobile ? "38vw" : "28vw",
            y: "4vh",
            scale: 0.6,
            rotate: 3,
            opacity: 0,
            zIndex: 10,
          });
        }
      });

      /*
       * =========================================================
       * SCROLL TIMELINE
       * =========================================================
       */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isMobile ? "+=350%" : "+=450%",
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * =========================================================
       * IMAGE-BY-IMAGE TRANSITION
       * =========================================================
       */

      for (let step = 0; step < cards.length - 1; step++) {
        const current = cards[step];
        const next = cards[step + 1];

        /*
         * Current image moves left
         */
        tl.to(
          current,
          {
            x: isMobile ? "-35vw" : "-26vw",
            y: "4vh",
            scale: 0.65,
            rotate: -3,
            opacity: 0.35,
            duration: 1,
            ease: "power2.inOut",
          },
          step
        );

        /*
         * Next image becomes the main image
         */
        tl.to(
          next,
          {
            x: isMobile ? "0vw" : "2vw",
            y: "0vh",
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
         * Prepare the following image
         */
        if (step + 2 < cards.length) {
          tl.set(
            cards[step + 2],
            {
              xPercent: -50,
              yPercent: -50,
              x: isMobile ? "35vw" : "26vw",
              y: "4vh",
              scale: 0.65,
              rotate: 3,
              opacity: 0.45,
              zIndex: 30,
            },
            step + 0.8
          );
        }
      }

      /*
       * Refresh after layout
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
        min-h-screen
        w-full
        overflow-hidden
        bg-[#E9E9E5]
        text-[#111111]
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
            left-[20%]
            top-[15%]
            h-[40vh]
            w-[40vh]
            rounded-full
            bg-white/40
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
            opacity-25
          "
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g
            fill="none"
            stroke="#c4c4bc"
            strokeWidth="0.8"
          >
            <path d="M-120 190 C160 50 300 300 520 160 S900 100 1120 210 S1450 300 1720 120" />

            <path d="M-120 690 C160 550 320 800 540 660 S900 590 1120 700 S1460 810 1720 620" />
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
          top-20
          z-[100]

          md:left-12
          md:top-24
        "
      >
        <p
          className="
            mb-1
            text-[9px]
            font-mono
            font-medium
            uppercase
            tracking-[0.3em]
            text-black/40
          "
        >
          01 / About
        </p>

        <h2
          className="
            font-display
            text-[clamp(2.5rem,4.5vw,4.5rem)]
            font-extrabold
            uppercase
            leading-none
            tracking-tight
          "
        >
          Profile
        </h2>
      </div>

      {/* ======================================================
          EDITORIAL CONTAINER
      ======================================================= */}

      <div
        className="
          relative
          z-20
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-7xl
          flex-col
          justify-between
          px-6
          pb-16
          pt-36

          md:px-12
          md:pb-20
          md:pt-40
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-10

            lg:grid-cols-12
          "
        >
          {/* ==================================================
              LEFT COLUMN
          =================================================== */}

          <div
            ref={statementRef}
            className="
              space-y-8

              lg:col-span-6
              xl:col-span-7
            "
          >  

            {/* Small information */}

            <div
              className="
                flex
                flex-wrap
                gap-x-10
                gap-y-5
                pt-2
              "
            >
  
              <div>
                <p
                  className="
                    mb-1
                    text-[7px]
                    font-mono
                    uppercase
                    tracking-[0.2em]
                    text-black/30
                  "
                >
                  Based
                </p>

                <p
                  className="
                    text-[9px]
                    font-mono
                    uppercase
                    tracking-[0.15em]
                    text-black/70
                  "
                >
                  Nepal
                </p>
              </div>

              <div>
                <p
                  className="
                    mb-1
                    text-[7px]
                    font-mono
                    uppercase
                    tracking-[0.2em]
                    text-black/30
                  "
                >
                  Since
                </p>

                <p
                  className="
                    text-[9px]
                    font-mono
                    uppercase
                    tracking-[0.15em]
                    text-black/70
                  "
                >
                  2023
                </p>
              </div>
            </div>
          </div>

          {/* ==================================================
              RIGHT COLUMN / GALLERY
          =================================================== */}

          <div
            className="
              relative
              min-h-[390px]
              w-full

              lg:col-span-6
              lg:min-h-[500px]

              xl:col-span-5
            "
          >
            <div
              className="
                relative
                h-full
                min-h-[390px]
                w-full

                lg:min-h-[500px]
              "
            >
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  data-cursor="default"
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    w-[clamp(190px,25vw,330px)]
                    will-change-transform
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
                        shadow-[0_20px_55px_rgba(0,0,0,0.10)]
                      "
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        priority={index === 0}
                        loading={
                          index === 0 ? "eager" : "lazy"
                        }
                        className="
                          object-cover
                        "
                        sizes="
                          (max-width: 768px) 70vw,
                          25vw
                        "
                      />

                      {/* Image number */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          left-3
                          top-3
                          z-10
                          text-[8px]
                          font-mono
                          tracking-[0.18em]
                          text-white/90
                          drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]
                        "
                      >
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(galleryImages.length).padStart(
                          2,
                          "0"
                        )}
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
                          font-mono
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
                          font-mono
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
          </div>
        </div>
      </div>

      {/* ======================================================
          BOTTOM DETAILS
      ======================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-7
          left-6
          z-[100]

          md:bottom-8
          md:left-12
        "
      >
        <p
          className="
            text-[8px]
            font-mono
            uppercase
            tracking-[0.24em]
            text-black/35
          "
        >
          Scroll to explore
        </p>
      </div>

      <div
        className="
          pointer-events-none
          absolute
          bottom-7
          right-6
          z-[100]

          md:bottom-8
          md:right-12
        "
      >
        <p
          className="
            text-[8px]
            font-mono
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
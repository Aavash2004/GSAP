"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const inspirations = [
  {
    name: "Lionel Messi",
    role: "DISCIPLINE",
    image: "/images/inspirations/messi.jpg",
  },
  {
    name: "J. Cole",
    role: "CREATIVITY",
    image: "/images/inspirations/jcole.jpg",
  },
  {
    name: "Max Verstappen",
    role: "AMBITION",
    image: "/images/inspirations/max.jpg",
  },
  {
    name: "Mike Tyson",
    role: "MENTALITY",
    image: "/images/inspirations/mike.jpg",
  },
];

export default function InspirationShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!section || !title || cards.length !== inspirations.length) {
      return;
    }

    const ctx = gsap.context(() => {
      const mobile = window.innerWidth < 768;

      const sideX = mobile ? 30 : 34;
      const sideY = mobile ? 17 : 20;

      /*
       * INITIAL CARD POSITIONS
       */

      const initialPositions = [
        {
          x: -sideX,
          y: -sideY,
          rotate: -7,
          scale: 0.76,
        },
        {
          x: sideX,
          y: -sideY,
          rotate: 7,
          scale: 0.72,
        },
        {
          x: -sideX,
          y: sideY,
          rotate: 6,
          scale: 0.7,
        },
        {
          x: sideX,
          y: sideY,
          rotate: -6,
          scale: 0.74,
        },
      ];

      cards.forEach((card, index) => {
        const position = initialPositions[index];

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: `${position.x}vw`,
          y: `${position.y}vh`,
          rotate: position.rotate,
          scale: position.scale,
          opacity: 0.72,
          zIndex: 20 + index,
          transformOrigin: "center center",
          willChange: "transform, opacity",
        });
      });

      /*
       * TITLE
       */

      gsap.set(title, {
        y: 30,
        opacity: 0,
      });

      /*
       * MASTER TIMELINE
       */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: mobile ? "+=480%" : "+=560%",
          scrub: 1.15,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * 01 — TITLE ENTERS
       */

      tl.to(
        title,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
        0
      );

      /*
       * 02 — CARDS SPREAD OUT
       */

      cards.forEach((card, index) => {
        const directionX = index % 2 === 0 ? -1 : 1;
        const directionY = index < 2 ? -1 : 1;

        tl.to(
          card,
          {
            x: `${directionX * (mobile ? 40 : 45)}vw`,
            y: `${directionY * (mobile ? 25 : 28)}vh`,
            rotate: directionX * (index % 2 === 0 ? 13 : -13),
            scale: 0.82,
            opacity: 0.9,
            duration: 1,
            ease: "power2.inOut",
          },
          0.8
        );
      });

      /*
       * 03 — CARDS ORBIT
       */

      cards.forEach((card, index) => {
        const angle =
          (index / cards.length) * Math.PI * 2 - Math.PI / 2;

        const radiusX = mobile ? 32 : 38;
        const radiusY = mobile ? 25 : 27;

        tl.to(
          card,
          {
            x: `${Math.cos(angle) * radiusX}vw`,
            y: `${Math.sin(angle) * radiusY}vh`,
            rotate: index % 2 === 0 ? -10 : 10,
            scale: 0.76,
            opacity: 0.88,
            duration: 1,
            ease: "power2.inOut",
          },
          2
        );
      });

      /*
       * 04 — CARDS MOVE CLOSER
       *
       * One card becomes the visual focus.
       */

      cards.forEach((card, index) => {
        const angle =
          (index / cards.length) * Math.PI * 2 + Math.PI / 4;

        tl.to(
          card,
          {
            x: `${Math.cos(angle) * (mobile ? 25 : 29)}vw`,
            y: `${Math.sin(angle) * (mobile ? 22 : 24)}vh`,
            rotate: index === 0 ? 0 : index % 2 === 0 ? -5 : 5,
            scale: index === 0 ? 1 : 0.62,
            opacity: index === 0 ? 1 : 0.32,
            zIndex: index === 0 ? 50 : 20,
            duration: 1,
            ease: "power3.inOut",
          },
          3.2
        );
      });

      /*
       * 05 — FINAL SCATTER
       *
       * Cards leave the viewport in different directions.
       */

      cards.forEach((card, index) => {
        const direction = index % 2 === 0 ? 1 : -1;

        tl.to(
          card,
          {
            x: `${direction * (mobile ? 58 : 70)}vw`,
            y: `${index % 2 === 0 ? -50 : 50}vh`,
            rotate: direction * 22,
            scale: 0.42,
            opacity: 0,
            duration: 1,
            ease: "power3.in",
          },
          4.5
        );
      });

      /*
       * TITLE EXITS SLIGHTLY BEFORE THE CARDS
       */

      tl.to(
        title,
        {
          y: -40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        },
        4.35
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inspiration"
      className="
        relative
        h-[100svh]
        w-full
        overflow-hidden
        bg-[#151515]
        text-[#F3F3EE]
      "
    >
      {/* --------------------------------
          BACKGROUND
      -------------------------------- */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[60vw]
            w-[60vw]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/[0.018]
            blur-3xl
          "
        />

        <svg
          className="
            absolute
            inset-0
            h-full
            w-full
            opacity-[0.045]
          "
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <path
            d="M-100 450 C250 100 500 800 850 400 S1200 150 1550 450"
            fill="none"
            stroke="currentColor"
          />

          <path
            d="M-100 500 C250 150 500 850 850 450 S1200 200 1550 500"
            fill="none"
            stroke="currentColor"
          />
        </svg>
      </div>

      {/* --------------------------------
          TITLE
      -------------------------------- */}

      <div
        ref={titleRef}
        className="
          absolute
          left-6
          top-8
          z-[100]
          md:left-10
          md:top-9
        "
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-7 bg-white/25" />

          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-white/45
              md:text-[10px]
            "
          >
            Inspiration
          </span>
        </div>

        <h2
          className="
            mt-4
            font-display
            text-[clamp(3rem,6vw,6rem)]
            uppercase
            leading-[0.82]
            tracking-[-0.045em]
          "
        >
          People
        </h2>
      </div>

      {/* --------------------------------
          CARDS
      -------------------------------- */}

      <div className="relative z-20 h-full w-full">
        {inspirations.map((person, index) => (
          <div
            key={person.name}
            ref={(el) => {
              if (el) {
                cardsRef.current[index] = el;
              }
            }}
            className="
              absolute
              left-1/2
              top-1/2
              w-[clamp(145px,17vw,255px)]
              will-change-transform
            "
          >
            <div className="relative">
              {/* IMAGE */}

              <div
                className="
                  relative
                  aspect-[3/4]
                  w-full
                  overflow-hidden
                  bg-white/[0.04]
                "
              >
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    hover:scale-[1.025]
                  "
                  sizes="(max-width: 768px) 35vw, 18vw"
                />
              </div>

              {/* CARD INFO */}

              <div
                className="
                  mt-2
                  flex
                  items-center
                  justify-between
                  border-t
                  border-white/10
                  pt-2
                "
              >
                <p
                  className="
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-white/65
                  "
                >
                  {person.name}
                </p>

                <p
                  className="
                    text-[7px]
                    uppercase
                    tracking-[0.18em]
                    text-white/25
                  "
                >
                  {person.role}
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
            text-white/25
            md:text-[9px]
          "
        >
          People · Ideas · Energy
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
            uppercase
            tracking-[0.22em]
            text-white/25
            md:text-[9px]
          "
        >
          Scroll →
        </p>
      </div>
    </section>
  );
}
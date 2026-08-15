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
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const activeNumberRef = useRef<HTMLSpanElement>(null);
  const activeNameRef = useRef<HTMLSpanElement>(null);
  const activeRoleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    const spotlight = spotlightRef.current;
    const progress = progressRef.current;
    const activeNumber = activeNumberRef.current;
    const activeName = activeNameRef.current;
    const activeRole = activeRoleRef.current;

    if (
      !section ||
      cards.length !== inspirations.length ||
      !spotlight ||
      !progress ||
      !activeNumber ||
      !activeName ||
      !activeRole
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      /*
       * ---------------------------------------------------------
       * LAYOUT POSITIONS
       * ---------------------------------------------------------
       */

      const sidePositions = isMobile
        ? [
            { x: -34, y: -18, rotate: -7, scale: 0.62 },
            { x: 34, y: -18, rotate: 7, scale: 0.62 },
            { x: -34, y: 23, rotate: 6, scale: 0.58 },
            { x: 34, y: 23, rotate: -6, scale: 0.58 },
          ]
        : [
            { x: -34, y: -17, rotate: -7, scale: 0.68 },
            { x: 34, y: -17, rotate: 7, scale: 0.68 },
            { x: -29, y: 20, rotate: 6, scale: 0.62 },
            { x: 31, y: 20, rotate: -6, scale: 0.62 },
          ];

      /*
       * ---------------------------------------------------------
       * INITIAL STATE
       * ---------------------------------------------------------
       */

      cards.forEach((card, index) => {
        const position = sidePositions[index];

        if (index === 0) {
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            zIndex: 50,
            filter: "brightness(1)",
          });
        } else {
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: `${position.x}vw`,
            y: `${position.y}vh`,
            rotate: position.rotate,
            scale: position.scale,
            opacity: 0.5,
            zIndex: 20,
            filter: "brightness(0.65)",
          });
        }
      });

      gsap.set(spotlight, {
        scale: 0.75,
        opacity: 0.35,
      });

      gsap.set(progress, {
        width: "25%",
      });

      /*
       * ---------------------------------------------------------
       * HELPERS
       * ---------------------------------------------------------
       */

      const getSidePosition = (index: number, activeIndex: number) => {
        const available = sidePositions.filter(
          (_, positionIndex) => positionIndex !== activeIndex
        );

        const positionIndex =
          (index > activeIndex ? index - 1 : index) % available.length;

        return available[positionIndex];
      };

      const updateActiveText = (index: number) => {
        if (!activeNumber || !activeName || !activeRole) return;

        const item = inspirations[index];

        activeNumber.textContent = String(index + 1).padStart(2, "0");
        activeName.textContent = item.name;
        activeRole.textContent = item.role;
      };

      updateActiveText(0);

      /*
       * ---------------------------------------------------------
       * MAIN TIMELINE
       * ---------------------------------------------------------
       */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isMobile ? "+=600%" : "+=700%",
          scrub: 1.15,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * ---------------------------------------------------------
       * INTRO
       * ---------------------------------------------------------
       */

      tl.fromTo(
        spotlight,
        { scale: 0.55, opacity: 0 },
        { scale: 1, opacity: 0.38, duration: 0.8, ease: "power3.out" },
        0
      );

      /*
       * ---------------------------------------------------------
       * EACH PERSON BECOMES THE FEATURED CARD
       * ---------------------------------------------------------
       */

      for (let activeIndex = 0; activeIndex < inspirations.length; activeIndex++) {
        const stepStart = activeIndex * 1.5;

        tl.call(() => updateActiveText(activeIndex), [], stepStart);

        const activeCard = cards[activeIndex];

        tl.to(
          activeCard,
          {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            zIndex: 50,
            filter: "brightness(1)",
            duration: 1,
            ease: "power3.inOut",
          },
          stepStart
        );

        const activeImage = activeCard.querySelector("[data-image]");

        if (activeImage) {
          tl.fromTo(
            activeImage,
            { scale: 1.08 },
            { scale: 1, duration: 1.1, ease: "power2.out" },
            stepStart
          );
        }

        // --- INACTIVE CARDS: two-stage move (arc outward, then settle) ---
        // instead of a single snap-to-position tween. This is what makes
        // the transition itself read as physical motion.
        cards.forEach((card, cardIndex) => {
          if (cardIndex === activeIndex) return;

          const position = getSidePosition(cardIndex, activeIndex);
          const overshootSign = cardIndex % 2 === 0 ? 1 : -1;

          tl.to(
            card,
            {
              x: `${position.x + overshootSign * 3}vw`,
              y: `${position.y - 4}vh`,
              rotate: position.rotate + overshootSign * 6,
              scale: position.scale + 0.05,
              opacity: 0.65,
              zIndex: 20,
              filter: "brightness(0.7)",
              duration: 0.55,
              ease: "power2.out",
            },
            stepStart
          ).to(
            card,
            {
              x: `${position.x}vw`,
              y: `${position.y}vh`,
              rotate: position.rotate,
              scale: position.scale,
              opacity: 0.5,
              filter: "brightness(0.62)",
              duration: 0.55,
              ease: "power2.inOut",
            },
            stepStart + 0.55
          );
        });

        tl.to(
          spotlight,
          { scale: 1.08, opacity: 0.42, duration: 0.5, ease: "power2.out" },
          stepStart + 0.25
        );

        tl.to(
          spotlight,
          { scale: 0.95, opacity: 0.32, duration: 0.7, ease: "power2.inOut" },
          stepStart + 0.75
        );

        tl.to(
          progress,
          {
            width: `${((activeIndex + 1) / inspirations.length) * 100}%`,
            duration: 1,
            ease: "power2.inOut",
          },
          stepStart
        );

        // --- IDLE "BREATHE" DURING THE PAUSE ---
        // Replaces the old empty spacer tween with a subtle scale/rotate
        // pulse on every inactive card — still fully scroll-driven (no
        // repeat: -1, no independent loop), just placed later in the
        // same timeline so it stays in sync with scrub.
        if (activeIndex < inspirations.length - 1) {
          cards.forEach((card, cardIndex) => {
            if (cardIndex === activeIndex) return;
            const drift = cardIndex % 2 === 0 ? 1 : -1;

            tl.to(
              card,
              {
                rotate: `+=${drift * 3}`,
                scale: "+=0.03",
                duration: 0.25,
                ease: "sine.inOut",
              },
              stepStart + 1
            ).to(
              card,
              {
                rotate: `-=${drift * 3}`,
                scale: "-=0.03",
                duration: 0.25,
                ease: "sine.inOut",
              },
              stepStart + 1.25
            );
          });
        }
      }

      /*
       * ---------------------------------------------------------
       * FINAL EXIT
       * ---------------------------------------------------------
       */

      const exitStart = inspirations.length * 1.5;

      cards.forEach((card, index) => {
        const direction = index % 2 === 0 ? -1 : 1;

        tl.to(
          card,
          {
            x: `${direction * 55}vw`,
            y: `${index % 2 === 0 ? -38 : 38}vh`,
            rotate: direction * 18,
            scale: 0.42,
            opacity: 0,
            duration: 1,
            ease: "power3.in",
          },
          exitStart
        );
      });

      tl.to(
        spotlight,
        { scale: 1.5, opacity: 0, duration: 1, ease: "power3.in" },
        exitStart
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
        h-screen
        w-full
        overflow-hidden
        bg-[#151515]
        text-[#F3F3EE]
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div
          ref={spotlightRef}
          className="
            absolute
            left-1/2
            top-1/2
            h-[42vw]
            w-[42vw]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/[0.035]
            blur-[100px]
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-[-25%]
            h-[55vw]
            w-[55vw]
            -translate-x-1/2
            rounded-full
            bg-white/[0.018]
            blur-[100px]
          "
        />

        <svg
          className="absolute inset-0 h-full w-full opacity-[0.07]"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <path
            d="M-100 450 C200 180 470 730 760 420 S1200 120 1540 420"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M-100 500 C200 230 470 780 760 470 S1200 170 1540 470"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M-100 550 C200 280 470 830 760 520 S1200 220 1540 520"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-6
          top-8
          z-[100]
          md:left-10
          md:top-10
        "
      >
        <h2
          className="
            font-display
            text-[clamp(3.2rem,6vw,6rem)]
            uppercase
            leading-[0.82]
            tracking-[-0.045em]
            text-white
          "
        >
          Inspiration
        </h2>
      </div>

      {/* =====================================================
          CENTER FEATURE INFORMATION
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-9
          left-6
          z-[100]
          flex
          items-end
          gap-4
          md:left-10
        "
      >
        <span
          ref={activeNumberRef}
          className="font-mono text-[10px] tracking-[0.18em] text-white/35"
        >
          01
        </span>

        <div className="h-7 w-px bg-white/15" />

        <div className="flex flex-col">
          <span
            ref={activeNameRef}
            className="text-[11px] uppercase tracking-[0.2em] text-white/80"
          >
            Lionel Messi
          </span>

          <span
            ref={activeRoleRef}
            className="mt-1 text-[8px] uppercase tracking-[0.25em] text-white/30"
          >
            Discipline
          </span>
        </div>
      </div>

      {/* =====================================================
          PROGRESS
      ====================================================== */}

      <div
        className="
          absolute
          bottom-10
          right-6
          z-[100]
          w-[100px]
          md:right-10
          md:w-[140px]
        "
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[8px] uppercase tracking-[0.2em] text-white/25">
            People
          </span>

          <span className="font-mono text-[8px] tracking-[0.15em] text-white/25">
            04
          </span>
        </div>

        <div className="relative h-px w-full bg-white/10">
          <div
            ref={progressRef}
            className="absolute left-0 top-0 h-px bg-white/70"
          />
        </div>
      </div>

      {/* =====================================================
          CARDS
      ====================================================== */}

      <div className="relative z-20 h-full w-full">
        {inspirations.map((person, index) => (
          <div
            key={person.name}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="
              absolute
              left-1/2
              top-1/2
              w-[clamp(170px,20vw,290px)]
              will-change-transform
            "
          >
            <div className="relative">
              <div
                className="
                  relative
                  aspect-[3/4]
                  overflow-hidden
                  bg-[#242424]
                  shadow-[0_30px_80px_rgba(0,0,0,0.3)]
                "
              >
                <Image
                  data-image
                  src={person.image}
                  alt={person.name}
                  fill
                  priority={index === 0}
                  className="object-cover will-change-transform"
                  sizes="(max-width: 768px) 42vw, 22vw"
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/30
                    via-transparent
                    to-black/10
                  "
                />

                <span
                  className="
                    absolute
                    left-3
                    top-3
                    font-mono
                    text-[8px]
                    tracking-[0.15em]
                    text-white/60
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  border-t
                  border-white/10
                  pt-2
                "
              >
                <span className="text-[8px] uppercase tracking-[0.18em] text-white/65">
                  {person.name}
                </span>

                <span className="text-[7px] uppercase tracking-[0.18em] text-white/25">
                  {person.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* =====================================================
          SMALL TOP RIGHT INDEX
      ====================================================== */}

      <div
        className="
          absolute
          right-6
          top-9
          z-[100]
          font-mono
          text-[8px]
          tracking-[0.2em]
          text-white/20
          md:right-10
        "
      >
        04 PEOPLE
      </div>
    </section>
  );
}
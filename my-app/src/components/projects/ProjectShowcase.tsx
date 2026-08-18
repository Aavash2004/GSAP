"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "Personal Portfolio",
    description:
      "An interactive developer portfolio focused on modern web experiences, animation and visual storytelling.",
    tech: "NEXT.JS · REACT · TYPESCRIPT · GSAP",
    image: "/images/portfolio.png",
    url: "https://portfolio-five-xi-bkrbjy6mfr.vercel.app/",
  },
  {
    number: "02",
    title: "NepalGharJagga",
    description:
      "A modern real-estate platform for discovering and managing property listings.",
    tech: "NEXT.JS · REACT · TYPESCRIPT",
    image: "/images/ghar.png",
    url: "#",
  },
  {
    number: "03",
    title: "Blog",
    description:
      "A modern blogging platform designed for publishing and exploring digital content.",
    tech: "NEXT.JS · TYPESCRIPT",
    image: "/images/blog.png",
    url: "https://dummymodel.vercel.app/",
  },
];

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const background = backgroundRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const mobile = window.innerWidth < 768;

      const getHorizontalDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      const foldDistance = window.innerHeight * (mobile ? 0.9 : 1.25);

      /*
       * ---------------------------------------------------------
       * MAIN PROJECT TIMELINE
       * ---------------------------------------------------------
       */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () =>
            `+=${getHorizontalDistance() + foldDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * Horizontal movement
       */

      timeline.to(
        track,
        {
          x: () => -getHorizontalDistance(),
          duration: () => getHorizontalDistance() || 1,
          ease: "none",
        },
        0
      );

      /*
       * Background movement
       */

      if (background) {
        timeline.to(
          background,
          {
            x: "-4vw",
            duration: () => getHorizontalDistance() || 1,
            ease: "none",
          },
          0
        );
      }

      /*
       * ---------------------------------------------------------
       * FOLD INTO NEXT SECTION
       * ---------------------------------------------------------
       */

      gsap.set(section, {
        transformOrigin: "50% 0%",
        transformStyle: "preserve-3d",
      });

      timeline.to(
        section,
        {
          rotateX: mobile ? -6 : -14,
          scale: mobile ? 0.97 : 0.9,
          y: mobile ? "-4%" : "-8%",
          borderRadius: mobile ? "18px" : "28px",
          opacity: 0,
          duration: foldDistance,
          ease: "power2.inOut",
        },
        getHorizontalDistance() || 1
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="
        relative
        h-[100svh]
        w-full
        overflow-hidden
        bg-[#E9E9E5]
        text-[#111]
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        ref={backgroundRef}
        className="
          pointer-events-none
          absolute
          inset-0
          will-change-transform
        "
      >
        {/* Soft light */}

        <div
          className="
            absolute
            left-[18%]
            top-[12%]
            h-[50vh]
            w-[50vh]
            rounded-full
            bg-white/30
            blur-[110px]
          "
        />

        {/* Soft lower shadow */}

        <div
          className="
            absolute
            bottom-[-20%]
            right-[-8%]
            h-[55vh]
            w-[55vh]
            rounded-full
            bg-[#D4D4CF]/25
            blur-[110px]
          "
        />

        {/* Very subtle contour lines */}

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
            stroke="#c7c7c0"
            strokeWidth="0.8"
            opacity="0.24"
          >
            <path d="M-100 520 C180 280 390 720 680 410 S1100 130 1710 390" />

            <path d="M-100 570 C180 330 390 770 680 460 S1100 180 1710 440" />

            <path d="M-100 620 C180 380 390 820 680 510 S1100 230 1710 490" />

            <path d="M-100 670 C180 430 390 870 680 560 S1100 280 1710 540" />
          </g>
        </svg>
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header
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
          02 / Selected work
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
          Projects
        </h2>
      </header>

      {/* =====================================================
          HORIZONTAL PROJECT TRACK
      ====================================================== */}

      <div
        ref={trackRef}
        className="
          relative
          z-20
          flex
          h-full
          w-max
          items-center
          gap-[7vw]
          px-[7vw]
          pt-[5vh]
        "
      >
        {projects.map((project) => (
          <article
            key={project.number}
            className="
              relative
              grid
              h-[56vh]
              w-[76vw]
              shrink-0
              grid-cols-[minmax(0,1.1fr)_minmax(220px,0.7fr)]
              items-center
              gap-[5vw]

              lg:w-[70vw]
              xl:w-[67vw]
            "
          >
            {/* =================================================
                IMAGE
            ================================================== */}

            <div
              className="
                group
                relative
                h-[34vh]
                w-full
                max-w-[500px]
                justify-self-end
                overflow-hidden
                rounded-[2px]
                bg-[#deded9]
                shadow-[0_18px_50px_rgba(0,0,0,0.07)]

                sm:h-[36vh]
                lg:h-[39vh]
                xl:h-[41vh]
              "
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority={project.number === "01"}
                loading={project.number === "01" ? "eager" : "lazy"}
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.025]
                "
                sizes="(max-width: 768px) 72vw, 38vw"
              />

              {/* Image index */}

              <div
                className="
                  absolute
                  left-3
                  top-3
                  text-[8px]
                  font-medium
                  tracking-[0.18em]
                  text-white/90
                  drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]
                "
              >
                {project.number} / 03
              </div>
            </div>

            {/* =================================================
                INFORMATION
            ================================================== */}

            <div
              className="
                flex
                w-full
                max-w-[330px]
                flex-col
                justify-center
                justify-self-start
              "
            >
              {/* Small project marker */}

              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.28em]
                    text-black/35
                  "
                >
                  Project
                </span>

                <span
                  className="
                    h-px
                    w-6
                    bg-black/15
                  "
                />

                <span
                  className="
                    text-[8px]
                    tracking-[0.2em]
                    text-black/35
                  "
                >
                  {project.number}
                </span>
              </div>

              {/* Title */}

              <h3
                className="
                  max-w-[330px]
                  font-display
                  text-[clamp(2rem,2.8vw,3.4rem)]
                  font-medium
                  uppercase
                  leading-[0.88]
                  tracking-[-0.035em]
                "
              >
                {project.title}
              </h3>

              {/* Description */}

              <p
                className="
                  mt-5
                  max-w-[310px]
                  text-[11px]
                  leading-[1.7]
                  text-black/50

                  md:text-[12px]
                "
              >
                {project.description}
              </p>

              {/* Technology */}

              <p
                className="
                  mt-5
                  text-[7px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-black/35

                  md:text-[8px]
                "
              >
                {project.tech}
              </p>

              {/* Link */}

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group/link
                  mt-6
                  flex
                  w-fit
                  items-center
                  gap-2
                  border-b
                  border-black/20
                  pb-2
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.22em]
                  text-black/65
                  transition-all
                  duration-300
                  hover:border-black/60
                  hover:text-black

                  md:text-[9px]
                "
              >
                <span>View project</span>

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover/link:translate-x-1
                  "
                >
                  ↗
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* =====================================================
          FOOTER INFORMATION
      ====================================================== */}

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
            tracking-[0.24em]
            text-black/35
          "
        >
          Selected work
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
          "
        >
          01 — 03
        </p>
      </div>
    </section>
  );
}
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
      "An interactive portfolio focused on modern web experiences, animation and visual storytelling.",
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
    image: "/images/nepalgharjagga.png",
    url: "#",
  },
  {
    number: "03",
    title: "Blog",
    description:
      "A clean blogging platform for publishing and exploring digital content.",
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
      const isMobile = window.innerWidth < 768;

      const getScrollAmount = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      const foldDistance = window.innerHeight * (isMobile ? 0.9 : 1.25);

      const getTotalDistance = () =>
        getScrollAmount() + foldDistance;

      /*
       * PROJECT → NEXT SECTION TRANSITION
       */

      gsap.set(section, {
        transformOrigin: "50% 0%",
        transformStyle: "preserve-3d",
      });

      /*
       * ONE MASTER TIMELINE
       */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getTotalDistance()}`,
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * HORIZONTAL PROJECT SCROLL
       */

      tl.to(
        track,
        {
          x: () => -getScrollAmount(),
          duration: getScrollAmount() || 1,
          ease: "none",
        },
        0
      );

      /*
       * BACKGROUND PARALLAX
       */

      if (background) {
        tl.to(
          background,
          {
            x: "-4vw",
            duration: getScrollAmount() || 1,
            ease: "none",
          },
          0
        );
      }

      /*
       * 3D FOLD INTO NEXT SECTION
       */

      tl.to(
        section,
        {
          rotateX: isMobile ? -7 : -16,
          scale: isMobile ? 0.96 : 0.9,
          y: isMobile ? "-5%" : "-10%",
          borderRadius: isMobile ? "18px" : "32px",
          opacity: 0,
          duration: foldDistance,
          ease: "power2.inOut",
        },
        getScrollAmount() || 1
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
      {/* BACKGROUND */}

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
            -left-[12%]
            top-[5%]
            h-[55vh]
            w-[55vh]
            rounded-full
            bg-white/35
            blur-3xl
          "
        />

        {/* Soft shadow */}

        <div
          className="
            absolute
            -right-[12%]
            bottom-[-18%]
            h-[65vh]
            w-[65vh]
            rounded-full
            bg-[#D5D5D0]/30
            blur-3xl
          "
        />

        {/* Topographic lines */}

        <svg
          className="
            absolute
            inset-0
            h-full
            w-full
            opacity-[0.1]
          "
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <path
            d="M-100 500 C200 250 350 700 650 400 S1100 100 1540 350"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />

          <path
            d="M-100 560 C200 310 350 760 650 460 S1100 160 1540 410"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />

          <path
            d="M-100 620 C200 370 350 820 650 520 S1100 220 1540 470"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />

          <path
            d="M-100 680 C200 430 350 880 650 580 S1100 280 1540 530"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* PROJECT HEADING */}

      <div
        className="
          pointer-events-none
          absolute
          left-6
          top-7
          z-30
          md:left-10
          md:top-8
        "
      >
        <h2
          className="
            font-display
            text-[clamp(2.8rem,5vw,5rem)]
            font-normal
            uppercase
            leading-none
            tracking-[-0.045em]
          "
        >
          Projects
        </h2>
      </div>

      {/* PROJECT TRACK */}

      <div
        ref={trackRef}
        className="
          relative
          z-20
          flex
          h-full
          w-max
          items-center
          gap-[4vw]
          px-[7vw]
          pt-8
          will-change-transform
        "
      >
        {projects.map((project) => (
          <article
            key={project.number}
            className="
              relative
              grid
              h-[54vh]
              w-[70vw]
              shrink-0
              grid-cols-[minmax(0,1fr)_minmax(220px,0.55fr)]
              items-center
              gap-[4vw]

              lg:h-[56vh]
              lg:w-[68vw]

              xl:w-[66vw]
            "
          >
            {/* IMAGE */}

            <div
              className="
                group
                relative
                h-[36vh]
                w-full
                max-w-[470px]
                justify-self-end
                overflow-hidden
                bg-[#dcdcd7]

                md:h-[39vh]

                lg:h-[41vh]

                xl:h-[43vh]
              "
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority={project.number === "01"}
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.02]
                "
                sizes="
                  (max-width: 768px) 80vw,
                  40vw
                "
              />

              <div
                className="
                  absolute
                  left-4
                  top-4
                  text-[8px]
                  tracking-[0.18em]
                  text-white/80
                  drop-shadow
                "
              >
                {project.number}
              </div>
            </div>

            {/* INFORMATION */}

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
              {/* SMALL NUMBER */}

              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-3
                  text-[8px]
                  uppercase
                  tracking-[0.24em]
                  text-black/35
                "
              >
                <span>Project</span>

                <span className="h-px w-5 bg-black/15" />

                <span>{project.number}</span>
              </div>

              {/* TITLE */}

              <h3
                className="
                  max-w-[320px]
                  font-display
                  text-[clamp(2rem,2.8vw,3.4rem)]
                  font-normal
                  uppercase
                  leading-[0.9]
                  tracking-[-0.04em]
                "
              >
                {project.title}
              </h3>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-5
                  max-w-[310px]
                  text-[11px]
                  leading-[1.65]
                  text-black/50
                  md:text-xs
                "
              >
                {project.description}
              </p>

              {/* TECHNOLOGY */}

              <p
                className="
                  mt-5
                  text-[7px]
                  font-medium
                  tracking-[0.18em]
                  text-black/40
                  md:text-[8px]
                "
              >
                {project.tech}
              </p>

              {/* LINK */}

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
                  pb-1.5
                  text-[8px]
                  uppercase
                  tracking-[0.2em]
                  text-black/60
                  transition-all
                  duration-300
                  hover:border-black
                  hover:text-black
                  md:text-[9px]
                "
              >
                <span>View Project</span>

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

      {/* PROJECT COUNTER */}

      <div
        className="
          absolute
          bottom-6
          left-6
          z-30
          text-[8px]
          tracking-[0.2em]
          text-black/35
          md:bottom-8
          md:left-10
          md:text-[9px]
        "
      >
        01 — 03
      </div>

      {/* SCROLL INDICATOR */}

      <div
        className="
          absolute
          bottom-6
          right-6
          z-30
          text-[8px]
          uppercase
          tracking-[0.22em]
          text-black/35
          md:bottom-8
          md:right-10
          md:text-[9px]
        "
      >
        Scroll →
      </div>
    </section>
  );
}
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
      "A modern real-estate e-commerce platform for discovering and managing property listings.",
    tech: "NEXT.JS · REACT · TYPESCRIPT",
    image: "/images/nepalgharjagga.png",
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
      const getScrollAmount = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth);
      };


      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      if (background) {
        gsap.to(background, {
          x: "-6vw",
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });
      }
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
        overflow-hidden
        bg-[#E9E9E5]
        text-[#111]
      "
    >
      <div
        ref={backgroundRef}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="
            absolute
            -left-[15%]
            top-[8%]
            h-[65vh]
            w-[65vh]
            rounded-full
            bg-white/40
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-[10%]
            bottom-[-20%]
            h-[75vh]
            w-[75vh]
            rounded-full
            bg-[#D6D6D1]/40
            blur-3xl
          "
        />

        <svg
          className="
            absolute
            inset-0
            h-full
            w-full
            opacity-[0.18]
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
      <div
        className="
          pointer-events-none
          absolute
          left-6
          top-16
          z-30
          md:left-10
          md:top-8
        "
      >
        <h2
          className="
            font-display
            text-[clamp(3.2rem,6vw,6rem)]
            uppercase
            leading-[0.85]
            tracking-[-0.04em]
          "
        >
          Projects
        </h2>
      </div>
      <div
        ref={trackRef}
        className="
          relative
          z-20
          flex
          h-full
          w-max
          items-center
          gap-[3vw]
          px-[5vw]
          pt-12
        "
      >
        {projects.map((project) => (
          <article
            key={project.number}
            className="
              relative
              grid
              h-[60vh]
              w-[74vw]
              shrink-0
              grid-cols-[minmax(0,1fr)_minmax(240px,0.6fr)]
              items-center
              gap-[3vw]

              lg:w-[72vw]
              xl:w-[70vw]
            "
          >     

            <div
              className="
                group
                relative
                h-[40vh]
                w-full
                max-w-[500px]
                justify-self-end
                overflow-hidden

                lg:h-[43vh]
                xl:h-[45vh]
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
                  group-hover:scale-[1.03]
                "
                sizes="(max-width: 768px) 80vw, 40vw"
              />

              <div
                className="
                  absolute
                  left-4
                  top-4
                  text-[10px]
                  tracking-widest
                  text-white
                  drop-shadow-md
                "
              >
                {project.number} / 03
              </div>
            </div>

            <div
              className="
                flex
                w-full
                max-w-[360px]
                flex-col
                justify-center
                justify-self-start
              "
            >
              <span
                className="
                  mb-3
                  text-[9px]
                  uppercase
                  tracking-[0.3em]
                  opacity-40

                  md:text-[10px]
                "
              >
                Project {project.number}
              </span>

              <h3
                className="
                  max-w-full
                  font-display
                  text-[clamp(2.2rem,3vw,3.8rem)]
                  uppercase
                  leading-[0.88]
                  tracking-[-0.03em]
                "
              >
                {project.title}
              </h3>

              <p
                className="
                  mt-4
                  max-w-[340px]
                  text-xs
                  leading-5
                  opacity-60

                  md:text-sm
                  md:leading-6
                "
              >
                {project.description}
              </p>

              <p
                className="
                  mt-5
                  text-[8px]
                  tracking-[0.16em]
                  opacity-50

                  md:text-[9px]
                "
              >
                {project.tech}
              </p>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-6
                  w-fit
                  border-b
                  border-black/30
                  pb-2
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  transition-all
                  duration-300
                  hover:border-black

                  md:text-[10px]
                "
              >
                View Project ↗
              </a>
            </div>
          </article>
        ))}
      </div>
      <div
        className="
          absolute
          bottom-6
          left-6
          z-30
          text-[10px]
          tracking-widest
          opacity-50

          md:bottom-8
          md:left-10
          md:text-xs
        "
      >
        01 — 03
      </div>

      <div
        className="
          absolute
          bottom-6
          right-6
          z-30
          text-[10px]
          uppercase
          tracking-[0.25em]
          opacity-50

          md:bottom-8
          md:right-10
          md:text-xs
        "
      >
        Scroll →
      </div>

    </section>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import WebGLImage from "@/components/webgl/WebGLImage";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/types/portfolio";

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
  {
    number: "01",
    title: "Personal Portfolio",
    description:
      "An interactive creative developer portfolio blending modern web animation, storytelling, and high-performance editorial typography.",
    tech: "NEXT.JS · REACT · TYPESCRIPT · GSAP · LENIS",
    image: "/images/portfolio.png",
    url: "https://portfolio-five-xi-bkrbjy6mfr.vercel.app/",
    year: "2026",
    category: "INTERACTIVE EXPERIENCE",
  },
  {
    number: "02",
    title: "NepalGharJagga",
    description:
      "A high-end property discovery platform featuring real-time map integration, spatial filters, and minimal architectural aesthetics.",
    tech: "NEXT.JS · REACT · TYPESCRIPT · TAILWIND",
    image: "/images/ghar.png",
    url: "#",
    year: "2025",
    category: "REAL ESTATE PLATFORM",
  },
  {
    number: "03",
    title: "Editorial Blog",
    description:
      "A minimalist publication platform designed for long-form creative writing, dark-mode reading, and fluid typography.",
    tech: "NEXT.JS · TYPESCRIPT · TAILWIND CSS",
    image: "/images/blog.png",
    url: "https://dummymodel.vercel.app/",
    year: "2025",
    category: "DIGITAL PUBLICATION",
  },
];

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const background = backgroundRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getHorizontalDistance = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth);
      };

      /* Initial States */
      gsap.set(section, {
        transformOrigin: "50% 0%",
        transformStyle: "preserve-3d",
      });

      // Prepare images and text initial states for active scene transitions
      imageRefs.current.forEach((img, idx) => {
        if (!img) return;
        gsap.set(img, {
          scale: idx === 0 ? 1 : 0.94,
          transformOrigin: "center center",
        });
      });

      textRefs.current.forEach((text, idx) => {
        if (!text) return;
        gsap.set(text, {
          opacity: idx === 0 ? 1 : 0.4,
          y: idx === 0 ? 0 : 20,
        });
      });

      /* Main Horizontal Scroll Timeline */
      const mainTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getHorizontalDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update horizontal progress bar indicator
            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, { scaleX: self.progress });
            }

            // Calculate active project index dynamically based on scroll ratio
            const newIndex = Math.min(
              projects.length - 1,
              Math.floor(self.progress * projects.length)
            );
            setActiveIndex(newIndex);
          },
        },
      });

      /* 1. Track Horizontal Movement */
      mainTimeline.to(
        track,
        {
          x: () => -getHorizontalDistance(),
          ease: "none",
        },
        0
      );

      /* 2. Parallax & Scale Transitions for Project Cards */
      projects.forEach((_, idx) => {
        const img = imageRefs.current[idx];
        const text = textRefs.current[idx];

        if (img) {
          // Subtle inner image parallax inside card container
          gsap.to(img.querySelector("img"), {
            xPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: cardRefs.current[idx],
              containerAnimation: mainTimeline,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          });

          // Focus scaling when card reaches center
          gsap.fromTo(
            img,
            { scale: 0.94 },
            {
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardRefs.current[idx],
                containerAnimation: mainTimeline,
                start: "left 70%",
                end: "center center",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }

        if (text) {
          // Independent text entrance animation
          gsap.fromTo(
            text,
            { opacity: 0.3, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardRefs.current[idx],
                containerAnimation: mainTimeline,
                start: "left 75%",
                end: "center center",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }
      });

      /* 3. Subtle Background Movement */
      if (background) {
        mainTimeline.to(
          background,
          {
            x: "-5vw",
            ease: "none",
          },
          0
        );
      }
    }, section);

    return () => {
      ctx.revert();
    };
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
        text-[#111111]
      "
    >
      {/* Dynamic Background Grid & Contour Lines */}
      <div
        ref={backgroundRef}
        className="pointer-events-none absolute inset-0 will-change-transform"
      >
        <div className="absolute left-[15%] top-[10%] h-[55vh] w-[55vh] rounded-full bg-white/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[60vh] w-[60vh] rounded-full bg-[#D8D8D2]/40 blur-[130px]" />

        <svg
          className="absolute inset-0 h-full w-full opacity-20"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g fill="none" stroke="#b0b0a8" strokeWidth="0.8">
            <path d="M-100 520 C180 280 390 720 680 410 S1100 130 1710 390" />
            <path d="M-100 570 C180 330 390 770 680 460 S1100 180 1710 440" />
            <path d="M-100 620 C180 380 390 820 680 510 S1100 230 1710 490" />
          </g>
        </svg>
      </div>

      {/* Section Header */}
      <header className="pointer-events-none absolute left-6 top-20 z-[100] md:left-12 md:top-24">
        <div className="mb-2 flex items-center gap-3">
          <span className="text-[9px] font-mono font-medium uppercase tracking-[0.3em] text-black/40">
            02 / Selected Work
          </span>
          <span className="h-px w-8 bg-black/20" />
        </div>
        <h2 className="font-display text-[clamp(2.5rem,4.5vw,4.5rem)] font-extrabold uppercase leading-none tracking-tight">
          Projects
        </h2>
      </header>

      {/* Progress Bar Indicator at Top */}
      <div className="absolute left-6 right-6 top-16 z-[100] h-[2px] bg-black/10 md:left-12 md:right-12">
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left bg-black/80 scale-x-0 transition-transform duration-75"
        />
      </div>

      {/* Horizontal Project Showcase Track */}
      <div
        ref={trackRef}
        className="
          relative
          z-20
          flex
          h-full
          w-max
          items-center
          gap-[6vw]
          px-[8vw]
          pt-[6vh]
        "
      >
        {projects.map((project, index) => {
          const isActive = index === activeIndex;

          return (
            <article
              key={project.number}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="
                relative
                grid
                h-[60vh]
                w-[82vw]
                shrink-0
                grid-cols-1
                items-center
                gap-8
                md:w-[72vw]
                md:grid-cols-[minmax(0,1.1fr)_minmax(240px,0.8fr)]
                lg:w-[65vw]
              "
            >
              {/* Project Image Container */}
              <div
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                data-cursor="view"
                className={`
                  group
                  relative
                  h-[32vh]
                  w-full
                  overflow-hidden
                  rounded-sm
                  bg-[#DED9D2]
                  shadow-[0_20px_50px_rgba(0,0,0,0.09)]
                  transition-shadow
                  duration-500
                  md:h-[40vh]
                  ${isActive ? "shadow-[0_30px_70px_rgba(0,0,0,0.15)]" : ""}
                `}
              >
                <WebGLImage
                  src={project.image}
                  alt={project.title}
                  fill
                  priority={index === 0}
                  intensity={0.06}
                  sizes="(max-width: 768px) 82vw, 42vw"
                  className="h-full w-full"
                />

                <div className="pointer-events-none absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="pointer-events-none absolute left-4 top-4 z-20 rounded bg-black/60 px-2.5 py-1 text-[8px] font-mono tracking-[0.2em] text-white/90 backdrop-blur-xs">
                  {project.number} / 03
                </div>

                {project.category && (
                  <div className="pointer-events-none absolute right-4 top-4 z-20 rounded border border-white/20 bg-black/40 px-2.5 py-1 text-[8px] font-mono tracking-[0.18em] text-white/80 backdrop-blur-xs">
                    {project.category}
                  </div>
                )}
              </div>

              {/* Project Information */}
              <div
                ref={(el) => {
                  textRefs.current[index] = el;
                }}
                className="flex flex-col justify-center px-2"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-black/40">
                    Project {project.number}
                  </span>
                  <span className="h-px w-6 bg-black/15" />
                  <span className="text-[9px] font-mono tracking-[0.2em] text-black/40">
                    {project.year}
                  </span>
                </div>

                <h3 className="font-display text-[clamp(1.8rem,3vw,3.2rem)] font-bold uppercase leading-[0.88] tracking-tight">
                  {project.title}
                </h3>

                <p className="mt-4 max-w-[340px] text-xs leading-relaxed text-black/60 md:text-sm">
                  {project.description}
                </p>

                <p className="mt-4 text-[8px] font-mono uppercase tracking-[0.22em] text-black/40">
                  {project.tech}
                </p>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="
                    group/link
                    mt-6
                    flex
                    w-fit
                    items-center
                    gap-2
                    border-b
                    border-black/30
                    pb-1.5
                    text-[9px]
                    font-mono
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-black
                    transition-all
                    duration-300
                    hover:border-black
                    hover:pl-1
                  "
                >
                  <span>View Project</span>
                  <span className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Footer Details & Active Index Indicator */}
      <div className="absolute bottom-6 left-6 z-[100] md:bottom-8 md:left-12">
        <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-black/40">
          Editorial Gallery
        </p>
      </div>

      <div className="absolute bottom-6 right-6 z-[100] flex items-center gap-3 md:bottom-8 md:right-12">
        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-black">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-6 bg-black/30" />
        <span className="text-[10px] font-mono tracking-[0.2em] text-black/40">
          03
        </span>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import WebGLImage from "@/components/webgl/WebGLImage";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SkillCategory } from "@/types/portfolio";

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
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !cards.length) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      /* Entrance Animation for Big Statement */
      if (statementRef.current) {
        gsap.fromTo(
          statementRef.current.children,
          { opacity: 0, y: 30 },
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

      /* Initial Card Stack Positions */
      cards.forEach((card, index) => {
        if (index === 0) {
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

      /* Scroll Gallery Timeline */
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

      for (let step = 0; step < cards.length - 1; step++) {
        const current = cards[step];
        const next = cards[step + 1];

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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#E9E9E5]
        text-[#111111]
      "
    >
      {/* Background Subtle Contour Grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
        <div className="absolute left-[20%] top-[15%] h-[40vh] w-[40vh] rounded-full bg-white/40 blur-[100px]" />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g fill="none" stroke="#c4c4bc" strokeWidth="0.8">
            <path d="M-120 190 C160 50 300 300 520 160 S900 100 1120 210 S1450 300 1720 120" />
            <path d="M-120 690 C160 550 320 800 540 660 S900 590 1120 700 S1460 810 1720 620" />
          </g>
        </svg>
      </div>

      {/* Section Header */}
      <div className="pointer-events-none absolute left-6 top-20 z-[100] md:left-12 md:top-24">
        <p className="mb-1 text-[9px] font-mono font-medium uppercase tracking-[0.3em] text-black/40">
          01 / About
        </p>
        <h2 className="font-display text-[clamp(2.5rem,4.5vw,4.5rem)] font-extrabold uppercase leading-none tracking-tight">
          Profile
        </h2>
      </div>

      {/* Editorial Container */}
      <div className="relative z-20 mx-auto flex h-full min-h-screen w-full max-w-7xl flex-col justify-between px-6 pt-36 pb-16 md:px-12 md:pt-40">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Minimal Headline & Skill List */}
          <div className="space-y-6 lg:col-span-6 xl:col-span-7">
          </div>
          {/* Right Column: Stacked Visual Gallery */}
          <div className="relative min-h-[340px] w-full lg:col-span-6 lg:min-h-[460px] xl:col-span-5">
            <div className="relative h-full w-full">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  data-cursor="view"
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    w-[clamp(190px,25vw,330px)]
                    will-change-transform
                  "
                >
                  <div className="relative">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xs bg-[#DED9D2] shadow-[0_20px_45px_rgba(0,0,0,0.09)]">
                      <WebGLImage
                        src={image.src}
                        alt={image.alt}
                        fill
                        priority={index === 0}
                        intensity={0.05}
                        sizes="(max-width: 768px) 70vw, 25vw"
                        className="h-full w-full"
                      />

                      <div className="pointer-events-none absolute left-3 top-3 z-20 text-[8px] font-mono tracking-[0.18em] text-white/90 drop-shadow-md">
                        {String(index + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between border-t border-black/10 pt-1.5 text-[8px] font-mono uppercase tracking-[0.2em] text-black/60">
                      <span>{image.label}</span>
                      <span className="text-black/35">{image.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

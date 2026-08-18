"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WebGLImage from "@/components/webgl/WebGLImage";

gsap.registerPlugin(ScrollTrigger);

interface SocialLink {
  number: string;
  name: string;
  handle: string;
  href: string;
  image: string;
}

const socialLinks: SocialLink[] = [
  {
    number: "01",
    name: "GITHUB",
    handle: "@yourusername",
    href: "https://github.com/yourusername",
    image: "",
  },
  {
    number: "02",
    name: "LINKEDIN",
    handle: "Aavash Basnet",
    href: "https://linkedin.com/in/yourusername",
    image:"",
  },
  {
    number: "03",
    name: "INSTAGRAM",
    handle: "@yourusername",
    href: "https://instagram.com/yourusername",
    image: "",
  },
];

export default function SocialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);

  const previewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const links = linksRef.current.filter(
      Boolean
    ) as HTMLAnchorElement[];

    if (!section || !title || !links.length) return;

    const ctx = gsap.context(() => {
      /* =====================================================
         TITLE
      ===================================================== */

      gsap.fromTo(
        title,
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );

      /* =====================================================
         SOCIAL ROWS
      ===================================================== */

      links.forEach((link, index) => {
        const number = link.querySelector(
          ".social-number"
        ) as HTMLElement | null;

        const name = link.querySelector(
          ".social-name"
        ) as HTMLElement | null;

        const handle = link.querySelector(
          ".social-handle"
        ) as HTMLElement | null;

        const arrow = link.querySelector(
          ".social-arrow"
        ) as HTMLElement | null;

        /* Initial state */

        gsap.set(link, {
          y: 80 + index * 20,
          opacity: 0,
        });

        /* Entrance */

        gsap.to(link, {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: link,
            start: "top 92%",
            end: "top 62%",
            scrub: 1,
          },
        });

        /* Name movement */

        if (name) {
          gsap.to(name, {
            x: index % 2 === 0 ? 18 : -18,
            ease: "none",
            scrollTrigger: {
              trigger: link,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }

        /* Handle movement */

        if (handle) {
          gsap.to(handle, {
            x: index % 2 === 0 ? 8 : -8,
            ease: "none",
            scrollTrigger: {
              trigger: link,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          });
        }

        /* Number movement */

        if (number) {
          gsap.to(number, {
            y: -12,
            ease: "none",
            scrollTrigger: {
              trigger: link,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        /* Arrow movement */

        if (arrow) {
          gsap.to(arrow, {
            y: -14,
            rotation: index % 2 === 0 ? 8 : -8,
            ease: "none",
            scrollTrigger: {
              trigger: link,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }
      });

      /* =====================================================
         FOOTER ENTRANCE
      ===================================================== */

      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              end: "top 65%",
              scrub: 1,
            },
          }
        );
      }

      /* =====================================================
         SECTION EXIT
      ===================================================== */

      gsap.to(section, {
        yPercent: -8,
        scale: 0.97,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  /* =====================================================
     BACK TO TOP
  ===================================================== */

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="socials"
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#E9E9E5]
        px-6
        pt-32
        pb-12
        text-[#111111]
        md:px-12
        md:pt-40
      "
    >
      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-7xl">

        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="mb-20 md:mb-28">
          <p
            className="
              mb-3
              text-[8px]
              font-mono
              font-medium
              uppercase
              tracking-[0.3em]
              text-black/35
            "
          >
            03 / Elsewhere
          </p>

          <h2
            ref={titleRef}
            className="
              font-display
              text-[clamp(2rem,3.5vw,3.2rem)]
              font-medium
              uppercase
              leading-[0.8]
              tracking-[-0.05em]
            "
          >
            Elsewhere
          </h2>
        </div>

        {/* =================================================
            SOCIAL LINKS
        ================================================= */}

        <div className="w-full border-t border-black/15">

          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => {
                linksRef.current[index] = el;
              }}
              className="
                group
                relative
                flex
                w-full
                items-center
                justify-between
                border-b
                border-black/15
                py-8
                md:py-12
              "
            >
              {/* =========================================
                  LEFT
              ========================================= */}

              <div className="flex items-center gap-6 md:gap-12">

                {/* Number */}

                <span
                  className="
                    social-number
                    text-[8px]
                    font-mono
                    tracking-[0.2em]
                    text-black/35
                    transition-colors
                    duration-300
                  
                  "
                >
                  {social.number}
                </span>

                {/* Name + Handle */}

                <div>

                  <span
                    className="
                      social-name
                      block
                      font-display
                      text-[clamp(1.3rem,2.8vw,2.4rem)]
                      font-medium
                      uppercase
                      leading-[0.9]
                      tracking-[-0.03em]
                      transition-transform
                      duration-500
                      
                    "
                  >
                    {social.name}
                  </span>

                  <span
                    className="
                      social-handle
                      mt-2
                      block
                      text-[8px]
                      font-mono
                      uppercase
                      tracking-[0.22em]
                      text-black/40
                      transition-transform
                      duration-500
               
                    "
                  >
                    {social.handle}
                  </span>

                </div>
              </div>

              {/* =========================================
                  ARROW
              ========================================= */}

              <span
                className="
                  social-arrow
                  text-xl
                  font-light
                  text-black/35
                  transition-all
                  duration-500
                  md:text-3xl
                "
              >
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        ref={footerRef}
        className="
          relative
          z-10
          mx-auto
          mt-28
          w-full
          max-w-7xl
          border-t
          border-black/15
          pt-8
        "
      >
        <div
          className="
            flex
            flex-col
            gap-6
            text-[8px]
            font-mono
            uppercase
            tracking-[0.24em]
            text-black/40
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          

          {/* Back To Top */}

          <button
            onClick={handleScrollToTop}
            className="
              w-fit
              transition-colors
              duration-300
            
            "
          >
            BACK TO TOP ↑
          </button>
        </div>
      </footer>
    </section>
  );
}
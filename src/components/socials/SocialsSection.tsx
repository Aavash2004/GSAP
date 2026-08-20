"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   SOCIAL ICON TYPES
========================================================= */

type SocialIconProps = {
  className?: string;
  size?: number;
};

type SocialIcon = React.ComponentType<SocialIconProps>;

/* =========================================================
   GITHUB ICON
========================================================= */

function GithubIcon({
  className = "",
  size = 18,
}: SocialIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.3 9.4 7.88 10.93.58.1.79-.25.79-.56v-2.01c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18A11 11 0 0 1 12 6.08c.98 0 1.97.13 2.89.38 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.69.41.35.78 1.04.78 2.1v3.11c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

/* =========================================================
   LINKEDIN ICON
========================================================= */

function LinkedinIcon({
  className = "",
  size = 18,
}: SocialIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.57V9H3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/* =========================================================
   INSTAGRAM ICON
========================================================= */

function InstagramIcon({
  className = "",
  size = 18,
}: SocialIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/* =========================================================
   SOCIAL DATA
========================================================= */

interface SocialLink {
  number: string;
  name: string;
  handle: string;
  href: string;
  icon: SocialIcon;
}

const socialLinks: SocialLink[] = [
  {
    number: "01",
    name: "GITHUB",
    handle: "@Aavash2004",
    href: "https://github.com/Aavash2004",
    icon: GithubIcon,
  },
  {
    number: "02",
    name: "LINKEDIN",
    handle: "Aavash Basnet",
    href: "https://linkedin.com/in/yourusername",
    icon: LinkedinIcon,
  },
  {
    number: "03",
    name: "INSTAGRAM",
    handle: "@aa_shbsynt",
    href: "https://instagram.com/aa_shbsynt",
    icon: InstagramIcon,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function SocialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);

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

        const icon = link.querySelector(
          ".social-icon"
        ) as HTMLElement | null;

        const arrow = link.querySelector(
          ".social-arrow"
        ) as HTMLElement | null;

        /* ---------------------------------------------
           Initial state
        --------------------------------------------- */

        gsap.set(link, {
          y: 80 + index * 20,
          opacity: 0,
        });

        /* ---------------------------------------------
           Row entrance
        --------------------------------------------- */

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

        /* ---------------------------------------------
           Name movement
        --------------------------------------------- */

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

        /* ---------------------------------------------
           Handle movement
        --------------------------------------------- */

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

        /* ---------------------------------------------
           Number movement
        --------------------------------------------- */

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

        /* ---------------------------------------------
           Icon movement
        --------------------------------------------- */

        if (icon) {
          gsap.to(icon, {
            y: -10,
            rotation: index % 2 === 0 ? -5 : 5,
            ease: "none",
            scrollTrigger: {
              trigger: link,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }

        /* ---------------------------------------------
           Arrow movement
        --------------------------------------------- */

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

  /* =====================================================
     RENDER
  ===================================================== */

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
            05 / SOCIALS
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
            ON SOCIALS
          </h2>
        </div>

        {/* =================================================
            SOCIAL LINKS
        ================================================= */}

        <div className="w-full border-t border-black/15">

          {socialLinks.map((social, index) => {
            const Icon = social.icon;

            return (
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
                    RIGHT — ICON + ARROW
                ========================================= */}

                <div className="flex items-center gap-5">

                  {/* Social Icon */}

                  <span
                    className="
                      social-icon
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-black/15
                      text-black/45
                      transition-all
                      duration-500
                      group-hover:border-black
                      group-hover:bg-black
                      group-hover:text-[#E9E9E5]
                      md:h-11
                      md:w-11
                    "
                  >
                    <Icon
                      size={17}
                      className="
                        transition-transform
                        duration-500
                        group-hover:rotate-6
                      "
                    />
                  </span>

                  {/* Arrow */}

                  <span
                    className="
                      social-arrow
                      text-xl
                      font-light
                      text-black/35
                      transition-all
                      duration-500
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:text-black
                      md:text-3xl
                    "
                  >
                    ↗
                  </span>
                </div>
              </a>
            );
          })}
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
          <button
            onClick={handleScrollToTop}
            className="
              w-fit
              transition-colors
              duration-300
              hover:text-black
            "
          >
            BACK TO TOP ↑
          </button>
        </div>
      </footer>
    </section>
  );
}
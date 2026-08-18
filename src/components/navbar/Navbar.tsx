"use client";

import { useState, useEffect, useRef } from "react";
import MobileMenu from "./MobileMenu";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Toggle header theme when socials section (dark background) enters
      ScrollTrigger.create({
        trigger: "#socials",
        start: "top 15%",
        end: "bottom top",
        onEnter: () => setIsDarkTheme(true),
        onLeaveBack: () => setIsDarkTheme(false),
      });
    });

    return () => ctx.revert();
  }, []);

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`
          fixed
          left-0
          top-0
          z-[300]
          flex
          h-20
          w-full
          items-center
          justify-between
          px-6
          transition-colors
          duration-500
          md:px-12
          ${isDarkTheme ? "text-white" : "text-black"}
        `}
      >
        {/* Brand / Logo */}
        <a
          href="#"
          data-cursor="pointer"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex items-center gap-2 font-display text-sm uppercase tracking-[0.25em]"
        >
          <span className="font-extrabold">AAVASH BASNET</span>
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40 transition-transform duration-300 group-hover:scale-150" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          <a
            href="#about"
            data-cursor="pointer"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#about");
            }}
            className="group relative text-[10px] uppercase tracking-[0.26em] opacity-70 transition-opacity hover:opacity-100"
          >
            <span>About</span>
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
          </a>

          <a
            href="#projects"
            data-cursor="pointer"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#projects");
            }}
            className="group relative text-[10px] uppercase tracking-[0.26em] opacity-70 transition-opacity hover:opacity-100"
          >
            <span>Projects</span>
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
          </a>

          <a
            href="#socials"
            data-cursor="pointer"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#socials");
            }}
            className="group relative text-[10px] uppercase tracking-[0.26em] opacity-70 transition-opacity hover:opacity-100"
          >
            <span>Socials</span>
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          data-cursor="pointer"
          className="flex h-8 w-8 flex-col justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-0.5 w-full bg-current transition-transform duration-300 ${
              isOpen ? "translate-y-[4px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-current transition-transform duration-300 ${
              isOpen ? "-translate-y-[4px] -rotate-45" : ""
            }`}
          />
        </button>
      </header>

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNavigate={handleNavClick}
      />
    </>
  );
}
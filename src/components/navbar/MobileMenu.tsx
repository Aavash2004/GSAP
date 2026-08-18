"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

export default function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isOpen) {
      gsap.set(container, { display: "flex", pointerEvents: "auto" });
      const tl = gsap.timeline();

      tl.fromTo(
        container,
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 0.6, ease: "expo.inOut" }
      ).fromTo(
        itemsRef.current.filter(Boolean),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power3.out" },
        "-=0.2"
      );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { display: "none", pointerEvents: "none" });
        },
      });

      tl.to(itemsRef.current.filter(Boolean), {
        y: -20,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      }).to(container, {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        duration: 0.5,
        ease: "expo.inOut",
      });
    }
  }, [isOpen]);

  const navItems = [
    { label: "About", href: "#about", number: "01" },
    { label: "Projects", href: "#projects", number: "02" },
    { label: "Socials", href: "#socials", number: "03" },
  ];

  return (
    <div
      ref={containerRef}
      aria-hidden={!isOpen}
      className="
        fixed
        inset-0
        z-[400]
        hidden
        flex-col
        justify-between
        bg-[#111111]
        px-8
        py-12
        text-[#F7F7F3]
      "
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      }}
    >
      <div className="flex items-center justify-between pt-4">
        <span className="font-mona text-xs uppercase tracking-[0.28em] text-white/40">
          Navigation
        </span>
        <button
          onClick={onClose}
          data-cursor="pointer"
          className="text-xs uppercase tracking-[0.24em] text-white/60 hover:text-white"
        >
          Close [×]
        </button>
      </div>

      <nav className="my-auto">
        <ul className="flex flex-col gap-6">
          {navItems.map((item, index) => (
            <li
              key={item.href}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
            >
              <a
                href={item.href}
                data-cursor="pointer"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  onNavigate(item.href);
                }}
                className="group flex items-baseline gap-4"
              >
                <span className="text-xs font-mono text-white/30 transition-colors group-hover:text-white/80">
                  {item.number}
                </span>
                <span className="font-display text-4xl uppercase tracking-tight text-white/80 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-white sm:text-5xl">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center justify-between border-t border-white/10 pt-6 text-[9px] uppercase tracking-[0.22em] text-white/40">
        <span>Aavash Basnet</span>
        <span>© 2026</span>
      </div>
    </div>
  );
}
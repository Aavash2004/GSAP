"use client";

import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <span className="fixed top-6 left-8 z-50 font-mona font-black uppercase tracking-tight text-xl text-black">
        Aavash Basnet
      </span>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="fixed top-6 right-8 z-50 w-8 h-6 flex flex-col justify-between"
      >
        <span
          className={`block h-0.5 w-full bg-black transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-[11px]" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-full bg-black transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-0.5 w-full bg-black transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-[11px]" : ""
          }`}
        />
      </button>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
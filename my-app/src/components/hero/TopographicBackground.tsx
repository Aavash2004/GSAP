"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TopographicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<SVGGElement>(null);
  const contoursRef = useRef<SVGGElement>(null);
  const foregroundRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    const ctx = gsap.context(() => {
      // --- Automatic "breathing" motion (always runs, unless reduced motion) ---
      if (!prefersReducedMotion) {
        gsap.to(blobsRef.current, {
          x: "+=15",
          y: "-=10",
          scale: 1.03,
          duration: 14,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to(contoursRef.current, {
          x: "-=10",
          y: "+=8",
          duration: 10,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to(foregroundRef.current, {
          x: "+=8",
          duration: 8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Subtle per-blob individual drift for organic feel
        gsap.utils.toArray<SVGPathElement>(".topo-blob").forEach((blob, i) => {
          gsap.to(blob, {
            attr: { rx: `+=${8 + i * 2}`, ry: `-=${6 + i}` },
            duration: 12 + i * 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      }

      // --- Mouse parallax (desktop + tablet only, reduced intensity on tablet) ---
      if (!isMobile && !prefersReducedMotion) {
        const intensity = isTablet ? 0.5 : 1;

        const blobsX = gsap.quickTo(blobsRef.current, "x", {
          duration: 1.2,
          ease: "power3.out",
        });
        const blobsY = gsap.quickTo(blobsRef.current, "y", {
          duration: 1.2,
          ease: "power3.out",
        });
        const contoursX = gsap.quickTo(contoursRef.current, "x", {
          duration: 1,
          ease: "power3.out",
        });
        const contoursY = gsap.quickTo(contoursRef.current, "y", {
          duration: 1,
          ease: "power3.out",
        });
        const fgX = gsap.quickTo(foregroundRef.current, "x", {
          duration: 0.7,
          ease: "power3.out",
        });
        const fgY = gsap.quickTo(foregroundRef.current, "y", {
          duration: 0.7,
          ease: "power3.out",
        });

        const handleMouseMove = (e: MouseEvent) => {
          const { innerWidth, innerHeight } = window;
          const relX = (e.clientX / innerWidth - 0.5) * 2;
          const relY = (e.clientY / innerHeight - 0.5) * 2;

          blobsX(relX * 10 * intensity);
          blobsY(relY * 8 * intensity);
          contoursX(relX * -18 * intensity);
          contoursY(relY * -14 * intensity);
          fgX(relX * 28 * intensity);
          fgY(relY * 22 * intensity);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }
    }, containerRef);

    // --- Scroll parallax ---
    if (!prefersReducedMotion) {
      const scrollCtx = gsap.context(() => {
        gsap.to(blobsRef.current, {
          y: "+=40",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(contoursRef.current, {
          y: "+=70",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }, containerRef);

      return () => {
        ctx.revert();
        scrollCtx.revert();
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        {/* Layer 1: near-static base fill */}
        <rect width="1600" height="900" fill="#F8F8F5" />

        {/* Layer 2: large organic blobs, very slow movement, more activity at edges */}
        <g ref={blobsRef} opacity="0.5">
          <ellipse className="topo-blob" cx="180" cy="220" rx="220" ry="160" fill="#ECECE7" />
          <ellipse className="topo-blob" cx="120" cy="650" rx="180" ry="220" fill="#EFEFEA" />
          <ellipse className="topo-blob" cx="1450" cy="180" rx="240" ry="180" fill="#ECECE7" />
          <ellipse className="topo-blob" cx="1500" cy="700" rx="200" ry="240" fill="#EFEFEA" />
          <ellipse className="topo-blob" cx="800" cy="120" rx="140" ry="90" fill="#F1F1EC" />
        </g>

        {/* Layer 3: thin flowing contour/topographic lines */}
        <g ref={contoursRef} stroke="#D8D8D2" strokeWidth="1" fill="none" opacity="0.6">
          <path d="M -50,150 C 300,100 500,220 800,150 S 1300,80 1650,180" />
          <path d="M -50,250 C 320,190 520,320 800,250 S 1280,170 1650,280" />
          <path d="M -50,700 C 300,760 520,640 800,700 S 1300,780 1650,680" />
          <path d="M -50,800 C 320,850 520,740 800,800 S 1280,870 1650,780" />
          <path d="M -50,50 C 250,20 450,90 700,50" opacity="0.5" />
          <path d="M 900,850 C 1150,880 1350,810 1650,850" opacity="0.5" />
        </g>

        {/* Layer 4: foreground decorative lines, strongest mouse response, kept off-center */}
        <g ref={foregroundRef} stroke="#CFCFC8" strokeWidth="1" fill="none" opacity="0.7">
          <path d="M -50,400 C 150,370 250,430 400,400" />
          <path d="M 1200,500 C 1350,470 1450,530 1650,500" />
          <path d="M -50,550 C 130,520 240,580 380,550" />
          <path d="M 1230,350 C 1370,320 1460,380 1650,350" />
        </g>
      </svg>
    </div>
  );
}
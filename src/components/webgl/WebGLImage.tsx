"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useWebGLInteraction } from "./useWebGLInteraction";

const WebGLImageCanvas = dynamic(() => import("./WebGLImageCanvas"), {
  ssr: false,
});

interface WebGLImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  intensity?: number;
  sizes?: string;
  objectFit?: "cover" | "contain";
}

export default function WebGLImage({
  src,
  alt,
  className = "",
  fill = true,
  width,
  height,
  priority = false,
  intensity = 0.05,
  sizes,
  objectFit = "cover",
}: WebGLImageProps) {
  const [hovered, setHovered] = useState(false);
  const { mouseRef, scrollVelocityRef, isMounted, isMobile, reducedMotion } =
    useWebGLInteraction();

  // If on mobile or reduced motion or before mount, present crisp standard Next.js Image
  const showWebGL = isMounted && !reducedMotion && !isMobile;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Standard Next.js Image (Fallback & base image) */}
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-${objectFit} transition-opacity duration-300 ${
            showWebGL ? "opacity-0" : "opacity-100"
          }`}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width || 800}
          height={height || 600}
          priority={priority}
          className={`object-${objectFit} h-full w-full transition-opacity duration-300 ${
            showWebGL ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* Physical WebGL Layer */}
      {showWebGL && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <WebGLImageCanvas
            src={src}
            mouseRef={mouseRef}
            scrollVelocityRef={scrollVelocityRef}
            hovered={hovered}
            intensity={intensity}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
          />
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

type SectionBackgroundProps = {
  src: string;
};

export default function SectionBackground({ src }: SectionBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay can be blocked in some contexts; fail silently
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 } // starts playing once 25% of the section is visible
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
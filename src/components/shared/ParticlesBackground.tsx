"use client";

import { useState, useSyncExternalStore } from "react";

type Particle = {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
};

const emptySubscribe = () => () => {};

const generateParticles = (): Particle[] =>
  Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 6,
  }));

export default function ParticlesBackground() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [particles] = useState<Particle[]>(generateParticles);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_theme(colors.accent)] animate-float"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-white/50" />
    </div>
  );
}
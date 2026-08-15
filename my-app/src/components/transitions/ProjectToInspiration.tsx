import { ReactNode } from "react";

type ProjectToInspirationProps = {
  children: ReactNode;
};

// Thin wrapper: gives Inspiration a dark backing layer so it reads as
// "revealed from underneath" as Projects folds/fades away above it.
// The actual fold animation lives in ProjectShowcase's own ScrollTrigger
// (see comments there) — this avoids nesting a second pin around
// Inspiration, which already pins itself internally.
export default function ProjectToInspiration({ children }: ProjectToInspirationProps) {
  return <div className="relative z-0 bg-[#151515]">{children}</div>;
}
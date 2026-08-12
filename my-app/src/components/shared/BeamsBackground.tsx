export default function BeamsBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-accent/40 to-transparent animate-beam-1" />
      <div className="absolute top-0 left-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-red-700/40 to-transparent animate-beam-2" />
      <div className="absolute top-0 left-3/4 w-[2px] h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent animate-beam-1" />
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}
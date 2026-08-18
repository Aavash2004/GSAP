export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-1/2 left-1/4 w-[60vw] h-[60vw] rounded-full bg-accent/20 blur-3xl animate-aurora-1" />
      <div className="absolute top-1/3 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-red-800/20 blur-3xl animate-aurora-2" />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
type SectionBackgroundProps = {
  src: string;
};

export default function SectionBackground({ src }: SectionBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <video autoPlay muted loop playsInline className="w-full h-full object-cover">
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
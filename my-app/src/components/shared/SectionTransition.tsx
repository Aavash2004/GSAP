export default function SectionTransition({
  from = "transparent",
  to = "#F8F8F5",
}: {
  from?: string;
  to?: string;
}) {
  return (
    <div
      className="pointer-events-none relative z-40 -mb-24 h-24 w-full"
      style={{
        background: `linear-gradient(
          to bottom,
          ${from} 0%,
          ${to} 100%
        )`,
      }}
    />
  );
}
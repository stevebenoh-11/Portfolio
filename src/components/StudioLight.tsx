"use client";

/* Static studio lighting for the opening band — a soft overhead gold key
   light with a faint fill from the right, the way a portrait is lit on a
   set. No cursor tracking; sits beneath the content and never blocks it.
   The gentle "breathing" loop is decorative and pauses for reduced motion. */
export default function StudioLight() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Key light — broad overhead pool, slightly left of centre */}
      <div
        className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[120%] h-[120%] animate-studio-glow"
        style={{
          background:
            "radial-gradient(50% 45% at 42% 38%, rgba(212, 162, 55, 0.13), rgba(212, 162, 55, 0.05) 45%, rgba(212, 162, 55, 0) 72%)",
        }}
      />
      {/* Fill light — cooler, softer, upper right */}
      <div
        className="absolute top-0 right-0 w-[70%] h-full"
        style={{
          background:
            "radial-gradient(45% 55% at 80% 22%, rgba(212, 162, 55, 0.08), rgba(212, 162, 55, 0) 70%)",
        }}
      />
    </div>
  );
}

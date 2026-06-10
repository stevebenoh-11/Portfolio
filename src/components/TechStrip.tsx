"use client";

import AnimatedSection from "./AnimatedSection";

const techStack = [
  { name: "C/C++", url: "https://isocpp.org" },
  { name: "Python", url: "https://www.python.org" },
  { name: "Arduino", url: "https://www.arduino.cc" },
  { name: "Unreal Engine", url: "https://www.unrealengine.com" },
  { name: "Autodesk Maya", url: "https://www.autodesk.com/products/maya" },
  { name: "Git", url: "https://git-scm.com" },
];

export default function TechStrip() {
  return (
    <section className="bg-dark text-white py-16 sm:py-20 relative overflow-hidden">
      {/* faint gold edge lines, like the reference impact band */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedSection>
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-primary text-center mb-10">
            Tools &amp; Languages I Work With
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {techStack.map((tech, i) => (
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center justify-center text-center px-4 py-5 ${
                  i !== 0 ? "lg:border-l lg:border-white/10" : ""
                } ${i % 2 !== 0 ? "border-l border-white/10 lg:border-l" : ""}`}
              >
                <span className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors duration-200">
                  {tech.name}
                </span>
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

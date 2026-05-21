"use client";

import AnimatedSection from "./AnimatedSection";

const techStack = [
  { name: "C/C++", icon: "⚙️" },
  { name: "Python", icon: "🐍" },
  { name: "Arduino", icon: "🔌" },
  { name: "Unreal Engine", icon: "🎮" },
  { name: "Autodesk Maya", icon: "🧊" },
  { name: "Git", icon: "🔀" },
];

export default function TechStrip() {
  return (
    <section className="py-20 border-t border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <p className="text-center text-sm text-caption uppercase tracking-widest mb-10">
            Tools &amp; Languages I Work With
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/4 border border-white/10 backdrop-blur-md text-muted hover:text-white hover:border-primary/40 hover:bg-white/8 transition-all duration-300 group cursor-default shadow-sm shadow-black/5"
              >
                <span className="text-lg opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                  {tech.icon}
                </span>
                <span className="text-xs font-semibold tracking-wide">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

"use client";

import { Settings, Code2, Plug, Gamepad2, Box, GitBranch } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const techStack = [
  { name: "C/C++", icon: Settings, url: "https://isocpp.org" },
  { name: "Python", icon: Code2, url: "https://www.python.org" },
  { name: "Arduino", icon: Plug, url: "https://www.arduino.cc" },
  { name: "Unreal Engine", icon: Gamepad2, url: "https://www.unrealengine.com" },
  { name: "Autodesk Maya", icon: Box, url: "https://www.autodesk.com/products/maya" },
  { name: "Git", icon: GitBranch, url: "https://git-scm.com" },
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
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/4 border border-white/10 backdrop-blur-md text-muted hover:text-white hover:border-primary/40 hover:bg-white/8 transition-all duration-300 group cursor-pointer shadow-sm shadow-black/5"
              >
                <tech.icon 
                  size={16} 
                  className="opacity-60 group-hover:opacity-100 transition-opacity text-muted group-hover:text-white"
                />
                <span className="text-xs font-semibold tracking-wide">
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

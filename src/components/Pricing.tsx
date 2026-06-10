"use client";

import { Bot, Terminal, Brain, Sparkles, ArrowRight, Code, FileText } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const features = [
  {
    icon: Sparkles,
    title: "Task Automation",
    description: "Automates file management, opens applications, and manages system processes.",
  },
  {
    icon: Brain,
    title: "AI Reasoning",
    description: "Uses advanced language models to understand complex natural language instructions.",
  },
  {
    icon: Code,
    title: "Developer Tools",
    description: "Integrated shell utilities, git automation helpers, and quick script execution.",
  },
  {
    icon: FileText,
    title: "Document Parser",
    description: "Searches and organizes academic notes, lecture slides, and coding directories.",
  },
];

export default function Projects() {
  return (
    <section id="services" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
              Featured Project
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight">
              Things I&apos;ve Built So Far.
            </h2>
            <div className="gold-rule mx-auto mt-6" />
          </div>
        </AnimatedSection>

        {/* Split feature block */}
        <AnimatedSection delay={0.1}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Info */}
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-5">
                <Bot size={14} />
                AI / Productivity Tools
              </p>

              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-5">
                AI Virtual Personal Assistant
              </h3>

              <p className="text-base text-muted leading-relaxed mb-7 max-w-xl">
                An intelligent desktop virtual assistant designed to automate daily developer
                workflows and college studies. It leverages large language models to parse natural
                language instructions, automate system-level tasks, organize study materials, and
                perform semantic searches over scientific documents.
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-9">
                {[
                  { name: "Python", url: "https://www.python.org" },
                  { name: "NLP", url: "https://en.wikipedia.org/wiki/Natural_language_processing" },
                  { name: "File I/O", url: "https://docs.python.org/3/tutorial/inputoutput.html" },
                ].map((tech) => (
                  <a
                    key={tech.name}
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 text-xs font-semibold text-muted border border-border rounded-md hover:border-primary hover:text-primary transition-colors duration-200"
                  >
                    {tech.name}
                  </a>
                ))}
              </div>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-dark font-semibold text-sm rounded-md hover:bg-primary-hover transition-colors duration-200"
              >
                Learn More
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Right — Terminal panel */}
            <div className="w-full max-w-xl mx-auto lg:mx-0">
              <div className="bg-dark text-white shadow-press overflow-hidden font-mono text-xs border border-white/10 rounded-lg">
                {/* Terminal Header */}
                <div className="bg-dark-soft px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <span className="text-white/55 text-[10px] tracking-[0.15em]">
                    assistant.py — bash
                  </span>
                  <Terminal size={14} className="text-primary" />
                </div>

                {/* Terminal Body */}
                <div className="p-5 sm:p-6 space-y-4 min-h-[230px] text-left">
                  <div>
                    <div className="flex items-center gap-1.5 text-white/45 mb-1">
                      <span>$</span>
                      <span className="text-white">python assistant.py</span>
                    </div>
                    <div className="text-primary font-semibold">● Assistant active. Ready for commands...</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-white/45 mb-1">
                      <span>&gt;</span>
                      <span className="text-white">organize my ECE notes and circuit diagrams</span>
                    </div>
                    <div className="text-white/55 text-[11px] leading-relaxed pl-3 border-l border-primary/40 space-y-1">
                      <div>[1/3] Scanning workspace directory...</div>
                      <div>[2/3] Found 14 documents (PDFs, PNGs).</div>
                      <div className="text-white font-medium">[3/3] Organizing files into ECE_Sem1/ folders...</div>
                    </div>
                  </div>

                  <div className="text-[#7FB069]">
                    ✓ Done! 14 files organized into respective folders. Saved 1 hour of manual work!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Feature cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((feat, i) => (
            <AnimatedSection key={feat.title} delay={0.15 + i * 0.06}>
              <div className="bg-surface card-lift p-7 h-full rounded-lg">
                <feat.icon size={26} strokeWidth={1.5} className="text-primary mb-4" />
                <h4 className="text-sm font-bold mb-2">{feat.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{feat.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

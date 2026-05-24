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
    <section id="services" className="py-16 sm:py-24 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-medium uppercase tracking-widest mb-3">
              Featured Project
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Things I&apos;ve Built So Far
            </h2>
          </div>
        </AnimatedSection>

        {/* Hero Project Card */}
        <AnimatedSection delay={0.1}>
          <div className="liquid-glass rounded-2xl p-5 sm:p-8 md:p-12 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
              {/* Left — Info */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 mb-5">
                  <Bot size={14} className="text-primary" />
                  <span className="text-xs text-primary font-medium">AI / Productivity Tools</span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                  AI Virtual Personal Assistant
                </h3>

                <p className="text-base text-muted leading-relaxed mb-6 max-w-xl">
                  An intelligent desktop virtual assistant designed to automate daily developer
                  workflows and college studies. It leverages large language models to parse natural
                  language instructions, automate system-level tasks, organize study materials, and
                  perform semantic searches over scientific documents.
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Python", "OpenAI API", "NLP", "Shell Scripting", "OS Automation", "File I/O"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white/90 bg-white/4 border border-white/10 backdrop-blur-md rounded-full shadow-sm shadow-black/5 hover:border-primary/40 hover:bg-white/8 transition-all duration-200 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-hover transition-all duration-200 glow-button"
                >
                  Learn More
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              {/* Right — Interactive Terminal Mockup */}
              <div className="flex-1 w-full max-w-md mx-auto lg:mx-0 overflow-x-auto">
                <div className="rounded-xl border border-border bg-surface-alt shadow-xl shadow-black/30 overflow-hidden font-mono text-xs">
                  {/* Terminal Header */}
                  <div className="bg-surface px-4 py-3 border-b border-border flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-caption text-[10px]">assistant.py — bash</span>
                    <Terminal size={14} className="text-muted" />
                  </div>

                  {/* Terminal Body */}
                  <div className="p-5 space-y-4 min-h-[220px] text-left">
                    <div>
                      <div className="flex items-center gap-1.5 text-muted mb-1">
                        <span>$</span>
                        <span className="text-white">python assistant.py</span>
                      </div>
                      <div className="text-primary font-semibold">● Assistant active. Ready for commands...</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 text-muted mb-1">
                        <span>&gt;</span>
                        <span className="text-white">organize my ECE notes and circuit diagrams</span>
                      </div>
                      <div className="text-muted text-[11px] leading-relaxed pl-3 border-l border-primary/20 space-y-1">
                        <div>[1/3] Scanning workspace directory...</div>
                        <div>[2/3] Found 14 documents (PDFs, PNGs).</div>
                        <div className="text-white font-medium">[3/3] Organizing files into ECE_Sem1/ folders...</div>
                      </div>
                    </div>

                    <div className="text-green-400">
                      ✓ Done! 14 files organized into respective folders. Saved 1 hour of manual work!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {features.map((feat, i) => (
            <AnimatedSection key={feat.title} delay={0.2 + i * 0.08}>
              <div className="liquid-glass liquid-glass-hover rounded-2xl p-6 text-center h-full">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                  <feat.icon size={20} />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">{feat.title}</h4>
                <p className="text-xs text-muted leading-relaxed">{feat.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { Cpu, Globe, Gamepad2, Zap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { GitHubIcon, LinkedInIcon, InstagramIcon } from "./Footer";

const interests = [
  {
    icon: Cpu,
    title: "Embedded Systems",
    description:
      "Building IoT prototypes and microcontroller-based projects with Arduino and ESP32.",
    illustration: "embedded",
  },
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Creating responsive web apps and personal projects using Next.js, HTML/CSS, and Tailwind.",
    illustration: "web",
  },
  {
    icon: Gamepad2,
    title: "Game Development",
    description:
      "Creating interactive 3D games and real-time experiences using Unreal Engine and Autodesk Maya.",
    illustration: "game",
  },
  {
    icon: Zap,
    title: "Signal Processing",
    description:
      "Exploring DSP fundamentals, Python-based simulations, and communication systems.",
    illustration: "signal",
  },
];

function CardIllustration({ type }: { type: string }) {
  if (type === "embedded") {
    return (
      <div className="flex gap-2 mb-4">
        {["🔧", "📟", "💡"].map((emoji, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 backdrop-blur-md flex items-center justify-center text-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/20 group-hover:border-primary/40 shadow-sm"
          >
            {emoji}
          </div>
        ))}
      </div>
    );
  }
  if (type === "web") {
    return (
      <div className="flex gap-2 mb-4">
        {["💻", "🌐", "⚡"].map((emoji, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 backdrop-blur-md flex items-center justify-center text-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 shadow-sm"
          >
            {emoji}
          </div>
        ))}
      </div>
    );
  }
  if (type === "game") {
    return (
      <div className="flex gap-2 mb-4">
        {["🎮", "🕹️", "👾"].map((emoji, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 backdrop-blur-md flex items-center justify-center text-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-pink-500/20 group-hover:border-pink-500/40 shadow-sm"
          >
            {emoji}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex items-end gap-1 mb-4 h-8">
      {[80, 50, 95, 65, 85, 40, 70].map((h, i) => (
        <div
          key={i}
          className="w-2.5 rounded-sm bg-green-500/30 backdrop-blur-md transition-all duration-500 group-hover:bg-green-500/50 group-hover:scale-y-110 origin-bottom shadow-sm"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export default function WhatIDo() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-medium uppercase tracking-widest mb-3">
              What I&apos;m Into
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Where Hardware Meets Software
            </h2>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-3">
              <a
                href="https://github.com/stevebenoh-11"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group flex items-center gap-2.5 px-4.5 py-2 rounded-xl bg-white/3 border border-white/12 backdrop-blur-xl text-muted hover:text-white hover:border-primary/40 hover:bg-white/5 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-primary/5 cursor-pointer"
              >
                <GitHubIcon size={18} />
                <span className="text-xs font-semibold group-hover:text-white transition-colors">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/stevebenoh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group flex items-center gap-2.5 px-4.5 py-2 rounded-xl bg-white/3 border border-white/12 backdrop-blur-xl text-muted hover:text-white hover:border-primary/40 hover:bg-white/5 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-primary/5 cursor-pointer"
              >
                <LinkedInIcon size={18} />
                <span className="text-xs font-semibold group-hover:text-white transition-colors">LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/starky._.36"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group flex items-center gap-2.5 px-4.5 py-2 rounded-xl bg-white/3 border border-white/12 backdrop-blur-xl text-muted hover:text-white hover:border-primary/40 hover:bg-white/5 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-primary/5 cursor-pointer"
              >
                <InstagramIcon size={18} />
                <span className="text-xs font-semibold group-hover:text-white transition-colors">Instagram</span>
              </a>
            </div>
          </div>
        </AnimatedSection>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {interests.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.1}>
              <div className="relative group p-7 rounded-2xl bg-white/3 border border-white/12 hover:border-primary/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full shadow-lg shadow-black/10 hover:shadow-primary/5 hover:bg-white/5 cursor-default">
                <CardIllustration type={item.illustration} />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white duration-300 shadow-sm shadow-primary/5">
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-muted leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

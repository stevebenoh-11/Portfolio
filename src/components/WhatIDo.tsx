"use client";

import { Cpu, Globe, Gamepad2, Zap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { GitHubIcon, LinkedInIcon, InstagramIcon, RedditIcon } from "./Footer";

const interests = [
  {
    icon: Cpu,
    title: "Embedded Systems",
    description:
      "Building IoT prototypes and microcontroller-based projects with Arduino and ESP32.",
    colorClass: "text-primary bg-primary/10 border-primary/20 group-hover:bg-primary group-hover:text-white group-hover:border-primary/40",
    hoverBorder: "hover:border-primary/40",
    shadowClass: "hover:shadow-primary/5",
  },
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Creating responsive web apps and personal projects using Next.js, HTML/CSS, and Tailwind.",
    colorClass: "text-blue-400 bg-blue-500/10 border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500/40",
    hoverBorder: "hover:border-blue-500/40",
    shadowClass: "hover:shadow-blue-500/5",
  },
  {
    icon: Gamepad2,
    title: "Game Development",
    description:
      "Creating interactive 3D games and real-time experiences using Unreal Engine and Autodesk Maya.",
    colorClass: "text-pink-400 bg-pink-500/10 border-pink-500/20 group-hover:bg-pink-500 group-hover:text-white group-hover:border-pink-500/40",
    hoverBorder: "hover:border-pink-500/40",
    shadowClass: "hover:shadow-pink-500/5",
  },
  {
    icon: Zap,
    title: "Signal Processing",
    description:
      "Exploring DSP fundamentals, Python-based simulations, and communication systems.",
    colorClass: "text-green-400 bg-green-500/10 border-green-500/20 group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500/40",
    hoverBorder: "hover:border-green-500/40",
    shadowClass: "hover:shadow-green-500/5",
  },
];

export default function WhatIDo() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-medium uppercase tracking-widest mb-3">
              What I&apos;m Into
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Where Hardware Meets Software
            </h2>

            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
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
              <a
                href="https://www.reddit.com/user/OkFortune8186/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reddit"
                className="group flex items-center gap-2.5 px-4.5 py-2 rounded-xl bg-white/3 border border-white/12 backdrop-blur-xl text-muted hover:text-white hover:border-primary/40 hover:bg-white/5 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-primary/5 cursor-pointer"
              >
                <RedditIcon size={18} />
                <span className="text-xs font-semibold group-hover:text-white transition-colors">Reddit</span>
              </a>
            </div>
          </div>
        </AnimatedSection>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {interests.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.1}>
              <div className={`relative group p-8 rounded-2xl bg-white/3 border border-white/12 ${item.hoverBorder} backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full shadow-lg shadow-black/10 ${item.shadowClass} hover:bg-white/5 cursor-default`}>
                
                {/* Large Prominent Vector Symbol (Icon Badge) */}
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 shadow-md ${item.colorClass}`}>
                  <item.icon size={22} />
                </div>

                <h3 className={`text-xl font-bold text-white tracking-wide mb-3 transition-colors duration-300 ${
                  index === 0 ? "group-hover:text-primary" :
                  index === 1 ? "group-hover:text-blue-400" :
                  index === 2 ? "group-hover:text-pink-400" :
                  "group-hover:text-green-400"
                }`}>
                  {item.title}
                </h3>
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

"use client";

import { Cpu, Globe, Gamepad2, Zap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const interests = [
  {
    icon: Cpu,
    title: "Embedded Systems",
    description:
      "Building IoT prototypes and microcontroller-based projects with Arduino and ESP32.",
  },
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Creating responsive web apps and personal projects using Next.js, HTML/CSS, and Tailwind.",
  },
  {
    icon: Gamepad2,
    title: "Game Development",
    description:
      "Creating interactive 3D games and real-time experiences using Unreal Engine and Autodesk Maya.",
  },
  {
    icon: Zap,
    title: "Signal Processing",
    description:
      "Exploring DSP fundamentals, Python-based simulations, and communication systems.",
  },
];

const cellBorders = [
  "border-b border-r border-border",
  "border-b border-border",
  "border-r border-border",
  "",
];

export default function WhatIDo() {
  return (
    <section id="about" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* ── Left: about copy ── */}
          <AnimatedSection>
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
              What I&apos;m Into
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight mb-5">
              Where Hardware Meets Software.
            </h2>
            <div className="gold-rule mb-7" />
            <p className="text-base text-muted leading-relaxed mb-9 max-w-lg">
              My academic foundation in Electronics and Communication
              Engineering (ECE) combined with my coding experience allows me to
              comfortably bridge both physical hardware and software
              development.
            </p>

            {/* Signature block */}
            <div>
              <p className="font-display text-xl font-bold italic text-foreground">
                Steve Beno H
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-caption mt-1">
                1st Year ECE Student
              </p>
            </div>
          </AnimatedSection>

          {/* ── Right: 2×2 interest grid ── */}
          <AnimatedSection delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {interests.map((item, index) => (
                <div
                  key={item.title}
                  className={`p-7 sm:p-8 ${cellBorders[index]}`}
                >
                  <item.icon size={28} strokeWidth={1.5} className="text-primary mb-4" />
                  <h3 className="text-base font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

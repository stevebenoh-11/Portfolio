"use client";

import {
  Monitor,
  Server,
  Smartphone,
  Sparkles,
  Database,
  Wifi,
  Gamepad2,
  Box,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const capabilities = [
  {
    icon: Gamepad2,
    title: "Unreal Engine",
    description: "High-performance gameplay engineering, Blueprints, and C++ in UE5.",
  },
  {
    icon: Box,
    title: "Autodesk Maya",
    description: "3D asset creation, environment modeling, rigging, and animation.",
  },
  {
    icon: Server,
    title: "C/C++ Programming",
    description: "Writing optimized, low-level code for microcontrollers and game engine logic.",
  },
  {
    icon: Monitor,
    title: "Web Development",
    description: "Building responsive web applications and interfaces with Next.js & Tailwind.",
  },
  {
    icon: Smartphone,
    title: "Embedded & IoT",
    description: "Arduino, ESP32, and sensor-based hardware prototypes.",
  },
  {
    icon: Sparkles,
    title: "Circuit Design",
    description: "Analog & digital circuit analysis, simulation with LTspice.",
  },
  {
    icon: Database,
    title: "Data & Python",
    description: "Python scripting, data analysis, and automation tools.",
  },
  {
    icon: Wifi,
    title: "Communication Systems",
    description: "Fundamentals of signals, modulation, and networking.",
  },
];

export default function Capabilities() {
  return (
    <section id="work" className="py-24 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-medium uppercase tracking-widest mb-3">
              Skills
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Always Learning, Always Building
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((cap, index) => (
            <AnimatedSection key={cap.title} delay={index * 0.08}>
              <div className="relative group p-7 rounded-2xl bg-white/3 border border-white/12 hover:border-primary/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col items-center text-center h-full shadow-lg shadow-black/10 hover:shadow-primary/5 hover:bg-white/5 cursor-default">
                {/* Frosted icon frame with ECE hover transformation */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white duration-300 shadow-sm shadow-primary/5">
                  <cap.icon size={22} />
                </div>
                <h3 className="text-base font-bold text-white mb-2 tracking-wide group-hover:text-primary transition-colors duration-300">
                  {cap.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed font-medium">
                  {cap.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}


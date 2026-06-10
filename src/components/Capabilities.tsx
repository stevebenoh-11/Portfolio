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
    <section id="work" className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
              Skills
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight">
              Always Learning, Always Building.
            </h2>
            <div className="gold-rule mx-auto mt-6" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, index) => (
            <AnimatedSection key={cap.title} delay={index * 0.06}>
              <div className="bg-background card-lift p-8 text-center h-full shadow-press-sm rounded-lg">
                <cap.icon
                  size={30}
                  strokeWidth={1.5}
                  className="text-primary mx-auto mb-5"
                />
                <h3 className="text-base font-bold mb-2.5">{cap.title}</h3>
                <p className="text-sm text-muted leading-relaxed">
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

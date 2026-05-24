"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-20 sm:pt-24 pb-10 sm:pb-12">
      {/* Background glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
        {/* Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/4 backdrop-blur-md mb-8 shadow-sm shadow-black/5"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-muted font-medium">Open to Internships &amp; Collaborations</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          Engineering the Future,
          <br />
          One{" "}
          <span className="text-shimmer font-black">Circuit</span> at a Time
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base sm:text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I&apos;m Steve Beno H — a 1st Year ECE student passionate about
          embedded systems, web development, and building projects that bridge
          hardware and software.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-all duration-200 glow-button"
          >
            View My Projects
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-border text-muted font-medium rounded-lg hover:text-white hover:border-white/20 transition-all duration-200"
          >
            <Play size={16} fill="currentColor" />
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
}


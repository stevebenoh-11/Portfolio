"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon, InstagramIcon, RedditIcon } from "./Footer";

const socials = [
  { icon: GitHubIcon, href: "https://github.com/stevebenoh-11", label: "GitHub" },
  { icon: LinkedInIcon, href: "https://www.linkedin.com/in/stevebenoh", label: "LinkedIn" },
  { icon: InstagramIcon, href: "https://www.instagram.com/starky._.36", label: "Instagram" },
  { icon: RedditIcon, href: "https://www.reddit.com/user/OkFortune8186/", label: "Reddit" },
];

export default function Hero() {
  return (
    <section id="home" className="relative bg-dark text-white overflow-hidden">
      {/* Ambient gold sheen, upper right — echoes the reference's lit skyline */}
      <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-bl from-primary/[0.07] via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-36 sm:pt-44 pb-20 sm:pb-28">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 lg:gap-20 items-center">
          {/* ── Left: headline ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-5">
                Open to Internships &amp; Collaborations.
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-display text-[clamp(1.75rem,8.5vw,2.5rem)] sm:text-6xl lg:text-[4.2rem] font-bold leading-[1.12] tracking-tight mb-6"
            >
              Engineering the Future,
              <br />
              One <span className="text-primary">Circuit</span> at a Time.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="gold-rule mb-7"
            />

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-white/70 max-w-xl mb-10 leading-relaxed font-light"
            >
              I&apos;m Steve Beno H — a 1st Year ECE student passionate about
              embedded systems, web development, and building projects that
              bridge hardware and software.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-dark font-semibold text-sm rounded-md hover:bg-primary-hover transition-colors duration-200"
              >
                View My Projects
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center px-7 py-3.5 border border-white/35 text-white font-semibold text-sm rounded-md hover:border-primary hover:text-primary transition-colors duration-200"
              >
                Learn More
              </a>
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-5"
            >
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-white/50 hover:text-primary transition-colors duration-200"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: gold pull-quote ── */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="hidden lg:block"
          >
            <div className="border-l-2 border-primary pl-8 py-2 max-w-sm ml-auto">
              <span className="block font-display text-6xl text-primary leading-none mb-4 select-none" aria-hidden="true">
                &ldquo;
              </span>
              <p className="font-display text-2xl text-white leading-snug mb-6">
                Exploring the intersection of electronics, code, game
                development, and engineering.
              </p>
              <div className="gold-rule" />
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

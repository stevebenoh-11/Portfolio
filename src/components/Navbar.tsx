"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#work" },
  { label: "Projects", href: "#services" },
  { label: "Faq", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-dark/95 backdrop-blur-sm border-b border-white/10 shadow-lg shadow-black/20"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-4 flex items-center justify-between">
          {/* Wordmark */}
          <a href="#home" className="flex flex-col leading-tight group">
            <span className="font-display text-[22px] font-bold text-white tracking-tight">
              Steve <span className="text-primary">Beno</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-white/55 font-semibold">
              ECE Student
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/80 hover:text-primary pb-1 border-b-2 border-transparent hover:border-primary transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="#"
              className="text-sm text-white/65 hover:text-white transition-colors duration-200"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="px-5 py-2 text-sm font-semibold border border-primary text-primary rounded-md hover:bg-primary hover:text-dark transition-all duration-200"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-dark pt-28 px-6"
        >
          <div className="flex flex-col border-t border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-4 border-b border-white/10 font-display text-2xl font-medium text-white hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-8">
              <a
                href="#"
                className="px-6 py-3.5 text-center text-sm font-semibold border border-white/30 text-white rounded-md hover:border-white transition-colors duration-200"
              >
                Resume
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3.5 text-center text-sm font-semibold bg-primary text-dark rounded-md hover:bg-primary-hover transition-colors duration-200"
              >
                Hire Me
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

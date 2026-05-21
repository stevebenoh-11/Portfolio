"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#work" },
  { label: "Projects", href: "#services" },
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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center font-bold text-sm text-white transition-transform group-hover:scale-105">
              SB
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">
              Steve Beno
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/90 border border-white/10 bg-white/4 backdrop-blur-md rounded-lg hover:text-white hover:border-white/20 hover:bg-white/8 transition-all duration-200 shadow-sm shadow-black/5"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-all duration-200 glow-button"
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
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6"
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-medium text-white hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-6">
              <a
                href="#"
                className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-white/90 border border-white/10 bg-white/4 backdrop-blur-md rounded-lg hover:text-white hover:bg-white/8 transition-all duration-200 shadow-sm"
              >
                Resume
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3 text-center text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-all glow-button"
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

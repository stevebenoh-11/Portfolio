"use client";

import { Mail, MapPin, Phone } from "lucide-react";

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function RedditIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.24-1.72l1.37-4.31 3.82.82c.03.88.75 1.57 1.63 1.57 1.1 0 2-1.1 2-2s-.9-2-2-2c-.79 0-1.48.47-1.81 1.14l-4.22-.9c-.19-.04-.38.07-.44.25l-1.6 5.03c-2.44.04-4.7.67-6.38 1.68-.56-.73-1.46-1.19-2.45-1.19-1.65 0-3 1.35-3 3 0 1.12.61 2.1 1.53 2.61-.06.29-.09.58-.09.89 0 3.86 4.7 7 10.5 7s10.5-3.14 10.5-7c0-.31-.03-.6-.09-.89.92-.51 1.53-1.49 1.53-2.61zm-18.5 2c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm10 5.17c-1.79 1.79-4.83 1.79-6.62 0-.15-.15-.15-.4 0-.55.15-.15.4-.15.55 0 1.48 1.48 4.02 1.48 5.5 0 .15-.15.4-.15.55 0 .15.15.15.4 0 .55zm-.68-3.17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
    </svg>
  );
}

export { GitHubIcon, LinkedInIcon, InstagramIcon, RedditIcon };

const socialLinks = [
  { icon: GitHubIcon, href: "https://github.com/stevebenoh-11", label: "GitHub" },
  { icon: LinkedInIcon, href: "https://www.linkedin.com/in/stevebenoh", label: "LinkedIn" },
  { icon: InstagramIcon, href: "https://www.instagram.com/starky._.36", label: "Instagram" },
  { icon: RedditIcon, href: "https://www.reddit.com/user/stevebenoh", label: "Reddit" }
];

const navigateLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Footer({
  onOpenPrivacy,
  onOpenTerms,
}: {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}) {
  return (
    <footer className="border-t border-border/50 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col items-center">
        {/* Logo and Intro */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center font-bold text-lg text-white mb-4 shadow-lg shadow-primary/20">
            SB
          </div>
          <h3 className="text-xl font-bold text-white tracking-wide mb-2">
            Steve Beno H
          </h3>
          <p className="text-sm text-muted max-w-md leading-relaxed">
            1st Year ECE student exploring the intersection of electronics, code,
            game development, and engineering.
          </p>
        </div>

        {/* Quick Navigation links in a row */}
        <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-8">
          {navigateLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Contact Strips in a row */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-muted mb-8 border-t border-b border-border/30 py-4 w-full max-w-2xl justify-center">
          <a
            href="mailto:stevebenoh@gmail.com"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail size={14} className="text-primary" />
            stevebenoh@gmail.com
          </a>
          <span className="hidden sm:inline text-caption/40">|</span>
          <a
            href="tel:+916385636432"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone size={14} className="text-primary" />
            +91 6385636432
          </a>
          <span className="hidden sm:inline text-caption/40">|</span>
          <div className="flex items-center gap-2 cursor-default">
            <MapPin size={14} className="text-primary" />
            Coimbatore, India 🎓
          </div>
        </div>

        {/* Social Icon Strip */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-10 h-10 rounded-xl border border-border bg-surface flex items-center justify-center text-caption hover:text-white hover:border-primary/40 hover:bg-surface-alt transition-all duration-200"
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-caption">
            © 2026 Steve Beno H. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                onOpenPrivacy?.();
              }}
              className="text-xs text-caption hover:text-muted transition-colors cursor-pointer bg-transparent border-0 outline-none"
            >
              Privacy
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onOpenTerms?.();
              }}
              className="text-xs text-caption hover:text-muted transition-colors cursor-pointer bg-transparent border-0 outline-none"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

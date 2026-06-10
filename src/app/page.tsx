"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, LogOut, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStrip from "@/components/TechStrip";
import WhatIDo from "@/components/WhatIDo";
import Capabilities from "@/components/Capabilities";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import LegalModal from "@/components/LegalModal";
import CircuitBackground from "@/components/CircuitBackground";

export default function Home() {
  const [legalTab, setLegalTab] = useState<"privacy" | "terms" | null>(null);
  const [isDeclined, setIsDeclined] = useState(false);

  // Attempt window.close and manage decline flow
  const handleDecline = () => {
    // 1. Close modal
    setLegalTab(null);
    // 2. Set declined state (lockout overlay)
    setIsDeclined(true);
    // 3. Try to close browser window
    try {
      window.close();
    } catch (e) {
      console.warn("Browser blocked window.close():", e);
    }
  };

  const handleAccept = () => {
    setLegalTab(null);
    setIsDeclined(false);
  };

  // Prevent scroll when locked out
  useEffect(() => {
    if (isDeclined) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDeclined]);

  return (
    <>
      {/* 1. Main Content Layout — alternating dark/light bands */}
      <div className={`relative ${isDeclined ? "pointer-events-none select-none blur-sm" : ""}`}>
        {/* Full-page circuit trace — runs from the very top to the footer */}
        <CircuitBackground />
        <Navbar />
        <main className="flex-1">
          <Hero />
          <WhatIDo />
          <Capabilities />
          <TechStrip />
          <Pricing />
          <FAQ />
          <CTA />
        </main>
        <Footer
          onOpenPrivacy={() => setLegalTab("privacy")}
          onOpenTerms={() => setLegalTab("terms")}
        />
      </div>

      {/* 2. Interactive Legal Compliance Modal */}
      {legalTab && (
        <LegalModal
          key={legalTab}
          initialTab={legalTab}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}

      {/* 3. Ultimate Inescapable Lockout Overlay (Fallback for Declined Terms) */}
      {isDeclined && (
        <div className="fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center p-6 text-center select-none animate-fade-in">
          {/* Alert Content Card */}
          <div className="relative w-full max-w-lg bg-background shadow-press rounded-xl p-8 md:p-10 flex flex-col items-center">

            {/* Warning Stamp */}
            <div className="w-16 h-16 border border-red-700/40 bg-red-700/5 rounded-lg flex items-center justify-center text-red-700 mb-6">
              <ShieldAlert size={30} />
            </div>

            <h1 className="font-display text-2xl font-bold tracking-tight mb-3">
              ACCESS TERMINATED
            </h1>

            <p className="text-[11px] text-red-700 uppercase tracking-[0.25em] font-bold mb-6 px-4 py-1.5 border border-red-700/30 bg-red-700/5 rounded-md">
              Legal Consent Declined
            </p>

            <p className="text-sm text-muted leading-relaxed mb-8 max-w-sm">
              Because you have declined the Privacy Policy &amp; Terms of Service, we are legally prohibited from displaying our engineering works, mechanical models, and embedded code systems. This session has been terminated.
            </p>

            {/* Exit Commands */}
            <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">

              {/* Reset/Try again trigger */}
              <button
                onClick={() => {
                  setIsDeclined(false);
                  setLegalTab("privacy");
                }}
                className="w-full sm:w-auto px-5 py-3 border border-foreground text-foreground rounded-md hover:bg-surface text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw size={12} />
                Re-evaluate Terms
              </button>

              {/* Secure Redirect out */}
              <button
                onClick={() => {
                  window.location.href = "https://google.com";
                }}
                className="w-full sm:w-auto px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut size={12} />
                Exit Website
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

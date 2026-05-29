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
      {/* Dynamic Background Floating Liquid Glass Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <div className="absolute top-[20%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-[#0093B5]/[0.04] blur-[120px] animate-liquid-glow-1" />
        <div className="absolute bottom-[25%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#6B22EE]/[0.04] blur-[150px] animate-liquid-glow-2" />
        <div className="absolute top-[60%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-[#0093B5]/[0.03] blur-[130px] animate-liquid-glow-2" />
      </div>

      {/* Scroll-driven PCB Circuit Background */}
      <CircuitBackground />

      {/* 1. Main Content Layout */}
      <div className={`relative z-10 ${isDeclined ? "pointer-events-none select-none blur-sm" : ""}`}>
        <Navbar />
        <main className="flex-1">
          <Hero />
          <TechStrip />
          <WhatIDo />
          <Capabilities />
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
        <div className="fixed inset-0 z-[9999] bg-[#060B18] flex flex-col items-center justify-center p-6 text-center select-none animate-fade-in">
          {/* Lockout Radial Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Alert Content Card */}
          <div className="relative w-full max-w-lg bg-surface border border-red-500/20 p-8 md:p-10 rounded-2xl shadow-2xl flex flex-col items-center">
            
            {/* Warning Shield Hexagon / Glow */}
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-500 mb-6 animate-pulse">
              <ShieldAlert size={32} />
            </div>

            <h1 className="text-2xl font-black text-white tracking-wider mb-3">
              ACCESS TERMINATED
            </h1>
            
            <p className="text-sm text-red-400/90 font-medium tracking-wide uppercase mb-6 px-4 py-1.5 bg-red-500/5 border border-red-500/10 rounded-full">
              Legal Consent Declined
            </p>

            <p className="text-sm text-muted leading-relaxed mb-8 max-w-sm">
              Because you have declined the Privacy Policy & Terms of Service, we are legally prohibited from displaying our engineering works, mechanical models, and embedded code systems. This session has been terminated.
            </p>

            {/* Exit Commands */}
            <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
              
              {/* Reset/Try again trigger */}
              <button
                onClick={() => {
                  setIsDeclined(false);
                  setLegalTab("privacy");
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-lg border border-border bg-surface hover:border-white/20 text-xs font-bold uppercase tracking-wider text-white transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw size={12} />
                Re-evaluate Terms
              </button>

              {/* Secure Redirect out */}
              <button
                onClick={() => {
                  window.location.href = "https://google.com";
                }}
                className="w-full sm:w-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-500/20"
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

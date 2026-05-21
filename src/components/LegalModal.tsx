"use client";

import { useState, useEffect } from "react";
import { Shield, FileText, Check, AlertTriangle, ExternalLink } from "lucide-react";

interface LegalModalProps {
  initialTab: "privacy" | "terms";
  onAccept: () => void;
  onDecline: () => void;
}

export default function LegalModal({ initialTab, onAccept, onDecline }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">(initialTab);

  // Sync state if initialTab changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Trap scroll on body when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/90 backdrop-blur-md animate-fade-in">
      {/* Glow effects around modal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] md:max-h-[80vh]">
        
        {/* Header Indicator */}
        <div className="p-6 border-b border-border/80 bg-surface-alt flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              {activeTab === "privacy" ? <Shield size={20} /> : <FileText size={20} />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                Legal & Compliance Center
              </h2>
              <p className="text-xs text-muted">
                Please review our official terms and data policies
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-background border border-border p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("privacy")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                activeTab === "privacy"
                  ? "bg-surface text-white border border-border shadow-md"
                  : "text-muted hover:text-white"
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab("terms")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                activeTab === "terms"
                  ? "bg-surface text-white border border-border shadow-md"
                  : "text-muted hover:text-white"
              }`}
            >
              Terms & Conditions
            </button>
          </div>
        </div>

        {/* Legal Text Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-sm text-muted leading-relaxed">
          {activeTab === "privacy" ? (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-base font-bold text-white mb-2">1. Overview & Scope</h3>
                <p>
                  Welcome to the personal engineering and portfolio website of <strong>Steve Beno H</strong>. 
                  We respect your visual privacy and are fully committed to protecting any details or communication 
                  data you transmit to us. This Privacy Policy details how we accumulate, store, and process 
                  your information when you browse this site or submit inquiry requests.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2">2. Contact Form & SQLite Database</h3>
                <p>
                  When you voluntarily initiate a connection through our contact and inquiry panel, we record the following:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li>Full Name</li>
                  <li>Email Address</li>
                  <li>Phone Number (if provided)</li>
                  <li>Inquiry Subject & Custom Message body</li>
                </ul>
                <p className="mt-2">
                  This details-pack is committed directly into our relational <strong>SQLite Database</strong> locally via 
                  <strong> Prisma ORM 6</strong>. This database runs in a highly secure server environment, shielding your 
                  messages from external public data brokers.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2">3. API & Communication Routing</h3>
                <p>
                  To ensure Steve is immediately updated when a potential collaborator reaches out, we implement API routing:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li>
                    Form submission details are formatted and forwarded as a secure server-side POST query to the 
                    <strong> FormSubmit API</strong>.
                  </li>
                  <li>
                    This automatically dispatches a secure email copy of your message to our official, monitored 
                    inbox: <strong className="text-white">stevebenoh@gmail.com</strong>.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2">4. Admin Caching & Local Storage</h3>
                <p>
                  We value performance and security. This portfolio strictly avoids third-party advertising, marketing, or trackers. 
                  However, we utilize standard HTML5 local caching (<strong className="text-white">localStorage</strong>) exclusively 
                  to preserve administrative authentication sessions. If an authorized administrator accesses the secured database GUI 
                  portal (`/admin`), credentials are encrypted and stored in local cache so they stay logged in during their active session. 
                  These sessions are completely destroyed upon clicking "Lock DB" (logout).
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2">5. Data Deletion and Security</h3>
                <p>
                  We store communications indefinitely for project records and archive purposes. If you wish to have your 
                  submitted records completely purged from the local SQLite database, you may send a delete command or contact 
                  us directly at <strong className="text-white">stevebenoh@gmail.com</strong>. We will process your removal 
                  request within 48 hours.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-base font-bold text-white mb-2">1. Terms of Service Agreement</h3>
                <p>
                  By accessing, browsing, or utilizing the services on this web portfolio, you explicitly agree to comply with 
                  and be legally bound by these Terms and Conditions. If you do not understand or do not accept these terms, 
                  you are prohibited from accessing this site and your connection session will be immediately closed.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2">2. Intellectual Property Rights</h3>
                <p>
                  All digital assets, materials, designs, and work shown on this portfolio are the sole, exclusive intellectual 
                  property of <strong>Steve Beno H</strong> unless explicitly cited otherwise. This encompasses:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li>Electronic and hardware circuit schematics, custom embedded systems firmware, and Arduino programs.</li>
                  <li>Custom game components, game design layouts, and simulations developed in <strong>Unreal Engine</strong>.</li>
                  <li>3D mechanical models and digital art assets constructed in <strong>Autodesk Maya</strong>.</li>
                  <li>University coursework projects, software source code, graphics, web components, and portfolio layouts.</li>
                </ul>
                <p className="mt-2">
                  No licensing rights or ownership transfers are granted. Any commercial reproduction, code-scraping, reverse-engineering, 
                  or plagiarizing of these engineering assets without prior written authorization is strictly prohibited under 
                  copyright law.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2">3. Acceptable Use Policy</h3>
                <p>
                  You agree to browse this website in a professional manner. You are strictly prohibited from:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li>Spamming or sending unsolicited promotional content through the connection form.</li>
                  <li>Attempting to bypass security barriers, brute-force admin credentials, or inject malicious payloads into the secure `/admin` database endpoint.</li>
                  <li>Engaging in denial-of-service (DoS) attempts or overloading the hosting server.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2">4. Disclaimers & Limitation of Liability</h3>
                <p>
                  The information and assets on this portfolio are published solely for demonstrative, academic, and professional review 
                  purposes. All electrical designs and software implementations are provided <strong className="text-white">&quot;as is&quot;</strong> 
                  without guarantees of functional accuracy. Steve Beno H is not liable for any physical or digital damages resulting 
                  from compiling our code, executing designs, or relying on details displayed here.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2">5. Force Termination</h3>
                <p>
                  Declining these terms indicates you do not authorize our standard operational processes (such as storing database submissions 
                  or local caching). Consequently, your access to this portfolio will be fully revoked.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Warning Indicator */}
        <div className="px-6 py-3 border-t border-b border-border/40 bg-surface-alt/40 flex items-start gap-2.5">
          <AlertTriangle size={15} className="text-primary mt-0.5 shrink-0" />
          <p className="text-[11px] text-muted leading-snug">
            Accepting these terms validates your consent for us to store and process form submissions in SQLite and cache admin credentials locally. 
            Declining will restrict portfolio usage and safely terminate your session.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-surface-alt border-t border-border flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={onDecline}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            I Don&apos;t Understand / Decline
          </button>
          
          <button
            onClick={onAccept}
            className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all glow-button inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check size={14} />
            I Understand & Accept
          </button>
        </div>

      </div>
    </div>
  );
}

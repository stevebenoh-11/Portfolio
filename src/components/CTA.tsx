"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle, Mail, Phone, MapPin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AnimatedSection>
          <div className="liquid-glass rounded-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-16">
              {/* Left Column — Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                    Let&apos;s Connect!
                  </h2>
                  <p className="text-base sm:text-lg text-muted mb-8 max-w-lg leading-relaxed">
                    Got an internship opportunity, game development project, circuit design collaboration, or just want to chat about Unreal Engine? Fill out the form, and let&apos;s build something amazing together.
                  </p>
                </div>

                {/* Direct Contact Badges */}
                <div className="space-y-4">
                  <a
                    href="mailto:stevebenoh@gmail.com"
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-surface-alt hover:border-primary/30 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-caption font-medium">Email Me Directly</p>
                      <p className="text-sm font-semibold text-white">stevebenoh@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="tel:+916385636432"
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-surface-alt hover:border-primary/30 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-caption font-medium">Call or WhatsApp</p>
                      <p className="text-sm font-semibold text-white">+91 6385636432</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-surface-alt cursor-default">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-caption font-medium">Location</p>
                      <p className="text-sm font-semibold text-white">Coimbatore, India 🇮🇳</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column — Full Form */}
              <div className="flex-1 w-full max-w-xl">
                {status === "success" ? (
                  <div className="h-full rounded-xl border border-green-500/20 bg-green-500/5 p-8 flex flex-col items-center justify-center text-center animate-fade-in min-h-[350px]">
                    <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 mb-4 animate-bounce">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Message Sent Successfully!</h3>
                    <p className="text-sm text-muted leading-relaxed max-w-sm">
                      Thank you, Steve has been notified and all your details have been dispatched to his inbox. You will receive a response within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 px-5 py-2 rounded-lg border border-border bg-surface hover:border-white/20 text-xs font-semibold text-white transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-muted uppercase tracking-wider">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Tony Stark"
                          disabled={status === "loading"}
                          className="w-full px-4 py-3 rounded-lg bg-surface-alt border border-border text-white placeholder:text-caption text-sm focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-muted uppercase tracking-wider">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. tony@stark.com"
                          disabled={status === "loading"}
                          className="w-full px-4 py-3 rounded-lg bg-surface-alt border border-border text-white placeholder:text-caption text-sm focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-muted uppercase tracking-wider">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +91 XXXXX XXXXX"
                          disabled={status === "loading"}
                          className="w-full px-4 py-3 rounded-lg bg-surface-alt border border-border text-white placeholder:text-caption text-sm focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                        />
                      </div>

                      {/* Subject */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-muted uppercase tracking-wider">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="e.g. Project Collaboration"
                          disabled={status === "loading"}
                          className="w-full px-4 py-3 rounded-lg bg-surface-alt border border-border text-white placeholder:text-caption text-sm focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-muted uppercase tracking-wider">Your Message *</label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Hi Steve, I'd like to talk about a game dev role..."
                        disabled={status === "loading"}
                        className="w-full px-4 py-3 rounded-lg bg-surface-alt border border-border text-white placeholder:text-caption text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none disabled:opacity-50"
                      />
                    </div>

                    {/* Submit & Error Controls */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full py-3.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-hover transition-all duration-200 glow-button inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-primary"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending Your Message...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Message
                          </>
                        )}
                      </button>

                      {status === "error" && (
                        <div className="flex items-center gap-2 text-xs text-red-400 mt-3 justify-center animate-fade-in">
                          <AlertCircle size={14} />
                          <span>Error transmitting message. Please direct email stevebenoh@gmail.com</span>
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

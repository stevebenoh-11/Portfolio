"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle, Mail, Phone, MapPin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const inputClasses =
  "w-full px-4 py-3 bg-white/5 border border-white/15 text-white placeholder:text-white/35 text-sm rounded-md focus:outline-none focus:border-primary transition-colors disabled:opacity-50";

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
    <section id="contact" className="bg-dark text-white py-20 sm:py-28 relative overflow-hidden">
      {/* ambient gold sheen */}
      <div className="absolute bottom-0 right-0 w-[45%] h-full bg-gradient-to-tl from-primary/[0.06] via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-14 lg:gap-20">
          {/* Left Column — Info */}
          <AnimatedSection>
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
              Get in Touch
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight mb-6">
              Let&apos;s Connect!
            </h2>
            <p className="text-base text-white/70 mb-10 max-w-lg leading-relaxed font-light">
              Got an internship opportunity, game development project, circuit design collaboration, or just want to chat about Unreal Engine? Fill out the form, and let&apos;s build something amazing together.
            </p>

            {/* Direct Contact rows */}
            <div className="space-y-6">
              <a href="mailto:stevebenoh@gmail.com" className="flex items-center gap-4 group">
                <Mail size={18} className="text-primary shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/45 mb-0.5">Email Me Directly</p>
                  <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors break-all">
                    stevebenoh@gmail.com
                  </p>
                </div>
              </a>

              <a href="tel:+916385636432" className="flex items-center gap-4 group">
                <Phone size={18} className="text-primary shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/45 mb-0.5">Call or WhatsApp</p>
                  <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                    +91 6385636432
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 cursor-default">
                <MapPin size={18} className="text-primary shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/45 mb-0.5">Location</p>
                  <p className="text-sm font-semibold text-white">Coimbatore, India 🇮🇳</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column — Form */}
          <AnimatedSection delay={0.15}>
            {status === "success" ? (
              <div className="h-full border border-primary/30 bg-primary/5 p-8 rounded-lg flex flex-col items-center justify-center text-center animate-fade-in min-h-[380px]">
                <div className="w-14 h-14 border border-primary/40 rounded-md flex items-center justify-center text-primary mb-5">
                  <CheckCircle2 size={26} />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Message Sent Successfully!</h3>
                <p className="text-sm text-white/65 leading-relaxed max-w-sm">
                  Thank you, Steve has been notified and all your details have been dispatched to his inbox. You will receive a response within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-7 px-5 py-2.5 border border-white/30 text-xs font-semibold text-white rounded-md hover:border-primary hover:text-primary transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    required
                    aria-label="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
                    disabled={status === "loading"}
                    className={inputClasses}
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    aria-label="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    disabled={status === "loading"}
                    className={inputClasses}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    aria-label="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    disabled={status === "loading"}
                    className={inputClasses}
                  />
                  <input
                    type="text"
                    name="subject"
                    aria-label="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    disabled={status === "loading"}
                    className={inputClasses}
                  />
                </div>

                <textarea
                  name="message"
                  required
                  rows={6}
                  aria-label="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message *"
                  disabled={status === "loading"}
                  className={`${inputClasses} resize-none`}
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-8 py-3.5 bg-primary text-dark font-semibold text-sm rounded-md hover:bg-primary-hover transition-colors duration-200 inline-flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:hover:bg-primary cursor-pointer"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Sending Your Message...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-xs text-red-400 mt-4 animate-fade-in">
                      <AlertCircle size={14} />
                      <span>Error transmitting message. Please direct email stevebenoh@gmail.com</span>
                    </div>
                  )}
                </div>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

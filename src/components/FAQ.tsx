"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const faqs = [
  {
    question: "What year and branch are you studying?",
    answer:
      "I am a first-year student pursuing a degree in Electronics and Communication Engineering (ECE) at SNS College of Technology. I have a strong interest in embedded systems, game development, and modern software engineering.",
  },
  {
    question: "Are you open to internships or collaborations?",
    answer:
      "Yes, absolutely! I am highly receptive to internship opportunities, hands-on collaborations, and engineering projects where I can contribute my skills in embedded systems and development while learning from experienced professionals. Please feel free to reach out via the contact form or email.",
  },
  {
    question: "Can you work on both hardware and software projects?",
    answer:
      "Yes, absolutely! My academic foundation in Electronics and Communication Engineering (ECE) combined with my coding experience allows me to comfortably bridge both physical hardware and software development. I enjoy designing circuit schematics and writing microchip firmware as much as developing responsive web interfaces or 3D engine scripts.",
  },
  {
    question: "How can I reach you for a project or opportunity?",
    answer:
      "The most convenient way to reach me is by entering your details in the 'Let's Connect!' contact panel at the bottom of this page. Alternatively, you can email me directly at stevebenoh@gmail.com or connect with me via LinkedIn. I check my messages regularly and will do my best to get back to you promptly!",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base font-medium text-white group-hover:text-primary transition-colors pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown size={20} className="text-muted" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted leading-relaxed pb-5">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 border-t border-border/50">
      <div className="mx-auto max-w-3xl px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-sm text-primary font-medium uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Frequently Asked
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

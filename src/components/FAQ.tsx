"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const faqs = [
  {
    question: "What branch are you studying?",
    answer:
      "I am pursuing a degree in Electronics and Communication Engineering (ECE) at SNS College of Technology. I have a strong interest in embedded systems, game development, and modern software engineering.",
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
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-6 px-7 sm:px-9 text-left group cursor-pointer"
      >
        <span className="font-display text-lg sm:text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-2xl text-primary leading-none font-light"
          aria-hidden="true"
        >
          +
        </motion.span>
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
            <p className="text-sm sm:text-[15px] text-muted leading-relaxed pb-7 px-7 sm:px-9 max-w-3xl">
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
    <section id="faq" className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
              FAQ
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight">
              Frequently Asked.
            </h2>
            <div className="gold-rule mx-auto mt-6" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="bg-background shadow-press-sm rounded-lg overflow-hidden">
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

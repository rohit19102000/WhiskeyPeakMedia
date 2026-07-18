"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/data/faqs";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-32 bg-[#111111]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C8A97E]/60 mb-6">
            Common Questions
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#F0EDE8]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Everything You Need to Know
          </h2>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-[#161616] rounded-2xl overflow-hidden border border-transparent hover:border-[rgba(200,169,126,0.1)] transition"
              >
                 {/* Question Button */}
                <button
                  onClick={() => toggleIndex(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  className="w-full flex items-center justify-between p-8 text-left cursor-pointer"
                >
                  <span className="text-lg md:text-xl font-medium text-[#F0EDE8] pr-4">
                    {faq.question}
                  </span>

                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                    style={{
                      borderColor: isOpen
                        ? "#C8A97E"
                        : "rgba(200,169,126,0.3)",
                      backgroundColor: isOpen
                        ? "#C8A97E"
                        : "transparent",
                    }}
                  >
                    {isOpen ? (
                      <Minus
                        size={18}
                        className="transition-colors duration-300"
                        style={{ color: isOpen ? "#0A0A0A" : "#C8A97E" }}
                      />
                    ) : (
                      <Plus
                        size={18}
                        className="transition-colors duration-300"
                        style={{ color: "#C8A97E" }}
                      />
                    )}
                  </span>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 pt-0 text-[#888] font-light leading-loose border-t border-[rgba(255,255,255,0.05)]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

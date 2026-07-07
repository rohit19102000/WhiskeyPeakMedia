"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/data/faqs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PhilosophyFAQSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // pin for 200vh of scroll distance
          scrub: true,
          pin: true,
          pinSpacing: true,
        },
      });

      // 1. FAQ content slides up from bottom (y: 100vh -> 0) and fades in
      tl.fromTo(
        faqRef.current,
        {
          opacity: 0,
          y: "100vh",
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "none", // Linear ease for scrubbing consistency
        },
        0
      );

      // 2. Philosophy text fades out and slides up *only after* FAQ heading reaches center
      // This starts at 35% of progress (when FAQ header reaches the position in the screenshot)
      tl.to(
        philosophyRef.current,
        {
          opacity: 0,
          y: -80,
          scale: 0.92,
          duration: 0.35, // relatively quick transition
          ease: "power1.inOut",
        },
        0.35 // Start at 35% progress
      );

      // 3. Background transition from #0A0A0A to #111111 at the same time
      tl.to(
        stickyRef.current,
        {
          backgroundColor: "#111111",
          duration: 0.35,
          ease: "power1.inOut",
        },
        0.35 // Start at 35% progress
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={containerRef} className="relative w-full bg-[#0A0A0A] h-screen overflow-hidden">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div
        ref={stickyRef}
        className="relative w-full h-full flex items-center justify-center bg-[#0A0A0A]"
      >
        {/* ── PHILOSOPHY CONTENT (absolute) ── */}
        <div
          ref={philosophyRef}
          className="absolute max-w-4xl mx-auto px-6 w-full text-center z-10 pointer-events-none"
          style={{ willChange: "transform, opacity" }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#C8A97E]/60 mb-12">
            Our Philosophy
          </p>

          <h2
            className="text-3xl md:text-5xl font-light leading-normal text-[#F0EDE8]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            We don&apos;t just build websites. We build the digital foundations
            of ambitious brands. Every line of code is written with{" "}
            <em
              className="not-italic text-[#C8A97E]"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontStyle: "italic",
              }}
            >
              intent
            </em>
            . Every animation serves a{" "}
            <em
              className="not-italic text-[#C8A97E]"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontStyle: "italic",
              }}
            >
              purpose
            </em>
            . Every pixel earns its place.
          </h2>

          <div className="w-px h-20 bg-[#C8A97E]/20 mx-auto mt-20" />
        </div>

        {/* ── FAQ CONTENT (absolute) ── */}
        <div
          ref={faqRef}
          className="absolute max-w-4xl mx-auto px-6 w-full opacity-0 pointer-events-auto z-20 overflow-y-auto max-h-[85vh] py-8 no-scrollbar"
          style={{
            willChange: "transform, opacity",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {/* Header */}
          <div className="text-center mb-16">
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
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left cursor-pointer"
                  >
                    <span className="text-base md:text-lg font-medium text-[#F0EDE8] pr-4">
                      {faq.question}
                    </span>

                    <span
                      className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                      style={{
                        borderColor: isOpen
                          ? "#C8A97E"
                          : "rgba(200,169,126,0.3)",
                        backgroundColor: isOpen ? "#C8A97E" : "transparent",
                      }}
                    >
                      {isOpen ? (
                        <Minus
                          size={16}
                          className="transition-colors duration-300"
                          style={{ color: isOpen ? "#0A0A0A" : "#C8A97E" }}
                        />
                      ) : (
                        <Plus
                          size={16}
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
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 md:p-8 pt-0 text-sm md:text-base text-[#888] font-light leading-loose border-t border-[rgba(255,255,255,0.05)]">
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
      </div>
    </section>
  );
}

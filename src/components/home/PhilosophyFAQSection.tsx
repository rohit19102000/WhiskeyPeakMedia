"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/data/faqs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ────────────────────────── HOVER WORD SUBCOMPONENT ────────────────────────── */
function HoverWord({
  word,
  isSpecial,
  cleanWord,
  isSublabel,
}: {
  word: string;
  isSpecial: boolean;
  cleanWord: string;
  isSublabel?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover)");
    setCanHover(media.matches);
  }, []);

  const handleMouseEnter = () => {
    if (canHover) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (canHover) setIsHovered(false);
  };

  // Lighter gold for hover: var(--accent-gold-hover)
  // Normal gold for special: var(--accent-gold)
  // Normal gray-white for regular: rgba(240, 237, 232, 0.65)
  // Sublabel default color: text-gold/60
  let color = isSpecial
    ? "var(--accent-gold)"
    : isSublabel
    ? "rgba(200, 169, 126, 0.6)"
    : "rgba(240, 237, 232, 0.65)";
  
  let textShadow = "none";

  if (isHovered) {
    color = "var(--accent-gold-hover)";
    textShadow = "0 0 6px rgba(224, 195, 156, 0.55)";
  }

  return (
    <span
      className="inline-block transition-all duration-300 ease-out cursor-default"
      style={{
        color,
        textShadow,
        fontFamily: isSpecial ? "var(--font-playfair), serif" : "inherit",
        fontStyle: isSpecial ? "italic" : "normal",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isSpecial ? cleanWord : word}
    </span>
  );
}

/* ────────────────────────── MAIN COMPONENT ────────────────────────── */
export default function PhilosophyFAQSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileGlowPos, setMobileGlowPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      // Animate pointerEvents so it is only interactive when visible
      tl.fromTo(
        faqRef.current,
        {
          opacity: 0,
          y: "100vh",
          pointerEvents: "none",
        },
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 1,
          ease: "none", // Linear ease for scrubbing consistency
        },
        0
      );

      // 2. Philosophy text fades out and slides up *only after* FAQ heading reaches center
      // Animate pointerEvents so it doesn't block clicks when hidden
      tl.fromTo(
        philosophyRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          pointerEvents: "auto",
        },
        {
          opacity: 0,
          y: -80,
          scale: 0.92,
          pointerEvents: "none",
          duration: 0.35, // relatively quick transition
          ease: "power1.inOut",
        },
        0.35 // Start at 35% progress
      );

      // 3. Background transition from #0A0A0A to #111111 at the same time
      tl.to(
        stickyRef.current,
        {
          backgroundColor: "var(--bg-surface)",
          duration: 0.35,
          ease: "power1.inOut",
        },
        0.35 // Start at 35% progress
      );

      // 4. Animate mobile glow position along lemniscate path
      const glowProgress = { value: 0 };
      tl.to(
        glowProgress,
        {
          value: 1,
          duration: 1, // runs across the entire scroll duration of the timeline (0 to 1)
          ease: "none",
          onUpdate: () => {
            const p = glowProgress.value;
            const t = p * 2 * Math.PI;

            const container = stickyRef.current;
            if (!container) return;
            const rect = container.getBoundingClientRect();
            const w = Math.min(rect.width * 0.95, 1850);
            const h = w * 0.5;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Lemniscate width and height matching SVG loops
            const scaleX = w * 0.38;
            const scaleY = h * 0.55;

            const denom = 1 + Math.sin(t) * Math.sin(t);
            const x = centerX + (scaleX * Math.cos(t)) / denom;
            const y = centerY + (scaleY * Math.sin(t) * Math.cos(t)) / denom;

            setMobileGlowPos({ x, y });
          },
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const sublabelWords = ["Our", "Philosophy"];
  const rawText = "We don't just build websites. We build the digital foundations of ambitious brands. Every line of code is written with intent. Every animation serves a purpose. Every pixel earns its place.";
  const words = rawText.split(" ");

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative w-full bg-background h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div
        ref={stickyRef}
        className="relative w-full h-full flex items-center justify-center bg-background"
      >
        {/* ── BACKGROUND INFINITY SVG ── */}
        {/* Base Layer: Faint */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-15">
          <svg
            viewBox="0 0 100 50"
            className="w-full max-w-[1850px] aspect-[100/50] text-white/10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 50 25 C 36 9, 22 7, 10 21 C -2 35, 6 43, 26 32 C 38 25, 46 25, 50 25 C 54 25, 62 25, 74 18 C 94 7, 98 17, 88 27 C 78 37, 64 36, 50 25 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </svg>
        </div>

        {/* Glow Layer: Spotlit */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0"
          style={{
            maskImage: isMobile
              ? `radial-gradient(circle 90px at ${mobileGlowPos.x}px ${mobileGlowPos.y}px, white 0%, rgba(255,255,255,0.4) 40%, transparent 100%)`
              : isHovering
              ? `radial-gradient(circle 160px at ${mousePos.x}px ${mousePos.y}px, white 0%, rgba(255,255,255,0.4) 40%, transparent 100%)`
              : "radial-gradient(circle 0px at 0px 0px, transparent 100%)",
            WebkitMaskImage: isMobile
              ? `radial-gradient(circle 90px at ${mobileGlowPos.x}px ${mobileGlowPos.y}px, white 0%, rgba(255,255,255,0.4) 40%, transparent 100%)`
              : isHovering
              ? `radial-gradient(circle 160px at ${mousePos.x}px ${mousePos.y}px, white 0%, rgba(255,255,255,0.4) 40%, transparent 100%)`
              : "radial-gradient(circle 0px at 0px 0px, transparent 100%)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 100 50"
              className="w-full max-w-[1850px] aspect-[100/50] text-gold/35"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: "url(#svg-glow)" }}
            >
              <defs>
                <filter id="svg-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M 50 25 C 36 9, 22 7, 10 21 C -2 35, 6 43, 26 32 C 38 25, 46 25, 50 25 C 54 25, 62 25, 74 18 C 94 7, 98 17, 88 27 C 78 37, 64 36, 50 25 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </div>

        {/* ── PHILOSOPHY CONTENT (absolute) ── */}
        <div
          ref={philosophyRef}
          className="absolute max-w-4xl mx-auto px-6 w-full text-center z-10 pointer-events-auto transform-gpu"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Sublabel "Our Philosophy" */}
          <p className="text-xs uppercase tracking-[0.3em] mb-12">
            {sublabelWords.map((word, i) => (
              <span key={i} className="inline-block mr-[0.25em]">
                <HoverWord
                  word={word}
                  isSpecial={false}
                  cleanWord={word}
                  isSublabel={true}
                />
              </span>
            ))}
          </p>

          {/* Main heading */}
          <h2
            className="text-3xl md:text-5xl font-light leading-normal flex flex-wrap justify-center gap-y-2 md:gap-y-4"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {words.map((word, index) => {
              const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
              const isSpecial = cleanWord === "intent" || cleanWord === "purpose";
              const hasPeriod = word.endsWith(".");

              return (
                <span key={index} className="inline-block mr-[0.25em]">
                  <HoverWord
                    word={word}
                    isSpecial={isSpecial}
                    cleanWord={cleanWord}
                  />
                  {isSpecial && hasPeriod && "."}
                </span>
              );
            })}
          </h2>

          <div className="w-px h-20 bg-gold/20 mx-auto mt-20" />
        </div>

        {/* ── FAQ CONTENT (absolute) ── */}
        <div
          ref={faqRef}
          className="absolute max-w-4xl mx-auto px-6 w-full opacity-0 pointer-events-none z-20 overflow-y-auto max-h-[85vh] py-8 no-scrollbar transform-gpu"
          style={{
            willChange: "transform, opacity",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gold/60 mb-6">
              Common Questions
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-foreground"
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
                  className="bg-card/75 backdrop-blur-md md:bg-card md:backdrop-blur-none rounded-2xl overflow-hidden border border-transparent hover:border-gold/10 transition"
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleIndex(index)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left cursor-pointer"
                  >
                    <span className="text-base md:text-lg font-medium text-foreground pr-4">
                      {faq.question}
                    </span>

                    <span
                      className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                      style={{
                        borderColor: isOpen
                          ? "var(--accent-gold)"
                          : "rgba(200, 169, 126, 0.3)",
                        backgroundColor: isOpen ? "var(--accent-gold)" : "transparent",
                      }}
                    >
                      {isOpen ? (
                        <Minus
                          size={16}
                          className="transition-colors duration-300"
                          style={{ color: isOpen ? "var(--bg-deep)" : "var(--accent-gold)" }}
                        />
                      ) : (
                        <Plus
                          size={16}
                          className="transition-colors duration-300"
                          style={{ color: "var(--accent-gold)" }}
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
                        <div className="p-6 md:p-8 pt-0 text-sm md:text-base text-dim font-light leading-loose border-t border-white/5">
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

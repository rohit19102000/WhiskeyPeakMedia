"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/* ────────────────────────── STEP DATA ────────────────────────── */
interface Step {
  num: string;
  accent: string;
  title: string;
  act: string;
  body: string;
  detail: string;
  img: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    accent: "UNDERSTAND",
    title: "Discovery",
    act: "The Brief",
    body: "We immerse ourselves in your world — your audience, your competitors, your ambitions. Every great project starts with relentless curiosity and deep understanding.",
    detail: "Detailed stakeholder interviews, competitive audits, audience persona mapping, and brand positioning workshops form the bedrock of every engagement.",
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800",
  },
  {
    num: "02",
    accent: "ENVISION",
    title: "Design",
    act: "The Canvas",
    body: "Your brand comes alive through intentional design decisions — every pixel, every interaction, every moment of delight carefully considered and crafted.",
    detail: "Pixel-perfect mockups, interactive prototypes, design system creation, and iterative refinement cycles ensure every visual element serves a purpose.",
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
  },
  {
    num: "03",
    accent: "ENGINEER",
    title: "Development",
    act: "The Build",
    body: "Clean, performant code transforms vision into reality. We engineer experiences that load fast, scale effortlessly, and feel impossibly smooth.",
    detail: "Modern frameworks, serverless architecture, CI/CD pipelines, and rigorous code review produce bulletproof digital products.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
  },
  {
    num: "04",
    accent: "ASCEND",
    title: "Launch",
    act: "The Lift",
    body: "Rigorous testing, SEO hardening, and strategic launch sequencing ensure your project doesn't just go live — it takes flight.",
    detail: "Continuous deployment, performance monitoring, analytics integration, and post-launch optimization keep your digital presence climbing.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
];

/* ────────────────────────── COMPONENT ────────────────────────── */
export default function ProcessSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const lenis = useLenis();

  /* ── image stack card refs ── */
  const imageCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  /* ── animation lock & state refs ── */
  const activeIdxRef = useRef(0);
  const prevIdxRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const wipeRef = useRef<HTMLDivElement>(null);
  const isScrollLocked = useRef(false);
  const enteredFromBottom = useRef(false);

  /* ── helper to update DOM states based on a progress value val (0→1) ── */
  const updateProgressElements = useCallback((prevIdx: number, targetIdx: number, val: number) => {
    // Stacking Image Cards Animation
    imageCardsRef.current.forEach((card, index) => {
      if (!card) return;

      // Calculate start state at val = 0 (prevIdx)
      let startY = 100;
      let startScale = 0.8;
      let startOpacity = 0;

      if (index < prevIdx) {
        startY = 0;
        startScale = 1.0;
        startOpacity = 1.0;
      } else if (index === prevIdx) {
        startY = 0;
        startScale = 1.0;
        startOpacity = 1.0;
      }

      // Calculate end state at val = 1 (targetIdx)
      let endY = 100;
      let endScale = 0.8;
      let endOpacity = 0;

      if (index < targetIdx) {
        endY = 0;
        endScale = 1.0;
        endOpacity = 1.0;
      } else if (index === targetIdx) {
        endY = 0;
        endScale = 1.0;
        endOpacity = 1.0;
      }

      // Interpolate
      const currentY = startY + (endY - startY) * val;
      const currentScale = startScale + (endScale - startScale) * val;
      const currentOpacity = startOpacity + (endOpacity - startOpacity) * val;

      gsap.set(card, {
        y: `${currentY}vh`,
        scale: currentScale,
        opacity: currentOpacity,
      });
    });

    // Update active indicators
    setActiveIdx(targetIdx);
    activeIdxRef.current = targetIdx;
  }, []);

  // Initialize elements state on mount
  useEffect(() => {
    updateProgressElements(0, 0, 1.0);
  }, [updateProgressElements]);

  /* ── goToStep with transition reveal ── */
  const goToStep = useCallback((targetIdx: number) => {
    if (isAnimatingRef.current || targetIdx === activeIdxRef.current) return;
    isAnimatingRef.current = true;

    const prevIdx = activeIdxRef.current;
    prevIdxRef.current = prevIdx;

    // 1. Wipe animation (0.3s)
    const tl = gsap.timeline();
    tl.to(wipeRef.current, {
      opacity: 0.95,
      duration: 0.3,
      onComplete: () => {
        // 2. Animate step progress internally once screen is wiped
        const progressObj = { value: 0 };
        gsap.fromTo(
          progressObj,
          { value: 0 },
          {
            value: 1,
            duration: 1.0,
            ease: "power2.out",
            onUpdate: () => {
              updateProgressElements(prevIdx, targetIdx, progressObj.value);
            },
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          }
        );

        // 3. Fade wipe overlay back to transparent
        gsap.to(wipeRef.current, {
          opacity: 0,
          duration: 0.3,
          delay: 0.1,
        });
      },
    });
  }, [updateProgressElements]);

  /* ── ScrollTrigger Pinning ── */
  useEffect(() => {
    if (prefersReducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    // Trigger ScrollTrigger lock callbacks when section hits top top
    const lockTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      onEnter: () => {
        if (activeIdxRef.current < STEPS.length - 1) {
          lenis?.stop();
          isScrollLocked.current = true;
          setIsFixed(true);
          lenis?.scrollTo(container, { duration: 0.25, immediate: true });
        }
      },
      onLeave: () => {
        enteredFromBottom.current = false;
        setIsFixed(false);
        lenis?.start();
        isScrollLocked.current = false;
      },
      onEnterBack: () => {
        enteredFromBottom.current = true;
      },
      onLeaveBack: () => {
        if (enteredFromBottom.current) {
          // Entering from bottom: initialize to last step
          setActiveIdx(STEPS.length - 1);
          activeIdxRef.current = STEPS.length - 1;
          updateProgressElements(0, STEPS.length - 1, 1.0);

          lenis?.stop();
          isScrollLocked.current = true;
          setIsFixed(true);
          lenis?.scrollTo(container, { duration: 0.25, immediate: true });
          
          enteredFromBottom.current = false; // Reset flag
        } else {
          setIsFixed(false);
          lenis?.start();
          isScrollLocked.current = false;
        }
      },
    });

    // Auto reveal first step when entering section trigger zone
    const revealFirst = ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      once: true,
      onEnter: () => {
        isAnimatingRef.current = true;
        const progressObj = { value: 0 };
        gsap.fromTo(
          progressObj,
          { value: 0 },
          {
            value: 1,
            duration: 1.0,
            ease: "power2.out",
            onUpdate: () => {
              updateProgressElements(0, 0, progressObj.value);
            },
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          }
        );
      },
    });

    return () => {
      lockTrigger.kill();
      revealFirst.kill();
    };
  }, [lenis, prefersReducedMotion, updateProgressElements]);

  /* ── Scroll wheel & Touch swipe hijacking ── */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleWheel = (e: WheelEvent) => {
      if (!isScrollLocked.current) return;

      e.preventDefault();
      if (isAnimatingRef.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const targetIdx = activeIdxRef.current + direction;

      if (targetIdx >= 0 && targetIdx < STEPS.length) {
        goToStep(targetIdx);
      } else if (targetIdx === STEPS.length) {
        // Unlock when scrolling down from final step
        setIsFixed(false);
        lenis?.start();
        isScrollLocked.current = false;
      } else if (targetIdx === -1) {
        // Unlock when scrolling up from first step
        setIsFixed(false);
        lenis?.start();
        isScrollLocked.current = false;
      }
    };

    // Touch support
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrollLocked.current) return;

      // Prevent default scrolling only when locked
      e.preventDefault();

      if (isAnimatingRef.current) return;

      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY - touchEndY; // Positive = scrolling down

      if (Math.abs(diffY) > 30) {
        const direction = diffY > 0 ? 1 : -1;
        const targetIdx = activeIdxRef.current + direction;

        if (targetIdx >= 0 && targetIdx < STEPS.length) {
          goToStep(targetIdx);
        } else if (targetIdx === STEPS.length) {
          setIsFixed(false);
          lenis?.start();
          isScrollLocked.current = false;
        } else if (targetIdx === -1) {
          setIsFixed(false);
          lenis?.start();
          isScrollLocked.current = false;
        }
      }
    };

    // Override manual clicks on anchors to release lock smoothly
    const handleLinkClick = () => {
      isScrollLocked.current = false;
      setIsFixed(false);
      lenis?.start();
    };

    // Add click listeners to all links in the header and navigation
    const navLinks = document.querySelectorAll("a, button");
    navLinks.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
      lenis?.start();
    };
  }, [goToStep, lenis, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <section id="process" className="py-32 bg-[#0A0A0A] text-foreground px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-gold font-medium">Our Process</span>
          <span className="text-sm font-medium text-dim">{STEPS.length} Phases</span>
        </div>
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="relative h-[50vh] md:h-[60vh] rounded-3xl overflow-hidden border border-white/5 shadow-2xl"
            >
              <Image
                src={step.img}
                alt={step.title}
                fill
                sizes="(max-width: 1500px) 92vw, 1500px"
                className="object-cover opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 gap-4">
                <span className="text-xs md:text-sm tracking-[0.25em] uppercase text-gold font-medium">
                  Step {step.num} · {step.accent}
                </span>
                <h3 className="text-3xl md:text-5xl font-bold leading-none font-playfair text-foreground" style={{ fontFamily: "var(--font-playfair)" }}>
                  {step.title}
                </h3>
                <p className="text-sm md:text-lg leading-relaxed text-body max-w-2xl">
                  {step.body}
                </p>
                <p className="text-xs md:text-sm leading-relaxed text-dim max-w-2xl border-l-2 border-gold/25 pl-4">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <style>{`
        .process-section {
          position: relative;
          height: 100vh;
          background: var(--bg-deep);
        }
        .process-sticky {
          position: relative;
          height: 100vh;
          overflow: hidden;
          background: var(--bg-deep);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .process-sticky.is-fixed {
          position: fixed;
          inset: 0;
          height: 100dvh;
          z-index: 40;
        }

        /* ── heading bar ── */
        .process-heading-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 32px 48px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 30;
        }
        .process-heading-label {
          font-family: var(--font-inter), monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent-gold);
        }
        .process-heading-title {
          font-family: var(--font-playfair), serif;
          font-size: 14px;
          color: var(--dim-text);
          letter-spacing: 0.1em;
        }

        /* ── Stacking Cards Container ── */
        .process-cards-container {
          position: relative;
          width: 92%;
          max-width: 1500px;
          height: 76vh;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .process-card {
          position: absolute;
          inset: 0;
          border-radius: 40px;
          overflow: hidden;
          background: var(--bg-card);
          box-shadow: 0 45px 80px -20px rgba(0, 0, 0, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.03);
          will-change: transform, opacity;
        }
        .process-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10, 10, 10, 0.96) 0%, rgba(10, 10, 10, 0.5) 50%, rgba(10, 10, 10, 0.15) 100%);
        }
        .process-card-content {
          position: absolute;
          inset: auto 0 0 0;
          padding: 64px 80px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .process-card-accent {
          font-family: var(--font-inter), monospace;
          font-size: 12px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent-gold);
        }
        .process-card-title {
          font-family: var(--font-playfair), serif;
          font-size: 64px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
        }
        .process-card-body {
          font-family: var(--font-inter), sans-serif;
          font-size: 19px;
          line-height: 1.75;
          color: var(--text-body);
          max-w: 800px;
        }
        .process-card-detail {
          font-family: var(--font-inter), sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: var(--dim-text);
          max-w: 700px;
          border-left: 2px solid rgba(200, 169, 126, 0.25);
          padding-left: 20px;
        }

        /* ── wipe overlay ── */
        .process-wipe {
          position: absolute;
          inset: 0;
          background: var(--bg-deep);
          z-index: 25;
          opacity: 0;
          pointer-events: none;
          will-change: opacity;
        }

        /* ─────── RESPONSIVE ─────── */
        @media (max-width: 768px) {
          .process-heading-bar {
            padding: 16px 24px;
            top: 76px;
          }
          .process-cards-container {
            height: 56vh;
            width: 95%;
            margin-top: 48px;
          }
          .process-card-content {
            padding: 24px;
            gap: 12px;
          }
          .process-card-title {
            font-size: 30px;
          }
          .process-card-body {
            font-size: 14px;
          }
          .process-card-detail {
            font-size: 12px;
          }
        }
      `}</style>

      <section id="process" ref={containerRef} className="process-section">
        <div ref={stickyRef} className={`process-sticky ${isFixed ? "is-fixed" : ""}`}>
          
          {/* ── heading bar ── */}
          <div className="process-heading-bar">
            <span className="process-heading-label">Our Process</span>
            <span className="process-heading-title">
              Step {String(activeIdx + 1).padStart(2, "0")} /{" "}
              {String(STEPS.length).padStart(2, "0")}
            </span>
          </div>

          {/* ── Stacking Cards Container ── */}
          <div className="process-cards-container">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => {
                  imageCardsRef.current[i] = el;
                }}
                className="process-card"
                style={{
                  zIndex: i,
                }}
              >
                {/* Background image */}
                <Image
                  src={step.img}
                  alt={step.title}
                  fill
                  sizes="(max-width: 1500px) 92vw, 1500px"
                  className="object-cover"
                />

                {/* Dark gradient overlay */}
                <div className="process-card-overlay" />

                {/* Card overlaid content */}
                <div className="process-card-content">
                  <span className="process-card-accent">
                    Step {step.num} · {step.accent}
                  </span>
                  <h3 className="process-card-title">
                    {step.title}
                  </h3>
                  <p className="process-card-body">
                    {step.body}
                  </p>
                  <p className="process-card-detail">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── wipe overlay ── */}
          <div ref={wipeRef} className="process-wipe" />
        </div>
      </section>
    </>
  );
}

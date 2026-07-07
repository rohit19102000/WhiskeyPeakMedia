"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ────────────────────────── STEP DATA ────────────────────────── */
interface Step {
  num: string;
  accent: string;
  title: string;
  act: string;
  body: string;
  detail: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    accent: "UNDERSTAND",
    title: "Discovery",
    act: "The Brief",
    body: "We immerse ourselves in your world — your audience, your competitors, your ambitions. Every great project starts with relentless curiosity and deep understanding.",
    detail:
      "Detailed stakeholder interviews, competitive audits, audience persona mapping, and brand positioning workshops form the bedrock of every engagement.",
  },
  {
    num: "02",
    accent: "ENVISION",
    title: "Design",
    act: "The Canvas",
    body: "Your brand comes alive through intentional design decisions — every pixel, every interaction, every moment of delight carefully considered and crafted.",
    detail:
      "Pixel-perfect mockups, interactive prototypes, design system creation, and iterative refinement cycles ensure every visual element serves a purpose.",
  },
  {
    num: "03",
    accent: "ENGINEER",
    title: "Development",
    act: "The Build",
    body: "Clean, performant code transforms vision into reality. We engineer experiences that load fast, scale effortlessly, and feel impossibly smooth.",
    detail:
      "Modern frameworks, serverless architecture, CI/CD pipelines, and rigorous code review produce bulletproof digital products.",
  },
  {
    num: "04",
    accent: "ASCEND",
    title: "Launch",
    act: "The Lift",
    body: "Rigorous testing, SEO hardening, and strategic launch sequencing ensure your project doesn't just go live — it takes flight.",
    detail:
      "Continuous deployment, performance monitoring, analytics integration, and post-launch optimization keep your digital presence climbing.",
  },
];

/* ────────────────────────── COMPONENT ────────────────────────── */
export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  /* ── refs for animated elements ── */
  const accentRef = useRef<HTMLSpanElement>(null);
  const bigNumRef = useRef<HTMLSpanElement>(null);
  const inkLineRef = useRef<HTMLDivElement>(null);
  const actRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const wordContainerRef = useRef<HTMLParagraphElement>(null);
  const detailRef = useRef<HTMLParagraphElement>(null);
  const needleFillRef = useRef<SVGLineElement>(null);
  const needleGroupRef = useRef<SVGGElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);

  /* ── dot refs ── */
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* ── word span refs (for word-by-word reveal) ── */
  const wordSpansRef = useRef<(HTMLSpanElement | null)[]>([]);

  /* ── animation lock refs ── */
  const activeIdxRef = useRef(0);
  const isAnimatingRef = useRef(false);

  /* ── helper to update DOM states based on a progress value val (0→1) ── */
  const updateProgressElements = useCallback((stepIdx: number, val: number) => {
    const step = STEPS[stepIdx];

    if (accentRef.current) {
      accentRef.current.textContent = step.accent;
      accentRef.current.style.opacity = String(val < 0.05 ? val / 0.05 : 1);
    }

    if (bigNumRef.current) {
      bigNumRef.current.textContent = step.num;
      bigNumRef.current.style.opacity = String(val < 0.05 ? val / 0.05 : 1);
    }

    if (inkLineRef.current) {
      const scaleVal = Math.min(val * 1.2, 1);
      inkLineRef.current.style.transform = `scaleY(${scaleVal})`;
    }

    if (actRef.current) {
      actRef.current.textContent = step.act;
      const actOpacity = val > 0.15 ? Math.min((val - 0.15) / 0.15, 1) : 0;
      actRef.current.style.opacity = String(actOpacity);
    }

    if (titleRef.current) {
      titleRef.current.textContent = step.title;
      const titleOpacity = val > 0.05 ? Math.min((val - 0.05) / 0.1, 1) : 0;
      titleRef.current.style.opacity = String(titleOpacity);
      const titleY = val > 0.05 ? Math.max(0, 30 * (1 - (val - 0.05) / 0.1)) : 30;
      titleRef.current.style.transform = `translateY(${titleY}px)`;
    }

    if (wordContainerRef.current) {
      const words = step.body.split(/\s+/);
      const totalWords = words.length;

      const currentWordCount = wordSpansRef.current.length;
      if (currentWordCount !== totalWords) {
        wordContainerRef.current.innerHTML = "";
        wordSpansRef.current = [];
        words.forEach((word) => {
          const span = document.createElement("span");
          span.textContent = word + " ";
          span.style.opacity = "0.08";
          span.style.filter = "blur(2px)";
          span.style.transition = "opacity 0.15s, filter 0.15s";
          span.style.display = "inline";
          wordContainerRef.current!.appendChild(span);
          wordSpansRef.current.push(span);
        });
      }

      const revealProgress = Math.max(0, Math.min(1, (val - 0.1) / 0.7));
      const revealedCount = Math.floor(revealProgress * totalWords);

      wordSpansRef.current.forEach((span, i) => {
        if (!span) return;
        if (i < revealedCount) {
          span.style.opacity = "1";
          span.style.filter = "none";
        } else {
          span.style.opacity = "0.08";
          span.style.filter = "blur(2px)";
        }
      });
    }

    if (detailRef.current) {
      detailRef.current.textContent = step.detail;
      const detailOpacity = val > 0.6 ? Math.min((val - 0.6) / 0.2, 1) : 0;
      detailRef.current.style.opacity = String(detailOpacity);
    }

    if (needleFillRef.current) {
      const y2 = 10 + val * 290;
      needleFillRef.current.setAttribute("y2", String(y2));
    }
    if (needleGroupRef.current) {
      const groupY = val * 290;
      needleGroupRef.current.setAttribute("transform", `translate(0, ${groupY})`);
    }

    if (progressBarRef.current) {
      const overallProgress = (stepIdx + val) / STEPS.length;
      progressBarRef.current.style.width = `${overallProgress * 100}%`;
    }
  }, []);

  /* ── goToStep with transition reveal ── */
  const goToStep = useCallback((targetIdx: number) => {
    if (targetIdx < 0 || targetIdx >= STEPS.length || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    activeIdxRef.current = targetIdx;

    // 1. Wipe to solid black
    gsap.to(wipeRef.current, {
      opacity: 1,
      duration: 0.25,
      onComplete: () => {
        // Change text state
        setActiveIdx(targetIdx);

        // 2. Play transition variables automatically from 0 to 1
        const progressObj = { value: 0 };
        gsap.fromTo(
          progressObj,
          { value: 0 },
          {
            value: 1,
            duration: 1.0,
            ease: "power2.out",
            onUpdate: () => {
              updateProgressElements(targetIdx, progressObj.value);
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

  const scrollToStep = useCallback(
    (idx: number) => {
      goToStep(idx);
    },
    [goToStep]
  );

  /* ── ScrollTrigger Pinning ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pin = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=100%", // Pin for 100vh worth of scrolling distance
      pin: stickyRef.current,
      pinSpacing: true,
    });

    // Auto reveal first step when entering section trigger zone
    const revealFirst = ScrollTrigger.create({
      trigger: containerRef.current,
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
              updateProgressElements(0, progressObj.value);
            },
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          }
        );
      },
    });

    return () => {
      pin.kill();
      revealFirst.kill();
    };
  }, [updateProgressElements]);

  /* ── Scroll wheel & Touch swipe hijacking ── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isCooldown = false;
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const isPinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;

      if (!isPinned) return;

      const direction = e.deltaY > 0 ? "down" : "up";

      let shouldBlock = false;
      if (direction === "down" && activeIdxRef.current < STEPS.length - 1) {
        shouldBlock = true;
      } else if (direction === "up" && activeIdxRef.current > 0) {
        shouldBlock = true;
      }

      if (shouldBlock) {
        e.preventDefault();
        if (isAnimatingRef.current || isCooldown) return;

        isCooldown = true;
        setTimeout(() => {
          isCooldown = false;
        }, 1100);

        const targetIdx =
          direction === "down"
            ? activeIdxRef.current + 1
            : activeIdxRef.current - 1;
        goToStep(targetIdx);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const isPinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;

      if (!isPinned) return;

      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY - touchEndY; // positive: scroll down / swipe up

      if (Math.abs(diffY) < 30) return; // threshold

      const direction = diffY > 0 ? "down" : "up";

      let shouldBlock = false;
      if (direction === "down" && activeIdxRef.current < STEPS.length - 1) {
        shouldBlock = true;
      } else if (direction === "up" && activeIdxRef.current > 0) {
        shouldBlock = true;
      }

      if (shouldBlock) {
        if (e.cancelable) e.preventDefault();
        if (isAnimatingRef.current || isCooldown) return;

        isCooldown = true;
        setTimeout(() => {
          isCooldown = false;
        }, 1100);

        const targetIdx =
          direction === "down"
            ? activeIdxRef.current + 1
            : activeIdxRef.current - 1;
        goToStep(targetIdx);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [goToStep]);

  return (
    <>
      {/* ── inline styles for responsive overrides ── */}
      <style>{`
        .process-section {
          position: relative;
          height: 200vh; /* Pinned for 100vh scroll-jacking */
          background: #0A0A0A;
        }
        .process-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          background: #0A0A0A;
          display: flex;
          flex-direction: column;
        }

        /* ── progress bar ── */
        .process-progress-track {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #1a1a1a;
          z-index: 30;
        }
        .process-progress-fill {
          height: 100%;
          background: #c8a97e;
          width: 0%;
          will-change: width;
        }

        /* ── counter strip (left edge) ── */
        .process-counter-strip {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 20;
          gap: 0;
        }
        .process-dot-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }
        .process-dot-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
          outline: none;
        }
        .process-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1.5px solid #c8a97e;
          background: transparent;
          transition: background 0.3s, transform 0.3s;
        }
        .process-dot.active {
          background: #c8a97e;
          transform: scale(1.3);
        }
        .process-dot-num {
          font-family: var(--font-inter), monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          color: #555;
          transition: color 0.3s;
        }
        .process-dot-num.active {
          color: #c8a97e;
        }
        .process-dot-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 8px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #444;
          transition: color 0.3s;
        }
        .process-dot-title.active {
          color: #c8a97e;
        }

        /* ── 3-column grid ── */
        .process-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 140px 1fr 50px;
          padding-left: 100px;
          padding-right: 24px;
          align-items: center;
          gap: 0;
          position: relative;
        }

        /* ── left column ── */
        .process-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 16px;
          padding-right: 24px;
          height: 100%;
          position: relative;
        }
        .process-accent {
          font-family: var(--font-inter), monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c8a97e;
          will-change: opacity;
        }
        .process-big-num {
          font-family: var(--font-playfair), serif;
          font-size: 120px;
          font-weight: 900;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px #2a2a2a;
          user-select: none;
        }
        .process-ink-line {
          width: 2px;
          height: 80px;
          background: #c8a97e;
          transform-origin: top;
          transform: scaleY(0);
          will-change: transform;
        }
        .process-act {
          font-family: var(--font-inter), sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #666;
          will-change: opacity;
        }

        /* ── center column ── */
        .process-center {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 32px;
          padding: 0 32px;
        }
        .process-title {
          font-family: var(--font-playfair), serif;
          font-size: 56px;
          font-weight: 700;
          color: #F0EDE8;
          line-height: 1.1;
          will-change: opacity, transform;
        }
        .process-body {
          font-family: var(--font-inter), sans-serif;
          font-size: 18px;
          line-height: 1.8;
          color: #C8C4BC;
          max-width: 520px;
        }
        .process-detail {
          font-family: var(--font-inter), sans-serif;
          font-size: 13px;
          line-height: 1.7;
          color: #666;
          max-width: 480px;
          border-left: 1px solid rgba(200,169,126,0.18);
          padding-left: 16px;
          will-change: opacity;
        }

        /* ── right column (SVG needle) ── */
        .process-right {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .process-needle-svg {
          width: 24px;
          height: 320px;
        }

        /* ── wipe overlay ── */
        .process-wipe {
          position: absolute;
          inset: 0;
          background: #0A0A0A;
          z-index: 25;
          opacity: 0;
          pointer-events: none;
          will-change: opacity;
        }

        /* ── section heading ── */
        .process-heading-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 24px 0 100px;
          flex-shrink: 0;
        }
        .process-heading-label {
          font-family: var(--font-inter), monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c8a97e;
        }
        .process-heading-title {
          font-family: var(--font-playfair), serif;
          font-size: 14px;
          color: #555;
          letter-spacing: 0.1em;
        }

        /* ─────── RESPONSIVE ─────── */
        @media (max-width: 1024px) {
          .process-grid {
            grid-template-columns: 120px 1fr 40px;
            padding-left: 90px;
          }
          .process-big-num {
            font-size: 90px;
          }
          .process-title {
            font-size: 44px;
          }
          .process-body {
            font-size: 16px;
          }
          .process-counter-strip {
            width: 70px;
          }
        }
        @media (max-width: 768px) {
          .process-grid {
            grid-template-columns: 1fr;
            padding-left: 24px;
            padding-right: 24px;
            gap: 16px;
          }
          .process-left {
            flex-direction: row;
            align-items: center;
            gap: 16px;
            height: auto;
            padding-right: 0;
          }
          .process-big-num {
            font-size: 60px;
          }
          .process-ink-line {
            width: 40px;
            height: 2px;
            transform-origin: left;
          }
          .process-right {
            display: none;
          }
          .process-counter-strip {
            width: 50px;
          }
          .process-heading-bar {
            padding-left: 60px;
          }
          .process-title {
            font-size: 36px;
          }
          .process-body {
            font-size: 15px;
          }
          .process-detail {
            font-size: 12px;
          }
        }
        @media (max-width: 480px) {
          .process-grid {
            padding-left: 16px;
            padding-right: 16px;
          }
          .process-counter-strip {
            width: 40px;
          }
          .process-heading-bar {
            padding-left: 48px;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
          .process-big-num {
            font-size: 44px;
          }
          .process-title {
            font-size: 28px;
          }
          .process-body {
            font-size: 14px;
          }
          .process-dot-title {
            display: none;
          }
        }
      `}</style>

      <section id="process" ref={containerRef} className="process-section">
        <div ref={stickyRef} className="process-sticky">
          {/* ── progress bar ── */}
          <div className="process-progress-track">
            <div ref={progressBarRef} className="process-progress-fill" />
          </div>

          {/* ── heading bar ── */}
          <div className="process-heading-bar">
            <span className="process-heading-label">Our Process</span>
            <span className="process-heading-title">
              Step {String(activeIdx + 1).padStart(2, "0")} /{" "}
              {String(STEPS.length).padStart(2, "0")}
            </span>
          </div>

          {/* ── counter strip (left edge) ── */}
          <div className="process-counter-strip">
            <div className="process-dot-group">
              {STEPS.map((step, i) => (
                <button
                  key={step.num}
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  className="process-dot-item"
                  onClick={() => scrollToStep(i)}
                  aria-label={`Go to step ${step.num}: ${step.title}`}
                >
                  <div
                    className={`process-dot${i === activeIdx ? " active" : ""}`}
                  />
                  <span
                    className={`process-dot-num${
                      i === activeIdx ? " active" : ""
                    }`}
                  >
                    {step.num}
                  </span>
                  <span
                    className={`process-dot-title${
                      i === activeIdx ? " active" : ""
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── 3-column grid ── */}
          <div className="process-grid">
            {/* ── left column ── */}
            <div className="process-left">
              <span ref={accentRef} className="process-accent">
                {STEPS[activeIdx].accent}
              </span>
              <span ref={bigNumRef} className="process-big-num">
                {STEPS[activeIdx].num}
              </span>
              <div ref={inkLineRef} className="process-ink-line" />
              <span ref={actRef} className="process-act">
                {STEPS[activeIdx].act}
              </span>
            </div>

            {/* ── center column ── */}
            <div className="process-center">
              <h3 ref={titleRef} className="process-title">
                {STEPS[activeIdx].title}
              </h3>
              <p ref={wordContainerRef} className="process-body" />
              <p ref={detailRef} className="process-detail">
                {STEPS[activeIdx].detail}
              </p>
            </div>

            {/* ── right column (desktop only, hidden via CSS on mobile) ── */}
            <div className="process-right">
              <svg
                className="process-needle-svg"
                viewBox="0 0 24 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* track line */}
                <line
                  x1="12"
                  y1="10"
                  x2="12"
                  y2="310"
                  stroke="#1a1a1a"
                  strokeWidth="1.5"
                />
                {/* gold fill line */}
                <line
                  ref={needleFillRef}
                  x1="12"
                  y1="10"
                  x2="12"
                  y2="10"
                  stroke="#c8a97e"
                  strokeWidth="1.5"
                />
                {/* triangle tip group */}
                <g ref={needleGroupRef} transform="translate(0, 0)">
                  <circle cx="12" cy="10" r="3" fill="#c8a97e" />
                  <polygon points="8,16 16,16 12,24" fill="#c8a97e" />
                </g>
              </svg>
            </div>
          </div>

          {/* ── wipe overlay ── */}
          <div ref={wipeRef} className="process-wipe" />
        </div>
      </section>
    </>
  );
}

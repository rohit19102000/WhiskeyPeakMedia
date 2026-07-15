"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const LAST_INDEX = PORTFOLIO_PROJECTS.length - 1;

// ── Phase 2A/2B scroll-speed math ───────────────────────────────────────────
// With scrub the timeline maps 0→end proportionally to scroll 0→pinLength.
// To keep cards 0–4 at exactly the same scroll speed as before, we extend
// the pin proportionally so each timeline unit still covers the same vh.
//
//   origTlDuration  = last exit end with 6 full-exit cards = (n-1)*0.8 + 2.2 = 6.2
//   lastCardArrival = when card 5 finishes its entrance    = 5*0.8 + 1.0    = 5.0
//
//   Phase 2A (card transition):  last card grows/fades, dcOverlay fades in
//   phase2aDuration = 2.0  → timeline 5.0 → 7.0
//
//   Phase 2B (zoom reveal):      dcBg scales 1→2.5, caption slides in
//                                starts only AFTER 2A ends (overlay fully opaque)
//   phase2bDuration = 2.0  → timeline 7.0 → 9.0
//
//   newTlDuration   = 5.0 + 2.0 + 2.0                                     = 9.0
//   origPinPct      = n * 80                                               = 480
//   newPinPct       = 480 × (9.0 / 6.2) = 696.77 → 697
//   per-unit vh     = 480/6.2 = 697/9.0 = 77.4 vh/unit  ✓ (unchanged)
// ────────────────────────────────────────────────────────────────────────────
const n = PORTFOLIO_PROJECTS.length;
const ORIG_TL_DURATION  = (n - 1) * 0.8 + 2.2;          // 6.2
const LAST_CARD_ARRIVAL = LAST_INDEX * 0.8 + 1.0;         // 5.0
const PHASE2A_DURATION  = 2.0;  // card grows/fades + dcOverlay fades in
const PHASE2B_DURATION  = 2.0;  // dcBg zoom + caption reveal (starts after 2A)
const PHASE2B_START     = LAST_CARD_ARRIVAL + PHASE2A_DURATION; // 7.0
const NEW_TL_DURATION   = PHASE2B_START + PHASE2B_DURATION;     // 9.0
const ORIG_PIN_PCT      = n * 80;                          // 480
const NEW_PIN_PCT       = Math.round(ORIG_PIN_PCT * (NEW_TL_DURATION / ORIG_TL_DURATION)); // 697

export default function PortfolioSection() {
  const triggerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dcOverlayRef = useRef<HTMLDivElement>(null);
  const dcBgRef = useRef<HTMLDivElement>(null);
  const dcCaptionRef = useRef<HTMLDivElement>(null);
  const [clickedCard, setClickedCard] = useState<number | null>(null);

  useLayoutEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const ctx = gsap.context(() => {
      const cards = itemsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          start: "top top",
          // Desktop: extended pin to cover Phase 2 at the same per-unit scroll speed.
          // Mobile:  original pin length (no Phase 2 on mobile).
          end: () =>
            `+=${window.innerWidth >= 768 ? NEW_PIN_PCT : ORIG_PIN_PCT}%`,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };

          // Quadrant coordinates
          const leftX = "8vw";
          const topY = "8vh";
          const bottomY = isDesktop ? "54vh" : "52vh";
          const exitX = "120vw";
          const startY = "-100vh";

          cards.forEach((card, i) => {
            // On desktop the last card skips the exit and stays for Phase 2
            const isLastDesktop = isDesktop && i === LAST_INDEX;

            if (isDesktop) {
              // ── Entrance (all desktop cards): Left-Top → Left-Bottom ──────
              tl.fromTo(
                card,
                { x: leftX, y: topY, scale: 0.9, rotate: 0 },
                { x: leftX, y: bottomY, scale: 1, rotate: 0, duration: 1.0, ease: "none" },
                i * 0.8
              );
              tl.fromTo(
                card,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: "none" },
                i * 0.8
              );

              // ── Exit (cards 0–4 only): Left-Bottom → Right-Bottom ─────────
              if (!isLastDesktop) {
                tl.fromTo(
                  card,
                  { x: leftX, y: bottomY, scale: 1, rotate: 0 },
                  { x: exitX, y: bottomY, scale: 0.9, rotate: 0, duration: 1.0, ease: "none" },
                  i * 0.8 + 1.2
                );
                tl.fromTo(
                  card,
                  { opacity: 1 },
                  { opacity: 0, duration: 0.3, ease: "none" },
                  i * 0.8 + 1.9
                );
              }
              // Last card (index 5) intentionally has no exit —
              // it stays at Left-Bottom and continues into Phase 2 below.

            } else {
              // ── Mobile: Right-Bottom → Left-Bottom → exit top (unchanged) ─
              tl.fromTo(
                card,
                { x: exitX, y: bottomY, scale: 0.9, rotate: 0 },
                { x: leftX, y: bottomY, scale: 1, rotate: 0, duration: 1.0, ease: "none" },
                i * 0.8
              );
              tl.fromTo(
                card,
                { opacity: 0 },
                { opacity: 1, duration: 1.0, ease: "none" },
                i * 0.8
              );
              tl.fromTo(
                card,
                { x: leftX, y: bottomY, scale: 1, rotate: 0 },
                { x: leftX, y: startY, scale: 0.9, rotate: 0, duration: 1.0, ease: "none" },
                i * 0.8 + 1.2
              );
              tl.fromTo(
                card,
                { opacity: 1 },
                { opacity: 0, duration: 1.0, ease: "none" },
                i * 0.8 + 1.2
              );
            }
          });

          // ── Phase 2: Desktop-only — last card grows into Digital Craft ────
          //
          // Geometry:
          //   Card size on desktop: 26vw × 38vh, DOM origin at (left:0, top:0)
          //   Card visual center without GSAP transform: (13vw, 19vh)
          //   At Left-Bottom (GSAP x=8vw, y=54vh): center at (21vw, 73vh)
          //
          //   To center the card on the viewport and fill it:
          //     targetX = 50vw − 13vw = 37vw  (shifts center to 50vw)
          //     targetY = 50vh − 19vh = 31vh  (shifts center to 50vh)
          //     scale   = 100vw / 26vw ≈ 3.85 → use 4 for safety
          //
          //   At scale 4 the card renders ≈ 104vw × 152vh — fully covers viewport.
          //   border-radius animates 24px → 0 for a seamless panel-opens feel.
          //
          // All properties are transform/opacity only (GPU-composited).
          // DC overlay fades in over the scaling card producing the crossfade.
          // ─────────────────────────────────────────────────────────────────
          if (isDesktop) {
            const lastCard = cards[LAST_INDEX];
            const dcOverlay = dcOverlayRef.current;
            const dcBg = dcBgRef.current;
            const dcCaption = dcCaptionRef.current;

            if (!dcOverlay || !dcBg || !dcCaption) return;

            // ── Phase 2A: card transition ─────────────────────────────────
            // Card scales up from Left-Bottom, drifts to viewport center,
            // corners flatten. DC overlay fades in over it. Ends with card
            // invisible and dcOverlay fully opaque.

            // Card: scale up and drift to viewport center, corners open to 0
            tl.to(
              lastCard,
              {
                x: "37vw",
                y: "31vh",
                scale: 4,
                borderRadius: "0px",
                force3D: true,
                duration: PHASE2A_DURATION,
                ease: "none",
              },
              LAST_CARD_ARRIVAL
            );

            // Card: fade out in the second half of Phase 2A (crossfade into overlay)
            tl.to(
              lastCard,
              { opacity: 0, duration: PHASE2A_DURATION * 0.6, ease: "none" },
              LAST_CARD_ARRIVAL + PHASE2A_DURATION * 0.4
            );

            // DC overlay: fade in starting at 25% through Phase 2A
            // Covers the scaling card and reveals the Digital Craft background
            tl.to(
              dcOverlay,
              { opacity: 1, duration: PHASE2A_DURATION * 0.75, ease: "none" },
              LAST_CARD_ARRIVAL + PHASE2A_DURATION * 0.25
            );

            // ── Phase 2B: zoom reveal ─────────────────────────────────────
            // Starts only after Phase 2A ends (dcOverlay is now fully opaque).
            // dcBg zoom and caption are both fully visible when they animate.

            // DC background: scale 1 → 2.5 (mirrors TextRevealSection's .reveal-bg)
            // Starts at PHASE2B_START (= 7.0) so zoom plays on a fully visible overlay
            tl.to(
              dcBg,
              { scale: 2.5, duration: PHASE2B_DURATION, ease: "none" },
              PHASE2B_START
            );

            // DC caption: slide up + fade in (mirrors TextRevealSection's .overlay-text)
            tl.fromTo(
              dcCaption,
              { opacity: 0, y: 100 },
              { opacity: 1, y: 0, duration: PHASE2B_DURATION, ease: "none" },
              PHASE2B_START
            );
          }
        }
      );
    }, trigger);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={triggerRef}
      className="h-screen overflow-hidden bg-background text-foreground relative"
    >
      {/* Gradient text style for CRAFT — mirrors TextRevealSection's .reveal-title-craft */}
      <style>{`
        .reveal-title-craft-dc {
          color: var(--accent-gold);
          background-image: linear-gradient(to bottom, var(--accent-gold), transparent);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-stroke: 2.5px rgba(200, 169, 126, 0.35);
        }

        @supports (-webkit-background-clip: text) or (background-clip: text) {
          .reveal-title-craft-dc {
            color: transparent;
            -webkit-text-fill-color: transparent;
          }
        }
      `}</style>

      {/* ─── Fixed header ─── */}
      <div className="absolute top-8 left-8 z-30 mix-blend-difference">
        <span className="text-gold uppercase tracking-[0.25em] text-sm font-medium">
          Selected Works
        </span>
      </div>

      {/* ─── Heading and description (Right-Top quadrant on desktop) ─── */}
      <div className="absolute top-24 left-8 md:top-36 md:left-[52vw] z-20 text-left max-w-lg md:max-w-xl flex flex-col items-start">
        <h2
          className="text-4xl md:text-6xl font-bold leading-tight text-foreground"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Projects That Speak Volumes
        </h2>
        <p className="text-body mt-6 text-sm md:text-base leading-relaxed mb-8">
          A curated collection of work that showcases our craft—strategy,
          design, and code coming together to create unforgettable digital
          experiences.
        </p>
        <Link
          href="/portfolio"
          className="inline-block text-lg md:text-xl font-medium text-foreground border-b-2 border-gold pb-1 transition-opacity duration-300 hover:opacity-70"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          View All Projects
        </Link>
      </div>

      {/* ─── Cards Container ─── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {PORTFOLIO_PROJECTS.map((project, i) => (
          <div
            key={project.title}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            // Note: transition-[filter] only (not opacity) — GSAP owns opacity via scrub
            className={`absolute w-[68vw] h-[34vh] md:w-[26vw] md:h-[38vh] rounded-3xl overflow-hidden group transition-[filter] duration-700 cursor-pointer transform-gpu pointer-events-auto shadow-2xl border border-white/5 ${
              clickedCard === i ? "grayscale-0" : "grayscale md:hover:grayscale-0"
            }`}
            onClick={() => {
              if (window.innerWidth < 768) {
                setClickedCard(clickedCard === i ? null : i);
              }
            }}
            style={{
              left: 0,
              top: 0,
              zIndex: i,
              opacity: 0,
              willChange: "transform, opacity",
            }}
          >
            {/* Image */}
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 68vw, 26vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40" />

            {/* Bottom label */}
            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                {project.category}
              </span>
              <h3
                className="text-2xl font-bold text-foreground mt-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Digital Craft Overlay (Desktop Phase 2 only) ─────────────────
          Sits at z-40, invisible initially (opacity: 0).
          GSAP fades it in during Phase 2 as the last card scales beneath it.
          hidden md:flex means: display:none on mobile (TextRevealSection
          handles mobile), display:flex on desktop (animated by GSAP).     */}
      <div
        ref={dcOverlayRef}
        className="hidden md:flex absolute inset-0 z-40 items-center justify-center pointer-events-none"
        style={{
          opacity: 0,
          background: "var(--bg-deep)",
          willChange: "opacity",
        }}
      >
        {/* Background image — GSAP scales 1 → 2.5 (mirrors .reveal-bg) */}
        <div
          ref={dcBgRef}
          style={{
            position: "absolute",
            inset: 0,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Digital craft background"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", opacity: 0.3 }}
          />
        </div>

        {/* DIGITAL / CRAFT heading — always visible once overlay appears (no separate anim) */}
        <div
          className="relative z-10 text-center px-4"
          style={{ mixBlendMode: "screen" }}
        >
          <h2
            className="text-[15vw] leading-none font-black tracking-tighter"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-playfair), serif",
            }}
          >
            DIGITAL
          </h2>
          <h2
            className="text-[15vw] leading-none font-black tracking-tighter reveal-title-craft-dc"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            CRAFT
          </h2>
        </div>

        {/* Caption — GSAP fades + slides up (mirrors .overlay-text in TextRevealSection) */}
        <div
          ref={dcCaptionRef}
          style={{
            position: "absolute",
            bottom: "5rem",
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        >
          <p
            className="text-lg md:text-2xl font-light tracking-wide"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            Where your brand becomes unforgettable.
          </p>
        </div>
      </div>
    </section>
  );
}

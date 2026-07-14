"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TextRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 2,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(".reveal-bg", {
        scale: 2.5,
        duration: 1,
      });

      tl.fromTo(
        ".overlay-text",
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1 },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .reveal-title-craft {
          color: var(--accent-gold);
          background-image: linear-gradient(to bottom, var(--accent-gold), transparent);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-stroke: 2.5px rgba(200, 169, 126, 0.35);
        }

        @supports (-webkit-background-clip: text) or (background-clip: text) {
          .reveal-title-craft {
            color: transparent;
            -webkit-text-fill-color: transparent;
          }
        }
      `}</style>
      <section
        ref={containerRef}
        className="h-screen w-full overflow-hidden bg-background flex items-center justify-center"
        style={{ position: "relative" }}
      >
        {/* Background image */}
        <div
          className="reveal-bg scale-100"
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Digital craft background"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", opacity: 0.3 }}
          />
        </div>

        {/* Foreground text */}
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
            className="text-[15vw] leading-none font-black tracking-tighter reveal-title-craft"
            style={{
              fontFamily: "var(--font-playfair), serif",
            }}
          >
            CRAFT
          </h2>
        </div>

        {/* Overlay text at bottom */}
        <div
          className="overlay-text"
          style={{
            position: "absolute",
            bottom: "5rem",
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: 0,
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
      </section>
    </>
  );
}

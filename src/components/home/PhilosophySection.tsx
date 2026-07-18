"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

function HoverWord({
  word,
  isSpecial,
  cleanWord,
}: {
  word: string;
  isSpecial: boolean;
  cleanWord: string;
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

  // Lighter gold for hover: #FFE5B4
  // Normal gold for special: #C8A97E
  // Normal gray-white for regular: rgba(240, 237, 232, 0.65)
  let color = isSpecial ? "#C8A97E" : "rgba(240, 237, 232, 0.65)";
  let textShadow = "none";

  if (isHovered) {
    color = "#FFE5B4";
    textShadow = "0 0 12px rgba(255, 229, 180, 0.75), 0 0 24px rgba(200, 169, 126, 0.4)";
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

export default function PhilosophySection() {
  const rawText = "We don't just build websites. We build the digital foundations of ambitious brands. Every line of code is written with intent. Every animation serves a purpose. Every pixel earns its place.";
  const words = rawText.split(" ");

  return (
    <section
      id="philosophy"
      className="py-40 bg-[#0A0A0A] text-[#F0EDE8] px-6"
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C8A97E]/60 mb-12">
            Our Philosophy
          </p>

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

          <div className="w-px h-20 bg-[#C8A97E]/20 mx-auto mt-20" />
        </div>
      </motion.div>
    </section>
  );
}

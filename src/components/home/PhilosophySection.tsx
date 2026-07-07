"use client";

import { motion } from "framer-motion";

export default function PhilosophySection() {
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
            className="text-3xl md:text-5xl font-light leading-normal"
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
      </motion.div>
    </section>
  );
}

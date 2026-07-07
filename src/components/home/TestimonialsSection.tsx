"use client";

import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { TESTIMONIALS } from "@/data/testimonials";

const firstColumn = TESTIMONIALS.slice(0, 4);
const secondColumn = TESTIMONIALS.slice(4, 8);
const thirdColumn = TESTIMONIALS.slice(8, 12);

export default function TestimonialsSection() {
  return (
    <section className="bg-[#0A0A0A] text-[#F0EDE8]">
      <ContainerScroll
        titleComponent={
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#C8A97E] font-medium mb-4">
              Real feedback from real partnerships
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#F0EDE8] to-[#888]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Client Stories
            </h2>
          </div>
        }
      >
        <div
          className="flex justify-center gap-6 py-10 h-[40rem] overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          }}
        >
          {/* Mobile: single column with all testimonials */}
          <TestimonialsColumn
            testimonials={TESTIMONIALS}
            duration={18}
            className="block md:hidden"
          />

          {/* Desktop: 3 columns with different durations */}
          <TestimonialsColumn
            testimonials={firstColumn}
            duration={18}
            className="hidden md:block"
          />
          <TestimonialsColumn
            testimonials={secondColumn}
            duration={22}
            className="hidden md:block lg:block"
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            duration={26}
            className="hidden lg:block"
          />
        </div>
      </ContainerScroll>
    </section>
  );
}

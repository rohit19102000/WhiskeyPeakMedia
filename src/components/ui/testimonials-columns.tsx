"use client";

import { motion } from "motion/react";

type Testimonial = {
  text: string;
  author_name: string;
  company?: string;
  rating?: number;
};

export const TestimonialsColumn = ({
  testimonials,
  duration = 18,
  className,
}: {
  testimonials: Testimonial[];
  duration?: number;
  className?: string;
}) => {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...Array(2)].map((_, loopIndex) =>
          testimonials.map((t, i) => (
            <div
              key={`${loopIndex}-${i}`}
              className="rounded-3xl border border-[rgba(200,169,126,0.15)] p-6 bg-[#161616] shadow-lg max-w-sm"
            >
              <p className="text-sm leading-relaxed text-[#C8C4BC] font-medium">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-4">
                {t.author_name && (
                  <div className="font-bold text-[#F0EDE8] text-sm">
                    {t.author_name}
                  </div>
                )}
                {t.company && (
                  <div className="text-xs text-[#C8A97E] font-medium mt-0.5">
                    {t.company}
                  </div>
                )}
                {t.rating && (
                  <div className="text-xs text-[#888] font-medium flex items-center gap-1 mt-1">
                    {t.rating} <span className="text-[#C8A97E]">★</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
};

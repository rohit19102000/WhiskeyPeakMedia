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
        className="flex flex-col gap-6 pb-6 transform-gpu"
      >
        {[...Array(2)].map((_, loopIndex) =>
          testimonials.map((t, i) => (
            <div
              key={`${loopIndex}-${i}`}
              className="rounded-3xl border border-gold/15 p-6 bg-card shadow-lg max-w-sm"
            >
              <p className="text-sm leading-relaxed text-body font-medium">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-4">
                {t.author_name && (
                  <div className="font-bold text-foreground text-sm">
                    {t.author_name}
                  </div>
                )}
                {t.company && (
                  <div className="text-xs text-gold font-medium mt-0.5">
                    {t.company}
                  </div>
                )}
                {t.rating && (
                  <div className="text-xs text-dim font-medium flex items-center gap-1 mt-1">
                    {t.rating} <span className="text-gold">★</span>
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

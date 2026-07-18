"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const prefersReducedMotion = usePrefersReducedMotion();
  const rotate = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section
      ref={ref}
      className={prefersReducedMotion ? "min-h-screen py-24 flex items-center justify-center relative px-4" : "h-[70rem] flex items-center justify-center relative px-4"}
    >
      <div className="w-full max-w-6xl perspective-[1200px]">
        <motion.div className="text-center mb-16">
          {titleComponent}
        </motion.div>

        <motion.div
          style={prefersReducedMotion ? {} : { rotateX: rotate, scale }}
          className="bg-card rounded-[32px] p-4 shadow-2xl transform-gpu"
        >
          <div className="bg-background rounded-2xl overflow-hidden">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

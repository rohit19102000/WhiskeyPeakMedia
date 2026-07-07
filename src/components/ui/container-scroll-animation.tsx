"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const rotate = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section
      ref={ref}
      className="h-[70rem] flex items-center justify-center relative px-4"
    >
      <div className="w-full max-w-6xl perspective-[1200px]">
        <motion.div className="text-center mb-16">
          {titleComponent}
        </motion.div>

        <motion.div
          style={{ rotateX: rotate, scale }}
          className="bg-[#161616] rounded-[32px] p-4 shadow-2xl"
        >
          <div className="bg-[#0A0A0A] rounded-2xl overflow-hidden">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

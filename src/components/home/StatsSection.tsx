"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useInView } from "motion/react";

const STATS = [
  { num: 150, suffix: "+", label: "Projects Delivered" },
  { num: 50, suffix: "+", label: "Happy Clients" },
  { num: 5, suffix: "+", label: "Years Experience" },
  { num: 100, suffix: "%", label: "Client Satisfaction" },
];

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function AnimatedCounter({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [target]);

  useEffect(() => {
    if (inView) {
      animate();
    }
  }, [inView, animate]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      ref={ref}
      className="py-24 bg-surface border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center ${
                index > 0 ? "md:border-l md:border-gold/20" : ""
              }`}
            >
              <div className="text-5xl md:text-6xl font-bold text-gold tabular-nums text-right md:text-center pr-4 md:pr-0">
                <AnimatedCounter
                  target={stat.num}
                  suffix={stat.suffix}
                  inView={isInView}
                />
              </div>
              <p className="text-sm text-dim mt-3 tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

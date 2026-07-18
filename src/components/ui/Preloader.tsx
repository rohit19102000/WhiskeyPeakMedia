"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => setLoading(false), 500); // Wait for transition duration
          }, 200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-500 ease-in-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        <span
          className="text-[10px] uppercase tracking-[0.4em] text-gold mb-8 font-medium animate-fade-in-up"
          style={{ animationDelay: "0s" }}
        >
          Whiskey Peak Media
        </span>
        <div
          className="text-8xl md:text-9xl font-bold tracking-tighter text-foreground animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          {Math.min(count, 100)}%
        </div>
        <div
          className="h-[1px] bg-gold mt-8 animate-scale-width"
          style={{ width: "200px" }}
        />
      </div>
    </div>
  );
}

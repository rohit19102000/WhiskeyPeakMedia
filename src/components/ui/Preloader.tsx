"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A0A0A]"
        >
          <div className="flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] uppercase tracking-[0.4em] text-[#C8A97E] mb-8 font-medium"
            >
              Whiskey Peak Media
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-8xl md:text-9xl font-bold tracking-tighter text-[#F0EDE8]"
            >
              {Math.min(count, 100)}%
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="h-[1px] bg-[#C8A97E] mt-8"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

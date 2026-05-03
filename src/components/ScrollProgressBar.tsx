"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { lenisProgress } from "@/components/LenisProvider";

export default function ScrollProgressBar() {
  const shouldReduce = useReducedMotion();
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, { stiffness: 200, damping: 30 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    function update() {
      progress.set(lenisProgress.current);
      rafRef.current = requestAnimationFrame(update);
    }
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [progress]);

  if (shouldReduce) return null;

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX }}
      role="progressbar"
      aria-label="Page scroll progress"
    />
  );
}

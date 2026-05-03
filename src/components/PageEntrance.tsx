"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function PageEntrance({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

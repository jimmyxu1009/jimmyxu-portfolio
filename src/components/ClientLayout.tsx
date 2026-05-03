"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import MouseGlow from "@/components/MouseGlow";

const NeuralBackground = dynamic(
  () => import("@/components/NeuralBackground"),
  { ssr: false }
);

const CursorTrail = dynamic(
  () => import("@/components/CursorTrail"),
  { ssr: false }
);

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CursorTrail />
      <ScrollProgressBar />
      <NeuralBackground />
      <MouseGlow />
      {children}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";

const statuses = [
  { text: "system: online", dot: true },
  { text: "status: exploring", dot: true },
  { text: "mode: creative", dot: true },
];

export default function TerminalStatus() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % statuses.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = statuses[index];

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          current.dot ? "bg-success terminal-dot" : "bg-text-muted"
        }`}
      />
      <span className="font-mono text-[10px] tracking-wider text-text-muted">
        {current.text}
      </span>
    </div>
  );
}

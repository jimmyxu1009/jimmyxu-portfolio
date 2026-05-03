"use client";

import { siteName, siteEmail } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] overflow-hidden">
      <div className="py-16 lg:py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left */}
            <div className="text-center md:text-left">
              <p className="text-text-primary font-display text-lg tracking-wide">
                {siteName}
              </p>
              <p className="text-text-muted text-xs mt-1">
                AI 学习者 · 创意开发者
              </p>
            </div>

            {/* Center - Email */}
            <div className="text-center">
              <a
                href={"mailto:" + siteEmail}
                className="text-sm text-text-tertiary hover:text-accent transition-colors"
              >
                {siteEmail}
              </a>
            </div>

            {/* Right */}
            <div className="text-center md:text-right">
              <p className="text-text-muted text-xs">
                &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

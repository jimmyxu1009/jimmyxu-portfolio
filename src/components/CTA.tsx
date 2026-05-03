"use client";

import { siteEmail, siteSlogan } from "@/lib/data";
import SectionReveal from "@/components/SectionReveal";
import TerminalStatus from "@/components/TerminalStatus";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
  },
  {
    label: "Bilibili",
    href: "https://space.bilibili.com/296932992",
    icon: "M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.77 1.56-3.774 1.004-1.004 2.262-1.52 3.773-1.56h.774l-1.174-1.12a1.234 1.234 0 01-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.267.573-.4.92-.4.347 0 .662.138.947.413L12 5.013l3.707-3.707c.267-.267.573-.4.92-.4.347 0 .662.138.947.413l.026.027c.267.267.4.569.4.907 0 .338-.133.644-.4.92l-1.174 1.12.387-.64zM5.333 7.12c-.62 0-1.147.213-1.587.64-.44.427-.667.947-.68 1.56v7.36c.013.613.24 1.133.68 1.56.44.427.967.64 1.587.64h13.334c.62 0 1.147-.213 1.587-.64.44-.427.667-.947.68-1.56v-7.36c-.013-.613-.24-1.133-.68-1.56-.44-.427-.967-.64-1.587-.64H5.333zM8.36 14.107a.876.876 0 01-.64-.267.876.876 0 01-.267-.64.876.876 0 01.267-.64.876.876 0 01.64-.267.876.876 0 01.64.267.876.876 0 01.267.64.876.876 0 01-.267.64.876.876 0 01-.64.267zm7.28 0a.876.876 0 01-.64-.267.876.876 0 01-.267-.64.876.876 0 01.267-.64.876.876 0 01.64-.267.876.876 0 01.64.267.876.876 0 01.267.64.876.876 0 01-.267.64.876.876 0 01-.64.267zm-4.213 1.707c1.093 0 1.953-.28 2.58-.84l.107-.107-.747-.747-.106.094c-.427.373-.987.56-1.68.56-.693 0-1.26-.187-1.68-.56l-.107-.094-.747.747.107.107c.627.56 1.48.84 2.573.84z",
  },
  {
    label: "抖音",
    href: "https://www.douyin.com",
    icon: "M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.5 8.65v.95c-1.36 0-2.63-.44-3.66-1.18v5.33c0 2.58-2.1 4.68-4.68 4.68S4.48 16.33 4.48 13.75s2.1-4.68 4.68-4.68c.26 0 .51.02.76.06v2.31c-.25-.07-.5-.11-.76-.11-1.5 0-2.72 1.22-2.72 2.72s1.22 2.72 2.72 2.72 2.72-1.22 2.72-2.72V5.35h2.12c.2 1.15.99 2.12 2.04 2.69.42.23.88.39 1.38.46v1.15z",
  },
];

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-[0.03] pointer-events-none bg-accent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="text-accent font-mono text-xs tracking-[0.2em]">04</span>
          <span className="w-6 h-px bg-accent/40" />
          <span className="text-text-muted text-xs tracking-[0.15em] uppercase">联系我</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[1.1] text-text-primary mb-8">
              {siteSlogan}
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <p className="text-text-secondary text-base md:text-lg mb-10 leading-relaxed max-w-2xl">
              持续探索 AI 与创意工具的边界，将想法转化为真实可见的成果。
              开放合作与交流，欢迎联系。
            </p>
          </SectionReveal>

          {/* Business Card */}
          <SectionReveal delay={0.2}>
            <div className="glass rounded-2xl p-8 md:p-10 mb-10">
              <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Left: Contact Info */}
                <div className="flex-1 space-y-6">
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-text-tertiary mb-2">
                      邮箱
                    </p>
                    <a
                      href={"mailto:" + siteEmail}
                      className="group inline-flex items-center gap-2 text-lg md:text-xl text-accent hover:text-accent/80 transition-colors"
                    >
                      {siteEmail}
                      <svg
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-text-tertiary mb-2">
                      社交
                    </p>
                    <div className="flex gap-4">
                      {socials.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-11 h-11 rounded-lg bg-white/5 border border-white/[0.06] flex items-center justify-center text-text-tertiary hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                          aria-label={s.label}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d={s.icon} />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: QR Code */}
                <div className="shrink-0">
                  <div className="glass rounded-xl p-4 text-center">
                    <img
                      src="/images/wx二维码.png"
                      alt="微信二维码"
                      className="w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover mb-2"
                    />
                    <p className="text-xs text-text-tertiary">扫码添加微信</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* CTA button */}
          <SectionReveal delay={0.3}>
            <div className="text-center">
              <a
                href={"mailto:" + siteEmail}
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white rounded-full text-sm font-medium overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(129,140,248,0.3)] btn-ripple"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--rx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
                  e.currentTarget.style.setProperty('--ry', `${((e.clientY - rect.top) / rect.height) * 100}%`);
                }}
              >
                发邮件给我
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </SectionReveal>

          {/* Terminal easter egg */}
          <SectionReveal delay={0.4}>
            <div className="flex justify-center mt-12">
              <TerminalStatus />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

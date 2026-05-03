import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="font-mono text-accent text-sm tracking-[0.3em] mb-6">
          ERROR 404
        </div>
        <h1 className="font-display text-6xl md:text-7xl text-text-primary mb-4">
          404
        </h1>
        <p className="text-text-secondary text-sm leading-relaxed mb-2">
          这个页面不存在于已知宇宙中。
        </p>
        <p className="text-text-muted text-xs font-mono mb-10">
          {`> page not found`}
        </p>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 px-6 py-3 border border-white/[0.06] rounded-full text-sm text-text-secondary hover:text-text-primary hover:border-white/20 transition-all duration-300"
        >
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          回到首页
        </Link>
      </div>
    </div>
  );
}

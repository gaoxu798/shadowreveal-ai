"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Gallery",    href: "#gallery",  crimson: false },
  { label: "Theories",   href: "#social",   crimson: false },
  { label: "Unlock Pro", href: "#pricing",  crimson: true  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 sm:px-12 backdrop-blur-md transition-all duration-300"
      style={{
        height:       scrolled ? "64px" : "76px",
        background:   "rgba(3,3,3,0.80)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        boxShadow:    scrolled ? "0 4px 28px rgba(0,0,0,0.6)" : "none",
      }}
    >
      {/* ── Left: Brand ── */}
      <a href="#top" className="shrink-0 select-none" aria-label="ShadowReveal.AI">
        <span
          className="text-xl tracking-[0.14em] uppercase font-semibold"
          style={{
            fontFamily:           "var(--font-heading)",
            background:           "linear-gradient(135deg, #8a6914 0%, #c9a040 40%, #b8860b 60%, #8a6914 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor:  "transparent",
            backgroundClip:       "text",
          }}
        >ShadowReveal</span>
        <span style={{
          fontFamily:    "var(--font-heading)",
          color:         "rgba(184,134,11,0.55)",
          fontSize:      "11px",
          verticalAlign: "super",
          letterSpacing: "0.28em",
          marginLeft:    "3px",
        }}>.AI</span>
      </a>

      {/* ── Center: Nav links ── */}
      <nav className="hidden sm:flex items-center gap-9" aria-label="Main navigation">
        {NAV_LINKS.map(({ label, href, crimson }) => (
          <a key={label} href={href}
            className="relative text-[15px] font-medium tracking-[0.1em] uppercase transition-all duration-250 group"
            style={{ fontFamily: "var(--font-body)", color: crimson ? "rgba(220,38,38,0.82)" : "rgba(212,212,216,0.82)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = crimson ? "#ef4444" : "#ffffff";
              el.style.textShadow = crimson ? "0 0 18px rgba(220,38,38,0.65)" : "0 0 12px rgba(255,255,255,0.15)";
              if (crimson) el.style.fontWeight = "600";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = crimson ? "rgba(220,38,38,0.82)" : "rgba(212,212,216,0.82)";
              el.style.textShadow = "none";
              el.style.fontWeight = "500";
            }}
          >
            {label}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
              style={{ background: crimson ? "rgba(220,38,38,0.6)" : "rgba(184,134,11,0.5)" }}
            />
          </a>
        ))}
      </nav>

      {/* ── Right: Cmd+K hint + Sign In (coming soon) ── */}
      <div className="flex items-center gap-3 shrink-0">
        <kbd
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] select-none"
          style={{
            fontFamily: "var(--font-body)",
            background: "rgba(255,255,255,0.05)",
            border:     "1px solid rgba(255,255,255,0.1)",
            color:      "rgba(161,161,170,0.7)",
          }}
          title="Open command palette"
        >
          <span>⌘</span><span>K</span>
        </kbd>

        <a
          href="#pricing"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-[14px] font-medium tracking-[0.06em] transition-all duration-250"
          style={{
            fontFamily: "var(--font-body)",
            color:      "rgba(228,228,231,0.85)",
            background: "rgba(255,255,255,0.06)",
            border:     "1px solid rgba(255,255,255,0.14)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.color       = "#ffffff";
            el.style.background  = "rgba(255,255,255,0.10)";
            el.style.borderColor = "rgba(255,255,255,0.26)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.color       = "rgba(228,228,231,0.85)";
            el.style.background  = "rgba(255,255,255,0.06)";
            el.style.borderColor = "rgba(255,255,255,0.14)";
          }}
        >
          Get Credits
        </a>
      </div>
    </header>
  );
}

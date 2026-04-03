"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const NAV_LINKS = [
  { label: "Gallery",    href: "#gallery",  crimson: false },
  { label: "Theories",   href: "#social",   crimson: false },
  { label: "Unlock Pro", href: "#pricing",  crimson: true  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();

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

      {/* ── Right: Auth ── */}
      <div className="flex items-center gap-3 shrink-0">
        <kbd
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] select-none"
          style={{
            fontFamily: "var(--font-body)",
            background: "rgba(255,255,255,0.05)",
            border:     "1px solid rgba(255,255,255,0.1)",
            color:      "rgba(161,161,170,0.7)",
          }}
        >
          <span>⌘</span><span>K</span>
        </kbd>

        {status === "loading" ? (
          <div className="w-8 h-8 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.08)" }} />
        ) : session ? (
          <div className="flex items-center gap-3">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt={session.user.name ?? "User"}
                className="w-8 h-8 rounded-full ring-1"
                style={{ outline: "1px solid rgba(184,134,11,0.4)" }}
              />
            )}
            <button
              onClick={() => signOut()}
              className="text-[13px] tracking-[0.06em] transition-colors duration-200"
              style={{ fontFamily: "var(--font-body)", color: "rgba(161,161,170,0.7)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(228,228,231,0.9)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(161,161,170,0.7)")}
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
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
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
        )}
      </div>
    </header>
  );
}

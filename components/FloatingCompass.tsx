"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────────────────────
   Icons — all inline SVG
───────────────────────────────────────────────────────────── */
const ArrowUpIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" className="w-6 h-6 shrink-0">
    <path d="M8 13V3M3 8l5-5 5 5"/>
  </svg>
);
const GalleryIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" className="w-6 h-6 shrink-0">
    <rect x="1" y="1" width="14" height="14" rx="2"/>
    <circle cx="5.5" cy="5.5" r="1.2"/>
    <path d="M15 10.5l-3.5-3.5L6 12"/>
  </svg>
);
const ScrollIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" className="w-6 h-6 shrink-0">
    <path d="M4 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a2 2 0 0 1 0-4h1V2z"/>
    <path d="M6 6h4M6 9h3"/>
  </svg>
);
const CrownIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 shrink-0">
    <path d="M2 12h12M3 12L2 5l3 2.5L8 2l3 5.5L14 5l-1 7"/>
  </svg>
);
const QuestionIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" className="w-6 h-6 shrink-0">
    <circle cx="8" cy="8" r="6"/>
    <path d="M6.2 6.2A1.8 1.8 0 0 1 9.8 7c0 1-1 1.5-1.8 2"/>
    <circle cx="8" cy="11.5" r="0.5" fill="currentColor"/>
  </svg>
);
const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L2.25 2.25h6.985l4.262 5.637 4.747-5.637zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const RedditIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   Menu data
───────────────────────────────────────────────────────────── */
type MenuItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  external?: boolean;
  accent?: "gold" | "purple" | "orange";
};

const NAV_ITEMS: MenuItem[] = [
  { label: "Top",         icon: <ArrowUpIcon />,  href: "#top" },
  { label: "The Gallery", icon: <GalleryIcon />,  href: "#gallery" },
  { label: "The Ritual",  icon: <ScrollIcon />,   href: "#reveal" },
  { label: "The Pacts",   icon: <CrownIcon />,    href: "#pricing" },
  { label: "The Riddles", icon: <QuestionIcon />, href: "#social" },
];

const SOCIAL_ITEMS: MenuItem[] = [
  { label: "Discord",     icon: <DiscordIcon />, href: "#", external: true, accent: "purple" },
  { label: "X / Twitter", icon: <XIcon />,       href: "#", external: true, accent: "gold"   },
  { label: "Reddit",      icon: <RedditIcon />,  href: "#", external: true, accent: "orange" },
];

const ACCENT_COLORS: Record<string, string> = {
  purple: "rgba(139,92,246,0.85)",
  gold:   "rgba(184,134,11,1)",
  orange: "rgba(234,88,12,0.85)",
};

/* ─────────────────────────────────────────────────────────────
   Single item
───────────────────────────────────────────────────────────── */
function SidebarItem({ item }: { item: MenuItem }) {
  const [hovered, setHovered] = useState(false);
  const accentColor = item.accent ? ACCENT_COLORS[item.accent] : "rgba(184,134,11,0.9)";

  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "15px 24px",
        borderRadius: "14px",
        textDecoration: "none",
        background: hovered ? "rgba(184,134,11,0.09)" : "rgba(8,3,3,0.5)",
        border: hovered
          ? `1px solid ${accentColor.replace(/[\d.]+\)$/, "0.35)")}`
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: hovered
          ? `0 0 22px ${accentColor.replace(/[\d.]+\)$/, "0.14)")}`
          : "0 2px 12px rgba(0,0,0,0.35)",
        transition: "all 0.2s ease",
        minWidth: 0,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: hovered ? accentColor : "rgba(160,160,160,0.7)", flexShrink: 0, display: "flex" }}>
        {item.icon}
      </span>
      <span
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "15px",
          letterSpacing: "0.13em",
          color: hovered ? "#e8c97a" : "rgba(210,210,210,0.82)",
          transition: "color 0.2s",
        }}
      >
        {item.label}
      </span>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   FloatingCompass — fixed right sidebar
───────────────────────────────────────────────────────────── */
export default function FloatingCompass() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        right: "20px",
        transform: "translateY(-50%)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        padding: "16px 12px",
        borderRadius: "18px",
        background: "rgba(6,2,2,0.72)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(184,134,11,0.05) inset",
      }}
    >
      {/* Nav group */}
      {NAV_ITEMS.map((item) => (
        <SidebarItem key={item.label} item={item} />
      ))}

      {/* Label */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "8px",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          textAlign: "center",
          color: "rgba(184,134,11,0.28)",
          marginTop: "4px",
        }}
      >
        Ancient Compass
      </p>
    </div>
  );
}

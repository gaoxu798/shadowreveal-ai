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

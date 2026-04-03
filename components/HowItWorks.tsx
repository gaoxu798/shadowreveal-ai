"use client";

import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Step icons — inline SVG, no lucide dep
───────────────────────────────────────────────────────────── */
function VesselIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

function ScrollIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Step data
───────────────────────────────────────────────────────────── */
const STEPS = [
  {
    number: "I",
    title: "Select the Vessel",
    body: "Upload your own theory sketch, or choose from our ancient Void silhouettes forged over 800 years of fandom.",
    icon: <VesselIcon />,
    glow: false,
    color: "#b8860b",
  },
  {
    number: "II",
    title: "Chant the Prompt",
    body: "Describe the sovereign's features — eyes, crown, aura, lineage. Be as precise as the ancient texts demand.",
    icon: <ScrollIcon />,
    glow: false,
    color: "#b8860b",
  },
  {
    number: "III",
    title: "Unveil the Truth",
    body: "Our AI engine dispels the shadows, revealing the breathtaking anime reality hidden beneath the Void Century.",
    icon: <EyeIcon />,
    glow: true,
    color: "#dc2626",
  },
];

/* ─────────────────────────────────────────────────────────────
   Single step card
───────────────────────────────────────────────────────────── */
function StepCard({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className="relative flex flex-col items-center text-center px-6 py-8 rounded-2xl"
      style={{
        background: "rgba(8,4,4,0.32)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.04)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
      }}
    >
      {/* Step number — top left watermark */}
      <span
        className="absolute top-4 left-5 text-[11px] tracking-[0.3em]"
        style={{
          fontFamily: "var(--font-heading)",
          color: `${step.color}28`,
        }}
      >
        {step.number}
      </span>

      {/* Icon disc */}
      <motion.div
        className="mb-5 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: step.glow
            ? "radial-gradient(circle at 40% 35%, #2a0000 0%, #0f0000 100%)"
            : "radial-gradient(circle at 40% 35%, #1a1200 0%, #0a0800 100%)",
          border: `1px solid ${step.color}28`,
          color: step.color,
          boxShadow: step.glow
            ? "0 0 22px rgba(220,38,38,0.25), 0 0 0 1px rgba(220,38,38,0.1) inset"
            : "none",
        }}
        animate={
          step.glow
            ? {
                boxShadow: [
                  "0 0 14px rgba(220,38,38,0.18), 0 0 0 1px rgba(220,38,38,0.08) inset",
                  "0 0 32px rgba(220,38,38,0.38), 0 0 0 1px rgba(220,38,38,0.18) inset",
                  "0 0 14px rgba(220,38,38,0.18), 0 0 0 1px rgba(220,38,38,0.08) inset",
                ],
              }
            : {}
        }
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {step.icon}
      </motion.div>

      {/* Title */}
      <h3
        className="text-[15px] font-semibold tracking-wide text-[#d1d5db] mb-2.5"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {step.title}
      </h3>

      {/* Body */}
      <p
        className="text-[12.5px] leading-[1.85] text-[#9ca3af]/55 max-w-[220px]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {step.body}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Connector line — desktop only, between cards
   Drawn as an SVG dashed gradient path
───────────────────────────────────────────────────────────── */
function Connector({ gold }: { gold?: boolean }) {
  const id = gold ? "grad-gold" : "grad-crimson";
  const c1 = gold ? "rgba(184,134,11,0.55)" : "rgba(184,134,11,0.4)";
  const c2 = gold ? "rgba(220,38,38,0.45)" : "rgba(220,38,38,0.55)";

  return (
    <div className="hidden lg:flex items-center justify-center w-16 shrink-0 mt-[-32px]">
      <svg width="64" height="2" viewBox="0 0 64 2" fill="none" className="overflow-visible">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
        </defs>
        <line
          x1="0" y1="1" x2="64" y2="1"
          stroke={`url(#${id})`}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* Arrow head */}
        <path
          d="M58 -3 L64 1 L58 5"
          stroke={c2}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────────── */
export default function HowItWorks() {
  return (
    <section className="relative px-4 sm:px-8 lg:px-16 pb-24 max-w-7xl mx-auto">

      {/* Header */}
      <div className="text-center mb-14">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(184,134,11,0.18))" }} />
          <span className="text-[#b8860b]/28 text-[10px] tracking-[0.5em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
            ✦  The Ritual  ✦
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(184,134,11,0.18))" }} />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-3xl sm:text-4xl font-semibold text-[#d1d5db] tracking-wide"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          The Ritual of{" "}
          <span className="text-gold-gradient">Revelation</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-[13.5px] text-[#9ca3af]/50 max-w-sm mx-auto"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Three steps to pierce the Void Century darkness.
        </motion.p>
      </div>

      {/* Steps + connectors */}
      <motion.div
        className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-0"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {STEPS.map((step, i) => (
          <>
            <div key={step.number} className="flex-1">
              <StepCard step={step} index={i} />
            </div>
            {i < STEPS.length - 1 && (
              <Connector key={`conn-${i}`} gold={i === 0} />
            )}
          </>
        ))}
      </motion.div>
    </section>
  );
}

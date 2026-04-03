"use client";

import { motion } from "framer-motion";

/* Seeded particles spread across the whole page background */
const BG_PARTICLES = Array.from({ length: 40 }, (_, i) => {
  const s = (i + 7) * 1664525 + 1013904223;
  return {
    id:   i,
    left: 2 + ((s >>> 0)  % 960) / 10,   // 2–98%
    top:  2 + ((s >>> 7)  % 960) / 10,   // 2–98%
    r:    2.0 + ((s >>> 14) % 12) / 5,   // 2–4.4px
    op:   0.35 + ((s >>> 21) % 40) / 100, // 0.35–0.75
    dur:  10 + ((s >>> 28) % 16),          // 10–26s
    del:  ((s >>> 5)  % 80) / 10,          // 0–8s
    rise: 30 + ((s >>> 11) % 50),          // 30–80px upward drift
    gold: i % 4 === 0,
  };
});

export default function PageEdgeDecor() {
  return (
    <>
      {/* ══ FULL-PAGE FLOATING STARDUST ══ */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        {BG_PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left:   `${p.left}%`,
              top:    `${p.top}%`,
              width:  `${p.r * 2}px`,
              height: `${p.r * 2}px`,
              background: p.gold
                ? `rgba(184,134,11,${p.op})`
                : `rgba(220,38,38,${p.op})`,
              boxShadow: p.gold
                ? `0 0 ${p.r * 4}px rgba(184,134,11,${p.op * 0.8})`
                : `0 0 ${p.r * 4}px rgba(220,38,38,${p.op * 0.8})`,
            }}
            animate={{
              y:       [0, -p.rise, 0],
              opacity: [0, p.op, p.op * 0.5, 0],
              scale:   [0.5, 1.0, 0.7, 0.5],
            }}
            transition={{
              duration: p.dur,
              delay:    p.del,
              repeat:   Infinity,
              ease:     "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ══ LEFT EDGE ══ */}
      <div aria-hidden="true" className="fixed top-0 left-0 h-full w-16 pointer-events-none z-[49]">
        <div className="absolute inset-y-0 left-6 w-px"
          style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(184,134,11,0.55) 10%, rgba(184,134,11,0.35) 50%, rgba(220,38,38,0.40) 85%, transparent 100%)" }}
        />
        <div className="absolute inset-y-0 left-4 w-px"
          style={{ background: "linear-gradient(to bottom, transparent 5%, rgba(184,134,11,0.12) 20%, rgba(184,134,11,0.08) 60%, transparent 95%)" }}
        />
        {[12, 25, 38, 52, 65, 78].map((pct) => (
          <div key={pct} className="absolute w-5 h-px"
            style={{ top: `${pct}%`, left: "16px", background: "linear-gradient(to right, transparent, rgba(184,134,11,0.55), transparent)" }}
          />
        ))}
        {[
          { top: "18%", ch: "ᚨ", color: "rgba(184,134,11,0.45)" },
          { top: "32%", ch: "ᛟ", color: "rgba(220,38,38,0.38)" },
          { top: "48%", ch: "ᚱ", color: "rgba(184,134,11,0.40)" },
          { top: "63%", ch: "ᛞ", color: "rgba(220,38,38,0.35)" },
          { top: "78%", ch: "ᚷ", color: "rgba(184,134,11,0.40)" },
        ].map(({ top, ch, color }) => (
          <span key={top} className="absolute text-[11px]"
            style={{ top, left: "6px", color, fontFamily: "serif" }}>{ch}</span>
        ))}
        <div className="absolute top-20 left-3 w-7 h-7"
          style={{ borderTop: "1px solid rgba(184,134,11,0.50)", borderLeft: "1px solid rgba(184,134,11,0.50)" }}
        />
        <motion.div className="absolute w-1.5 h-1.5 rotate-45"
          style={{ top: "calc(50% - 3px)", left: "21px", background: "rgba(184,134,11,1)" }}
          animate={{ opacity: [0.35, 0.8, 0.35], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute bottom-8 left-3 w-7 h-7"
          style={{ borderBottom: "1px solid rgba(184,134,11,0.42)", borderLeft: "1px solid rgba(184,134,11,0.42)" }}
        />
      </div>

      {/* ══ RIGHT EDGE ══ */}
      <div aria-hidden="true" className="fixed top-0 right-0 h-full w-16 pointer-events-none z-[49]">
        <div className="absolute inset-y-0 right-6 w-px"
          style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(220,38,38,0.50) 10%, rgba(184,134,11,0.32) 50%, rgba(220,38,38,0.45) 85%, transparent 100%)" }}
        />
        <div className="absolute inset-y-0 right-4 w-px"
          style={{ background: "linear-gradient(to bottom, transparent 5%, rgba(220,38,34,0.12) 20%, rgba(220,38,38,0.08) 60%, transparent 95%)" }}
        />
        {[18, 30, 44, 57, 70, 83].map((pct) => (
          <div key={pct} className="absolute w-5 h-px"
            style={{ top: `${pct}%`, right: "16px", background: "linear-gradient(to left, transparent, rgba(220,38,38,0.52), transparent)" }}
          />
        ))}
        {[
          { top: "22%", ch: "ᚢ", color: "rgba(220,38,38,0.42)" },
          { top: "36%", ch: "⊕", color: "rgba(184,134,11,0.40)" },
          { top: "52%", ch: "ᚦ", color: "rgba(220,38,38,0.38)" },
          { top: "67%", ch: "⊗", color: "rgba(184,134,11,0.38)" },
          { top: "81%", ch: "ᛉ", color: "rgba(220,38,38,0.40)" },
        ].map(({ top, ch, color }) => (
          <span key={top} className="absolute text-[11px]"
            style={{ top, right: "6px", color, fontFamily: "serif" }}>{ch}</span>
        ))}
        <div className="absolute top-20 right-3 w-7 h-7"
          style={{ borderTop: "1px solid rgba(220,38,38,0.48)", borderRight: "1px solid rgba(220,38,38,0.48)" }}
        />
        <motion.div className="absolute w-1.5 h-1.5 rotate-45"
          style={{ top: "calc(50% - 3px)", right: "21px", background: "rgba(220,38,38,1)" }}
          animate={{ opacity: [0.30, 0.75, 0.30], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute bottom-8 right-3 w-7 h-7"
          style={{ borderBottom: "1px solid rgba(220,38,38,0.42)", borderRight: "1px solid rgba(220,38,38,0.42)" }}
        />
      </div>
    </>
  );
}

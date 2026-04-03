"use client";

import { motion } from "framer-motion";

function seed(n: number) {
  let s = n * 1664525 + 1013904223;
  return ((s >>> 0) % 1000) / 1000;
}

/* ─────────────────────────────────────────
   1. AMBIENT LIGHT ORBS
───────────────────────────────────────────── */
const ORBS = [
  { x: 10,  y: 15,  w: 700, h: 500, color: "rgba(160,0,0,0.55)",    dur: 18, delay: 0  },
  { x: 80,  y: 10,  w: 600, h: 420, color: "rgba(130,0,0,0.45)",    dur: 24, delay: 4  },
  { x: 50,  y: 50,  w: 800, h: 550, color: "rgba(100,0,0,0.35)",    dur: 30, delay: 8  },
  { x: 5,   y: 75,  w: 560, h: 420, color: "rgba(140,0,0,0.42)",    dur: 22, delay: 12 },
  { x: 88,  y: 65,  w: 500, h: 360, color: "rgba(180,100,0,0.28)",  dur: 26, delay: 6  },
  { x: 38,  y: 90,  w: 640, h: 380, color: "rgba(120,60,0,0.32)",   dur: 20, delay: 3  },
  { x: 65,  y: 30,  w: 450, h: 350, color: "rgba(150,0,0,0.38)",    dur: 16, delay: 10 },
];

function AmbientOrbs() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top:  `${orb.y}%`,
            width:  `${orb.w}px`,
            height: `${orb.h}px`,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(ellipse, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, (seed(i * 3) - 0.5) * 140, (seed(i * 7) - 0.5) * 90, 0],
            y: [0, (seed(i * 5) - 0.5) * 100, (seed(i * 9) - 0.5) * 120, 0],
            scale: [1, 1.2, 0.88, 1],
            opacity: [0.8, 1, 0.85, 0.8],
          }}
          transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   2. VOID RUNE GRID
───────────────────────────────────────────── */
function VoidGrid() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.07]">
        <defs>
          <pattern id="void-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M80 0L0 80M0 0L80 80" stroke="rgba(153,0,0,1)" strokeWidth="0.6" />
            <path d="M40 0L0 40M80 40L40 80" stroke="rgba(184,134,11,0.7)" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#void-grid)" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   3. PLASMA STREAMS
───────────────────────────────────────────── */
const STREAMS = [
  { x1: 0,   y1: 20,  x2: 40,  y2: 0,   dur: 8,  delay: 0  },
  { x1: 100, y1: 10,  x2: 60,  y2: 35,  dur: 11, delay: 2  },
  { x1: 15,  y1: 100, x2: 50,  y2: 65,  dur: 14, delay: 5  },
  { x1: 90,  y1: 80,  x2: 55,  y2: 100, dur: 9,  delay: 7  },
  { x1: 0,   y1: 55,  x2: 25,  y2: 40,  dur: 16, delay: 1  },
  { x1: 100, y1: 50,  x2: 75,  y2: 70,  dur: 12, delay: 9  },
  { x1: 30,  y1: 0,   x2: 70,  y2: 30,  dur: 10, delay: 3  },
  { x1: 50,  y1: 100, x2: 20,  y2: 60,  dur: 13, delay: 6  },
];

function PlasmaStreams() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="stream-blur">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
        {STREAMS.map((s, i) => (
          <motion.line
            key={i}
            x1={`${s.x1}%`} y1={`${s.y1}%`}
            x2={`${s.x2}%`} y2={`${s.y2}%`}
            stroke={i % 2 === 0 ? "rgba(220,38,38,0.85)" : "rgba(184,134,11,0.65)"}
            strokeWidth="0.12"
            filter="url(#stream-blur)"
            strokeLinecap="round"
            animate={{
              opacity: [0, 1, 0.5, 0.9, 0],
              strokeWidth: ["0.06", "0.22", "0.10", "0.18", "0.06"],
            }}
            transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   4. VOID SIGILS
───────────────────────────────────────────── */
const SIGILS = Array.from({ length: 14 }, (_, i) => ({
  x:    5  + seed(i * 11) * 90,
  y:    5  + seed(i * 17) * 90,
  size: 28 + seed(i * 23) * 44,
  op:   0.38 + seed(i * 31) * 0.32,
  dur:  18 + seed(i * 37) * 20,
  del:  seed(i * 13) * 10,
  rot:  seed(i * 19) * 360,
  gold: i % 3 === 0,
}));

function VoidSigils() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {SIGILS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top:  `${s.y}%`,
            width:  `${s.size}px`,
            height: `${s.size}px`,
            transform: "translate(-50%, -50%)",
            filter: `drop-shadow(0 0 ${s.gold ? "6px rgba(184,134,11,0.6)" : "6px rgba(220,38,38,0.5)"})`,
          }}
          animate={{
            rotate: [s.rot, s.rot + 360],
            opacity: [s.op * 0.55, s.op, s.op * 0.55],
            scale:   [0.88, 1.12, 0.88],
          }}
          transition={{ duration: s.dur, delay: s.del, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 40 40" fill="none" width="100%" height="100%">
            <polygon
              points="20,2 35,11 35,29 20,38 5,29 5,11"
              stroke={s.gold ? "rgba(184,134,11,1)" : "rgba(220,38,38,1)"}
              strokeWidth="1.2"
              fill={s.gold ? "rgba(184,134,11,0.06)" : "rgba(153,0,0,0.06)"}
            />
            <polygon
              points="20,10 30,20 20,30 10,20"
              stroke={s.gold ? "rgba(184,134,11,0.85)" : "rgba(220,38,38,0.85)"}
              strokeWidth="0.8"
              fill="none"
            />
            <circle cx="20" cy="20" r="2"
              fill={s.gold ? "rgba(220,190,80,1)" : "rgba(220,38,38,1)"}
            />
            {/* Corner ticks */}
            <line x1="20" y1="2"  x2="20" y2="6"  stroke={s.gold ? "rgba(184,134,11,0.7)" : "rgba(220,38,38,0.7)"} strokeWidth="0.7" />
            <line x1="20" y1="34" x2="20" y2="38" stroke={s.gold ? "rgba(184,134,11,0.7)" : "rgba(220,38,38,0.7)"} strokeWidth="0.7" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   5. SCAN LINES
───────────────────────────────────────────── */
function ScanLine() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(to right, transparent 0%, rgba(153,0,0,0.35) 20%, rgba(220,38,38,0.65) 50%, rgba(153,0,0,0.35) 80%, transparent 100%)",
          filter: "blur(1px)",
        }}
        animate={{ top: ["-2%", "102%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear", repeatDelay: 6 }}
      />
      <motion.div
        className="absolute left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(to right, transparent 0%, rgba(184,134,11,0.25) 30%, rgba(184,134,11,0.55) 50%, rgba(184,134,11,0.25) 70%, transparent 100%)",
          filter: "blur(1px)",
        }}
        animate={{ top: ["102%", "-2%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatDelay: 4, delay: 8 }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   6. CRIMSON NEBULA CLOUDS — large blurred blobs
───────────────────────────────────────────── */
const NEBULAS = [
  { x: 20, y: 30, w: 900, h: 600, color: "rgba(80,0,0,0)",  dur: 35, delay: 0  },
  { x: 75, y: 70, w: 800, h: 500, color: "rgba(60,20,0,0.04)", dur: 40, delay: 15 },
  { x: 50, y: 10, w: 700, h: 400, color: "rgba(90,0,0,0.04)",  dur: 28, delay: 8  },
];

function NebulaClouds() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {NEBULAS.map((n, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${n.x}%`,
            top:  `${n.y}%`,
            width:  `${n.w}px`,
            height: `${n.h}px`,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(ellipse, ${n.color} 0%, transparent 65%)`,
            filter: "blur(90px)",
          }}
          animate={{
            scale: [1, 1.25, 0.92, 1],
            opacity: [0.7, 1, 0.75, 0.7],
          }}
          transition={{ duration: n.dur, delay: n.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function BackgroundFX() {
  return (
    <>
      <NebulaClouds />
      <VoidGrid />
      <AmbientOrbs />
      <PlasmaStreams />
      <VoidSigils />
      <ScanLine />
    </>
  );
}

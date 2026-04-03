"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type Phase = "idle" | "generating" | "revealed";

const SURPRISE_PROMPTS = [
  "An immortal queen with glowing crimson eyes, hair cascading like a void-century night, wearing a crown forged from ancient forbidden history.",
  "A cosmic sovereign beyond human comprehension — face frozen in eternal judgment, eyes that have witnessed 800 years of silence.",
  "The last divine being from before the Great Kingdom fell: ageless, merciless, draped in robes woven from the darkness between stars.",
  "Ancient deity disguised as royalty — eyes like dying suns, a smile that erased an entire century from recorded history.",
  "An ethereal figure whose true face is a mosaic of every king and queen that ever swore fealty to the empty throne.",
];
const VOID_PHRASES = [
  "Piercing the Void...",
  "Deciphering 800 years of mystery...",
  "Manifesting the Sovereign...",
];

/* ═══════════════════════════════════════════════════════════
   PRE-COMPUTED SPIKE RING PATHS (no React, pure math)
   Generates a starburst polygon that looks like plasma spikes
   when combined with feTurbulence displacement.
═══════════════════════════════════════════════════════════ */
function buildSpikeRing(
  cx: number, cy: number,
  ri: number, ro: number,
  n: number,
  sx = 1.0, sy = 1.0
): string {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const a = (i * Math.PI) / n - Math.PI / 2;
    const r = i % 2 === 0 ? ro : ri;
    pts.push(`${(cx + r * sx * Math.cos(a)).toFixed(1)},${(cy + r * sy * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join(" L ")}Z`;
}
// Outer jagged plasma ring (28 spikes, elliptical)
const SPIKE_PATH_OUTER = buildSpikeRing(160, 258, 88, 152, 28, 1.0, 1.14);
// Inner tight ring (20 spikes)
const SPIKE_PATH_INNER = buildSpikeRing(160, 258, 68, 105, 20, 1.0, 1.10);

/* ═══════════════════════════════════════════════════════════
   SEEDED STAR FIELD — no hydration drift
═══════════════════════════════════════════════════════════ */
const STARS = Array.from({ length: 56 }, (_, i) => {
  const s = i * 2654435761;
  return {
    cx:   ((s >>> 0)  % 1000) / 10,
    cy:   ((s >>> 7)  % 1000) / 10,
    r:    0.10 + ((s >>> 14) % 10) / 30,
    op:   0.05 + ((s >>> 21) % 18) / 130,
    dur:  3.2  + ((s >>> 28) % 32) / 10,
    del:  ((s >>> 4)  % 52)  / 10,
    gold: i % 4 === 0,
  };
});

/* Ambient void rune glyphs — visible but ghostly */
const GLYPHS = [
  { x: 8,  y: 16, ch: "ᚨ", op: 0.10, dur: 22, del: 0,  sz: 12 },
  { x: 84, y: 20, ch: "ᛟ", op: 0.08, dur: 26, del: 4,  sz: 14 },
  { x: 16, y: 70, ch: "ᚱ", op: 0.10, dur: 19, del: 7,  sz: 11 },
  { x: 74, y: 78, ch: "ᛞ", op: 0.08, dur: 30, del: 11, sz: 13 },
  { x: 91, y: 50, ch: "ᚷ", op: 0.09, dur: 20, del: 2,  sz: 12 },
  { x: 44, y: 7,  ch: "⊕", op: 0.07, dur: 35, del: 6,  sz: 15 },
  { x: 5,  y: 54, ch: "ᚢ", op: 0.09, dur: 24, del: 9,  sz: 11 },
  { x: 95, y: 11, ch: "⊗", op: 0.07, dur: 28, del: 1,  sz: 14 },
  { x: 57, y: 93, ch: "ᚦ", op: 0.09, dur: 21, del: 14, sz: 12 },
  { x: 28, y: 38, ch: "⟁", op: 0.06, dur: 32, del: 3,  sz: 16 },
  { x: 68, y: 44, ch: "ᛉ", op: 0.08, dur: 23, del: 8,  sz: 12 },
  { x: 38, y: 88, ch: "ᚾ", op: 0.07, dur: 29, del: 5,  sz: 11 },
];

function StardustField({ generating }: { generating: boolean }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      {/* Deep color atmosphere blobs */}
      <ellipse cx="18" cy="30" rx="28" ry="22" fill="rgba(110,0,0,0.09)" style={{ filter: "blur(14px)" }}/>
      <ellipse cx="78" cy="68" rx="22" ry="18" fill="rgba(184,134,11,0.05)" style={{ filter: "blur(10px)" }}/>
      <ellipse cx="50" cy="50" rx="35" ry="30" fill="rgba(60,0,0,0.06)" style={{ filter: "blur(18px)" }}/>

      {/* Stars */}
      {STARS.map((s, i) => (
        <motion.circle key={i} cx={s.cx} cy={s.cy} r={s.r}
          fill={s.gold ? "#c9a96e" : "#dc2626"}
          animate={{ opacity: generating
            ? [s.op * 2, s.op * 5.5, s.op * 2]
            : [s.op * 0.5, s.op * 3, s.op * 0.5] }}
          transition={{ duration: s.dur, delay: s.del, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Floating glyphs */}
      {GLYPHS.map((g, i) => (
        <motion.text key={i}
          x={`${g.x}%`} y={`${g.y}%`}
          fontSize={g.sz} fill={i % 3 === 0 ? "#b8860b" : "#dc2626"}
          textAnchor="middle" dominantBaseline="middle"
          fontFamily="serif"
          animate={{
            opacity: generating
              ? [g.op * 1.8, g.op * 4, g.op * 1.8]
              : [g.op * 0.4, g.op * 2, g.op * 0.4],
            y: [`${g.y}%`, `${g.y - 3}%`, `${g.y}%`],
          }}
          transition={{ duration: g.dur, delay: g.del, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   SOVEREIGN SILHOUETTE
═══════════════════════════════════════════════════════════ */
function SovereignSilhouette({ phase }: { phase: Phase }) {
  const gen = phase === "generating";

  return (
    <motion.div
      style={{ display: "flex", justifyContent: "center", position: "relative", width: "100%" }}
      animate={{ y: gen ? [-5, 5, -5] : [-9, 9, -9] }}
      transition={{ duration: gen ? 1.9 : 5.4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Ground shadow */}
      <motion.div
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{ width: "60%", height: 24, background: "rgba(153,0,0,0.32)", filter: "blur(22px)" }}
        animate={{ opacity: gen ? [0.6, 1.0, 0.6] : [0.22, 0.52, 0.22], scaleX: gen ? [0.9,1.12,0.9] : [0.95,1.05,0.95] }}
        transition={{ duration: gen ? 1.1 : 5.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg viewBox="0 0 320 600" xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[200px] sm:max-w-[245px] relative z-10"
      >
        <defs>

          {/* ── Dense void-rune tile (22×22) ── */}
          <pattern id="vr" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M4 19 L4 4 M2 9 L6 9 M2 6 L6 6 M3 14 L5 14" stroke="#dc2626" strokeWidth="0.55" fill="none" opacity="0.9"/>
            <path d="M15 3 L20 8 L15 13 L10 8 Z" stroke="#b8860b" strokeWidth="0.5" fill="none" opacity="0.8"/>
            <circle cx="15" cy="8" r="0.7" fill="#b8860b" opacity="0.7"/>
            <path d="M19 16 L19 21 M17 18 L21 18" stroke="#dc2626" strokeWidth="0.42" fill="none" opacity="0.7"/>
            <path d="M5 20 L8 17 L11 20" stroke="#b8860b" strokeWidth="0.38" fill="none" opacity="0.65"/>
            <path d="M5 22 L8 19 L11 22" stroke="#b8860b" strokeWidth="0.32" fill="none" opacity="0.55"/>
            <circle cx="4" cy="3" r="1.8" stroke="#dc2626" strokeWidth="0.4" fill="none" opacity="0.72"/>
            <circle cx="4" cy="3" r="0.5" fill="#dc2626" opacity="0.6"/>
            <path d="M11 2 L11 10 M11 4 L14 3 M11 7 L14 6" stroke="#dc2626" strokeWidth="0.4" fill="none" opacity="0.65"/>
            <path d="M17 16 L20 19 M17 19 L20 16" stroke="#b8860b" strokeWidth="0.35" fill="none" opacity="0.5"/>
          </pattern>

          {/* ── Meteorite crosshatch texture ── */}
          <pattern id="mt" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(42)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="rgba(90,50,10,0.28)" strokeWidth="0.45"/>
            <line x1="3.5" y1="0" x2="3.5" y2="7" stroke="rgba(60,25,5,0.16)" strokeWidth="0.3"/>
          </pattern>

          {/* ── Plasma displacement — aggressive ── */}
          <filter id="plasma" x="-80%" y="-80%" width="260%" height="260%">
            <feTurbulence type="fractalNoise" baseFrequency="0.020 0.013"
              numOctaves="6" seed="17" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="24"
              xChannelSelector="R" yChannelSelector="G"/>
          </filter>

          {/* ── Second turbulence for inner halo (different character) ── */}
          <filter id="plasma2" x="-60%" y="-60%" width="220%" height="220%">
            <feTurbulence type="turbulence" baseFrequency="0.030 0.020"
              numOctaves="4" seed="31" result="noise2"/>
            <feDisplacementMap in="SourceGraphic" in2="noise2" scale="16"
              xChannelSelector="G" yChannelSelector="R"/>
          </filter>

          {/* ── Blur chain ── */}
          <filter id="bxl" x="-90%" y="-90%" width="280%" height="280%"><feGaussianBlur stdDeviation="30"/></filter>
          <filter id="blg" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="18"/></filter>
          <filter id="bmd" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
          <filter id="bsm" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4.5"/></filter>
          <filter id="bxs" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2"/></filter>

          {/* ── Rune inner glow composite ── */}
          <filter id="runeGlow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="1.4" result="b"/>
            <feComposite in="SourceGraphic" in2="b" operator="over"/>
          </filter>

          {/* ── Spike tip flare gradient ── */}
          <linearGradient id="spikeFlare" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%"   stopColor="#ff2020" stopOpacity="0.7"/>
            <stop offset="40%"  stopColor="#990000" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
          </linearGradient>

          {/* ── Metallic gold sheen (crown edges) ── */}
          <linearGradient id="goldEdge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#f0c840" stopOpacity="0.38"/>
            <stop offset="30%"  stopColor="#c9a030" stopOpacity="0.18"/>
            <stop offset="65%"  stopColor="#b8860b" stopOpacity="0.28"/>
            <stop offset="100%" stopColor="#7a5800" stopOpacity="0.22"/>
          </linearGradient>

          {/* ── Eye glow ── */}
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="1.0"/>
            <stop offset="18%"  stopColor="#ff5050" stopOpacity="0.95"/>
            <stop offset="45%"  stopColor="#dc2626" stopOpacity="0.82"/>
            <stop offset="75%"  stopColor="#880000" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#440000" stopOpacity="0"/>
          </radialGradient>

          {/* ── Obsidian body surface ── */}
          <linearGradient id="obsidian" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%"   stopColor="#140808" stopOpacity="1"/>
            <stop offset="25%"  stopColor="#060202" stopOpacity="1"/>
            <stop offset="60%"  stopColor="#0a0303" stopOpacity="1"/>
            <stop offset="100%" stopColor="#000000" stopOpacity="1"/>
          </linearGradient>

          {/* ── Cloak depth gradient ── */}
          <radialGradient id="cloakDepth" cx="50%" cy="28%" r="65%">
            <stop offset="0%"   stopColor="#100505"/>
            <stop offset="55%"  stopColor="#060202"/>
            <stop offset="100%" stopColor="#000000"/>
          </radialGradient>

          {/* ── Inner surface luminosity (obsidian sub-glow) ── */}
          <radialGradient id="surfaceGlow" cx="50%" cy="42%" r="52%">
            <stop offset="0%"   stopColor="#3a0808" stopOpacity="0.22"/>
            <stop offset="50%"  stopColor="#1a0404" stopOpacity="0.10"/>
            <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
          </radialGradient>

        </defs>

        {/* ════════════════════════════════
            AMBIENT OUTER BLOOM
        ════════════════════════════════ */}
        <motion.ellipse cx="160" cy="295" rx="158" ry="228"
          fill="rgba(70,0,0,0.20)" filter="url(#bxl)"
          animate={{ opacity: gen ? [0.5, 0.88, 0.5] : [0.28, 0.46, 0.28] }}
          transition={{ duration: gen ? 1.0 : 5.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ════════════════════════════════
            SPIKE-RING PLASMA HALO — the hero element
            Real starburst polygon path + turbulence
        ════════════════════════════════ */}

        {/* Outer diffuse bloom behind spikes */}
        <motion.ellipse cx="160" cy="258" rx="132" ry="182"
          fill="rgba(120,0,0,0.28)" filter="url(#blg)"
          animate={{
            ry: gen ? [175,200,175] : [178,188,178],
            opacity: gen ? [0.52, 0.88, 0.52] : [0.30, 0.50, 0.30],
          }}
          transition={{ duration: gen ? 1.05 : 4.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* OUTER SPIKE RING — plasma-displaced starburst */}
        <motion.path d={SPIKE_PATH_OUTER}
          fill="rgba(195,28,28,0.38)"
          filter="url(#plasma)"
          animate={{
            opacity: gen ? [0.45, 0.82, 0.45] : [0.22, 0.42, 0.22],
            scale: gen ? [0.97, 1.03, 0.97] : [0.98, 1.02, 0.98],
          }}
          style={{ transformOrigin: "160px 258px" }}
          transition={{ duration: gen ? 0.95 : 4.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* INNER SPIKE RING — second turbulence character */}
        <motion.path d={SPIKE_PATH_INNER}
          fill="rgba(160,45,0,0.32)"
          filter="url(#plasma2)"
          animate={{
            opacity: gen ? [0.35, 0.72, 0.35] : [0.16, 0.34, 0.16],
            scale: gen ? [0.98, 1.04, 0.98] : [0.99, 1.01, 0.99],
          }}
          style={{ transformOrigin: "160px 258px" }}
          transition={{ duration: gen ? 1.25 : 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.22 }}
        />

        {/* Tight gold-crimson ring */}
        <motion.ellipse cx="160" cy="258" rx="70" ry="116"
          fill="none" stroke="rgba(184,110,0,0.38)" strokeWidth="5"
          filter="url(#bsm)"
          animate={{ opacity: gen ? [0.4,0.75,0.4] : [0.20,0.38,0.20] }}
          transition={{ duration: gen ? 1.3 : 5.0, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Crown-apex concentrated spike */}
        <motion.ellipse cx="160" cy="145" rx="20" ry="68"
          fill="rgba(220,38,38,0.52)" filter="url(#bmd)"
          animate={{
            opacity: gen ? [0.55,1.0,0.55] : [0.28,0.60,0.28],
            ry: gen ? [60,86,60] : [62,72,62],
          }}
          transition={{ duration: gen ? 0.92 : 4.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ════════════════════════════════
            CROWN SPIKES — obsidian + meteorite
        ════════════════════════════════ */}

        {/* Outer-left pair */}
        <path d="M52,202 L58,148 L65,170 L72,120 L80,170 L87,148 L94,202 Z" fill="url(#obsidian)"/>
        <path d="M52,202 L58,148 L65,170 L72,120 L80,170 L87,148 L94,202 Z" fill="url(#mt)" opacity="0.45"/>
        {/* Mid-left pair */}
        <path d="M90,202 L98,140 L107,162 L118,90 L130,162 L140,140 L148,202 Z" fill="url(#obsidian)"/>
        <path d="M90,202 L98,140 L107,162 L118,90 L130,162 L140,140 L148,202 Z" fill="url(#mt)" opacity="0.45"/>
        {/* Center — tallest */}
        <path d="M145,202 L153,136 L160,8 L167,136 L175,202 Z" fill="url(#obsidian)"/>
        <path d="M145,202 L153,136 L160,8 L167,136 L175,202 Z" fill="url(#mt)" opacity="0.40"/>
        {/* Mid-right pair */}
        <path d="M172,202 L180,140 L190,162 L202,90 L213,162 L222,140 L230,202 Z" fill="url(#obsidian)"/>
        <path d="M172,202 L180,140 L190,162 L202,90 L213,162 L222,140 L230,202 Z" fill="url(#mt)" opacity="0.45"/>
        {/* Outer-right pair */}
        <path d="M226,202 L233,148 L240,170 L248,120 L256,170 L262,148 L268,202 Z" fill="url(#obsidian)"/>
        <path d="M226,202 L233,148 L240,170 L248,120 L256,170 L262,148 L268,202 Z" fill="url(#mt)" opacity="0.45"/>

        {/* Sub-surface glow on crown */}
        <path d="M52,202 L58,148 L65,170 L72,120 L80,170 L87,148 L94,202 Z" fill="url(#surfaceGlow)" opacity="0.6"/>
        <path d="M90,202 L98,140 L107,162 L118,90 L130,162 L140,140 L148,202 Z" fill="url(#surfaceGlow)" opacity="0.7"/>
        <path d="M145,202 L153,136 L160,8 L167,136 L175,202 Z" fill="url(#surfaceGlow)" opacity="0.8"/>
        <path d="M172,202 L180,140 L190,162 L202,90 L213,162 L222,140 L230,202 Z" fill="url(#surfaceGlow)" opacity="0.7"/>
        <path d="M226,202 L233,148 L240,170 L248,120 L256,170 L262,148 L268,202 Z" fill="url(#surfaceGlow)" opacity="0.6"/>

        {/* Leading-edge highlight lines (metallic reflection) */}
        <line x1="160" y1="8"  x2="153" y2="136" stroke="rgba(230,185,70,0.28)" strokeWidth="1.0"/>
        <line x1="160" y1="8"  x2="167" y2="136" stroke="rgba(180,110,40,0.14)" strokeWidth="0.7"/>
        <line x1="118" y1="90" x2="107" y2="162" stroke="rgba(210,160,55,0.22)" strokeWidth="0.8"/>
        <line x1="202" y1="90" x2="213" y2="162" stroke="rgba(210,160,55,0.22)" strokeWidth="0.8"/>
        <line x1="72"  y1="120" x2="65" y2="170"  stroke="rgba(190,130,45,0.16)" strokeWidth="0.65"/>
        <line x1="248" y1="120" x2="256" y2="170" stroke="rgba(190,130,45,0.16)" strokeWidth="0.65"/>

        {/* Spike-tip flares */}
        <motion.ellipse cx="160" cy="14" rx="8" ry="16"
          fill="url(#spikeFlare)" filter="url(#bsm)"
          animate={{ opacity: gen ? [0.5,1.0,0.5] : [0.30,0.70,0.30], ry: gen ? [14,24,14] : [14,18,14] }}
          transition={{ duration: gen ? 0.88 : 4.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.ellipse cx="118" cy="96" rx="5" ry="11"
          fill="url(#spikeFlare)" filter="url(#bxs)"
          animate={{ opacity: gen ? [0.4,0.88,0.4] : [0.20,0.52,0.20] }}
          transition={{ duration: gen ? 1.05 : 4.7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.ellipse cx="202" cy="96" rx="5" ry="11"
          fill="url(#spikeFlare)" filter="url(#bxs)"
          animate={{ opacity: gen ? [0.4,0.88,0.4] : [0.20,0.52,0.20] }}
          transition={{ duration: gen ? 1.05 : 4.7, repeat: Infinity, ease: "easeInOut", delay: 0.55 }}
        />

        {/* Crown band */}
        <rect x="50" y="193" width="220" height="28" rx="3" fill="url(#obsidian)"/>
        <rect x="50" y="193" width="220" height="28" rx="3" fill="url(#mt)" opacity="0.55"/>
        <rect x="50" y="193" width="220" height="28" rx="3" fill="url(#surfaceGlow)" opacity="0.5"/>
        <rect x="50" y="193" width="220" height="2.5" rx="1" fill="rgba(210,170,60,0.30)"/>
        <rect x="50" y="219" width="220" height="1.8" rx="1" fill="rgba(184,134,11,0.18)"/>

        {/* Crown band rune marks */}
        <g filter="url(#runeGlow)">
          <path d="M80,198 L80,218 M77,205 L83,205 M77,212 L83,212" stroke="rgba(230,185,70,0.42)" strokeWidth="0.75" fill="none"/>
          <path d="M110,198 L110,218 M107,204 L113,204 M107,211 L113,211" stroke="rgba(200,150,50,0.38)" strokeWidth="0.68" fill="none"/>
          <path d="M140,198 L140,218 M137,203 L143,213 M143,203 L137,213" stroke="rgba(215,165,55,0.40)" strokeWidth="0.68" fill="none"/>
          <path d="M160,198 L160,218 M157,206 L163,206 M157,213 L163,213" stroke="rgba(220,38,38,0.38)" strokeWidth="0.75" fill="none"/>
          <path d="M180,198 L180,218 M177,205 L183,205 M177,212 L183,212" stroke="rgba(230,185,70,0.42)" strokeWidth="0.75" fill="none"/>
          <path d="M210,198 L210,218 M207,204 L213,204 M207,211 L213,211" stroke="rgba(200,150,50,0.38)" strokeWidth="0.68" fill="none"/>
          <path d="M240,198 L240,218 M237,203 L243,213 M243,203 L237,213" stroke="rgba(215,165,55,0.40)" strokeWidth="0.68" fill="none"/>
        </g>

        {/* ════════════════════════════════
            HEAD — obsidian + rune etching
        ════════════════════════════════ */}
        <ellipse cx="160" cy="252" rx="33" ry="39" fill="url(#obsidian)"/>
        <ellipse cx="160" cy="252" rx="33" ry="39" fill="url(#mt)" opacity="0.35"/>
        {/* Rune etching — high opacity + glow */}
        <ellipse cx="160" cy="252" rx="33" ry="39" fill="url(#vr)" opacity="0.30" filter="url(#runeGlow)"/>
        {/* Inner luminosity on face */}
        <ellipse cx="160" cy="252" rx="33" ry="39" fill="url(#surfaceGlow)" opacity="0.9"/>
        {/* Cheekbone sheen */}
        <path d="M138,242 Q153,236 160,242 Q153,250 138,252 Z" fill="rgba(90,50,15,0.14)"/>
        <path d="M182,242 Q167,236 160,242 Q167,250 182,252 Z" fill="rgba(90,50,15,0.10)"/>

        {/* ════════════════════════════════
            EYES — searing, multi-ring
        ════════════════════════════════ */}

        {/* Left eye */}
        <motion.circle cx="147" cy="247" r="13"
          fill="url(#eyeGlow)" filter="url(#blg)"
          animate={{ opacity: gen ? [0.35,0.90,0.35] : [0.10,0.38,0.10], r: gen ? [12,17,12] : [12,14,12] }}
          transition={{ duration: gen ? 1.15 : 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle cx="147" cy="247" r="6"
          fill="url(#eyeGlow)" filter="url(#bsm)"
          animate={{ opacity: gen ? [0.6,1.0,0.6] : [0.22,0.55,0.22], r: gen ? [5,8,5] : [5,6.5,5] }}
          transition={{ duration: gen ? 1.15 : 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle cx="147" cy="247" r="2.8"
          fill="#ff1a1a"
          animate={{ opacity: gen ? [0.75,1.0,0.75] : [0.30,0.70,0.30], r: gen ? [2.5,4,2.5] : [2.5,3.2,2.5] }}
          transition={{ duration: gen ? 1.15 : 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle cx="147" cy="247" r="1.0" fill="#ffffff"
          animate={{ opacity: gen ? [0.7,1.0,0.7] : [0.2,0.6,0.2] }}
          transition={{ duration: gen ? 1.15 : 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Left eye ray cross */}
        <motion.g animate={{ opacity: gen ? [0.18,0.65,0.18] : [0.04,0.18,0.04] }}
          transition={{ duration: gen ? 1.15 : 3.5, repeat: Infinity, ease: "easeInOut" }}>
          <line x1="147" y1="239" x2="147" y2="255" stroke="#ff4040" strokeWidth="0.55"/>
          <line x1="139" y1="247" x2="155" y2="247" stroke="#ff4040" strokeWidth="0.55"/>
          <line x1="141" y1="241" x2="153" y2="253" stroke="#ff4040" strokeWidth="0.35"/>
          <line x1="153" y1="241" x2="141" y2="253" stroke="#ff4040" strokeWidth="0.35"/>
        </motion.g>

        {/* Right eye */}
        <motion.circle cx="173" cy="247" r="13"
          fill="url(#eyeGlow)" filter="url(#blg)"
          animate={{ opacity: gen ? [0.35,0.90,0.35] : [0.10,0.38,0.10], r: gen ? [12,17,12] : [12,14,12] }}
          transition={{ duration: gen ? 1.15 : 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.20 }}
        />
        <motion.circle cx="173" cy="247" r="6"
          fill="url(#eyeGlow)" filter="url(#bsm)"
          animate={{ opacity: gen ? [0.6,1.0,0.6] : [0.22,0.55,0.22], r: gen ? [5,8,5] : [5,6.5,5] }}
          transition={{ duration: gen ? 1.15 : 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.20 }}
        />
        <motion.circle cx="173" cy="247" r="2.8"
          fill="#ff1a1a"
          animate={{ opacity: gen ? [0.75,1.0,0.75] : [0.30,0.70,0.30], r: gen ? [2.5,4,2.5] : [2.5,3.2,2.5] }}
          transition={{ duration: gen ? 1.15 : 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.20 }}
        />
        <motion.circle cx="173" cy="247" r="1.0" fill="#ffffff"
          animate={{ opacity: gen ? [0.7,1.0,0.7] : [0.2,0.6,0.2] }}
          transition={{ duration: gen ? 1.15 : 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.20 }}
        />
        {/* Right eye ray cross */}
        <motion.g animate={{ opacity: gen ? [0.18,0.65,0.18] : [0.04,0.18,0.04] }}
          transition={{ duration: gen ? 1.15 : 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.20 }}>
          <line x1="173" y1="239" x2="173" y2="255" stroke="#ff4040" strokeWidth="0.55"/>
          <line x1="165" y1="247" x2="181" y2="247" stroke="#ff4040" strokeWidth="0.55"/>
          <line x1="167" y1="241" x2="179" y2="253" stroke="#ff4040" strokeWidth="0.35"/>
          <line x1="179" y1="241" x2="167" y2="253" stroke="#ff4040" strokeWidth="0.35"/>
        </motion.g>

        {/* ════════════════════════════════
            NECK
        ════════════════════════════════ */}
        <rect x="146" y="287" width="28" height="24" rx="3" fill="url(#obsidian)"/>
        <rect x="146" y="287" width="28" height="24" rx="3" fill="url(#vr)" opacity="0.25"/>

        {/* ════════════════════════════════
            CLOAK — rune-etched obsidian
        ════════════════════════════════ */}
        <path
          d="M118,300 C92,308 62,328 38,372 C16,414 2,470 0,535 L0,600 L320,600 L320,535 C318,470 304,414 282,372 C258,328 228,308 202,300 C186,292 174,288 160,288 C146,288 134,292 118,300 Z"
          fill="url(#cloakDepth)"
        />
        <path
          d="M118,300 C92,308 62,328 38,372 C16,414 2,470 0,535 L0,600 L320,600 L320,535 C318,470 304,414 282,372 C258,328 228,308 202,300 C186,292 174,288 160,288 C146,288 134,292 118,300 Z"
          fill="url(#mt)" opacity="0.32"
        />
        {/* Rune etching — cloak */}
        <path
          d="M118,300 C92,308 62,328 38,372 C16,414 2,470 0,535 L0,600 L320,600 L320,535 C318,470 304,414 282,372 C258,328 228,308 202,300 C186,292 174,288 160,288 C146,288 134,292 118,300 Z"
          fill="url(#vr)" opacity="0.18" filter="url(#runeGlow)"
        />
        {/* Inner surface glow on cloak */}
        <path
          d="M118,300 C92,308 62,328 38,372 C16,414 2,470 0,535 L0,600 L320,600 L320,535 C318,470 304,414 282,372 C258,328 228,308 202,300 C186,292 174,288 160,288 C146,288 134,292 118,300 Z"
          fill="url(#surfaceGlow)" opacity="0.7"
        />

        {/* Center fold */}
        <path
          d="M152,296 C150,335 148,410 146,600 L174,600 C172,410 170,335 168,296 C165,285 162,280 160,280 C158,280 155,285 152,296 Z"
          fill="rgba(3,1,1,0.94)"
        />

        {/* Shoulder collar glint */}
        <path d="M118,300 C136,293 150,289 160,288 C170,289 184,293 202,300"
          stroke="rgba(210,165,55,0.22)" strokeWidth="1.4" fill="none"/>

        {/* Shoulder depth fills */}
        <path d="M118,300 C86,292 56,306 36,332 C54,312 84,300 118,300 Z" fill="rgba(184,134,11,0.10)"/>
        <path d="M202,300 C234,292 264,306 284,332 C266,312 236,300 202,300 Z" fill="rgba(184,134,11,0.10)"/>

        {/* Hem rune borders */}
        <path d="M4,574 C52,570 112,568 160,568 C208,568 268,570 316,574"
          stroke="rgba(184,134,11,0.16)" strokeWidth="1.2" fill="none"/>
        <path d="M18,584 C62,581 112,579 160,579 C208,579 258,581 302,584"
          stroke="rgba(184,134,11,0.09)" strokeWidth="0.7" fill="none"/>

      </svg>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   RESULT REVEAL
═══════════════════════════════════════════════════════════ */
function ResultReveal({ text, onReset }: { text: string; onReset: () => void }) {
  return (
    <motion.div key="result"
      initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col items-center gap-6 px-2"
    >
      <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }} className="w-3/4 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(184,134,11,0.62), transparent)" }}
      />
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="text-[10px] tracking-[0.42em] uppercase text-[#b8860b]/68"
        style={{ fontFamily: "var(--font-body)" }}
      >The Void Has Spoken</motion.p>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7 }}
        className="text-[13.5px] leading-[1.9] text-[#c8c8c8] text-center"
        style={{ fontFamily: "var(--font-body)" }}
      >{text}</motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="flex flex-col items-center gap-3 w-full"
      >
        <div className="w-3/4 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(184,134,11,0.38), transparent)" }}
        />
        <button onClick={onReset}
          className="text-[11px] tracking-[0.25em] uppercase text-[#b8860b]/45 hover:text-[#b8860b]/85 transition-colors duration-300"
          style={{ fontFamily: "var(--font-body)" }}
        >↺  Descend Again</button>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCROLL CUE
═══════════════════════════════════════════════════════════ */
function ScrollIndicator() {
  return (
    <motion.a href="#gallery" aria-label="Scroll to gallery"
      className="flex flex-col items-center gap-2 cursor-pointer group"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8 }}
    >
      <motion.div animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-1.5"
      >
        <span className="text-[9px] tracking-[0.45em] uppercase text-[#9ca3af]/28 group-hover:text-[#b8860b]/50 transition-colors duration-300"
          style={{ fontFamily: "var(--font-body)" }}
        >Descend into the Void</span>
        <div className="flex items-center justify-center w-8 h-8 rounded-full"
          style={{ border: "1px solid rgba(184,134,11,0.18)", background: "rgba(6,2,2,0.5)" }}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.4}
            strokeLinecap="round" className="w-3.5 h-3.5"
            style={{ color: "rgba(184,134,11,0.44)" }}
          ><path d="M3 6l5 5 5-5"/></svg>
        </div>
      </motion.div>
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════════
   VOID TEXTAREA — deep glassmorphism
═══════════════════════════════════════════════════════════ */
function VoidTextarea({
  value, onChange, disabled,
}: { value: string; onChange: (v: string) => void; disabled: boolean }) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-all duration-500"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(2,0,0,0.85)",
        backdropFilter: "blur(36px) saturate(1.5)",
        WebkitBackdropFilter: "blur(36px) saturate(1.5)",
        border: focused
          ? "1px solid rgba(220,38,38,0.55)"
          : hovered
          ? "1px solid rgba(220,38,38,0.26)"
          : "1px solid rgba(220,38,38,0.08)",
        boxShadow: focused
          ? "0 0 0 3px rgba(153,0,0,0.14), 0 0 40px rgba(153,0,0,0.30), 0 0 1px rgba(220,38,38,0.18) inset, 0 14px 52px rgba(0,0,0,0.72)"
          : hovered
          ? "0 0 20px rgba(100,0,0,0.18), 0 8px 40px rgba(0,0,0,0.62)"
          : "0 0 0 1px rgba(100,0,0,0.05) inset, 0 8px 36px rgba(0,0,0,0.58)",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      {/* Top gleam — turns red on focus */}
      <div className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: focused
            ? "linear-gradient(to right, transparent, rgba(220,38,38,0.48), transparent)"
            : "linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)",
          transition: "background 0.4s",
        }}
      />
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        maxLength={500}
        rows={6}
        disabled={disabled}
        placeholder="e.g., Glowing crimson eyes, immortal queen, crown of erased centuries..."
        className="w-full bg-transparent resize-none px-5 py-5 text-[14px] leading-relaxed text-[#d1d5db] placeholder:text-[#222730] outline-none disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ fontFamily: "var(--font-body)" }}
      />
      <div className="flex items-center justify-end px-5 pb-3.5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}
      >
        <span className="text-[11px]" style={{
          fontFamily: "var(--font-body)",
          color: value.length > 420 ? "rgba(220,38,38,0.68)" : "rgba(75,85,99,0.45)",
        }}>
          {value.length} / 500
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════ */
type Credits = { paid: number; freeRemaining: number; freeLimit: number; isLoggedIn: boolean } | null;

export default function GeneratorClient() {
  const [phase,        setPhase]        = useState<Phase>("idle");
  const [prompt,       setPrompt]       = useState("");
  const [result,       setResult]       = useState<string | null>(null);
  const [resultImage,  setResultImage]  = useState<string | null>(null);
  const [phraseIndex,  setPhraseIndex]  = useState(0);
  const [credits,      setCredits]      = useState<Credits>(null);

  useEffect(() => {
    fetch("/api/credits").then(r => r.json()).then(setCredits).catch(() => {});
  }, []);

  useEffect(() => {
    if (phase !== "generating") { setPhraseIndex(0); return; }
    const id = setInterval(() => setPhraseIndex((i) => (i + 1) % VOID_PHRASES.length), 1500);
    return () => clearInterval(id);
  }, [phase]);

  const handleSurprise = useCallback(() => {
    setPrompt(SURPRISE_PROMPTS[Math.floor(Math.random() * SURPRISE_PROMPTS.length)]);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || phase === "generating") return;
    setPhase("generating");
    setResult(null);
    setResultImage(null);

    try {
      const res = await fetch("/api/generate", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (res.status === 429 && data.limitReached) {
        toast.error(data.isLoggedIn ? "No credits remaining" : "Sign in required", {
          description: data.error,
          duration: 6000,
          style: { borderLeft: "3px solid #b8860b" },
          action: data.isLoggedIn
            ? { label: "Upgrade", onClick: () => { window.location.href = "#pricing"; } }
            : { label: "Sign in", onClick: () => { window.location.href = "/api/auth/signin"; } },
        });
        setPhase("idle");
        return;
      }

      if (!res.ok || !data.imageUrl) {
        throw new Error(data.error ?? "Generation failed.");
      }

      setResultImage(data.imageUrl);
      setResult(data.loreText || null);
      setPhase("revealed");
      // Refresh credit balance
      fetch("/api/credits").then(r => r.json()).then(setCredits).catch(() => {});
      toast.success("Truth Revealed.", {
        description: "1 credit deducted. The void remembers.",
        style: { borderLeft: "3px solid #b8860b" },
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "The void rejected the offering.";
      toast.error("Generation Failed", {
        description: message,
        style: { borderLeft: "3px solid #dc2626" },
      });
      setPhase("idle");
    }
  }, [prompt, phase]);

  const handleReset = useCallback(() => {
    setPhase("idle"); setResult(null); setResultImage(null); setPrompt("");
  }, []);

  const isGenerating = phase === "generating";
  const canGenerate  = !!prompt.trim() && phase === "idle";

  return (
    <section id="reveal" className="relative px-4 sm:px-8 lg:px-16 pb-10 max-w-7xl mx-auto">

      {/* Ambient bloom */}
      <motion.div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        animate={{
          background: isGenerating ? [
            "radial-gradient(ellipse 60% 70% at 22% 48%, rgba(120,0,0,0.35) 0%, transparent 68%)",
            "radial-gradient(ellipse 74% 84% at 22% 48%, rgba(175,0,0,0.52) 0%, transparent 68%)",
            "radial-gradient(ellipse 60% 70% at 22% 48%, rgba(120,0,0,0.35) 0%, transparent 68%)",
          ] : [
            "radial-gradient(ellipse 46% 56% at 22% 48%, rgba(68,0,0,0.20) 0%, transparent 65%)",
            "radial-gradient(ellipse 54% 64% at 22% 48%, rgba(92,0,0,0.30) 0%, transparent 65%)",
            "radial-gradient(ellipse 46% 56% at 22% 48%, rgba(68,0,0,0.20) 0%, transparent 65%)",
          ],
        }}
        transition={{ duration: isGenerating ? 1.05 : 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Credits badge ── */}
      {credits !== null && (
        <div className="flex justify-end mb-4">
          {credits.paid > 0 ? (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] tracking-[0.08em]"
              style={{ fontFamily: "var(--font-body)", background: "rgba(184,134,11,0.12)", border: "1px solid rgba(184,134,11,0.25)", color: "rgba(184,134,11,0.9)" }}>
              ⚜ {credits.paid} credits remaining
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] tracking-[0.08em]"
              style={{ fontFamily: "var(--font-body)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(156,163,175,0.7)" }}>
              {credits.freeRemaining}/{credits.freeLimit} free {credits.isLoggedIn ? "" : "— "}
              {!credits.isLoggedIn && (
                <a href="/api/auth/signin" style={{ color: "rgba(184,134,11,0.8)", textDecoration: "underline" }}>sign in for 3</a>
              )}
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">

        {/* ── LEFT: Void Visualizer ── */}
        <motion.div
          className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-center px-6 py-10 sm:py-14 min-h-[540px]"
          animate={{
            borderColor: isGenerating ? "rgba(220,38,38,0.38)" : "rgba(255,255,255,0.04)",
            boxShadow: isGenerating
              ? "0 0 90px rgba(153,0,0,0.32), 0 0 180px rgba(80,0,0,0.16), 0 24px 80px rgba(0,0,0,0.88)"
              : "0 0 0 1px rgba(153,0,0,0.06) inset, 0 24px 80px rgba(0,0,0,0.80)",
          }}
          transition={{ duration: 0.7 }}
          style={{
            background: "rgba(3,1,1,0.78)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <StardustField generating={isGenerating} />

          {/* Corner accents */}
          {(["tl","tr","bl","br"] as const).map((c) => (
            <span key={c} className={`absolute w-6 h-6
              ${c==="tl" ? "top-3 left-3 border-t border-l"    : ""}
              ${c==="tr" ? "top-3 right-3 border-t border-r"   : ""}
              ${c==="bl" ? "bottom-3 left-3 border-b border-l" : ""}
              ${c==="br" ? "bottom-3 right-3 border-b border-r": ""}
              border-[#b8860b]/[0.16]`}
            />
          ))}

          <AnimatePresence mode="wait">
            {phase === "revealed" && resultImage ? (
              /* ── GENERATED IMAGE — majestic fade-in ── */
              <motion.div key="image-reveal"
                className="relative w-full h-full flex flex-col items-center justify-center z-10"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Gold scan-line sweeps up as image appears */}
                <motion.div className="absolute inset-x-0 h-px pointer-events-none z-20"
                  style={{ background: "linear-gradient(to right, transparent, rgba(184,134,11,0.7), transparent)" }}
                  initial={{ top: "100%" }} animate={{ top: "-10%" }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                />
                <motion.img
                  src={resultImage}
                  alt="The Sovereign revealed"
                  className="w-full h-full object-cover rounded-xl"
                  style={{ maxHeight: 480 }}
                  initial={{ scale: 1.08, filter: "brightness(0) blur(12px)" }}
                  animate={{ scale: 1.0, filter: "brightness(1) blur(0px)" }}
                  transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Vignette overlay */}
                <div className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 55%, rgba(3,1,1,0.65) 100%)" }}
                />
                {/* Reset button */}
                <motion.button onClick={handleReset}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.28em] uppercase text-[#b8860b]/55 hover:text-[#b8860b]/90 transition-colors duration-300 z-20"
                  style={{ fontFamily: "var(--font-body)" }}
                >↺ Descend Again</motion.button>
              </motion.div>
            ) : phase !== "revealed" ? (
              /* ── SILHOUETTE (idle / generating) ── */
              <motion.div key="silhouette-view"
                className="flex flex-col items-center w-full relative z-10"
                exit={{ opacity: 0, scale: 1.16, filter: "blur(20px)", transition: { duration: 0.7, ease: "easeIn" } }}
              >
                <SovereignSilhouette phase={phase} />
                <div className="mt-8 h-5 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {isGenerating ? (
                      <motion.p key={phraseIndex}
                        initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }}
                        transition={{ duration: 0.38 }}
                        className="text-[11px] tracking-[0.32em] uppercase text-[#dc2626]/88"
                        style={{ fontFamily: "var(--font-body)" }}
                      >{VOID_PHRASES[phraseIndex]}</motion.p>
                    ) : (
                      <motion.p key="awaits"
                        initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }}
                        transition={{ duration: 0.38 }}
                        className="text-[11px] tracking-[0.32em] uppercase text-[#9ca3af]/25"
                        style={{ fontFamily: "var(--font-body)" }}
                      >The Sovereign Awaits</motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              /* ── FALLBACK (revealed but no image) ── */
              <ResultReveal key="result-view" text={result ?? ""} onReset={handleReset} />
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── RIGHT: Theory Panel ── */}
        <motion.div className="flex flex-col gap-5"
          animate={
            isGenerating
              ? { opacity: 0.28, filter: "blur(4px)", transition: { duration: 0.55, ease: "easeOut" } }
              : { opacity: 1,    filter: "blur(0px)", transition: { duration: 0.45, ease: "easeOut" } }
          }
        >
        {phase === "revealed" && result && (
          <ResultReveal text={result} onReset={handleReset} />
        )}
          <div>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(18px, 2.2vw, 26px)",
              letterSpacing: "0.06em",
              background: "linear-gradient(128deg, #6b4a00 0%, #c8920a 14%, #f0c842 30%, #e0b020 44%, #b8860b 58%, #f5d060 70%, #c9a030 82%, #8a6200 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Describe Your Theory
            </h2>
            <p className="mt-1.5 text-[13px] text-[#9ca3af]/44"
              style={{ fontFamily: "var(--font-body)" }}
            >The more detail you offer, the deeper the void shall answer.</p>
          </div>

          <VoidTextarea value={prompt} onChange={setPrompt} disabled={phase !== "idle"} />

          {/* Surprise Me */}
          <button onClick={handleSurprise} disabled={phase !== "idle"}
            className="w-fit flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase text-[#b8860b]/45 hover:text-[#b8860b] transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
              <rect x="3" y="3" width="18" height="18" rx="3"/>
              <circle cx="8.5"  cy="8.5"  r="1" fill="currentColor" stroke="none"/>
              <circle cx="15.5" cy="8.5"  r="1" fill="currentColor" stroke="none"/>
              <circle cx="8.5"  cy="15.5" r="1" fill="currentColor" stroke="none"/>
              <circle cx="15.5" cy="15.5" r="1" fill="currentColor" stroke="none"/>
              <circle cx="12"   cy="12"   r="1" fill="currentColor" stroke="none"/>
            </svg>
            Surprise Me
          </button>

          {/* CTA — deep metallic crimson */}
          <motion.button
            onClick={phase === "revealed" ? handleReset : handleGenerate}
            disabled={phase === "generating" || (phase === "idle" && !prompt.trim())}
            whileHover={canGenerate ? {
              scale: 1.022,
              boxShadow: "0 0 60px rgba(220,38,38,0.68), 0 0 120px rgba(153,0,0,0.34), 0 0 0 1px rgba(220,38,38,0.40) inset",
            } : {}}
            whileTap={canGenerate ? { scale: 0.974 } : {}}
            className="relative w-full rounded-xl overflow-hidden px-8 py-5 disabled:cursor-not-allowed"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "17px",
              letterSpacing: "0.14em",
              color: isGenerating ? "rgba(200,150,80,0.72)" : "#eac060",
              background: isGenerating
                ? "linear-gradient(150deg, #1c0000 0%, #0c0000 100%)"
                : "linear-gradient(158deg, #920000 0%, #720000 16%, #520000 38%, #300000 62%, #180000 82%, #080000 100%)",
              boxShadow: isGenerating
                ? "0 0 48px rgba(153,0,0,0.40), 0 0 0 1px rgba(180,0,0,0.24) inset"
                : "0 0 35px rgba(145,0,0,0.42), 0 0 0 1px rgba(165,0,0,0.20) inset, 0 6px 24px rgba(0,0,0,0.65)",
              transition: "background 0.45s ease, color 0.3s ease",
              textShadow: "0 1px 0 rgba(255,215,80,0.20), 0 -1px 0 rgba(0,0,0,0.65), 0 0 22px rgba(200,140,0,0.22)",
            }}
          >
            {/* Diagonal metallic sheen stripe */}
            <span className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(118deg, transparent 28%, rgba(230,50,50,0.13) 46%, rgba(255,110,60,0.07) 52%, transparent 66%)" }}
            />
            {/* Hover shimmer */}
            <motion.span className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
              style={{ background: "linear-gradient(122deg, rgba(220,38,38,0.24) 0%, rgba(200,120,20,0.12) 38%, transparent 62%)" }}
            />
            {/* Top gold gleam */}
            <span className="absolute inset-x-0 top-0 h-px pointer-events-none"
              style={{ background: "linear-gradient(to right, transparent, rgba(210,148,42,0.44), transparent)" }}
            />
            {/* Bottom shadow */}
            <span className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
              style={{ background: "rgba(0,0,0,0.55)" }}
            />

            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.span key="gen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-3 pointer-events-none"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"/>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-700"/>
                  </span>
                  Piercing the Void...
                </motion.span>
              ) : phase === "revealed" ? (
                <motion.span key="again" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  Descend Again
                </motion.span>
              ) : (
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none">
                  Reveal the Truth
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <p className="text-[11px] text-center text-[#6b7280]/35 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Every theory fed to the void becomes part of the legend.<br/>
            The more ancient the description, the truer the reveal.
          </p>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.div key="scroll-cue"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 flex justify-center"
          >
            <ScrollIndicator />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

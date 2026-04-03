"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { GALLERY_ITEMS, type GalleryItem } from "@/lib/gallery-data";

const INITIAL_ITEMS = GALLERY_ITEMS;
const MORE_ITEMS: GalleryItem[] = [];

/* ─────────────────────────────────────────────────────────────
   SVG Fallback Placeholder
   Shown when the local image file doesn't exist yet.
   A stylised dark portrait with a pulsing crimson eye dot,
   maintaining the "Crimson Eye" theme throughout the UI.
───────────────────────────────────────────────────────────── */
function SovereignPlaceholder() {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{
        minHeight: 320,
        background: "radial-gradient(ellipse 70% 80% at 50% 30%, #0d0000 0%, #030303 100%)",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 320"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[140px] opacity-70"
      >
        {/* Crown spikes */}
        <path d="M 44 112 L 54 68 L 65 112 Z"  fill="#100000" />
        <path d="M 63 112 L 76 48 L 90 112 Z"  fill="#100000" />
        <path d="M 86 112 L 100 8  L 114 112 Z" fill="#0a0000" />
        <path d="M 110 112 L 124 48 L 137 112 Z" fill="#100000" />
        <path d="M 135 112 L 146 68 L 156 112 Z" fill="#100000" />
        {/* Crown band */}
        <rect x="42" y="106" width="116" height="14" rx="2" fill="#0c0000" />
        <rect x="42" y="106" width="116" height="2" rx="1" fill="#1a0800" opacity="0.5" />
        {/* Head */}
        <ellipse cx="100" cy="136" rx="22" ry="25" fill="#080808" />
        {/* Left eye region */}
        <ellipse cx="91"  cy="133" rx="4.5" ry="2.2" fill="#100000" />
        {/* Right eye region */}
        <ellipse cx="109" cy="133" rx="4.5" ry="2.2" fill="#100000" />
        {/* Neck */}
        <rect x="91" y="158" width="18" height="14" rx="2" fill="#060606" />
        {/* Cloak */}
        <path
          d="M 74 168 C 56 174 38 188 24 214 C 10 240 2 275 0 320 L 200 320 C 198 275 190 240 176 214 C 162 188 144 174 126 168 C 116 163 109 160 100 160 C 91 160 84 163 74 168 Z"
          fill="#050505"
        />
        {/* Cloak center fold */}
        <path
          d="M 94 172 C 93 198 92 255 91 320 L 109 320 C 108 255 107 198 106 172 C 104 165 102 162 100 162 C 98 162 96 165 94 172 Z"
          fill="#020202" opacity="0.7"
        />

        {/* ── Pulsing crimson dot — eye motif (right eye) ── */}
        <motion.circle
          cx="109" cy="133" r="2.8"
          fill="#dc2626"
          animate={{
            opacity: [0.15, 0.75, 0.15],
            r: [2.4, 3.2, 2.4],
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Soft glow halo around the dot */}
        <motion.circle
          cx="109" cy="133" r="6"
          fill="none"
          stroke="#dc2626"
          strokeWidth="0.5"
          animate={{ opacity: [0, 0.2, 0], r: [5, 9, 5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* "Image pending" micro-label */}
        <text
          x="100" y="295"
          textAnchor="middle"
          fontSize="7"
          letterSpacing="2"
          fill="rgba(184,134,11,0.25)"
          fontFamily="Georgia, serif"
        >
          AWAITING REVELATION
        </text>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Individual Card
───────────────────────────────────────────────────────────── */
function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="break-inside-avoid mb-4"
    >
      <Link href={`/gallery/${item.slug}`} className="block">
      <div
        className="relative rounded-xl overflow-hidden cursor-pointer"
        style={{
          background: "rgba(9,4,4,0.50)",
          backdropFilter: "blur(10px)",
          border: hovered
            ? "1px solid rgba(220,38,38,0.42)"
            : "1px solid rgba(153,0,0,0.18)",
          boxShadow: hovered
            ? "0 0 32px rgba(153,0,0,0.25), 0 0 0 1px rgba(220,38,38,0.10) inset"
            : "0 8px 32px rgba(0,0,0,0.60)",
          transition: "border-color 0.35s ease, box-shadow 0.35s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Image / Fallback ── */}
        <div className="overflow-hidden">
          {imgError ? (
            <SovereignPlaceholder />
          ) : (
            <motion.img
              src={item.imageUrl}
              alt={item.prompt}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full object-cover block"
              style={{ display: "block" }}
              animate={{ scale: hovered ? 1.055 : 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </div>

        {/* ── Hover overlay — slides up ── */}
        <motion.div
          className="absolute inset-x-0 bottom-0 px-4 pt-14 pb-5"
          style={{
            background:
              "linear-gradient(to top, rgba(4,0,0,0.96) 0%, rgba(10,0,0,0.82) 48%, transparent 100%)",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Gold rule */}
          <div
            className="mb-3 h-px w-10"
            style={{ background: "linear-gradient(to right, rgba(184,134,11,0.65), transparent)" }}
          />

          {/* Prompt — heading (Cinzel) font, golden-ash, text-shadow for depth */}
          <p
            className="text-[12.5px] leading-[1.8] line-clamp-3"
            style={{
              fontFamily: "var(--font-heading)",
              color: "#c9a96e",
              textShadow: "0 1px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)",
              letterSpacing: "0.02em",
            }}
          >
            &ldquo;{item.prompt}&rdquo;
          </p>

          {/* Credit line — small sans-serif */}
          <p
            className="mt-2.5 text-[10px] text-[#6b7280]/55"
            style={{ fontFamily: "var(--font-body)", letterSpacing: "0.04em" }}
          >
            Revealed by:{" "}
            <span className="text-[#b8860b]/50">{item.author}</span>
            {" "}|{" "}
            {item.date}
          </p>
        </motion.div>

        {/* Always-visible corner accents */}
        <span className="absolute top-2.5 left-2.5  w-3.5 h-3.5 border-t border-l border-[#b8860b]/18 pointer-events-none" />
        <span className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-[#b8860b]/18 pointer-events-none" />
      </div>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   "Descend Deeper" Pulsing Seal Button
───────────────────────────────────────────────────────────── */
function DescendButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="relative flex flex-col items-center gap-3 group"
    >
      {/* Outer pulsing aura */}
      <motion.span
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -16,
          background: "radial-gradient(circle, rgba(153,0,0,0.28) 0%, transparent 68%)",
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.92, 1.06, 0.92] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Seal disc */}
      <div
        className="relative w-28 h-28 rounded-full flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 42% 38%, #1c0000 0%, #0a0000 55%, #020000 100%)",
          border: "1px solid rgba(153,0,0,0.38)",
          boxShadow:
            "0 0 32px rgba(153,0,0,0.38), 0 0 70px rgba(80,0,0,0.18), 0 0 0 5px rgba(153,0,0,0.06)",
        }}
      >
        {/* Inner gold ring */}
        <div
          className="absolute inset-2.5 rounded-full"
          style={{ border: "1px solid rgba(184,134,11,0.14)" }}
        />
        {/* Inner crimson ring */}
        <div
          className="absolute inset-4 rounded-full"
          style={{ border: "1px solid rgba(153,0,0,0.22)" }}
        />

        {/* Crown + eyes SVG */}
        <svg viewBox="0 0 40 40" className="w-10 h-10 relative z-10" fill="none">
          <path d="M8 26 L12 14 L15 26 Z"  fill="rgba(153,0,0,0.65)" />
          <path d="M14 26 L18 8  L22 26 Z"  fill="rgba(153,0,0,0.82)" />
          <path d="M21 26 L25 8  L29 26 Z"  fill="rgba(153,0,0,0.82)" />
          <path d="M25 26 L28 14 L32 26 Z"  fill="rgba(153,0,0,0.65)" />
          <rect x="7" y="24" width="26" height="4" rx="1" fill="rgba(110,0,0,0.55)" />
          <motion.ellipse
            cx="17" cy="32" rx="2.2" ry="1.1" fill="#dc2626"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="23" cy="32" rx="2.2" ry="1.1" fill="#dc2626"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.12 }}
          />
        </svg>
      </div>

      {/* Label */}
      <span
        className="text-[11px] tracking-[0.35em] uppercase text-[#b8860b]/40
                   group-hover:text-[#b8860b]/75 transition-colors duration-300"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Descend Deeper
      </span>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Export
───────────────────────────────────────────────────────────── */
export default function Gallery() {
  const [items, setItems]   = useState<GalleryItem[]>(INITIAL_ITEMS);
  const [loaded, setLoaded] = useState(false);

  const handleLoadMore = () => {
    setItems((prev) => [...prev, ...MORE_ITEMS]);
    setLoaded(true);
  };

  return (
    <section id="gallery" className="relative px-4 sm:px-8 lg:px-16 pb-28 max-w-7xl mx-auto">

      {/* Section header */}
      <div className="text-center mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(184,134,11,0.18))" }} />
          <span className="text-[#b8860b]/28 text-[10px] tracking-[0.5em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
            ✦  Wall of Truth  ✦
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
          The <span className="text-gold-gradient">Community</span> Reveals
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-[13.5px] text-[#9ca3af]/50 max-w-md mx-auto"
          style={{ fontFamily: "var(--font-body)" }}
        >
          What others have summoned from the void. Hover to see the words that tore open the veil.
        </motion.p>
      </div>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        <AnimatePresence>
          {items.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {/* Load more — only shown when there are additional items */}
      {MORE_ITEMS.length > 0 && (
        <div className="mt-16 flex justify-center">
          <AnimatePresence mode="wait">
            {!loaded ? (
              <DescendButton key="seal" onClick={handleLoadMore} />
            ) : (
              <motion.p
                key="exhausted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[11px] tracking-[0.3em] uppercase text-[#6b7280]/30"
                style={{ fontFamily: "var(--font-body)" }}
              >
                The void offers no more
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}

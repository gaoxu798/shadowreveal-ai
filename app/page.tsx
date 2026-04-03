"use client";

import { motion } from "framer-motion";
import GeneratorClient from "@/components/GeneratorClient";

/* ─────────────────────────────────────────────────────────────
   Void Stardust — seeded so no hydration mismatch
───────────────────────────────────────────────────────────── */
const VOID_PARTICLES = Array.from({ length: 28 }, (_, i) => {
  const s = (i + 1) * 1664525;
  return {
    id:   i,
    left: ((s >>> 0)  % 1000) / 10,        // 0–100%
    top:  20 + ((s >>> 7)  % 700) / 10,    // 20–90% (avoid navbar)
    r:    1.2 + ((s >>> 14) % 8)  / 5,     // 1.2–2.8 px
    op:   0.06 + ((s >>> 21) % 12) / 100,  // 0.06–0.18
    dur:  8  + ((s >>> 28) % 14),           // 8–22 s
    del:  ((s >>> 5)  % 60) / 10,          // 0–6 s
    gold: i % 5 === 0,
  };
});

function VoidStardust() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {VOID_PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left:   `${p.left}%`,
            top:    `${p.top}%`,
            width:  `${p.r * 2}px`,
            height: `${p.r * 2}px`,
            background: p.gold ? `rgba(184,134,11,${p.op})` : `rgba(220,38,38,${p.op})`,
            boxShadow: p.gold
              ? `0 0 ${p.r * 3}px rgba(184,134,11,${p.op * 1.5})`
              : `0 0 ${p.r * 3}px rgba(220,38,38,${p.op * 1.5})`,
          }}
          animate={{
            y:       [0, -(40 + p.r * 8), 0],
            opacity: [0, p.op, p.op * 0.6, 0],
            scale:   [0.6, 1.0, 0.8, 0.6],
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
  );
}
import HowItWorks from "@/components/HowItWorks";
import Gallery from "@/components/Gallery";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import MagneticCTA from "@/components/MagneticCTA";

/* ─────────────────────────────────────────────────────────────
   FAQ JSON-LD Schema
───────────────────────────────────────────────────────────── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who owns the reveal? Does this infringe on anime copyright?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ShadowReveal.AI operates as a transformative fan-theory visualization tool protected under fair use principles. Under Theory Crafter and Sovereign Pass tiers, you retain full ownership of every AI-generated image.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use my reveals commercially for YouTube thumbnails or TikTok content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Theory Crafter and Sovereign Pass holders are granted commercial usage rights for all generated content, including YouTube thumbnails, TikTok overlays, and fan merchandise.",
      },
    },
    {
      "@type": "Question",
      name: "Is paying with PayPal safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All transactions are processed through PayPal. ShadowReveal.AI never stores your card number or financial credentials. We receive only a transaction confirmation.",
      },
    },
    {
      "@type": "Question",
      name: "What is the refund policy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Used credits are non-refundable due to irreversible GPU computation costs. If a generation failed technically, contact support within 48 hours for a credit restore. Unused credit packs may be refunded within 7 days of purchase.",
      },
    },
  ],
};

/* ─────────────────────────────────────────────────────────────
   Shared section animation variant
───────────────────────────────────────────────────────────── */
const sectionAnim = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
};

/* ─────────────────────────────────────────────────────────────
   Divider
───────────────────────────────────────────────────────────── */
function Divider() {
  return (
    <div className="my-16 px-8 flex items-center gap-4 max-w-7xl mx-auto" aria-hidden="true">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(153,0,0,0.18))" }} />
      <span className="text-[#330000]/80 text-xs">✦</span>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(153,0,0,0.18))" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* ── FAQ JSON-LD Schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ══════════════════════════════════════════
          HERO — no scroll trigger, visible on load
      ══════════════════════════════════════════ */}
      <section id="top" className="relative flex flex-col items-center text-center px-6 pt-20 pb-14">
        {/* Void stardust floating particles */}
        <VoidStardust />

        {/* Layered crown-glow */}
        <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] z-0"
          style={{ background: "radial-gradient(ellipse 65% 65% at 50% 0%, rgba(80,0,0,0.55) 0%, rgba(40,0,0,0.2) 55%, transparent 80%)" }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[180px] z-0"
          style={{ background: "radial-gradient(ellipse 50% 70% at 50% 0%, rgba(184,134,11,0.06) 0%, transparent 75%)" }}
        />

        {/* All hero text sits above stardust */}
        <div className="relative z-10 flex flex-col items-center">

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 text-[11px] tracking-[0.45em] uppercase"
          style={{ fontFamily: "var(--font-body)", color: "rgba(184,134,11,0.75)" }}
        >
          Void Century · Ancient Lore Analysis
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative font-heading text-5xl sm:text-6xl lg:text-[5rem] font-semibold leading-[1.1] tracking-wide"
          style={{
            fontFamily: "var(--font-heading)",
            color: "rgba(228,228,231,0.92)",
            textShadow: "0 2px 40px rgba(0,0,0,0.8), 0 0 60px rgba(80,40,0,0.12)",
          }}
        >
          Unveil the{" "}
          <span className="text-gold-gradient">Sovereign</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 mb-7 flex items-center gap-4 w-full max-w-sm"
        >
          <div className="flex-1 divider-royal" />
          <span className="text-[#b8860b]/55 text-sm tracking-widest">✦</span>
          <div className="flex-1 divider-royal" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg text-[15.5px] leading-relaxed"
          style={{ fontFamily: "var(--font-body)", color: "rgba(156,163,175,0.78)" }}
        >
          The Void Century holds many secrets. Describe your theory, and let
          the AI pierce the darkness.
        </motion.p>

        </div>{/* end relative z-10 wrapper */}

        {/* ── Scroll indicator ── */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-2 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.span
            className="text-[10px] tracking-[0.45em] uppercase"
            style={{ fontFamily: "var(--font-body)", color: "rgba(184,134,11,0.45)" }}
            animate={{ opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll to Reveal
          </motion.span>
          <motion.svg
            width="18" height="28" viewBox="0 0 18 28" fill="none"
            style={{ color: "rgba(184,134,11,0.5)" }}
          >
            {/* Mouse outline */}
            <rect x="1" y="1" width="16" height="22" rx="8" stroke="currentColor" strokeWidth="1.2" />
            {/* Scrolling dot */}
            <motion.rect
              x="7.5" y="5" width="3" height="5" rx="1.5" fill="currentColor"
              animate={{ y: [5, 11, 5], opacity: [0.9, 0.2, 0.9] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.svg>
          {/* Chevron cascade */}
          {[0, 0.2, 0.4].map((delay, i) => (
            <motion.svg key={i} width="14" height="8" viewBox="0 0 14 8" fill="none"
              style={{ color: "rgba(184,134,11,0.35)", marginTop: i === 0 ? "2px" : "-4px" }}
              animate={{ opacity: [0.15, 0.55, 0.15], y: [0, 3, 0] }}
              transition={{ duration: 1.8, delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          ))}
        </motion.div>

      </section>

      {/* ══════════════════════════════════════════
          GENERATOR
      ══════════════════════════════════════════ */}
      <motion.section {...sectionAnim}>
        <GeneratorClient />
      </motion.section>

      <Divider />

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <motion.section {...sectionAnim}>
        <HowItWorks />
      </motion.section>

      {/* Elevator CTA #1 — after ritual steps */}
      <MagneticCTA label="Secure the Ritual" href="#pricing" />

      <Divider />

      {/* ══════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════ */}
      <motion.section {...sectionAnim}>
        <Gallery />
      </motion.section>

      {/* Elevator CTA #2 — after gallery */}
      <MagneticCTA label="Unlock High-Res Truths" href="#pricing" />

      <Divider />

      {/* ══════════════════════════════════════════
          SOCIAL PROOF
      ══════════════════════════════════════════ */}
      <motion.section {...sectionAnim}>
        <SocialProof />
      </motion.section>

      <Divider />

      {/* ══════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════ */}
      <motion.section {...sectionAnim}>
        <Pricing />
      </motion.section>

      <Divider />

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <motion.section {...sectionAnim}>
        <FAQ />
      </motion.section>
    </>
  );
}

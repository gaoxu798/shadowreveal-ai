"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   FAQ data — conversion-focused, lore-themed
───────────────────────────────────────────────────────────── */
const FAQS = [
  {
    id: "copyright",
    q: "Who owns the reveal? Does this infringe on anime copyright?",
    a: `ShadowReveal.AI operates as a transformative fan-theory visualization tool — a form of creative commentary protected under fair use principles. We do not reproduce, distribute, or sell official copyrighted artwork.\n\nAll AI-generated outputs are original creations prompted by your unique theory. Under the "Theory Crafter" and "Sovereign Pass" pacts, you retain full ownership of every image you generate. The void gives; the void is yours.`,
  },
  {
    id: "commercial",
    q: "Can I use my reveals commercially — for YouTube thumbnails or TikTok content?",
    a: `Yes — explicitly. "Theory Crafter" and "Sovereign Pass" tier holders are granted commercial usage rights for all generated content. This includes YouTube video thumbnails, TikTok overlays, Reels covers, Patreon posts, and fan merchandise.\n\nFree "Void Wanderer" reveals are for personal, non-commercial use only, and are watermarked accordingly. Upgrade your pact to unleash the sovereign commercially.`,
  },
  {
    id: "payment",
    q: "Is paying with PayPal safe? How is my financial data handled?",
    a: `All transactions are processed exclusively through PayPal — the world's most trusted digital payment infrastructure. ShadowReveal.AI never sees, touches, or stores your card number, bank account, or any financial credentials.\n\nYour payment data lives entirely within PayPal's encrypted vaults. We receive only a transaction confirmation. The void takes your credits; nothing else.`,
  },
  {
    id: "refund",
    q: "What is the refund policy if I'm not satisfied?",
    a: `Credits are digital goods consumed by GPU computation the moment a reveal is generated. Due to the irreversible nature of AI inference costs, used credits are non-refundable — this policy exists to prevent abuse of our GPU infrastructure.\n\nIf you encounter a technical failure (a generation that never completed), contact us within 48 hours and we will restore your credits. Unused credits from an un-started pack may be eligible for a refund — reach out via our support channel within 7 days of purchase.`,
  },
];

/* ─────────────────────────────────────────────────────────────
   Single accordion row
───────────────────────────────────────────────────────────── */
function FAQRow({
  faq,
  open,
  onToggle,
}: {
  faq: (typeof FAQS)[0];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: open ? "rgba(12,6,6,0.55)" : "rgba(8,4,4,0.32)",
        border: open
          ? "1px solid rgba(184,134,11,0.22)"
          : "1px solid rgba(255,255,255,0.04)",
        boxShadow: open
          ? "0 0 24px rgba(184,134,11,0.06), 0 8px 32px rgba(0,0,0,0.45)"
          : "0 4px 16px rgba(0,0,0,0.3)",
      }}
    >
      {/* ── Question row (trigger) ── */}
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
      >
        <span
          className="text-[14px] font-medium leading-snug transition-colors duration-250"
          style={{
            fontFamily: "var(--font-heading)",
            color: open ? "#c9a96e" : "rgba(209,213,219,0.75)",
            letterSpacing: "0.02em",
          }}
        >
          {faq.q}
        </span>

        {/* Chevron */}
        <motion.svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-4 h-4 shrink-0 transition-colors duration-250"
          style={{ color: open ? "#b8860b" : "rgba(107,114,128,0.5)" }}
        >
          <path d="M5 8l5 5 5-5" />
        </motion.svg>
      </button>

      {/* ── Answer panel ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              {/* Gold divider */}
              <div
                className="mb-4 h-px"
                style={{
                  background:
                    "linear-gradient(to right, rgba(184,134,11,0.3), transparent)",
                }}
              />
              {faq.a.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className={`text-[13px] leading-[1.95] text-[#9ca3af]/70 ${i > 0 ? "mt-3" : ""}`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section — one-open-at-a-time accordion
───────────────────────────────────────────────────────────── */
export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="relative px-4 sm:px-8 lg:px-16 pb-24 max-w-4xl mx-auto">

      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(184,134,11,0.18))" }} />
          <span
            className="text-[#b8860b]/28 text-[10px] tracking-[0.5em] uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            ✦  Archive  ✦
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
          Archive of{" "}
          <span className="text-gold-gradient">Queries</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-[13.5px] text-[#9ca3af]/50 max-w-sm mx-auto"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Dispelling the shadows of doubt before you descend.
        </motion.p>
      </div>

      {/* Accordion */}
      <motion.div
        className="flex flex-col gap-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {FAQS.map((faq) => (
          <FAQRow
            key={faq.id}
            faq={faq}
            open={openId === faq.id}
            onToggle={() => toggle(faq.id)}
          />
        ))}
      </motion.div>
    </section>
  );
}

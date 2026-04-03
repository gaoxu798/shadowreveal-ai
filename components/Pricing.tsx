"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

/* ─────────────────────────────────────────────────────────────
   Icons — inline SVG, no lucide-react dep needed
───────────────────────────────────────────────────────────── */
function CheckIcon({ dim }: { dim?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={`w-3.5 h-3.5 shrink-0 ${dim ? "text-[#4b5563]/50" : "text-[#b8860b]"}`}
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" opacity={dim ? 0.35 : 0.45} />
      <path
        d="M4.5 8.2 L6.8 10.5 L11.5 5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={dim ? 0.35 : 1}
      />
    </svg>
  );
}

function XMarkIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0 text-[#4b5563]/35">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <path d="M5.5 5.5 L10.5 10.5 M10.5 5.5 L5.5 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Tier data
───────────────────────────────────────────────────────────── */
type Feature = { text: string; included: boolean };

const TIERS = [
  {
    id: "wanderer",
    name: "Void Wanderer",
    subtitle: "Enter the darkness.",
    price: "$0",
    period: "forever free",
    badge: null,
    hero: false,
    cta: "Begin the Descent",
    features: [
      { text: "2 Reveals per month",           included: true  },
      { text: "Standard resolution output",    included: true  },
      { text: "Public Gallery submission",     included: true  },
      { text: "Watermarked generations",       included: true  },
      { text: "Fast GPU queue",                included: false },
      { text: "No watermark",                  included: false },
      { text: "High resolution output",        included: false },
      { text: "Commercial rights",             included: false },
    ] as Feature[],
  },
  {
    id: "crafter",
    name: "Theory Crafter",
    subtitle: "The pact most seekers choose.",
    price: "$3.99",
    period: "one-time credit pack",
    badge: "Most Popular",
    hero: true,
    cta: "Seal the Pact — $3.99",
    features: [
      { text: "50 Reveals",                    included: true },
      { text: "High resolution output",        included: true },
      { text: "Fast GPU queue",                included: true },
      { text: "No watermark",                  included: true },
      { text: "Public Gallery submission",     included: true },
      { text: "Credits never expire",          included: true },
      { text: "4K upscaling",                  included: false },
      { text: "Commercial rights",             included: false },
    ] as Feature[],
  },
  {
    id: "sovereign",
    name: "The Sovereign Pass",
    subtitle: "For those who demand dominion.",
    price: "$13.99",
    period: "one-time credit pack",
    badge: null,
    hero: false,
    cta: "Claim Sovereignty — $13.99",
    features: [
      { text: "200 Reveals",                   included: true },
      { text: "4K upscaling",                  included: true },
      { text: "Commercial rights",             included: true },
      { text: "Private generations",           included: true },
      { text: "Fast GPU queue",                included: true },
      { text: "No watermark",                  included: true },
      { text: "Priority support",              included: true },
      { text: "Credits never expire",          included: true },
    ] as Feature[],
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   Single Tier Card
───────────────────────────────────────────────────────────── */
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

async function handlePayPalCheckout(planId: string, onError: () => void) {
  try {
    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId }),
    });
    const data = await res.json();
    if (!data.approvalUrl) throw new Error("No approval URL");
    window.location.href = data.approvalUrl;
  } catch {
    toast.error("Payment error", { description: "Could not initiate checkout." });
    onError();
  }
}

function TierCard({ tier, index }: { tier: (typeof TIERS)[number]; index: number }) {
  const isHero      = tier.hero;
  const isSovereign = tier.id === "sovereign";
  const [paying, setPaying] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: {
          opacity: 1,
          y: isHero ? -16 : 0,          // hero floats higher on desktop
          transition: { duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: isHero
          ? "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(80,0,0,0.28) 0%, rgba(6,2,2,0.55) 100%)"
          : isSovereign
          ? "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(20,14,0,0.5) 0%, rgba(5,4,2,0.55) 100%)"
          : "rgba(8,4,4,0.38)",
        backdropFilter: "blur(14px)",
        border: isHero
          ? "1px solid rgba(220,38,38,0.35)"
          : isSovereign
          ? "1px solid rgba(184,134,11,0.22)"
          : "1px solid rgba(255,255,255,0.045)",
        boxShadow: isHero
          ? "0 0 40px rgba(220,38,38,0.18), 0 0 80px rgba(100,0,0,0.12), 0 16px 48px rgba(0,0,0,0.6)"
          : isSovereign
          ? "0 0 32px rgba(184,134,11,0.08), 0 16px 48px rgba(0,0,0,0.55)"
          : "0 8px 32px rgba(0,0,0,0.45)",
      }}
    >
      {/* ── Hero pulsing border glow overlay ── */}
      {isHero && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: [
              "0 0 35px rgba(220,38,38,0.18), inset 0 0 20px rgba(153,0,0,0.06)",
              "0 0 70px rgba(220,38,38,0.38), inset 0 0 36px rgba(153,0,0,0.14)",
              "0 0 35px rgba(220,38,38,0.18), inset 0 0 20px rgba(153,0,0,0.06)",
            ],
          }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* ── "Most Popular" badge ── */}
      {tier.badge && (
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <motion.div
            className="px-4 py-1 text-[10px] tracking-[0.3em] uppercase font-medium"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
            style={{
              fontFamily: "var(--font-body)",
              background: "linear-gradient(135deg, #8a0000 0%, #520000 100%)",
              color: "#e5c97e",
              borderRadius: "0 0 8px 8px",
              boxShadow: "0 2px 16px rgba(220,38,38,0.45)",
            }}
          >
            {tier.badge}
          </motion.div>
        </div>
      )}

      <div className="flex flex-col flex-1 px-6 pb-7 pt-8">
        {/* Extra top padding on hero to clear badge */}
        {tier.badge && <div className="h-3" />}

        {/* ── Tier name & subtitle ── */}
        <div className="mb-5">
          <h3
            className="text-[17px] font-semibold tracking-wide"
            style={{
              fontFamily: "var(--font-heading)",
              color: isHero ? "#e5c97e" : isSovereign ? "#c9a96e" : "#d1d5db",
            }}
          >
            {tier.name}
          </h3>
          <p
            className="mt-1 text-[12px] text-[#9ca3af]/45 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {tier.subtitle}
          </p>
        </div>

        {/* ── Price ── */}
        <div className="mb-5 flex items-end gap-1.5">
          <span
            className="text-4xl font-semibold leading-none"
            style={{
              fontFamily: "var(--font-heading)",
              color: isHero ? "#dc2626" : isSovereign ? "#b8860b" : "#9ca3af",
            }}
          >
            {tier.price}
          </span>
          <span
            className="mb-1 text-[11px] text-[#6b7280]/50 leading-tight"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {tier.period}
          </span>
        </div>

        {/* Divider */}
        <div
          className="mb-5 h-px w-full"
          style={{
            background: isHero
              ? "linear-gradient(to right, rgba(220,38,38,0.2), transparent)"
              : isSovereign
              ? "linear-gradient(to right, rgba(184,134,11,0.18), transparent)"
              : "linear-gradient(to right, rgba(255,255,255,0.05), transparent)",
          }}
        />

        {/* ── Feature list ── */}
        <ul className="flex flex-col gap-2.5 mb-7 flex-1">
          {tier.features.map((f) => (
            <li
              key={f.text}
              className="flex items-center gap-2.5"
            >
              {f.included ? <CheckIcon dim={!isHero && !isSovereign && tier.id === "wanderer" && false} /> : <XMarkIcon />}
              <span
                className="text-[12.5px] leading-snug"
                style={{
                  fontFamily: "var(--font-body)",
                  color: f.included
                    ? isHero ? "#c8c8c8" : "#a8b0bb"
                    : "rgba(107,114,128,0.4)",
                  textDecoration: f.included ? "none" : "none",
                }}
              >
                {f.text}
              </span>
            </li>
          ))}
        </ul>

        {/* ── CTA button ── */}
        <motion.button
          whileHover={{ scale: isHero ? 1.05 : 1.02 }}
          whileTap={{ scale: 0.975 }}
          disabled={paying}
          onClick={() => {
            if (tier.id === "wanderer") { document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" }); return; }
            setPaying(true);
            handlePayPalCheckout(tier.id, () => setPaying(false));
          }}
          className="relative w-full rounded-xl overflow-hidden px-6 py-3.5 text-[13px] tracking-[0.1em] font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            fontFamily: "var(--font-heading)",
            background: isHero
              ? "linear-gradient(135deg, #7a0000 0%, #3d0000 60%, #1a0000 100%)"
              : isSovereign
              ? "linear-gradient(135deg, #2a1c00 0%, #1a1100 60%, #0a0800 100%)"
              : "rgba(255,255,255,0.04)",
            color: isHero ? "#e5c97e" : isSovereign ? "#c9a96e" : "#9ca3af",
            border: isHero
              ? "1px solid rgba(220,38,38,0.3)"
              : isSovereign
              ? "1px solid rgba(184,134,11,0.2)"
              : "1px solid rgba(255,255,255,0.07)",
            boxShadow: isHero
              ? "0 0 20px rgba(153,0,0,0.3), 0 0 0 1px rgba(153,0,0,0.15) inset"
              : "none",
          }}
        >
          {isHero && (
            <motion.span
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.22) 0%, rgba(184,134,11,0.08) 55%, transparent 80%)" }}
            />
          )}
          <span className="relative z-10">
            {paying ? "Redirecting to PayPal..." : tier.cta}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────────── */
export default function Pricing() {
  return (
    <section id="pricing" className="relative px-4 sm:px-8 lg:px-16 pb-28 max-w-7xl mx-auto">

      {/* Section header */}
      <div className="text-center mb-14">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(184,134,11,0.18))" }} />
          <span className="text-[#b8860b]/28 text-[10px] tracking-[0.5em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
            ✦  Ancient Pacts  ✦
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
          Unlock{" "}
          <span className="text-gold-gradient">the Truth</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-[13.5px] text-[#9ca3af]/50 max-w-sm mx-auto"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Choose your path. Reveal the sovereign.
        </motion.p>
      </div>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {TIERS.map((tier, i) => (
          <TierCard key={tier.id} tier={tier} index={i} />
        ))}
      </motion.div>

      {/* Fine print */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-10 text-center text-[11px] text-[#6b7280]/35 leading-relaxed"
        style={{ fontFamily: "var(--font-body)" }}
      >
        All pacts are one-time purchases. No subscriptions. No recurring charges.
        <br />
        Credits never expire. The void waits for no deadline.
      </motion.p>
    </section>
  );
}

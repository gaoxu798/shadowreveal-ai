"use client";

import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Platform icon SVGs — inline, no external dep
───────────────────────────────────────────────────────────── */
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L2.25 2.25h6.985l4.262 5.637 4.747-5.637zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function RedditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Avatar — gradient circle with initial letter
───────────────────────────────────────────────────────────── */
function Avatar({ seed, initial }: { seed: number; initial: string }) {
  // Six handpicked gradient combos — dark-fantasy palette
  const gradients = [
    "radial-gradient(circle at 35% 35%, #4a0000 0%, #1a0000 100%)",
    "radial-gradient(circle at 35% 35%, #1a1200 0%, #0a0800 100%)",
    "radial-gradient(circle at 35% 35%, #00001a 0%, #000308 100%)",
    "radial-gradient(circle at 35% 35%, #2d0030 0%, #0a0010 100%)",
    "radial-gradient(circle at 35% 35%, #001a1a 0%, #000808 100%)",
    "radial-gradient(circle at 35% 35%, #1a0010 0%, #08000a 100%)",
  ];
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
      style={{
        background: gradients[seed % gradients.length],
        border: "1px solid rgba(184,134,11,0.20)",
        boxShadow: "0 0 8px rgba(0,0,0,0.5) inset",
      }}
    >
      <span
        className="text-[11px] font-semibold text-[#b8860b]/70"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {initial}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Mock Data
───────────────────────────────────────────────────────────── */
type Platform = "x" | "reddit";

const WHISPERS = [
  {
    id: 1,
    handle: "@TheoryCrafter",
    platform: "x" as Platform,
    avatarSeed: 0,
    content:
      "Bro, the crimson eye animation when you hit generate literally gave me chills. It captured the exact sinister vibe I had in mind for Imu. I've tried every AI tool out there — nothing comes close. 10/10.",
    likes: "18.4k",
    reposts: "3.2k",
    replies: "142",
  },
  {
    id: 2,
    handle: "u/AncientKingdom",
    platform: "reddit" as Platform,
    avatarSeed: 1,
    content:
      "I've been drawing Imu silhouette theories for 5 years on r/OnePiece. ShadowReveal just visualized my 'Immortal Queen' write-up in 5 seconds. The detail accuracy is actually insane. How is this free??",
    likes: "12.1k",
    reposts: "2.8k",
    replies: "389",
  },
  {
    id: 3,
    handle: "@GrandLineNews",
    platform: "x" as Platform,
    avatarSeed: 2,
    content:
      "Just used my last free credit to generate the 'Funny Old Man' theory... I'm terrified and impressed at the same time. The void energy in the output is UNREAL. Take my money for the pro pass already!",
    likes: "9.7k",
    reposts: "1.9k",
    replies: "217",
  },
  {
    id: 4,
    handle: "u/VoidCenturyScholar",
    platform: "reddit" as Platform,
    avatarSeed: 3,
    content:
      "The way this tool interprets a raw text prompt and outputs something that feels like official One Piece concept art is genuinely disturbing. In a good way. Shared it on r/OnePieceFanTheories and it's going viral.",
    likes: "6.3k",
    reposts: "1.1k",
    replies: "94",
  },
  {
    id: 5,
    handle: "@NikasChosen",
    platform: "x" as Platform,
    avatarSeed: 4,
    content:
      "Everyone is sleeping on ShadowReveal. The dark aesthetic, the loading animation with the awakening eyes — it's not a tool, it's a LORE EXPERIENCE. This is what Oda would build if he made an AI app.",
    likes: "22.9k",
    reposts: "5.6k",
    replies: "503",
  },
  {
    id: 6,
    handle: "u/JoyBoyReturn",
    platform: "reddit" as Platform,
    avatarSeed: 5,
    content:
      "Generated the 'Lili is Imu' theory with max detail. The result read like an actual Poneglyph translation. My entire friend group lost it. Whatever model they're running behind this understands One Piece lore.",
    likes: "8.8k",
    reposts: "2.0k",
    replies: "176",
  },
];

/* ─────────────────────────────────────────────────────────────
   Single Whisper Card
───────────────────────────────────────────────────────────── */
function WhisperCard({ w }: { w: (typeof WHISPERS)[0] }) {
  const isX = w.platform === "x";

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 28 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="flex flex-col gap-4 rounded-2xl px-5 py-5"
      style={{
        background: "rgba(8,4,4,0.42)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.045)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(153,0,0,0.05) inset",
      }}
    >
      {/* ── Header row ── */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar seed={w.avatarSeed} initial={w.handle[1].toUpperCase()} />
          <div className="min-w-0">
            <p
              className="text-[13px] font-semibold text-[#d1d5db] truncate"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {w.handle}
            </p>
            <p
              className="text-[10px] text-[#6b7280]/60 tracking-wide"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {isX ? "via X / Twitter" : "via Reddit"}
            </p>
          </div>
        </div>

        {/* Platform badge */}
        <div
          className="shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-full"
          style={{
            background: isX
              ? "rgba(255,255,255,0.04)"
              : "rgba(255,69,0,0.07)",
            border: isX
              ? "1px solid rgba(255,255,255,0.07)"
              : "1px solid rgba(255,69,0,0.14)",
          }}
        >
          <span className={isX ? "text-[#d1d5db]/50" : "text-[#ff4500]/55"}>
            {isX ? <XIcon /> : <RedditIcon />}
          </span>
        </div>
      </div>

      {/* ── Quote mark + content ── */}
      <div className="relative pl-3">
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px rounded-full"
          style={{ background: "linear-gradient(to bottom, rgba(184,134,11,0.45), rgba(184,134,11,0.05))" }}
        />
        <p
          className="text-[13.5px] leading-[1.85] text-[#b0b7c3]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {w.content}
        </p>
      </div>

      {/* ── Engagement metrics ── */}
      <div
        className="flex items-center gap-4 pt-1 mt-auto"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        {[
          { icon: "💬", val: w.replies },
          { icon: "🔁", val: w.reposts },
          { icon: "❤️", val: w.likes },
        ].map(({ icon, val }) => (
          <span
            key={icon}
            className="flex items-center gap-1 text-[11px] text-[#6b7280]/50"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span className="text-[12px]">{icon}</span>
            {val}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section container — stagger parent
───────────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function SocialProof() {
  return (
    <section id="social" className="relative px-4 sm:px-8 lg:px-16 pb-24 max-w-7xl mx-auto">

      {/* ── Section header ── */}
      <div className="text-center mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(184,134,11,0.18))" }} />
          <span
            className="text-[#b8860b]/28 text-[10px] tracking-[0.5em] uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            ✦  Community  ✦
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
          Echoes from{" "}
          <span className="text-gold-gradient">the Void</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-[13.5px] text-[#9ca3af]/50 max-w-md mx-auto"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Thousands of fan theories brought to life. These are the voices that pierced the veil.
        </motion.p>
      </div>

      {/* ── 3-column staggered grid ── */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {WHISPERS.map((w) => (
          <WhisperCard key={w.id} w={w} />
        ))}
      </motion.div>

      {/* ── Bottom stat strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-14"
      >
        {[
          { value: "48,000+", label: "Reveals Generated" },
          { value: "12,000+", label: "Active Theorists" },
          { value: "4.9 / 5", label: "Community Rating" },
        ].map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span
              className="text-2xl font-semibold text-gold-gradient"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {value}
            </span>
            <span
              className="text-[11px] tracking-[0.2em] uppercase text-[#6b7280]/45"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

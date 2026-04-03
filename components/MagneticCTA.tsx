"use client";

import { motion } from "framer-motion";

interface MagneticCTAProps {
  label?: string;
  href?: string;
}

export default function MagneticCTA({
  label = "Unlock High-Res Truths",
  href = "#pricing",
}: MagneticCTAProps) {
  return (
    <div className="flex justify-center py-2">
      <motion.a
        href={href}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative group flex items-center gap-3 px-7 py-3.5 rounded-full"
        style={{
          background: "rgba(8,3,3,0.55)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(184,134,11,0.22)",
          boxShadow: "0 0 24px rgba(153,0,0,0.10), 0 0 0 1px rgba(184,134,11,0.06) inset",
          textDecoration: "none",
        }}
      >
        {/* Ambient glow — expands on hover */}
        <motion.span
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(153,0,0,0.14) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Tiny pulsing eye dot */}
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0"
          animate={{ opacity: [0.45, 1, 0.45], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        {/* Label */}
        <span
          className="relative z-10 text-[12px] tracking-[0.18em] uppercase transition-colors duration-300"
          style={{
            fontFamily: "var(--font-heading)",
            color: "rgba(184,134,11,0.65)",
          }}
        >
          {label}
        </span>

        {/* Arrow */}
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          className="relative z-10 w-3.5 h-3.5 shrink-0 transition-all duration-300 group-hover:translate-x-0.5"
          style={{ color: "rgba(184,134,11,0.45)" }}
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </motion.a>
    </div>
  );
}

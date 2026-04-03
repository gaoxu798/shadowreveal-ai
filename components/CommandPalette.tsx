"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Icons
───────────────────────────────────────────────────────────── */
function IconGallery() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.3} className="w-4 h-4 shrink-0">
      <rect x="1" y="1" width="14" height="14" rx="2" />
      <circle cx="5.5" cy="5.5" r="1.2" />
      <path d="M15 10.5l-4-4L6 12" />
    </svg>
  );
}
function IconScroll() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.3} className="w-4 h-4 shrink-0">
      <path d="M3 2h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V3a1 1 0 0 1 1-1z" />
      <path d="M5 6h6M5 9h4" />
    </svg>
  );
}
function IconCrown() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.3} className="w-4 h-4 shrink-0">
      <path d="M2 12h12M3 12L2 5l3.5 3L8 2l2.5 6L14 5l-1 7" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
function IconEye() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.3} className="w-4 h-4 shrink-0">
      <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" />
      <circle cx="8" cy="8" r="2" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Commands
───────────────────────────────────────────────────────────── */
const COMMANDS = [
  {
    group: "Navigate",
    items: [
      { id: "gallery",  label: "Go to Gallery",         icon: <IconGallery />, action: () => { document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" }); } },
      { id: "pricing",  label: "View Pacts (Pricing)",  icon: <IconCrown />,   action: () => { document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); } },
      { id: "reveal",   label: "Initiate Reveal",       icon: <IconEye />,     action: () => { window.scrollTo({ top: 0, behavior: "smooth" }); } },
    ],
  },
  {
    group: "Lore",
    items: [
      { id: "theories", label: "Archive of Queries (FAQ)", icon: <IconScroll />, action: () => { document.getElementById("social")?.scrollIntoView({ behavior: "smooth" }); } },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   Command Palette
───────────────────────────────────────────────────────────── */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  /* Cmd+K / Ctrl+K toggle */
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen((v) => !v);
    }
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const run = (action: () => void) => {
    setOpen(false);
    // slight delay so close animation plays before scroll
    setTimeout(action, 180);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(3,3,3,0.72)", backdropFilter: "blur(6px)" }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Palette */}
          <motion.div
            key="palette"
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[20vh] left-1/2 -translate-x-1/2 z-[61] w-full max-w-lg px-4"
          >
            <Command
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(8,4,4,0.88)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(184,134,11,0.18)",
                boxShadow:
                  "0 0 0 1px rgba(220,38,38,0.08) inset, 0 24px 80px rgba(0,0,0,0.8), 0 0 40px rgba(100,0,0,0.12)",
              }}
            >
              {/* Search input */}
              <div
                className="flex items-center gap-3 px-4 py-3.5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                {/* Grimoire icon */}
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.3} className="w-4 h-4 shrink-0" style={{ color: "rgba(184,134,11,0.45)" }}>
                  <circle cx="9" cy="9" r="6" />
                  <path d="M15 15l4 4" strokeLinecap="round" />
                </svg>
                <Command.Input
                  placeholder="Search the Grimoire..."
                  className="flex-1 bg-transparent outline-none text-[13.5px] placeholder:text-[#4b5563]"
                  style={{ fontFamily: "var(--font-body)", color: "#d1d5db" }}
                />
                {/* Esc hint */}
                <kbd
                  className="hidden sm:flex px-1.5 py-0.5 rounded text-[10px] tracking-wider"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(107,114,128,0.7)",
                  }}
                >
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <Command.List className="max-h-72 overflow-y-auto px-2 py-2">
                <Command.Empty
                  className="py-8 text-center text-[12px] text-[#4b5563]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  No ancient records found.
                </Command.Empty>

                {COMMANDS.map((group) => (
                  <Command.Group
                    key={group.group}
                    heading={group.group}
                    className="mb-1"
                  >
                    {/* Group heading injected via CSS — styled below */}
                    {group.items.map((item) => (
                      <Command.Item
                        key={item.id}
                        value={item.label}
                        onSelect={() => run(item.action)}
                        className="
                          flex items-center gap-3 px-3 py-2.5 rounded-lg
                          cursor-pointer transition-colors duration-150
                          aria-selected:bg-[rgba(153,0,0,0.18)]
                        "
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <span style={{ color: "rgba(184,134,11,0.55)" }}>{item.icon}</span>
                        <span className="text-[13px] text-[#c8c8c8]/80">{item.label}</span>
                        {/* Enter hint — shows on aria-selected */}
                        <kbd
                          className="ml-auto hidden sm:flex px-1.5 py-0.5 rounded text-[10px]"
                          style={{
                            fontFamily: "var(--font-body)",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            color: "rgba(107,114,128,0.5)",
                          }}
                        >
                          ↵
                        </kbd>
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>

              {/* Footer bar */}
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
              >
                <span
                  className="text-[10px] tracking-[0.25em] uppercase"
                  style={{ fontFamily: "var(--font-body)", color: "rgba(184,134,11,0.28)" }}
                >
                  The Grimoire
                </span>
                <div className="flex items-center gap-3">
                  {[["↑↓", "navigate"], ["↵", "select"], ["esc", "close"]].map(([key, desc]) => (
                    <span
                      key={key}
                      className="flex items-center gap-1 text-[10px]"
                      style={{ fontFamily: "var(--font-body)", color: "rgba(107,114,128,0.45)" }}
                    >
                      <kbd
                        className="px-1 py-0.5 rounded"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "rgba(156,163,175,0.5)",
                        }}
                      >
                        {key}
                      </kbd>
                      {desc}
                    </span>
                  ))}
                </div>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

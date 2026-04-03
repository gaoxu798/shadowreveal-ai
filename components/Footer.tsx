import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   Social icons — inline SVG
───────────────────────────────────────────────────────────── */
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L2.25 2.25h6.985l4.262 5.637 4.747-5.637zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function RedditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Link groups
───────────────────────────────────────────────────────────── */
const LEGAL_LINKS = [
  { label: "Terms of Service",  href: "/terms"   },
  { label: "Privacy Policy",    href: "/privacy" },
  { label: "Refund Policy",     href: "/refund"  },
];

const SUPPORT_LINKS = [
  { label: "Contact / Support", href: "/support" },
  { label: "DMCA Takedown",     href: "/dmca"    },
  { label: "FAQ",               href: "/faq"     },
];

/* ─────────────────────────────────────────────────────────────
   Footer
───────────────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer
      style={{
        background: "#030303",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* ── Top section: 3 columns ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">

          {/* Col 1 — Brand + socials */}
          <div className="flex flex-col gap-4">
            <span
              className="text-[15px] tracking-[0.16em] uppercase"
              style={{
                fontFamily: "var(--font-heading)",
                background: "linear-gradient(135deg, #8a6914 0%, #b8860b 50%, #8a6914 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ShadowReveal
              <span
                style={{
                  WebkitTextFillColor: "rgba(184,134,11,0.38)",
                  fontSize: "0.65em",
                  verticalAlign: "super",
                  letterSpacing: "0.3em",
                  marginLeft: "2px",
                }}
              >
                .AI
              </span>
            </span>

            <p
              className="text-[12px] leading-[1.8] text-zinc-600 max-w-[220px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              AI-powered fan theory visualization. Piercing the Void Century — one reveal at a time.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {[
                { icon: <XIcon />,      label: "X / Twitter" },
                { icon: <RedditIcon />, label: "Reddit"      },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  aria-label={label}
                  title="Coming soon"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-700 cursor-not-allowed select-none"
                  style={{ border: "1px solid rgba(255,255,255,0.04)" }}
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {/* Col 2 — Legal */}
          <div className="flex flex-col gap-3">
            <p
              className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 mb-1"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Legal
            </p>
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="
                  text-[12.5px] text-zinc-600 hover:text-zinc-400
                  transition-colors duration-200 w-fit
                "
                style={{ fontFamily: "var(--font-body)" }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Col 3 — Support */}
          <div className="flex flex-col gap-3">
            <p
              className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 mb-1"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Support
            </p>
            {SUPPORT_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="
                  text-[12.5px] text-zinc-600 hover:text-zinc-400
                  transition-colors duration-200 w-fit
                "
                style={{ fontFamily: "var(--font-body)" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.035)" }}
      />

      {/* ── Disclaimer block ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-7">
        <p
          className="text-[11px] leading-[1.95] text-zinc-600/70 max-w-4xl"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span className="text-zinc-500">Disclaimer:</span>{" "}
          ShadowReveal.AI is an independent fan-theory AI visualization tool created for entertainment and
          creative expression purposes only. It is not affiliated with, endorsed by, or sponsored by
          Eiichiro Oda, Shueisha, Toei Animation, Viz Media, or any other official anime studio, publisher,
          or rights holder. All character concepts referenced are the intellectual property of their
          respective owners. User-generated content must comply with our{" "}
          <Link href="/terms" className="text-zinc-500 hover:text-zinc-400 transition-colors duration-200 underline underline-offset-2">
            Terms of Service
          </Link>
          . DMCA takedown requests can be submitted via our{" "}
          <Link href="/dmca" className="text-zinc-500 hover:text-zinc-400 transition-colors duration-200 underline underline-offset-2">
            support channel
          </Link>
          . This tool operates under principles of fair use for fan commentary and non-commercial transformative works.
        </p>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.025)" }}
      >
        <p
          className="text-[11px] text-zinc-700"
          style={{ fontFamily: "var(--font-body)" }}
        >
          © {new Date().getFullYear()} ShadowReveal.AI — All rights reserved.
        </p>
        <p
          className="text-[11px] text-zinc-700/60 tracking-wide"
          style={{ fontFamily: "var(--font-body)" }}
        >
          The void remembers everything.
        </p>
      </div>
    </footer>
  );
}

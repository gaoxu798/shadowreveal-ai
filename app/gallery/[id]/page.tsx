import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { GALLERY_ITEMS, getItemBySlug } from "@/lib/gallery-data";

/* ─────────────────────────────────────────────────────────────
   Static params — pre-renders all 7 theory pages at build time
───────────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return GALLERY_ITEMS.map((item) => ({ id: item.slug }));
}

/* ─────────────────────────────────────────────────────────────
   Dynamic metadata per theory
───────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = getItemBySlug(id);
  if (!item) return { title: "Theory Not Found — ShadowReveal.AI" };

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    openGraph: {
      title: item.seoTitle,
      description: item.seoDescription,
      images: [{ url: item.imageUrl, width: 480, alt: item.seoTitle }],
      type: "article",
    },
    keywords: [
      "Imu face reveal",
      "Im-sama",
      "One Piece theory",
      item.slug.replace(/-/g, " "),
      "ShadowReveal AI",
    ],
  };
}

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */
export default async function TheoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getItemBySlug(id);
  if (!item) notFound();

  return (
    <div
      className="min-h-screen"
      style={{ background: "#030303", color: "#d1d5db" }}
    >
      {/* ── Cinematic hero: full-width image with overlay ── */}
      <div className="relative w-full" style={{ maxHeight: "85vh", overflow: "hidden" }}>
        {/* Image */}
        <img
          src={item.imageUrl}
          alt={item.seoTitle}
          className="w-full object-cover object-top"
          style={{ maxHeight: "85vh" }}
        />

        {/* Bottom gradient fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(3,3,3,0.25) 0%, transparent 35%, rgba(3,3,3,0.7) 70%, #030303 100%)",
          }}
        />

        {/* Back arrow */}
        <Link
          href="/#gallery"
          className="absolute top-6 left-6 flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase transition-colors duration-200 text-[rgba(184,134,11,0.6)] hover:text-[rgba(184,134,11,1)]"
          style={{
            fontFamily: "var(--font-body)",
          }}
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10H5M10 5l-5 5 5 5" />
          </svg>
          Gallery
        </Link>

        {/* Author + date badge */}
        <div
          className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(3,3,3,0.65)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(184,134,11,0.18)",
          }}
        >
          <span
            className="text-[10px] tracking-wider"
            style={{ fontFamily: "var(--font-body)", color: "rgba(184,134,11,0.55)" }}
          >
            {item.author}  ·  {item.date}
          </span>
        </div>
      </div>

      {/* ── Theory content ── */}
      <div className="max-w-3xl mx-auto px-6 sm:px-10 pt-10 pb-24">

        {/* Eyebrow */}
        <p
          className="mb-4 text-[10px] tracking-[0.4em] uppercase"
          style={{ fontFamily: "var(--font-body)", color: "rgba(184,134,11,0.5)" }}
        >
          Imu Face Reveal · Community Theory
        </p>

        {/* H1 — SEO-rich, contains slug keywords */}
        <h1
          className="text-3xl sm:text-4xl font-semibold leading-[1.2] tracking-wide mb-6"
          style={{ fontFamily: "var(--font-heading)", color: "#d1d5db" }}
        >
          {item.seoTitle.replace(" — ShadowReveal.AI", "")}
        </h1>

        {/* Gold divider */}
        <div
          className="mb-8 h-px w-24"
          style={{
            background: "linear-gradient(to right, rgba(184,134,11,0.5), transparent)",
          }}
        />

        {/* Prompt / theory body */}
        <p
          className="text-[15px] leading-[2.0] mb-4"
          style={{ fontFamily: "var(--font-body)", color: "rgba(184,134,11,0.75)", fontStyle: "italic" }}
        >
          &ldquo;{item.prompt}&rdquo;
        </p>

        <p
          className="text-[14px] leading-[1.95] mb-10"
          style={{ fontFamily: "var(--font-body)", color: "rgba(156,163,175,0.65)" }}
        >
          {item.seoDescription}
        </p>

        {/* ── CTA — links back to homepage generator ── */}
        <div
          className="rounded-2xl px-7 py-8 flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{
            background: "radial-gradient(ellipse 80% 80% at 50% 0%, rgba(80,0,0,0.22) 0%, rgba(6,2,2,0.5) 100%)",
            border: "1px solid rgba(220,38,38,0.18)",
            boxShadow: "0 0 32px rgba(100,0,0,0.12)",
          }}
        >
          <div>
            <p
              className="text-[16px] font-semibold text-[#d1d5db] mb-1"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Your theory deserves a reveal.
            </p>
            <p
              className="text-[12.5px] text-[#9ca3af]/50"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Describe the sovereign and let the AI pierce the void.
            </p>
          </div>

          <Link
            href="/"
            className="shrink-0 px-7 py-3.5 rounded-xl text-[13px] tracking-[0.1em] font-medium transition-all duration-250"
            style={{
              fontFamily: "var(--font-heading)",
              background: "linear-gradient(135deg, #7a0000 0%, #3d0000 60%, #1a0000 100%)",
              color: "#e5c97e",
              border: "1px solid rgba(220,38,38,0.28)",
              boxShadow: "0 0 18px rgba(153,0,0,0.28)",
            }}
          >
            Create Your Own Theory →
          </Link>
        </div>

        {/* ── Internal links to other theories ── */}
        <div className="mt-14">
          <p
            className="mb-5 text-[10px] tracking-[0.35em] uppercase"
            style={{ fontFamily: "var(--font-body)", color: "rgba(184,134,11,0.3)" }}
          >
            More Theories from the Void
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GALLERY_ITEMS.filter((g) => g.slug !== item.slug)
              .slice(0, 4)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/gallery/${related.slug}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group border border-[rgba(255,255,255,0.04)] hover:border-[rgba(184,134,11,0.18)]"
                  style={{
                    background: "rgba(8,4,4,0.35)",
                  }}
                >
                  <img
                    src={related.imageUrl}
                    alt={related.seoTitle}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                  <span
                    className="text-[12px] leading-snug line-clamp-2"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "rgba(156,163,175,0.55)",
                    }}
                  >
                    {related.seoTitle.replace(" — ShadowReveal.AI", "")}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

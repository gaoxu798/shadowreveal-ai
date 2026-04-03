import Link from "next/link";

export default function LegalLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen px-6 sm:px-10 lg:px-16 py-20 max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase mb-12 transition-colors duration-200"
        style={{ fontFamily: "var(--font-body)", color: "rgba(184,134,11,0.55)" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Home
      </Link>

      <div
        className="mb-2 text-[10px] tracking-[0.45em] uppercase"
        style={{ fontFamily: "var(--font-body)", color: "rgba(184,134,11,0.45)" }}
      >
        ShadowReveal.AI
      </div>
      <h1
        className="text-3xl sm:text-4xl font-semibold mb-3"
        style={{ fontFamily: "var(--font-heading)", color: "rgba(228,228,231,0.92)" }}
      >
        {title}
      </h1>
      <p
        className="text-[13px] mb-10"
        style={{ fontFamily: "var(--font-body)", color: "rgba(156,163,175,0.55)" }}
      >
        {subtitle}
      </p>

      <div
        className="h-px w-full mb-10"
        style={{ background: "linear-gradient(to right, rgba(153,0,0,0.3), transparent)" }}
      />

      <div
        className="prose prose-sm max-w-none space-y-6"
        style={{ fontFamily: "var(--font-body)", color: "rgba(156,163,175,0.78)", lineHeight: "1.9" }}
      >
        {children}
      </div>

      <div
        className="h-px w-full mt-16 mb-8"
        style={{ background: "linear-gradient(to right, rgba(153,0,0,0.2), transparent)" }}
      />
      <p
        className="text-[11px]"
        style={{ fontFamily: "var(--font-body)", color: "rgba(107,114,128,0.4)" }}
      >
        © {new Date().getFullYear()} ShadowReveal.AI — All rights reserved.
      </p>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";

export default function PaymentCancel() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#030303" }}>
      <div className="text-center max-w-md">
        <div className="text-5xl mb-6">🕯️</div>
        <h1 style={{ fontFamily: "var(--font-heading)", color: "rgba(184,134,11,0.7)", fontSize: "1.3rem", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>
          THE RITUAL WAS ABANDONED
        </h1>
        <p style={{ color: "rgba(156,163,175,0.6)", fontFamily: "var(--font-body)", fontSize: "0.875rem", marginBottom: "2rem" }}>
          No charges were made. The void awaits when you&apos;re ready.
        </p>
        <button
          onClick={() => router.push("/#pricing")}
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(228,228,231,0.8)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "0.6rem 1.5rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            cursor: "pointer",
          }}
        >
          Return to Pacts
        </button>
      </div>
    </div>
  );
}

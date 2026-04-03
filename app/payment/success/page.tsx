"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Status = "loading" | "success" | "error";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) { setStatus("error"); return; }

    fetch("/api/paypal/capture-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: token }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setCredits(data.credits);
          setStatus("success");
          setTimeout(() => router.push("/"), 4000);
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [searchParams, router]);

  return (
    <div className="text-center max-w-md">
      {status === "loading" && (
        <>
          <div className="w-14 h-14 rounded-full border-2 animate-spin mx-auto mb-6"
            style={{ borderColor: "rgba(184,134,11,0.6)", borderTopColor: "transparent" }} />
          <p style={{ fontFamily: "var(--font-heading)", color: "rgba(184,134,11,0.8)", letterSpacing: "0.15em" }}>
            SEALING THE PACT...
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="text-5xl mb-6">⚜️</div>
          <h1 style={{ fontFamily: "var(--font-heading)", color: "#c9a040", fontSize: "1.4rem", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>
            THE PACT IS SEALED
          </h1>
          <p style={{ color: "rgba(209,213,219,0.7)", fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
            {credits} credits now bound to your soul.
          </p>
          <p style={{ color: "rgba(156,163,175,0.5)", fontFamily: "var(--font-body)", fontSize: "0.8rem", marginTop: "1rem" }}>
            Returning to the void...
          </p>
        </>
      )}

      {status === "error" && (
        <>
          <div className="text-5xl mb-6">⚠️</div>
          <h1 style={{ fontFamily: "var(--font-heading)", color: "#dc2626", fontSize: "1.2rem", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
            SOMETHING WENT WRONG
          </h1>
          <p style={{ color: "rgba(209,213,219,0.6)", fontFamily: "var(--font-body)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
            Your payment may have been processed. Contact support if credits were not added.
          </p>
          <button onClick={() => router.push("/")}
            style={{ fontFamily: "var(--font-body)", color: "rgba(184,134,11,0.8)", fontSize: "0.85rem", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}>
            Return home
          </button>
        </>
      )}
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#030303" }}>
      <Suspense fallback={
        <div className="w-14 h-14 rounded-full border-2 animate-spin"
          style={{ borderColor: "rgba(184,134,11,0.6)", borderTopColor: "transparent" }} />
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}

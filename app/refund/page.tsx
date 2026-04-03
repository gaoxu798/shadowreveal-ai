import type { Metadata } from "next";
import LegalLayout from "@/app/legal-layout";

export const metadata: Metadata = {
  title: "Refund Policy — ShadowReveal.AI",
  description: "ShadowReveal.AI refund and credit policy for all purchase tiers.",
};

export default function RefundPage() {
  return (
    <LegalLayout title="Refund Policy" subtitle="Last updated: April 2026">
      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>Overview</h2>
        <p>All purchases on ShadowReveal.AI are one-time credit packs with no subscriptions or recurring charges. We strive to be fair and transparent about our refund policy.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>Used Credits</h2>
        <p>Credits that have already been used for generation are non-refundable. Each generation consumes GPU compute resources that are irreversible. This applies regardless of satisfaction with the output.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>Unused Credits</h2>
        <p>Unused credits may be refunded within <strong style={{ color: "rgba(184,134,11,0.85)" }}>7 days</strong> of purchase, provided no credits from that pack have been used. To request a refund, contact us via the <a href="/support" style={{ color: "rgba(184,134,11,0.75)" }}>support page</a> with your PayPal transaction ID.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>Technical Failures</h2>
        <p>If a generation failed due to a technical error on our end (server error, API timeout, blank output), we will restore the deducted credit to your account. Please contact us within <strong style={{ color: "rgba(184,134,11,0.85)" }}>48 hours</strong> of the failed generation with the approximate time and your account email.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>Credit Expiry</h2>
        <p>Credits on ShadowReveal.AI never expire. Once purchased, your credits remain available indefinitely regardless of account inactivity.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>How to Request</h2>
        <p>All refund and credit restore requests must be submitted through our <a href="/support" style={{ color: "rgba(184,134,11,0.75)" }}>support page</a>. We aim to process all requests within 3 business days.</p>
      </section>
    </LegalLayout>
  );
}

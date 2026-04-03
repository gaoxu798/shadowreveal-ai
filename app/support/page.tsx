import type { Metadata } from "next";
import LegalLayout from "@/app/legal-layout";

export const metadata: Metadata = {
  title: "Contact & Support — ShadowReveal.AI",
  description: "Get help with ShadowReveal.AI — credit issues, technical problems, account questions, and DMCA requests.",
};

export default function SupportPage() {
  return (
    <LegalLayout title="Contact & Support" subtitle="The void hears all. We respond within 48 hours.">
      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>How to Reach Us</h2>
        <p>For all support requests, please email us at <span style={{ color: "rgba(184,134,11,0.85)" }}>support@shadowreveal.ai</span>. Include your account email and a description of your issue. We aim to respond within 48 hours on business days.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>Credit & Billing Issues</h2>
        <p>If your credits were not applied after payment, or if a generation failed and your credit was deducted, please include your PayPal transaction ID and the approximate time of the issue. We will investigate and resolve within 3 business days.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>Technical Problems</h2>
        <p>For bugs or unexpected behavior, please describe what happened, what you expected, and include a screenshot if possible. Mention your browser and device type so we can reproduce the issue.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>Refund Requests</h2>
        <p>To request a refund for unused credits within 7 days of purchase, please see our <a href="/refund" style={{ color: "rgba(184,134,11,0.75)" }}>Refund Policy</a> and include your PayPal transaction ID in your email.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>DMCA & Copyright</h2>
        <p>If you believe your copyrighted work has been used improperly on our platform, please submit a DMCA takedown request via our <a href="/dmca" style={{ color: "rgba(184,134,11,0.75)" }}>DMCA page</a> or email us directly with the subject line &quot;DMCA Takedown Request.&quot;</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>Response Times</h2>
        <p>Billing and credit issues: <strong style={{ color: "rgba(228,228,231,0.7)" }}>within 24 hours</strong><br />
        Technical bugs: <strong style={{ color: "rgba(228,228,231,0.7)" }}>within 48 hours</strong><br />
        DMCA requests: <strong style={{ color: "rgba(228,228,231,0.7)" }}>within 72 hours</strong><br />
        General inquiries: <strong style={{ color: "rgba(228,228,231,0.7)" }}>within 5 business days</strong></p>
      </section>
    </LegalLayout>
  );
}

import type { Metadata } from "next";
import LegalLayout from "@/app/legal-layout";

export const metadata: Metadata = {
  title: "Terms of Service — ShadowReveal.AI",
  description: "Read the Terms of Service for ShadowReveal.AI, the AI-powered Imu face reveal fan theory visualization tool.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" subtitle="Last updated: April 2026">
      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>1. Acceptance of Terms</h2>
        <p>By accessing or using ShadowReveal.AI (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>2. Description of Service</h2>
        <p>ShadowReveal.AI is an AI-powered fan theory visualization tool that generates fictional character images based on user-provided text descriptions. All content is transformative fan commentary and is not affiliated with any official anime property.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>3. User Conduct</h2>
        <p>You agree not to use the Service to generate content that is unlawful, defamatory, harassing, obscene, or that infringes on third-party intellectual property rights. We reserve the right to terminate accounts that violate these terms.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>4. Intellectual Property</h2>
        <p>All original character names, designs, and story elements referenced on this platform belong to their respective owners (Eiichiro Oda, Shueisha, Toei Animation). AI-generated outputs under Theory Crafter and Sovereign Pass tiers are owned by the user who generated them, subject to applicable law.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>5. Credits and Payments</h2>
        <p>Credits are purchased on a one-time basis and never expire. Used credits are non-refundable due to irreversible computational costs. Unused credits may be refunded within 7 days of purchase. See our <a href="/refund" style={{ color: "rgba(184,134,11,0.75)" }}>Refund Policy</a> for details.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>6. Disclaimer of Warranties</h2>
        <p>The Service is provided &quot;as is&quot; without warranty of any kind. We do not guarantee uninterrupted availability or specific output quality. AI-generated content is fictional and for entertainment purposes only.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>7. Limitation of Liability</h2>
        <p>ShadowReveal.AI shall not be liable for any indirect, incidental, or consequential damages arising from use of the Service. Our maximum liability to you shall not exceed the amount you paid in the 30 days preceding the claim.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>8. Changes to Terms</h2>
        <p>We may update these terms at any time. Continued use of the Service after changes constitutes acceptance of the new terms. Contact us at <a href="/support" style={{ color: "rgba(184,134,11,0.75)" }}>support</a> with any questions.</p>
      </section>
    </LegalLayout>
  );
}

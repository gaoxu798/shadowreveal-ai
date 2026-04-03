import type { Metadata } from "next";
import LegalLayout from "@/app/legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy — ShadowReveal.AI",
  description: "How ShadowReveal.AI collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" subtitle="Last updated: April 2026">
      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>1. Data We Collect</h2>
        <p>We collect only what is necessary to provide the Service: your email address (if you create an account), prompts you submit for generation, and payment confirmation data (we never store card numbers). We do not collect browsing history or sell personal data to third parties.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>2. How We Use Your Data</h2>
        <p>Your data is used solely to: (a) process your generations and deduct credits, (b) send transactional emails related to your account, and (c) improve model prompt quality in aggregate and anonymized form.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>3. Third-Party Services</h2>
        <p>We use PayPal for payment processing and SiliconFlow for AI image generation. These providers have their own privacy policies. We share only the minimum data required for each service to function.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>4. Cookies</h2>
        <p>We use essential cookies for session management and authentication. We do not use tracking or advertising cookies. You may disable cookies in your browser, though some features may not function correctly.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>5. Data Retention</h2>
        <p>Account data is retained for as long as your account is active. Generated images may be cached for up to 30 days. You may request deletion of your data at any time via our <a href="/support" style={{ color: "rgba(184,134,11,0.75)" }}>support page</a>.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>6. Your Rights</h2>
        <p>Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data. To exercise these rights, contact us through our <a href="/support" style={{ color: "rgba(184,134,11,0.75)" }}>support channel</a>. We will respond within 30 days.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>7. Security</h2>
        <p>All data is transmitted over HTTPS. We do not store payment credentials. Access to user data is restricted to essential personnel only. Despite our efforts, no system is 100% secure — please use a strong, unique password.</p>
      </section>
    </LegalLayout>
  );
}

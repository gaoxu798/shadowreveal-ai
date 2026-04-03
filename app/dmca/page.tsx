import type { Metadata } from "next";
import LegalLayout from "@/app/legal-layout";

export const metadata: Metadata = {
  title: "DMCA Takedown — ShadowReveal.AI",
  description: "Submit a DMCA copyright takedown request to ShadowReveal.AI.",
};

export default function DmcaPage() {
  return (
    <LegalLayout title="DMCA Takedown" subtitle="Copyright infringement notice procedure">
      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>Our Policy</h2>
        <p>ShadowReveal.AI respects intellectual property rights. We operate as a transformative fan-theory visualization tool under fair use principles. If you believe content on our platform infringes your copyright, we will investigate and act swiftly.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>How to Submit a Takedown Request</h2>
        <p>Send an email to <span style={{ color: "rgba(184,134,11,0.85)" }}>dmca@shadowreveal.ai</span> with the subject line <strong style={{ color: "rgba(228,228,231,0.7)" }}>&quot;DMCA Takedown Request&quot;</strong> and include the following:</p>
        <ul style={{ marginTop: "0.75rem", paddingLeft: "1.5rem", listStyleType: "disc" }}>
          <li>Your full legal name and contact information</li>
          <li>A description of the copyrighted work you claim has been infringed</li>
          <li>The specific URL(s) on ShadowReveal.AI where the allegedly infringing content appears</li>
          <li>A statement that you have a good faith belief the use is not authorized by the copyright owner</li>
          <li>A statement that the information in your notice is accurate, and under penalty of perjury, that you are authorized to act on behalf of the copyright owner</li>
          <li>Your physical or electronic signature</li>
        </ul>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>Response Time</h2>
        <p>We will acknowledge valid DMCA notices within <strong style={{ color: "rgba(184,134,11,0.85)" }}>72 hours</strong> and take appropriate action, which may include removing the content and terminating repeat infringers&apos; accounts.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>Counter-Notice</h2>
        <p>If you believe content was wrongfully removed, you may submit a counter-notice with your legal name, contact information, identification of the removed content, and a statement under penalty of perjury that you have a good faith belief the content was removed by mistake.</p>
      </section>

      <section>
        <h2 style={{ color: "rgba(228,228,231,0.85)", fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.5rem" }}>Abuse Warning</h2>
        <p>Submitting a false DMCA notice is a violation of the Digital Millennium Copyright Act. Misuse of the DMCA process may result in legal liability on your part.</p>
      </section>
    </LegalLayout>
  );
}

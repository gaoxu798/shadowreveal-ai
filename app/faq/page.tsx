import type { Metadata } from "next";
import LegalLayout from "@/app/legal-layout";

export const metadata: Metadata = {
  title: "FAQ — ShadowReveal.AI | Imu Face Reveal Questions Answered",
  description: "Frequently asked questions about ShadowReveal.AI — how it works, credits, commercial use, and the Imu face reveal theory.",
};

const FAQS = [
  {
    q: "What is ShadowReveal.AI?",
    a: "ShadowReveal.AI is an AI-powered fan theory visualization tool. You describe your theory of what the Void Century sovereign looks like, and our AI generates a unique character image based on your description.",
  },
  {
    q: "What is the Imu face reveal?",
    a: 'Im-sama (also spelled Imu) is the mysterious ruler of the World Government in the One Piece manga. Their face has never been officially shown, making them one of the most debated mysteries in the series. ShadowReveal.AI lets you visualize your own theory of what the sovereign looks like.',
  },
  {
    q: "Is this affiliated with the official One Piece anime or manga?",
    a: "No. ShadowReveal.AI is an independent fan project. We are not affiliated with Eiichiro Oda, Shueisha, Toei Animation, or Viz Media. All generated content is transformative fan art for entertainment purposes only.",
  },
  {
    q: "How do credits work?",
    a: "Each image generation costs 1 credit. Credits are purchased as one-time packs (no subscriptions). Credits never expire. The free tier includes 2 generations per month at no cost.",
  },
  {
    q: "Can I use the generated images commercially?",
    a: "Theory Crafter ($4.99) and Sovereign Pass ($14.99) tier holders are granted commercial usage rights for all generated content, including YouTube thumbnails, TikTok overlays, and fan merchandise.",
  },
  {
    q: "What happens if my generation fails?",
    a: "If a generation fails due to a technical error, the credit is restored to your account automatically. If it was not restored, contact us within 48 hours via our support page.",
  },
  {
    q: "Can I get a refund?",
    a: "Unused credits may be refunded within 7 days of purchase. Used credits are non-refundable. See our full Refund Policy for details.",
  },
  {
    q: "How is my data protected?",
    a: "We never store your payment card details. Only your email and prompt history are stored. You can request data deletion at any time. See our Privacy Policy for full details.",
  },
  {
    q: "What AI model generates the images?",
    a: "We use state-of-the-art AI image generation models to produce high-quality anime-style character art. Our system prompt is tuned specifically for the dark fantasy aesthetic of the Void Century.",
  },
  {
    q: "How do I contact support?",
    a: "Visit our Contact & Support page or email support@shadowreveal.ai. We respond within 48 hours on business days.",
  },
];

export default function FaqPage() {
  return (
    <LegalLayout title="FAQ" subtitle="Frequently Asked Questions">
      <div className="space-y-8">
        {FAQS.map(({ q, a }, i) => (
          <div key={i}>
            <h2 style={{ color: "rgba(228,228,231,0.9)", fontFamily: "var(--font-heading)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
              {q}
            </h2>
            <p style={{ color: "rgba(156,163,175,0.75)" }}>{a}</p>
          </div>
        ))}
      </div>
    </LegalLayout>
  );
}

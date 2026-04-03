import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FloatingCompass from "@/components/FloatingCompass";
import PageEdgeDecor from "@/components/PageEdgeDecor";
import Providers from "@/components/Providers";
import CommandPalette from "@/components/CommandPalette";
import BackgroundFX from "@/components/BackgroundFX";
import { Toaster } from "sonner";

/* ─────────────────────────────────────────────
   Fonts
   Cinzel  → headings (Roman-engraved, majestic, ancient)
   Inter   → body    (clean, neutral, modern)
───────────────────────────────────────────── */
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

/* ─────────────────────────────────────────────
   SEO Metadata
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Imu Face Reveal — ShadowReveal.AI | Unveil the Void Century Sovereign",
  description:
    "Discover the truth behind the Imu face reveal. ShadowReveal.AI uses ancient lore analysis and AI to pierce the veil of the world's most mysterious sovereign.",
  keywords: [
    "Imu face reveal",
    "Imu One Piece",
    "void century sovereign",
    "ShadowReveal AI",
    "anime mystery",
  ],
  openGraph: {
    title: "Imu Face Reveal — ShadowReveal.AI",
    description:
      "The sovereign has been hidden for 800 years. AI-powered lore analysis to reveal the face of Im-sama.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

/* ─────────────────────────────────────────────
   Root Layout
───────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <Providers>
        <BackgroundFX />
        <Navbar />
        <main className="relative z-10 pt-[72px]">{children}</main>
        <Footer />
        <PageEdgeDecor />
        <FloatingCompass />
        <CommandPalette />
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              background: "rgba(12,6,6,0.92)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "#d1d5db",
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
            },
          }}
        />
        </Providers>
      </body>
    </html>
  );
}

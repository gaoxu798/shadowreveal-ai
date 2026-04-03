import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export const runtime = "edge";

const IMAGE_PREFIX =
  "Masterpiece, extremely detailed anime style, One Piece art style, void century ancient sovereign,";
const IMAGE_SUFFIX =
  ", dark cinematic lighting, glowing scarlet eyes, ancient crown, flowing void robes, 8k resolution, dramatic shadows";

const ANON_LIMIT = 1;
const USER_LIMIT = 3;
const COOKIE_NAME = "sr_gen_count";
const PAID_COOKIE = "sr_paid_credits";

function getCount(req: NextRequest, key: string): number {
  const raw = req.cookies.get(COOKIE_NAME)?.value ?? "{}";
  try {
    const parsed = JSON.parse(raw);
    return Number(parsed[key] ?? 0);
  } catch {
    return 0;
  }
}

function buildUpdatedCookie(req: NextRequest, key: string): string {
  const raw = req.cookies.get(COOKIE_NAME)?.value ?? "{}";
  let parsed: Record<string, number> = {};
  try { parsed = JSON.parse(raw); } catch {}
  parsed[key] = (Number(parsed[key] ?? 0)) + 1;
  return JSON.stringify(parsed);
}

async function generateLoreText(userPrompt: string, apiKey: string): Promise<string> {
  const res = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek-ai/DeepSeek-V3",
      messages: [
        {
          role: "system",
          content:
            "You are a dark fantasy lore narrator for a One Piece fan site. Based on the user's character theory, write a vivid, atmospheric 2-3 sentence description of this ancient sovereign. Use poetic, ominous language. Do not mention any real One Piece character names. Output only the description, no quotes or labels.",
        },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 180,
      temperature: 0.85,
    }),
  });

  if (!res.ok) return "";
  const data = await res.json();
  return (data?.choices?.[0]?.message?.content ?? "").trim();
}

export async function POST(req: NextRequest) {
  try {
    // ── Auth & quota check ──────────────────────────────────
    const session = await auth();
    const userId = session?.user?.id;

    // Check paid credits first
    const paidCredits = parseInt(req.cookies.get(PAID_COOKIE)?.value ?? "0") || 0;

    const cookieKey = userId ?? "anon";
    const limit = userId ? USER_LIMIT : ANON_LIMIT;
    const used = getCount(req, cookieKey);

    const hasPaidCredits = paidCredits > 0;

    if (!hasPaidCredits && used >= limit) {
      return NextResponse.json(
        {
          error: userId
            ? "You've used all 3 free generations. Upgrade for unlimited access."
            : "Sign in with Google to get 3 free generations.",
          limitReached: true,
          isLoggedIn: !!userId,
        },
        { status: 429 }
      );
    }

    // ── Parse body ──────────────────────────────────────────
    const body = await req.json();
    const userPrompt: string = (body.prompt ?? "").trim();

    if (!userPrompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const apiKey = process.env.SILICONFLOW_KEY ?? "";
    const fullImagePrompt = `${IMAGE_PREFIX} ${userPrompt}${IMAGE_SUFFIX}`;

    // ── Generate image + lore in parallel ───────────────────
    const [imageRes, loreText] = await Promise.all([
      fetch("https://api.siliconflow.cn/v1/image/generations", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model:      "Kwai-Kolors/Kolors",
          prompt:     fullImagePrompt,
          image_size: "1024x1024",
        }),
      }),
      generateLoreText(userPrompt, apiKey),
    ]);

    if (!imageRes.ok) {
      const errText = await imageRes.text();
      console.error("[generate] SiliconFlow image error:", errText);
      return NextResponse.json(
        { error: "Image generation failed. Please try again." },
        { status: imageRes.status }
      );
    }

    const imageData = await imageRes.json();
    const imageUrl: string | undefined = imageData?.images?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image returned from provider." },
        { status: 502 }
      );
    }

    // ── Deduct paid credit or increment free counter ────────
    const response = NextResponse.json({
      imageUrl,
      loreText,
      creditsRemaining: hasPaidCredits ? paidCredits - 1 : undefined,
    });

    if (hasPaidCredits) {
      response.cookies.set(PAID_COOKIE, String(paidCredits - 1), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
        path: "/",
      });
    } else {
      const updatedCookie = buildUpdatedCookie(req, cookieKey);
      response.cookies.set(COOKIE_NAME, updatedCookie, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
        path: "/",
      });
    }

    return response;
  } catch (err) {
    console.error("[generate] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

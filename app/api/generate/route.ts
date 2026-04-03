import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const IMAGE_PREFIX =
  "Masterpiece, extremely detailed anime style, One Piece art style, void century ancient sovereign,";
const IMAGE_SUFFIX =
  ", dark cinematic lighting, glowing scarlet eyes, ancient crown, flowing void robes, 8k resolution, dramatic shadows";

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
        {
          role: "user",
          content: userPrompt,
        },
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
    const body = await req.json();
    const userPrompt: string = (body.prompt ?? "").trim();

    if (!userPrompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const apiKey = process.env.SILICONFLOW_KEY ?? "";
    const fullImagePrompt = `${IMAGE_PREFIX} ${userPrompt}${IMAGE_SUFFIX}`;

    // Run image generation and lore text in parallel
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

    return NextResponse.json({ imageUrl, loreText });
  } catch (err) {
    console.error("[generate] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

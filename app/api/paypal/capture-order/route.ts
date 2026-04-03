import { NextRequest, NextResponse } from "next/server";
import { getPayPalAccessToken, capturePayPalOrder, PLANS, type PlanId } from "@/lib/paypal";

export const runtime = "edge";

const CREDITS_COOKIE = "sr_paid_credits";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();
    if (!orderId) return NextResponse.json({ error: "Missing orderId" }, { status: 400 });

    const accessToken = await getPayPalAccessToken();
    const capture = await capturePayPalOrder(orderId, accessToken);

    if (capture.status !== "COMPLETED") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
    }

    // Get plan from custom_id in capture response
    const planId = capture.purchase_units?.[0]?.payments?.captures?.[0]?.custom_id as PlanId;
    const plan = PLANS[planId];
    if (!plan) return NextResponse.json({ error: "Unknown plan" }, { status: 400 });

    // Read existing paid credits from cookie
    const existing = req.cookies.get(CREDITS_COOKIE)?.value;
    let currentCredits = 0;
    try { currentCredits = existing ? parseInt(existing) : 0; } catch {}

    const newCredits = currentCredits + plan.credits;

    const response = NextResponse.json({
      success: true,
      credits: newCredits,
      added: plan.credits,
    });

    response.cookies.set(CREDITS_COOKIE, String(newCredits), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[paypal/capture-order]", err);
    return NextResponse.json({ error: "Failed to capture payment" }, { status: 500 });
  }
}

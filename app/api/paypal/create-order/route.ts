import { NextRequest, NextResponse } from "next/server";
import { getPayPalAccessToken, createPayPalOrder, PLANS, type PlanId } from "@/lib/paypal";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { planId } = await req.json();

    if (!planId || !(planId in PLANS)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const baseUrl = new URL(req.url).origin;
    const accessToken = await getPayPalAccessToken();
    const order = await createPayPalOrder(planId as PlanId, accessToken, baseUrl);

    // Find approval URL from PayPal response links
    const approvalUrl = order.links?.find(
      (l: { rel: string; href: string }) => l.rel === "approve"
    )?.href;

    if (!approvalUrl) throw new Error("No approval URL from PayPal");

    return NextResponse.json({ orderId: order.id, approvalUrl });
  } catch (err) {
    console.error("[paypal/create-order]", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

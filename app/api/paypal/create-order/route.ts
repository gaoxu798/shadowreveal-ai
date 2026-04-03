import { NextRequest, NextResponse } from "next/server";
import { getPayPalAccessToken, createPayPalOrder, PLANS, type PlanId } from "@/lib/paypal";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { planId } = await req.json();

    if (!planId || !(planId in PLANS)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const accessToken = await getPayPalAccessToken();
    const order = await createPayPalOrder(planId as PlanId, accessToken);

    return NextResponse.json({ orderId: order.id });
  } catch (err) {
    console.error("[paypal/create-order]", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

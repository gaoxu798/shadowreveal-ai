const PAYPAL_BASE = "https://api-m.paypal.com";

export const PLANS = {
  "crafter":   { price: "3.99",  credits: 50,  name: "Theory Crafter — 50 Reveals" },
  "sovereign": { price: "13.99", credits: 200, name: "Sovereign Pass — 200 Reveals" },
} as const;

export type PlanId = keyof typeof PLANS;

export async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID!;
  const secret   = process.env.PAYPAL_CLIENT_SECRET!;
  const creds    = btoa(`${clientId}:${secret}`);

  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) throw new Error("Failed to get PayPal access token");
  const data = await res.json();
  return data.access_token as string;
}

export async function createPayPalOrder(planId: PlanId, accessToken: string, baseUrl: string) {
  const plan = PLANS[planId];
  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{
        description: plan.name,
        amount: { currency_code: "USD", value: plan.price },
        custom_id: planId,
      }],
      application_context: {
        return_url: `${baseUrl}/payment/success`,
        cancel_url: `${baseUrl}/payment/cancel`,
        brand_name: "ShadowReveal.AI",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
      },
    }),
  });

  if (!res.ok) throw new Error("Failed to create PayPal order");
  return res.json();
}

export async function capturePayPalOrder(orderId: string, accessToken: string) {
  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to capture PayPal order");
  return res.json();
}

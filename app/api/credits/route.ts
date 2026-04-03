import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export const runtime = "edge";

const ANON_LIMIT = 1;
const USER_LIMIT = 3;

export async function GET(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;

  const paidCredits = parseInt(req.cookies.get("sr_paid_credits")?.value ?? "0") || 0;

  const cookieKey = userId ?? "anon";
  let freeUsed = 0;
  try {
    const raw = req.cookies.get("sr_gen_count")?.value ?? "{}";
    const parsed = JSON.parse(raw);
    freeUsed = Number(parsed[cookieKey] ?? 0);
  } catch {}

  const freeLimit = userId ? USER_LIMIT : ANON_LIMIT;

  return NextResponse.json({
    paid: paidCredits,
    freeUsed,
    freeLimit,
    freeRemaining: Math.max(0, freeLimit - freeUsed),
    isLoggedIn: !!userId,
  });
}

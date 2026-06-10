import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  createSessionToken,
  verifyCredentials,
} from "@/lib/adminAuth";
import { clientIp, rateLimit } from "@/lib/rateLimit";

// ─── POST — Admin login: verify credentials, issue httpOnly session cookie ───
export async function POST(request: Request) {
  // Brute-force guard: 5 attempts per 15 minutes per IP.
  if (!rateLimit(`admin-login:${clientIp(request)}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json(
      { success: false, error: "Too many login attempts. Try again later." },
      { status: 429 }
    );
  }

  let username = "";
  let password = "";
  try {
    const body = await request.json();
    username = typeof body.username === "string" ? body.username : "";
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  if (!verifyCredentials(username, password)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const token = createSessionToken();
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Admin access is not configured" },
      { status: 503 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });

  return NextResponse.json({ success: true });
}

// ─── DELETE — Admin logout: clear the session cookie ─────────────────────────
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return NextResponse.json({ success: true });
}

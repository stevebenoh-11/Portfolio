import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/adminAuth";
import { clientIp, rateLimit } from "@/lib/rateLimit";

const MAX_BODY_BYTES = 10_000;
const WEBHOOK_TIMEOUT_MS = 10_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  subject: 150,
  message: 5000,
} as const;

// ─── GET — Admin fetch all submissions (requires session cookie) ─────────────
export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE)?.value;

    if (!verifySessionToken(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const submissions = await db.submission.findMany({
      orderBy: { createdAt: "desc" },
      take: 500,
    });

    return NextResponse.json(submissions);
  } catch (error) {
    // Log the detail server-side only — never send internals to the client.
    console.error("Fetch DB Error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

// ─── POST — Handle new form submission ───────────────────────────────────────
// Flow: rate-limit → validate → save to Supabase (best-effort) → forward to n8n.
// The n8n workflow owns all notifications (email etc.) from there.
export async function POST(request: Request) {
  try {
    // 5 submissions per 15 minutes per IP keeps spam and floods off the
    // database and webhook while staying invisible to real visitors.
    if (!rateLimit(`contact:${clientIp(request)}`, 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        { success: false, error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, error: "Request too large" },
        { status: 413 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
    }

    // Honeypot: the hidden "company" field is invisible to humans — if a bot
    // filled it, pretend everything worked and drop the submission.
    if (typeof body.company === "string" && body.company.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    const field = (key: keyof typeof FIELD_LIMITS): string =>
      typeof body[key] === "string" ? (body[key] as string).trim() : "";

    const name = field("name");
    const email = field("email");
    const phone = field("phone");
    const subject = field("subject");
    const message = field("message");

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    for (const [key, limit] of Object.entries(FIELD_LIMITS)) {
      const value = field(key as keyof typeof FIELD_LIMITS);
      if (value.length > limit) {
        return NextResponse.json(
          { success: false, error: `Field "${key}" is too long (max ${limit} characters)` },
          { status: 400 }
        );
      }
    }
    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    console.log(`[Contact] Received submission from ${name} <${email}>`);

    // 1. Save to Supabase database (best-effort — powers the /admin dashboard)
    try {
      const newSubmission = await db.submission.create({
        data: {
          name,
          email,
          phone: phone || "Not Provided",
          subject: subject || "General Inquiry",
          message,
        },
      });
      console.log(`[Contact] Saved to database, id: ${newSubmission.id}`);
    } catch (dbError) {
      console.error(
        "[Contact] DB save failed (continuing to webhook):",
        dbError instanceof Error ? dbError.message : dbError
      );
    }

    // 2. Forward to the n8n webhook — this decides success/failure
    const webhookUrl = process.env.N8N_WEBHOOK_URL?.trim();
    if (!webhookUrl || !webhookUrl.startsWith("http")) {
      console.error(
        "[Contact] N8N_WEBHOOK_URL is not configured (missing, empty, or a placeholder). " +
          "Set it in .env.local — e.g. https://yourname.app.n8n.cloud/webhook/portfolio-contact — " +
          "and restart the dev server. On Vercel, add it under Project → Settings → Environment Variables."
      );
      return NextResponse.json(
        { success: false, error: "Service temporarily unavailable" },
        { status: 500 }
      );
    }

    console.log("[Contact] Forwarding to n8n webhook");
    const webhookRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // A hung webhook must not pin this request open — abort after 10s.
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      body: JSON.stringify({
        name,
        email,
        phone: phone || "Not Provided",
        subject: subject || "General Inquiry",
        message,
        submittedAt: new Date().toISOString(),
      }),
    });

    console.log(`[Contact] n8n webhook responded with status ${webhookRes.status}`);
    if (!webhookRes.ok) {
      const responseText = await webhookRes.text().catch(() => "");
      console.error(
        `[Contact] n8n webhook delivery FAILED — status ${webhookRes.status}, body: ${responseText}`
      );
      return NextResponse.json(
        { success: false, error: "Message delivery failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API POST Error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

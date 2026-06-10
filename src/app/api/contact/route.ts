import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// ─── GET — Admin fetch all submissions ───────────────────────────────────────
export async function GET(request: Request) {
  try {
    const username = request.headers.get("x-admin-username");
    const password = request.headers.get("x-admin-password");

    if (username !== "Steve-3643" || password !== "3643147") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const submissions = await db.submission.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(submissions);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("Fetch DB Error:", detail);
    return NextResponse.json({ error: "Failed to fetch submissions", detail }, { status: 500 });
  }
}

// ─── POST — Handle new form submission ───────────────────────────────────────
// Flow: validate → save to Supabase (best-effort) → forward to n8n webhook.
// The n8n workflow owns all notifications (email etc.) from there.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log(`[Contact] Received submission from ${name} <${email}>`);

    // 1. Save to Supabase database (best-effort — powers the /admin dashboard)
    let newSubmission = null;
    try {
      newSubmission = await db.submission.create({
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
        { success: false, error: "Webhook URL not configured" },
        { status: 500 }
      );
    }

    console.log(`[Contact] Forwarding to n8n webhook: ${webhookUrl}`);
    const webhookRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      return NextResponse.json({ success: false, error: "Webhook delivery failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, submission: newSubmission });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("API POST Error:", detail);
    return NextResponse.json({ success: false, error: "Internal Server Error", detail }, { status: 500 });
  }
}

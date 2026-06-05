import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import nodemailer from "nodemailer";

// ─── Send Email Notification via Gmail SMTP (Nodemailer) ─────────────────────
async function sendEmailNotification(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.warn("[Email] GMAIL_USER or GMAIL_APP_PASSWORD not set — skipping email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #e5e5e5; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #141414; border: 1px solid #222; border-radius: 16px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #7c3aed, #4f46e5); padding: 32px 36px; }
        .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; }
        .header p { color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 14px; }
        .body { padding: 32px 36px; }
        .field { margin-bottom: 20px; }
        .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #666; margin-bottom: 6px; }
        .value { font-size: 15px; color: #e5e5e5; background: #1c1c1c; border: 1px solid #2a2a2a; border-radius: 10px; padding: 12px 16px; line-height: 1.6; }
        .message-value { white-space: pre-wrap; }
        .footer { padding: 20px 36px; border-top: 1px solid #222; text-align: center; font-size: 12px; color: #444; }
        .badge { display: inline-block; background: #7c3aed22; color: #a78bfa; border: 1px solid #7c3aed44; border-radius: 6px; padding: 3px 10px; font-size: 12px; font-weight: 600; margin-bottom: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📬 New Portfolio Message</h1>
          <p>Someone just reached out via your portfolio contact form</p>
        </div>
        <div class="body">
          <div class="badge">New Submission</div>
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value">${data.email}</div>
          </div>
          <div class="field">
            <div class="label">Phone</div>
            <div class="value">${data.phone || "Not provided"}</div>
          </div>
          <div class="field">
            <div class="label">Subject</div>
            <div class="value">${data.subject || "General Inquiry"}</div>
          </div>
          <div class="field">
            <div class="label">Message</div>
            <div class="value message-value">${data.message}</div>
          </div>
        </div>
        <div class="footer">
          Sent from <strong>portfolio-stevebenoh.vercel.app</strong> · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Portfolio Contact" <${gmailUser}>`,
    to: "stevebenoh@gmail.com",
    replyTo: data.email,
    subject: `📬 New Message: ${data.subject || "Portfolio Contact"} — from ${data.name}`,
    html: htmlBody,
  });

  console.log("[Email] Notification sent to stevebenoh@gmail.com via Gmail SMTP");
}

// ─── GET — Admin fetch all submissions ───────────────────────────────────────
export async function GET(request: Request) {
  try {
    const username = request.headers.get("x-admin-username");
    const password = request.headers.get("x-admin-password");

    if (username !== "steve36" || password !== "9252825") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const submissions = await db.submission.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(submissions);
  } catch (error) {
    console.error("Fetch DB Error:", error);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

// ─── POST — Handle new form submission ───────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Save to Supabase database
    const newSubmission = await db.submission.create({
      data: {
        name,
        email,
        phone: phone || "Not Provided",
        subject: subject || "General Inquiry",
        message,
      },
    });

    // 2. Send email notification (non-blocking — DB save is the source of truth)
    sendEmailNotification({ name, email, phone: phone || "Not Provided", subject, message }).catch(
      (err) => console.error("[Email] Failed:", err)
    );

    return NextResponse.json({ success: true, submission: newSubmission });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


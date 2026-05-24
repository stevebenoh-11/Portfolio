import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import nodemailer from "nodemailer";

// ─── Email Transporter ────────────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

// ─── Send Email Notification ──────────────────────────────────────────────────
async function sendEmailNotification(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn("[Email] GMAIL_USER or GMAIL_APP_PASSWORD not set — skipping email.");
    return;
  }

  const transporter = createTransporter();

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #e5e5e5; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #141414; border: 1px solid #222; border-radius: 16px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #7c3aed, #4f46e5); padding: 32px 36px; }
        .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; }
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
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: "stevebenoh@gmail.com",
    replyTo: data.email,
    subject: `📬 New Message: ${data.subject || "Portfolio Contact"} — from ${data.name}`,
    html: htmlBody,
    text: `New portfolio message from ${data.name}\n\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\nSubject: ${data.subject || "General Inquiry"}\n\nMessage:\n${data.message}`,
  });

  console.log(`[Email] Notification sent to stevebenoh@gmail.com`);
}

// ─── Send SMS via Twilio (optional) ──────────────────────────────────────────
async function sendSmsNotification(data: {
  name: string;
  email: string;
  subject: string;
}) {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, NOTIFY_PHONE } = process.env;

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER || !NOTIFY_PHONE) {
    // Twilio not configured — silently skip
    return;
  }

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
    const body = `📬 Portfolio: New message from ${data.name} (${data.email}). Subject: "${data.subject || "General Inquiry"}". Check stevebenoh@gmail.com for details.`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: TWILIO_PHONE_NUMBER,
        To: NOTIFY_PHONE,
        Body: body,
      }),
    });

    if (response.ok) {
      console.log(`[SMS] Notification sent to ${NOTIFY_PHONE}`);
    } else {
      const err = await response.json();
      console.error("[SMS] Twilio error:", err);
    }
  } catch (err) {
    console.error("[SMS] Failed to send SMS:", err);
  }
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

    // 2. Send email notification (non-blocking — don't fail the request if email fails)
    sendEmailNotification({ name, email, phone: phone || "Not Provided", subject, message }).catch(
      (err) => console.error("[Email] Failed to send notification:", err)
    );

    // 3. Send SMS notification via Twilio (optional, non-blocking)
    sendSmsNotification({ name, email, subject }).catch(
      (err) => console.error("[SMS] Failed to send notification:", err)
    );

    return NextResponse.json({ success: true, submission: newSubmission });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

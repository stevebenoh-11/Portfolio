import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import fs from "fs";
import path from "path";

const jsonDbPath = path.join(process.cwd(), "src/data/submissions.json");

// One-time automatic migration helper from JSON to SQLite database
async function migrateJsonToDb() {
  try {
    if (fs.existsSync(jsonDbPath)) {
      const data = fs.readFileSync(jsonDbPath, "utf-8");
      const submissions = JSON.parse(data || "[]");

      if (Array.isArray(submissions) && submissions.length > 0) {
        console.log(`[Migration] Found ${submissions.length} submissions in JSON. Migrating to SQLite...`);
        for (const sub of submissions) {
          if (!sub.name || !sub.email || !sub.message) continue;

          // Check if submission already exists in SQLite
          const exists = sub.id
            ? await db.submission.findUnique({
                where: { id: sub.id },
              })
            : null;

          if (!exists) {
            await db.submission.create({
              data: {
                id: sub.id || undefined, // use existing id if present
                name: sub.name,
                email: sub.email,
                phone: sub.phone || "Not Provided",
                subject: sub.subject || "General Inquiry",
                message: sub.message,
                createdAt: sub.createdAt ? new Date(sub.createdAt) : new Date(),
              },
            });
          }
        }
        console.log(`[Migration] Migration complete. Clearing JSON file.`);
        fs.writeFileSync(jsonDbPath, JSON.stringify([]));
      }
    }
  } catch (err) {
    console.error("Migration Error:", err);
  }
}

export async function GET(request: Request) {
  try {
    // Authenticate administrative user
    const username = request.headers.get("x-admin-username");
    const password = request.headers.get("x-admin-password");

    if (username !== "steve36" || password !== "9252825") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Run the JSON migration automatically in the background
    await migrateJsonToDb();

    const submissions = await db.submission.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(submissions);
  } catch (error) {
    console.error("Fetch DB Error:", error);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Save to SQLite Database using Prisma
    const newSubmission = await db.submission.create({
      data: {
        name,
        email,
        phone: phone || "Not Provided",
        subject: subject || "General Inquiry",
        message,
      },
    });

    return NextResponse.json({ success: true, submission: newSubmission });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

# Portfolio Application Architecture & Workflows

This document explains the technical structure, components, and data workflows of Steve's Portfolio website.

---

## 1. Tech Stack Overview

*   **Framework**: Next.js 16.2.6 (App Router, Turbopack enabled)
*   **Language**: TypeScript / React 19
*   **Styling**: Tailwind CSS v4 (configured via `@tailwindcss/postcss`) with CSS variables in `globals.css`
*   **Animations**: Framer Motion
*   **Icons**: Lucide React
*   **Database & ORM**: Prisma ORM with PostgreSQL (hosted on Supabase)
*   **Automation**: n8n Webhook integration for form submissions

---

## 2. Directory Structure

```text
portfolio-app/
├── prisma/
│   ├── dev.db               # Local SQLite db (for testing/fallback)
│   └── schema.prisma        # Prisma schema defining the Submission model
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── page.tsx     # Admin dashboard showing contact submissions
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts # POST (contact form handling) & GET (fetch submissions)
│   │   ├── globals.css      # Core style definitions & custom themes
│   │   ├── layout.tsx       # Root layout wrapping metadata & typography
│   │   └── page.tsx         # Portfolio main page (homepage assembly)
│   ├── components/          # Reusable UI components
│   │   ├── AnimatedSection  # Framer Motion wrapper for fade-in animations
│   │   ├── CircuitBackground# Animated background canvas effect
│   │   ├── CTA              # Contact Form & call-to-action
│   │   ├── FAQ              # Interactive FAQ accordion
│   │   ├── Footer           # Footer layout & social buttons
│   │   ├── Hero             # Above-the-fold dynamic entry banner
│   │   ├── LegalModal       # Privacy Policy & Terms of Service dialogs
│   │   ├── Navbar           # Floating desktop header & mobile navigation drawer
│   │   ├── Pricing          # Pricing grids for services
│   │   ├── TechStrip        # Animated horizontal tech-stack conveyor
│   │   └── WhatIDo          # Core services cards
│   ├── lib/
│   │   └── db.ts            # Shared Prisma Client instance
└── .env.local               # Local secrets (ignored from Git)
```

---

## 3. Core Workflows

### A. Contact Form Submission Flow
1. **Frontend Input**: The user fills out the contact form inside `src/components/CTA.tsx` (Name, Email, Phone, Subject, Message).
2. **API Request**: The form triggers a `POST` request to the `/api/contact` route.
3. **Database Entry (Best-Effort)**: The endpoint (`src/app/api/contact/route.ts`) attempts to create a new `Submission` record in the Supabase database via Prisma:
   ```prisma
   model Submission {
     id        String   @id @default(uuid())
     name      String
     email     String
     phone     String   @default("Not Provided")
     subject   String   @default("General Inquiry")
     message   String
     createdAt DateTime @default(now())
   }
   ```
4. **N8N Automation Delivery**: If the DB save succeeds (or even fails to avoid locking the UI), the endpoint checks for a configured `N8N_WEBHOOK_URL` in `.env.local`. It then forwards the form payload to the n8n cloud webhook:
   ```json
   {
     "name": "User Name",
     "email": "user@example.com",
     "phone": "Phone number",
     "subject": "Form Subject",
     "message": "Message text",
     "submittedAt": "ISO Timestamp"
   }
   ```
5. **Automation Flow**: The n8n workspace receives this payload and manages custom notifications (e.g., email alerts, Slack alerts, CRM updates).
6. **Frontend Feedback**: The CTA form displays a success message ("Message Sent Successfully!") if n8n responds with a `200 OK` status code.

### B. Admin Dashboard Flow
1. **Navigation**: Accessing the route `/admin` renders `src/app/admin/page.tsx`.
2. **Login**: Credentials are checked by `POST /api/admin/login` against the `ADMIN_USERNAME` / `ADMIN_PASSWORD` environment variables (timing-safe comparison, max 5 attempts per 15 minutes per IP). On success the server sets an **httpOnly, sameSite=strict session cookie** signed with HMAC — credentials are never stored in the browser.
3. **Querying Database**: The dashboard requests the submissions list from `GET /api/contact`, which requires a valid session cookie (most recent 500 entries).
4. **Submissions Listing**:
   * Displays all inquiries dynamically in a list.
   * Includes client search filters, sorting, and full detail views for reading incoming messages.
5. **Logout**: `DELETE /api/admin/login` clears the session cookie. Sessions expire after 8 hours, and changing the admin password invalidates all existing sessions.

### C. Security & Resilience Measures
* **Rate limiting**: contact-form submissions and admin login attempts are limited per IP (sliding window) to block spam floods and brute-force attacks (`src/lib/rateLimit.ts`).
* **Input validation**: every contact field is type-checked, trimmed, and length-capped server-side (name ≤ 100, email ≤ 254 + format check, phone ≤ 30, subject ≤ 150, message ≤ 5000); request bodies over 10 KB are rejected.
* **Honeypot anti-spam**: the form carries a hidden `company` field — submissions from bots that fill it are silently discarded.
* **No error leakage**: database/internal error details are logged server-side only; clients receive generic messages.
* **Webhook timeout**: the n8n call aborts after 10 seconds so a hung webhook cannot pile up open connections under load.
* **Security headers** (`next.config.ts`): Content-Security-Policy, Strict-Transport-Security, X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
* **Single Prisma client** (`src/lib/db.ts`) reused per process so concurrent traffic cannot exhaust database connection slots (Supabase connection pooling via pgbouncer handles the rest).

---

## 4. UI & Visual Architecture

*   **Circuit Canvas**: `CircuitBackground.tsx` runs an HTML5 Canvas drawing program that creates animated green, purple, and blue digital nodes tracing lines in real-time, giving the page a premium developer look.
*   **Custom Theme**: Colors are managed inside `globals.css` using Modern CSS variables (`--color-background`, `--color-primary`, etc.). It supports custom card glassmorphism classes (`bg-surface`, `border-border`).
*   **Animations**: standard interactive states (hover scales, card transitions, tab swaps) are written using Framer Motion wrappers (`AnimatedSection`).

---

## 5. Required Environment Variables (.env & .env.local)

To run the application locally or deploy it to Vercel, the following variables must be configured:

```ini
# Supabase PostgreSQL connection URLs
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# n8n Webhook URL (Production path, no quotes, no trailing spaces)
N8N_WEBHOOK_URL=https://yourname.app.n8n.cloud/webhook/your-path

# Admin dashboard credentials (required — admin access is disabled without them)
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=a-long-unique-password

# Optional: explicit secret for signing admin session cookies.
# If omitted, a secret is derived from the credentials (so changing the
# password also logs out all sessions).
ADMIN_SESSION_SECRET=any-long-random-string
```

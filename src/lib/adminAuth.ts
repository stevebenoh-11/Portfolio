import { createHash, createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

// Hash both sides so buffers are always equal-length and the comparison
// reveals nothing about where the strings differ.
function safeEqual(a: string, b: string): boolean {
  const digestA = createHash("sha256").update(a).digest();
  const digestB = createHash("sha256").update(b).digest();
  return timingSafeEqual(digestA, digestB);
}

function getCredentials(): { username: string; password: string } | null {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    console.error(
      "[Auth] ADMIN_USERNAME / ADMIN_PASSWORD are not set — admin access is disabled. " +
        "Add them to .env.local (or Vercel → Settings → Environment Variables)."
    );
    return null;
  }
  return { username, password };
}

// Sessions are signed with ADMIN_SESSION_SECRET when provided; otherwise the
// secret is derived from the credentials, so changing the password also
// invalidates every existing session.
function getSessionSecret(): string | null {
  const explicit = process.env.ADMIN_SESSION_SECRET;
  if (explicit) return explicit;
  const creds = getCredentials();
  if (!creds) return null;
  return createHash("sha256")
    .update(`${creds.username}:${creds.password}:portfolio-admin-session`)
    .digest("hex");
}

export function verifyCredentials(username: string, password: string): boolean {
  const creds = getCredentials();
  if (!creds) return false;
  // Evaluate both comparisons so a wrong username costs the same time as a wrong password.
  const userOk = safeEqual(username, creds.username);
  const passOk = safeEqual(password, creds.password);
  return userOk && passOk;
}

export function createSessionToken(): string | null {
  const secret = getSessionSecret();
  if (!secret) return null;
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const signature = createHmac("sha256", secret).update(String(expiresAt)).digest("hex");
  return `${expiresAt}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const secret = getSessionSecret();
  if (!secret) return false;

  const [expiresAtRaw, signature] = token.split(".");
  if (!expiresAtRaw || !signature) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  const expected = createHmac("sha256", secret).update(expiresAtRaw).digest("hex");
  return safeEqual(signature, expected);
}

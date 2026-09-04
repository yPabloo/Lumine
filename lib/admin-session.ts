import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "lumine_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

type SessionPayload = {
  username: string;
  email: string;
  expiresAt: number;
};

export type AdminUser = {
  displayName: string;
  email: string;
  username: string;
};

export function getAdminConfiguration() {
  const username = process.env.ADMIN_USER?.trim() ?? "";
  const password = process.env.ADMIN_PASSWORD ?? "";
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? "";
  const sessionSecret = process.env.ADMIN_SESSION_SECRET ?? "";
  return { username, password, email, sessionSecret, configured: Boolean(username && password && email && sessionSecret.length >= 32) };
}

export function verifyAdminCredentials(username: string, password: string) {
  const config = getAdminConfiguration();
  if (!config.configured) return false;
  return safeEqual(username, config.username) && safeEqual(password, config.password);
}

export function createAdminSessionToken() {
  const config = getAdminConfiguration();
  if (!config.configured) throw new Error("Administração não configurada.");
  const payload: SessionPayload = { username: config.username, email: config.email, expiresAt: Date.now() + ADMIN_SESSION_MAX_AGE * 1000 };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encodedPayload}.${sign(encodedPayload, config.sessionSecret)}`;
}

export async function getAdminSessionUser(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;

  const config = getAdminConfiguration();
  if (!config.configured) return null;
  const [encodedPayload, receivedSignature, ...extra] = token.split(".");
  if (!encodedPayload || !receivedSignature || extra.length > 0) return null;
  if (!safeEqual(receivedSignature, sign(encodedPayload, config.sessionSecret))) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as SessionPayload;
    if (payload.expiresAt <= Date.now()) return null;
    if (!safeEqual(payload.username, config.username) || !safeEqual(payload.email, config.email)) return null;
    return { username: payload.username, email: payload.email, displayName: payload.username };
  } catch {
    return null;
  }
}

export function shouldUseSecureAdminCookie(request: Request) {
  if (process.env.ADMIN_COOKIE_SECURE === "true") return true;
  const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  return forwardedProtocol === "https" || new URL(request.url).protocol === "https:";
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(left: string, right: string) {
  return timingSafeEqual(createHash("sha256").update(left).digest(), createHash("sha256").update(right).digest());
}

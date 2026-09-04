import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, shouldUseSecureAdminCookie } from "@/lib/admin-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url), 303);
  response.cookies.set({ name: ADMIN_SESSION_COOKIE, value: "", httpOnly: true, secure: shouldUseSecureAdminCookie(request), sameSite: "lax", maxAge: 0, path: "/" });
  return response;
}

import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE, createAdminSessionToken, getAdminConfiguration, shouldUseSecureAdminCookie, verifyAdminCredentials } from "@/lib/admin-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const config = getAdminConfiguration();
  if (!config.configured) return NextResponse.json({ error: "A administração ainda não foi configurada." }, { status: 503 });
  try {
    const body = await request.json() as { username?: unknown; password?: unknown };
    const username = typeof body.username === "string" ? body.username : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!verifyAdminCredentials(username, password)) return NextResponse.json({ error: "Usuário ou senha incorretos." }, { status: 401 });

    const response = NextResponse.json({ authenticated: true });
    response.cookies.set({ name: ADMIN_SESSION_COOKIE, value: createAdminSessionToken(), httpOnly: true, secure: shouldUseSecureAdminCookie(request), sameSite: "lax", maxAge: ADMIN_SESSION_MAX_AGE, path: "/" });
    return response;
  } catch {
    return NextResponse.json({ error: "Solicitação de login inválida." }, { status: 400 });
  }
}

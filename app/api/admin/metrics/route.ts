import { getAdminUser } from "@/lib/admin-auth";
import { getMetrics } from "@/lib/selfhost-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await getAdminUser();
  if (!auth.authorized) return Response.json({ error: "Acesso não autorizado." }, { status: auth.user ? 403 : 401 });
  try {
    return Response.json({ metrics: getMetrics() });
  } catch (error) {
    console.error("admin_metrics_failed", error);
    return Response.json({ error: "Não foi possível carregar as métricas." }, { status: 500 });
  }
}

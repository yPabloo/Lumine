import { getAdminUser } from "@/lib/admin-auth";
import { listRegistrations, logAudit, updateRegistration } from "@/lib/selfhost-db";
import { digits, updateRegistrationSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unauthorized(configured: boolean, signedIn: boolean) {
  return Response.json(
    { error: !signedIn ? "Faça login para continuar." : configured ? "Acesso não autorizado." : "A lista de administradores ainda não foi configurada." },
    { status: signedIn ? 403 : 401 },
  );
}

export async function GET(request: Request) {
  const auth = await getAdminUser();
  if (!auth.authorized) return unauthorized(auth.configured, Boolean(auth.user));
  try {
    const url = new URL(request.url);
    const search = (url.searchParams.get("search") ?? "").trim().toLowerCase();
    const status = url.searchParams.get("status") ?? "all";
    const rows = listRegistrations();
    const numericSearch = digits(search);
    const filtered = rows.filter((row) => {
      const matchesStatus = status === "all" || row.status === status;
      const matchesSearch = !search || row.code.toLowerCase().includes(search) || row.childName.toLowerCase().includes(search) || row.guardianName.toLowerCase().includes(search) || row.guardianEmail.toLowerCase().includes(search) || (numericSearch && row.guardianCpf.includes(numericSearch));
      return matchesStatus && matchesSearch;
    });
    return Response.json({ registrations: filtered });
  } catch (error) {
    console.error("admin_list_failed", error);
    return Response.json({ error: "Não foi possível carregar as inscrições." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const auth = await getAdminUser();
  if (!auth.authorized || !auth.user) return unauthorized(auth.configured, Boolean(auth.user));
  try {
    const parsed = updateRegistrationSchema.safeParse(await request.json());
    if (!parsed.success) return Response.json({ error: "Atualização inválida." }, { status: 400 });
    const updated = updateRegistration(parsed.data.id, parsed.data.status, parsed.data.paymentStatus);
    if (!updated) return Response.json({ error: "Inscrição não encontrada." }, { status: 404 });
    logAudit(auth.user.email, updated.id, JSON.stringify({ status: updated.status, paymentStatus: updated.paymentStatus }));
    return Response.json({ registration: updated });
  } catch (error) {
    console.error("admin_update_failed", error);
    return Response.json({ error: "Não foi possível salvar a alteração." }, { status: 500 });
  }
}

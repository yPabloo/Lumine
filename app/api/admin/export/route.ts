import { getAdminUser } from "@/lib/admin-auth";
import { listAllRegistrations } from "@/lib/selfhost-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const csvCell = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;

export async function GET() {
  const auth = await getAdminUser();
  if (!auth.authorized) return Response.json({ error: "Acesso não autorizado." }, { status: auth.user ? 403 : 401 });
  try {
    const rows = listAllRegistrations();
    const header = ["Código", "Criança", "Nascimento da criança", "Responsável", "Nascimento do responsável", "CPF", "E-mail", "Telefone", "Observação", "Status", "Pagamento", "Criada em"];
    const body = rows.map((row) => [row.code, row.childName, row.childBirthDate, row.guardianName, row.guardianBirthDate, row.guardianCpf, row.guardianEmail, row.guardianPhone, row.notes, row.status, row.paymentStatus, row.createdAt].map(csvCell).join(";"));
    const csv = `\uFEFF${header.map(csvCell).join(";")}\n${body.join("\n")}`;
    return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": "attachment; filename=inscricoes-festival-lumine.csv", "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("admin_export_failed", error);
    return Response.json({ error: "Não foi possível exportar os dados." }, { status: 500 });
  }
}

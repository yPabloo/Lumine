import { findRegistrationsByCpf } from "@/lib/selfhost-db";
import { digits, lookupSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const parsed = lookupSchema.safeParse(await request.json());
    if (!parsed.success) return Response.json({ error: "Informe um CPF válido." }, { status: 400 });

    const rows = findRegistrationsByCpf(digits(parsed.data.guardianCpf));

    if (rows.length === 0) return Response.json({ error: "Nenhuma inscrição encontrada para este CPF." }, { status: 404 });
    const registrations = rows.map((row) => ({ code: row.code, childName: row.childName, status: row.status, paymentStatus: row.paymentStatus, createdAt: row.createdAt }));
    return Response.json({ registrations });
  } catch (error) {
    console.error("registration_lookup_failed", error);
    return Response.json({ error: "Não foi possível consultar agora." }, { status: 500 });
  }
}

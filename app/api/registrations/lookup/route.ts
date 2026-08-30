import { findRegistration } from "@/lib/selfhost-db";
import { digits, lookupSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const parsed = lookupSchema.safeParse(await request.json());
    if (!parsed.success) return Response.json({ error: "Confira o código e o CPF." }, { status: 400 });

    const row = findRegistration(parsed.data.code, digits(parsed.data.guardianCpf));

    if (!row) return Response.json({ error: "Inscrição não encontrada para esses dados." }, { status: 404 });
    const registration = { code: row.code, childName: row.childName, status: row.status, paymentStatus: row.paymentStatus, createdAt: row.createdAt };
    return Response.json({ registration });
  } catch (error) {
    console.error("registration_lookup_failed", error);
    return Response.json({ error: "Não foi possível consultar agora." }, { status: 500 });
  }
}

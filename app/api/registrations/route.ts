import { createRegistration } from "@/lib/selfhost-db";
import { digits, registrationSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function registrationCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const values = new Uint8Array(8);
  crypto.getRandomValues(values);
  return `FLA-${Array.from(values, (value) => alphabet[value % alphabet.length]).join("")}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.issues[0]?.message ?? "Confira os dados informados." }, { status: 400 });
    }

    const data = parsed.data;
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const code = registrationCode();
      try {
        createRegistration({
          code,
          childName: data.childName,
          childBirthDate: data.childBirthDate,
          guardianName: data.guardianName,
          guardianCpf: digits(data.guardianCpf),
          guardianEmail: data.guardianEmail.toLowerCase(),
          guardianPhone: digits(data.guardianPhone),
          notes: data.notes,
        });
        return Response.json({ code, status: "recebida" }, { status: 201 });
      } catch (error) {
        const message = error instanceof Error ? error.message : "";
        if (!message.toLowerCase().includes("unique")) throw error;
      }
    }
    return Response.json({ error: "Não foi possível gerar o código. Tente novamente." }, { status: 503 });
  } catch (error) {
    console.error("registration_create_failed", error);
    return Response.json({ error: "Não foi possível concluir a inscrição agora. Tente novamente em instantes." }, { status: 500 });
  }
}

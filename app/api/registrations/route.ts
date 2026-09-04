import { createRegistration } from "@/lib/selfhost-db";
import { digits, registrationSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.issues[0]?.message ?? "Confira os dados informados." }, { status: 400 });
    }

    const data = parsed.data;
    const code = createRegistration({
      childName: data.childName,
      childBirthDate: data.childBirthDate,
      guardianName: data.guardianName,
      guardianBirthDate: data.guardianBirthDate,
      guardianCpf: digits(data.guardianCpf),
      guardianEmail: data.guardianEmail.toLowerCase(),
      guardianPhone: digits(data.guardianPhone),
      notes: data.notes,
    });
    return Response.json({ code, status: "recebida" }, { status: 201 });
  } catch (error) {
    console.error("registration_create_failed", error);
    return Response.json({ error: "Não foi possível concluir a inscrição agora. Tente novamente em instantes." }, { status: 500 });
  }
}

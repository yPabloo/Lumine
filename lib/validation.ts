import { z } from "zod";

export function digits(value: string) {
  return value.replace(/\D/g, "");
}

export function isValidCpf(value: string) {
  const cpf = digits(value);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  const calculate = (length: number) => {
    let sum = 0;
    for (let i = 0; i < length; i += 1) sum += Number(cpf[i]) * (length + 1 - i);
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };
  return calculate(9) === Number(cpf[9]) && calculate(10) === Number(cpf[10]);
}

const birthDate = z.string().refine((value) => {
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date <= new Date();
}, "Informe uma data de nascimento válida.");

export const registrationSchema = z.object({
  childName: z.string().trim().min(3).max(120),
  childBirthDate: birthDate,
  guardianName: z.string().trim().min(3).max(120),
  guardianBirthDate: birthDate,
  guardianCpf: z.string().refine(isValidCpf, "CPF inválido."),
  guardianEmail: z.string().trim().email().max(180),
  guardianPhone: z.string().refine((value) => {
    const phone = digits(value);
    return phone.length === 10 || phone.length === 11;
  }, "Telefone inválido."),
  notes: z.string().trim().max(500).optional().default(""),
  consentTerms: z.literal(true),
  consentData: z.literal(true),
  guardianDeclaration: z.literal(true),
});

export const lookupSchema = z.object({
  guardianCpf: z.string().refine(isValidCpf, "CPF inválido."),
});

export const updateRegistrationSchema = z.object({
  id: z.number().int().positive(),
  status: z.enum(["recebida", "confirmada", "lista_de_espera", "cancelada"]),
  paymentStatus: z.enum(["a_definir", "pendente", "pago", "isento"]),
});

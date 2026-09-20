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

type DateParts = {
  year: number;
  month: number;
  day: number;
};

function parseDate(value: string): DateParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return { year, month, day };
}

function todayInAracaju(): DateParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Maceio",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);

  return {
    year: getPart("year"),
    month: getPart("month"),
    day: getPart("day"),
  };
}

function ageFromBirthDate(value: string) {
  const birthDate = parseDate(value);
  if (!birthDate) return null;

  const today = todayInAracaju();
  let age = today.year - birthDate.year;
  const birthdayHasNotOccurred =
    today.month < birthDate.month ||
    (today.month === birthDate.month && today.day < birthDate.day);

  if (birthdayHasNotOccurred) age -= 1;
  return age;
}

const birthDate = z.string().refine((value) => {
  const age = ageFromBirthDate(value);
  return age !== null && age >= 0;
}, "Informe uma data de nascimento válida.");

const childBirthDate = birthDate.refine((value) => {
  const age = ageFromBirthDate(value);
  return age !== null && age >= 4 && age <= 14;
}, "A criança deve ter entre 4 e 14 anos.");

const guardianBirthDate = birthDate.refine((value) => {
  const age = ageFromBirthDate(value);
  return age !== null && age >= 18;
}, "O responsável legal deve ter pelo menos 18 anos.");

export const registrationSchema = z.object({
  childName: z.string().trim().min(3).max(120),
  childBirthDate,
  guardianName: z.string().trim().min(3).max(120),
  guardianBirthDate,
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

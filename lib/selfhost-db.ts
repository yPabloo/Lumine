import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";

export type RegistrationRow = {
  id: number;
  code: string;
  childName: string;
  childBirthDate: string;
  guardianName: string;
  guardianCpf: string;
  guardianEmail: string;
  guardianPhone: string;
  notes: string;
  status: string;
  paymentStatus: string;
  consentTerms: number;
  consentData: number;
  guardianDeclaration: number;
  createdAt: string;
  updatedAt: string;
};

const databasePath = process.env.DATABASE_PATH ?? join(/* turbopackIgnore: true */ process.cwd(), "data", "lumine.db");
let database: DatabaseSync | undefined;

const schema = `
  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    child_name TEXT NOT NULL,
    child_birth_date TEXT NOT NULL,
    guardian_name TEXT NOT NULL,
    guardian_cpf TEXT NOT NULL,
    guardian_email TEXT NOT NULL,
    guardian_phone TEXT NOT NULL,
    notes TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'recebida',
    payment_status TEXT NOT NULL DEFAULT 'a_definir',
    consent_terms INTEGER NOT NULL,
    consent_data INTEGER NOT NULL,
    guardian_declaration INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS registrations_guardian_cpf_idx ON registrations (guardian_cpf);
  CREATE INDEX IF NOT EXISTS registrations_status_idx ON registrations (status);
  CREATE INDEX IF NOT EXISTS registrations_created_at_idx ON registrations (created_at);
  CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    actor_email TEXT NOT NULL,
    action TEXT NOT NULL,
    registration_id INTEGER,
    details TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS audit_logs_created_at_idx ON audit_logs (created_at);
`;

function getDatabase() {
  if (database) return database;

  mkdirSync(dirname(databasePath), { recursive: true });

  const connection = new DatabaseSync(databasePath);
  connection.exec("PRAGMA busy_timeout = 10000");
  connection.exec("PRAGMA foreign_keys = ON");
  connection.exec("PRAGMA journal_mode = WAL");
  connection.exec(schema);

  database = connection;
  return connection;
}

const registrationSelect = `
  SELECT
    id,
    code,
    child_name AS childName,
    child_birth_date AS childBirthDate,
    guardian_name AS guardianName,
    guardian_cpf AS guardianCpf,
    guardian_email AS guardianEmail,
    guardian_phone AS guardianPhone,
    notes,
    status,
    payment_status AS paymentStatus,
    consent_terms AS consentTerms,
    consent_data AS consentData,
    guardian_declaration AS guardianDeclaration,
    created_at AS createdAt,
    updated_at AS updatedAt
  FROM registrations
`;

export function createRegistration(values: {
  code: string;
  childName: string;
  childBirthDate: string;
  guardianName: string;
  guardianCpf: string;
  guardianEmail: string;
  guardianPhone: string;
  notes: string;
}) {
  getDatabase().prepare(`
    INSERT INTO registrations (
      code, child_name, child_birth_date, guardian_name, guardian_cpf,
      guardian_email, guardian_phone, notes, consent_terms, consent_data,
      guardian_declaration
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 1, 1)
  `).run(
    values.code,
    values.childName,
    values.childBirthDate,
    values.guardianName,
    values.guardianCpf,
    values.guardianEmail,
    values.guardianPhone,
    values.notes,
  );
}

export function findRegistration(code: string, guardianCpf: string) {
  return getDatabase().prepare(`${registrationSelect} WHERE code = ? AND guardian_cpf = ? LIMIT 1`).get(code, guardianCpf) as RegistrationRow | undefined;
}

export function listRegistrations() {
  return getDatabase().prepare(`${registrationSelect} ORDER BY created_at DESC, id DESC LIMIT 500`).all() as RegistrationRow[];
}

export function listAllRegistrations() {
  return getDatabase().prepare(`${registrationSelect} ORDER BY created_at DESC, id DESC`).all() as RegistrationRow[];
}

export function updateRegistration(id: number, status: string, paymentStatus: string) {
  const connection = getDatabase();
  const result = connection.prepare("UPDATE registrations SET status = ?, payment_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(status, paymentStatus, id);
  if (result.changes === 0) return undefined;
  return connection.prepare(`${registrationSelect} WHERE id = ? LIMIT 1`).get(id) as RegistrationRow | undefined;
}

export function logAudit(actorEmail: string, registrationId: number, details: string) {
  getDatabase().prepare("INSERT INTO audit_logs (actor_email, action, registration_id, details) VALUES (?, 'registration_updated', ?, ?)").run(actorEmail, registrationId, details);
}

function scalar(sql: string) {
  const row = getDatabase().prepare(sql).get() as { value: number };
  return Number(row.value);
}

export function getMetrics() {
  return {
    total: scalar("SELECT COUNT(*) AS value FROM registrations"),
    today: scalar("SELECT COUNT(*) AS value FROM registrations WHERE date(created_at) = date('now')"),
    received: scalar("SELECT COUNT(*) AS value FROM registrations WHERE status = 'recebida'"),
    confirmed: scalar("SELECT COUNT(*) AS value FROM registrations WHERE status = 'confirmada'"),
  };
}

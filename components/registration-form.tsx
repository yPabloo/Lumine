"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = {
  childName: string;
  childBirthDate: string;
  guardianName: string;
  guardianBirthDate: string;
  guardianCpf: string;
  guardianEmail: string;
  guardianPhone: string;
  notes: string;
  consentTerms: boolean;
  consentData: boolean;
  guardianDeclaration: boolean;
};

const initialState: FormState = {
  childName: "",
  childBirthDate: "",
  guardianName: "",
  guardianBirthDate: "",
  guardianCpf: "",
  guardianEmail: "",
  guardianPhone: "",
  notes: "",
  consentTerms: false,
  consentData: false,
  guardianDeclaration: false,
};

function formatCpf(value: string) {
  return value.replace(/\D/g, "").slice(0, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

export function RegistrationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json() as { code?: string; error?: string };
      if (!response.ok || !data.code) throw new Error(data.error || "Não foi possível concluir a inscrição.");
      setCode(data.code);
      setForm(initialState);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Não foi possível concluir a inscrição.");
    } finally {
      setLoading(false);
    }
  }

  if (code) {
    return (
      <div className="success-panel" role="status">
        <CheckCircle2 size={48} />
        <span className="kicker">Inscrição recebida</span>
        <h2>Guarde seu código</h2>
        <p>A equipe Lumine confirmará a vaga e informará data, faixa etária e eventual taxa pelos contatos cadastrados.</p>
        <div className="registration-code">{code}</div>
        <div className="button-row button-row--center">
          <Button className="button button--primary" onClick={async () => {
            await navigator.clipboard.writeText(code);
            setCopied(true);
          }}><Copy size={17} /> {copied ? "Código copiado" : "Copiar código"}</Button>
          <Link className="button button--secondary" href="/festival/consultar">Consultar inscrição</Link>
        </div>
      </div>
    );
  }

  return (
    <form className="registration-form" onSubmit={submit}>
      <div className="form-section">
        <div className="form-section-heading"><span>1</span><div><h2>Dados da criança</h2><p>Cadastre uma criança por inscrição.</p></div></div>
        <div className="form-grid">
          <div className="field field--full"><Label htmlFor="childName">Nome completo da criança</Label><Input id="childName" autoComplete="name" required value={form.childName} onChange={(e) => setField("childName", e.target.value)} /></div>
          <div className="field"><Label htmlFor="childBirthDate">Data de nascimento</Label><Input id="childBirthDate" type="date" required value={form.childBirthDate} onChange={(e) => setField("childBirthDate", e.target.value)} /></div>
          <div className="field field--full"><Label htmlFor="notes">Observação para a organização <span>(opcional)</span></Label><Textarea id="notes" maxLength={500} placeholder="Use este campo apenas para uma informação necessária ao atendimento no evento." value={form.notes} onChange={(e) => setField("notes", e.target.value)} /></div>
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-heading"><span>2</span><div><h2>Responsável legal</h2><p>Esses dados serão usados para confirmação e consulta.</p></div></div>
        <div className="form-grid">
          <div className="field field--full"><Label htmlFor="guardianName">Nome completo</Label><Input id="guardianName" autoComplete="name" required value={form.guardianName} onChange={(e) => setField("guardianName", e.target.value)} /></div>
          <div className="field"><Label htmlFor="guardianBirthDate">Data de nascimento</Label><Input id="guardianBirthDate" type="date" autoComplete="bday" required value={form.guardianBirthDate} onChange={(e) => setField("guardianBirthDate", e.target.value)} /></div>
          <div className="field"><Label htmlFor="guardianCpf">CPF</Label><Input id="guardianCpf" inputMode="numeric" autoComplete="off" required placeholder="000.000.000-00" value={form.guardianCpf} onChange={(e) => setField("guardianCpf", formatCpf(e.target.value))} /></div>
          <div className="field"><Label htmlFor="guardianPhone">Celular / WhatsApp</Label><Input id="guardianPhone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="(79) 99999-9999" value={form.guardianPhone} onChange={(e) => setField("guardianPhone", formatPhone(e.target.value))} /></div>
          <div className="field field--full"><Label htmlFor="guardianEmail">E-mail</Label><Input id="guardianEmail" type="email" autoComplete="email" required value={form.guardianEmail} onChange={(e) => setField("guardianEmail", e.target.value)} /></div>
        </div>
      </div>

      <div className="form-section consent-section">
        <div className="form-section-heading"><span>3</span><div><h2>Declarações e consentimentos</h2><p>Leia antes de concluir.</p></div></div>
        <label className="consent-row"><Checkbox checked={form.guardianDeclaration} onCheckedChange={(value) => setField("guardianDeclaration", value === true)} /><span>Declaro ser pai, mãe ou responsável legal pela criança cadastrada.</span></label>
        <label className="consent-row"><Checkbox checked={form.consentData} onCheckedChange={(value) => setField("consentData", value === true)} /><span>Autorizo, de forma específica e destacada, o tratamento dos dados informados para organizar a inscrição e comunicar assuntos do Festival.</span></label>
        <label className="consent-row"><Checkbox checked={form.consentTerms} onCheckedChange={(value) => setField("consentTerms", value === true)} /><span>Li e aceito os <Link href="/festival/termos" target="_blank">termos, regras e aviso de privacidade</Link>.</span></label>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}
      <Button className="button button--primary submit-button" type="submit" disabled={loading || !form.consentTerms || !form.consentData || !form.guardianDeclaration}>
        {loading ? <><Loader2 className="spin" /> Enviando…</> : "Concluir inscrição"}
      </Button>
      <p className="form-footnote">A inscrição fica como “recebida” até a confirmação da equipe. Nenhum pagamento é cobrado por este formulário.</p>
    </form>
  );
}

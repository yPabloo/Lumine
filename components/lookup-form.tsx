"use client";

import { FormEvent, useState } from "react";
import { CalendarDays, CircleDollarSign, Loader2, Search, TicketCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import styles from "./lookup-form.module.css";

type RegistrationResult = {
  code: string;
  childName: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
};

const statusLabels: Record<string, string> = {
  recebida: "Recebida",
  confirmada: "Confirmada",
  lista_de_espera: "Lista de espera",
  cancelada: "Cancelada",
};

const paymentLabels: Record<string, string> = {
  a_definir: "A definir",
  pendente: "Pendente",
  pago: "Pago",
  isento: "Isento",
};

export function LookupForm() {
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<RegistrationResult[]>([]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const response = await fetch("/api/registrations/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guardianCpf: cpf }),
      });
      const data = await response.json() as { registrations?: RegistrationResult[]; error?: string };
      if (!response.ok || !data.registrations?.length) throw new Error(data.error || "Inscrição não encontrada.");
      setResults(data.registrations);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Inscrição não encontrada.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lookup-shell">
      <form className={`lookup-form ${styles.form}`} onSubmit={submit}>
        <div className="field"><Label htmlFor="cpf">CPF do responsável</Label><Input id="cpf" inputMode="numeric" autoComplete="off" required placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(formatCpf(e.target.value))} /></div>
        <Button className="button button--primary" disabled={loading} type="submit">{loading ? <Loader2 className="spin" /> : <Search />} Consultar</Button>
        {error && <p className="form-error" role="alert">{error}</p>}
      </form>
      {results.map((result) => (
          <article className="lookup-result" key={result.code} role="status">
            <div className="lookup-result-top"><span className={`status status--${result.status}`}>{statusLabels[result.status] ?? result.status}</span><strong>{result.code}</strong></div>
            <div className="lookup-result-grid">
              <div><UserRound /><span>Criança</span><strong>{result.childName}</strong></div>
              <div><TicketCheck /><span>Situação</span><strong>{statusLabels[result.status] ?? result.status}</strong></div>
              <div><CircleDollarSign /><span>Pagamento</span><strong>{paymentLabels[result.paymentStatus] ?? result.paymentStatus}</strong></div>
              <div><CalendarDays /><span>Recebida em</span><strong>{new Date(result.createdAt).toLocaleDateString("pt-BR")}</strong></div>
            </div>
          </article>
      ))}
    </div>
  );
}

function formatCpf(value: string) {
  return value.replace(/\D/g, "").slice(0, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

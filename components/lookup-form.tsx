"use client";

import { FormEvent, useState } from "react";
import { CalendarDays, CircleDollarSign, Loader2, Search, TicketCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [code, setCode] = useState("");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<RegistrationResult | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/registrations/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, guardianCpf: cpf }),
      });
      const data = await response.json() as { registration?: RegistrationResult; error?: string };
      if (!response.ok || !data.registration) throw new Error(data.error || "Inscrição não encontrada.");
      setResult(data.registration);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Inscrição não encontrada.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lookup-shell">
      <form className="lookup-form" onSubmit={submit}>
        <div className="field"><Label htmlFor="code">Código de inscrição</Label><Input id="code" required placeholder="FLA-XXXXXXXX" value={code} onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 12))} /></div>
        <div className="field"><Label htmlFor="cpf">CPF do responsável</Label><Input id="cpf" inputMode="numeric" required placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(e.target.value)} /></div>
        <Button className="button button--primary" disabled={loading} type="submit">{loading ? <Loader2 className="spin" /> : <Search />} Consultar</Button>
        {error && <p className="form-error" role="alert">{error}</p>}
      </form>
      {result && (
        <article className="lookup-result" role="status">
          <div className="lookup-result-top"><span className={`status status--${result.status}`}>{statusLabels[result.status] ?? result.status}</span><strong>{result.code}</strong></div>
          <div className="lookup-result-grid">
            <div><UserRound /><span>Criança</span><strong>{result.childName}</strong></div>
            <div><TicketCheck /><span>Situação</span><strong>{statusLabels[result.status] ?? result.status}</strong></div>
            <div><CircleDollarSign /><span>Pagamento</span><strong>{paymentLabels[result.paymentStatus] ?? result.paymentStatus}</strong></div>
            <div><CalendarDays /><span>Recebida em</span><strong>{new Date(result.createdAt).toLocaleDateString("pt-BR")}</strong></div>
          </div>
        </article>
      )}
    </div>
  );
}

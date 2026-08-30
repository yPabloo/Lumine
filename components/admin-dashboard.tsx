"use client";

import { useCallback, useEffect, useState } from "react";
import { CalendarPlus, CheckCircle2, Download, Inbox, Loader2, RefreshCw, Save, Search, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Row = {
  id: number; code: string; childName: string; childBirthDate: string; guardianName: string; guardianCpf: string; guardianEmail: string; guardianPhone: string; notes: string; status: string; paymentStatus: string; createdAt: string;
};
type Metrics = { total: number; today: number; received: number; confirmed: number };

const statusOptions = [{ value: "recebida", label: "Recebida" }, { value: "confirmada", label: "Confirmada" }, { value: "lista_de_espera", label: "Lista de espera" }, { value: "cancelada", label: "Cancelada" }];
const paymentOptions = [{ value: "a_definir", label: "A definir" }, { value: "pendente", label: "Pendente" }, { value: "pago", label: "Pago" }, { value: "isento", label: "Isento" }];

function RowEditor({ row, onSaved }: { row: Row; onSaved: (row: Row) => void }) {
  const [status, setStatus] = useState(row.status);
  const [paymentStatus, setPaymentStatus] = useState(row.paymentStatus);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function save() {
    setSaving(true); setMessage("");
    try {
      const response = await fetch("/api/admin/registrations", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: row.id, status, paymentStatus }) });
      const data = await response.json() as { registration?: Row; error?: string };
      if (!response.ok || !data.registration) throw new Error(data.error || "Erro ao salvar.");
      onSaved(data.registration); setMessage("Salvo");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Erro ao salvar."); }
    finally { setSaving(false); }
  }

  return (
    <TableRow>
      <TableCell><strong className="table-code">{row.code}</strong><small>{new Date(row.createdAt).toLocaleDateString("pt-BR")}</small></TableCell>
      <TableCell><strong>{row.childName}</strong><small>Nasc. {new Date(`${row.childBirthDate}T12:00:00`).toLocaleDateString("pt-BR")}</small></TableCell>
      <TableCell><strong>{row.guardianName}</strong><small>{row.guardianEmail}<br />{row.guardianPhone}</small></TableCell>
      <TableCell><Select value={status} onValueChange={(value) => setStatus(value ?? row.status)}><SelectTrigger aria-label={`Status de ${row.code}`}><SelectValue /></SelectTrigger><SelectContent>{statusOptions.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select></TableCell>
      <TableCell><Select value={paymentStatus} onValueChange={(value) => setPaymentStatus(value ?? row.paymentStatus)}><SelectTrigger aria-label={`Pagamento de ${row.code}`}><SelectValue /></SelectTrigger><SelectContent>{paymentOptions.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select></TableCell>
      <TableCell><Button size="icon-sm" variant="outline" onClick={save} disabled={saving} title="Salvar alterações">{saving ? <Loader2 className="spin" /> : <Save />}</Button>{message && <small className={message === "Salvo" ? "save-ok" : "save-error"}>{message}</small>}</TableCell>
    </TableRow>
  );
}

export function AdminDashboard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({ total: 0, today: 0, received: 0, confirmed: 0 });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const params = new URLSearchParams({ search, status });
      const [rowsResponse, metricsResponse] = await Promise.all([fetch(`/api/admin/registrations?${params}`), fetch("/api/admin/metrics")]);
      const rowsData = await rowsResponse.json() as { registrations?: Row[]; error?: string };
      const metricsData = await metricsResponse.json() as { metrics?: Metrics; error?: string };
      if (!rowsResponse.ok || !metricsResponse.ok) throw new Error(rowsData.error || metricsData.error || "Erro ao carregar.");
      setRows(rowsData.registrations ?? []); setMetrics(metricsData.metrics ?? { total: 0, today: 0, received: 0, confirmed: 0 });
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Erro ao carregar."); }
    finally { setLoading(false); }
  }, [search, status]);

  useEffect(() => {
    const timeout = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timeout);
  }, [load]);

  return (
    <div className="admin-dashboard">
      <div className="metric-grid">
        <article><UsersRound /><span>Total</span><strong>{metrics.total}</strong></article>
        <article><CalendarPlus /><span>Hoje</span><strong>{metrics.today}</strong></article>
        <article><Inbox /><span>Recebidas</span><strong>{metrics.received}</strong></article>
        <article><CheckCircle2 /><span>Confirmadas</span><strong>{metrics.confirmed}</strong></article>
      </div>
      <div className="admin-toolbar">
        <div className="admin-search"><Search /><Input aria-label="Buscar inscrições" placeholder="Código, criança, responsável ou e-mail" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <Select value={status} onValueChange={(value) => setStatus(value ?? "all")}><SelectTrigger aria-label="Filtrar por status"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todos os status</SelectItem>{statusOptions.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select>
        <Button variant="outline" onClick={() => void load()}><RefreshCw /> Atualizar</Button>
        <a className="button button--primary button--small" href="/api/admin/export"><Download size={17} /> Exportar CSV</a>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="admin-table-card">
        {loading ? <div className="admin-empty"><Loader2 className="spin" /><p>Carregando inscrições…</p></div> : rows.length === 0 ? <div className="admin-empty"><Inbox /><p>Nenhuma inscrição encontrada.</p></div> : <Table><TableHeader><TableRow><TableHead>Inscrição</TableHead><TableHead>Criança</TableHead><TableHead>Responsável</TableHead><TableHead>Status</TableHead><TableHead>Pagamento</TableHead><TableHead>Ação</TableHead></TableRow></TableHeader><TableBody>{rows.map((row) => <RowEditor key={row.id} row={row} onSaved={(updated) => setRows((current) => current.map((item) => item.id === updated.id ? updated : item))} />)}</TableBody></Table>}
      </div>
      <p className="admin-footnote">Exibindo até 500 inscrições mais recentes. Alterações ficam registradas para auditoria.</p>
    </div>
  );
}

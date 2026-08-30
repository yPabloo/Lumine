import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert, Sparkles } from "lucide-react";
import { AdminDashboard } from "@/components/admin-dashboard";
import { requireAdminPage } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Administração do Festival" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const auth = await requireAdminPage();
  if (!auth.authorized) {
    return <main className="admin-denied"><div><ShieldAlert /><span className="kicker">Área protegida</span><h1>{auth.configured ? "Seu usuário não tem acesso." : "A administração ainda não foi configurada."}</h1><p>{auth.configured ? `O proxy informou o usuário ${auth.user.email}. Confira se ADMIN_EMAIL usa o mesmo endereço em todo o arquivo .env.` : "Configure o e-mail autorizado no arquivo .env antes de usar o painel."}</p><div className="button-row button-row--center"><Link className="button button--secondary" href="/">Voltar ao site</Link></div></div></main>;
  }
  return (
    <main className="admin-page">
      <header className="admin-header"><div><span className="eyebrow"><Sparkles size={15} /> Festival Lumine de Artes</span><h1>Painel de inscrições</h1><p>Olá, {auth.user.displayName}. Acompanhe e atualize as inscrições do evento.</p></div><div className="button-row"><Link className="button button--secondary button--small" href="/">Ver site</Link></div></header>
      <AdminDashboard />
    </main>
  );
}

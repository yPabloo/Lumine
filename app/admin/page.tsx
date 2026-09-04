import type { Metadata } from "next";
import Link from "next/link";
import { LogOut, Sparkles } from "lucide-react";
import { AdminDashboard } from "@/components/admin-dashboard";
import { requireAdminPage } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Administração do Festival" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const auth = await requireAdminPage();
  return (
    <main className="admin-page">
      <header className="admin-header"><div><span className="eyebrow"><Sparkles size={15} /> Festival Lumine de Artes</span><h1>Painel de inscrições</h1><p>Olá, {auth.user.displayName}. Acompanhe e atualize as inscrições do evento.</p></div><div className="button-row"><Link className="button button--secondary button--small" href="/">Ver site</Link><form action="/api/admin/logout" method="post"><button className="button button--secondary button--small" type="submit"><LogOut size={16} /> Sair</button></form></div></header>
      <AdminDashboard />
    </main>
  );
}

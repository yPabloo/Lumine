import type { Metadata } from "next";
import { LookupForm } from "@/components/lookup-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Consultar inscrição" };

export default function LookupPage() {
  return (
    <>
      <SiteHeader />
      <main className="lookup-page">
        <section className="page-heading page-heading--blue">
          <div className="shell narrow-shell"><span className="eyebrow">Acompanhe sua participação</span><h1>Consultar inscrição</h1><p>Informe somente o CPF do responsável legal. Se houver mais de uma criança cadastrada, todas as inscrições serão exibidas.</p></div>
        </section>
        <div className="shell narrow-shell lookup-page-content"><LookupForm /></div>
      </main>
      <SiteFooter />
    </>
  );
}

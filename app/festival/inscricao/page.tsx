import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";
import { RegistrationForm } from "@/components/registration-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Inscrição no Festival" };

export default function RegistrationPage() {
  return (
    <>
      <SiteHeader />
      <main className="form-page">
        <section className="page-heading page-heading--pink">
          <div className="shell narrow-shell">
            <span className="eyebrow">Festival Lumine de Artes</span>
            <h1>Inscrição da criança</h1>
            <p>Preencha com atenção. Ao final, você receberá um código para acompanhar a situação da inscrição.</p>
            <div className="privacy-note"><LockKeyhole size={18} /><span>Coletamos apenas os dados necessários para organizar o evento e falar com o responsável.</span></div>
          </div>
        </section>
        <div className="shell form-shell"><RegistrationForm /></div>
      </main>
      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, CircleDollarSign, Clock3, MapPin, Paintbrush, Search, ShieldCheck, UsersRound } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { festival } from "@/lib/site-data";

export const metadata: Metadata = { title: "Festival de Artes", description: festival.description };

export default function FestivalPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="festival-hero">
          <div className="shell festival-hero-grid">
            <div>
              <span className="eyebrow"><Paintbrush size={16} /> {festival.eyebrow}</span>
              <h1>Festival Lumine<br /><em>de Artes</em></h1>
              <p>{festival.description}</p>
              <div className="button-row">
                <Link className="button button--primary" href="/festival/inscricao">Fazer inscrição <ArrowRight size={18} /></Link>
                <Link className="button button--secondary" href="/festival/consultar"><Search size={18} /> Consultar</Link>
              </div>
            </div>
            <div className="festival-canvas" aria-hidden="true">
              <span className="brush brush--one" /><span className="brush brush--two" /><span className="brush brush--three" />
              <div className="canvas-copy"><small>imaginar</small><strong>CRIAR</strong><small>compartilhar</small></div>
            </div>
          </div>
        </section>

        <section className="section section--tight">
          <div className="shell event-facts">
            <article><CalendarDays /><span>Data</span><strong>{festival.date}</strong></article>
            <article><Clock3 /><span>Horário</span><strong>{festival.time}</strong></article>
            <article><MapPin /><span>Local</span><strong>{festival.location}</strong></article>
            <article><CircleDollarSign /><span>Inscrição</span><strong>{festival.fee}</strong></article>
          </div>
        </section>

        <section className="section">
          <div className="shell feature-story">
            <div>
              <span className="kicker">Uma tarde para experimentar</span>
              <h2>A arte como linguagem da infância.</h2>
              <p>O Festival foi pensado como uma oficina artística acolhedora, com pintura, cores e liberdade para cada criança explorar ideias do seu jeito.</p>
            </div>
            <div className="festival-benefits">
              <article><Paintbrush /><div><h3>Experiência prática</h3><p>Atividades de pintura e expressão conduzidas em ambiente preparado para crianças.</p></div></article>
              <article><UsersRound /><div><h3>Comunidade convidada</h3><p>A participação é aberta ao público; não é preciso estar matriculado no Lumine.</p></div></article>
              <article><ShieldCheck /><div><h3>Inscrição responsável</h3><p>O cadastro é feito por um responsável legal e coleta somente os dados necessários.</p></div></article>
            </div>
          </div>
        </section>

        <section className="section section--yellow">
          <div className="shell callout">
            <div><span className="kicker">Primeira edição</span><h2>As informações finais serão comunicadas pela equipe Lumine.</h2><p>O formulário registra o interesse da família. A vaga passa a ser confirmada após o pagamento da taxa.</p></div>
            <Link className="button button--primary" href="/festival/inscricao">Inscrever criança <ArrowRight size={18} /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

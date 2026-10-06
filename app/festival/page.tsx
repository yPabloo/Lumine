import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, CircleDollarSign, Clock3, MapPin, Paintbrush, Search, ShieldCheck, UsersRound } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  FestivalGalleryCarousel,
  type FestivalGalleryImage,
} from "@/components/festival-gallery-carousel";
import { festival } from "@/lib/site-data";

export const metadata: Metadata = { title: "Festival de Artes", description: festival.description };

/*
 * Para adicionar imagens ao carrossel:
 * 1. coloque os arquivos em public/festival-gallery;
 * 2. adicione um item para cada imagem seguindo o modelo abaixo.
 */
const festivalGalleryImages: FestivalGalleryImage[] = [
   {
     src: "/festival-gallery/FotoFestival1.jpeg",
     alt: "Crianças participando de uma atividade de pintura",
     caption: "Materiais e experiências pensados especialmente para as crianças.",
   },
   {
     src: "/festival-gallery/FotoFestival2.jpeg",
     alt: "Crianças participando de uma atividade de pintura",
     caption: "A criança tem liberdade para imaginar, experimentar e criar.",
   },
   {
     src: "/festival-gallery/FotoFestival3.jpeg",
     alt: "Crianças participando de uma atividade de pintura",
     caption: "Sorrisos brilhantes que guiam cada pincelada de alegria.",
   },
   {
     src: "/festival-gallery/FotoFestival4.jpeg",
     alt: "Crianças participando de uma atividade de pintura",
     caption: "Momentos de afeto compartilhados através da arte e do cuidado.",
   },
   {
     src: "/festival-gallery/FotoFestival5.jpeg",
     alt: "Crianças participando de uma atividade de pintura",
     caption: "Um encontro cheio de cores, criatividade e descobertas.",
   },
];

export default function FestivalPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="festival-hero">
          <div className="shell festival-hero-grid">
            <div>
              <span className="eyebrow"><Paintbrush size={16} /> {festival.eyebrow}</span>
              <h1>Festival Lumine<br /><em>em Cores</em></h1>
              <p>{festival.description}</p>
              <div className="button-row">
                <Link className="button button--primary" href="/festival/inscricao">Fazer inscrição <ArrowRight size={18} /></Link>
                <Link className="button button--secondary" href="/festival/consultar"><Search size={18} /> Consultar</Link>
              </div>
            </div>
            <div className="festival-mascot" aria-label="Lumininha segurando um pincel e uma paleta de tintas">
              <span className="festival-mascot-shape festival-mascot-shape--blue" aria-hidden="true" />
              <span className="festival-mascot-shape festival-mascot-shape--pink" aria-hidden="true" />
              <span className="festival-mascot-shape festival-mascot-shape--yellow" aria-hidden="true" />
              <Image
                src="/lumininha-pintora.png"
                alt="Lumininha, mascote do Lumine, com pincel e paleta de tintas"
                width={1378}
                height={1142}
                sizes="(max-width: 980px) 88vw, 520px"
                priority
              />
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

        <section className="section festival-gallery-section" id="galeria">
          <div className="shell">
            <div className="section-heading festival-gallery-heading">
              <span className="kicker">Cores que ganham vida</span>
              <h2>Um pedacinho do que espera por você.</h2>
              <p>Imagens inspiradoras para entrar no clima de criação, brincadeira e expressão do Festival Lumine em Cores.</p>
            </div>

            <FestivalGalleryCarousel items={festivalGalleryImages} />
          </div>
        </section>

        <section className="section section--yellow">
          <div className="shell callout">
            <div><span className="kicker">Primeira edição</span><h2>Fique de olho no instagram do Lumine ou entre em contato pelo WhatsApp para mais informações!</h2><p>Serão disponibilizadas até 25 inscrições. A vaga passa a ser confirmada após a inscrição e o pagamento da taxa.</p></div>
            <Link className="button button--primary" href="/festival/inscricao">Inscrever criança <ArrowRight size={18} /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

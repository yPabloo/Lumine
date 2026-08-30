import type { Metadata } from "next";
import {
  CalendarDays,
  Camera,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { lumine } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Termo de responsabilidade",
};

const event = {
  date: "A definir",
  location: lumine.address,
  time: "A definir",
  fee: "A definir",
};

const eventDetails = [
  {
    label: "Data",
    value: event.date,
    Icon: CalendarDays,
  },
  {
    label: "Local",
    value: event.location,
    Icon: MapPin,
  },
  {
    label: "Horário",
    value: event.time,
    Icon: Clock3,
  },
  {
    label: "Taxa de inscrição",
    value: event.fee,
    Icon: CircleDollarSign,
  },
];

const participationRules = [
  "A criança deverá permanecer sob os cuidados e orientações informados pela organização.",
  "O responsável deverá comunicar informações relevantes ao atendimento seguro pelos canais oficiais.",
  "A organização poderá ajustar ou cancelar a programação por motivos de segurança, capacidade ou força maior.",
  "Condutas que coloquem crianças, famílias ou a equipe em risco poderão resultar no encerramento da participação.",
];

const imageUses = [
  "Fotografias e filmagens realizadas durante o evento.",
  "Materiais de divulgação e promoção do Festival.",
  "Publicações nas redes sociais oficiais do Lumine.",
  "Veículos de comunicação.",
  "Relatórios e documentos oficiais.",
];

export default function TermsPage() {
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    lumine.address,
  )}&output=embed`;

  return (
    <>
      <SiteHeader />

      <main>
        <section className="page-heading page-heading--yellow">
          <div className="shell narrow-shell">
            <span className="kicker">Festival Lumine de Artes</span>
            <h1>Termo de responsabilidade, regras e privacidade</h1>
            <p>Versão de 29 de agosto de 2026.</p>
          </div>
        </section>

        <article className="shell terms-document">
          <div className="terms-alert">
            <ShieldCheck aria-hidden="true" />

            <div>
              <strong>Leia antes de realizar a inscrição</strong>
              <p>
                A participação no Festival pressupõe a leitura e concordância
                com as condições apresentadas abaixo.
              </p>
            </div>
          </div>

          <section className="terms-section">
            <div className="terms-section-heading">
              <span className="terms-section-number">1</span>
              <h2>Sobre a inscrição</h2>
            </div>

            <p>
              O Festival Lumine de Artes é uma atividade infantil aberta à
              comunidade. O cadastro registra o interesse da família e a vaga
              somente será considerada confirmada após a comunicação oficial
              do Lumine.
            </p>

            <div className="terms-event-card">
              <div className="terms-event-title">
                <CalendarDays aria-hidden="true" />
                <strong>Dados do evento</strong>
              </div>

              <div className="terms-event-grid">
                {eventDetails.map(({ label, value, Icon }) => (
                  <div className="terms-event-item" key={label}>
                    <Icon aria-hidden="true" />

                    <div>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="terms-section">
            <div className="terms-section-heading">
              <span className="terms-section-number">2</span>
              <h2>Responsável legal</h2>
            </div>

            <p>
              A inscrição deve ser realizada pelo pai, mãe ou responsável
              legal, que declara que as informações fornecidas são verdadeiras
              e que possui autorização para representar a criança.
            </p>
          </section>

          <section className="terms-section">
            <div className="terms-section-heading">
              <span className="terms-section-number">3</span>
              <h2>Dados pessoais e finalidade</h2>
            </div>

            <p>
              O Lumine coleta nome e data de nascimento da criança, além de
              nome, CPF, e-mail e telefone do responsável. Esses dados serão
              utilizados exclusivamente para organizar a participação,
              verificar a identidade do responsável, evitar cadastros
              indevidos, comunicar informações do Festival e cumprir
              obrigações aplicáveis.
            </p>
          </section>

          <section className="terms-section">
            <div className="terms-section-heading">
              <span className="terms-section-number">4</span>
              <h2>Acesso, correção e exclusão</h2>
            </div>

            <p>
              O responsável pode solicitar acesso, correção ou exclusão dos
              dados pelos canais oficiais do Lumine. Alguns registros poderão
              ser mantidos pelo prazo necessário ao cumprimento de obrigações
              legais, à prevenção de fraude e ao exercício regular de direitos.
            </p>
          </section>

          <section className="terms-section">
            <div className="terms-section-heading">
              <span className="terms-section-number">5</span>
              <h2>Compartilhamento e segurança</h2>
            </div>

            <p>
              Os dados não serão vendidos. O acesso ficará restrito à equipe
              autorizada e a prestadores essenciais à operação, quando
              necessário e sob dever de confidencialidade. Serão adotadas
              medidas técnicas e administrativas compatíveis com a natureza
              dos dados.
            </p>
          </section>

          <section className="terms-section terms-section--blue">
            <div className="terms-section-heading">
              <span className="terms-section-number">6</span>
              <h2>Regras de participação</h2>
            </div>

            <ul className="terms-check-list">
              {participationRules.map((rule) => (
                <li key={rule}>
                  <CheckCircle2 aria-hidden="true" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="terms-section terms-section--pink">
            <div className="terms-section-heading">
              <span className="terms-section-number">7</span>
              <h2>Autorização para uso de imagem</h2>
            </div>

            <div className="terms-image-intro">
              <Camera aria-hidden="true" />

              <p>
                O participante autoriza gratuitamente o uso de sua imagem, voz
                e nome nas seguintes situações:
              </p>
            </div>

            <ul className="terms-check-list">
              {imageUses.map((use) => (
                <li key={use}>
                  <CheckCircle2 aria-hidden="true" />
                  <span>{use}</span>
                </li>
              ))}
            </ul>

            <p className="terms-small-print">
              Esta autorização é válida por tempo indeterminado e abrange todo
              o território nacional e internacional.
            </p>
          </section>

          <section className="terms-section">
            <div className="terms-section-heading">
              <span className="terms-section-number">8</span>
              <h2>Pagamento e cancelamento</h2>
            </div>

            <p>
              Nenhum valor é cobrado somente pelo preenchimento deste
              formulário. Caso seja definida uma taxa, o preço, a forma de
              pagamento e a política de cancelamento e reembolso serão
              apresentados antes da confirmação da vaga.
            </p>
          </section>

          <section className="terms-section">
            <div className="terms-section-heading">
              <span className="terms-section-number">9</span>
              <h2>Contato e localização</h2>
            </div>

            <p>
              Dúvidas e solicitações podem ser encaminhadas ao Lumine pelo
              telefone <strong>{lumine.phone}</strong> ou presencialmente em{" "}
              <strong>{lumine.address}</strong>.
            </p>

            <div className="terms-map">
              <iframe
                src={mapUrl}
                title="Localização do Lumine"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              className="terms-map-link"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                lumine.address,
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin aria-hidden="true" />
              Abrir localização no Google Maps
            </a>
          </section>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
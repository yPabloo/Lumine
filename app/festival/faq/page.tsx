import type { Metadata } from "next";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { lumine } from "@/lib/site-data";

export const metadata: Metadata = { title: "Perguntas frequentes" };

const questions = [
  ["Precisa ser aluno do Lumine para participar?", "Não. O Festival Lumine em Cores será aberto a crianças de toda a comunidade."],
  ["Quantas vagas estarão disponíveis?", "O Festival possui o limite máximo de 25 inscrições ativas. Uma inscrição cancelada libera novamente a vaga para outra criança."],
  ["A inscrição já garante a vaga?", "Depende da forma de pagamento. Se você pagar diretamente pelo site, sua vaga estará garantida no ato da inscrição. Caso opte por pagar via WhatsApp, a vaga será confirmada somente após o envio e a validação do comprovante de pagamento."],
  ["Haverá taxa de inscrição?", "Sim, será R$ 150 (Esse valor inclui Kit Lanche, Kit Pintura, Ambientação/Arrumação do Local, Acompanhamento da Artista, Filmaker e Fotos). O pagamento poderá ser feito pelo formulário de inscrição ou via WhatsApp."],
  ["Como faço a inscrição?", "Acesse a página de inscrição, preencha os dados da criança e do responsável legal, leia os termos e conclua. Guarde o código exibido ao final."],
  ["Posso inscrever mais de uma criança?", "Sim. Faça uma inscrição separada para cada criança. O mesmo responsável pode realizar mais de um cadastro. (O pagamento será feito por criança inscrita)."],
  ["Como consulto a situação?", "Use o CPF do responsável na página Consultar inscrição."],
  ["Quais dados são coletados?", "Nome e nascimento da criança; nome, nascimento, CPF, telefone e e-mail do responsável; além de uma observação opcional. Não pedimos endereço, religião ou gênero."],
  ["Como altero ou cancelo uma inscrição?", `Fale com a equipe pelo WhatsApp ${lumine.phone} e informe o código de inscrição. Será reembolsado o valor integral pago, caso a solicitação seja feita até 24 horas após o pagamento e valor parcial até 72 horas. Após esse prazo, não haverá reembolso.`],
  ["Pode participar crianças de qualquer faixa etária?", "Não, apenas crianças com idade entre 4 e 14 anos (Crianças entre 4 e 7 anos deverão ser acompanhadas nas atividades)."],
];

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-heading page-heading--yellow">
          <div className="shell narrow-shell">
            <span className="eyebrow">Dúvidas sobre o evento</span>
            <h1>Perguntas frequentes</h1>
            <p>As respostas serão atualizadas à medida que a programação for confirmada.</p>
          </div>
        </section>
        <section className="section">
          <div className="shell narrow-shell">
            <Accordion className="faq-list" type="single" collapsible>{questions.map(([question, answer], index) => 
              <AccordionItem key={question} value={`item-${index}`}>
                <AccordionTrigger>
                  {question}
                </AccordionTrigger>
                <AccordionContent>
                  <p>{answer}</p>
                </AccordionContent>
              </AccordionItem>)}
            </Accordion>
            <div className="faq-contact">
              <h2>Ainda tem dúvidas?</h2>
              <p>A equipe Lumine está pronta para ajudar.</p>
              <a className="button button--primary" href={lumine.phoneHref} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
              <Link className="button button--secondary" href="/festival">Voltar ao Festival</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

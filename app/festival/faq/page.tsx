import type { Metadata } from "next";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { lumine } from "@/lib/site-data";

export const metadata: Metadata = { title: "Perguntas frequentes" };

const questions = [
  ["Precisa ser aluno do Lumine para participar?", "Não. O Festival Lumine de Artes será aberto a crianças de toda a comunidade."],
  ["A inscrição já garante a vaga?", "O cadastro fica inicialmente como “recebido”. A vaga será confirmada pela equipe após a definição de data, faixa etária, capacidade e eventual taxa."],
  ["Haverá taxa de inscrição?", "O valor ainda está em definição. Nenhum pagamento é cobrado pelo formulário atual; a equipe informará antecipadamente caso haja taxa."],
  ["Como faço a inscrição?", "Acesse a página de inscrição, preencha os dados da criança e do responsável legal, leia os termos e conclua. Guarde o código exibido ao final."],
  ["Posso inscrever mais de uma criança?", "Sim. Faça uma inscrição separada para cada criança. O mesmo responsável pode realizar mais de um cadastro."],
  ["Como consulto a situação?", "Use o código FLA recebido ao final do cadastro e o CPF do responsável na página Consultar inscrição."],
  ["Quais dados são coletados?", "Nome e nascimento da criança; nome, CPF, telefone e e-mail do responsável; além de uma observação opcional. Não pedimos endereço, religião ou gênero."],
  ["Como altero ou cancelo uma inscrição?", `Fale com a equipe pelo WhatsApp ${lumine.phone} e informe o código de inscrição.`],
];

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-heading page-heading--yellow"><div className="shell narrow-shell"><span className="eyebrow">Dúvidas sobre o evento</span><h1>Perguntas frequentes</h1><p>As respostas serão atualizadas à medida que a programação for confirmada.</p></div></section>
        <section className="section"><div className="shell narrow-shell"><Accordion className="faq-list" type="single" collapsible>{questions.map(([question, answer], index) => <AccordionItem key={question} value={`item-${index}`}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent><p>{answer}</p></AccordionContent></AccordionItem>)}</Accordion><div className="faq-contact"><h2>Ainda tem dúvidas?</h2><p>A equipe Lumine está pronta para ajudar.</p><a className="button button--primary" href={lumine.phoneHref} target="_blank" rel="noreferrer">Falar no WhatsApp</a><Link className="button button--secondary" href="/festival">Voltar ao Festival</Link></div></div></section>
      </main>
      <SiteFooter />
    </>
  );
}

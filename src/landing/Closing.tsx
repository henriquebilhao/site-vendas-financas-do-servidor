import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp, Lock, Mail, Minus, Plus, ShieldCheck } from 'lucide-react';
import { LogoFS } from '../components/LogoFS';
import { LINKS } from './data';
import { SectionTitle } from './ui';

/* ---------- FAQ ---------- */
const FAQ = [
  {
    q: 'Preciso dar senha do banco, do Gov.br ou do Portal do Servidor?',
    a: 'Não. Nunca vamos pedir senha de banco, Gov.br, Portal do Servidor, Siape ou consignatária. O assistente trabalha só com as mensagens, áudios, fotos e PDFs que você mesmo envia no WhatsApp.',
  },
  {
    q: 'Como eu acesso o meu painel?',
    a: 'Os registros são feitos no WhatsApp que você já usa. Depois da assinatura, você recebe o aplicativo do Finanças do Servidor para instalar e acompanhar o seu painel completo.',
  },
  {
    q: 'Funciona para quem tem a rotina corrida?',
    a: 'Foi pensado para isso. Você registra na hora, por áudio, no intervalo, no deslocamento ou saindo do expediente ou do plantão, sem precisar parar para digitar.',
  },
  {
    q: 'Ele entende áudio com vários gastos de uma vez?',
    a: 'Sim. Um áudio como "almoço 32 e 15 de estacionamento" vira dois lançamentos, cada um na sua categoria.',
  },
  {
    q: 'Posso mandar PDF de fatura, boleto ou comprovante?',
    a: 'Pode. Além de texto, áudio e foto da nota fiscal, o assistente lê arquivos PDF enviados no WhatsApp e registra o lançamento com valor, data e categoria.',
  },
  {
    q: 'Consigo separar o salário de outras entradas?',
    a: 'Sim. Salário, 13º, férias, restituição e qualquer renda extra ficam em categorias separadas, para você saber de onde vem cada real.',
  },
  {
    q: 'É só para quem trabalha na segurança pública?',
    a: 'Não. É para servidores públicos em geral: educação, saúde, administração, segurança pública e outras áreas, nas esferas municipal, estadual e federal. Quem não é servidor também pode usar.',
  },
  {
    q: 'Posso usar junto com minha esposa ou meu marido?',
    a: 'Sim. Com a opção de dependente, cada um usa o próprio WhatsApp e tudo aparece no mesmo painel. No Plano Anual o dependente já vem incluso.',
  },
  {
    q: 'O que o Plano Anual tem a mais?',
    a: 'Além de tudo dos outros planos, o anual libera o Diagnóstico financeiro completo e os Simuladores de crédito e amortização, inclui um dependente sem custo, suporte prioritário, acesso à comunidade VIP no WhatsApp para tirar dúvidas entre membros e um encontro ao vivo todo mês com um especialista financeiro.',
  },
  {
    q: 'Tem limite de mensagens ou de registros?',
    a: 'Não. Os registros são ilimitados em todos os planos, inclusive no teste grátis.',
  },
  {
    q: 'Como funciona a garantia de 7 dias?',
    a: 'Depois da compra você tem 7 dias para usar. Se não gostar, peça o reembolso pela Hotmart ou pelo suporte e recebe 100% do valor de volta.',
  },
  {
    q: 'Posso cancelar quando quiser?',
    a: 'Sim. O plano mensal pode ser cancelado a qualquer momento, sem multa.',
  },
];

export const Faq: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-navy-900 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes." sub="Não achou a sua? Fale com o nosso suporte humano." />
        <div className="divide-y divide-white/10 border-y border-white/10">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-[16px] font-semibold text-white sm:text-[17px]">{f.q}</span>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${isOpen ? 'bg-amber-400 text-slate-950' : 'bg-white/5 text-slate-300'}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 leading-relaxed text-slate-300">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* contato do suporte */}
        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-semibold text-white">Ainda ficou com dúvida?</p>
            <p className="text-[14px] text-slate-400">Escreva para o nosso suporte que a gente te ajuda.</p>
          </div>
          <a
            href={`mailto:${LINKS.suporteEmail}`}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-amber-400/40 px-4 py-2.5 text-[13px] font-semibold [overflow-wrap:anywhere] sm:text-[14px] text-amber-300 transition hover:bg-amber-400/10"
          >
            <Mail className="h-4 w-4 shrink-0" /> {LINKS.suporteEmail}
          </a>
        </div>
      </div>
    </section>
  );
};

/* ---------- Rodapé ---------- */
export const Footer: React.FC = () => (
  <footer className="border-t border-white/5 bg-navy-950 pb-28 pt-14 text-[13px] xl:pb-14 text-slate-500">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
      <div>
        <div className="flex items-center gap-2.5">
          <LogoFS size={34} />
          <span className="font-display text-[17px] font-bold text-white">Finanças do Servidor</span>
        </div>
        <p className="mt-4 max-w-sm leading-relaxed text-slate-400">
          O assistente financeiro no WhatsApp feito para servidores públicos, inclusive quem trabalha na segurança pública.
        </p>
        <div className="mt-4 flex gap-4 text-slate-400">
          <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-amber-400" /> Dados protegidos</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-amber-400" /> Compra segura Hotmart</span>
        </div>
      </div>
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">Navegação</p>
        <ul className="space-y-2">
          {[['Como funciona', '#plantao'], ['Teste agora', '#teste'], ['Planos', '#planos'], ['Dúvidas', '#faq']].map(([l, h]) => (
            <li key={h}><a href={h} className="hover:text-white">{l}</a></li>
          ))}
          <li><a href={LINKS.areaCliente} target="_blank" rel="noopener noreferrer" className="hover:text-white">Área do cliente</a></li>
        </ul>
      </div>
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">Suporte</p>
        <a href={`mailto:${LINKS.suporteEmail}`} className="flex items-start gap-2 break-all text-slate-300 hover:text-white">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" /> {LINKS.suporteEmail}
        </a>
        <p className="mt-2 leading-relaxed">Dúvidas, cancelamento ou reembolso: fale com a gente por e-mail.</p>
      </div>
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">Aviso</p>
        <p className="leading-relaxed">
          Este produto não tem vínculo com a Meta / WhatsApp Inc. nem com órgãos públicos. Seus dados financeiros não são
          vendidos nem compartilhados com terceiros.
        </p>
      </div>
    </div>
    <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center gap-4 border-t border-white/5 px-4 pt-6 sm:flex-row sm:justify-between sm:px-6">
      <p>© {new Date().getFullYear()} Finanças do Servidor. Todos os direitos reservados.</p>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-amber-400/40 px-4 py-2.5 text-[14px] font-semibold text-amber-300 transition hover:bg-amber-400/10"
      >
        <ArrowUp className="h-4 w-4" /> Voltar ao topo
      </button>
    </div>
  </footer>
);

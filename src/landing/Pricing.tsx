import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Star, User, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { LINKS, PRECOS, brl } from './data';
import { Reveal, SectionTitle } from './ui';

const BASE = [
  'Registros ilimitados',
  'Texto, áudio e foto da nota fiscal',
  'Painel financeiro completo',
  'Relatórios de entradas e saídas',
];

const Feature: React.FC<{ children: React.ReactNode; gold?: boolean }> = ({ children, gold }) => (
  <li className={`flex items-start gap-2.5 text-[14px] ${gold ? 'font-semibold text-amber-200' : 'text-slate-300'}`}>
    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${gold ? 'text-amber-400' : 'text-emerald-400'}`} />
    <span>{children}</span>
  </li>
);

export const Pricing: React.FC = () => {
  const [dep, setDep] = useState(false);

  const mensal = dep ? PRECOS.mensalCom : PRECOS.mensalSem;
  const tri = dep ? PRECOS.trimestralCom : PRECOS.trimestralSem;
  const triDe = mensal * 3;
  // o anual já inclui dependente, então compara com o mensal com dependente
  const anualDe = PRECOS.mensalCom * 12;
  const anualEconomia = anualDe - PRECOS.anual;
  const anualPct = Math.round((anualEconomia / anualDe) * 100);

  return (
    <section id="planos" className="relative overflow-hidden border-t border-white/5 bg-[#060c1d] py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-40 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[150px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Planos"
          title="Menos que um lanche no plantão por mês."
          sub="Todas as funções em todos os planos. A diferença é só o tempo de assinatura e o dependente."
        />

        {/* seletor único de dependente */}
        <Reveal className="mb-12 flex flex-col items-center gap-3">
          <p className="text-[14px] text-slate-400">Vai usar sozinho ou com alguém da família?</p>
          <div className="relative grid grid-cols-2 rounded-full border border-white/10 bg-white/[0.04] p-1">
            <motion.span
              className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-amber-400"
              animate={{ left: dep ? 'calc(50% + 0px)' : '4px' }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            />
            <button onClick={() => setDep(false)} className={`relative z-10 flex items-center justify-center gap-2 rounded-full whitespace-nowrap px-4 py-2.5 text-[14px] font-semibold sm:px-5 transition ${!dep ? 'text-slate-950' : 'text-slate-300'}`}>
              <User className="h-4 w-4" /> Só eu
            </button>
            <button onClick={() => setDep(true)} className={`relative z-10 flex items-center justify-center gap-2 rounded-full whitespace-nowrap px-4 py-2.5 text-[14px] font-semibold sm:px-5 transition ${dep ? 'text-slate-950' : 'text-slate-300'}`}>
              <Users className="h-4 w-4" /> Com dependente
            </button>
          </div>
        </Reveal>

        <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {/* Anual — primeiro no celular */}
          <Reveal className="order-first md:order-none xl:order-last" delay={0.15}>
            <div className="relative flex h-full flex-col rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-[#13204a] to-[#0a1226] p-7 shadow-2xl shadow-amber-400/10">
              <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-amber-400 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-950">
                <Star className="h-3 w-3 fill-slate-950" /> Mais escolhido
              </span>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-white">Anual VIP</h3>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-400">−{anualPct}%</span>
              </div>
              <p className="mt-1 text-[13px] text-slate-400">12 meses, dependente incluso</p>
              <div className="mt-5">
                <p className="text-[13px] text-slate-500"><span className="line-through">De R$ {brl(anualDe)}</span> <span className="text-[11px]">(12x mensal c/ dependente)</span></p>
                <p className="font-display text-5xl font-bold text-white">
                  <span className="text-2xl">R$</span> {brl(PRECOS.anual)}
                </p>
                <p className="mt-1 text-[14px] text-amber-300">equivale a R$ {brl(PRECOS.anual / 12)} por mês</p>
                <p className="mt-1 text-[13px] font-semibold text-emerald-400">Você economiza R$ {brl(anualEconomia)}</p>
              </div>
              <ul className="my-6 flex-1 space-y-2.5 border-t border-white/10 pt-6">
                {BASE.map((f) => <Feature key={f}>{f}</Feature>)}
                <Feature gold>Dependente incluso sem custo</Feature>
                <Feature gold>Suporte VIP prioritário no WhatsApp</Feature>
              </ul>
              <a href={LINKS.anual} target="_blank" rel="noopener noreferrer" className="btn-gold w-full rounded-xl py-4 text-[15px]">
                Assinar plano anual <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          {/* Grátis */}
          <Reveal>
            <div className="card flex h-full flex-col p-7">
              <h3 className="font-display text-xl font-bold text-white">Teste grátis</h3>
              <p className="mt-1 text-[13px] text-slate-400">Todas as funções por 3 dias</p>
              <div className="mt-5">
                <p className="text-[13px] text-transparent">.</p>
                <p className="font-display text-5xl font-bold text-white"><span className="text-2xl">R$</span> 0</p>
                <p className="mt-1 text-[14px] text-emerald-400">sem cartão de crédito</p>
              </div>
              <ul className="my-6 flex-1 space-y-2.5 border-t border-white/10 pt-6">
                {BASE.map((f) => <Feature key={f}>{f}</Feature>)}
              </ul>
              <a href={LINKS.testeGratis} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full rounded-xl py-4 text-[15px]">
                Começar pelo WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Mensal */}
          <Reveal delay={0.05}>
            <div className="card flex h-full flex-col p-7">
              <h3 className="font-display text-xl font-bold text-white">Mensal</h3>
              <p className="mt-1 text-[13px] text-slate-400">{dep ? 'Titular + 1 dependente' : 'Só o titular'}</p>
              <div className="mt-5">
                <p className="text-[13px] text-transparent">.</p>
                <p className="font-display text-5xl font-bold text-white">
                  <span className="text-2xl">R$</span> {brl(mensal)}
                </p>
                <p className="mt-1 text-[14px] text-slate-400">por mês · cancele quando quiser</p>
              </div>
              <ul className="my-6 flex-1 space-y-2.5 border-t border-white/10 pt-6">
                {BASE.map((f) => <Feature key={f}>{f}</Feature>)}
                {dep && <Feature gold>1 dependente incluso</Feature>}
              </ul>
              <a href={dep ? LINKS.mensalCom : LINKS.mensalSem} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full rounded-xl py-4 text-[15px]">
                Assinar mensal
              </a>
            </div>
          </Reveal>

          {/* Trimestral */}
          <Reveal delay={0.1}>
            <div className="card flex h-full flex-col p-7">
              <h3 className="font-display text-xl font-bold text-white">Trimestral</h3>
              <p className="mt-1 text-[13px] text-slate-400">{dep ? 'Titular + 1 dependente' : 'Só o titular'}</p>
              <div className="mt-5">
                <p className="text-[13px] text-slate-500 line-through">De R$ {brl(triDe)}</p>
                <p className="font-display text-5xl font-bold text-white">
                  <span className="text-2xl">R$</span> {brl(tri)}
                </p>
                <p className="mt-1 text-[14px] text-slate-400">a cada 3 meses · R$ {brl(tri / 3)}/mês</p>
              </div>
              <ul className="my-6 flex-1 space-y-2.5 border-t border-white/10 pt-6">
                {BASE.map((f) => <Feature key={f}>{f}</Feature>)}
                {dep && <Feature gold>1 dependente incluso</Feature>}
              </ul>
              <a href={dep ? LINKS.trimestralCom : LINKS.trimestralSem} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full rounded-xl py-4 text-[15px]">
                Assinar trimestral
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center sm:flex-row sm:p-8 sm:text-left">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-400">
            <ShieldCheck className="h-9 w-9" />
          </div>
          <div>
            <h4 className="font-display text-lg font-bold text-white">Garantia incondicional de 7 dias</h4>
            <p className="mt-1 text-[15px] leading-relaxed text-slate-400">
              Assine, use no seu WhatsApp e, se não for para você, peça o reembolso pela Hotmart ou pelo suporte. Você recebe
              100% do valor de volta, sem perguntas.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

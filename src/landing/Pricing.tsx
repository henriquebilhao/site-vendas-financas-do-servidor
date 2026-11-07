import React, { useState } from 'react';
import { ArrowRight, Calculator, Check, ClipboardCheck, Landmark, ShieldCheck, Star, User, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { LINKS, PRECOS, brl } from './data';
import { Reveal, SectionTitle } from './ui';

const BASE = [
  'Registros ilimitados',
  'Texto, áudio e foto da nota fiscal',
  'Painel financeiro completo',
  'Relatórios de entradas e saídas',
  'Calculadora de distribuição da renda',
];

/* Recursos que só o Plano Anual tem */
const EXCLUSIVOS_ANUAL = ['Diagnóstico financeiro completo', 'Simuladores de crédito e amortização'];

const SeloAnual: React.FC = () => (
  <span className="inline-block whitespace-nowrap rounded-full bg-amber-400 px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wide text-slate-950">
    Exclusivo do anual
  </span>
);

const Feature: React.FC<{ children: React.ReactNode; gold?: boolean; light?: boolean }> = ({ children, gold, light }) => (
  <li
    className={`flex items-start gap-2.5 text-[13.5px] leading-snug ${
      gold ? (light ? 'font-semibold text-amber-700' : 'font-semibold text-amber-200') : light ? 'text-slate-700' : 'text-slate-300'
    }`}
  >
    <Check
      className={`mt-0.5 h-4 w-4 shrink-0 ${
        gold ? (light ? 'text-amber-500' : 'text-amber-400') : light ? 'text-emerald-600' : 'text-emerald-400'
      }`}
    />
    <span>{children}</span>
  </li>
);

/* ---------- Ferramentas do app (seção antes dos planos) ---------- */
const FERRAMENTAS = [
  {
    icon: Calculator,
    t: 'Calculadora de distribuição da renda',
    anual: false,
    d: 'Informe sua renda fixa e extra e veja quanto separar por mês, por semana e por dia para despesas obrigatórias, despesas variáveis e reservas.',
    extra: 'Padrão Ideal 50/30/20, Aceitável 60/30/10 ou personalizado. Com um clique, os valores viram as metas do mês no app.',
  },
  {
    icon: ClipboardCheck,
    t: 'Diagnóstico financeiro completo',
    anual: true,
    d: 'Em 4 etapas (Receitas, Despesas, Diagnóstico e Plano RSC), veja se você está no Ideal, Aceitável ou Crítico pelo quanto da renda já começa o mês comprometida.',
    extra: 'Termômetro das despesas fixas e onde o dinheiro está pesando. Escolha Reduzir, Substituir ou Cortar, veja a economia em 12 meses e exporte em PDF.',
  },
  {
    icon: Landmark,
    t: 'Simuladores de crédito e amortização',
    anual: true,
    d: 'Simule consignado, empréstimo pessoal e financiamento e compare Price (parcelas fixas) e SAC (parcelas decrescentes) lado a lado.',
    extra: 'Teste amortizações extras e veja quanto de juros deixa de pagar e quantas parcelas a menos, com tabela mês a mês, gráfico e PDF.',
  },
];

export const AnnualExclusives: React.FC = () => (
  <section id="ferramentas" className="relative overflow-hidden bg-white py-12 sm:py-16">
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
      <SectionTitle
        light
        eyebrow="Ferramentas do app"
        title="Ferramentas para organizar e planejar seu dinheiro."
        sub="O Diagnóstico e os Simuladores são exclusivos do Plano Anual."
      />
      <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
        {FERRAMENTAS.map((r, i) => (
          <Reveal key={r.t} delay={i * 0.1}>
            <div className="card-light flex h-full flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-amber-400">
                  <r.icon className="h-6 w-6" />
                </div>
                {r.anual && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-amber-800">
                    Plano Anual
                  </span>
                )}
              </div>
              <h3 className="font-display mt-4 text-lg font-bold leading-snug text-navy-900 sm:text-xl">{r.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{r.d}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{r.extra}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8 text-center">
        <a href="#planos" className="btn-gold rounded-full px-7 py-4 text-[16px]">
          Ver os planos <ArrowRight className="h-5 w-5" />
        </a>
      </Reveal>
    </div>
  </section>
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
    <section id="planos" className="relative overflow-hidden bg-mist pb-10 pt-7 sm:pb-12 sm:pt-6">
      <div className="pointer-events-none absolute left-1/2 top-40 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-amber-200/40 blur-[150px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* título compacto para os cards caberem na tela */}
        <Reveal className="mb-4 text-center">
          <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700">
            Planos
          </span>
          <h2 className="font-display mt-3 text-[1.75rem] font-bold leading-[1.15] tracking-tight text-balance text-navy-900 sm:text-3xl lg:text-[2.25rem]">
            Menos que um lanche por mês.
          </h2>
          <p className="mt-2 text-[15px] text-slate-600 sm:text-[16px]">
            O assistente completo em todos os planos. O Anual inclui dependente e as ferramentas exclusivas.
          </p>
        </Reveal>

        {/* seletor único de dependente */}
        <Reveal className="mb-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
          <p className="text-[14px] text-slate-600">Vai usar sozinho ou com alguém da família?</p>
          <div className="relative grid grid-cols-2 rounded-full border border-slate-200 bg-white shadow-sm p-1">
            <motion.span
              className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-amber-400"
              animate={{ left: dep ? 'calc(50% + 0px)' : '4px' }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            />
            <button onClick={() => setDep(false)} className={`relative z-10 flex items-center justify-center gap-2 rounded-full whitespace-nowrap px-4 py-2.5 text-[14px] font-semibold sm:px-5 transition ${!dep ? 'text-slate-950' : 'text-slate-600'}`}>
              <User className="h-4 w-4" /> Só eu
            </button>
            <button onClick={() => setDep(true)} className={`relative z-10 flex items-center justify-center gap-2 rounded-full whitespace-nowrap px-4 py-2.5 text-[14px] font-semibold sm:px-5 transition ${dep ? 'text-slate-950' : 'text-slate-600'}`}>
              <Users className="h-4 w-4" /> Com dependente
            </button>
          </div>
        </Reveal>

        <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {/* Anual — primeiro no celular */}
          <Reveal className="order-first md:order-none xl:order-last" delay={0.15}>
            <div className="relative flex h-full flex-col rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-navy-700 to-navy-900 p-5 shadow-2xl sm:p-6 shadow-navy-900/30">
              <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-amber-400 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-950">
                <Star className="h-3 w-3 fill-slate-950" /> Mais escolhido
              </span>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-white">Anual VIP</h3>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold text-emerald-400">−{anualPct}%</span>
              </div>
              <p className="mt-1 text-[13px] text-slate-300">12 meses, dependente incluso</p>
              <div className="mt-4">
                <p className="text-[13px] text-slate-400"><span className="line-through">De R$ {brl(anualDe)}</span> <span className="text-[11px]">(12x mensal c/ dependente)</span></p>
                <p className="font-display text-[2.35rem] leading-none font-bold text-white">
                  <span className="text-2xl">R$</span> {brl(PRECOS.anual)}
                </p>
                <p className="mt-1 text-[14px] text-amber-300">equivale a R$ {brl(PRECOS.anual / 12)} por mês</p>
                <p className="mt-1 text-[13px] font-semibold text-emerald-400">Você economiza R$ {brl(anualEconomia)}</p>
              </div>
              <ul className="my-3.5 flex-1 space-y-1.5 border-t border-white/10 pt-4">
                {BASE.map((f) => <Feature key={f}>{f}</Feature>)}
                {/* grupo com um selo só, para o card caber na tela */}
                <li className="pt-1">
                  <SeloAnual />
                </li>
                {EXCLUSIVOS_ANUAL.map((f) => (
                  <Feature gold key={f}>
                    {f}
                  </Feature>
                ))}
                <Feature gold>Dependente incluso sem custo</Feature>
                <Feature gold>Suporte VIP prioritário no WhatsApp</Feature>
              </ul>
              <a href={LINKS.anual} target="_blank" rel="noopener noreferrer" className="btn-gold w-full rounded-xl py-3.5 text-[15px]">
                Assinar plano anual <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          {/* Grátis */}
          <Reveal>
            <div className="card-light flex h-full flex-col p-5 sm:p-6">
              <h3 className="font-display text-xl font-bold text-navy-900">Teste grátis</h3>
              <p className="mt-1 text-[13px] text-slate-600">Use o assistente por 7 dias</p>
              <div className="mt-4">
                <p className="text-[13px] text-transparent">.</p>
                <p className="font-display text-[2.35rem] leading-none font-bold text-navy-900"><span className="text-2xl">R$</span> 0</p>
                <p className="mt-1 text-[14px] text-emerald-600">sem cartão de crédito</p>
              </div>
              <ul className="my-3.5 flex-1 space-y-1.5 border-t border-slate-200 pt-4">
                {BASE.map((f) => <Feature light key={f}>{f}</Feature>)}
              </ul>
              <a href={LINKS.testeGratis} target="_blank" rel="noopener noreferrer" className="btn-ghost-light w-full rounded-xl py-3.5 text-[15px]">
                Começar pelo WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Mensal */}
          <Reveal delay={0.05}>
            <div className="card-light flex h-full flex-col p-5 sm:p-6">
              <h3 className="font-display text-xl font-bold text-navy-900">Mensal</h3>
              <p className="mt-1 text-[13px] text-slate-600">{dep ? 'Titular + 1 dependente' : 'Só o titular'}</p>
              <div className="mt-4">
                <p className="text-[13px] text-transparent">.</p>
                <p className="font-display text-[2.35rem] leading-none font-bold text-navy-900">
                  <span className="text-2xl">R$</span> {brl(mensal)}
                </p>
                <p className="mt-1 text-[14px] text-slate-600">por mês · cancele quando quiser</p>
              </div>
              <ul className="my-3.5 flex-1 space-y-1.5 border-t border-slate-200 pt-4">
                {BASE.map((f) => <Feature light key={f}>{f}</Feature>)}
                {dep && <Feature light gold>1 dependente incluso</Feature>}
              </ul>
              <a href={dep ? LINKS.mensalCom : LINKS.mensalSem} target="_blank" rel="noopener noreferrer" className="btn-ghost-light w-full rounded-xl py-3.5 text-[15px]">
                Assinar mensal
              </a>
            </div>
          </Reveal>

          {/* Trimestral */}
          <Reveal delay={0.1}>
            <div className="card-light flex h-full flex-col p-5 sm:p-6">
              <h3 className="font-display text-xl font-bold text-navy-900">Trimestral</h3>
              <p className="mt-1 text-[13px] text-slate-600">{dep ? 'Titular + 1 dependente' : 'Só o titular'}</p>
              <div className="mt-4">
                <p className="text-[13px] text-slate-500 line-through">De R$ {brl(triDe)}</p>
                <p className="font-display text-[2.35rem] leading-none font-bold text-navy-900">
                  <span className="text-2xl">R$</span> {brl(tri)}
                </p>
                <p className="mt-1 text-[14px] text-slate-600">a cada 3 meses · R$ {brl(tri / 3)}/mês</p>
              </div>
              <ul className="my-3.5 flex-1 space-y-1.5 border-t border-slate-200 pt-4">
                {BASE.map((f) => <Feature light key={f}>{f}</Feature>)}
                {dep && <Feature light gold>1 dependente incluso</Feature>}
              </ul>
              <a href={dep ? LINKS.trimestralCom : LINKS.trimestralSem} target="_blank" rel="noopener noreferrer" className="btn-ghost-light w-full rounded-xl py-3.5 text-[15px]">
                Assinar trimestral
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-5 rounded-3xl border border-slate-200 bg-white shadow-sm p-6 text-center sm:flex-row sm:p-8 sm:text-left">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-amber-400">
            <ShieldCheck className="h-9 w-9" />
          </div>
          <div>
            <h4 className="font-display text-lg font-bold text-navy-900">Garantia incondicional de 7 dias</h4>
            <p className="mt-1 text-[15px] leading-relaxed text-slate-600">
              Assine, use no seu WhatsApp e, se não for para você, peça o reembolso pela Hotmart ou pelo suporte. Você recebe
              100% do valor de volta, sem perguntas.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
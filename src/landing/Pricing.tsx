import React, { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Bell,
  Calculator,
  Check,
  ClipboardCheck,
  Headphones,
  Landmark,
  LayoutDashboard,
  MessagesSquare,
  ShieldCheck,
  Smartphone,
  Star,
  Target,
  User,
  Users,
  Video,
} from 'lucide-react';
import { motion } from 'motion/react';
import { CUPOM, LANCAMENTO_FIM, LINKS, PRECOS, brl } from './data';
import { Reveal, SectionTitle } from './ui';

/* Tudo o que vem em todos os planos (as funcionalidades do painel) */
const BASE = [
  'Assistente no WhatsApp 24h, registros ilimitados',
  'Registro por texto, áudio, foto e PDF',
  'Painel financeiro no computador e no celular',
  'Receitas, despesas e saldo do mês em tempo real',
  'Gastos separados por categoria',
  'Contas futuras, parcelas e lembretes de vencimento',
  'Metas de gastos e de economia, com alertas',
  'Relatórios de entradas, saídas e categorias',
  'Resumo semanal das metas no WhatsApp',
  'Calculadora de distribuição da renda',
];

/* Recursos que só o Plano Anual tem */
const EXCLUSIVOS_ANUAL = [
  'Diagnóstico financeiro completo',
  'Simuladores de crédito e amortização',
  'Comunidade VIP no WhatsApp para tirar dúvidas entre membros',
  'Encontro mensal ao vivo com especialista financeiro',
];

const SeloAnual: React.FC = () => (
  <span className="inline-block whitespace-nowrap rounded-full bg-amber-400 px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wide text-slate-950">
    Exclusivo do anual
  </span>
);

/* so: 'desktop' some no celular, 'celular' some no computador */
const Feature: React.FC<{ children: React.ReactNode; gold?: boolean; light?: boolean; so?: 'desktop' | 'celular' }> = ({ children, gold, light, so }) => (
  <li
    className={`${so === 'desktop' ? 'hidden md:flex' : so === 'celular' ? 'flex md:hidden' : 'flex'} items-start gap-2.5 text-[13.5px] leading-snug ${
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

/* Lista dos cartões claros: no celular mostra os 3 primeiros itens e um resumo do resto
   (a lista inteira já aparece no cartão do Anual, que vem primeiro). */
const BaseCurta: React.FC = () => (
  <>
    {BASE.map((f, i) => (
      <Feature light key={f} so={i > 2 ? 'desktop' : undefined}>
        {f}
      </Feature>
    ))}
    <Feature light so="celular">Categorias, contas futuras, metas, relatórios e calculadora</Feature>
  </>
);

/* ---------- Ferramentas do app (seção antes dos planos) ---------- */
const FERRAMENTAS = [
  {
    icon: Calculator,
    t: 'Calculadora de distribuição da renda',
    anual: false,
    img: '/prints/calculadora.png',
    alt: 'Tela da Calculadora no app: escolha do padrão de vida 50/30/20 ou 60/30/10 e gráfico de distribuição da renda',
    d: 'Informe sua renda fixa e extra e veja quanto separar por mês, por semana e por dia para despesas obrigatórias, despesas variáveis e reservas.',
    extra: 'Padrão Ideal 50/30/20, Aceitável 60/30/10 ou personalizado. Com um clique, os valores viram as metas do mês no app.',
  },
  {
    icon: ClipboardCheck,
    t: 'Diagnóstico financeiro completo',
    anual: true,
    img: '/prints/diagnostico.png',
    alt: 'Tela do Diagnóstico no app: classificação Ideal, renda líquida, despesas fixas, variáveis e reservas em porcentagem da renda',
    d: 'Em 4 etapas (Receitas, Despesas, Diagnóstico e Plano RSC), veja se você está no Ideal, Aceitável ou Crítico pelo quanto da renda já começa o mês comprometida.',
    extra: 'Termômetro das despesas fixas e onde o dinheiro está pesando. Escolha Reduzir, Substituir ou Cortar, veja a economia em 12 meses e exporte em PDF.',
  },
  {
    icon: Landmark,
    t: 'Simuladores de crédito e amortização',
    anual: true,
    img: '/prints/simuladores.png',
    alt: 'Tela dos Simuladores no app: valor da parcela, total a pagar, total de juros e comparação Price x SAC',
    d: 'Simule consignado, empréstimo pessoal e financiamento e compare Price (parcelas fixas) e SAC (parcelas decrescentes) lado a lado.',
    extra: 'Teste amortizações extras e veja quanto de juros deixa de pagar e quantas parcelas a menos, com tabela mês a mês, gráfico e PDF.',
  },
];

/* O que vem junto com o assistente */
const ENTREGAVEIS = [
  { icon: Smartphone, t: 'Assistente financeiro no WhatsApp', d: 'Registros ilimitados por texto, áudio, foto da nota fiscal e PDF, 24 horas por dia.' },
  { icon: LayoutDashboard, t: 'App do painel financeiro', d: 'Saldo, receitas, despesas, categorias e fluxo de caixa de 12 meses, no computador e no celular.' },
  { icon: BarChart3, t: 'Relatórios e resumo semanal', d: 'Relatórios de entradas, saídas e categorias no painel, e o resumo das suas metas toda semana no WhatsApp.' },
  { icon: Target, t: 'Metas e alertas', d: 'Defina limites por categoria, teto de gastos e metas de economia. O assistente avisa quando chegar perto.' },
  { icon: Bell, t: 'Contas futuras e lembretes', d: 'Parcelas, faturas e contas agendadas, com lembrete no WhatsApp antes de vencer.' },
  { icon: Users, t: 'Dependente incluso', d: 'Quem divide as contas com você usa o próprio WhatsApp, no mesmo painel, sem pagar nada a mais.' },
  { icon: MessagesSquare, t: 'Comunidade VIP no WhatsApp', d: 'Grupo exclusivo para tirar dúvidas e trocar experiências com outros membros.' },
  { icon: Video, t: 'Encontros mensais com especialista', d: 'Todo mês, um encontro ao vivo com um especialista financeiro para tirar suas dúvidas.' },
];

export const AnnualExclusives: React.FC = () => (
  <section id="ferramentas" className="relative overflow-hidden bg-white py-12 sm:py-16">
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
      <SectionTitle
        light
        eyebrow="Ferramentas e entregáveis"
        title="Muito mais do que um assistente: todas as ferramentas para organizar e planejar seu dinheiro."
        sub="Ao assinar, você leva o assistente no WhatsApp, o painel completo e as ferramentas abaixo. O Diagnóstico e os Simuladores são exclusivos do Plano Anual."
      />
      <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
        {FERRAMENTAS.map((r, i) => (
          <Reveal key={r.t} delay={i * 0.1}>
            <div className="card-light flex h-full flex-col p-5 sm:p-6">
              {/* print real da ferramenta (conta com dados de exemplo) */}
              <div className="relative -mx-1 -mt-1 mb-5 h-56 overflow-hidden rounded-2xl bg-navy-950 ring-1 ring-slate-200 sm:h-64">
                <img
                  src={r.img}
                  alt={r.alt}
                  width={364}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="mx-auto block h-full w-full max-w-[364px] object-cover object-top"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-navy-950 to-transparent" />
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-amber-400">
                <r.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display mt-4 text-lg font-bold leading-snug text-navy-900 sm:text-xl">{r.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{r.d}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{r.extra}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* o resto do que vem junto (antes ficava na dobra "Muito mais do que um assistente") */}
      {/* 6 colunas no PC (cada card ocupa 2) para a última fileira, com 2 cards, ficar centralizada */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        {ENTREGAVEIS.map(({ icon: I, t, d }, k) => (
          <Reveal
            key={t}
            delay={(k % 3) * 0.06}
            className={`lg:col-span-2 ${k === ENTREGAVEIS.length - 2 && ENTREGAVEIS.length % 3 === 2 ? 'lg:col-start-2' : ''}`}
          >
            <motion.div whileHover={{ y: -4 }} className="card-light relative flex h-full gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-navy-900 shadow-md shadow-amber-500/20">
                <I className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-[17px] font-bold leading-snug text-navy-900">{t}</h3>
                <p className="mt-1 text-[14.5px] leading-relaxed text-slate-600">{d}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8 text-center">
        <a href="#planos" className="btn-gold rounded-full px-7 py-4 text-[16px]">
          Quero receber tudo isso <ArrowRight className="h-5 w-5" />
        </a>
      </Reveal>
    </div>
  </section>
);

/* ---------- Por que o Anual compensa (entre os planos e as dúvidas) ---------- */
const BENEFICIOS_ANUAL = [
  { icon: ClipboardCheck, t: 'Diagnóstico financeiro completo', d: 'Descubra se sua renda está no Ideal, Aceitável ou Crítico e saia com um plano do que reduzir, substituir ou cortar.' },
  { icon: Landmark, t: 'Simuladores de crédito e amortização', d: 'Compare consignado, empréstimo e financiamento antes de assinar, e veja quanto de juros economiza amortizando.' },
  { icon: Users, t: 'Dependente incluso sem custo', d: 'Quem divide as contas com você usa o próprio WhatsApp, no mesmo painel. Nos outros planos, o dependente é pago à parte.' },
  { icon: MessagesSquare, t: 'Comunidade VIP no WhatsApp', d: 'Grupo exclusivo para tirar dúvidas e trocar experiências com outros membros.' },
  { icon: Video, t: 'Encontro mensal ao vivo', d: 'Todo mês, um encontro com um especialista financeiro para tirar suas dúvidas.' },
  { icon: Headphones, t: 'Suporte VIP prioritário', d: 'Atendimento prioritário no WhatsApp sempre que você precisar de ajuda.' },
];

export const AnnualBenefits: React.FC = () => {
  // quanto custa ficar 12 meses em cada plano
  const linhas = [
    { t: 'Mensal com dependente', s: `12 x R$ ${brl(PRECOS.mensalCom)}`, v: PRECOS.mensalCom * 12 },
    { t: 'Trimestral com dependente', s: `4 x R$ ${brl(PRECOS.trimestralCom)}`, v: PRECOS.trimestralCom * 4 },
    { t: 'Mensal, só o titular', s: `12 x R$ ${brl(PRECOS.mensalSem)}`, v: PRECOS.mensalSem * 12 },
    { t: 'Trimestral, só o titular', s: `4 x R$ ${brl(PRECOS.trimestralSem)}`, v: PRECOS.trimestralSem * 4 },
  ];
  const max = linhas[0].v;
  const economia = max - PRECOS.anual;
  const pct = Math.round((economia / max) * 100);

  return (
    <section id="anual" className="relative overflow-hidden bg-navy-800 py-12 sm:py-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-amber-400/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Plano Anual VIP"
          title="O Anual custa menos e entrega mais do que qualquer outro plano."
          sub="Em 12 meses, ele sai mais barato até do que os planos sem dependente. E é o único com o Diagnóstico, os Simuladores, a Comunidade VIP e os encontros ao vivo."
        />

        <div className="grid items-start gap-5 lg:grid-cols-5">
          {/* a conta de 12 meses, plano por plano */}
          <Reveal className="lg:col-span-2">
            <div className="rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-navy-700 to-navy-900 p-5 shadow-2xl shadow-navy-950/40 sm:p-6">
              <h3 className="font-display text-xl font-bold text-white">Quanto custam 12 meses</h3>
              <p className="mt-1 text-[14px] text-slate-300">A mesma conta, em cada plano.</p>

              <ul className="mt-5 space-y-3.5">
                {linhas.map((l) => (
                  <li key={l.t}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[14px] text-slate-300">
                        {l.t} <span className="whitespace-nowrap text-[12px] text-slate-400">({l.s})</span>
                      </span>
                      <span className="whitespace-nowrap text-[14px] font-semibold text-slate-200">R$ {brl(l.v)}</span>
                    </div>
                    <div className="mt-1.5 h-2 rounded-full bg-white/5">
                      <div className="h-2 rounded-full bg-slate-500" style={{ width: `${(l.v / max) * 100}%` }} />
                    </div>
                  </li>
                ))}
                <li className="border-t border-white/10 pt-3.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[15px] font-bold text-amber-300">
                      Anual VIP <span className="whitespace-nowrap text-[12px] font-semibold text-amber-200/80">(dependente incluso)</span>
                    </span>
                    <span className="font-display whitespace-nowrap text-xl font-bold text-white">R$ {brl(PRECOS.anual)}</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-white/5">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-500"
                      style={{ width: `${(PRECOS.anual / max) * 100}%` }}
                    />
                  </div>
                </li>
              </ul>

              <p className="mt-5 rounded-2xl bg-emerald-500/15 px-4 py-3 text-[15px] font-semibold leading-snug text-emerald-300">
                Até R$ {brl(economia)} a menos em 12 meses ({pct}% de economia) em relação ao Mensal com dependente.
              </p>

              <a href={LINKS.anual} target="_blank" rel="noopener noreferrer" className="btn-gold mt-5 w-full rounded-xl py-3.5 text-[15px]">
                Assinar plano anual <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[13px] text-slate-400">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" /> Garantia incondicional de 7 dias
              </p>
            </div>
          </Reveal>

          {/* o que só o Anual tem */}
          <div className="lg:col-span-3">
            <div className="grid gap-4 sm:grid-cols-2">
              {BENEFICIOS_ANUAL.map(({ icon: I, t, d }, k) => (
                <Reveal key={t} delay={(k % 2) * 0.06}>
                  <div className="card flex h-full gap-4 p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-500 text-navy-900 shadow-md shadow-amber-500/20">
                      <I className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-[17px] font-bold leading-snug text-white">{t}</h3>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-slate-300">{d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-4">
              <p className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-[14.5px] leading-relaxed text-slate-300">
                <b className="text-white">E tudo o que os outros planos têm:</b> assistente no WhatsApp 24h com registros
                ilimitados por texto, áudio, foto da nota fiscal e PDF, painel financeiro, metas com alertas, contas
                futuras com lembretes, relatórios e calculadora de distribuição da renda.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Pricing: React.FC = () => {
  const [dep, setDep] = useState(false);

  const mensal = dep ? PRECOS.mensalCom : PRECOS.mensalSem;
  const tri = dep ? PRECOS.trimestralCom : PRECOS.trimestralSem;
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

        {/* oferta de lançamento: some sozinha quando o prazo acaba */}
        {Date.now() < LANCAMENTO_FIM.getTime() && (
          <Reveal className="mb-4 text-center">
            <p className="mx-auto inline-block rounded-2xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-[14px] leading-snug text-amber-900 sm:text-[15px]">
              🚀 <b>Oferta de lançamento:</b> {CUPOM.pct}% de desconto com o cupom
              {CUPOM.codigo ? <b> {CUPOM.codigo}</b> : ' de lançamento'}, só até{' '}
              {LANCAMENTO_FIM.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'America/Sao_Paulo' })}.
            </p>
          </Reveal>
        )}

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
          {/* Anual — por último no celular (mesma ordem do PC: Grátis, Mensal, Trimestral, Anual) */}
          <Reveal className="order-last md:order-none xl:order-last" delay={0.15}>
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
                <BaseCurta />
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
                <BaseCurta />
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
                <p className="text-[13px] text-transparent">.</p>
                <p className="font-display text-[2.35rem] leading-none font-bold text-navy-900">
                  <span className="text-2xl">R$</span> {brl(tri)}
                </p>
                <p className="mt-1 text-[14px] text-slate-600">a cada 3 meses</p>
              </div>
              <ul className="my-3.5 flex-1 space-y-1.5 border-t border-slate-200 pt-4">
                <BaseCurta />
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

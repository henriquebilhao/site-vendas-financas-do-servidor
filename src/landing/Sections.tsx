import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  CalendarClock,
  Eye,
  HeartHandshake,
  KeyRound,
  Lock,
  TrendingUp,
  UserPlus,
  Wallet,
} from 'lucide-react';
import { AudioBubble, Bubble, PhoneFrame, PhotoBubble, Receipt, Reveal, SectionTitle } from './ui';

/* ---------- Dores do dia a dia ---------- */

const DORES = [
  {
    icon: CalendarClock,
    t: 'Escala que não para',
    d: '12x36, 24x72, plantão de fim de semana. Não sobra tempo para planilha, e o gasto fica sem anotar.',
  },
  {
    icon: Wallet,
    t: 'Salário que entra picado',
    d: 'Vencimento, escala extra, diárias, adicional. Fica difícil saber o que é fixo e o que é extra.',
  },
  {
    icon: TrendingUp,
    t: 'O mês acaba antes do salário',
    d: 'Pequenos gastos do plantão somam no fim do mês, e a fatura chega maior do que você esperava.',
  },
];

export const ForWho: React.FC = () => (
  <section className="relative py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <SectionTitle
        title={<>Quem protege todo mundo também merece ter o próprio dinheiro protegido.</>}
        sub="Um assistente com uma única missão: fazer o seu salário render. Sem planilha e sem complicação."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {DORES.map(({ icon: I, t, d }, i) => (
          <Reveal key={t} delay={i * 0.1}>
            <div className="card h-full p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                <I className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">{t}</h3>
              <p className="mt-2 leading-relaxed text-slate-400">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- Um plantão normal (linha do tempo + celular fixo) ---------- */
const PLANTAO = [
  {
    h: '06:50',
    t: 'Rendição do turno. O café já está anotado.',
    d: 'Escreva do jeito que vier na cabeça. O assistente entende valor, local e categoria.',
    chat: (
      <>
        <Bubble from="me" time="06:50">café 8,50 na padaria</Bubble>
        <Bubble from="bot" time="06:50">
          <Receipt title="✅ Despesa registrada" rows={[['Valor', 'R$ 8,50'], ['Categoria', 'Alimentação']]} />
        </Bubble>
      </>
    ),
  },
  {
    h: '12:40',
    t: 'Sem tempo para digitar? Mande um áudio.',
    d: 'Na viatura, no quartel ou entre uma ocorrência e outra. Um áudio com vários gastos vira vários registros.',
    chat: (
      <>
        <AudioBubble duration="0:06" caption="almoço 32 e 15 de estacionamento" />
        <Bubble from="bot" time="12:40">
          <Receipt title="✅ Entendi 2 gastos" rows={[['Almoço', 'R$ 32,00'], ['Estacionamento', 'R$ 15,00']]} />
        </Bubble>
      </>
    ),
  },
  {
    h: '18:20',
    t: 'Mercado depois do plantão? Mande a nota fiscal.',
    d: 'Tire uma foto da nota fiscal e pronto. O valor é lido e lançado na categoria certa.',
    chat: (
      <>
        <PhotoBubble />
        <Bubble from="bot" time="18:20">
          <Receipt title="✅ Nota fiscal lida" rows={[['Supermercado', 'R$ 184,30'], ['Categoria', 'Mercado']]} />
        </Bubble>
      </>
    ),
  },
  {
    h: 'Dia 20',
    t: 'Caiu a escala extra? Entra como receita.',
    d: 'Salário, escala extra, diárias e restituição ficam separados, para você saber de onde vem cada real.',
    chat: (
      <>
        <Bubble from="me" time="09:12">recebi 960 da escala extra</Bubble>
        <Bubble from="bot" time="09:12">
          <Receipt tone="in" title="🟢 Receita registrada" rows={[['Valor', '+ R$ 960,00'], ['Categoria', 'Renda extra']]} />
        </Bubble>
      </>
    ),
  },
  {
    h: '22:00',
    t: 'Antes de dormir, você sabe quanto sobra.',
    d: 'Pergunte como perguntaria a um amigo. A resposta chega na hora, com os seus números.',
    chat: (
      <>
        <Bubble from="me" time="22:00">quanto sobrou esse mês?</Bubble>
        <Bubble from="bot" time="22:00">
          <Receipt
            tone="in"
            title="💰 Saldo livre: R$ 3.214,70"
            rows={[['Entradas', 'R$ 9.410,00'], ['Saídas', 'R$ 6.195,30'], ['Maior gasto', 'Mercado']]}
          />
        </Bubble>
      </>
    ),
  },
];

export const ShiftTimeline: React.FC = () => {
  const [active, setActive] = useState(0);
  return (
    <section id="plantao" className="relative border-t border-white/5 bg-[#060c1d] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Como funciona"
          title="Um plantão normal. Só que o seu dinheiro está sob controle."
          sub="Cinco momentos de um dia comum e o que o assistente resolve em cada um, pelo WhatsApp."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* passos */}
          <div className="relative">
            <div className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-amber-400/60 via-white/10 to-transparent" />
            {PLANTAO.map((s, i) => (
              <motion.div
                key={s.h}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: '-45% 0px -45% 0px' }}
                className="relative flex gap-6 py-8 lg:min-h-[48vh] lg:items-center"
              >
                <div
                  className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold transition-all duration-500 ${
                    active === i ? 'border-amber-400 bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/30' : 'border-white/15 bg-[#0b1430] text-slate-400'
                  }`}
                >
                  {s.h}
                </div>
                <div className={`transition-opacity duration-500 ${active === i ? 'opacity-100' : 'lg:opacity-40'}`}>
                  <h3 className="font-display text-2xl font-bold text-white">{s.t}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-slate-400">{s.d}</p>
                  {/* no celular, o chat aparece junto do passo */}
                  <div className="wa-wallpaper mt-5 space-y-2 rounded-2xl p-3 lg:hidden">{s.chat}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* celular fixo no desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <PhoneFrame scrollKey={active}>
                <div className="flex flex-col gap-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35 }}
                      className="flex flex-col gap-2"
                    >
                      {PLANTAO[active].chat}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </PhoneFrame>
            </div>
          </div>
        </div>

        <Reveal className="mt-12 text-center">
          <a href="#planos" className="btn-gold rounded-full px-7 py-4 text-[16px]">
            Quero meu assistente <ArrowRight className="h-5 w-5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

/* ---------- Painel ---------- */
const MESES = [
  { m: 'mai', e: 8450, s: 7980 },
  { m: 'jun', e: 8450, s: 8320 },
  { m: 'jul', e: 9410, s: 7140 },
  { m: 'ago', e: 8450, s: 6820 },
  { m: 'set', e: 9890, s: 6510 },
  { m: 'out', e: 9410, s: 6195 },
];
const CATS = [
  ['Mercado', 31, 'bg-amber-400'],
  ['Casa e contas', 24, 'bg-blue-500'],
  ['Transporte', 18, 'bg-sky-400'],
  ['Alimentação', 15, 'bg-emerald-400'],
  ['Outros', 12, 'bg-slate-500'],
] as const;

export const DashboardShowcase: React.FC = () => (
  <section id="painel" className="relative overflow-hidden py-20 sm:py-28">
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-700/15 blur-[140px]" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
      <SectionTitle
        eyebrow="Painel financeiro"
        title="Cada mensagem vira um painel completo do seu mês."
        sub="Tudo o que você manda no WhatsApp aparece organizado no painel: entradas, saídas, categorias e evolução mês a mês."
      />

      <Reveal>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0a1226]/90 shadow-2xl shadow-black/50">
          <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-rose-500/70" />
            <span className="h-3 w-3 rounded-full bg-amber-400/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
            <span className="ml-3 rounded-md bg-white/5 px-3 py-1 text-[11px] text-slate-400">painel · Finanças do Servidor</span>
          </div>
          <div className="grid gap-4 p-4 sm:p-6 md:grid-cols-3">
            {[
              ['Entradas', 'R$ 9.410,00', '+11% vs. set', 'text-emerald-400'],
              ['Saídas', 'R$ 6.195,30', '−5% vs. set', 'text-rose-400'],
              ['Saldo livre', 'R$ 3.214,70', 'melhor mês do ano', 'text-amber-300'],
            ].map(([l, v, c, col]) => (
              <div key={l} className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                <p className="text-[12px] text-slate-400">{l}</p>
                <p className={`font-display mt-1 text-2xl font-bold ${col}`}>{v}</p>
                <p className="mt-1 text-[11px] text-slate-500">{c}</p>
              </div>
            ))}

            {/* gráfico de barras */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 md:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[13px] font-semibold text-white">Entradas x saídas · 6 meses</p>
                <div className="flex gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" />Entradas</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-400" />Saídas</span>
                </div>
              </div>
              <div className="flex h-44 items-end justify-between gap-2 sm:gap-4">
                {MESES.map((x, i) => (
                  <div key={x.m} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-36 w-full items-end justify-center gap-1">
                      {[
                        [x.e, 'bg-emerald-400'],
                        [x.s, 'bg-rose-400/80'],
                      ].map(([v, c], j) => (
                        <motion.div
                          key={j}
                          className={`w-full max-w-[16px] rounded-t ${c}`}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${Math.max(8, (((v as number) - 5500) / 4500) * 100)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.1 * i + j * 0.05, ease: 'easeOut' }}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-500">{x.m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* categorias */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
              <p className="mb-4 text-[13px] font-semibold text-white">Gastos por categoria</p>
              <div className="space-y-3.5">
                {CATS.map(([n, p, c], i) => (
                  <div key={n}>
                    <div className="mb-1 flex justify-between text-[12px]">
                      <span className="text-slate-300">{n}</span>
                      <span className="text-slate-500">{p}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        className={`h-full rounded-full ${c}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${p * 3}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.1 * i }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------- Dependente / casal ---------- */
export const Together: React.FC = () => (
  <section className="border-t border-white/5 bg-[#060c1d] py-20 sm:py-28">
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
      <Reveal>
        <div className="mb-4"><span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-300">Família</span></div>
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
          Divida o controle com quem divide as contas com você.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-slate-400">
          Adicione um dependente: cada um usa o próprio WhatsApp, e os gastos dos dois aparecem juntos no mesmo painel.
          Enquanto você está de plantão, a casa continua organizada.
        </p>
        <ul className="mt-6 space-y-3 text-slate-300">
          {['Cada pessoa registra pelo próprio WhatsApp', 'Um painel só com as contas da casa', 'Já incluso no Plano Anual'].map((t) => (
            <li key={t} className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">✓</span>
              {t}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="card mx-auto max-w-md p-6">
          <p className="text-[13px] font-semibold text-white">Pessoas com acesso</p>
          <div className="mt-4 space-y-3">
            {[
              ['V', 'Você', 'Titular', 'R$ 3.410,20 em gastos'],
              ['C', 'Camila', 'Dependente', 'R$ 2.785,10 em gastos'],
            ].map(([a, n, r, g]) => (
              <div key={n} className="flex items-center gap-3 rounded-2xl bg-white/[0.04] p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-900 font-bold text-white">{a}</div>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-white">{n}</p>
                  <p className="text-[12px] text-slate-500">{g}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${r === 'Titular' ? 'bg-amber-400/15 text-amber-300' : 'bg-blue-500/15 text-blue-300'}`}>{r}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-dashed border-white/10 p-3 text-[13px] text-slate-400">
            <span className="flex items-center gap-2"><UserPlus className="h-4 w-4" /> Total da casa no mês</span>
            <span className="font-display font-bold text-white">R$ 6.195,30</span>
          </div>
          <div className="wa-wallpaper mt-4 rounded-2xl p-3">
            <Bubble from="bot" time="20:15">
              <span className="text-[12px]">👋 Camila registrou <b>R$ 89,90</b> em Farmácia.</span>
            </Bubble>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------- Segurança ---------- */
const SEG = [
  { icon: KeyRound, t: 'Nenhuma senha', d: 'Não pedimos senha de banco, do Gov.br, do Portal do Servidor ou de consignatária.' },
  { icon: Eye, t: 'Só o que você manda', d: 'O assistente trabalha apenas com as mensagens, áudios e fotos que você envia.' },
  { icon: Lock, t: 'Dados protegidos', d: 'Suas informações ficam guardadas com segurança e nunca são vendidas a terceiros.' },
  { icon: HeartHandshake, t: 'Risco zero', d: 'Não gostou em 7 dias? Pede o reembolso pela Hotmart e recebe tudo de volta.' },
];

export const Security: React.FC = () => (
  <section id="seguranca" className="py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <SectionTitle
        eyebrow="Segurança"
        title="Você confia o seu dinheiro. A gente leva isso a sério."
        sub="Quem trabalha na segurança pública sabe o valor da discrição. Por isso o assistente não acessa nada além do que você manda."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SEG.map(({ icon: I, t, d }, i) => (
          <Reveal key={t} delay={i * 0.08}>
            <div className="card h-full p-6">
              <I className="h-7 w-7 text-amber-400" />
              <h3 className="font-display mt-4 text-lg font-bold text-white">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-400">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);


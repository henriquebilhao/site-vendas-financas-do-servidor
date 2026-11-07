import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  FileBarChart,
  LayoutDashboard,
  Lock,
  MessageCircle,
  Plus,
  Smartphone,
  Users,
} from 'lucide-react';
import { brl } from './data';
import { Reveal, SectionTitle } from './ui';
import { LogoFS } from '../components/LogoFS';

const MES = new Date().toLocaleString('pt-BR', { month: 'long' });

/* ==========================================================================
   Dobra: o painel por dentro (computador + celular, como na Finest)
   ========================================================================== */

const MESES = [
  { m: 'jun', e: 8450, s: 8320 },
  { m: 'jul', e: 9410, s: 7140 },
  { m: 'ago', e: 8450, s: 6820 },
  { m: 'set', e: 9890, s: 6510 },
  { m: 'out', e: 9410, s: 6195 },
  { m: 'nov', e: 9410, s: 5880 },
];
const CATS: [string, number][] = [
  ['Mercado', 31],
  ['Casa e contas', 24],
  ['Transporte', 18],
  ['Alimentação', 15],
  ['Outros', 12],
];

const RECURSOS = [
  'Entradas, saídas e saldo livre do mês em tempo real',
  'Gastos separados por categoria, sem você fazer nada',
  'Salário, escala extra e diárias como fontes separadas',
  'Contas pagas e contas pendentes lado a lado',
  'Evolução mês a mês para comparar com o mês anterior',
  'Lance pelo WhatsApp ou direto no painel',
];

const BrowserBar: React.FC<{ url: string; dark?: boolean }> = ({ url, dark }) => (
  <div className={`flex items-center gap-1.5 border-b px-4 py-2.5 ${dark ? 'border-white/5 bg-navy-950' : 'border-slate-200 bg-slate-100'}`}>
    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
    <span
      className={`ml-3 min-w-0 truncate rounded-md px-3 py-1 text-[11px] ${dark ? 'bg-white/5 text-slate-400' : 'bg-white text-slate-500'}`}
    >
      🔒 {url}
    </span>
  </div>
);

/* Mini painel do computador */
const DesktopMock: React.FC = () => {
  const max = 10000;
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/50">
      <BrowserBar url="painel.financasdoservidor.com.br/visao-geral" />
      <div className="flex">
        {/* menu lateral */}
        <div className="hidden w-36 shrink-0 flex-col gap-1 bg-navy-900 p-3 sm:flex">
          <div className="mb-3 flex items-center gap-2 px-1">
            <LogoFS size={22} />
            <span className="text-[10px] font-bold leading-tight text-white">Finanças do Servidor</span>
          </div>
          {[
            [LayoutDashboard, 'Visão geral', true],
            [ArrowDownLeft, 'Despesas'],
            [ArrowUpRight, 'Receitas'],
            [FileBarChart, 'Relatórios'],
            [Users, 'Família'],
          ].map(([Icon, l, on]) => {
            const I = Icon as React.ElementType;
            return (
              <span
                key={l as string}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10.5px] ${on ? 'bg-amber-400 font-semibold text-navy-950' : 'text-slate-300'}`}
              >
                <I className="h-3.5 w-3.5" /> {l as string}
              </span>
            );
          })}
        </div>

        {/* conteúdo */}
        <div className="min-w-0 flex-1 bg-slate-50 p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[13px] font-bold text-navy-900">Visão geral</p>
              <p className="text-[10px] text-slate-500">Resumo de {MES}</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9.5px] font-semibold text-emerald-700">● ao vivo</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              ['Entradas', 'R$ 9.410', 'bg-emerald-500'],
              ['Saídas', 'R$ 5.880', 'bg-rose-500'],
              ['Saldo livre', 'R$ 3.530', 'bg-amber-400'],
            ].map(([l, v, c]) => (
              <div key={l} className="rounded-xl border border-slate-200 bg-white p-2.5">
                <p className="flex items-center gap-1 text-[9.5px] text-slate-500">
                  <span className={`h-1.5 w-1.5 rounded-full ${c}`} /> {l}
                </p>
                <p className="font-display mt-0.5 text-[13px] font-bold tabular-nums text-navy-900 sm:text-[15px]">{v}</p>
              </div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-[1.4fr_1fr]">
            {/* entradas x saídas */}
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10.5px] font-semibold text-navy-900">Entradas x saídas</p>
                <div className="flex gap-2 text-[9px] text-slate-500">
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Entradas</span>
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-rose-400" />Saídas</span>
                </div>
              </div>
              <div className="flex h-28 items-end justify-between gap-1.5">
                {MESES.map((x, i) => (
                  <div key={x.m} className="flex flex-1 flex-col items-center gap-1" title={`${x.m}: entradas R$ ${brl(x.e)} · saídas R$ ${brl(x.s)}`}>
                    <div className="flex h-24 w-full items-end justify-center gap-[2px]">
                      {[
                        [x.e, 'bg-emerald-500'],
                        [x.s, 'bg-rose-400'],
                      ].map(([v, c], j) => (
                        <motion.div
                          key={j}
                          className={`w-full max-w-[10px] rounded-t-[3px] ${c}`}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${((v as number) / max) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.08 * i + j * 0.05, ease: 'easeOut' }}
                        />
                      ))}
                    </div>
                    <span className="text-[9px] text-slate-500">{x.m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* categorias */}
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <p className="mb-2 text-[10.5px] font-semibold text-navy-900">Gastos por categoria</p>
              <div className="space-y-2">
                {CATS.map(([n, p], i) => (
                  <div key={n}>
                    <div className="mb-0.5 flex justify-between text-[9.5px]">
                      <span className="text-slate-600">{n}</span>
                      <span className="tabular-nums text-slate-500">{p}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        className="h-full rounded-full bg-navy-600"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(p / CATS[0][1]) * 100}%` }}
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
      </div>
    </div>
  );
};

/* Mini painel no celular */
const MobileMock: React.FC = () => (
  <div className="rounded-[28px] border border-slate-600/60 bg-gradient-to-b from-slate-700 to-slate-900 p-[6px] shadow-2xl shadow-black/60">
    <div className="overflow-hidden rounded-[23px] bg-slate-50">
      <div className="bg-navy-900 px-3 pb-4 pt-4 text-white">
        <p className="text-[9px] text-slate-300">Olá, Carlos 👋</p>
        <p className="mt-2 text-[9px] text-slate-300">Saldo livre em {MES}</p>
        <p className="font-display text-[19px] font-bold leading-tight">R$ 3.530,00</p>
        <div className="mt-2 flex gap-2 text-[8.5px]">
          <span className="rounded-full bg-emerald-400/15 px-1.5 py-0.5 text-emerald-300">↑ R$ 9.410</span>
          <span className="rounded-full bg-rose-400/15 px-1.5 py-0.5 text-rose-300">↓ R$ 5.880</span>
        </div>
      </div>
      <div className="space-y-1.5 p-2.5">
        <p className="text-[9.5px] font-semibold text-navy-900">Últimos lançamentos</p>
        {[
          ['Café na padaria', '− 8,50', false],
          ['Escala extra', '+ 960,00', true],
          ['Supermercado', '− 184,30', false],
          ['Combustível', '− 150,00', false],
        ].map(([d, v, inc]) => (
          <div key={d as string} className="flex items-center gap-1.5 rounded-lg bg-white p-1.5 shadow-sm">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${inc ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}
            >
              {inc ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownLeft className="h-3 w-3" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[9px] font-medium text-navy-900">{d as string}</p>
              <p className="flex items-center gap-0.5 whitespace-nowrap text-[7.5px] text-[#00a884]">
                <MessageCircle className="h-2 w-2" /> via WhatsApp
              </p>
            </div>
            <span className="text-[9px] font-semibold tabular-nums text-navy-900">{v as string}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const DashboardFeatures: React.FC = () => (
  <section id="painel" className="relative overflow-hidden bg-navy-900 py-12 sm:py-16">
    <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[700px] rounded-full bg-blue-700/20 blur-[140px]" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
      <SectionTitle
        eyebrow="Painel financeiro"
        title={
          <>
            Cada mensagem vira um <span className="text-amber-300">painel completo</span> do seu mês.
          </>
        }
        sub="Você conversa no WhatsApp. O painel organiza tudo sozinho, no computador ou no celular."
      />

      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="min-w-0">
          <span className="inline-block rounded-full bg-amber-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-300">
            Controle pessoal e da família
          </span>
          <h3 className="font-display mt-4 text-3xl font-bold text-white md:text-4xl">Tudo o que você precisa ver, nada que atrapalhe.</h3>
          <p className="mt-4 leading-relaxed text-slate-300 md:text-lg">
            Abra o painel e entenda o mês em segundos: quanto entrou, quanto saiu, para onde foi e quanto ainda sobra.
          </p>
          <ul className="mt-8 space-y-3">
            {RECURSOS.map((r) => (
              <li key={r} className="flex items-start gap-3 text-slate-200">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {r}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#simulador" className="btn-gold rounded-full px-6 py-3.5 text-[15px]">
              Testar o painel agora <ArrowRight className="h-4 w-4" />
            </a>
            <span className="flex items-center gap-2 text-[13px] text-slate-400">
              <Smartphone className="h-4 w-4" /> Funciona no celular e no computador
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative min-w-0 pb-24 pr-4 sm:pb-20 sm:pr-14">
          <DesktopMock />
          <div className="float-slow absolute -bottom-2 right-0 w-[136px] sm:w-[180px]">
            <MobileMock />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ==========================================================================
   Dobra: simulador do painel (lançar receitas e despesas)
   ========================================================================== */

type Tipo = 'in' | 'out';
type Entry = { id: number; type: Tipo; desc: string; cat: string; v: number; date: string; paid: boolean };
type View = 'geral' | Tipo;

const CATEGORIAS: Record<Tipo, string[]> = {
  out: ['Casa e contas', 'Mercado', 'Alimentação', 'Transporte', 'Saúde', 'Educação', 'Lazer', 'Outros'],
  in: ['Salário', 'Escala extra', 'Diárias', 'Restituição', 'Outros'],
};

const ATALHOS: Record<Tipo, [string, number, string][]> = {
  out: [
    ['Mercado', 230, 'Mercado'],
    ['Combustível', 180, 'Transporte'],
    ['Farmácia', 64.9, 'Saúde'],
    ['Luz', 212.4, 'Casa e contas'],
  ],
  in: [
    ['Escala extra', 960, 'Escala extra'],
    ['Diárias', 540, 'Diárias'],
    ['Restituição IR', 1320, 'Restituição'],
  ],
};

const hoje = new Date();
const dia = (d: number) => {
  const ultimo = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate();
  return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(Math.min(d, ultimo)).padStart(2, '0')}`;
};
const hojeISO = dia(hoje.getDate());
const dataBR = (iso: string) => iso.split('-').reverse().slice(0, 2).join('/');

const INICIAIS: Entry[] = [
  { id: 1, type: 'in', desc: 'Salário', cat: 'Salário', v: 8450, date: dia(5), paid: true },
  { id: 2, type: 'out', desc: 'Aluguel', cat: 'Casa e contas', v: 1480, date: dia(5), paid: true },
  { id: 3, type: 'out', desc: 'Supermercado', cat: 'Mercado', v: 920, date: dia(8), paid: true },
  { id: 4, type: 'out', desc: 'Combustível', cat: 'Transporte', v: 610, date: dia(10), paid: true },
  { id: 5, type: 'out', desc: 'Plano de saúde', cat: 'Saúde', v: 420, date: dia(15), paid: false },
  { id: 6, type: 'out', desc: 'Escola das crianças', cat: 'Educação', v: 680, date: dia(20), paid: false },
  { id: 7, type: 'in', desc: 'Escala extra', cat: 'Escala extra', v: 960, date: dia(22), paid: false },
  { id: 8, type: 'out', desc: 'Internet', cat: 'Casa e contas', v: 119.9, date: dia(25), paid: false },
];

/* aceita "1.234,56", "1234,56" e "1234.56" */
const parseValor = (raw: string) => {
  let s = raw.replace(/[R$\s]/g, '');
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  const n = Number(s);
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : NaN;
};

const sum = (es: Entry[]) => es.reduce((a, e) => a + e.v, 0);

const porCategoria = (es: Entry[]) => {
  const m: Record<string, number> = {};
  es.forEach((e) => (m[e.cat] = (m[e.cat] || 0) + e.v));
  return Object.entries(m).sort((a, b) => b[1] - a[1]);
};

const statusLabel = (e: Entry) => (e.type === 'in' ? (e.paid ? 'Recebido' : 'A receber') : e.paid ? 'Pago' : 'Pendente');

/* ---------- peças do painel ---------- */

const Panel: React.FC<{ title?: string; caption?: string; children: React.ReactNode; className?: string }> = ({
  title,
  caption,
  children,
  className = '',
}) => (
  <div className={`rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 ${className}`}>
    {title && <p className="text-[14px] font-semibold text-navy-900">{title}</p>}
    {caption && <p className="mt-0.5 text-[12px] text-slate-500">{caption}</p>}
    {children}
  </div>
);

const Kpi: React.FC<{ label: string; value: number; note?: string; dot: string }> = ({ label, value, note, dot }) => (
  <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 sm:px-4 sm:py-3">
    <p className="flex items-center gap-1.5 text-[11.5px] text-slate-500 sm:text-[12px]">
      <span className={`h-2 w-2 rounded-full ${dot}`} /> {label}
    </p>
    <motion.p
      key={value}
      initial={{ opacity: 0.3, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="font-display mt-0.5 text-[16px] font-bold tabular-nums text-navy-900 sm:text-[19px]"
    >
      R$ {brl(value)}
    </motion.p>
    {note && <p className="kpi-note mt-0.5 text-[11px] text-slate-500">{note}</p>}
  </div>
);

const CategoryBars: React.FC<{ entries: Entry[]; highlight?: string }> = ({ entries, highlight }) => {
  const cats = porCategoria(entries);
  const max = cats[0]?.[1] || 1;
  if (!cats.length) return <p className="mt-4 text-[13px] text-slate-500">Nenhum lançamento ainda.</p>;
  return (
    <div className="mt-3 space-y-2.5">
      {cats.map(([c, v]) => (
        <motion.div layout key={c} title={`${c}: R$ ${brl(v)}`}>
          <div className="mb-1 flex justify-between gap-3 text-[13px]">
            <span className={highlight === c ? 'font-semibold text-amber-600' : 'text-slate-700'}>{c}</span>
            <span className="tabular-nums text-slate-600">R$ {brl(v)}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              className={`h-full rounded-full ${highlight === c ? 'bg-amber-400' : 'bg-navy-600'}`}
              initial={false}
              animate={{ width: `${(v / max) * 100}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const EntryList: React.FC<{ entries: Entry[]; lastId: number | null; onToggle: (id: number) => void }> = ({
  entries,
  lastId,
  onToggle,
}) => (
  <ul className="mt-3 divide-y divide-slate-100">
    <AnimatePresence initial={false}>
      {entries.map((e) => (
        <motion.li
          key={e.id}
          layout
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`flex items-center gap-3 py-2 transition-colors ${lastId === e.id ? 'rounded-xl bg-amber-50 px-2' : ''}`}
        >
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              e.type === 'in' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
            }`}
          >
            {e.type === 'in' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-medium text-navy-900">{e.desc}</p>
            <p className="truncate text-[12px] text-slate-500">
              {e.cat} · {dataBR(e.date)}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[14px] font-semibold tabular-nums text-navy-900">
              {e.type === 'in' ? '+' : '−'} R$ {brl(e.v)}
            </p>
            {e.paid ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                <Check className="h-3 w-3" /> {statusLabel(e)}
              </span>
            ) : (
              <button
                onClick={() => onToggle(e.id)}
                className="text-[11px] font-semibold text-amber-700 underline-offset-2 hover:underline"
                title={e.type === 'in' ? 'Marcar como recebido' : 'Marcar como pago'}
              >
                {statusLabel(e)} · {e.type === 'in' ? 'receber' : 'pagar'}
              </button>
            )}
          </div>
        </motion.li>
      ))}
    </AnimatePresence>
  </ul>
);

/* ---------- formulário de novo lançamento ---------- */

const EntryForm: React.FC<{ type: Tipo; saldo: number; onType: (t: Tipo) => void; onAdd: (e: Omit<Entry, 'id'>) => void }> = ({
  type,
  saldo,
  onType,
  onAdd,
}) => {
  const [desc, setDesc] = useState('');
  const [valor, setValor] = useState('');
  const [date, setDate] = useState(hojeISO);
  const [cat, setCat] = useState(CATEGORIAS[type][0]);
  const [paid, setPaid] = useState(true);
  // ok: guarda a descrição lançada; o saldo é lido na hora, já atualizado
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const isIn = type === 'in';

  // depois de lançar, garante que a confirmação (com o saldo novo) fique visível
  const msgRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (msg) msgRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [msg]);

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const v = parseValor(valor);
    if (!desc.trim() || !date || !(v > 0)) {
      setMsg({ ok: false, text: 'Preencha a descrição, a data e um valor maior que zero.' });
      return;
    }
    onAdd({ type, desc: desc.trim(), cat, v, date, paid });
    setMsg({ ok: true, text: desc.trim() });
    setDesc('');
    setValor('');
  };

  const field =
    'w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[16px] text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 sm:text-[14px]';

  return (
    <Panel title="Novo lançamento">
      {/* despesa / receita */}
      <div className="mt-3 grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-[13px] font-semibold">
        {(['out', 'in'] as Tipo[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onType(t)}
            aria-pressed={type === t}
            className={`rounded-lg py-1.5 transition ${
              type === t ? (t === 'in' ? 'bg-emerald-600 text-white shadow' : 'bg-rose-600 text-white shadow') : 'text-slate-600'
            }`}
          >
            {t === 'in' ? 'Receita' : 'Despesa'}
          </button>
        ))}
      </div>

      <div className="no-scrollbar -mx-1 mt-2.5 flex gap-1.5 overflow-x-auto px-1 pb-0.5 lg:flex-wrap lg:overflow-visible">
        {ATALHOS[type].map(([d, v, c]) => (
          <button
            key={d}
            type="button"
            onClick={() => {
              setDesc(d);
              setValor(brl(v));
              setCat(c);
              setMsg(null);
            }}
            className="shrink-0 whitespace-nowrap rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[12px] text-slate-700 transition hover:border-amber-400 hover:bg-amber-50"
          >
            {d} · R$ {Number.isInteger(v) ? v.toLocaleString('pt-BR') : brl(v)}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-2.5 space-y-2.5" noValidate>
        <input
          className={field}
          aria-label="Descrição"
          placeholder={isIn ? 'Descrição (ex.: Escala extra)' : 'Descrição (ex.: Mercado)'}
          value={desc}
          maxLength={60}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2.5">
          <input
            className={field}
            aria-label="Valor"
            inputMode="decimal"
            placeholder="R$ 0,00"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
          <input className={field} aria-label="Data" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
        <select className={field} aria-label="Categoria" value={cat} onChange={(e) => setCat(e.target.value)}>
          {CATEGORIAS[type].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-1 text-[12.5px]">
          {[true, false].map((p) => (
            <label
              key={String(p)}
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-1 text-center leading-tight transition ${
                paid === p ? 'border-navy-600 bg-navy-600/5 font-semibold text-navy-900' : 'border-slate-200 text-slate-600'
              }`}
            >
              <input type="radio" name="status" className="sr-only" checked={paid === p} onChange={() => setPaid(p)} />
              {p ? (isIn ? 'Já recebi' : 'Já paguei') : isIn ? 'A receber' : 'A pagar'}
            </label>
          ))}
        </div>
        </div>
        <button
          type="submit"
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[15px] font-bold text-white transition active:scale-[0.98] ${
            isIn ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
          }`}
        >
          <Plus className="h-4 w-4" /> Lançar {isIn ? 'receita' : 'despesa'}
        </button>
        <AnimatePresence>
          {msg && (
            <motion.p
              ref={msgRef}
              key={msg.text}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role={msg.ok ? 'status' : 'alert'}
              className={`rounded-xl px-3 py-2 text-[13px] ${msg.ok ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}
            >
              {msg.ok ? (
                <>
                  ✅ “{msg.text}” lançado! Saldo livre agora: <b>R$ {brl(saldo)}</b>
                </>
              ) : (
                <>⚠️ {msg.text}</>
              )}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </Panel>
  );
};

/* ---------- telas ---------- */

const NAV: { key: View; label: string; icon: React.ElementType; url: string }[] = [
  { key: 'geral', label: 'Visão geral', icon: LayoutDashboard, url: 'visao-geral' },
  { key: 'out', label: 'Despesas', icon: ArrowDownLeft, url: 'despesas' },
  { key: 'in', label: 'Receitas', icon: ArrowUpRight, url: 'receitas' },
];
const BLOQUEADOS: { label: string; icon: React.ElementType }[] = [
  { label: 'Relatórios', icon: FileBarChart },
  { label: 'Família', icon: Users },
];

export const DashboardSimulator: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>(INICIAIS);
  const [view, setView] = useState<View>('geral');
  const [lastId, setLastId] = useState<number | null>(null);
  const [lastCat, setLastCat] = useState<string | undefined>();

  const add = (e: Omit<Entry, 'id'>) => {
    const id = Date.now();
    setEntries((es) => [{ ...e, id }, ...es]);
    setLastId(id);
    setLastCat(e.cat);
  };
  const toggle = (id: number) => setEntries((es) => es.map((e) => (e.id === id ? { ...e, paid: true } : e)));
  const reset = () => {
    setEntries(INICIAIS);
    setLastId(null);
    setLastCat(undefined);
  };

  const k = useMemo(() => {
    const ins = entries.filter((e) => e.type === 'in');
    const outs = entries.filter((e) => e.type === 'out');
    const pendentes = outs.filter((e) => !e.paid);
    return {
      ins,
      outs,
      receitas: sum(ins),
      aReceber: sum(ins.filter((e) => !e.paid)),
      despesas: sum(outs),
      pago: sum(outs.filter((e) => e.paid)),
      aPagar: sum(pendentes),
      nPendentes: pendentes.length,
    };
  }, [entries]);
  const saldo = k.receitas - k.despesas;
  const pctPago = k.despesas ? (k.pago / k.despesas) * 100 : 0;

  const atual = NAV.find((n) => n.key === view)!;

  return (
    <section id="simulador" className="relative overflow-hidden bg-white py-10 sm:py-12">
      <div className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-amber-100/60 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* título compacto: a janela do simulador precisa caber inteira na tela */}
        <Reveal className="mb-5 text-center sm:mb-6">
          <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700">
            Experimente o painel
          </span>
          <h2 className="font-display mt-3 text-[1.6rem] font-bold leading-[1.15] tracking-tight text-balance text-navy-900 sm:text-3xl lg:text-[2.1rem]">
            Lance uma receita ou despesa e veja o painel mudar na hora.
          </h2>
        </Reveal>

        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-navy-900/15">
            <BrowserBar url={`painel.financasdoservidor.com.br/${atual.url}`} />

            <div className="flex flex-col md:flex-row lg:h-[clamp(440px,calc(100svh-285px),600px)]">
              {/* menu: lateral no computador, abas no celular */}
              <aside className="shrink-0 bg-navy-900 md:w-56 md:p-4">
                <div className="mb-5 hidden items-center gap-2.5 px-1 md:flex">
                  <LogoFS size={30} />
                  <span className="text-[13px] font-bold leading-tight text-white">Finanças do Servidor</span>
                </div>
                <nav className="no-scrollbar flex gap-1 overflow-x-auto p-2 md:flex-col md:overflow-visible md:p-0" aria-label="Menu do simulador">
                  {NAV.map((n) => (
                    <button
                      key={n.key}
                      onClick={() => setView(n.key)}
                      aria-current={view === n.key ? 'page' : undefined}
                      className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13.5px] transition ${
                        view === n.key ? 'bg-amber-400 font-semibold text-navy-950' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <n.icon className="h-4 w-4" /> {n.label}
                    </button>
                  ))}
                  {BLOQUEADOS.map((n) => (
                    <span
                      key={n.label}
                      title={`${n.label}: disponível no painel completo`}
                      className="flex shrink-0 cursor-not-allowed items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13.5px] text-slate-500"
                    >
                      <n.icon className="h-4 w-4" /> {n.label} <Lock className="ml-auto h-3 w-3" />
                    </span>
                  ))}
                </nav>
              </aside>

              <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-slate-50">
                <header className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-4 py-2.5 sm:px-5">
                  <div>
                    <h3 className="font-display text-[17px] font-bold text-navy-900 sm:text-[18px]">{view === 'geral' ? 'Visão geral' : atual.label}</h3>
                    <p className="text-[12.5px] text-slate-500">
                      {view === 'geral' ? `Suas finanças em ${MES}` : 'Lançamentos do mês'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800">Demonstração</span>
                    <button onClick={reset} className="rounded-full px-2.5 py-1 text-[12px] text-slate-500 hover:text-navy-900">
                      Recomeçar
                    </button>
                  </div>
                </header>

                <div className="shrink-0 px-3 pt-3 sm:px-5">
                  <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3">
                    <Kpi label="Receitas" value={k.receitas} dot="bg-emerald-500" note={k.aReceber ? `R$ ${brl(k.aReceber)} a receber` : 'tudo recebido'} />
                    <Kpi label="Despesas" value={k.despesas} dot="bg-rose-500" note={`R$ ${brl(k.pago)} já pagos`} />
                    <Kpi label="Saldo livre" value={saldo} dot="bg-amber-400" note="receitas − despesas" />
                    <Kpi
                      label="A pagar"
                      value={k.aPagar}
                      dot="bg-slate-400"
                      note={k.nPendentes ? `${k.nPendentes} conta${k.nPendentes > 1 ? 's' : ''} pendente${k.nPendentes > 1 ? 's' : ''}` : 'nada pendente 🎉'}
                    />
                  </div>
                </div>

                {/* só esta parte rola por dentro da janela */}
                <div className="min-h-0 flex-1 p-3 sm:px-5 lg:overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={view}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {view === 'geral' ? (
                        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                          <Panel title="Situação das despesas" caption="O que já foi pago e o que ainda vence no mês">
                            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                              <motion.div
                                className="h-full rounded-full bg-emerald-500"
                                initial={false}
                                animate={{ width: `${pctPago}%` }}
                                transition={{ duration: 0.6 }}
                              />
                            </div>
                            <div className="mt-2 flex justify-between text-[12.5px] text-slate-600">
                              <span>
                                <b className="text-navy-900">Pago</b> {pctPago.toFixed(0)}% · R$ {brl(k.pago)}
                              </span>
                              <span>
                                <b className="text-navy-900">Pendente</b> {(100 - pctPago).toFixed(0)}%
                              </span>
                            </div>
                            {k.aPagar > 0 && (
                              <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-[13px] text-amber-900">
                                ⚡ Você tem <b>R$ {brl(k.aPagar)}</b> em contas pendentes este mês.
                              </p>
                            )}
                            <div className="mt-3 flex flex-wrap gap-2">
                              <button
                                onClick={() => setView('out')}
                                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-rose-700"
                              >
                                <Plus className="h-3.5 w-3.5" /> Nova despesa
                              </button>
                              <button
                                onClick={() => setView('in')}
                                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-emerald-700"
                              >
                                <Plus className="h-3.5 w-3.5" /> Nova receita
                              </button>
                            </div>
                          </Panel>

                          <Panel title="Gastos por categoria" caption="Onde o seu dinheiro foi parar">
                            <CategoryBars entries={k.outs} highlight={lastCat} />
                          </Panel>

                          <Panel title="Últimos lançamentos" caption="Toque em “pagar” para dar baixa numa conta" className="lg:col-span-2">
                            <EntryList entries={entries.slice(0, 5)} lastId={lastId} onToggle={toggle} />
                          </Panel>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,390px)_1fr] lg:items-start">
                          <EntryForm key={view} type={view} saldo={saldo} onType={(t) => setView(t)} onAdd={add} />
                          <div className="space-y-3">
                            <Panel
                              title={view === 'in' ? 'Receitas por fonte' : 'Despesas por categoria'}
                              caption={`${(view === 'in' ? k.ins : k.outs).length} lançamentos · R$ ${brl(view === 'in' ? k.receitas : k.despesas)}`}
                            >
                              <CategoryBars entries={view === 'in' ? k.ins : k.outs} highlight={lastCat} />
                            </Panel>
                            <Panel title={view === 'in' ? 'Receitas do mês' : 'Despesas do mês'} className="max-h-[320px] overflow-y-auto lg:max-h-none">
                              <EntryList entries={view === 'in' ? k.ins : k.outs} lastId={lastId} onToggle={toggle} />
                            </Panel>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-6 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:gap-5">
          <p className="text-[13px] text-slate-500">No sistema real, o que você manda pelo WhatsApp aparece aqui sozinho.</p>
          <a href="#planos" className="btn-gold rounded-full px-6 py-3 text-[15px]">
            Quero esse painel <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

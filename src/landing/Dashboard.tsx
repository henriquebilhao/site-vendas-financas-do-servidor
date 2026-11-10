import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Activity,
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Calculator,
  CalendarCheck,
  CalendarClock,
  Check,
  Clock,
  FileBarChart,
  LayoutDashboard,
  LineChart,
  MessageCircle,
  Plus,
  Smartphone,
  Tags,
  Target,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { brl } from './data';
import { Reveal, SectionTitle } from './ui';
import { LogoFS } from '../components/LogoFS';

const MES = new Date().toLocaleString('pt-BR', { month: 'long' });

/* ==========================================================================
   Dobra: o painel por dentro (computador + celular, como na Finest)
   ========================================================================== */

const RECURSOS = [
  'Entradas, saídas e saldo livre do mês em tempo real',
  'Gastos separados por categoria, sem você fazer nada',
  'Salário, 13º, férias e rendas extras como fontes separadas',
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

/* Print real do painel no computador (conta com dados de exemplo) */
const DesktopMock: React.FC = () => (
  <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-950 shadow-2xl shadow-black/50">
    <BrowserBar dark url="membros.appfinancasdoservidor.digital/dashboard" />
    <img
      src="/prints/painel-computador.png"
      alt="Painel do Finanças do Servidor no computador: saldo do mês, receitas, despesas, fluxo de caixa de 12 meses e despesas por categoria"
      width={800}
      height={499}
      loading="lazy"
      decoding="async"
      className="block h-auto w-full"
    />
  </div>
);

/* Print real do painel no celular (conta com dados de exemplo) */
const MobileMock: React.FC = () => (
  <div className="rounded-[28px] border border-slate-600/60 bg-gradient-to-b from-slate-700 to-slate-900 p-[6px] shadow-2xl shadow-black/60">
    <div className="overflow-hidden rounded-[23px] bg-navy-950">
      <img
        src="/prints/painel-celular.png"
        alt="Painel do Finanças do Servidor no celular: saldo do mês, receitas, despesas, valores a receber e compras parceladas"
        width={364}
        height={788}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
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
          <div className="float-slow absolute -bottom-2 right-0 w-[150px] sm:w-[190px]">
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
  in: ['Salário', '13º e férias', 'Renda extra', 'Restituição', 'Outros'],
};

const ATALHOS: Record<Tipo, [string, number, string][]> = {
  out: [
    ['Mercado', 230, 'Mercado'],
    ['Combustível', 180, 'Transporte'],
    ['Farmácia', 64.9, 'Saúde'],
    ['Luz', 212.4, 'Casa e contas'],
  ],
  in: [
    ['Renda extra', 960, 'Renda extra'],
    ['13º salário', 4225, '13º e férias'],
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
  { id: 7, type: 'in', desc: 'Renda extra', cat: 'Renda extra', v: 960, date: dia(22), paid: false },
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

/* ---------- identidade visual do sistema real (membros.appfinancasdoservidor.digital) ---------- */
const APP = {
  bg: 'bg-[#0a0d12]',
  side: 'bg-[#0c1016]',
  card: 'rounded-2xl border border-[#1c232d] bg-[#10151c]',
  line: 'border-[#1c232d]',
  muted: 'text-[#8b95a5]',
  green: '#00e676',
};

/* cores das categorias, como no gráfico "Despesas por Categoria" do sistema */
const COR_CAT = ['#ef4444', '#f97316', '#eab308', '#8b5cf6', '#ec4899', '#22c55e', '#06b6d4', '#64748b'];

/* ---------- peças do painel ---------- */

const Panel: React.FC<{ title?: string; caption?: string; children: React.ReactNode; className?: string }> = ({
  title,
  caption,
  children,
  className = '',
}) => (
  <div className={`${APP.card} p-3.5 sm:p-4 ${className}`}>
    {title && <p className="font-display text-[15px] font-bold text-white">{title}</p>}
    {caption && <p className={`mt-0.5 text-[12px] ${APP.muted}`}>{caption}</p>}
    {children}
  </div>
);

const Kpi: React.FC<{ label: string; value: number; note?: string; tone: 'in' | 'out' | 'blue' | 'amber'; icon: React.ElementType }> = ({
  label,
  value,
  note,
  tone,
  icon: I,
}) => {
  const t = {
    in: 'bg-[#00e676]/12 text-[#00e676]',
    out: 'bg-[#ef4444]/12 text-[#f87171]',
    blue: 'bg-[#3b82f6]/12 text-[#60a5fa]',
    amber: 'bg-[#eab308]/12 text-[#facc15]',
  }[tone];
  return (
    <div className={`${APP.card} relative overflow-hidden px-3 py-3 sm:px-4`}>
      <span className={`flex h-9 w-9 items-center justify-center rounded-full ${t}`}>
        <I className="h-4 w-4" />
      </span>
      <p className={`mt-2 text-[12px] ${APP.muted}`}>{label}</p>
      <motion.p
        key={value}
        initial={{ opacity: 0.3, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-[17px] font-bold tabular-nums text-white sm:text-[20px]"
      >
        R$ {brl(value)}
      </motion.p>
      {note && <p className={`kpi-note mt-0.5 truncate text-[11px] ${APP.muted}`}>{note}</p>}
    </div>
  );
};

const CategoryBars: React.FC<{ entries: Entry[]; highlight?: string }> = ({ entries, highlight }) => {
  const cats = porCategoria(entries);
  const total = cats.reduce((a, [, v]) => a + v, 0) || 1;
  if (!cats.length) return <p className={`mt-4 text-[13px] ${APP.muted}`}>Nenhum lançamento ainda.</p>;
  return (
    <div className="mt-3 space-y-3">
      {cats.map(([c, v], i) => {
        const cor = COR_CAT[i % COR_CAT.length];
        const pct = (v / total) * 100;
        return (
          <motion.div layout key={c} title={`${c}: R$ ${brl(v)}`}>
            <div className="mb-1 flex items-center gap-2 text-[13px]">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: cor }} />
              <span className={`flex-1 truncate ${highlight === c ? 'font-semibold text-white' : 'text-slate-300'}`}>{c}</span>
              <span className={`tabular-nums ${APP.muted}`}>{pct.toFixed(0)}%</span>
              <span className="w-[86px] text-right font-semibold tabular-nums text-white">R$ {brl(v)}</span>
            </div>
            <div className="ml-4 h-1 overflow-hidden rounded-full bg-[#1c232d]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: cor }}
                initial={false}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const EntryList: React.FC<{ entries: Entry[]; lastId: number | null; onToggle: (id: number) => void }> = ({
  entries,
  lastId,
  onToggle,
}) => (
  <ul className={`mt-3 divide-y ${APP.line.replace('border', 'divide')}`}>
    <AnimatePresence initial={false}>
      {entries.map((e) => (
        <motion.li
          key={e.id}
          layout
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`flex items-center gap-3 py-2.5 transition-colors ${lastId === e.id ? 'rounded-xl bg-[#00e676]/8 px-2' : ''}`}
        >
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              e.type === 'in' ? 'bg-[#00e676]/12 text-[#00e676]' : 'bg-[#ef4444]/12 text-[#f87171]'
            }`}
          >
            {e.type === 'in' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-medium text-white">{e.desc}</p>
            <p className={`truncate text-[12px] ${APP.muted}`}>
              {e.cat} · {dataBR(e.date)}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className={`text-[14px] font-bold tabular-nums ${e.type === 'in' ? 'text-[#00e676]' : 'text-[#f87171]'}`}>
              {e.type === 'in' ? '+' : '-'}R$ {brl(e.v)}
            </p>
            {e.paid ? (
              <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${APP.muted}`}>
                <Check className="h-3 w-3 text-[#00e676]" /> {statusLabel(e)}
              </span>
            ) : (
              <button
                onClick={() => onToggle(e.id)}
                className="text-[11px] font-semibold text-[#facc15] underline-offset-2 hover:underline"
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

/* ---------- formulário de novo lançamento (igual ao "Nova Transação" do sistema) ---------- */

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
    'w-full min-w-0 rounded-xl border border-[#1c232d] bg-[#0a0d12] px-3 py-2.5 text-[16px] text-white outline-none transition [color-scheme:dark] placeholder:text-[#5b6573] focus:border-[#00e676] focus:ring-2 focus:ring-[#00e676]/20 sm:text-[14px]';
  const label = 'mb-1 block text-[12.5px] font-semibold text-slate-300';

  return (
    <Panel>
      <div className="flex items-center gap-3">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${isIn ? 'bg-[#00e676]/12 text-[#00e676]' : 'bg-[#ef4444]/12 text-[#f87171]'}`}>
          {isIn ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
        </span>
        <div>
          <p className="font-display text-[17px] font-bold text-white">Nova Transação</p>
          <p className={`text-[12px] ${APP.muted}`}>Registre uma movimentação já realizada.</p>
        </div>
      </div>

      {/* receita / despesa */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-[14px] font-semibold">
        {(['in', 'out'] as Tipo[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onType(t)}
            aria-pressed={type === t}
            className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 transition ${
              type === t
                ? t === 'in'
                  ? 'border-[#00e676] bg-[#00e676]/10 text-[#00e676]'
                  : 'border-[#ef4444] bg-[#ef4444]/10 text-[#f87171]'
                : 'border-[#1c232d] text-slate-300 hover:border-slate-600'
            }`}
          >
            {t === 'in' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
            {t === 'in' ? 'Receita' : 'Despesa'}
          </button>
        ))}
      </div>

      <div className="no-scrollbar -mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 pb-0.5 lg:flex-wrap lg:overflow-visible">
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
            className="shrink-0 whitespace-nowrap rounded-full border border-[#1c232d] bg-[#0a0d12] px-2.5 py-1 text-[12px] text-slate-300 transition hover:border-[#00e676] hover:text-white"
          >
            {d} · R$ {Number.isInteger(v) ? v.toLocaleString('pt-BR') : brl(v)}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-3 space-y-3" noValidate>
        <div>
          <span className={label}>
            Descrição <span className="text-[#f87171]">*</span>
          </span>
          <input
            className={field}
            aria-label="Descrição"
            placeholder={isIn ? 'Ex: Salário, Rendimentos...' : 'Ex: Mercado, Conta de luz...'}
            value={desc}
            maxLength={60}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="min-w-0">
            <span className={label}>
              Valor <span className="text-[#f87171]">*</span>
            </span>
            <div className="relative">
              <span className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[13px] font-bold ${isIn ? 'text-[#00e676]' : 'text-[#f87171]'}`}>R$</span>
              <input
                className={`${field} pl-9`}
                aria-label="Valor"
                inputMode="decimal"
                placeholder="0,00"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
          </div>
          <div className="min-w-0">
            <span className={label}>
              Data <span className="text-[#f87171]">*</span>
            </span>
            <input className={field} aria-label="Data" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="min-w-0">
            <span className={label}>
              Categoria <span className="text-[#f87171]">*</span>
            </span>
            <select className={field} aria-label="Categoria" value={cat} onChange={(e) => setCat(e.target.value)}>
              {CATEGORIAS[type].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="min-w-0">
            <span className={label}>Situação</span>
            <div className="grid h-[42px] grid-cols-2 gap-1 text-[12px]">
              {[true, false].map((p) => (
                <label
                  key={String(p)}
                  className={`flex cursor-pointer items-center justify-center rounded-xl border px-1 text-center leading-tight transition ${
                    paid === p ? 'border-[#00e676]/60 bg-[#00e676]/10 font-semibold text-white' : 'border-[#1c232d] text-[#8b95a5]'
                  }`}
                >
                  <input type="radio" name="status" className="sr-only" checked={paid === p} onChange={() => setPaid(p)} />
                  {p ? (isIn ? 'Já recebi' : 'Já paguei') : isIn ? 'A receber' : 'A pagar'}
                </label>
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[15px] font-bold transition active:scale-[0.98] ${
            isIn ? 'bg-[#00e676] text-[#04130a] hover:brightness-110' : 'bg-[#ef4444] text-white hover:brightness-110'
          }`}
        >
          <Plus className="h-4 w-4" /> Adicionar {isIn ? 'Receita' : 'Despesa'}
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
              className={`rounded-xl px-3 py-2 text-[13px] ${msg.ok ? 'bg-[#00e676]/10 text-[#86efac]' : 'bg-[#ef4444]/10 text-[#fca5a5]'}`}
            >
              {msg.ok ? (
                <>
                  ✅ “{msg.text}” lançado! Saldo do mês agora: <b className="text-white">R$ {brl(saldo)}</b>
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

/* ---------- menu lateral, igual ao sistema ---------- */

const NAV: { key: View; label: string; icon: React.ElementType; url: string }[] = [
  { key: 'geral', label: 'Dashboard', icon: LayoutDashboard, url: 'dashboard' },
  { key: 'in', label: 'Receitas', icon: ArrowUpRight, url: 'receitas' },
  { key: 'out', label: 'Despesas', icon: ArrowDownLeft, url: 'despesas' },
];
/* itens que existem no sistema completo, mostrados no menu como no app */
const MENU_COMPLETO: { grupo: string; itens: { label: string; icon: React.ElementType; novo?: boolean }[] }[] = [
  { grupo: 'Organização', itens: [{ label: 'Categorias', icon: Tags }, { label: 'Futuros', icon: CalendarClock }, { label: 'Metas', icon: Target }] },
  {
    grupo: 'Análise',
    itens: [
      { label: 'Relatórios', icon: FileBarChart },
      { label: 'Calculadora', icon: Calculator, novo: true },
      { label: 'Diagnóstico', icon: Activity, novo: true },
      { label: 'Simuladores', icon: LineChart, novo: true },
    ],
  },
];

const MESANO = new Date().toLocaleString('pt-BR', { month: 'short', year: 'numeric' }).replace('.', '').replace(' de ', ' ');
const MESANO_UP = new Date().toLocaleString('pt-BR', { month: 'short' }).replace('.', '').toUpperCase() + ' ' + new Date().getFullYear();

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
      <div className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-emerald-100/60 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* título compacto: a janela do simulador precisa caber inteira na tela */}
        <Reveal className="mb-5 text-center sm:mb-6">
          <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700">
            Experimente o painel
          </span>
          <h2 className="font-display mt-3 text-[1.6rem] font-bold leading-[1.15] tracking-tight text-balance text-navy-900 sm:text-3xl lg:text-[2.1rem]">
            Lance uma receita ou despesa e veja o painel mudar na hora.
          </h2>
          <p className="mt-2 text-[14.5px] text-slate-600">Este é o visual do sistema de verdade, com dados de exemplo.</p>
        </Reveal>

        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-[#1c232d] bg-[#0a0d12] shadow-2xl shadow-navy-900/30">
            <BrowserBar dark url={`membros.appfinancasdoservidor.digital/${atual.url}`} />

            <div className={`flex flex-col md:flex-row lg:h-[clamp(480px,calc(100svh-270px),640px)] ${APP.bg}`}>
              {/* menu: lateral no computador, abas no celular */}
              <aside className={`flex shrink-0 flex-col border-b md:w-56 md:border-b-0 md:border-r ${APP.line} ${APP.side}`}>
                <div className="hidden items-center gap-2.5 px-4 pb-3 pt-4 md:flex">
                  <LogoFS size={30} />
                  <span className="text-[11px] font-bold uppercase leading-tight tracking-wide text-white">
                    Finanças do Servidor
                    <span className={`block text-[8.5px] font-medium tracking-[0.18em] ${APP.muted}`}>Assistente financeiro</span>
                  </span>
                </div>

                <nav className="no-scrollbar flex gap-1 overflow-x-auto p-2 md:flex-1 md:flex-col md:overflow-y-auto md:px-3 md:py-1" aria-label="Menu do simulador">
                  <p className={`hidden px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] md:block ${APP.muted}`}>Finanças</p>
                  {NAV.map((n) => (
                    <button
                      key={n.key}
                      onClick={() => setView(n.key)}
                      aria-current={view === n.key ? 'page' : undefined}
                      className={`flex shrink-0 items-center gap-2.5 rounded-lg border px-3 py-2 text-[13.5px] transition ${
                        view === n.key
                          ? 'border-[#00e676]/40 bg-[#00e676]/10 font-semibold text-[#00e676]'
                          : 'border-transparent text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <n.icon className="h-4 w-4" /> {n.label}
                    </button>
                  ))}
                  {MENU_COMPLETO.map((g) => (
                    <React.Fragment key={g.grupo}>
                      <p className={`hidden px-2 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] md:block ${APP.muted}`}>{g.grupo}</p>
                      {g.itens.map((n) => (
                        <span
                          key={n.label}
                          title={`${n.label}: disponível no sistema completo`}
                          className="hidden shrink-0 cursor-not-allowed items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] text-slate-400 md:flex"
                        >
                          <n.icon className="h-4 w-4" /> {n.label}
                          {n.novo && (
                            <span className="ml-auto rounded-md bg-[#00e676] px-1.5 py-0.5 text-[9px] font-bold text-[#04130a]">NOVO</span>
                          )}
                        </span>
                      ))}
                    </React.Fragment>
                  ))}
                </nav>

                <div className={`hidden border-t p-3 md:block ${APP.line}`}>
                  <span className="flex items-center gap-2 rounded-lg border border-[#00e676]/40 bg-[#00e676]/10 px-3 py-2 text-[13px] font-semibold text-[#00e676]">
                    <MessageCircle className="h-4 w-4" /> IA no WhatsApp
                  </span>
                  <span className="mt-3 flex items-center gap-2 px-1">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00e676] text-[12px] font-bold text-[#04130a]">S</span>
                    <span className="text-[12px] leading-tight text-white">
                      Servidor
                      <span className={`block text-[10.5px] ${APP.muted}`}>conta de demonstração</span>
                    </span>
                  </span>
                </div>
              </aside>

              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <header className={`flex shrink-0 flex-wrap items-center justify-between gap-2 border-b px-4 py-3 sm:px-5 ${APP.line}`}>
                  <div>
                    <h3 className="font-display text-[18px] font-bold text-white">
                      {view === 'geral' ? 'Olá! 👋' : view === 'in' ? 'Receitas' : 'Despesas'}
                    </h3>
                    <p className={`text-[12.5px] capitalize ${APP.muted}`}>{MESANO}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`hidden rounded-lg border p-0.5 text-[12px] sm:flex ${APP.line}`}>
                      {['Dia', 'Semana', 'Mês', 'Ano'].map((p) => (
                        <span key={p} className={`rounded-md px-2.5 py-1 ${p === 'Mês' ? 'bg-[#1c232d] font-semibold text-white' : APP.muted}`}>
                          {p}
                        </span>
                      ))}
                    </span>
                    <button onClick={reset} className={`rounded-lg border px-2.5 py-1.5 text-[12px] text-slate-300 hover:text-white ${APP.line}`}>
                      Recomeçar
                    </button>
                  </div>
                </header>

                {/* só esta parte rola por dentro da janela */}
                <div className="min-h-0 flex-1 p-3 sm:px-5 lg:overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={view}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      {view === 'geral' ? (
                        <>
                          {/* card de saldo, igual ao topo do dashboard real */}
                          <div className={`${APP.card} flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-end lg:justify-between`}>
                            <div>
                              <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${APP.muted}`}>Saldo em {MESANO_UP}</p>
                              <motion.p
                                key={saldo}
                                initial={{ opacity: 0.4, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`font-display mt-1 text-[2rem] font-bold leading-none tabular-nums sm:text-[2.5rem] ${saldo < 0 ? 'text-[#f87171]' : 'text-white'}`}
                              >
                                {saldo < 0 ? '-' : ''}R$ {brl(Math.abs(saldo))}
                              </motion.p>
                              <p className="mt-2 flex items-center gap-1.5 text-[12.5px] text-slate-300">
                                <span className={`h-1.5 w-1.5 rounded-full ${saldo >= 0 ? 'bg-[#00e676]' : 'bg-[#ef4444]'}`} />
                                {saldo >= 0 ? 'Receitas excedem despesas em' : 'Despesas excedem receitas em'}
                                <b className={saldo >= 0 ? 'text-[#00e676]' : 'text-[#f87171]'}>R$ {brl(Math.abs(saldo))}</b>
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 lg:w-[300px]">
                              <button
                                onClick={() => setView('in')}
                                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#00e676] px-3 py-2.5 text-[13.5px] font-bold text-[#04130a] shadow-[0_0_24px_-6px_rgba(0,230,118,0.6)] hover:brightness-110"
                              >
                                <ArrowUpRight className="h-4 w-4" /> Nova Receita
                              </button>
                              <button
                                onClick={() => setView('out')}
                                className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-[13.5px] font-bold text-white hover:bg-white/5 ${APP.line}`}
                              >
                                <ArrowDownLeft className="h-4 w-4" /> Nova Despesa
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3">
                            <Kpi label="Receitas" value={k.receitas} tone="in" icon={TrendingUp} note={`${k.ins.length} transações`} />
                            <Kpi label="Despesas" value={k.despesas} tone="out" icon={TrendingDown} note={`${k.outs.length} transações`} />
                            <Kpi label="A Receber" value={k.aReceber} tone="blue" icon={CalendarCheck} note={k.aReceber ? 'previsto para o mês' : 'tudo recebido'} />
                            <Kpi
                              label="A Pagar"
                              value={k.aPagar}
                              tone="amber"
                              icon={Clock}
                              note={k.nPendentes ? `${k.nPendentes} conta${k.nPendentes > 1 ? 's' : ''} pendente${k.nPendentes > 1 ? 's' : ''}` : 'nada pendente 🎉'}
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                            <Panel title="Despesas por Categoria" caption={`${porCategoria(k.outs).length} categorias`}>
                              <CategoryBars entries={k.outs} highlight={lastCat} />
                            </Panel>

                            <Panel title="Situação das despesas" caption="O que já foi pago e o que ainda vence no mês">
                              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#1c232d]">
                                <motion.div
                                  className="h-full rounded-full bg-[#00e676]"
                                  initial={false}
                                  animate={{ width: `${pctPago}%` }}
                                  transition={{ duration: 0.6 }}
                                />
                              </div>
                              <div className="mt-2 flex justify-between text-[12.5px] text-slate-300">
                                <span>
                                  <b className="text-white">Pago</b> {pctPago.toFixed(0)}% · R$ {brl(k.pago)}
                                </span>
                                <span>
                                  <b className="text-white">Pendente</b> {(100 - pctPago).toFixed(0)}%
                                </span>
                              </div>
                              {k.aPagar > 0 && (
                                <p className="mt-3 rounded-xl bg-[#eab308]/10 px-3 py-2 text-[13px] text-[#fde68a]">
                                  ⚡ Você tem <b className="text-white">R$ {brl(k.aPagar)}</b> em contas pendentes este mês.
                                </p>
                              )}
                            </Panel>

                            <Panel title="Transações Recentes" caption="Toque em “pagar” para dar baixa numa conta" className="lg:col-span-2">
                              <EntryList entries={entries.slice(0, 5)} lastId={lastId} onToggle={toggle} />
                            </Panel>
                          </div>
                        </>
                      ) : (
                        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,390px)_1fr] lg:items-start">
                          <EntryForm key={view} type={view} saldo={saldo} onType={(t) => setView(t)} onAdd={add} />
                          <div className="space-y-3">
                            <Panel
                              title={view === 'in' ? 'Receitas por Categoria' : 'Despesas por Categoria'}
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

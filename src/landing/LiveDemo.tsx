import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  BadgeDollarSign,
  BarChart3,
  Bell,
  Camera,
  CreditCard,
  FileText,
  MessageSquareText,
  Mic,
  PartyPopper,
  RotateCcw,
} from 'lucide-react';
import { brl } from './data';
import { AudioBubble, Bubble, DateChip, EncryptionNotice, PdfBubble, PhoneFrame, PhotoBubble, SectionTitle, TypingBubble, agora } from './ui';
import { WaText, msgAlertaMeta, msgLembretes, msgMetaBatida, msgParcelamento, msgResumoSemanal, msgTransacao } from './Respostas';

type Tx = { cat: string; v: number; type: 'in' | 'out' };

const INICIAL: Tx[] = [
  { cat: 'Salário', v: 8450, type: 'in' },
  { cat: 'Casa e contas', v: 1480, type: 'out' },
  { cat: 'Mercado', v: 920, type: 'out' },
  { cat: 'Transporte', v: 610, type: 'out' },
];

type Action = {
  id: string;
  label: string;
  icon: React.ElementType;
  /* o que o usuário manda: texto digitado, áudio gravado, foto ou PDF */
  send: { kind: 'text'; text: string } | { kind: 'audio'; caption: string; duration: string } | { kind: 'photo' } | { kind: 'pdf' } | { kind: 'none' };
  /* true = mensagem que o assistente manda sozinho, sem o usuário pedir */
  auto?: boolean;
  txs?: Tx[];
  /* respostas do assistente (uma ou mais mensagens) */
  reply: (state: Tx[], time: string) => React.ReactNode[];
};

const totals = (txs: Tx[]) => {
  const e = txs.filter((t) => t.type === 'in').reduce((a, t) => a + t.v, 0);
  const s = txs.filter((t) => t.type === 'out').reduce((a, t) => a + t.v, 0);
  return { e, s, saldo: e - s };
};

const byCat = (txs: Tx[]) => {
  const m: Record<string, number> = {};
  txs.filter((t) => t.type === 'out').forEach((t) => (m[t.cat] = (m[t.cat] || 0) + t.v));
  return Object.entries(m).sort((a, b) => b[1] - a[1]);
};

/* identificador das transações, como o sistema numera */
let proximoId = 1032;
const real = (time: string, desc: string, valor: string, tipo: 'in' | 'out', cat: string) => (
  <Bubble key={`r${proximoId}`} from="bot" time={time}>
    <WaText text={msgTransacao(proximoId++, desc, valor, tipo, cat)} />
  </Bubble>
);

const texto = (time: string, text: string) => (
  <Bubble from="bot" time={time}>
    <WaText text={text} />
  </Bubble>
);

/* Só mensagens que o sistema realmente envia (mesmo formato dos prints) */
const ACTIONS: Action[] = [
  {
    id: 'texto',
    label: 'Anotar um gasto',
    icon: MessageSquareText,
    send: { kind: 'text', text: 'gastei 45 no almoço' },
    txs: [{ cat: 'Alimentação', v: 45, type: 'out' }],
    reply: (_, time) => [real(time, 'Almoço', '45,00', 'out', 'Alimentação')],
  },
  {
    id: 'audio',
    label: 'Mandar um áudio',
    icon: Mic,
    send: { kind: 'audio', caption: 'abasteci 150 e comi um lanche de 18', duration: '0:05' },
    txs: [
      { cat: 'Transporte', v: 150, type: 'out' },
      { cat: 'Alimentação', v: 18, type: 'out' },
    ],
    reply: (_, time) => [real(time, 'Combustível', '150,00', 'out', 'Transporte'), real(time, 'Lanche', '18,00', 'out', 'Alimentação')],
  },
  {
    id: 'foto',
    label: 'Foto da nota fiscal',
    icon: Camera,
    send: { kind: 'photo' },
    txs: [{ cat: 'Mercado', v: 184.3, type: 'out' }],
    reply: (_, time) => [real(time, 'Supermercado Bom Preço', '184,30', 'out', 'Mercado')],
  },
  {
    id: 'pdf',
    label: 'Enviar um PDF',
    icon: FileText,
    send: { kind: 'pdf' },
    txs: [{ cat: 'Cartão de crédito', v: 1240, type: 'out' }],
    reply: (_, time) => [real(time, 'Fatura do cartão', '1.240,00', 'out', 'Cartão de crédito')],
  },
  {
    id: 'extra',
    label: 'Registrar renda extra',
    icon: BadgeDollarSign,
    send: { kind: 'text', text: 'recebi 960 de renda extra' },
    txs: [{ cat: 'Renda extra', v: 960, type: 'in' }],
    reply: (_, time) => [real(time, 'Renda extra', '960,00', 'in', 'Renda extra')],
  },
  {
    id: 'parcelado',
    label: 'Compra parcelada',
    icon: CreditCard,
    send: { kind: 'text', text: 'comprei um tênis de 280 em 4x no cartão' },
    txs: [{ cat: 'Compra parcelada', v: 70, type: 'out' }],
    reply: (_, time) => [texto(time, msgParcelamento('Tênis', '280,00', 4, '70,00'))],
  },
  /* mensagens que o assistente manda sozinho */
  {
    id: 'lembretes',
    label: 'Lembrete de contas',
    icon: Bell,
    auto: true,
    send: { kind: 'none' },
    reply: (_, time) => [texto(time, msgLembretes())],
  },
  {
    id: 'alerta',
    label: 'Alerta de meta',
    icon: AlertTriangle,
    auto: true,
    send: { kind: 'none' },
    reply: (_, time) => [texto(time, msgAlertaMeta('Mercado do mês', 86, '1.204,30', '1.400,00', '195,70'))],
  },
  {
    id: 'meta',
    label: 'Meta batida',
    icon: PartyPopper,
    auto: true,
    send: { kind: 'none' },
    reply: (_, time) => [texto(time, msgMetaBatida('Reserva de emergência', '3.250,00', '3.000,00'))],
  },
  {
    id: 'resumo',
    label: 'Resumo semanal',
    icon: BarChart3,
    auto: true,
    send: { kind: 'none' },
    reply: (_, time) => [texto(time, msgResumoSemanal())],
  },
];

type Msg = { key: number; node: React.ReactNode };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const LiveDemo: React.FC = () => {
  const [txs, setTxs] = useState<Tx[]>(INICIAL);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState('');
  const [recording, setRecording] = useState(false);
  const [status, setStatus] = useState('online');
  const [flash, setFlash] = useState<string | null>(null);
  const keyRef = useRef(1);
  // invalida a sequência em andamento quando o usuário recomeça ou sai da página
  const runId = useRef(0);

  useEffect(() => () => void runId.current++, []);

  const push = (node: React.ReactNode) => setMsgs((m) => [...m, { key: keyRef.current++, node }].slice(-20));

  const run = async (a: Action) => {
    if (busy) return;
    setBusy(true);
    const id = ++runId.current;
    const alive = () => id === runId.current;
    const next = a.txs ? [...txs, ...a.txs] : txs;

    // 1. o usuário escreve, grava ou escolhe a foto
    if (a.send.kind === 'text') {
      const text = a.send.text;
      for (let i = 1; i <= text.length; i++) {
        await wait(38);
        if (!alive()) return;
        setDraft(text.slice(0, i));
      }
      await wait(250);
      if (!alive()) return;
      setDraft('');
      push(<Bubble from="me" time={agora()}>{text}</Bubble>);
    } else if (a.send.kind === 'audio') {
      setRecording(true);
      await wait(2200);
      if (!alive()) return;
      setRecording(false);
      push(<AudioBubble time={agora()} duration={a.send.duration} caption={a.send.caption} />);
    } else if (a.send.kind === 'none') {
      // o assistente manda sozinho: não há mensagem do usuário
    } else if (a.send.kind === 'pdf') {
      await wait(400);
      if (!alive()) return;
      push(<PdfBubble time={agora()} />);
    } else {
      await wait(400);
      if (!alive()) return;
      push(<PhotoBubble time={agora()} />);
    }

    // 2. o assistente lê (vistos azuis) e começa a digitar
    await wait(a.auto ? 300 : 1100);
    if (!alive()) return;
    setStatus('digitando…');
    const typingKey = keyRef.current++;
    setMsgs((m) => [...m, { key: typingKey, node: <TypingBubble /> }]);
    await wait(1300);
    if (!alive()) return;

    // 3. resposta + painel atualizado
    setStatus('online');
    const respostas = a.reply(next, agora());
    setMsgs((m) => [...m.filter((x) => x.key !== typingKey), { key: keyRef.current++, node: respostas[0] }].slice(-20));
    // quando o sistema manda mais de uma confirmação (ex.: áudio com 2 gastos)
    for (const r of respostas.slice(1)) {
      setStatus('digitando…');
      const tk = keyRef.current++;
      setMsgs((m) => [...m, { key: tk, node: <TypingBubble /> }]);
      await wait(1100);
      if (!alive()) return;
      setStatus('online');
      setMsgs((m) => [...m.filter((x) => x.key !== tk), { key: keyRef.current++, node: r }].slice(-20));
    }
    if (a.txs) {
      setTxs(next);
      setFlash(a.txs[0].cat);
      setTimeout(() => alive() && setFlash(null), 1400);
    }
    setBusy(false);
  };

  const reset = () => {
    runId.current++;
    setBusy(false);
    setDraft('');
    setRecording(false);
    setStatus('online');
    setTxs(INICIAL);
    setMsgs([]);
  };

  const t = totals(txs);
  const cats = byCat(txs);
  const totalCats = cats.reduce((a, [, v]) => a + v, 0) || 1;
  const mesAno = new Date().toLocaleString('pt-BR', { month: 'short' }).replace('.', '').toUpperCase() + ' ' + new Date().getFullYear();
  /* cores das categorias, como no gráfico do sistema */
  const COR = ['#ef4444', '#f97316', '#eab308', '#8b5cf6', '#ec4899', '#22c55e', '#06b6d4', '#64748b'];

  const Botao: React.FC<{ a: Action }> = ({ a }) => (
    <button
      onClick={() => run(a)}
      disabled={busy}
      className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-navy-900 shadow-sm transition hover:border-amber-400 hover:bg-amber-50 active:scale-95 disabled:opacity-50"
    >
      <a.icon className="h-4 w-4 text-amber-500" /> {a.label}
    </button>
  );

  return (
    <section id="teste" className="relative overflow-hidden bg-mist py-12 sm:py-16">
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-blue-200/50 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* celular: texto → WhatsApp → botões → painel. Computador: WhatsApp à esquerda, o resto à direita */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[340px_1fr] lg:items-start lg:gap-x-14 lg:gap-y-5">
          <div className="min-w-0 text-center lg:col-start-2 lg:row-start-1 lg:text-left">
            <SectionTitle
              light
              center={false}
              eyebrow="Teste agora, sem cadastro"
              title="Se você sabe mandar mensagem no WhatsApp, já sabe usar."
              sub="Toque num pedido e veja a resposta de verdade do assistente e o painel atualizarem na hora."
            />
          </div>

          <div className="min-w-0 lg:sticky lg:top-24 lg:col-start-1 lg:row-span-3 lg:row-start-1">
            <PhoneFrame
              className="lg:mx-0 lg:w-[340px]"
              status={status}
              draft={draft}
              recording={recording}
              scrollKey={`${msgs.length}-${msgs[msgs.length - 1]?.key}`}
            >
              <DateChip>HOJE</DateChip>
              <EncryptionNotice />
              {msgs.map((m) => (
                <React.Fragment key={m.key}>{m.node}</React.Fragment>
              ))}
            </PhoneFrame>
            {/* no celular o painel fica abaixo: mostra o saldo aqui para a mudança aparecer na hora */}
            <p className="mt-2 text-center text-[13px] text-slate-600 lg:hidden">
              📊 Saldo do mês no painel:{' '}
              <motion.b key={t.saldo} initial={{ opacity: 0.3, y: -3 }} animate={{ opacity: 1, y: 0 }} className="inline-block tabular-nums text-navy-900">
                R$ {brl(t.saldo)}
              </motion.b>
            </p>
          </div>

          {/* pedidos: o que você manda e o que o assistente manda sozinho */}
          <div className="min-w-0 space-y-3 lg:col-start-2 lg:row-start-2">
            {[
              { titulo: 'Você manda', itens: ACTIONS.filter((a) => !a.auto) },
              { titulo: 'O assistente avisa sozinho', itens: ACTIONS.filter((a) => a.auto) },
            ].map((g) => (
              <div key={g.titulo}>
                <p className="mb-1.5 text-center text-[11.5px] font-semibold uppercase tracking-[0.14em] text-slate-500 lg:text-left">{g.titulo}</p>
                <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
                  {g.itens.map((a) => (
                    <Botao key={a.id} a={a} />
                  ))}
                </div>
              </div>
            ))}
            <button onClick={reset} className="inline-flex items-center gap-1.5 rounded-full px-1 py-1 text-[13px] text-slate-500 hover:text-navy-900">
              <RotateCcw className="h-3.5 w-3.5" /> Recomeçar
            </button>
          </div>

          {/* painel ao vivo, com o visual do sistema de verdade */}
          <div className="min-w-0 overflow-hidden rounded-3xl border border-[#1c232d] bg-[#0a0d12] shadow-2xl shadow-navy-900/25 lg:col-start-2 lg:row-start-3">
            <div className="flex items-center justify-between border-b border-[#1c232d] px-4 py-3 sm:px-5">
              <div>
                <p className="font-display text-[17px] font-bold text-white">Olá! 👋</p>
                <p className="text-[12px] capitalize text-[#8b95a5]">{new Date().toLocaleString('pt-BR', { month: 'short', year: 'numeric' }).replace('.', '').replace(' de ', ' ')}</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-[#00e676]/40 bg-[#00e676]/10 px-2.5 py-1 text-[11px] font-semibold text-[#00e676]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00e676]" /> ao vivo
              </span>
            </div>

            <div className="space-y-3 p-3 sm:p-4">
              {/* saldo do mês */}
              <div className="rounded-2xl border border-[#1c232d] bg-[#10151c] p-4">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#8b95a5]">Saldo em {mesAno}</p>
                <motion.p
                  key={t.saldo}
                  initial={{ opacity: 0.4, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`font-display mt-1 text-[1.9rem] font-bold leading-none tabular-nums ${t.saldo < 0 ? 'text-[#f87171]' : 'text-white'}`}
                >
                  {t.saldo < 0 ? '-' : ''}R$ {brl(Math.abs(t.saldo))}
                </motion.p>
                <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[12px] text-slate-300">
                  <span className={`h-1.5 w-1.5 rounded-full ${t.saldo >= 0 ? 'bg-[#00e676]' : 'bg-[#ef4444]'}`} />
                  {t.saldo >= 0 ? 'Receitas excedem despesas em' : 'Despesas excedem receitas em'}
                  <b className={t.saldo >= 0 ? 'text-[#00e676]' : 'text-[#f87171]'}>R$ {brl(Math.abs(t.saldo))}</b>
                </p>
              </div>

              {/* receitas e despesas */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { l: 'Receitas', v: t.e, I: ArrowUpRight, cls: 'bg-[#00e676]/12 text-[#00e676]' },
                  { l: 'Despesas', v: t.s, I: ArrowDownLeft, cls: 'bg-[#ef4444]/12 text-[#f87171]' },
                ].map(({ l, v, I, cls }) => (
                  <div key={l} className="rounded-2xl border border-[#1c232d] bg-[#10151c] p-3 sm:p-4">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full ${cls}`}>
                      <I className="h-4 w-4" />
                    </span>
                    <p className="mt-2 text-[12px] text-[#8b95a5]">{l}</p>
                    <motion.p
                      key={v}
                      initial={{ opacity: 0.4, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-display text-[16px] font-bold tabular-nums text-white sm:text-[19px]"
                    >
                      R$ {brl(v)}
                    </motion.p>
                  </div>
                ))}
              </div>

              {/* despesas por categoria, com as bolinhas coloridas do sistema */}
              <div className="rounded-2xl border border-[#1c232d] bg-[#10151c] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-display text-[15px] font-bold text-white">Despesas por Categoria</p>
                  <span className="rounded-md bg-[#1c232d] px-2 py-0.5 text-[11px] text-[#8b95a5]">{cats.length} categorias</span>
                </div>
                <div className="space-y-2.5">
                  {cats.map(([c, v], i) => {
                    const cor = COR[i % COR.length];
                    const pct = (v / totalCats) * 100;
                    return (
                      <motion.div layout key={c}>
                        <div className="mb-1 flex items-center gap-2 text-[13px]">
                          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: cor }} />
                          <span className={`flex-1 truncate ${flash === c ? 'font-semibold text-white' : 'text-slate-300'}`}>{c}</span>
                          <span className="tabular-nums text-[#8b95a5]">{pct.toFixed(0)}%</span>
                          <span className="w-[84px] text-right font-semibold tabular-nums text-white">R$ {brl(v)}</span>
                        </div>
                        <div className="ml-4 h-1 overflow-hidden rounded-full bg-[#1c232d]">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: cor }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

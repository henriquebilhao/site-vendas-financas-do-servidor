import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Camera, MessageSquareText, Mic, FileText, BadgeDollarSign, RotateCcw } from 'lucide-react';
import { brl } from './data';
import { AudioBubble, Bubble, DateChip, EncryptionNotice, PdfBubble, PhoneFrame, PhotoBubble, SectionTitle, TypingBubble, agora } from './ui';
import { WaText, msgTransacao } from './Respostas';

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
  send: { kind: 'text'; text: string } | { kind: 'audio'; caption: string; duration: string } | { kind: 'photo' } | { kind: 'pdf' };
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
    await wait(1100);
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
  const max = cats[0]?.[1] || 1;

  return (
    <section id="teste" className="relative overflow-hidden bg-mist py-12 sm:py-16">
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-blue-200/50 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* celular: texto → WhatsApp → botões (como respostas rápidas) → painel. Computador: WhatsApp à esquerda, o resto à direita */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[340px_1fr] lg:items-center lg:gap-x-14 lg:gap-y-6">
        <div className="min-w-0 text-center lg:col-start-2 lg:row-start-1 lg:self-end lg:text-left">
        <SectionTitle light center={false}
          eyebrow="Teste agora, sem cadastro"
          title="Se você sabe mandar mensagem no WhatsApp, já sabe usar."
          sub="Toque num pedido e veja a resposta e o painel atualizarem na hora."
        />

        </div>

          <div className="min-w-0 lg:col-start-1 lg:row-span-3 lg:row-start-1">
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
            📊 Saldo livre no painel:{' '}
            <motion.b key={t.saldo} initial={{ opacity: 0.3, y: -3 }} animate={{ opacity: 1, y: 0 }} className="inline-block tabular-nums text-navy-900">
              R$ {brl(t.saldo)}
            </motion.b>
          </p>
          </div>

        {/* pedidos: no celular ficam logo abaixo do WhatsApp, numa linha que desliza para o lado */}
        <div className="no-scrollbar -mx-4 -mt-2 flex min-w-0 gap-2 overflow-x-auto px-4 pb-1 lg:col-start-2 lg:row-start-2 lg:mx-0 lg:mt-0 lg:flex-wrap lg:overflow-visible lg:px-0">
          {ACTIONS.map((a) => (
            <button
              key={a.id}
              onClick={() => run(a)}
              disabled={busy}
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-navy-900 shadow-sm transition hover:border-amber-400 hover:bg-amber-50 active:scale-95 disabled:opacity-50"
            >
              <a.icon className="h-4 w-4 text-amber-500" /> {a.label}
            </button>
          ))}
          <button onClick={reset} className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2.5 text-[13px] text-slate-500 hover:text-navy-900">
            <RotateCcw className="h-3.5 w-3.5" /> Recomeçar
          </button>
        </div>

          {/* mini painel sincronizado */}
          <div className="card-light min-w-0 p-5 sm:p-6 lg:col-start-2 lg:row-start-3 lg:self-start">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-600">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Atualiza ao vivo
                </p>
                <p className="font-display mt-0.5 text-xl font-bold text-navy-900">Seu painel</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[12px] text-slate-600">{new Date().toLocaleString('pt-BR', { month: 'long' })}</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                ['Entradas', t.e, 'text-emerald-600'],
                ['Saídas', t.s, 'text-rose-600'],
                ['Saldo livre', t.saldo, 'text-amber-600'],
              ].map(([l, v, c]) => (
                <div key={l as string} className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                  <p className="text-[11px] text-slate-500 sm:text-[12px]">{l}</p>
                  <motion.p
                    key={v as number}
                    initial={{ opacity: 0.4, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`font-display mt-1 text-[15px] font-bold tabular-nums sm:text-xl ${c}`}
                  >
                    R$ {brl(v as number)}
                  </motion.p>
                </div>
              ))}
            </div>

            <p className="mb-2.5 mt-5 text-[13px] font-semibold text-navy-900">Gastos por categoria</p>
            <div className="space-y-3">
              {cats.map(([c, v]) => (
                <motion.div layout key={c}>
                  <div className="mb-1 flex justify-between text-[13px]">
                    <span className={flash === c ? 'font-semibold text-amber-600' : 'text-slate-700'}>{c}</span>
                    <span className="tabular-nums text-slate-500">R$ {brl(v)}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className={`h-full rounded-full ${flash === c ? 'bg-amber-400' : 'bg-navy-600'}`}
                      animate={{ width: `${(v / max) * 100}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
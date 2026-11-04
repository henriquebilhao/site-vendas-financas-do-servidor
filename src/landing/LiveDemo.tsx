import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Camera, MessageSquareText, Mic, PiggyBank, FileBarChart, BadgeDollarSign, RotateCcw } from 'lucide-react';
import { brl } from './data';
import { AudioBubble, Bubble, DateChip, EncryptionNotice, PhoneFrame, PhotoBubble, Receipt, SectionTitle, TypingBubble, agora } from './ui';

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
  /* o que o usuário manda: texto digitado, áudio gravado ou foto */
  send: { kind: 'text'; text: string } | { kind: 'audio'; caption: string; duration: string } | { kind: 'photo' };
  txs?: Tx[];
  reply: (state: Tx[], time: string) => React.ReactNode;
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

const ACTIONS: Action[] = [
  {
    id: 'texto',
    label: 'Anotar um gasto',
    icon: MessageSquareText,
    send: { kind: 'text', text: 'gastei 45 no almoço' },
    txs: [{ cat: 'Alimentação', v: 45, type: 'out' }],
    reply: (_, time) => (
      <Bubble from="bot" time={time}>
        <Receipt title="✅ Despesa registrada!" rows={[['💸 Valor', 'R$ 45,00'], ['🏷️ Categoria', 'Alimentação'], ['📅 Data', 'hoje']]} />
      </Bubble>
    ),
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
    reply: (_, time) => (
      <Bubble from="bot" time={time}>
        <Receipt title="🎧 Ouvi seu áudio e registrei 2 gastos:" rows={[['⛽ Combustível', 'R$ 150,00'], ['🍔 Lanche', 'R$ 18,00']]} />
      </Bubble>
    ),
  },
  {
    id: 'foto',
    label: 'Foto da nota fiscal',
    icon: Camera,
    send: { kind: 'photo' },
    txs: [{ cat: 'Mercado', v: 184.3, type: 'out' }],
    reply: (_, time) => (
      <Bubble from="bot" time={time}>
        <Receipt title="🧾 Nota fiscal lida!" rows={[['🏪 Local', 'Supermercado Bom Preço'], ['💸 Valor', 'R$ 184,30'], ['🏷️ Categoria', 'Mercado']]} />
      </Bubble>
    ),
  },
  {
    id: 'extra',
    label: 'Registrar escala extra',
    icon: BadgeDollarSign,
    send: { kind: 'text', text: 'recebi 960 da escala extra' },
    txs: [{ cat: 'Renda extra', v: 960, type: 'in' }],
    reply: (_, time) => (
      <Bubble from="bot" time={time}>
        <Receipt title="🟢 Receita registrada!" rows={[['💰 Valor', '+ R$ 960,00'], ['🏷️ Categoria', 'Renda extra']]} />
      </Bubble>
    ),
  },
  {
    id: 'sobra',
    label: 'Quanto sobrou?',
    icon: PiggyBank,
    send: { kind: 'text', text: 'quanto sobrou esse mês?' },
    reply: (st, time) => {
      const t = totals(st);
      return (
        <Bubble from="bot" time={time}>
          <Receipt title={`💰 Saldo livre: R$ ${brl(t.saldo)}`} rows={[['🟢 Entradas', `R$ ${brl(t.e)}`], ['🔴 Saídas', `R$ ${brl(t.s)}`]]} />
        </Bubble>
      );
    },
  },
  {
    id: 'relatorio',
    label: 'Relatório',
    icon: FileBarChart,
    send: { kind: 'text', text: 'me manda o relatório do mês' },
    reply: (st, time) => {
      const t = totals(st);
      const top = byCat(st).slice(0, 3).map(([c, v]) => [`• ${c}`, `R$ ${brl(v)}`] as [string, string]);
      return (
        <Bubble from="bot" time={time}>
          <Receipt
            title={`📊 Relatório de ${new Date().toLocaleString('pt-BR', { month: 'long' })}`}
            rows={[
              ['🟢 Entradas', `R$ ${brl(t.e)}`],
              ['🔴 Saídas', `R$ ${brl(t.s)}`],
              ['💰 Saldo livre', `R$ ${brl(t.saldo)}`],
              ['Maiores gastos:', ''],
              ...top,
            ]}
          />
          {'\n\n'}
          <span className="text-[#667781]">O relatório completo está no seu painel 👉 </span>
          <span className="text-[#027eb5] underline">painel.financasdoservidor</span>
        </Bubble>
      );
    },
  },
];

type Msg = { key: number; node: React.ReactNode };

const welcome = (time: string) => (
  <Bubble from="bot" time={time}>
    Oi! 👋 Eu sou seu assistente financeiro.{'\n'}Toque num pedido aqui embaixo e veja como eu respondo.
  </Bubble>
);

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const LiveDemo: React.FC = () => {
  const [txs, setTxs] = useState<Tx[]>(INICIAL);
  const [msgs, setMsgs] = useState<Msg[]>(() => [{ key: 0, node: welcome(agora()) }]);
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
    setMsgs((m) => [...m.filter((x) => x.key !== typingKey), { key: keyRef.current++, node: a.reply(next, agora()) }].slice(-20));
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
    setMsgs([{ key: keyRef.current++, node: <Bubble from="bot" time={agora()}>Tudo zerado. Pode testar de novo! 🙂</Bubble> }]);
  };

  const t = totals(txs);
  const cats = byCat(txs);
  const max = cats[0]?.[1] || 1;

  return (
    <section id="teste" className="relative overflow-hidden bg-mist py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-blue-200/50 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle light
          eyebrow="Teste agora, sem cadastro"
          title="Se você sabe mandar mensagem no WhatsApp, já sabe usar."
          sub="Toque em qualquer pedido e veja a resposta e o painel atualizarem na hora, do jeito que acontece de verdade."
        />

        <div className="mb-8 flex flex-wrap justify-center gap-2.5">
          {ACTIONS.map((a) => (
            <button
              key={a.id}
              onClick={() => run(a)}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-navy-900 shadow-sm transition hover:border-amber-400 hover:bg-amber-50 active:scale-95 disabled:opacity-50"
            >
              <a.icon className="h-4 w-4 text-amber-500" /> {a.label}
            </button>
          ))}
          <button onClick={reset} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2.5 text-[13px] text-slate-500 hover:text-navy-900">
            <RotateCcw className="h-3.5 w-3.5" /> Recomeçar
          </button>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
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

          {/* mini painel sincronizado */}
          <div className="card-light p-5 sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-600">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Atualiza ao vivo
                </p>
                <p className="font-display mt-1 text-2xl font-bold text-navy-900">Seu painel</p>
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

            <p className="mb-3 mt-6 text-[13px] font-semibold text-navy-900">Gastos por categoria</p>
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
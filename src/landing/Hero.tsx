import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Lock, Menu, ShieldCheck, X } from 'lucide-react';
import { LogoFS } from '../components/LogoFS';
import { LANCAMENTO_FIM, LINKS } from './data';
import { AudioBubble, Bubble, DateChip, EncryptionNotice, PhoneFrame, PhotoBubble, Receipt, TypingBubble } from './ui';

/* ---------- Faixa do topo: oferta de lançamento com cronômetro ---------- */
const pad = (n: number) => String(n).padStart(2, '0');

const useCountdown = (fim: Date) => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const ms = Math.max(0, fim.getTime() - now);
  const s = Math.floor(ms / 1000);
  return { ms, d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
};

const TimeBox: React.FC<{ v: string; l: string }> = ({ v, l }) => (
  <span className="flex min-w-[36px] flex-col items-center rounded-lg bg-white/10 px-1 py-0.5 leading-none ring-1 ring-white/10 sm:min-w-[52px] sm:px-2 sm:py-1">
    <span className="font-display text-[17px] font-bold tabular-nums text-white sm:text-[24px]">{v}</span>
    <span className="mt-0.5 text-[8.5px] font-semibold uppercase tracking-wider text-amber-200/90 sm:text-[10px]">{l}</span>
  </span>
);

/* Faixa fixa: "Oferta de Lançamento" + contagem regressiva. Some quando a oferta acaba. */
export const TopBar: React.FC = () => {
  const t = useCountdown(LANCAMENTO_FIM);
  if (t.ms <= 0) return null;
  return (
    <div className="sticky top-0 z-50 border-b border-amber-400/30 bg-gradient-to-r from-[#3a1d00] via-[#1a1033] to-[#0d1f4d] px-2 py-1.5 text-white shadow-lg shadow-black/30 sm:px-3 sm:py-2.5">
      <div
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-x-5"
        role="timer"
        aria-label="Tempo restante da oferta de lançamento"
      >
        <span className="inline-flex animate-pulse items-center rounded-full bg-amber-400 px-3 py-0.5 text-[12px] font-extrabold uppercase tracking-wide text-slate-950 sm:py-1 sm:text-[15px]">
          🚀 Oferta de Lançamento
        </span>
        <div className="flex items-center gap-1.5">
          <span className="mr-0.5 text-[12.5px] font-semibold text-slate-200 sm:text-[15px]">Termina em:</span>
          {t.d > 0 && <TimeBox v={String(t.d)} l={t.d === 1 ? 'dia' : 'dias'} />}
          <TimeBox v={pad(t.h)} l="h" />
          <TimeBox v={pad(t.m)} l="min" />
          <TimeBox v={pad(t.s)} l="seg" />
        </div>
      </div>
    </div>
  );
};

/* Linha da oferta logo abaixo da faixa fixa (rola junto com a página) */
export const TopBarOffer: React.FC = () => {
  const t = useCountdown(LANCAMENTO_FIM);
  if (t.ms <= 0) return null;
  return (
    <div className="border-b border-white/5 bg-[#160f2b] px-4 py-2 text-center text-[13.5px] leading-snug text-slate-200 sm:text-[15px]">
      <b className="text-amber-300">7 dias grátis</b> para testar o assistente. Aproveite antes que a condição de lançamento acabe!
    </div>
  );
};

/* ---------- Navegação ---------- */
const NAV = [
  ['Depoimentos', '#depoimentos'],
  ['Como funciona', '#como-funciona'],
  ['Teste agora', '#teste'],
  ['Painel', '#painel'],
  ['Ferramentas', '#ferramentas'],
  ['Quem somos', '#quem-somos'],
  ['Planos', '#planos'],
  ['Dúvidas', '#faq'],
];

export const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative border-b border-white/5 bg-navy-950/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <a href="#" className="flex shrink-0 items-center gap-2.5">
          <LogoFS size={34} />
          <span className="font-display text-[17px] font-bold tracking-tight text-white">Finanças do Servidor</span>
        </a>
        <nav className="hidden items-center gap-7 whitespace-nowrap text-[14px] text-slate-300 xl:flex">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="transition-colors hover:text-white">{l}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 whitespace-nowrap xl:flex">
          <a href={LINKS.areaCliente} target="_blank" rel="noopener noreferrer" className="text-[14px] text-slate-300 hover:text-white">
            Já sou cliente
          </a>
          <a href="#planos" className="btn-gold rounded-full px-5 py-2 text-[14px]">
            Começar agora <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <button className="rounded-lg p-2 text-slate-300 xl:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="space-y-1 border-t border-white/5 bg-navy-950 px-4 pb-5 pt-2 xl:hidden">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-2.5 text-[15px] text-slate-200 hover:bg-white/5">
              {l}
            </a>
          ))}
          <a href={LINKS.areaCliente} target="_blank" rel="noopener noreferrer" className="block rounded-lg px-2 py-2.5 text-[15px] text-slate-400">
            Já sou cliente
          </a>
          <a href="#planos" onClick={() => setOpen(false)} className="btn-gold mt-2 w-full rounded-xl py-3 text-[15px]">
            Começar agora
          </a>
        </div>
      )}
    </header>
  );
};

/* ---------- Conversa animada do hero (rola sem parar, como um chat real) ---------- */
type Step = { node: (k: string) => React.ReactNode; bot?: boolean };

const SCRIPT: Step[] = [
  { node: (k) => <Bubble key={k} from="me" time="06:52">café 8,50 na padaria antes do expediente</Bubble> },
  {
    bot: true,
    node: (k) => (
      <Bubble key={k} from="bot" time="06:52">
        <Receipt title="✅ Despesa registrada" rows={[['Valor', 'R$ 8,50'], ['Categoria', 'Alimentação']]} />
      </Bubble>
    ),
  },
  { node: (k) => <AudioBubble key={k} duration="0:06" time="12:41" caption="almoço 32 e 15 de estacionamento" /> },
  {
    bot: true,
    node: (k) => (
      <Bubble key={k} from="bot" time="12:41">
        <Receipt title="✅ Entendi 2 gastos" rows={[['Almoço', 'R$ 32,00'], ['Estacionamento', 'R$ 15,00']]} />
      </Bubble>
    ),
  },
  { node: (k) => <PhotoBubble key={k} time="18:20" /> },
  {
    bot: true,
    node: (k) => (
      <Bubble key={k} from="bot" time="18:20">
        <Receipt title="✅ Nota fiscal lida" rows={[['Supermercado', 'R$ 184,30'], ['Categoria', 'Mercado']]} />
      </Bubble>
    ),
  },
  { node: (k) => <Bubble key={k} from="me" time="09:12">recebi 960 de renda extra</Bubble> },
  {
    bot: true,
    node: (k) => (
      <Bubble key={k} from="bot" time="09:12">
        <Receipt tone="in" title="🟢 Receita registrada" rows={[['Valor', '+ R$ 960,00'], ['Categoria', 'Renda extra']]} />
      </Bubble>
    ),
  },
  { node: (k) => <Bubble key={k} from="me" time="22:04">quanto sobrou esse mês?</Bubble> },
  {
    bot: true,
    node: (k) => (
      <Bubble key={k} from="bot" time="22:04">
        <Receipt
          tone="in"
          title="💰 Saldo livre: R$ 3.214,70"
          rows={[['Entradas', 'R$ 9.410,00'], ['Saídas', 'R$ 6.195,30']]}
        />
      </Bubble>
    ),
  },
];

const HeroChat: React.FC = () => {
  // n = quantas mensagens já foram enviadas (cresce sem parar; o roteiro se repete)
  const [n, setN] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const step = SCRIPT[n % SCRIPT.length];
    let t: ReturnType<typeof setTimeout>;
    if (step.bot) {
      setTyping(true);
      t = setTimeout(() => {
        setTyping(false);
        setN((c) => c + 1);
      }, 1300);
    } else {
      const fimDoRoteiro = n > 0 && n % SCRIPT.length === 0;
      t = setTimeout(() => setN((c) => c + 1), n === 0 ? 600 : fimDoRoteiro ? 2600 : 1500);
    }
    return () => clearTimeout(t);
  }, [n]);

  // guarda só as últimas mensagens na memória; as antigas já saíram da tela rolando
  const first = Math.max(0, n - 20);
  const items = [];
  for (let i = first; i < n; i++) {
    if (i > 0 && i % SCRIPT.length === 0) items.push(<DateChip key={`d${i}`}>HOJE</DateChip>);
    items.push(SCRIPT[i % SCRIPT.length].node(`m${i}`));
  }

  return (
    <PhoneFrame status={typing ? 'digitando…' : 'online'} scrollKey={`${n}-${typing}`}>
      {first === 0 && (
        <>
          <DateChip>HOJE</DateChip>
          <EncryptionNotice />
        </>
      )}
      {items}
      {typing && <TypingBubble key={`t${n}`} />}
    </PhoneFrame>
  );
};

/* ---------- Hero ---------- */
export const Hero: React.FC = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 pb-20 pt-12 sm:pt-16 lg:pb-28">
    <div className="hero-grid pointer-events-none absolute inset-0" />
    <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-700/25 blur-[140px]" />
    <div className="pointer-events-none absolute right-0 top-1/3 h-[380px] w-[380px] rounded-full bg-amber-500/10 blur-[120px]" />

    <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="text-center lg:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight text-white text-balance sm:text-6xl lg:text-[4.2rem]"
        >
          Seu salário organizado começa numa{' '}
          <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-500 bg-clip-text text-transparent">mensagem.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300 lg:mx-0"
        >
          Mande um texto, um áudio, a foto da nota fiscal ou um PDF no WhatsApp. O assistente registra cada gasto e cada extra, e você
          sabe quanto sobra, mesmo na correria do dia a dia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start"
        >
          <a href="#planos" className="btn-gold rounded-full px-7 py-4 text-[16px]">
            Quero meu assistente <ArrowRight className="h-5 w-5" />
          </a>
          <a
            href={LINKS.testeGratis}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 text-[16px] font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Testar 7 dias grátis
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-slate-400 lg:justify-start"
        >
          <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-amber-400" /> Sem senha de banco ou Gov.br</span>          <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-amber-400" /> 7 dias de garantia</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="pointer-events-none absolute inset-x-10 top-10 bottom-10 rounded-full bg-blue-600/30 blur-3xl" />
        <HeroChat />
        {/* cartões flutuantes */}
        <div className="float-slow absolute -left-24 top-20 z-10 hidden rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 shadow-xl backdrop-blur xl:block">
          <p className="text-[11px] text-slate-400">Saldo livre do mês</p>
          <p className="font-display text-xl font-bold text-emerald-400">R$ 3.214,70</p>
        </div>
        <div className="float-slower absolute -right-20 top-52 z-10 hidden rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 shadow-xl backdrop-blur xl:block">
          <p className="text-[11px] text-slate-400">Renda extra</p>
          <p className="font-display text-xl font-bold text-amber-300">+ R$ 960,00</p>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ---------- Faixa de confiança em loop ---------- */
const TRUST = [
  ['Sem senha de banco', 'NINGUÉM MEXE NO SEU DINHEIRO'],
  ['Sem senha do Gov.br', 'NEM DO PORTAL DO SERVIDOR'],
  ['Registro pelo WhatsApp', 'TEXTO, ÁUDIO, FOTO OU PDF'],
  ['Pagamento pela Hotmart', 'COMPRA 100% SEGURA'],
  ['Garantia de 7 dias', 'SEU DINHEIRO DE VOLTA'],
  ['Seus dados são seus', 'NÃO VENDEMOS INFORMAÇÕES'],
];

export const TrustMarquee: React.FC = () => (
  <div className="relative overflow-hidden border-y border-white/10 bg-navy-950 py-5">
    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-950 to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-950 to-transparent" />
    <div className="marquee flex w-max gap-12">
      {[...TRUST, ...TRUST].map(([a, b], i) => (
        <div key={i} className="flex shrink-0 items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-amber-400" />
          <div>
            <p className="text-[14px] font-semibold text-white">{a}</p>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-slate-500">{b}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
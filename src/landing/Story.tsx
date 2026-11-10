import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, Eye, HeartHandshake, KeyRound, Lock, ShieldCheck, X } from 'lucide-react';
import { LogoFS } from '../components/LogoFS';
import { Reveal, SectionTitle } from './ui';

/* =====================================================================
   DOBRA 2 — NO DIA A DIA (situações de uso)
   Não são depoimentos: são exemplos de uso, sem pessoa identificada.
   Quando houver depoimentos REAIS, volte a mostrar nome, cargo e cidade.
   ===================================================================== */
const DEPOIMENTOS = [
  { n: 'Saindo do plantão', t: 'Mande um áudio com os gastos do dia e o assistente lança tudo sozinho.' },
  { n: 'Contas do casal', t: 'Cada um registra pelo próprio WhatsApp e as contas da casa aparecem juntas no mesmo painel.' },
  { n: 'No mercado', t: 'Tire uma foto da nota fiscal e o valor entra na categoria certa.' },
  { n: '13º e férias', t: 'Entram como receitas separadas do salário, para você decidir o destino de cada real.' },
  { n: 'Sem planilha', t: 'Texto, áudio, foto da nota fiscal ou PDF: é só mandar no WhatsApp, que você já usa todo dia.' },
  { n: 'Confirmação na hora', t: 'Cada registro volta com valor, categoria e data para você conferir.' },
  { n: 'Fim do mês', t: 'O relatório mostra quanto foi em cada categoria, até os pequenos gastos do dia a dia.' },
  { n: 'Teste grátis', t: 'Use por 7 dias, sem cartão de crédito, antes de escolher um plano.' },
];

const CORES = ['bg-blue-600', 'bg-amber-500', 'bg-emerald-500', 'bg-sky-500'];

const DepoCard: React.FC<{ d: (typeof DEPOIMENTOS)[number]; i: number }> = ({ d, i }) => (
  <div className="card-light w-[300px] shrink-0 p-5 sm:w-[340px]">
    <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-navy-900">
      <span className={`h-2 w-2 rounded-full ${CORES[i % CORES.length]}`} /> {d.n}
    </p>
    <p className="mt-2.5 text-[15px] leading-relaxed text-slate-700">{d.t}</p>
  </div>
);

export const SocialProof: React.FC = () => {
  const linha1 = DEPOIMENTOS.slice(0, 4);
  const linha2 = DEPOIMENTOS.slice(4);
  return (
    <section id="depoimentos" className="relative overflow-hidden bg-mist py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          light
          eyebrow="No dia a dia"
          title="O que muda quando o salário entra em ordem."
          sub="Situações comuns de quem troca a planilha abandonada por uma conversa no WhatsApp."
        />
      </div>

      <div className="relative space-y-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-mist to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-mist to-transparent sm:w-32" />
        <div className="marquee flex w-max gap-5 py-2 hover:[animation-play-state:paused]">
          {[...linha1, ...linha1, ...linha1].map((d, i) => <DepoCard key={i} d={d} i={i} />)}
        </div>
        <div className="marquee-reverse flex w-max gap-5 py-2 hover:[animation-play-state:paused]">
          {[...linha2, ...linha2, ...linha2].map((d, i) => <DepoCard key={i} d={d} i={i + 4} />)}
        </div>
      </div>
    </section>
  );
};

/* =====================================================================
   DOBRA 4 (abertura) — VÍDEO: alguém mandando mensagem no WhatsApp
   Vídeo: Pexels, "Close up on Man Hands Typing Message on Phone" (RDNE Stock project)
   ===================================================================== */
const NOTIFS = [
  { t: 'Transação registrada com sucesso!', v: 'Almoço · R$ 42,00 · 🟥 Despesa' },
  { t: 'Transação registrada com sucesso!', v: 'Supermercado · R$ 184,30 · 🟥 Despesa' },
  { t: 'Transação registrada com sucesso!', v: 'Renda extra · R$ 960,00 · 🟩 Receita' },
  { t: '⚠️ Alerta de meta — Combustível', v: 'Você já usou 75% do limite deste mês' },
];

const PASSOS = [
  { n: '01', t: 'Você manda', d: 'Texto, áudio, foto da nota fiscal ou PDF, do jeito que vier na cabeça.' },
  { n: '02', t: 'Ele organiza', d: 'O assistente entende o valor, separa despesa de receita e coloca na categoria certa.' },
  { n: '03', t: 'Você acompanha', d: 'Receba a confirmação de cada lançamento, lembretes de contas e alertas de meta, e veja tudo no painel.' },
];

export const VideoSection: React.FC = () => {
  const [i, setI] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % NOTIFS.length), 2600);
    return () => clearInterval(t);
  }, []);

  // só toca quando aparece na tela (economiza bateria e dados no celular)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section id="como-funciona" className="relative overflow-hidden bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          light
          eyebrow="A solução"
          title="Você manda a mensagem. O assistente faz o resto."
          sub="Sem planilha, sem fórmula, sem perder tempo. É uma conversa no WhatsApp que vira controle financeiro."
        />

        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] shadow-2xl shadow-navy-900/25 ring-1 ring-slate-200">
              <video
                ref={videoRef}
                src="/videos/maos-digitando.mp4"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                className="aspect-video w-full object-cover"
                aria-label="Pessoa digitando uma mensagem no celular"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />

              {/* notificação do assistente aparecendo por cima do vídeo */}
              <div className="absolute right-3 top-3 w-[230px] sm:right-5 sm:top-5 sm:w-[270px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center gap-2.5 rounded-2xl bg-white/95 p-2.5 shadow-xl backdrop-blur"
                  >
                    <LogoFS size={34} />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="font-semibold text-navy-900">Finanças do Servidor</span> agora
                      </p>
                      <p className="truncate text-[12.5px] font-semibold text-slate-800">{NOTIFS[i].t}</p>
                      <p className="truncate text-[12px] text-slate-600">{NOTIFS[i].v}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur sm:bottom-5 sm:left-5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#25d366]" /> Registro em segundos, direto no WhatsApp
              </div>
            </div>
          </Reveal>

          <div className="space-y-4">
            {PASSOS.map((p, k) => (
              <Reveal key={p.n} delay={k * 0.12}>
                <div className="card-light flex gap-5 p-6">
                  <span className="font-display text-3xl font-bold text-amber-500">{p.n}</span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-navy-900">{p.t}</h3>
                    <p className="mt-1 leading-relaxed text-slate-600">{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* =====================================================================
   DOBRA 6 — PARA QUEM É
   ===================================================================== */
const SIM = [
  'É servidor público, de qualquer área, e não tem tempo para planilha',
  'Quer saber para onde vai o salário e quanto sobra no fim do mês',
  'Chega no fim do mês sem saber para onde foi o dinheiro',
  'Quer organizar as contas da casa junto com a família',
  'Já usa o WhatsApp todos os dias',
];
const NAO = [
  'Quer que alguém mexa na sua conta bancária por você',
  'Procura empréstimo ou investimento milagroso',
  'Prefere não saber os próprios números',
];

export const ForWhom: React.FC = () => (
  <section id="para-quem" className="bg-mist py-12 sm:py-16">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <SectionTitle light eyebrow="Para quem é" title="O Finanças do Servidor foi feito para você se…" />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="card-light h-full border-emerald-200 p-7 sm:p-9">
            <p className="mb-5 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] text-emerald-700">
              <Check className="h-4 w-4" /> É para você se
            </p>
            <ul className="space-y-4">
              {SIM.map((s, k) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * k }}
                  className="flex items-start gap-3 text-[16px] text-slate-700"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {s}
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-3xl border border-slate-200 bg-white/60 p-7 sm:p-9">
            <p className="mb-5 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] text-rose-600">
              <X className="h-4 w-4" /> Não é para você se
            </p>
            <ul className="space-y-4">
              {NAO.map((s) => (
                <li key={s} className="flex items-start gap-3 text-[16px] text-slate-600">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
      <Reveal className="mt-10 text-center">
        <a href="#planos" className="btn-gold rounded-full px-7 py-4 text-[16px]">
          Quero meu assistente <ArrowRight className="h-5 w-5" />
        </a>
      </Reveal>
    </div>
  </section>
);

/* =====================================================================
   DOBRA 7 — AUTORIDADE (a empresa por trás do assistente)
   ===================================================================== */
const COMPROMISSOS = [
  { icon: KeyRound, t: 'Nenhuma senha', d: 'Nunca pedimos senha de banco, Gov.br, Portal do Servidor ou consignatária.' },
  { icon: Eye, t: 'Só o que você manda', d: 'O assistente trabalha apenas com as mensagens, áudios, fotos e PDFs que você envia.' },
  { icon: Lock, t: 'Dados protegidos', d: 'Suas informações são guardadas com segurança e nunca são vendidas.' },
  { icon: HeartHandshake, t: 'Risco zero', d: '7 dias de garantia: não gostou, devolvemos 100% pela Hotmart.' },
];

export const Authority: React.FC = () => (
  <section id="quem-somos" className="relative overflow-hidden bg-navy-800 py-12 sm:py-16">
    <div className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-blue-500/15 blur-[140px]" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-[420px]">
            {/* escudo da marca com anéis girando */}
            <div className="spin-slow absolute inset-0 rounded-full border border-dashed border-amber-400/30" />
            <div className="spin-slower absolute inset-8 rounded-full border border-white/10" />
            <div className="absolute inset-16 rounded-full bg-gradient-to-br from-navy-600 to-navy-900 shadow-2xl shadow-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <LogoFS size={150} className="rounded-3xl shadow-2xl" />
            </div>
            <div className="float-slow absolute left-0 top-10 rounded-2xl border border-white/10 bg-navy-900/90 px-4 py-3 shadow-xl">
              <p className="text-[11px] text-slate-400">Feito por</p>
              <p className="font-display font-bold text-white">servidor público</p>
            </div>
            <div className="float-slower absolute bottom-10 right-0 rounded-2xl border border-white/10 bg-navy-900/90 px-4 py-3 shadow-xl">
              <p className="text-[11px] text-slate-400">Feito para</p>
              <p className="font-display font-bold text-amber-300">servidor público</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-300">
            Quem criou o assistente
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
            Feito por servidor público, para servidor público.
          </h2>
          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-slate-300">
            <p>
              O <strong className="text-white">Finanças do Servidor</strong> foi criado por quem vive a mesma rotina que você: salário que
              cai certinho todo mês e, mesmo assim, some antes do fim do mês sem a gente entender para onde foi.
            </p>
            <p>
              Como servidores, sabemos que planilha exige um tempo que a rotina não deixa, e que aplicativo de banco mostra o
              extrato mas não organiza a vida. Por isso criamos o assistente que nós mesmos queríamos usar: inteligência artificial e
              educação financeira dentro do WhatsApp, onde você já está todo dia.
            </p>
            <p>
              Cada detalhe foi pensado de dentro, para a realidade de quem serve: salário fixo, consignado, férias, imposto de
              renda, rendas extras e as contas da casa divididas com a família.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {COMPROMISSOS.map(({ icon: I, t, d }, k) => (
          <Reveal key={t} delay={k * 0.08}>
            <div className="card h-full p-6">
              <I className="h-7 w-7 text-amber-400" />
              <h3 className="font-display mt-4 text-lg font-bold text-white">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 flex items-center justify-center gap-2 text-[13px] text-slate-400">
        <ShieldCheck className="h-4 w-4 text-amber-400" /> Nossos compromissos com você
      </p>
      <div className="mt-8 text-center">
        <a href="#planos" className="btn-gold rounded-full px-7 py-4 text-[16px]">
          Quero meu assistente <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </div>
  </section>
);

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
} from 'lucide-react';
import { AudioBubble, Bubble, PhoneFrame, PhotoBubble, Receipt, Reveal, SectionTitle } from './ui';

/* ---------- Dores do dia a dia ---------- */

const DORES = [
  {
    icon: CalendarClock,
    t: 'Rotina que não para',
    d: 'Expediente, escala ou plantão. Não sobra tempo para planilha, e o gasto fica sem anotar.',
  },
  {
    icon: TrendingUp,
    t: 'O salário acaba antes do mês acabar',
    d: 'Pequenos gastos do dia a dia somam no fim do mês, e a fatura chega maior do que você esperava.',
  },
];

export const ForWho: React.FC = () => (
  <section id="dores" className="relative overflow-hidden bg-navy-800 py-12 sm:py-16">
    <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-rose-500/10 blur-[140px]" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
      <SectionTitle
        eyebrow="Você se identifica?"
        title={<>Quem cuida do serviço público também merece ter o próprio dinheiro em ordem.</>}
        sub="Se alguma dessas situações parece familiar, você não está sozinho. E não é falta de esforço: é falta da ferramenta certa."
      />

      <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
        {DORES.map(({ icon: I, t, d }, i) => (
          <Reveal key={t} delay={i * 0.1}>
            <motion.div whileHover={{ y: -6 }} className="card h-full p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/15 text-rose-300">
                <I className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">{t}</h3>
              <p className="mt-2 leading-relaxed text-slate-300">{d}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 text-center">
        <p className="font-display text-xl font-bold text-white sm:text-2xl">
          A boa notícia: dá para resolver com <span className="text-amber-300">uma mensagem</span>. 👇
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------- Um plantão normal (linha do tempo + celular fixo) ---------- */
const PLANTAO = [
  {
    h: '06:50',
    t: 'Começo do expediente. O café já está anotado.',
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
    d: 'No intervalo, no deslocamento ou entre um atendimento e outro. Um áudio com vários gastos vira vários registros.',
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
    t: 'Mercado depois do trabalho? Mande a nota fiscal.',
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
    t: 'Entrou um dinheiro a mais? Entra como receita.',
    d: 'Salário, 13º, férias, restituição e rendas extras ficam separados, para você saber de onde vem cada real.',
    chat: (
      <>
        <Bubble from="me" time="09:12">recebi 960 de renda extra</Bubble>
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
    <section id="plantao" className="relative bg-navy-800 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Como funciona"
          title="Um dia normal de trabalho. Só que o seu dinheiro está sob controle."
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
                    active === i ? 'border-amber-400 bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/30' : 'border-white/15 bg-navy-900 text-slate-300'
                  }`}
                >
                  {s.h}
                </div>
                <div className={`transition-opacity duration-500 ${active === i ? 'opacity-100' : 'lg:opacity-40'}`}>
                  <h3 className="font-display text-2xl font-bold text-white">{s.t}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-slate-300">{s.d}</p>
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

/* ---------- Dependente / casal ---------- */
export const Together: React.FC = () => (
  <section className="bg-mist py-12 sm:py-16">
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
      <Reveal>
        <div className="mb-4"><span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700">Família</span></div>
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-navy-900 sm:text-4xl md:text-5xl">
          Divida o controle com quem divide as contas com você.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          Adicione um dependente: cada um usa o próprio WhatsApp, e os gastos dos dois aparecem juntos no mesmo painel.
          Enquanto você trabalha, a casa continua organizada.
        </p>
        <ul className="mt-6 space-y-3 text-slate-700">
          {['Cada pessoa registra pelo próprio WhatsApp', 'Um painel só com as contas da casa', 'Já incluso no Plano Anual'].map((t) => (
            <li key={t} className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">✓</span>
              {t}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="card-light mx-auto max-w-md p-6">
          <p className="text-[13px] font-semibold text-navy-900">Pessoas com acesso</p>
          <div className="mt-4 space-y-3">
            {[
              ['V', 'Você', 'Titular', 'R$ 3.410,20 em gastos'],
              ['C', 'Camila', 'Dependente', 'R$ 2.785,10 em gastos'],
            ].map(([a, n, r, g]) => (
              <div key={n} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-900 font-bold text-white">{a}</div>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-navy-900">{n}</p>
                  <p className="text-[12px] text-slate-500">{g}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${r === 'Titular' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>{r}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-dashed border-slate-300 p-3 text-[13px] text-slate-600">
            <span className="flex items-center gap-2"><UserPlus className="h-4 w-4" /> Total da casa no mês</span>
            <span className="font-display font-bold text-navy-900">R$ 6.195,30</span>
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
  <section id="seguranca" className="bg-navy-800 py-12 sm:py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <SectionTitle
        eyebrow="Segurança"
        title="Você confia o seu dinheiro. A gente leva isso a sério."
        sub="Servidor público sabe o valor da discrição. Por isso o assistente não acessa nada além do que você manda."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SEG.map(({ icon: I, t, d }, i) => (
          <Reveal key={t} delay={i * 0.08}>
            <div className="card h-full p-6">
              <I className="h-7 w-7 text-amber-400" />
              <h3 className="font-display mt-4 text-lg font-bold text-white">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
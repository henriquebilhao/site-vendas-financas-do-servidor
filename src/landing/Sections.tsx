import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CreditCard,
  Eye,
  HeartHandshake,
  KeyRound,
  Lock,
  UserPlus,
  Wallet,
} from 'lucide-react';
import { AudioBubble, Bubble, PhoneFrame, PhotoBubble, Reveal, SectionTitle } from './ui';
import { WaText, msgAlertaMeta, msgTransacao } from './Respostas';

/* ---------- Dores do dia a dia ---------- */

const DORES = [
  {
    icon: Wallet,
    t: 'O salário cai, mas desaparece',
    d: 'Você recebe e, em poucos dias, boa parte do dinheiro já está comprometida com contas e despesas.',
  },
  {
    icon: CreditCard,
    t: 'Cartões e empréstimos viraram uma bola de neve',
    d: 'Parcelamentos, consignados e faturas acumuladas dificultam saber quanto realmente sobra do salário.',
  },
  {
    icon: BarChart3,
    t: 'Você não sabe para onde vai seu dinheiro',
    d: 'Pequenos gastos se acumulam, as despesas fogem do controle e fica difícil entender onde está o problema.',
  },
  {
    icon: CalendarClock,
    t: 'Todo mês começa com preocupação',
    d: 'Você vive esperando o próximo pagamento para colocar as contas em dia e acaba sem conseguir planejar o futuro.',
  },
];

export const ForWho: React.FC = () => (
  <section id="dores" className="relative overflow-hidden bg-navy-800 py-12 sm:py-16">
    <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-rose-500/10 blur-[140px]" />
    <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
      <Reveal className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
        <span className="inline-flex items-center rounded-full border border-orange-400/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-300">
          Você se identifica?
        </span>
        <h2 className="font-display mt-4 text-3xl font-bold leading-[1.12] tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
          Você trabalha, recebe seu salário todo mês… mas parece que o dinheiro nunca é suficiente?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
          Ser servidor público não significa ter a vida financeira organizada. Entre contas, empréstimos, cartões e despesas do
          dia a dia, é fácil perder o controle do próprio dinheiro.
        </p>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        {DORES.map(({ icon: I, t, d }, i) => (
          <Reveal key={t} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -4 }}
              className={`card h-full p-6 sm:p-7 ${i === 0 ? '!border-amber-400/70' : ''}`}
            >
              <I className="h-6 w-6 text-pink-300" />
              <h3 className="font-display mt-4 text-[1.2rem] font-bold leading-snug text-white">{t}</h3>
              <p className="mt-2 leading-relaxed text-slate-300">{d}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <p className="font-display text-xl font-bold text-white sm:text-2xl">
          A verdade é que você não precisa ganhar mais para começar a se organizar.
        </p>
        <p className="font-display mt-2 text-lg font-bold text-amber-300 sm:text-xl">
          Precisa entender e organizar melhor o dinheiro que já recebe. 👇
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------- Um plantão normal (linha do tempo + celular fixo) ---------- */
/* resposta do assistente no formato real */
const Real: React.FC<{ time: string; text: string }> = ({ time, text }) => (
  <Bubble from="bot" time={time}>
    <WaText text={text} />
  </Bubble>
);

const PLANTAO = [
  {
    h: '06:50',
    t: 'Começo do expediente. O café já está anotado.',
    d: 'Escreva do jeito que vier na cabeça. O assistente entende valor, local e categoria e confirma cada lançamento.',
    chat: (
      <>
        <Bubble from="me" time="06:50">café 8,50 na padaria</Bubble>
        <Real time="06:50" text={msgTransacao(1032, 'Café na padaria', '8,50', 'out', 'Alimentação')} />
      </>
    ),
  },
  {
    h: '12:40',
    t: 'Sem tempo para digitar? Mande um áudio.',
    d: 'No intervalo, no deslocamento ou entre um atendimento e outro. Um áudio com vários gastos vira vários registros.',
    chat: (
      <>
        <AudioBubble duration="0:06" time="12:40" caption="almoço 32 e 15 de estacionamento" />
        <Real time="12:40" text={msgTransacao(1033, 'Almoço', '32,00', 'out', 'Alimentação')} />
        <Real time="12:40" text={msgTransacao(1034, 'Estacionamento', '15,00', 'out', 'Transporte')} />
      </>
    ),
  },
  {
    h: '18:20',
    t: 'Mercado depois do trabalho? Mande a nota fiscal.',
    d: 'Tire uma foto da nota fiscal, ou mande o PDF, e pronto. O valor é lido e lançado na categoria certa.',
    chat: (
      <>
        <PhotoBubble time="18:20" />
        <Real time="18:20" text={msgTransacao(1035, 'Supermercado Bom Preço', '184,30', 'out', 'Mercado')} />
      </>
    ),
  },
  {
    h: 'Dia 20',
    t: 'Entrou um dinheiro a mais? Entra como receita.',
    d: 'Salário, férias, restituição e rendas extras ficam separados, para você saber de onde vem cada real.',
    chat: (
      <>
        <Bubble from="me" time="09:12">recebi 960 de renda extra</Bubble>
        <Real time="09:12" text={msgTransacao(1041, 'Renda extra', '960,00', 'in', 'Renda extra')} />
      </>
    ),
  },
  {
    h: '23:10',
    t: 'Gastou perto do limite? O aviso chega sozinho.',
    d: 'Quando um gasto chega perto da meta que você definiu, o assistente avisa na hora e mostra quanto ainda resta até o fim do mês.',
    chat: (
      <>
        <Real time="23:10" text={msgAlertaMeta('Combustível', 75, '447,25', '600,00', '152,75')} />
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
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------- Segurança ---------- */
const SEG = [
  { icon: KeyRound, t: 'Nenhuma senha', d: 'Não pedimos senha de banco, do Gov.br, do Portal do Servidor ou de consignatária.' },
  { icon: Eye, t: 'Só o que você manda', d: 'O assistente trabalha apenas com as mensagens, áudios, fotos e PDFs que você envia.' },
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
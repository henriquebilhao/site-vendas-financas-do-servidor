import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BarChart3, Bell, CalendarClock, CreditCard, PartyPopper, Receipt as ReceiptIcon, TrendingUp } from 'lucide-react';
import { AudioBubble, Bubble, DateChip, PhoneFrame, Reveal, SectionTitle, TypingBubble } from './ui';

/* ==========================================================================
   Dobra: como o assistente responde no WhatsApp
   Modelos tirados das mensagens reais do assistente (prints de 08/11/2026),
   com nomes e valores fictícios.
   ========================================================================== */

const NOME = 'Carlos';
const LINK = 'https://www.membros.appfinancasdoservidor.digital/dashboard';

/* datas a partir de hoje, no formato 09/11/2026 */
const dia = (offsetDias = 0, offsetMeses = 0) => {
  const d = new Date();
  d.setMonth(d.getMonth() + offsetMeses);
  d.setDate(d.getDate() + offsetDias);
  return d.toLocaleDateString('pt-BR');
};
const fimDoMes = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
};

/* Texto no padrão do WhatsApp: *negrito* e links em azul */
export const WaText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(\*[^*\n]+\*|https?:\/\/\S+)/g).map((p, i) => {
      if (p.startsWith('*') && p.endsWith('*') && p.length > 2) return <b key={i} className="font-semibold">{p.slice(1, -1)}</b>;
      if (/^https?:\/\//.test(p))
        return (
          <span key={i} className="break-all text-[#027eb5] underline decoration-[#027eb5]/40">
            {p}
          </span>
        );
      return <React.Fragment key={i}>{p}</React.Fragment>;
    })}
  </>
);

const LINHA = '_____________________';

/* Modelos de texto iguais às mensagens reais do assistente */
export const msgTransacao = (id: number, desc: string, valor: string, tipo: 'in' | 'out', cat: string) =>
  `Transação registrada com sucesso!\nIdentificador: ${id}\n\n📋 Resumo da transação:\n${LINHA}\n\n🏷️ Descrição: ${desc}\n💸 Valor: R$ ${valor}\n🔄 Tipo: ${
    tipo === 'in' ? '🟩 Receita' : '🟥 Despesa'
  }\n🏷️ Categoria: ${cat}\n🗓️ Data: ${dia()}\n\n❌ Para excluir diga: "Excluir transação ${id}".\n\n📊 Consulte gráficos e relatórios completos em: ${LINK}`;

export const msgAlertaMeta = (meta: string, pct: number, usado: string, limite: string, resta: string) =>
  `⚠️ *Alerta de meta — ${meta}*\n\n${NOME}, você já usou *${pct}%* do limite deste mês: R$ ${usado} de R$ ${limite}.\n\nAinda restam *R$ ${resta}* até ${fimDoMes()}. 💡`;

export const msgParcelamento = (desc: string, total: string, n: number, parcela: string, primeiroId = 261) =>
  `Parcelamento registrado com sucesso!\n\n📋 Resumo do parcelamento:\n${LINHA}\n\n🏷️ Descrição: ${desc}\n💸 Valor total: R$ ${total}\n🔄 Tipo: 🟥 Despesa\n🔢 Parcelas: ${n}x de R$ ${parcela}\n🏷️ Categoria: Compra parcelada\n\n🗓️ Detalhe das parcelas:\n${Array.from(
    { length: n },
    (_, i) => `${['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣'][i] ?? `${i + 1}.`} Parcela ${i + 1}/${n} - R$ ${parcela} - ${dia(0, i)} - ID: ${primeiroId + i}`,
  ).join('\n')}\n\n✨ Todas as parcelas foram agendadas!\n\n📊 Consulte gráficos e relatórios completos em: ${LINK}`;

export const msgLembretes = () =>
  `👋 Olá, ${NOME}!\n\n📌 Você tem 3 Lembretes!\n\n📌 *${dia(1)}*\n🧾 *Tênis - Parcela 1/4*\n📅 *Data:* ${dia(1)}\n💸 Saída – *R$ 70,00*\n📁 Categoria: Compra parcelada\n\n📌 *${dia(5)}*\n🧾 *Fatura do cartão*\n📅 *Data:* ${dia(5)}\n💸 Saída – *R$ 1.240,00*\n📁 Categoria: Cartão de crédito\n\n📌 *${dia(10)}*\n🧾 *Plano de saúde*\n📅 *Data:* ${dia(10)}\n💸 Saída – *R$ 380,00*\n📁 Categoria: Saúde`;

export const msgMetaBatida = (meta: string, juntou: string, alvo: string) =>
  `🎉 *Meta batida — ${meta}*\n\nParabéns, ${NOME}! Você juntou *R$ ${juntou}* e completou a sua meta de economia deste mês (R$ ${alvo}). 👏`;

export const msgResumoSemanal = () =>
  `📊 *RESUMO SEMANAL DAS SUAS METAS*\n\nOlá, *${NOME}*!\nConfira seu desempenho na semana de *${dia(-7)}* a *${dia(-1)}*:\n\n*Mercado do mês*\n• Limite: R$ 1.400,00\n• Gasto acumulado: R$ 812,40 (58%)\n• Gasto na semana: R$ 214,30\n• Restante: R$ 587,60\n• Dias restantes: 21\n✅ Você está dentro do limite. Continue assim!\n\n${LINHA}\n\n*Lazer com a família*\n• Limite: R$ 400,00\n• Gasto acumulado: R$ 432,90 (108%)\n• Gasto na semana: R$ 160,00\n• Restante: R$ -32,90\n• Dias restantes: 21\n🚨 Limite ultrapassado! Atenção!\n\n${LINHA}\n\n*Combustível*\n• Limite: R$ 600,00\n• Gasto acumulado: R$ 379,80 (63%)\n• Gasto na semana: R$ 189,90\n• Restante: R$ 220,20\n• Dias restantes: 21\n✅ Você está dentro do limite. Continue assim!`;

type Msg = { from: 'me' | 'bot' | 'audio' | 'date'; text?: string; caption?: string; time: string };
type Tipo = {
  id: string;
  label: string;
  icon: React.ElementType;
  resumo: string;
  conversa: () => Msg[];
};

const TIPOS: Tipo[] = [
  {
    id: 'despesa',
    label: 'Registro de gasto',
    icon: ReceiptIcon,
    resumo: 'Você manda o gasto do jeito que falaria. O assistente confirma com descrição, valor, tipo, categoria e data, e já diz como desfazer.',
    conversa: () => [
      { from: 'me', text: 'abasteci 189,90 no posto', time: '07:42' },
      {
        from: 'bot',
        time: '07:42',
        text: `Transação registrada com sucesso!\nIdentificador: 1032\n\n📋 Resumo da transação:\n${LINHA}\n\n🏷️ Descrição: Combustível no posto\n💸 Valor: R$ 189,90\n🔄 Tipo: 🟥 Despesa\n🏷️ Categoria: Transporte\n🗓️ Data: ${dia()}\n\n❌ Para excluir diga: "Excluir transação 1032".\n\n📊 Consulte gráficos e relatórios completos em: ${LINK}`,
      },
    ],
  },
  {
    id: 'receita',
    label: 'Registro de receita',
    icon: TrendingUp,
    resumo: 'Mandou um áudio dizendo que recebeu? Ele entende, transcreve e registra como receita, separada do salário.',
    conversa: () => [
      { from: 'audio', caption: 'recebi novecentos e sessenta da escala extra', time: '18:05' },
      {
        from: 'bot',
        time: '18:05',
        text: `Transação registrada com sucesso!\nIdentificador: 1041\n\n📋 Resumo da transação:\n${LINHA}\n\n🏷️ Descrição: Escala extra\n💸 Valor: R$ 960,00\n🔄 Tipo: 🟩 Receita\n🏷️ Categoria: Renda extra\n🗓️ Data: ${dia()}\n\n❌ Para excluir diga: "Excluir transação 1041".\n\n📊 Consulte gráficos e relatórios completos em: ${LINK}`,
      },
    ],
  },
  {
    id: 'parcelado',
    label: 'Compra parcelada',
    icon: CreditCard,
    resumo: 'Comprou parcelado? Ele divide o valor, agenda cada parcela no mês certo e te mostra todas de uma vez.',
    conversa: () => [
      { from: 'me', text: 'comprei um tênis de 280 em 4x no cartão', time: '12:31' },
      {
        from: 'bot',
        time: '12:31',
        text: `Parcelamento registrado com sucesso!\n\n📋 Resumo do parcelamento:\n${LINHA}\n\n🏷️ Descrição: Tênis\n💸 Valor total: R$ 280,00\n🔄 Tipo: 🟥 Despesa\n🔢 Parcelas: 4x de R$ 70,00\n🏷️ Categoria: Compra parcelada\n\n🗓️ Detalhe das parcelas:\n1️⃣ Parcela 1/4 - R$ 70,00 - ${dia(0, 0)} - ID: 261\n2️⃣ Parcela 2/4 - R$ 70,00 - ${dia(0, 1)} - ID: 262\n3️⃣ Parcela 3/4 - R$ 70,00 - ${dia(0, 2)} - ID: 263\n4️⃣ Parcela 4/4 - R$ 70,00 - ${dia(0, 3)} - ID: 264\n\n✨ Todas as parcelas foram agendadas!\n\n📊 Consulte gráficos e relatórios completos em: ${LINK}`,
      },
    ],
  },
  {
    id: 'lembretes',
    label: 'Lembretes de contas',
    icon: Bell,
    resumo: 'Sem você pedir, o assistente avisa o que vence: parcelas, faturas e contas agendadas, com data, valor e categoria.',
    conversa: () => [
      { from: 'date', text: 'HOJE', time: '' },
      {
        from: 'bot',
        time: '08:00',
        text: `👋 Olá, ${NOME}!\n\n📌 Você tem 3 Lembretes!\n\n📌 *${dia(1)}*\n🧾 *Tênis - Parcela 1/4*\n📅 *Data:* ${dia(1)}\n💸 Saída – *R$ 70,00*\n📁 Categoria: Compra parcelada\n\n📌 *${dia(5)}*\n🧾 *Fatura do cartão*\n📅 *Data:* ${dia(5)}\n💸 Saída – *R$ 1.240,00*\n📁 Categoria: Cartão de crédito\n\n📌 *${dia(10)}*\n🧾 *Plano de saúde*\n📅 *Data:* ${dia(10)}\n💸 Saída – *R$ 380,00*\n📁 Categoria: Saúde`,
      },
    ],
  },
  {
    id: 'alerta',
    label: 'Alerta de meta',
    icon: CalendarClock,
    resumo: 'Quando um gasto chega perto do limite que você definiu, chega um aviso na hora, com quanto ainda resta até o fim do mês.',
    conversa: () => [
      {
        from: 'bot',
        time: '23:10',
        text: `⚠️ *Alerta de meta — Mercado do mês*\n\n${NOME}, você já usou *86%* do limite deste mês: R$ 1.204,30 de R$ 1.400,00.\n\nAinda restam *R$ 195,70* até ${fimDoMes()}. 💡`,
      },
      {
        from: 'bot',
        time: '23:10',
        text: `⚠️ *Alerta de meta — Combustível*\n\n${NOME}, você já usou *75%* do limite deste mês: R$ 447,25 de R$ 600,00.\n\nAinda restam *R$ 152,75* até ${fimDoMes()}. 💡`,
      },
    ],
  },
  {
    id: 'meta-batida',
    label: 'Meta batida',
    icon: PartyPopper,
    resumo: 'Bateu a meta de economia? O assistente comemora com você e mostra quanto já juntou.',
    conversa: () => [
      {
        from: 'bot',
        time: '23:10',
        text: `🎉 *Meta batida — Reserva de emergência*\n\nParabéns, ${NOME}! Você juntou *R$ 3.250,00* e completou a sua meta de economia deste mês (R$ 3.000,00). 👏`,
      },
    ],
  },
  {
    id: 'resumo',
    label: 'Relatório semanal',
    icon: BarChart3,
    resumo: 'Toda semana chega um resumo das suas metas: limite, quanto já gastou, o gasto da semana, quanto resta e quantos dias faltam.',
    conversa: () => [
      {
        from: 'bot',
        time: '09:00',
        text: `📊 *RESUMO SEMANAL DAS SUAS METAS*\n\nOlá, *${NOME}*!\nConfira seu desempenho na semana de *${dia(-7)}* a *${dia(-1)}*:\n\n*Mercado do mês*\n• Limite: R$ 1.400,00\n• Gasto acumulado: R$ 812,40 (58%)\n• Gasto na semana: R$ 214,30\n• Restante: R$ 587,60\n• Dias restantes: 21\n✅ Você está dentro do limite. Continue assim!\n\n${LINHA}\n\n*Lazer com a família*\n• Limite: R$ 400,00\n• Gasto acumulado: R$ 432,90 (108%)\n• Gasto na semana: R$ 160,00\n• Restante: R$ -32,90\n• Dias restantes: 21\n🚨 Limite ultrapassado! Atenção!\n\n${LINHA}\n\n*Combustível*\n• Limite: R$ 600,00\n• Gasto acumulado: R$ 379,80 (63%)\n• Gasto na semana: R$ 189,90\n• Restante: R$ 220,20\n• Dias restantes: 21\n✅ Você está dentro do limite. Continue assim!`,
      },
    ],
  },
];

/* Mostra a conversa do tipo escolhido: mensagem do usuário, "digitando..." e a resposta */
const Conversa: React.FC<{ tipo: Tipo }> = ({ tipo }) => {
  const msgs = tipo.conversa();
  const [n, setN] = useState(0);

  useEffect(() => {
    setN(0);
  }, [tipo.id]);

  useEffect(() => {
    if (n >= msgs.length) return;
    const atual = msgs[n];
    const espera = n === 0 ? 350 : atual.from === 'bot' ? 1200 : 700;
    const t = setTimeout(() => setN((x) => x + 1), espera);
    return () => clearTimeout(t);
  }, [n, tipo.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const proxima = msgs[n];
  const digitando = !!proxima && proxima.from === 'bot' && n > 0;

  return (
    <PhoneFrame status={digitando ? 'digitando…' : 'online'} scrollKey={`${tipo.id}-${n}-${digitando}`}>
      {msgs.slice(0, n).map((m, i) => {
        const key = `${tipo.id}-${i}`;
        if (m.from === 'date') return <DateChip key={key}>{m.text}</DateChip>;
        if (m.from === 'audio') return <AudioBubble key={key} duration="0:06" caption={m.caption} time={m.time} />;
        const anterior = msgs[i - 1];
        return (
          <Bubble key={key} from={m.from} time={m.time} tail={!anterior || anterior.from !== m.from}>
            <WaText text={m.text ?? ''} />
          </Bubble>
        );
      })}
      {digitando && <TypingBubble key={`${tipo.id}-typing`} />}
    </PhoneFrame>
  );
};

export const AssistantReplies: React.FC = () => {
  const [ativo, setAtivo] = useState(0);
  const tipo = TIPOS[ativo];

  return (
    <section id="respostas" className="relative overflow-hidden bg-white py-12 sm:py-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          light
          eyebrow="As respostas no seu WhatsApp"
          title="Veja como o assistente responde a cada mensagem."
          sub="Confirmação de cada lançamento, parcelas agendadas, lembretes de contas, alertas de meta e relatório da semana. Tudo chega na conversa, sem abrir outro app."
        />

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_auto] lg:gap-14">
          {/* lista de tipos de mensagem */}
          <div>
            {/* no celular: botões roláveis */}
            <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 lg:hidden">
              {TIPOS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setAtivo(i)}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[14px] font-medium transition ${
                    i === ativo ? 'border-navy-900 bg-navy-900 text-white' : 'border-slate-200 bg-white text-navy-900'
                  }`}
                >
                  <t.icon className={`h-4 w-4 ${i === ativo ? 'text-amber-400' : 'text-amber-500'}`} /> {t.label}
                </button>
              ))}
            </div>

            {/* no computador: lista com descrição */}
            <div className="hidden space-y-2.5 lg:block">
              {TIPOS.map((t, i) => (
                <Reveal key={t.id} delay={i * 0.04}>
                  <button
                    onClick={() => setAtivo(i)}
                    className={`group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition ${
                      i === ativo
                        ? 'border-amber-400 bg-amber-50 shadow-[0_12px_32px_-16px_rgba(13,32,80,0.25)]'
                        : 'border-slate-200 bg-white hover:border-amber-300'
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        i === ativo ? 'bg-navy-900 text-amber-400' : 'bg-slate-100 text-navy-700'
                      }`}
                    >
                      <t.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="font-display block text-[17px] font-bold text-navy-900">{t.label}</span>
                      <span className={`mt-0.5 block text-[14.5px] leading-relaxed text-slate-600 ${i === ativo ? '' : 'line-clamp-1'}`}>
                        {t.resumo}
                      </span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>

            {/* descrição do tipo escolhido no celular */}
            <AnimatePresence mode="wait">
              <motion.p
                key={tipo.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 text-center text-[15px] leading-relaxed text-slate-600 lg:hidden"
              >
                {tipo.resumo}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="lg:sticky lg:top-28 lg:w-[340px]">
            <Conversa tipo={tipo} />
            <p className="mt-4 text-center text-[12px] text-slate-400">Exemplos com nomes e valores fictícios.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

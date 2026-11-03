import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Camera, CheckCheck, ChevronLeft, Lock, Mic, MoreVertical, Paperclip, Phone, Play, Smile, Video } from 'lucide-react';
import { LogoFS } from '../components/LogoFS';

/* Entrada suave quando o bloco aparece na tela */
export const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = '',
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const Eyebrow: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
      light ? 'border-amber-300 bg-amber-50 text-amber-700' : 'border-amber-400/30 bg-amber-400/10 text-amber-300'
    }`}
  >
    {children}
  </span>
);

/* light = dobra de fundo claro (texto escuro) */
export const SectionTitle: React.FC<{
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  center?: boolean;
  light?: boolean;
}> = ({ eyebrow, title, sub, center = true, light }) => (
  <Reveal className={`${center ? 'mx-auto text-center' : ''} mb-10 max-w-3xl sm:mb-14`}>
    {eyebrow && <div className="mb-4"><Eyebrow light={light}>{eyebrow}</Eyebrow></div>}
    <h2
      className={`font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-4xl md:text-5xl ${
        light ? 'text-navy-900' : 'text-white'
      }`}
    >
      {title}
    </h2>
    {sub && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-slate-600' : 'text-slate-300'}`}>{sub}</p>}
  </Reveal>
);

/* ---------- Celular com a tela do WhatsApp ---------- */
export const PhoneFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  status?: string;
  /* muda sempre que entra mensagem nova, para a conversa rolar até o fim */
  scrollKey?: unknown;
}> = ({ children, className = '', status = 'online', scrollKey }) => {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    // espera a animação de entrada começar antes de rolar
    const t = setTimeout(() => el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' }), 60);
    return () => clearTimeout(t);
  }, [scrollKey]);

  return (
    <div className={`relative mx-auto w-full max-w-[340px] ${className}`}>
      <div className="rounded-[46px] border border-slate-600/60 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-[9px] shadow-2xl shadow-black/60">
        <div className="relative flex h-[620px] flex-col overflow-hidden rounded-[38px] bg-[#0b141a]">
          {/* barra de status */}
          <div className="flex items-center justify-between bg-[#1f2c34] px-7 pb-1 pt-3 text-[12px] font-semibold text-white">
            <span>17:42</span>
            <span className="absolute left-1/2 top-2.5 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
            <span className="flex items-center gap-1 text-[10px]">
              <span className="flex items-end gap-[1.5px]">
                {[4, 6, 8, 10].map((h) => <span key={h} className="w-[3px] rounded-sm bg-white" style={{ height: h }} />)}
              </span>
              5G
              <span className="ml-0.5 flex h-[11px] w-[22px] items-center rounded-[3px] border border-white/70 p-[1.5px]">
                <span className="h-full w-[75%] rounded-[1px] bg-white" />
              </span>
            </span>
          </div>

          {/* cabeçalho da conversa */}
          <div className="flex items-center gap-1.5 bg-[#1f2c34] px-1.5 pb-2.5 pt-1.5">
            <ChevronLeft className="h-6 w-6 shrink-0 text-[#00a884]" />
            <LogoFS size={36} className="!rounded-full" />
            <div className="ml-1 min-w-0 flex-1">
              <p className="flex items-center gap-1 truncate text-[14px] font-semibold text-[#e9edef]">
                Finanças do Servidor
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" aria-hidden>
                  <path fill="#25d366" d="M12 1.5l2.6 1.9 3.2-.1 1 3 2.6 1.9-1 3 1 3-2.6 1.9-1 3-3.2-.1L12 22.5l-2.6-1.9-3.2.1-1-3L2.6 15.8l1-3-1-3 2.6-1.9 1-3 3.2.1z" />
                  <path fill="none" stroke="#0b141a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" d="M7.8 12.2l2.8 2.8 5.6-5.6" />
                </svg>
              </p>
              <p className={`truncate text-[11.5px] ${status === 'online' ? 'text-[#8696a0]' : 'text-[#00a884]'}`}>{status}</p>
            </div>
            <Video className="mx-2 h-5 w-5 text-[#aebac1]" />
            <Phone className="mx-1.5 h-[18px] w-[18px] text-[#aebac1]" />
            <MoreVertical className="mr-1 h-5 w-5 text-[#aebac1]" />
          </div>

          {/* conversa */}
          <div ref={bodyRef} className="wa-wallpaper no-scrollbar flex-1 overflow-y-auto overflow-x-hidden">
            <div className="flex min-h-full flex-col justify-end gap-1.5 px-2.5 py-3">{children}</div>
          </div>

          {/* barra de digitação */}
          <div className="flex items-end gap-1.5 bg-[#0b141a] px-1.5 pb-5 pt-1.5">
            <div className="flex flex-1 items-center gap-2.5 rounded-full bg-[#1f2c34] px-3 py-2.5 text-[#8696a0]">
              <Smile className="h-5 w-5 shrink-0" />
              <span className="flex-1 text-[14px]">Mensagem</span>
              <Paperclip className="h-5 w-5 shrink-0 -rotate-45" />
              <Camera className="h-5 w-5 shrink-0" />
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-[#0b141a]">
              <Mic className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Etiqueta de data e aviso de criptografia (início de conversa) */
export const DateChip: React.FC<{ children?: React.ReactNode }> = ({ children = 'HOJE' }) => (
  <div className="my-1 flex justify-center">
    <span className="rounded-lg bg-[#182229] px-2.5 py-1 text-[10.5px] font-medium text-[#8696a0] shadow">{children}</span>
  </div>
);

export const EncryptionNotice: React.FC = () => (
  <div className="mx-3 mb-1 rounded-lg bg-[#182229] px-3 py-1.5 text-center text-[10.5px] leading-snug text-[#ffd279]">
    <Lock className="mr-1 inline h-2.5 w-2.5" />
    As mensagens são protegidas com a criptografia de ponta a ponta.
  </div>
);

const bubbleMotion = {
  initial: { opacity: 0, y: 14, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.28, ease: 'easeOut' as const },
};

/* "biquinho" do balão, igual ao WhatsApp */
const Tail: React.FC<{ side: 'me' | 'bot' }> = ({ side }) => (
  <svg
    viewBox="0 0 8 13"
    className={`absolute top-0 h-[13px] w-[8px] ${side === 'me' ? '-right-[7px]' : '-left-[7px] -scale-x-100'}`}
    aria-hidden
  >
    <path d="M0 0h8L1.5 8.5C1 9.2 0 8.8 0 8z" fill={side === 'me' ? '#005c4b' : '#202c33'} />
  </svg>
);

export const Bubble: React.FC<{ from: 'me' | 'bot'; children: React.ReactNode; time?: string }> = ({
  from,
  children,
  time = '17:42',
}) => (
  <motion.div {...bubbleMotion} className={`flex ${from === 'me' ? 'justify-end pr-1.5' : 'justify-start pl-1.5'}`}>
    <div
      className={`relative max-w-[82%] rounded-lg px-2 pb-1 pt-1.5 text-[13px] leading-snug text-[#e9edef] shadow-sm ${
        from === 'me' ? 'rounded-tr-none bg-[#005c4b]' : 'rounded-tl-none bg-[#202c33]'
      }`}
    >
      <Tail side={from} />
      <div className="whitespace-pre-line">{children}</div>
      <div className="-mb-0.5 mt-0.5 flex items-center justify-end gap-1 text-[10px] text-[#8696a0]">
        {time}
        {from === 'me' && <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />}
      </div>
    </div>
  </motion.div>
);

export const AudioBubble: React.FC<{ duration?: string; caption?: string; time?: string }> = ({
  duration = '0:05',
  caption,
  time = '17:42',
}) => (
  <motion.div {...bubbleMotion} className="flex justify-end pr-1.5">
    <div className="relative w-[80%] rounded-lg rounded-tr-none bg-[#005c4b] px-2 pb-1 pt-2 shadow-sm">
      <Tail side="me" />
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-300 text-[13px] font-bold text-slate-700">EU</div>
        <Play className="h-4 w-4 shrink-0 fill-[#8696a0] text-[#8696a0]" />
        <div className="flex h-6 flex-1 items-center gap-[2px]">
          {[6, 12, 18, 10, 22, 14, 8, 16, 20, 12, 6, 14, 18, 9, 5, 12, 16, 8].map((h, i) => (
            <span
              key={i}
              className="wave-bar w-[2.5px] rounded-full bg-[#8696a0]"
              style={{ height: h, animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      </div>
      {caption && <p className="mt-1 text-[11px] italic text-emerald-100/70">“{caption}”</p>}
      <div className="mt-0.5 flex items-center justify-between text-[10px] text-[#8696a0]">
        <span>{duration}</span>
        <span className="flex items-center gap-1">{time} <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" /></span>
      </div>
    </div>
  </motion.div>
);

/* Foto de nota fiscal enviada pelo usuário */
export const PhotoBubble: React.FC<{ time?: string }> = ({ time = '17:42' }) => (
  <motion.div {...bubbleMotion} className="flex justify-end pr-1.5">
    <div className="relative w-[64%] rounded-lg rounded-tr-none bg-[#005c4b] p-[3px] shadow-sm">
      <Tail side="me" />
      <div className="relative flex h-36 flex-col gap-[3px] overflow-hidden rounded-md bg-[#f4f1ea] px-2.5 py-2 font-mono text-[7.5px] leading-tight text-slate-600">
        <span className="text-center font-bold text-slate-800">SUPERMERCADO BOM PREÇO LTDA</span>
        <span className="text-center">CNPJ 12.345.678/0001-90</span>
        <span className="text-center font-bold text-slate-800">NOTA FISCAL DE CONSUMIDOR ELETRÔNICA</span>
        <span className="border-t border-dashed border-slate-400 pt-[3px]">ARROZ 5KG ............. 27,90</span>
        <span>CAFÉ 500G ............. 18,40</span>
        <span>CARNE KG .............. 64,90</span>
        <span>OUTROS ITENS .......... 73,10</span>
        <span className="border-t border-dashed border-slate-400 pt-[3px] font-bold text-slate-800">VALOR TOTAL R$ 184,30</span>
        <span className="scan-line absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-emerald-400/40 to-transparent" />
        <span className="absolute bottom-1.5 right-2 text-[9.5px] text-slate-500">{time}</span>
      </div>
    </div>
  </motion.div>
);

export const Receipt: React.FC<{ title: string; rows: [string, string][]; tone?: 'out' | 'in' }> = ({
  title,
  rows,
  tone = 'out',
}) => (
  <div className="min-w-[170px]">
    <p className={`font-semibold ${tone === 'in' ? 'text-[#25d366]' : 'text-[#ffd279]'}`}>{title}</p>
    <div className="mt-1 space-y-0.5">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-3 text-[12px]">
          <span className="text-[#8696a0]">{k}</span>
          <span className="font-semibold text-white">{v}</span>
        </div>
      ))}
    </div>
  </div>
);

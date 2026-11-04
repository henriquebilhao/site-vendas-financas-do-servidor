import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  Camera,
  Check,
  CheckCheck,
  Clock3,
  Lock,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Play,
  SendHorizontal,
  Smile,
  Video,
} from 'lucide-react';
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

/* ==========================================================================
   WhatsApp (tema claro, igual ao app no Android)
   ========================================================================== */

/* hora atual no formato do WhatsApp (17:42) */
export const agora = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

/* ---------- Celular com a tela do WhatsApp ---------- */
export const PhoneFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  status?: string;
  /* muda sempre que entra mensagem nova, para a conversa rolar até o fim */
  scrollKey?: unknown;
  /* texto sendo digitado na caixa de mensagem */
  draft?: string;
  /* mostra a gravação de áudio no lugar da caixa de mensagem */
  recording?: boolean;
}> = ({ children, className = '', status = 'online', scrollKey, draft = '', recording = false }) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    // espera a animação de entrada começar antes de rolar
    const t = setTimeout(() => el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' }), 60);
    return () => clearTimeout(t);
  }, [scrollKey]);

  // cronômetro da gravação de áudio
  useEffect(() => {
    if (!recording) return setSecs(0);
    const i = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(i);
  }, [recording]);

  const typing = draft.length > 0;

  return (
    <div className={`relative mx-auto w-full max-w-[340px] ${className}`}>
      <div className="rounded-[46px] border border-slate-600/60 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-[9px] shadow-2xl shadow-black/50">
        <div className="relative flex h-[620px] flex-col overflow-hidden rounded-[38px] bg-[#efeae2]">
          {/* barra de status do celular */}
          <div className="flex items-center justify-between bg-[#008069] px-7 pb-1 pt-3 text-[12px] font-semibold text-white">
            <span>{agora()}</span>
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
          <div className="flex items-center gap-1 bg-[#008069] px-1.5 pb-2.5 pt-1.5 text-white">
            <ArrowLeft className="h-[22px] w-[22px] shrink-0" />
            <LogoFS size={36} className="!rounded-full" />
            <div className="ml-1.5 min-w-0 flex-1">
              <p className="flex items-center gap-1 text-[14.5px] font-semibold leading-tight">
                <span className="truncate">Finanças do Servidor</span>
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" aria-hidden>
                  <path fill="#25d366" d="M12 1.5l2.6 1.9 3.2-.1 1 3 2.6 1.9-1 3 1 3-2.6 1.9-1 3-3.2-.1L12 22.5l-2.6-1.9-3.2.1-1-3L2.6 15.8l1-3-1-3 2.6-1.9 1-3 3.2.1z" />
                  <path fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" d="M7.8 12.2l2.8 2.8 5.6-5.6" />
                </svg>
              </p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={status}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.15 }}
                  className="truncate text-[12px] leading-tight text-white/80"
                >
                  {status}
                </motion.p>
              </AnimatePresence>
            </div>
            <Video className="mx-1 h-5 w-5 shrink-0" />
            <Phone className="mx-1 h-[17px] w-[17px] shrink-0" />
            <MoreVertical className="h-5 w-5 shrink-0" />
          </div>

          {/* conversa */}
          <div ref={bodyRef} className="wa-wallpaper no-scrollbar flex-1 overflow-y-auto overflow-x-hidden">
            <div className="flex min-h-full flex-col justify-end gap-[3px] px-2 py-3">{children}</div>
          </div>

          {/* barra de digitação */}
          <div className="flex items-end gap-1.5 px-1.5 pb-5 pt-1.5">
            <div className="flex min-h-[44px] flex-1 items-center gap-2.5 rounded-full bg-white px-3 py-2 text-[#8696a0] shadow-sm">
              {recording ? (
                <>
                  <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-[#ea0038]" />
                  <span className="text-[15px] tabular-nums text-[#111b21]">0:{String(secs).padStart(2, '0')}</span>
                  <span className="flex-1 text-right text-[12.5px]">‹ deslize para cancelar</span>
                </>
              ) : (
                <>
                  <Smile className="h-[22px] w-[22px] shrink-0" />
                  <span className={`min-w-0 flex-1 truncate text-[15px] ${typing ? 'text-[#111b21]' : ''}`}>
                    {typing ? (
                      <>
                        {draft}
                        <span className="caret ml-px inline-block h-[17px] w-[1.5px] translate-y-[3px] bg-[#00a884]" />
                      </>
                    ) : (
                      'Mensagem'
                    )}
                  </span>
                  <Paperclip className="h-5 w-5 shrink-0 -rotate-45" />
                  {!typing && <Camera className="h-5 w-5 shrink-0" />}
                </>
              )}
            </div>
            <motion.div
              animate={{ scale: recording ? 1.18 : 1 }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-white shadow-sm"
            >
              {typing ? <SendHorizontal className="ml-0.5 h-5 w-5 fill-white" /> : <Mic className="h-5 w-5" />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Etiqueta de data e aviso de criptografia (início de conversa) */
export const DateChip: React.FC<{ children?: React.ReactNode }> = ({ children = 'HOJE' }) => (
  <div className="my-1.5 flex justify-center">
    <span className="rounded-lg bg-white px-3 py-1 text-[11px] font-medium uppercase text-[#54656f] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">
      {children}
    </span>
  </div>
);

export const EncryptionNotice: React.FC = () => (
  <div className="mx-4 mb-2 rounded-lg bg-[#ffeecd] px-3 py-1.5 text-center text-[11px] leading-snug text-[#54656f] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">
    <Lock className="mr-1 inline h-2.5 w-2.5 -translate-y-px" />
    As mensagens e as ligações são protegidas com a criptografia de ponta a ponta.
  </div>
);

const bubbleMotion = {
  initial: { opacity: 0, y: 12, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.25, ease: 'easeOut' as const },
};

const BG = { me: '#d9fdd3', bot: '#ffffff' };
const bubbleShadow = 'shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]';

/* "biquinho" do balão, igual ao WhatsApp */
const Tail: React.FC<{ side: 'me' | 'bot' }> = ({ side }) => (
  <svg
    viewBox="0 0 8 13"
    className={`absolute top-0 h-[13px] w-[8px] ${side === 'me' ? '-right-[8px]' : '-left-[8px] -scale-x-100'}`}
    aria-hidden
  >
    <path d="M0 0h8L1.5 8.5C1 9.2 0 8.8 0 8z" fill={BG[side]} />
  </svg>
);

/* Vistos: relógio → ✓ → ✓✓ cinza → ✓✓ azul (lido) */
const Ticks: React.FC<{ light?: boolean }> = ({ light }) => {
  const [st, setSt] = useState(0);
  useEffect(() => {
    const a = setTimeout(() => setSt(1), 250);
    const b = setTimeout(() => setSt(2), 600);
    const c = setTimeout(() => setSt(3), 1100);
    return () => [a, b, c].forEach(clearTimeout);
  }, []);
  const grey = light ? 'text-white' : 'text-[#667781]';
  if (st === 0) return <Clock3 className={`h-3 w-3 ${grey}`} />;
  if (st === 1) return <Check className={`h-[15px] w-[15px] ${grey}`} />;
  return <CheckCheck className={`h-[15px] w-[15px] ${st === 3 ? 'text-[#53bdeb]' : grey}`} />;
};

/* hora + vistos no canto do balão */
const Meta: React.FC<{ time: string; me: boolean }> = ({ time, me }) => (
  <span className="absolute bottom-1 right-1.5 flex items-center gap-[3px] text-[11px] leading-none text-[#667781]">
    {time}
    {me && <Ticks />}
  </span>
);

export const Bubble: React.FC<{ from: 'me' | 'bot'; children: React.ReactNode; time?: string; tail?: boolean }> = ({
  from,
  children,
  time = '17:42',
  tail = true,
}) => {
  const me = from === 'me';
  return (
    <motion.div {...bubbleMotion} className={`flex ${me ? 'justify-end pr-2' : 'justify-start pl-2'} ${tail ? 'mt-1.5' : ''}`}>
      <div
        className={`relative max-w-[84%] rounded-lg px-2 pb-1.5 pt-1.5 text-[14px] leading-[19px] text-[#111b21] ${bubbleShadow} ${
          tail ? (me ? 'rounded-tr-none' : 'rounded-tl-none') : ''
        }`}
        style={{ background: BG[from] }}
      >
        {tail && <Tail side={from} />}
        <div className="whitespace-pre-line break-words">
          {children}
          {/* espaço reservado para a hora não ficar por cima do texto */}
          <span className={`inline-block ${me ? 'w-[62px]' : 'w-[40px]'}`} />
        </div>
        <Meta time={time} me={me} />
      </div>
    </motion.div>
  );
};

/* "digitando..." dentro da conversa */
export const TypingBubble: React.FC = () => (
  <motion.div {...bubbleMotion} className="mt-1.5 flex justify-start pl-2">
    <div className={`relative rounded-lg rounded-tl-none bg-white px-3.5 py-3 ${bubbleShadow}`}>
      <Tail side="bot" />
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="typing-dot h-[7px] w-[7px] rounded-full bg-[#8696a0]" style={{ animationDelay: `${i * 160}ms` }} />
        ))}
      </div>
    </div>
  </motion.div>
);

const WAVE = [5, 9, 14, 8, 18, 12, 6, 15, 20, 11, 7, 13, 17, 9, 5, 11, 15, 8, 12, 6, 10, 14, 7, 5];

export const AudioBubble: React.FC<{ duration?: string; caption?: string; time?: string }> = ({
  duration = '0:05',
  caption,
  time = '17:42',
}) => (
  <motion.div {...bubbleMotion} className="mt-1.5 flex justify-end pr-2">
    <div className={`relative w-[82%] rounded-lg rounded-tr-none px-2 pb-1.5 pt-2 ${bubbleShadow}`} style={{ background: BG.me }}>
      <Tail side="me" />
      <div className="flex items-center gap-2">
        <Play className="h-6 w-6 shrink-0 fill-[#54656f] text-[#54656f]" />
        <div className="relative flex h-7 flex-1 items-center gap-[2px]">
          <span className="absolute left-0 top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full bg-[#53bdeb]" />
          {WAVE.map((h, i) => (
            <span
              key={i}
              className="wave-bar w-[2.5px] shrink-0 rounded-full bg-[#8fa59c]"
              style={{ height: h, animationDelay: `${i * 50}ms` }}
            />
          ))}
        </div>
        {/* foto do contato com o microfone azul de "áudio ouvido" */}
        <div className="relative shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-slate-300 to-slate-400 text-[13px] font-bold text-white">
            EU
          </div>
          <Mic className="absolute -bottom-0.5 -left-1 h-4 w-4 fill-[#53bdeb] text-[#53bdeb]" />
        </div>
      </div>
      <div className="mt-0.5 flex h-4 items-center pl-8 text-[11px] text-[#667781]">{duration}</div>
      {caption && (
        <div className="mt-1 border-t border-black/5 pb-3.5 pt-1.5 text-[12.5px] leading-snug text-[#3b4a54]">
          <span className="mb-0.5 block text-[11px] font-medium text-[#667781]">Transcrição</span>
          {caption}
        </div>
      )}
      <Meta time={time} me />
    </div>
  </motion.div>
);

/* Foto de nota fiscal enviada pelo usuário */
export const PhotoBubble: React.FC<{ time?: string }> = ({ time = '17:42' }) => (
  <motion.div {...bubbleMotion} className="mt-1.5 flex justify-end pr-2">
    <div className={`relative w-[64%] rounded-lg rounded-tr-none p-[3px] ${bubbleShadow}`} style={{ background: BG.me }}>
      <Tail side="me" />
      <div className="relative flex h-40 flex-col gap-[3px] overflow-hidden rounded-md bg-[#f7f5ef] px-2.5 py-2 font-mono text-[7.5px] leading-tight text-slate-600">
        <span className="text-center font-bold text-slate-800">SUPERMERCADO BOM PREÇO LTDA</span>
        <span className="text-center">CNPJ 12.345.678/0001-90</span>
        <span className="text-center font-bold text-slate-800">NOTA FISCAL DE CONSUMIDOR ELETRÔNICA</span>
        <span className="border-t border-dashed border-slate-400 pt-[3px]">ARROZ 5KG ............. 27,90</span>
        <span>CAFÉ 500G ............. 18,40</span>
        <span>CARNE KG .............. 64,90</span>
        <span>OUTROS ITENS .......... 73,10</span>
        <span className="border-t border-dashed border-slate-400 pt-[3px] font-bold text-slate-800">VALOR TOTAL R$ 184,30</span>
        <span className="scan-line absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-emerald-400/40 to-transparent" />
        {/* hora em cima da foto, como no WhatsApp */}
        <span className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/45 to-transparent" />
        <span className="absolute bottom-1 right-1.5 flex items-center gap-[3px] font-sans text-[11px] text-white">
          {time}
          <Ticks light />
        </span>
      </div>
    </div>
  </motion.div>
);

/* Resposta do assistente no formato de texto do WhatsApp (*negrito*) */
export const Receipt: React.FC<{ title: string; rows: [string, string][]; tone?: 'out' | 'in' }> = ({ title, rows }) => (
  <span className="block min-w-[180px]">
    <b className="font-semibold">{title}</b>
    {'\n'}
    {rows.map(([k, v], i) => (
      <React.Fragment key={k + i}>
        {'\n'}
        {v ? (
          <>
            {k}: <b className="font-semibold">{v}</b>
          </>
        ) : (
          <b className="font-semibold">{k}</b>
        )}
      </React.Fragment>
    ))}
  </span>
);

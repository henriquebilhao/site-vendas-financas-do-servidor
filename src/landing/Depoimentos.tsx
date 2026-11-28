import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Reveal } from './ui';

/* =====================================================================
   DEPOIMENTOS REAIS — prints de mensagens de usuários (sem nome/foto/número no print).
   Os prints NÃO podem ser editados, recortados nem filtrados (o marca-texto amarelo já vem nas imagens).
   O alt de cada um é a transcrição da mensagem.
   ===================================================================== */
const DEPOS = [
  {
    nome: 'Henrique',
    origem: 'WhatsApp',
    img: '/depoimentos/henrique.jpg',
    w: 1080,
    h: 1047,
    alt: 'O aplicativo tem me ajudado muito no dia a dia! Hoje consigo ter um controle muito melhor do meu dinheiro, saber exatamente para onde ele está indo e identificar onde posso economizar. É muito diferente dos outros aplicativos que já testei, principalmente pela quantidade de ferramentas disponíveis. Além de registrar e acompanhar meus gastos pelo WhatsApp, ainda consigo utilizar recursos adicionais, como simular financiamentos e organizar melhor minha vida financeira. É uma ferramenta muito completa, prática e que realmente faz a diferença!',
  },
  {
    nome: 'André',
    origem: 'WhatsApp',
    img: '/depoimentos/witor.jpg',
    w: 1080,
    h: 926,
    alt: 'Cara, esse app é simplesmente extraordinário, eu sempre tive bastante dificuldade de fazer uma organização financeira e com o finanças do servidor isso mudou, pois é muito prático e fácil de usar. Eu mando uma mensagem no WhatsApp com meu gasto e já era, não preciso ficar perdendo tempo tentando anotar em planilha ou bloco de notas. Parabéns pelo app, é muito top, de verdade.',
  },
  {
    nome: 'João',
    origem: 'WhatsApp',
    img: '/depoimentos/joao.jpg',
    w: 1080,
    h: 1237,
    alt: 'O Finanças do Servidor é uma baita ferramenta! Me ajudou a organizar o orçamento familiar, pois permite que mais uma pessoa também registre despesas e receitas no orçamento — no meu caso, minha esposa. Estamos utilizando a ferramenta há mais de um mês e podemos afirmar que ela nos ajudou a identificar os gargalos do nosso orçamento. O recurso que permite estabelecer metas de gastos e receber avisos quando os limites definidos estão próximos de serem atingidos é muito útil, pois ajuda a controlar os impulsos e evitar gastos desnecessários.',
  },
  {
    nome: 'Ricardo',
    origem: 'WhatsApp',
    img: '/depoimentos/ricardo.jpg',
    w: 1080,
    h: 1285,
    alt: 'Que app padrão. Parabéns mesmo. Essas metas vão acompanhar meus gastos no mês após cada lançamento e avisar quando estiver próximo de bater. Cara, padrão demais, isso de vincular no whats o assistente ficou sensacional, não precisa aquele trabalho de anotar no whats e na planilha os gastos, essas metas também, muito top. Tudo que o cara precisa pra ter um controle tá aqui.',
  },
  {
    nome: 'Gabriel',
    origem: 'Instagram',
    img: '/depoimentos/gabriel.jpg',
    w: 1080,
    h: 482,
    alt: 'Baita ferramenta esse app, controle 100% do dinheiro. Muito top! Estou conseguindo acompanhar bem o dinheiro.',
  },
  {
    nome: 'Jhonatan',
    origem: 'WhatsApp',
    img: '/depoimentos/jhonatan.jpg',
    w: 1080,
    h: 785,
    alt: 'Pergunta: E o app, está usando? Resposta: Sim direto. Muito top.',
  },
];

/* quantos cards cabem por vez: celular 1, tablet 2, computador 3 */
const useCardsPorVez = () => {
  const [n, setN] = useState(1);
  useEffect(() => {
    const calc = () => setN(window.matchMedia('(min-width: 1024px)').matches ? 3 : window.matchMedia('(min-width: 768px)').matches ? 2 : 1);
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);
  return n;
};

export const Depoimentos: React.FC = () => {
  const trilho = useRef<HTMLDivElement>(null);
  const porVez = useCardsPorVez();
  const posicoes = Math.max(1, DEPOS.length - porVez + 1);
  const [ativo, setAtivo] = useState(0);
  const [aberto, setAberto] = useState<number | null>(null);

  /* distância entre o início de um card e o do próximo (largura do card + espaço) */
  const passo = () => {
    const t = trilho.current;
    if (!t || t.children.length < 2) return 0;
    return (t.children[1] as HTMLElement).offsetLeft - (t.children[0] as HTMLElement).offsetLeft;
  };

  const irPara = useCallback(
    (i: number) => {
      const t = trilho.current;
      if (!t) return;
      const alvo = Math.min(Math.max(i, 0), posicoes - 1);
      t.scrollTo({ left: alvo * passo(), behavior: 'smooth' });
    },
    [posicoes],
  );

  /* acompanha o arrasto para marcar a bolinha certa */
  const aoRolar = () => {
    const t = trilho.current;
    if (!t) return;
    const p = passo();
    if (!p) return;
    const fim = t.scrollLeft >= t.scrollWidth - t.clientWidth - 2;
    setAtivo(fim ? posicoes - 1 : Math.min(posicoes - 1, Math.round(t.scrollLeft / p)));
  };

  useEffect(() => {
    aoRolar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posicoes]);

  /* lightbox: Esc fecha */
  useEffect(() => {
    if (aberto === null) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [aberto]);

  const seta =
    'flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-navy-900 transition hover:border-amber-500 hover:text-amber-600 disabled:pointer-events-none disabled:opacity-30';

  return (
    <section id="depoimentos" className="relative overflow-hidden bg-mist py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> O que dizem nossos usuários
          </span>
          <h2 className="font-display mt-4 text-[1.75rem] font-bold leading-[1.1] tracking-tight text-navy-900 sm:text-4xl lg:text-[2.75rem]">
            Depoimentos <span className="text-amber-500">reais</span>
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-12 rounded-full bg-amber-500" />
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600 sm:text-[17px]">
            Mensagens reais de quem já usa o app no dia a dia.
          </p>
        </Reveal>

        {/* trilho: arrastar com o dedo e encaixar card a card */}
        <div
          ref={trilho}
          onScroll={aoRolar}
          className="-mx-4 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
          style={{ scrollPaddingLeft: 16 }}
          aria-label="Depoimentos de usuários"
        >
          {DEPOS.map((d, i) => (
            <figure
              key={d.nome}
              className="flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-navy-900/10 md:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
            >
              {/* o print fica no topo, inteiro, sem cortar; o que sobrar fica em branco */}
              <button
                type="button"
                onClick={() => setAberto(i)}
                className="block flex-1 cursor-zoom-in text-left"
                aria-label={`Ampliar o depoimento de ${d.nome}`}
              >
                <img
                  src={d.img}
                  alt={d.alt}
                  width={d.w}
                  height={d.h}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full object-contain object-top"
                />
              </button>
              <figcaption className="border-t border-slate-100 px-5 py-4">
                <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-navy-900">{d.nome}</p>
                <p className="mt-0.5 text-[13px] text-slate-500">Usuário do Finanças do Servidor · via {d.origem}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* navegação */}
        <div className="mt-6 flex items-center justify-center gap-5">
          <button type="button" className={seta} onClick={() => irPara(ativo - 1)} disabled={ativo === 0} aria-label="Depoimento anterior">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: posicoes }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => irPara(i)}
                aria-label={`Ir para o depoimento ${i + 1}`}
                aria-current={i === ativo}
                className={`h-2 rounded-full transition-all ${i === ativo ? 'w-6 bg-amber-500' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
              />
            ))}
          </div>
          <button type="button" className={seta} onClick={() => irPara(ativo + 1)} disabled={ativo >= posicoes - 1} aria-label="Próximo depoimento">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* imagem em tamanho maior */}
      <AnimatePresence>
        {aberto !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
            onClick={() => setAberto(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Depoimento de ${DEPOS[aberto].nome}`}
          >
            <button
              type="button"
              onClick={() => setAberto(null)}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={DEPOS[aberto].img}
              alt={DEPOS[aberto].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-full rounded-xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

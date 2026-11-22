import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Heart, Instagram as InstagramIcon, UserPlus } from 'lucide-react';
import { LINKS } from './data';
import { SectionTitle } from './ui';

/* Seção final: convite para seguir o perfil no Instagram.
   O print do perfil aparece grande e "se aproxima" conforme a pessoa rola a página. */
export const InstagramSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0.3, 1]);

  return (
    <section id="instagram" className="relative overflow-hidden bg-navy-900 py-14 sm:py-20">
      {/* brilho colorido (cores do Instagram) girando bem devagar atrás do print */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[58%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl sm:h-[760px] sm:w-[760px]"
        style={{
          background:
            'conic-gradient(from 0deg, #f9ce34, #ee2a7b, #6228d7, #3b82f6, #f9ce34)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Siga a gente"
          title={
            <>
              Acompanhe no <span className="text-amber-300">Instagram.</span>
            </>
          }
          sub="Dicas de organização financeira para servidor, novidades do app e bastidores. Toque em seguir e não perca nada."
        />

        <div ref={ref} className="relative mx-auto max-w-3xl">
          {/* o print flutua de leve e amplia ao rolar */}
          <motion.div style={{ scale, rotate, opacity }} className="[perspective:1200px]">
            <motion.a
              href={LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir o perfil @appfinancasdoservidor no Instagram"
              className="relative block rounded-[2rem] p-[3px] shadow-2xl shadow-black/40"
              style={{
                background: 'linear-gradient(135deg, #f9ce34, #ee2a7b 50%, #6228d7)',
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.025, rotateX: 2, rotateY: -2 }}
              whileTap={{ scale: 0.99 }}
            >
              <img
                src="/prints/instagram-perfil.webp"
                alt="Perfil do Instagram @appfinancasdoservidor: Finanças do Servidor, assistente financeiro no WhatsApp"
                width={1440}
                height={1190}
                loading="lazy"
                className="block w-full rounded-[calc(2rem-3px)] bg-white"
              />
              {/* faixa de brilho que passa pelo print */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-[3px] overflow-hidden rounded-[calc(2rem-3px)]"
              >
                <motion.span
                  className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ left: ['-40%', '140%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 4.5, ease: 'easeInOut' }}
                />
              </motion.span>
            </motion.a>
          </motion.div>

          {/* selos flutuantes */}
          <motion.span
            aria-hidden
            className="absolute -top-4 right-6 hidden items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13px] font-bold text-slate-900 shadow-xl sm:inline-flex"
            animate={{ y: [0, -8, 0], rotate: [-4, -2, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" /> Dicas toda semana
          </motion.span>
          <motion.span
            aria-hidden
            className="absolute -bottom-4 left-6 hidden items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1.5 text-[13px] font-bold text-slate-950 shadow-xl sm:inline-flex"
            animate={{ y: [0, 8, 0], rotate: [3, 1, 3] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          >
            <UserPlus className="h-4 w-4" /> Venha para a comunidade
          </motion.span>
        </div>

        <div className="mt-9 flex flex-col items-center gap-3 text-center">
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold group inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[16px]"
          >
            <InstagramIcon className="h-5 w-5 transition group-hover:rotate-12" />
            Seguir @appfinancasdoservidor
          </a>
          <p className="text-[13px] text-slate-400">É grátis e leva um toque.</p>
        </div>
      </div>
    </section>
  );
};

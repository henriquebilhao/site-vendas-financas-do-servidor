import React from 'react';
import { 
  MessageSquare, 
  Cpu, 
  LayoutDashboard, 
  Sparkles, 
  ArrowRight,
  Mic,
  Zap,
  BarChart3
} from 'lucide-react';

interface ThreePillarsSectionProps {
  onOpenCheckout: () => void;
}

export const ThreePillarsSection: React.FC<ThreePillarsSectionProps> = ({ onOpenCheckout }) => {
  return (
    <section id="como-funciona" className="relative py-20 md:py-28 bg-black overflow-hidden border-t border-slate-900">
      
      {/* Background Navy & Amber subtle radial spotlight */}
      <div 
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[160px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(14, 60, 160, 0.5) 0%, rgba(245, 158, 11, 0.15) 50%, rgba(3, 7, 18, 0) 80%)'
        }}
      />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Transitional Hook Statement */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-20 px-1">
          <p className="text-sm sm:text-lg md:text-xl font-bold text-white leading-relaxed text-balance">
            Servidor, o que você está prestes a acessar agora é a maneira <span className="text-amber-400">mais fácil, rápida e eficaz</span> de organizar suas finanças, controlar receitas e despesas e ter previsibilidade total, <span className="text-amber-400">utilizando apenas o seu WhatsApp</span>.
          </p>
        </div>

        {/* 3 Dark Glass Cards with Glowing Borders & Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1 */}
          <div className="group relative rounded-3xl p-5 sm:p-8 bg-gradient-to-b from-slate-900/90 via-blue-950/40 to-slate-950 border border-blue-900/30 hover:border-amber-400/50 shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-28 h-28 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-amber-400/10 transition-colors" />
            
            <div>
              {/* Pillar Icon Box */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-950 border border-blue-800/60 p-0.5 flex items-center justify-center mb-4 sm:mb-6 shadow-md shadow-blue-950/80 group-hover:border-amber-400/60 transition-colors">
                <div className="w-full h-full rounded-[14px] bg-slate-950/80 flex items-center justify-center text-amber-400">
                  <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 tracking-tight">
                Mande por Texto ou Áudio
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                É o caminho mais sólido e natural entre você e o controle financeiro. Você só manda uma mensagem no WhatsApp como se falasse com um amigo: <span className="text-amber-300">"Almoço 45 reais"</span> ou manda um áudio correndo na rua.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Etapa 01</span>
              <span className="text-amber-400 font-semibold">Áudio ou Texto</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative rounded-3xl p-5 sm:p-8 bg-gradient-to-b from-slate-900/90 via-blue-950/50 to-slate-950 border border-blue-900/40 hover:border-amber-400/50 shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-colors" />

            <div>
              {/* Pillar Icon Box */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-950 border border-blue-800/60 p-0.5 flex items-center justify-center mb-4 sm:mb-6 shadow-md shadow-blue-950/80 group-hover:border-amber-400/60 transition-colors">
                <div className="w-full h-full rounded-[14px] bg-slate-950/80 flex items-center justify-center text-amber-400">
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 tracking-tight">
                Classificação 100% Automática
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                É o que tem feito milhares de pessoas economizarem horas por semana. O motor de inteligência artificial compreende o contexto, identifica se é despesa ou receita, e separa por categoria exata sem você configurar nada.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Etapa 02</span>
              <span className="text-amber-400 font-semibold">Inteligência Artificial</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative rounded-3xl p-5 sm:p-8 bg-gradient-to-b from-slate-900/90 via-blue-950/40 to-slate-950 border border-blue-900/30 hover:border-amber-400/50 shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-28 h-28 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-amber-400/10 transition-colors" />

            <div>
              {/* Pillar Icon Box */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-950 border border-blue-800/60 p-0.5 flex items-center justify-center mb-4 sm:mb-6 shadow-md shadow-blue-950/80 group-hover:border-amber-400/60 transition-colors">
                <div className="w-full h-full rounded-[14px] bg-slate-950/80 flex items-center justify-center text-amber-400">
                  <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 tracking-tight">
                Dashboard & Relatórios ao Vivo
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                É o que garante a sua tranquilidade para realizar sonhos. Tenha em mãos gráficos de fluxo de caixa, limites de gastos, metas de investimento e alertas proativos para você nunca mais ser pego de surpresa no fechamento da fatura.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Etapa 03</span>
              <span className="text-amber-400 font-semibold">Visualização Completa</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

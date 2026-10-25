import React from 'react';
import { 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  MessageCircle, 
  TrendingUp, 
  Lock,
  Clock
} from 'lucide-react';
import { LogoFS } from './LogoFS';

interface HeroSectionProps {
  onOpenCheckout: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCheckout }) => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const monthNames = [
    'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
    'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
  ];
  const currentDateStr = `${day} DE ${monthNames[now.getMonth()]}`;
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;

  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-14 md:pb-28 bg-blue-950">
      {/* Background ambient radial gradients - Navy blue & Gold accents replacing the green */}
      <div 
        className="pointer-events-none absolute top-10 right-0 w-[550px] h-[550px] rounded-full blur-[140px] opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(14, 60, 160, 0.7) 0%, rgba(3, 7, 18, 0) 70%)'
        }}
      />
      <div 
        className="pointer-events-none absolute -top-20 left-10 w-[450px] h-[450px] rounded-full blur-[150px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(3, 7, 18, 0) 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">



            {/* Main Punchy Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.15] mb-4 sm:mb-5 text-balance">
              Transforme o seu WhatsApp no Assistente Financeiro do Servidor
            </h1>

            {/* Subheadline */}
            <p className="text-slate-300 text-sm sm:text-lg md:text-xl font-normal leading-relaxed mb-6 sm:mb-8 max-w-2xl">
              Desenvolvido especialmente para a sua rotina: registre cada gasto no WhatsApp por texto, áudio ou foto, acompanhe despesas e receitas automaticamente e faça seu salário sobrar de verdade.
            </p>

            {/* Primary Action Button -> Scrolls to Pricing Section (#planos) */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
              <a
                href="#planos"
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-4 text-sm md:text-base font-bold tracking-wider uppercase text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-xl shadow-xl shadow-amber-500/25 hover:shadow-amber-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
              >
                <span className="flex items-center gap-2.5">
                  Quero Meu Assistente no WhatsApp
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Sem senhas do Gov.br ou banco</span>
              </div>
              <span className="hidden sm:inline text-slate-700">·</span>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Privacidade total criptografada</span>
              </div>
              <span className="hidden sm:inline text-slate-700">·</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Garantia de 7 dias incondicional</span>
              </div>
            </div>

          </div>

          {/* Right Column: Realistic Smartphone Device Mockup with Floating WhatsApp Notification Cards */}
          <div className="lg:col-span-5 relative flex justify-center items-center w-full mt-4 lg:mt-0">
            
            {/* Ambient Navy & Gold backplate glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-96 bg-blue-600/20 rounded-full blur-3xl" />
              <div className="w-60 h-60 bg-amber-500/15 rounded-full blur-2xl" />
            </div>

            {/* Smartphone Container - Expands to use more mobile screen space */}
            <div className="relative w-full max-w-[380px] rounded-[32px] sm:rounded-[44px] p-2.5 sm:p-3.5 bg-gradient-to-b from-slate-800 via-blue-950/60 to-slate-900 border-2 border-slate-700/60 shadow-2xl shadow-blue-950/80">
              
              {/* Inner bezel */}
              <div className="relative rounded-[26px] sm:rounded-[36px] bg-slate-950 overflow-hidden border border-slate-800/80 p-3 sm:p-4 pb-4 sm:pb-6 min-h-[500px] sm:min-h-[580px] flex flex-col justify-between">
                
                {/* Phone Top Notch & Status Bar */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4 sm:mb-6 px-1 sm:px-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white tracking-wider">{currentTime}</span>
                    <span className="text-[10px] text-slate-500 uppercase">{currentDateStr}</span>
                  </div>
                  <div className="w-16 sm:w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-950 mr-1" />
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span>5G</span>
                    <div className="w-4 h-2 rounded-sm border border-slate-400 p-0.5">
                      <div className="w-full h-full bg-amber-400 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* WhatsApp Logo & Header on Mockup */}
                <div className="flex items-center gap-3 px-1 sm:px-2 pb-3.5 border-b border-slate-900">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-900 via-slate-950 to-blue-950 p-1 border border-amber-400/40 flex items-center justify-center shadow-md shrink-0">
                    <LogoFS size={28} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      Finanças do Servidor
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </h4>
                    <p className="text-[10px] text-slate-400">Assistente Financeiro Inteligente</p>
                  </div>
                </div>

                {/* Notification Feed */}
                <div className="space-y-2.5 sm:space-y-3 py-3 sm:py-4 my-auto">
                  
                  {/* Notification 1: Almoço */}
                  <div className="rounded-2xl p-2.5 sm:p-3 bg-gradient-to-r from-slate-900/90 to-blue-950/80 border border-blue-900/40 shadow-lg hover:border-amber-400/40 transition-all duration-300">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-semibold text-emerald-400 flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" /> WHATSAPP
                      </span>
                      <span>Agora</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200">
                      Você: <span className="font-normal text-slate-400">"Paguei R$ 42,50 no almoço perto do tribunal"</span>
                    </p>
                    <div className="mt-1.5 flex items-center justify-between text-[11px] text-amber-400 bg-black/40 px-2 py-1 rounded-lg border border-amber-400/20">
                      <span>✓ Lançado em Alimentação</span>
                      <span className="font-mono font-bold">-R$ 42,50</span>
                    </div>
                  </div>

                  {/* Notification 2: Remuneração creditada */}
                  <div className="rounded-2xl p-2.5 sm:p-3 bg-gradient-to-r from-slate-900/90 to-blue-950/80 border border-blue-900/40 shadow-lg hover:border-amber-400/40 transition-all duration-300">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-semibold text-emerald-400 flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" /> WHATSAPP
                      </span>
                      <span>Hoje cedo</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200">
                      Entrada: <span className="font-normal text-slate-400">"Remuneração mensal creditada: R$ 8.450,00"</span>
                    </p>
                    <div className="mt-1.5 flex items-center justify-between text-[11px] text-emerald-400 bg-black/40 px-2 py-1 rounded-lg border border-emerald-500/20">
                      <span>✓ Receita registrada com sucesso</span>
                      <span className="font-mono font-bold">+R$ 8.450,00</span>
                    </div>
                  </div>

                  {/* Notification 3: Foto de Cupom Fiscal */}
                  <div className="rounded-2xl p-2.5 sm:p-3 bg-gradient-to-r from-slate-900/90 to-blue-950/80 border border-blue-900/40 shadow-lg hover:border-amber-400/40 transition-all duration-300">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-semibold text-emerald-400 flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" /> WHATSAPP
                      </span>
                      <span>Foto de Nota</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200">
                      Você: <span className="font-normal text-slate-400">📷 [Foto do Cupom do Supermercado]</span>
                    </p>
                    <div className="mt-1.5 flex items-center justify-between text-[11px] text-amber-400 bg-black/40 px-2 py-1 rounded-lg border border-amber-400/20">
                      <span>✓ Lançado por Foto de Nota</span>
                      <span className="font-mono font-bold">-R$ 184,30</span>
                    </div>
                  </div>

                  {/* Notification 4 - Insight Summary */}
                  <div className="rounded-2xl p-2.5 sm:p-3 bg-gradient-to-r from-blue-950 to-slate-900 border border-amber-400/30 shadow-lg">
                    <div className="flex items-center justify-between text-[10px] text-amber-400 mb-1 font-semibold">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> SALDO LIVRE APÓS CONTAS FIXAS
                      </span>
                      <span>Atualizado</span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1 font-mono">
                      <span className="text-slate-300">Sobra Real do Mês:</span>
                      <span className="text-amber-400 font-bold">R$ 3.820,00</span>
                    </div>
                  </div>

                </div>

                {/* Quick Interactive WhatsApp bar at bottom of phone */}
                <div className="mt-auto pt-2.5 sm:pt-3 border-t border-slate-900 flex items-center gap-2">
                  <div className="flex-1 bg-slate-900/90 rounded-full px-3 py-1.5 text-[11px] text-slate-400 border border-slate-800 flex items-center justify-between">
                    <span className="truncate mr-1">Mande um gasto ou áudio...</span>
                    <span className="text-amber-400 font-mono text-[10px] shrink-0">🎙️ Áudio</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

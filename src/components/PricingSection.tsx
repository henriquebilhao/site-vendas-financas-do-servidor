import React, { useState, useEffect } from 'react';
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Clock,
  Star,
  Users,
  UserCheck,
  ChevronLeft
} from 'lucide-react';

export const PricingSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 45 });

  // Dependent toggles for Mensal and Trimestral
  const [mensalWithDependent, setMensalWithDependent] = useState(false);
  const [trimestralWithDependent, setTrimestralWithDependent] = useState(false);

  // Dependent selection modal states
  const [showMensalDependentModal, setShowMensalDependentModal] = useState(false);
  const [showTrimestralDependentModal, setShowTrimestralDependentModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { minutes: 15, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const HOTMART_MENSAL_SEM = "https://pay.hotmart.com/R107997768B?off=tp446sid";
  const HOTMART_MENSAL_COM = "https://pay.hotmart.com/R107997768B?off=6rkpkqdm";
  const HOTMART_TRIMESTRAL_SEM = "https://pay.hotmart.com/R107997768B?off=lll6osu7";
  const HOTMART_TRIMESTRAL_COM = "https://pay.hotmart.com/R107997768B?off=sw3m0ili";
  const HOTMART_ANUAL = "https://pay.hotmart.com/R107997768B?off=3347zlda";

  return (
    <section id="planos" className="relative py-20 md:py-28 bg-slate-950 overflow-hidden border-t border-slate-900">
      
      {/* Background ambient lighting */}
      <div 
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full blur-[180px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(14, 60, 160, 0.45) 50%, transparent 80%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Urgency countdown bar - Optimized for mobile */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-10 p-3.5 sm:p-5 md:p-6 rounded-2xl bg-gradient-to-r from-amber-500/25 via-blue-950/60 to-amber-500/25 border-2 animate-urgency-glow flex flex-col sm:flex-row items-center justify-between gap-3 text-sm md:text-base text-slate-200">
          <div className="flex items-center gap-2.5 sm:gap-3 text-center sm:text-left">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <span className="font-black text-white text-base sm:text-lg md:text-xl block leading-tight">🔥 Condição Especial por Tempo Limitado</span>
              <span className="text-[10px] sm:text-[11px] text-amber-300/80 font-medium">Aproveite antes que o contador zere!</span>
            </div>
          </div>
          <div className="font-mono font-black text-amber-400 tracking-wider text-xl sm:text-2xl md:text-3xl tabular-nums bg-black/40 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-amber-400/30">
            {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </div>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400 mb-2 block">
            Planos de Acesso Flexíveis
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight mb-4">
            Escolha o Plano Ideal Para Você
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Experimente grátis com todas as funções por 3 dias ou garanta os planos com registros ilimitados, dashboard, relatórios e suporte a dependente.
          </p>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          
          {/* Plano 1: FREE - 3 DIAS */}
          <div className="rounded-3xl p-6 bg-gradient-to-b from-slate-900 via-blue-950/20 to-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">Plano Grátis</h3>
                <span className="text-[10px] font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-400/20 border border-amber-400/40">TESTE 3 DIAS</span>
              </div>

              <p className="text-xs text-slate-400 mb-5">
                Experimente todas as funções completas do assistente por 3 dias.
              </p>

              {/* Price */}
              <div className="mb-5 pb-5 border-b border-slate-800">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-white font-mono">R$ 0</span>
                  <span className="text-xs text-slate-400">/ 3 dias</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-medium">Degustação sem cartão de crédito</span>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Registros normais e ilimitados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Registro por áudio, fotos e texto</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Dashboard financeiro completo</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Relatórios de despesas e receitas</span>
                </li>
                <li className="flex items-center gap-2 text-amber-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Acesso liberado por 3 dias</span>
                </li>
              </ul>
            </div>

            <a
              href="https://wa.me/5554994197878?text=Ol%C3%A1%21+Gostaria+de+iniciar+meu+teste+gr%C3%A1tis+de+3+dias+no+Finan%C3%A7as+do+Servidor."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all text-center block cursor-pointer shadow-md shadow-blue-950/50"
            >
              Começar Teste de 3 Dias no WhatsApp
            </a>
          </div>

          {/* Plano 2: MENSAL (19,90 sem / 24,90 com dependente) */}
          <div className="rounded-3xl p-6 bg-gradient-to-b from-slate-900 via-blue-950/30 to-slate-950 border border-blue-900/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">Plano Mensal</h3>
              </div>

              {/* Price */}
              <div className="mb-5 pb-5 border-b border-slate-800">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                    R$ {mensalWithDependent ? '30,90' : '20,90'}
                  </span>
                  <span className="text-xs text-slate-400">/ mês</span>
                </div>
                <span className="text-[11px] text-slate-400">
                  {mensalWithDependent ? 'Titular + 1 Dependente incluso' : 'Acesso Individual do Titular'}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Registros normais e ilimitados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Registro por áudio, fotos e texto</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Dashboard financeiro completo</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Relatórios de despesas e receitas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{mensalWithDependent ? '1 Dependente incluso' : 'Sem dependente'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Cancele quando quiser</span>
                </li>
              </ul>
            </div>

            {!showMensalDependentModal ? (
              <button
                onClick={() => setShowMensalDependentModal(true)}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all text-center block cursor-pointer shadow-md"
              >
                Contrate Agora
              </button>
            ) : (
              <div className="space-y-3">
                {/* Dependent Toggle in Modal */}
                <div className="p-1.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-300 font-medium flex items-center gap-1.5 pl-1">
                    <Users className="w-3.5 h-3.5 text-amber-400" /> Dependente
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setMensalWithDependent(false)}
                      className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all ${
                        !mensalWithDependent
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Sem
                    </button>
                    <button
                      type="button"
                      onClick={() => setMensalWithDependent(true)}
                      className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all ${
                        mensalWithDependent
                          ? 'bg-amber-400 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Com (+R$10)
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowMensalDependentModal(false)}
                    className="flex-1 py-3 px-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all text-center block cursor-pointer shadow-md flex items-center justify-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar
                  </button>
                  <a
                    href={mensalWithDependent ? HOTMART_MENSAL_COM : HOTMART_MENSAL_SEM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-[2] py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-amber-500 hover:bg-amber-400 transition-all text-center block cursor-pointer shadow-md shadow-amber-500/30"
                  >
                    Confirmar {mensalWithDependent ? 'c/ Dependente' : 's/ Dependente'}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Plano 3: TRIMESTRAL (54,90 sem / 69,90 com dependente) */}
          <div className="rounded-3xl p-6 bg-gradient-to-b from-slate-900 via-blue-950/30 to-slate-950 border border-blue-900/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">Plano Trimestral</h3>
              </div>

              {/* Price */}
              <div className="mb-5 pb-5 border-b border-slate-800">
                <span className="text-[11px] text-slate-500 line-through block">
                  {trimestralWithDependent ? 'De R$ 92,70 (se comprasse mensal)' : 'De R$ 62,70 (se comprasse mensal)'}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                    R$ {trimestralWithDependent ? '65,90' : '55,90'}
                  </span>
                  <span className="text-xs text-slate-400">/ trimestre</span>
                </div>

              </div>

              {/* Features */}
              <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Registros normais e ilimitados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Registro por áudio, fotos e texto</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Dashboard financeiro completo</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Relatórios de despesas e receitas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{trimestralWithDependent ? '1 Dependente incluso' : 'Sem dependente'}</span>
                </li>
              </ul>
            </div>

            {!showTrimestralDependentModal ? (
              <button
                onClick={() => setShowTrimestralDependentModal(true)}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all text-center block cursor-pointer shadow-md shadow-blue-950/50"
              >
                Contrate Agora
              </button>
            ) : (
              <div className="space-y-3">
                {/* Dependent Toggle in Modal */}
                <div className="p-1.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-300 font-medium flex items-center gap-1.5 pl-1">
                    <Users className="w-3.5 h-3.5 text-amber-400" /> Dependente
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setTrimestralWithDependent(false)}
                      className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all ${
                        !trimestralWithDependent
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Sem
                    </button>
                    <button
                      type="button"
                      onClick={() => setTrimestralWithDependent(true)}
                      className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all ${
                        trimestralWithDependent
                          ? 'bg-amber-400 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Com (+R$10)
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowTrimestralDependentModal(false)}
                    className="flex-1 py-3 px-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all text-center block cursor-pointer shadow-md flex items-center justify-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar
                  </button>
                  <a
                    href={trimestralWithDependent ? HOTMART_TRIMESTRAL_COM : HOTMART_TRIMESTRAL_SEM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-[2] py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-amber-500 hover:bg-amber-400 transition-all text-center block cursor-pointer shadow-md shadow-amber-500/30"
                  >
                    Confirmar {trimestralWithDependent ? 'c/ Dependente' : 's/ Dependente'}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Plano 4: ANUAL VIP (R$ 224,90 - Com Dependente Incluso + Suporte Prioritário) */}
          <div className="relative rounded-3xl p-6 bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 border-2 border-amber-400 shadow-2xl shadow-amber-400/15 flex flex-col justify-between">
            
            {/* Top Featured Ribbon */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md whitespace-nowrap">
              <Star className="w-3 h-3 fill-slate-950" />
              <span>26% DE DESCONTO · MAIS VANTAJOSO</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3 mt-1">
                <h3 className="text-lg font-extrabold text-white">Plano Anual VIP</h3>
                <span className="text-[10px] font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-400/20 border border-amber-400/40">12 MESES</span>
              </div>

              {/* Dependent Badge Notification */}
              <div className="p-2 bg-amber-400/10 rounded-xl border border-amber-400/30 mb-4 flex items-center gap-2 text-[11px] text-amber-300 font-semibold">
                <UserCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Aba de Dependente já inclusa sem custo extra!</span>
              </div>

              {/* Price */}
              <div className="mb-5 pb-5 border-b border-slate-800">
                <span className="text-[11px] text-slate-500 line-through block">
                  De R$ 298,80 (se comprasse mensal com dependente)
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
                    R$ 219,90
                  </span>
                  <span className="text-xs text-slate-300">/ ano</span>
                </div>
                <div className="flex flex-col gap-0.5 mt-1">
                  <span className="text-[10px] text-emerald-400 font-bold">
                    Economia de R$ 78,90 (26% de desconto vs pagar mensal todo mês)
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2 text-xs text-slate-200 mb-6">
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Registros normais e ilimitados</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Registro por áudio, fotos e texto</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Dashboard financeiro completo</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Relatórios de despesas e receitas</span>
                </li>
                <li className="flex items-center gap-2 font-bold text-amber-300">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Dependente 100% incluso (casal no mesmo painel)</span>
                </li>
                <li className="flex items-center gap-2 font-bold text-amber-400 bg-amber-400/10 p-1.5 rounded-lg border border-amber-400/30">
                  <Zap className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span>Suporte VIP Prioritário no WhatsApp</span>
                </li>
              </ul>
            </div>

            <a
              href={HOTMART_ANUAL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-amber-400/25 text-center block cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Contrate Agora</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* 7-Day Unconditional Guarantee Box */}
        <div className="max-w-3xl mx-auto mt-12 sm:mt-16 p-4 sm:p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 border border-blue-900/50 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
            <ShieldCheck className="w-8 h-8 sm:w-9 sm:h-9" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-1">
              Garantia Incondicional de 7 Dias: Risco Zero
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Assine qualquer plano com tranquilidade. Se dentro de 7 dias você achar que o Finanças do Servidor não atendeu suas expectativas, basta solicitar pelo suporte ou pela Hotmart e seu dinheiro será reembolsado integralmente.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

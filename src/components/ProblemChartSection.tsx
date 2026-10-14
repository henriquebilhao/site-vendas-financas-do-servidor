import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ProblemChartSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'6m' | '12m'>('6m');

  return (
    <section id="comparativo" className="relative py-20 md:py-28 bg-black overflow-hidden border-t border-slate-900">
      
      {/* Subtle background ambient glow */}
      <div 
        className="pointer-events-none absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(14, 58, 140, 0.6) 0%, rgba(3, 7, 18, 0) 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Financial Comparison Chart (matching Dobra 2 layout) */}
          <div className="lg:col-span-6 bg-gradient-to-b from-slate-900/90 via-blue-950/40 to-slate-950 p-6 md:p-8 rounded-3xl border border-blue-900/30 shadow-2xl relative">
            
            {/* Chart Title Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
              <div>
                <span className="text-[11px] font-mono tracking-wider uppercase text-amber-400 font-semibold block mb-0.5">
                  Estudo com Servidores Públicos
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase">
                  Evolução do Contracheque Livre & Margem
                </h3>
              </div>

              {/* Timeframe switch */}
              <div className="flex items-center gap-1 p-1 bg-black/60 rounded-lg border border-slate-800 self-start sm:self-auto">
                <button
                  onClick={() => setActiveTab('6m')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    activeTab === '6m' 
                      ? 'bg-amber-400 text-slate-950 shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  6 Meses
                </button>
                <button
                  onClick={() => setActiveTab('12m')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    activeTab === '12m' 
                      ? 'bg-amber-400 text-slate-950 shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  12 Meses
                </button>
              </div>
            </div>

            {/* Chart Graphic Area with Y-axis numbers */}
            <div className="flex items-stretch gap-4 h-64 md:h-72 w-full pt-2">
              
              <div className="flex flex-col justify-between text-[11px] font-mono text-slate-500 select-none pb-4 text-right pr-2">
                <span>100</span>
                <span>80</span>
                <span>60</span>
                <span>40</span>
                <span>20</span>
                <span>0</span>
              </div>

              {/* SVG Curve Canvas */}
              <div className="flex-1 relative flex flex-col justify-between border-l border-b border-slate-800 pb-4">
                
                <div className="absolute inset-x-0 top-0 border-b border-slate-800/40" />
                <div className="absolute inset-x-0 top-1/4 border-b border-slate-800/40" />
                <div className="absolute inset-x-0 top-2/4 border-b border-slate-800/40" />
                <div className="absolute inset-x-0 top-3/4 border-b border-slate-800/40" />

                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="goldCurveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                    <linearGradient id="goldAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(245, 158, 11, 0.25)" />
                      <stop offset="100%" stopColor="rgba(14, 58, 140, 0.02)" />
                    </linearGradient>
                    <linearGradient id="redAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(239, 68, 68, 0.15)" />
                      <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
                    </linearGradient>
                  </defs>

                  <polygon
                    points="0,170 80,140 160,110 240,75 320,40 400,20 400,200 0,200"
                    fill="url(#goldAreaGradient)"
                  />

                  {/* Red Line: "SEM CONTROLE / BOLA DE NEVE CONSIGNADOS" */}
                  <path
                    d="M 0,140 Q 80,155 160,130 T 260,175 T 400,185"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="4 2"
                  />
                  <circle cx="160" cy="130" r="4.5" fill="#ef4444" />
                  <circle cx="260" cy="175" r="4.5" fill="#ef4444" />
                  <circle cx="400" cy="185" r="5" fill="#ef4444" />

                  {/* Gold/Navy Line: "COM FINANÇAS DO SERVIDOR" */}
                  <path
                    d="M 0,170 Q 80,140 160,110 T 260,65 T 400,20"
                    fill="none"
                    stroke="url(#goldCurveGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="80" cy="140" r="4.5" fill="#f59e0b" />
                  <circle cx="160" cy="110" r="4.5" fill="#fbbf24" />
                  <circle cx="260" cy="65" r="5" fill="#38bdf8" />
                  <circle cx="400" cy="20" r="6" fill="#fbbf24" className="animate-pulse" />
                </svg>

                <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-3">
                  <span>Mês 1</span>
                  <span>Mês 2</span>
                  <span>Mês 3</span>
                  <span>Mês 4</span>
                  <span>Mês 5</span>
                  <span>Mês 6</span>
                </div>
              </div>

            </div>

            {/* Legend bar */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
                <span className="text-slate-300 uppercase tracking-wider text-[11px]">Sem Controle (Juros & Consignados)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
                <span className="text-amber-400 uppercase tracking-wider text-[11px]">Com Finanças do Servidor</span>
              </div>
            </div>

            {/* Quick callout inside chart box */}
            <div className="mt-4 p-3 rounded-xl bg-blue-950/40 border border-blue-900/50 flex items-center justify-between text-xs">
              <span className="text-slate-300">Recuperação de margem e sobra em 90 dias:</span>
              <span className="text-amber-400 font-bold font-mono">+R$ 1.150/mês liberados</span>
            </div>

          </div>

          {/* Right Column: Compelling Sales Copy for Public Servants */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase leading-tight mb-6">
              Mais de <span className="text-amber-400">65% dos servidores públicos</span> brasileiros vivem no limite do contracheque por falta de visibilidade diária.
            </h2>

            <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
              <p>
                A estabilidade do serviço público é uma bênção, mas esconde uma armadilha silenciosa: bancos e financeiras assediam servidores diariamente com ofertas fáceis de crédito consignado, antecipações de 13º e cartões com desconto em folha.
              </p>

              <div className="pl-4 border-l-2 border-amber-400/50 space-y-2 py-1 text-slate-300">
                <p className="font-semibold text-white">Por que tantos servidores passam aperto todo mês?</p>
                <p className="text-xs md:text-sm text-slate-400">
                  <strong className="text-slate-200">1. A ilusão do salário certo:</strong> Sem anotar os pequenos gastos do dia a dia, o salário parece maior do que realmente sobra após os descontos obrigatórios (previdência, imposto de renda e consignações).
                </p>
                <p className="text-xs md:text-sm text-slate-400">
                  <strong className="text-slate-200">2. A rotina exaustiva no órgão:</strong> Entre processos, audiências, plantões ou aulas, ninguém tem ânimo para abrir planilha de Excel à noite.
                </p>
                <p className="text-xs md:text-sm text-slate-400">
                  <strong className="text-slate-200">3. Medo de expor dados do SouGov ou banco:</strong> Softwares convencionais pedem acessos bancários complexos que deixam qualquer servidor receoso.
                </p>
              </div>

              <p className="text-slate-300">
                O <strong className="text-white">Finanças do Servidor</strong> foi criado para quebrar esse ciclo: você manda uma mensagem rápida no WhatsApp toda vez que gasta, e o assistente calcula sua sobra real, protege sua margem e mantém seu patrimônio seguro.
              </p>

              <p className="text-amber-400/90 font-medium italic text-xs md:text-sm">
                "Você gasta em 3 segundos, manda um áudio de 2 segundos no WhatsApp e seu contracheque fica blindado."
              </p>
            </div>

            {/* CTA or kicker */}
            <div className="mt-8 pt-6 border-t border-slate-900 flex items-center gap-4">
              <a
                href="#como-funciona"
                className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider group"
              >
                <span>Veja exatamente como o sistema funciona</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

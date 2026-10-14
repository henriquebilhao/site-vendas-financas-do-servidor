import React from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  ShieldAlert, 
  MessageCircle, 
  Mic, 
  Volume2, 
  Check, 
  Receipt,
  PieChart,
  CalendarCheck
} from 'lucide-react';
import { LogoFS } from './LogoFS';

interface StrategicDeepDiveSectionProps {
  onOpenCheckout: () => void;
}

export const StrategicDeepDiveSection: React.FC<StrategicDeepDiveSectionProps> = ({ onOpenCheckout }) => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;

  return (
    <section className="relative py-20 md:py-28 bg-black overflow-hidden border-t border-slate-900">
      
      {/* Background ambient lighting */}
      <div 
        className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(14, 60, 160, 0.6) 0%, rgba(245, 158, 11, 0.15) 50%, rgba(3, 7, 18, 0) 80%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Strategic sales copy & benefit chips (matching Dobra 4 layout) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-[1.15] mb-6">
              Controlar seu dinheiro pelo WhatsApp é a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
                Maneira Mais Eficiente
              </span>{' '}
              para o servidor prosperar.
            </h2>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
              São mais de <span className="text-white font-semibold">11 milhões de servidores</span> no Brasil que lidam com a correria diária e precisam de uma ferramenta simples para saber exatamente onde cada real foi parar.
            </p>

            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              O <strong className="text-amber-400">Finanças do Servidor</strong> foi construído sob medida para a sua rotina: você não precisa alterar seus hábitos diários nem aprender ferramentas contábeis complexas — o assistente funciona dentro do WhatsApp que você já usa todos os dias.
            </p>

            <p className="text-xs uppercase font-mono tracking-wider font-bold text-amber-400 mb-4">
              Ele vai direto ao ponto:
            </p>

            {/* Checklist Pills */}
            <div className="space-y-3 mb-8">
              
              <div className="inline-flex w-full sm:w-auto items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-blue-900/40 text-xs sm:text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-blue-900/60 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-amber-400" />
                </div>
                <span>Registro instantâneo por áudio ou foto de notas fiscais no WhatsApp</span>
              </div>

              <div className="inline-flex w-full sm:w-auto items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-blue-900/40 text-xs sm:text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-blue-900/60 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-amber-400" />
                </div>
                <span>Separação automática e clara entre despesas e receitas</span>
              </div>

              <div className="inline-flex w-full sm:w-auto items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-blue-900/40 text-xs sm:text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-blue-900/60 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-amber-400" />
                </div>
                <span>Planejamento inteligente para 13º salário, férias e metas familiares</span>
              </div>

              <div className="inline-flex w-full sm:w-auto items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-blue-900/40 text-xs sm:text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-blue-900/60 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-amber-400" />
                </div>
                <span>Dashboard integrado na nuvem sem precisar de senhas bancárias</span>
              </div>

              <div className="inline-flex w-full sm:w-auto items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-blue-900/40 text-xs sm:text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-blue-900/60 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-amber-400" />
                </div>
                <span>Como transformar a estabilidade do cargo público em segurança financeira</span>
              </div>

            </div>

            {/* CTA Button -> Scrolls to Pricing Section (#planos) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#planos"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-wider uppercase text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-400/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
              >
                <span>Garantir Meu Acesso Com Desconto</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>

          </div>

          {/* Right Column: Second Smartphone Mockup */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Phone Container */}
            <div className="relative w-full max-w-[340px] rounded-[44px] p-3.5 bg-gradient-to-b from-slate-800 via-blue-950/70 to-slate-900 border-2 border-slate-700/60 shadow-2xl shadow-blue-950/80">
              
              <div className="relative rounded-[36px] bg-slate-950 overflow-hidden border border-slate-800/80 p-4 pb-5 min-h-[550px] flex flex-col justify-between">
                
                {/* Phone Top Bar */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-2">
                  <span className="font-semibold text-white">{currentTime}</span>
                  <div className="w-16 h-3.5 bg-slate-900 rounded-full border border-slate-800" />
                  <span className="text-[11px] text-amber-400 font-mono">100%</span>
                </div>

                {/* WhatsApp Chat Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-900">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 via-slate-950 to-blue-950 p-1 border border-amber-400/40 flex items-center justify-center shadow-md">
                    <LogoFS size={28} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-white">Finanças do Servidor</h4>
                    <p className="text-[10px] text-emerald-400">● Online agora</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-900 text-slate-400">
                    <PieChart className="w-4 h-4 text-amber-400" />
                  </div>
                </div>

                {/* Chat Flow Inside Second Phone */}
                <div className="space-y-3 py-3 my-auto">
                  
                  {/* Floating Notification Top */}
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/70 to-slate-900 border border-emerald-500/30 text-[11px] text-emerald-300 shadow">
                    <div className="flex items-center justify-between font-semibold">
                      <span>✓ Receita Confirmada</span>
                      <span className="text-[10px] text-slate-400">{currentTime}</span>
                    </div>
                    <p className="text-xs text-white font-mono mt-0.5">
                      Vencimentos mensais: +R$ 8.950,00
                    </p>
                  </div>

                  {/* Outgoing Audio Message */}
                  <div className="flex flex-col items-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-xs p-3 bg-blue-900/60 border border-blue-700/40 text-slate-100 shadow-md">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-slate-950">
                          <Volume2 className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex items-center gap-0.5 h-4">
                          <span className="w-1 h-3 bg-amber-400 rounded-full" />
                          <span className="w-1 h-5 bg-amber-400 rounded-full" />
                          <span className="w-1 h-2 bg-amber-400 rounded-full" />
                          <span className="w-1 h-4 bg-amber-400 rounded-full" />
                          <span className="w-1 h-6 bg-amber-400 rounded-full" />
                          <span className="w-1 h-3 bg-amber-400 rounded-full" />
                          <span className="w-1 h-2 bg-amber-400 rounded-full" />
                        </div>
                        <span className="text-[10px] text-slate-300 font-mono ml-1">0:04</span>
                      </div>
                      <p className="text-[11px] text-slate-300 italic">
                        "Paguei 120 reais no mercado agora saindo do órgão"
                      </p>
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 mr-1">{currentTime} · Entregue</span>
                  </div>

                  {/* Incoming Response Card */}
                  <div className="flex flex-col items-start">
                    <div className="max-w-[90%] rounded-2xl rounded-tl-xs p-3 bg-slate-900/90 border border-amber-400/30 text-slate-100 shadow-lg">
                      <p className="text-[11px] font-bold text-amber-400 mb-1 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-400" /> Lançamento Confirmado!
                      </p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>Categoria:</span>
                          <strong className="text-white">Alimentação / Mercado</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Valor:</span>
                          <strong className="text-amber-400 font-mono">-R$ 120,00</strong>
                        </div>
                        <div className="flex justify-between text-slate-400 text-[10px] pt-1 border-t border-slate-800">
                          <span>Saldo restante do mês:</span>
                          <span className="font-mono text-emerald-400 font-semibold">R$ 4.230,00</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 ml-1">{currentTime} · Finanças do Servidor</span>
                  </div>

                </div>

                {/* Bottom WhatsApp bar */}
                <div className="pt-2 border-t border-slate-900 flex items-center gap-2">
                  <div className="flex-1 bg-slate-900 rounded-full px-3 py-1.5 text-[10px] text-slate-400 border border-slate-800">
                    Mande despesa ou áudio...
                  </div>
                  <div className="w-7 h-7 rounded-full bg-blue-900 border border-amber-400/40 flex items-center justify-center text-amber-400">
                    <Mic className="w-3.5 h-3.5" />
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

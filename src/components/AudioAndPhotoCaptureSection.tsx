import React from 'react';
import { 
  Mic, 
  Camera, 
  CheckCircle2, 
  ArrowRight, 
  Volume2, 
  Check, 
  Receipt,
  Play
} from 'lucide-react';
import { LogoFS } from './LogoFS';

export const AudioAndPhotoCaptureSection: React.FC = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;

  return (
    <section id="recursos" className="relative py-20 md:py-28 bg-black overflow-hidden border-t border-slate-900">
      
      {/* Background ambient lighting */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[170px] opacity-20 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(14, 60, 160, 0.5) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 80%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400 mb-2 block">
            Praticidade Absoluta Sem Digitação
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight mb-4">
            Registre por Áudio ou Foto da Nota Fiscal
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Você não precisa digitar valores, abrir planilhas ou lembrar de nada no fim do dia. O Finanças do Servidor processa voz e imagem com inteligência artificial instantânea.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          
          {/* Left Column: Audio Recording Smartphone Mockup */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-900/90 via-blue-950/30 to-slate-950 border border-blue-900/40 shadow-2xl flex flex-col justify-between group hover:border-amber-400/40 transition-all duration-300">
            
            {/* Phone Mockup Screen */}
            <div className="mx-auto w-full max-w-[340px] rounded-[38px] p-3 bg-gradient-to-b from-slate-800 via-blue-950/80 to-slate-900 border-2 border-slate-700/60 shadow-2xl shadow-blue-950/60 mb-6">
              <div className="rounded-[30px] bg-slate-950 border border-slate-800/80 p-3.5 min-h-[460px] flex flex-col justify-between overflow-hidden">
                
                {/* Phone Status Bar */}
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-900">
                  <span className="font-semibold text-white tracking-wider">{currentTime}</span>
                  <div className="w-14 h-3 bg-slate-900 rounded-full border border-slate-800" />
                  <span className="text-[10px] text-amber-400 font-mono">5G 100%</span>
                </div>

                {/* WhatsApp Chat Bar */}
                <div className="flex items-center gap-2.5 py-2.5 border-b border-slate-900">
                  <div className="w-8 h-8 rounded-lg bg-blue-950 p-0.5 border border-amber-400/40 flex items-center justify-center shrink-0">
                    <LogoFS size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">Finanças do Servidor</h4>
                    <p className="text-[10px] text-emerald-400 leading-none">● Online agora</p>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-blue-900/50 text-[10px] text-amber-300 font-mono">
                    Áudio IA
                  </div>
                </div>

                {/* Messages Feed */}
                <div className="space-y-3 py-3 my-auto">
                  
                  {/* Outgoing Audio Message */}
                  <div className="flex flex-col items-end">
                    <div className="max-w-[90%] rounded-2xl rounded-tr-xs p-3 bg-emerald-950/70 border border-emerald-600/40 text-slate-100 shadow-md">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 shrink-0">
                          <Play className="w-3.5 h-3.5 fill-slate-950 ml-0.5" />
                        </div>
                        {/* Audio Waveform */}
                        <div className="flex items-center gap-1 h-5 flex-1 px-1">
                          <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse" />
                          <span className="w-1 h-4 bg-emerald-400 rounded-full" />
                          <span className="w-1 h-5 bg-emerald-300 rounded-full" />
                          <span className="w-1 h-3 bg-emerald-400 rounded-full" />
                          <span className="w-1 h-5 bg-emerald-400 rounded-full" />
                          <span className="w-1 h-4 bg-emerald-300 rounded-full" />
                          <span className="w-1 h-2 bg-emerald-400 rounded-full" />
                          <span className="w-1 h-4 bg-emerald-400 rounded-full" />
                          <span className="w-1 h-3 bg-emerald-400 rounded-full" />
                        </div>
                        <span className="text-[10px] text-emerald-300 font-mono">0:05</span>
                      </div>
                      <p className="text-[11px] text-slate-200 italic bg-black/30 px-2 py-1 rounded-md">
                        🎙️ "Paguei 42 reais no almoço agora"
                      </p>
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 mr-1">{currentTime} · Entregue</span>
                  </div>

                  {/* Incoming Response Message */}
                  <div className="flex flex-col items-start">
                    <div className="max-w-[92%] rounded-2xl rounded-tl-xs p-3 bg-slate-900/95 border border-amber-400/30 text-slate-100 shadow-lg">
                      <p className="text-[11px] font-bold text-amber-400 mb-1.5 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Despesa Registrada!
                      </p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>Categoria:</span>
                          <strong className="text-white">Alimentação</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Valor:</span>
                          <strong className="text-amber-400 font-mono font-bold">-R$ 42,00</strong>
                        </div>
                        <div className="flex justify-between text-slate-400 text-[10px] pt-1 border-t border-slate-800">
                          <span>Método:</span>
                          <span className="text-slate-300">Áudio do WhatsApp</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 ml-1">{currentTime} · Finanças do Servidor</span>
                  </div>

                </div>

                {/* Bottom WhatsApp Audio Bar */}
                <div className="pt-2 border-t border-slate-900 flex items-center gap-2">
                  <div className="flex-1 bg-slate-900 rounded-full px-3 py-1.5 text-[10px] text-slate-400 border border-slate-800 flex items-center justify-between">
                    <span>Mande um áudio...</span>
                    <span className="text-amber-400 font-mono text-[9px]">Gravando</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-slate-950">
                    <Mic className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            </div>

            {/* Explanation Below Left Image */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Recurso 01 · Áudio Inteligente
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                É só mandar um áudio que já fica tudo registrado
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Você não precisa parar o que está fazendo nem digitar uma linha sequer. Na correria do dia a dia, saindo do órgão ou no trânsito, basta apertar o microfone do WhatsApp e falar naturalmente: <span className="text-amber-300 font-semibold">"Gastei 42 reais no almoço"</span> ou <span className="text-emerald-400 font-semibold">"Recebi 500 do freela"</span>. A inteligência artificial transcreve com precisão, identifica se é despesa ou receita e classifica na categoria certa.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Reconhece gírias e sotaques
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Transcrição instantânea
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Photo of Receipt / Nota Fiscal Smartphone Mockup */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-900/90 via-blue-950/30 to-slate-950 border border-blue-900/40 shadow-2xl flex flex-col justify-between group hover:border-amber-400/40 transition-all duration-300">
            
            {/* Phone Mockup Screen */}
            <div className="mx-auto w-full max-w-[340px] rounded-[38px] p-3 bg-gradient-to-b from-slate-800 via-blue-950/80 to-slate-900 border-2 border-slate-700/60 shadow-2xl shadow-blue-950/60 mb-6">
              <div className="rounded-[30px] bg-slate-950 border border-slate-800/80 p-3.5 min-h-[460px] flex flex-col justify-between overflow-hidden">
                
                {/* Phone Status Bar */}
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-900">
                  <span className="font-semibold text-white tracking-wider">{currentTime}</span>
                  <div className="w-14 h-3 bg-slate-900 rounded-full border border-slate-800" />
                  <span className="text-[10px] text-amber-400 font-mono">5G 100%</span>
                </div>

                {/* WhatsApp Chat Bar */}
                <div className="flex items-center gap-2.5 py-2.5 border-b border-slate-900">
                  <div className="w-8 h-8 rounded-lg bg-blue-950 p-0.5 border border-amber-400/40 flex items-center justify-center shrink-0">
                    <LogoFS size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">Finanças do Servidor</h4>
                    <p className="text-[10px] text-emerald-400 leading-none">● Online agora</p>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-blue-900/50 text-[10px] text-blue-300 font-mono">
                    Foto OCR
                  </div>
                </div>

                {/* Messages Feed */}
                <div className="space-y-3 py-3 my-auto">
                  
                  {/* Outgoing Receipt Image Message */}
                  <div className="flex flex-col items-end">
                    <div className="max-w-[90%] rounded-2xl rounded-tr-xs p-2.5 bg-blue-950/80 border border-blue-600/40 text-slate-100 shadow-md">
                      
                      {/* Realistic Brazilian Fiscal Receipt Graphic */}
                      <div className="rounded-xl bg-slate-900 p-2.5 border border-slate-800 font-mono text-[9px] text-slate-300 space-y-1">
                        <div className="flex items-center justify-between text-white font-bold border-b border-slate-800 pb-1">
                          <span className="flex items-center gap-1">
                            <Receipt className="w-3 h-3 text-amber-400" /> CUPOM FISCAL
                          </span>
                          <span className="text-amber-400">NFC-e</span>
                        </div>
                        <p className="text-slate-400">MERCADO CENTRAL LTDA</p>
                        <div className="space-y-0.5 pt-1 text-[8.5px]">
                          <div className="flex justify-between">
                            <span>1x CAFÉ TORRADO 500G</span>
                            <span className="text-white">R$ 16,90</span>
                          </div>
                          <div className="flex justify-between">
                            <span>1x PÃO INTEGRAL 450G</span>
                            <span className="text-white">R$ 8,50</span>
                          </div>
                          <div className="flex justify-between">
                            <span>1x LEITE INTEGRAL 1L</span>
                            <span className="text-white">R$ 5,90</span>
                          </div>
                        </div>
                        <div className="flex justify-between font-bold text-[10px] text-amber-400 pt-1 border-t border-slate-800">
                          <span>TOTAL DA NOTA:</span>
                          <span>R$ 31,30</span>
                        </div>
                      </div>

                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 mr-1">{currentTime} · Entregue</span>
                  </div>

                  {/* Incoming Response Message */}
                  <div className="flex flex-col items-start">
                    <div className="max-w-[92%] rounded-2xl rounded-tl-xs p-3 bg-slate-900/95 border border-amber-400/30 text-slate-100 shadow-lg">
                      <p className="text-[11px] font-bold text-amber-400 mb-1.5 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Nota Fiscal Reconhecida!
                      </p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>Estabelecimento:</span>
                          <strong className="text-white">Mercado Central</strong>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Itens:</span>
                          <span className="text-slate-300">3 produtos lidos</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Total da Nota:</span>
                          <strong className="text-amber-400 font-mono font-bold">-R$ 31,30</strong>
                        </div>
                        <div className="flex justify-between text-slate-400 text-[10px] pt-1 border-t border-slate-800">
                          <span>Categoria:</span>
                          <span className="text-slate-300">Supermercado</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 ml-1">{currentTime} · Finanças do Servidor</span>
                  </div>

                </div>

                {/* Bottom WhatsApp Camera Bar */}
                <div className="pt-2 border-t border-slate-900 flex items-center gap-2">
                  <div className="flex-1 bg-slate-900 rounded-full px-3 py-1.5 text-[10px] text-slate-400 border border-slate-800 flex items-center justify-between">
                    <span>Tire foto da nota...</span>
                    <span className="text-blue-400 font-mono text-[9px]">Câmera</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <Camera className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            </div>

            {/* Explanation Below Right Image */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Recurso 02 · Foto & Comprovante
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Também registra por foto de nota fiscal e comprovantes
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Comprou no supermercado, farmácia ou posto de gasolina? Basta apontar a câmera do celular e mandar a foto do cupom fiscal, nota NFC-e ou print do comprovante PIX no WhatsApp. O assistente lê automaticamente o valor total, identifica o estabelecimento e categoriza a despesa sem você precisar digitar absolutamente nada.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Lê cupons de supermercado
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Comprovantes PIX e recibos
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom CTA to Pricing (#planos) */}
        <div className="mt-12 text-center">
          <a
            href="#planos"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <span>Ver Planos & Valores</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};

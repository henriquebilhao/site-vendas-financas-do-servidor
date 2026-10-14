import React from 'react';
import { Star, Quote, CheckCircle, TrendingUp, DollarSign } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Marcelo Alcântara',
      role: 'Analista Judiciário (TRF) · Brasília, DF',
      saved: 'Quitou 2 consignados e liberou R$ 1.480/mês',
      content: 'Eu tinha 3 consignados e achava que meu contracheque estava condenado. Com o Finanças do Servidor pelo WhatsApp, passei a registrar tudo na hora em que saía do tribunal. Em 5 meses renegociei, quitei o primeiro consignado e finalmente voltei a investir.',
      highlight: 'Margem consignável recuperada'
    },
    {
      name: 'Dra. Patrícia Meirelles',
      role: 'Perita Criminal (Polícia Civil) · Belo Horizonte, MG',
      saved: 'Economizou R$ 2.150 no 1º trimestre',
      content: 'Minha rotina com plantões não me deixa sentar na frente de um Excel. O assistente é impecável: mando áudio correndo entre uma perícia e outra, ele classifica na hora e me avisa quanto posso gastar no mês sem comprometer o terço de férias.',
      highlight: 'Praticidade total no plantão'
    },
    {
      name: 'Prof. Marcos Vinícius',
      role: 'Professor da Rede Estadual · São Paulo, SP',
      saved: 'Cortou R$ 780 de taxas e juros ocultos',
      content: 'Nós da educação precisamos valorizar cada centavo. O assistente me alertou sobre taxas bancárias da conta salário e gastos que pareciam bobos. Pela primeira vez em 10 anos de concurso, montei minha reserva de emergência.',
      highlight: 'Paz financeira conquistada'
    }
  ];

  return (
    <section className="relative py-20 md:py-28 bg-black overflow-hidden border-t border-slate-900">
      
      {/* Background radial glow */}
      <div 
        className="pointer-events-none absolute bottom-0 right-1/3 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(14, 60, 160, 0.5) 0%, rgba(245, 158, 11, 0.15) 60%, transparent 80%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400 mb-2 block">
            Servidores Que Protegeram Seu Contracheque
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight mb-4">
            Depoimentos de Colegas Servidores
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Veja como servidores de diferentes carreiras e esferas recuperaram a margem consignável e a paz financeira com o Finanças do Servidor.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl p-7 bg-gradient-to-b from-slate-900/90 via-blue-950/30 to-slate-950 border border-blue-900/40 hover:border-amber-400/50 shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stars and verified badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Servidor Verificado
                  </span>
                </div>

                {/* Savings Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/25 mb-4">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{item.saved}</span>
                </div>

                {/* Quote Text */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{item.content}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-[11px] text-slate-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Impact Banner for Servidores */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-blue-950/80 border border-blue-800/50 flex flex-col sm:flex-row items-center justify-around gap-6 text-center sm:text-left">
          <div>
            <p className="text-2xl sm:text-3xl font-black text-white font-mono">+8.400</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider">Servidores Públicos Ativos</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-800" />
          <div>
            <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">+R$ 14 Milhões</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider">Em Consignados & Dívidas Reduzidas</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-800" />
          <div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">99,1%</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider">Satisfação Entre os Servidores</p>
          </div>
        </div>

      </div>
    </section>
  );
};

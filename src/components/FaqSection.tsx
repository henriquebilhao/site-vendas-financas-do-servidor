import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Preciso fornecer senhas do SouGov, Siape, Portal do Servidor ou banco?',
      answer: 'De jeito nenhum! Essa é uma das nossas maiores prioridades de segurança. Você NUNCA precisará fornecer senhas do SouGov, Portal do Servidor, Siape, nem senhas de bancos ou consignatárias. O assistente funciona exclusivamente com base nas mensagens de texto, comprovantes ou áudios que você enviar voluntariamente no WhatsApp.'
    },
    {
      question: 'O assistente funciona para qualquer carreira ou perfil?',
      answer: 'Sim! O Finanças do Servidor atende com perfeição qualquer perfil — seja de órgãos públicos, autarquias, saúde, educação, judiciário ou iniciativa privada.'
    },
    {
      question: 'O assistente realmente entende áudios gravados na correria ou no plantão?',
      answer: 'Sim! Nosso motor de inteligência artificial conta com tecnologia de ponta em reconhecimento de voz. Você pode mandar áudios rápidos enquanto dirige ou sai do órgão, como: "Paguei 45 no almoço e 18 no estacionamento". O assistente transcreve, separa as duas transações e categoriza cada uma na hora.'
    },
    {
      question: 'Ele compreende particularidades como 13º, terço de férias e gratificações?',
      answer: 'Com certeza! O sistema já vem preparado com o calendário e as particularidades da remuneração pública (adiantamento de 13º salário, terço constitucional de férias, gratificações por encargo e diárias).'
    },
    {
      question: 'Como funciona a garantia incondicional de 7 dias?',
      answer: 'O risco é 100% nosso. Após a compra, você tem 7 dias inteiros para testar o assistente no seu WhatsApp. Se não se adaptar ou achar que não valeu a pena para o seu bolso, basta nos enviar uma única mensagem e devolvemos cada centavo pago.'
    }
  ];

  return (
    <section id="faq" className="relative py-20 md:py-28 bg-black overflow-hidden border-t border-slate-900">
      
      {/* Background radial glow */}
      <div 
        className="pointer-events-none absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(14, 60, 160, 0.45) 0%, rgba(245, 158, 11, 0.1) 60%, transparent 80%)'
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400 mb-2 block">
            Tire Suas Dúvidas
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Tudo o que você precisa saber sobre o assistente financeiro no WhatsApp e a segurança dos seus dados.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-gradient-to-r from-slate-900/90 via-blue-950/20 to-slate-950 border border-blue-900/40 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-amber-400 text-slate-950 border-amber-400' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

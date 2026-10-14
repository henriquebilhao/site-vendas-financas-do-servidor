import React from 'react';
import { ShieldCheck, Lock, Heart } from 'lucide-react';
import { LogoFS } from './LogoFS';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-slate-900 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 via-slate-950 to-blue-950 p-1 border border-amber-400/30 flex items-center justify-center">
                <LogoFS size={30} />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Finanças do Servidor
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              O assistente financeiro inteligente integrado ao WhatsApp e sincronizado com dashboard em tempo real para organizar seus gastos e receitas.
            </p>

            <div className="flex items-center gap-3 text-slate-400 text-xs pt-1">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-amber-400" /> Criptografia Ponta a Ponta
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Servidores Seguros
              </span>
            </div>
          </div>

          {/* Quick links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Navegação</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#como-funciona" className="hover:text-amber-400 transition-colors">Como Funciona</a></li>
              <li><a href="#recursos" className="hover:text-amber-400 transition-colors">Áudio & Fotos</a></li>
              <li><a href="#simulador" className="hover:text-amber-400 transition-colors">Simulador ao Vivo</a></li>
              <li><a href="#planos" className="hover:text-amber-400 transition-colors">Planos & Preços</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">Perguntas Frequentes</a></li>
            </ul>
          </div>

          {/* Security & Disclaimer (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Segurança & Legal</h4>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Este produto não possui vínculo comercial direto com a Meta / WhatsApp Inc. Utilizamos as APIs oficiais para prover a melhor experiência de mensageria para os nossos assinantes.
            </p>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Seus dados financeiros não são comercializados nem compartilhados com terceiros.
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Finanças do Servidor. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Termos de Uso</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Políticas de Privacidade</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Suporte ao Cliente</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

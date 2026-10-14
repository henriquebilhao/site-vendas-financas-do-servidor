import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Menu, 
  X, 
  Smartphone,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { LogoFS } from './LogoFS';

interface NavbarProps {
  onOpenCheckout: (planName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCheckout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-slate-900/90 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Brand Zone: 1 clean text/brand element with LogoFS */}
        <a href="#" className="flex items-center gap-3 group whitespace-nowrap shrink-0">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-900 via-slate-950 to-blue-950 p-1 border border-amber-400/30 flex items-center justify-center shadow-lg shadow-blue-950/80 group-hover:border-amber-400/60 transition-colors">
            <LogoFS size={34} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white flex items-center">
              Finanças do Servidor
            </span>
          </div>
        </a>

        {/* Navigation Links Zone */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#como-funciona" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Como Funciona
          </a>
          <a href="#recursos" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Áudio & Fotos
          </a>
          <a href="#simulador" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Simulador
          </a>
          <a href="#planos" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Planos
          </a>
          <a href="#faq" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Dúvidas
          </a>
        </nav>

        {/* Primary Action CTA Zone -> Scroll to Pricing (#planos) */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <a
            href="#planos"
            className="group relative inline-flex items-center justify-center px-6 py-2.5 text-xs uppercase tracking-wider font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-lg shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="flex items-center gap-2">
              Ver Planos & Valores
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-900 bg-slate-950/95 px-6 py-6 space-y-4">
          <a 
            href="#como-funciona" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-amber-400"
          >
            Como Funciona
          </a>
          <a 
            href="#recursos" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-amber-400"
          >
            Áudio & Fotos de Notas
          </a>
          <a 
            href="#simulador" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-amber-400"
          >
            Simulador Interativo
          </a>
          <a 
            href="#planos" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-amber-400"
          >
            Ver Planos & Valores
          </a>
          <a 
            href="#faq" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-amber-400"
          >
            Perguntas Frequentes
          </a>
          <div className="pt-2">
            <a
              href="#planos"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 text-center text-xs uppercase tracking-wider font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg shadow-md"
            >
              Ver Planos & Valores
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

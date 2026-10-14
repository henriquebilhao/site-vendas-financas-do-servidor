import React from 'react';
import { 
  PieChart, 
  Smartphone, 
  Download, 
  Bell, 
  ArrowRight, 
  TrendingUp, 
  FileSpreadsheet, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { LogoFS } from './LogoFS';
import dashboardImg from '../assets/images/dashboard_platform_preview_1791999974929.jpg';

export const DashboardShowcaseSection: React.FC = () => {
  return (
    <section id="dashboard" className="relative py-20 md:py-28 bg-black overflow-hidden border-t border-slate-900">
      
      {/* Background ambient lighting */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 w-[750px] h-[750px] rounded-full blur-[190px] opacity-20 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(14, 60, 160, 0.6) 0%, rgba(245, 158, 11, 0.15) 60%, transparent 80%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400 mb-2 block">
            A Inteligência Visual Que Suas Finanças Merecem
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight mb-4">
            O Dashboard Oficial da Plataforma
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Esqueça fórmulas complexas no Excel. Veja como é a interface real da plataforma do Finanças do Servidor: gráficos claros de saldo, receitas, despesas e transações categorizadas automaticamente.
          </p>
        </div>

        {/* Dashboard Frame Container with Platform Screenshot */}
        <div className="relative mx-auto rounded-3xl p-2.5 sm:p-5 bg-gradient-to-b from-slate-800 via-blue-950/50 to-slate-900 border border-blue-900/50 shadow-2xl shadow-blue-950/80 mb-16 max-w-6xl">
          
          {/* Top Browser / Window Frame */}
          <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-800/80 px-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">app.financasdoservidor.com.br/dashboard</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-400 font-mono text-[11px]">
                ● Painel Oficial Web
              </span>
            </div>
          </div>

          {/* Platform Dashboard Image */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-2xl">
            <img
              src={dashboardImg}
              alt="Dashboard da Plataforma Finanças do Servidor"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>

          {/* Floating Live Sync Banner */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 px-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-medium">Dashboard em tempo real integrado a mensagens e áudios</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
              <span>✓ Saldo Total</span>
              <span>✓ Receitas vs Despesas</span>
              <span>✓ Gráfico por Categoria</span>
            </div>
          </div>

        </div>

        {/* 3 Pillars of Dashboard Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
          
          <div className="p-6 rounded-2xl bg-slate-950/70 border border-blue-900/30">
            <div className="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-800/60 flex items-center justify-center text-amber-400 mb-4">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Acesse do Celular ou PC</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Consulte pelo navegador em qualquer dispositivo sem precisar instalar aplicativos pesados. Seus dados estão sempre atualizados na nuvem.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/70 border border-blue-900/30">
            <div className="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-800/60 flex items-center justify-center text-amber-400 mb-4">
              <PieChart className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Classificação Automática</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Alimentação, transporte, moradia, lazer e investimentos são distribuídos em gráficos claros para você saber onde cortar excessos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/70 border border-blue-900/30">
            <div className="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-800/60 flex items-center justify-center text-amber-400 mb-4">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Exportação com 1 Clique</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Baixe relatórios completos em Excel ou PDF quando precisar declarar imposto de renda ou arquivar comprovantes.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

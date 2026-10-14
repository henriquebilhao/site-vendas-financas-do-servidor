import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  RotateCcw,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle,
  MinusCircle
} from 'lucide-react';
import { LogoFS } from './LogoFS';

interface Transaction {
  id: string;
  description: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  time: string;
}

const initialTransactions: Transaction[] = [
  { id: '1', description: 'Salário Mensal', type: 'income', category: 'Remuneração', amount: 8500, time: 'Dia 01' },
  { id: '2', description: 'Supermercado da Família', type: 'expense', category: 'Alimentação', amount: 520, time: 'Ontem' },
  { id: '3', description: 'Combustível do Carro', type: 'expense', category: 'Transporte', amount: 160, time: 'Hoje cedo' },
  { id: '4', description: 'Projeto / Consultoria Extra', type: 'income', category: 'Renda Extra', amount: 1200, time: 'Hoje, 10:15' },
];

export const InteractiveSimulatorSection: React.FC = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;

  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [activeMode, setActiveMode] = useState<'expense' | 'income'>('expense');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string; type?: 'income' | 'expense' }>>([
    { 
      sender: 'bot', 
      text: '👋 Olá! Sou o Finanças do Servidor. Escolha abaixo entre Registrar Despesa ou Receita e clique em um exemplo para ver o assistente registrar e seu dashboard atualizar ao vivo!', 
      time: currentTime 
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const expenseSamples = [
    { label: '🍕 Almoço R$ 42', text: 'Gastei 42 reais no almoço com a equipe' },
    { label: '🚗 Combustível R$ 150', text: 'Abasteci 150 reais de gasolina' },
    { label: '💡 Conta de Luz R$ 160', text: 'Paguei a conta de energia 160 reais' },
    { label: '💊 Farmácia R$ 85', text: 'Comprei remédios na farmácia 85 reais' },
    { label: '🛒 Supermercado R$ 320', text: 'Compras de mercado 320 reais' },
  ];

  const incomeSamples = [
    { label: '💰 Salário Mensal R$ 8.500', text: 'Recebi meu salário de 8500 reais' },
    { label: '💼 Renda Extra R$ 1.200', text: 'Recebi 1200 de um trabalho extra' },
    { label: '📈 Rendimentos R$ 380', text: 'Entrou 380 reais de rendimentos' },
    { label: '🎁 Restituição R$ 650', text: 'Recebi restituição de 650 reais' },
  ];

  const handleProcessMessage = (rawText: string, forcedType?: 'income' | 'expense') => {
    if (!rawText.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    setChatMessages(prev => [...prev, { sender: 'user', text: rawText, time: timeStr }]);
    setIsTyping(true);

    setTimeout(() => {
      const lower = rawText.toLowerCase();
      
      // Determine type: if forcedType is passed, prioritize it, otherwise check intent
      let isIncome = forcedType 
        ? forcedType === 'income' 
        : (activeMode === 'income' || lower.includes('recebi') || lower.includes('ganhei') || lower.includes('salário') || lower.includes('rendimento') || lower.includes('entrou'));

      let amount = 50;
      const numbers = rawText.match(/\d+([.,]\d+)?/g);
      if (numbers && numbers.length > 0) {
        amount = parseFloat(numbers[0].replace('.', '').replace(',', '.'));
      }

      let category = isIncome ? 'Outras Receitas' : 'Outras Despesas';
      let title = rawText;

      if (isIncome) {
        if (lower.includes('salário') || lower.includes('remuneração')) {
          category = 'Salário Mensal';
          title = 'Salário Mensal';
        } else if (lower.includes('extra') || lower.includes('trabalho') || lower.includes('consultoria')) {
          category = 'Renda Extra';
          title = 'Renda Extra';
        } else if (lower.includes('rendimento') || lower.includes('investimento') || lower.includes('dividendos')) {
          category = 'Investimentos';
          title = 'Rendimento de Aplicações';
        } else {
          category = 'Entrada / PIX';
          title = 'Receita Confirmada';
        }
      } else {
        if (lower.includes('almoço') || lower.includes('comida') || lower.includes('mercado') || lower.includes('restaurante')) {
          category = 'Alimentação';
          title = 'Alimentação / Refeição';
        } else if (lower.includes('gasolina') || lower.includes('abasteci') || lower.includes('uber') || lower.includes('combustível')) {
          category = 'Transporte';
          title = 'Transporte & Mobilidade';
        } else if (lower.includes('luz') || lower.includes('energia') || lower.includes('internet') || lower.includes('aluguel') || lower.includes('condomínio')) {
          category = 'Moradia & Contas';
          title = 'Contas da Casa';
        } else if (lower.includes('farmácia') || lower.includes('médico') || lower.includes('remédio')) {
          category = 'Saúde & Farmácia';
          title = 'Saúde & Cuidados';
        } else {
          category = 'Despesas Gerais';
          title = 'Despesa Lançada';
        }
      }

      const txType: 'income' | 'expense' = isIncome ? 'income' : 'expense';

      const newTx: Transaction = {
        id: Date.now().toString(),
        description: title,
        type: txType,
        category,
        amount,
        time: 'Agora'
      };

      setTransactions(prev => [newTx, ...prev]);

      const botReply = isIncome
        ? `🟢 RECEITA REGISTRADA!\n💰 Valor: +R$ ${amount.toFixed(2)}\n📂 Categoria: ${category}\n📈 Seu saldo livre aumentou e o Dashboard foi atualizado na hora!`
        : `🔴 DESPESA REGISTRADA!\n💸 Valor: -R$ ${amount.toFixed(2)}\n📂 Categoria: ${category}\n📉 Lançado nas despesas do mês e refletido no seu Dashboard.`;

      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply, time: timeStr, type: txType }]);
      setIsTyping(false);
    }, 600);
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  const handleReset = () => {
    setTransactions(initialTransactions);
    setChatMessages([
      { sender: 'bot', text: 'Simulador reiniciado! Escolha entre Despesa ou Receita e teste o assistente.', time: '14:00' },
    ]);
  };

  return (
    <section id="simulador" className="relative py-20 md:py-28 bg-black overflow-hidden border-t border-slate-900">
      
      {/* Background glow */}
      <div 
        className="pointer-events-none absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full blur-[170px] opacity-20 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(14, 60, 160, 0.6) 0%, rgba(245, 158, 11, 0.2) 60%, rgba(3, 7, 18, 0) 80%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400 mb-2 block">
            Experimente na Prática Sem Cadastro
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight mb-4">
            Simulador: Mande Mensagem, Veja o Painel Atualizar
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Diferencie com clareza entre <strong className="text-rose-400">Despesas (Saídas)</strong> e <strong className="text-emerald-400">Receitas (Entradas)</strong>. Veja como o assistente identifica a operação e atualiza seus gráficos automaticamente.
          </p>
        </div>

        {/* Mode Selector Tabs: Despesa vs Receita */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <div className="inline-flex p-1 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-lg">
            <button
              onClick={() => setActiveMode('expense')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeMode === 'expense'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MinusCircle className="w-4 h-4 text-rose-400" />
              <span>Registrar Despesa (Saída)</span>
            </button>
            <button
              onClick={() => setActiveMode('income')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeMode === 'income'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Registrar Receita (Entrada)</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="text-xs font-medium px-4 py-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reiniciar simulador"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Resetar</span>
          </button>
        </div>

        {/* Quick Sample Action Chips based on selected mode */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-xs text-slate-400 font-semibold mr-1">
            Exemplos de {activeMode === 'expense' ? 'Despesas' : 'Receitas'}:
          </span>
          {(activeMode === 'expense' ? expenseSamples : incomeSamples).map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleProcessMessage(sample.text, activeMode)}
              className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-sm active:scale-95 border ${
                activeMode === 'expense'
                  ? 'bg-slate-900/90 text-slate-200 border-rose-900/40 hover:border-rose-400 hover:text-rose-300'
                  : 'bg-slate-900/90 text-slate-200 border-emerald-900/40 hover:border-emerald-400 hover:text-emerald-300'
              }`}
            >
              {sample.label}
            </button>
          ))}
        </div>

        {/* 2-Column Split: WhatsApp Box on Left, Financial Dashboard on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: WhatsApp Conversation Box */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-blue-950/40 to-slate-950 rounded-3xl border border-blue-900/40 shadow-2xl overflow-hidden flex flex-col h-[530px]">
            
            {/* WhatsApp Chat Header */}
            <div className="px-4 py-3.5 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-blue-900/80 border border-amber-400/40 flex items-center justify-center p-1">
                    <LogoFS size={30} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Finanças do Servidor
                  </h4>
                  <p className="text-[11px] text-emerald-400 font-medium">Assistente Ativo no WhatsApp</p>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2.5 py-1 rounded-md">Live Demo</span>
            </div>

            {/* Chat Body Scroll */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-black/40">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-blue-900/80 text-white rounded-tr-xs border border-blue-700/50'
                        : msg.type === 'income'
                        ? 'bg-slate-900/95 text-slate-100 rounded-tl-xs border border-emerald-500/40'
                        : msg.type === 'expense'
                        ? 'bg-slate-900/95 text-slate-100 rounded-tl-xs border border-rose-500/40'
                        : 'bg-slate-900/90 text-slate-200 rounded-tl-xs border border-amber-400/30'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-2 rounded-2xl w-fit border border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] text-slate-400 ml-1">Assistente registrando...</span>
                </div>
              )}
            </div>

            {/* Quick Action Buttons - Only Clickable Sample Messages */}
            <div className="p-3.5 bg-slate-950 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Clique em um exemplo para enviar:
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider font-mono ${
                  activeMode === 'expense' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {activeMode === 'expense' ? 'Modo Despesa' : 'Modo Receita'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(activeMode === 'expense' ? expenseSamples : incomeSamples).map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={isTyping}
                    onClick={() => handleProcessMessage(sample.text, activeMode)}
                    className={`text-xs font-semibold px-3 py-2 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95 border text-left ${
                      activeMode === 'expense'
                        ? 'bg-rose-950/30 text-rose-200 border-rose-800/40 hover:bg-rose-900/60 hover:border-rose-400 hover:text-white'
                        : 'bg-emerald-950/30 text-emerald-200 border-emerald-800/40 hover:bg-emerald-900/60 hover:border-emerald-400 hover:text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Column 2: Synchronized Live Financial Dashboard */}
          <div className="lg:col-span-7 bg-gradient-to-b from-slate-900/90 via-blue-950/30 to-slate-950 rounded-3xl border border-blue-900/40 shadow-2xl p-6 md:p-7 flex flex-col justify-between">
            
            {/* Dashboard Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Sincronizado ao Vivo
                </span>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                  Painel Financeiro
                </h3>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Mês Vigente: <strong className="text-white">Outubro/2026</strong>
              </div>
            </div>

            {/* KPI Cards Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
              
              {/* Total Balance */}
              <div className="p-4 rounded-2xl bg-black/60 border border-blue-900/40 relative overflow-hidden">
                <span className="text-xs text-slate-400 font-medium block mb-1">Saldo Livre Disponível</span>
                <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono tabular-nums">
                  R$ {currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                  <ArrowUpRight className="w-3 h-3" /> Saldo Positivo
                </span>
              </div>

              {/* Income */}
              <div className="p-4 rounded-2xl bg-black/60 border border-emerald-950/60 border-l-2 border-l-emerald-500">
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mb-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> Total Receitas (Entradas)
                </span>
                <div className="text-lg sm:text-xl font-bold text-emerald-400 font-mono tabular-nums">
                  +R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Entradas cadastradas</span>
              </div>

              {/* Expense */}
              <div className="p-4 rounded-2xl bg-black/60 border border-rose-950/60 border-l-2 border-l-rose-500">
                <span className="text-xs text-rose-400 font-semibold flex items-center gap-1 mb-1">
                  <ArrowDownRight className="w-3.5 h-3.5" /> Total Despesas (Saídas)
                </span>
                <div className="text-lg sm:text-xl font-bold text-rose-400 font-mono tabular-nums">
                  -R$ {totalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Gastos lançados</span>
              </div>

            </div>

            {/* Live Transactions List with Clear Distinction */}
            <div>
              <div className="flex items-center justify-between mb-3 text-xs">
                <h4 className="font-bold text-white uppercase tracking-wider">Lançamentos Recentes</h4>
                <span className="text-slate-400 font-mono">{transactions.length} registros</span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-800/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        tx.type === 'income' 
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' 
                          : 'bg-rose-950 text-rose-400 border border-rose-500/40'
                      }`}>
                        {tx.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs sm:text-sm font-semibold text-white">{tx.description}</p>
                          <span className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded ${
                            tx.type === 'income' 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : 'bg-rose-500/20 text-rose-400'
                          }`}>
                            {tx.type === 'income' ? 'Receita' : 'Despesa'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium">{tx.category} · {tx.time}</p>
                      </div>
                    </div>

                    <div className={`text-xs sm:text-sm font-mono font-bold tabular-nums ${
                      tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {tx.type === 'income' ? '+' : '-'} R$ {tx.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sincronização alert at bottom of dashboard */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                Sem planilhas. Registre despesas e receitas pelo WhatsApp.
              </span>
              <span className="font-mono text-slate-500">Backup na nuvem</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

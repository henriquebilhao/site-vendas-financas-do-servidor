import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Check, 
  Lock, 
  QrCode, 
  CreditCard, 
  ArrowRight,
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, selectedPlan }) => {
  const [currentPlan, setCurrentPlan] = useState(selectedPlan || 'Plano Anual Servidor VIP');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-slate-950 border border-blue-900/60 shadow-2xl shadow-blue-950/80 p-6 sm:p-8 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Ativação Imediata · Área do Servidor
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Liberar Acesso ao Finanças do Servidor
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Preencha os dados abaixo para receber as instruções e o link do seu Dashboard.
              </p>
            </div>

            {/* Plan selector pills */}
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-900 rounded-xl mb-6 border border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentPlan('Plano Anual Servidor VIP')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  currentPlan === 'Plano Anual Servidor VIP'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Anual Servidor (12x R$ 19,70)
              </button>
              <button
                type="button"
                onClick={() => setCurrentPlan('Plano Semestral Servidor')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  currentPlan === 'Plano Semestral Servidor'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Semestral (6x R$ 29,90)
              </button>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Seu Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Carlos Eduardo Silveira"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Seu Melhor E-mail (para acesso ao Dashboard)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="carlos@exemplo.com.br"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Número do seu WhatsApp (onde você vai falar com o assistente)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 98765-4321"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Payment method selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Forma de Pagamento
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentMethod('pix')}
                    className={`cursor-pointer p-3 rounded-xl border flex items-center gap-2.5 text-xs font-semibold transition-all ${
                      paymentMethod === 'pix'
                        ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-emerald-400" />
                    <span>PIX (Acesso Instantâneo)</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`cursor-pointer p-3 rounded-xl border flex items-center gap-2.5 text-xs font-semibold transition-all ${
                      paymentMethod === 'card'
                        ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-400" />
                    <span>Cartão de Crédito</span>
                  </div>
                </div>
              </div>

              {/* Submit CTA button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 py-4 rounded-xl font-black text-sm uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-amber-400/20 cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Processando ativação...</span>
                ) : (
                  <>
                    <span>Concluir e Iniciar no WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Security Guarantee Strip */}
            <div className="mt-5 pt-4 border-t border-slate-900 flex items-center justify-center gap-4 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> Ambiente 100% Criptografado
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> 7 Dias de Garantia
              </span>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="py-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                Parabéns, {name || 'Cliente'}!
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                Seu Acesso Foi Liberado com Sucesso!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-sm mx-auto">
                Enviamos os dados do seu Dashboard para <strong className="text-amber-400">{email || 'seu e-mail'}</strong>. Agora dê o primeiro "Oi" para seu assistente no WhatsApp.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-blue-900/40 text-left space-y-2">
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Registrado: <strong className="text-white">{phone || '(11) 98765-4321'}</strong>
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> Plano Ativo: <strong className="text-white">{currentPlan}</strong>
              </p>
            </div>

            <a
              href={`https://wa.me/?text=Olá!%20Acabei%20de%20assinar%20o%20Finanças%20do%20Servidor%20e%20gostaria%20de%20ativar%20meu%20assistente.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 to-green-500 hover:brightness-110 transition-all shadow-lg"
            >
              <span>Abrir WhatsApp do Finanças do Servidor</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white underline pt-2 block mx-auto cursor-pointer"
            >
              Voltar para o site
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

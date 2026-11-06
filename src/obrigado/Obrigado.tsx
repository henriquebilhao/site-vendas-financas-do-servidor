import React from 'react';
import {
  ArrowRight,
  Check,
  Headphones,
  LayoutDashboard,
  Lock,
  Mail,
  MessageCircle,
  ShieldCheck,
  UserPlus,
} from 'lucide-react';
import { LogoFS } from '../components/LogoFS';
import { LINKS } from '../landing/data';

// Página que a Hotmart abre depois da compra aprovada (configurada como "página externa").
const passos = [
  {
    icon: MessageCircle,
    titulo: 'Confira o seu WhatsApp',
    texto:
      'Em instantes você recebe uma mensagem do Finanças do Servidor no número que usou na compra. Salve o contato e já pode mandar o primeiro gasto.',
    exemplo: '“Gastei 32 reais no almoço”',
  },
  {
    icon: LayoutDashboard,
    titulo: 'Ative o seu painel',
    texto:
      'Crie a sua senha no painel usando o mesmo e-mail e telefone da compra. Lá você vê receitas, despesas, metas e relatórios.',
  },
  {
    icon: UserPlus,
    titulo: 'Plano com dependente? Convide quem divide as contas',
    texto:
      'No painel, abra Configurações → Dependentes e cadastre a pessoa. Ela recebe o convite no próprio WhatsApp.',
  },
];

export default function Obrigado() {
  return (
    <div className="min-h-screen overflow-x-clip bg-navy-900 font-sans text-slate-100 antialiased">
      <header className="border-b border-white/5 bg-navy-950/80">
        <div className="mx-auto flex max-w-3xl items-center gap-2.5 px-4 py-4 sm:px-6">
          <LogoFS size={34} />
          <span className="font-display text-[17px] font-bold text-white">Finanças do Servidor</span>
        </div>
      </header>

      <main className="relative px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
        <div className="pointer-events-none absolute -top-10 left-1/2 h-72 w-[600px] max-w-full -translate-x-1/2 rounded-full bg-amber-400/15 blur-[100px]" />

        <div className="relative mx-auto max-w-3xl">
          {/* Confirmação */}
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/40">
              <Check className="h-8 w-8 text-emerald-400" strokeWidth={3} />
            </div>
            <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-amber-400">Compra aprovada</p>
            <h1 className="font-display mx-auto mt-3 max-w-2xl text-3xl font-bold leading-tight text-white text-balance sm:text-5xl">
              Bem-vindo ao Finanças do Servidor!
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
              O seu assistente já está liberado. Siga os passos abaixo para começar a organizar o seu salário hoje.
            </p>
          </div>

          {/* Passos */}
          <ol className="mt-12 space-y-4">
            {passos.map((p, i) => (
              <li key={p.titulo} className="card flex gap-4 p-5 sm:p-6">
                <div className="flex shrink-0 flex-col items-center">
                  <span className="font-display flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-[17px] font-bold text-navy-950">
                    {i + 1}
                  </span>
                </div>
                <div className="min-w-0">
                  <h2 className="flex items-center gap-2 text-[17px] font-bold text-white">
                    <p.icon className="h-5 w-5 shrink-0 text-amber-400" />
                    {p.titulo}
                  </h2>
                  <p className="mt-1.5 leading-relaxed text-slate-300">{p.texto}</p>
                  {p.exemplo && (
                    <p className="mt-3 inline-block rounded-2xl rounded-tr-sm bg-[#d9fdd3] px-3.5 py-2 text-[14px] text-slate-900">
                      {p.exemplo}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {/* Ações */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={LINKS.whatsappAssinante}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex-1 rounded-full px-6 py-4 text-[16px]"
            >
              <MessageCircle className="h-5 w-5" /> Abrir o WhatsApp
            </a>
            <a
              href={LINKS.cadastroPainel}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost flex-1 rounded-full px-6 py-4 text-[16px]"
            >
              Ativar meu painel <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          {/* Informações */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-navy-950/50 p-5">
              <p className="flex items-center gap-2 font-semibold text-white">
                <Mail className="h-5 w-5 text-amber-400" /> Comprovante por e-mail
              </p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-slate-400">
                A Hotmart envia o comprovante para o e-mail da compra. Se não encontrar, confira a caixa de spam.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-navy-950/50 p-5">
              <p className="flex items-center gap-2 font-semibold text-white">
                <Headphones className="h-5 w-5 text-amber-400" /> Precisa de ajuda?
              </p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-slate-400">
                Não recebeu a mensagem em alguns minutos? Fale com o nosso suporte humano pelo{' '}
                <a href={LINKS.whatsappAssinante} target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-400 hover:underline">
                  WhatsApp
                </a>{' '}
                ou pelo e-mail{' '}
                <a href={`mailto:${LINKS.suporteEmail}`} className="break-all font-semibold text-amber-400 hover:underline">
                  {LINKS.suporteEmail}
                </a>
                .
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-slate-400">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-amber-400" /> 7 dias de garantia</span>
            <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-amber-400" /> Nunca pedimos senha de banco ou Gov.br</span>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 bg-navy-950 py-8 text-center text-[13px] text-slate-500">
        <a href="/" className="hover:text-white">appfinancasdoservidor.digital</a>
        <span className="mx-2">·</span>
        <a href={`mailto:${LINKS.suporteEmail}`} className="hover:text-white">{LINKS.suporteEmail}</a>
      </footer>
    </div>
  );
}

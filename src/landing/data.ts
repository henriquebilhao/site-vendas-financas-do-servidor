// Valores e links oficiais (produto Hotmart P108349038G)
export const LINKS = {
  mensalSem: 'https://pay.hotmart.com/P108349038G?off=jgetfxt8',
  mensalCom: 'https://pay.hotmart.com/P108349038G?off=7uwqfyck',
  trimestralSem: 'https://pay.hotmart.com/P108349038G?off=hrxkq0o2',
  trimestralCom: 'https://pay.hotmart.com/P108349038G?off=020d4o7v',
  anual: 'https://pay.hotmart.com/P108349038G?off=tllte0hp',
  testeGratis:
    'https://wa.me/5554994197878?text=Ol%C3%A1%21+Gostaria+de+iniciar+meu+teste+gr%C3%A1tis+de+7+dias+no+Finan%C3%A7as+do+Servidor.',
  areaCliente: 'https://membros.appfinancasdoservidor.digital',
  suporteEmail: 'suporte@appfinancasdoservidor.digital',
  cadastroPainel: 'https://membros.appfinancasdoservidor.digital/cadastro',
  whatsappAssinante:
    'https://wa.me/5554994197878?text=Ol%C3%A1%21+Acabei+de+assinar+o+Finan%C3%A7as+do+Servidor.',
};

export const PRECOS = {
  mensalSem: 20.9,
  mensalCom: 30.9,
  trimestralSem: 55.9,
  trimestralCom: 65.9,
  anual: 219.9,
};

export const brl = (v: number) =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* Fim da condição de lançamento (horário de Brasília).
   O cronômetro do topo conta até aqui e some sozinho quando a data passa. */
export const LANCAMENTO_FIM = new Date('2026-11-30T23:59:59-03:00');

/* Cupom de lançamento: vale até LANCAMENTO_FIM e some do site junto com o cronômetro.
   Preencha `codigo` com o cupom criado na Hotmart; enquanto estiver vazio, o site fala só "cupom de lançamento". */
export const CUPOM = { pct: 25, codigo: '' };

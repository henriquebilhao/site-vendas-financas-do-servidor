import { comOrigemHotmart, comOrigemPainel, comOrigemWhatsApp } from './origem';

// Valores e links oficiais (produto Hotmart P108349038G)
// Os "comOrigem..." só acrescentam por qual link o visitante chegou.
export const LINKS = {
  mensalSem: comOrigemHotmart('https://pay.hotmart.com/P108349038G?off=jgetfxt8'),
  mensalCom: comOrigemHotmart('https://pay.hotmart.com/P108349038G?off=7uwqfyck'),
  trimestralSem: comOrigemHotmart('https://pay.hotmart.com/P108349038G?off=yrgr5ya5'),
  trimestralCom: comOrigemHotmart('https://pay.hotmart.com/P108349038G?off=llojfdtp'),
  anual: comOrigemHotmart('https://pay.hotmart.com/P108349038G?off=hljd903u'),
  testeGratis: comOrigemWhatsApp(
    'https://wa.me/5554994197878?text=Ol%C3%A1%21+Gostaria+de+iniciar+meu+teste+gr%C3%A1tis+de+7+dias+no+Finan%C3%A7as+do+Servidor.',
  ),
  instagram: 'https://www.instagram.com/appfinancasdoservidor/',
  suporteWhatsapp: 'https://wa.me/5554991412399',
  whatsappAgente: 'https://wa.me/5554994197878',
  areaCliente: comOrigemPainel('https://membros.appfinancasdoservidor.digital'),
  suporteEmail: 'suporte@appfinancasdoservidor.digital',
  cadastroPainel: comOrigemPainel('https://membros.appfinancasdoservidor.digital/cadastro'),
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
export const CUPOM = { pct: 25, codigo: 'SERVIDORVIP' };

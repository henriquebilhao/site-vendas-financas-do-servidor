import { comOrigemHotmart, comOrigemPainel, comOrigemWhatsApp } from './origem';

/* Fim da condição de lançamento (horário de Brasília).
   O cronômetro do topo conta até aqui e some sozinho quando a data passa. */
export const LANCAMENTO_FIM = new Date('2026-11-30T23:59:59-03:00');

/* Cupom de lançamento: vale até LANCAMENTO_FIM e some do site junto com o cronômetro.
   Enquanto a oferta vale, os links de pagamento já levam o cupom aplicado. */
export const CUPOM = { pct: 25, codigo: 'SERVIDORVIP' };

export const OFERTA_ATIVA = Boolean(CUPOM.codigo) && Date.now() < LANCAMENTO_FIM.getTime();

const checkout = (oferta: string) => {
  const cupom = OFERTA_ATIVA ? `&offDiscount=${CUPOM.codigo}` : '';
  return comOrigemHotmart(`https://pay.hotmart.com/P108349038G?off=${oferta}${cupom}`);
};

// Valores e links oficiais (produto Hotmart P108349038G)
// Os "comOrigem..." só acrescentam por qual link o visitante chegou.
export const LINKS = {
  mensalSem: checkout('jgetfxt8'),
  mensalCom: checkout('7uwqfyck'),
  trimestralSem: checkout('yrgr5ya5'),
  trimestralCom: checkout('llojfdtp'),
  anual: checkout('hljd903u'),
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

/* Valores com o cupom, copiados do checkout da Hotmart em 27/11/2026.
   Se mudar um preço ou o cupom, confira de novo no checkout. */
export const PRECOS_COM_CUPOM: typeof PRECOS = {
  mensalSem: 15.68,
  mensalCom: 23.18,
  trimestralSem: 41.93,
  trimestralCom: 49.43,
  anual: 164.93,
};

/* Parcelamento do anual no cartão (12x, com acréscimo da Hotmart) */
export const ANUAL_12X = { normal: 22.74, comCupom: 17.06 };

export const brl = (v: number) =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* Quem criou o assistente. A dobra "Quem somos" só mostra o cartão quando houver nome.
   Preencha só com dados reais e autorizados; foto em public/ (ex.: '/fundador.jpg'). */
export const FUNDADOR = { nome: '', cargo: '', foto: '', frase: '' };

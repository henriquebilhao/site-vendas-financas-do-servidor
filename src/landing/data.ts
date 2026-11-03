// Valores e links oficiais (mesmos da página anterior)
export const LINKS = {
  mensalSem: 'https://pay.hotmart.com/R107997768B?off=tp446sid',
  mensalCom: 'https://pay.hotmart.com/R107997768B?off=6rkpkqdm',
  trimestralSem: 'https://pay.hotmart.com/R107997768B?off=lll6osu7',
  trimestralCom: 'https://pay.hotmart.com/R107997768B?off=sw3m0ili',
  anual: 'https://pay.hotmart.com/R107997768B?off=3347zlda',
  testeGratis:
    'https://wa.me/5554994197878?text=Ol%C3%A1%21+Gostaria+de+iniciar+meu+teste+gr%C3%A1tis+de+3+dias+no+Finan%C3%A7as+do+Servidor.',
  areaCliente: 'https://membros.appfinancasdoservidor.digital',
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

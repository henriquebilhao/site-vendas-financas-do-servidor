/* Origem do visitante (por qual link chegou).
   Formato guardado: "fonte|meio|campanha|conteudo". O cookie vale para o site e para o painel
   (mesmo domínio principal), por 30 dias, e o primeiro link marcado é o que vale.
   Mesma regra do painel: src/lib/origem/origem.ts (manter iguais). */

const COOKIE = 'fs_origem';
const DOMINIO = 'appfinancasdoservidor.digital';
const TRINTA_DIAS = 60 * 60 * 24 * 30;
/** Quem chegou sem link marcado. Não é guardado: um link marcado depois ainda vale. */
const SEM_MARCACAO = 'site|direto';

const limpar = (v: string | null) =>
  (v ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 30)
    .replace(/^-+|-+$/g, '');

function daUrl(): string | null {
  const q = new URLSearchParams(window.location.search);
  const fonte = limpar(q.get('utm_source'));
  if (!fonte) return null;
  const partes = [fonte, limpar(q.get('utm_medium')), limpar(q.get('utm_campaign')), limpar(q.get('utm_content'))];
  return partes.join('|').replace(/\|+$/, '');
}

function doCookie(): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  if (!m) return null;
  try {
    const partes = decodeURIComponent(m[1]).split('|').slice(0, 4).map(limpar);
    return partes[0] ? partes.join('|').replace(/\|+$/, '') : null;
  } catch {
    return null;
  }
}

function capturar(): string | null {
  const salva = doCookie();
  if (salva && salva !== SEM_MARCACAO) return salva;
  const nova = daUrl();
  if (!nova || nova === SEM_MARCACAO) return null;
  const host = window.location.hostname;
  const dominio = host === DOMINIO || host.endsWith(`.${DOMINIO}`) ? `; Domain=.${DOMINIO}` : '';
  const seguro = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE}=${encodeURIComponent(nova)}; Max-Age=${TRINTA_DIAS}; Path=/; SameSite=Lax${dominio}${seguro}`;
  return nova;
}

// roda uma vez, na chegada (antes de os botões serem desenhados)
const origem = capturar();

/** Link de pagamento: a Hotmart devolve o "sck" no aviso de compra (até 30 caracteres, sem "_"). */
export function comOrigemHotmart(link: string): string {
  const sck = (origem ?? SEM_MARCACAO).split('|').slice(0, 3).join('|').slice(0, 30).replace(/[|-]+$/, '');
  const url = new URL(link);
  url.searchParams.set('sck', sck);
  return url.toString();
}

/** Link do painel (cadastro / área do cliente): leva a origem no endereço. */
export function comOrigemPainel(link: string): string {
  const [fonte, meio, campanha, conteudo] = (origem ?? SEM_MARCACAO).split('|');
  const url = new URL(link);
  Object.entries({ utm_source: fonte, utm_medium: meio, utm_campaign: campanha, utm_content: conteudo }).forEach(
    ([chave, valor]) => {
      if (valor) url.searchParams.set(chave, valor);
    },
  );
  return url.toString();
}

const ABREVIADAS: Record<string, string> = { instagram: 'ig', facebook: 'fb', whatsapp: 'wa' };

/** WhatsApp não aceita UTM: a origem vai como um código curto no fim da mensagem, ex.: [ig-bio-perfil]. */
export function comOrigemWhatsApp(link: string): string {
  if (!origem) return link;
  const [fonte, meio, campanha] = origem.split('|');
  const codigo = [
    (ABREVIADAS[fonte] ?? fonte).replace(/-/g, ''),
    (meio || 'link').replace(/-/g, ''),
    campanha,
  ]
    .filter(Boolean)
    .join('-');
  return `${link}+%5B${codigo}%5D`;
}

// Rastreamento do site: tudo passa pelo dataLayer e o Google Tag Manager
// (GTM-TMZ52W4C) decide para onde cada evento vai (GA4, Google Ads, Meta Pixel).

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const payload: DataLayerEvent = { event, ...params };
  window.dataLayer.push(payload);
}

// Código de origem acrescentado à mensagem pronta do WhatsApp, para a equipe
// saber de onde veio cada aluno. Desligado até ser combinado com o Naamã.
export const ORIGIN_TAG_ENABLED = false;

const ORIGIN_KEY = "naama_origem";

export function captureOrigin() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const source = (params.get("utm_source") || "").toLowerCase();
    let code = "";
    if (params.get("gclid") || params.get("gbraid") || params.get("wbraid") || source === "google") code = "G";
    else if (params.get("fbclid") || source === "meta" || source === "facebook" || source === "instagram_ads") code = "M";
    else if (source === "instagram" || /instagram\.com/.test(document.referrer)) code = "I";
    if (code) window.sessionStorage.setItem(ORIGIN_KEY, code);
  } catch {
    // Sem acesso ao storage: segue sem código de origem.
  }
}

export function withOrigin(whatsappUrl: string) {
  if (!ORIGIN_TAG_ENABLED || typeof window === "undefined") return whatsappUrl;
  try {
    const code = window.sessionStorage.getItem(ORIGIN_KEY);
    if (!code) return whatsappUrl;
    return `${whatsappUrl}${encodeURIComponent(` (${code})`)}`;
  } catch {
    return whatsappUrl;
  }
}

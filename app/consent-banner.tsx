"use client";

import { useEffect, useState } from "react";

// Aviso de cookies com o Modo de Consentimento v2 do Google.
// O padrão (definido no layout) nega cookies de medição e anúncio para
// visitantes do Espaço Econômico Europeu, Reino Unido e Suíça e libera para
// o resto. Este aviso deixa qualquer visitante aceitar ou recusar.

const STORAGE_KEY = "naama_consent";

const TEXTS = {
  pt: {
    body: "Usamos cookies para medir visitas e melhorar nossos anúncios.",
    accept: "Aceitar",
    decline: "Recusar",
  },
  en: {
    body: "We use cookies to measure visits and improve our ads.",
    accept: "Accept",
    decline: "Decline",
  },
  es: {
    body: "Usamos cookies para medir visitas y mejorar nuestros anuncios.",
    accept: "Aceptar",
    decline: "Rechazar",
  },
  fr: {
    body: "Nous utilisons des cookies pour mesurer les visites et améliorer nos publicités.",
    accept: "Accepter",
    decline: "Refuser",
  },
};

type Choice = "granted" | "denied";

function updateConsent(choice: Choice) {
  window.dataLayer = window.dataLayer || [];
  // gtag precisa receber o objeto "arguments", não um array comum.
  // eslint-disable-next-line prefer-rest-params
  const gtag = function gtag(..._args: unknown[]) { window.dataLayer!.push(arguments); };
  gtag("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
  window.dataLayer.push({ event: "consent_update", consent_choice: choice });
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState<keyof typeof TEXTS>("pt");

  useEffect(() => {
    const browser = navigator.language?.toLowerCase() ?? "";
    const detected: keyof typeof TEXTS = browser.startsWith("en")
      ? "en"
      : browser.startsWith("es")
        ? "es"
        : browser.startsWith("fr")
          ? "fr"
          : "pt";
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    const frame = window.requestAnimationFrame(() => {
      setLang(detected);
      setVisible(!stored);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!visible) return null;

  const t = TEXTS[lang];
  const choose = (choice: Choice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Sem storage: vale só para esta visita.
    }
    updateConsent(choice);
    setVisible(false);
  };

  return (
    <div className="consent-banner" role="region" aria-label="Cookies">
      <p>{t.body}</p>
      <div className="consent-actions">
        <button type="button" className="consent-decline" onClick={() => choose("denied")}>{t.decline}</button>
        <button type="button" className="consent-accept" onClick={() => choose("granted")}>{t.accept}</button>
      </div>
    </div>
  );
}

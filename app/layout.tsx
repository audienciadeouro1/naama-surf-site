import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";
import ConsentBanner from "./consent-banner";

const GTM_ID = "GTM-TMZ52W4C";

// Regiões onde a lei exige consentimento antes de cookies de medição e anúncio:
// Espaço Econômico Europeu, Reino Unido e Suíça.
const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT",
  "LV", "LI", "LT", "LU", "MT", "NL", "NO", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB", "CH",
];

const consentAndGtmScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied', analytics_storage:'denied', region:${JSON.stringify(CONSENT_REGIONS)}, wait_for_update:500});
gtag('consent', 'default', {ad_storage:'granted', ad_user_data:'granted', ad_personalization:'granted', analytics_storage:'granted'});
try {
  var c = localStorage.getItem('naama_consent');
  if (c === 'granted' || c === 'denied') {
    gtag('consent', 'update', {ad_storage:c, ad_user_data:c, ad_personalization:c, analytics_storage:c});
  }
} catch (e) {}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
`;

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.naamasurf.com.br"),
  title: "Naamã Surf | Aulas de Surf no Arpoador",
  description:
    "Escola de surf no Posto 7, Arpoador. Aulas para iniciantes, adultos e crianças, com equipamento incluso. Agende pelo WhatsApp.",
  keywords: ["surf Arpoador", "surf lesson Rio", "aula de surf Ipanema", "Naamã Surf"],
  openGraph: {
    title: "Naamã Surf — Do zero à sua primeira onda",
    description: "Aulas de surf no Arpoador, Rio de Janeiro. Equipamento incluso e iniciantes bem-vindos.",
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Naamã Surf no Arpoador" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naamã Surf — Arpoador, Rio de Janeiro",
    description: "Do zero à sua primeira onda.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/brand/naama-surf-logo.png",
    shortcut: "/brand/naama-surf-logo.png",
    apple: "/brand/naama-surf-logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <script dangerouslySetInnerHTML={{ __html: consentAndGtmScript }} />
      </head>
      <body className={`${display.variable} ${body.variable}`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}

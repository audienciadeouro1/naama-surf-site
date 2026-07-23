import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("http://localhost:3000"),
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
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}

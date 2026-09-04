import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lumine — Espaço de Desenvolvimento Infantil",
    template: "%s | Lumine",
  },
  description:
    "Conheça o Lumine e faça a inscrição no Festival Lumine de Artes, aberto a crianças de toda a comunidade.",
  icons: {
    icon: "/lumine-star-icon.png",
    shortcut: "/favicon.ico",
    apple: "/lumine-star-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

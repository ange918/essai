import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NELLOA BANK",
  description: "La banque digitale qui vous fait confiance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

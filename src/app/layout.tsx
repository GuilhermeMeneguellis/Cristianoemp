import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConstrutorPro - Construção Civil de Qualidade",
  description:
    "Especialista em obras residenciais e comerciais. Do alicerce ao acabamento, entregamos excelência em cada detalhe do seu projeto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JUVA | Bienestar. Fuerza. Longevidad.",
  description:
    "JUVA es un club privado de bienestar, rendimiento y longevidad en Quito, Ecuador. Recuperación avanzada, entrenamiento de élite y terapias de bienestar en un solo espacio.",
  openGraph: {
    title: "JUVA | Bienestar. Fuerza. Longevidad.",
    description:
      "Club privado de bienestar y rendimiento en Quito, Ecuador.",
    locale: "es_EC",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-juva-bg-deep text-juva-cream font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

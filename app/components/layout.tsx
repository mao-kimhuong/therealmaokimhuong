import type { Metadata } from "next";
import { Bebas_Neue, Lora, DM_Mono, Archivo } from "next/font/google";
import "./globals.css";
import Cursor from "./components/Cursor";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-mono",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mao Kim Huong — Full-Stack Web Developer",
  description:
    "Full-stack developer in Phnom Penh, Cambodia. PHP, ThinkPHP5, Laravel & React — building RESTful APIs, POS systems, and mobile-first platforms.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${lora.variable} ${dmMono.variable} ${archivo.variable}`}
    >
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
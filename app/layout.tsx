import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "./components/site/SmoothScroll";

const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mao Kim Huong — Full-Stack Web Developer",
  description:
    "Full-stack developer in Phnom Penh, Cambodia. Backend PHP systems, REST APIs and mobile-facing web platforms on ThinkPHP5, Laravel and FastAdmin — production-grade features for fintech and e-commerce.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={interTight.variable}>
      <body data-theme-nav="dark">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Archivo_Black, Inter, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/shared/SmoothScroll";
import CustomCursor from "@/components/shared/CustomCursor";
import PageTransition from "@/components/transitions/PageTransition";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-mona",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Aavash Basnet — Creative Developer & Interaction Designer",
  description:
    "Official portfolio of Aavash Basnet. Building high-performance interactive web experiences, creative code, motion systems, and frontend architecture.",
  keywords: [
    "Aavash Basnet",
    "Creative Developer",
    "Interaction Designer",
    "Next.js",
    "GSAP",
    "React",
    "TypeScript",
    "Kathmandu Nepal",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${archivoBlack.variable}
          ${inter.variable}
          ${hankenGrotesk.variable}
          font-body
          bg-[#E9E9E5]
          text-[#111111]
          antialiased
          selection:bg-black
          selection:text-white
        `}
      >
        <SmoothScroll>
          <PageTransition>
            <CustomCursor />
            {children}
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
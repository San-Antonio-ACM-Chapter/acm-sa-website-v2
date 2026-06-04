import type { Metadata } from "next";
import type React from "react";
import "./globals.css";
import { JetBrains_Mono, Jockey_One } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";

const jockeyOne = Jockey_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jockey-one",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://acmsa.org"),
  title: "ACM San Antonio",
  description: "Association for Computing Machinery - San Antonio Chapter",
  icons: {
    icon: "/acm-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jockeyOne.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

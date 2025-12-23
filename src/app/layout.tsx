import type { Metadata } from "next";
import type React from "react";
import "./globals.css";
import {Space_Grotesk} from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: "ACM San Antonio",
  description: "Association for Computing Machinery - San Antonio Chapter",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body>{children}</body>
    </html>
  );
}

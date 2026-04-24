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
  title: "ACM San Antonio",
  description: "Association for Computing Machinery - San Antonio Chapter",
  icons: {
    icon: "/acm-logo.svg",
  },
};

const themeInitScript = `
  (() => {
    const storageKey = "theme";
    const root = document.documentElement;
    root.setAttribute("data-theme-loading", "true");
    const storedTheme = localStorage.getItem(storageKey);
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const theme = storedTheme === "dark" || storedTheme === "light"
      ? storedTheme
      : systemTheme;

    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
    root.style.backgroundColor = theme === "dark" ? "#0a0a0a" : "#ffffff";
    root.style.color = theme === "dark" ? "#e5e5e5" : "#171717";
    localStorage.setItem(storageKey, theme);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.removeAttribute("data-theme-loading");
      });
    });
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jockeyOne.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

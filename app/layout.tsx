import type { Metadata } from "next";
import { Outfit, Syne, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Magnatic | AI-Powered Marketing",
  description: "Magnetic Ads, Made by AI",
  icons: {
    icon: "/icon-white.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${outfit.variable} ${syne.variable} ${dmSans.variable} ${spaceMono.variable} font-sans antialiased text-white`}>
        {children}
      </body>
    </html>
  );
}

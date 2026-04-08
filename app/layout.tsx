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
  title: "Magnatic | AI Models, Influencers & Product Ads",
  description:
    "Premium product ads with AI models and influencers—no one on camera. We manage creator Instagram accounts, shoot and edit ads end-to-end, and can run your social media calendars from ideation through scheduled posting. Join the waitlist.",
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
      <body className={`${outfit.variable} ${syne.variable} ${dmSans.variable} ${spaceMono.variable} font-sans antialiased text-[color:var(--mag-fg)]`}>
        {children}
      </body>
    </html>
  );
}

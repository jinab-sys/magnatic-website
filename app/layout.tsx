import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
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
      <body className={`${outfit.variable} font-sans antialiased bg-black text-white`}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: '#ffffff',
              colorTextOnPrimaryBackground: '#000000',
              colorBackground: '#111111',
              colorText: '#ffffff',
              colorTextSecondary: '#a3a3a3',
              colorInputBackground: 'rgba(255, 255, 255, 0.05)',
              colorInputText: '#ffffff',
              fontFamily: 'var(--font-outfit)',
            },
            elements: {
              cardBox: "!bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl",
              card: "!bg-transparent shadow-none",
              userButtonPopoverCard: "!bg-black/80 backdrop-blur-3xl border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]",
              profilePage: "!bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl",
              profileSection: "!bg-transparent",
              navbar: "!bg-transparent border-r border-white/10",
              pageScrollBox: "!bg-transparent",
              page: "!bg-transparent",
              formButtonPrimary: "!bg-white !text-black hover:!bg-neutral-200 border-none transition-colors rounded-xl shadow-none py-2 font-semibold",
              formFieldInput: "!bg-white/5 border border-white/10 !text-white placeholder:text-neutral-500 rounded-xl",
              dividerLine: "!bg-white/10",
              socialButtonsBlockButton: "border border-white/10 hover:!bg-white/5 !text-white transition-colors rounded-xl",
            }
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}

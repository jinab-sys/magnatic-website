import type { Metadata } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/** Humanist sans — body, UI, long copy (readable on dark backgrounds). */
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

/** Expressive grotesque — headlines (creative / production-house feel vs generic geometric stacks). */
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  display: "swap",
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
      <body
        className={`${instrumentSans.variable} ${bricolageGrotesque.variable} ${ibmPlexMono.variable} font-sans antialiased text-[color:var(--mag-fg)]`}
      >
        {children}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wf49mi79bq");
          `}
        </Script>
      </body>
    </html>
  );
}

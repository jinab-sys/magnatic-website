import { ShaderAnimation } from "@/components/ui/shader-lines"
import { Navbar } from "@/components/blocks/navbar"
import { ScrollExpandHero } from "@/components/blocks/scroll-expansion-hero"
import { BrandsMarquee } from "@/components/blocks/brands-marquee"
import { FeaturesSection } from "@/components/blocks/features-section"
import { VisionStatement } from "@/components/blocks/vision-statement"

export default function Home() {
  // Unauthenticated Public Landing Page
  return (
    <main className="relative min-h-screen selection:bg-white/30 selection:text-white pb-20 md:pb-0">
      <div className="fixed inset-0 z-0 bg-black pointer-events-none">
        <ShaderAnimation />
      </div>

      <Navbar />

      <div className="relative z-10 w-full overflow-x-hidden">
        <ScrollExpandHero />
        <BrandsMarquee />
        <FeaturesSection />
        <VisionStatement />

        {/* Simple Footer */}
        <footer className="relative z-20 border-t border-white/5 mt-10 sm:mt-20 bg-black/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-24 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-full-white.svg" alt="Magnatic" className="h-5 sm:h-6 opacity-60" />
            <p className="text-neutral-600 text-xs sm:text-sm font-light">
              © 2025 Magnatic. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}

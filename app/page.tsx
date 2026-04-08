import { Navbar }              from "@/components/blocks/navbar"
import { ScrollExpandHero }    from "@/components/blocks/scroll-expansion-hero"
import { VideoShowcaseGrid }   from "@/components/blocks/video-showcase-grid"
import { BrandsMarquee }       from "@/components/blocks/brands-marquee"
import { StatsSection }        from "@/components/blocks/stats-section"
import { FeaturesSection }     from "@/components/blocks/features-section"
import { HowItWorks }          from "@/components/blocks/how-it-works"
import { AvatarCarousel }      from "@/components/blocks/avatar-carousel"
import { TestimonialsSection } from "@/components/blocks/testimonials-section"
import { VisionStatement }     from "@/components/blocks/vision-statement"
import { CtaBanner }           from "@/components/blocks/cta-banner"
import { RegisterSection }     from "@/components/blocks/register-section"
import { readdir }             from "node:fs/promises"
import path                    from "node:path"

const footerCols = [
    {
        title: "Product",
        links: ["Features", "Pricing", "API", "Updates"],
    },
    {
        title: "Company",
        links: ["About", "Blog", "Careers", "Press"],
    },
    {
        title: "Resources",
        links: ["Help Center", "Tutorials", "Avatar Library", "Templates"],
    },
    {
        title: "Legal",
        links: ["Privacy", "Terms", "GDPR", "Cookies"],
    },
]

const socials = [
    { label: "𝕏",  title: "X / Twitter" },
    { label: "in", title: "LinkedIn"     },
    { label: "♪",  title: "TikTok"       },
    { label: "◎",  title: "Instagram"    },
    { label: "▶",  title: "YouTube"      },
]

export default async function Home() {
    const videosDir = path.join(process.cwd(), "app/assets/videos")

    let videos: { src: string; title: string }[] = []
    try {
        const files = await readdir(videosDir)
        videos = files
            .filter((file) => file.toLowerCase().endsWith(".mp4"))
            .sort((a, b) => a.localeCompare(b))
            .map((file) => ({
                src: `/api/video?name=${encodeURIComponent(file)}`,
                title: file.replace(/\.mp4$/i, "").replace(/[_-]+/g, " ").trim(),
            }))
    } catch {
        videos = []
    }

    return (
        <main className="relative min-h-screen overflow-x-hidden">
            <Navbar />

            <div className="relative w-full">
                <ScrollExpandHero />
                <VideoShowcaseGrid videos={videos} />
                <BrandsMarquee />
                <StatsSection />
                <FeaturesSection />
                <HowItWorks />
                <AvatarCarousel />
                <TestimonialsSection />
                <VisionStatement />
                <CtaBanner />
                <RegisterSection />

                {/* ── Footer ── */}
                <footer className="relative z-20 border-t border-white/10 mag-section-dim backdrop-blur-md">
                    <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">

                        {/* Top grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
                            {/* Brand */}
                            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
                                <p className="font-syne font-bold text-xl tracking-widest mb-3 mag-text-gradient">
                                    MAGNATIC
                                </p>
                                <p className="font-dm-sans text-white/60 text-sm leading-relaxed max-w-[200px]">
                                    AI models and influencers for premium product ads—no one on camera, end-to-end delivery.
                                </p>
                            </div>

                            {/* Link columns */}
                            {footerCols.map((col) => (
                                <div key={col.title}>
                                    <p className="font-syne font-bold text-sm text-white mb-5">{col.title}</p>
                                    <ul className="flex flex-col gap-3">
                                        {col.links.map((l) => (
                                            <li key={l}>
                                                <a href="#" className="font-dm-sans text-white/60 text-sm hover:text-white transition-colors duration-200">
                                                    {l}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Bottom bar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-8 border-t border-white/10">
                            <p className="font-dm-sans text-white/60 text-xs sm:text-sm">
                                © 2026 Magnatic Inc. All rights reserved.
                            </p>

                            {/* Social icons */}
                            <div className="flex gap-2">
                                {socials.map((s) => (
                                    <a key={s.title} href="#" title={s.title}
                                        className="w-9 h-9 rounded-lg flex items-center justify-center mag-text-muted text-sm font-semibold transition-all duration-300 hover:text-white hover:bg-[rgba(163,230,53,0.12)] hover:border-[rgba(163,230,53,0.28)] border border-white/8 bg-white/6">
                                        {s.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                    </div>
                </footer>
            </div>
        </main>
    )
}

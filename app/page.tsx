import { Navbar } from "@/components/blocks/navbar"
import { ScrollExpandHero } from "@/components/blocks/scroll-expansion-hero"
import { ScrollToRegisterOnHomeLoad } from "@/components/scroll-to-register-on-home-load"
import dynamic from "next/dynamic"
import { readdir } from "node:fs/promises"
import path from "node:path"
const AvatarShowcase = dynamic(
    () => import("@/components/blocks/avatar-showcase").then((m) => m.AvatarShowcase),
    { loading: () => <LazyBlock minH="min-h-[500px]" /> },
)

function LazyBlock({ minH }: { minH: string }) {
    return (
        <div
            className={`mx-auto w-full max-w-7xl px-6 ${minH} rounded-2xl bg-white/[0.04] motion-safe:animate-pulse`}
            aria-hidden
        />
    )
}

const SocialPresenceSection = dynamic(
    () => import("@/components/blocks/social-presence-section").then((m) => m.SocialPresenceSection),
    { loading: () => <LazyBlock minH="min-h-[200px]" /> },
)


const VideoShowcaseGrid = dynamic(
    () => import("@/components/blocks/video-showcase-grid").then((m) => m.VideoShowcaseGrid),
    { loading: () => <LazyBlock minH="min-h-[340px]" /> },
)

const FeaturesSection = dynamic(
    () => import("@/components/blocks/features-section").then((m) => m.FeaturesSection),
    { loading: () => <LazyBlock minH="min-h-[380px]" /> },
)

const BrandsMarquee = dynamic(
    () => import("@/components/blocks/brands-marquee").then((m) => m.BrandsMarquee),
    { loading: () => <LazyBlock minH="min-h-[72px]" /> },
)

const StatsSection = dynamic(
    () => import("@/components/blocks/stats-section").then((m) => m.StatsSection),
    { loading: () => <LazyBlock minH="min-h-[200px]" /> },
)

const HowItWorks = dynamic(
    () => import("@/components/blocks/how-it-works").then((m) => m.HowItWorks),
    { loading: () => <LazyBlock minH="min-h-[320px]" /> },
)

const TestimonialsSection = dynamic(
    () => import("@/components/blocks/testimonials-section").then((m) => m.TestimonialsSection),
    { loading: () => <LazyBlock minH="min-h-[260px]" /> },
)

const VideoRotatingMarquee = dynamic(
    () => import("@/components/blocks/video-rotating-marquee").then((m) => m.VideoRotatingMarquee),
    { loading: () => <LazyBlock minH="min-h-[420px]" /> },
)

const VisionStatement = dynamic(
    () => import("@/components/blocks/vision-statement").then((m) => m.VisionStatement),
    { loading: () => <LazyBlock minH="min-h-[120px]" /> },
)

const CtaBanner = dynamic(
    () => import("@/components/blocks/cta-banner").then((m) => m.CtaBanner),
    { loading: () => <LazyBlock minH="min-h-[140px]" /> },
)

const RegisterSection = dynamic(
    () => import("@/components/blocks/register-section").then((m) => m.RegisterSection),
    { loading: () => <LazyBlock minH="min-h-[200px]" /> },
)

const footerCols = [
    {
        title: "Services",
        links: ["AI Video Ads", "UGC Content", "AI Avatars & Influencers", "Product Shoots"],
    },
    {
        title: "Legal",
        links: ["Privacy", "Terms"],
    },
]

const socials = [
    { label: "𝕏", title: "X / Twitter" },
    { label: "in", title: "LinkedIn" },
    { label: "♪", title: "TikTok" },
    { label: "◎", title: "Instagram" },
    { label: "▶", title: "YouTube" },
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

        // Swap second video (index 1) with third-last video (index length-3)
        if (videos.length >= 4) {
            const thirdLast = videos.length - 3;
            [videos[1], videos[thirdLast]] = [videos[thirdLast]!, videos[1]!]
        }
    } catch {
        videos = []
    }

    const avatarsDir = path.join(process.cwd(), "app/assets/avatars")
    let avatars: { src: string; name: string }[] = []
    try {
        const files = await readdir(avatarsDir)
        avatars = files
            .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
            .sort((a, b) => a.localeCompare(b))
            .map((file) => ({
                src: `/api/avatar-image?name=${encodeURIComponent(file)}`,
                name: file.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim(),
            }))
    } catch {
        avatars = []
    }

    const ugcDir = path.join(process.cwd(), "app/assets/UGC")
    let ugcImages: { src: string; title: string }[] = []
    try {
        const files = await readdir(ugcDir)
        ugcImages = files
            .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
            .sort((a, b) => a.localeCompare(b))
            .map((file) => ({
                src: `/api/ugc-image?name=${encodeURIComponent(file)}`,
                title: file.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim(),
            }))
    } catch {
        ugcImages = []
    }

    return (
        <main className="relative min-h-screen overflow-x-hidden">
            <ScrollToRegisterOnHomeLoad />
            <Navbar />

            <div className="relative w-full">
                <ScrollExpandHero />
                <SocialPresenceSection />
                <VideoShowcaseGrid videos={videos} />
                <FeaturesSection />
                <AvatarShowcase images={avatars} />
                <BrandsMarquee />
                <StatsSection />
                <HowItWorks />
                <TestimonialsSection />
                <VideoRotatingMarquee images={ugcImages} />
                <VisionStatement />
                <CtaBanner />
                <RegisterSection />

                {/* ── Footer ── */}
                <footer className="relative z-20 border-t border-white/10 mag-section-dim backdrop-blur-md">
                    <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">

                        {/* Top grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-16">
                            {/* Brand */}
                            <div className="sm:col-span-1">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/logo-full-white.svg" alt="Magnatic" className="h-7 mb-4" />
                                <p className="font-dm-sans text-white/60 text-sm leading-relaxed max-w-[220px]">
                                    AI avatars, UGC content, and premium product ads — delivered ready to publish.
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
                                        className="w-9 h-9 rounded-lg flex items-center justify-center mag-text-muted text-sm font-semibold transition-all duration-300 hover:text-white hover:bg-[rgba(179,255,118,0.12)] hover:border-[rgba(179,255,118,0.28)] border border-white/8 bg-white/6">
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

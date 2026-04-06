"use client"
import { motion } from "framer-motion"
import Link from "next/link"

/* ── Visual mockups ─────────────────────────────────────────── */

function AvatarGridCard() {
    const avatars = [
        { initials: "ZK", grad: "linear-gradient(135deg,#7C3AED,#3D6EFA)" },
        { initials: "MT", grad: "linear-gradient(135deg,#F96B2A,#FFA040)" },
        { initials: "LW", grad: "linear-gradient(135deg,#3D6EFA,#7C3AED)" },
        { initials: "OS", grad: "linear-gradient(135deg,#FFA040,#F96B2A)" },
        { initials: "PM", grad: "linear-gradient(135deg,#7C3AED,#F96B2A)" },
        { initials: "JR", grad: "linear-gradient(135deg,#3D6EFA,#FFA040)" },
    ]
    return (
        <div className="rounded-2xl p-6 sm:p-8" style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}>
            <p className="font-space-mono text-[10px] tracking-[0.14em] uppercase text-white/65 mb-6 opacity-70">Avatar Studio — 500+ Available</p>
            <div className="grid grid-cols-3 gap-5">
                {avatars.map((av) => (
                    <div key={av.initials} className="flex flex-col items-center gap-2">
                        <div className="relative w-14 h-14 rounded-full flex items-center justify-center font-syne font-bold text-white text-sm" style={{ background: av.grad }}>
                            {av.initials}
                            <span className="absolute -top-1 -right-1 bg-[#F96B2A] font-space-mono text-[6px] text-white px-1 py-0.5 rounded tracking-wider">LIVE</span>
                        </div>
                        <span className="font-dm-sans text-[11px] text-white/65 text-center">{av.initials}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function UrlGeneratorCard() {
    return (
        <div className="rounded-2xl p-6 sm:p-8" style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}>
            <p className="font-space-mono text-[10px] tracking-[0.14em] uppercase text-white/65 mb-6 opacity-70">URL → Video Generator</p>
            <div className="rounded-xl px-4 py-3 flex items-center gap-2 mb-4" style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="font-space-mono text-[#3D6EFA] text-xs">https://</span>
                <span className="font-dm-sans text-white/65 text-sm truncate">yourstore.com/products/amazing-product</span>
            </div>
            <button className="w-full py-2.5 rounded-xl font-dm-sans font-medium text-white text-sm mb-5" style={{ background: "linear-gradient(135deg,#7C3AED,#3D6EFA)" }}>
                Generate 10+ Variations →
            </button>
            {/* Animated progress bar */}
            <div className="rounded-full h-1.5 overflow-hidden mb-3" style={{ background: "rgba(0,0,0,0.2)" }}>
                <div className="h-full rounded-full" style={{ background: "linear-gradient(135deg,#7C3AED,#3D6EFA)", animation: "progAnim 3.2s ease-in-out infinite" }} />
            </div>
            <style>{`@keyframes progAnim { 0%{width:0%} 65%{width:80%} 100%{width:0%} }`}</style>
            <p className="font-space-mono text-[10px] text-white/65 opacity-60">Analyzing product · Generating scripts · Rendering…</p>
        </div>
    )
}

function PlatformCard() {
    const platforms = [
        { name: "TikTok",    color: "#69C9D0", bg: "rgba(105,201,208,0.08)", border: "rgba(105,201,208,0.25)" },
        { name: "Instagram", color: "#E1306C", bg: "rgba(225,48,108,0.08)",  border: "rgba(225,48,108,0.25)"  },
        { name: "YouTube",   color: "#FF4444", bg: "rgba(255,68,68,0.08)",   border: "rgba(255,68,68,0.25)"   },
        { name: "Meta",      color: "#1877F2", bg: "rgba(24,119,242,0.08)",  border: "rgba(24,119,242,0.25)"  },
        { name: "LinkedIn",  color: "#0A66C2", bg: "rgba(10,102,194,0.08)",  border: "rgba(10,102,194,0.25)"  },
        { name: "CTV",       color: "#FFA040", bg: "rgba(255,160,64,0.08)",  border: "rgba(255,160,64,0.25)"  },
    ]
    const formats = [
        { ratio: "9:16 · Vertical",   platforms: "TikTok, Reels",     status: "✓ READY",     statusColor: "#7C3AED" },
        { ratio: "16:9 · Landscape",  platforms: "YouTube, CTV",      status: "✓ READY",     statusColor: "#7C3AED" },
        { ratio: "1:1 · Square",      platforms: "Instagram, Meta",   status: "⟳ RENDERING", statusColor: "#3D6EFA" },
    ]
    return (
        <div className="rounded-2xl p-6 sm:p-8" style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}>
            <p className="font-space-mono text-[10px] tracking-[0.14em] uppercase text-white/65 mb-6 opacity-70">Auto-Format &amp; Publish</p>
            <div className="flex flex-wrap gap-2 mb-6">
                {platforms.map((p) => (
                    <span key={p.name} className="font-dm-sans text-xs font-medium px-3 py-1.5 rounded-full"
                        style={{ color: p.color, background: p.bg, border: `1px solid ${p.border}` }}>
                        {p.name}
                    </span>
                ))}
            </div>
            <div className="flex flex-col gap-2.5">
                {formats.map((f) => (
                    <div key={f.ratio} className="flex items-center justify-between px-3.5 py-2.5 rounded-xl" style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(0,0,0,0.2)" }}>
                        <div>
                            <p className="font-dm-sans text-white text-xs font-medium">{f.ratio}</p>
                            <p className="font-dm-sans text-white/65 text-[11px]">{f.platforms}</p>
                        </div>
                        <span className="font-space-mono text-[10px]" style={{ color: f.statusColor }}>{f.status}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ── Section rows ──────────────────────────────────────────── */

const rows = [
    {
        tag: "Feature 01",
        title: "AI Influencer Videos",
        text: "Choose from 500+ hyper-realistic AI avatars or upload your own brand face. We create scroll-stopping UGC-style content for TikTok, Reels, and Shorts — starred by influencers that never sleep, never cancel, and always stay on brand.",
        visual: <AvatarGridCard />,
        reversed: false,
    },
    {
        tag: "Feature 02",
        title: "URL to Video in Minutes",
        text: "Paste your product URL and Magnatic instantly pulls your images, copy, and pricing to generate 10+ ready-to-run video ad variations. No brief. No back-and-forth. Just results.",
        visual: <UrlGeneratorCard />,
        reversed: true,
    },
    {
        tag: "Feature 03",
        title: "Publish Everywhere, Instantly",
        text: "Export once, run everywhere. Magnatic auto-formats your videos for Meta, TikTok, YouTube, LinkedIn, and CTV — correct specs, captions, and aspect ratios every time.",
        visual: <PlatformCard />,
        reversed: false,
    },
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="relative w-full z-20 py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16 sm:mb-24">
                    <p className="font-space-mono text-[11px] tracking-[0.15em] uppercase text-[#7C3AED] mb-4">How It Works</p>
                    <h2 className="font-syne font-bold text-3xl sm:text-5xl text-white tracking-tight">
                        From Idea to Live Ad in Minutes
                    </h2>
                </div>

                <div className="flex flex-col gap-20 sm:gap-28">
                    {rows.map((row, i) => (
                        <motion.div
                            key={row.tag}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-80px" }}
                            className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${row.reversed ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""}`}
                        >
                            {/* Text */}
                            <div>
                                <p className="font-space-mono text-[11px] tracking-[0.14em] uppercase text-[#7C3AED] mb-3">{row.tag}</p>
                                <h3 className="font-syne font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-5 leading-tight">{row.title}</h3>
                                <p className="font-dm-sans text-white/65 text-base sm:text-lg leading-relaxed mb-7">{row.text}</p>
                                {/* ⚠️ DO NOT MODIFY: triggers Supabase registration flow */}
                                <Link href="/register">
                                    <button className="font-dm-sans font-medium text-white text-sm px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(124,58,237,0.4)]"
                                        style={{ background: "linear-gradient(135deg,#7C3AED,#3D6EFA)" }}>
                                        Try It Free →
                                    </button>
                                </Link>
                            </div>
                            {/* Visual */}
                            <div>{row.visual}</div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

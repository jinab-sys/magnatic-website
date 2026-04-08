"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { influencerPortraitUrl, PUBLIC_INFLUENCERS } from "@/lib/influencers"

/* ── Visual mockups ─────────────────────────────────────────── */

function AvatarGridCard() {
    const showcase = PUBLIC_INFLUENCERS
    return (
        <div className="rounded-2xl p-6 sm:p-8" style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}>
            <p className="mb-6 font-space-mono text-[10px] uppercase tracking-[0.14em] text-white/65 opacity-70 sm:text-[11px]">
                Avatar Studio — Ayla · Maaya · Ayzad · Rayan
            </p>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {showcase.map((inf) => (
                    <a
                        key={inf.handle}
                        href={inf.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-2"
                    >
                        <div className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-white/20">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={influencerPortraitUrl(inf.imageFile)}
                                alt=""
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                            <span className="absolute -top-1 -right-1 rounded bg-[color:var(--mag-accent-to)] px-1 py-0.5 font-space-mono text-[6px] tracking-wider text-white">
                                LIVE
                            </span>
                        </div>
                        <span className="text-center font-syne text-[11px] font-semibold text-white">{inf.niche}</span>
                        <span className="text-center font-dm-sans text-[10px] text-white/65 underline-offset-2 group-hover:text-white group-hover:underline sm:text-[11px]">
                            @{inf.handle}
                        </span>
                    </a>
                ))}
            </div>
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
        { name: "CTV",       color: "#a3d636", bg: "rgba(163,230,53,0.08)", border: "rgba(163,230,53,0.22)" },
    ]
    const formats = [
        { ratio: "9:16 · Vertical",   platforms: "TikTok, Reels",     status: "✓ READY",     statusColor: "#4d7c0f" },
        { ratio: "16:9 · Landscape",  platforms: "YouTube, CTV",      status: "✓ READY",     statusColor: "#4d7c0f" },
        { ratio: "1:1 · Square",      platforms: "Instagram, Meta",   status: "⟳ RENDERING", statusColor: "#65a30d" },
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
        title: "AI Influencer Videos",
        text: "Start from our flagship personas — Ayla, Maaya, Ayzad, and Rayan — each with a dedicated look from our library and a live Instagram profile, or bring your own brand face. We produce UGC-style content for TikTok, Reels, and Shorts.",
        visual: <AvatarGridCard />,
        reversed: false,
    },
    {
        title: "Publish Everywhere, Instantly",
        text: "Export once, run everywhere. Magnatic auto-formats your videos for Meta, TikTok, YouTube, LinkedIn, and CTV — correct specs, captions, and aspect ratios every time.",
        visual: <PlatformCard />,
        reversed: true,
    },
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="relative w-full z-20 py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16 sm:mb-24">
                    <p className="font-space-mono text-[11px] tracking-[0.15em] uppercase mag-eyebrow mb-4">How It Works</p>
                    <h2 className="font-syne font-bold text-3xl sm:text-5xl text-white tracking-tight">
                        From Idea to Live Ad in Minutes
                    </h2>
                </div>

                <div className="flex flex-col gap-20 sm:gap-28">
                    {rows.map((row) => (
                        <motion.div
                            key={row.title}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-80px" }}
                            className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${row.reversed ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""}`}
                        >
                            {/* Text */}
                            <div>
                                <h3 className="font-syne font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-5 leading-tight">{row.title}</h3>
                                <p className="font-dm-sans text-white/65 text-base sm:text-lg leading-relaxed mb-7">{row.text}</p>
                                <Link href="/#register">
                                    <button type="button" className="mag-btn-primary font-dm-sans font-medium text-white text-sm px-6 py-3 rounded-full hover:scale-105">
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

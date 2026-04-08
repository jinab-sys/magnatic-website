"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import {
    gradientForIndex,
    influencerPortraitUrl,
    initialsFromHandle,
    INFLUENCER_COUNT,
    PUBLIC_INFLUENCERS,
} from "@/lib/influencers"

const CARD_W = 220 + 24 // card width + gap

export function AvatarCarousel() {
    const trackRef = useRef<HTMLDivElement>(null)
    const indexRef = useRef(0)

    function scroll(dir: 1 | -1) {
        const track = trackRef.current
        if (!track?.parentElement) return
        const visible = Math.floor(track.parentElement.offsetWidth / CARD_W)
        const max = Math.max(0, PUBLIC_INFLUENCERS.length - visible)
        indexRef.current = Math.max(0, Math.min(indexRef.current + dir, max))
        track.style.transform = `translateX(-${indexRef.current * CARD_W}px)`
    }

    return (
        <section id="avatars" className="relative z-20 w-full overflow-hidden py-20 sm:py-28 mag-section-dim">
            <div
                className="mag-blob mag-blob-a h-[400px] w-[400px]"
                style={{ top: "-60px", right: "8%", animationDelay: "1.5s" }}
            />

            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <p className="mb-4 font-space-mono text-[11px] uppercase tracking-[0.15em] mag-eyebrow">Our roster</p>
                    <h2 className="mb-4 font-syne text-3xl font-bold tracking-tight text-white sm:text-5xl">Meet the AI creators</h2>
                    <p className="font-dm-sans text-lg text-white/65">
                        {INFLUENCER_COUNT} flagship personas we showcase (Ayla, Maaya, Ayzad, Rayan)—each with a live Instagram presence we help run. Open a card to view their profiles.
                    </p>
                </motion.div>

                <div className="relative overflow-hidden">
                    <div
                        ref={trackRef}
                        className="flex gap-6 py-4"
                        style={{ transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)" }}
                    >
                        {PUBLIC_INFLUENCERS.map((inf, i) => (
                            <motion.a
                                key={inf.handle}
                                href={inf.instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.4) }}
                                viewport={{ once: true }}
                                className="w-[220px] shrink-0 cursor-pointer rounded-2xl p-7 text-center"
                                style={{
                                    background: "rgba(0,0,0,0.25)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    backdropFilter: "blur(12px)",
                                    transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                                }}
                                whileHover={{
                                    y: -8,
                                    borderColor: "rgba(163,230,53,0.38)",
                                    boxShadow: "0 20px 50px rgba(163,230,53,0.12)",
                                }}
                            >
                                {inf.imageFile ? (
                                    <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full ring-2 ring-white/15">
                                        {/* eslint-disable-next-line @next/next/no-img-element -- local assets via same-origin API */}
                                        <img
                                            src={influencerPortraitUrl(inf.imageFile)}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full font-syne text-2xl font-bold text-white"
                                        style={{ background: gradientForIndex(i) }}
                                    >
                                        {initialsFromHandle(inf.handle)}
                                    </div>
                                )}
                                <p className="mb-1 font-syne text-base font-bold text-white">{inf.niche}</p>
                                <p className="mb-3 font-dm-sans text-sm text-white/60">@{inf.handle}</p>
                                <span
                                    className="inline-block rounded-full px-3 py-1 font-dm-sans text-xs text-white/65"
                                    style={{
                                        background: "rgba(163,230,53,0.09)",
                                        border: "1px solid rgba(163,230,53,0.22)",
                                    }}
                                >
                                    View on Instagram
                                </span>
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-3">
                    {(["←", "→"] as const).map((arrow, i) => (
                        <button
                            key={arrow}
                            type="button"
                            onClick={() => scroll(i === 0 ? -1 : 1)}
                            className="flex h-12 w-12 items-center justify-center rounded-full text-lg text-white transition-all duration-300 hover:bg-[rgba(163,230,53,0.14)] hover:border-[rgba(163,230,53,0.35)]"
                            style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                            {arrow}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}

"use client"

import { motion } from "framer-motion"
import Link from "next/link"

/** Chunky pixel “greater than” for the hero CTA (7×6 grid). */
function PixelChevron({ className }: { className?: string }) {
    const filled = new Set([
        "0,0", "1,0", "2,0",
        "2,1", "3,1", "4,1",
        "4,2", "5,2", "6,2",
        "4,3", "5,3", "6,3",
        "2,4", "3,4", "4,4",
        "0,5", "1,5", "2,5",
    ])
    const rects = []
    for (let y = 0; y < 6; y++) {
        for (let x = 0; x < 7; x++) {
            if (filled.has(`${x},${y}`)) {
                rects.push(
                    <rect key={`${x}-${y}`} x={x} y={y} width={0.92} height={0.92} fill="currentColor" rx={0.08} />,
                )
            }
        }
    }
    return (
        <svg viewBox="-0.5 -0.5 7 6" className={className} aria-hidden>
            {rects}
        </svg>
    )
}

export function ScrollExpandHero() {
    const kpis = [
        { label: "Models, influencers & creators", value: "AI" },
        { label: "Social accounts we run & grow", value: "Social" },
        { label: "Product shoots, edited for you", value: "Ads" },
    ]

    return (
        <section className="relative w-full overflow-hidden pb-10 pt-28 md:pt-34">
            <div className="mag-blob mag-blob-a h-[520px] w-[520px]" style={{ left: "-180px", top: "-120px" }} />
            <div className="mag-blob mag-blob-b h-[420px] w-[420px]" style={{ right: "-130px", top: "20px", animationDelay: "3.5s" }} />

            <div className="relative z-20 mx-auto w-full max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="mx-auto max-w-4xl text-center"
                >
                    <p className="mx-auto mb-5 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-space-mono text-[11px] uppercase tracking-[0.2em] text-white/80">
                        AI Ads That Win
                    </p>
                    <h1 className="font-syne text-4xl font-bold leading-[0.95] tracking-tight text-white md:text-6xl lg:text-8xl">
                        Turn any product
                        <span className="block text-white/85">into a winning ad</span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl font-dm-sans text-base text-white/72 md:text-lg">
                        Generate influencer-style videos in minutes, launch creative variations, and scale what converts. We can also plan and manage your social media calendars ideas through creation and scheduled posting.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
                    className="mx-auto mt-10 flex flex-col items-center gap-3"
                >
                    <Link
                        href="/#register"
                        aria-label="Contact Us"
                        className="relative inline-flex max-w-full items-stretch overflow-hidden rounded-2xl border border-white/10 bg-[#060607] shadow-[0_20px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 hover:border-[rgba(255,215,0,0.3)] hover:shadow-[0_24px_72px_rgba(255,215,0,0.1)]"
                    >
                        <span
                            className="relative m-1.5 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--mag-accent-from)] to-[color:var(--mag-accent-to)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] ring-1 ring-white/10"
                            aria-hidden
                        >
                            <PixelChevron className="h-[22px] w-[26px] text-black drop-shadow-sm" />
                        </span>
                        <span className="flex min-h-[52px] items-center pr-8 pl-3 sm:pr-10">
                            <span className="font-space-mono text-[12px] font-medium uppercase tracking-[0.28em] text-white sm:text-[13px]">
                                Contact Us
                            </span>
                        </span>
                    </Link>
                    <p className="font-dm-sans text-xs text-white/50">No credit card required · Get in touch</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3"
                >
                    {kpis.map((kpi) => (
                        <div key={kpi.label} className="rounded-2xl border border-white/12 bg-black/30 px-5 py-4 text-center backdrop-blur-md">
                            <p className="font-syne text-2xl font-bold text-white md:text-3xl">{kpi.value}</p>
                            <p className="mt-1 font-space-mono text-[10px] uppercase tracking-[0.18em] text-white/60">{kpi.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

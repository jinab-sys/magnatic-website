"use client"

import { motion } from "framer-motion"
import { scrollToRegisterForm } from "@/lib/scroll-to-register"

/** Chunky pixel "greater than" for the hero CTA (7×6 grid). */
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
        <section className="relative w-full overflow-hidden pb-14 pt-28 md:pb-16 md:pt-34">
            <div className="mag-blob mag-blob-a h-[520px] w-[520px]" style={{ left: "-180px", top: "-120px" }} />
            <div className="mag-blob mag-blob-b h-[420px] w-[420px]" style={{ right: "-130px", top: "20px", animationDelay: "3.5s" }} />

            {/* Soft spotlight behind hero content */}
            <div
                className="pointer-events-none absolute left-1/2 top-[28%] z-10 h-[min(520px,85vw)] w-[min(900px,120%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(179,255,118,0.07)_0%,transparent_62%)]"
                aria-hidden
            />

            <div className="relative z-20 mx-auto w-full max-w-7xl px-6">
                {/* Primary CTA + microcopy */}

                {/* KPI cards */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.28, ease: "easeOut" }}
                    className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-3"
                >
                    {kpis.map((kpi, i) => (
                        <motion.div
                            key={kpi.label}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.35 + i * 0.07, ease: "easeOut" }}
                            className="group relative overflow-hidden rounded-2xl border border-white/12 bg-linear-to-b from-white/7 to-black/25 px-5 py-5 text-center shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-300 hover:border-[rgba(179,255,118,0.22)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.45)] md:py-5"
                        >
                            <div
                                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[rgba(179,255,118,0.35)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                aria-hidden
                            />
                            <div
                                className="absolute left-0 top-0 h-full w-[3px] bg-white/10 transition-colors duration-300 group-hover:bg-(--mag-accent-from)"
                                aria-hidden
                            />
                            <p className="font-syne text-2xl font-bold tracking-tight text-white md:text-3xl">{kpi.value}</p>
                            <p className="mt-2 font-space-mono text-[10px] uppercase leading-snug tracking-[0.18em] text-white/60">
                                {kpi.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Secondary CTA — same destination, calmer treatment */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.58, ease: "easeOut" }}
                    className="mx-auto mt-10 flex flex-col items-center sm:mt-12"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
                        className="mx-auto flex max-w-lg flex-col items-center gap-4 text-center"
                    >
                        <button
                            type="button"
                            aria-label="Contact Us"
                            onClick={() => scrollToRegisterForm()}
                            className="group relative inline-flex max-w-full cursor-pointer items-stretch overflow-hidden rounded-2xl border border-white/10 bg-[#060607]/90 text-left shadow-[0_20px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition duration-300 hover:border-[rgba(179,255,118,0.35)] hover:shadow-[0_24px_72px_rgba(179,255,118,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(179,255,118,0.5)]"
                        >
                            <span
                                className="relative m-1.5 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-(--mag-accent-from) to-(--mag-accent-to) shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-[1.02]"
                                aria-hidden
                            >
                                <PixelChevron className="h-[22px] w-[26px] text-black drop-shadow-sm" />
                            </span>
                            <span className="flex min-h-[52px] items-center pr-8 pl-3 sm:pr-10">
                                <span className="font-space-mono text-[12px] font-medium uppercase tracking-[0.28em] text-white sm:text-[13px]">
                                    Contact Us
                                </span>
                            </span>
                        </button>
                        <p className="max-w-[280px] font-dm-sans text-xs leading-relaxed text-white/50">
                            No credit card required · Get in touch
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

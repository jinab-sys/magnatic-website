"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function ScrollExpandHero() {
    const kpis = [
        { label: "Ads Analyzed", value: "20M+" },
        { label: "Videos Created", value: "10M+" },
        { label: "Campaign Spend", value: "$650M+" },
    ]

    return (
        <section className="relative w-full overflow-hidden pb-10 pt-28 md:pt-34">
            <div className="mag-blob h-[520px] w-[520px] bg-[#7C3AED]" style={{ left: "-180px", top: "-120px" }} />
            <div className="mag-blob h-[420px] w-[420px] bg-[#3D6EFA]" style={{ right: "-130px", top: "20px", animationDelay: "3.5s" }} />

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
                        Generate influencer-style videos in minutes, launch creative variations, and scale what converts.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
                    className="mx-auto mt-8 max-w-3xl rounded-2xl border border-white/15 bg-black/35 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl"
                >
                    <div className="flex flex-col gap-3 md:flex-row">
                        <input
                            type="text"
                            placeholder="Paste a product URL to generate ad concepts..."
                            className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 font-dm-sans text-sm text-white placeholder:text-white/45 outline-none focus:border-white/30"
                        />
                        <Link href="/register" className="shrink-0">
                            <button
                                className="h-12 w-full rounded-xl px-6 font-dm-sans text-sm font-semibold text-white transition hover:scale-[1.01] md:w-auto"
                                style={{ background: "linear-gradient(135deg,#7C3AED,#3D6EFA)" }}
                            >
                                Create Your First Ad
                            </button>
                        </Link>
                    </div>
                    <p className="px-1 pt-2 font-dm-sans text-xs text-white/55">No credit card required. Instant preview generation.</p>
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

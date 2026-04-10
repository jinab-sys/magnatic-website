"use client"
import { motion } from "framer-motion"
import Link from "next/link"

const steps = [
    {
        n: "01",
        title: "Input your URL",
        body: "Drop your website link and our AI learns your brand in minutes.",
        preview: (
            <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                <div className="mb-3 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[rgba(179,255,118,0.75)]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                </div>
                <div className="rounded-xl border border-[rgba(179,255,118,0.5)] bg-black/60 px-4 py-3 font-dm-sans text-sm text-white/80">
                    www.yourbrand.com
                </div>
                <div className="mt-3 grid grid-cols-5 gap-2">
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <div key={idx} className="h-8 rounded-md border border-white/10 bg-white/5" />
                    ))}
                </div>
            </div>
        ),
    },
    {
        n: "02",
        title: "Swipe ideas",
        body: "Get fresh content directions daily and pick what fits your campaign goals.",
        preview: (
            <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                <div className="h-40 rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="h-4 w-24 rounded-full bg-white/15" />
                    <div className="mt-3 h-20 rounded-lg border border-white/10 bg-black/25" />
                </div>
                <div className="mt-4 flex items-center gap-3">
                    <div className="rounded-full border border-white/15 px-4 py-1.5 text-xs text-white/70">Skip</div>
                    <div className="rounded-full border border-[rgba(179,255,118,0.48)] bg-[rgba(179,255,118,0.16)] px-4 py-1.5 text-xs text-[rgba(225,255,204,0.96)]">
                        Keep
                    </div>
                </div>
            </div>
        ),
    },
    {
        n: "03",
        title: "Edit & customize",
        body: "Change copy, visuals, and direction with simple controls. No design skills needed.",
        preview: (
            <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                <div className="grid grid-cols-[1.4fr_1fr] gap-3">
                    <div className="h-32 rounded-xl border border-white/10 bg-white/5" />
                    <div className="space-y-3">
                        <div className="h-9 rounded-lg border border-white/10 bg-white/5" />
                        <div className="h-9 rounded-lg border border-white/10 bg-white/5" />
                        <div className="h-9 rounded-lg border border-[rgba(179,255,118,0.42)] bg-[rgba(179,255,118,0.14)]" />
                    </div>
                </div>
            </div>
        ),
    },
    {
        n: "04",
        title: "Download & publish",
        body: "Launch more content faster across socials, ads, and outbound campaigns.",
        preview: (
            <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                <div className="h-12 rounded-xl border border-[rgba(179,255,118,0.45)] bg-[rgba(179,255,118,0.13)]" />
                <div className="mt-3 h-8 w-3/4 rounded-lg border border-white/10 bg-white/5" />
                <div className="mt-2 h-8 w-2/3 rounded-lg border border-white/10 bg-white/5" />
            </div>
        ),
    },
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="relative w-full z-20 py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-14 sm:mb-20">
                    <p className="font-space-mono text-[11px] tracking-[0.15em] uppercase text-[rgba(179,255,118,0.82)] mb-4">
                        How It Works
                    </p>
                    <h3 className="font-syne font-bold text-3xl sm:text-5xl text-white tracking-tight">
                        Build content in 4 steps
                    </h3>
                    <p className="mx-auto mt-4 max-w-2xl font-dm-sans text-base text-white/65 sm:text-lg">
                        Inspired by the same simple workflow style: fast setup, fast output, premium results.
                    </p>
                </div>

                <div className="relative mx-auto max-w-5xl space-y-10">
                    <div className="absolute left-[26px] top-2 hidden h-[calc(100%-1rem)] w-px bg-[rgba(179,255,118,0.45)] sm:block" />
                    {steps.map((step) => (
                        <motion.article
                            key={step.n}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-80px" }}
                            className="grid grid-cols-1 items-start gap-6 sm:grid-cols-[auto_1fr]"
                        >
                            <div className="flex items-center gap-4 sm:gap-5">
                                <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(179,255,118,0.5)] bg-black font-space-mono text-sm font-bold text-[rgba(225,255,204,0.96)]">
                                    {step.n}
                                </div>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6">
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.1fr_1fr] md:items-center">
                                    <div>
                                        <h4 className="font-syne text-2xl font-bold text-white">{step.title}</h4>
                                        <p className="mt-2 font-dm-sans text-white/65">{step.body}</p>
                                    </div>
                                    <div>{step.preview}</div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="mt-14 flex justify-center">
                    <Link href="/#register">
                        <button type="button" className="mag-btn-primary px-7 py-3 font-dm-sans text-sm font-semibold rounded-full hover:scale-[1.02]">
                            Start your content engine
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

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
                Instagram · TikTok · YouTube · X — Ayla · Maaya · Ayzad · Rayan
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
                        <div className="relative h-20 w-20 overflow-hidden rounded-full ring-1 ring-white/20">
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

function ProductAdStepsCard() {
    const steps = [
        {
            n: "1",
            title: "Give us your product",
            body: "Send what you want featured—we’ll build the ad around it.",
        },
        {
            n: "2",
            title: "Choose your AI model",
            body: "Pick from our roster or request a custom model tailored to your brand (custom work may cost extra).",
        },
        {
            n: "3",
            title: "Receive your finished ad",
            body: "Edited to your brief—ready to promote, with no one from your team on camera.",
        },
    ]
    return (
        <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}
        >
            <p className="mb-6 font-space-mono text-[10px] uppercase tracking-[0.14em] text-white/65 opacity-70">
                Product ad creation
            </p>
            <div className="flex flex-col gap-4">
                {steps.map((s) => (
                    <div
                        key={s.n}
                        className="flex gap-4 rounded-xl border border-white/10 bg-black/20 px-4 py-3 sm:px-5 sm:py-4"
                    >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-space-mono text-xs font-bold text-white mag-gradient-fill">
                            {s.n}
                        </span>
                        <div>
                            <p className="font-syne text-sm font-semibold text-white sm:text-base">{s.title}</p>
                            <p className="mt-1 font-dm-sans text-[13px] leading-relaxed text-white/65">{s.body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function SocialCalendarCard() {
    const days = [
        { d: "Mon", label: "Idea", tone: "bg-white/[0.07]" },
        { d: "Tue", label: "Create", tone: "mag-gradient-fill" },
        { d: "Wed", label: "Review", tone: "bg-white/[0.07]" },
        { d: "Thu", label: "Publish", tone: "bg-white/[0.07]" },
    ]
    return (
        <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}
        >
            <p className="mb-6 font-space-mono text-[10px] uppercase tracking-[0.14em] text-white/65 opacity-70">
                Social calendar
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-2">
                {days.map((x) => (
                    <div
                        key={x.d}
                        className="flex flex-col rounded-xl border border-white/10 bg-black/25 px-3 py-3"
                    >
                        <p className="font-space-mono text-[9px] uppercase tracking-wider text-white/45">{x.d}</p>
                        <div
                            className={`mt-2 flex min-h-[40px] items-center justify-center rounded-lg px-2 py-2 text-center font-dm-sans text-[11px] font-medium text-white ${x.tone}`}
                        >
                            {x.label}
                        </div>
                    </div>
                ))}
            </div>
            <p className="mt-5 font-dm-sans text-[11px] leading-relaxed text-white/55">
                From brainstorm to scheduled posts—we handle the loop so you don&apos;t have to.
            </p>
        </div>
    )
}

/* ── Section rows ──────────────────────────────────────────── */

const rows = [
    {
        title: "AI models & influencers",
        text: "We run a roster of AI models, influencers, and content creators—and we manage and grow their Instagram accounts. Brands tap that presence for premium promotional content without booking traditional talent or shipping giant PR kits.",
        visual: <AvatarGridCard />,
        reversed: false,
    },
    {
        title: "Product ad creation",
        text: "Give us your product, choose any of our AI models (or commission a custom one), and receive a finished ad promoting it—edited based on your needs. No pitching influencers, no heavy branding retainers: one straightforward pipeline from product to polished spot.",
        visual: <ProductAdStepsCard />,
        reversed: true,
    },
    {
        title: "Social media calendars",
        text: "Beyond one-off ads, we can run your social presence on a calendar: ideas, creative production, and posting—managed end to end so content ships on schedule and your team isn’t stuck in spreadsheets.",
        visual: <SocialCalendarCard />,
        reversed: false,
    },
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="relative w-full z-20 py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16 sm:mb-24">
                    <p className="font-space-mono text-[11px] tracking-[0.15em] uppercase mag-eyebrow mb-4">At a glance</p>
                    <h2 className="font-syne font-bold text-3xl sm:text-5xl text-white tracking-tight">
                        From product to polished ad
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl font-dm-sans text-base text-white/65 sm:text-lg">
                        Premium ads and optional ongoing social calendars—ideation through publishing—without anyone from your team on camera.
                    </p>
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
                                    <button type="button" className="mag-btn-primary font-dm-sans font-medium text-black text-sm px-6 py-3 rounded-full hover:scale-105">
                                        Contact Us →
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

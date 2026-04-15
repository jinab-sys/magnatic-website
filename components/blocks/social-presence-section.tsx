"use client"

import { motion } from "framer-motion"
import { scrollToRegisterForm } from "@/lib/scroll-to-register"


const painPoints = [
    {
        n: "01",
        label: "Camera Shy?",
        text: "You're camera-shy and don't want to be the face of your brand",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                <line x1="18" y1="4" x2="22" y2="4" />
                <line x1="20" y1="2" x2="20" y2="6" />
            </svg>
        ),
    },
    {
        n: "02",
        label: "Too Busy?",
        text: "You don't have the bandwidth to shoot, edit, and post consistently",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
                <path d="M6 8h.01M10 8h8M6 11h.01M10 11h8" />
            </svg>
        ),
    },
    {
        n: "03",
        label: "Overpaying?",
        text: "You're tired of paying premium rates for influencers with average results",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ),
    },
    {
        n: "04",
        label: "Need a Catalog?",
        text: "You have no idea how to leverage AI creators for your business",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M12 2a10 10 0 1 0 10 10" />
                <path d="M12 6v6l4 2" />
                <path d="M18 2v4h4" />
            </svg>
        ),
    },
]

export function SocialPresenceSection() {
    return (
        <section className="relative w-full z-20 flex flex-col items-center px-4 sm:px-6 py-20 sm:py-28">

            {/* eyebrow */}
            <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="font-space-mono text-[11px] font-semibold uppercase tracking-[0.2em] mb-5"
                style={{ color: "var(--mag-accent-from)" }}
            >
                Social Media Growth
            </motion.p>

            {/* headline */}
            <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.05 }}
                viewport={{ once: true }}
                className="font-syne font-black text-white text-center leading-[1.06] tracking-tight mb-4"
                style={{ fontSize: "clamp(38px, 6vw, 66px)", letterSpacing: "-0.025em" }}
            >
                No social media<br />presence?
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="font-syne font-black text-3xl sm:text-4xl mb-8"
                style={{ color: "#fff" }}
            >
                We got you.
            </motion.p>

            {/* Book a Meeting button */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                viewport={{ once: true }}
                className="mb-12"
            >
                <button
                    type="button"
                    onClick={() => scrollToRegisterForm()}
                    className="cursor-pointer font-dm-sans font-extrabold text-[13px] uppercase tracking-[0.08em] px-8 py-3 rounded-full transition-all duration-150 hover:opacity-85 hover:scale-[1.04]"
                    style={{ background: "var(--mag-accent-from)", color: "#0c0c0c" }}
                >
                    Book a Meeting
                </button>
            </motion.div>

            {/* cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-[1400px]">
                {painPoints.map((p, i) => (
                    <motion.div
                        key={p.n}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        viewport={{ once: true }}
                        className="group relative flex flex-col rounded-2xl overflow-hidden cursor-default"
                        style={{ background: "#0e0e0e", border: "0.5px solid #222", transition: "border-color 0.25s, background 0.25s" }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(179,255,118,0.25)"
                            ;(e.currentTarget as HTMLElement).style.background = "#121212"
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = "#222"
                            ;(e.currentTarget as HTMLElement).style.background = "#0e0e0e"
                        }}
                    >
                        {/* top accent line */}
                        <div
                            className="absolute inset-x-0 top-0 h-[2px] transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                            style={{ background: "linear-gradient(90deg, transparent, var(--mag-accent-from), transparent)" }}
                            aria-hidden
                        />

                        <div className="flex flex-col gap-5 px-7 py-8 flex-1">
                            {/* icon */}
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-250"
                                style={{ background: "#1a1a1a", border: "0.5px solid #333", color: "#fff" }}
                                ref={el => {
                                    if (!el) return
                                    const card = el.closest(".group")!
                                    card.addEventListener("mouseenter", () => {
                                        el.style.borderColor = "rgba(179,255,118,0.2)"
                                        el.style.background = "rgba(179,255,118,0.07)"
                                        el.style.color = "var(--mag-accent-from)"
                                    })
                                    card.addEventListener("mouseleave", () => {
                                        el.style.borderColor = "#333"
                                        el.style.background = "#1a1a1a"
                                        el.style.color = "#fff"
                                    })
                                }}
                            >
                                {p.icon}
                            </div>

                            {/* text */}
                            <div className="flex flex-col gap-3">
                                <p
                                    className="font-syne text-[17px] font-extrabold uppercase tracking-[0.08em] transition-colors duration-250"
                                    style={{ color: "#fff" }}
                                    ref={el => {
                                        if (!el) return
                                        const card = el.closest(".group")!
                                        card.addEventListener("mouseenter", () => el.style.color = "var(--mag-accent-from)")
                                        card.addEventListener("mouseleave", () => el.style.color = "#fff")
                                    }}
                                >
                                    {p.label}
                                </p>
                                <p className="font-dm-sans text-[15px] leading-[1.65]" style={{ color: "#fff" }}>
                                    {p.text}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CTA area */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-16 flex flex-col items-center gap-4 text-center"
            >
                <p className="font-space-mono text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--mag-accent-from)" }}>
                    The solution
                </p>
                <img src="/logo-full-white.svg" alt="Magnatic" className="h-10 sm:h-14" />
                <p className="font-dm-sans text-sm max-w-[340px]" style={{ color: "#fff" }}>
                    Let us handle the content — you focus on growing your business.
                </p>
            </motion.div>

            {/* KPI cards */}
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mx-auto mt-12 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3"
            >
                {[
                    { label: "AI avatars & influencers, for your ad creation", value: "AI" },
                    { label: "Proper UGC content for your social channels", value: "Social" },
                    { label: "Product shoots, edited for you", value: "Ads" },
                ].map((kpi, i) => (
                    <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.15 + i * 0.07, ease: "easeOut" }}
                        viewport={{ once: true }}
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
                        <p className="mt-2 font-space-mono text-[10px] font-bold uppercase leading-snug tracking-[0.18em] text-white">
                            {kpi.label}
                        </p>
                    </motion.div>
                ))}
            </motion.div>

        </section>
    )
}

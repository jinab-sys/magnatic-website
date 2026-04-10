"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const painPoints = [
    {
        n: "01",
        label: "Camera Shy",
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
        label: "No Bandwidth",
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
        label: "Overpaying",
        text: "You're tired of paying premium rates for influencers with average results",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ),
    },
    {
        n: "04",
        label: "AI Creators",
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
        <section className="relative w-full z-20 flex flex-col items-center px-6 py-20 sm:py-28">

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
                className="font-dm-sans text-lg mb-16"
                style={{ color: "#555" }}
            >
                You&apos;re not alone.
            </motion.p>

            {/* cards */}
            <div className="flex flex-col gap-3.5 w-full max-w-[700px]">
                {painPoints.map((p, i) => (
                    <motion.div
                        key={p.n}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        viewport={{ once: true }}
                        className="group flex items-stretch rounded-2xl overflow-hidden cursor-default"
                        style={{ background: "#131313", border: "0.5px solid #252525", transition: "border-color 0.2s, background 0.2s" }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,215,0,0.27)"
                            ;(e.currentTarget as HTMLElement).style.background = "#161616"
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = "#252525"
                            ;(e.currentTarget as HTMLElement).style.background = "#131313"
                        }}
                    >
                        {/* accent bar */}
                        <div
                            className="w-[3px] shrink-0 self-stretch transition-colors duration-200"
                            style={{ background: "#232323" }}
                            ref={el => {
                                if (!el) return
                                const card = el.parentElement!
                                card.addEventListener("mouseenter", () => el.style.background = "var(--mag-accent-from)")
                                card.addEventListener("mouseleave", () => el.style.background = "#232323")
                            }}
                        />

                        <div className="flex items-center gap-[18px] px-6 py-[22px] flex-1">
                            {/* icon */}
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                                style={{ background: "#1c1c1c", border: "0.5px solid #2e2e2e", color: "#555" }}
                                ref={el => {
                                    if (!el) return
                                    const card = el.closest(".group")!
                                    card.addEventListener("mouseenter", () => {
                                        el.style.borderColor = "rgba(255,215,0,0.2)"
                                        el.style.background = "rgba(255,215,0,0.07)"
                                        el.style.color = "var(--mag-accent-from)"
                                    })
                                    card.addEventListener("mouseleave", () => {
                                        el.style.borderColor = "#2e2e2e"
                                        el.style.background = "#1c1c1c"
                                        el.style.color = "#555"
                                    })
                                }}
                            >
                                {p.icon}
                            </div>

                            {/* text */}
                            <div className="flex-1">
                                <p
                                    className="font-space-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-[5px] transition-colors duration-200"
                                    style={{ color: "#3a3a3a" }}
                                    ref={el => {
                                        if (!el) return
                                        const card = el.closest(".group")!
                                        card.addEventListener("mouseenter", () => el.style.color = "var(--mag-accent-from)")
                                        card.addEventListener("mouseleave", () => el.style.color = "#3a3a3a")
                                    }}
                                >
                                    {p.n} &nbsp;/&nbsp; {p.label}
                                </p>
                                <p className="font-dm-sans text-[15px] leading-[1.55]" style={{ color: "#bbb" }}>
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
                <p className="font-space-mono text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#333" }}>
                    The solution
                </p>
                <p
                    className="font-syne font-black leading-[1.1] tracking-tight"
                    style={{ fontSize: "clamp(28px, 5vw, 44px)", color: "var(--mag-accent-from)", letterSpacing: "-0.02em" }}
                >
                    We&apos;ve got you covered.
                </p>
                <p className="font-dm-sans text-sm max-w-[340px]" style={{ color: "#444" }}>
                    Let us handle the content — you focus on growing your business.
                </p>
                <Link href="/#register">
                    <button
                        type="button"
                        className="mt-2 font-dm-sans font-extrabold text-[13px] uppercase tracking-[0.06em] px-9 py-3.5 rounded-full transition-all duration-150 hover:opacity-85 hover:scale-[1.04]"
                        style={{ background: "var(--mag-accent-from)", color: "#0c0c0c" }}
                    >
                        Get Started Today
                    </button>
                </Link>
            </motion.div>
        </section>
    )
}

"use client"
import { motion } from "framer-motion"

const stats = [
    {
        value: "300+",
        label: "Ads Created",
        detail: "High-converting, influencer-style ad films produced and published",
    },
    {
        value: "100+",
        label: "Brands & Businesses",
        detail: "From early-stage startups to established consumer brands",
    },
    {
        value: "1,000+",
        label: "AI Creator Avatars",
        detail: "Unique social media personas built, managed, and grown",
    },
]

export function StatsSection() {
    return (
        <section id="stats" className="relative w-full z-20 py-20 sm:py-28 border-t border-white/5 overflow-hidden">

            {/* subtle background glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,215,0,0.04), transparent 70%)",
                }}
            />

            <div className="max-w-7xl mx-auto px-6">

                {/* eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="font-space-mono text-[11px] tracking-[0.22em] uppercase text-center mb-16 sm:mb-20"
                    style={{ color: "var(--mag-accent-from)" }}
                >
                    By the numbers
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/8">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: i * 0.12, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-60px" }}
                            className="flex flex-col items-center text-center px-14 py-12 sm:py-4 gap-4"
                        >
                            {/* big number */}
                            <span
                                className="font-syne font-black leading-none tracking-tight"
                                style={{
                                    fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
                                    color: "var(--mag-accent-from)",
                                    textShadow: "0 0 60px rgba(255,215,0,0.18)",
                                }}
                            >
                                {s.value}
                            </span>

                            {/* label */}
                            <span className="font-syne font-bold text-white text-lg sm:text-xl tracking-wide">
                                {s.label}
                            </span>

                            {/* detail */}
                            <span className="font-dm-sans text-sm text-white/50 leading-relaxed max-w-[220px]">
                                {s.detail}
                            </span>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

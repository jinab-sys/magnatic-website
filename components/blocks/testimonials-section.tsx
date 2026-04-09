"use client"
import { motion } from "framer-motion"

const testimonials = [
    {
        quote: "We went from 0 to 40 video ads in a single afternoon. Our TikTok ROAS tripled in week one.",
        name: "Sarah L.",   role: "Head of Growth · NovaSkin",    initials: "SL",
    },
    {
        quote: "The AI avatars look insanely real. Engagement went through the roof and our CPM dropped 60%.",
        name: "James M.",  role: "CMO · PeakFit",                 initials: "JM",
    },
    {
        quote: "Magnatic cut our video production costs by 90%. We ship 3x more creative every month now.",
        name: "Aisha R.",  role: "Marketing Director · Lumora Beauty", initials: "AR",
    },
    {
        quote: "We shipped our product, picked a creator from their roster, and got a finished ad—no shoot, no one from our side on camera.",
        name: "Tom H.",    role: "Founder · Driftly",              initials: "TH",
    },
    {
        quote: "Finally an alternative to cold-DMing influencers and sending massive PR boxes. Magnatic feels like a real production partner.",
        name: "Nina C.",   role: "Social Media Lead · UrbanKicks", initials: "NC",
    },
    {
        quote: "We tested 50 ad variations in one week, found our winner, and ROAS went up 280%.",
        name: "Raj P.",    role: "Performance Lead · ZestBox",     initials: "RP",
    },
]

export function TestimonialsSection() {
    return (
        <section id="testimonials" className="relative w-full z-20 py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <p className="font-space-mono text-[11px] tracking-[0.15em] uppercase mag-eyebrow mb-4">Social Proof</p>
                    <h2 className="font-syne font-bold text-3xl sm:text-5xl text-white tracking-tight">
                        Brands Love Magnatic
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.initials}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="flex flex-col p-7 rounded-2xl group"
                            style={{
                                background: "rgba(0,0,0,0.25)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                backdropFilter: "blur(12px)",
                                transition: "transform 0.3s ease, border-color 0.3s ease",
                            }}
                            whileHover={{ y: -4, borderColor: "rgba(179,255,118,0.35)" }}
                        >
                            <div className="mag-star-rating text-base tracking-widest mb-4">★★★★★</div>
                            <p className="font-dm-sans text-white text-[15px] leading-relaxed italic flex-1 mb-6">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-syne text-sm font-bold text-(--mag-accent-on-accent) ring-1 ring-[rgba(179,255,118,0.35)]"
                                    style={{ background: "var(--mag-accent)" }}
                                >
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="font-syne font-bold text-white text-sm">{t.name}</p>
                                    <p className="font-dm-sans text-white/65 text-xs">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

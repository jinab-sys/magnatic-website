"use client"
import { motion } from "framer-motion"

const testimonials = [
    {
        quote: "We went from 0 to 40 video ads in a single afternoon. Our TikTok ROAS tripled in week one.",
        name: "Sarah L.",   role: "Head of Growth · NovaSkin",    initials: "SL", grad: "linear-gradient(135deg, #bef264, #4d7c0f)",
    },
    {
        quote: "The AI avatars look insanely real. Engagement went through the roof and our CPM dropped 60%.",
        name: "James M.",  role: "CMO · PeakFit",                 initials: "JM", grad: "linear-gradient(135deg, #d9f99d, #65a30d)",
    },
    {
        quote: "Magnatic cut our video production costs by 90%. We ship 3x more creative every month now.",
        name: "Aisha R.",  role: "Marketing Director · Lumora Beauty", initials: "AR", grad: "linear-gradient(135deg, #a3e635, #3f6212)",
    },
    {
        quote: "Finally a tool that just works. URL in, video out. Our whole team uses it every single day.",
        name: "Tom H.",    role: "Founder · Driftly",              initials: "TH", grad: "linear-gradient(135deg, #84cc16, #365314)",
    },
    {
        quote: "The multi-platform export alone is worth every penny. No more manual resizing at 2am.",
        name: "Nina C.",   role: "Social Media Lead · UrbanKicks", initials: "NC", grad: "linear-gradient(135deg, #bef264, #65a30d)",
    },
    {
        quote: "We tested 50 ad variations in one week, found our winner, and ROAS went up 280%.",
        name: "Raj P.",    role: "Performance Lead · ZestBox",     initials: "RP", grad: "linear-gradient(135deg, #d4e877, #3d5a1f)",
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
                            whileHover={{ y: -4, borderColor: "rgba(163,230,53,0.26)" }}
                        >
                            <div className="mag-star-rating text-base tracking-widest mb-4">★★★★★</div>
                            <p className="font-dm-sans text-white text-[15px] leading-relaxed italic flex-1 mb-6">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-syne font-bold text-sm text-white flex-shrink-0"
                                    style={{ background: t.grad }}>
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

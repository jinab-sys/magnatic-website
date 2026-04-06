"use client"
import { useRef } from "react"
import { motion } from "framer-motion"

const avatars = [
    { initials: "ZK", name: "Zara K",    tag: "Fashion",   grad: "linear-gradient(135deg,#7C3AED,#3D6EFA)" },
    { initials: "MT", name: "Marcus T",  tag: "Tech",       grad: "linear-gradient(135deg,#F96B2A,#FFA040)" },
    { initials: "LW", name: "Lena W",    tag: "Beauty",     grad: "linear-gradient(135deg,#3D6EFA,#7C3AED)" },
    { initials: "OS", name: "Omar S",    tag: "Fitness",    grad: "linear-gradient(135deg,#FFA040,#F96B2A)" },
    { initials: "PM", name: "Priya M",   tag: "Food",       grad: "linear-gradient(135deg,#7C3AED,#F96B2A)" },
    { initials: "JR", name: "Jake R",    tag: "Gaming",     grad: "linear-gradient(135deg,#3D6EFA,#FFA040)" },
    { initials: "SA", name: "Sofia A",   tag: "Finance",    grad: "linear-gradient(135deg,#F96B2A,#7C3AED)" },
    { initials: "CL", name: "Chen L",    tag: "E-Commerce", grad: "linear-gradient(135deg,#FFA040,#3D6EFA)" },
]

const CARD_W = 220 + 24 // card width + gap

export function AvatarCarousel() {
    const trackRef = useRef<HTMLDivElement>(null)
    const indexRef = useRef(0)

    function scroll(dir: 1 | -1) {
        const track = trackRef.current
        if (!track) return
        const visible = Math.floor(track.parentElement!.offsetWidth / CARD_W)
        const max = Math.max(0, avatars.length - visible)
        indexRef.current = Math.max(0, Math.min(indexRef.current + dir, max))
        track.style.transform = `translateX(-${indexRef.current * CARD_W}px)`
    }

    return (
        <section id="avatars" className="relative w-full z-20 py-20 sm:py-28 overflow-hidden" style={{ background: "rgba(0,0,0,0.2)" }}>
            {/* Glow blob */}
            <div className="mag-blob w-[400px] h-[400px] bg-[#7C3AED]"
                style={{ top: "-60px", right: "8%", animationDelay: "1.5s" }} />

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="font-space-mono text-[11px] tracking-[0.15em] uppercase text-[#3D6EFA] mb-4">AI Influencers</p>
                    <h2 className="font-syne font-bold text-3xl sm:text-5xl text-white mb-4 tracking-tight">
                        Meet Your AI Influencers
                    </h2>
                    <p className="font-dm-sans text-white/65 text-lg">
                        500+ hyper-realistic avatars. Every style, every market.
                    </p>
                </motion.div>

                {/* Track */}
                <div className="overflow-hidden relative">
                    <div
                        ref={trackRef}
                        className="flex gap-6"
                        style={{ transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)" }}
                    >
                        {avatars.map((av, i) => (
                            <motion.div
                                key={av.initials}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.07 }}
                                viewport={{ once: true }}
                                className="flex-shrink-0 w-[220px] text-center rounded-2xl p-7 cursor-pointer group"
                                style={{
                                    background: "rgba(0,0,0,0.25)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    backdropFilter: "blur(12px)",
                                    transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                                }}
                                whileHover={{
                                    y: -8,
                                    borderColor: "rgba(124,58,237,0.5)",
                                    boxShadow: "0 20px 50px rgba(124,58,237,0.2)",
                                }}
                            >
                                <div className="w-20 h-20 rounded-full flex items-center justify-center font-syne font-bold text-2xl text-white mx-auto mb-4"
                                    style={{ background: av.grad }}>
                                    {av.initials}
                                </div>
                                <p className="font-syne font-bold text-white text-base mb-2">{av.name}</p>
                                <span className="font-dm-sans text-xs text-white/65 px-3 py-1 rounded-full inline-block"
                                    style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
                                    {av.tag}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Arrows */}
                <div className="flex gap-3 justify-center mt-8">
                    {(["←", "→"] as const).map((arrow, i) => (
                        <button
                            key={arrow}
                            onClick={() => scroll(i === 0 ? -1 : 1)}
                            className="w-12 h-12 rounded-full flex items-center justify-center text-lg text-white transition-all duration-300 hover:bg-[rgba(124,58,237,0.2)] hover:border-[rgba(124,58,237,0.5)]"
                            style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                            {arrow}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}

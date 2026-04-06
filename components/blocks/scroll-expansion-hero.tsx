"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"

export function ScrollExpandHero() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Video window expansion (unchanged)
    const width        = useTransform(scrollYProgress, [0, 1], ["50%", "100%"])
    const height       = useTransform(scrollYProgress, [0, 1], ["50vh", "100vh"])
    const borderRadius = useTransform(scrollYProgress, [0, 1], ["2rem", "0rem"])

    // Headline text slide out (unchanged)
    const leftX       = useTransform(scrollYProgress, [0, 1], ["0%", "-120%"])
    const leftOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
    const rightX      = useTransform(scrollYProgress, [0, 1], ["0%", "120%"])
    const rightOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

    // Subheadline / CTA gentle drift
    const subY = useTransform(scrollYProgress, [0, 0.35], [0, 18])

    return (
        <div ref={containerRef} className="relative h-[150vh] w-full">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

                {/* Glow blobs */}
                <div className="mag-blob w-[520px] h-[520px] bg-[#7C3AED]"
                    style={{ top: "-100px", left: "-160px" }} />
                <div className="mag-blob w-[400px] h-[400px] bg-[#3D6EFA]"
                    style={{ bottom: "-60px", right: "-100px", animationDelay: "3.5s" }} />

                {/* ── Eyebrow + Headline group (centered) ── */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 flex flex-col items-center px-6">
                    {/* Eyebrow label */}
                    <motion.div style={{ opacity: leftOpacity }} className="mb-4 sm:mb-5 text-center">
                        <span className="font-space-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#3D6EFA] border border-[#3D6EFA]/25 rounded-full px-4 py-1.5 bg-[#3D6EFA]/5">
                            AI Video Creation Platform
                        </span>
                    </motion.div>

                    {/* Headline — left/right slide */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 whitespace-nowrap overflow-hidden">
                        <motion.div
                            style={{ x: leftX, opacity: leftOpacity, fontFamily: "var(--font-syne)" }}
                            className="text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter drop-shadow-2xl"
                        >
                            The New Era
                        </motion.div>
                        <motion.div
                            style={{ x: rightX, opacity: rightOpacity, fontFamily: "var(--font-syne)" }}
                            className="text-5xl md:text-7xl lg:text-9xl font-bold text-neutral-300 tracking-tighter drop-shadow-2xl"
                        >
                            of Marketing
                        </motion.div>
                    </div>
                </div>

                {/* ── Expanding video window ── */}
                <motion.div
                    style={{ width, height, borderRadius }}
                    className="relative z-10 overflow-hidden flex items-center justify-center bg-black/40 border border-white/10"
                >
                    <video
                        src="https://res.cloudinary.com/dyhthl5ad/video/upload/v1775216313/toyota_1_wrjdll.mp4"
                        autoPlay muted loop playsInline
                        className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-60"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-12 text-center z-20"
                    >
                        <p className="text-neutral-400 text-xs tracking-widest uppercase mb-2 font-space-mono">Scroll to Discover</p>
                        <div className="w-[1px] h-10 bg-white/30 mx-auto animate-pulse" />
                    </motion.div>
                </motion.div>

                {/* ── Subheadline + CTAs (below video, fades with scroll) ── */}
                <motion.div
                    style={{ opacity: leftOpacity, y: subY }}
                    className="absolute bottom-[6%] z-20 text-center px-6 w-full max-w-2xl left-1/2 -translate-x-1/2"
                >
                    <p className="font-dm-sans text-white/65 text-base sm:text-lg md:text-xl leading-relaxed mb-6 font-light">
                        Magnatic turns your brand into scroll-stopping AI video ads and influencer content — no studio, no crew, no limits.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {/* ⚠️ DO NOT MODIFY: triggers Supabase registration flow */}
                        <Link href="/register">
                            <button
                                className="font-dm-sans font-medium text-white text-base px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
                                style={{ background: "linear-gradient(135deg,#7C3AED,#3D6EFA)" }}
                            >
                                Create Your First Video
                            </button>
                        </Link>
                        <button className="font-dm-sans font-medium text-white text-base px-8 py-3.5 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300">
                            ▶&nbsp; Watch Demo
                        </button>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}

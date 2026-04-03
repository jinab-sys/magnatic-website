"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ScrollExpandHero() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Map expansion entirely over the scroll range to completely eliminate wasted waiting space
    const width = useTransform(scrollYProgress, [0, 1], ["50%", "100%"])
    const height = useTransform(scrollYProgress, [0, 1], ["50vh", "100vh"])
    const borderRadius = useTransform(scrollYProgress, [0, 1], ["2rem", "0rem"])

    // Texts elegantly slide out across the screen
    const leftX = useTransform(scrollYProgress, [0, 1], ["0%", "-120%"])
    const leftOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

    const rightX = useTransform(scrollYProgress, [0, 1], ["0%", "120%"])
    const rightOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

    return (
        <div ref={containerRef} className="relative h-[150vh] w-full">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

                {/* Texts pinned in the background center */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center gap-4 z-0 whitespace-nowrap">
                    <motion.div style={{ x: leftX, opacity: leftOpacity }} className="text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter drop-shadow-2xl">
                        The New Era
                    </motion.div>
                    <motion.div style={{ x: rightX, opacity: rightOpacity }} className="text-5xl md:text-7xl lg:text-9xl font-bold text-neutral-300 tracking-tighter drop-shadow-2xl">
                        of Marketing
                    </motion.div>
                </div>

                {/* Scaling Video window. Reverted completely to original bg-black/40 to revive transparency */}
                <motion.div
                    style={{ width, height, borderRadius }}
                    className="relative z-10 overflow-hidden flex items-center justify-center bg-black/40 border border-white/10"
                >
                    <video
                        src="https://res.cloudinary.com/dyhthl5ad/video/upload/v1775216313/toyota_1_wrjdll.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-60"
                    />
                    <div className="absolute inset-0 bg-black/20" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-12 text-center z-20"
                    >
                        <p className="text-neutral-300 text-sm tracking-widest uppercase mb-2 font-medium">Scroll to Discover</p>
                        <div className="w-[1px] h-12 bg-white/40 mx-auto animate-pulse" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

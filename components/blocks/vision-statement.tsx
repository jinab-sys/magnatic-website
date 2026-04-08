"use client"
import { motion } from "framer-motion"

export function VisionStatement() {
    return (
        <section className="relative w-full flex items-center justify-center z-20 py-20 sm:py-28 overflow-hidden">
            {/* Subtle glow behind card */}
            <div className="mag-blob mag-blob-a w-[500px] h-[300px]"
                style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative z-10 max-w-4xl mx-auto px-6 text-center p-10 sm:p-14 rounded-3xl"
                style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                }}
            >
                {/* Gradient top accent line */}
                <div className="mag-gradient-fill w-16 h-1 rounded-full mx-auto mb-8" />

                <p className="font-syne font-bold text-2xl md:text-3xl text-white leading-relaxed">
                    Magnatic runs AI models, influencers, and creators—and the Instagram accounts behind them—so brands can ship premium ads without anyone on camera. Skip the talent hunt and the delays: your product, your look,{" "}
                    <span className="mag-text-gradient">
                        Magnatic.
                    </span>
                </p>
            </motion.div>
        </section>
    )
}

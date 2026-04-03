"use client"
import { motion } from "framer-motion"

export function VisionStatement() {
    return (
        <section className="relative min-h-[60vh] w-full flex items-center justify-center bg-transparent z-20 py-20">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-4xl mx-auto px-6 text-center backdrop-blur-md bg-black/30 p-12 rounded-3xl border border-white/5"
            >
                <p className="text-xl md:text-3xl text-neutral-200 leading-relaxed font-light">
                    We deploy AI influencers, intelligent workflows, and a dedicated human team to craft content that converts. Your brand deserves more than templates — it deserves Magnatic.
                </p>
            </motion.div>
        </section>
    )
}

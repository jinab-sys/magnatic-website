"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

export function FeatureCard({ title, description, icon, index }: { title: string, description: string, icon: ReactNode, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative p-6 sm:p-8 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 overflow-hidden group hover:bg-black/50 transition-colors duration-500"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Grid Pattern inside card for subtle background */}
            <div className="absolute inset-0 z-0 opacity-[0.03] overflow-hidden transition-opacity duration-700 group-hover:opacity-[0.08]">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id={`pattern-${index}`} width="24" height="24" patternUnits="userSpaceOnUse">
                            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#pattern-${index})`} className="text-white" />
                </svg>
            </div>

            <div className="relative z-10">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-shadow duration-500">
                    {icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-3 tracking-wide">{title}</h3>
                <p className="text-neutral-400 leading-relaxed text-sm font-light">{description}</p>
            </div>
        </motion.div>
    )
}

"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

export function FeatureCard({ title, description, icon, index }: { title: string, description: string, icon: ReactNode, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative p-6 sm:p-8 rounded-2xl overflow-hidden group cursor-default"
            style={{
                background: "rgba(0,0,0,0.25)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
            }}
            whileHover={{
                y: -6,
                borderColor: "rgba(124,58,237,0.5)",
                boxShadow: "0 20px 40px rgba(124,58,237,0.12)",
            }}
        >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Grid pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] overflow-hidden transition-opacity duration-700 group-hover:opacity-[0.06]">
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
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl text-white transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.25)]"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}>
                    {icon}
                </div>
                <h3 className="font-syne font-bold text-xl text-white mb-3 tracking-wide">{title}</h3>
                <p className="font-dm-sans text-[#B0A4CC] leading-relaxed text-sm font-light">{description}</p>
            </div>
        </motion.div>
    )
}

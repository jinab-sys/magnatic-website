"use client"
import { motion } from "framer-motion"

const stats = [
    { num: "2.4M+",  label: "Videos Created"       },
    { num: "8,700+", label: "Brands Powered"        },
    { num: "340%",   label: "Avg. Engagement Lift"  },
    { num: "18 min", label: "Time to First Video"   },
]

export function StatsSection() {
    return (
        <section id="stats" className="relative w-full z-20 py-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            viewport={{ once: true, margin: "-60px" }}
                            className="text-center px-6 py-10 relative"
                        >
                            {/* Vertical separator */}
                            {i < stats.length - 1 && (
                                <div className="hidden md:block absolute top-[20%] right-0 h-[60%] w-px bg-white/8" />
                            )}
                            <div
                                className="font-syne font-bold text-4xl sm:text-5xl md:text-[56px] leading-none mb-3"
                                style={{ background: "linear-gradient(135deg,#7C3AED,#3D6EFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                            >
                                {s.num}
                            </div>
                            <div className="font-dm-sans text-sm text-white/65 font-medium">
                                {s.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

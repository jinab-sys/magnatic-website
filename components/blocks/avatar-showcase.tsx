"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInViewOnce } from "@/lib/hooks/use-in-view-once"

type AvatarImage = { src: string; name: string }

function AvatarCard({ img }: { img: AvatarImage }) {
    return (
        <div
            className="group relative shrink-0 w-[160px] h-[220px] sm:w-[185px] sm:h-[255px] rounded-2xl overflow-hidden"
            style={{
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
            }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={img.src}
                alt={img.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                    const el = e.currentTarget.closest<HTMLElement>(".group")
                    if (el) el.style.display = "none"
                }}
            />
            <div
                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}
                aria-hidden
            />
            <div
                className="absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, var(--mag-accent-from), transparent)" }}
                aria-hidden
            />
        </div>
    )
}

function MarqueeRow({ images, reverse = false, duration = "40s" }: { images: AvatarImage[]; reverse?: boolean; duration?: string }) {
    const tiles = [...images, ...images, ...images, ...images]
    return (
        <div className="overflow-hidden w-full">
            <div
                className="flex gap-4"
                style={{
                    width: "max-content",
                    animation: `${reverse ? "avatar-scroll-right" : "avatar-scroll-left"} ${duration} linear infinite`,
                }}
            >
                {tiles.map((img, i) => (
                    <AvatarCard key={`${img.name}-${i}`} img={img} />
                ))}
            </div>
        </div>
    )
}

function AvatarMarquee({ images }: { images: AvatarImage[] }) {
    return (
        <div
            className="flex flex-col gap-4"
            style={{
                maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            }}
        >
            <MarqueeRow images={images} duration="45s" />
            <MarqueeRow images={images} reverse duration="38s" />
        </div>
    )
}

export function AvatarShowcase({ images }: { images: AvatarImage[] }) {
    const sectionRef = useRef<HTMLElement>(null)
    const inView = useInViewOnce(sectionRef, { rootMargin: "150px 0px" })

    if (images.length === 0) return null

    return (
        <section ref={sectionRef} className="relative z-20 w-full overflow-hidden py-20 sm:py-28">
            <div
                className="mag-blob mag-blob-b h-[360px] w-[360px]"
                style={{ top: "10%", left: "-80px", animationDelay: "2s" }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-14 text-center px-6"
            >
                <p
                    className="mb-4 font-space-mono text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: "var(--mag-accent-from)" }}
                >
                    AI Avatars
                </p>
                <h2
                    className="font-syne font-bold text-white leading-[1.1] tracking-tight"
                    style={{ fontSize: "clamp(22px, 3.5vw, 38px)", letterSpacing: "-0.015em" }}
                >
                    Choose your avatar or customize one for yourself.
                </h2>
                <p className="mt-3 font-dm-sans text-sm text-white/60 max-w-md mx-auto">
                    Every avatar is fully managed by us — trained on your brand, active across all platforms.
                </p>
            </motion.div>

            {inView ? (
                <AvatarMarquee images={images} />
            ) : (
                <div className="h-[560px] motion-safe:animate-pulse" aria-hidden />
            )}
        </section>
    )
}

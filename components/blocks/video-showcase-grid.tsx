"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react"

type VideoItem = {
    src: string
    title: string
}

type VideoShowcaseGridProps = {
    videos: VideoItem[]
}

export function VideoShowcaseGrid({ videos }: VideoShowcaseGridProps) {
    const railRef = useRef<HTMLDivElement>(null)
    const [mutedByVideo, setMutedByVideo] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {}
        for (const v of videos) initial[v.src] = true
        return initial
    })
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if (!videos.length) return null

    function scrollRail(direction: "left" | "right") {
        const rail = railRef.current
        if (!rail) return

        const amount = Math.round(rail.clientWidth * 0.82)
        rail.scrollBy({
            left: direction === "right" ? amount : -amount,
            behavior: "smooth",
        })
    }

    function isMuted(src: string) {
        if (!hasMounted) return true
        return mutedByVideo[src] ?? true
    }

    function toggleMuted(src: string) {
        setMutedByVideo((prev) => ({
            ...prev,
            [src]: !(prev[src] ?? true),
        }))
    }

    return (
        <section className="relative z-20 mx-auto -mt-1 w-full max-w-7xl px-6 pb-14 pt-3 md:pt-4">
            <div className="mb-6 md:mb-8">
                <p className="mb-3 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/70">
                    AI Influencer Content Feed
                </p>
                <h2 className="font-syne text-3xl font-bold tracking-tight text-white md:text-5xl">
                    Viral-style ad concepts generated with AI
                </h2>
                <p className="mt-3 max-w-2xl font-dm-sans text-sm text-neutral-300 md:text-base">
                    A curated grid of short-form influencer-style creatives, placed right after the hero so users instantly see output quality.
                </p>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
                <button
                    type="button"
                    onClick={() => scrollRail("left")}
                    aria-label="Scroll videos left"
                    className="h-10 w-10 shrink-0 rounded-full border border-white/12 bg-black/55 text-xl text-white/90 backdrop-blur-md transition hover:bg-black/70 md:h-12 md:w-12 md:text-2xl"
                >
                    <ChevronLeft className="mx-auto h-5 w-5 md:h-6 md:w-6" />
                </button>

                <div ref={railRef} className="no-scrollbar flex min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
                    {videos.map((video) => (
                        <article
                            key={video.src}
                            className="group relative w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-black/40 sm:w-[250px] md:w-[280px]"
                        >
                            <div className="relative aspect-9/16">
                                <video
                                    suppressHydrationWarning
                                    src={video.src}
                                    autoPlay
                                    muted={isMuted(video.src)}
                                    loop
                                    playsInline
                                    preload="metadata"
                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/15" />
                                <p className="absolute left-2 top-2 rounded bg-black/65 px-2 py-1 font-space-mono text-[9px] uppercase tracking-wider text-white/80">
                                    AI Generated
                                </p>
                                <p className="absolute bottom-2 left-2 right-2 text-[11px] leading-snug text-white/90">
                                    {video.title}
                                </p>
                                <button
                                    type="button"
                                    aria-label={isMuted(video.src) ? "Unmute video" : "Mute video"}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        toggleMuted(video.src)
                                    }}
                                    className="absolute bottom-2 right-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white/90 backdrop-blur-sm transition hover:bg-black/80"
                                >
                                    {isMuted(video.src) ? (
                                        <VolumeX className="h-4 w-4" />
                                    ) : (
                                        <Volume2 className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => scrollRail("right")}
                    aria-label="Scroll videos right"
                    className="h-10 w-10 shrink-0 rounded-full border border-white/12 bg-black/55 text-xl text-white/90 backdrop-blur-md transition hover:bg-black/70 md:h-12 md:w-12 md:text-2xl"
                >
                    <ChevronRight className="mx-auto h-5 w-5 md:h-6 md:w-6" />
                </button>
            </div>
        </section>
    )
}

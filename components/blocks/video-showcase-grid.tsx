"use client"

import { useRef, useState, useSyncExternalStore } from "react"
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react"
import { useInViewOnce } from "@/lib/hooks/use-in-view-once"

type VideoItem = {
    src: string
    title: string
}

type VideoShowcaseGridProps = {
    videos: VideoItem[]
}

const noopSubscribe = () => () => { }

function ShowcaseVideoTile({
    video,
    isMuted,
    onToggleMute,
}: {
    video: VideoItem
    isMuted: boolean
    onToggleMute: () => void
}) {
    const wrapRef = useRef<HTMLDivElement>(null)
    const inView = useInViewOnce(wrapRef, { rootMargin: "200px 0px" })

    return (
        <article
            className="group relative w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-black/40 sm:w-[300px] md:w-[340px]"
        >
            <div ref={wrapRef} className="relative aspect-9/16">
                {inView ? (
                    <video
                        suppressHydrationWarning
                        src={video.src}
                        autoPlay
                        muted={isMuted}
                        loop
                        playsInline
                        preload="none"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="h-full w-full bg-neutral-950 motion-safe:animate-pulse" aria-hidden />
                )}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/15" />
                <p className="absolute left-2 top-2 rounded bg-black/65 px-2 py-1 font-space-mono text-[9px] uppercase tracking-wider text-white/80">
                    AI Generated
                </p>
                <button
                    type="button"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onToggleMute()
                    }}
                    className="absolute bottom-2 right-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white/90 backdrop-blur-sm transition hover:bg-black/80"
                >
                    {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                    ) : (
                        <Volume2 className="h-4 w-4" />
                    )}
                </button>
            </div>
        </article>
    )
}

export function VideoShowcaseGrid({ videos }: VideoShowcaseGridProps) {
    const railRef = useRef<HTMLDivElement>(null)
    const [mutedByVideo, setMutedByVideo] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {}
        for (const v of videos) initial[v.src] = true
        return initial
    })
    const hasMounted = useSyncExternalStore(noopSubscribe, () => true, () => false)

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
                    Sample work
                </p>
                <h2 className="font-syne text-3xl font-bold tracking-tight text-white md:text-5xl">
                    AI-led ads &amp; concepts
                </h2>
                <p className="mt-3 max-w-2xl font-dm-sans text-sm text-neutral-300 md:text-base">
                    Examples of the kind of premium, influencer-style spots we produce around real products—no on-camera talent required from your team.
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
                        <ShowcaseVideoTile
                            key={video.src}
                            video={video}
                            isMuted={isMuted(video.src)}
                            onToggleMute={() => toggleMuted(video.src)}
                        />
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

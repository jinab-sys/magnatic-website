"use client"

type VideoItem = {
    src: string
    title: string
}

type VideoShowcaseGridProps = {
    videos: VideoItem[]
}

export function VideoShowcaseGrid({ videos }: VideoShowcaseGridProps) {
    if (!videos.length) return null

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

            <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2">
                {videos.map((video) => (
                    <article
                        key={video.src}
                        className="group relative w-[170px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-black/40 sm:w-[190px] md:w-[220px]"
                    >
                        <div className="relative aspect-9/16">
                            <video
                                src={video.src}
                                autoPlay
                                muted
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
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

"use client"

export function ScrollExpandHero() {
    return (
        <section className="relative w-full overflow-hidden pb-4 pt-20 md:pb-4 md:pt-24">
            <div className="mag-blob mag-blob-a h-[520px] w-[520px]" style={{ left: "-180px", top: "-120px" }} />
            <div className="mag-blob mag-blob-b h-[420px] w-[420px]" style={{ right: "-130px", top: "20px", animationDelay: "3.5s" }} />

            {/* Soft spotlight behind hero content */}
            <div
                className="pointer-events-none absolute left-1/2 top-[28%] z-10 h-[min(520px,85vw)] w-[min(900px,120%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(179,255,118,0.07)_0%,transparent_62%)]"
                aria-hidden
            />
        </section>
    )
}

import { Marquee } from "@/components/ui/3d-testimonials"

const brands = [
    "NovaSkin", "PeakFit", "Lumora Beauty", "Driftly", "UrbanKicks",
    "ZestBox", "Velaro", "TrueNorth Co", "Axiom Labs", "BrightCart",
]

function BrandName({ name }: { name: string }) {
    return (
        <span className="font-syne font-bold text-lg text-white opacity-45 hover:opacity-80 transition-opacity duration-300 whitespace-nowrap px-4">
            {name}
        </span>
    )
}

export function BrandsMarquee() {
    return (
        <section className="relative w-full overflow-hidden border-t border-b border-white/10 py-14 z-20" style={{ background: "rgba(0,0,0,0.2)" }}>
            <p className="font-space-mono text-[11px] tracking-[0.18em] uppercase text-white/65 text-center mb-10 opacity-60">
                Trusted by Fast-Growing Brands
            </p>

            <div
                className="w-full flex flex-col gap-5 overflow-hidden"
                style={{
                    maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                }}
            >
                {/* Row 1 — scrolls left */}
                <Marquee pauseOnHover repeat={6} className="[--duration:32s] [--gap:0px]">
                    {brands.map((b) => <BrandName key={b} name={b} />)}
                </Marquee>

                {/* Row 2 — scrolls right */}
                <Marquee pauseOnHover reverse repeat={6} className="[--duration:28s] [--gap:0px]">
                    {brands.map((b) => <BrandName key={`r-${b}`} name={b} />)}
                </Marquee>
            </div>
        </section>
    )
}

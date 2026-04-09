import { Marquee } from "@/components/ui/3d-testimonials"

const brands = [
    { name: "NIKE",             style: { fontWeight: 900, letterSpacing: "0.15em", fontSize: "1.1rem" } },
    { name: "SEPHORA",          style: { fontWeight: 700, letterSpacing: "0.22em", fontSize: "0.95rem" } },
    { name: "Glossier",         style: { fontWeight: 400, letterSpacing: "0.05em", fontSize: "1.05rem", fontStyle: "italic" } },
    { name: "GYMSHARK",         style: { fontWeight: 800, letterSpacing: "0.12em", fontSize: "1rem" } },
    { name: "FENTY BEAUTY",     style: { fontWeight: 700, letterSpacing: "0.18em", fontSize: "0.9rem" } },
    { name: "SKIMS",            style: { fontWeight: 900, letterSpacing: "0.3em",  fontSize: "1rem" } },
    { name: "Warby Parker",     style: { fontWeight: 500, letterSpacing: "0.06em", fontSize: "1rem" } },
    { name: "Dollar Shave Club",style: { fontWeight: 800, letterSpacing: "0.08em", fontSize: "0.85rem" } },
    { name: "Allbirds",         style: { fontWeight: 600, letterSpacing: "0.04em", fontSize: "1.05rem" } },
    { name: "LIQUID I.V.",      style: { fontWeight: 900, letterSpacing: "0.2em",  fontSize: "0.9rem" } },
]

function BrandName({ name, style }: { name: string; style: React.CSSProperties }) {
    return (
        <span
            className="text-white opacity-40 hover:opacity-75 transition-opacity duration-300 whitespace-nowrap px-6 font-syne"
            style={style}
        >
            {name}
        </span>
    )
}

export function BrandsMarquee() {
    return (
        <section className="relative w-full overflow-hidden border-t border-b border-white/10 py-14 z-20 mag-section-dim">
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
                    {brands.map((b) => <BrandName key={b.name} name={b.name} style={b.style} />)}
                </Marquee>

                {/* Row 2 — scrolls right */}
                <Marquee pauseOnHover reverse repeat={6} className="[--duration:28s] [--gap:0px]">
                    {brands.map((b) => <BrandName key={`r-${b.name}`} name={b.name} style={b.style} />)}
                </Marquee>
            </div>
        </section>
    )
}

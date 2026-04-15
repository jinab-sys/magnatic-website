import { Marquee } from "@/components/ui/3d-testimonials"

const brands = [
    { name: "Nike", file: "nike copy.png" },
    { name: "Sephora", file: "sephora.png" },
    { name: "Glossier", file: "glossier.png" },
    { name: "Gymshark", file: "gymshark.png" },
    { name: "Fenty Beauty", file: "fenty.png" },
    { name: "SKIMS", file: "skims copy.png" },
    { name: "Warby Parker", file: "warbyparker copy.jpeg" },
    { name: "Dollar Shave Club", file: "dollar.png" },
    { name: "Allbirds", file: "allbirds.png" },
    { name: "Liquid I.V.", file: "liquid.png" },
]

/** Same footprint for every logo: scale inside the box, no per-brand tuning. */
function BrandLogoTile({ name, file }: { name: string; file: string }) {
    const src = `/api/logo-image?name=${encodeURIComponent(file)}`
    return (
        <div className="flex h-17 w-35 shrink-0 items-center justify-center sm:h-19 sm:w-40">
            <div className="flex h-full w-full min-h-0 min-w-0 items-center justify-center rounded-2xl border border-white/12 bg-[#0c0f0e] p-2.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={name}
                    className="max-h-full max-w-full object-contain object-center"
                    draggable={false}
                    decoding="async"
                />
            </div>
        </div>
    )
}

export function BrandsMarquee() {
    return (
        <section className="relative z-20 w-full overflow-hidden border-y border-white/10 bg-[#060807] py-14 mag-section-dim">
            <div className="mb-10 flex justify-center">
                <h2 className="font-syne text-3xl font-black uppercase tracking-tight sm:text-4xl" style={{ color: "#ffffff" }}>
                    Trusted by Authentic Brands
                </h2>
            </div>

            <div
                className="flex w-full flex-col gap-4 overflow-hidden sm:gap-5"
                style={{
                    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                }}
            >
                <Marquee pauseOnHover repeat={6} className="[--duration:34s] [--gap:0.65rem] sm:[--gap:0.85rem]">
                    {brands.map((b) => (
                        <BrandLogoTile key={b.name} name={b.name} file={b.file} />
                    ))}
                </Marquee>

                <div className="pl-6 sm:pl-14 md:pl-24">
                    <Marquee pauseOnHover reverse repeat={6} className="[--duration:30s] [--gap:0.65rem] sm:[--gap:0.85rem]">
                        {brands.map((b) => (
                            <BrandLogoTile key={`r-${b.name}`} name={b.name} file={b.file} />
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    )
}

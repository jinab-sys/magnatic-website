import { Marquee } from "@/components/ui/3d-testimonials"
import { cn } from "@/lib/utils"

const brands = [
    { name: "NIKE",              className: "font-black tracking-[0.14em] text-[0.8rem] sm:text-[0.95rem]" },
    { name: "SEPHORA",           className: "font-bold tracking-[0.2em] text-[0.72rem] sm:text-[0.85rem]" },
    { name: "Glossier",          className: "font-medium tracking-[0.06em] italic text-[0.85rem] sm:text-[1rem]" },
    { name: "GYMSHARK",          className: "font-extrabold tracking-[0.1em] text-[0.75rem] sm:text-[0.9rem]" },
    { name: "FENTY BEAUTY",      className: "font-bold tracking-[0.16em] text-[0.65rem] sm:text-[0.78rem]" },
    { name: "SKIMS",             className: "font-black tracking-[0.28em] text-[0.78rem] sm:text-[0.95rem]" },
    { name: "Warby Parker",      className: "font-semibold tracking-[0.05em] text-[0.78rem] sm:text-[0.95rem]" },
    { name: "Dollar Shave Club", className: "font-extrabold tracking-[0.07em] text-[0.62rem] sm:text-[0.75rem]" },
    { name: "Allbirds",          className: "font-semibold tracking-[0.04em] text-[0.82rem] sm:text-[1rem]" },
    { name: "LIQUID I.V.",       className: "font-black tracking-[0.18em] text-[0.72rem] sm:text-[0.88rem]" },
]

function BrandPill({ name, className }: { name: string; className: string }) {
    return (
        <span
            className={cn(
                "inline-flex shrink-0 items-center justify-center rounded-full px-4 py-2 font-dm-sans",
                "border border-[rgba(179,255,118,0.22)] bg-(--mag-surface)",
                "shadow-[inset_0_1px_0_rgba(179,255,118,0.09),0_6px_24px_rgba(0,0,0,0.45)]",
                "whitespace-nowrap text-(--mag-fg)",
                "backdrop-blur-md transition-all duration-300",
                "hover:border-[rgba(179,255,118,0.45)] hover:bg-[rgba(179,255,118,0.1)] hover:text-(--mag-accent) hover:shadow-[0_0_28px_rgba(179,255,118,0.12)]",
                "sm:px-5 sm:py-2.5",
                className,
            )}
        >
            {name}
        </span>
    )
}

export function BrandsMarquee() {
    return (
        <section className="relative z-20 w-full overflow-hidden border-y border-white/10 bg-[#060807] py-14 mag-section-dim">
            <p className="mb-10 text-center font-space-mono text-[11px] uppercase tracking-[0.2em] text-[rgba(225,255,204,0.85)]">
                Trusted by Fast-Growing Brands
            </p>

            <div
                className="flex w-full flex-col gap-4 overflow-hidden sm:gap-5"
                style={{
                    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                }}
            >
                <Marquee pauseOnHover repeat={6} className="[--duration:34s] [--gap:0.65rem] sm:[--gap:0.85rem]">
                    {brands.map((b) => (
                        <BrandPill key={b.name} name={b.name} className={b.className} />
                    ))}
                </Marquee>

                <div className="pl-6 sm:pl-14 md:pl-24">
                    <Marquee pauseOnHover reverse repeat={6} className="[--duration:30s] [--gap:0.65rem] sm:[--gap:0.85rem]">
                        {brands.map((b) => (
                            <BrandPill key={`r-${b.name}`} name={b.name} className={b.className} />
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    )
}

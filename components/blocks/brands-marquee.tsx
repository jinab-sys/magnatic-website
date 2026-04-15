import { Marquee } from "@/components/ui/3d-testimonials"
import { cn } from "@/lib/utils"

const brands = [
    { name: "Nike",             file: "nike copy.jpeg",             imgClass: "h-12 sm:h-14" },
    { name: "Sephora",          file: "sephora copy.jpeg",          imgClass: "h-24 sm:h-28" },
    { name: "Glossier",         file: "glossier copy.jpeg",         imgClass: "h-16 sm:h-20" },
    { name: "Gymshark",         file: "gymshark copy.jpeg",         imgClass: "h-8 sm:h-10"  },
    { name: "Fenty Beauty",     file: "fentybeauty copy.jpeg",      imgClass: "h-28 sm:h-32" },
    { name: "SKIMS",            file: "skims copy.jpeg",            imgClass: "h-14 sm:h-16" },
    { name: "Warby Parker",     file: "warbyparker copy.jpeg",      imgClass: "h-10 sm:h-12" },
    { name: "Dollar Shave Club",file: "dollarshaveclub copy.jpeg",  imgClass: "h-10 sm:h-12" },
    { name: "Allbirds",         file: "allbirds copy.jpeg",         imgClass: "h-16 sm:h-18" },
    { name: "Liquid I.V.",      file: "liquidIV copy.jpeg",         imgClass: "h-10 sm:h-12" },
]

function BrandPill({ name, file, imgClass }: { name: string; file: string; imgClass: string }) {
    const src = `/api/logo-image?name=${encodeURIComponent(file)}`
    return (
        <span className="inline-flex shrink-0 items-center justify-center px-4 sm:px-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={name}
                className={cn("w-auto object-contain", imgClass)}
                draggable={false}
            />
        </span>
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
                        <BrandPill key={b.name} name={b.name} file={b.file} imgClass={b.imgClass} />
                    ))}
                </Marquee>

                <div className="pl-6 sm:pl-14 md:pl-24">
                    <Marquee pauseOnHover reverse repeat={6} className="[--duration:30s] [--gap:0.65rem] sm:[--gap:0.85rem]">
                        {brands.map((b) => (
                            <BrandPill key={`r-${b.name}`} name={b.name} file={b.file} imgClass={b.imgClass} />
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    )
}

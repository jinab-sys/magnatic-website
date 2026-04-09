import { CtaGlowButton } from "@/components/blocks/cta-glow-button"

export function CtaBanner() {
    return (
        <section className="relative w-full z-20 py-24 sm:py-32 overflow-hidden text-center">
            {/* Ambient lime glow */}
            <div className="mag-blob mag-blob-a w-[700px] h-[500px]"
                style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                <p className="font-space-mono text-[11px] tracking-[0.15em] uppercase mag-eyebrow mb-6">
                    Ready to Start?
                </p>
                <h2 className="font-syne font-bold text-3xl sm:text-5xl md:text-[56px] text-white leading-tight mb-5 tracking-tight">
                    Ready for ads that don&apos;t need<br />
                    <span className="mag-text-gradient">
                        a film crew?
                    </span>
                </h2>
                <p className="font-dm-sans text-white/65 text-lg sm:text-xl mb-10">
                    Contact us to get started with product ads powered by AI talent, edited end-to-end.
                </p>

                <CtaGlowButton />

                <p className="font-dm-sans text-white/65 text-sm mt-5 opacity-60">
                    No pitching influencers · No heavy PR packages · Waitlist registration on the site
                </p>
            </div>
        </section>
    )
}

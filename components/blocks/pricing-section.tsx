import Link from "next/link"

const tiers = [
    {
        name: "Starter",
        price: "$29",
        period: "/month",
        description: "Billed monthly · Cancel anytime",
        features: ["30 AI videos / month", "50+ avatars", "3 platforms", "HD export", "Email support"],
        cta: "Start Free Trial",
        ctaStyle: "ghost" as const,
        featured: false,
    },
    {
        name: "Pro",
        price: "$89",
        period: "/month",
        description: "Billed monthly · Cancel anytime",
        features: ["150 AI videos / month", "500+ avatars", "All platforms", "4K export + captions", "Batch mode (10 at once)", "Priority support", "Analytics dashboard"],
        cta: "Get Started",
        ctaStyle: "gradient" as const,
        featured: true,
        badge: "Most Popular",
        supabaseFlow: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "Talk to our team",
        features: ["Unlimited videos", "Custom AI avatar creation", "Dedicated account manager", "API access", "White-label option", "SLA guarantee"],
        cta: "Contact Sales",
        ctaStyle: "ghost" as const,
        featured: false,
    },
]

export function PricingSection() {
    return (
        <section id="pricing" className="relative w-full z-20 py-20 sm:py-28 mag-section-dim">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-14">
                    <p className="font-space-mono text-[11px] tracking-[0.15em] uppercase mag-eyebrow mb-4">Pricing</p>
                    <h2 className="font-syne font-bold text-3xl sm:text-5xl text-white tracking-tight mb-3">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="font-dm-sans text-white/65 text-lg">Start free. Scale as you grow. No hidden fees.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className="relative flex flex-col rounded-2xl p-8"
                            style={tier.featured ? {
                                background: "rgba(163,230,53,0.05)",
                                border: "1px solid var(--mag-accent-to)",
                                boxShadow: "0 0 40px rgba(163,230,53,0.14)",
                                transform: "scale(1.03)",
                            } : {
                                background: "rgba(0,0,0,0.28)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                backdropFilter: "blur(12px)",
                            }}
                        >
                            {/* Badge */}
                            {tier.badge && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                    <span className="mag-gradient-fill font-space-mono text-[10px] tracking-[0.1em] uppercase text-white px-4 py-1.5 rounded-full">
                                        {tier.badge}
                                    </span>
                                </div>
                            )}

                            <div className="font-syne font-bold text-xl text-white mb-3">{tier.name}</div>

                            <div className="flex items-end gap-1 mb-1">
                                <span
                                    className={`font-syne font-bold leading-none ${tier.featured ? "mag-text-gradient" : ""}`}
                                    style={{
                                        fontSize: tier.price.length > 3 ? "36px" : "50px",
                                        ...(tier.featured ? {} : { color: "white" }),
                                    }}
                                >
                                    {tier.price}
                                </span>
                                {tier.period && (
                                    <span className="font-dm-sans text-white/65 text-lg mb-1">{tier.period}</span>
                                )}
                            </div>
                            <div className="font-dm-sans text-white/65 text-sm mb-6">{tier.description}</div>

                            <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.08)" }} />

                            <ul className="flex flex-col gap-3 mb-8 flex-1">
                                {tier.features.map((f) => (
                                    <li key={f} className="flex items-center gap-3 font-dm-sans text-white/65 text-sm">
                                        <span className="w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0"
                                            style={{ background: "rgba(163,230,53,0.12)", border: "1px solid rgba(163,230,53,0.3)", color: "var(--mag-accent-from)" }}>
                                            ✓
                                        </span>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {tier.supabaseFlow ? (
                                <Link href="/#register">
                                    <button type="button" className="mag-btn-primary w-full font-dm-sans font-medium text-white py-3 rounded-full text-sm hover:scale-105">
                                        {tier.cta}
                                    </button>
                                </Link>
                            ) : (
                                <button className="w-full font-dm-sans font-medium text-white py-3 rounded-full text-sm border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300">
                                    {tier.cta}
                                </button>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

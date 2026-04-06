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
        <section id="pricing" className="relative w-full z-20 py-20 sm:py-28" style={{ background: "rgba(0,0,0,0.25)" }}>
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-14">
                    <p className="font-space-mono text-[11px] tracking-[0.15em] uppercase text-[#7C3AED] mb-4">Pricing</p>
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
                                background: "rgba(124,58,237,0.07)",
                                border: "1px solid #7C3AED",
                                boxShadow: "0 0 40px rgba(124,58,237,0.2)",
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
                                    <span className="font-space-mono text-[10px] tracking-[0.1em] uppercase text-white px-4 py-1.5 rounded-full"
                                        style={{ background: "linear-gradient(135deg,#7C3AED,#3D6EFA)" }}>
                                        {tier.badge}
                                    </span>
                                </div>
                            )}

                            <div className="font-syne font-bold text-xl text-white mb-3">{tier.name}</div>

                            <div className="flex items-end gap-1 mb-1">
                                <span
                                    className="font-syne font-bold leading-none"
                                    style={tier.featured
                                        ? { fontSize: tier.price.length > 3 ? "36px" : "50px", background: "linear-gradient(135deg,#7C3AED,#3D6EFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
                                        : { fontSize: tier.price.length > 3 ? "36px" : "50px", color: "white" }
                                    }
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
                                            style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", color: "#7C3AED" }}>
                                            ✓
                                        </span>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA — Pro card is wired to Supabase registration flow */}
                            {tier.supabaseFlow ? (
                                /* ⚠️ DO NOT MODIFY: triggers Supabase registration flow */
                                <Link href="/register">
                                    <button className="w-full font-dm-sans font-medium text-white py-3 rounded-full text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(124,58,237,0.4)]"
                                        style={{ background: "linear-gradient(135deg,#7C3AED,#3D6EFA)" }}>
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

"use client"

import { Sparkles, Package, Clock, Palette, CircleCheck, CalendarDays } from "lucide-react"
import { FeatureCard } from "@/components/ui/grid-feature-cards"

const features = [
    {
        title: "AI models & influencers",
        description:
            "A roster of AI models, influencers, and content creators—each with social media accounts we manage and grow on your behalf.",
        icon: <Sparkles className="w-5 h-5" />,
    },
    {
        title: "Product ad creation",
        description:
            "Send us your product, choose an AI model from our lineup (or commission a custom one), and receive a finished ad edited to your requirements.",
        icon: <Package className="w-5 h-5" />,
    },
    {
        title: "No human delays",
        description:
            "Production isn’t held up by talent schedules or back-and-forth. We move from concept to edited delivery without the usual bottlenecks.",
        icon: <Clock className="w-5 h-5" />,
    },
    {
        title: "Social calendars & posting",
        description:
            "We can plan and manage your social media calendars—ideation through creation, plus scheduling and publishing—so your channels stay consistent without your team living in planning tools.",
        icon: <CalendarDays className="w-5 h-5" />,
    },
    {
        title: "Custom AI models",
        description:
            "Start with our existing roster or work with us on a tailored AI model for your brand (custom work may incur additional fees).",
        icon: <Palette className="w-5 h-5" />,
    },
    {
        title: "End-to-end delivery",
        description:
            "Full handling from concept through editing—you get a polished ad ready to run, without chasing influencers or shipping giant PR boxes.",
        icon: <CircleCheck className="w-5 h-5" />,
    },
]

export function FeaturesSection() {
    return (
        <section id="features" className="relative py-24 sm:py-32 w-full flex justify-center z-20">
            <div className="max-w-7xl mx-auto px-6 w-full">

                <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
                    <p className="font-space-mono text-[11px] tracking-[0.15em] uppercase mag-eyebrow mb-4">
                        Services
                    </p>
                    <h2 className="font-syne font-bold text-3xl sm:text-5xl text-white mb-6 tracking-tight">
                        What we offer
                    </h2>
                    <p className="font-dm-sans text-lg text-white/65 font-light">
                        AI talent, product ads, and optional full social calendar management—without traditional influencer outreach.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {features.map((feature, idx) => (
                        <FeatureCard
                            key={idx}
                            index={idx}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}

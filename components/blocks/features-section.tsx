"use client"

import { Sparkles, Cpu, Users, Layers, BarChart3, Shield } from "lucide-react"
import { FeatureCard } from "@/components/ui/grid-feature-cards"

const features = [
    {
        title: "AI Influencers",
        description: "Virtual creators that build authentic audiences and drive real engagement for your brand.",
        icon: <Sparkles className="w-5 h-5" />
    },
    {
        title: "Smart Workflows",
        description: "Automated content pipelines powered by AI that adapt and optimize in real-time.",
        icon: <Cpu className="w-5 h-5" />
    },
    {
        title: "Human Expertise",
        description: "A dedicated team of strategists and creatives ensuring every campaign hits the mark.",
        icon: <Users className="w-5 h-5" />
    },
    {
        title: "Content at Scale",
        description: "Generate hundreds of high-quality ad variations in minutes, not weeks.",
        icon: <Layers className="w-5 h-5" />
    },
    {
        title: "Performance Analytics",
        description: "Deep insights into what works, powered by machine learning and real data.",
        icon: <BarChart3 className="w-5 h-5" />
    },
    {
        title: "Brand Safety",
        description: "Every piece of content reviewed and approved before it goes live.",
        icon: <Shield className="w-5 h-5" />
    }
]

export function FeaturesSection() {
    return (
        <section id="features" className="relative py-24 sm:py-32 w-full flex justify-center z-20">
            <div className="max-w-7xl mx-auto px-6 w-full">

                <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
                    <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
                        Everything You Need to Dominate
                    </h2>
                    <p className="text-lg text-neutral-400 font-light">
                        AI-powered tools and human expertise, working together.
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

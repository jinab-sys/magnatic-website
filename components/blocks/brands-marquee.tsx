import { Marquee } from '@/components/ui/3d-testimonials';
import { Cpu, Globe, Infinity, Hexagon, Component, Zap, Triangle, Circle, Square } from "lucide-react"

const brandIcons = [Globe, Hexagon, Cpu, Triangle, Infinity, Component, Zap, Circle, Square];

export function BrandsMarquee() {
    return (
        <section className="relative w-full overflow-hidden bg-transparent pt-10 pb-16 z-20 flex flex-col items-center justify-center">

            <div className="text-center max-w-2xl mx-auto mb-12 z-10 px-6">
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                    Trusted by Industry Leaders
                </h2>
                <p className="text-sm sm:text-base text-neutral-400 font-light">
                    Empowering the world's best brands with intelligent, AI-driven workflows.
                </p>
            </div>

            {/* Horizontal Ticker Wrapper */}
            <div
                className="w-full flex flex-col gap-6 overflow-hidden"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                }}
            >
                {/* First Row goes Left */}
                <Marquee pauseOnHover repeat={10} className="[--duration:40s]">
                    {brandIcons.map((Icon, idx) => (
                        <div key={idx} className="flex h-16 w-24 sm:h-20 sm:w-32 items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
                            <Icon className="h-6 sm:h-8 w-6 sm:w-8 text-neutral-300" />
                        </div>
                    ))}
                </Marquee>

                {/* Second Row goes Right */}
                <Marquee pauseOnHover reverse repeat={10} className="[--duration:50s]">
                    {brandIcons.map((Icon, idx) => (
                        <div key={`reverse-${idx}`} className="flex h-16 w-24 sm:h-20 sm:w-32 items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
                            <Icon className="h-6 sm:h-8 w-6 sm:w-8 text-neutral-400" />
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
}

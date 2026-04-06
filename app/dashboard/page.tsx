import { Navbar } from "@/components/blocks/navbar"

export default function DashboardPage() {
    return (
        <main className="relative min-h-screen selection:bg-white/30 selection:text-white flex flex-col">
            <Navbar />

            <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center p-6 text-center mt-20">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-xl tracking-tight">Welcome to the Beta</h1>
                <div className="max-w-2xl mx-auto border border-white/10 bg-black/40 backdrop-blur-md p-10 rounded-3xl shadow-2xl">
                    <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
                        Thank you for joining Magnatic! We are actively finalizing our AI intelligent workflows and content pipelines. You will be explicitly notified as soon as you are granted full dashboard access to experiment.
                    </p>
                    <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-sm text-neutral-500 uppercase tracking-widest font-semibold mt-1">Dashboard Loading</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

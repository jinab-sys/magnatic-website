import Link from "next/link"

export default function WaitlistedPage() {
    return (
        <main className="relative min-h-screen flex items-center justify-center p-6">
            <div className="relative z-10 w-full max-w-md text-center">

                <div className="flex justify-center mb-10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo-full-white.svg" alt="Magnatic" className="h-8" />
                </div>

                <div className="border border-white/20 bg-black/50 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl flex flex-col items-center gap-6">

                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                        style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.25),rgba(61,110,250,0.25))", border: "1px solid rgba(124,58,237,0.4)" }}>
                        🎉
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">You&apos;re on the waitlist!</h1>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            Congratulations! We&apos;ve received your request and you&apos;re now on the Magnatic waitlist.
                            We&apos;ll reach out to you soon with next steps.
                        </p>
                    </div>

                    <div className="w-full h-px bg-white/10" />

                    <p className="text-neutral-500 text-xs">
                        Keep an eye on your inbox — we&apos;re excited to get you started.
                    </p>

                    <Link href="/" className="w-full">
                        <button
                            className="w-full font-dm-sans font-semibold text-sm text-white py-3 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                            style={{ background: "linear-gradient(135deg,#7C3AED,#3D6EFA)" }}
                        >
                            Back to Home
                        </button>
                    </Link>

                </div>
            </div>
        </main>
    )
}

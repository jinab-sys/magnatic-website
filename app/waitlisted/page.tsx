import Link from "next/link"

export default function WaitlistedPage() {
    return (
        <main className="relative min-h-screen flex items-center justify-center p-6">
            <div className="relative z-10 w-full max-w-md text-center">

                <div className="flex justify-center mb-10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo-full-white.svg" alt="Magnatic" className="h-8" />
                </div>

                <div className="mag-panel rounded-3xl p-10 shadow-2xl flex flex-col items-center gap-6">

                    <div className="mag-gradient-fill-soft w-16 h-16 rounded-full flex items-center justify-center text-3xl">
                        🎉
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">You&apos;re on the waitlist!</h1>
                        <p className="mag-text-muted text-sm leading-relaxed">
                            You&apos;re on the list for our premium service—AI-led product ads and managed creator accounts.
                            We&apos;ll email you when we&apos;re ready with next steps.
                        </p>
                    </div>

                    <div className="w-full h-px bg-white/10" />

                    <p className="text-[color:var(--mag-fg-subtle)] text-xs">
                        Keep an eye on your inbox — we&apos;re excited to get you started.
                    </p>

                    <Link href="/" className="w-full">
                        <button
                            type="button"
                            className="mag-btn-primary w-full font-dm-sans font-semibold text-sm py-3 rounded-xl hover:scale-[1.02]"
                        >
                            Back to Home
                        </button>
                    </Link>

                </div>
            </div>
        </main>
    )
}

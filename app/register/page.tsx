"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const router = useRouter()

    const [businessName, setBusinessName] = useState("")
    const [reachVia, setReachVia]         = useState<"phone" | "email" | "">("")
    const [contactValue, setContactValue] = useState("")
    const [message, setMessage]           = useState("")
    const [loading, setLoading]           = useState(false)
    const [error, setError]               = useState("")

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError("")

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ businessName, reachVia, contactValue, message }),
        })

        if (!res.ok) {
            let msg = "Something went wrong. Please try again."
            try {
                const data = await res.json()
                if (data?.error) msg = data.error
            } catch { /* non-JSON error body */ }
            setError(msg)
            setLoading(false)
            return
        }

        document.cookie = "magnatic_registered=true; path=/; max-age=31536000; SameSite=Lax"
        router.push("/waitlisted")
    }

    return (
        <main className="relative min-h-screen flex items-center justify-center p-6">
            <div className="relative z-10 w-full max-w-md">

                <div className="flex justify-center mb-10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo-full-white.svg" alt="Magnatic" className="h-8" />
                </div>

                <div className="border border-white/20 bg-black/50 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">
                    <h1 className="text-2xl font-bold text-white mb-1">Get Access</h1>
                    <p className="text-neutral-400 text-sm mb-8">
                        Tell us about your business and we'll reach out.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        {/* Business Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                                Business Name *
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Acme Inc."
                                value={businessName}
                                onChange={e => setBusinessName(e.target.value)}
                                className="bg-white/5 border border-white/10 text-white placeholder:text-neutral-600 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 transition-colors"
                            />
                        </div>

                        {/* How to reach */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                                How would you like to be reached? *
                            </label>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => { setReachVia("phone"); setContactValue("") }}
                                    className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all ${
                                        reachVia === "phone"
                                            ? "bg-white text-black border-white"
                                            : "bg-white/5 text-neutral-400 border-white/10 hover:border-white/30"
                                    }`}
                                >
                                    📞 Via Phone
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setReachVia("email"); setContactValue("") }}
                                    className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all ${
                                        reachVia === "email"
                                            ? "bg-white text-black border-white"
                                            : "bg-white/5 text-neutral-400 border-white/10 hover:border-white/30"
                                    }`}
                                >
                                    ✉️ Via Email
                                </button>
                            </div>
                        </div>

                        {/* Contact input — shows after selection */}
                        {reachVia === "phone" && (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="+1 (555) 000-0000"
                                    value={contactValue}
                                    onChange={e => setContactValue(e.target.value)}
                                    className="bg-white/5 border border-white/10 text-white placeholder:text-neutral-600 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 transition-colors"
                                />
                            </div>
                        )}

                        {reachVia === "email" && (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="you@company.com"
                                    value={contactValue}
                                    onChange={e => setContactValue(e.target.value)}
                                    className="bg-white/5 border border-white/10 text-white placeholder:text-neutral-600 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 transition-colors"
                                />
                            </div>
                        )}

                        {/* Optional message */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                                Message for us{" "}
                                <span className="normal-case text-neutral-600">(optional)</span>
                            </label>
                            <textarea
                                placeholder="Tell us what you're looking to achieve..."
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                rows={3}
                                className="bg-white/5 border border-white/10 text-white placeholder:text-neutral-600 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 transition-colors resize-none"
                            />
                        </div>

                        {error && <p className="text-red-400 text-sm">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading || !reachVia || !contactValue}
                            className="mt-1 bg-white text-black font-semibold rounded-xl py-3 text-sm hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {loading ? "Submitting…" : "Register"}
                        </button>

                    </form>
                </div>
            </div>
        </main>
    )
}
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const router = useRouter()

    const [businessName, setBusinessName] = useState("")
    const [email, setEmail]               = useState("")
    const [phone, setPhone]               = useState("")
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
            body: JSON.stringify({ businessName, email, phone, message }),
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

                <div className="mag-panel rounded-3xl p-8 shadow-2xl">
                    <h1 className="text-2xl font-bold text-white mb-1">Get Access</h1>
                    <p className="mag-text-muted text-sm mb-8">
                        Tell us about your business and we&apos;ll reach out.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        {/* Business Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium mag-text-muted uppercase tracking-wider">
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

                        {/* Email — required */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium mag-text-muted uppercase tracking-wider">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="you@company.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="bg-white/5 border border-white/10 text-white placeholder:text-neutral-600 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 transition-colors"
                            />
                        </div>

                        {/* Phone — optional */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium mag-text-muted uppercase tracking-wider">
                                Phone Number{" "}
                                <span className="normal-case text-[color:var(--mag-fg-subtle)]">(optional)</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                className="bg-white/5 border border-white/10 text-white placeholder:text-neutral-600 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 transition-colors"
                            />
                        </div>

                        {/* Optional message */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium mag-text-muted uppercase tracking-wider">
                                Message for us{" "}
                                <span className="normal-case text-[color:var(--mag-fg-subtle)]">(optional)</span>
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
                            disabled={loading}
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

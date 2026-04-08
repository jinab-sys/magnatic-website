"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

type RegisterFormProps = {
    /** Show logo above the card (standalone /register page). */
    showLogo?: boolean
    /** Landing embed: section provides the headline; card is fields only. */
    embedded?: boolean
}

export function RegisterForm({ showLogo = false, embedded = false }: RegisterFormProps) {
    const router = useRouter()

    const [businessName, setBusinessName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

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
            } catch {
                /* non-JSON error body */
            }
            setError(msg)
            setLoading(false)
            return
        }

        document.cookie = "magnatic_registered=true; path=/; max-age=31536000; SameSite=Lax"
        router.push("/waitlisted")
    }

    return (
        <>
            {showLogo && (
                <div className="mb-10 flex justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo-full-white.svg" alt="Magnatic" className="h-8" />
                </div>
            )}

            <div className="mag-panel rounded-3xl p-8 shadow-2xl">
                {!embedded && (
                    <>
                        <h2 className="mb-1 text-2xl font-bold text-white">Get Access</h2>
                        <p className="mb-8 text-sm mag-text-muted">Tell us about your business and we&apos;ll reach out.</p>
                    </>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium uppercase tracking-wider mag-text-muted">
                            Business Name *
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Acme Inc."
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-white/30"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium uppercase tracking-wider mag-text-muted">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="you@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-white/30"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium uppercase tracking-wider mag-text-muted">
                            Phone Number{" "}
                            <span className="normal-case text-[color:var(--mag-fg-subtle)]">(optional)</span>
                        </label>
                        <input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-white/30"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium uppercase tracking-wider mag-text-muted">
                            Message for us{" "}
                            <span className="normal-case text-[color:var(--mag-fg-subtle)]">(optional)</span>
                        </label>
                        <textarea
                            placeholder="Tell us what you're looking to achieve..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                            className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-white/30"
                        />
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mag-btn-primary mt-1 rounded-xl py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {loading ? "Submitting…" : "Register"}
                    </button>
                </form>
            </div>
        </>
    )
}

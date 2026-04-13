"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const SERVICES = [
    { value: "brand_ad", label: "Brand Ad" },
    { value: "social_calendar", label: "Social Calendar" },
    { value: "end_to_end_social_media_management", label: "End to End SMM" },
]

type RegisterFormProps = {
    showLogo?: boolean
    embedded?: boolean
}

export function RegisterForm({ showLogo = false, embedded = false }: RegisterFormProps) {
    const router = useRouter()

    const [businessName, setBusinessName] = useState("")
    const [personName, setPersonName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [businessAddress, setBusinessAddress] = useState("")
    const [service, setService] = useState("")
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
            body: JSON.stringify({ businessName, personName, email, phone, businessAddress, service, message }),
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

    const inputClass = "rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-white/30"
    const labelClass = "text-xs font-medium uppercase tracking-wider mag-text-muted"

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
                        <h2 className="mb-1 text-2xl font-bold text-white">Get in Touch</h2>
                        <p className="mb-8 text-sm mag-text-muted">Tell us about your business and we&apos;ll reach out.</p>
                    </>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Row 1: Business Name + Person Name */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>Business Name *</label>
                            <input
                                type="text"
                                required
                                placeholder="Acme Inc."
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>Your Name *</label>
                            <input
                                type="text"
                                required
                                placeholder="John Smith"
                                value={personName}
                                onChange={(e) => setPersonName(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Row 2: Email + Phone */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>Email Address *</label>
                            <input
                                type="email"
                                required
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>Phone Number *</label>
                            <input
                                type="tel"
                                required
                                placeholder="+1 (555) 000-0000"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Business Address */}
                    <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                            Business Address{" "}
                            <span className="normal-case text-[color:var(--mag-fg-subtle)]">(optional)</span>
                        </label>
                        <input
                            type="text"
                            placeholder="123 Main St, New York, NY"
                            value={businessAddress}
                            onChange={(e) => setBusinessAddress(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    {/* Service */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClass}>Which service do you want? *</label>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                            {SERVICES.map((s) => (
                                <button
                                    key={s.value}
                                    type="button"
                                    onClick={() => setService(s.value)}
                                    className="rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200"
                                    style={{
                                        background: service === s.value ? "rgba(179,255,118,0.1)" : "rgba(255,255,255,0.04)",
                                        borderColor: service === s.value ? "rgba(179,255,118,0.5)" : "rgba(255,255,255,0.1)",
                                        color: service === s.value ? "var(--mag-accent-from)" : "#aaa",
                                    }}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                        {/* hidden required input to enforce selection */}
                        <input type="text" required value={service} onChange={() => {}} className="sr-only" aria-hidden />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                            Message{" "}
                            <span className="normal-case text-[color:var(--mag-fg-subtle)]">(optional)</span>
                        </label>
                        <textarea
                            placeholder="Tell us what you're looking to achieve..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                            className={`resize-none ${inputClass}`}
                        />
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mag-btn-primary mt-1 rounded-xl py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {loading ? "Submitting…" : "Submit"}
                    </button>
                </form>
            </div>
        </>
    )
}

import { RegisterForm } from "@/components/blocks/register-form"

export function RegisterSection() {
    return (
        <section
            id="register"
            className="relative z-20 scroll-mt-28 border-t border-white/10 py-20 sm:py-28"
            aria-labelledby="register-heading"
        >
            <div className="mx-auto max-w-lg px-6">
                <div className="mb-10 text-center">
                    <p className="mb-3 font-space-mono text-[11px] uppercase tracking-[0.15em] mag-eyebrow">Get started</p>
                    <h2 id="register-heading" className="font-syne text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Book a meeting
                    </h2>
                    <p className="mx-auto mt-3 max-w-md font-dm-sans text-sm text-white/65">
                        We&apos;re opening registration for our waitlist. Sign up to be notified when spots open for our premium service.
                    </p>
                </div>
                <RegisterForm embedded />
            </div>
        </section>
    )
}

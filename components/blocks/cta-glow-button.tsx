"use client"

import { scrollToRegisterForm } from "@/lib/scroll-to-register"

export function CtaGlowButton() {
    return (
        <button
            type="button"
            onClick={() => scrollToRegisterForm()}
            className="mag-btn-primary font-dm-sans font-medium text-base sm:text-lg px-10 py-4 rounded-full hover:scale-105"
        >
            Contact Us →
        </button>
    )
}

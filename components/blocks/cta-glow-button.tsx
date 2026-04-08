"use client"
import Link from "next/link"

export function CtaGlowButton() {
    return (
        <Link href="/#register">
            <button
                type="button"
                className="mag-btn-primary font-dm-sans font-medium text-white text-base sm:text-lg px-10 py-4 rounded-full hover:scale-105"
            >
                Create Your First Video Free →
            </button>
        </Link>
    )
}

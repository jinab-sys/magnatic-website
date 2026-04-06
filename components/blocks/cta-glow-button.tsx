"use client"
import Link from "next/link"

/* ⚠️ DO NOT MODIFY: triggers Supabase registration flow */
export function CtaGlowButton() {
    return (
        <Link href="/register">
            <button
                className="font-dm-sans font-medium text-white text-base sm:text-lg px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg,#7C3AED,#3D6EFA)" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 40px rgba(124,58,237,0.55),0 0 80px rgba(61,110,250,0.2)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
            >
                Create Your First Video Free →
            </button>
        </Link>
    )
}

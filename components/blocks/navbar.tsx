"use client"
import Link from 'next/link'
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs"

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/5 transition-opacity duration-1000 animate-in fade-in">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo-full-white.svg" alt="Magnatic Logo" className="h-8" />
                </Link>

                <div className="flex items-center gap-4">
                    <Show when="signed-out">
                        <SignInButton>
                            <button className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Sign In</button>
                        </SignInButton>
                        <SignUpButton>
                            <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-6 py-2 rounded-full transition-all text-sm font-medium">Sign Up</button>
                        </SignUpButton>
                    </Show>
                    <Show when="signed-in">
                        <UserButton />
                    </Show>
                </div>
            </div>
        </nav>
    )
}

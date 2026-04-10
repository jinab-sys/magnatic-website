"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const navLinks = [
        { label: "Features",     id: "features"      },
        { label: "How It Works", id: "how-it-works"  },
        { label: "Avatars",      id: "avatars"        },
    ]

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 backdrop-blur-xl ${
                    scrolled ? "border-white/15" : "border-white/8"
                }`}
                style={{ background: scrolled ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.25)" }}
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logo-full-white.svg" alt="Magnatic" className="h-7" />
                    </Link>

                    {/* Desktop nav links */}
                    <ul className="hidden md:flex items-center gap-8 list-none">
                        {navLinks.map(l => (
                            <li key={l.label}>
                                <button
                                    type="button"
                                    onClick={() => scrollTo(l.id)}
                                    className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 font-dm-sans bg-transparent border-none cursor-pointer"
                                >
                                    {l.label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center">
                        <Link href="/register">
                            <button
                                type="button"
                                className="mag-btn-primary font-dm-sans font-medium text-sm px-6 py-2.5 rounded-full hover:scale-105"
                            >
                                Contact Us
                            </button>
                        </Link>
                    </div>

                    {/* Hamburger */}
                    <button
                        className="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                        <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                        <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="fixed top-20 left-0 right-0 z-40 backdrop-blur-xl border-b border-white/10 px-6 py-6" style={{ background: "rgba(0,0,0,0.7)" }}>
                    <ul className="list-none flex flex-col gap-5 mb-6">
                        {navLinks.map(l => (
                            <li key={l.label}>
                                <button
                                    type="button"
                                    onClick={() => { scrollTo(l.id); setMenuOpen(false) }}
                                    className="text-white/70 hover:text-white text-lg font-medium transition-colors font-dm-sans bg-transparent border-none cursor-pointer w-full text-left"
                                >
                                    {l.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <Link href="/register" onClick={() => setMenuOpen(false)}>
                        <button
                            type="button"
                            className="mag-btn-primary font-dm-sans font-medium text-sm w-full py-3 rounded-full"
                        >
                            Contact Us
                        </button>
                    </Link>
                </div>
            )}
        </>
    )
}

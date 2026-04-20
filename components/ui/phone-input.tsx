"use client"

import { useEffect, useRef, useState } from "react"

type Country = {
    name: string
    code: string   // dial code e.g. "+1"
    iso: string    // ISO 3166-1 alpha-2 e.g. "US"
}

// Americas + Europe first, then rest alphabetically
const COUNTRIES: Country[] = [
    // North America
    { name: "United States", code: "+1", iso: "US" },
    { name: "Canada", code: "+1", iso: "CA" },
    { name: "Mexico", code: "+52", iso: "MX" },
    // Europe
    { name: "United Kingdom", code: "+44", iso: "GB" },
    { name: "Germany", code: "+49", iso: "DE" },
    { name: "France", code: "+33", iso: "FR" },
    { name: "Italy", code: "+39", iso: "IT" },
    { name: "Spain", code: "+34", iso: "ES" },
    { name: "Netherlands", code: "+31", iso: "NL" },
    { name: "Belgium", code: "+32", iso: "BE" },
    { name: "Switzerland", code: "+41", iso: "CH" },
    { name: "Austria", code: "+43", iso: "AT" },
    { name: "Sweden", code: "+46", iso: "SE" },
    { name: "Norway", code: "+47", iso: "NO" },
    { name: "Denmark", code: "+45", iso: "DK" },
    { name: "Finland", code: "+358", iso: "FI" },
    { name: "Poland", code: "+48", iso: "PL" },
    { name: "Portugal", code: "+351", iso: "PT" },
    { name: "Greece", code: "+30", iso: "GR" },
    { name: "Czech Republic", code: "+420", iso: "CZ" },
    { name: "Hungary", code: "+36", iso: "HU" },
    { name: "Romania", code: "+40", iso: "RO" },
    { name: "Ukraine", code: "+380", iso: "UA" },
    { name: "Ireland", code: "+353", iso: "IE" },
    { name: "Croatia", code: "+385", iso: "HR" },
    { name: "Slovakia", code: "+421", iso: "SK" },
    { name: "Bulgaria", code: "+359", iso: "BG" },
    { name: "Serbia", code: "+381", iso: "RS" },
    { name: "Lithuania", code: "+370", iso: "LT" },
    { name: "Latvia", code: "+371", iso: "LV" },
    { name: "Estonia", code: "+372", iso: "EE" },
    { name: "Slovenia", code: "+386", iso: "SI" },
    { name: "Luxembourg", code: "+352", iso: "LU" },
    { name: "Malta", code: "+356", iso: "MT" },
    { name: "Iceland", code: "+354", iso: "IS" },
    // Rest of world (alphabetical)
    { name: "Afghanistan", code: "+93", iso: "AF" },
    { name: "Albania", code: "+355", iso: "AL" },
    { name: "Algeria", code: "+213", iso: "DZ" },
    { name: "Argentina", code: "+54", iso: "AR" },
    { name: "Armenia", code: "+374", iso: "AM" },
    { name: "Australia", code: "+61", iso: "AU" },
    { name: "Azerbaijan", code: "+994", iso: "AZ" },
    { name: "Bahrain", code: "+973", iso: "BH" },
    { name: "Bangladesh", code: "+880", iso: "BD" },
    { name: "Belarus", code: "+375", iso: "BY" },
    { name: "Bolivia", code: "+591", iso: "BO" },
    { name: "Bosnia & Herzegovina", code: "+387", iso: "BA" },
    { name: "Brazil", code: "+55", iso: "BR" },
    { name: "Cambodia", code: "+855", iso: "KH" },
    { name: "Cameroon", code: "+237", iso: "CM" },
    { name: "Chile", code: "+56", iso: "CL" },
    { name: "China", code: "+86", iso: "CN" },
    { name: "Colombia", code: "+57", iso: "CO" },
    { name: "Costa Rica", code: "+506", iso: "CR" },
    { name: "Cuba", code: "+53", iso: "CU" },
    { name: "Cyprus", code: "+357", iso: "CY" },
    { name: "DR Congo", code: "+243", iso: "CD" },
    { name: "Ecuador", code: "+593", iso: "EC" },
    { name: "Egypt", code: "+20", iso: "EG" },
    { name: "El Salvador", code: "+503", iso: "SV" },
    { name: "Ethiopia", code: "+251", iso: "ET" },
    { name: "Georgia", code: "+995", iso: "GE" },
    { name: "Ghana", code: "+233", iso: "GH" },
    { name: "Guatemala", code: "+502", iso: "GT" },
    { name: "Honduras", code: "+504", iso: "HN" },
    { name: "Hong Kong", code: "+852", iso: "HK" },
    { name: "India", code: "+91", iso: "IN" },
    { name: "Indonesia", code: "+62", iso: "ID" },
    { name: "Iran", code: "+98", iso: "IR" },
    { name: "Iraq", code: "+964", iso: "IQ" },
    { name: "Israel", code: "+972", iso: "IL" },
    { name: "Japan", code: "+81", iso: "JP" },
    { name: "Jordan", code: "+962", iso: "JO" },
    { name: "Kazakhstan", code: "+7", iso: "KZ" },
    { name: "Kenya", code: "+254", iso: "KE" },
    { name: "Kuwait", code: "+965", iso: "KW" },
    { name: "Kyrgyzstan", code: "+996", iso: "KG" },
    { name: "Lebanon", code: "+961", iso: "LB" },
    { name: "Libya", code: "+218", iso: "LY" },
    { name: "Malaysia", code: "+60", iso: "MY" },
    { name: "Maldives", code: "+960", iso: "MV" },
    { name: "Morocco", code: "+212", iso: "MA" },
    { name: "Myanmar", code: "+95", iso: "MM" },
    { name: "Nepal", code: "+977", iso: "NP" },
    { name: "New Zealand", code: "+64", iso: "NZ" },
    { name: "Nicaragua", code: "+505", iso: "NI" },
    { name: "Nigeria", code: "+234", iso: "NG" },
    { name: "North Macedonia", code: "+389", iso: "MK" },
    { name: "Oman", code: "+968", iso: "OM" },
    { name: "Pakistan", code: "+92", iso: "PK" },
    { name: "Panama", code: "+507", iso: "PA" },
    { name: "Paraguay", code: "+595", iso: "PY" },
    { name: "Peru", code: "+51", iso: "PE" },
    { name: "Philippines", code: "+63", iso: "PH" },
    { name: "Qatar", code: "+974", iso: "QA" },
    { name: "Russia", code: "+7", iso: "RU" },
    { name: "Rwanda", code: "+250", iso: "RW" },
    { name: "Saudi Arabia", code: "+966", iso: "SA" },
    { name: "Senegal", code: "+221", iso: "SN" },
    { name: "Singapore", code: "+65", iso: "SG" },
    { name: "South Africa", code: "+27", iso: "ZA" },
    { name: "South Korea", code: "+82", iso: "KR" },
    { name: "Sri Lanka", code: "+94", iso: "LK" },
    { name: "Sudan", code: "+249", iso: "SD" },
    { name: "Syria", code: "+963", iso: "SY" },
    { name: "Taiwan", code: "+886", iso: "TW" },
    { name: "Tajikistan", code: "+992", iso: "TJ" },
    { name: "Tanzania", code: "+255", iso: "TZ" },
    { name: "Thailand", code: "+66", iso: "TH" },
    { name: "Tunisia", code: "+216", iso: "TN" },
    { name: "Turkey", code: "+90", iso: "TR" },
    { name: "Turkmenistan", code: "+993", iso: "TM" },
    { name: "Uganda", code: "+256", iso: "UG" },
    { name: "United Arab Emirates", code: "+971", iso: "AE" },
    { name: "Uruguay", code: "+598", iso: "UY" },
    { name: "Uzbekistan", code: "+998", iso: "UZ" },
    { name: "Venezuela", code: "+58", iso: "VE" },
    { name: "Vietnam", code: "+84", iso: "VN" },
    { name: "Yemen", code: "+967", iso: "YE" },
    { name: "Zimbabwe", code: "+263", iso: "ZW" },
]

function flag(iso: string) {
    return iso
        .toUpperCase()
        .split("")
        .map((c) => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0)))
        .join("")
}

type Props = {
    onChange: (value: string) => void
    required?: boolean
}

export function PhoneInput({ onChange, required }: Props) {
    const [selected, setSelected] = useState<Country>(COUNTRIES[0])
    const [number, setNumber] = useState("")
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const dropdownRef = useRef<HTMLDivElement>(null)
    const searchRef = useRef<HTMLInputElement>(null)

    // Keep parent value in sync
    useEffect(() => {
        const full = number ? `${selected.code} ${number}` : ""
        onChange(full)
    }, [selected, number]) // eslint-disable-line react-hooks/exhaustive-deps

    // Close on outside click
    useEffect(() => {
        function handle(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false)
                setSearch("")
            }
        }
        document.addEventListener("mousedown", handle)
        return () => document.removeEventListener("mousedown", handle)
    }, [])

    // Focus search when dropdown opens
    useEffect(() => {
        if (open) setTimeout(() => searchRef.current?.focus(), 50)
    }, [open])

    const filtered = search.trim()
        ? COUNTRIES.filter((c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.code.includes(search)
        )
        : COUNTRIES

    function pick(country: Country) {
        setSelected(country)
        setOpen(false)
        setSearch("")
    }

    return (
        <div className="flex w-full gap-2" ref={dropdownRef}>
            {/* Country code trigger */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white transition-colors hover:border-white/20 focus:border-white/30 focus:outline-none whitespace-nowrap"
                >
                    <span className="text-base leading-none">{flag(selected.iso)}</span>
                    <span className="text-neutral-300">{selected.code}</span>
                    <svg className={`h-3 w-3 text-neutral-500 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {open && (
                    <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-xl border border-white/10 bg-[#111] shadow-2xl">
                        {/* Search */}
                        <div className="p-2 border-b border-white/10">
                            <input
                                ref={searchRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search country..."
                                className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm text-white placeholder:text-neutral-600 outline-none border border-white/10 focus:border-white/25"
                            />
                        </div>

                        {/* List */}
                        <ul className="max-h-52 overflow-y-auto py-1">
                            {filtered.length === 0 ? (
                                <li className="px-3 py-2 text-sm text-neutral-500">No results</li>
                            ) : (
                                filtered.map((c) => (
                                    <li key={`${c.iso}-${c.code}`}>
                                        <button
                                            type="button"
                                            onClick={() => pick(c)}
                                            className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-neutral-300 hover:bg-white/5 hover:text-white transition-colors text-left"
                                        >
                                            <span className="text-base leading-none w-6 shrink-0">{flag(c.iso)}</span>
                                            <span className="flex-1 truncate">{c.name}</span>
                                            <span className="text-neutral-500 shrink-0">{c.code}</span>
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                )}
            </div>

            {/* Number input */}
            <input
                type="tel"
                required={required}
                placeholder="555 000 0000"
                value={number}
                onChange={(e) => setNumber(e.target.value.replace(/[^\d\s\-().]/g, ""))}
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-white/30"
            />
        </div>
    )
}

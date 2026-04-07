/**
 * Public-only influencer metadata for marketing UI.
 * Do not add passwords, TOTP secrets, or internal IDs here.
 *
 * Flagship personas: each row uses assets only from its matching folder
 * under app/assets/influencer_profiles.
 */
export type PublicInfluencer = {
    /** Instagram @handle (shown in UI) */
    handle: string
    instagramUrl: string
    /** Persona / folder label, e.g. Ayla */
    niche: string
    /** Path under app/assets/influencer_profiles (served via /api/influencer-image) */
    imageFile: string
}

const GRADIENTS = [
    "linear-gradient(135deg, #6366f1, #7c3aed)",
    "linear-gradient(135deg, #818cf8, #6366f1)",
    "linear-gradient(135deg, #7c3aed, #a78bfa)",
    "linear-gradient(135deg, #4f46e5, #8b5cf6)",
] as const

/**
 * One image per folder (non-video). URLs:
 * Ayla → https://www.instagram.com/delulu_ayla
 * Maaya → https://www.instagram.com/maaya_reviews
 * Ayzad → https://www.instagram.com/_shroom_dude
 * Rayan → https://www.instagram.com/re_verse06
 */
export const PUBLIC_INFLUENCERS: PublicInfluencer[] = [
    {
        niche: "Ayla",
        handle: "delulu_ayla",
        instagramUrl:
            "https://www.instagram.com/delulu_ayla?igsh=MWNnbmpxYmZkMTFseQ%3D%3D",
        imageFile: "Ayla/openart-image_1774603060558_5cbf5624_1774603061836_445541b2.png",
    },
    {
        niche: "Maaya",
        handle: "maaya_reviews",
        instagramUrl:
            "https://www.instagram.com/maaya_reviews?igsh=MWgwZTdiaTNzaHM3Ng%3D%3D",
        imageFile: "Maaya/hf_20260306_071435_1c0f89a8-110a-4616-8929-7d34a2beb672.png",
    },
    {
        niche: "Ayzad",
        handle: "_shroom_dude",
        instagramUrl:
            "https://www.instagram.com/_shroom_dude?igsh=MTN0OW5xaGs4Zzd0cw%3D%3D",
        imageFile: "Ayzad/hf_20260223_070938_2aede0df-9ec3-4b11-9ab2-675aa716ef44 (1).png",
    },
    {
        niche: "Rayan",
        handle: "re_verse06",
        instagramUrl:
            "https://www.instagram.com/re_verse06?igsh=MTZmZjJtazNiMHZ2bQ%3D%3D",
        imageFile: "Rayan/Gemini_Generated_Image_lojz14lojz14lojz.png",
    },
]

export const INFLUENCER_COUNT = PUBLIC_INFLUENCERS.length

export function influencerPortraitUrl(imageFile: string): string {
    return `/api/influencer-image?path=${encodeURIComponent(imageFile)}`
}

export function initialsFromHandle(handle: string): string {
    const letters = handle.replace(/[^a-zA-Z]/g, "")
    if (letters.length >= 2) return (letters[0] + letters[1]).toUpperCase()
    const alnum = handle.replace(/[^a-zA-Z0-9]/g, "")
    if (alnum.length >= 2) return (alnum[0] + alnum[1]).toUpperCase()
    return handle.slice(0, 2).toUpperCase() || "?"
}

export function gradientForIndex(i: number): string {
    return GRADIENTS[i % GRADIENTS.length]
}

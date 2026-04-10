"use client"

import { type RefObject, useEffect, useState } from "react"

type UseInViewOnceOptions = {
    /** e.g. "200px 0px" — start loading before the element enters the viewport */
    rootMargin?: string
    threshold?: number
}

/**
 * Sets `true` when `ref` intersects the viewport (optionally with margin), then stays true.
 */
export function useInViewOnce<T extends Element>(
    ref: RefObject<T | null>,
    { rootMargin = "0px", threshold = 0.01 }: UseInViewOnceOptions = {},
): boolean {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setVisible(true)
                    obs.disconnect()
                }
            },
            { rootMargin, threshold },
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [ref, rootMargin, threshold])

    return visible
}

"use client"

import { useEffect } from "react"
import { scrollToRegisterForm, SCROLL_TO_REGISTER_SESSION_KEY } from "@/lib/scroll-to-register"

/** Mount on `/` only: after client nav from other pages with {@link queueScrollToRegisterAfterLandingOnHome}. */
export function ScrollToRegisterOnHomeLoad() {
    useEffect(() => {
        try {
            if (sessionStorage.getItem(SCROLL_TO_REGISTER_SESSION_KEY)) {
                sessionStorage.removeItem(SCROLL_TO_REGISTER_SESSION_KEY)
                scrollToRegisterForm()
            }
        } catch {
            /* private mode */
        }
    }, [])
    return null
}

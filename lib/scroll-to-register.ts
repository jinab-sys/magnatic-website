/**
 * DOM id on the register / waitlist section.
 * @see components/blocks/register-section.tsx (`scroll-mt-*` handles the fixed navbar)
 */
export const REGISTER_SECTION_ID = "register"

/** Set before `router.push("/")` from non-home routes; home page clears it and scrolls. */
export const SCROLL_TO_REGISTER_SESSION_KEY = "mag-scroll-to-register"

export function queueScrollToRegisterAfterLandingOnHome(): void {
    if (typeof sessionStorage === "undefined") return
    try {
        sessionStorage.setItem(SCROLL_TO_REGISTER_SESSION_KEY, "1")
    } catch {
        /* private mode */
    }
}

/**
 * Smooth-scroll to the register form. Unlike `href="#register"`, this runs on every
 * click even when the URL already contains the hash.
 *
 * Retries briefly if the section is not in the DOM yet (e.g. lazy-loaded below the fold).
 */
export function scrollToRegisterForm(): void {
    if (typeof document === "undefined") return

    const scrollIfFound = (): boolean => {
        const el = document.getElementById(REGISTER_SECTION_ID)
        if (!el) return false
        el.scrollIntoView({ behavior: "smooth", block: "start" })
        return true
    }

    if (scrollIfFound()) return

    const start = performance.now()
    const timeoutMs = 5000

    const tick = (): void => {
        if (scrollIfFound()) return
        if (performance.now() - start < timeoutMs) {
            requestAnimationFrame(tick)
        }
    }
    requestAnimationFrame(tick)
}

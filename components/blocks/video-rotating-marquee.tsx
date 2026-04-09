"use client"

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react"
import { Volume2, VolumeX } from "lucide-react"

export type RotatingVideoItem = {
    src: string
    title: string
}

type VideoRotatingMarqueeProps = {
    videos: RotatingVideoItem[]
}

const noopSubscribe = () => () => {}

const MIN_RING_SLOTS = 12

function expandRingVideos(videos: RotatingVideoItem[]): RotatingVideoItem[] {
    if (videos.length === 0) return []
    if (videos.length >= MIN_RING_SLOTS) return videos
    const out: RotatingVideoItem[] = []
    let k = 0
    while (out.length < MIN_RING_SLOTS) {
        out.push(videos[k % videos.length]!)
        k++
    }
    return out
}

function minArcDistanceToFront(deg: number): number {
    const u = ((deg % 360) + 360) % 360
    return Math.min(u, 360 - u)
}

/** Signed angle from “front” toward camera: 0° = facing viewer, ±90° = sides, ±180° = back. */
function signedAngleFromFrontDeg(slotAngleDeg: number, rotationDeg: number): number {
    let a = ((slotAngleDeg + rotationDeg) % 360) + 360
    a %= 360
    if (a > 180) a -= 360
    return a
}

/**
 * True cylindrical motion: cards orbit with rotateY + translateZ; scale + brightness fall off
 * toward the back. Z-order uses cos(signedAngle) so the front hemisphere always stacks above
 * the rear (cards curve behind through depth, not z-fight).
 */
function cellTransformForAngle(
    slotAngleDeg: number,
    rotationDeg: number,
    radiusPx: number,
): { transform: string; zIndex: number; opacity: number; filter: string } {
    const signed = signedAngleFromFrontDeg(slotAngleDeg, rotationDeg)
    const signedRad = (signed * Math.PI) / 180
    const facing = Math.cos(signedRad)

    const d = minArcDistanceToFront(slotAngleDeg + rotationDeg)
    const u = Math.min(d, 100) / 100
    const scale = 0.34 + 0.66 * Math.cos(u * (Math.PI / 2))
    const zBoost = (1 - Math.min(d, 68) / 68) * 68
    const opacity = 0.52 + (1 - u) * 0.48

    const zIndex = Math.round(40 + 960 * (1 + facing) / 2)
    const brightness = 0.58 + 0.42 * (1 + facing) / 2

    return {
        transform: `rotateY(${slotAngleDeg}deg) translateZ(${radiusPx + zBoost}px) scale(${scale})`,
        zIndex,
        opacity,
        filter: `brightness(${brightness})`,
    }
}

type RingCellProps = {
    video: RotatingVideoItem
    cardWidthPx: number
    videoRef: (el: HTMLVideoElement | null) => void
    cellRef: (el: HTMLDivElement | null) => void
}

function RingVideoCell({ video, cardWidthPx, videoRef, cellRef }: RingCellProps) {
    const [muted, setMuted] = useState(true)
    const hasMounted = useSyncExternalStore(noopSubscribe, () => true, () => false)
    const localVideoRef = useRef<HTMLVideoElement | null>(null)

    const setRefs = useCallback(
        (node: HTMLVideoElement | null) => {
            localVideoRef.current = node
            videoRef(node)
        },
        [videoRef],
    )

    useEffect(() => {
        const v = localVideoRef.current
        if (v) v.muted = muted
    }, [muted])

    const cardHeightPx = (cardWidthPx * 16) / 9

    return (
        <div
            ref={cellRef}
            className="absolute left-1/2 top-1/2 overflow-hidden rounded-[1.75rem] border border-white/12 bg-black/70 shadow-[0_24px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-[rgba(179,255,118,0.12)]"
            style={{
                width: cardWidthPx,
                height: cardHeightPx,
                marginLeft: -cardWidthPx / 2,
                marginTop: -cardHeightPx / 2,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
            }}
        >
            <div className="group relative h-full w-full bg-neutral-950">
                <video
                    ref={setRefs}
                    suppressHydrationWarning
                    src={video.src}
                    muted={hasMounted ? muted : true}
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10" />
                <p className="absolute left-2.5 top-2.5 rounded-md bg-black/55 px-2 py-0.5 font-space-mono text-[8px] uppercase tracking-wider text-white/90">
                    AI Generated
                </p>
                <button
                    type="button"
                    aria-label={muted ? "Unmute video" : "Mute video"}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setMuted((m) => !m)
                    }}
                    className="absolute bottom-2.5 right-2.5 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white/95 backdrop-blur-sm transition hover:bg-black/75"
                >
                    {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                </button>
            </div>
            <span className="sr-only">{video.title}</span>
        </div>
    )
}

/**
 * 3D cylindrical ring: same videos as {@link VideoShowcaseGrid}. Dark stage; front card
 * is largest, back-of-ring cards shrink and soften for a clear rotational read.
 */
export function VideoRotatingMarquee({ videos }: VideoRotatingMarqueeProps) {
    const ringItems = useMemo(() => expandRingVideos(videos), [videos])
    const n = ringItems.length
    const angleStepDeg = 360 / n

    const sceneRef = useRef<HTMLDivElement>(null)
    const carouselRef = useRef<HTMLDivElement>(null)
    const rotationRef = useRef(0)
    const lastTRef = useRef<number | null>(null)
    const videoElsRef = useRef<(HTMLVideoElement | null)[]>([])
    const cellElsRef = useRef<(HTMLDivElement | null)[]>([])
    const layoutRef = useRef({ radius: 400, cardW: 200 })
    const pausedByHoverRef = useRef(false)

    const [layout, setLayout] = useState({ radius: 400, cardW: 200 })
    const [reduceMotion, setReduceMotion] = useState(false)

    useEffect(() => {
        layoutRef.current = layout
    }, [layout])

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
        const apply = () => setReduceMotion(mq.matches)
        apply()
        mq.addEventListener("change", apply)
        return () => mq.removeEventListener("change", apply)
    }, [])

    useEffect(() => {
        const el = sceneRef.current
        if (!el) return
        const ro = new ResizeObserver(() => {
            const w = el.clientWidth
            const cardW = Math.min(280, Math.max(168, w * 0.245))
            const sin = Math.sin(Math.PI / n)
            const radius = sin > 0.001 ? (cardW * 0.94) / (2 * sin) + cardW * 0.28 : 400
            setLayout({ radius, cardW })
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [n])

    const videoSlotRefs = useMemo(
        () =>
            Array.from({ length: n }, (_, index) => (node: HTMLVideoElement | null) => {
                const arr = videoElsRef.current
                while (arr.length <= index) arr.push(null)
                arr[index] = node
            }),
        [n],
    )

    const cellSlotRefs = useMemo(
        () =>
            Array.from({ length: n }, (_, index) => (node: HTMLDivElement | null) => {
                const arr = cellElsRef.current
                while (arr.length <= index) arr.push(null)
                arr[index] = node
            }),
        [n],
    )

    const applyAllCellTransforms = useCallback(
        (rotationDeg: number) => {
            const { radius } = layoutRef.current
            for (let i = 0; i < n; i++) {
                const el = cellElsRef.current[i]
                if (!el) continue
                const slotAngle = i * angleStepDeg
                const { transform, zIndex, opacity, filter } = cellTransformForAngle(slotAngle, rotationDeg, radius)
                el.style.transform = transform
                el.style.zIndex = String(zIndex)
                el.style.opacity = String(opacity)
                el.style.filter = filter
            }
        },
        [n, angleStepDeg],
    )

    useLayoutEffect(() => {
        applyAllCellTransforms(reduceMotion ? 0 : rotationRef.current)
    }, [layout, n, reduceMotion, applyAllCellTransforms])

    useEffect(() => {
        if (reduceMotion) {
            rotationRef.current = 0
            if (carouselRef.current) carouselRef.current.style.transform = "rotateY(0deg)"
            const id = requestAnimationFrame(() => {
                applyAllCellTransforms(0)
                videoElsRef.current.forEach((v, i) => {
                    if (!v) return
                    const d = minArcDistanceToFront(i * angleStepDeg)
                    if (d < 50) v.play().catch(() => {})
                    else v.pause()
                })
            })
            return () => cancelAnimationFrame(id)
        }

        lastTRef.current = null
        const speedDegPerSec = 10.5
        let raf = 0
        let cancelled = false

        const tick = (t: number) => {
            if (cancelled) return
            if (lastTRef.current == null) lastTRef.current = t
            const dt = (t - lastTRef.current) / 1000
            lastTRef.current = t

            if (!pausedByHoverRef.current) {
                rotationRef.current = (rotationRef.current + speedDegPerSec * dt) % 360
            }

            if (carouselRef.current) {
                carouselRef.current.style.transform = `rotateY(${rotationRef.current}deg)`
            }

            applyAllCellTransforms(rotationRef.current)

            let bestI = 0
            let bestD = 999
            for (let i = 0; i < n; i++) {
                const d = minArcDistanceToFront(i * angleStepDeg + rotationRef.current)
                if (d < bestD) {
                    bestD = d
                    bestI = i
                }
            }

            videoElsRef.current.forEach((v, i) => {
                if (!v) return
                if (i === bestI && bestD < 52) v.play().catch(() => {})
                else v.pause()
            })

            raf = requestAnimationFrame(tick)
        }

        raf = requestAnimationFrame(tick)
        return () => {
            cancelled = true
            cancelAnimationFrame(raf)
        }
    }, [n, angleStepDeg, reduceMotion, applyAllCellTransforms])

    if (!videos.length) return null

    const sceneH = layout.cardW * (16 / 9) + 64

    return (
        <section
            id="video-rotating-showcase"
            className="relative z-20 w-full overflow-hidden py-16 sm:py-22 mag-section-dim"
            aria-labelledby="video-rotating-showcase-heading"
        >
            <div className="mx-auto mb-8 max-w-7xl px-6 text-center md:mb-10 md:text-left">
                <p className="mb-3 inline-flex rounded-full border border-[rgba(179,255,118,0.28)] bg-[rgba(179,255,118,0.08)] px-4 py-1.5 font-space-mono text-[11px] uppercase tracking-[0.2em] text-[rgba(225,255,204,0.9)] md:inline-flex">
                    In motion
                </p>
                <h2
                    id="video-rotating-showcase-heading"
                    className="font-syne text-3xl font-bold tracking-tight text-white md:text-5xl"
                >
                    Work on a loop
                </h2>
                <p className="mx-auto mt-3 max-w-2xl font-dm-sans text-sm text-white/65 md:mx-0 md:text-base">
                    Same samples as above—on a dark 3D ring: the hero clip stays large; clips moving to the back shrink and layer behind for a clear spin.
                </p>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div
                    className="relative mx-auto overflow-hidden rounded-[2rem] border border-white/10 bg-[#080908] py-7 shadow-[0_32px_100px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(179,255,118,0.07)] ring-1 ring-[rgba(179,255,118,0.15)] sm:rounded-[2.5rem] sm:py-9"
                    onMouseEnter={() => {
                        pausedByHoverRef.current = true
                    }}
                    onMouseLeave={() => {
                        pausedByHoverRef.current = false
                    }}
                >
                    <div
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_45%,rgba(179,255,118,0.06),transparent_58%)]"
                        aria-hidden
                    />
                    <div
                        ref={sceneRef}
                        className="relative mx-auto select-none"
                        style={{
                            perspective: "min(1900px, 130vw)",
                            perspectiveOrigin: "50% 48%",
                            height: sceneH,
                            maxWidth: "min(1320px, 100%)",
                        }}
                    >
                        <div
                            ref={carouselRef}
                            className="absolute left-1/2 top-1/2"
                            style={{
                                width: 0,
                                height: 0,
                                transform: "rotateY(0deg)",
                                transformStyle: "preserve-3d",
                                willChange: "transform",
                            }}
                        >
                            {ringItems.map((video, i) => (
                                <RingVideoCell
                                    key={`${video.src}-ring-${i}`}
                                    video={video}
                                    cardWidthPx={layout.cardW}
                                    videoRef={videoSlotRefs[i]!}
                                    cellRef={cellSlotRefs[i]!}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="relative mt-3 text-center font-dm-sans text-[11px] text-white/45">
                        Hover to pause · Only the front-facing clip plays
                    </p>
                </div>
            </div>

            {reduceMotion ? (
                <p className="mt-6 text-center font-dm-sans text-xs text-white/45" role="note">
                    3D rotation is paused because your device prefers reduced motion.
                </p>
            ) : null}
        </section>
    )
}

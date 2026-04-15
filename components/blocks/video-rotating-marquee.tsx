"use client"

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { useInViewOnce } from "@/lib/hooks/use-in-view-once"

export type RotatingImageItem = {
    src: string
    title: string
}

type ImageRotatingMarqueeProps = {
    images: RotatingImageItem[]
}

const MIN_RING_SLOTS = 12

function expandRingImages(images: RotatingImageItem[]): RotatingImageItem[] {
    if (images.length === 0) return []
    if (images.length >= MIN_RING_SLOTS) return images
    const out: RotatingImageItem[] = []
    let k = 0
    while (out.length < MIN_RING_SLOTS) {
        out.push(images[k % images.length]!)
        k++
    }
    return out
}

function minArcDistanceToFront(deg: number): number {
    const u = ((deg % 360) + 360) % 360
    return Math.min(u, 360 - u)
}

function signedAngleFromFrontDeg(slotAngleDeg: number, rotationDeg: number): number {
    let a = ((slotAngleDeg + rotationDeg) % 360) + 360
    a %= 360
    if (a > 180) a -= 360
    return a
}

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
    const scale = 0.3 + 0.62 * Math.cos(u * (Math.PI / 2))
    const zBoost = (1 - Math.min(d, 68) / 68) * 42
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
    image: RotatingImageItem
    cardWidthPx: number
    cellRef: (el: HTMLDivElement | null) => void
}

function RingImageCell({ image, cardWidthPx, cellRef }: RingCellProps) {
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
            <div className="relative h-full w-full bg-neutral-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={image.src}
                    alt={image.title}
                    className="h-full w-full object-cover"
                    draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10" />
                <p className="absolute left-2.5 top-2.5 rounded-md bg-black/55 px-2 py-0.5 font-space-mono text-[8px] uppercase tracking-wider text-white/90">
                    UGC
                </p>
            </div>
            <span className="sr-only">{image.title}</span>
        </div>
    )
}

function ImageRotatingMarqueeCarousel({ images }: ImageRotatingMarqueeProps) {
    const ringItems = useMemo(() => expandRingImages(images), [images])
    const n = ringItems.length
    const angleStepDeg = 360 / n

    const sceneRef = useRef<HTMLDivElement>(null)
    const carouselRef = useRef<HTMLDivElement>(null)
    const rotationRef = useRef(0)
    const lastTRef = useRef<number | null>(null)
    const cellElsRef = useRef<(HTMLDivElement | null)[]>([])
    const layoutRef = useRef({ radius: 360, cardW: 176 })
    const pausedByHoverRef = useRef(false)

    const [layout, setLayout] = useState({ radius: 360, cardW: 176 })
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
            const cardW = Math.min(216, Math.max(128, w * 0.175))
            const sin = Math.sin(Math.PI / n)
            const radius = sin > 0.001 ? (cardW * 0.92) / (2 * sin) + cardW * 0.22 : 360
            setLayout({ radius, cardW })
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [n])

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
            const id = requestAnimationFrame(() => applyAllCellTransforms(0))
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
            raf = requestAnimationFrame(tick)
        }

        raf = requestAnimationFrame(tick)
        return () => {
            cancelled = true
            cancelAnimationFrame(raf)
        }
    }, [n, angleStepDeg, reduceMotion, applyAllCellTransforms])

    if (!images.length) return null

    const sceneH = layout.cardW * (16 / 9) + 88

    return (
        <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div
                    className="relative mx-auto overflow-hidden rounded-[2rem] border border-white/10 bg-[#080908] py-7 shadow-[0_32px_100px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(179,255,118,0.07)] ring-1 ring-[rgba(179,255,118,0.15)] sm:rounded-[2.5rem] sm:py-9"
                    onMouseEnter={() => { pausedByHoverRef.current = true }}
                    onMouseLeave={() => { pausedByHoverRef.current = false }}
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
                            {ringItems.map((image, i) => (
                                <RingImageCell
                                    key={`${image.src}-ring-${i}`}
                                    image={image}
                                    cardWidthPx={layout.cardW}
                                    cellRef={cellSlotRefs[i]!}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="relative mt-3 text-center font-dm-sans text-[11px] text-white/45">
                        Hover to pause · Real UGC content
                    </p>
                </div>
            </div>

            {reduceMotion ? (
                <p className="mt-6 text-center font-dm-sans text-xs text-white/45" role="note">
                    3D rotation is paused because your device prefers reduced motion.
                </p>
            ) : null}
        </>
    )
}

export function VideoRotatingMarquee({ images }: ImageRotatingMarqueeProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const showCarousel = useInViewOnce(sectionRef, { rootMargin: "120px 0px" })

    if (!images.length) return null

    return (
        <section
            ref={sectionRef}
            id="video-rotating-showcase"
            className="relative z-20 w-full overflow-hidden py-16 sm:py-22 mag-section-dim"
            aria-labelledby="video-rotating-showcase-heading"
        >
            <div className="mx-auto mb-8 max-w-7xl px-6 text-center md:mb-10 md:text-left">
                <p className="mb-3 inline-flex rounded-full border border-[rgba(179,255,118,0.28)] bg-[rgba(179,255,118,0.08)] px-4 py-1.5 font-space-mono text-[11px] uppercase tracking-[0.2em] text-[rgba(225,255,204,0.9)] md:inline-flex">
                    UGC Content
                </p>
                <h2
                    id="video-rotating-showcase-heading"
                    className="font-syne text-3xl font-bold tracking-tight text-white md:text-5xl"
                >
                    UGC content specific to your needs
                </h2>
                <p className="mx-auto mt-3 max-w-2xl font-dm-sans text-sm text-white/65 md:mx-0 md:text-base">
                    Authentic, scroll-stopping user-generated content — tailored to your product and brand, ready to publish.
                </p>
            </div>

            {showCarousel ? (
                <ImageRotatingMarqueeCarousel images={images} />
            ) : (
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div
                        className="relative mx-auto min-h-[min(420px,72vw)] overflow-hidden rounded-[2rem] border border-white/10 bg-[#080908] py-7 shadow-[0_32px_100px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(179,255,118,0.07)] ring-1 ring-[rgba(179,255,118,0.15)] motion-safe:animate-pulse sm:rounded-[2.5rem] sm:py-9"
                        aria-hidden
                    />
                </div>
            )}
        </section>
    )
}

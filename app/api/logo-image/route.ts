import { createReadStream } from "node:fs"
import { stat } from "node:fs/promises"
import path from "node:path"
import { Readable } from "node:stream"
import { NextResponse } from "next/server"

const ROOT = path.join(process.cwd(), "app", "assets", "logos")
const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"])

function mimeForExt(ext: string) {
    if (ext === ".png") return "image/png"
    if (ext === ".webp") return "image/webp"
    return "image/jpeg"
}

export async function GET(request: Request) {
    const raw = new URL(request.url).searchParams.get("name")
    if (!raw) return NextResponse.json({ error: "Missing name." }, { status: 400 })

    const normalized = path.normalize(raw)
    if (normalized.includes("..")) return NextResponse.json({ error: "Invalid path." }, { status: 400 })

    const fullPath = path.resolve(path.join(ROOT, normalized))
    if (!fullPath.startsWith(path.resolve(ROOT) + path.sep)) {
        return NextResponse.json({ error: "Invalid path." }, { status: 400 })
    }

    const ext = path.extname(fullPath).toLowerCase()
    if (!ALLOWED_EXT.has(ext)) {
        return NextResponse.json({ error: "Unsupported file type." }, { status: 400 })
    }

    try {
        const fileStat = await stat(fullPath)
        const stream = createReadStream(fullPath)

        return new NextResponse(Readable.toWeb(stream) as ReadableStream<Uint8Array>, {
            headers: {
                "Content-Type": mimeForExt(ext),
                "Content-Length": String(fileStat.size),
                "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
            },
        })
    } catch {
        return NextResponse.json({ error: "Not found." }, { status: 404 })
    }
}

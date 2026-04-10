import { createReadStream } from "node:fs"
import { stat } from "node:fs/promises"
import path from "node:path"
import { Readable } from "node:stream"
import { NextResponse } from "next/server"

const CACHE = "public, max-age=31536000, immutable"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const rawName = searchParams.get("name")

    if (!rawName) {
        return NextResponse.json({ error: "Missing video name." }, { status: 400 })
    }

    const name = path.basename(rawName)
    if (!name.toLowerCase().endsWith(".mp4")) {
        return NextResponse.json({ error: "Unsupported format." }, { status: 400 })
    }

    const videosDir = path.join(process.cwd(), "app/assets/videos")
    const filePath = path.join(videosDir, name)

    try {
        const fileStat = await stat(filePath)
        const fileSize = fileStat.size
        const range = request.headers.get("range")

        if (range) {
            const match = /^bytes=(\d*)-(\d*)$/i.exec(range.trim())
            if (!match) {
                return new NextResponse(null, {
                    status: 416,
                    headers: {
                        "Content-Range": `bytes */${fileSize}`,
                    },
                })
            }

            let start = match[1] === "" ? 0 : Number.parseInt(match[1], 10)
            let end = match[2] === "" ? fileSize - 1 : Number.parseInt(match[2], 10)

            if (Number.isNaN(start) || Number.isNaN(end) || start < 0 || start >= fileSize) {
                return new NextResponse(null, {
                    status: 416,
                    headers: {
                        "Content-Range": `bytes */${fileSize}`,
                    },
                })
            }

            end = Math.min(end, fileSize - 1)
            if (end < start) {
                return new NextResponse(null, {
                    status: 416,
                    headers: {
                        "Content-Range": `bytes */${fileSize}`,
                    },
                })
            }

            const chunkSize = end - start + 1
            const nodeStream = createReadStream(filePath, { start, end })

            return new NextResponse(Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>, {
                status: 206,
                headers: {
                    "Accept-Ranges": "bytes",
                    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                    "Content-Length": String(chunkSize),
                    "Content-Type": "video/mp4",
                    "Cache-Control": CACHE,
                },
            })
        }

        const nodeStream = createReadStream(filePath)
        return new NextResponse(Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>, {
            headers: {
                "Accept-Ranges": "bytes",
                "Content-Length": String(fileSize),
                "Content-Type": "video/mp4",
                "Cache-Control": CACHE,
            },
        })
    } catch {
        return NextResponse.json({ error: "Video not found." }, { status: 404 })
    }
}

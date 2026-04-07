import { promises as fs } from "node:fs"
import path from "node:path"
import { NextResponse } from "next/server"

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
        const fileBuffer = await fs.readFile(filePath)
        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": "video/mp4",
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        })
    } catch {
        return NextResponse.json({ error: "Video not found." }, { status: 404 })
    }
}

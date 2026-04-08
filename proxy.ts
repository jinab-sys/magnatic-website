import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
    const registered = request.cookies.get('magnatic_registered')

    if (request.nextUrl.pathname.startsWith('/dashboard') && !registered) {
        return NextResponse.redirect(new URL('/#register', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*'],
}

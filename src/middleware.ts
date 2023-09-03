import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest) {
  const session = request.cookies.get('set-cookie')?.value
  const { pathname } = request.nextUrl

  // Redirect to login page if session is not set
  if (pathname !== '/' && session === undefined) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Redirect to the same page if session is set
  if (pathname === '/' && session !== undefined) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}

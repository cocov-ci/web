import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const cocov_auth_token = req.cookies.get('cocov_auth_token')?.value

  const isPublicPage = req.nextUrl.pathname === '/auth/signin'

  if (!cocov_auth_token && !isPublicPage) {
    // REDIRECT UNLOGGED USER TO THE SIGNIN PAGE
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  } else if (req.nextUrl.pathname.startsWith('/api')) {
    const response = NextResponse.next()
    // ADD AUTHORIZATION TOKEN TO THE API REQUESTS
    response.headers.set('authorization', `bearer ${cocov_auth_token}`)

    return response
  }
}

export const config = {
  matcher: ['/:path((?!api|static|.*\\..*|_next).*)'],
}

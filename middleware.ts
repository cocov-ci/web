import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const cocov_auth_token = req.cookies.get('cocov_auth_token')?.value
  const SigninPage = '/auth/signin'
  const route = req.nextUrl.pathname
  const isPublicPage = route === SigninPage
  const response = NextResponse.next()

  if (!cocov_auth_token && !isPublicPage) {
    // REDIRECT UNLOGGED USER TO THE SIGNIN PAGE
    return NextResponse.redirect(new URL(SigninPage, req.url))
  } else if (route.startsWith('/api')) {
    // ADD AUTHORIZATION TOKEN TO THE API REQUESTS
    response.headers.set('authorization', `bearer ${cocov_auth_token}`)

    return response
  } else if (isPublicPage) {
    // REDIRECT TO THE SIGNIN PAGE IF THE AUTH TOKEN IS INVALID
    const isInvalidToken = req.nextUrl.searchParams.has('invalid_token')

    if (isInvalidToken) {
      response.cookies.delete('cocov_auth_token')
    } else if (cocov_auth_token) {
      return NextResponse.redirect(new URL('/repositories', req.url))
    }

    return response
  }

  return response
}

export const config = {
  matcher: ['/:path((?!api|static|.*\\..*|_next).*)'],
}

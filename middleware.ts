export { default } from "next-auth/middleware"

// export default withAuth({
//   // callbacks: {
//   //   authorized: async ({ req, token }) => {
//   //     const pathname = req.nextUrl.pathname;

//   //     if (token) return true;

//   //     return false;
//   //   },
//   // },
//   // pages: {
//   //   signIn: '/auth/signin',
//   // },
// });


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/',
  ],
}

/**
 * Example Next.js Proxy for route protection.
 *
 * This file is intentionally not named `proxy.ts` because the auth/session
 * logic for protected routes is not implemented yet.
 *
 * When route protection is ready, rename this file to `src/proxy.ts` and
 * replace the placeholder logic with real session validation.
 */

import type { NextRequest } from "next/server";
// import { getIronSession } from '@/lib/session';

export async function proxy(_request: NextRequest) {
  // const { pathname } = request.nextUrl;
  //
  // // Protected routes that require authentication
  // const protectedRoutes = ['/profile'];
  //
  // // Check if the current route is protected
  // const isProtectedRoute = protectedRoutes.some((route) =>
  //   pathname.startsWith(route)
  // );
  //
  // if (isProtectedRoute) {
  //   try {
  //     const session = await getIronSession();
  //
  //     // If no user session, redirect to login
  //     if (!session.user) {
  //       const loginUrl = new URL('/login', request.url);
  //       loginUrl.searchParams.set('redirect', pathname);
  //       return NextResponse.redirect(loginUrl);
  //     }
  //
  //     // Check if session has expired
  //     const expiresAt = new Date(session.user.expiresAt);
  //     if (expiresAt < new Date()) {
  //       session.destroy();
  //       const loginUrl = new URL('/login', request.url);
  //       loginUrl.searchParams.set('redirect', pathname);
  //       loginUrl.searchParams.set('expired', 'true');
  //       return NextResponse.redirect(loginUrl);
  //     }
  //   } catch (error) {
  //     console.error('Proxy error:', error);
  //     return NextResponse.redirect(new URL('/login', request.url));
  //   }
  // }
  //
  // return NextResponse.next();
}

// Configure which routes the proxy runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
  ],
};

import NextAuth from "next-auth";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiauthPrefix,
    publicRoutes,
    authRoutes
} from "@/routes";

import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

// 1. CHANGE THIS LINE: Assign the auth wrapper to a variable instead of exporting default
const authMiddleware = auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiauthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // If the user is trying to access login/register while already logged in
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    // Add this condition: If they are NOT logged in and trying to access a protected page, 
    // send them to the sign-in page (which matches what Hitesh is showing in the video)
    if (!isLoggedIn && !isPublicRoute && !isApiAuthRoute) {
        return Response.redirect(new URL("/auth/sign-in", nextUrl));
    }
});

// 2. ADD THIS: Next.js 16 expects a named 'proxy' function export
export { authMiddleware as proxy };

export const config = {
    matcher: [
        // Skip all internals and static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ]
}
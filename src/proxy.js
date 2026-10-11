import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Better Auth সেশন কুকি চেক করা
  const sessionCookie = getSessionCookie(request);

  // ১. প্রোটেক্টেড রুট (যেগুলো দেখতে হলে অবশ্যই লগইন থাকতে হবে)
  const protectedRoutes = ["/profile", "/saved-items", "/product"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !sessionCookie) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // ২. অথ রুট (লগইন করা থাকলে সাইন-ইন বা সাইন-আপ পেজে যাওয়া যাবে না)
  const authRoutes = ["/signin", "/signup"];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// কোন কোন পাথে প্রোক্সি রান করবে
export const config = {
  matcher: [
    "/profile/:path*",
    "/saved-items/:path*",
    "/product/:path*",
    "/signin",
    "/signup",
  ],
};

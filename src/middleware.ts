"use client"

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useAccount } from 'wagmi'
import jwt from "jsonwebtoken"
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublic = path == "/" || path == "/api/user/login" || path == "/api/user/logout"

  const token = request.cookies.get("token")?.value || ''

  if (!isPublic && token == '') {
      return NextResponse.redirect(new URL("/",request.nextUrl));
  }

  if (request.nextUrl.pathname.startsWith("/api")) {
    request.headers.append("Authentication","Bearer "+token);
  }
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!static|_next/static|_next/image|favicon.ico).*)',
}
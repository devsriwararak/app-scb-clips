import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req:NextRequest) {
    const token = await getToken({req})
    const isAuth = !!token

    const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
    const isLoginPage = req.nextUrl.pathname === "/login"

    // ไม่ได้ login แต่เข้าหน้า admin → ส่งไป login พร้อม callback
    if(isAdminPage && !isAuth){
        const loginUrl = new URL('/login', req.url)

        // 👇 ถ้าเข้า /admin ตรง ๆ ให้พาไป /admin/dashboard แทนหลัง login
        const targetPath = req.nextUrl.pathname === "/admin"
        ? '/admin/dashboard'
        : req.nextUrl.pathname

        loginUrl.searchParams.set('callbackUrl', targetPath)
        return NextResponse.redirect(loginUrl)
    }

      // login แล้ว แต่พยายามเข้า /login → ส่งกลับไป /admin
      if(isLoginPage && isAuth){
        return NextResponse.redirect(new URL("/admin", req.url))
      }

    return NextResponse.next()
}

// บอก Next.js ให้ middleware ตรวจเฉพาะหน้า admin
export const config = {
    matcher: ['/admin/:path*', "/login"]
}
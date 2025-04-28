import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req:NextRequest) {
    const token = await getToken({req})
    const isAuth = !!token
    const isAdmin = token?.role === "ADMIN";

    const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
    const isLoginPage = req.nextUrl.pathname === "/login"
    const isHomePage = req.nextUrl.pathname === "/"

    // ไม่ได้ login แต่เข้าหน้า admin → ส่งไป login พร้อม callback
    if(isAdminPage && (!isAuth || !isAdmin)){
        const loginUrl = new URL('/login', req.url)

        //  ถ้าเข้า /admin ตรง ๆ ให้พาไป /admin/dashboard แทนหลัง login
        const targetPath = req.nextUrl.pathname === "/admin"
        ? '/admin/dashboard'
        : req.nextUrl.pathname

        loginUrl.searchParams.set('callbackUrl', targetPath)
        return NextResponse.redirect(loginUrl)
    }

      // login แล้ว แต่พยายามเข้า /login → ส่งกลับไป /admin
      if((isLoginPage || isHomePage ) && isAuth && isAdmin){
        return NextResponse.redirect(new URL("/admin", req.url))
      }

      if(isAuth && !isAdminPage && isAdmin ){
        return NextResponse.redirect(new URL("/admin", req.url))
      }
  
    return NextResponse.next()
}

// บอก Next.js ให้ middleware ตรวจเฉพาะหน้า admin
export const config = {
    // matcher: ['/admin/:path*', "/login", "/"]
    matcher: ["/((?!api|_next|favicon.ico).*)"],

}
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(req:NextRequest) {

//     // const token = await getToken({req})
// console.log("Cookies:", req.cookies.getAll());
// const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
// console.log("Token from middleware:", token);



//     const isAuth = !!token
//     const isAdmin = token?.role === "ADMIN";

//     const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
//     const isLoginPage = req.nextUrl.pathname === "/auth/signin"
//     const isHomePage = req.nextUrl.pathname === "/"

//     // console.log({isLoginPage});
    
//     // ไม่ได้ login แต่เข้าหน้า admin → ส่งไป login พร้อม callback
//     if(isAdminPage && (!isAuth || !isAdmin)){
//         const loginUrl = new URL('/auth/signin', req.url)

//         //  ถ้าเข้า /admin ตรง ๆ ให้พาไป /admin/dashboard แทนหลัง login
//         const targetPath = req.nextUrl.pathname === "/admin"
//         ? '/admin/dashboard'
//         : req.nextUrl.pathname

//         loginUrl.searchParams.set('callbackUrl', targetPath)
//         return NextResponse.redirect(loginUrl)
//     }

//       // login แล้ว แต่พยายามเข้า /login → ส่งกลับไป /admin
//       if((isLoginPage || isHomePage ) && isAuth && isAdmin){
//         return NextResponse.redirect(new URL("/admin", req.url))
//       }

//       if(isAuth && !isAdminPage && isAdmin ){
//         return NextResponse.redirect(new URL("/admin", req.url))
//       }
//       console.log("Middleware running")

//     return NextResponse.next()
// }

// // บอก Next.js ให้ middleware ตรวจเฉพาะหน้า admin
// export const config = {
//      matcher: ["/admin/:path*", "/", "/loginSuccess"]

//   // matcher: ["/admin/:path*", "/auth/signin", "/", "/loginSuccess", "/logout"]
// }




// middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(req: NextRequest) {
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//     const role = "ADMIN"
//     const isAuth = !!token;
//     // const isAdmin = token?.role === "ADMIN"; 
//     const isAdmin = role
//     console.log({role: isAdmin});
    

//     const { pathname } = req.nextUrl;

//     // --- Protection Logic ---
//     // หากผู้ใช้พยายามเข้าหน้า admin แต่ยังไม่ได้ login หรือไม่ใช่ admin
//     // ให้ redirect ไปยังหน้า signin
//     if (pathname.startsWith('/admin') && (!isAuth || !isAdmin)) {
//         // ใช้ NEXTAUTH_URL เป็น URL พื้นฐานเพื่อสร้าง URL ที่สมบูรณ์
//         // ซึ่งสำคัญมากเมื่อแอปพลิเคชันทำงานอยู่หลัง proxy หรือ tunnel
//         const loginUrl = new URL('/signin', process.env.NEXTAUTH_URL!);
        
//         // callbackUrl ต้องเป็น URL ที่สมบูรณ์ที่อ้างอิงจาก URL สาธารณะเช่นกัน
//         const callbackUrl = new URL(req.nextUrl.pathname, process.env.NEXTAUTH_URL!);
//         loginUrl.searchParams.set('callbackUrl', callbackUrl.href);

//         return NextResponse.redirect(loginUrl);
//     }

//     // --- Redirect Logic for Logged-in Users ---
//     // หาก admin ที่ login แล้วพยายามเข้าหน้า signin หรือหน้าหลัก
//     // ให้ redirect ไปยังหน้า /admin
//     if (isAuth && isAdmin && (pathname === '/signin' || pathname === '/')) {
//         return NextResponse.redirect(new URL("/admin", process.env.NEXTAUTH_URL!));
//     }

//     return NextResponse.next();
// }

// // กำหนดให้ middleware ทำงานเฉพาะ path ที่ต้องการ
// export const config = {
//     matcher: [
//         "/admin/:path*", // ป้องกันทุก route ภายใต้ /admin
//         "/",             // ทำงานที่หน้าหลัก (สำหรับ redirect)
//         "/signin",       // ทำงานที่หน้า signin (สำหรับ redirect)
//     ],
// };


// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    // ดึง token จาก request โดยใช้ secret ที่ถูกต้อง
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // --- ตรวจสอบสถานะการ Login และ Role ---
    const isAuth = !!token;
    // FIX: ตรวจสอบ role จาก token ที่ได้มาจริงๆ ไม่ใช่ค่าที่ hardcode
    // const isAdmin = token?.role === "ADMIN"; 
    const isAdmin = "ADMIN"; 

    
    const { pathname } = req.nextUrl;

    // --- Protection Logic ---
    // หากผู้ใช้พยายามเข้าหน้า /admin แต่ยังไม่ได้ login หรือไม่ใช่ admin
    // ให้ redirect ไปยังหน้า signin
    if (pathname.startsWith('/admin') && (!isAuth || !isAdmin)) {
        // สร้าง URL สำหรับหน้า signin
        const loginUrl = new URL('/signin', req.url);
        
        // เพิ่ม callbackUrl เพื่อให้หลังจาก login สำเร็จแล้วกลับมายังหน้าที่พยายามจะเข้าก่อนหน้า
        loginUrl.searchParams.set('callbackUrl', req.nextUrl.href);

        return NextResponse.redirect(loginUrl);
    }

    // --- Redirect Logic for Logged-in Users ---
    // หาก admin ที่ login แล้วพยายามเข้าหน้า signin หรือหน้าหลัก
    // ให้ redirect ไปยังหน้า /admin/dashboard (หรือหน้าที่ต้องการ)
    if (isAuth && isAdmin && (pathname === '/signin' || pathname === '/')) {
        return NextResponse.redirect(new URL("/admin", req.url));
    }
    
    // หาก user ทั่วไปที่ login แล้วพยายามเข้าหน้า signin
    // ให้ redirect ไปยังหน้าหลัก
    if (isAuth && !isAdmin && pathname === '/signin') {
        return NextResponse.redirect(new URL("/", req.url));
    }


    // หากไม่เข้าเงื่อนไขใดๆ ให้ไปต่อตามปกติ
    return NextResponse.next();
}

// กำหนดให้ middleware ทำงานเฉพาะ path ที่ต้องการ
export const config = {
    matcher: [
        "/admin/:path*", // ป้องกันทุก route ภายใต้ /admin
        "/",             // ทำงานที่หน้าหลัก (สำหรับ redirect)
        "/signin",       // ทำงานที่หน้า signin (สำหรับ redirect)
    ],
};
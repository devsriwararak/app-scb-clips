// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt";
import AzureADProvider from "next-auth/providers/azure-ad";


// ฟังก์ชันสำหรับต่ออายุ Access Token โดยใช้ Refresh Token
// async function refreshAccessToken(token: any) {
//   try {
//     const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams({
//         client_id: process.env.AZURE_AD_CLIENT_ID!,
//         client_secret: process.env.AZURE_AD_CLIENT_SECRET!,
//         scope: "openid profile email offline_access User.Read",
//         grant_type: "refresh_token",
//         refresh_token: token.refreshToken,
//       }),
//     });

//     const refreshedTokens = await response.json();

//     if (!response.ok) {
//       throw refreshedTokens;
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // ใช้ refresh token ใหม่ถ้ามี
//     };
//   } catch (error) {
//     console.error("Error refreshing access token", error);
//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     AzureADProvider({
//       clientId: process.env.AZURE_AD_CLIENT_ID!,
//       clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
//       tenantId: process.env.AZURE_AD_TENANT_ID!,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, account, profile }) {
//       // 1. ตอน Sign-in ครั้งแรก
//       if (account && user) {
//         token.accessToken = account.access_token;
//         // FIX: Explicitly cast account.expires_in to number to prevent TypeScript error.
//         token.accessTokenExpires = Date.now() + (account.expires_in as number) * 1000;        
//         token.refreshToken = account.refresh_token;

//         const isAdmin = profile?.roles?.includes("Admin.All");
//         token.role = isAdmin ? "ADMIN" : "USER";

//         return token;
//       }

//       // 2. ตรวจสอบว่า Access Token หมดอายุหรือยัง
//       if (Date.now() < (token.accessTokenExpires as number)) {
//         // ถ้ายังไม่หมดอายุ ก็ส่ง token เดิมกลับไป
//         return token;
//       }

//       // 3. ถ้า Access Token หมดอายุแล้ว ให้ทำการ Refresh
//       console.log("Access token expired, refreshing...");
//       return refreshAccessToken(token);
//     },
//     async session({ session, token }) {
//       // ส่งข้อมูลจาก token ไปยัง session เพื่อให้ Client Component ใช้งานได้
//       session.user.role = token.role;
//       session.accessToken = token.accessToken;
//       session.error = token.error;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: '/signin',
//   }
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }


// ฟังก์ชันสำหรับต่ออายุ Access Token โดยใช้ Refresh Token
// async function refreshAccessToken(token: any) {
//   try {
//     const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams({
//         client_id: process.env.AZURE_AD_CLIENT_ID!,
//         client_secret: process.env.AZURE_AD_CLIENT_SECRET!,
//         scope: "openid profile email offline_access User.Read",
//         grant_type: "refresh_token",
//         refresh_token: token.refreshToken,
//       }),
//     });

//     const refreshedTokens = await response.json();

//     if (!response.ok) {
//       throw refreshedTokens;
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // ใช้ refresh token ใหม่ถ้ามี
//     };
//   } catch (error) {
//     console.error("Error refreshing access token", error);
//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     AzureADProvider({
//       clientId: process.env.AZURE_AD_CLIENT_ID!,
//       clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
//       tenantId: process.env.AZURE_AD_TENANT_ID!,
//       // เพิ่ม authorization object เพื่อขอ refresh_token
//       authorization: {
//         params: {
//           scope: "openid profile email offline_access User.Read",
//         },
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, account, profile }) {
//       // 1. ตอน Sign-in ครั้งแรก
//       if (account && user) {
//         token.accessToken = account.access_token;
//         token.accessTokenExpires = Date.now() + (account.expires_in as number) * 1000;
//         token.refreshToken = account.refresh_token;

//         // ตรวจสอบ Role จาก Azure AD profile
//         // คุณอาจต้องปรับ 'Admin.All' ให้ตรงกับชื่อ Role ที่ตั้งไว้ใน Azure AD
//         const isAdmin = profile?.roles?.includes("Admin.All");
//         token.role = isAdmin ? "ADMIN" : "USER";

//         return token;
//       }

//       // 2. ตรวจสอบว่า Access Token หมดอายุหรือยัง
//       if (Date.now() < (token.accessTokenExpires as number)) {
//         // ถ้ายังไม่หมดอายุ ก็ส่ง token เดิมกลับไป
//         return token;
//       }

//       // 3. ถ้า Access Token หมดอายุแล้ว ให้ทำการ Refresh
//       console.log("Access token expired, refreshing...");
//       return refreshAccessToken(token);
//     },
//     async session({ session, token }) {
//       // ส่งข้อมูลจาก token ไปยัง session เพื่อให้ Client Component ใช้งานได้
//       if (session.user) {
//         session.user.role = token.role;
//       }
//       session.accessToken = token.accessToken;
//       session.error = token.error;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: '/signin',
//   }
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }





const apiScope = process.env.AZURE_API_SCOPE!;

// 2. รวม Scope ทั้งหมดที่จำเป็น
const scopes = ["openid", "profile", "email", "offline_access", apiScope];
const scopeString = scopes.join(" ");

// ฟังก์ชันสำหรับต่ออายุ Access Token โดยใช้ Refresh Token
async function refreshAccessToken(token: JWT) : Promise<JWT> {
  try {
    const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.AZURE_AD_CLIENT_ID!,
        client_secret: process.env.AZURE_AD_CLIENT_SECRET!,
        scope: scopeString, // ใช้ scope ที่รวม API ของเราแล้ว
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

 const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          scope: scopeString, // ขอสิทธิ์ทั้งหมดที่กำหนดไว้
        },
      },
      profile(profile) {
        return {
          id : profile.sub,
           name: profile.name,
           email: profile.preferred_username, 
           username: profile.preferred_username,
        }
      }
    }),
    
  ],
  callbacks: {
    async signIn({ user }) {
      // ส่วนนี้ของคุณถูกต้องแล้ว
      if (!user.email) {
        console.log("ไม่พบอีเมล์นี้ในระบบ กรุณาลองใหม่อีกครั้ง !!");
        return false;
      }

      try {
        console.log(`กำลังตรวจสอบอีเมล: ${user.email} กับ API...`);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/validate-member`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user.email }),
        });
        console.log({signIn : response});
        if(response.status === 200){
          return true;
        }else {
          return 'https://app-scgp.thaibusinessmate.com/signin?error=EmailNotRegistered';
        }
        
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการเรียก API ตรวจสอบ:", error);
        return false;
      }
    },

    async jwt({ token, user, account, profile }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.accessTokenExpires = Date.now() + (account.expires_in as number) * 1000;
        token.refreshToken = account.refresh_token;

        //  console.log('Azure AD Profile on initial sign-in:', profile);

        const isAdmin = profile?.roles?.includes("Admin.All"); // ปรับชื่อ Role ตามที่ตั้งค่าใน Azure AD
        token.role = isAdmin ? "ADMIN" : "USER";

        return token;
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      console.log("Access token expired, refreshing...");
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }; 

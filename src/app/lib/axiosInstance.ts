// import axios from "axios";
// import { getSession, signIn, signOut } from "next-auth/react";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true, // ต้องส่ง cookie refreshToken ไป
// });

// // Request Interceptor
// api.interceptors.request.use(async (config) => {
//   const session = await getSession();
//   if (session?.accessToken) {
//     config.headers.Authorization = `Bearer ${session.accessToken}`;
//   }
//   return config;
// });

// // Response Interceptor
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const session = await getSession();
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // 1. ยิงขอ refresh token
//         const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`, {}, {
//           withCredentials: true,
//         });
//         const newAccessToken = res.data.accessToken;
//         console.log({ newAccessToken });

//         // 2. Manual signIn ใหม่ด้วย next-auth เพื่อ refresh session
//         if (session) {
//           await signIn('credentials', {
//             redirect: false,
//             username: session?.user.username,
//             role: session?.user.role,
//             accessToken: newAccessToken,
//             id: session?.user.id
//           })
//         }

//         // 3. Update Authorization header ใหม่
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//         return api(originalRequest);

//       } catch (refreshError) {
//         await signOut({ callbackUrl: "/auth/signin" });
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;


// lib/axios.ts
import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request Interceptor
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

// Response Interceptor (Optional but recommended)
// จัดการกรณีที่ Token หมดอายุจริงๆ หรือมีปัญหาอื่นๆ
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const session = await getSession();
    // ถ้า session.error คือ 'RefreshAccessTokenError' หรือเจอ 401
    // แสดงว่าการต่ออายุ token ล้มเหลว ให้ทำการ sign out
    if (session?.error === 'RefreshAccessTokenError' || error.response?.status === 401) {
      // await signOut();
    }
    return Promise.reject(error);
  }
);

export default api;


'use client'

import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastContainer } from 'react-toastify';

import { Prompt } from 'next/font/google'
import AuthProvider from '@/components/providers/AuthProvider';
import { SessionProvider } from 'next-auth/react';


const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'], // เลือกน้ำหนักที่ต้องใช้
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${prompt.className} dark:bg-gray-900`}>

        <AuthProvider >
          <ThemeProvider>

            <SidebarProvider>
              {children}
            </SidebarProvider>
          </ThemeProvider>

          <ToastContainer
            autoClose={2000}
            theme="colored"
            position="top-right"
            newestOnTop
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            toastClassName="text-sm"
            className="!fixed !top-5 !right-5 !z-[100000]"
          />

        </AuthProvider>
      </body>
    </html>
  );
}


// import AuthProvider from '@/components/providers/AuthProvider'
// import './globals.css'
// import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Next.js Azure AD Auth',
//   description: 'Authentication with Next.js App Router',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <AuthProvider>
//           {children}
//         </AuthProvider>
//       </body>
//     </html>
//   )
// }

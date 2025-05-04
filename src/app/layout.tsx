'use client'

import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from 'react-toastify';



const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <SessionProvider>
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

        </SessionProvider>
      </body>
    </html>
  );
}

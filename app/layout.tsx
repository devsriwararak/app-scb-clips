'use client'

import "./globals.css";
import Providers from "./Providers";
import { SessionProvider } from "next-auth/react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <SessionProvider>
        <Providers>
        {children}
        </Providers>
          
        </SessionProvider>
  
      </body>
    </html>
  );
}

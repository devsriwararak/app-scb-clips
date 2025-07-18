'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface SessionProviderWrapperProps {
  children: React.ReactNode;
  session?: any; // ต้องรับ session prop
}

export default function SessionProviderWrapper({
  children,
  session, // ใช้ session ที่ได้รับมา
}: SessionProviderWrapperProps) {
  return (
    <SessionProvider session={session}> {/* ส่ง session ที่ได้รับมา */}
      {children}
    </SessionProvider>
  );
}
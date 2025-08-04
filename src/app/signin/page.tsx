
// app/signin/page.tsx
import { Suspense } from 'react';
import SignInClient from './SignInClient';

export default function SignInPage() {

  return (
    <>
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen">กำลังโหลดหน้าเข้าสู่ระบบ...</div>}>
        <SignInClient />
      </Suspense>
    </>
  );
}

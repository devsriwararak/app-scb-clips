'use client'

import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInContent() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    // ถ้า Login แล้ว ให้ redirect ไปยังหน้า admin
    if (status === 'authenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  // แสดงสถานะระหว่างรอ
  if (status === 'loading' || status === 'authenticated') {
    return <div className="flex justify-center items-center min-h-screen">กำลังตรวจสอบสถานะ...</div>;
  }

  // ฟังก์ชันสำหรับแสดงข้อความ Error ที่เหมาะสม
  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'EmailNotRegistered':
        return 'อีเมลของคุณไม่ได้รับอนุญาตให้เข้าใช้งานในระบบ';
      case 'AccessDenied':
        return 'คุณปฏิเสธการเข้าถึง หรือไม่มีสิทธิ์ที่จำเป็น';
      default:
        return 'ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบการตั้งค่าหรือติดต่อผู้ดูแล';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-2">เข้าสู่ระบบ</h1>
        <p className="text-gray-600 mb-6">กรุณาเข้าสู่ระบบเพื่อเข้าถึงส่วนผู้ดูแล</p>

        {/* แสดงข้อความ Error ถ้ามี */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">เกิดข้อผิดพลาด: </strong>
            <span className="block sm:inline">{getErrorMessage(error)}</span>
          </div>
        )}

        <button
          onClick={() => signIn('azure-ad')}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300"
        >
          Sign In with Microsoft
        </button>
      </div>
    </div>
  );
}
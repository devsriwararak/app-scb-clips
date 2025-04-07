"use client"
import {  useState } from 'react';
import { useRouter } from "next/navigation"

import { Button, Card, Input, Typography } from './components/safe-material';



export default function Home() {
  const router = useRouter()

  // States
  const [idCard, setIdCard] = useState("1234567890123")
  const [error, setError] = useState("")

  const handleCheckID = () => {
    if (idCard.length !== 13) {
      setError("กรุณากรอกเลขบัตรประชาชน 13 หลัก")
      return
    }

    const alreadyRegistered = idCard === "1234567890123" // <-- mock test

    if (alreadyRegistered) {
      console.log("ไปหน้าวิดีโอได้เลย")
      router.push("/views/course/1")
    } else {
      setError("ยังไม่พบข้อมูล กรุณาลงทะเบียนก่อน")
    }
  }



  return (
   <main className='min-h-screen flex flex-col items-center justify-center gap-8  bg-gray-50 p-4'>
    <Typography variant='h3' color="blue-gray">ยินดีต้อนรับ</Typography>

    <div className='flex gap-4'>
      <Button variant="filled" color='blue' onClick={() => router.push("/views/register")} >ลงทะเบียน</Button>
      <Button color="green" onClick={() => document.getElementById("checkSection")?.scrollIntoView({ behavior: 'smooth' })}>
          ดูวีดีโอ
        </Button>
    </div>

          {/* ส่วนกรอกเลขบัตร */}
          <Card id="checkSection" className="p-6 w-full max-w-md">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          กรอกเลขบัตรประชาชนก่อนดูวีดีโอ
        </Typography>
        <Input
          label="เลขบัตรประชาชน"
          value={idCard }
          onChange={(e) => {
            setIdCard(e.target.value)
            setError("")
          }}
          maxLength={13}
        />
        {error && <Typography color="red" className="text-sm mt-2">{error}</Typography>}
        <Button className="mt-4" onClick={handleCheckID}>ยืนยัน</Button>
        <p>1234567890123</p>
      </Card>

   </main>
  );
}

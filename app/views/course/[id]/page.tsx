'use client'

import CertificatePreview from '@/app/components/CertificatePreview'
// เหลือตรวจเช็คตามเงื่อนไข ระหว่างเล่น video

import { Button, Card, Typography } from '@/app/components/safe-material'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useRef, useState } from 'react'


const PageCourse = ({ params }: { params: Promise<{ id: string }> }) => {

    // States
    const { id } = use(params)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [videoEnded, setVideoEnded] = useState(false)
    const router = useRouter()

    // Face Data
    const fullName = "คุณนราธิป เดชะ"
    const courseTitle = `คอร์สเรียนที่ ${id}`
    const date = new Date().toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    const handleDownload = async () => {
        const html2pdf = (await import("html2pdf.js")).default
        const element = document.getElementById("certificate")
        if (!element) return
      
        html2pdf().from(element).save()
      }


    useEffect(() => {
        const video = videoRef.current
        if (video) {
            const handleEnded = () => {
                setVideoEnded(true)
            }
            video.addEventListener("ended", handleEnded)
            return () => video.removeEventListener("ended", handleEnded)
        }
    }, [])




    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <Card className="p-6 w-full max-w-3xl">
                <Typography variant="h4" color="blue-gray" className="mb-4">
                    วิดีโอเรียนคอร์ส {id}
                </Typography>

                <video
                    ref={videoRef}
                    className="w-full rounded-lg shadow"
                    controls
                    poster="https://dummyimage.com/800x450/cccccc/000000&text=Course+Video"
                >
                    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                    เบราว์เซอร์ของคุณไม่รองรับ video
                </video>

                {videoEnded ? (
                    <>
                        <Button onClick={handleDownload} className="mt-6" color="green">
                            รับใบประกาศนียบัตร
                        </Button>
                        {/* ✅ ซ่อน preview ไว้สำหรับ export PDF */}
                        <div className="hidden">
                            <CertificatePreview name={fullName} courseTitle={courseTitle} date={date} />
                        </div>
                    </>
                ) : (
                    <Typography variant="small" color="gray" className="mt-6 text-center">
                        กรุณาดูวิดีโอให้จบเพื่อรับใบประกาศ
                    </Typography>
                )}
            </Card>
        </main>
    )
}

export default PageCourse
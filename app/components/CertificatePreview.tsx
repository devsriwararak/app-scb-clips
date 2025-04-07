'use client'

type CertificateProps = {
  name: string
  courseTitle: string
  date: string
}

export default function CertificatePreview({ name, courseTitle, date }: CertificateProps) {
  return (
    <div id="certificate" className="p-8 text-center bg-white text-black w-full max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">ใบประกาศนียบัตร</h1>
      <p className="text-lg">ขอมอบให้แก่</p>
      <h2 className="text-2xl font-semibold my-2">{name}</h2>
      <p className="text-lg">เพื่อแสดงว่าได้ผ่านการเรียน</p>
      <p className="text-lg font-medium mt-1">{courseTitle}</p>
      <p className="text-sm mt-4">เมื่อวันที่ {date}</p>
    </div>
  )
}

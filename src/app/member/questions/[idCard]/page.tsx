'use client'
import React, { use } from 'react'

interface Props {
  params: Promise<{ idCard: string }>
}


const PageQuestion = ({ params }: Props) => {
      const { idCard } = use(params)
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">แบบสอบถามหลังเรียน {idCard}</h2>
            <p>คุณดูวิดีโอจบครบทุกคลิปแล้ว 🎉</p>
            <button
                // onClick={() => router.push('/')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                ตกลง
            </button>
        </div>
    )
}

export default PageQuestion
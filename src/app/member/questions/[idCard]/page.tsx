'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import QuestionEnd from './QuestionEnd'
import Button from '@/components/ui/button/Button'

interface Props {
    params: Promise<{ idCard: string }>
}


const PageQuestion = ({ params }: Props) => {
    const { idCard } = use(params)
    const rounter = useRouter()

    // State
    const [check, setCheck] = useState(false)
    const [error, setError] = useState<string>("")

    const checkStatus = async (sessionType: string | null) => {
        try {


            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/member/checkIdCard`, {
                idCard: idCard
            })


            if (res.status === 200) {
                const statusVideoEnd = res.data.statusVideoEnd
                const statusQuestionEnd = res.data.statusQuestionEnd
                if (statusVideoEnd === 0) {
                    setCheck(false)
                    if (!sessionType) {
                        setError("คุณยังดูวีดีโอไม่จบ ไม่สามารถทำข้อสอบได้ !!")
                        toast.error('กรุณาดูวีดีโอให้จบก่อน !!')
                        setTimeout(() => {
                            rounter.push(`/`)
                        }, 2000);
                    } else {
                        if (statusQuestionEnd === 0) setCheck(true)
                    }
                } else if (statusQuestionEnd === 1) {
                    setCheck(false)
                    setError("คุณทำข้อสอบผ่านแล้ว  !!")
                    toast.error('คุณทำข้อสอบไปแล้ว !!')
                } else {
                    setCheck(true)
                }
            }
        } catch (error) {
            console.log(error);
            // setCheck(false)
            rounter.push(`/`)

        }
    }

    useEffect(() => {
        const sessionType = sessionStorage.getItem("type")
        if (sessionType) {
            checkStatus(sessionType)
        } else {
            checkStatus(null)
        }


    }, [])

    return (
        <div className="px-8 md:px-20 py-8 flex justify-center items-center h-screen ">
            {check && (
                <QuestionEnd idCard={idCard} />
            )}

            {!check && (
                <div className='bg-white p-6 rounded-lg shadow-lg md:w-1/2 text-center py-16'>
                    <h2 className='text-3xl'>{error}</h2>
                    <p className='mt-4'>ไม่สามารถเข้ามาหน้านี้ได้ จนกว่าใบเซอร์จะหมดอายุ</p>

                    <Button onClick={() => rounter.push('/')} className='mt-6' >กลับหน้าหลัก</Button>
                </div>
            )}

        </div>
    )
}

export default PageQuestion
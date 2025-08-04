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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("")


    const checkStatus = async (sessionType: string | null) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/member/checkIdCard`, {
                idCard: idCard
            })
            if (res.status === 200) {
                const statusVideoEnd = res.data.statusVideoEnd
                const statusQuestionEnd = res.data.statusQuestionEnd

                if (sessionType === "Onsite") {

                    if (statusQuestionEnd === 0) {
                        setCheck(true)
                    } else if (statusQuestionEnd === 1) {
                        setCheck(false)
                        setError("คุณทำข้อสอบไปแล้ว  !!")
                        toast.error('ไม่สามารถทำข้อสอบซ้ำได้')
                    }

                } else if (sessionType === "Online") {

                    if (statusVideoEnd === 1 && statusQuestionEnd === 0) {
                        setCheck(true)
                    } else if (statusVideoEnd === 1 && statusQuestionEnd === 1) {
                        setCheck(false)
                        setError("คุณทำข้อสอบไปแล้ว !!")
                        toast.error('ไม่สามารถทำข้อสอบซ้ำได้')
                    }

                } else {
                    setCheck(false)
                }

            }
        } catch (error) {
            console.log(error);
            // setCheck(false)
            rounter.push(`/`)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const sessionType = sessionStorage.getItem("type")

        if (sessionType) {
            checkStatus(sessionType)
        }
    }, [])

    return (
        <div className="px-8 md:px-20 py-8 flex justify-center items-center h-screen ">


            {/* {check ? (
                <QuestionEnd idCard={idCard} />
            ) : (
                <div className='bg-white p-6 rounded-lg shadow-lg md:w-1/2 text-center py-16'>
                    <h2 className='text-3xl'>{error}</h2>
                    <p className='mt-4'>ไม่สามารถเข้ามาหน้านี้ได้ จนกว่าใบเซอร์จะหมดอายุ</p>

                    <Button onClick={() => rounter.push('/')} className='mt-6' >กลับหน้าหลัก</Button>
                </div>
            )} */}
            {loading ? (
                <div className="text-center py-16">
                    <p>กำลังโหลดข้อมูล...</p>
                </div>
            ) : check ? (
                <QuestionEnd idCard={idCard} />
            ) : (
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
'use client'
import Button from '@/components/ui/button/Button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface propType {
    idCard: string
}

interface Question {
    id: number
    name: string
    questionEndList: QuestionChoice[]
}

interface QuestionChoice {
    id: number
    question: string
    status: number
    questionEndId: number
    createdAT: string
}

const QuestionEnd = ({ idCard }: propType) => {
    // Systems
    const route = useRouter()


    // State
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [userAnswers, setUserAnswers] = useState<number[]>([]) // เก็บ id ของคำตอบที่เลือก
    const [submitted, setSubmitted] = useState(false)


    const fetchQuestion = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/questionEnd/all`, {
                headers: {
                    'Cache-Control': 'no-store',
                }
            })

            if (res.status === 200 && res.data.data.length > 0) {
                const shuffled = res.data.data.sort(() => 0.5 - Math.random()).slice(0, 10)
                    .map((q: Question) => ({
                        ...q,
                        questionEndList: [...q.questionEndList].sort(() => Math.random() - 0.5)
                    }))
                console.log({ shuffled });
                setQuestions(shuffled)
            }

        } catch (error) {
            console.log(error);

        }
    }

    const handleAnswer = (choiceId: number) => {

        setUserAnswers([...userAnswers, choiceId])
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1)
        } else {
            setSubmitted(true)
        }

    }

    const getResult = () => {
        let wrongCount = 0
        userAnswers.forEach((item) => {
            const found = questions
                .flatMap(q => q.questionEndList)
                .find(c => c.id === item)
            if (found?.status === 0) {
                wrongCount++
            }
        })
        return {
            total: questions.length,
            correct: questions.length - wrongCount,
            wrong: wrongCount
        }
    }

    const updateStatusMember = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/questionEnd/end`, {
                idCard
            })
            console.log(res.data);

            if (res.status === 200) {
                await sendEmail()
                return true
            }
        } catch (error) {
            console.log(error);

        }
        return false
    }

        const sendEmail = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/member/certificate/send`, {
                idCard
            })
            console.log(res.data);

            if (res.status === 200) {
                return true
            }
        } catch (error) {
            console.log(error);

        }
        return false
    }

    useEffect(() => {
        fetchQuestion()
    }, [])


    useEffect(() => {
        if (submitted) {
            if (getResult().correct === questions.length) {
                updateStatusMember()
            }
        }
    }, [submitted])

    return (
        < div className='flex flex-col md:flex-row gap-4'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-full md:w-2/3'>
                {!submitted && questions.length > 0 && (
                    <>
                        <h2 className='text-xl font-bold md:mb-4'>คำถามทั้งหมด {currentIndex + 1} / {questions.length} </h2>
                        <p className=' font-medium text-gray-700'>คำถาม</p>
                        <p className='mb-4 mt-3 text-lg md:text-2xl'>{questions[currentIndex]?.name}</p>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 '>
                            {questions[currentIndex].questionEndList.map(choice => (
                                <button
                                    key={choice.id}
                                    onClick={() => handleAnswer(choice.id)}
                                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                                >
                                    {choice.question}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {submitted && (
                    <>     <h2 className='text-xl font-bold mb-4'>ส่งข้อสอบ</h2>

                        <div className='px-3 md:px-8 py-8 bg-gray-50 rounded-md border border-gray-100'>

                            {getResult().correct !== questions.length && (
                                <div>
                                    <h3 className=' text-2xl md:text-4xl font-medium text-red-500'>คุณยังทำข้อสอบไม่ผ่านทุกข้อ !!</h3>
                                    <p className='text-red-500 mt-4'>กรุณาทำใหม่ จนกว่าจะผ่านทุกข้อ</p>
                                    <Button onClick={() => location.reload()} className='mt-4' >เริ่มทำข้อสอบใหม่</Button>
                                </div>
                            )}

                            {getResult().correct === questions.length && (
                                <div>
                                    <h3 className='text-4xl font-medium text-green-600'>คุณทำข้อสอบผ่านทุกข้อแล้ว </h3>
                                    <Button onClick={() => route.push('/')} className='mt-4' >กลับหน้าหลัก</Button>
                                </div>
                            )}
                        </div>


                    </>
                )}
            </div>

            <div className='bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3'>
                <div>

                    {submitted && (
                        <>
                            {getResult().correct !== questions.length && (
                                <div>
                                    <h2 className='text-xl font-bold mb-4 mt-4'>ผลลัพธิ์</h2>
                                    <div>
                                        <h2 className='text-xl font-bold mb-4'>ผลลัพธ์ของคุณ</h2>
                                        <p>คำถามทั้งหมด: {getResult().total}</p>
                                        <p>ตอบถูก: {getResult().correct} ข้อ</p>
                                        <p>ตอบผิด: {getResult().wrong} ข้อ</p>
                                    </div>
                                </div>
                            )}
                            {getResult().correct === questions.length && (
                                <div>
                                    <h2 className='text-xl font-bold mb-4 mt-4 text-green-600'>ยินดีด้วย คุณสอบผ่าน</h2>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default QuestionEnd





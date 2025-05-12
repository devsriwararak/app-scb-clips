'use client'
import ComponentCard from '@/components/common/ComponentCard'
import Policy from '@/components/modals/Policy'
import Button from '@/components/ui/button/Button'
import { useModal } from '@/hooks/useModal'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useRef, useState } from 'react'

interface Props {
  params: Promise<{ idCard: string }>
}

interface VideoType {
  name: string
  filePath: string
  timeAdvert: number
}

interface Question {
  id: number
  name: string
  answer: "YES" | "NO"
}

const PageVideoMember = ({ params }: Props) => {
  // Systems
  const { idCard } = use(params)
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const { isOpen, openModal, closeModal } = useModal();

  // States
  const [currentVideo, setCurrentVideo] = useState<VideoType | null>(null)
  const [check, setCheck] = useState(false)
  const [videos, setVideos] = useState<VideoType[]>([])
  const [question, setQuestion] = useState<Question | null>(null)



  // State Check video
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set())

  // State Question LIST
  const [showQuestionPopup, setShowQuestionPopup] = useState(false)
  const showQuestionPopupRef = useRef(showQuestionPopup)
  const [questionAlreadyShownFor, setQuestionAlreadyShownFor] = useState<Set<string>>(new Set()) // เพื่อเก็บว่าเคยแสดงคำถามของวิดีโอนั้นแล้ว
  const [redirectTimeoutId, setRedirectTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const [answerResults, setAnswerResults] = useState<string[]>([])

  const checkIdCard = async () => {
    try {

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/vdo/secure/checkIdCard`, {
        idCard: idCard
      })
      if (res.status === 200 && res.data.data.length > 0) {
        openModal()
        // setCheck(true)
        setVideos(res.data.data)
        setCurrentVideo(res.data.data[0])
      }
    } catch (error) {
      console.log(error);
      setCheck(false)

    }
  }

  const fetchQuestion = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/question/all`)
      console.log(res.data.data);

      if (res.data.data.length > 0) {
        const randomIndex = Math.floor(Math.random() * res.data.data.length)
        setQuestion(res.data.data[randomIndex])

      }
    } catch (error) {
      console.error('โหลดคำถามไม่สำเร็จ:', error)
    }
  }

  // คำนวณนาทีปัจจุบัน
  const shouldShowQuestion = (
    video: HTMLVideoElement,
    currentVideo: VideoType | null,
    showQuestionPopup: boolean,
    shownSet: Set<string>
  ): { shouldShow: boolean; key: string } => {
    const currentMinute = Math.floor(video.currentTime / 60)
    const key = `${currentVideo?.name}-${currentMinute}`

    const shouldShow =
      !!currentVideo?.timeAdvert &&
      currentMinute > 0 &&
      currentMinute % currentVideo.timeAdvert === 0 &&
      // !showQuestionPopup &&
      !shownSet.has(key)

    return { shouldShow, key }
  }

  // ตรวจสอบว่า ผ่านเวลา timeAdvert หรือยัง *******
  // สุ่มคำถามจาก API (fetchQuestion())
  // แสดง popup (setShowQuestionPopup(true))
  // ตั้ง setTimeout เพื่อ redirect หลัง 2 นาทีถ้าไม่ตอบ
  const handleTimeUpdate = (video: HTMLVideoElement) => {
    const { shouldShow, key } = shouldShowQuestion(video, currentVideo, showQuestionPopup, questionAlreadyShownFor)

    if (shouldShow) {
      setQuestionAlreadyShownFor(prev => new Set(prev).add(key))
      fetchQuestion()
      setShowQuestionPopup(true)
      setQuestionAlreadyShownFor(prev => new Set(prev).add(key))

      const timeoutId = setTimeout(() => {
        if (showQuestionPopupRef.current) router.push('/')
      }, 2 * 60 * 1000)

      setRedirectTimeoutId(timeoutId)
    }
  }



  const handleAnswered = (userAnswer: 'YES' | 'NO') => {
    const isCorrect = userAnswer === question?.answer
    const questionText = `คำถามที่ ${answerResults.length + 1} : ${isCorrect ? "ตอบถูก" : "ตอบผิด"} `
    setAnswerResults(prev => [...prev, questionText])

    setShowQuestionPopup(false)
    if (redirectTimeoutId) clearTimeout(redirectTimeoutId)
  }

  const updateStatusMember = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/vdo/end`, {
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

  // จบวีดีโอแล้ว แต่ละอันให้ทำยังไงต่อ ******
  // บันทึกว่า video นี้ดูจบแล้ว
  // ไปยัง video ถัดไป (ถ้ามี)
  // ถ้าครบทุก video → แสดงแบบสอบถาม
  const handleVideoEnded = async () => {

    if (currentVideo) {
      setWatchedVideos(prev => {
        const updated = new Set(prev)
        updated.add(currentVideo.filePath)
        return updated
      })
    }

    const currentIndex = videos.findIndex(v => v.filePath === currentVideo?.filePath)
    const nextIndex = currentIndex + 1

    // if (nextIndex < videos.length) {
    //   setCurrentVideo(videos[nextIndex])
    // } else {
    //   //ถ้าดูหทดแล้ว
    //   if (watchedVideos.size + 1 === videos.length) {
    //     const status = await updateStatusMember()
    //     console.log({ status });

    //     if (status) setTimeout(() => router.push(`/member/questions/${idCard}`), 500)
    //   }
    // }
    if(nextIndex < videos.length){
      setCurrentVideo(videos[nextIndex])
    }
  }



  useEffect(() => {
    checkIdCard()
  }, [])

  useEffect(() => {
    showQuestionPopupRef.current = showQuestionPopup
  }, [showQuestionPopup])

  // เล่นวีดีโอ และแสดงคำถาม ระหว่างคลิป
  useEffect(() => {
    if (!currentVideo || !videoRef.current) return

    const video = videoRef.current
    // handleTimeUpdate(video)
    const onTimeUpdate = () => handleTimeUpdate(video)

    video.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate)
      if (redirectTimeoutId) clearTimeout(redirectTimeoutId)
    }
  }, [currentVideo, showQuestionPopup])

  // ป้องกันเล่นวิดีโอต่อเมื่อ popup ยังแสดงอยู่
  useEffect(() => {
    if (!videoRef.current) return

    if (showQuestionPopup) {
      videoRef.current.pause()
    } else {
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('ไม่สามารถเล่นวิดีโอต่อได้', err)
        })
      }
    }
  }, [showQuestionPopup])

  //ถ้าดูวีดีโอหมดแล้ว ให้ อัพเดท และ ไปหน้าคำถามสุดท้าย
  useEffect(() => {
    if (videos.length > 0 && watchedVideos.size === videos.length) {
      (async () => {
        const status = await updateStatusMember()
        if (status) router.push(`/member/questions/${idCard}`)
      })()
    }
  }, [watchedVideos])

  // รีเซ็ตวิดีโอเมื่อเปลี่ยนแท็บ (visibility change)
  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current
      if (!video || !currentVideo) return

      // ถ้าผู้ใช้กลับมาจากแท็บอื่น (focus tab)
      if (document.visibilityState === 'visible') {
        video.currentTime = 0
        video.pause() // หยุดก่อน
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.warn('ไม่สามารถเล่นวิดีโอตั้งแต่ต้นได้', err)
          })
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [currentVideo])

  if (!idCard) return <p>กำลังโหลด...</p>


  return (
    <>
      <div className=' container mx-auto  lg:h-screen flex justify-center items-center'>

        {/* Dialogs */}
        {isOpen && (
          <Policy
            isOpen={isOpen}
            closeModal={closeModal}
            setCheck={setCheck}
          />
        )}

        {/* {showQuiz && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">แบบสอบถามหลังเรียน</h2>
              <p>คุณดูวิดีโอจบครบทุกคลิปแล้ว 🎉</p>
              <button
                onClick={() => router.push('/')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              >
                ตกลง
              </button>
            </div>
          </div>
        )} */}

        {showQuestionPopup && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="bg-white p-6 w-1/2 rounded-lg shadow-md ">
              <h3 className="text-xl font-semibold mb-4">คำถามจากวิดีโอ</h3>
              <p>{question?.name || 'กำลังโหลดคำถาม...'}</p>
              <div className="flex flex-col md:flex-row justify-end gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className='bg-gray-400 '
                  onClick={() => router.push('/')}
                >
                  ออกจากวีดีโอ
                </Button>
                <div className='flex  gap-3 justify-center'>
                  <Button size="sm" variant="primary" onClick={() => handleAnswered('YES')} className="bg-blue-500 text-white px-4 py-2 rounded">ถูก</Button>
                  <Button size="sm" variant="primary" onClick={() => handleAnswered('NO')} className="bg-red-500 text-white px-4 py-2 rounded">ผิด</Button>
                </div>
                <div className="flex justify-end gap-2 mt-4">

                </div>

              </div>
            </div>
          </div>
        )}


        <ComponentCard title="" className='w-full '   >
          {check ? (
            <div className='text-2xl'>
              <div className='flex justify-between items-center'>
                <h2 className='w-1/2 md:3/5 text-sm md:text-xl'>รหัสบัตรประชาชน : {idCard || "xxxxx"}</h2>
                <div className='w-1/3 md:w-2/5 flex gap-4  justify-end'>

                  <Button size="sm" >
                    <Link href="/">หน้าหลัก</Link>
                  </Button>
                </div>
              </div>


              <div className="flex flex-col lg:flex-row gap-4 p-4 mt-4">
                {/* Player */}
                <div className="flex-1">
                  {currentVideo && (

                    <>
                      <video
                        ref={videoRef}
                        src={`${process.env.NEXT_PUBLIC_API_URL}${currentVideo.filePath}`}
                        muted
                        controls
                        autoPlay
                        playsInline
                        preload="metadata"
                        onEnded={handleVideoEnded}
                        className="w-full h-[400px] bg-black rounded"
                      />

                      {answerResults.length > 0 && (
                        <div className="my-4 p-4 bg-gray-100 rounded text-sm space-y-1">
                          {answerResults.map((msg, index) => (
                            <div key={index}>{msg}</div>
                          ))}
                        </div>
                      )}
                    </>

                  )}
                </div>

                {/* List */}
                <div className="w-full lg:w-1/3 space-y-4">
                  {videos.map((video, index) => (
                    <div
                      key={index}
                      className={`p-2 border rounded  hover:bg-gray-100 dark:hover:bg-gray-800 ${currentVideo?.name === video.name ? 'bg-gray-200 dark:bg-gray-700' : ''
                        }`}
                    >
                      <p className='text-lg'> {video.name}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : "เลขบัตรประชาชนนี้ ยังไม่ได้ลงทะเบียน !!"}

        </ComponentCard>
      </div>
    </>
  )
}

export default PageVideoMember

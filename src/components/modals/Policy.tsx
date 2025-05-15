'use client'
import React from 'react'
import { Modal } from '@/components/ui/modal'
import Button from '@/components/ui/button/Button'
import { useRouter } from 'next/navigation'

interface Props {
    isOpen: boolean
    closeModal: () => void
    setCheck: (test: boolean) => void

}


const Policy = ({ isOpen, closeModal, setCheck }: Props) => {
    const router = useRouter()

    const handleClose = () => {
        closeModal()
        router.push('/')

    }

    const data = [
        {
            id: 1,
            text: "1. วัตถุประสงค์ในการเก็บข้อมูล ข้อมูลของท่านจะถูกเก็บรวบรวมเพื่อ: ยืนยันตัวตนของผู้เข้ารับชมวิดีโอความปลอดภัย บันทึกการรับชมวิดีโอเป็นหลักฐานว่าท่านได้รับทราบมาตรการความปลอดภัยก่อนเข้าพื้นที่โรงงาน ปฏิบัติตามข้อกำหนดด้านความปลอดภัยของบริษัทฯ และกฎหมายที่เกี่ยวข้อง"
        },
        {
            id: 2,
            text: "2. ประเภทของข้อมูลที่เก็บรวบรวม ชื่อ-นามสกุล หมายเลขบัตรประชาชนหรือหนังสือเดินทาง หมายเลขโทรศัพท์ เวลาที่รับชมวิดีโอ  ผลการทำแบบทดสอบ (ถ้ามี) "
        },
        {
            id: 3,
            text: "3. การใช้ข้อมูลส่วนบุคคล ข้อมูลที่เก็บรวบรวมจะถูกใช้ภายในองค์กรเพื่อวัตถุประสงค์ตามข้อ 1 เท่านั้น และจะไม่ถูกเปิดเผยแก่บุคคลภายนอก เว้นแต่: ได้รับความยินยอมจากท่าน เป็นการปฏิบัติตามข้อกำหนดของกฎหมาย หรือคำสั่งของหน่วยงานราชการ"
        },
        {
            id: 4,
            text: "4. ระยะเวลาการจัดเก็บข้อมูล ข้อมูลส่วนบุคคลจะถูกเก็บไว้ตามระยะเวลาที่จำเป็นสำหรับวัตถุประสงค์ด้านความปลอดภัย และจะถูกลบหรือทำลายเมื่อหมดความจำเป็น "
        },
    ]
    return (
        <Modal isOpen={isOpen} onClose={() => handleClose()} className="max-w-[600px] m-4 z-10  ">
            <div className=" no-scrollbar  relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 h-[600px] ">
                <h2 className='text-2xl'>นโยบายความเป็นส่วนตัว</h2>
                <p className='mt-4'>
                    นโยบายความเป็นส่วนตัวสำหรับการรับชมวิดีโอความปลอดภัยก่อนเข้าโรงงาน
                    บริษัทฯ ให้ความสำคัญกับความเป็นส่วนตัวของท่าน และขอชี้แจงนโยบายความเป็นส่วนตัวในการเก็บรวบรวม ใช้ และเก็บรักษาข้อมูลส่วนบุคคลที่เกิดขึ้นจากการรับชมวิดีโอความปลอดภัยก่อนเข้าโรงงาน ดังนี้
                </p>

                <ul className='mt-6 flex flex-col gap-4'>
                    {data.map((item)=> (
                        <li key={item.id}>{item.text}</li>
                    ))}
                </ul>


            </div>
            <Button className=' my-4 mx-6' onClick={() => {
                setCheck(true)
                closeModal()
            }}>ยืนยัน</Button>
        </Modal>
    )
}

export default Policy
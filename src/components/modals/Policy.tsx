'use client'
import React from 'react'
import { Modal } from '@/components/ui/modal'
import Button from '@/components/ui/button/Button'
import { useRouter } from 'next/navigation'

interface Props {
    isOpen: boolean
    closeModal: () => void
    setCheck : (test: boolean)=> void

}


const Policy = ({ isOpen, closeModal, setCheck}: Props) => {
    const router = useRouter()

    const handleClose = ()=>{
        closeModal()
        router.push('/')

    }

    return (
        <Modal isOpen={isOpen} onClose={()=>handleClose()} className="max-w-[600px] m-4 z-10">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
              <h2 className='text-2xl'>นโยบายความเป็นส่วนตัว</h2>
              <p className='text-gray-600 mt-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus maxime quis, provident porro a molestias earum debitis id impedit, mollitia sunt culpa ad nihil modi error totam, at veritatis. Ad?</p>

              <Button className='mt-6' onClick={()=>{
                setCheck(true)
                closeModal()
              }}>ยืนยัน</Button>
            </div>
        </Modal>
    )
}

export default Policy
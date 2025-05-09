'use client'
import ComponentCard from '@/components/common/ComponentCard'
import MemberAdd from '@/components/modals/MemberAdd';
import { useModal } from '@/hooks/useModal';
import Image from 'next/image';
import React, { useState } from 'react'
import { FiUserPlus } from "react-icons/fi";
import { FiAirplay } from "react-icons/fi";
import { MemberDataType } from './admin/member/page';
import CheckIdCard from '@/components/modals/CheckIdCard';

// export interface MemberDataType {
//   id: number
//   titleName: string
//   fname: string
//   lname: string
//   idCard: string
//   phone: string
//   companyId: number
//   locationId: number
//   lecturerId: number
//   createdAt: string
//   dateOfTraining: string
//   dateEndCertificate: string
// }




const Page = () => {
  // Systems
  const { isOpen, openModal, closeModal } = useModal();

  // States
  const [selected] = useState<MemberDataType | null>(null)
  const [error] = useState("")
  const [modalType, setModalType] = useState<"register" | "checkIdCard" | null>(null)

  const handleAdd = (type: "register" | "checkIdCard") => {
    setModalType(type)
    openModal()
  }


  return (
    <div className='flex justify-center items-center  h-screen'>

      {/* Dialogs */}
      {isOpen && modalType === "register" && (
        <MemberAdd
          isOpen={isOpen}
          closeModal={closeModal}
          defaultValues={selected || undefined}
          error={error}
          type="member"
        />
      )}

      {isOpen && modalType === "checkIdCard" && (
        <CheckIdCard
          isOpen={isOpen}
          closeModal={closeModal}
        />
      )}





      <ComponentCard title="" className='flex flex-row gap-4 py-8 px-6 '>

        <div className='flex flex-col md:flex-row gap-4 w-[800px]'>
          <ComponentCard title="" className='w-full hover:bg-gray-100 cursor-pointer'   >
            <div className='flex flex-col justify-center items-center' onClick={() => handleAdd("register")} >
              <FiUserPlus size={100} className='' />
              <h2 className='text-2xl mt-6'>ลงทะเบียนเข้าอบรม</h2>
              <p className='mt-2 text-gray-400'>กรุณาลงทะเบียนก่อนกดเข้าไปดูวีดีโอ</p>
            </div>
          </ComponentCard>
          <ComponentCard title="" className='w-full hover:bg-gray-100 cursor-pointer' >
            <div className='flex flex-col justify-center items-center' onClick={() => handleAdd("checkIdCard")} >
              <FiAirplay size={100} className='' />
              <h2 className='text-2xl mt-6'>ดูวีดีโอ</h2>
              <p className='mt-2 text-gray-400'>กรุณาลงทะเบียนก่อนกดเข้าไปดูวีดีโอ</p>
            </div>
          </ComponentCard>
        </div>

        <div className='flex justify-center items-center mt-10'>

          <Image
            src="/images/logo/logo_scgp.png"
            alt="Logo"
            width={250}
            height={100}
          />

        </div>
      </ComponentCard>

    </div>
  )
}

export default Page
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
import Link from 'next/link';


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

    <div className='mx-6 md:mx-0'>
      <div className='flex justify-end items-center mt-10  md:px-72'>
        <Image
          src="/images/logo/logo_scgp.png"
          alt="Logo"
          width={150}
          height={100}
        />
        <div className='px-4 bg-blue-600 text-white py-1'>
          <Link href='/signin'>ปุ่มเข้าสู่ระบบ เฉพาะทดสอบ</Link>
        </div>
      </div>
      

      <div className='flex justify-center items-center  '>

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
            type={'online'}
          />
        )}

        <div className='flex flex-row gap-4 py-6 md:py-12 px-6 md:px-12 mt-4 bg-white border border-gray-100 shadow-sm rounded-md '>

          <div className='flex flex-col md:flex-row gap-4 md:w-[800px]'>
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
                <h2 className='text-2xl mt-6'>ตรวจสอบสิทธิ์</h2>
                <p className='mt-2 text-gray-400'>( สำหรับออนไลนื และออนไซต์ )</p>
              </div>
            </ComponentCard>
          </div>

        </div>



        {/* <ComponentCard title="" className='flex flex-row gap-4 py-8 px-6 mt-4 '>
          <div className='flex flex-col md:flex-row gap-4 md:w-[800px]'>
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
                <h2 className='text-2xl mt-6'>ดูวีดีโอ Online</h2>
                <p className='mt-2 text-gray-400'>( สำหรับอบรมแบบออนไลน์ เท่านั้น )</p>
              </div>
            </ComponentCard>
          </div>
        </ComponentCard> */}

      </div>
    </div>
  )
}

export default Page
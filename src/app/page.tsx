'use client'
import ComponentCard from '@/components/common/ComponentCard'
import MemberAdd from '@/components/modals/MemberAdd';
import { useModal } from '@/hooks/useModal';
import Image from 'next/image';
import React, { useState } from 'react'
import { FiCodepen, FiUserPlus } from "react-icons/fi";
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
  const [mode , setMode] = useState('')

  const handleAdd = (type: "register" | "checkIdCard", mode : "Online" | "Onsite" | "") => {
    setModalType(type)
    setMode(mode)
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
        <div className='px-4 bg-blue-600 text-white py-1 rounded-md'>
          <Link href='/signin'>ปุ่มเข้าสู่ระบบ </Link>
        </div>
      </div>


      <div className='flex justify-center items-center    '>

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

        {isOpen && modalType === "checkIdCard" && mode && (
          <CheckIdCard
            isOpen={isOpen}
            closeModal={closeModal}
            type={mode}
          />
        )}

        <div className='flex flex-row gap-4 py-6 md:py-12 px-6 md:px-12 mt-4 bg-white border border-gray-100 shadow-sm rounded-md w-full md:mx-52  '>
          {/* md:w-[800px] */}
          <div className='flex flex-col md:flex-row gap-4 w-full  '>
            <ComponentCard title="" className='w-full hover:bg-gray-100 cursor-pointer '    >
              <div className='flex flex-col justify-center items-center' onClick={() => handleAdd("register", "")} >
                <FiUserPlus size={100} className='' />
                <h2 className='text-2xl mt-6'>ลงทะเบียน</h2>
              </div>
            </ComponentCard>
            <ComponentCard title="" className='w-full hover:bg-gray-100 cursor-pointer' >
              <div className='flex flex-col justify-center items-center' onClick={() => handleAdd("checkIdCard", "Online")} >
                <FiAirplay size={100} className='' />
                <h2 className='text-2xl mt-6 text-center'>สำหรับอบนมระบบ Online</h2>
              </div>
            </ComponentCard>
            <ComponentCard title="" className='w-full hover:bg-gray-100 cursor-pointer' >
              <div className='flex flex-col justify-center items-center' onClick={() => handleAdd("checkIdCard","Onsite")} >
                <FiCodepen size={100} className='' />
                <h2 className='text-2xl mt-6'>สำหรับอบรม Onsite</h2>
              </div>
            </ComponentCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
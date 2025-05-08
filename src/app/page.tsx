'use client'
import ComponentCard from '@/components/common/ComponentCard'
import LocationAdd from '@/components/modals/LocationAdd';
import MemberAdd from '@/components/modals/MemberAdd';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { GridIcon } from '@/icons'
import Image from 'next/image';
import React, { useState } from 'react'
import { FaBeer } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { FiAirplay } from "react-icons/fi";
import { MemberDataType } from './admin/member/page';

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




const page = () => {
  // Systems
  const { isOpen, openModal, closeModal } = useModal();

  // States
  const [data, setData] = useState<MemberDataType[]>([])
  const [selected, setSelected] = useState<MemberDataType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSave = async (data: { name: string }) => {
    // try {
    //     console.log({ data });

    //     setLoading(true)
    //     let res = null
    //     if (selected) {
    //         res = await api.put(`/api/location/${selected.id}`, data)

    //     } else {
    //         res = await api.post(`/api/location/add`, data)
    //     }
    //     if (res?.status === 200 || res?.status === 201) {
    //         toast.success("ทำรายการสำเร็จ")
    //         closeModal()
    //         setSelected(null)
    //         await fetchData()
    //     }
    // } catch (error) {
    //     setLoading(false)

    //     if (axios.isAxiosError(error) && error.response) {
    //         toast.error(error.response.data.message)
    //         setError(error.response.data.message)
    //     } else {
    //         toast.error("เกิดข้อผิดพลาดบางอย่าง")
    //         console.error("Unexpected error:", error)
    //     }

    // } finally {
    //     setLoading(false)

    // }
}

  return (
    <div className='flex justify-center items-center  h-screen'>

      {/* Dialogs */}
      {isOpen && (
        <MemberAdd
          isOpen={isOpen}
          closeModal={closeModal}
          defaultValues={selected || undefined}
          error={error}
          type="member"
        />
      )}

      <ComponentCard title="" className='flex flex-row gap-4 py-8 px-6 '>

        <div className='flex flex-col md:flex-row gap-4 w-[800px]'>
          <ComponentCard title="" className='w-full hover:bg-gray-100 cursor-pointer'   >
            <div className='flex flex-col justify-center items-center' onClick={()=>openModal()} >
              <FiUserPlus size={100} className='' />
              <h2 className='text-2xl mt-6'>ลงทะเบียนเข้าอบรม</h2>
              <p className='mt-2 text-gray-400'>กรุณาลงทะเบียนก่อนกดเข้าไปดูวีดีโอ</p>
            </div>
          </ComponentCard>
          <ComponentCard title="" className='w-full hover:bg-gray-100 cursor-pointer' >
            <div className='flex flex-col justify-center items-center' >
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

export default page
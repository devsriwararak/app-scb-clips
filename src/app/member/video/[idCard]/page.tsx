'use client'
import React, { use } from 'react'

interface Props {
    params: Promise<{ idCard: string }>
  }

const PageVideoMember = ({params}: Props) => {

    const { idCard } = use(params)
    return (
    <div className='text-2xl'> ตรวจสอบผ่าน รหัสบัตรประชาชนของคุณคือ : {idCard || "xxxxx"}</div>
  )
}

export default PageVideoMember
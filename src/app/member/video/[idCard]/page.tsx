'use client'
import React, { use } from 'react'

interface Props {
    params: Promise<{ idCard: string }>
  }

const PageVideoMember = ({params}: Props) => {

    const { idCard } = use(params)
    return (
    <div>PageVideoMember {idCard || "xxxxx"}</div>
  )
}

export default PageVideoMember
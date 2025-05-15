'use client'
import React, { useEffect, useState } from 'react'

interface types {
    setCheck: (test : boolean)=> void
        setCheckSafari: (test : boolean) => void

}

const BrowserCheck = ({setCheck, setCheckSafari}: types) => {

    const [error ,setError] =useState("")
    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase()
        const isSafari = /^((?!chrome|android).)*safari/.test(userAgent)
    if (isSafari) {
        setCheck(false)
        setCheckSafari(true)
        setError("กรุณาใช้เบราว์เซอร์ Google Chrome เพื่อเล่นวิดีโอ")
      alert('กรุณาใช้เบราว์เซอร์ Google Chrome เพื่อเล่นวิดีโอ')
    }

    }, [])
    return (
        <h1 className='text-3xxl'>{error}</h1>
    )
}

export default BrowserCheck
'use client'
import React, { useState } from 'react'

import { Input, Button, Typography, Card } from '@/app/components/safe-material'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import api from '@/app/lib/axiosInstance'


const LoginPage = () => {
  // Systems
  const router = useRouter()
  // const searchParams = useSearchParams()
  // const callbackUrl = searchParams.get('callbackUrl') || "/admin"

  // States
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Functions

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await api.post(`/api/auth/login`, { username, password })
      const { accessToken, id, username: userUsername, role } = res.data

      console.log(res.data);

      if (accessToken) {
        await signIn('credentials', {
          redirect: false,
          username: userUsername,
          id: id,
          role: role,
          accessToken: accessToken,

        })
        router.push('/admin/dashboard')
      } else {
        setError('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    }

  }


  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="p-6 w-full max-w-sm shadow-lg">
        <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
          เข้าสู่ระบบผู้ดูแล
        </Typography>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
          <Input
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          {error && <Typography color="red">{error}</Typography>}

          <Button type="submit" color="blue" fullWidth>
            เข้าสู่ระบบ
          </Button>
        </form>
      </Card>
    </main>
  )
}

export default LoginPage
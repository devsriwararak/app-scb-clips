'use client'

import React, { useEffect, useState } from 'react'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import api from '@/app/lib/axiosInstance';
import { Button, Card, CardBody, Typography } from '@/app/components/safe-material';

const PageDashboard = () => {

  const { data: session, status } = useSession();
  const router = useRouter();

  // States
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const res = await api.get(`/api/users`)
      console.log(res.data);

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleLogout = async () => {
    try {
      await api.post(`/api/auth/logout`)
      await signOut({ callbackUrl: "/login" });

    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  if (status === "loading") {
    return <div>กำลังโหลด...</div>;
  }

  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col  p-4">
      <h1 className="text-3xl font-bold mb-4 text-textmain">Admin Dashboard</h1>
      <p className="text-lg text-textBody ">Welcome test 12345463454, {session?.user?.username}</p>
      <p className="text-gray-500 mt-2">Role: {session?.user?.role}</p>

      <Button value={"xxx"} color="amber" variant="filled" onClick={handleLogout}>xxx</Button>


      <div className='flex flex-row gap-4'>

        <Card className='mt-4 w-full'>
          <CardBody>
            <Typography variant="h1">testtt</Typography>
            <Typography variant="body1">test</Typography>
          </CardBody>
        </Card>

        <Card className='mt-4 w-full'>
          <CardBody>
            <Typography variant="h1">testtt</Typography>
            <Typography variant="body1">test</Typography>
          </CardBody>
        </Card>

      </div>

    </div>
  )
}

export default PageDashboard
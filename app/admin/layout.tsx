'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import AdminSidebar from "../layout/AdminSidebar"
import { AdminNavbar } from "../layout/AdminNavbar"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const { data: session, status } = useSession()
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const checkRole = () => {
        if (status === "loading") return;
        if (!session || session.user.role !== "ADMIN") router.replace('/login')
    }

    useEffect(() => {
        checkRole()
    }, [session, status, router])

    return (
        <div className="flex min-h-screen overflow-hidden  ">

            <div className={`fixed md:inset-y-0 md:left-0 w-64 bg-blue-900 text-white z-40 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}>
                <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>


            <div className="flex-1 flex flex-col ">
                <div className="fixed top-0 left-0 md:left-64 right-0 ">
                    <AdminNavbar setSidebarOpen={setSidebarOpen} />
                </div>

                <div className="pt-16 md:pl-64 h-full overflow-y-auto bg-backgroundBody">
                    <main className="p-6 ">
                        {children}
                    </main>
                </div>
                
            </div>

        </div>
    )
}
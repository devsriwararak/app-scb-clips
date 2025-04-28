'use client'

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import api from "../lib/axiosInstance"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (option: boolean) => void

}

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {

  const { data: session } = useSession()
  const router = useRouter()

  const [collapsed, setCollapsed] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleLogout = async () => {
    await api.post(`/api/auth/logout`)
    await signOut({ callbackUrl: "/login" })
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])



  return (
    <aside className={`fixed md:static top-0 left-0 z-40 px-4 min-h-screen transition-transform bg-background  ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 border-r border-foreground  shadow-lg `}>
      {/* Sidebar content */}
      <div className="flex flex-col  min-h-screen">
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-foreground">
          <span className="text-xl font-bold text-textmain">SCG SYSTEMS</span>
          <button onClick={() => setSidebarOpen(false)} className="block md:hidden text-textmain">
            ✕
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col  mt-5 space-y-2">
          <button onClick={() => router.push('/admin/dashboard')} className="text-textBody text-left px-2 py-2 hover:bg-primary hover:text-main rounded-md">
            📊 Dashboard
          </button>
          <button onClick={() => router.push('/admin/users')} className="text-textBody text-left px-2 py-2 hover:bg-primary hover:text-main rounded-md">
            👥 Users
          </button>
          <button onClick={() => router.push('/admin/settings')} className="text-textBody text-left px-2 py-2 hover:bg-primary hover:text-main rounded-md">
            ⚙️ Settings
          </button>
        </nav>


        {/* Dark Mode Toggle */}
        <div className="mt-8 flex flex-col gap-4">
          <hr className="py-1 " />
          <button
            onClick={toggleDarkMode}
            className="w-full text-center py-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-md"
          >
            {isDarkMode ? (collapsed ? "🌞" : "Light Mode") : (collapsed ? "🌙" : "Dark Mode")}
          </button>
        </div>

      </div>
    </aside>
  )
}

export default AdminSidebar
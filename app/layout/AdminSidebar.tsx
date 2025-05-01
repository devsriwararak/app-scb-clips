'use client'

import { useSession, signOut } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import api from "../lib/axiosInstance"
import { Button, Card, Typography } from "../components/safe-material"
import { GrDashboard } from "react-icons/gr"
import { GiCircle } from "react-icons/gi"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (option: boolean) => void

}

interface MenuItem {
  id: number
  title: React.ReactNode
  path?: string
  children?: { title: React.ReactNode, path: string }[]

}

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {

  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const [collapsed, setCollapsed] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({})
  const colorButton = "bg-gradient-to-r from-indigo-500  to-purple-400"


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

  const menus: MenuItem[] = [
    { id: 0, title: <><GrDashboard size={20} className="inline mr-2" /> Dashboard</>, path: "/admin/dashboard" },
    {
      id: 1,
      title: <><GrDashboard size={20} className="inline mr-2" /> ข้อมูลพื้นฐาน</>,
      children: [
        { title: <><GiCircle size={10} className="inline mr-2" /> ข้อมูลผู้ใช้งาน</>, path: "/admin/users" },
        { title: <><GiCircle size={10} className="inline mr-2" /> ข้อมูลวีดีโอ</>, path: "/admin/roles" },
        { title: <><GiCircle size={10} className="inline mr-2" /> ข้อมูลคำถาม-ตอบ</>, path: "/admin/permissions" },
      ]
    },
    {
      id: 2,
      title: <><GrDashboard size={20} className="inline mr-2" /> ตั้งค่า</>,
      children: [
        { title: "🔧 General", path: "/admin/settings/general" },
        { title: "🔒 Security", path: "/admin/settings/security" },
      ]
    }
  ]

  const handleToggleDropdown = (id: number) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }


  return (

    <Card>
      <aside className={`fixed md:static top-0 left-0 z-40 px-4 min-h-screen transition-transform   ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 border-r border-foreground  shadow-lg rounded-none `}>
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
          <nav className="flex flex-col mt-5 space-y-2">

            {menus.map((menu) => {
              if (menu.children) {
                // ถ้าเป็นเมนูที่มี dropdown
                const isParentActive = menu.children.some((sub) => sub.path === pathname)
                const isOpen = openDropdowns[menu.id]

                return (
                  <div key={menu.id} className="flex flex-col ">

                    <Button
                      onClick={() => handleToggleDropdown(menu.id)}
                      className={`text-left px-2 py-2 rounded-md transition-colors flex justify-between items-center mt-2 shadow-none hover:shadow-none
                    ${isParentActive ? "bg-gray-200 dark:bg-gray-900" : " bg-none dark:bg-gray-800 text-black bg-background hover:bg-primary hover:text-main "}`}
                    >
                      <Typography className={`${isParentActive ? "" : "text-black"} font-normal`}>{menu.title}</Typography>
                      <span className=" dark:text-white">{isOpen ? "▲" : "▼"}</span>
                    </Button>

                    <div
                      className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${isOpen ? "max-h-[500px] py-4" : "max-h-0 py-0"}
                    `}
                    >
                      {menu.children.map((sub) => {
                        const isSubActive = pathname === sub.path
                        return (
                          <Button
                            key={sub.path}
                            onClick={() => router.push(sub.path)}
                            className={`text-left px-2 py-2 rounded-md transition-colors 
                            ${isSubActive ? colorButton : "bg-white dark:bg-gray-800  hover:bg-primary hover:text-main shadow-none hover:shadow-none "} w-full `}
                          >
                            <Typography className={`${isSubActive ? "text-white" : "text-black"}`}>
                              {sub.title}
                            </Typography>
                          </Button>
                        )
                      })}
                    </div>

                  </div>
                )
              } else {
                // เมนูปกติ
                const isActive = pathname === menu.path
                return (
                  <Button
                    key={menu.path}
                    // variant="gradient"
                    // color="indigo"
                    onClick={() => { router.push(menu.path!); setOpenDropdowns({}) }}
                    className={`text-left px-2 py-2 rounded-md transition-colors
                    ${isActive ? colorButton : "bg-white dark:bg-gray-800 hover:bg-primary hover:text-main shadow-none hover:shadow-none"}
                  `}
                  >
                    <Typography className={`${isActive ? "text-white" : "text-black"} font-normal`}>{menu.title}</Typography>
                  </Button>
                )
              }
            })}


          </nav>



          {/* Dark Mode Toggle */}
          <div className="mt-8 flex flex-col gap-4">
            <hr className="py-1 " />
            <Button
              color="red"
              variant="gradient"
              onClick={toggleDarkMode}
              className="w-full text-center py-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-md text-white "
            >
              {isDarkMode ? (collapsed ? "🌞" : "Light Mode") : (collapsed ? "🌙" : "Dark Mode")}
            </Button>
          </div>

        </div>
      </aside>
    </Card>
  )
}

export default AdminSidebar
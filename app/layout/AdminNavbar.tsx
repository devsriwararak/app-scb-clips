'use client'

import { useSession, signOut } from "next-auth/react"
import { Card, CardBody } from "../components/safe-material";

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

export const AdminNavbar = ({ setSidebarOpen }: NavbarProps) => {
  const { data: session } = useSession()

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <Card className="w-full">
      <nav className="   ">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

          <button onClick={() => setSidebarOpen(true)} className="block md:hidden">
            ☰
          </button>

          <div className="text-lg font-bold text-gray-800 dark:text-white">
            🛠 Admin Panel
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              👤 {session?.user.username}
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white text-sm"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </nav>
    </Card>

  )
}

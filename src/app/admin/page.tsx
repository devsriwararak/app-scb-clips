// 'use client'
// import { useRouter } from "next/navigation";
// import React, { useEffect } from "react";




// export default function Ecommerce() {
//   const path = useRouter()

//   useEffect(()=>{
//     path.push('/admin/member')
//   },[])
//   return (
// <>

//     {/* <div className="grid grid-cols-12 gap-4 md:gap-6">
//       <div className="col-span-12 space-y-6 xl:col-span-7">
//         <EcommerceMetrics />

//         <MonthlySalesChart />
//       </div>

//       <div className="col-span-12 xl:col-span-5">
//         <MonthlyTarget />
//       </div>

//       <div className="col-span-12">
//         <StatisticsChart />
//       </div>

//       <div className="col-span-12 xl:col-span-5">
//         <DemographicCard />
//       </div>

//       <div className="col-span-12 xl:col-span-7">
//         <RecentOrders />
//       </div>
//     </div> */}
//     </>
//   );
// }


// app/admin/page.tsx
'use client' // สำคัญมาก!

import { useSession, signOut } from "next-auth/react"

export default function AdminDashboard() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 md:px-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-green-600">
          สำหรับ ADMIN (กำลังปรับปรุง)
        </h1>

        <p className="mt-3 text-xl md:text-2xl text-gray-700">
          ยินดีต้อนรับสู่ส่วนผู้ดูแลระบบ
        </p>

        <div className="mt-12 p-8 bg-white rounded-xl shadow-lg w-full max-w-md">
          {session && (
            <>
              <div className="flex items-center justify-center space-x-4">
      
                <div>
                  <p className="text-left">เข้าสู่ระบบโดย</p>
                  <h3 className="text-left text-lg font-bold text-gray-800">{session.user?.name}</h3>
                </div>
              </div>

              <button
                onClick={() => signOut({ callbackUrl: '/' })} // Logout แล้วกลับไปหน้าหลัก
                className="mt-8 w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-300"
              >
                ออกจากระบบ
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

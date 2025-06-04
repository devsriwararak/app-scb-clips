import React from 'react'

const page = () => {
    return (
        <p>test zz xxxxx</p>
        // <div className="px-52 py-4  container mx-auto ">
        //     <div className="flex justify-start">
        //         {/* <img src="data:image/png;base64,<%= member.logoBase64 %>" alt="logo" className="w-20 mb-4 "> */}
        //         logo
        //     </div>

        //     <div className="border border-gray-800 mt-2    ">
        //         <h1 className="text-xl font-medium text-center  bg-gray-200 py-1.5 border-b border-gray-800">บริษัทฟินิคซ พัลพ แอนด์ เพเพอร์ จำกัด (มหาชน)</h1>
        //         <div className='flex flex-col justify-center items-center text-lg border-b border-gray-800 py-3 '>
        //             <p>เอกสารผ่านการอบรม "ความปลอดภัย อาชีวอนามัย และสภาพแวดล้อมในการทำงาน"</p>
        //             <p>ตาม พรบ.ความปลอดภัยฯ พ.ศ. 2554 สำหรับคู่ธุรกิจ</p>
        //         </div>

        //         <div className='py-4 text-center mt-2'>
        //             <section className=''>
        //                 <p className='text-xl'>เอกสารนี้ให้ไว้เพื่อแสดงว่า</p>
        //                 <p className='mt-2 text-blue-700 font-medium text-lg'>xxxxxxxxxxxxxxxxxxxx</p>
        //                 <div className='-mt-2'>.........................................................................</div>
        //             </section>


        //             <section className="mt-2 flex gap-2 px-4">
        //                 <div className="w-2/3 relative   ">
        //                     <p className='mt-2 text-gray-600'>บริษัท / หจก. ..................</p>
        //                     <span
        //                         className="absolute left-[120px] top-0 text-blue-700 font-medium text-base"
        //                         style={{ whiteSpace: 'nowrap' }}
        //                     >
        //                         บริษัท เอช.บี. ฟูลเลอร์ (ประเทศไทย) จำกัด (H.B. Fuller)
        //                     </span>
        //                 </div>

        //                 <div className="w-1/3 relative  ">
        //                     <p className='mt-2 text-gray-600'>เบอร์โทรศัพท์ ......................</p>
        //                     <span
        //                         className="absolute left-[120px] top-0 text-blue-700 font-medium text-base"
        //                         style={{ whiteSpace: 'nowrap' }}
        //                     >
        //                         0632034581
        //                     </span>
        //                 </div>
        //             </section>

        //             <section className="mt-2 flex gap-2 px-4">
        //                 <div className="w-5/12 relative    ">
        //                     <p className='mt-2 text-gray-600'>เลขบัตรประชาชน 13 หลัก. .............................</p>
        //                     <span
        //                         className="absolute left-[210px] top-0 text-blue-700 font-medium text-base"
        //                         style={{ whiteSpace: 'nowrap' }}
        //                     >
        //                         3240100449088
        //                     </span>
        //                 </div>

        //                 <div className="w-7/12 relative    ">
        //                     <p className='mt-2 text-gray-600'>สถานที่อบรม .....................</p>
        //                     <span
        //                         className="absolute left-[120px] top-0 text-blue-700 font-medium text-base"
        //                         style={{ whiteSpace: 'nowrap' }}
        //                     >
        //                         Online
        //                     </span>
        //                 </div>
        //             </section>

        //             <section className='mt-4'>
        //                 <p className='text-lg font-medium '>ได้ผ่านการอบรมความปลอดภัยฯ เพื่อปฏิบัติงานกับบริษัทฟินิคชฯ และให้คำมั่นสัญญาว่า</p>
        //                 <p className='text-gray-600 text-sm mt-2'>ด้วยข้าพเจ้าได้รับทราบแนวทางการบังคับใช้ "กฎแห่งการรักษาชีวิต (Life Saving Rules) และกฎความปลอดภัยทัวไป ( General Safety Rules)"</p>
        //                 <p className='text-gray-600 text-sm mt-1'>เพื่อนำไปใช้ในการปฏิบัติงานให้เกิดความปลอดภัยแก่ตนเอง โดยจะยึดถือ ให้พันธะสัญญาและปฏิบัติอย่างเคร่งครัด ดังนี้</p>
        //             </section>

        //             <section className='mt-6 flex gap-4'>
        //                 <div className='w-1/2 border-t border-r border-b border-gray-800'>
        //                     <p className='py-1.5 bg-gray-200 border-b border-gray-800'>กฎพิทักษ์ชีวิต 11 ข้อ : Life Saving Rules</p>
        //                     <ul className='px-4 py-2 flex flex-col justify-start items-start text-sm'>
        //                         <li>1. xx</li>
        //                         <li>1. xx</li>
        //                     </ul>
        //                 </div>
        //                 <div className='w-1/2 border-t border-l border-b border-gray-800'>
        //                     <p className='py-1.5 bg-gray-200 border-b border-gray-800'>กฎความปลอดภัยทั่วไป 11 ข้อ : General Safety Rules</p>
        //                     <ul className='px-4 py-2 flex flex-col justify-start items-start text-sm'>
        //                         <li>1. xx</li>
        //                         <li>1. xx</li>
        //                     </ul>
        //                 </div>

        //             </section>

        //             <section className='mt-4 px-2'>
        //                 <p className='text-gray-600 text-sm  text-start pl-12'>
        //                     ข้าพเจ้าได้รับทราบ ทำความเข้าใจ และตระหนักต่อข้อบังคับข้างต้น ข้าพเจ้ายินยอมที่จะปฏิบัติตามกฎแห่งการรักษาชีวิต ตามที่บริษัทได้
        //                 </p>
        //                 <p className='text-gray-600 text-sm mt-1 text-start'>
        //                     กำหนดไว้ในเอกสารอย่างเคร่งครัด เพื่อเป็นหลักฐาน ข้าพเจ้าได้ลงลายมือชื่อไว้เป็นสำคัญต่อบริษัทฯ
        //                 </p>
        //             </section>

        //             <section className='mt-4 flex gap-4'>
        //                 <div className='w-1/2'>
        //                     <div className='flex gap-2'>
        //                         <div className='w-1/2 border-t border-r border-b border-gray-800'>
        //                             <p className='py-1.5 bg-gray-200 border-b border-gray-800'>ผู้เข้าอบรมลงนามรับทราบกฎ</p>
        //                             <div className='py-2 relative'>
        //                                 <p className=' text-gray-600'>ลงนาม ....................................</p>
        //                                 <span
        //                                     className="absolute left-[40px]   text-blue-700 font-medium text-base whitespace-nowrap"
        //                                 >
        //                                     3240100449088
        //                                 </span>
        //                                 <p className='mt-3 text-gray-600 '> ....................................</p>
        //                                 <span
        //                                     className="absolute left-[40px] top-[65px] text-blue-700 font-medium text-base whitespace-nowrap"
        //                                 >
        //                                     14 พฤษภาคม 2568
        //                                 </span>
        //                                 <p className='mt-5 text-gray-600 '> วัน / เดือน / ปี</p>
        //                             </div>
        //                         </div>

        //                         {/* <div className='w-1/2'>xx</div> */}

        //                         <div className='w-1/2 border border-gray-800'>
        //                             <p className='py-1.5 bg-gray-200 border-b border-gray-800 text-sm'>ผู้บังคับบัญชาต้นสังกัดผู้เข้าอบรม</p>
        //                             <div className='py-2 relative '>
        //                                 <p className=' text-gray-600'>ลงนาม ....................................</p>
        //                                 <p className='mt-1 text-gray-600'> ....................................</p>
        //                                 <p className='mt-1 text-gray-600'> วัน / เดือน / ปี</p>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <p className=' text-xs text-start text-gray-500 px-2 py-1  mt-2'>PPPC-KK-F-SMS-06-029 Rev.02 (XX/XX/XX)</p>
        //                 </div>

        //                 <div className='w-1/2 flex flex-col gap-2 '>
        //                     <div className='border-t border-l border-b border-gray-800  relative'>
        //                         <p className='py-1.5 bg-gray-200 border-b border-gray-800 text-sm'>วิทยากร</p>
        //                         <p className=' text-gray-600 mt-5'>ลงนาม ....................................</p>
        //                         <p className='mt-2 text-gray-600 '> ....................................</p>
        //                         <span
        //                             className="absolute left-[190px] top-[40px] text-blue-700 font-medium text-base whitespace-nowrap"
        //                         >
        //                             ลายเซ็น
        //                         </span>
        //                         <span
        //                             className="absolute left-[190px] top-[73px] text-blue-700 font-medium text-base whitespace-nowrap"
        //                         >
        //                             นายสมหมาย กำสมุทร
        //                         </span>

        //                     </div>
        //                     <div className='flex gap-2'>
        //                         <div className='w-1/2 border border-gray-800'>
        //                             <p className='py-1.5 bg-gray-200 border-b border-gray-800 text-sm'>วันที่ออกใบอนุญาต</p>
        //                             <p className='py-2 text-blue-700 font-medium text-base'>14/05/2568</p>
        //                         </div>
        //                         <div className='w-1/2 border-t border-l border-b border-gray-800'>
        //                             <p className='py-1.5 bg-gray-200 border-b border-gray-800 text-sm'>วันที่ใบอนุญาตหมดอายุ</p>
        //                             <p className='py-2 text-red-700 font-medium text-base'>14/05/2568</p>
        //                             <p className='text-sm text-gray-600'>หรือพนักงานโยกย้ายสังกัตใหม่</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </section>
        //         </div>
        //     </div>
            
        // </div>
    )
}

export default page
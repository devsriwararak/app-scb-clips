'use client'
import React from 'react'
import { Modal } from '@/components/ui/modal'
import { MemberDataType } from '@/app/admin/member/page'
import moment from 'moment'
import 'moment/locale/th'
moment.locale('th')


interface Props {
    isOpen: boolean
    closeModal: () => void
    defaultValues?: MemberDataType;


}



const MemberView = ({ isOpen, closeModal, defaultValues }: Props) => {

    const tag_p_class_title = "mb-2 text-sm leading-normal text-gray-500 dark:text-gray-400"
    const tag_p_class_detail = "text-sm font-medium text-gray-800 dark:text-white/90"


    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[800px] m-4 z-10">

            <div className="no-scrollbar relative w-full max-w-[800px]  rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="  px-8 py-6 ">
                    <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
                        ข้อมูล ( {defaultValues?.titleName} {" "} {defaultValues?.fname} {" "} {defaultValues?.lname} )
                    </h4>

                    <div className='mt-8'>
                        <div className='flex flex-col md:flex-row   justify-between'>
                            <div className='w-full md:w-1/3 '>
                                <p className={tag_p_class_title}>เลขบัตรประชาชน</p>
                                <p className={tag_p_class_detail}>{defaultValues?.idCard}</p>
                            </div>
                            <div className='w-full md:w-1/3'>
                                <p className={tag_p_class_title}>เบอร์โทร</p>
                                <p className={tag_p_class_detail}>{defaultValues?.phone}</p>
                            </div>
                            <div className='w-full md:w-1/3'>
                                <p className={tag_p_class_title}>บริษัท</p>
                                <p className={tag_p_class_detail}>{defaultValues?.company.name}</p>
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row   justify-start  mt-7'>
                            <div className='w-full md:w-1/3 '>
                                <p className={tag_p_class_title}>สถานที่อบรม</p>
                                <p className={tag_p_class_detail}>{defaultValues?.location.name}</p>
                            </div>
                            <div className='w-full md:w-1/3'>
                                <p className={tag_p_class_title}>วิทยากร</p>
                                <p className={tag_p_class_detail}>{defaultValues?.lecturer.name}</p>
                            </div >
                            <div className='w-full md:w-1/3'>
                                <p className={tag_p_class_title}>E-mail</p>
                                <p className={tag_p_class_detail}>{defaultValues?.email}</p>
                            </div>
                        </div>

            

                        <div className='flex flex-col md:flex-row   justify-start  mt-7'>
                            <div className='w-full md:w-1/3'>
                                <p className={tag_p_class_title}>วันที่อบรม</p>
                                <p className={tag_p_class_detail}>{moment(defaultValues?.dateOfTraining).format('D MMMM YYYY')}</p>
                            </div>
                            <div className='w-full md:w-1/3'>
                                <p className={tag_p_class_title}>วันที่ใบเซอร์หมดอายุ</p>
                                <p className={tag_p_class_detail}>{
                                    defaultValues?.dateEndCertificate
                                        ? moment(defaultValues?.dateEndCertificate).format('D MMMM YYYY')
                                        : " ยังอบรมไม่เสร็จ "
                                }</p>
                            </div>
                            <div className='w-full md:w-1/3'>
                                <p className={tag_p_class_title}>เหลือเวลาอีก / วัน</p>
                                <p className={tag_p_class_detail}>  {
                                    defaultValues?.dateEndCertificate
                                        ? moment(defaultValues?.dateEndCertificate).diff(moment(), 'days')
                                        : " 0 วัน"

                                }
                                </p>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
        </Modal>
    )
}

export default MemberView


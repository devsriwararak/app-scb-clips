'use client'
import React, { useEffect, useState } from 'react'
import Label from '@/components/form/Label'
import Input from '@/components/form/input/InputField'
import { Modal } from '@/components/ui/modal'
import Button from '@/components/ui/button/Button'
import { Controller, useForm } from 'react-hook-form'
import Select from '../form/Select'
import { ChevronDownIcon } from '@/icons'
import DatePicker from '../form/date-picker'
import axios from 'axios'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { MemberDataType } from '@/app/admin/member/page'
import api from '@/app/lib/axiosInstance'
import moment from 'moment'
import 'moment/locale/th'
moment.locale('th')


interface Props {
    isOpen: boolean
    closeModal: () => void
    defaultValues?: MemberDataType;


}

interface SelectType {
    value: string
    label: string
}

const options = [
    { value: "นาย", label: "นาย" },
    { value: "นางสาว", label: "นางสาว" },
    { value: "นาง", label: "นาง" },
];


const MemberView = ({ isOpen, closeModal, defaultValues }: Props) => {

    const tag_p_class_title = "mb-2 text-sm leading-normal text-gray-500 dark:text-gray-400"
    const tag_p_class_detail = "text-lg font-medium text-gray-800 dark:text-white/90"

    


    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4 z-10">
            <div className="no-scrollbar relative w-full max-w-[700px]  rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className=" pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        ข้อมูล ( {defaultValues?.titleName} {" "} {defaultValues?.fname} {" "} {defaultValues?.lname} )
                    </h4>

                    <div className='mt-6'>
                        <div className='flex flex-col md:flex-row   justify-between'>
                            <div>
                                <p className={tag_p_class_title}>เลขบัตรประชาชน</p>
                                <p className={tag_p_class_detail}>{defaultValues?.idCard}</p>
                            </div>
                            <div>
                                <p className={tag_p_class_title}>เบอร์โทร</p>
                                <p className={tag_p_class_detail}>{defaultValues?.phone}</p>
                            </div>
                            <div>
                                <p className={tag_p_class_title}>บริษัท</p>
                                <p className={tag_p_class_detail}>{defaultValues?.company.name}</p>
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row   justify-start gap-8 mt-8'>
                            <div>
                                <p className={tag_p_class_title}>สถานที่อบรม</p>
                                <p className={tag_p_class_detail}>{defaultValues?.location.name}</p>
                            </div>
                            <div>
                                <p className={tag_p_class_title}>วิทยากร</p>
                                <p className={tag_p_class_detail}>{defaultValues?.lecturer.name}</p>
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row   justify-start gap-8 mt-8'>
                            <div>
                                <p className={tag_p_class_title}>วันที่อบรม</p>
                                <p className={tag_p_class_detail}>{moment(defaultValues?.dateOfTraining).format('D MMMM YYYY') }</p>
                            </div>
                            <div>
                                <p className={tag_p_class_title}>วันที่ใบเซอร์หมดอายุ</p>
                                <p className={tag_p_class_detail}>{ moment(defaultValues?.dateEndCertificate).format('D MMMM YYYY') }</p>
                            </div>
                            <div>
                                <p className={tag_p_class_title}>เหลือเวลาอีก / วัน</p>
                                <p className={tag_p_class_detail}>  {moment(defaultValues?.dateEndCertificate).diff(moment(), 'days')} วัน
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


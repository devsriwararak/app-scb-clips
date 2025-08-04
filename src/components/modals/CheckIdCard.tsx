'use client'
import React, { useState } from 'react'
import Label from '@/components/form/Label'
import Input from '@/components/form/input/InputField'
import { Modal } from '@/components/ui/modal'
import Button from '@/components/ui/button/Button'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { MemberDataType } from '@/app/admin/member/page'
import moment from 'moment'
import 'moment/locale/th'
import DatePicker from '../form/date-picker'
moment.locale('th')

interface Props {
    isOpen: boolean
    closeModal: () => void
    type: string
}

const CheckIdCard = ({ isOpen, closeModal, type }: Props) => {

    // Systems
    const { control, handleSubmit } = useForm<MemberDataType>({ defaultValues: { idCard: "", idCardType: 1, dateOfTraining: "" }, })
    const router = useRouter()

    // State 
    const [idCardSwitch, setIdCardSwitch] = useState<number>(1)
    const [dateOfTrainingStatus, setDateOfTrainingStatus] = useState<boolean>(false)
    const [idCard, setIdCard] = useState<string>("")
    const [dateOfTraining, setDateOfTraining] = useState<string>("")


    const onSubmit = async (data: { idCard: string, idCardType: number }) => {

        const payload = data.idCard
        if (!payload) return toast.error('ส่งข้อมูลไม่ครบ')
        setIdCard(payload)

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/member/checkIdCard`, { idCard: payload })
            console.log(res);
            if (res.status === 200 || res.status === 201) {
                console.log(res.data);
                const idCard = res.data.idCard
                const dateOfTraining = res.data.dateOfTraining
                const location = res.data.location

                if (!idCard) return
                // เช็ค login มาจาก type เดียวกัน ไหม

                if (type !== location) {
                    toast.error(`เข้าผิดลิ้งคื สถานะ คือ ${location} `)
                    return
                }

                if (!dateOfTraining) {
                    toast.error('เกิดข้อผิดพลาด')
                    setDateOfTrainingStatus(true)
                    return
                }

                if (location === "Online") {
                    router.replace(`/member/video/${idCard}`);
                } else if (location === "Onsite") {
                    sessionStorage.setItem("type", location);
                    router.replace(`/member/questions/${idCard}`);
                } else {
                    toast.error(`เข้าผิดลิ้งค์ สถานะคือ ${location}`);
                }

                // if (dateOfTraining) {
                //     if (location === "Online") {
                //         router.replace(`/member/video/${idCard}`)
                //     } else if (location === "Onsite") {
                //         sessionStorage.setItem("type", location)
                //         router.replace(`/member/questions/${idCard}`)
                //     }else {
                //         toast.error(`เข้าผิดลิ้งคื สถานะ คือ ${location} `)
                //     }
                // } else {
                //     toast.error('เกิดข้อผิดพลาด')
                //     setDateOfTrainingStatus(true)
                // }

            }
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message)
            } else {
                toast.error("เกิดข้อผิดพลาดบางอย่าง")
                console.error("Unexpected error:", error)
            }
        }
    };

    const onError = (errors: FieldErrors<MemberDataType>) => {

        const fieldNames = Object.keys(errors).map((key) => {
            switch (key) {
                case "idCard": return "เลขบัตรประชาชน";
                default: return key;
            }
        });
        toast.error(`กรุณากรอกข้อมูลให้ครบถ้วน: \n- ${fieldNames.join("\n- ")}`)
    };

    const handleAddDateOfTraining = async () => {
        try {
            if (!idCard) return toast.error(`ไม่พบรหัสบัตรประชาชน`)
            console.log(idCardSwitch);

            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/member/user/update/${idCard}`, { dateOfTraining })
            if (res.status === 200) {
                await onSubmit({ idCard: res.data.idCard, idCardType: idCardSwitch })
            }
        } catch (error) {
            console.log(error);

        }
    }



    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[400px] m-4 z-10">
            <div className="no-scrollbar relative w-full max-w-[700px]  rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className=" pr-14">
                    <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
                        ระบบตรวจสอบสิทธิ์
                    </h4>

                    <div className='mt-4'>
                        <form className="flex flex-col mt-6" onSubmit={handleSubmit(onSubmit, onError)}>

                            <div className='w-full'>


                                {idCardSwitch === 1 && !dateOfTrainingStatus && (
                                    <>
                                        <Label>เลขบัตรประชาชน 13 หลัก</Label>
                                        <Controller
                                            name="idCard"
                                            control={control}
                                            rules={{
                                                required: "กรุณากรอกเลขบัตรประชาชน",
                                                validate: (value) =>
                                                    value.length === 13 || "กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={13}
                                                    placeholder="กรอกเลขบัตรประชาชน"
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/\D/g, "").slice(0, 13)
                                                        field.onChange(value)
                                                    }}
                                                />
                                            )}
                                        />
                                    </>
                                )}
                                {idCardSwitch === 2 && !dateOfTrainingStatus && (
                                    <>
                                        <Label>Passport No.</Label>
                                        <Controller
                                            name="idCard"
                                            control={control}
                                            rules={{
                                                required: "Please input Passport",
                                                validate: (value) =>
                                                    value.length === 9 || "Please input Passport No for 9 items",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    maxLength={9}
                                                    placeholder="Enter your Passport No"

                                                />
                                            )}
                                        />
                                    </>
                                )}
                            </div>

                            {!dateOfTrainingStatus && (
                                <div className='flex flex-row gap-3 items-center mt-2 justify-start'>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">เลือกสัญชาติ</label>
                                        <Controller
                                            name="idCardType"
                                            control={control}
                                            render={({ field }) => (
                                                <div className="flex items-center space-x-6 mt-2">
                                                    {/* ไทย */}
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="radio"
                                                            value={1}
                                                            checked={field.value == 1}
                                                            onChange={() => { field.onChange(1); setIdCardSwitch(1) }}
                                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                        />
                                                        <span className="text-gray-700">ไทย</span>
                                                    </label>

                                                    {/* ต่างชาติ */}
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="radio"
                                                            value={2}
                                                            checked={field.value == 2}
                                                            onChange={() => { field.onChange(2); setIdCardSwitch(2) }}
                                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                        />
                                                        <span className="text-gray-700">ต่างชาติ</span>
                                                    </label>
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}

                            {dateOfTrainingStatus && (
                                <div className='w-full'>
                                    <p className='text-red-600'>ใบเซอร์หมดอายุ กรุณาระบุวันที่ใหม่ *</p>
                                    <div className='mt-3'>
                                        <DatePicker
                                            id="dateOfTraining"
                                            label="เลือกวันที่เข้าอบรม"
                                            placeholder="เลือกวันที่"
                                            onChange={(e) => {
                                                if (e && e[0]) {
                                                    setDateOfTraining(e[0].toISOString())
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-center ">
                                {dateOfTrainingStatus ? (
                                    <Button size="sm" type="button" className='w-full' onClick={handleAddDateOfTraining} >
                                        บันทึก และ เข้าระบบ
                                    </Button>
                                ) : (
                                    <Button size="sm" type="submit" className='w-full' >
                                        ตรวจสอบ
                                    </Button>
                                )}

                            </div>

                        </form>

                    </div>

                </div>


            </div>
        </Modal>
    )
}

export default CheckIdCard


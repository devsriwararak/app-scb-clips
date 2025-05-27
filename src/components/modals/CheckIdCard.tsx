'use client'
import React from 'react'
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
moment.locale('th')

interface Props {
    isOpen: boolean
    closeModal: () => void
    type: string
}

const CheckIdCard = ({ isOpen, closeModal, type }: Props) => {

    // Systems
    const { control, handleSubmit } = useForm<MemberDataType>({ defaultValues: { idCard: "" }, })
    const router = useRouter()

    const onSubmit = async (data: { idCard: string }) => {

        const payload = data.idCard

        if (!payload) return toast.error('ส่งข้อมูลไม่ครบ')

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/member/checkIdCard`, { idCard: payload })

            if (res.status === 200 || res.status === 201) {
                console.log(res.data);
                const idCard = res.data.idCard
                const dateOfTraining = res.data.dateOfTraining
                let status = 0

                if (!idCard) return
                if (type === "online") {
                    status = 0
                } else {
                    status = 1
                }

                if (dateOfTraining) {
                    if (status === 0) {
                        router.replace(`/member/video/${idCard}`)
                    } else if (status === 1) {
                        sessionStorage.setItem("type", type)
                        router.replace(`/member/questions/${idCard}`)
                    }
                } else {
                    toast.error('ใบเซอร์ของคุณหมดอายุแล้ว กรุณาแจ้ง ADMIN แก้ไขข้อมูลลงทะเบียนให้')
                    return
                }

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



    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[400px] m-4 z-10">
            <div className="no-scrollbar relative w-full max-w-[700px]  rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className=" pr-14">
                    <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
                        ระบบตรวจสอบสิทธิ์ {type}
                    </h4>

                    <div className='mt-4'>
                        <form className="flex flex-col mt-6" onSubmit={handleSubmit(onSubmit, onError)}>

                            {/* <Label>กรอกเลขบัตรประชาชน</Label>

                            <Input
                                {...register("idCard", { required: true })}
                                type="text"
                                placeholder='กรอกเลขบัตรประชาชน'
                            /> */}

                            <div className='w-full'>
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
                            </div>

                            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-center ">
                                <Button size="sm" type="submit" className='w-full' >
                                    ตรวจสอบ
                                </Button>
                            </div>

                        </form>

                    </div>

                </div>


            </div>
        </Modal>
    )
}

export default CheckIdCard


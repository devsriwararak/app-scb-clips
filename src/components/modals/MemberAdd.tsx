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


interface Props {
    isOpen: boolean
    closeModal: () => void
    // onSubmit: (data: { name: string }) => void
    defaultValues?: MemberDataType;
    error: string
    type: string
    fetchData? : ()=> Promise<void>  
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


const MemberAdd = ({ isOpen, closeModal, defaultValues, error, type, fetchData }: Props) => {


    const { register, control, reset, handleSubmit } = useForm<MemberDataType>({
        defaultValues: {
            id: 0,
            titleName: "",
            fname: "",
            lname: "",
            idCard: "",
            phone: "",
            companyId: 0,
            locationId: 0,
            lecturerId: 0,
            createdAt: "",
            dateOfTraining: "",
            dateEndCertificate: "",
        },
    })

    const router = useRouter()

    // State
    const [companyData, setCompanyData] = useState<SelectType[]>([])
    const [locationData, setLocationData] = useState<SelectType[]>([])
    const [lecturerData, setLecturerData] = useState<SelectType[]>([])

    React.useEffect(() => {
        if (isOpen) {
            if (defaultValues) {
                // reset(defaultValues || { fname: "" })
                reset({
                    id: defaultValues?.id || 0,
                    titleName: defaultValues?.titleName || "",
                    fname: defaultValues?.fname || "",
                    lname: defaultValues?.lname || "",
                    idCard: defaultValues?.idCard || "",
                    phone: defaultValues?.phone || "",
                    companyId: defaultValues?.companyId || 0,
                    locationId: defaultValues?.locationId || 0,
                    lecturerId: defaultValues?.lecturerId || 0,
                    createdAt: defaultValues?.createdAt || "",
                    dateOfTraining: defaultValues?.dateOfTraining || "",
                    dateEndCertificate: defaultValues?.dateEndCertificate || "",
                })
            } else {
                reset({ fname: "" })
            }
        }
    }, [isOpen, defaultValues, reset])

    const fetchDataCompany = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/company/all`)
            if (res.status === 200) {
                const newResult = res.data.data.map((item: { id: string, name: string }) => ({
                    value: String(item.id),
                    label: item.name
                }))
                setCompanyData(newResult)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchDataLocation = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/location/all`)
            if (res.status === 200) {
                const newResult = res.data.data.map((item: { id: string, name: string }) => ({
                    value: String(item.id),
                    label: item.name
                }))
                setLocationData(newResult)
            }
        } catch (error) {
            console.log(error);
        }
    }

    // lecturer

    const fetchDataLecturer = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/lecturer/all`)
            if (res.status === 200) {
                const newResult = res.data.data.map((item: { id: string, name: string }) => ({
                    value: String(item.id),
                    label: item.name
                }))
                setLecturerData(newResult)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isOpen) {
            fetchDataCompany()
            fetchDataLocation()
            fetchDataLecturer()
        }
    }, [isOpen])


    const onSubmit = async (data: any) => {
        const payload = {
            ...data,
            dateOfTraining: data.dateOfTraining
                ? new Date(data.dateOfTraining).toISOString()
                : null
        };

        if (!payload) return toast.error('ส่งข้อมูลไม่ครบ')

        try {
            let res
            if (defaultValues) {
                res = await api.put(`/api/member/${defaultValues.id}`, payload)
                if(fetchData) await fetchData()

            } else {
                 res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/member/add`, payload)
            }

            if (res.status === 200 || res.status === 201) {
                console.log(res.data);
                const idCard = res.data.result.idCard

                if (!idCard) return

                toast.success('ทำรายการสำเร็จ')
                if (type === "admin") {
                    closeModal()
                } else {
                    router.replace(`/member/video/${idCard}`)
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
    
    const onError = (errors: any) => {

        const fieldNames = Object.keys(errors).map((key) => {
            switch (key) {
                case "titleName": return "คำนำหน้า";
                case "fname": return "ชื่อจริง";
                case "lname": return "นามสกุล";
                case "idCard": return "เลขบัตรประชาชน";
                case "phone": return "เบอร์โทร";
                case "companyId": return "บริษัท";
                case "locationId": return "สถานที่อบรม";
                case "lecturerId": return "วิทยากร";
                case "dateOfTraining": return "วันที่เข้าอบรม";
                default: return key;
            }
        });
        toast.error(`กรุณากรอกข้อมูลให้ครบถ้วน: \n- ${fieldNames.join("\n- ")}`)
    };


    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4 z-10">
            <div className="no-scrollbar relative w-full max-w-[700px]  rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className=" pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        ฟอร์มลงทะเบียน
                    </h4>
                </div>

                <form className="flex flex-col mt-6" onSubmit={handleSubmit(onSubmit, onError)}>

                    <div className="    pb-3 flex gap-4">
                        <div>
                            <Label>เลือกคำนำหน้าชื่อ</Label>
                            <div className="relative">
                                <Controller
                                    name="titleName"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <ReactSelect<SelectType>
                                            options={options}
                                            placeholder="เลือก"
                                            isClearable={true}
                                            value={options.find(option => option.value == String(field.value))}
                                            onChange={(option) => field.onChange(option?.value)}
                                        />
                                    )}
                                />


                            </div>
                        </div>
                        <div>
                            <Label>ชื่อจริง</Label>
                            <Input
                                {...register("fname", { required: true })}
                                type="text"
                                placeholder='กรอกชื่อ'
                            />
                        </div>
                        <div>
                            <Label>นามสกุล</Label>
                            <Input
                                {...register("lname", { required: true })}
                                type="text"
                                placeholder='กรอกนามสกุล'
                            />
                        </div>
                    </div>

                    <div className="   pb-3 flex gap-4 mt-2">
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
                        <div className='w-full'>
                            <Label>เลือกบริษัท/หจก.</Label>
                            <div className="relative">
                                <Controller
                                    name="companyId"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <ReactSelect<SelectType>
                                            options={companyData}
                                            placeholder="เลือกบริษัท"
                                            isClearable={true}
                                            value={companyData.find(option => option.value === String(field.value))}
                                            onChange={(option) => field.onChange(option?.value)}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>


                    <div className="  pb-3 flex gap-4 mt-2">

                        <div className='w-full'>
                            <Label>เบอร์โทรศัพท์</Label>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{
                                    required: "กรุณากรอกเลขบัตรประชาชน",
                                    validate: (value) =>
                                        value.length === 10 || "กรุณากรอกเบอร์โทร์ให้ครบ 10 หลัก",
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={10}
                                        placeholder="กรอกเลขบัตรประชาชน"
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                                            field.onChange(value)
                                        }}
                                    />
                                )}
                            />
                        </div>

                        <div className='w-full'>
                            <div>
                                <Controller
                                    name="dateOfTraining"
                                    control={control}
                                    rules={{ required: "กรุณาเลือกวันที่อบรม" }}
                                    render={({ field }) => (
                                        <DatePicker
                                            id="dateOfTraining"
                                            label="เลือกวันที่เข้าอบรม"
                                            placeholder="เลือกวันที่"
                                            defaultDate={field.value}
                                            onChange={(dates: Date[]) => {
                                                field.onChange(dates?.[0] || null); // ✅ เก็บวันที่เดียว
                                            }}
                                        />
                                    )}
                                />

                            </div>
                        </div>
                    </div>

                    <div className="  pb-3 flex gap-4 mt-2">
                        <div className='w-full'>
                            <Label>สถานที่อบรม</Label>
                            <div className="relative">
                                <Controller
                                    name="locationId"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <ReactSelect<SelectType>
                                            options={locationData}
                                            placeholder="เลือกสถานที่อบรม"
                                            isClearable={true}
                                            value={locationData.find(option => option.value === String(field.value))}
                                            onChange={(option) => field.onChange(option?.value)}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className='w-full'>
                            <Label>วิทยากร</Label>
                            <div className="relative">
                                <Controller
                                    name="lecturerId"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <ReactSelect<SelectType>
                                            options={lecturerData}
                                            placeholder="เลือกวิทยากร"
                                            isClearable={true}
                                            value={lecturerData.find(option => option.value === String(field.value))}
                                            onChange={(option) => field.onChange(option?.value)}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" variant="outline" onClick={closeModal} >
                            ยกเลิก
                        </Button>
                        <Button size="sm" type="submit" >
                            ลงทะเบียน
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default MemberAdd


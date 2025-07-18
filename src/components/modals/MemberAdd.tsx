'use client'
import React, { useEffect, useState } from 'react'
import Label from '@/components/form/Label'
import Input from '@/components/form/input/InputField'
import { Modal } from '@/components/ui/modal'
import Button from '@/components/ui/button/Button'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
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
    fetchData?: () => Promise<void>
}

interface SelectType {
    value: string
    label: string
}



const MemberAdd = ({ isOpen, closeModal, defaultValues, error, type, fetchData }: Props) => {


    const { register, control, reset, handleSubmit } = useForm<MemberDataType>({
        defaultValues: {
            id: 0,
            titleName: "",
            fname: "",
            lname: "",
            idCard: "",
            idCardType: 1,
            phone: "",
            email: "",
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
    const [idCardSwitch, setIdCardSwitch] = useState<number>(defaultValues?.idCardType || 1)

    const options = idCardSwitch === 1 ? [
        { value: "นาย", label: "นาย" },
        { value: "นางสาว", label: "นางสาว" },
        { value: "นาง", label: "นาง" },
    ] : idCardSwitch === 2 ? [
        { value: "Mr", label: "Mr" },
        { value: "Miss", label: "Miss" },
         { value: "Mrs", label: "Mrs" },
    ]: [];


    React.useEffect(() => {
        if (isOpen) {
            if (defaultValues) {
                reset({
                    id: defaultValues?.id || 0,
                    titleName: defaultValues?.titleName || "",
                    fname: defaultValues?.fname || "",
                    lname: defaultValues?.lname || "",
                    idCard: defaultValues?.idCard || "",
                    idCardType: defaultValues.idCardType || 1,
                    phone: defaultValues?.phone || "",
                    email: defaultValues.email || "",
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


    const onSubmit = async (data: MemberDataType) => {
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
            } else {
                res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/member/add`, payload)
            }

            console.log(res);

            if (res.status === 200) {
                toast.success('ทำรายการสำเร็จ')
                const idCard = res.data.idCard
                if (!idCard) return

                if (type === "admin") {
                    closeModal()
                } else {
                    router.replace(`/member/video/${idCard}`)
                }

            } else if (res.status === 201) {
                toast.success('ทำรายการสำเร็จ')
                if (fetchData) await fetchData()
                closeModal()
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
                case "titleName": return "คำนำหน้า";
                case "fname": return "ชื่อจริง";
                case "lname": return "นามสกุล";
                case "idCard": return "เลขบัตรประชาชน";
                case "email": return "กรอก E-mail";
                case "phone": return "เบอร์โทร";
                case "companyId": return "บริษัท";
                case "locationId": return "สถานที่อบรม";
                case "lecturerId": return "วิทยากร";
                // case "dateOfTraining": return "วันที่เข้าอบรม";
                default: return key;
            }
        });
        toast.error(`กรุณากรอกข้อมูลให้ครบถ้วน: \n- ${fieldNames.join("\n- ")}`)
    };


    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px]  m-4 z-10">
            <div className="no-scrollbar relative w-full max-w-[700px]  rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className=" pr-14">
                    <h4 className="mb-0 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        ฟอร์มลงทะเบียน
                    </h4>
                </div>

                <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit, onError)}>

                    <div className='flex flex-row gap-3 items-center md:mt-2 justify-start'>
                        <label className="text-sm font-medium text-gray-700">เลือกสัญชาติ</label>
                        <Controller
                            name="idCardType"
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-center space-x-6 ">
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

                    <div className="pb-3 flex gap-4 mt-4">
                        <div>
                            <Label>คำนำหน้า</Label>
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
                            <Label>E-mail</Label>
                            <Input
                                {...register("email", { required: true })}
                                type="email"
                                placeholder='กรอกนามสกุล'

                            />
                        </div>

                        <div className='w-full'>
                            <Label>แนบไฟล์</Label>
                            <Input
                                // {...register("", { required: true })}
                                disabled
                                type="file"
                                placeholder='กรอกนามสกุล'

                            />
                        </div>
                    </div>

                    <div className="   pb-3 flex gap-4 mt-2">
                        <div className='w-full'>
                            {idCardSwitch === 1 && (
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
                            {idCardSwitch === 2 && (
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
                                    required: "กรอกเบอร์โทรศัพท์",
                                    validate: (value) =>
                                        value.length === 10 || "กรุณากรอกเบอร์โทร์ให้ครบ 10 หลัก",
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={10}
                                        placeholder="กรอกเบอร์โทรศัพท์"
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
                                    // rules={{ required: "กรุณาเลือกวันที่อบรม" }}
                                    render={({ field }) => (
                                        <DatePicker
                                            id="dateOfTraining"
                                            label="เลือกวันที่เข้าอบรม"
                                            placeholder="เลือกวันที่"
                                            defaultDate={field.value}
                                            onChange={(dates: Date[]) => {
                                                field.onChange(dates?.[0] || null); 
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


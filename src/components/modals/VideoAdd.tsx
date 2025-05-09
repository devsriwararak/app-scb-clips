'use client'
import React from 'react'
import Label from '@/components/form/Label'
import Input from '@/components/form/input/InputField'
import { Modal } from '@/components/ui/modal'
import Button from '@/components/ui/button/Button'
import { useForm } from 'react-hook-form'

interface Props {
    isOpen: boolean
    closeModal: () => void
    onSubmit: (formData: FormData) => void
    defaultValues?: { id: number; name: string; video: FileList; detail: string; timeAdvert: number};
    error: string
    loading : boolean
}

interface VideoFormInputs {
    name: string
    detail?: string
    timeAdvert: number 
    video: FileList
}


const VideoAdd = ({ isOpen, closeModal, onSubmit, defaultValues, error, loading }: Props) => {

    const { register, handleSubmit, reset } = useForm({ defaultValues })

    React.useEffect(() => {
        if (isOpen) {
            if (defaultValues) {
                reset(defaultValues || { name: "", timeAdvert : 0 })
            } else {
                reset({ name: "" })
            }
        }
    }, [isOpen, defaultValues, reset])

    const handleFormSubmit = ( data: VideoFormInputs)=> {
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("detail", data.detail || "")
    formData.append("timeAdvert", String(data.timeAdvert))

        if(data.video && data.video[0]){
            formData.append("video", data.video[0])
        }

        if(defaultValues?.id){
            formData.append("id", defaultValues.id.toString())
        }
        onSubmit(formData)
    }

    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4 z-10">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        เพิ่มข้อมูลวีดีโอ
                    </h4>
                </div>

                <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="custom-scrollbar  overflow-y-auto px-2 pb-3 flex flex-col md:flex-row gap-4">
                        <div className='w-full'>
                            <Label>ชื่อวีดีโอ</Label>
                            <Input
                                {...register("name", { required: true })}
                                type="text"
                                placeholder='กรอกชื่อวีดีโอ'
                            />
                        </div>
                    </div>

                    <div className="custom-scrollbar  overflow-y-auto px-2 pb-3 flex flex-col md:flex-row gap-4">
                        <div className='w-full'>
                            <Label>ระยะเวลาที่จะให้แสดง</Label>
                            <Input
                                {...register("timeAdvert", { required: true })}
                                type="number"
                                placeholder='0'
                                max={90}
                            />
                        </div>
                        <div className='w-full'>
                            <Label>ชื่อวีดีโอ</Label>
                            <Input
                                {...register("video")}
                                type="file"
                                accept="video/*"
                            />
                        </div>
                    </div>

                    <div className="custom-scrollbar mt-3  overflow-y-auto px-2 pb-3 flex flex-col md:flex-row gap-4">
                        <div className='w-full'>
                            <Label>รายละเอียด</Label>
                            <Input
                                {...register("detail")}
                                type="text"
                                placeholder='กรอกรายละเอียด'
                            />
                            {/* Argument of type '"detail"' is not assignable to parameter of type '"id" | "name" | "video"'. */}
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                    {loading && <p className="text-sm text-red-500 mt-1">กำลังทำรายการ !!</p>}

                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" variant="outline" onClick={closeModal} disabled={loading} >
                            ยกเลิก
                        </Button>
                        <Button size="sm" type="submit" disabled={loading} >
                            บันทึก
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default VideoAdd
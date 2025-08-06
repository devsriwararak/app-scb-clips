'use client'
import React from 'react'
import Label from '@/components/form/Label'
import Input from '@/components/form/input/InputField'
import { Modal } from '@/components/ui/modal'
import Button from '@/components/ui/button/Button'
import { Controller, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'


interface Props {
    isOpen: boolean
    closeModal: () => void
    onSubmit: (data: { name: string }) => void
    defaultValues?: { id: number; name: string, answer: string };
    error: string
}

interface SelectType {
    value: string
    label: string
}

const QuestionAdd = ({ isOpen, closeModal, onSubmit, defaultValues, error }: Props) => {

    const { register, handleSubmit, reset, control } = useForm({ defaultValues })

    const options = [
        { value: "YES", label: "Yes" },
        { value: "NO", label: "No" },
    ];

    React.useEffect(() => {
        if (isOpen) {
            if (defaultValues) {
                reset(defaultValues || { name: "" })
            } else {
                reset({ name: "" })
            }
        }
    }, [isOpen, defaultValues, reset])



    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4 z-10">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        เพิ่มข้อมูลคำถามระหว่างคลิป
                    </h4>
                </div>

                <form className="flex flex-col mt-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className=" px-2 pb-3">
                        <div>
                            <Label>คำถาม</Label>
                            <Input
                                {...register("name", { required: true })}
                                type="text"
                                placeholder='กรอกคำถาม'
                            />
                        </div>
                        <div className='mt-6 w-1/3'>
                            <Label>เลือกคำตอบ</Label>
                            <div className="relative">
                                <Controller
                                    name="answer"
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

                        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

                    </div>

                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" variant="outline" onClick={closeModal} >
                            ยกเลิก
                        </Button>
                        <Button size="sm" type="submit" >
                            บันทึก
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default QuestionAdd
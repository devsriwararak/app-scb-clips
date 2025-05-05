'use client'

import React, { useEffect } from 'react'
import Input from '@/components/form/input/InputField'
import { Modal } from '@/components/ui/modal'
import Button from '@/components/ui/button/Button'
import { useForm, useFieldArray } from 'react-hook-form'
import Switch from '../form/switch/Switch'

interface QuestionItem {
    question: string
    status: number
}

interface FormValues {
    name: string
    questions: QuestionItem[]
}

interface Props {
    isOpen: boolean
    closeModal: () => void
    onSubmit: (data: FormValues) => void
    defaultValues?: { 
        id: number; 
        name: string
        questions: QuestionItem[]
     }
    error: string
}

const QuestionEndAdd = ({ isOpen, closeModal, onSubmit, defaultValues, error }: Props) => {

    const { register, control, handleSubmit, reset, setValue, watch } = useForm<FormValues>({
        defaultValues: {
            name: '',
            questions: [{ question: '', status: 0 }],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'questions',
        
    })

    useEffect(() => {
        if (isOpen) {
            if (defaultValues) {
                reset({
                    name: defaultValues.name,
                    questions: Array.isArray(defaultValues.questions) && defaultValues.questions.length
                    ? defaultValues.questions
                    : [{question:'', status : 0}]
                })
            } else {
                reset({
                    name: '',
                    questions: [{ question: '', status : 0 }],
                })
            }
        }
    }, [isOpen, defaultValues, reset])

    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4 z-10">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        เพิ่มข้อคำถามท้ายคลิป
                    </h4>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4 bg-white rounded-xl shadow">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">หัวข้อ คำถาม</label>
                        <Input {...register('name', { required: true })} placeholder="กรอกหัวข้อ" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">รายการคำตอบ</label>
                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-center gap-4">
                                    <div className='w-9/12'>
                                        <Input
                                            {...register(`questions.${index}.question`, { required: true })}
                                            placeholder={`คำถามที่ ${index + 1}`}
                                            className=" "
                                        />
                                    </div>

                                    <div className='w-1/12'>
                                        <Switch
                                            label=""
                                            defaultChecked={watch(`questions.${index}.status`) === 1}
                                            onChange={(checked) =>
                                                setValue(`questions.${index}.status`, checked ? 1 : 0)
                                            }
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="px-2 py-1 text-sm text-white bg-red-500 rounded w-2/12"
                                    >
                                        ลบ
                                    </button>
                                </div>
                            ))}
                        </div>
                        <Button type="button" onClick={() => append({ question: '', status: 0 })} className="mt-6">
                            + เพิ่มคำถาม
                        </Button>
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <div className="text-right">
                        <Button type="submit">บันทึก</Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default QuestionEndAdd
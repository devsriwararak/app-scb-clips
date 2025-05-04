'use client'
// import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from '@/app/components/safe-material'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
    open: boolean
    onClose: () => void
    onSubmit: (data: { name: string }) => void
    defaultValues?: { name: string }
    isEdit?: boolean
    loading?: boolean
    error?: string
}

const CustomerAdd = ({ open, onClose, defaultValues, onSubmit, isEdit = false, loading = false, error }: Props) => {

    const { register, handleSubmit, reset } = useForm({ defaultValues })

    console.log(onClose);
    console.log(onSubmit);
    console.log(loading);
    console.log(error);

    console.log(register);
    console.log(handleSubmit);
    
    

    React.useEffect(() => {
        if (open) {
            if (isEdit) {
                reset(defaultValues || { name: "" })
            } else {
                reset({ name: "" })
            }
        }
    }, [open, isEdit, defaultValues, reset])

    return (
        <div>
            test Dialog
        </div>
        // <Dialog open={open} handler={onClose} size="xs" >
        //     <DialogHeader>
        //         <Typography variant="h4">{isEdit ? "แก้ไขบริษัท" : "เพิ่มบริษัท"}</Typography>
        //     </DialogHeader>
        //     <form onSubmit={handleSubmit(onSubmit)}>
        //         <DialogBody className="flex flex-col gap-4 z-[0]">
        //             <Input label="ชื่อบริษัท" {...register("name", { required: true })} />
        //             {error && (<Typography color='red' className='text-red-600'>{error}</Typography>)}
        //         </DialogBody>
        //         <DialogFooter className='flex gap-2'>
        //             <Button variant="filled" className='bg-gray-400 dark:bg-gray-700' onClick={onClose}>ยกเลิก</Button>
        //             <Button type="submit" color="blue" loading={loading}>
        //                 {isEdit ? "อัปเดต" : "บันทึก"}
        //             </Button>
        //         </DialogFooter>
        //     </form>
        // </Dialog>
    )
}

export default CustomerAdd
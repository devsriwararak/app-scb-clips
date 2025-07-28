'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { MemberDataType } from '@/app/admin/member/page'
import moment from 'moment'
import 'moment/locale/th'
import api from '@/app/lib/axiosInstance'
moment.locale('th')


interface Props {
    isOpen: boolean
    closeModal: () => void
    defaultValues?: MemberDataType;


}

const MemberViewImage = ({ isOpen, closeModal, defaultValues }: Props) => {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)

    // const fetchData = async () => {
    //     try {
    //         const res = await api.post('/api/member/image', {
    //             fileName: defaultValues?.image
    //         }, {
    //             responseType :"blob"
    //         }

    //     )
    //     const localUrl = URL.createObjectURL(res.data);

    //         console.log(localUrl);
    //         setImage(localUrl)

    //     } catch (error) {
    //         console.log(error);

    //     }
    // }

    const fetchData = useCallback(async () => {
        if (!defaultValues?.image) {
            return null;
        }
        try {
            const res = await api.post('/api/member/image',
                { fileName: defaultValues?.image },
                { responseType: "blob" }
            )
            return URL.createObjectURL(res.data);

        } catch (error) {
            console.log(error);
            return null

        }
    }, [defaultValues?.image])

    useEffect(() => {
        let objectUrl: string | null = null;
        setLoading(false)
        const loadAndSetImage = async () => {
            objectUrl = await fetchData();
            setLoading(true)
            setImage(objectUrl);
        };

        loadAndSetImage();

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [fetchData]);


    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[800px] m-4 z-10">
            <div className=" relative w-full max-w-[800px]  rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8 overflow-y-auto max-h-[85vh]">
                {image  ? (
                    <img src={image!} alt="xxx" className="w-full h-auto" />
                ) : (
                   <>
                    <h3 className='text-center text-xl'>
                         {!loading ? "กำลังโหลด ...." : "ไม่มีรูปภาพ"}
                    </h3>
                   </>
                )}
            </div>
        </Modal>
    )
}

export default MemberViewImage


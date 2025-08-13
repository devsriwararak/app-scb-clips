'use client'
import CheckIdCard from '@/components/modals/CheckIdCard'
import { useModal } from '@/hooks/useModal';
import React, { useEffect } from 'react'

const PageMemberQuestion = () => {

    // Systems
    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        openModal()
    }, [openModal])

    return (
        <>
            {isOpen && (
                <CheckIdCard
                    isOpen={isOpen}
                    closeModal={closeModal}
                    type={'onsite'}
                />
            )}
        </>
    )
}

export default PageMemberQuestion
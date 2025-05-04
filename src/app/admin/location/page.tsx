'use client'


import api from '@/app/lib/axiosInstance'
import { confirmDelete } from '@/app/lib/tools'
import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import Input from '@/components/form/input/InputField'
import Companyadd from '@/components/modals/Companyadd'
import LocationAdd from '@/components/modals/LocationAdd'
import CompanyTable from '@/components/tables/CompanyTable'
import LocationTable from '@/components/tables/LocationTable'
import Pagination from '@/components/tables/Pagination'
import Button from '@/components/ui/button/Button'
import { useModal } from '@/hooks/useModal'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export interface CompanyType {
    id: number
    name: string
}
type Company = { id: number; name: string }

const PageLocation = () => {

    // Systems
    const { isOpen, openModal, closeModal } = useModal();

    // States
    const [data, setData] = useState<CompanyType[]>([])
    const [selected, setSelected] = useState<Company | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // Search
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)


    const fetchData = async () => {
        try {
            const res = await api.get(`/api/location/all`, {
                params: { page, search }
            })
            if (res.status === 200) {
                console.log(res.data);

                setData(res.data.data)
                setTotalPages(res.data.pagination.totalPage)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [search, page])

    const handleAdd = async (type: string, item?: CompanyType) => {
        setError("")
        if (type === "create") {
            setSelected(null);
        } else if (type === "edit" && item) {
            setSelected(item)
        }
        openModal()
    }

    const handleSave = async (data: { name: string }) => {
        try {
            console.log({ data });

            setLoading(true)
            let res = null
            if (selected) {
                res = await api.put(`/api/location/${selected.id}`, data)

            } else {
                res = await api.post(`/api/location/add`, data)
            }
            if (res?.status === 200 || res?.status === 201) {
                toast.success("ทำรายการสำเร็จ")
                closeModal()
                setSelected(null)
                await fetchData()
            }
        } catch (error) {
            setLoading(false)

            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message)
                setError(error.response.data.message)
            } else {
                toast.error("เกิดข้อผิดพลาดบางอย่าง")
                console.error("Unexpected error:", error)
            }

        } finally {
            setLoading(false)

        }
    }



    const handleDelete = async (id: number) => {
        confirmDelete(async () => {
            try {
                await api.delete(`/api/location/${id}`)
                await fetchData()
            } catch (error) {
                console.log(error);

            }
        })
    }

    return (
        <div className="">

            {/* Dialogs */}
            {isOpen && (
                <LocationAdd
                    isOpen={isOpen}
                    closeModal={closeModal}
                    onSubmit={handleSave}
                    defaultValues={selected || undefined}
                    error={error}
                />
            )}

            <div>
                <PageBreadcrumb pageTitle="จัดการข้อมูลสถานที่อบรม" />
                <div className="space-y-6">
                    <ComponentCard title="">

                        <div className='flex justify-between items-center gap-4'>
                            <div className='w-2/3'>
                                <Input
                                    placeholder='ค้นหา'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && setSearch(search)}
                                />
                            </div>
                            <div className='w-1/3 flex justify-end'>
                                <Button size="sm" onClick={() => handleAdd('create')}>เพิ่มข้อมูล</Button>
                            </div>
                        </div>

                        <LocationTable
                            data={data}
                            loading={loading}
                            handleDelete={handleDelete}
                            handleAdd={handleAdd}
                            currentPage={page}
                        />

                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />

                    </ComponentCard>
                </div>
            </div>
        </div>
    )
}

export default PageLocation
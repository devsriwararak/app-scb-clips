'use client'

import api from '@/app/lib/axiosInstance'
import { confirmDelete } from '@/app/lib/tools'
import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import Input from '@/components/form/input/InputField'
import MemberAdd from '@/components/modals/MemberAdd'
import MemberTable from '@/components/tables/MemberTable'
import Pagination from '@/components/tables/Pagination'
import Button from '@/components/ui/button/Button'
import { useModal } from '@/hooks/useModal'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ReactSelect from 'react-select'
import MemberView from '@/components/modals/MemberView'
import MemberViewImage from '@/components/modals/MemberViewImage'


export interface MemberDataType {
    id: number
    titleName: string
    fname: string
    lname: string
    idCard: string
    idCardType: number
    phone: string
    email: string
    image: FileList | string;
    companyId: number
    locationId: number
    lecturerId: number
    createdAt: string
    dateOfTraining: string
    dateEndCertificate: string
    location: { name: string }
    company: { name: string }
    lecturer: { name: string }
    verify: number
    imageUrl :string
    

}

interface SelectType {
    value: string
    label: string
}

const PageMemberAdmin = () => {

    // Systems
    const { isOpen, openModal, closeModal } = useModal();

    // States
    const [data, setData] = useState<MemberDataType[]>([])
    const [selected, setSelected] = useState<MemberDataType | null>(null)
    const [loading] = useState(false)
    const [error, setError] = useState("")
    const [modalType, setModalType] = useState<string | null>(null)


    // Search
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalItems, setTotalItem] = useState(0)
    const [companyData, setCompanyData] = useState<SelectType[]>([])
    const [filterData, setFilterData] = useState<SelectType[]>([])
    const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
    const [selectedFilter, setSelectedFilter] = useState<string>("desc")


    const fetchData = useCallback(async () => {
        try {
            const res = await api.get(`/api/member/all`, {
                params: { page, search, companyId: selectedCompany, filter: selectedFilter }
            })
            if (res.status === 200) {
                console.log(res.data);

                setData(res.data.data)
                setTotalPages(res.data.pagination.totalPage)
                setTotalItem(res.data.pagination.totalItems)
            }
        } catch (error) {
            console.log(error);
        }
    },[search, page, selectedCompany, selectedFilter])

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
    const fetchDataFilter = async () => {
        setFilterData([
            { value: "desc", label: "ใหม่-เก่า" },
            { value: "asc", label: "เก่า-ใหม่" },

        ])
    }

    useEffect(() => {
        fetchData()
        fetchDataCompany()
        fetchDataFilter()
    }, [search, page, selectedCompany, selectedFilter, fetchData])


    const handleAdd = async (type: string, item?: MemberDataType) => {
        setError("")
        setModalType(type)

        if (type === "create") {
            setSelected(null);
        } else if (type === "edit" && item) {
            setSelected(item)
        } else if (type === "view" && item) {
            setSelected(item)
        } else if (type === "image" && item) {
            setSelected(item)
        }

        openModal()
    }

    const handleDelete = async (id: number) => {
        confirmDelete(async () => {
            try {
                const res = await api.delete(`/api/member/${id}`)

                if (res.status === 200) {
                    toast.success('ทำรายการสำเร็จ')
                    await fetchData()
                }

            } catch (error) {
                console.log(error);

            }
        })
    }

    const handleAdd2Year = async (id: number) => {
        confirmDelete(async () => {
            try {
                const res = await api.post(`/api/member/certificate/end`, { id })

                if (res.status === 200) {
                    toast.success('ทำรายการสำเร็จ')
                    await fetchData()
                }

            } catch (error) {
                console.log(error);

            }
        })
    }

    const handleSwitchChange = async (checked: boolean, id: number) => {
        const newChecked = checked === true ? 1 : 0
        console.log("Switch is now:", newChecked);
        try {
            //updateVerify
            const res = await api.post(`/api/member/updateVerify`, { id: id, checked: newChecked })
            if (res.status === 201) {
                toast.success('ทำรายการสำเร็จ')
                await fetchData()
            }

        } catch (error) {
            console.log(error);

        }
    };

    return (
        <div className="">

            {/* Dialogs */}
            {isOpen && (modalType === "create" || modalType === "edit") && (
                <MemberAdd
                    isOpen={isOpen}
                    closeModal={closeModal}
                    defaultValues={selected || undefined}
                    type="admin"
                    error={error}
                    fetchData={fetchData}
                />
            )}

            {isOpen && modalType === "view" && (
                <MemberView
                    isOpen={isOpen}
                    closeModal={closeModal}
                    defaultValues={selected || undefined}
                />
            )}

            {isOpen && modalType === "image" && (
                <MemberViewImage
                    isOpen={isOpen}
                    closeModal={closeModal}
                    defaultValues={selected || undefined}
                />
            )}

            <div>
                <PageBreadcrumb pageTitle="จัดการข้อมูลสมาชิก" />
                <div className="space-y-6 overflow-x-scroll ">
                    <ComponentCard title="" className='w-full'>
                        <div className='flex flex-col md:flex-row  justify-between items-center gap-4 '>
                            <div className='w-full md:w-2/3 flex flex-col md:flex-row gap-4  items-center'>
                                <div className='w-full md:w-1/2 '>
                                    <Input
                                        placeholder='ค้นหา ชื่อ นามสกุล / เลขบัตรประชาชน'
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && setSearch(search)}
                                    />
                                </div>
                                {companyData.length > 0 && (
                                    <ReactSelect<SelectType>
                                        options={companyData}
                                        placeholder="เลือกบริษัท"
                                        isClearable={true}
                                        className='w-full md:w-1/2'
                                        onChange={(option) => {
                                            setSelectedCompany(option?.value || null)
                                            setPage(1)
                                        }}
                                    />
                                )}
                                {filterData.length > 0 && (
                                    <ReactSelect<SelectType>
                                        options={filterData}
                                        placeholder="ใหม่-เก่า"
                                        isClearable={true}
                                        className='w-full  md:w-1/2'
                                        onChange={(option) => {
                                            setSelectedFilter(option?.value || "desc")
                                            setPage(1)
                                        }}
                                    />
                                )}
                            </div>
                            <div className='w-full md:w-1/3 flex justify-end gap-4 items-center'>
                                <Button size="sm" onClick={() => handleAdd('create')} className='w-full md:w-fit'>เพิ่มข้อมูล</Button>
                            </div>
                        </div>

                            <div className=' overflow-x-auto w-full'>
                                <MemberTable
                                    data={data}
                                    loading={loading}
                                    handleDelete={handleDelete}
                                    handleAdd={handleAdd}
                                    currentPage={page}
                                    setSelected={setSelected}
                                    handleAdd2Year={handleAdd2Year}
                                    handleSwitchChange={handleSwitchChange}

                                />
                            </div>

                        <div className='flex flex-col md:flex-row gap-4 justify-between items-center'>
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                            <p className='text-gray-500'>ทั้งหมด {totalItems} รายการ </p>
                        </div>

                    </ComponentCard>
                </div>
            </div>
        </div>
    )
}

export default PageMemberAdmin


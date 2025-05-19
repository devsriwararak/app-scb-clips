'use client'

import api from '@/app/lib/axiosInstance'
import { confirmDelete } from '@/app/lib/tools'
import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import Input from '@/components/form/input/InputField'
import Pagination from '@/components/tables/Pagination'
import { useModal } from '@/hooks/useModal'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ReactSelect from 'react-select'
import MemberView from '@/components/modals/MemberView'
import ChangeCompanyTable from '@/components/tables/reports/ChangeCompanyTable'


export interface MemberDataType {
    id: number;
    company: { name: string };
    createdAt: string;
    memberId: number;
    oldCompanyId: number;
    newCompany : string
    member: {
        id: number;
        titleName: string;
        fname: string;
        lname: string;
        idCard: string;
        phone: string;
        email :string
        companyId: number;
        locationId: number;
        lecturerId: number;
        createdAt: string;
        dateOfTraining: string;
        dateEndCertificate: string;
        location: { name: string };
        lecturer: { name: string };
        company: { name: string };
    };

}

export interface MemberDataForViewType {
    id: number
    titleName: string
    fname: string
    lname: string
    idCard: string
    phone: string
    email :string
    companyId: number
    locationId: number
    lecturerId: number
    createdAt: string
    dateOfTraining: string
    dateEndCertificate: string
    location: { name: string }
    company: { name: string }
    lecturer: { name: string }

}

interface SelectType {
    value: string
    label: string
}

const PageChangeCompany = () => {

    // Systems
    const { isOpen, openModal, closeModal } = useModal();

    // States
    const [data, setData] = useState<MemberDataType[]>([])
    const [selected, setSelected] = useState<MemberDataForViewType | null>(null)
    const [loading] = useState(false)
    const [modalType, setModalType] = useState<string | null>(null)


    // Search
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [companyData, setCompanyData] = useState<SelectType[]>([])
    const [selectedCompany, setSelectedCompany] = useState<string | null>(null)


    const fetchData = async () => {
        try {

            const res = await api.get(`/api/report/changeCompany/all`, {
                params: { page, search, companyId: selectedCompany }
            })
            if (res.status === 200) {
                setData(res.data.data)
                setTotalPages(res.data.pagination.totalPage)
            }
        } catch (error) {
            console.log(error);
        }
    }

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

    useEffect(() => {
        fetchData()
        fetchDataCompany()
    }, [search, page, selectedCompany])


    const handleAdd = async (type: string, item?: MemberDataType) => {
        setModalType(type)

        if (type === "create") {
            setSelected(null);
        } else if (type === "view" && item) {
            setSelected(item.member)
        }
        openModal()
    }

    const handleDelete = async (id: number) => {
        confirmDelete(async () => {
            try {
                const res = await api.delete(`/api/report/changeCompany/${id}`)

                if (res.status === 200) {
                    toast.success('ทำรายการสำเร็จ')
                    await fetchData()
                }

            } catch (error) {
                console.log(error);

            }
        })
    }

    return (
        <div className="">

            {/* Dialogs */}


            {isOpen && modalType === "view" && (
                <MemberView
                    isOpen={isOpen}
                    closeModal={closeModal}
                    defaultValues={selected || undefined}
                />
            )}

            <div>
                <PageBreadcrumb pageTitle="ประวัติการเปลี่ยนบริษัท" />
                <div className="space-y-6">
                    <ComponentCard title="">

                        <div className='flex justify-between items-center gap-4'>
                            <div className='w-2/3 flex gap-4  items-center'>
                                <div className='w-1/2 '>
                                    <Input
                                        placeholder='ค้นหา ชื่อ นามสกุล '
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
                                        className='w-1/2'
                                        onChange={(option) => {
                                            setSelectedCompany(option?.value || null)
                                            setPage(1)
                                        }}
                                    />
                                )}

                            </div>

                        </div>

                        <ChangeCompanyTable
                            data={data}
                            loading={loading}
                            handleDelete={handleDelete}
                            handleAdd={handleAdd}
                            currentPage={page}
                            setSelected={setSelected}

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

export default PageChangeCompany



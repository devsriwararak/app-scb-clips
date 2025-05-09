'use client'
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";


import {  MoreDotIcon, PencilIcon, TrashBinIcon } from "@/icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { pageSizeForIndexTable } from "@/app/lib/tools";



interface Company {
    id: number;
    name: string;
}

interface CompanyTableProps {
    data: Company[];
    loading: boolean;
    handleDelete: (id: number) => void
    handleAdd : (type: "create" | "edit", item? : Company) => void
    currentPage : number


}

export default function QuestionTable({ data, loading, handleDelete ,handleAdd, currentPage}: CompanyTableProps) {

    // States
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);


    function toggleDropdown(id: number) {
        setOpenDropdownId((prev) => (prev === id ? null : id))
    }

    function closeDropdown() {
        setOpenDropdownId(null);
    }

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className=" rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-visible">
                <div className="w-full">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    ลำดับ
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    ชื่อ
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                                >
                                    Auctions
                                </TableCell>

                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {data.map((order, index) => (
                                <TableRow key={order.id}>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {(currentPage - 1) * pageSizeForIndexTable + index + 1}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {order.name}
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                        <div className="relative inline-block ">
                                            <button onClick={() => toggleDropdown(order.id)} className="dropdown-toggle">
                                                <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                                            </button>
                                            <Dropdown
                                                isOpen={openDropdownId === order.id}
                                                onClose={closeDropdown}
                                                // className="w-40 p-2"
                                                className="w-40 p-2 absolute top-full right-0 z-[999] bg-white shadow-lg rounded-md"

                                            >
                                                <DropdownItem
                                                    onItemClick={()=>handleAdd('edit', order)}
                                                    className="flex gap-2 items-center w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                                                >
                                                    <PencilIcon />   แก้ไข
                                                </DropdownItem>
                                                <DropdownItem
                                                    onItemClick={() => {closeDropdown(); handleDelete(order.id)}}
                                                    className="flex gap-2 items-center w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                                                >
                                                    <TrashBinIcon />   ลบ
                                                </DropdownItem>
                                            </Dropdown>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

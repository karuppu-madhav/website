import React, { useEffect, useState } from 'react'
import { Input, Segmented, Typography } from 'antd'
import Order from '../../components/Order'
import { useAdminStore } from '../../store/adminStore'
const { Title } = Typography

export default function ManageOrder() {
    const [search, setSearch] = useState('')
    const { orders } = useAdminStore()
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        if (!search?.trim())
            setFiltered(orders)
        else
            setFiltered(orders?.filter((order) => {
                return order?.customerData?.fullName?.toLowerCase()?.startsWith(search?.toLowerCase()) ||
                order?.customerData?.phone?.toLowerCase()?.startsWith(search?.toLowerCase())||
                order?.customerData?.email?.toLowerCase()?.startsWith(search?.toLowerCase())
            }))
    }, [search])

    return (
        <div className="p-6 min-h-screen bg-white shadow rounded">
            <Title level={4} >Manage Category</Title>
            <div className='flex justify-end items-center gap-2 ' >
                <p className='flex-shrink-0' >Search : </p>
                <Input className='!w-[200px]' size='middle' placeholder='Search here...' value={search} onChange={(e) => {
                    setSearch(e.target.value)
                }} />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-6 gap-4' >
                {
                    filtered?.length == 0 ?
                        <div className='col-span-1 md:col-span-2 lg:col-span-3 py-8 ' >
                            <p className='text-center text-black/75' >No order found.</p>
                        </div>
                        :
                        <>
                            {
                                filtered?.map((order, index) => {
                                    return (
                                        <Order isAdmin={true} data={order} key={index} />
                                    )
                                })
                            }
                        </>
                }
            </div>
        </div>
    )
}

import { Badge, Button, Drawer, Modal, Popconfirm, Select } from 'antd'
import React, { useState } from 'react'
import { useActions } from '../actions/admin'
import { MdDelete, MdEdit, MdLocalPhone, MdOutlineAccessTime, MdOutlineShoppingCart, MdOutlineWhatsapp } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdPayments } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

export default function Order({ data, isAdmin }) {

    const [openDrawer, setOpenDrawer] = useState(false)
    const [openEditStatus, setOpenEditStatus] = useState(false);
    const { updateOrderStatus, deleteOrder } = useActions()

    // Edit
    const [values, setValues] = useState({ paymentStatus: '', orderStatus: '' })

    const OrderStatus = ['Waiting for Payment', 'Order Processing', 'Out for Delivery']
    const PaymentStatus = ['Not Paid', 'Paid']

    async function updateStatus() {
        if (values?.orderStatus != data?.orderStatus || values?.paymentStatus != data?.paymentStatus) {
            const res = await updateOrderStatus(data?.id, values)
        }
        setValues({ paymentStatus: '', orderStatus: '' })
        setOpenEditStatus(false)
    }

    const message = `Hello ${data?.customerData?.fullName}\n\nTrack Your order here\nhttps://madhavcrackers.com/track-order?id=${data?.orderID}\n\nThank you for choosing us`;
    return (
        <div className='p-3 rounded-xl border bg-indigo-50 border-indigo-600 relative' >
            <div className='flex justify-between items-center my-3' >
                <div>
                    <p className='text-md font-semibold' >Order ID</p>
                    <p className='font-bold text-indigo-800' >{data?.orderID}</p>
                </div>
                <div className='me-4 cursor-pointer' onClick={() => {
                    setOpenDrawer(true)
                }}>
                    <Badge count={data?.cart?.totalQuantity} >
                        <div className='w-12 h-12 flex justify-center items-center bg-blue-200  rounded-xl ' >
                            <MdOutlineShoppingCart className='text-xl text-indigo-800' />
                        </div>
                    </Badge>
                </div>
            </div>
            <div className='my-2' >
                <p className='font-semibold text-indigo-800' >{data?.customerData?.fullName}</p>
                <p className='text-[12px] font-semibold' >{data?.customerData?.address},{data?.customerData?.city},{data?.customerData?.state}-{data?.customerData?.pincode}.</p>
                {
                    isAdmin && (
                        <>
                            <div className='flex items-center gap-2 my-1 ' >
                                <MdOutlineMailOutline className='text-indigo-800' />
                                <a className='text-xs text-black font-semibold' href={`mailto:${data?.customerData?.email}`} target='_blank' >{data?.customerData?.email}</a>
                            </div>
                            <div className='flex items-center gap-4' >
                                <div className='flex items-center gap-2 my-1 ' >
                                    <MdLocalPhone className='text-indigo-800' />
                                    <a className='text-xs text-black font-semibold' href={`tel:${data?.customerData?.phone}`} target='_blank' >{data?.customerData?.phone}</a>
                                </div>
                                <div className='flex items-center gap-2 my-1 ' >
                                    <MdOutlineWhatsapp className='text-indigo-800' />
                                    <a className='text-xs text-black font-semibold' href={`https://wa.me/${data?.customerData?.phone}?text=${encodeURIComponent(message)}`} target='_blank' >{data?.customerData?.phone}</a>
                                </div>
                            </div>
                        </>
                    )
                }
                <div className='flex items-center gap-4 mt-1' >
                    <div className='flex items-center gap-2 my-1 ' >
                        <TbTruckDelivery className='text-indigo-800' />
                        <p className='text-xs text-black font-semibold'>{data?.orderStatus}</p>
                    </div>
                    <div className='flex items-center gap-2 my-1 ' >
                        <MdPayments className='text-indigo-800' />
                        <p className='text-xs text-black font-semibold'>{data?.paymentStatus}</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 mt-1' >
                    <div className='flex items-center gap-2 my-1 ' >
                        <MdOutlineAccessTime className='text-indigo-800' />
                        <p className='text-xs text-black font-semibold'>{nowToReadableDate(data?.orderedAt)}</p>
                    </div>
                </div>
            </div>
            {
                isAdmin && (
                    <div className='absolute right-2 bottom-2 flex gap-2' >
                        <Button type='primary' icon={<MdEdit />} onClick={() => {
                            setValues({ paymentStatus: data?.paymentStatus, orderStatus: data?.orderStatus })
                            setOpenEditStatus(true)
                        }} ></Button>
                        <Popconfirm
                            title="Delete the order"
                            description="Are you sure to delete this order?"
                            onConfirm={() => {
                                deleteOrder(data?.id)
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type='primary' danger icon={<MdDelete />} ></Button>
                        </Popconfirm>
                    </div>
                )
            }
            <Drawer open={openDrawer} title={`#${data?.orderID}`} onClose={() => {
                setOpenDrawer(false)
            }} >
                <p className='font-bold text-xl' >Order Summary</p>
                <div className='flex flex-col gap-3 my-4' >
                    {
                        data?.cart?.products?.map((product, index) => {
                            return (
                                <div className='w-full py-2 px-3 border rounded-lg border-gray-200' key={index} >
                                    <div className='flex justify-between items-center' >
                                        <p className='font-semibold' >{product?.name}</p>
                                        <p className='px-3 py-1 text-xs font-bold rounded-xl bg-green-100' >{product?.type}</p>
                                    </div>
                                    <div>
                                        {product?.qty} x {product?.price} = <span className='text-md font-bold' >Rs. {product?.total}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='flex flex-col items-end gap-2' >
                    <p className='text-lg font-medium' >Sub Total : <span>Rs. {data?.cart?.subTotal}</span></p>
                    <p className='text-lg font-medium' >Packing : <span>Rs. {(data?.cart?.totalAmount) - (data?.cart?.subTotal)}</span></p>
                    <p className='text-lg font-bold' >Total : <span>Rs. {data?.cart?.totalAmount}</span></p>
                </div>
            </Drawer>
            <Modal title={`Edit ${data?.orderID}`} open={openEditStatus} okText={"Update"} onCancel={() => {
                setValues({ paymentStatus: '', orderStatus: '' })
                setOpenEditStatus(false)
            }} onOk={() => {
                updateStatus()
            }} >
                <div className='w-full my-3 ' >
                    <p className='text-sm font-semibold my-1' >Order Status</p>
                    <Select className='w-full' size='large' value={values?.orderStatus} options={OrderStatus?.map((option) => { return { label: option, value: option } })} onChange={(value) => {
                        setValues({ ...values, orderStatus: value })
                    }} />
                </div>
                <div className='w-full my-3 ' >
                    <p className='text-sm font-semibold my-1' >Payment Status</p>
                    <Select className='w-full' size='large' value={values?.paymentStatus} options={PaymentStatus?.map((option) => { return { label: option, value: option } })} onChange={(value) => {
                        setValues({ ...values, paymentStatus: value })
                    }} />
                </div>
            </Modal>
        </div>
    )
}

function nowToReadableDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}

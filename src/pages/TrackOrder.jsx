import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button, Input, message } from 'antd'
import { useUserActions } from '../actions/user'
import Order from '../components/Order'
import { Helmet } from 'react-helmet'
import { useSearchParams } from "react-router-dom";


export default function TrackOrder() {
    const [values, setValues] = useState({ phone: '', orderNumber: '' })
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false);
    const { getOrdersByPhoneOrOrderId } = useUserActions()

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id"); // ?id=123

    useEffect(() => {
        if (/[0-9]{4}-[0-9]{4}-[0-9]{6}/.test(id))
            fetchOrders(id, '')
    }, [id])

    async function fetchOrders(orderId = '', phone = '') {
        setLoading(true);
        const res = await getOrdersByPhoneOrOrderId(phone, orderId)
        console.log(res)
        setOrders(res);
        setLoading(false);
    }

    const handleTrack = () => {
        if (/[0-9]{4}-[0-9]{4}-[0-9]{6}/.test(values?.orderNumber) || /[6789]{1}[0-9]{9}/.test(values?.phone))
            fetchOrders(values?.orderNumber, values?.phone)
        else
            message.info("Please provide valid order number or phone number")
    }

    return (
        <>
            <Helmet>
                <title>Track Your Order | Madhav Crackers, Sivakasi</title>
                <meta
                    name="description"
                    content="Quickly track the status of your Madhav Crackers order online. Enter your order number and stay updated on delivery progress in Sivakasi."
                />
                <meta
                    name="keywords"
                    content="Madhav Crackers, Sivakasi, track order, order status, online order tracking, crackers delivery"
                />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Track Your Order | Madhav Crackers, Sivakasi" />
                <meta
                    property="og:description"
                    content="Check your Madhav Crackers order status instantly. Stay informed about delivery progress in Sivakasi."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://yourwebsite.com/track-order" />
            </Helmet>

            <Header />
            <div className='flex flex-col items-center py-16 bg-gradient-to-r from-blue-800 to-indigo-600' >
                <h1 className='text-3xl font-bold text-white' >Track Order</h1>
                <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-3 mt-6' >
                    <Input className='!w-fit' placeholder='Order Number' size='large' inputMode='numeric' maxLength={16} value={values?.orderNumber} onChange={(e) => {
                        let id = e.target.value?.trim()
                        if (!/[0-9-]+/.test(id) && id != '') return
                        setValues({ ...values, orderNumber: id })
                    }} />
                    <p className='text-xs text-white' >( or )</p>
                    <Input className='!w-fit' placeholder='Phone Number' size='large' inputMode='numeric' maxLength={10} value={values?.phone} onChange={(e) => {
                        let id = e.target.value?.trim()
                        if (!/[0-9]+/.test(id) && id != '') return
                        setValues({ ...values, phone: id })
                    }} />
                    <Button type='primary' color='yellow' onClick={handleTrack} disabled={loading} >Track</Button>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-6 gap-4 px-4 lg:px-12' >
                {
                    loading ?
                        <div className='col-span-1 md:col-span-2 lg:col-span-3 py-8 ' >
                            <p className='text-center text-black/75' >Fetching Orders...</p>
                        </div>
                        :
                        <>
                            {
                                orders?.length == 0 ?
                                    <div className='col-span-1 md:col-span-2 lg:col-span-3 py-8 ' >
                                        <p className='text-center text-black/75' >No order found.</p>
                                    </div>
                                    :
                                    <>
                                        {
                                            orders?.map((order, index) => {
                                                return (
                                                    <Order isAdmin={false} data={order} key={index} />
                                                )
                                            })
                                        }
                                    </>
                            }
                        </>
                }
            </div>
            <Footer />
        </>
    )
}

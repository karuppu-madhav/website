import React, { useEffect, useMemo, useState } from 'react'
import { Typography, Divider, Button } from 'antd'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { dummyData } from '../assets/commonData'
import _ from 'underscore'
import { HiFilter } from "react-icons/hi";
import { useCartStore } from '../store/cartStore'
import { useUserStore } from '../store/userStore'
import { useNavigate } from 'react-router'
import { GrLinkNext } from "react-icons/gr";
import { Helmet } from 'react-helmet'

export default function QuickPurchase() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState({})
    const { products } = useCartStore()
    const { settings, crackers } = useUserStore()

    const [filter, setFilter] = useState("")

    useEffect(() => {
        if (filter == "") {
            const newData = _.groupBy(crackers, 'category')
            setData(newData)
            setFilteredData(newData)
        }
        else {
            const filtered = crackers?.filter((data) => data?.category == filter)
            setFilteredData(_.groupBy(filtered, 'category'))
        }
    }, [filter])

    const total = useMemo(() => {
        var counts = 0, amount = 0;
        products?.map((prod) => {
            counts = counts + prod?.count
            amount = amount + prod?.total
        })
        return { counts, amount }
    }, [products])

    return (
        <div className='w-full h-screen flex flex-col select-none' >
            <Helmet>
                {/* Primary Meta Tags */}
                <title>Quick Purchase Crackers | Madhav Crackers Sivakasi Online</title>
                <meta
                    name="description"
                    content="Quickly buy Sivakasi fireworks online at Madhav Crackers. Fast checkout, safe delivery, wholesale prices, and eco-friendly crackers. Perfect for festivals and celebrations."
                />
                <meta
                    name="keywords"
                    content="Quick purchase crackers, Buy crackers online Sivakasi, Madhav Crackers quick order, Wholesale crackers Sivakasi, Online fireworks shop"
                />
                <meta name="author" content="Madhav Crackers" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.madhavcrackers.com/quick-purchase" />
                <meta
                    property="og:title"
                    content="Quick Purchase Crackers | Madhav Crackers Sivakasi"
                />
                <meta
                    property="og:description"
                    content="Order crackers in just a few clicks at Madhav Crackers. Sivakasi direct supply, wholesale rates, and quick doorstep delivery."
                />
            </Helmet>
            <Header />
            <div className='w-full h-[85%] grid grid-cols-12 gap-4' >
                <div className='hidden lg:block lg:col-span-3 h-full scrollable overflow-y-scroll px-3 pb-6' >
                    <div className='flex gap-2 items-center my-4' >
                        <HiFilter className='text-2xl text-blue-900' />
                        <p className='text-lg font-bold text-blue-900' >Filter by Category</p>
                    </div>
                    <div className='flex flex-col gap-2' >
                        {
                            data && Object.keys(data)?.map((key, index) => {
                                return (
                                    <div key={index} className={`flex items-center justify-between py-3 duration-500 ${filter == key ? "bg-indigo-100" : ''} hover:bg-blue-200 px-3 rounded-md select-none cursor-pointer`} onClick={() => {
                                        setFilter(key)
                                    }} >
                                        <p className='font-medium h-fit' >{key}</p>
                                        <p className='h-fit px-3 py-1  bg-blue-900 rounded-full text-center m-0 text-white' >{data[key]?.length}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='col-span-12 lg:col-span-9 h-full overflow-y-auto scrollable px-4 pt-4 relative' >
                    <Typography.Title level={4} >Quick Purchase</Typography.Title>
                    <p className='text-md text-black/70' >Enter the quantity of your required crackers and complete your booking.</p>
                    {
                        filter && (
                            <Button className='mt-4' type='primary' onClick={() => { setFilter('') }} >Show All Products</Button>
                        )
                    }
                    <Divider />
                    <div className='flex flex-col gap-3 mt-4' >
                        {
                            filteredData && Object.keys(filteredData)?.map((category, index) => {
                                return (
                                    <div key={index} >
                                        <div className='w-full flex items-center justify-center py-3 font-semibold bg-blue-100' >
                                            {category}
                                        </div>
                                        <div className='flex flex-col gap-2 my-2' >
                                            {
                                                filteredData[category]?.map((product, index) => {
                                                    return (
                                                        <ProductCard product={product} key={index} />
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w-full flex flex-col md:flex-row gap-3 justify-between bg-blue-50 sticky -bottom-4 right-0 py-7 px-4' >
                        <div className='flex flex-row md:flex-col gap-3' >
                            <p className='font-semibold text-md text-blue-800' >Total Quantity : <strong>{total?.counts}</strong></p>
                            <p className='font-semibold text-md text-blue-800' >Total Amount : <strong>Rs.{total?.amount}</strong> </p>
                        </div>
                        <div className='flex flex-col items-center gap-3' >
                            <p className='font-semibold text-sm' >Minimum order value Rs.{settings?.minimumAmount}</p>
                            <Button className='w-fit' type='primary' icon={<GrLinkNext />} disabled={total?.amount < settings?.minimumAmount} onClick={() => {
                                navigate('/cart')
                            }} >Proceed to Book</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

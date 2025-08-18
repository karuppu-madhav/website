import React, { useEffect, useMemo, useState } from 'react'
import { Button } from 'antd'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import _ from 'underscore'
import { useCartStore } from '../store/cartStore'
import { useUserStore } from '../store/userStore'
import {useNavigate} from 'react-router'
import BookingSummary from '../components/BookingSummary'

export default function Cart() {
    const navigate =useNavigate()
    const { products } = useCartStore()
    const { settings } = useUserStore()
    const [updatedProducts, setUpdatedProducts] = useState([]);

    useEffect(() => {
        setUpdatedProducts(products)
    }, [products])

    return (
        <div className='w-full h-screen flex flex-col select-none ' >
            <Header />
            <div className='p-4 lg:p-6 border-b border-gray-300' >
                <h1 className='text-2xl font-bold' >Manage Your Cart</h1>
                <p className='my-2 text-lg font-medium' >Minimum order value is Rs.{settings?.minimumAmount}</p>
            </div>
            <div className='w-full grid grid-cols-12 gap-6 px-4 lg:px-8 mt-3 pb-12' >
                <div className='col-span-12 md:col-span-7 lg:col-span-8' >
                    {
                        updatedProducts?.length == 0 ?
                            <div className='py-12 flex flex-col justify-center items-center' >
                                <p className='text-lg text-black/75' >Your cart is empty</p>
                                <Button className='my-3' type='primary' onClick={()=>{navigate('/quick-purchase')}} >Purchase Now</Button>
                            </div> :
                            <>
                                {
                                    updatedProducts?.map((product, index) => {
                                        return (
                                            <ProductCard product={product} isCart={true} key={index} />
                                        )
                                    })
                                }
                            </>
                    }
                </div>
                <div className='col-span-12  md:col-span-5 lg:col-span-4' >
                    <BookingSummary showButton={true} />
                </div>
            </div>
            <Footer/>
        </div>
    )
}

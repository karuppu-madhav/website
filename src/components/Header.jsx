import React, { useState, useMemo } from 'react'
import Logo from '../assets/madhav-logo.jpg'
import rocket from '../assets/rocket.gif'
import { Link } from 'react-router'
import { useCartStore } from '../store/cartStore'
import { PiShoppingCartDuotone } from "react-icons/pi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useNavigate } from 'react-router';
import { useLocation } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";
import { RiInstagramLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";

import PriceList from '../assets/madhav-crackers-price-list.pdf'

export default function Header() {
    const navigate = useNavigate()
    const location = useLocation();

    const [show, setShow] = useState(false);

    const { products } = useCartStore()

    const total = useMemo(() => {
        var counts = 0;
        products?.map((prod) => {
            counts = counts + prod?.count
        })
        return counts
    }, [products])

    return (
        <header className='w-full sticky top-0 h-[18%] bg-white z-5 border-b border-gray-300' >
            {location.pathname !== "/quick-purchase" && (
                <nav className="bg-blue-800 py-4 min-h-fit px-4 md:px-8 gap-5 flex flex-col lg:flex-row lg:justify-between items-center">
                    <div className='flex items-center gap-3' >
                        <div className='flex items-center gap-2' >
                            <FaPhone className='text-yellow-300' />
                            <a href="tel:+918438404886" className="!text-white font-semibold hover:text-yellow-300">
                                +91-8438404886
                            </a>
                        </div>
                        <a href="https://www.instagram.com/madhav_crackers/" className="!text-yellow-300">
                            <RiInstagramLine className='text-xl' />
                        </a>
                        <a href="https://wa.me/+918438404886" className="!text-yellow-300">
                            <FaWhatsapp className='text-xl' />
                        </a>
                    </div>
                    <a href={PriceList} className="!text-yellow-300" target='_blank' download>
                        <span className='h-fit text-blue-700 font-semibold rounded-md bg-yellow-300 py-2 px-3 text-sm' >Download Price List</span>
                    </a>
                </nav>
            )}
            <nav className='h-full items-center px-8 py-4 flex justify-between' >
                <div className='lg:ms-5 flex items-center gap-3 cursor-pointer relative' onClick={() => { navigate('/home') }} >
                    <img className='ms-8 w-[120px]' src={Logo} alt='madhav crackers sivakasi' />
                    {/* <p className='hidden lg:block text-2xl font-bold bg-gradient-to-r from-indigo-800 to-blue-900 bg-clip-text text-transparent ' >Madhav Crackers</p> */}
                    <img className='absolute -left-5 w-20 block' src={rocket} alt='best crackers shop in sivakasi' />
                    <img className='absolute left-28 w-20 block' src={rocket} alt='best crackers shop in sivakasi' />
                </div>
                <div className='flex items-center gap-4 lg:gap-6' >
                    <div className='hidden lg:flex items-center gap-4' >
                        <Link to={"/payment-info"} >
                            <p className='text-lg text-blue-800 duration-300 transition-all easy-in-out hover:text-blue-600 font-semibold' >Payment Info</p>
                        </Link>
                        <Link to={"/quick-purchase"} >
                            <p className='text-lg text-blue-800 duration-300 transition-all easy-in-out hover:text-blue-600 font-semibold' >Quick Purchase</p>
                        </Link>
                        <Link to={"/track-order"} >
                            <p className='text-lg text-blue-800 duration-300 transition-all easy-in-out hover:text-blue-600 font-semibold' >Track Order</p>
                        </Link>
                        <Link to={"/contact-us"} >
                            <p className='text-lg text-blue-800 duration-300 transition-all easy-in-out hover:text-blue-600 font-semibold' >Contact</p>
                        </Link>
                    </div>
                    <Link to={"/cart"} >
                        <div className='p-3 bg-blue-800 rounded-xl flex gap-2 items-center' >
                            <PiShoppingCartDuotone className='text-xl text-white' />
                            <p className='text-white' >{total || ''}</p>
                        </div>
                    </Link>
                    <HiOutlineMenuAlt3 className='block lg:hidden text-3xl text-blue-800 cursor-pointer' onClick={() => {
                        setShow(true)
                    }} />
                </div>
                <div className={`lg:hidden transition-all duration-500 easy-in-out ${show ? "block" : "hidden"} w-screen h-screen fixed top-0 left-0 bg-blue-900 px-8 py-10 select-none`} >
                    <div className='flex justify-end' >
                        <p className='text-white text-xl font-semibold cursor-pointer' onClick={() => { setShow(false) }} >Close</p>
                    </div>
                    <div className='lg:hidden flex flex-col mt-12 items-center gap-6' >
                        <Link to={"/payment-info"} >
                            <p className='text-2xl text-white duration-300 transition-all easy-in-out hover:text-blue-600 font-semibold' onClick={() => { setShow(false) }} >Payment Info</p>
                        </Link>
                        <Link to={"/quick-purchase"} >
                            <p className='text-2xl text-white duration-300 transition-all easy-in-out hover:text-blue-600 font-semibold' onClick={() => { setShow(false) }} >Quick Purchase</p>
                        </Link>
                        <Link to={"/track-order"} >
                            <p className='text-2xl text-white duration-300 transition-all easy-in-out hover:text-blue-600 font-semibold' onClick={() => { setShow(false) }} >Track Order</p>
                        </Link>
                        <Link to={"/contact-us"} >
                            <p className='text-2xl text-white duration-300 transition-all easy-in-out hover:text-blue-600 font-semibold' onClick={() => { setShow(false) }} >Contact</p>
                        </Link>
                        <img className='w-[150px] mt-12 rounded-xl' src={Logo} alt='madhav crackers sivakasi' />
                        <h4 className='text-xl text-white font-semibold' >Madhav Crackers &copy;</h4>
                    </div>
                </div>
            </nav>
        </header>
    )
}

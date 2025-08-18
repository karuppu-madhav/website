import React,{useMemo} from 'react'
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';
import { Button, Divider } from 'antd';
import { useNavigate } from 'react-router';

export default function BookingSummary({showButton}) {
    const navigate=useNavigate()
    const {products}=useCartStore()
    const{settings}=useUserStore()
    const total = useMemo(() => {
        var counts = 0, amount = 0;
        products?.map((prod) => {
            counts = counts + prod?.count
            amount = amount + prod?.total
        })
        return { counts, amount }
    }, [products])
    return (
        <div className='p-4 rounded-xl bg-yellow-50' >
            <h1 className='text-xl font-semibold' >Notes</h1>
            <p className='text-sm my-2 leading-6 text-justify' >Currently delivering to Andhra Pradesh, Karnataka, Kerala, Puducherry, Tamil Nadu</p>
            <p className='text-sm my-2 leading-6 text-justify'>Once booking is placed, please done the payment and sent the screenshot to our whatsapp number to dispatch your order further.</p>
            <Divider/>
            <h1 className='text-xl font-semibold' >Booking Summary</h1>
            <p className='font-bold my-2 ' >Sub Total : <span className='font-semibold' >Rs. {total?.amount}</span></p>
            <p className='font-bold my-2 ' >Secured Packing Charges (Plastic Sack):<span className='font-semibold' >Rs. {settings?.courierCharge}</span></p>
            <p className='font-bold my-2 ' >Amount Payable : <span className='font-semibold' >Rs. {(total?.amount+settings?.courierCharge)}</span></p>
            <p className='font-bold my-2 ' >Transport Charges : <span className='font-semibold' >To be paid directly to transport agency.</span></p>
            {
                showButton&&(
                    <Button className='w-full' type='primary' size='large' 
                        disabled={total?.amount<settings?.minimumAmount}
                        onClick={()=>{
                            navigate('/checkout')
                        }}
                    >Proceed to Book</Button>
                )
            }
        </div>
    )
}

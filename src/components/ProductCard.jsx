import React, { useEffect, useMemo, useState } from 'react'
import { Button, Image, Input, InputNumber } from 'antd'
import Logo from '../assets/madhav-logo.jpg'
import { useUserStore } from '../store/userStore/index'
import { useCartStore } from '../store/cartStore'
import { AiOutlineDelete } from "react-icons/ai";
import { TiMinus, TiPlus } from "react-icons/ti";

export default function ProductCard({ product,isCart=false }) {
    const { products, setProducts } = useCartStore()
    const { settings } = useUserStore()

    const [cracker, setCracker] = useState({ ...product, count: 0, total: 0 })

    // Set initial cracker from cart products
    useEffect(() => {
        const matched = products?.find(p => p?.id === product?.id);
        if (matched) {
            setCracker({ ...matched });
        }
    }, [product]);

    const discountedPrice = useMemo(() => {
        return Math.round(product?.price - (product?.price * settings?.discount) / 100);
    }, [product, settings]);

    const updateCracker = (newCount) => {
        const count = Math.max(0, Math.min(250, newCount)); // keep within 0-250
        const updated = {
            ...cracker,
            count,
            total: count * discountedPrice,
        };
        setCracker(updated);

        const index = products.findIndex((prod) => prod?.id == product?.id);

        // Update global cart state
        const updatedProducts = products?.filter(p => p.id !== product.id);
        if (updated?.count != 0) {
            updatedProducts?.splice(index, 0, updated)
        }
        setProducts(updatedProducts)
    };

    const deleteProduct=()=>{
        const updatedProducts = products?.filter(p => p.id !== product.id);
        setProducts(updatedProducts)
    }

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 border-b border-gray-300 py-3'>
            <div className='left flex gap-3'>
                <Image width={60} height={60} src={product?.imageFile||Logo } alt={product?.name} />
                <div>
                    <p className='text-black/60 font-medium text-[10px]'>{product?.category}</p>
                    <p className='text-[16px] font-semibold'>{product?.name}</p>
                    <p className='text-xs'>{product?.quantityType}</p>
                    <p>
                        <span className='font-bold me-2 text-blue-800'>Rs.{discountedPrice}</span>
                        <span className='line-through text-red-700'>Rs.{product?.price}</span>
                    </p>
                </div>
            </div>
            <div className='flex flex-row justify-evenly sm:flex-col gap-3 items-center'>
                <div className='flex items-center gap-2'>
                    <Button
                        icon={<TiMinus className='text-md' />}
                        disabled={cracker?.count < 1}
                        onClick={() => updateCracker(cracker?.count - 1)}
                    />
                    <InputNumber
                        size='large'
                        inputMode='numeric'
                        value={cracker?.count}
                        min={0}
                        max={250}
                        onChange={(value) => updateCracker(Number(value))}
                    />
                    <Button
                        icon={<TiPlus className='text-md' />}
                        disabled={cracker?.count >= 250}
                        onClick={() => updateCracker(cracker?.count + 1)}
                    />
                </div>
                <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-4' >
                    <p className='text-lg text-blue-800 font-bold'>Rs. {cracker?.total}</p>
                    {
                        isCart&&(
                            <Button type='primary' danger icon={<AiOutlineDelete/>} onClick={deleteProduct} ></Button>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
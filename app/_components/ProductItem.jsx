
import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import ProductItemDetails from './ProductItemDetails';
import Link from 'next/link'

  

function ProductItem({product}) {

  
  //console.log(product.id)

 

  return (

    <>
    <Link href={'/product-details/' + product.id} className='p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out cursor-pointer'>

        <Image src={product.attributes?.images?.data[0]?.attributes?.url} 
        width={100} 
        height={100}
        alt={product.attributes?.name}
        className='h-[200px] w-[200px] object-contain'
        />
        <h2 className='font-bold '>{product.attributes.name}</h2>
        <div className='flex justify-between gap-2'>
            <h2 className='font-blod'>Price:</h2>
            {product.attributes.sellingPrice&& 
            <h2 className='font-mediam '>{product.attributes.sellingPrice}৳ </h2>}
            <h2 className={`font-mediam ${product.attributes.sellingPrice&&'line-through text-gray-500'}`}>{product.attributes?.mrp} ৳</h2>
        </div> 
        <h2 className='font-mediam'>Point: {product.attributes.productPoint}</h2>

        
        

    </Link>

    
    </>

  )
}

export default ProductItem
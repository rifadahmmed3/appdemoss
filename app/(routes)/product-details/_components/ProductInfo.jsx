
"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import ProductItemDetails from '@/app/_components/ProductItemDetails';

function ProductInfo({product}) {

    console.log(product?.id)
    console.log(product?.attributes?.name)
    console.log(product?.attributes?.sellingPrice)
    console.log(product?.attributes?.mrp)

    const [totalPrice, setTotalPrice] = useState();
    const [totalPriceSelling, setTotalPriceSelling] = useState();

    const [totalPriceMrp, setTotalPriceMrp] = useState();

    const [totalPricePoint, setTotalPricePoint] = useState();

    useEffect(()=>{

      calcualte();

    },[])

    const calcualte=()=>{
      setTotalPriceSelling(product.attributes?.sellingPrice)
      setTotalPriceMrp(product.attributes?.mrp)

    }


  return (
    <div>
      
      <div className='flex flex-col gap-3 sm:gap-2'>
        <h2 className='font-bold text-3xl sm:text-2xl'>{product.attributes?.name}</h2>
        
        <div className='flex gap-3'>
                
          {product.attributes?.sellingPrice&& 
          <h2 className='font-blod text-3xl'>{product.attributes?.sellingPrice}৳</h2>}
          <h2 className={`font-bold text-3xl ${product.attributes?.sellingPrice&&'line-through text-gray-500'}`}>{product.attributes?.mrp}৳</h2>
          
        </div>
        <h2 className='font-medium text-lg'>Quantity: {product.attributes?.itemQuantityType}</h2>
        <h2><span className='font-bold'>Category:</span> {product.attributes?.categories?.data[0]?.attributes?.Name}</h2>

          <Dialog>
              <DialogTrigger asChild><Button variant="outline"
              className='text-primary hover:text-white hover:bg-primary'
              >Add to Cart</Button></DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                  {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
                  <DialogDescription>
                      <ProductItemDetails product={product}/>
                  </DialogDescription>
                  </DialogHeader>
              </DialogContent>
          </Dialog>
      </div>
    </div>
  )
}

export default ProductInfo
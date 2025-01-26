"use client"
import React, { useState } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

import { Skeleton } from "@/components/ui/skeleton"
import { toast } from 'sonner';

import ProductItem from './ProductItem'

function ProductsList() {


  const [productsLists,getProductsLists]= useState([])
  const [cheack,setCheak] = useState(true)

  const [lastIndex,setLastIndex] = useState()

  // console.log(productsLists.length)
  // console.log(parseInt(productsLists.length) - 1)

  const getAllProducts= async() =>{
      try{
          const productsList= await GlobalApi.getAllProductList();
          getProductsLists(productsList);
          setCheak(false);
      } catch(err){
              toast(err)
      }
      
  }
  
  getAllProducts()


  return (
    <div className='mt-10'>
        <h2 className='text-green-600 font-bold text-2xl'>Propular Products</h2>
        {cheack? 
          
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6 h-[200px] w-[200px] '>
              <Skeleton className='h-[200px] w-[200px]'/>
          </div>
            
          :<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6 '>
            {productsLists.map((product,index)=>index<16&&(
                <ProductItem product={product}/>
            ))}
        </div>}

    </div>
  )
}

export default ProductsList
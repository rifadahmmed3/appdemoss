"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import GlobalApi from '../_utils/GlobalApi';


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Skeleton } from "@/components/ui/skeleton"
import { toast } from 'sonner';


function CategoryList() {

  const [categoryLists,getCategoryList]= useState([])
  const [cheack,setCheak] = useState(true)

  const getCategories= async() =>{
    try{
      const categorys= await GlobalApi.getCategoryList();
      getCategoryList(categorys);
      setCheak(false);
    } catch(err){
      toast(err)
    }
      
  }
  
  getCategories()


  return (
    <div className='mt-5'>
        <h2 className='text-green-600 font-bold text-2xl'>Shop by Category</h2>
        {cheack? 
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2'> 
        {/* <Skeleton className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-400'/> */}
            <div className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-400'>
                <Skeleton className='group-hover:scale-125 transition-all ease-in-out mt-2 h-[100px]'/>
            </div>
            <div className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-400'>
                <Skeleton className='group-hover:scale-125 transition-all ease-in-out mt-2 h-[100px]'/>
            </div>
            <div className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-400'>
                <Skeleton className='group-hover:scale-125 transition-all ease-in-out mt-2 h-[100px]'/>
            </div>
            <div className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-400'>
                <Skeleton className='group-hover:scale-125 transition-all ease-in-out mt-2 h-[100px]'/>
            </div>
            <div className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-400'>
                <Skeleton className='group-hover:scale-125 transition-all ease-in-out mt-2 h-[100px]'/>
            </div>
            <div className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-400'>
                <Skeleton className='group-hover:scale-125 transition-all ease-in-out mt-2 h-[100px]'/>
            </div>
          
    </div>
        :
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2'> 
        {categoryLists.map((category,index)=>(
            <Link href={'/products-category/'+category.attributes.Name} className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-400'>
                
                <Image src={category.attributes?.Icon?.data[0]?.attributes?.url}
                alt='icon'
                width={70}
                height={70}
                className='group-hover:scale-125 transition-all ease-in-out mt-2'
                />
                <h2 className='text-green-800'>{category.attributes.Name}</h2>
                
            </Link>
            
        ))}
        
    </div>
       
      }
        
    </div>
  )
}

export default CategoryList
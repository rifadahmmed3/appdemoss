"use client"
import React, { useState } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import ProductItem from './ProductItem'
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from 'sonner';

function ProductForCategoryTwo({params}) {

  const [productsLists,getProductsLists]= useState([])
  const [cheack,setCheak] = useState(true)

  const getAllProducts= async() =>{
      try{
          const productsList= await GlobalApi.getProductByCategory(params?.categoryName);
          getProductsLists(productsList);
          setCheak(false);
      } catch(err){
              toast(err)
      }
      
  }
  
  getAllProducts()


  return (
    <div className='mt-10'>
        <h2 className='text-green-600 font-bold text-2xl'>All Products</h2>
        {cheack? 
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6 h-[200px] w-[200px] '>
              <Skeleton className='h-[200px] w-[200px]'/>
          </div>
            
          :<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6 '>
            {productsLists.map((product,index)=>(
                <ProductItem product={product}/>
            ))}
        </div>}

    </div>
  )
}

export default ProductForCategoryTwo
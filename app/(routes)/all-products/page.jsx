"use client"
import React, { useState } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import ProductForCategory from '@/app/_components/ProductForCategory';

import SearchProductMobile from '@/app/_components/SearchProductMobile';

function AllProducts() {

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
                console.log(err)
        }
        
    }

    getAllProducts()

  return (

    <div>

        <div className='p-5 md:p-10'>
            <SearchProductMobile/>
            <ProductForCategory productList={productsLists}/>
        </div>
    </div>
    
  )
}

export default AllProducts
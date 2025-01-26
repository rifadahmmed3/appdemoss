"use client"
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi';

function SingleProductDetails({params}) {

    

  return (

    <div className='p-5 py-12 px-10 md:px-28'>

        <div className='flex flex-col sm:flex-row mt-10 gap-5 sm:gap-10'>
            {/* <ProductsImages product={productDetail}/>
            <ProductInfo product={productDetail}/> */}
           <h1>Id {productDetail.id}</h1>
           <h1>Name {productDetail.attributes?.name}</h1>
           <h1>Category: {productDetail.attributes?.categories.data[0].attributes?.Name}</h1>
        </div>
     
    </div>


  )
}

export default SingleProductDetails
"use client"
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import ProductsImages from '../_components/ProductImage';
import ProductInfo from '../_components/ProductInfo';
import ProductDiscription from '../_components/ProductDiscription';



function ProductDetailsAll({params}) {

    const [productDetail,setProductDetail] = useState([]);
    

    useEffect(()=>{

        getSingleProduct();

      },[])

      const getSingleProduct=()=>{

        GlobalApi.singleProduct(params.productId).then(resp=>{
            //console.log(resp.data.data);
            setProductDetail(resp.data.data);
            //console.log(productDetail)
        })
      }

  return (

    <div className='p-5 py-12 px-10 md:px-28'>

        <div className='flex flex-col sm:flex-row mt-10 gap-5 sm:gap-10'>
            <ProductsImages product={productDetail}/>
            <ProductInfo product={productDetail}/>

{/* 
          <h1>{productDetail.attributes?.name}</h1>
          <h1>{productDetail.attributes?.mrp}</h1>
          <h1>{productDetail.attributes?.sellingPrice}</h1> */}
           
        </div>

        <ProductDiscription product={productDetail}/>
     
    </div>


  )
}

export default ProductDetailsAll
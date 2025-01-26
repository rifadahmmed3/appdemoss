import React from 'react'
import ProductItem from './ProductItem'

function SearchProduct({productList}) {
  

  console.log(productList.length)


  return (
    <div>
        <h2 className='text-green-600 font-bold text-2xl'>Search Results</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6'>
            {productList.map((product,index)=>(
                <ProductItem product={product}/>
            ))}
        </div> 

    </div>
  )
}

export default SearchProduct
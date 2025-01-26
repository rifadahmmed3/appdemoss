import React from 'react'
import Image from 'next/image'

function ProductsImages({product}) {
  return (
    <div>
        <Image src={product?.attributes?.images?.data[0]?.attributes?.url} 
        alt='images'
        width={350}
        height={400}
        className='rounded-lg object-cover bg-slate-100'
            />
    </div>
  )
}

export default ProductsImages
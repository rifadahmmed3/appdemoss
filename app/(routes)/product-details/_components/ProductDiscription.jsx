import React from 'react'

function ProductDiscription({product}) {

  return (
    <div className='mt-10'>
      <h2 className='text-gray-500 text-sm'>{product.attributes?.description}</h2>
    </div>
  )
}

export default ProductDiscription
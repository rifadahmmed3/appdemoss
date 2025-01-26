import React from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import ProductForCategory from '@/app/_components/ProductForCategory';
import SearchProductMobile from '@/app/_components/SearchProductMobile';
import SearchProduct from '@/app/_components/SearchProducts';


async function searchPage({searchParams}) {



  const productList= await GlobalApi.searchReasults(searchParams.search);



  return (


    <div className="p-3 mt-3">
    {/* <h2 className='p-4 bg-primary text-white font-bold text-3xl text-center'>{myString}</h2> */}
    
    {/* <TopCategoryList categoryList={categoryList}  selectedCategory={params.categoryList}/> */}

    <SearchProductMobile/>

    <div>

      <SearchProduct productList={productList}/>
      {/* <ProductForCategory productList={productList}/> */}
      {/* <ProductsList productList={productList}/> */}
      {/* <ProductForCategoryTwo  productList={params}/> */}

      
    </div>
     
  </div>


  )
}

export default searchPage
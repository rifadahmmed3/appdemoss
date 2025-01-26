import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList'
import ProductsList from '@/app/_components/ProductsList';
import ProductForCategory from '@/app/_components/ProductForCategory';
import ProductForCategoryTwo from '@/app/_components/ProductForCategoryTwo';
import SearchProductMobile from '@/app/_components/SearchProductMobile';


async function ProductCategory({params}) {

  const productList= await GlobalApi.getProductByCategory(params?.categoryName);
 
  const categoryList= await GlobalApi.getCategoryList();

  let myString = params.categoryName.replace(/%20/g,' ');
  // console.log(myString)
  // console.log(params.categoryName)

  return (
    <div className='mt-3'>

      <SearchProductMobile/>
      <h2 className='p-4 bg-primary text-white font-bold text-3xl text-center'>{myString}</h2>
      
      <TopCategoryList categoryList={categoryList}  selectedCategory={params.categoryList}/>
      
      <div className='p-5 md:p-10'>
        <ProductForCategory productList={productList}/>
        {/* <ProductsList productList={productList}/> */}
        {/* <ProductForCategoryTwo  productList={params}/> */}
      </div>
       
    </div>
  )
}

export default ProductCategory
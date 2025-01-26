
import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from './_utils/GlobalApi';
import CategoryList from "./_components/CategoryList";
import ProductsList from "./_components/ProductsList";
import Footer from "./_components/Footer";
import SlidersOne from "./_components/SlidersOne";
import SearchProductMobile from "./_components/SearchProductMobile";
import { Button } from "@/components/ui/button";
import Link from 'next/link'

// export async function getServerSideProps(context){
//   const sliderList= await GlobalApi.getSliders();
//   const categoryList= await GlobalApi.getCategoryList();
//   const allProductList= await GlobalApi.getAllProductList();
//   return {
//     props: {
//       slider:sliderList,
//       category:categoryList,
//       product:allProductList
//     }
//   }{slider,category,product}
// }




export default async function Home() {



  return (

    <div className="p-5 px-5 ">

      <SearchProductMobile/>
      <SlidersOne />

      {/* Slider */}
      {/* <Slider sliderList={sliderList} /> */}
      {/* Category List */}
      <CategoryList />
      {/* Products List */}
      <ProductsList />

    <div className='w-full grid justify-center mt-10'>
      <Link href='/all-products'> 
        <Button>
          View All
        </Button>
      </Link>
    </div>
      
    
      {/* Banner */}

      

      <Image src='/banner.png' 

      width={1000} 
      height={300}
      alt='banner'
      className="w-full h-[400px] object-contain mt-2"
      />
      {/* Footer */}
      <Footer />

    </div>
  );
}

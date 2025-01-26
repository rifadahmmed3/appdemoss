"use client"
import React, { useEffect , useState} from 'react'
import Slider from "./Slider";
import GlobalApi from '../_utils/GlobalApi';
import CategoryList from "./CategoryList";
import ProductsList from "./ProductsList";


function HomePage() {

  const [sliderList,setSliderList] = useState([]);
  const [categoryList,setCategoryList] = useState([]);
  const [productList,setProductList] = useState([]);

    useEffect(()=>{
      getSlider()
      // getCategory()
      // getProduct()
      getCategoryList()

    })

    // const getSlider= async ()=>{

    //     const sliderList = await GlobalApi.getSliders();
    //     setSliderList()
    //   }


    const getSlider=()=>{
      GlobalApi.getSliders().then(resp=>{
        setSliderList(resp);
      })
    }
      const getCategoryList=()=>{
        GlobalApi.getCategory().then(resp=>{
          setCategoryList(resp.data.data);
        })
      }

  // const getCategory= async ()=>{

  //   const categoryList= await GlobalApi.getCategoryList().then(resp=>{
  //     setCategoryList(resp.data);
  //   });
    
  // }

  // const getProduct = async ()=>{

  //   const allProductList= await GlobalApi.getAllProductList().then(resp=>{
  //     setProductList(resp.data);
  //   });
  // }


  return (
    <>
        {/* Slider */}
  
        <Slider sliderList={sliderList} />
        {/* Category List */}
        <CategoryList categoryList={categoryList}/>
        {/* Products List */}
        {/* <ProductsList allProductList={productList}/> */}
        {/* Banner */}

    </>
  )
}

export default HomePage
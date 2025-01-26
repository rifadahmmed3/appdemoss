"use client"
import React, { useState } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

import { Skeleton } from "@/components/ui/skeleton"
import { toast } from 'sonner';


//   export async function getServerSideProps(context){
//   const sliderList= await GlobalApi.getSliders();
//   return {
//     props: {
//       sliders:sliderList,
//     }
//   }
// }



function SlidersOne() {

    const [sliderLists,getSliderList]= useState([])
    const [cheack,setCheak] = useState(true)

    const getSliders= async() =>{
        try{
            const sliderList= await GlobalApi.getSliders();
            getSliderList(sliderList);
            setCheak(false);
        } catch(err){
                toast(err)
        }
        
    }
    
    getSliders()


  return (
    <div>
        {cheack? <div className="carousel w-full rounded-2xl ">
        
             <div id="slide1" className="carousel-item relative w-full" >
             <Skeleton className="w-full h-[200px] md:h-[400px] object-cover rounded-2xl" />
             <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
             {/* <a href="" className="btn btn-circle">❮</a> 
             <a href="" className="btn btn-circle">❯</a> */}
             </div>
         </div> 
                
    </div>

        :<div className="carousel w-full rounded-2xl transition-all">
        {sliderLists.map((slider,index)=>(
             <div id="slide1" className="carousel-item relative w-full " key={index}>
             <Image src={slider.attributes?.icon?.data[0]?.attributes?.url}
                    unoptimized={true}
                    width={120}
                    height={100}
                    alt='sld'
                    className='w-full h-[200px] md:h-[400px] object-cover rounded-2xl'
                    />
             <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
             {/* <a href="" key={index++} className="btn btn-circle">❮</a> 
             <a href="" key={index--} className="btn btn-circle">❯</a> */}
             </div>
         </div> 
                
            ))}
       
        
    </div>
    
    }
        

    </div>
  )
}

export default SlidersOne
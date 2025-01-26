import React from 'react'
import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  

function Slider({sliderList}) {

    
    return (
        <>
        <div className="carousel w-full rounded-2xl ">
        {sliderList.map((slider,index)=>(
             <div id="slide1" className="carousel-item relative w-full" key={index}>
             <Image src={slider.attributes?.icon?.data[0]?.attributes?.url}
                    unoptimized={true}
                    width={120}
                    height={100}
                    alt='sld'
                    className='w-full h-[200px] md:h-[400px] object-cover rounded-2xl'
                    />
             <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
             <a href="" key={index++} className="btn btn-circle">❮</a> 
             <a href="" key={index--} className="btn btn-circle">❯</a>
             </div>
         </div> 
                
            ))}
       
        
    </div>
        
        </>


    )
}

export default Slider
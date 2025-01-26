"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react';

function SearchProductMobile() {
    const [searchInput,setSearchInput] = useState([])
  return (
    <>
      
      <div className='flex gap-3 border rounded-full p-2 px-5 md:hidden lg:hidden mt-1 mx-1 mb-5 justify-between'>

            <input type="text" placeholder='Search ' className='bg-white outline-none justify-between' onChange={(e)=>setSearchInput(e.target.value)} />

            <Link
                href={{
                pathname: '/search',
                query: {
                    search: searchInput
                }
                }}>
                
                <Search/>
            </Link>
                
                
        </div>
    </>
  )
}

export default SearchProductMobile
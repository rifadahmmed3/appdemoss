"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ShoppingBag } from 'lucide-react';
import { LayoutGrid } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

import GlobalApi from '../_utils/GlobalApi';
import { Search } from 'lucide-react';
import Link from 'next/link'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { UpdateCartContext } from '../_context/UpdateCartContext'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

  import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import CartItemList from './CartItemList';

  


function Header() {


    const router = useRouter();

    const [categoryList,setCategoryList] = useState([]);

    const [jwt,setJwt] = useState();
    const [user,setUser] = useState();
    
    const {updateCart,setUpdateCart} = useContext(UpdateCartContext);
    const [totalCartItem,setTotalCartItem] = useState(0);
    const [cartItemList,setCartItemList] = useState([]);
    const [subtotal,setSubTotal]=useState(0);
    const [totalPoint,setTotalPoint]=useState(0);
    const [userFullName,setUserFullName] = useState();
    const [cheachlog,setcheacklog] = useState()
    

    const [searchInput,setSearchInput] = useState([])

    useEffect(()=>{
      getCategoryList();

      try{
        const jwt = sessionStorage.getItem('jwt');
        setJwt(jwt)
        const isLogin = sessionStorage.getItem('jwt')? true:false;
        setcheacklog(isLogin);
        const user = JSON.parse(sessionStorage.getItem('user'));
        setUser(user)

        // const getUserName=async()=>{
        //   const user = JSON.parse(sessionStorage.getItem('user'));
        //   const getUserName_= await GlobalApi.getMyData(user.id);
        //   setUserFullName(getUserName_.fullname);
        //   console.log(getUserName_.fullname)
          
        // }
        // getUserName();
      }
      catch(err){
          console.log('geting data error')
      }
      
    },[]);

    useEffect(()=>{
      getCartItems();
    },[updateCart])

    useEffect(()=>{
      let total=0;
      cartItemList.forEach(element => {
          total = total + element.amount
      });
      setSubTotal(total)
  },[cartItemList])


  useEffect(()=>{
      let totalpoint=0;
      cartItemList.forEach(element => {
          totalpoint = totalpoint + element.productPoint
      });
      setTotalPoint(totalpoint)
  },[cartItemList])
  
    const getCategoryList=()=>{
      GlobalApi.getCategory().then(resp=>{
        setCategoryList(resp.data.data);
      })
    }

    const getCartItems=async()=>{
      try{
        const jwt = sessionStorage.getItem('jwt');
        const user = JSON.parse(sessionStorage.getItem('user'));
        if(jwt){
          const cartItemList_= await GlobalApi.getCartItems(user.id,jwt);
          console.log(cartItemList_);
          setTotalCartItem(cartItemList_?.length);
          setCartItemList(cartItemList_);
        }
      } catch(err){
        toast(err)
      }

    }
  
    const onSignOut=()=>{
      sessionStorage.clear();
      router.push('/sign-in');
    }

    const onDeleteItem=(id)=>{
      try{
        const jwt = sessionStorage.getItem('jwt');
        GlobalApi.deleteCartItem(id,jwt).then(resp=>{
            toast('Item removed!');
            getCartItems();
        })
      }catch(err){
        toast(err)
      }
        

    }

    const onProfile=()=>{
      router.push('/profile')
    }
  
 

  return (
    <div className='flex flex-col'>

      <div className='bg-green-500 flex items-center justify-center p-1 content-center'>
          <h1 className='text-white text-sm font-bold '>Wellcome to <b>SmartLife</b> Online shopping center. Please stay with us. We are updating.... </h1>
      </div>
    
      <div className='flex items-center justify-center'>
          




      </div>

      <div className='p-2 shadow-md flex justify-between '>
          <div className='flex items-center gap-4'>
          <Link href={'/'}>
              <Image src="/logo.png" alt='logo' 
              width={120}
              height={100}
              />
          </Link>
  
            <DropdownMenu>
              <DropdownMenuTrigger asChild><h2 className='hidden md:flex gap-2 items-center cursor-pointer border rounded-full p-2 px-7 bg-green-400 text-white' >  <LayoutGrid className='h-5 w-5' /> Catagory  <ChevronDown  /></h2></DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* <DropdownMenuLabel>Browse Catagory</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}
                {categoryList.map((category,index)=>(

                  <Link key={index}
                  href={'/products-category/'+category.attributes.Name}>
                  
                    <DropdownMenuItem className='flex gap-4 items-center cursor-pointer'>

                      <Image src={ 
                        //process.env.NEXT_PUBLIC_BACKEND_BASE_URL+
                        category.attributes?.Icon?.data[0]?.attributes?.url}
                        unoptimized={true}

                      alt='icon'
                      width={27}
                      height={27}
                      />

                      <h2 className='text-lg'>{category?.attributes?.Name}</h2>


                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>



                  {/* ............................................ */}



            <div className=' md:flex gap-3 items-center border rounded-full p-2 px-5 hidden justify'>

              <input type="text" placeholder='Search' className='bg-white outline-none' onChange={(e)=>setSearchInput(e.target.value)} />
              
              <Link 
                href={{
                  pathname: '/search',
                  query: {
                    search: searchInput
                  }
                }}>
                <Search />
                </Link>

            </div>

            
            {/* {topinfoList.map((topinfo,index)=>(
              <div className=' md:flex gap-3 items-center border rounded-full p-2 px-5 hidden'>
                <h2 className='text-lg'>{topinfo?.attributes?.name}</h2>
              </div>
            ))}
            */}
          
          </div>  
          <div className='flex items-center gap-3 '>

            <Sheet>
                <SheetTrigger>
                  <h2 className='flex items-center gap-2'> <ShoppingBag /> {totalCartItem} </h2>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="bg-primary text-white font-bold text-lg p-2">My Cart</SheetTitle>
                    <SheetDescription>
                      <CartItemList cartItemList={cartItemList} onDeleteItem={onDeleteItem}/>
                    </SheetDescription>
                  </SheetHeader>
                  <SheetClose asChild>
                    <div className='absolute w-[90%] bottom-6 flex flex-col'>
                        <h2 className='text-lg font-bold flex justify-between'>Total Price: <span>{subtotal}</span></h2>
                        <h2 className='text-lg font-bold flex justify-between'>Total Point: <span>{totalPoint}</span></h2>
                        <Button onClick={()=>router.push(jwt?'/checkout':'/sign-in')}>View Cart</Button>
                    </div>
                  </SheetClose>
                </SheetContent>
              </Sheet>
              
            {!cheachlog? 
            <div className='flex gap-2'> 
              <Link href={'/sign-in'}>
                  <Button>Login</Button>
                </Link>
                <Link href={'/create-account'}>
                <Button>Register</Button>
                </Link>
            </div>:
            <div className='flex '>
              {/* <div>
                <h2 className='p-2  '>{userFullName}</h2>
              </div> */}
              <div>
                
              <DropdownMenu>
                  <DropdownMenuTrigger asChild><CircleUserRound className='bg-green-100 p-2 rounded-full cursor-pointer text-primary h-10 w-10 ' /></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>onProfile()}>Profile</DropdownMenuItem>
                    <Link href={'/my-order'}><DropdownMenuItem>My Order</DropdownMenuItem></Link>
                    <DropdownMenuItem onClick={()=>onSignOut()}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </div>
            </div>
            
              }

          </div>

          
        </div>
    

    </div>
  )
}

export default Header
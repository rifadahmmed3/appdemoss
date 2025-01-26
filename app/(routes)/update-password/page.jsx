"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useState, useEffect } from 'react'
import { LoaderIcon } from 'lucide-react';
import Link from 'next/link'
import axios from 'axios';
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"

function UpdatePassword() {

    const [loader,setLoader]=useState();
    const router=useRouter();
    const [jwt,setJwt] = useState();
    const [user,setUser] = useState()

    const [getPassword,getOldPassword] = useState();
    const [oldpassword,setoldPassword] = useState();
    const [newpassword,newsetPassword] = useState();
    const [retypepassword,setretypePassword] = useState();


    useEffect(()=>{
        try{
            const jwt = sessionStorage.getItem('jwt');
            setJwt(jwt)
            const user = JSON.parse(sessionStorage.getItem('user'));
            setUser(user)
            if(!jwt){
                router.replace('/')
            }
            
        } catch(err){
            console.log('geting data error')
        }
        getMyInfo();
        
    
      },[]);

      const getMyInfo= async()=>{

        const user = JSON.parse(sessionStorage.getItem('user'));
        const getMyInfo_= await GlobalApi.getMyData(user.id);
    
        getOldPassword(getMyInfo_.password)
        console.log(getMyInfo_.password)
        
    }

    const updatePasswords=(userss)=>{
        axios
        .put('https://api.slifebd.com/api/users/' + userss.id + '/?populate', {
    
            password:newpassword,
             
        })
        .then(response => {
          
          console.log(response);
          setLoader(false)
        });
      }
      const onUpdatePassword=()=>{
        
        const userss = JSON.parse(sessionStorage.getItem('user'));  

        if (newpassword == retypepassword){
            setLoader(true)
            updatePasswords(userss);
            router.push('/profile');
        }else{
            setLoader(false)
            toast('Enter valid password.')
        }
        
        
      }


  return (
    <div className='card lg:w-[800px] md:w-[600px] w-80 bg-base-100 shadow-xl p-2  mx-auto mt-8'>
        <h2 className='font-bold text-2xl text-center'>Udpate Password</h2>
        {/* <div className='border border-b-2 border-black  max-w-6'></div> */}
      <div className='gap-2 grid justify-center w-full my-4'>
        {/* <h2>Current Password:</h2>
        <input type="text" className="input input-bordered lg:w-[700px] md:w-[500px] w-[280px] mx-auto " onChange={(e)=>setoldPassword(e.target.value)}/> */}
        <h2>New Password:</h2>
        <input type="text" className="input input-bordered lg:w-[700px] md:w-[500px] w-[280px] mx-auto " onChange={(e)=>newsetPassword(e.target.value)}/>
        <h2>Re-type Password:</h2>
        <input type="text" className="input input-bordered lg:w-[700px] md:w-[500px] w-[280px] mx-auto  " onChange={(e)=>setretypePassword(e.target.value)}/>
        
        <Button onClick={()=>onUpdatePassword()} disabled={!(newpassword && retypepassword)} className ="mx-auto" > {loader? <LoaderIcon className="animate-spin  " />:'UPDATE'}</Button>
        
      </div>
    </div>
  )
}

export default UpdatePassword
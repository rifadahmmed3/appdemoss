"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useState, useEffect } from 'react'
import { LoaderIcon } from 'lucide-react';
import Link from 'next/link'
import axios from 'axios';
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"

function UpdateProfile() {

  const [loader,setLoader]=useState();
  const router=useRouter();
  const [jwt,setJwt] = useState();
  const [user,setUser] = useState();  
  const [fullname,setFullname] = useState();
  const [username,setUsername] = useState();
  const [fathername,setFathername] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [phone,setPhone] = useState();
  const [address,setAddress] = useState();
  const [usertype,setUserType] = useState();
  const [gender,setGendar] = useState();
  const [nomeneeName, setNomeneeName]=useState();
  const [nomeneePhone, setNomeneePhone]=useState();

 


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
    
    
    console.log(getMyInfo_);
    setFullname(getMyInfo_.fullname)
    setUsername(getMyInfo_.username)
    setFathername(getMyInfo_.fathersname)
    setEmail(getMyInfo_.email)
    setPassword(getMyInfo_.password)
    setPhone(getMyInfo_.phone)
    setAddress(getMyInfo_.address)
    setUserType(getMyInfo_.usertype)
    setGendar(getMyInfo_.gender)
    setNomeneeName(getMyInfo_.nomeneename)
    setNomeneePhone(getMyInfo_.nomeneephone)


    try{
        const getAllReferUser_= await GlobalApi.getUserByRefer(getMyInfo_.username);
        console.log(getAllReferUser_);
        setReferUserList(getAllReferUser_);
        // getAllReferUser_.forEach(element => {
        //     console.log(element.id);
        //     console.log(element.email);
        //   })
    } catch(err){
        console.log(err)
    }
    
}



const updateInfo=(users,fullname,phone,fathername,address,nomeneeName,nomeneePhone,usertype,gender)=>{
  axios
  .put('https://api.slifebd.com/api/users/' + users.id + '/?populate', {

      fullname:fullname,
      phone:phone,
      fathersname:fathername,
      address:address,
      gender:gender,
      usertype:usertype,
      nomeneename:nomeneeName,
      nomeneephone:nomeneePhone,
      
  })
  .then(response => {
    
    console.log(response);
    setLoader(false)
  });
}


  const updatePasswords=(userss)=>{
    axios
    .put('https://api.slifebd.com/api/users/' + userss.id + '/?populate', {

        password:'12345678',
         
    })
    .then(response => {
      
      console.log(response);
      
    });
  }
  const onUpdatePassword=()=>{
    const userss = JSON.parse(sessionStorage.getItem('user'));  
    updatePasswords(userss);
    
  }


  const onCreateAccount=()=>{
    const users = JSON.parse(sessionStorage.getItem('user'));  
    setLoader(true)
    updateInfo(users,fullname,phone,fathername,address,nomeneeName,nomeneePhone,usertype,gender);
    router.push('/profile');
    
  }


  return (

    <div className='card lg:w-[800px] md:w-[600px] w-80 bg-base-100 shadow-xl p-2   mx-auto mt-4'>
        <h2 className='font-bold text-2xl text-center'>Udpate Profile</h2>
        {/* <div className='border border-b-2 border-black  max-w-6'></div> */}
      <div className='gap-2 grid justify-center w-full my-4'>
        <h2>Full Name:</h2>
        <input type="text" placeholder={fullname} className="input input-bordered lg:w-[700px] md:w-[500px] w-72 mx-auto  " onChange={(e)=>setFullname(e.target.value)}/>
        <h2>Username:</h2>
        <input type="text" placeholder={username} className="input input-bordered lg:w-[700px] md:w-[500px] w-72 mx-auto " disabled />
        <h2>Email:</h2>
        <input type="text" placeholder={email} className="input input-bordered lg:w-[700px] md:w-[500px] w-72 mx-auto " disabled />
        <h2>Phone Number:</h2>
        <input type="text" placeholder={phone} className="input input-bordered lg:w-[700px] md:w-[500px] w-72 mx-auto " onChange={(e)=>setPhone(e.target.value)} />
        <h2>Father's Name:</h2>
        <input type="text" placeholder={fathername} className="input input-bordered lg:w-[700px] md:w-[500px] w-72 mx-auto " onChange={(e)=>setFathername(e.target.value)}/>
        <h2>Full Address:</h2>
        <input type="text" placeholder={address} className="input input-bordered lg:w-[700px] md:w-[500px] w-72 mx-auto " onChange={(e)=>setAddress(e.target.value)}/>
        <h2>User Type:</h2>
        <input type="text" placeholder={usertype} className="input input-bordered lg:w-[700px] md:w-[500px] w-72 mx-auto  " onChange={(e)=>setUserType(e.target.value)} />
        <h2>Gender:</h2>
        <input type="text" placeholder={gender} className="input input-bordered lg:w-[700px] md:w-[500px] w-72 mx-auto  " onChange={(e)=>setGendar(e.target.value)} />
        <h2>Nomenee Name:</h2>
        <input type="text" placeholder={nomeneeName} className="input input-bordered lg:w-[700px] md:w-[500px] w-72 mx-auto " onChange={(e)=>setNomeneeName(e.target.value)}/>
        <h2>Nomenee Phone:</h2>
        <input type="text" placeholder={nomeneePhone} className="input input-bordered lg:w-[700px] md:w-[500px] w-72 mx-auto  " onChange={(e)=>setNomeneePhone(e.target.value)}/>
        <Button onClick={()=>onCreateAccount()} className ="lg:mr-0 md:mr-0 mr-3" > {loader? <LoaderIcon className="animate-spin  " />:'UPDATE'}</Button>
        
        <Link href='/update-password'><h2 className='text-center'>Change Password</h2></Link> 

        {/* <Button onClick={()=>onUpdatePassword()} className ="lg:mr-0 md:mr-0 mr-3" >PASSWORD</Button> */}
      </div>
    </div>
    
  )
}

export default UpdateProfile
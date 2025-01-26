"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input'
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import axios from 'axios';
import { UserRound } from 'lucide-react';
import Link from 'next/link'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"

  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

function profile() {

    const [jwt,setJwt] = useState();
    const [user,setUser] = useState();    
    const router= useRouter(); 
    const [loader,setLoader]=useState(false);

    const [referUserList, setReferUserList] = useState([]);


    const [alluserinfo,setalluserinfo] = useState([]);
    const [bsslength,setbsslength] = useState();
    const [bssuidinfo, setbssuidinfo] = useState([]);

  const [fullname,setFullname] = useState();
  const [username,setUsername] = useState();
  const [fathername,setFathername] = useState();
  const [email,setEmail] = useState();
  const [phone,setPhone] = useState();
  const [address,setAddress] = useState();
  const [usertype,setUserType] = useState();
  const [gender,setGendar] = useState();
  const [point,setPoint] = useState();
  const [packages,setPackage] = useState();
  const [level,setLevel] = useState();
  const [moneys,setMoneys] = useState();
  const [bssuid,setBssuid] = useState()
  const [nomeneeName, setNomeneeName]=useState();
  const [nomeneePhone, setNomeneePhone]=useState();

  const [userIcon,setUserIcon] = useState(false);


 


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
    getMyOrder();
    getAllUserInfo();
    getBssInfo();

},[]);


useEffect(()=>{
  alluserinfo.forEach(element => {
    setbssuidinfo(element.bssuid);
  })
},[alluserinfo])


const getAllUserInfo= async()=>{
      const getAllUserInfo_= await GlobalApi.getAllUserData();
      setalluserinfo(getAllUserInfo_)

    }

    const getBssInfo= async()=>{
      const getBssInfo_= await GlobalApi.getBssUser();
      console.log(getBssInfo_.length);
      setbsslength(getBssInfo_.length);
  }



  
const getMyInfo= async()=>{

    const user = JSON.parse(sessionStorage.getItem('user'));
    const getMyInfo_= await GlobalApi.getMyData(user.id);
    
    
    console.log(getMyInfo_);
    setFullname(getMyInfo_.fullname)
    setUsername(getMyInfo_.username)
    setFathername(getMyInfo_.fathersname)
    setEmail(getMyInfo_.email)
    setPhone(getMyInfo_.phone)
    setAddress(getMyInfo_.address)
    setUserType(getMyInfo_.usertype)
    setGendar(getMyInfo_.gender)
    setPoint(getMyInfo_.mypoint)
    setBssuid(getMyInfo_.bssuid)
    setPackage(getMyInfo_.mypackage)
    setLevel(getMyInfo_.mylevel)
    setMoneys(getMyInfo_.mymoney)
    setNomeneeName(getMyInfo_.nomeneename)
    setNomeneePhone(getMyInfo_.nomeneephone)


    if(getMyInfo_.gender == "female"){
      setUserIcon(true)
    }else{
      setUserIcon(false)
    }

    try{
        const getAllReferUser_= await GlobalApi.getUserByRefer(getMyInfo_.username);
        console.log(getAllReferUser_);
        setReferUserList(getAllReferUser_);
        // getAllReferUser_.forEach(element => {
        //     console.log(element.id);
        //     console.log(element.email);
        //   })
    } catch(err){
        toast(err)
    }
    
}


    const getMyOrder= async()=>{
        const user = JSON.parse(sessionStorage.getItem('user'));
        const getMyInfor_= await GlobalApi.getMyData(user.id);
        const jwt = sessionStorage.getItem('jwt');
        // const getExtrapoint = await GlobalApi.getExtraPoint(user.id);
        // console.log(getExtrapoint)
        // getExtrapoint.forEach(elemen => {
        //   console.log(elemen.attributes.exrtapoint)
        // })
        try{
            if(getMyInfor_.accounttype.includes("bssaccount")){
                console.log(getMyInfor_.bssuid);
                const orderList_ = await GlobalApi.getTargetOrder(getMyInfor_.bssuid);
                const getExtraPoint_ = await GlobalApi.getExtraPoint(user.id);
                console.log(getExtraPoint_);
                console.log(orderList_);
                let extrapointset = 0;
                let totalorderpkg = 0;
                orderList_.forEach(elements =>{
                    if(elements.attributes.orderStatus == 'Complete'){
                        totalorderpkg = totalorderpkg + elements.attributes.orderpkg
                        getExtraPoint_.forEach(elementp => {
                          extrapointset = elementp.attributes.exrtapoint;
                        })
                    } 
                })
                console.log(extrapointset);
                console.log(totalorderpkg);
                updatePkg(user,totalorderpkg,extrapointset)
                levelandmoney(totalorderpkg)
            }else{
                // console.log(getMyInfor_.mypoint)
                const orderList_ = await GlobalApi.getMyOrderTwo(user.id);
                console.log(orderList_)
                const getBssInfo_= await GlobalApi.getBssUser();
                const getExtraPoint_ = await GlobalApi.getExtraPoint(user.id);
                let extrapointsets = 0;
                orderList_.forEach(elements =>{
                  if(elements.attributes.orderStatus == 'Complete' && elements.attributes.totalorderpoint >= 35){
                    
                    try{
                      getExtraPoint_.forEach(elementp => {

                        extrapointsets = elementp.attributes.exrtapoint;
                        newUserInfo(user,getBssInfo_.length,extrapointsets);

                      })
                      

                    } catch(err){
                      newUserInfo(user,getBssInfo_.length,0);
                    }
                    
                  } 
              })
                // if(getMyInfor_.mypoint >= 35){
                //     newUserInfo(user);
                // }
                
            }
        } catch(err){

            console.log(err)
        }
        
        
    }
    const newUserInfo=(newuser,bssuids,pointss)=>{
        axios
        .put('https://api.slifebd.com/api/users/' + newuser.id + '/?populate=*', {

            mylevel: 0,
            mymoney: 0,
            mypackage: 1,
            mypoint: pointss,
            accounttype:'bssaccount',
            bssuid:bssuids + 1,

          
        })
        .then(response => {
          console.log(response);
        });
      }
    const updatePkg=(users,pkgs,points)=>{
        axios
        .put('https://api.slifebd.com/api/users/' + users.id + '/?populate', {

            mypackage:pkgs,
            mypoint:points,
            
        })
        .then(response => {
          
          console.log(response);
        });
      }

      

    const updateLevelANDMoney=(cuser,tLevel,tMoney)=>{axios.put('https://api.slifebd.com/api/users/' + cuser.id + '/?populate', {
            mylevel: tLevel,
            mymoney: tMoney,
        })
        .then(response => {
          console.log(response);
        });
      }
      

    const levelandmoney=(pack)=>{
        
        const cuser = JSON.parse(sessionStorage.getItem('user'));

        if(pack < 4){
         
            let levels= 0;
            let moneys= 0;
            updateLevelANDMoney(cuser,levels,moneys);
            console.log(levels+"  "+ moneys)
        
          } 

        else if(pack < 7){
          let levels= 1;
          let moneys= 0;
          updateLevelANDMoney(cuser,levels,moneys);
          console.log(levels+"  "+ moneys)
      
        } 
        else if(pack < 15){
          
          let levels = 2;
          let moneys= 0+3;
      
          updateLevelANDMoney(cuser,levels,moneys);
          console.log(levels+"  "+ moneys)
        }
        else if(pack < 31){
          let levels=3;
          let moneys= 3+4;
          updateLevelANDMoney(cuser,levels,moneys);
          console.log(levels+"  "+ moneys)
        }
        else if(pack < 63){
      
          let levels=4;
          let moneys=3+4+8;
          updateLevelANDMoney(cuser,levels,moneys);
          console.log(levels+"  "+ moneys)
          
        }
        else if(pack < 127){
          let levels=5;
          let moneys=3+4+8+15;
          updateLevelANDMoney(cuser,levels,moneys);
         
        }
        else if(pack < 255){
          let levels=6;
          let moneys=3+4+8+15+32;
          updateLevelANDMoney(cuser,levels,moneys);
          
        }
        else if(pack < 511){
          let levels=7;
          let moneys=3+4+8+15+32+60;
          updateLevelANDMoney(cuser,levels,moneys);
      
        }
        else if(pack < 1023){
          let levels=8;
          let moneys=3+4+8+15+32+60+100;
          updateLevelANDMoney(cuser,levels,moneys);
          
        }
        else if(pack < 2047){
          let levels=9;
          let moneys=3+4+8+15+32+60+100+250;
          updateLevelANDMoney(cuser,levels,moneys);
         
        }
        else if(pack < 4095){
          let levels=10;
          let moneys=3+4+8+15+32+60+100+250+510;
          updateLevelANDMoney(cuser,levels,moneys);
      
        }
        else if(pack < 8191){
          let levels=11;
          let moneys=3+4+8+15+32+60+100+250+510+1025;
          updateLevelANDMoney(cuser,levels,moneys);
      
        }
        else if(pack < 16383){
          let levels=12;
          let moneys=3+4+8+15+32+60+100+250+510+1025+2050;
          updateLevelANDMoney(cuser,levels,moneys);
      
        }
        else if(pack == 8192){
          let levels=13;
          let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050;
          updateLevelANDMoney(cuser,levels,moneys);
          
        }
        else if(pack == 16384){
          let levels=14;
          let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200;
          updateLevelANDMoney(cuser,levels,moneys);
          
        }
        else if(pack == 32768){
          let levels=15;
          let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000;
          updateLevelANDMoney(cuser,levels,moneys);
          
        }
        else if(pack == 65536){
          let levels=16;
          let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000;
          updateLevelANDMoney(cuser,levels,moneys);
         
        }
        else if(pack == 131072){
          let levels=17
          let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000+65000;
          updateLevelANDMoney(cuser,levels,moneys);
      
        }
        else if(pack == 262144){
          let levels=18;
          let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000+65000+100000;
          updateLevelANDMoney(cuser,levels,moneys);
      
        }
        else if(pack == 524288){
          let levels=19;
          let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000+65000+100000+250000;
          updateLevelANDMoney(cuser,levels,moneys);
        }
        else if(pack == 1048576){
          let levels=20;
          let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000+65000+100000+250000+350000;
          updateLevelANDMoney(cuser,levels,moneys);
        }
        else if(pack == 2097152){
          let levels=21;
          let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000+65000+100000+250000+350000+800000;
          updateLevelANDMoney(cuser,levels,moneys);
        }
        else if(pack == 4194304){
          let levels=22;
          let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000+65000+100000+250000+350000+800000+1500000;
          updateLevelANDMoney(cuser,levels,moneys);
        }
      
        else if(pack == 8388608){
          let levels=23;
          let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000+65000+100000+250000+350000+800000+1500000+2000000;
          updateLevelANDMoney(cuser,levels,moneys);
        }
      
        else if(pack == 16777216){
          let levels=24;
          let moneys=3+4+8+15+32+60+100+250+510+1025+2050+4050+8200+16000+30000+65000+100000+250000+350000+800000+1500000+2000000+5000000;
          updateLevelANDMoney(cuser,levels,moneys);
        }
      
      
      }

const withdraw= ()=>{

}

  return (
    <div className='p-5 bg-yellow-50'>
            <h2 className='p-3 text-xl font-bold text-center '>User Profile</h2>
    
            <div className='card w-full bg-white shadow-xl p-2 px-2 md:px-5 py-4 justify-center'>
                
                <div className='mx-3'>
                    <div className=' flex-col gap-2 grid justify-center'>
                        {userIcon? 
                          <div className='avatar grid justify-center'>
                          <div className="w-24 p-2 rounded-full ring ring-yellow-100 bg-yellow-50 ring-offset-base-100 ring-offset-2">
                            <img width="95" height="95" src="https://img.icons8.com/3d-fluency/94/person-female.png" alt="person-female"/>
                          </div>
                          </div>
                          :<div className='avatar grid justify-center'>
                            <div className="w-24 p-2 rounded-full ring ring-yellow-100 bg-yellow-50 ring-offset-base-100 ring-offset-2">
                              <img width="95" height="95" src="https://img.icons8.com/3d-fluency/94/guest-male--v3.png" alt="guest-male--v3"/>
                            </div>
                        </div>
                        }
                      <div className='flex flex-row gap-2 p-3'>
                        <h2 className='font-bold text-2xl'>{fullname}</h2>
                        <div className="tooltip" data-tip="Edit">
                            <Link href='/update-profile'> <img width="16" height="16" src="https://img.icons8.com/office/16/create-new.png" alt="create-new"/></Link>
                        </div> 
                      </div>
                    </div>
             
                    <div className=' flex flex-row justify-between md:justify-center gap-2 mb-3  '>
                        <div className="flex flex-col mx-2 justify-between gap-2 md:flex-row">

                          <div className="tooltip gap-2 flex" data-tip="Point">
                          <img width="25" height="25" src="https://img.icons8.com/3d-fluency/94/coins.png" alt="coins"/><h1>{point}</h1>
                          </div>
                          <div className="tooltip gap-2 flex" data-tip="Package">
                            <img width="25" height="25" src="https://img.icons8.com/3d-fluency/94/empty-box.png" alt="empty-box"/><h2>{packages}</h2>
                          </div>
                          <div className="tooltip gap-2 flex" data-tip="Level">
                            <img width="25" height="25" src="https://img.icons8.com/fluency/48/stairs-up.png" alt="stairs-up"/><h1>{level}</h1>
                          </div>

                          {/* <h2>Point: {point}</h2>
                          <h2>Package: {packages}</h2>
                          <h2>Level: {level}</h2> */}
                        </div>
                        <div className="flex flex-col mx-2 justify-between gap-2 md:flex-row">
                        
                          
                          <div className="tooltip gap-2 flex" data-tip="Money">
                            <img width="25" height="25" src="https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/58/external-taka-currency-vitaliy-gorbachev-flat-vitaly-gorbachev.png" alt="external-taka-currency-vitaliy-gorbachev-flat-vitaly-gorbachev"/><h1>{moneys}</h1>
                          </div>

                          <div className="tooltip gap-2 flex" data-tip="Refer">
                          <img width="25" height="25" src="https://img.icons8.com/3d-fluency/94/group--v2.png" alt="group--v2"/><h1>{referUserList.length}</h1>
                          </div>

                          <div className="tooltip gap-2 flex" data-tip="BSSUID">
                          <img width="25" height="25" src="https://img.icons8.com/external-tal-revivo-tritone-tal-revivo/32/external-id-card-issued-for-hotel-staff-member-and-employees-hotel-tritone-tal-revivo.png" alt="external-id-card-issued-for-hotel-staff-member-and-employees-hotel-tritone-tal-revivo"/><h1>{bssuid}</h1>
                          </div>
                          
                          {/* <h2>Money: {moneys}</h2>
                          <h2>Refer: {referUserList.length}</h2>
                          <h2>BSSUID: {bssuid}</h2> */}
                        </div>
                    </div>

                    {/* <div className='grid justify-items-end '>
                      <div className="tooltip gap-2 flex" data-tip="Edit">
                          <Link href='www.facebook.com'> <img width="25" height="24" src="https://img.icons8.com/color/48/create-new.png" alt="create-new"/></Link>
                      </div>
                    </div> */}
                    <div className='p-2 flex flex-col gap-3 justify-center border-2 rounded-md'>

                        <h2 className='flex justify-between text-bold'> Username: <span>{username}</span></h2>
                        <h2 className='flex justify-between text-bold'> Email: <span>{email}</span></h2>
                        <h2 className='flex justify-between text-bold'> Phone Number: <span>{phone}</span></h2>
                        <h2 className='flex justify-between text-bold'> Father's Name: <span>{fathername}</span></h2>
                        <h2 className='flex justify-between text-bold'> Address: <span>{address}</span></h2>
                        <h2 className='flex justify-between text-bold'> User Type: <span>{usertype}</span></h2>
                        <h2 className='flex justify-between text-bold'> Gendar: <span>{gender}</span></h2>
                        <h2 className='flex justify-between text-bold'> Refer Id: (Same as username) <span>{username}</span></h2>
                        <h2 className='flex justify-between text-bold'> Nomenee Name: <span>{nomeneeName}</span></h2>
                        <h2 className='flex justify-between text-bold'> Nomenee Phone: <span>{nomeneePhone}</span></h2>
                        
                        <h2>After 1000 on money, you can withdraw.</h2>
                        {/* <Input placeholder='Txn Id'  /> */}
                        <Button disabled={!(moneys > 1000)} onClick={()=>withdraw()} >{loader? <LoaderIcon className="animate-spin" />:'Withdraw'} </Button>
                    </div>
                </div>
            </div>
            <div className='p-2 px-2 md:px-5 py-4 justify-center'>
                <h2 className='text-2xl justify-center text-center'> All refer list </h2>
                {/* <h2>Your Refer Id is {username} </h2> */}
                <div className='mx-5 border '>
                    <Table>
                        <TableCaption>A list of your refer member.</TableCaption>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead >Phone</TableHead>
                            </TableRow>
                        </TableHeader>
                        {referUserList.map((refered,index)=>(
                        <TableBody key={index}>
                            <TableRow>
                            <TableCell className="font-medium">{refered.id}</TableCell>
                            <TableCell>{refered.username}</TableCell>
                            <TableCell>{refered.email}</TableCell>
                            <TableCell>{refered.phone}</TableCell>
                            {/* <TableCell className="text-right">{refered.mylevel}</TableCell> */}
                            </TableRow>
                        </TableBody>
                        ))}
                    </Table>
                   </div> 
            
            </div>

        <div>
          

            </div>

        </div>
  )
}

export default profile
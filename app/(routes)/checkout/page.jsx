"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowBigRight } from 'lucide-react'
import Image from 'next/image';
import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import axios from 'axios';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function Checkout(){

    
    const [jwt,setJwt] = useState();
    const [user,setUser] = useState();    

    // const jwt = sessionStorage.getItem('jwt');
    // const user = JSON.parse(sessionStorage.getItem('user'));
    const [cheakPay, setCheakPay] = useState(true)

    const [totalCartItem,setTotalCartItem] = useState(0);
    const [cartItemList,setCartItemList] = useState([]);
    const [subtotal,setSubTotal]=useState(0);
    const [totalPoints,setTotalPoint]=useState(0);
    const router=useRouter();

    const [username,setUsername]=useState();
    const [email,setEmail]=useState();
    const [phone,setPhone]=useState();
    const [zip,setZip]=useState();
    const [address,setAddress]=useState();
    const [paymentmethod, setPaymentmethod] = React.useState('cod');
    const [paymentid, setPaymentid] = useState();
    const [payerNumb,setpayerNumb] = useState('01727629513');
    const [loader,setLoader]=useState(false);
    const [bsslength,setbsslength] = useState();
    const [bssuserlist,setbssuserlist] = useState([]);
    const [extraPoint,setExtraPoint] = useState();
    const [orderPkg,setOrderPkg] = useState()
    const [myPoints,setMyPoint] = useState(0)
    
    

    useEffect(()=>{
        try{
            const jwt = sessionStorage.getItem('jwt');
            setJwt(jwt)
            const user = JSON.parse(sessionStorage.getItem('user'));
            setUser(user)
            if(!jwt){
                router.push('/sign-in')
            }
            getCartItems();
            getBssInfo();
            getMyInfo();
            
            
        } catch(err){
            console.log('geting data error')
        }
        
        // if(paymentmethod == 'bkash'){
        //     setpayerNumb('01727629513');
        // } else if(paymentmethod == 'nagad'){
        //     setpayerNumb('01727629513');
        // }

      },[])

    const getCartItems=async()=>{
        
        const user = JSON.parse(sessionStorage.getItem('user'));
        const jwt = sessionStorage.getItem('jwt');
        const cartItemList_=await GlobalApi.getCartItems(user.id,jwt);
        //console.log(cartItemLists_);
        setTotalCartItem(cartItemList_?.length);
        setCartItemList(cartItemList_);

      }

    useEffect(()=>{
        let totalpoint=0;
        let total=0;
        cartItemList.forEach(element => {
            totalpoint = totalpoint + parseFloat(element.productPoint)
            total = total + parseFloat(element.amount)
        });
        console.log(totalpoint)
        setTotalPoint(totalpoint)
        setSubTotal(total)
        extrsPoint(totalpoint);
        
    },[cartItemList])

    const getMyInfo= async()=>{
        const user = JSON.parse(sessionStorage.getItem('user'));
        const getMyInfo_= await GlobalApi.getMyData(user.id);
        // console.log(getMyInfo_.mypoint);
        setMyPoint(getMyInfo_.mypoint)
        //console.log(getMyInfo_.id);
    }

  const extrsPoint=(totalpoint)=>{
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log(myPoints)
    let a = totalpoint + myPoints;
    let b = parseInt(a/35);
    console.log(b)
    setOrderPkg(b)
    let c = parseFloat(35*b);
    let d = a - c
    console.log(d)
    setExtraPoint(d);
    //updatePointOnly(user,d)

  }
    // useEffect(()=>{
    //       let total=0;
    //       cartItemList.forEach(element => {
    //           total = total + parseInt(element.amount)
    //       });
    //       setSubTotal(total)
    //   },[cartItemList])
      
      const calculateTotalAmount=()=>{
        const totalAmount=subtotal+0;
        return totalAmount;
      }


      const getBssInfo= async()=>{
        const getBssInfo_=await GlobalApi.getBssUser();
        setbsslength(getBssInfo_.length)
       
    }
    const updatePointOnly=(user, totalpointss)=>{
        axios
        .put('https://api.slifebd.com/api/users/' + user.id + '/?populate', {
          
            mypoint: totalpointss,   
          
        })
        .then(response => {
          
          console.log(response);
        });
      }
   

      const onOrderInfo=(amounts)=>{
        const orderinfo={
            data:{
                totalOrderAmount:amounts,
                username:username,
                email:email,
                phone:phone,
                zip:zip,
                address:address,
                orderItemList:cartItemList,
                userId:user.id,
                orderStatus:'Pending',
                totalorderpoint:totalPoints,
                paymentmethod:paymentmethod,
                paymentid:paymentid,
                bsslenght:bsslength,
                exrtapoint:extraPoint,
                orderpkg:orderPkg,
                bssuseridlist:bssuserlist,
                
            }
        }
        setLoader(true)
        
        GlobalApi.createOrder(orderinfo,jwt).then(resp=>{
            //console.log(resp);
            toast("Order Submited")
            cartItemList.forEach((item,index)=>{
                try{
                    GlobalApi.deleteCartItem(item.id,jwt).then(resp=>{
                        console.log("deleting item!!")
                        
                    })
                }catch(err){
                    toast(err)
                    console.log(err)
                }
 
            })
            router.push('/')
            setLoader(false)
            
        })
    }


    return (
        <div className=''>
            <h2 className='p-3 bg-primary text-xl font-bold text-center'>Checkout</h2>
            <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8'>
                <div className='  md:col-span-2 mx-10 mb-10'>
                    <h2 className='font-bold text-3xl'>Billing Details</h2>
                    <div className='flex flex-col gap-4 mt-3'>
                        <Input placeholder='Name' onChange={(e)=>setUsername(e.target.value)} />
                        <Input placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-4 mt-3'>
                        <Input placeholder='Phone' onChange={(e)=>setPhone(e.target.value)}/>
                        <Input placeholder='Zip' onChange={(e)=>setZip(e.target.value)}/>
                    </div>
                    <div className=' mt-3 '>
                        <Input placeholder='Address' onChange={(e)=>setAddress(e.target.value)}  />
                    </div>

                </div>

                <div className='mx-10 border'>
                    <h2 className='p-3 bg-gray-200 font-bold text-center'>Total Cart ({totalCartItem})</h2>
                    <div className='p-4 flex flex-col gap-4'>
                        <h2 className='font-bold flex justify-between'> SubTotal: <span>{subtotal}</span></h2>
                        <hr></hr>
                        <h2 className='flex justify-between'> Delivery: <span>Free</span></h2>
                        <h2 className='flex justify-between'> Point: <span>{totalPoints}</span></h2>
                        <hr></hr>
                        <h2 className='font-bold flex justify-between'> Total: <span>{subtotal}</span></h2>
                        
                        <RadioGroup defaultValue="cod" className='flex items-center gap-1' value={paymentmethod} onValueChange={setPaymentmethod} >
                            
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cod" id="cod"  />
                                
                                <Label htmlFor="cod">Cash On Delivery</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bkash" id="bkash" />
                                
                                <Label htmlFor="bkash">bKash</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="nagad" id="nagad" />
                                
                                <Label htmlFor="nagad">Nagad</Label>
                            </div>

                            



                            {/* <div className="flex items-center space-x-2">
                                <RadioGroupItem value="rocket" id="rocket" />
                                
                                <Label htmlFor="rocket">Rocket</Label>
                                <Image src={'/bkash.png'}
                                alt='logo' 
                                width={20}
                                height={20}
                                />
                            </div> */}

                        </RadioGroup>
                        {paymentmethod != 'cod' ? <>
                            <h2>Send Money {calculateTotalAmount()} to this <p className=' font-bold '>{payerNumb}</p> number and give Transaction id.</h2>
                            <Input placeholder='Transaction Id' onChange={(e)=>setPaymentid(e.target.value)} />
                            <Button disabled={!(username && email && phone && zip && address && paymentid)} onClick={()=>onOrderInfo(calculateTotalAmount())} >{loader? <LoaderIcon className="animate-spin" />:'Payment'} <ArrowBigRight/> </Button>
                        </>:<>
                        <Button disabled={!(username && email && phone && zip && address )} onClick={()=>onOrderInfo(calculateTotalAmount())} >{loader? <LoaderIcon className="animate-spin" />:'Payment'} <ArrowBigRight/> </Button>
                        </>
                        }
                        
                        
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Checkout
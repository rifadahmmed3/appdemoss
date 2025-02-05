import SignIn from "../(auth)/sign-in/page";

const { default: axios } = require("axios");

const axiosClient=axios.create({
    baseURL:'https://api.slifebd.com/api'
})

const getCategory=()=>axiosClient.get('/categories?populate=*');

const getSliders=()=>axiosClient.get('/sliders?populate=*').then(resp=>{
    return resp.data.data;
});


const getAllUserData=()=>axiosClient.get('/users/?populate=*').then(resp=>{
    return resp.data;
});

const getMyData=(userId)=>axiosClient.get('/users/'+userId+'/?populate=*').then(resp=>{
    return resp.data;
});

const getBssUser=()=>axiosClient.get('/users?filters[bssuid][$null]').then(resp=>{
    return resp.data;
});

const getNextUser=(bssuid)=>axiosClient.get('/users?filters[bssuid][$eq]='+bssuid+'&populate').then(resp=>{
    return resp.data;
});

const getCategoryList=()=>axiosClient.get('/categories?populate=*').then(resp=>{
    return resp.data.data;
});

const getUserByRefer=(username)=>axiosClient.get('/users?filters[referuid][$eq]='+username).then(resp=>{
    return resp.data;
});



const singleProduct=(id)=>axiosClient.get('/products/'+ id +'?populate=*');

const searchReasults=(results)=>axiosClient.get('/products?populate=*&filters[name][$contains]=' + results + '&pagination[pageSize]=9999').then(resp=>{
    return resp.data.data;


});

const getAllProductList=()=>axiosClient.get('/products?populate=*&pagination[pageSize]=9999&sort[0]=createdAt:desc').then(resp=>{
    return resp.data.data;
}); 

const getProductByCategory=(category)=>axiosClient.get('/products?filters[categories][Name][$in]='+ category +'&populate=*&pagination[pageSize]=9999&sort[0]=createdAt:desc').then(resp=>{
    return resp.data.data;
});


const registerUser=(username,fullname,fathername,email,password,address,phone,nidorbirth,usertype,gender,refferid,nomeneeName,nomeneePhone)=>axiosClient.post('/auth/local/register',{
    username:username,
    fullname:fullname,
    fathersname:fathername,
    email:email,
    password:password,
    address:address,
    phone:phone,
    nidorbirth:nidorbirth,
    usertype:usertype,
    gender:gender,
    accounttype:'nobss',
    mypoint:0,
    mypackage:0,
    mymoney:0,
    mylevel:0,
    referuid:refferid,
    nomeneename:nomeneeName,
    nomeneephone:nomeneePhone,


    
});

const signIn=(email,password)=>axiosClient.post('/auth/local',{
    identifier:email,
    password:password,
});


const addToCart=(data,jwt)=>axiosClient.post('/user-carts',data,{
    headers:{
        Authorization: 'Bearer ' + jwt
    }
});

const getCartItems=(userId,jwt)=>axiosClient.get('/user-carts?filters[userId][$eq]='+userId+'&[populate][products][populate][images][populate][0]=url',{
    headers:{
        Authorization: 'Bearer ' + jwt
    }
}).then(resp=>{

    const data = resp.data.data;
    const cartItemsList=data.map((item,index)=>({

        name:item.attributes.products?.data[0].attributes.name,
        quantity:item.attributes.quantity,
        amount:item.attributes.amount,
        image:item.attributes.products?.data[0].attributes.images.data[0].attributes.url,
        actualPrice:item.attributes.products?.data[0].attributes.mrp,
        productPoint:item.attributes.userPoint,
        id:item.id,
        product:item.attributes.products?.data[0].id

    }))

    return cartItemsList
});

const deleteCartItem=(id,jwt)=>axiosClient.delete('/user-carts/'+id,{
    headers:{
        Authorization: 'Bearer ' + jwt
    }
});

const afterDeleteCartItem=(id,jwt)=>axiosClient.delete('/user_carts/'+id,{
    headers:{
        Authorization: 'Bearer ' + jwt
    }
});

const createOrder=(data,jwt)=>axiosClient.post('/orders',data,{
    headers:{
        Authorization: 'Bearer ' + jwt
    }
});


const getMyOrderTwo=(userId)=>axiosClient.get('/orders?filters[userId][$eq]='+userId+'&populate').then(resp=>{
    return resp.data.data;
})

const getMyOrder=(userId,jwt)=>axiosClient.get('/orders?filters[userId][$eq]='+userId+'&populate[orderItemList][populate][product][populate][images]=url')
.then(resp=>{
    const responce= resp.data.data;
    const orderList=responce.map(item=>({
        id:item.id,
        totalOrderAmount:item.attributes.totalOrderAmount,
        orderItemList:item.attributes.orderItemList,
        createdAt:item.attributes.createdAt,
        orderStatus:item.attributes.orderStatus,
        totalPoint:item.attributes.totalorderpoint,
        bsslenght:item.attributes.bsslenght,



    }));

    return orderList;

})


const getAllOrder=()=>axiosClient.get('orders?populate=*').then(resp=>{
    return resp.data.data;
})

const getTargetOrder=(bssuid)=>axiosClient.get('/orders?filters[bsslenght][$gte]='+ bssuid +'&pagination[pageSize]=9999').then(resp=>{
    return resp.data.data;
})


const logicalUser=(logicInfo,jwt)=>axiosClient.put('/users?filters[id][$eq]=8',logicInfo).then(resp=>(
    console.log('point submitted')
  ));


const getExtraPoint=(userId)=>axiosClient.get('/orders?filters[userId][$eq]=' + userId + '&filters[orderStatus][$eq]=Complete&sort[0]=createdAt:desc&pagination[pageSize]=1').then(resp=>{
    return resp.data.data;
})

export default{
    getCategory,
    getSliders,
    getCategoryList,
    getAllProductList,
    getProductByCategory,
    registerUser,
    signIn,
    addToCart,
    getCartItems,
    deleteCartItem,
    createOrder,
    getMyOrder,
    afterDeleteCartItem,
    logicalUser,
    getAllUserData,
    getMyData,
    getBssUser,
    getNextUser,
    getUserByRefer,
    getTargetOrder,
    getAllOrder,
    getExtraPoint,
    searchReasults,
    singleProduct,
    getMyOrderTwo,

}
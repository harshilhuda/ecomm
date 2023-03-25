import React, { useEffect, useState,useReducer,useContext } from 'react'
import './Product.scss'
import { Store } from '../../Store';
import { useParams } from 'react-router-dom'
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import axios from 'axios';
import { getError } from '../../utils';
import {toast} from 'react-toastify'
const reducer=(state,action)=>{
  switch(action.type)
  {
    case 'FETCH_REQUEST':
      return {...state,loading:true}
    case 'FETCH_SUCCESS':
      return {...state,currentproduct:action.payload,loading:false}
    case 'FETCH_FAILURE':
      return {...state,loading:false,error:action.payload}
    default:
      return state
  }
}
function Product() {
  const params = useParams()
  const { id:productId} = params;
  const [{loading,error,currentproduct},dispatch]=useReducer((reducer),{
    currentproduct:[],
    loading:true,
    error:''
  })
  useEffect(()=>{
    const getProduct=async()=>{
      dispatch({type:'FETCH_REQUEST'})
      try{
        const result=await axios.get(`/api/products/${productId}`)
        dispatch({type:'FETCH_SUCCESS',payload:result.data})
      }
      catch(err)
      {
        dispatch({type:'FETCH_FAILURE',payload:(getError(err))})
      }
    }
    getProduct()
  },[productId,error.message])
  const{state,dispatch:ctxDispatch}=useContext(Store)
  const {cart}=state
  const[quantity,setQuantity]=useState(1)
  const addToCartHandler=async()=>{
    const {data}=await axios.get(`/api/products/${currentproduct._id}`)
    const item=cart.cartItems.find((x)=>x._id===currentproduct._id)
    if(data.countInStock<(quantity+(item?parseInt(item.quantity):0)))
    {
      toast.error(`Sorry only ${data.countInStock} pieces of this item are available`,{
        toastId:'error3'
      })
      return
    } 
    const q=quantity+(item?parseInt(item.quantity):0)
    ctxDispatch({type:'CART_ADD_ITEM',payload:{...currentproduct,quantity:q}})
  }
  return (
    <div className='product'>
      {loading?(<h1>Loading...</h1>):error?(<div className='center'><h1>{error}</h1></div>):(
        <>
      <div className="left">
        <div className="mainImg">
          <img src={currentproduct.image} alt="" />
        </div>
      </div>
        <div className="right">
          <h1>{currentproduct.name}</h1>
          <span>{currentproduct.price}</span>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Magnam asperiores id quos voluptatibus, minima exercitationem,
            assumenda tempore neque maxime magni quidem explicabo aliquam voluptas sit
            ratione ut obcaecati beatae earum.
          </p>
          <div className="quantity">
            <button onClick={()=>setQuantity(prev=>prev===1?1:prev-1)}>-</button>
            {quantity}
            <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
          </div>
          <button className="add" onClick={()=>{addToCartHandler()}}>
          <AddShoppingCartIcon />ADD TO CART
          </button>
        </div>
        </>
      )}
    </div>
  )
}

export default Product
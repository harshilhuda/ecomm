import React from 'react'
import './Card.scss'
import { Link } from 'react-router-dom'
import { Store } from '../../Store'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
function Card({product}) {
  const navigate=useNavigate()
  const{state,dispatch:ctxDispatch}=useContext(Store)
  const {cart}=state
  const addToCartHandler=async(product)=>{
    const existItem=cart.cartItems.find((x)=>x._id===product._id)
    const {data}=await axios.get(`/api/products/${product._id}`)
    if(existItem && existItem.quantity===data.countInStock)
    {
      toast.error(`Sorry only ${data.countInStock} pieces of this item are available`,{
        toastId:'error3'
      })
      return
    }
    if(existItem)
    {
      navigate(`/products/${product._id}`)
    }
    const quantity=1
    ctxDispatch({type:'CART_ADD_ITEM',payload:{...product,quantity}})
  }
  return (
    <div className='card'>
        <div className="b">
        <Link to={`/products/${product._id}`} className='link'>
            <img src={product.image} alt="" />
            </Link>
            <button className='btn' onClick={()=>addToCartHandler(product)}>Add to Cart</button>
        </div>
    </div>
  )
}

export default Card
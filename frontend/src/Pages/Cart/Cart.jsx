import React, { useContext } from 'react'
import { Store } from '../../Store'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {toast} from 'react-toastify'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Cart.scss'
function Cart() {
    const {state,dispatch:ctxDispatch}=useContext(Store)
    const {cart}=state
    const addToCartHandler=async(currentproduct,quantity)=>{
        const {data}=await axios.get(`/api/products/${currentproduct._id}`)
        const item=cart.cartItems.find((x)=>x._id===currentproduct._id)
        if(data.countInStock<(quantity+(item?parseInt(item.quantity):0)))
        {
          toast.error(`Sorry only ${data.countInStock} pieces of this item are available`,{
            toastId:'error3'
          })
          return
        } 
        let q=quantity+(item?parseInt(item.quantity):0)
        if(q<1)
        {
            removeItem(item)
            return
        }
        ctxDispatch({type:'CART_ADD_ITEM',payload:{...currentproduct,quantity:q}})
      }
      const removeItem=(item)=>{
        ctxDispatch({type:'CART_REMOVE_ITEM',payload:item})
      }
  return (
    <div className='cartt'>
        <div className="left">
        <h1>Shopping Cart</h1>
            {
                cart.cartItems.length===0?<div className='empty'>Your Cart is empty.  <Link className='link1' to='/'>Go Shopping</Link></div>:
                <div className="container">
                {cart.cartItems.map((item)=>(
                    <div className="contain" >
                    <div className="disp" key={item._id}>
                        <div>
                        <img src={item.image} alt="" />
                        </div>
                        <div className='btn'>
                            <button className='left' onClick={()=>addToCartHandler(item,-1)}><RemoveIcon /></button>
                            {item.quantity}
                            <button className='right' onClick={()=>addToCartHandler(item,1)}><AddIcon /></button>
                        </div>
                        <div>{item.price}</div>
                        <div><button className='icon' onClick={()=>removeItem(item)}><DeleteIcon /></button></div>
                    </div>
                    <hr />
                    </div>
                ))}
            </div>
            }
        </div>
        <div className="right">
            <div className="container">
              <h1>Subtotal ({cart.cartItems.reduce((a,c)=>a+c.quantity,0)}{' '}items) RS:
              {cart.cartItems.reduce((a,c)=>a+c.price*c.quantity,0)}</h1>
              <div><hr /></div>
              <button>Proceed to Checout</button>
            </div>
        </div>
    </div>
  )
}

export default Cart
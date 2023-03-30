import React, { useContext,useState } from 'react'
import './ShippingScreen.scss'
import { Store } from '../../Store'
import { useNavigate } from 'react-router-dom'
function ShippingScreen() {
    const {state,dispatch:ctxDispatch}=useContext(Store)
    const navigate=useNavigate()
    const{
        cart:{shippingAddress},
    }=state
    const [fullName,setFullName]=useState(shippingAddress.fullName||'')
    const [address,setAddress]=useState(shippingAddress.address||'')
    const [city,setCity]=useState(shippingAddress.city||'')
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode||'')
    const [country,setCountry]=useState(shippingAddress.country||'')
    const submitHandler=(e)=>{
        e.preventDefault()
        ctxDispatch({
            type:'SAVE_SHIPPING_ADDRESS',
            payload:{
                fullName,
                address,
                city,
                postalCode,
                country
            }
        })
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country
            })
        )
        navigate('/payment')
    }
  return (
    <div className='shipping'>
        <h1>Shipping Address</h1>
        <div className="ship-item">
            <h4>Full Name</h4>
            <input type="text" value={fullName} onChange={(e)=>setFullName(e.target.value)} />
        </div>
        <div className="ship-item">
            <h4>Address</h4>
            <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} />
        </div>
        <div className="ship-item">
            <h4>City</h4>
            <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} />
        </div>
        <div className="ship-item">
            <h4>Postal Code</h4>
            <input type="text" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} />
        </div>
        <div className="ship-item">
            <h4>Country</h4>
            <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)} />
        </div>
        <button className='btn' onClick={submitHandler}>Continue</button>
    </div>
  )
}

export default ShippingScreen
import React, { useEffect, useReducer } from 'react'
import './FeaturedProducts.scss'
import axios from 'axios'
import Card from '../Card/Card'
const reducer=(state,action)=>{
  switch(action.type)
  {
    case 'FETCH_REQUEST':
      return {...state,loading:true}
    case 'FETCH_SUCCESS':
      return {...state,products:action.payload,loading:false}
    case 'FETCH_FAILURE':
      return {...state,loading:false,error:action.payload}
    default:
      return state
  }
}
function FeaturedProducts() {
  const [{loading,error,products},dispatch]=useReducer((reducer),{
    products:[],
    loading:true,
    error:''
  })
  useEffect(()=>{
    const getProducts=async()=>{
      dispatch({type:'FETCH_REQUEST'})
      try{
        const result=await axios.get('/api/products/featured')
        dispatch({type:'FETCH_SUCCESS',payload:result.data})
      }
      catch(error)
      {
        dispatch({type:'FETCH_FAILURE',payload:error.message})
      }
    }
    getProducts()
  },[])
  return (
    <div className='featured'>
      <div className="top">
        <h1>featured products</h1>
        <p>These are the products with the highest customer reviews on our website. Customers
          have loved these products and given them highest ratings.
        </p>
        </div>
        {loading?(<h1>Loading...</h1>)
          :error?{error}:
        (
          <>
      <div className="bottom">
        {products.map((product) => (
          <Card product={product} />
        ))}
      </div>
        </>
        )
        }
    </div>
  )
}

export default FeaturedProducts
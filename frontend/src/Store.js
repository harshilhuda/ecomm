import { createContext, useReducer } from "react";
export const Store=createContext()
const intitialState={
    userInfo:localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):null,
    cart:{
        cartItems:localStorage.getItem('cartItems')?
        JSON.parse(localStorage.getItem('cartItems'))
        :[],
        shippingAddress:localStorage.getItem('shippingAddress')?
        JSON.parse(localStorage.getItem('shippingAddress')):
        {}
    }
}
function reducer(state,action)
{
    switch(action.type)
    {
        case 'CART_ADD_ITEM':
            const newItem=action.payload
            const existItem=state.cart.cartItems.find((item)=>item._id===newItem._id)
            const cartItems=existItem?state.cart.cartItems.map((item)=>(
                existItem._id===item._id?newItem:item
            )):[...state.cart.cartItems,newItem]
            localStorage.setItem('cartItems',JSON.stringify(cartItems))
            return{...state,cart:{...state.cart,cartItems}}
        case 'CART_REMOVE_ITEM':
            {
                const cartItems=state.cart.cartItems.filter((item)=>item._id!==action.payload._id)
                localStorage.setItem('cartItems',JSON.stringify(cartItems))
                return {...state,cart:{...state.cart,cartItems}}
            }
        case 'USER_SIGNIN':
            return {...state,userInfo:action.payload}
        case 'USER_SIGNOUT':
            return {...state,userInfo:null}
        case 'SAVE_SHIPPING_ADDRESS':
            return{
                ...state,
                cart:{
                    ...state.cart,
                    shippingAddress:action.payload
                }
            }
        default:
            return state
    }
}
export function StoreProvider(props)
{
    const[state,dispatch]=useReducer(reducer,intitialState)
    const value={state,dispatch}
    return <Store.Provider value={value}>
        {props.children}
    </Store.Provider>
}